/* global game */


var worldWidth = 50000;
var worldHeight = 50000;


var land;
var tank;



var enemies;
var enemyBullets;
var enemiesTotal = 0;
var enemiesAlive = 0;
var explosions;

function create() {
    //  Resize our game world to be a 2000 x 2000 square
    game.world.setBounds(-worldWidth / 2, -worldHeight / 2, worldWidth, worldHeight);

    //  Our tiled scrolling background
    land = game.add.tileSprite(0, 0, windowWidth, windowHeight, 'earth');
    land.fixedToCamera = true;


    //  The base of our tank
    tank = new PlayerTank(game);


    //  The enemies bullet group
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(100, 'bullet');

    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 0.5);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);

    //  Create some baddies to waste :)
    enemies = [];

    enemiesTotal = 20;
    enemiesAlive = 20;

    for (var i = 0; i < enemiesTotal; i++) {
        enemies.push(new EnemyTank(i, game, tank, enemyBullets));
    }


    //  Explosion pool
    explosions = game.add.group();

    for (var i = 0; i < 10; i++) {
        var explosionAnimation = explosions.create(0, 0, 'kaboom', [0], false);
        explosionAnimation.anchor.setTo(0.5, 0.5);
        explosionAnimation.animations.add('kaboom');
    }


    logo = game.add.sprite(windowWidth/2-400, windowHeight/2-2  00, 'logo');
    logo.fixedToCamera = true;

    game.input.onDown.add(removeLogo, this);

    game.camera.follow(tank.tank);
    game.camera.deadzone = new Phaser.Rectangle(windowWidth / 2, windowHeight / 2, 0, 0);
    game.camera.focusOnXY(0, 0);

    cursors = game.input.keyboard.createCursorKeys();

}