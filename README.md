# 🖤💛 Mùnči

## Installation

```
npm i @baethon/munci
```

## About

Mùnči is a simple one-way hash function which transforms given string to an emoji face. Package uses emoji set including people with all genders and skin tones.

Due to limited number of emojis it's highly possible that resulting emoji will be generated also for different string values.

Possible use cases:
- logging stream (like... Slack!) when one needs to identify quickly a user
- simplified avatar system

## Usage

Package exports one function, which accepts a string value. There's no way to filter the set of emojis by gender or skin tone so it's possible that it will return weird results :)

```js
const munci = require('@baethon/munci')

const userAvatar = munci('Jon Snow')
```

## Testing

```
yarn test
```

## Building

Package uses emojis set provided by [emojilib](https://github.com/muan/emojilib). To reload/refresh it use:

```
yarn build
```

## Credits

- [emojilib](https://github.com/muan/emojilib)
- [skin-tone](https://github.com/sindresorhus/skin-tone)
