import Phaser, { Cameras, Scene, Scenes } from 'phaser';
import { DebugMenu } from '../scripts/debugMenu';
import Player from '../scripts/player';
import Enemy from '../scripts/enemy';
import Projectile from "../scripts/projectile";

export default class GameScene extends Phaser.Scene {
  debugMenu!: DebugMenu;
  player!: Player;
  enemies!: Array<Enemy>;
  keyboard!: Phaser.Input.Keyboard.KeyboardPlugin;
  projectiles: Array<Projectile>;


  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('background', 'assets/debugTiles.jpeg');

    this.load.image('catbase', 'assets/sprites/catbase.png')
    this.load.image('flyingtoast', 'assets/sprites/flyingtoast.png')
    this.load.image('rainbowtail', 'assets/sprites/rainbowtail.png')
    this.load.image('rainbowtailalternate', 'assets/sprites/rainbowtailalternate.png')
    this.cameras.main.setBackgroundColor('#0C4179');
    this.keyboard = this.input.keyboard;
  }

  renderTutorial = () => {
    this.add.rectangle(-200+50, -200+50, 300, 200, 0, 1);
    this.add.text(-200, -200, 'move with WASD');
    this.add.text(-200, -150, 'brake with SPACE');
    this.add.text(-200, -100, 'aim with MOUSE');
  }

  randomSignal = () => Math.random() > 0.5 ? -1 : 1;
  randomUnsigned = (min : integer, max : integer) => min + Math.floor(Math.random() * (max - min));
  randomInt = (min : integer, max : integer) => this.randomSignal() * this.randomUnsigned(min, max);

  create() {
    const bg = this.add.image(0, 0, 'background');
    bg.setScale(2.5);
    bg.setAlpha(0.1);
    this.renderTutorial();
    this.player = new Player(this, 0, 0, this.keyboard);

    // Enemies testing:
    this.enemies = new Array<Enemy>();
    for (var i = 0; i < 5; i++) {
      this.enemies.push(new Enemy(this.player, this, this.randomInt(100, 500), this.randomInt(100, 500)));
    }
    
    const logo = this.add.image(400, 70, 'logo');
    this.debugMenu = new DebugMenu(this);
    this.cameras.main.startFollow(this.player.sprite, false, 0.05, 0.05);
    this.cameras.main.zoom = 2;
    this.projectiles = [];
  }

  update() {
    this.debugMenu.update();
    this.player.update();
    this.enemies.forEach((e, i, es) => e.update());
  }

  registerProjectile = (proj: Projectile) => {
    if(this.projectiles.length >= 30) {
      const elem = this.projectiles.shift();
      if (elem)
        elem.destroy();
    }
    this.projectiles.push(proj);

  }
}
