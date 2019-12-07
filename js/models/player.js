define([
  "../constants",
  "../projectiles",
  "./playerProjectile",
  "../sounds",
  "./moveableObject",
  "../globals",
  "./sprite"
], (_constants, _projectiles, PlayerProjectile, _sounds, MoveableObject, _globals, Sprite) => {
  const { DIRECTION, CANVAS_WIDTH, PLAYER_PROJECTILE_WIDTH, PLAYER_PROJECTILE_HEIGHT } = _constants
  const { projectiles, playerCanShoot, getNextProjectileId } = _projectiles
  const { shoot: shoot_sound } = _sounds
  const { gameObjects, images } = _globals

  return class Player extends MoveableObject {
    constructor(id, x, y, h, w, sprite) {
      super(id, x, y, h, w, sprite)
      this.isFiring = false

      this.input = {
        RIGHT: false,
        LEFT: false
      }

      this.moveRight = () => {
        this.updateLastPosition()
        this.position.x += 5
        this.requiresUpdate = true
      }

      this.moveLeft = () => {
        this.updateLastPosition()
        this.position.x -= 5
        this.requiresUpdate = true
      }

      this.canMoveRight = () => {
        return this.position.x + this.size.width < CANVAS_WIDTH - 50
      }

      this.canMoveLeft = () => {
        return this.position.x > 50
      }

      this.shoot = () => {
        if (playerCanShoot()) {
          let projectile = new PlayerProjectile(
            `Projectile-${getNextProjectileId()}`,
            this.position.x + this.size.width / 2 - PLAYER_PROJECTILE_WIDTH / 2,
            this.position.y - PLAYER_PROJECTILE_HEIGHT,
            DIRECTION.UP
          )
          projectiles.push(projectile)
          gameObjects.set(projectile.id, projectile)
          shoot_sound.play()
        }
      }

      this.checkInput = () => {
        if (!this.isDead && !this.isDying) {
          if (this.input.RIGHT && this.canMoveRight()) {
            this.moveRight()
          } else if (this.input.LEFT && this.canMoveLeft()) {
            this.moveLeft()
          }
        }
      }

      this.die = () => {
        this.requiresUpdate = true
        this.isDying = true
        this.clear()
        this.size = { width: 60, height: 32 }
        this.sprite = new Sprite(images.get("playerDeath"), 4, 32, 240, 128)
      }
    }
  }
})
