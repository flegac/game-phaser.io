

var width = 1500;
var height = 600;

var game = new Phaser.Game(width, height, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });



var logo;

var currentSpeed = 0;
var cursors;

var bullets;
var fireRate = 100;
var nextFire = 0;

function removeLogo () {

    game.input.onDown.remove(removeLogo, this);
    logo.kill();

}





