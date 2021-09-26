import Phaser from "phaser";
import { DebugMenu } from "../scripts/debugMenu";
import GameScene from "./Game";

export default class UpgradeScene extends Phaser.Scene {
  mainScene!: GameScene;
  screenWidth?: integer;
  screenHeight?: integer;
  isShowing: boolean;

  constructor() {
    super({ key: "UpgradeScene", active: true });
    this.isShowing = false;
  }

  preload() {}

  create() {
    const { width, height } = this.sys.game.canvas;
    this.screenHeight = height;
    this.screenWidth = width;
    this.mainScene = this.scene.get("GameScene") as GameScene;
  }

  update() {
    if (this.mainScene.scene.isActive() && this.isShowing) {
    }
  }
}
