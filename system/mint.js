if (require('../utils/consts').isLinux) {
  const shortcuts = {
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

  // Emoji
  const { moveMouse } = require('./mouse')
  const { pause } = require('../utils')
  serenade.global().command('emoji', async (api) => {
    await api.runCommand('focus xed')
    await pause(10)
    await api.setMouseLocation(1920 / 2, 1080 / 2)
    await api.click('right')
    await moveMouse(api, 50, 240)
    await api.click()
  })

  // Window resizing
  serenade.global().command('reset window', async (api) => {
    await api.runShell(
      'wmctrl',
      ['-i', '-r', '`xdotool getwindowfocus`', '-e', '0,380,0,1540,1000'],
      { shell: true }
    )
  })

  // Audio device switching
  const setAudioOutput = async (api, deviceId) => {
    const path = require('path')
    await api.runShell(
      path.join(__dirname, '../shell-scripts/audio.sh'),
      [deviceId],
      { shell: true }
    )
  }
  serenade.global().command('headphones', async (api) => {
    // Get these device ids by running the shell script above without an argument
    await setAudioOutput(api, 'alsa_output.pci-0000_00_1f.3.analog-stereo')
  })
  serenade.global().command('speakers', async (api) => {
    await setAudioOutput(
      api,
      'alsa_output.usb-C-Media_Electronics_Inc._USB_Audio_Device-00.analog-stereo'
    )
  })

  // Media keys
  const generateMediaCommand = (command) => [
    'xdotool',
    ['key', '--clearmodifiers', command],
  ]
  serenade.global().command('media mute', async (api) => {
    await api.runShell.apply(null, generateMediaCommand('XF86AudioMute'))
  })
  serenade.global().command('media next', async (api) => {
    await api.runShell.apply(null, generateMediaCommand('XF86AudioNext'))
  })
  serenade.global().command('media pause', async (api) => {
    await api.runShell.apply(null, generateMediaCommand('XF86AudioPlay'))
  })
  serenade.global().command('media play', async (api) => {
    await api.runShell.apply(null, generateMediaCommand('XF86AudioPlay'))
  })
  serenade.global().command('media previous', async (api) => {
    await api.runShell.apply(null, generateMediaCommand('XF86AudioPrev'))
  })
}
