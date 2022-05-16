 let config = {
    type: Phaser.CANVAS,
    //fit all planets in one screen hence widescreen, align to middle of screen?
    width: 1000, 
    height: 500,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300}
        }
    },
    scene: [Menu, InstructionScreen, CutScreen, StatsScreen, ShipPlay, PlanetPlay] 
}

let game = new Phaser.Game(config); 

// UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyLEFT, keyA, keyRIGHT, keyD, keySPACE, keyUP, keyF;