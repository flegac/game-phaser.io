var maxBulletNumber = 100;


TankTurret = function(game, tank, dx, dy, bullets) {
    this.game = game;
    this.tank = tank;
    this.dx=dx;
    this.dy=dy;
    this.bullets = bullets;

    this.turret = game.add.sprite(0, 0, 'tank', 'turret');
    this.turret.anchor.set(0.3, 0.5);
    this.turret.bringToTop();
    
    this.nextFire = 0;
    this.fireRate = 100;
    
};
TankTurret.prototype.update = function () {

    this.turret.x = this.dx + this.tank.x;
    this.turret.y = this.dy + this.tank.y;
    this.turret.rotation = this.game.physics.arcade.angleToPointer(this.turret);

    if (this.game.input.activePointer.isDown) {
        this.fire();
    }
};
TankTurret.prototype.fire = function () {
    if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
        this.nextFire = this.game.time.now + this.fireRate;

        var bullet = this.bullets.getFirstExists(false);
        if (bullet) {
            bullet.reset(this.turret.x, this.turret.y);
            bullet.rotation = this.game.physics.arcade.moveToPointer(bullet, 1000, this.game.input.activePointer, 500);
        }
    }
};

PlayerTank = function (game) {

    var x = 0;
    var y = 0;

    this.game = game;
    this.fireRate = 100;
    this.nextFire = 0;

    
    //  Our bullet group
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(maxBulletNumber, 'bullet', 0, false);
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);

    
    this.tank = game.add.sprite(x, y, 'tank', 'tank1');
    this.shadow = game.add.sprite(x, y, 'tank', 'shadow');
    this.turret = game.add.sprite(x, y, 'tank', 'turret');
    this.turret2 = game.add.sprite(x, y, 'tank', 'turret');
    this.turrets = [];
    this.turrets.push(new TankTurret(game, this, 0,0, this.bullets));


    this.tank.animations.add('move', ['tank1', 'tank2', 'tank3', 'tank4', 'tank5', 'tank6'], 20, true);

    this.shadow.anchor.set(0.5);
    this.tank.anchor.set(0.5);
    this.turret.anchor.set(0.3, 0.5);
    this.turret2.anchor.set(0.3, 0.5);

    game.physics.enable(this.tank, Phaser.Physics.ARCADE);
    this.tank.body.immovable = false;
    this.tank.body.drag.set(0.2);
    this.tank.body.maxVelocity.setTo(maxSpeed, maxSpeed);
    this.tank.body.collideWorldBounds = true;
    //this.tank.body.bounce.setTo(1, 1);


    this.tank.bringToTop();
    this.turret.bringToTop();
    this.turret2.bringToTop();


};

PlayerTank.prototype.damage = function () {

    this.health -= 1;

    if (this.health <= 0) {
        this.alive = false;

        this.shadow.kill();
        this.tank.kill();
        this.turret.kill();
        this.turret2.kill();
        for(var i in this.turrets) {
            turrets[i].kill();    
        }

        return true;
    }

    return false;

}

PlayerTank.prototype.update = function () {


    if (cursors.left.isDown) {
        this.tank.angle -= 4;
    } else if (cursors.right.isDown) {
        this.tank.angle += 4;
    }

    if (cursors.up.isDown) {
        //  The speed we'll travel at
        this.currentSpeed = 300;
    } else {
        if (this.currentSpeed > 0) {
            this.currentSpeed -= 4;
        }
    }

    if (this.currentSpeed > 0) {
        this.game.physics.arcade.velocityFromRotation(this.tank.rotation, this.currentSpeed, this.tank.body.velocity);
    }

    this.shadow.x = this.tank.x;
    this.shadow.y = this.tank.y;
    this.shadow.rotation = this.tank.rotation;


    for(var i in this.turrets) {
        this.turrets[i].update();
    }
    
    this.turret.x = this.tank.x;
    this.turret.y = -40 + this.tank.y;
    this.turret.rotation = this.game.physics.arcade.angleToPointer(this.turret);


    this.turret2.x = this.tank.x;
    this.turret2.y = 40 + this.tank.y;
    this.turret2.rotation = this.game.physics.arcade.angleToPointer(this.turret2);


    if (this.game.input.activePointer.isDown) {
        this.fire();
    }

};


PlayerTank.prototype.fire = function () {
    if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
        this.nextFire = this.game.time.now + this.fireRate;

        var bullet = this.bullets.getFirstExists(false);
        if (bullet) {
            bullet.reset(this.turret.x, this.turret.y);
            bullet.rotation = this.game.physics.arcade.moveToPointer(bullet, 1000, this.game.input.activePointer, 500);
        }

        var bullet2 = this.bullets.getFirstExists(false);
        if (bullet2) {
            bullet2.reset(this.turret2.x, this.turret2.y);
            bullet2.rotation = this.game.physics.arcade.moveToPointer(bullet2, 1000, this.game.input.activePointer, 500);
        }
    }
};