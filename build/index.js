'use strict'

const library = require('emojilib/emojis.json')
const skinTone = require('skin-tone')

const skinTonesList = ['white', 'creamWhite', 'lightBrown', 'brown', 'darkBrown']

const expandByFitzpatrickScale = (carry, item) => {
  const { fitzpatrick_scale: fitzpatrickScale, category, keywords, char } = item
  const base = { category, keywords, char }
  const updatedList = carry.concat([base])

  return (!fitzpatrickScale)
    ? updatedList
    : updatedList.concat(skinTonesList.map((tone) => ({
      ...base,
      char: skinTone(char, tone)
    })))
}

const filterByKeywords = (keywords) => (list) => list.filter((item) =>
  item.keywords.some((singleKeyword) => keywords.includes(singleKeyword))
)

const rejectByKeywords = (keywords) => (list) => list.filter((item) =>
  item.keywords.every((singleKeyword) => !keywords.includes(singleKeyword))
)

const filterByCategory = (categories) => (list) => list.filter(
  ({ category }) => categories.includes(category)
)

const mapList = (list) => list.map(({char}) => char)

const mapEmojilib = (data) => Object.values(data)
  .reduce(expandByFitzpatrickScale, [])

Promise.resolve(library)
  .then(mapEmojilib)
  .then(filterByCategory(['people']))
  .then(filterByKeywords(['female', 'male']))
  .then(rejectByKeywords(['fashion']))
  .then(mapList)
  .then(JSON.stringify)
  .then(console.log)
