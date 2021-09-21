import FlyingObject from "../flyingObject/index";
import Projectile, { ProjectileType } from "../projectile";
import GameScene, { INITIAL_CAMERA_ZOOM } from "../../scenes/Game";

export const maxPlayerSpeed = 250;
export const playerAcceleration = 500;

export default class Player extends FlyingObject {
  keyboard: Phaser.Input.Keyboard.KeyboardPlugin;
  hasFiredSinceLastClick: boolean;
  canBrake: boolean;
  canShoot: boolean;

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
    this.keyboard = keyboard;
    this.sprite.debugShowVelocity = true;
    this.sprite.debugShowBody = true;
    this.sprite.setMaxVelocity(maxPlayerSpeed, maxPlayerSpeed);
    this.hasFiredSinceLastClick = false;
    this.canBrake = true;
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
    this.sprite.setDrag(50, 50);
  };

  lockMovement = () => {
    this.sprite.setVelocity(0, 0);
    this.sprite.setAcceleration(0, 0);
  };

  handleShooting = () => {
    this.scene.input.on("pointerup", () => {
      this.hasFiredSinceLastClick = false;
    });
    this.scene.input.once("pointerdown", () => {
      if (!this.hasFiredSinceLastClick) {
        this.hasFiredSinceLastClick = true;
        const projectile = new Projectile(
          this.scene,
          "playerMissile",
          ProjectileType.player,
          this.sprite.x,
          this.sprite.y,
          this.sprite.angle
        );
      }
    });
  };

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

  die = () => {
    console.debug("i dead");
    this.sprite.setVelocity(0, 0);
    this.sprite.setAcceleration(0, 0);
  };

  handlePlayerState = () => {
    if (this.health! <= 0) {
      this.canMove = false;
      this.isAlive = false;
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

    if (this.canShoot) {
      this.handleShooting();
    }

    this.handleCameraZoom();

    super.update();
  }
}
