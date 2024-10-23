const { isWindows } = require('../utils/consts')
const { addGlobalCommands, pause } = require('../utils')

addGlobalCommands({
  dict: async (api) => {
    await api.runCommand('dictation box')
    await api.runCommand('start dictating')
  },
  'double click': async (api) => {
    await api.click('left', 2)
  },
  'find <%text%>': async (api, matches) => {
    await api.pressKey('f', ['commandOrControl'])
    await new Promise((resolve) => setTimeout(resolve, 50))
    await api.typeText(matches.text)
  },
  'kill process': async (api) => {
    await api.pressKey('c', ['commandOrControl'])
    await api.pressKey('c', ['commandOrControl'])
    await pause(500)
    await api.pressKey('enter')
  },
  review: async (api) => {
    // Requires something like: https://gist.github.com/s-h-a-d-o-w/d1be4eb4ecad3576af8fa69c248be615
    await api.typeText('git pull && pm install && pm dev')
    await api.pressKey('enter')
  },
  // Currently doesn't work on Windows
  'select left': async (api) => {
    await api.pressKey('left', ['commandOrControl', 'shift'])
  },
  'select right': async (api) => {
    await api.pressKey('right', ['commandOrControl', 'shift'])
  },
  // Copy paste commands
  'native paste': async (api) => {
    // Since saying ctrl+v is often detected as ctrl+b
    await api.pressKey('v', ['commandOrControl'])
  },
  'replace paste': async (api) => {
    await api.pressKey('a', ['commandOrControl'])
    await api.pressKey('v', ['commandOrControl'])
  },
  'copy all': async (api) => {
    await api.pressKey('a', ['commandOrControl'])
    await api.pressKey('c', ['commandOrControl'])
  },
})

// Launch terminals in the predefined directories `dev` and `temp` on
// Linux (gnome-terminal) and Windows (wt).
const terminals = {
  def: 'dev',
  temp: 'temp',
}
const cleanEnvironment = Object.fromEntries(
  Object.entries(process.env).filter(
    ([name]) =>
      ![
        'CHROME_CRASHPAD_PIPE_NAME',
        'ELECTRON_RUN_AS_NODE',
        'NODE_ENV',
        'ORIGINAL_XDG_CURRENT_DESKTOP',
      ].includes(name)
  )
)
Object.entries(terminals).forEach(([command, path]) => {
  serenade.global().command(`terminal ${command}`, (api) => {
    if (isWindows) {
      api.runShell('wt', ['--title', path, '-d', `%userprofile%\\${path}`], {
        shell: true,
        env: cleanEnvironment,
      })
    } else {
      api.runShell(
        'gnome-terminal',
        [`--working-directory=${process.env.HOME}/${path}`],
        { env: cleanEnvironment }
      )
    }
  })

  serenade.global().command(`linux ${command}`, (api) => {
    if (isWindows) {
      api.runShell(
        'wt',
        [
          '--title',
          path,
          '--profile',
          'Ubuntu',
          '-d',
          `/home/%username%/${path}`,
        ],
        { shell: true, env: cleanEnvironment }
      )
    }
  })
})

// Audio device switching
const setAudioOutput = async (api, deviceId) => {
  if (isWindows) {
    await api.runShell('nircmdc', ['setdefaultsounddevice', `${deviceId}`])
  } else {
    const path = require('path')
    await api.runShell(
      path.join(__dirname, '../shell-scripts/audio.sh'),
      [deviceId],
      { shell: true }
    )
  }
}
serenade.global().command('headphones', async (api) => {
  if (isWindows) {
    // These names are the same as in Windows settings, where you can also rename devices.
    await setAudioOutput(api, 'Realtek HD Audio 2nd output')
  } else {
    // Get device ids by running the shell script above without an argument
    await setAudioOutput(api, 'alsa_output.pci-0000_00_1f.3.analog-stereo')
  }
})
serenade.global().command('speakers', async (api) => {
  if (isWindows) {
    await setAudioOutput(api, '2- USB Audio Device')
  } else {
    await setAudioOutput(
      api,
      'alsa_output.usb-C-Media_Electronics_Inc._USB_Audio_Device-00.analog-stereo'
    )
  }
})
