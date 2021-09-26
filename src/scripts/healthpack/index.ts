import GameScene from "../../scenes/Game";
import { HEALTHPACK_TIMEOUT } from "../../utils";
import Droppable from "../droppable";

export default class Healthpack extends Droppable {
  constructor(scene: GameScene, x: number, y: number, scale: number = 1) {
    super(scene, x, y, "catnip", scale);
    this.scene.tweens.add({
      targets: this.sprite,
      duration: HEALTHPACK_TIMEOUT,
      alpha: 0,
    });
  }

  pickup() {
    this.scene?.player.heal();
    this.sprite.destroy();
    this.destroy();
  }

  update() {
    setTimeout(() => {
      this.sprite.destroy();
      this.destroy();
    }, HEALTHPACK_TIMEOUT);
  }
}
