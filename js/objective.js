define(["./aliens", "./player"], (_aliens, _player) => {
  const { aliens } = _aliens
  const { player } = _player

  const checkIfGameOver = () => {
    if (aliens.length === 0) {
      console.log("Game Over - Player Wins")
      return true
    } else if (player.isDead) {
      console.log("Game Over - Aliens Win")
      return true
    }

    return false
  }

  return {
    checkIfGameOver
  }
})
