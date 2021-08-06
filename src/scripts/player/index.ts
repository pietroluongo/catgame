export default class Player extends Phaser.GameObjects.GameObject {
    x: number;
    y: number;
    scene: Phaser.Scene;
    sprite: Phaser.GameObjects.Sprite;
    keyboard!: Phaser.Input.Keyboard.KeyboardPlugin;

    constructor(scene: Phaser.Scene,x: number, y: number, keyboard: Phaser.Input.Keyboard.KeyboardPlugin) {
        super(scene, 'player');
        [this.x, this.y] = [x, y];
        this.scene = scene;
        this.sprite = scene.add.sprite(x, y, '');
        // this.sprite.setTexture('catbase'); TODO: LOAD THE IMAGE
        this.keyboard = keyboard;
    }

    update() {
        let { width, height } = this.scene.sys.game.canvas
        let offset = 0.1; // Default offset.
        this.keyboard.on('keydown-W', () => {
            this.moveSprite(0, -offset);
        })
        this.keyboard.on('keydown-S', () => {
            this.moveSprite(0, +offset);
        })
        this.keyboard.on('keydown-A', () => {
            this.moveSprite(-offset, 0);
        })
        this.keyboard.on('keydown-D', () => {
            this.moveSprite(+offset, 0);
        })
        this.sprite.setX(this.x);
        this.sprite.setY(this.y);
    }

    moveSprite(xOffset : number, yOffset : number) {
        if (!this.outsideScreenArea(this.x + xOffset, this.y + yOffset)) {
            this.x += xOffset;
            this.y += yOffset;
        }
    }

    outsideScreenArea(x : number, y : number) {
        let { width, height } = this.scene.sys.game.canvas;
        let hSpriteW = this.sprite.displayWidth  / 2; // Half sprite dims for practical purposes
        let hSpriteH = this.sprite.displayHeight / 2; // Half sprite dims for practical purposes

        return (x <= hSpriteW) || (x >= width - hSpriteW) || (y <= hSpriteH) || (y >= height - hSpriteH);
    }
    
  }
  