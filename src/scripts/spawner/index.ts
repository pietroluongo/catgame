import GameScene from "../../scenes/Game";
import { randomUnsignedFloat } from "../../utils";
import Enemy from "../enemy";
import Player from "../player";

const SPRITE_SIZE_IN_PIXELS = 32;
const MIN_SIZE = 64;

interface SpriteList {
  inside: string;
  flat: string;
  corner: string;
}

export class EnemySpawner extends Phaser.GameObjects.GameObject {
  radius: integer;
  scene: GameScene;
  x: number;
  y: number;
  enemyCount: number;
  enemies: Array<Enemy>;
  player: Player;

  constructor(
    scene: GameScene,
    x: number,
    y: number,
    r: number,
    count: number
  ) {
    super(scene, "area");
    this.scene = scene;
    [this.x, this.y] = [x, y];
    this.enemyCount = count;
    this.radius = r;
    this.enemies = [];
    this.player = this.scene.player;
    scene.add.circle(this.x, this.y, this.radius, 0xff0000, 0.1);
    console.debug("Spawner added at ", x, y);
    [...Array(this.enemyCount)].map(() => {
      // Polar coordinates
      const r = this.radius * Math.sqrt(Math.random());
      const t = Math.random() * 2 * 3.1415;
      const randX = this.x + r * Math.cos(t);
      const randY = this.y + r * Math.sin(t);
      const e = new Enemy(this.player, this.scene, randX, randY);
      this.enemies.push(e);
      this.scene.registerEnemy(e);
    });
  }

  update() {
    this.enemies.map((e) => e.update());
  }
}
