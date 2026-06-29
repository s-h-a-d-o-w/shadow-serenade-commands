/* eslint-disable no-inner-declarations */
if (require('../utils/consts').isLinux) {
  async function getExtents(api, kind) {
    const { stdout } = await api.runShell(
      'xprop',
      ['-id', '`xdotool getwindowfocus`', `_${kind}_FRAME_EXTENTS`],
      { shell: true }
    )

    if (typeof stdout === 'string' && stdout.includes(' = ')) {
      const [, extents] = stdout.split(' = ')
      const [left, right, top, bottom] = extents.split(', ').map((extent) => {
        return parseInt(extent.trim())
      })
      return { left, right, top, bottom }
    }
    return { left: 0, right: 0, top: 0, bottom: 0 }
  }

  const { addGlobalCommands } = require('../utils')

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
    const targetDimensions = { left: 0, top: 0, width: 1550, height: 1043 }

    const netExtents = await getExtents(api, 'NET')
    const gtkExtents = await getExtents(api, 'GTK')

    targetDimensions.left = targetDimensions.left - gtkExtents.left
    targetDimensions.top = targetDimensions.top - gtkExtents.top
    targetDimensions.width =
      targetDimensions.width + gtkExtents.left + gtkExtents.right
    targetDimensions.height =
      targetDimensions.height + gtkExtents.top + gtkExtents.bottom

    targetDimensions.width =
      targetDimensions.width - netExtents.left - netExtents.right
    targetDimensions.height =
      targetDimensions.height - netExtents.top - netExtents.bottom

    // await api.typeText(JSON.stringify({ netExtents }))
    // await api.typeText(JSON.stringify({ gtkExtents }))
    // await api.typeText(JSON.stringify({ targetDimensions }) + '\n')

    await api.runShell(
      'wmctrl',
      [
        '-i',
        '-r',
        '`xdotool getwindowfocus`',
        '-b',
        'remove,maximized_vert,maximized_horz',
      ],
      { shell: true }
    )
    await api.runShell(
      'wmctrl',
      [
        '-i',
        '-r',
        '`xdotool getwindowfocus`',
        '-e',
        `0,${targetDimensions.left},${targetDimensions.top},${targetDimensions.width},${targetDimensions.height}`,
      ],
      { shell: true }
    )
  })
}
