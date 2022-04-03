const { addGlobalCommands } = require('../utils')

serenade.global().text('spread', '...')

addGlobalCommands({
  backticks: async (api) => {
    await api.typeText('``')
    await api.pressKey('left')
  },
  fence: async (api) => {
    await api.typeText('```\n\n```')
    await api.pressKey('left', [], 4)
  },
})
