const { addGlobalCommands } = require('../utils')

// Requires something like: https://gist.github.com/s-h-a-d-o-w/d1be4eb4ecad3576af8fa69c248be615
const argumentMap = {
  build: 'build',
  def: 'dev',
  'end to end': 'e2e',
  'end to end build': 'e2e:build',
  'end to end watch': 'e2e:watch',
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
  'linux remove node modules': async (api) => {
    await api.typeText('rm -rf node_modules')
    await api.pressKey('enter')
  },
  'windows remove node modules': async (api) => {
    await api.typeText('rmdir /S /Q node_modules')
    await api.pressKey('enter')
  },
})
