define(() => {
  // Change this to mute sounds for development
  let muted = false
  let soundIndex = 0

  class Sound {
    constructor(src) {
      this.sound = document.createElement("audio")
      this.sound.src = src
      this.sound.setAttribute("preload", "auto")
      this.sound.setAttribute("controls", "none")
      this.sound.style.display = "none"
      this.sound.volume = 0.5
      document.body.appendChild(this.sound)
      this.play = function() {
        if (!muted) {
          this.sound.play()
        }
      }
      this.stop = function() {
        this.sound.pause()
      }
    }
  }

  const toggleSounds = () => {
    if (muted) {
      muted = false
      console.log({ muted })
      $("#toggledOn")
        .get(0)
        .setAttribute("style", "display:inline")

      $("#toggledOff")
        .get(0)
        .setAttribute("style", "display:none")
    } else {
      muted = true
      console.log({ muted })
      $("#toggledOff")
        .get(0)
        .setAttribute("style", "display:inline")

      $("#toggledOn")
        .get(0)
        .setAttribute("style", "display:none")
    }
  }

  const musicSounds = [
    new Sound("sounds/fastinvader1.wav"),
    new Sound("sounds/fastinvader2.wav"),
    new Sound("sounds/fastinvader3.wav"),
    new Sound("sounds/fastinvader4.wav")
  ]

  const playBeat = () => {
    if (soundIndex >= musicSounds.length) {
      soundIndex = 0
    }

    musicSounds[soundIndex].play()
    soundIndex++
  }

  $("#toggleSound")
    .get(0)
    .addEventListener("click", toggleSounds)

  return {
    shoot: new Sound("sounds/shoot.wav"),
    alien_death: new Sound("sounds/invaderkilled.wav"),
    playBeat
  }
})
