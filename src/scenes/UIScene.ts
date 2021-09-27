import Phaser from "phaser";
import { DebugMenu } from "../scripts/debugMenu";
import GameScene from "./Game";

export default class UIScene extends Phaser.Scene {
  debugMenu!: DebugMenu;
  mainScene!: GameScene;
  healthText?: Phaser.GameObjects.Text;
  roundText?: Phaser.GameObjects.Text;
  screenWidth?: integer;
  screenHeight?: integer;
  scoreText?: Phaser.GameObjects.Text;
  hasDrawnDeathText: boolean;
  constructor() {
    super({ key: "UIScene", active: true });
    this.hasDrawnDeathText = false;
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
    this.scoreText = this.add.text(
      this.screenWidth - this.screenWidth / 4,
      this.screenHeight / 3,
      "Pontuação: ",
      { fontSize: "2rem" }
    );
    this.roundText = this.add.text(
      this.screenWidth - this.screenWidth / 6,
      this.screenHeight - this.screenHeight / 10,
      "Round",
      { fontSize: "3rem" }
    );
    this.mainScene = this.scene.get("GameScene") as GameScene;
    this.debugMenu = new DebugMenu(this);
  }

  drawHealth = () => {
    const health = this.mainScene.player.health;
    this.healthText!.text = `Vida: ${health}`;
  };

  drawScore = () => {
    const score = this.mainScene.player.score;
    this.scoreText!.text = `Pontuação: ${score}`;
  };

  drawRound = () => {
    const round = this.mainScene.round;
    this.roundText!.text = `Round ${round}`;
  };

  drawDeathText = () => {
    if (
      this.mainScene.player &&
      !this.mainScene.player.isAlive &&
      !this.hasDrawnDeathText
    ) {
      this.hasDrawnDeathText = true;
      const deathBg = this.add
        .rectangle(0, 0, this.screenWidth, this.screenHeight, 0)
        .setAlpha(0)
        .setScale(2);

      const txt = this.add
        .text(this.screenWidth! / 2, this.screenHeight! / 2, "PERDEU", {
          fontSize: "10rem",
          color: "red",
          fontStyle: "bold",
        })
        .setOrigin(0.5)
        .setAlpha(0);

      const txt2 = this.add
        .text(
          this.screenWidth! / 2,
          this.screenHeight! / 2 + this.screenHeight! / 8,
          "Seus resultados foram salvos.",
          {
            fontSize: "2rem",
            fontStyle: "bold",
          }
        )
        .setOrigin(0.5)
        .setAlpha(0);

      const txt3 = this.add
        .text(
          this.screenWidth! / 2,
          this.screenHeight! / 2 + this.screenHeight! / 6,
          "Pressione Ctrl+R para tentar de novo",
          {
            fontSize: "2rem",
            fontStyle: "bold",
          }
        )
        .setOrigin(0.5)
        .setAlpha(0);

      setTimeout(() => {
        this.tweens.add({
          targets: [txt, txt2, txt3],
          alpha: 1,
          duration: 2000,
        });
      }, 1000);

      this.tweens.add({
        targets: [deathBg],
        alpha: 0.8,
        duration: 600,
      });
    }
  };

  update() {
    if (this.mainScene.scene.isActive()) {
      this.debugMenu.update();
      this.drawHealth();
      this.drawScore();
      this.drawRound();
      this.drawDeathText();
    }
  }
}
