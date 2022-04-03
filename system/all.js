const { isWindows } = require('../utils/consts')
const { pause } = require('../utils')

serenade.global().command('find <%text%>', async (api, matches) => {
  await api.pressKey('f', ['commandOrControl'])
  await new Promise((resolve) => setTimeout(resolve, 50))
  await api.typeText(matches.text)
})

serenade.global().command('dict', async (api) => {
  await api.runCommand('dictation box')
  await api.runCommand('start dictating')
})

serenade.global().command('double click', async (api) => {
  await api.click('left', 2)
})

serenade.global().command('raw paste', async (api) => {
  await api.pressKey('v', ['commandOrControl'])
})

serenade.global().command('replace paste', async (api) => {
  await api.pressKey('a', ['commandOrControl'])
  await api.pressKey('v', ['commandOrControl'])
})

serenade.global().command('copy all', async (api) => {
  await api.pressKey('a', ['commandOrControl'])
  await api.pressKey('c', ['commandOrControl'])
})

serenade.global().command('kill', async (api) => {
  await api.pressKey('c', ['commandOrControl'])
  await api.pressKey('c', ['commandOrControl'])
  await pause(500)
  await api.pressKey('enter')
})

serenade.global().command('review', async (api) => {
  await api.typeText('git pull && yarn && yarn dev')
  await api.pressKey('enter')
})

// Currently doesn't work on Windows
serenade.global().command('select left', async (api) => {
  await api.pressKey('left', ['commandOrControl', 'shift'])
})

serenade.global().command('select right', async (api) => {
  await api.pressKey('right', ['commandOrControl', 'shift'])
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
