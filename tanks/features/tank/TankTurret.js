var bulletLifespan = 1000;
var fireRate = 125;
var nextFire = 0;

var TankTurret = function (tank, dx, dy) {
    this.game = tank.game;
    this.tank = tank;
    this.dx = dx;
    this.dy = dy;

    this.turret = this.game.add.sprite(0, 0, 'tank', 'turret');
    this.turret.anchor.set(0.3, 0.5);
    this.turret.bringToTop();

    this.nextFire = nextFire;
    this.fireRate = fireRate;
};

TankTurret.prototype.update = function () {
    this.turret.x = this.dx + this.tank.tank.x;
    this.turret.y = this.dy + this.tank.tank.y;
    this.turret.rotation = this.game.physics.arcade.angleToPointer(this.turret);
};

TankTurret.prototype.fire = function () {
    if (this.game.time.now > this.nextFire && this.tank.bullets.countDead() > 0) {
        this.nextFire = this.game.time.now + this.fireRate + this.game.rnd.integerInRange(0,this.fireRate);

        var bullet = this.tank.bullets.getFirstExists(false);
        if (bullet) {
            bullet.reset(this.turret.x, this.turret.y);
            bullet.rotation = this.game.physics.arcade.moveToPointer(bullet, 1000, this.game.input.activePointer, 500);
            bullet.lifespan = bulletLifespan;
        }
    }
};