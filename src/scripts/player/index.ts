import FlyingObject from '../flyingObject/index'

export default class Player extends FlyingObject {

    keyboard : Phaser.Input.Keyboard.KeyboardPlugin;
    screenWidth: integer;
    screenHeight: integer

    constructor(scene: Phaser.Scene, x: number, y: number, keyboard: Phaser.Input.Keyboard.KeyboardPlugin) {
        super('player', scene, x, y, ['flyingtoast'], ['rainbowtail', 'rainbowtailalternate']);
        this.keyboard = keyboard;
        const {width, height} = this.scene.sys.game.canvas;
        this.screenHeight = height;
        this.screenWidth = width;
        this.sprite.debugShowVelocity = true;
        this.sprite.debugShowBody = true;
    }

    handleMovementKeys = () => {
        this.keyboard.on('keydown-A', () => {
            this.sprite.setVelocityX(-150);
        });
        this.keyboard.on('keydown-D', () => {
            this.sprite.setVelocityX(+150);
        });
        this.keyboard.on('keydown-S', () => {
            this.sprite.setVelocityY(+150);
        });
        this.keyboard.on('keydown-W', () => {
            this.sprite.setVelocityY(-150);
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
    }

    handlePointer = () => {
        const pointer = this.scene.input.activePointer;
        const angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.screenWidth/2, this.screenHeight/2, pointer.x, pointer.y);
        this.sprite.setAngle(angle);
    }

    update() {
        this.x = this.sprite.x;
        this.y = this.sprite.y;

        this.handleMovementKeys();
        this.handlePointer();
        this.handleShooting();

        super.update();
    }

    
  }
  