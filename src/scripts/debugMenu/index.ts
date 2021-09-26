import UIScene from "../../scenes/UIScene";

export class DebugMenu {
  areDebugStatsActive: Boolean;
  debugText?: Phaser.GameObjects.Text;
  debugBg?: Phaser.GameObjects.Rectangle;
  scene: UIScene;

  debugLog?: Phaser.GameObjects.Text;
  debugLogBg?: Phaser.GameObjects.Text;

  constructor(scene: UIScene) {
    this.scene = scene;
    this.areDebugStatsActive = false;
    this.areDebugStatsActive = false;
    this.debugBg = this.scene.add
      .rectangle(0, 0, 500, 300, 0x000000)
      .setAlpha(0)
      .setScrollFactor(0, 0);
    this.debugText = this.scene.add
      .text(10, 10, "", {
        fontFamily: '"Press Start P2"',
        fontSize: "16px",
      })
      .setAlpha(0)
      .setScrollFactor(0, 0);
    const consoleKeyStatus = this.scene.input.keyboard.addKey("tab", true);
    consoleKeyStatus.on("down", () => {
      this.areDebugStatsActive = !this.areDebugStatsActive;
    });
    this.debugBg.setDepth(999);
    this.debugText.setDepth(999);
  }

  update() {
    if (this.areDebugStatsActive) {
      this.debugText!.setAlpha(1);
      this.debugBg!.setAlpha(0.5);
    } else {
      this.debugText!.setAlpha(0);
      this.debugBg!.setAlpha(0);
    }
    // Updating player every frame
    const pointer = this.scene.mainScene.input.activePointer;
    this.debugText!.setText([
      "mouse x: " + pointer.x,
      "mouse y: " + pointer.y,
      "angle: " + this.scene.mainScene.player.sprite.angle,
      "player x: " + this.scene.mainScene.player.x,
      "player y: " + this.scene.mainScene.player.y,
      "projectile count: " + this.scene.mainScene.projectiles.length,
      "enemy count: " + this.scene.mainScene.aliveEnemies,
      "gamestate: " + "main game loop",
    ]);
  }
}
