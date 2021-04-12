define(["./gameObject"], (GameObject) => {
  return class MoveableObject extends GameObject {
    constructor(id, x, y, width, height, sprite) {
      super(id, x, y, width, height, sprite)
    }
  }
})
