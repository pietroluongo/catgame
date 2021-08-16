import FlyingObject from '../flyingObject/index'

export default class Enemy extends FlyingObject {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super('player', scene, x, y, ['catbase'], ['rainbowtail', 'rainbowtailalternate']);
    }
}