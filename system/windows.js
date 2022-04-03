if (require('../utils/consts').isWindows) {
  serenade.global().command('emoji', (api) => {
    api.pressKey('.', ['windows'])
  })

  serenade.global().command('screenshot', (api) => {
    api.pressKey('S', ['windows'])
  })

  // Window resizing
  const ffi = require('ffi-napi')
  const ref = require('ref-napi')
  const StructType = require('ref-struct-di')(ref)

  const RectStruct = StructType({
    left: ffi.types.long,
    top: ffi.types.long,
    right: ffi.types.long,
    bottom: ffi.types.long,
  })

  const user32 = ffi.Library('user32', {
    GetForegroundWindow: ['int32', []],
    GetWindowRect: ['int32', ['int32', ref.refType(RectStruct)]],
    MoveWindow: ['bool', ['int32', 'int32', 'int32', 'int32', 'int32', 'bool']],
    SetWindowPos: [
      'int32',
      ['int32', 'int32', 'int32', 'int32', 'int32', 'int32', 'int32'],
    ],
    ShowWindow: ['bool', ['int32', 'int32']],
  })
  const SW_RESTORE = 9

  serenade.global().command('dimensions', async (api) => {
    const rect = new RectStruct()
    const handle = user32.GetForegroundWindow()
    user32.GetWindowRect(handle, rect.ref())
    await api.typeText(JSON.stringify(rect))
  })

  serenade.global().command('reset window', async (api) => {
    const withoutPadding = ['code.exe']
    const target = { left: 0, top: 0, right: 1510, bottom: 1043 }
    const margin = 8

    const handle = user32.GetForegroundWindow()
    // api.runShell("msg", ["sh4dow", handle])
    const activeApplication = await api.getActiveApplication()
    user32.ShowWindow(handle, SW_RESTORE)
    if (
      withoutPadding.some((application) =>
        activeApplication.includes(application)
      )
    ) {
      user32.SetWindowPos(
        handle,
        0,
        target.left,
        target.top,
        target.right,
        target.bottom,
        0x0200
      )
    } else {
      user32.SetWindowPos(
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
