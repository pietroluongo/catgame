import Phaser from 'phaser';
import config from './config';
import MainMenuScene from './scenes/MainMenu';
import gameScene from './scenes/Game'

const catGame = new Phaser.Game(
  Object.assign(config, {
    scene: [gameScene, MainMenuScene]
  })
);