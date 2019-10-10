'use strict'

/* global describe, it */

const { expect } = require('chai')
const emojiRegex = require('emoji-regex')
const toEmoji = require('..')
const testSuite = require('./test_suite.json')

describe('string-to-emoji', () => {
  const testString = 'john@acme.com'
  const regex = emojiRegex()

  it('converts string to emoji', () => {
    const emoji = toEmoji(testString)

    expect(regex.test(emoji)).to.equal(true)

    // make sure that function returned only the emoji
    expect(emoji.replace(regex, '')).to.equal('')
  })

  it('returns same emoji for given string', () => {
    expect(toEmoji(testString)).to.equal(toEmoji(testString))
  })

  describe('Integration tests', () => {
    testSuite.forEach(({ string, char }, i) => {
      it(`Passes test suite #${i + 1}`, () => {
        expect(toEmoji(string)).to.equal(char)
      })
    })
  })
})
