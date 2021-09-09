import FlyingObject from '../flyingObject/index'

export default class Player extends FlyingObject {

    keyboard : Phaser.Input.Keyboard.KeyboardPlugin;

    constructor(scene: Phaser.Scene, x: number, y: number, keyboard: Phaser.Input.Keyboard.KeyboardPlugin) {
        super('player', scene, x, y, ['flyingtoast'], ['rainbowtail', 'rainbowtailalternate']);
        this.keyboard = keyboard;
    }

    update() {
        this.sprite.debugShowVelocity = true;
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
        super.update();
    }

    
  }
  