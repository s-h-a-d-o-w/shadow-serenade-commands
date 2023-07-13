const { addGlobalCommands } = require('../utils')

addGlobalCommands({
  def: async (api) => {
    await api.typeText('yarn dev')
    await api.pressKey('enter')
  },
  'end to end': async (api) => {
    await api.typeText('yarn e2e')
    await api.pressKey('enter')
  },
  'end to end build': async (api) => {
    await api.typeText('yarn e2e:build')
    await api.pressKey('enter')
  },
  'end to end watch': async (api) => {
    await api.typeText('yarn e2e:watch')
    await api.pressKey('enter')
  },
  'linux remove node modules': async (api) => {
    await api.typeText('rm -rf node_modules')
    await api.pressKey('enter')
  },
  'windows remove node modules': async (api) => {
    await api.typeText('rmdir /S /Q node_modules')
    await api.pressKey('enter')
  },
})
