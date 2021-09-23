import FlyingObject from "../flyingObject/index";
import GameScene from "../../scenes/Game";
import Projectile, { ProjectileType } from "../projectile";

export default class Enemy extends FlyingObject {
  player: FlyingObject;
  maxAcceleration: number;
  minimumDistanceToShoot: number;
  updateCounter: integer;
  counterLimitToShoot: integer;
  hasCollided : boolean;
  acceleration : number;

  constructor(player: FlyingObject, scene: GameScene, x: number, y: number) {
    super("player", scene, x, y, ["catbase"], false);
    this.player = player;
    this.maxAcceleration = 100; // This is arbitrary
    this.minimumDistanceToShoot = 500; // This is arbitrary
    this.updateCounter = 0;
    this.counterLimitToShoot = 100; // This is arbitrary
    this.health = 100;
    this.canMove = true;
    this.isAlive = true;
    this.hasCollided = false;
    this.acceleration = 0;
  }

  update() {
    this.x = this.sprite.x;
    this.y = this.sprite.y;
    this.updateState();

    // The enemy will always try to reach the player
    if (this.canMove && !(this.hasCollided)) {
      this.handleMovement();
    } else if (this.hasCollided) {
      this.handleCollision();
      setTimeout(() => {
        this.toggleCollision();
      }, 5000);
    }
    super.update();
  }

  die = () => {
    this.sprite.setVelocity(0, 0);
    this.sprite.setAcceleration(0, 0);
    this.scene.tweens.add({
      targets: this.sprite,
      duration: 1000,
      alpha: 0,
    });
    setTimeout(() => {
      this.sprite.destroy();
    }, 1);
  };

  handleMovement = () => {
    var angleToPlayer = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      this.player.x,
      this.player.y
    );
    var distanceToPlayer = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      this.player.x,
      this.player.y
    );

    var a /* acceleration */ =
      distanceToPlayer > this.maxAcceleration
        ? this.maxAcceleration
        : distanceToPlayer;

    this.acceleration = a;

    var dx = a * Math.cos(angleToPlayer);
    var dy = a * Math.sin(angleToPlayer);

    this.shootPlayer(distanceToPlayer, angleToPlayer);
    this.sprite.setAcceleration(dx, dy);
  };

  handleCollision = () => {
    var angleToPlayer = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      this.player.x,
      this.player.y
    );
    var movementAngle = -angleToPlayer;
    var [dx, dy] = [this.acceleration * Math.cos(movementAngle) * 0.5,
                    this.acceleration * Math.sin(movementAngle) * 0.5];

    this.sprite.setAcceleration(dx, dy);
    this.die();
  }

  toggleCollision = () => {
    this.hasCollided = !this.hasCollided;
  };

  updateState = () => {
    if (!this.isAlive) {
      this.canMove = false;
    }
  };

  shootPlayer = (distanceToPlayer: number, angleToPlayer: number) => {
    if (this.updateCounter < this.counterLimitToShoot) {
      this.updateCounter += 1;
      return;
    }
    if (distanceToPlayer < this.minimumDistanceToShoot) {
      const degreeAngle = (angleToPlayer * 180) / Math.PI;
      const missile = new Projectile(
        this.scene,
        "enemyMissile",
        ProjectileType.enemy,
        this.sprite.x,
        this.sprite.y,
        degreeAngle
      );
      this.updateCounter = 0;
    }
  };
}
