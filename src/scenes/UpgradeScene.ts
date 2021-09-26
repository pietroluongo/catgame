import Phaser from "phaser";
import GameScene from "./Game";

export default class UpgradeScene extends Phaser.Scene {
  mainScene?: GameScene;
  bg!: Phaser.GameObjects.Rectangle;
  title!: Phaser.GameObjects.Text;
  constructor() {
    super({ key: "UpgradeScene", active: true });
  }

  preload() {
    this.load.image("background", "assets/debugTiles.jpeg");
    this.load.image("logo", "assets/phaser3-logo.png");
  }

  create() {
    const { width, height } = this.sys.game.canvas;
    this.bg = this.add
      .rectangle(0, 0, width, height, 0, -1)
      .setAlpha(0)
      .setDepth(-999);
    this.bg.scale = 2;

    this.title = this.add
      .text(width / 2, height / 10, "UPGRADES", {
        fontSize: "3rem",
      })
      .setDepth(999)
      .setAlpha(0)
      .setOrigin(0.5);

    this.mainScene = this.scene.get("GameScene") as GameScene;

    this.input.keyboard.on("keydown-TAB", () => {
      if (this.mainScene?.isPaused) return;
      if (!this.mainScene!.isUpgrading) {
        this.mainScene!.isUpgrading = true;
        return this.scene.pause("GameScene");
      }
      this.mainScene!.isUpgrading = false;
      return this.scene.resume("GameScene");
    });
  }

  checkAlpha() {
    if (this.mainScene?.isUpgrading) {
      this.title.setAlpha(1);
      this.bg.setAlpha(0.2);
    } else {
      this.bg.setAlpha(0);
      this.title.setAlpha(0);
    }
  }

  update() {
    this.checkAlpha();
  }
}
