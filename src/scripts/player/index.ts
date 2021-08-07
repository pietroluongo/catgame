import FlyingObject from '../flyingObject/index'

export default class Player extends FlyingObject {
    constructor(scene: Phaser.Scene, x: number, y: number, keyboard: Phaser.Input.Keyboard.KeyboardPlugin) {
        super('player', scene, x, y, ['flyingtoast'], ['rainbowtail', 'rainbowtailalternate'], keyboard);
    }
  }
  