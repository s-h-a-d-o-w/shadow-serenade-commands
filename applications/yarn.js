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
  'end to end watch': async (api) => {
    await api.typeText('yarn e2e:watch')
    await api.pressKey('enter')
  },
})
