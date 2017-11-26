/* global Phaser cursors TankTurret */

var maxBulletNumber = 60;
var maxSpeed = 900;
var acceleration = 100;

var PlayerTank = function (game) {
    this.game = game;
    this.health = 10;

    //  Our bullet group
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(maxBulletNumber, 'bullet', 0, false);
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);


    this.shadow = game.add.sprite(0, 0, 'tank', 'shadow');
    this.shadow.anchor.set(0.5);

    this.tank = game.add.sprite(0, 0, 'tank', 'tank1');
    this.tank.animations.add('move', ['tank1', 'tank2', 'tank3', 'tank4', 'tank5', 'tank6'], 20, true);
    this.tank.anchor.set(0.5);
    this.tank.bringToTop();

    game.physics.enable(this.tank, Phaser.Physics.ARCADE);
    this.tank.body.immovable = false;
    this.tank.body.drag.set(0.2);
    this.tank.body.maxVelocity.setTo(maxSpeed, maxSpeed);
    this.tank.body.collideWorldBounds = true;
    //this.tank.body.bounce.setTo(1, 1);

    this.currentSpeed = 0;

    this.turrets = [];
    var d = 25;
    this.addTurret(d, d);
    this.addTurret(d, -d);
    this.addTurret(-d, d);
    this.addTurret(-d, -d);
};

PlayerTank.prototype.addTurret = function (dx, dy) {
    this.turrets.push(new TankTurret(this, dx, dy, this.bullets));
};

PlayerTank.prototype.damage = function () {

    this.health -= 1;

    if (this.health <= 0) {
        this.alive = false;

        this.shadow.kill();
        this.tank.kill();
        for (var i in this.turrets) {
            this.turrets[i].kill();
        }

        return true;
    }

    return false;
}

PlayerTank.prototype.behavior = function () {
    var isFireActive = this.game.input.activePointer.isDown;
    if (isFireActive) {
        for (var i in this.turrets) {
            this.turrets[i].fire();
        }
    }
};

PlayerTank.prototype.update = function () {

    if (cursors.left.isDown) {
        this.tank.angle -= 4;
    } else if (cursors.right.isDown) {
        this.tank.angle += 4;
    }

    if (cursors.up.isDown) {
        this.currentSpeed += acceleration;
        this.currentSpeed = Math.min(maxSpeed,this.currentSpeed);
    } else if (cursors.down.isDown) {
        this.currentSpeed -= acceleration/2;
        this.currentSpeed = Math.max(0,this.currentSpeed);
    } else {
        this.currentSpeed *= .99999;
        if (this.currentSpeed < 1) {
            this.currentSpeed = 0;
        }
    }
    if (this.currentSpeed > 0) {
        this.game.physics.arcade.velocityFromRotation(this.tank.rotation, this.currentSpeed, this.tank.body.velocity);
    }

    // shadow
    this.shadow.x = this.tank.x;
    this.shadow.y = this.tank.y;
    this.shadow.rotation = this.tank.rotation;

    // turrets
    for (var i in this.turrets) {
        this.turrets[i].update();
    }

    // behavior
    this.behavior();
};