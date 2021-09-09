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
    this.add.text(-200, -150, 'break with SPACE');
    this.add.text(-200, -100, 'aim with MOUSE');
  }

  create() {
    const bg = this.add.image(0, 0, 'background');
    bg.setScale(2.5);
    this.renderTutorial();
    this.player = new Player(this, 0, 0, this.keyboard);
    //const enemy0 = new Enemy(this.player, this, 200, 200); // Testing
    //this.enemies = [enemy0]; // Testing
    const logo = this.add.image(400, 70, 'logo');
    this.debugMenu = new DebugMenu(this);
    this.cameras.main.startFollow(this.player.sprite, false, 0.1, 0.1);
    this.projectiles = [];
  }

  update() {
    this.debugMenu.update();
    this.player.update();
    // this.enemies[0].update(); // Testing
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
