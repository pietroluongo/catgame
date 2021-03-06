import Phaser, { Cameras, Scene, Scenes } from "phaser";
import Player from "../scripts/player";
import Enemy from "../scripts/enemy";
import Projectile, { ProjectileType } from "../scripts/projectile";
import { BarrierBlock } from "../scripts/barrier";
import getMapData from "../scripts/map";
import { EnemySpawner } from "../scripts/spawner";
import Healthpack from "../scripts/healthpack";
import Droppable from "../scripts/droppable";
import { generateNewCatGame } from "..";
import { CURRENT_MAP } from "../utils";

export const INITIAL_CAMERA_ZOOM = 1;

export default class GameScene extends Phaser.Scene {
  player!: Player;
  enemies: Array<Enemy>;
  aliveEnemies: number;
  keyboard!: Phaser.Input.Keyboard.KeyboardPlugin;
  projectiles: Array<Projectile>;
  barriers: Array<BarrierBlock>;
  barrierParentObject?: Phaser.GameObjects.GameObject;
  spawners: Array<EnemySpawner>;
  round: number;
  pickups: Array<Droppable>;
  isPaused: boolean;
  isUpgrading: boolean;
  canRestart: boolean;
  currentMap: string;
  backgroundMusic!: Phaser.Sound.BaseSound;

  constructor(currentMap: string = "assets/maps/catMap.svg") {
    super("GameScene");
    this.projectiles = [];
    this.barriers = [];
    this.spawners = [];
    this.enemies = [];
    this.round = 1;
    this.aliveEnemies = 0;
    this.pickups = [];
    this.isPaused = false;
    this.isUpgrading = false;
    this.canRestart = false;
    this.currentMap = currentMap;
  }

  preload() {
    this.load.image("background", "assets/backgroundSpace.png");

    this.load.text("mapData", `/assets/maps/${CURRENT_MAP}.svg`);
    this.load.audio("nyanCat", ["assets/sfx/nyanCat.ogg"]);

    this.load.image("catbase", "assets/sprites/catbase.png");
    this.load.image("catnip", "assets/sprites/catnip.png");
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

  killEnemy = () => {
    this.aliveEnemies--;
  };

  create() {
    this.backgroundMusic = this.sound.add("nyanCat");
    this.barrierParentObject = new Phaser.GameObjects.GameObject(
      this,
      "sprite"
    );

    const bg = this.add.image(5100, 5100, "background").setOrigin(0.5);
    bg.setScale(2);
    bg.setAlpha(0.5);
    this.renderTutorial();
    this.player = new Player(this, 5100, 5100, this.keyboard);

    const mapData = getMapData(this.cache.text.get("mapData"));
    const mapBlocks = mapData.blocks.map((block) =>
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

    const MapSpawners = mapData.spawners.map((spawn) =>
      this.spawners.push(new EnemySpawner(this, spawn.x, spawn.y, spawn.r, 10))
    );

    this.cameras.main.startFollow(this.player.sprite, false, 0.05, 0.05);
    this.cameras.main.zoom = INITIAL_CAMERA_ZOOM;
    this.projectiles = [];
    const { width, height } = this.sys.game.canvas;
    const minimap = this.cameras
      .add(width - 400, 0, 400, 400)
      .setZoom(0.1)
      .setName("minimap");
    minimap.startFollow(this.player);
    this.playMusic();
  }

  stopMusic() {
    this.backgroundMusic.stop();
  }

  pauseMusic() {
    this.backgroundMusic.pause();
  }

  resumeMusic() {
    this.backgroundMusic.resume();
  }

  playMusic() {
    this.backgroundMusic.play();
  }

  update() {
    this.player.update();
    this.enemies.forEach((e) => e.update());
    this.spawners.forEach((e) => e.update());
    this.pickups.map((p) => p.update());
    if (this.aliveEnemies === 0) {
      this.nextRound();
    }
  }

  nextRound() {
    this.round += 1;
    this.enemies = [];
    this.respawnEnemies();
  }

  respawnEnemies() {
    this.spawners.forEach((e) => e.respawn());
  }

  registerEnemy = (e: Enemy) => {
    this.aliveEnemies++;
    this.enemies.push(e);
    e.sprite.setBounce(1, 1);
    this.physics.add.collider(e.sprite, this.barriers);
  };

  registerDroppable = (d: Droppable) => {
    this.pickups.push(d);
    this.physics.add.overlap(this.player.sprite, d.sprite, () => {
      d.pickup();
    });
  };

  registerProjectile = (proj: Projectile) => {
    if (proj.origin == ProjectileType.enemy) {
      this.physics.add.overlap(proj.sprite, this.player.sprite, () => {
        this.player.applyDamage(2);
      });
    } else {
      this.enemies.map((enemy) => {
        this.physics.add.overlap(enemy.sprite, proj.sprite, () => {
          enemy.applyDamage(this.player.getCurrentDamageValues());
        });
      });
    }

    // Colliding with enemies
    this.enemies.map((enemy) => {
      this.physics.add.collider(enemy.sprite, this.player.sprite, () => {
        if (enemy.isAlive) this.player.applyDamage(5);
        if (this.player.isAlive) enemy.applyDamage(100);
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
