export default class Player extends Phaser.GameObjects.GameObject {
    x: number;
    y: number;
    scene: Phaser.Scene;
    sprite: Phaser.GameObjects.Sprite;
    keyboard!: Phaser.Input.Keyboard.KeyboardPlugin;

    constructor(scene: Phaser.Scene, x: number, y: number, keyboard: Phaser.Input.Keyboard.KeyboardPlugin) {
        super(scene, 'player');
        [this.x, this.y] = [x, y];
        this.scene = scene;
        this.sprite = scene.add.sprite(x, y, '');
        this.keyboard = keyboard;
    }

    update() {
        this.keyboard.on('keydown-W', () => {
            this.y -= 0.1;
        })
        this.keyboard.on('keydown-S', () => {
            this.y += 0.1;
        })
        this.keyboard.on('keydown-A', () => {
            this.x -= 0.1;
        })
        this.keyboard.on('keydown-D', () => {
            this.x += 0.1;
        })
        this.sprite.setX(this.x);
        this.sprite.setY(this.y);
    }
    
  }
  