define(["./player", "./projectiles", "./aliens", "./collision", "./objective", "./sounds", "./models", "./globals"], (
  _player,
  _projectiles,
  _aliens,
  _collision,
  _objective,
  _sounds,
  _models,
  _globals
) => {
  const playerInfoElement = $("#playerInfo").get(0)
  const { projectilesStep, projectiles } = _projectiles
  const { player } = _player
  const { gameObjects, images } = _globals
  const { prepareAliens, alienStep, alienInfo } = _aliens
  const { checkCollisions } = _collision
  const { checkIfGameOver } = _objective
  const { playBeat } = _sounds
  const { Sprite } = _models

  let gameInterval
  let gameStarted = false
  let framesElapsedSinceBeat = 0

  let fps = 30

  const gameLoop = () => {
    if (!checkIfGameOver()) {
      checkCollisions()
      playMusic()
      player.update()
      projectilesStep()
      alienStep()
      displayInfo()
    } else {
      clearInterval(gameInterval)
    }
  }

  const drawLoop = () => {
    gameObjects.forEach((value) => animationUpdate(value))

    if (!checkIfGameOver()) {
      window.requestAnimationFrame(drawLoop)
    }
  }

  const animationUpdate = (object) => {
    if (object.requiresUpdate) {
      if (object.isDead) {
        object.clear()
      } else if (object.isDying) {
        // Do dying related things.
      } else {
        object.reDraw()
      }
    }
  }

  const playMusic = () => {
    if (framesElapsedSinceBeat >= alienInfo.alienCount * 0.7) {
      framesElapsedSinceBeat = 0
      playBeat()
    }
    framesElapsedSinceBeat++
  }

  const displayInfo = () => {
    let output = ""
    output += "X: " + player.position.x
    output += "<br> Y: " + player.position.y
    output += "<br><br>Number of projectiles: " + projectiles.length
    output += "<br><br>Number of aliens: " + alienInfo.alienCount
    playerInfoElement.innerHTML = output
  }

  const loadImage = (id, src) => {
    var deferred = $.Deferred()
    var image = new Image()
    image.src = src
    image.id = id

    image.onload = () => {
      console.log("Sprite loaded", id)
      images.set(id, image)
      deferred.resolve()
    }
    return deferred.promise()
  }

  const setupGame = () => {
    var imageLoaders = []

    imageLoaders.push(loadImage("testInvader", "../sprites/testInvader.png"))
    imageLoaders.push(loadImage("player", "../sprites/player.png"))
    imageLoaders.push(loadImage("playerProjectile", "../sprites/playerProjectile.png"))
    imageLoaders.push(loadImage("alienProjectile", "../sprites/alienProjectile.png"))
    imageLoaders.push(loadImage("alienSpaceShip", "../sprites/alienSpaceShip.png"))
    imageLoaders.push(loadImage("invaderOne", "../sprites/invaderOne.png"))
    imageLoaders.push(loadImage("invaderTwo", "../sprites/invaderTwo.png"))
    imageLoaders.push(loadImage("invaderThree", "../sprites/invaderThree.png"))
    imageLoaders.push(loadImage("playerDeath", "../sprites/playerDeath.png"))
    imageLoaders.push(loadImage("alienDeath", "../sprites/alienDeath.png"))

    $.when.apply(null, imageLoaders).done(() => {
      gameInterval = setInterval(gameLoop, 1000 / fps)
      initializeGameObjects()
      window.requestAnimationFrame(drawLoop)
    })
  }

  const initializeGameObjects = () => {
    player.sprite = new Sprite(images.get("player"), 1, 0, 208, 128)
    prepareAliens()
    gameObjects.set("player", player)
  }

  $(document).on("click", () => {
    if (!gameStarted) {
      gameStarted = true
      setupGame()
    }
  })
})
