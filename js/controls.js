define(["./constants", "./player", "./globals"], (_constants, _player, _globals) => {
  const { KEYBOARD } = _constants
  const { player } = _player
  let { globalState } = _globals
  const doc = $(document)

  doc.keydown((e) => {
    if (!globalState.gameInProgress) {
      return
    }
    switch (e.keyCode) {
      case KEYBOARD.LEFT:
        player.input.LEFT = true
        break
      case KEYBOARD.RIGHT:
        player.input.RIGHT = true
        break
      case KEYBOARD.SPACEBAR:
        player.shoot()
        break
    }
  })

  doc.keyup((e) => {
    if (!globalState.gameInProgress) {
      return
    }
    switch (e.keyCode) {
      case KEYBOARD.LEFT:
        player.input.LEFT = false
        break
      case KEYBOARD.RIGHT:
        player.input.RIGHT = false
        break
    }
  })
})
