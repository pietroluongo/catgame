import FlyingObject from '../flyingObject/index'

export default class Enemy extends FlyingObject {
    player : FlyingObject;
    constructor(player : FlyingObject, scene: Phaser.Scene, x: number, y: number) {
        super('player', scene, x, y, ['catbase'], ['rainbowtail', 'rainbowtailalternate']);
        this.player = player;
    }

    update() {
        // The enemy will always try to keep a certain distance from the player
        const upTrigger = 1;
        const downTrigger = 0;
        let dx = this.x - this.player.x;
        let dy = this.y - this.player.y;
        let euclideanDistance = (dx**2 + dy**2)**(1/2);

        if (euclideanDistance > upTrigger)
            this.goNearPlayer(dx, dy, euclideanDistance, upTrigger);
        //else if (euclideanDistance < downTrigger)
        //    this.goAwayFromPlayer();

        this.sprite.setX(this.x);
        this.sprite.setY(this.y);
    }

    goNearPlayer(dx : number, dy : number, euclideanDistance : number, upTrigger : number) {
        let cosTheta = dy === 0 ? 0 : dx / dy;
        cosTheta = cosTheta % 1;
        let sinTheta = euclideanDistance === 0 ? 0 : dy / euclideanDistance;
        sinTheta = sinTheta % 1;
        let radius = euclideanDistance - upTrigger;
        let newX = -radius * cosTheta;
        let newY = radius * sinTheta;
        // console.log(this.x - newX, this.y - newY);
        this.moveSprite(this.x - newX, this.y - newY);
    }
}