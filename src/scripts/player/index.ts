import FlyingObject from "../flyingObject/index";
import Projectile, { ProjectileType } from "../projectile";
import GameScene, { INITIAL_CAMERA_ZOOM } from "../../scenes/Game";
import {
  HEALTHPACK_HEAL_BASE_AMOUNT,
  PLAYER_BASE_SHOT_SIZE,
} from "../../utils";
import { PossibleUpgrades } from "../../upgrades";

export const maxPlayerSpeed = 1000;
export const playerAcceleration = 2000;

export interface UpgradeData {
  currentLevel: number;
  maxLevel: number;
  values: Array<number>;
  prices: Array<number>;
}
interface UpgradeLevels {
  totalHealth: UpgradeData;
  fireSpeed: UpgradeData;
  moveSpeed: UpgradeData;
  dropChance: UpgradeData;
  bulletSize: UpgradeData;
  bulletSpeed: UpgradeData;
  bulletDamage: UpgradeData;
  bulletPenetration: UpgradeData;
}

const standardUpgrades: UpgradeLevels = {
  totalHealth: {
    currentLevel: 1,
    maxLevel: 5,
    values: [100, 125, 150, 175, 200],
    prices: [10000, 10000, 10000, 10000, 10000],
  },
  fireSpeed: {
    currentLevel: 1,
    maxLevel: 5,
    values: [0.8, 0.6, 0.4, 0.2, 0],
    prices: [10000, 10000, 10000, 10000, 10000],
  },
  moveSpeed: {
    currentLevel: 1,
    maxLevel: 5,
    values: [200, 400, 600, 800, 1000],
    prices: [10000, 10000, 10000, 10000, 10000],
  },
  dropChance: {
    currentLevel: 1,
    maxLevel: 5,
    values: [0.01, 0.02, 0.04, 0.08, 0.1],
    prices: [10000, 10000, 10000, 10000, 10000],
  },
  bulletSize: {
    currentLevel: 1,
    maxLevel: 5,
    values: [1, 2, 3, 4, 5],
    prices: [10000, 10000, 10000, 10000, 10000],
  },
  bulletDamage: {
    currentLevel: 1,
    maxLevel: 5,
    values: [100, 200, 400, 800, 1000],
    prices: [10000, 10000, 10000, 10000, 10000],
  },
  bulletSpeed: {
    currentLevel: 1,
    maxLevel: 5,
    values: [500, 800, 1000, 2500, 5000],
    prices: [10000, 10000, 10000, 10000, 10000],
  },
  bulletPenetration: {
    currentLevel: 1,
    maxLevel: 5,
    values: [0, 2, 4, 8, 10],
    prices: [10000, 10000, 10000, 10000, 10000],
  },
};

export default class Player extends FlyingObject {
  keyboard: Phaser.Input.Keyboard.KeyboardPlugin;
  hasFiredSinceLastClick: boolean;
  canBrake: boolean;
  canShoot: boolean;
  score: number;
  upgrades: UpgradeLevels;
  maxHealth: number;

  constructor(
    scene: GameScene,
    x: number,
    y: number,
    keyboard: Phaser.Input.Keyboard.KeyboardPlugin
  ) {
    super(
      "player",
      scene,
      x,
      y,
      ["flyingtoast"],
      ["rainbowtail", "rainbowtailalternate"]
    );
    this.canMove = true;
    this.canShoot = true;
    this.isAlive = true;
    this.health = 100;
    this.upgrades = standardUpgrades;
    this.maxHealth = this.upgrades.totalHealth.values[0];
    this.keyboard = keyboard;
    this.sprite.setMaxVelocity(this.upgrades.moveSpeed.values[0]);
    this.hasFiredSinceLastClick = false;
    this.canBrake = true;
    this.sprite.body.setSize(100, 100);
    this.score = 0;
  }

  handleMovementKeys = () => {
    this.keyboard.on("keydown-A", () => {
      this.sprite.setAccelerationX(-playerAcceleration);
    });
    this.keyboard.on("keydown-D", () => {
      this.sprite.setAccelerationX(playerAcceleration);
    });
    this.keyboard.on("keydown-S", () => {
      this.sprite.setAccelerationY(playerAcceleration);
    });
    this.keyboard.on("keydown-W", () => {
      this.sprite.setAccelerationY(-playerAcceleration);
    });
    this.keyboard.on("keyup-A", () => {
      this.sprite.setAccelerationX(0);
    });
    this.keyboard.on("keyup-D", () => {
      this.sprite.setAccelerationX(0);
    });
    this.keyboard.on("keyup-S", () => {
      this.sprite.setAccelerationY(0);
    });
    this.keyboard.on("keyup-W", () => {
      this.sprite.setAccelerationY(0);
    });
    this.keyboard.on("keydown-SPACE", () => {
      if (this.canBrake) {
        this.canBrake = false;
        const currentVelocity = this.sprite.body.velocity;
        this.sprite.setVelocity(
          currentVelocity.x * 0.9,
          currentVelocity.y * 0.9
        );
      }
      setTimeout(() => {
        this.canBrake = true;
      }, 50);
    });
    this.sprite.setDrag(maxPlayerSpeed / 2, maxPlayerSpeed / 2);
  };

  addScore = (amt: number) => {
    if (!this.isAlive) return;
    this.score += amt;
  };

  lockMovement = () => {
    this.sprite.setVelocity(0, 0);
    this.sprite.setAcceleration(0, 0);
  };

  handleShooting = () => {
    if (!this.canShoot) return;
    this.scene.input.on("pointerup", () => {
      this.hasFiredSinceLastClick = false;
    });
    this.scene.input.once("pointerdown", () => {
      if (!this.hasFiredSinceLastClick) {
        this.hasFiredSinceLastClick = true;
        const projectile = new Projectile(
          this.scene,
          "powercookie",
          ProjectileType.player,
          this.sprite.x,
          this.sprite.y,
          this.sprite.angle,
          3000,
          5
        );
      }
    });
  };

  getUpgradeParamById(id: PossibleUpgrades): UpgradeData {
    switch (id) {
      case PossibleUpgrades.bulletDamage:
        return this.upgrades.bulletDamage;
      case PossibleUpgrades.bulletPenetration:
        return this.upgrades.bulletPenetration;
      case PossibleUpgrades.bulletSize:
        return this.upgrades.bulletSize;
      case PossibleUpgrades.bulletSpeed:
        return this.upgrades.bulletSpeed;
      case PossibleUpgrades.dropChance:
        return this.upgrades.dropChance;
      case PossibleUpgrades.fireSpeed:
        return this.upgrades.fireSpeed;
      case PossibleUpgrades.moveSpeed:
        return this.upgrades.moveSpeed;
      case PossibleUpgrades.totalHealth:
        return this.upgrades.totalHealth;
      default:
        return { currentLevel: -1, maxLevel: -1, values: [], prices: [] };
    }
  }

  handlePointer = () => {
    const pointer = this.scene.input.activePointer;
    const angle =
      Phaser.Math.RAD_TO_DEG *
      Phaser.Math.Angle.Between(
        this.screenWidth / 2,
        this.screenHeight / 2,
        pointer.x,
        pointer.y
      );
    this.sprite.setAngle(angle);
  };

  handleCameraZoom = () => {
    const cam = this.scene.cameras.main;
    const camSpeedParameter = Math.abs(this.sprite.body.velocity.length());

    if (camSpeedParameter < 10) {
      setTimeout(() => {
        if (camSpeedParameter < 10) {
          cam.zoomTo(
            INITIAL_CAMERA_ZOOM,
            1000,
            Phaser.Math.Easing.Quadratic.In
          );
        }
      }, 1000);
    } else {
      cam.zoomTo(1, 250, Phaser.Math.Easing.Quadratic.Out);
    }
  };

  heal = () => {
    this.health! += HEALTHPACK_HEAL_BASE_AMOUNT;
  };

  die = () => {
    this.sprite.setVelocity(0, 0);
    this.sprite.setAcceleration(0, 0);
    this.canMove = false;
    this.isAlive = false;
    this.canShoot = false;
    this.scene.canRestart = true;
  };

  handlePlayerState = () => {
    if (this.health! <= 0) {
      this.die();
    }
  };

  update() {
    this.x = this.sprite.x;
    this.y = this.sprite.y;

    this.handlePlayerState();

    if (this.canMove) {
      this.handleMovementKeys();
      this.handlePointer();
    } else {
      this.lockMovement();
    }

    this.handleShooting();

    this.handleCameraZoom();

    super.update();
  }
}
