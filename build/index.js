'use strict'

const https = require('https')
const skinTone = require('skin-tone')

const libUrl = 'https://raw.githubusercontent.com/muan/emojilib/master/emojis.json'
const skinTonesList = ['none', 'white', 'creamWhite', 'lightBrown', 'brown', 'darkBrown']

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

const expandByFitzpatrickScale = (carry, item) => {
  const { char, fitzpatrick_scale: fitzpatrickScale, category, keywords } = item
  return (fitzpatrickScale === false)
    ? carry.concat([{ char, category, keywords }])
    : carry.concat(skinTonesList.map((tone) => ({
      char: skinTone(char, tone),
      category,
      keywords
    })))
}

const addPersonCategory = (list) => {
  const persons = list.filter(({ keywords }) => keywords.includes('female') || keywords.includes('male'))

  return list.concat(persons.map((item) => ({
    ...item,
    category: 'person'
  })))
}

const stripKeywords = (list) => list.map(({ keywords, ...item }) => item)
const splitByCategory = (list) => list.reduce(
  (carry, { category, char }) => ({
    ...carry,
    [category]: (carry[category] || []).concat(char)
  }),
  {}
)

getLibrary()
  .then((data) => {
    const mappedList = Object.values(data)
      .reduce(expandByFitzpatrickScale, [])

    return mappedList
  })
  .then(addPersonCategory)
  .then(stripKeywords)
  .then(splitByCategory)
  .then((list) => JSON.stringify(list, null, 2))
  .then(console.log)
