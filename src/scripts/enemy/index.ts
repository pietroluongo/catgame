import FlyingObject from '../flyingObject/index'
import GameScene from '../../scenes/Game'
import Projectile from "../projectile";

export default class Enemy extends FlyingObject {
    player : FlyingObject;
    maxAcceleration : number;
    minimumDistanceToShoot : number;
    updateCounter : integer;
    counterLimitToShoot : integer;

    constructor(player : FlyingObject, scene: GameScene, x: number, y: number) {
        super('player', scene, x, y, ['catbase'], false);
        this.player = player;
        this.maxAcceleration = 100; // This is arbitrary
        this.minimumDistanceToShoot = 500; // This is arbitrary
        this.updateCounter = 0;
        this.counterLimitToShoot = 100; // This is arbitrary
    }

    update() {

        this.x = this.sprite.x;
        this.y = this.sprite.y;

        // The enemy will always try to reach the player
        this.handleMovement();
        super.update();
    }

    handleMovement = () => {
        var angleToPlayer = Phaser.Math.Angle.Between(this.x, this.y, this.player.x, this.player.y);
        var distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);

        var a /* acceleration */ = (
            distanceToPlayer > this.maxAcceleration ? this.maxAcceleration : distanceToPlayer
        );

        var dx = a * Math.cos(angleToPlayer);
        var dy = a * Math.sin(angleToPlayer);

        const changeRate = 1;

        this.shootPlayer(distanceToPlayer, angleToPlayer);
        this.sprite.setAcceleration(dx * changeRate, dy * changeRate);
    }

    shootPlayer = (distanceToPlayer : number, angleToPlayer : number) => {

        if (this.updateCounter < this.counterLimitToShoot) {
            this.updateCounter += 1;
            return;
        }
        if (distanceToPlayer < this.minimumDistanceToShoot) {
            const degreeAngle = angleToPlayer * 180 / Math.PI;
            const missile = new Projectile(this.scene, 'enemyMissile', this.sprite.x, this.sprite.y, degreeAngle);
            this.updateCounter = 0;
        }
        

    }
}