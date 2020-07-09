const functions = require('firebase-functions')
const cors = require('cors')({origin: true})
const cheerio = require('cheerio')
const getUrls = require('get-urls')
const fetch = require('node-fetch')

exports.scrape = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const body = JSON.parse(request.body)
    const data = {}

    if (body.text) {
      data.text = (await getSitesMetatags(body.text)) ?? []
    }
    if (body.url) {
      data.url = (await getSiteMetatags(body.url)) ?? {}
    }

    response.json(data)
  })
})

const getSiteMetatags = async url => {
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
}

const getSitesMetatags = text => {
  const urls = Array.from(getUrls(text))
  const requests = urls.map(getSiteMetatags)

  return Promise.all(requests)
}

