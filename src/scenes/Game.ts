import Phaser, { Cameras, Scene, Scenes } from 'phaser';
import { DebugMenu } from '../scripts/debugMenu';
import Player from '../scripts/player';
import Enemy from '../scripts/enemy';

export default class GameScene extends Phaser.Scene {
  debugMenu!: DebugMenu;
  player!: Player;
  enemies!: Array<Enemy>;
  keyboard!: Phaser.Input.Keyboard.KeyboardPlugin;

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');
    this.load.image('catbase', 'assets/sprites/catbase.png')
    this.load.image('flyingtoast', 'assets/sprites/flyingtoast.png')
    this.load.image('rainbowtail', 'assets/sprites/rainbowtail.png')
    this.load.image('rainbowtailalternate', 'assets/sprites/rainbowtailalternate.png')
    this.keyboard = this.input.keyboard;
  }

  create() {
    this.player = new Player(this, 100, 100, this.keyboard);
    let enemy0 = new Enemy(this, 200, 200); // Testing
    this.enemies = [enemy0]; // Testing
    const logo = this.add.image(400, 70, 'logo');
    this.debugMenu = new DebugMenu(this);


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
}
