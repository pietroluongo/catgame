import Phaser, { Cameras, Scene, Scenes } from "phaser";
import Player from "../scripts/player";
import Enemy from "../scripts/enemy";
import Projectile, { ProjectileType } from "../scripts/projectile";
import { BarrierBlock } from "../scripts/barrier";

export const INITIAL_CAMERA_ZOOM = 2.5;

export default class GameScene extends Phaser.Scene {
  player!: Player;
  enemies!: Array<Enemy>;
  keyboard!: Phaser.Input.Keyboard.KeyboardPlugin;
  projectiles: Array<Projectile>;
  barriers: Array<BarrierBlock>;

  constructor() {
    super("GameScene");
    this.projectiles = [];
    this.barriers = [];
  }

  preload() {
    this.load.image("background", "assets/debugTiles.png");

    this.load.image("catbase", "assets/sprites/catbase.png");
    this.load.image("flyingtoast", "assets/sprites/flyingtoast.png");
    this.load.image("rainbowtail", "assets/sprites/rainbowtail.png");
    this.load.image(
      "rainbowtailalternate",
      "assets/sprites/rainbowtailalternate.png"
    );
    this.cameras.main.setBackgroundColor("#0C4179");
    this.keyboard = this.input.keyboard;
  }

  renderTutorial = () => {
    this.add.rectangle(-200 + 50, -200 + 50, 300, 200, 0, 1);
    this.add.text(-200, -200, "move with WASD");
    this.add.text(-200, -150, "brake with SPACE");
    this.add.text(-200, -100, "aim with MOUSE");
  };

  randomSignal = () => (Math.random() > 0.5 ? -1 : 1);
  randomUnsigned = (min: integer, max: integer) =>
    min + Math.floor(Math.random() * (max - min));
  randomInt = (min: integer, max: integer) =>
    this.randomSignal() * this.randomUnsigned(min, max);

  create() {
    const bg = this.add.image(0, 0, "background").setOrigin(0.5);
    bg.setScale(5);
    bg.setAlpha(0.5);
    this.renderTutorial();
    this.player = new Player(this, 0, 0, this.keyboard);

    // Enemies testing:
    this.enemies = new Array<Enemy>();
    for (var i = 0; i < 5; i++) {
      this.enemies.push(
        new Enemy(
          this.player,
          this,
          this.randomInt(100, 500),
          this.randomInt(100, 500)
        )
      );
    }

    // Adding one barrier:
    const barrier = new BarrierBlock(
      this,
      "block",
      "rainbowtail",
      200,
      200,
      200,
      200
    );
    this.barriers.push(barrier);
    const logo = this.add.image(400, 70, "logo");
    this.cameras.main.startFollow(this.player.sprite, false, 0.05, 0.05);
    this.cameras.main.zoom = INITIAL_CAMERA_ZOOM;
    this.projectiles = [];
  }

  update() {
    this.player.update();
    this.enemies.forEach((e, i, es) => e.update());
  }

  registerProjectile = (proj: Projectile) => {
    if (proj.origin == ProjectileType.enemy) {
      this.physics.add.overlap(proj.sprite, this.player.sprite, () => {
        this.player.applyDamage(2);
      });
    } else {
      this.enemies.map((enemy) => {
        this.physics.add.overlap(enemy.sprite, proj.sprite, () => {
          enemy.applyDamage(100);
        });
      });
    }

    // Colliding with enemies
    this.enemies.map((enemy) => {
      this.physics.add.collider(enemy.sprite, this.player.sprite, () => {
        if (enemy.isAlive) this.player.applyDamage(5);
        enemy.applyDamage(100);
      });
    });
    this.barriers.map((bar) =>
      this.physics.add.collider(proj.sprite, bar.sprite, () => proj.destroy())
    );

    if (this.projectiles.length >= 30) {
      const elem = this.projectiles.shift();
      if (elem) elem.destroy();
    }
    this.projectiles.push(proj);
  };
}
