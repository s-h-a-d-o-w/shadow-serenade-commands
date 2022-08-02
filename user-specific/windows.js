if (require('../utils/consts').isWindows) {
  serenade.global().command('kill def tools', async (api) => {
    await api.runShell('taskkill', ['/fi', 'Windowtitle eq DevTools'])
  })
}
