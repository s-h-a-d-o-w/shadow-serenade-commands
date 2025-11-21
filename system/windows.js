if (require('../utils/consts').isWindows) {
  const { addGlobalCommands } = require('../utils')

  addGlobalCommands({
    emoji: (api) => {
      api.pressKey('.', ['windows'])
    },
    screenshot: (api) => {
      api.pressKey('S', ['windows'])
    },
  })

  const koffi = require('koffi')

  const RectStruct = koffi.struct({
    left: 'long',
    top: 'long',
    right: 'long',
    bottom: 'long',
  })

  const user32 = koffi.load('user32.dll')
  const GetForegroundWindow = user32.func('GetForegroundWindow', 'int32', [])
  const GetWindowRect = user32.func('GetWindowRect', 'int32', [
    'int32',
    koffi.out(koffi.pointer(RectStruct)),
  ])
  const SetWindowPos = user32.func('SetWindowPos', 'int32', [
    'int32',
    'int32',
    'int32',
    'int32',
    'int32',
    'int32',
    'int32',
  ])
  const ShowWindow = user32.func('ShowWindow', 'bool', ['int32', 'int32'])

  const SW_RESTORE = 9

  // Used for investigation/debugging
  serenade.global().command('dimensions', async (api) => {
    const rect = {}
    const handle = GetForegroundWindow()
    GetWindowRect(handle, rect)
    await api.typeText(JSON.stringify(rect))
  })

  serenade.global().command('reset window', async (api) => {
    const withoutPadding = ['code.exe']
    const target = { left: 0, top: 0, right: 1510, bottom: 1043 }
    const margin = 8

    const handle = GetForegroundWindow()
    const activeApplication = await api.getActiveApplication()
    ShowWindow(handle, SW_RESTORE)
    if (
      withoutPadding.some((application) =>
        activeApplication.includes(application)
      )
    ) {
      SetWindowPos(
        handle,
        0,
        target.left,
        target.top,
        target.right,
        target.bottom,
        0x0200
      )
    } else {
      SetWindowPos(
        handle,
        0,
        target.left - margin,
        target.top,
        target.right + margin * 2,
        target.bottom + margin,
        0x0200
      )
    }
  })
}
