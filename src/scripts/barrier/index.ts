import GameScene from "../../scenes/Game";

const SPRITE_SIZE_IN_PIXELS = 32;
const MIN_SIZE = 64;

interface SpriteList {
  inside: string;
  flat: string;
  corner: string;
}

export class BarrierBlock extends Phaser.Physics.Arcade.Sprite {
  width: integer;
  height: integer;
  scene: GameScene;
  x: number;
  y: number;
  sprites: SpriteList;
  spriteCount: { x: number; y: number };

  private buildTiles = () => {
    // FIXME: This is dumb, almost certainly there's a better way to do this!

    let i, j;
    const endX = this.spriteCount.x - 1;
    const endY = this.spriteCount.y - 1;
    for (i = 0; i < this.spriteCount.x; i++) {
      for (j = 0; j < this.spriteCount.y; j++) {
        if (i === 0 && j === 0) {
          this.scene.add.sprite(this.x, this.y, this.sprites.corner);
        } else if (i === endX && j === endY) {
          // bottom right
          this.scene.add
            .sprite(
              this.x + SPRITE_SIZE_IN_PIXELS * i,
              this.y + SPRITE_SIZE_IN_PIXELS * j,
              this.sprites.corner
            )
            .setAngle(180);
        } else if (i === 0 && j === endY) {
          // bottom left
          this.scene.add
            .sprite(
              this.x + SPRITE_SIZE_IN_PIXELS * i,
              this.y + SPRITE_SIZE_IN_PIXELS * j,
              this.sprites.corner
            )
            .setAngle(-90);
        } else if (i === endX && j === 0) {
          // Top left
          this.scene.add
            .sprite(
              this.x + SPRITE_SIZE_IN_PIXELS * i,
              this.y + SPRITE_SIZE_IN_PIXELS * j,
              this.sprites.corner
            )
            .setAngle(90);
        } else if (i === 0 && j !== 0) {
          // Left wall
          this.scene.add
            .sprite(
              this.x + SPRITE_SIZE_IN_PIXELS * i,
              this.y + SPRITE_SIZE_IN_PIXELS * j,
              this.sprites.flat
            )
            .setAngle(-90);
        } else if (i !== 0 && j === 0) {
          // Top
          this.scene.add.sprite(
            this.x + SPRITE_SIZE_IN_PIXELS * i,
            this.y + SPRITE_SIZE_IN_PIXELS * j,
            this.sprites.flat
          );
        } else if (i === endX && j !== endY) {
          // right wall
          this.scene.add
            .sprite(
              this.x + SPRITE_SIZE_IN_PIXELS * i,
              this.y + SPRITE_SIZE_IN_PIXELS * j,
              this.sprites.flat
            )
            .setAngle(90);
        } else if (j === endY) {
          this.scene.add
            .sprite(
              this.x + SPRITE_SIZE_IN_PIXELS * i,
              this.y + SPRITE_SIZE_IN_PIXELS * j,
              this.sprites.flat
            )
            .setAngle(180);
        } else {
          this.scene.add.sprite(
            this.x + SPRITE_SIZE_IN_PIXELS * i,
            this.y + SPRITE_SIZE_IN_PIXELS * j,
            this.sprites.inside
          );
        }
      }
    }
  };

  constructor(
    scene: GameScene,
    label: string,
    sprites: SpriteList,
    x: number,
    y: number,
    w: number,
    h: number
  ) {
    // super(scene.physics.world, scene.barrierParentObject!);
    super(scene, x, y, "");

    this.scene = scene;
    this.sprites = sprites;
    [this.x, this.y] = [x, y];
    this.width = w < MIN_SIZE ? MIN_SIZE : w;
    this.height = h < MIN_SIZE ? MIN_SIZE : h;
    const spriteCount = [
      Math.ceil(this.width / SPRITE_SIZE_IN_PIXELS),
      Math.ceil(this.height / SPRITE_SIZE_IN_PIXELS),
    ];
    this.spriteCount = { x: 0, y: 0 };
    [this.spriteCount.x, this.spriteCount.y] = spriteCount;
    this.buildTiles();
    this.scene.physics.add.existing(this, true);
    scene.physics.add.collider(this, scene.player.sprite);
    this.body.setSize(
      this.spriteCount.x * SPRITE_SIZE_IN_PIXELS,
      this.spriteCount.y * SPRITE_SIZE_IN_PIXELS
    );
    this.body.setOffset(0, 0);
  }
  create() {}
  update() {}
}
