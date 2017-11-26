function render() {

    game.debug.text('Active Bullets: ' + tank.bullets.countLiving() + ' / ' + tank.bullets.length, 32, 64);
    game.debug.text('Enemies: ' + enemiesAlive + ' / ' + enemiesTotal, 32, 32);

}