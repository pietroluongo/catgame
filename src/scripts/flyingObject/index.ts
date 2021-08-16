export default class FlyingObject extends Phaser.GameObjects.GameObject {
    x: number;
    y: number;
    scene: Phaser.Scene;
    sprite: Phaser.GameObjects.Sprite;
    tail : Phaser.GameObjects.Sprite;
    keyboard : Phaser.Input.Keyboard.KeyboardPlugin;
    isMoving : boolean;

    constructor(label : string, scene: Phaser.Scene, x: number, y: number, baseTextures : Array<string>, tailTextures : Array<string>, keyboard: Phaser.Input.Keyboard.KeyboardPlugin) {
        super(scene, label);
        [this.x, this.y] = [x, y];
        this.scene = scene;
        this.tail = scene.add.sprite(x, y, '');
        this.sprite = scene.add.sprite(x, y, '');
        this.initTail(tailTextures[0], .5);
        this.initSprite(baseTextures[0], .5);
        this.keyboard = keyboard;
        this.isMoving = false;
    }

    private initTail(texture : string, scale : number) {
        this.tail.setTexture(texture);
        this.tail.setScale(scale);
        this.updateTailPosition();
    }

    private updateTailPosition() {
        let [spriteW, hSpriteH] = [this.sprite.displayWidth, this.sprite.displayHeight / 2];
        let tailH = this.tail.displayHeight;
        this.tail.setX(this.sprite.x - spriteW);
        this.tail.setY(this.sprite.y + hSpriteH - tailH / 1.5);
    }

    private initSprite(texture : string, scale : number) {
        this.sprite.setTexture(texture);
        this.sprite.setScale(scale);
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    update() {
        this.renderTail();
        this.sprite.setX(this.x);
        this.sprite.setY(this.y);
    }

    async setMovement(event : string) {
        this.isMoving = true;
        this.keyboard.on(event, () => {
            this.delay(240);
            this.isMoving = false;
        });

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

    renderTail() {
        if (!this.isMoving) {
            this.tail.alpha = 0;
        }
        else {
            this.tail.alpha = 1;
        }
        this.updateTailPosition();
    }
    
  }
  