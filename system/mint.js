if (require('../utils/consts').isLinux) {
  const { addGlobalCommands } = require('../utils')
  const { pause } = require('../utils')
  
  const shortcuts = {
    emoji: ['.', ['control']],
    screenshot: ['print', ['shift']],
    exit: ['f4', ['alt']],
    minimize: ['m', ['windows']],
    'terminal copy': ['c', ['control', 'shift']],
    'terminal paste': ['v', ['control', 'shift']],
  }
  Object.keys(shortcuts).forEach((shortcut) => {
    serenade.global().command(shortcut, (api) => {
      api.pressKey.apply(null, shortcuts[shortcut])
    })
  })

  addGlobalCommands({
    sudo: async (api) => {
      await api.typeText('sudo ')
    },
  })

  // Window resizing
  serenade.global().command('reset window', async (api) => {
    await api.runShell(
      'wmctrl',
      ['-i', '-r', '`xdotool getwindowfocus`', '-b', 'remove,maximized_vert,maximized_horz'],
      { shell: true }
    )
    await api.runShell(
      'wmctrl',
      ['-i', '-r', '`xdotool getwindowfocus`', '-e', '0,0,0,1540,1040'],
      { shell: true }
    )
  })
}
