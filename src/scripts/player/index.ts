import FlyingObject from '../flyingObject/index'

export default class Player extends FlyingObject {

    keyboard : Phaser.Input.Keyboard.KeyboardPlugin;

    constructor(scene: Phaser.Scene, x: number, y: number, keyboard: Phaser.Input.Keyboard.KeyboardPlugin) {
        super('player', scene, x, y, ['flyingtoast'], ['rainbowtail', 'rainbowtailalternate']);
        this.keyboard = keyboard;
    }

    update() {
        let offset = 0.1;
        let keys = ['W', 'S', 'A', 'D'];
        let movs = [[0, -offset],
                    [0, +offset],
                    [-offset, 0],
                    [+offset, 0]];
        for (let i = 0; i < keys.length; i++) {
            this.keyboard.on('keydown-' + keys[i], () => {
                this.moveSprite(movs[i][0], movs[i][1]);
                this.setMovement('keyup-' + keys[i]);
            });
        }
        super.update();
    }

    
  }
  