import GameScene from "../../scenes/Game";

export default class Projectile extends Phaser.GameObjects.GameObject {
    sprite: Phaser.Physics.Arcade.Sprite;
    scene: GameScene;
    coords: {x, y, angle};
    constructor(scene: GameScene, label: string, x: number, y: number, angle: number = 0, speed: number = 100) {
        super(scene, label);
        this.sprite = scene.physics.add.sprite(x, y, label);
        this.sprite.debugShowVelocity = true;
        this.sprite.debugShowBody = true;
        this.scene.registerProjectile(this);
        this.sprite.enableBody(true, x, y, true, true);
        this.scene.physics.velocityFromAngle(angle, 1000, this.sprite.body.velocity)
    }

    update() {

    }

    destroy() {
        console.log('destroying projectile...');
        this.sprite.destroy();
        super.destroy();
    }
}