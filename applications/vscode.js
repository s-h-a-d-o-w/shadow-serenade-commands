const { pause } = require('../utils')

const codeApp = serenade.app('code')

// Shortcuts
// ==========================
const codeShortcutMap = {
  bookmark: ['k', ['commandOrControl', 'shift']], // requires bookmark extension and changing its shortcut
  definition: ['f12'],
  fix: ['.', ['commandOrControl']],
  hover: ['h', ['alt']],
  references: ['f12', ['alt', 'shift']],
  'format document': ['f', ['alt', 'option', 'shift']],
  'organize imports': ['o', ['alt', 'shift']],
  'word wrap': ['z', ['alt']],
}
Object.keys(codeShortcutMap).forEach((shortcut) => {
  codeApp.command(shortcut, async (api) => {
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
  codeApp.command(key, async (api) => {
    await runPaletteCommand(api, paletteCommandMap[key])
  })
})

codeApp.command('snippet <%snippetName%>', async (api, matches) => {
  await runPaletteCommand(api, 'editor.action.insertSnippet')
  await pause(0)
  await api.typeText(matches.snippetName)
  await api.pressKey('enter')
})

// Copilot commands (cursor has to be in copilot prompt input)
const KEY_PRESS_DELAY = 100
codeApp.command('ai code base', async (api) => {
  for (const key of ['#', 'c', 'enter']) {
    await api.pressKey(key)
    await pause(KEY_PRESS_DELAY)
  }
})

codeApp.command('ai file', async (api) => {
  for (const key of ['#', 'f', 'enter', 'enter']) {
    await api.pressKey(key)
    await pause(KEY_PRESS_DELAY)
  }
})

codeApp.command('ai selection', async (api) => {
  for (const key of ['#', 's', 'enter']) {
    await api.pressKey(key)
    await pause(KEY_PRESS_DELAY)
  }
})
