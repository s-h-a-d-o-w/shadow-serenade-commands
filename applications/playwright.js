const { pause } = require('../utils')

serenade.global().command('trace', async (api) => {
  await api.typeText('playwright show-trace trace.zip')
  await api.pressKey('enter')
  await pause(2000)
  await api.runCommand('reset window')
})
