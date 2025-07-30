const { addGlobalCommands } = require('../utils')

addGlobalCommands({
  amend: async (api) => {
    await api.typeText('git commit --amend')
    await api.pressKey('enter')
  },
  'amend no verify': async (api) => {
    await api.typeText('git commit --amend --no-verify')
    await api.pressKey('enter')
  },
  'change origin': async (api) => {
    await api.typeText('git remote set-url origin ')
  },
  clone: async (api) => {
    await api.typeText('git clone ')
  },
  'clone flat': async (api) => {
    await api.typeText('git clone --depth=1 ')
  },
  commit: async (api) => {
    await api.typeText('git commit')
    await api.pressKey('enter')
  },
  'commit no verify': async (api) => {
    await api.typeText('git commit --no-verify')
    await api.pressKey('enter')
  },
  move: async (api) => {
    await api.typeText('git mv ')
  },
  pull: async (api) => {
    await api.typeText('git pull')
    await api.pressKey('enter')
  },
  push: async (api) => {
    await api.typeText('git push')
    await api.pressKey('enter')
  },
  'push force': async (api) => {
    await api.typeText('git push --force')
    await api.pressKey('enter')
  },
  'push tags': async (api) => {
    await api.typeText('git push --tags')
    await api.pressKey('enter')
  },
  'reset origin <%branchName%>': async (api, matches) => {
    await api.typeText(`git reset --hard origin/${matches.branchName}`)
  },
  'reset soft': async (api) => {
    await api.typeText(`git reset --soft HEAD~1`)
  },
  'reset soft <%count%>': async (api, matches) => {
    await api.typeText(`git reset --soft HEAD~${matches.count}`)
  },
  'squash <%count%>': async (api, matches) => {
    await api.typeText(`git rebase -i HEAD~${matches.count}`)
    await api.pressKey('enter')
  },
})
