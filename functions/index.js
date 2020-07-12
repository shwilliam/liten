const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const fetch = require('node-fetch')
const cors = require('cors')({origin: true})
const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const getUrls = require('get-urls')
const shortid = require('shortid')

const DEFAULT_TWEET_DIMENSIONS = {
  width: 550,
  height: 173, // one-line tweet preview height
}

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

        if (body.url) {
          data.url = await getSitesMetatags(body.url)
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
        response.json({error})
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
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  let latestImageUrl

  try {
    const page = await browser.newPage()
    await page.goto(`https://instagram.com/${username}`)
    await page.waitForSelector('main article a img', {
      visible: true,
    })

    latestImageUrl = await page.evaluate(() => {
      const imageEl = document.querySelector('main article a img')
      return imageEl.src
    })
  } catch (error) {
    console.error(error)
    return null
  } finally {
    await browser.close()
  }

  return latestImageUrl
}

const getTweetPreview = async url => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  let preview
  let embed
  try {
    const theme = 'light' // light | dark
    const page = await browser.newPage()
    await page.goto(
      `https://publish.twitter.com/?dnt=1&hideConversation=on&query=${url}&theme=${theme}&widget=Tweet`,
    )

    await page.waitForSelector('.EmbedCode-code', {
      visible: true,
    })
    embed =
      (await page.evaluate(() => {
        const embedEl = document.querySelector('.EmbedCode-code')
        return embedEl.innerText
      })) || null

    const iframeUrl = await page.evaluate(() => {
      const iframeEl = document.querySelector('iframe')
      return iframeEl.src || null
    })

    const previewImageBuffer = await getTweetPreviewImage(browser, iframeUrl)

    if (previewImageBuffer) {
      const filename = shortid.generate()
      const file = await saveMediaToBucket(
        `tweets/${filename}.png`,
        previewImageBuffer,
      )
      preview = file.metadata.mediaLink
    }
  } catch (error) {
    console.error(error)
    return null
  } finally {
    await browser.close()
  }

  return {embed, preview}
}

const getTweetPreviewImage = async (browser, url) => {
  try {
    const page = await browser.newPage()
    await page.goto(url)
    await page.waitForSelector('#app', {
      visible: true,
      timeout: 12000,
    })
    await page.waitFor(1000) // fade in transition
    const tweetPreviewDimensions = await page.evaluate(() => {
      const tweetPreviewContainerEl = document.getElementById('app')
      const tweetPreviewEl = tweetPreviewContainerEl.firstChild
      try {
        const tweetPreviewDimensions = tweetPreviewEl.getBoundingClientRect()
        return {
          width: tweetPreviewDimensions.width,
          height: tweetPreviewDimensions.height,
        }
      } catch (error) {
        return {
          width: DEFAULT_TWEET_DIMENSIONS.width,
          height: DEFAULT_TWEET_DIMENSIONS.height,
        }
      }
    })
    await page.setViewport({
      width: tweetPreviewDimensions.width,
      height: tweetPreviewDimensions.height,
    })
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
