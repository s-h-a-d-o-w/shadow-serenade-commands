const addGlobalCommands = (commands) => {
  Object.keys(commands).forEach((phrase) => {
    serenade.global().command(phrase, commands[phrase])
  })
}

const pause = (duration) => {
  return new Promise((r) => setTimeout(r, duration))
}

module.exports = { addGlobalCommands, pause }
