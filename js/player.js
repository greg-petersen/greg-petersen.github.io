define(["./constants", "./models"], (_constants, _models) => {
  const { CANVAS_WIDTH } = _constants
  const { Player } = _models

  const player = new Player("player", 300, 700, 52, 32, null)

  const playerArea = {
    size: {
      height: 60,
      width: CANVAS_WIDTH
    },
    position: {
      x: 0,
      y: 700
    },
    color: "lightgreen"
  }

  return {
    playerArea,
    player
  }
})
