import Phaser from 'phaser';

export default class MainMenu extends Phaser.Scene {
  constructor() {
    super('MainMenuScene');
  }

  preload() {
    this.load.image('background', 'assets/debugTiles.jpeg');
    this.load.image('logo', 'assets/phaser3-logo.png');
  }

  create() {
    const bg = this.add.image(1000, 1000, 'background');
    const logo = this.add.image(400, 70, 'logo');
    const title = this.add.text(180, 200, 'JOGO DO GATO', {align: "center", fontSize: "4rem", backgroundColor: "black"});
    logo.setInteractive();
    logo.on('pointerup', () => {
        this.scene.start('GameScene');
        console.debug("LOGO CLICK");
    })
  }

  update() {
  }
}
