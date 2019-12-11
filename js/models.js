define([
  "./models/alien",
  "./models/gameObject.js",
  "./models/moveableObject.js",
  "./models/player.js",
  "./models/playerProjectile.js",
  "./models/alienProjectile.js",
  "./models/projectile.js",
  "./models/sprite.js",
  "./models/spaceship"
], (Alien, GameObject, MoveableObject, Player, PlayerProjectile, AlienProjectile, Projectile, Sprite, Spaceship) => {
  return {
    Alien,
    GameObject,
    MoveableObject,
    Player,
    PlayerProjectile,
    AlienProjectile,
    Projectile,
    Sprite,
    Spaceship
  }
})
