const { addGlobalCommands } = require('../utils')

addGlobalCommands({
  pull: async (api) => {
    await api.typeText('git pull')
    await api.pressKey('enter')
  },
  push: async (api) => {
    await api.typeText('git push')
    await api.pressKey('enter')
  },
  'push force': async (api) => {
    await api.typeText('git push --force')
    await api.pressKey('enter')
  },
  commit: async (api) => {
    await api.typeText('git commit')
    await api.pressKey('enter')
  },
  'commit no verify': async (api) => {
    await api.typeText('git commit --no-verify')
    await api.pressKey('enter')
  },
  amend: async (api) => {
    await api.typeText('git commit --amend')
    await api.pressKey('enter')
  },
  'amend no verify': async (api) => {
    await api.typeText('git commit --amend --no-verify')
    await api.pressKey('enter')
  },
  move: (api) => {
    api.typeText('git mv ')
  },
})
