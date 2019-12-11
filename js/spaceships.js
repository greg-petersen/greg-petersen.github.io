define(["./projectiles", "./constants", "./sounds", "./models", "./globals", "./config"], (
  _projectiles,
  _constants,
  _sounds,
  _models,
  _globals
  // _config
) => {
  // const { projectiles, getNextProjectileId } = _projectiles
  const { DIRECTION } = _constants
  // const { alien_death } = _sounds
  const { Spaceship } = _models
  const { gameObjects } = _globals
  // const { DEBUG_ALIENS } = _config

  const spaceship = {
    exists: false,
    counter: 0,
    entity: {}
  }

  const spaceshipStep = () => {
    if (spaceship.exists) {
      moveSpaceship()
      // } else if (Math.random() * 100 < 25) {
    } else {
      // For now lets always have spaceship travel right across screen

      // TODO: Generate spaceship
      spaceship.entity = new Spaceship(spaceship.counter, 0, 10, 80, 40, DIRECTION.RIGHT)
      gameObjects.set(`Spaceship${spaceship.counter}`, spaceship.entity)
      spaceship.counter++
      spaceship.exists = true
    }
  }

  const moveSpaceship = () => {
    if (spaceship.exists) {
      //
    }
  }

  return {
    spaceship,
    spaceshipStep
  }
})
