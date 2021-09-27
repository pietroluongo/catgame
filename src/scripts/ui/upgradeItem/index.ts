import GameScene from "../../../scenes/Game";
import UpgradeScene from "../../../scenes/UpgradeScene";

const CARD_WIDTH = 250;
const CARD_HEIGHT = 400;

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
    this.background = this.scene.add.rectangle(
      x,
      y,
      CARD_WIDTH,
      CARD_HEIGHT,
      0x032645
    );
    this.title = this.scene.add
      .text(x, y, title, {
        fontSize: "2rem",
        wordWrap: { width: 240 },
        align: "center",
      })
      .setOrigin(0.5);
    this.description = this.scene.add
      .text(x, y + 75, description, {
        fontSize: "1.5rem",
        wordWrap: { width: 240 },
        align: "center",
      })
      .setOrigin(0.5);
    this.upgradeButton = this.scene.add
      .rectangle(x, y + 150, CARD_WIDTH - 20, 50, 0x07589f, 1)
      .setInteractive();
    this.upgradeText = this.scene.add
      .text(x, y + 150, "UPGRADE", { fontSize: "2rem" })
      .setOrigin(0.5);
  }

  setVisibility(v: boolean) {
    if (v) {
      this.background.setAlpha(1);
      this.title.setAlpha(1);
      this.description.setAlpha(1);
      this.upgradeText.setAlpha(1);
      this.upgradeButton.setAlpha(1);
    } else {
      this.background.setAlpha(0);
      this.title.setAlpha(0);
      this.description.setAlpha(0);
      this.upgradeText.setAlpha(0);
      this.upgradeButton.setAlpha(0);
    }
  }

  create() {}
}