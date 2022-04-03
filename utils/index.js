const pause = (duration) => {
  return new Promise((r) => setTimeout(r, duration))
}

module.exports = { pause }
