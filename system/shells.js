// Various shell commands for both Linux and Windows.
// Usually no platform detection because of WSL.
const { addGlobalCommands } = require('../utils')
const { isWindows } = require('../utils/consts')

addGlobalCommands({
  'rem deer': async (api) => {
    if (isWindows) {
      await api.typeText('Remove-Item -Recurse -Force ')
    } else {
      await api.typeText('rm -rf ')
    }
  },
  'rem deer linux': async (api) => {
    await api.typeText('rm -rf ')
  },
  'rem deer power': async (api) => {
    await api.typeText('Remove-Item -Recurse -Force ')
  },
  'rem deer windows': async (api) => {
    await api.typeText('rmdir /S /Q ')
  },
})

if (require('../utils/consts').isWindows) {
  serenade.global().command('kill def tools', async (api) => {
    await api.runShell('taskkill', ['/fi', 'Windowtitle eq DevTools'])
  })
}
