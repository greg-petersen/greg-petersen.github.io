define(["./projectile", "./sprite", "../globals", "../constants"], (Projectile, Sprite, _globals, _constants) => {
  const { images } = _globals
  const { ALIEN_PROJECTILE_HEIGHT, ALIEN_PROJECTILE_WIDTH } = _constants

  return class AlienProjectile extends Projectile {
    constructor(id, x, y, direction) {
      super(
        id,
        x,
        y,
        ALIEN_PROJECTILE_WIDTH,
        ALIEN_PROJECTILE_HEIGHT,
        direction,
        false,
        new Sprite(images.get("alienProjectile"), 1, 0, 10, 32)
      )
    }
  }
})
