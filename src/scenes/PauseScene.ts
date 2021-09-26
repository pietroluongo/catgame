import Phaser from "phaser";
import GameScene from "./Game";

export default class PauseScene extends Phaser.Scene {
  mainScene?: GameScene;
  bg!: Phaser.GameObjects.Rectangle;
  constructor() {
    super({ key: "PauseScene", active: true });
  }

  preload() {
    this.load.image("background", "assets/debugTiles.jpeg");
    this.load.image("logo", "assets/phaser3-logo.png");
  }

  create() {
    const { width, height } = this.sys.game.canvas;
    console.debug("OK!");
    console.debug(width, height);
    this.bg = this.add.rectangle(0, 0, width, height, 0, 1).setAlpha(0);
    this.bg.scale = 2;

    this.mainScene = this.scene.get("GameScene") as GameScene;

    this.input.keyboard.on("keydown-ESC", () => {
      if (!this.mainScene!.isPaused) {
        this.mainScene!.isPaused = true;
        return this.scene.pause("GameScene");
      }
      this.mainScene!.isPaused = false;
      return this.scene.resume("GameScene");
    });
  }

  checkBackgroundAlpha() {
    if (this.mainScene?.isPaused) {
      this.bg.setAlpha(0.8);
    } else {
      this.bg.setAlpha(0);
    }
  }

  update() {
    this.checkBackgroundAlpha();
  }
}
