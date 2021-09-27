import GameScene from "../../../scenes/Game";
import UpgradeScene from "../../../scenes/UpgradeScene";

export default class UpgradeItem extends Phaser.GameObjects.GameObject {
  x: number;
  y: number;
  background: Phaser.GameObjects.Rectangle;
  title: Phaser.GameObjects.Text;
  description: Phaser.GameObjects.Text;
  icon: Phaser.GameObjects.Image;
  upgradeButton: Phaser.GameObjects.Rectangle;
  upgradeText: Phaser.GameObjects.Text;
  constructor(
    scene: UpgradeScene,
    x: number,
    y: number,
    title: string,
    description: string,
    icon: string
  ) {
    super(scene, "container");
    this.x = x;
    this.y = y;
    this.background = this.scene.add.rectangle(x, y, 200, 400, 0xff0000);
    this.title = this.scene.add.text(x, y, title);
    this.description = this.scene.add.text(x + 20, y + 40, description);
    // this.upgradeButton = this.scene.add.rectangle(
    //   x + 20,
    //   y + 60,
    //   100,
    //   75,
    //   0,
    //   1
    // );
  }

  create() {}
}
