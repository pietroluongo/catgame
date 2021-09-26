import GameScene from "../../scenes/Game";

export default class Droppable extends Phaser.GameObjects.GameObject {
  x: number;
  y: number;
  scene: GameScene;
  sprite: Phaser.Physics.Arcade.Sprite;
  constructor(
    scene: GameScene,
    x: number,
    y: number,
    sprite: string,
    scale: number = 1
  ) {
    super(scene, "sprite");
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = scene.physics.add
      .sprite(x, y, sprite)
      .setScale(scale)
      .enableBody(true, x, y, true, true)
      .setInteractive();
    scene.registerDroppable(this);
  }

  create() {}

  pickup() {}

  update() {}
}
