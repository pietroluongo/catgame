import Phaser, { Cameras, Scene, Scenes } from 'phaser';
import { DebugMenu } from '../scripts/debugMenu';
import Player from '../scripts/player';

export default class GameScene extends Phaser.Scene {
  debugMenu!: DebugMenu;
  player!: Player;
  keyboard!: Phaser.Input.Keyboard.KeyboardPlugin;

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');
    this.keyboard = this.input.keyboard;
  }

  create() {
    this.player = new Player(this, 100, 100, this.keyboard);
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
    // this.keyboard.on('keydown', () => {
    //   console.log('key');
    // })
  }
}
