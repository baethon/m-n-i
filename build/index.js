const https = require('https')

const libUrl = 'https://raw.githubusercontent.com/muan/emojilib/master/emojis.json'
const fitzpatrickScaleModifiers = ['🏻', '🏼', '🏽', '🏾', '🏿']

const getLibrary = () => {
  return new Promise((resolve) => {
    https.get(libUrl, (response) => {
      let body = ''

      response.on('data', (chunk) => {
        body += chunk
      })

      response.on('end', () => {
        resolve(JSON.parse(body))
      })
    })
  })
}

getLibrary()
  .then((data) => {
    const mappedList = Object.values(data)
      .reduce(
        (carry, { char, fitzpatrick_scale: fitzpatrickScale, category }) => {
          return (fitzpatrickScale === false)
            ? carry.concat([{ char, category }])
            : carry.concat(fitzpatrickScaleModifiers.map((modifier) => ({
              char: char + modifier,
              category
            })))
        },
        []
      )

    return mappedList
  })
  .then((list) => JSON.stringify(list, null, 2))
  .then(console.log)
