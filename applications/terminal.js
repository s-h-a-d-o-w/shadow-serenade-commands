const { isWindows } = require('../utils/consts')

serenade.global().command('clear', async (api) => {
  if (isWindows) {
    await api.typeText('cls')
    await api.pressKey('enter')
  } else {
    await api.typeText('clear')
    await api.pressKey('enter')
  }
})
