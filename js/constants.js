define(["./canvas"], (_canvas) => {
  const { canvasElement } = _canvas

  return {
    KEYBOARD: {
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
      SPACEBAR: 32,
      A: 65,
      S: 83,
      D: 68,
      F: 70
    },
    DIRECTION: {
      UP: 1,
      DOWN: 2,
      LEFT: 3,
      RIGHT: 4
    },
    CANVAS_HEIGHT: canvasElement.height / 2,
    CANVAS_WIDTH: canvasElement.width / 2,
    PLAYER_PROJECTILE_HEIGHT: 20,
    PLAYER_PROJECTILE_WIDTH: 4,
    ALIEN_PROJECTILE_HEIGHT: 16,
    ALIEN_PROJECTILE_WIDTH: 10
  }
})
