import GameScene from "../../scenes/Game";
import Projectile from "../projectile";

export default class FlyingObject extends Phaser.GameObjects.GameObject {
  x: number;
  y: number;
  scene: GameScene;
  sprite: Phaser.Physics.Arcade.Sprite;
  screenWidth: integer;
  screenHeight: integer;
  tail: Phaser.GameObjects.Sprite;
  isMoving: boolean;
  health?: number;
  isAlive?: boolean;
  canMove?: boolean;

  constructor(
    label: string,
    scene: GameScene,
    x: number,
    y: number,
    baseTextures: Array<string>,
    tailTextures: Array<string> | boolean
  ) {
    super(scene, label);
    [this.x, this.y] = [x, y];
    this.scene = scene;
    const { width, height } = this.scene.sys.game.canvas;
    this.screenHeight = height;
    this.screenWidth = width;
    this.tail = scene.add.sprite(x, y, "");
    this.sprite = scene.physics.add.sprite(x, y, "");
    //this.initTail(tailTextures[0], .5);
    this.initSprite(baseTextures[0], 0.5);
    this.isMoving = false;
  }

  applyDamage = (dmg: number) => {
    console.debug("ouch");
    this.health! -= dmg;
    if (this.health! <= 0) {
      this.health = 0;
      this.die();
      this.isAlive = false;
    }
  };

  private die = () => {
    // to be overwritten
  };

  private initTail(texture: string, scale: number) {
    this.tail.setTexture(texture);
    this.tail.setScale(scale);
    this.updateTailPosition();
  }

  private updateTailPosition() {
    const [spriteW, hSpriteH] = [
      this.sprite.displayWidth,
      this.sprite.displayHeight / 2,
    ];
    const tailH = this.tail.displayHeight;
    this.tail.setX(this.sprite.x - spriteW);
    this.tail.setY(this.sprite.y + hSpriteH - tailH / 1.5);
  }

  private initSprite(texture: string, scale: number) {
    this.sprite.setTexture(texture);
    this.sprite.setScale(scale);
    this.sprite.setDepth(1);
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  update() {
    this.renderTail();
  }

  async setMovement(event: string) {
    this.isMoving = true;
    this.scene.input.keyboard.on(event, () => {
      this.delay(240);
      this.isMoving = false;
    });
  }

  moveSprite(xOffset: number, yOffset: number) {
    if (!this.outsideScreenArea(this.x + xOffset, this.y + yOffset)) {
      this.x += xOffset;
      this.y += yOffset;
    }
  }

  outsideScreenArea(x: number, y: number) {
    const { width, height } = this.scene.sys.game.canvas;
    const hSpriteW = this.sprite.displayWidth / 2; // Half sprite dims for practical purposes
    const hSpriteH = this.sprite.displayHeight / 2; // Half sprite dims for practical purposes

    return (
      x <= hSpriteW ||
      x >= width - hSpriteW ||
      y <= hSpriteH ||
      y >= height - hSpriteH
    );
  }

  renderTail() {
    if (!this.isMoving) {
      this.tail.alpha = 0;
    } else {
      this.tail.alpha = 1;
    }
    this.updateTailPosition();
  }

  setAcceleration(x : number, y : number) {
    
  }
}
