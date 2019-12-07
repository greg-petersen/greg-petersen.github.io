define(["./projectiles", "./constants", "./sounds", "./models", "./globals", "./config"], (
  _projectiles,
  _constants,
  _sounds,
  _models,
  _globals,
  _config
) => {
  const { projectiles, getNextProjectileId } = _projectiles
  const { DIRECTION } = _constants
  const { alien_death } = _sounds
  const { Alien, AlienProjectile, Sprite } = _models
  const { gameObjects, images } = _globals
  const { DEBUG_ALIENS } = _config

  const aliens = []

  const alienInfo = {
    alienCount: 0
  }

  let shootTimeCounter = 0
  let moveTimeCounter = 0

  const prepareAliens = () => {
    for (let i = 0; i < 10; i++) {
      for (let k = 0; k < 5; k++) {
        if (k == 0) {
          aliens[i] = []
        }
        generateInvader(i, k)
      }
    }

    // Then set the Alien Death animation here.
  }

  const generateInvader = (i, k) => {
    let sprite, alien

    switch (k) {
      case 0:
        sprite = new Sprite(images.get("invaderThree"), 2, 32, 192, 128)
        alien = new Alien(`Alien${i}${k}`, 20 + i * 56, 280 - k * 48, 48, 32, sprite, DIRECTION.RIGHT)
        break
      case 1:
        sprite = new Sprite(images.get("invaderThree"), 2, 32, 192, 128)
        alien = new Alien(`Alien${i}${k}`, 20 + i * 56, 280 - k * 48, 48, 32, sprite, DIRECTION.RIGHT)
        break
      case 2:
        sprite = new Sprite(images.get("invaderTwo"), 2, 32, 178, 128)
        alien = new Alien(`Alien${i}${k}`, 21.75 + i * 56, 280 - k * 48, 44.5, 32, sprite, DIRECTION.RIGHT)
        break
      case 3:
        sprite = new Sprite(images.get("invaderTwo"), 2, 32, 178, 128)
        alien = new Alien(`Alien${i}${k}`, 21.75 + i * 56, 280 - k * 48, 44.5, 32, sprite, DIRECTION.RIGHT)
        break
      case 4:
        sprite = new Sprite(images.get("invaderOne"), 2, 32, 128, 128)
        alien = new Alien(`Alien${i}${k}`, 27.5 + i * 56, 280 - k * 48, 32, 32, sprite, DIRECTION.RIGHT)
        break
    }

    aliens[i].push(alien)
    gameObjects.set(`Alien${i}${k}`, alien)
    alienInfo.alienCount++
  }

  const alienStep = () => {
    if (!DEBUG_ALIENS) {
      moveAliens()
      alienFireProjectile()
    }
  }

  const destroyAlien = (alien, stackIndex, index) => {
    alienInfo.alienCount--
    aliens[stackIndex].splice(index, 1)
    if (aliens[stackIndex].length === 0) {
      aliens.splice(stackIndex, 1)
    }
    alien.die()
    alien_death.play()
  }

  const alienFireProjectile = () => {
    if (shootTimeCounter >= 50) {
      shootTimeCounter = 0
      let alienStack = Math.floor(Math.random() * aliens.length)
      let bottomAlien = aliens[alienStack][0]

      let projectile = new AlienProjectile(
        `Projectile-${getNextProjectileId()}`,
        bottomAlien.position.x + bottomAlien.size.width / 2,
        bottomAlien.position.y + bottomAlien.size.height + 5,
        DIRECTION.DOWN
      )

      projectiles.push(projectile)
      gameObjects.set(projectile.id, projectile)
    } else {
      shootTimeCounter++
    }
  }

  const moveAliens = () => {
    if (moveTimeCounter >= alienInfo.alienCount * 0.7) {
      moveTimeCounter = 0

      switch (aliens[0][0].directionMoving) {
        case DIRECTION.RIGHT:
          handleDirectionRight()
          break
        case DIRECTION.LEFT:
          handleDirectionLeft()
          break
      }
    } else {
      moveTimeCounter++
    }
  }

  const handleDirectionLeft = () => {
    aliens[0][0].canMoveLeft() ? moveAliensLeft() : moveAliensDownThenRight()
  }

  const handleDirectionRight = () => {
    aliens[aliens.length - 1][0].canMoveRight() ? moveAliensRight() : moveAliensDownThenLeft()
  }

  const moveAliensRight = () => {
    aliens.forEach((alienSet) => alienSet.forEach((alien) => alien.moveRight()))
  }

  const moveAliensLeft = () => {
    aliens.forEach((alienSet) => alienSet.forEach((alien) => alien.moveLeft()))
  }

  const moveAliensDownThenRight = () => {
    aliens.forEach((alienSet) =>
      alienSet.forEach((alien) => {
        alien.moveRight()
        alien.moveDown()
      })
    )
  }

  const moveAliensDownThenLeft = () => {
    aliens.forEach((alienSet) =>
      alienSet.forEach((alien) => {
        alien.moveLeft()
        alien.moveDown()
      })
    )
  }

  return {
    aliens,
    alienInfo,
    prepareAliens,
    alienStep,
    destroyAlien
  }
})
