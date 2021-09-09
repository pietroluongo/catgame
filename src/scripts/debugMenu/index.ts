import GameScene from "../../scenes/Game";

export class DebugMenu {
    areDebugStatsActive: Boolean;
    debugText?: Phaser.GameObjects.Text;
    debugBg?: Phaser.GameObjects.Rectangle;
    scene: GameScene;

    debugLog?: Phaser.GameObjects.Text;
    debugLogBg?: Phaser.GameObjects.Text;

    constructor(scene: GameScene) {
        this.scene = scene;
        this.areDebugStatsActive = false;
        this.areDebugStatsActive = false;
        this.debugBg = this.scene.add.rectangle(0, 0, 500, 300, 0x000000,)
            .setAlpha(0)
            .setScrollFactor(0, 0);
        this.debugText = this.scene.add.text(10, 10, '', {
            fontFamily: '"Press Start P2"',
            fontSize: '16px'
        })
            .setAlpha(0)
            .setScrollFactor(0, 0);
        const consoleKeyStatus = this.scene.input.keyboard.addKey('tab', true);
        consoleKeyStatus.on('down', () => {
            this.areDebugStatsActive = !this.areDebugStatsActive;
        });
        this.debugBg.setDepth(999);
        this.debugText.setDepth(999);
    }


    update() {
        if (this.areDebugStatsActive) {
            this.debugText!.setAlpha(1);
            this.debugBg!.setAlpha(0.5);
        }
        else {
            this.debugText!.setAlpha(0);
            this.debugBg!.setAlpha(0);

        }
        // Updating player every frame
        const pointer = this.scene.input.activePointer;
        this.debugText!.setText([
            'mouse x: ' + pointer.x,
            'mouse y: ' + pointer.y,
            'angle: ' + this.scene.player.sprite.angle,
            'player x: ' + this.scene.player.x,
            'player y: ' + this.scene.player.y,
            'projectile count: ' + this.scene.projectiles.length,
            'gamestate: ' + 'main game loop'
        ])
    }

}