define(["../constants", "./moveableObject", "../globals", "./sprite"], (
  _constants,
  MoveableObject,
  _globals,
  Sprite
) => {
  const { DIRECTION, CANVAS_WIDTH } = _constants
  const { images } = _globals

  return class Spaceship extends MoveableObject {
    constructor(id, x, y, width, height, direction) {
      const sprite = new Sprite(images.get("alienSpaceShip"), 1, 0, 256, 128)
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
        this.clear()
        this.sprite = new Sprite(images.get("alienDeath"), 4, 32, 240, 112)
      }
    }
  }
})
