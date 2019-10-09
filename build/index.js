'use strict'

const library = require('emojilib/emojis.json')
const toolkit = require('emoji-toolkit')

const skinTonesList = Array(5).fill('').map((_, i) => `tone${i + 1}`)

const expandByFitzpatrickScale = (carry, item) => {
  const { fitzpatrick_scale: fitzpatrickScale, category, keywords, shortcode } = item
  const base = { category, keywords, shortcode }
  const updatedList = carry.concat([base])

  return (!fitzpatrickScale)
    ? updatedList
    : updatedList.concat(skinTonesList.map((tone) => ({
      ...base,
      shortcode: shortcode.replace(/:$/, `_${tone}:`)
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

const mapList = (list) => list.map(({ shortcode, keywords }) => ({
  shortcode,
  unicode: toolkit.shortnameToUnicode(shortcode),
  keywords
}))

const mapEmojilib = (data) => Object.keys(data)
  .map((name) => ({
    shortcode: `:${name}:`,
    ...data[name]
  }))
  .reduce(expandByFitzpatrickScale, [])

Promise.resolve(library)
  .then(mapEmojilib)
  .then(filterByCategory(['people']))
  .then(filterByKeywords(['female', 'male']))
  .then(rejectByKeywords(['fashion']))
  .then(mapList)
  .then((list) => JSON.stringify(list, null, 2))
  .then(console.log)
