import Phaser, { Cameras, Scene, Scenes } from "phaser";
import Player from "../scripts/player";
import Enemy from "../scripts/enemy";
import Projectile, { ProjectileType } from "../scripts/projectile";
import { BarrierBlock } from "../scripts/barrier";
import getMapData from "../scripts/map";

export const INITIAL_CAMERA_ZOOM = 2.5;

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
    this.load.image("background", "assets/debugTiles.png");

    this.load.image("catbase", "assets/sprites/catbase.png");
    this.load.image("flyingtoast", "assets/sprites/flyingtoast.png");
    this.load.image("rainbowtail", "assets/sprites/rainbowtail.png");
    this.load.image(
      "rainbowtailalternate",
      "assets/sprites/rainbowtailalternate.png"
    );
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
    for (var i = 0; i < 0; i++) {
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
      { corner: "cakeLeft", flat: "cakeMid", inside: "cakeCenter" },
      -5100,
      -5100,
      10,
      5100 * 2
    );
    const firstBarrier = new BarrierBlock(
      this,
      "block",
      { corner: "cakeLeft", flat: "cakeMid", inside: "cakeCenter" },
      0,
      3776,
      5400,
      64
    );
    const dbgBarrier = new BarrierBlock(
      this,
      "block",
      { corner: "cakeLeft", flat: "cakeMid", inside: "cakeCenter" },
      200,
      200,
      200,
      200
    );

    const mapData = getMapData().map((block) =>
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
    // this.barriers.map((bar) =>
    //   this.physics.add.collider(proj.sprite, bar.sprites, () => proj.destroy())
    // );

    if (this.projectiles.length >= 30) {
      const elem = this.projectiles.shift();
      if (elem) elem.destroy();
    }
    this.projectiles.push(proj);
  };
}
