import GameScene from "../../scenes/Game";

export enum ProjectileType {
  enemy,
  player,
}

export default class Projectile extends Phaser.GameObjects.GameObject {
  sprite: Phaser.Physics.Arcade.Sprite;
  scene: GameScene;
  coords: { x: number; y: number; angle: number };
  origin: ProjectileType;

  constructor(
    scene: GameScene,
    label: string,
    type: ProjectileType,
    x: number,
    y: number,
    angle: number = 0,
    speed: number = 100
  ) {
    super(scene, label);
    this.scene = scene;
    this.coords = { x, y, angle };
    this.sprite = scene.physics.add.sprite(x, y, label);
    this.origin = type;
    this.sprite.debugShowVelocity = true;
    this.sprite.debugShowBody = true;
    this.scene.registerProjectile(this);
    this.sprite.enableBody(true, x, y, true, true);
    this.scene.physics.velocityFromAngle(
      angle,
      speed,
      this.sprite.body.velocity
    );
  }

  update() {}

  destroy() {
    console.log("destroying projectile...");
    this.sprite.destroy();
    super.destroy();
  }
}
