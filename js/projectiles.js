define(() => {
  const projectiles = []
  const projectileInfo = {
    count: 0
  }

  const projectilesStep = () => {
    projectiles.forEach((projectile) => {
      if (!projectile.isVisible()) {
        destroyProjectile(projectile, projectiles.indexOf(projectile))
      } else {
        projectile.move()
      }
    })
  }

  // This can be optimized.
  const playerCanShoot = () => {
    let playerProjectiles = 0
    projectiles.forEach((projectile) => {
      if (projectile.isPlayers) {
        playerProjectiles++
      }
    })

    if (playerProjectiles < 1) {
      return true
    }
    return false
  }

  const destroyProjectile = (projectile, index) => {
    projectiles.splice(index, 1)
    projectile.die()
  }

  const getNextProjectileId = () => {
    let id = projectileInfo.count
    projectileInfo.count++
    return id
  }

  return {
    projectiles,
    projectilesStep,
    playerCanShoot,
    destroyProjectile,
    projectileInfo,
    getNextProjectileId
  }
})
