import GameScene from "../../scenes/Game";

export class BarrierBlock extends Phaser.GameObjects.GameObject {
  width: integer;
  height: integer;
  sprite: Phaser.Physics.Arcade.Sprite;
  x: number;
  y: number;

  constructor(
    scene: GameScene,
    label: string,
    sprite: string,
    x: number,
    y: number,
    w: number,
    h: number
  ) {
    super(scene, label);
    [this.x, this.y] = [x, y];
    [this.width, this.height] = [w, h];
    this.sprite = scene.physics.add.sprite(x, y, label + "BarrierSprite");
    this.sprite.setTexture(sprite);
    this.sprite.setScale(
      this.width / this.sprite.width,
      this.height / this.sprite.height
    );
    this.sprite.setImmovable();
    this.scene.physics.add.collider(this.sprite, scene.player.sprite, () => {
      console.debug("COLLIDED");
    });
    this.sprite.setSize(this.width, this.height);
  }

  update() {}
}
