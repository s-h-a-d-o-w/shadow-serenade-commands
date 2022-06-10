const { isMac } = require('../utils/consts')

const mappedSpecialKeys = {
  'alt tab': ['tab', ['alt']],
  ampersand: ['&'],
  at: ['@'],
  bang: ['!'],
  backtick: ['`'],
  backslash: ['\\'],
  colon: [':'],
  comma: [','],
  dash: ['-'],
  dot: ['.'],
  'double quote': ['"'],
  end: ['end'],
  equals: ['='],
  'exclamation point': ['!'],
  'greater than': ['>'],
  hash: ['#'],
  home: ['home'],
  'left brace': ['{'],
  'left bracket': ['['],
  'less than': ['<'],
  minus: ['-'],
  percent: ['%'],
  period: ['.'],
  pipe: ['|'],
  plus: ['+'],
  'question mark': ['?'],
  quote: ['"'],
  'right brace': ['}'],
  'right bracket': [']'],
  semi: [';'],
  star: ['*'],
  'single quote': ["'"],
  slash: ['/'],
  switch: ['tab', ['alt']],
  tilde: ['~'],
  times: ['*'],
  toggle: ['tab', ['control']],
  underscore: ['_'],
}
Object.keys(mappedSpecialKeys).forEach((shortcut) => {
  serenade.global().command(shortcut, (api) => {
    api.pressKey.apply(null, mappedSpecialKeys[shortcut])
  })
})

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
alphabet.forEach((character) => {
  if (isMac) {
    serenade.global().command('command ' + character, (api) => {
      api.pressKey(character, ['command'])
    })
  } else {
    serenade.global().command('control ' + character, (api) => {
      api.pressKey(character, ['control'])
    })
  }
})

const fnKeys = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
]
fnKeys.forEach((fnKey, index) => {
  serenade.global().command('f ' + fnKey, (api) => {
    api.pressKey('f' + (index + 1))
  })
})
