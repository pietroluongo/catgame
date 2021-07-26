import Phaser from 'phaser';
import { DebugMenu } from '../scripts/debugMenu';

export default class Demo extends Phaser.Scene {
  debugMenu!: DebugMenu;

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');
  }

  create() {
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
  }
}
