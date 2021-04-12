define(["../constants", "./moveableObject"], (_constants, MoveableObject) => {
  const { DIRECTION, CANVAS_HEIGHT } = _constants

  return class Projectile extends MoveableObject {
    constructor(id, x, y, w, h, direction, isPlayers, sprite) {
      super(id, x, y, w, h, sprite)
      this.direction = direction
      // TODO: Refactor to not be a boolean, but be a TypedEnum for owner
      this.isPlayers = isPlayers

      this.isVisible = () => {
        if (this.position.y + this.size.height < 0) {
          return false
        } else if (this.position.y > CANVAS_HEIGHT) {
          return false
        } else {
          return true
        }
      }

      this.move = () => {
        if (this.direction === DIRECTION.DOWN) {
          this.updateLastPosition()
          this.position.y += 8
          this.requiresUpdate = true
        } else if (this.direction === DIRECTION.UP) {
          this.updateLastPosition()
          this.position.y -= 8
          this.requiresUpdate = true
        }
      }
    }
  }
})
