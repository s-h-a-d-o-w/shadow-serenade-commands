const names = { nature: 'Nizar' }
Object.keys(names).forEach((name) => {
  serenade.global().command(`name ${name}`, (api) => {
    api.typeText(names[name])
  })
})
