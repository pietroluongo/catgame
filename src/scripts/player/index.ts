import FlyingObject from '../flyingObject/index'
import Projectile from "../projectile";
import GameScene from "../../scenes/Game";

export const maxPlayerSpeed = 250;
export const playerAcceleration = 500;

export default class Player extends FlyingObject {

    keyboard : Phaser.Input.Keyboard.KeyboardPlugin;
    screenWidth: integer;
    screenHeight: integer;
    hasFiredSinceLastClick: boolean;
    canBrake: boolean;

    constructor(scene: GameScene, x: number, y: number, keyboard: Phaser.Input.Keyboard.KeyboardPlugin) {
        super('player', scene, x, y, ['flyingtoast'], ['rainbowtail', 'rainbowtailalternate']);
        this.keyboard = keyboard;
        const {width, height} = this.scene.sys.game.canvas;
        this.screenHeight = height;
        this.screenWidth = width;
        this.sprite.debugShowVelocity = true;
        this.sprite.debugShowBody = true;
        this.sprite.setMaxVelocity(maxPlayerSpeed, maxPlayerSpeed);
        this.hasFiredSinceLastClick = false;
        this.canBrake = true;
    }

    handleMovementKeys = () => {
        this.keyboard.on('keydown-A', () => {
            this.sprite.setAccelerationX(-playerAcceleration);
        });
        this.keyboard.on('keydown-D', () => {
            this.sprite.setAccelerationX(playerAcceleration);

        });
        this.keyboard.on('keydown-S', () => {
            this.sprite.setAccelerationY(playerAcceleration);

        });
        this.keyboard.on('keydown-W', () => {
            this.sprite.setAccelerationY(-playerAcceleration);
        });
        this.keyboard.on('keyup-A', () => {
            this.sprite.setAccelerationX(0);
        });
        this.keyboard.on('keyup-D', () => {
            this.sprite.setAccelerationX(0);

        });
        this.keyboard.on('keyup-S', () => {
            this.sprite.setAccelerationY(0);

        });
        this.keyboard.on('keyup-W', () => {
            this.sprite.setAccelerationY(0);
        });
        this.keyboard.on('keydown-SPACE', () => {
            if(this.canBrake) {
                this.canBrake = false;
                const currentVelocity = this.sprite.body.velocity;
                this.sprite.setVelocity(currentVelocity.x * 0.9, currentVelocity.y * 0.9);
            }
            setTimeout(() => {
                this.canBrake = true;
            }, 50)
        });
        this.sprite.setDrag(50, 50);

    }

    handleShooting = () => {
        this.scene.input.on('pointerup', () => {
            this.hasFiredSinceLastClick = false;
        })
        this.scene.input.once('pointerdown', () => {
            if(!this.hasFiredSinceLastClick) {
                this.hasFiredSinceLastClick = true;
                const missile = new Projectile(this.scene, 'playerMissile', this.sprite.x, this.sprite.y, this.sprite.angle);
            }
        })
    }

    handlePointer = () => {
        const pointer = this.scene.input.activePointer;
        const angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.screenWidth/2, this.screenHeight/2, pointer.x, pointer.y);
        this.sprite.setAngle(angle);
    }

    handleCameraZoom = () => {
        const cam = this.scene.cameras.main;
        const camSpeedParameter = Math.abs(this.sprite.body.velocity.length());

        //const camSpeedParameter = Math.abs(this.sprite.body.velocity.x) + Math.abs(this.sprite.body.velocity.y);
        //const res = Phaser.Math.Linear(2, 0.5, camSpeedParameter);
        //console.log(res);
        //cam.zoom = res;
        if(camSpeedParameter < 10) {
            setTimeout(() => {
                if(camSpeedParameter < 10) {
                    cam.zoomTo(2, 1000, Phaser.Math.Easing.Quadratic.In);
                }
            }, 1000);
        }
        else {
            cam.zoomTo(0.5, 250, Phaser.Math.Easing.Quadratic.Out);
        }
    }

    update() {
        this.x = this.sprite.x;
        this.y = this.sprite.y;

        this.handleMovementKeys();
        this.handlePointer();
        this.handleShooting();

        this.handleCameraZoom();

        super.update();
    }

    
  }
  