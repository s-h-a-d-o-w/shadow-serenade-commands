if (require('../utils/consts').isWindows) {
  serenade.global().command('kee pass', (api) => {
    api.pressKey('k', ['control', 'alt'])
  })
}

serenade.app('keepass').command('copy user', (api) => {
  api.pressKey('b', ['control'])
})
