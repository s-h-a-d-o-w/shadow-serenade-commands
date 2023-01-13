// Requires: https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid/related?hl=en
serenade.app('chrome').command('refresh extension', async (api) => {
  await api.pressKey('r', ['alt', 'shift'])
})
