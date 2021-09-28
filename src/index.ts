import Phaser from "phaser";
import config from "./config";
import MainMenuScene from "./scenes/MainMenu";
import gameScene from "./scenes/Game";
import UIScene from "./scenes/UIScene";
import UpgradeScene from "./scenes/UpgradeScene";
import PauseScene from "./scenes/PauseScene";

export const generateNewCatGame = () =>
  new Phaser.Game(
    Object.assign(config, {
      scene: [gameScene, UIScene, UpgradeScene, PauseScene],
    })
  );

generateNewCatGame();
