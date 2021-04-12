define(["../canvas"], (_canvas) => {
  const { canvasContext } = _canvas

  return class GameObject {
    constructor(id, x, y, width, height, sprite) {
      this.id = id
      this.position = { x, y }
      this.size = { width, height }
      this.sprite = sprite
      this.requiresUpdate = true
      this.isDead = false
      this.isDying = false
      this.deathCount = 0

      this.lastPosition = { x: this.position.x, y: this.position.y }

      this.updateLastPosition = () => {
        this.lastPosition = { x: this.position.x, y: this.position.y }
      }

      this.die = () => {
        this.requiresUpdate = true
        this.isDead = true
      }

      this.draw = () => {
        let frame = this.sprite.getFrame()
        canvasContext.drawImage(
          this.sprite.image,
          // Not sure if this will work
          frame.sx,
          frame.sy,
          frame.sWidth,
          frame.sHeight,
          this.position.x,
          this.position.y,
          this.size.width,
          this.size.height
        )
        this.requiresUpdate = false
      }

      this.clear = () => {
        canvasContext.clearRect(this.position.x, this.position.y, this.size.width, this.size.height)
        this.requiresUpdate = false
      }

      this.clearLastPosition = () => {
        canvasContext.clearRect(this.lastPosition.x, this.lastPosition.y, this.size.width + 1, this.size.height + 1)
        this.requiresUpdate = false
      }

      this.reDraw = () => {
        this.clearLastPosition()
        this.draw()
      }

      this.update = () => {
        if (this.requiresUpdate) {
          if (this.isDead) {
            this.clear()
          } else {
            this.reDraw()
          }
        } else if (this.isDying) {
          // TODO: pull '3' into constants
          if (this.deathCount >= (this.sprite.frames - 1) * 3) {
            this.isDead = true
            this.isDying = false
            this.requiresUpdate = true
          } else if (this.deathCount % 3 == 0) {
            this.requiresUpdate = true
          }
          this.deathCount++
        }
      }
    }
  }
})
