import FlyingObject from '../flyingObject/index'
import Projectile from "../projectile";
import GameScene from "../../scenes/Game";

export const maxPlayerSpeed = 250;

export default class Player extends FlyingObject {

    keyboard : Phaser.Input.Keyboard.KeyboardPlugin;
    screenWidth: integer;
    screenHeight: integer;
    hasFiredSinceLastClick: boolean;

    constructor(scene: GameScene, x: number, y: number, keyboard: Phaser.Input.Keyboard.KeyboardPlugin) {
        super('player', scene, x, y, ['flyingtoast'], ['rainbowtail', 'rainbowtailalternate']);
        this.keyboard = keyboard;
        const {width, height} = this.scene.sys.game.canvas;
        this.screenHeight = height;
        this.screenWidth = width;
        this.sprite.debugShowVelocity = true;
        this.sprite.debugShowBody = true;
        this.sprite.setMaxVelocity(maxPlayerSpeed, maxPlayerSpeed);
    }

    handleMovementKeys = () => {
        this.keyboard.on('keydown-A', () => {
            //this.sprite.setVelocityX(-maxPlayerSpeed);
            this.sprite.setAccelerationX(-maxPlayerSpeed);
        });
        this.keyboard.on('keydown-D', () => {
            //this.sprite.setVelocityX(+maxPlayerSpeed);
            this.sprite.setAccelerationX(maxPlayerSpeed);

        });
        this.keyboard.on('keydown-S', () => {
            //this.sprite.setVelocityY(+maxPlayerSpeed);
            this.sprite.setAccelerationY(maxPlayerSpeed);

        });
        this.keyboard.on('keydown-W', () => {
            //this.sprite.setVelocityY(-maxPlayerSpeed);
            this.sprite.setAccelerationY(-maxPlayerSpeed);
        });
        this.keyboard.on('keyup-A', () => {
            //this.sprite.setVelocityX(-maxPlayerSpeed);
            this.sprite.setAccelerationX(-0);
        });
        this.keyboard.on('keyup-D', () => {
            //this.sprite.setVelocityX(+0);
            this.sprite.setAccelerationX(0);

        });
        this.keyboard.on('keyup-S', () => {
            //this.sprite.setVelocityY(+0);
            this.sprite.setAccelerationY(0);

        });
        this.keyboard.on('keyup-W', () => {
            //this.sprite.setVelocityY(-0);
            this.sprite.setAccelerationY(-0);
        });
        this.keyboard.on('keydown-SPACE', () => {
            this.sprite.setDrag(3000, 3000);
        });
        this.sprite.setDrag(50, 50);

    }

    handleShooting = () => {
        // this.input.on('pointerup', () => {
        //     console.debug('pointerup!');
        // })
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
        console.debug('x: ', this.sprite.body.velocity.x);
        console.debug('y: ', this.sprite.body.velocity.y);
        if(Math.abs(this.sprite.body.velocity.x) + Math.abs(this.sprite.body.velocity.y) < 10) {
            cam.zoomTo(2, 1000);
        }
        else {
            cam.zoomTo(0.5, 250);
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
  