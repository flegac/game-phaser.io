function update() {

    game.physics.arcade.overlap(enemyBullets, tank, bulletHitPlayer, null, this);

    enemiesAlive = 0;
    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].alive) {
            enemiesAlive++;
            game.physics.arcade.collide(tank.tank, enemies[i].tank);
            game.physics.arcade.overlap(tank.bullets, enemies[i].tank, bulletHitEnemy, null, this);
            enemies[i].update();
        }
    }
    
    tank.update();

    land.tilePosition.x = -game.camera.x;
    land.tilePosition.y = -game.camera.y;

}


function bulletHitPlayer (tank, bullet) {

    bullet.kill();

}

function bulletHitEnemy (tank, bullet) {

    bullet.kill();

    var destroyed = enemies[tank.name].damage();

    if (destroyed)
    {
        var explosionAnimation = explosions.getFirstExists(false);
        explosionAnimation.reset(tank.x, tank.y);
        explosionAnimation.play('kaboom', 30, false, true);
    }

}