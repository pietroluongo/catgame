import Phaser from "phaser";
import GameScene from "./Game";

export default class PauseScene extends Phaser.Scene {
  mainScene?: GameScene;
  bg!: Phaser.GameObjects.Rectangle;
  text!: Phaser.GameObjects.Text;
  constructor() {
    super({ key: "PauseScene", active: true });
  }

  preload() {
    this.load.image("background", "assets/debugTiles.jpeg");
    this.load.image("logo", "assets/phaser3-logo.png");
  }

  create() {
    const { width, height } = this.sys.game.canvas;
    this.bg = this.add
      .rectangle(0, 0, width, height, 0, 1)
      .setAlpha(0)
      .setDepth(-999);
    this.bg.scale = 2;
    this.text = this.add
      .text(width / 2, height / 2, "PAUSADO", { fontSize: "3rem" })
      .setOrigin(0.5)
      .setAlpha(0)
      .setDepth(0);

    this.mainScene = this.scene.get("GameScene") as GameScene;

    this.input.keyboard.on("keydown-ESC", () => {
      if (this.mainScene?.isUpgrading) return;
      if (!this.mainScene!.isPaused) {
        this.mainScene!.isPaused = true;
        this.mainScene?.pauseMusic();
        return this.scene.pause("GameScene");
      }
      this.mainScene!.isPaused = false;
      this.mainScene?.resumeMusic();
      return this.scene.resume("GameScene");
    });
  }

  checkBackgroundAlpha() {
    if (this.mainScene?.isPaused) {
      this.bg.setAlpha(0.8);
      this.text.setAlpha(1);
    } else {
      this.bg.setAlpha(0);
      this.text.setAlpha(0);
    }
  }

  update() {
    this.checkBackgroundAlpha();
  }
}
