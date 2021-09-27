import FlyingObject from "../flyingObject/index";
import GameScene from "../../scenes/Game";
import Projectile, { ProjectileType } from "../projectile";
import {
  ENEMY_BASE_SHOOT_DISTANCE,
  ENEMY_BASE_SIZE,
  ENEMY_MAX_ACCELERATION,
  ENEMY_MAX_SPEED,
  ENEMY_SHOOT_BASE_SPEED,
  ENEMY_SHOOT_DELAY,
  getEnemyHealthPerRound,
  HEALTHPACK_CHANCE,
  SCORE_PER_KILL,
} from "../../utils";
import Healthpack from "../healthpack";

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
    this.maxAcceleration = ENEMY_MAX_ACCELERATION; // This is arbitrary
    this.sprite.setMaxVelocity(ENEMY_MAX_SPEED);
    this.minimumDistanceToShoot = ENEMY_BASE_SHOOT_DISTANCE; // This is arbitrary
    this.updateCounter = 0;
    this.counterLimitToShoot = ENEMY_SHOOT_DELAY; // This is arbitrary
    this.health = getEnemyHealthPerRound(scene.round);
    this.canMove = true;
    this.isAlive = true;
    this.acceleration = 0;
    this.sprite.body.setSize(75);
    this.sprite.setScale(ENEMY_BASE_SIZE);
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
    this.tryHealthpack();
    setTimeout(() => {
      this.sprite.destroy();
      this.destroy();
    }, 5000);
    this.scene.player.addScore(SCORE_PER_KILL);
    this.scene.aliveEnemies--;
  };

  tryHealthpack() {
    const roll = Math.random();
    if (roll < HEALTHPACK_CHANCE) {
      new Healthpack(this.scene, this.x, this.y, 2);
      console.log("healthpack");
    }
  }

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
        ENEMY_SHOOT_BASE_SPEED
      );
      this.updateCounter = 0;
    }
  };
}
