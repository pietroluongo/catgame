import Phaser, { Cameras, Scene, Scenes } from "phaser";
import Player from "../scripts/player";
import Enemy from "../scripts/enemy";
import Projectile, { ProjectileType } from "../scripts/projectile";
import { BarrierBlock } from "../scripts/barrier";
import getMapData from "../scripts/map";

export const INITIAL_CAMERA_ZOOM = 0.1;

const CENTER_COORDS = [5100, 5100];

export default class GameScene extends Phaser.Scene {
  player!: Player;
  enemies!: Array<Enemy>;
  keyboard!: Phaser.Input.Keyboard.KeyboardPlugin;
  projectiles: Array<Projectile>;
  barriers: Array<BarrierBlock>;
  barrierParentObject?: Phaser.GameObjects.GameObject;

  constructor() {
    super("GameScene");
    this.projectiles = [];
    this.barriers = [];
  }

  preload() {
    this.load.image("background", "assets/backgroundSpace.png");

    this.load.text("mapData", "assets/catMap.svg");

    this.load.image("catbase", "assets/sprites/catbase.png");
    this.load.image("flyingtoast", "assets/sprites/flyingtoast.png");
    this.load.image("rainbowtail", "assets/sprites/rainbowtail.png");
    this.load.image(
      "rainbowtailalternate",
      "assets/sprites/rainbowtailalternate.png"
    );
    this.load.image("powercookie", "assets/sprites/powercookie.png");
    this.load.image("cakeMid", "assets/sprites/wall/Tile_02.png");
    this.load.image("cakeLeft", "assets/sprites/wall/Tile_01.png");
    this.load.image("cakeCenter", "assets/sprites/wall/Tile_12.png");
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
    this.barrierParentObject = new Phaser.GameObjects.GameObject(
      this,
      "sprite"
    );

    const bg = this.add.image(0, 0, "background").setOrigin(0);
    bg.setScale(5);
    bg.setAlpha(0.5);
    this.renderTutorial();
    this.player = new Player(this, 5100, 5100, this.keyboard);

    // Enemies testing:
    this.enemies = new Array<Enemy>();
    for (var i = 0; i < 100; i++) {
      this.enemies.push(
        new Enemy(this.player, this, this.randomInt(0, 0), this.randomInt(0, 0))
      );
    }

    const mapData = getMapData(this.cache.text.get("mapData")).map((block) =>
      this.barriers.push(
        new BarrierBlock(
          this,
          "block",
          { corner: "cakeLeft", flat: "cakeMid", inside: "cakeCenter" },
          block.x,
          block.y,
          block.width,
          block.height
        )
      )
    );

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

    this.physics.add.collider(proj.sprite, this.barriers, () => proj.destroy());

    if (this.projectiles.length >= 30) {
      const elem = this.projectiles.shift();
      if (elem) elem.destroy();
    }
    this.projectiles.push(proj);
  };
}
