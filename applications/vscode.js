const { pause } = require('../utils')

// Shortcuts
// ==========================
const codeShortcutMap = {
  bookmark: ['k', ['commandOrControl', 'shift']], // requires bookmark extension and changing its shortcut
  definition: ['f12'],
  hover: ['h', ['alt']],
  references: ['f12', ['alt', 'shift']],
  'format document': ['f', ['alt', 'option', 'shift']],
  'organize imports': ['o', ['alt', 'shift']],
  'word wrap': ['z', ['alt']],
}
Object.keys(codeShortcutMap).forEach((shortcut) => {
  serenade.app('code').command(shortcut, async (api) => {
    await api.pressKey(...codeShortcutMap[shortcut])
  })
})

// Palette commands
// ==========================
async function runPaletteCommand(api, command) {
  await api.pressKey('p', ['commandOrControl', 'shift'])
  await pause(0)
  await api.typeText(command)
  await api.pressKey('enter')
}

const paletteCommandMap = {
  'file references': 'typescript.findAllFileReferences',
  'restart task': 'workbench.action.tasks.restartTask',
  'restart typescript': 'typescript.restartTsServer',
}
Object.keys(paletteCommandMap).forEach((key) => {
  serenade.app('code').command(key, async (api) => {
    await runPaletteCommand(api, paletteCommandMap[key])
  })
})

serenade
  .app('code')
  .command('snippet <%snippetName%>', async (api, matches) => {
    await runPaletteCommand(api, 'editor.action.insertSnippet')
    await pause(0)
    await api.typeText(matches.snippetName)
    await api.pressKey('enter')
  })
