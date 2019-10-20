const lib = require('./emojilib.json')

/**
 * Create numerical hash of the string
 *
 * Slightly modified version of @see https://stackoverflow.com/a/7616484
 *
 * @param {String} str
 * @return {Number} 32bit integer. Might be a negative number.
 */
const hash = (str) => {
  let hash = 0

  if (str.length === 0) return hash

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }

  return hash
}

/**
 * Create an emoji face using the given string
 *
 * @param {String} input The input string
 * @return {String}
 */
const munci = (string) => {
  const stringHash = Math.abs(hash(string))
  return lib[stringHash % lib.length]
}

module.exports = munci
