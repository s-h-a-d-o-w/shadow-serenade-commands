const shortcutMap = {
  wipe: ['backspace'],
}
Object.keys(shortcutMap).forEach((shortcut) => {
  serenade.global().command(shortcut, (api) => {
    api.pressKey.apply(null, shortcutMap[shortcut])
  })
})

serenade.global().command('slap', async (api) => {
  await api.pressKey('end')
  await api.pressKey('return')
})
