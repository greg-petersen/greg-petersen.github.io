define(["./projectile", "./sprite", "../globals", "../constants"], (Projectile, Sprite, _globals, _constants) => {
  const { images } = _globals
  const { PLAYER_PROJECTILE_WIDTH, PLAYER_PROJECTILE_HEIGHT } = _constants

  return class PlayerProjectile extends Projectile {
    constructor(id, x, y, direction) {
      super(
        id,
        x,
        y,
        PLAYER_PROJECTILE_WIDTH,
        PLAYER_PROJECTILE_HEIGHT,
        direction,
        true,
        new Sprite(images.get("playerProjectile"), 1, 0, 4, 20)
      )
    }
  }
})
