export class DebugMenu {
    areDebugStatsActive: Boolean;
    debugText?: Phaser.GameObjects.Text;
    debugBg?: Phaser.GameObjects.Rectangle;
    scene: Phaser.Scene;

    debugLog?: Phaser.GameObjects.Text;
    debugLogBg?: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.areDebugStatsActive = false;
        this.areDebugStatsActive = false;
        this.debugBg = this.scene.add.rectangle(0, 0, 500, 3000, 0x000000).setAlpha(0);
        this.debugText = this.scene.add.text(10, 10, '', {
            fontFamily: '"Press Start P2"',
            fontSize: '16px'
        }).setAlpha(0);
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
            this.debugBg!.setAlpha(1);
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
            'gamestate: ' + 'main game loop'
        ])
    }

}