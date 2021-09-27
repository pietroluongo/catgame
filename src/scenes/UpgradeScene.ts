import Phaser from "phaser";
import Player from "../scripts/player";
import UpgradeItem from "../scripts/ui/upgradeItem";
import upgradesList from "../upgrades";
import GameScene from "./Game";

const ITEMS_PER_COLUMN = 4;
const ITEMS_PER_LINE = 4;

export default class UpgradeScene extends Phaser.Scene {
  mainScene?: GameScene;
  bg!: Phaser.GameObjects.Rectangle;
  title!: Phaser.GameObjects.Text;
  upgradeItems: Array<UpgradeItem>;
  X_MARGIN: number;
  Y_MARGIN: number;
  player!: Player;

  constructor() {
    super({ key: "UpgradeScene", active: true });
    this.upgradeItems = [];

    this.X_MARGIN = 0;
    this.Y_MARGIN = 0;
  }

  preload() {
    this.load.image("background", "assets/debugTiles.jpeg");
    this.load.image("logo", "assets/phaser3-logo.png");
  }

  create() {
    const { width, height } = this.sys.game.canvas;

    this.X_MARGIN = width / 5;
    this.Y_MARGIN = height / 3;
    this.bg = this.add
      .rectangle(0, 0, width, height, 0, -1)
      .setAlpha(0)
      .setDepth(-999);
    this.bg.scale = 2;

    this.title = this.add
      .text(width / 2, height / 10, "UPGRADES", {
        fontSize: "3rem",
      })
      .setDepth(999)
      .setAlpha(0)
      .setOrigin(0.5);

    this.mainScene = this.scene.get("GameScene") as GameScene;
    this.player = this.mainScene.player;

    this.input.keyboard.on("keydown-TAB", () => {
      if (this.mainScene?.isPaused || !this.player.isAlive) return;
      if (!this.mainScene!.isUpgrading) {
        this.mainScene!.isUpgrading = true;
        return this.scene.pause("GameScene");
      }
      this.mainScene!.isUpgrading = false;
      return this.scene.resume("GameScene");
    });
    this.createMenuItems();
  }

  createMenuItems() {
    this.upgradeItems = upgradesList.map(
      (item, idx) =>
        new UpgradeItem(
          this,
          this.X_MARGIN + (idx % ITEMS_PER_LINE) * 300,
          this.Y_MARGIN + Math.floor(idx / ITEMS_PER_COLUMN) * 500,
          item.title,
          item.description,
          this.player.getUpgradeParamById(item.id)
        )
    );
  }

  checkAlpha() {
    if (this.mainScene?.isUpgrading) {
      this.title.setAlpha(1);
      this.bg.setAlpha(0.2);
      this.upgradeItems.map((m) => m.setVisibility(true));
    } else {
      this.bg.setAlpha(0);
      this.title.setAlpha(0);
      this.upgradeItems.map((m) => m.setVisibility(false));
    }
  }

  update() {
    this.checkAlpha();
  }
}
