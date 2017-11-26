

var windowWidth = window.innerWidth-50;
var windowHeight = window.innerHeight-50;

var game = new Phaser.Game(windowWidth, windowHeight, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var logo;

var cursors;


function removeLogo () {

    game.input.onDown.remove(removeLogo, this);
    logo.kill();

}





