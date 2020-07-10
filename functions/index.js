const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const fetch = require('node-fetch')
const cors = require('cors')({origin: true})
const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const getUrls = require('get-urls')
const shortid = require('shortid')

exports.scrape = functions
  .runWith({
    timeoutSeconds: 120,
    memory: '1GB',
  })
  .https.onRequest((request, response) => {
    cors(request, response, async () => {
      try {
        const body = JSON.parse(request.body)
        const data = {}

        if (body.text) {
          data.text = await getSitesMetatags(body.text)
        }
        if (body.url) {
          data.url = await getSiteMetatags(body.url)
        }
        if (body.ig) {
          data.ig = await getLatestInstagramImageUrl(body.ig)
        }
        if (body.tweet) {
          data.tweet = await getTweetPreview(body.tweet)
        }

        response.json(data)
      } catch (error) {
        console.error(error)
        response.status(500)
      }
    })
  })

const getSiteMetatags = async url => {
  try {
    const res = await fetch(url)
    const html = await res.text()
    const $ = cheerio.load(html)

    const getMetatag = name =>
      $(`meta[name=${name}]`).attr('content') ||
      $(`meta[property="og:${name}"]`).attr('content') ||
      $(`meta[property="twitter:${name}"]`).attr('content')

    return {
      url,
      title: $('title').first().text(),
      favicon: $('link[rel="shortcut icon"]').attr('href'),
      description: getMetatag('description'),
      image: getMetatag('image'),
      author: getMetatag('author'),
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

const getSitesMetatags = text => {
  try {
    const urls = Array.from(getUrls(text))
    const requests = urls.map(getSiteMetatags)

    return Promise.all(requests)
  } catch (error) {
    console.error(error)
    return null
  }
}

const getLatestInstagramImageUrl = async username => {
  try {
    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage()
    await page.goto(`https://instagram.com/${username}`)
    await page.waitForSelector('img', {
      visible: true,
    })

    const latestImageUrl = await page.evaluate(() => {
      const imageEl = document.querySelector('article img')
      return imageEl.src
    })

    await browser.close()

    return latestImageUrl
  } catch (error) {
    console.error(error)
    return null
  }
}

const getTweetPreview = async url => {
  try {
    const browser = await puppeteer.launch({headless: true})
    const theme = 'light' // light | dark
    const page = await browser.newPage()
    await page.goto(
      `https://publish.twitter.com/?dnt=1&hideConversation=on&query=${url}&theme=${theme}&widget=Tweet`,
    )

    await page.waitForSelector('.EmbedCode-code', {
      visible: true,
    })
    const embed =
      (await page.evaluate(() => {
        const embedEl = document.querySelector('.EmbedCode-code')
        return embedEl.innerText
      })) ?? null

    const iframeUrl = await page.evaluate(() => {
      const iframeEl = document.querySelector('iframe')
      return iframeEl?.src
    })

    const previewImageBuffer = await getTweetPreviewImage(browser, iframeUrl)

    let preview = null
    if (previewImageBuffer) {
      const filename = shortid.generate()
      const file = await saveMediaToBucket(
        `tweets/${filename}.png`,
        previewImageBuffer,
      )
      preview = file.metadata.mediaLink
    }

    await browser.close()

    return {embed, preview}
  } catch (error) {
    console.error(error)
    return null
  }
}

const getTweetPreviewImage = async (browser, url) => {
  try {
    const page = await browser.newPage()
    await page.goto(url)
    await page.waitForSelector('#app', {
      visible: true,
      timeout: 8000,
    })
    await page.waitFor(1000) // fade in transition
    await page.setViewport({width: 550, height: 380}) // fit generated preview
    return await page.screenshot()
  } catch (error) {
    console.error(error)
    return null
  }
}

const saveMediaToBucket = async (filename, buffer) => {
  try {
    const bucket = admin.storage().bucket()
    const file = bucket.file(filename)

    await file.save(buffer)
    return file
  } catch (error) {
    console.error(error)
    return null
  }
}
