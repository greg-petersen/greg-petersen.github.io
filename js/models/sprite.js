define(() => {
  return class Sprite {
    // Sprite strip, width and height of each individual frame * number of frames
    constructor(image, frames, offset, w, h) {
      this.currentFrame = 0
      this.image = image
      this.frames = frames
      this.offset = offset
      this.width = w
      this.height = h

      this.getSrc = () => {
        return this.image.src
      }

      //void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
      this.getFrame = () => {
        let frame = {
          sx: this.currentFrame * this.offset + this.currentFrame * this.width,
          sy: 0,
          sWidth: this.width,
          sHeight: this.height
        }

        this.currentFrame == this.frames - 1 ? (this.currentFrame = 0) : this.currentFrame++
        return frame
      }
    }
  }
})
