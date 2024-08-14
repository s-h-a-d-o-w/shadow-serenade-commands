// Various shell commands for both Linux and Windows.
// Usually no platform detection because of WSL.
const { addGlobalCommands } = require('../utils')

addGlobalCommands({
  'remove directory linux': async (api) => {
    await api.typeText('rm -rf ')
    await api.pressKey('enter')
  },
  'remove directory windows': async (api) => {
    await api.typeText('rmdir /S /Q ')
  },
})

if (require('../utils/consts').isWindows) {
  serenade.global().command('kill def tools', async (api) => {
    await api.runShell('taskkill', ['/fi', 'Windowtitle eq DevTools'])
  })
}
