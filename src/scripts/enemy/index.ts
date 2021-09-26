import FlyingObject from "../flyingObject/index";
import GameScene from "../../scenes/Game";
import Projectile, { ProjectileType } from "../projectile";
import { SCORE_PER_KILL } from "../../utils";

export default class Enemy extends FlyingObject {
  player: FlyingObject;
  maxAcceleration: number;
  minimumDistanceToShoot: number;
  updateCounter: integer;
  counterLimitToShoot: integer;
  acceleration: number;

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
    this.acceleration = 0;
    this.sprite.body.setSize(75);
  }

  update() {
    this.x = this.sprite.x;
    this.y = this.sprite.y;
    this.updateState();

    // The enemy will always try to reach the player
    if (this.canMove) {
      this.handleMovement();
    } else {
    }
    super.update();
  }

  die = () => {
    this.isAlive = false;
    this.sprite.disableBody();
    this.sprite.setVelocity(0, 0);
    this.sprite.setAcceleration(0, 0);
    this.scene.tweens.add({
      targets: this.sprite,
      duration: 1000,
      alpha: 0,
    });
    setTimeout(() => {
      this.sprite.destroy();
      this.destroy();
    }, 5000);
    this.scene.player.addScore(SCORE_PER_KILL);
    this.scene.aliveEnemies--;
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
    this.die();
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
        "powercookie",
        ProjectileType.enemy,
        this.sprite.x,
        this.sprite.y,
        degreeAngle,
        1000
      );
      this.updateCounter = 0;
    }
  };
}
