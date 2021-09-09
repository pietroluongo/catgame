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
    this.load.image('logo', 'assets/phaser3-logo.png');
    this.load.image('catbase', 'assets/sprites/catbase.png')
    this.load.image('flyingtoast', 'assets/sprites/flyingtoast.png')
    this.load.image('rainbowtail', 'assets/sprites/rainbowtail.png')
    this.load.image('rainbowtailalternate', 'assets/sprites/rainbowtailalternate.png')
    this.cameras.main.setBackgroundColor('#0C4179');
    this.keyboard = this.input.keyboard;
  }

  create() {
    this.add.text(-100, -100, 'move with WASD');
    this.add.text(-100, -50, 'break with SPACE');
    this.add.text(-100, 0, 'aim with MOUSE');
    this.player = new Player(this, 100, 100, this.keyboard);
    let enemy0 = new Enemy(this.player, this, 200, 200); // Testing
    this.enemies = [enemy0]; // Testing
    const logo = this.add.image(400, 70, 'logo');
    this.debugMenu = new DebugMenu(this);
    this.cameras.main.startFollow(this.player.sprite);
    this.projectiles = [];


    this.tweens.add({
      targets: logo,
      y: 350,
      duration: 1500,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }

  update() {
    this.debugMenu.update();
    this.player.update();
    this.enemies[0].update(); // Testing
    // this.keyboard.on('keydown', () => {
    //   console.log('key');
    // })
  }

  registerProjectile = (proj: Projectile) => {
    if(this.projectiles.length >= 30) {
      const elem = this.projectiles.shift();
      elem.destroy();
    }
    this.projectiles.push(proj);

  }
}
