/**
 * This scripts generates a test suite
 * for the package using... the data generated
 * by itself.
 *
 * The goal here is to make sure that future changes
 * won't break the backwards compatibility.
 *
 * If this happens the package should be probably
 * updated to major version.
 *
 * This shouldn't be used to often.
 */

const faker = require('faker')
const toEmoji = require('..')

const testData = Array(100)
  .fill('')
  .map(() => {
    const email = faker.internet.email()
    return {
      string: email,
      char: toEmoji(email),
    }
  })

console.log(JSON.stringify(testData, null, 2))
