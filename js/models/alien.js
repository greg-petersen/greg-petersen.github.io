define(["../constants", "./moveableObject"], (_constants, MoveableObject) => {
  const { DIRECTION, CANVAS_WIDTH } = _constants

  return class Alien extends MoveableObject {
    constructor(id, x, y, width, height, sprite, direction) {
      super(id, x, y, width, height, sprite)
      this.directionMoving = direction

      this.moveRight = () => {
        this.updateLastPosition()
        this.directionMoving = DIRECTION.RIGHT
        this.position.x += 10
        this.requiresUpdate = true
      }

      this.moveLeft = () => {
        this.updateLastPosition()
        this.directionMoving = DIRECTION.LEFT
        this.position.x -= 10
        this.requiresUpdate = true
      }

      this.moveDown = () => {
        this.position.y += 60
        this.requiresUpdate = true
      }

      this.canMoveRight = () => {
        return this.position.x + this.size.width < CANVAS_WIDTH
      }

      this.canMoveLeft = () => {
        return this.position.x > 0
      }

      this.die = () => {
        this.requiresUpdate = true
        this.isDying = true
        // this.
      }
    }
  }
})
