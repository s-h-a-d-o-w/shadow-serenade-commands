const { pause } = require('../utils')

const codeShortcutMap = {
  bookmark: ['k', ['commandOrControl', 'shift']], // requires bookmark extension and changing its shortcut
  definition: ['f12'],
  'find references': ['f12', ['alt', 'shift']],
  'format document': ['f', ['alt', 'option', 'shift']],
  'organize imports': ['o', ['alt', 'shift']],
  'word wrap': ['z', ['alt']],
}
Object.keys(codeShortcutMap).forEach((shortcut) => {
  serenade.app('code').command(shortcut, (api) => {
    api.pressKey.apply(null, codeShortcutMap[shortcut])
  })
})

async function runPaletteCommand(api, command) {
  await api.pressKey('p', ['commandOrControl', 'shift'])
  await pause(0)
  await api.typeText(command)
  await api.pressKey('enter')
}

serenade
  .app('code')
  .command('snippet <%snippetName%>', async (api, matches) => {
    await runPaletteCommand(api, 'editor.action.insertSnippet')
    await pause(0)
    await api.typeText(matches.snippetName)
    await api.pressKey('enter')
  })

serenade.app('code').command('restart typescript', async (api) => {
  await runPaletteCommand(api, 'typescript.restartTsServer')
})
