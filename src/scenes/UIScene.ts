import Phaser from "phaser";
import { DebugMenu } from "../scripts/debugMenu";
import GameScene from "./Game";

export default class UIScene extends Phaser.Scene {
  debugMenu!: DebugMenu;
  mainScene!: GameScene;
  healthText?: Phaser.GameObjects.Text;
  screenWidth?: integer;
  screenHeight?: integer;
  constructor() {
    super({ key: "UIScene", active: true });
  }

  preload() {}

  create() {
    const { width, height } = this.sys.game.canvas;
    this.screenHeight = height;
    this.screenWidth = width;
    this.healthText = this.add.text(
      this.screenWidth / 20,
      this.screenHeight - this.screenHeight / 10,
      "Vida:",
      {
        fontSize: "3rem",
      }
    );
    this.mainScene = this.scene.get("GameScene") as GameScene;
    this.debugMenu = new DebugMenu(this);
  }

  drawHealth = () => {
    const health = this.mainScene.player.health;
    this.healthText!.text = `Vida: ${health}`;
  };

  update() {
    if (this.mainScene.scene.isActive()) {
      this.debugMenu.update();
      this.drawHealth();
    }
  }
}
