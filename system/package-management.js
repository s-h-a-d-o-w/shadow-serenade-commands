const { addGlobalCommands } = require('../utils')

// Requires something like: https://gist.github.com/s-h-a-d-o-w/d1be4eb4ecad3576af8fa69c248be615
const argumentMap = {
  build: 'build',
  def: 'dev',
  'end to end': 'e2e',
  'end to end build': 'e2e:build',
  'end to end watch': 'e2e:watch',
  install: 'install',
  lint: 'lint',
  start: 'start',
  test: 'test',
}
Object.keys(argumentMap).forEach((argument) => {
  serenade.global().command(argument, async (api) => {
    await api.typeText('pm ' + argumentMap[argument])
    await api.pressKey('enter')
  })
})

addGlobalCommands({
  approve: async (api) => {
    // Used by pnpm, not sure about others.
    await api.typeText('pm approve-builds')
    await api.pressKey('enter')
    await api.pressKey('a')
    await api.pressKey('enter')
    // We don't hit "y" automatically because I think that would be a step too far security-wise.
  },
  'remove node modules linux': async (api) => {
    await api.typeText('rm -rf node_modules')
    await api.pressKey('enter')
  },
  'remove node modules windows': async (api) => {
    await api.typeText('rmdir /S /Q node_modules')
    await api.pressKey('enter')
  },
})
