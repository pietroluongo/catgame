import GameScene from "../../scenes/Game";

const SPRITE_SIZE_IN_PIXELS = 32;
const MIN_SIZE = 64;

interface SpriteList {
  inside: string;
  flat: string;
  corner: string;
}

export class BarrierBlock extends Phaser.Physics.Arcade.StaticBody {
  width: integer;
  height: integer;
  scene: GameScene;
  x: number;
  y: number;
  body: Phaser.Physics.Arcade.StaticBody;
  sprites: SpriteList;

  private buildTiles = () => {
    // FIXME: This is dumb, almost certainly there's a better way to do this!
    const spriteCount = [
      Math.ceil(this.width / SPRITE_SIZE_IN_PIXELS),
      Math.ceil(this.height / SPRITE_SIZE_IN_PIXELS),
    ];
    let i, j;
    const endX = spriteCount[0] - 1;
    const endY = spriteCount[1] - 1;
    for (i = 0; i < spriteCount[0]; i++) {
      for (j = 0; j < spriteCount[1]; j++) {
        console.debug(i, j);
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
    super(scene.physics.world, scene.barrierParentObject!);
    this.scene = scene;
    this.sprites = sprites;
    this.body = new Phaser.Physics.Arcade.StaticBody(
      this.world,
      this.gameObject
    );
    this.setSize(300, 300);
    this.debugShowBody = true;
    [this.x, this.y] = [x, y];
    this.width = w < MIN_SIZE ? MIN_SIZE : w;
    this.height = h < MIN_SIZE ? MIN_SIZE : h;
    this.buildTiles();

    // scene.add.sprite(x, y, sprites.inside);
    // const a = scene.physics.add
    //   .staticSprite(x, y, label + "BarrierSprite")
    //   .setScale(2, 2);
    // scene.physics.add.collider(a, scene.player.sprite);
    // a.setSize(300, 300);
    //this.sprite.setTexture(sprite);
    //this.sprite.setScale(
    //this.width / this.sprite.width,
    //this.height / this.sprite.height
    //);
    //this.sprite.setImmovable();
    // this.scene.physics.add.collider(this.sprites, scene.player.sprite, () => {
    //   console.debug("COLLIDED");
    // });
  }

  update() {}
}
