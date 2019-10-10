'use strict'

/* global describe, it */

const { expect } = require('chai')
const toolkit = require('emoji-toolkit')
const toEmoji = require('..')
const testSuite = require('./test_suite.json')

describe('string-to-emoji', () => {
  const testString = 'john@acme.com'

  it('converts string to emoji', () => {
    const emoji = toEmoji(testString)
    const shortcode = toEmoji.shortcode(testString)

    // When toShort() receives non-emoji it won't be able
    // to convert it to shortcode. This simple check
    // should be enough to determine if we received
    // the actual emoji.
    expect(toolkit.toShort(emoji)).to.equal(shortcode)
  })

  it('returns same emoji for given string', () => {
    expect(toEmoji(testString)).to.equal(toEmoji(testString))
  })

  describe('Integration tests', () => {
    testSuite.forEach(({string, unicode, shortcode}, i) => {
      it(`Passes test suite #${i + 1}`, () => {
        expect(toEmoji(string)).to.equal(unicode)
        expect(toEmoji.shortcode(string)).to.equal(shortcode)
      })
    })
  })
})
