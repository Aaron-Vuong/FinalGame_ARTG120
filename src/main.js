 let config = {
    type: Phaser.CANVAS,
    //fit all planets in one screen hence widescreen, align to middle of screen?
    width: 1000, 
    height: 500,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 500},
            debug : true
        }
    },
    scene: [Menu, 
            InstructionScreen, 
            CutScreen, 
            StatsScreen, 
            ShipPlay, 
            PlanetPlay, 
            Settings]
}

let game = new Phaser.Game(config); 

// UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyLEFT, keyA, keyRIGHT, keyD, keySPACE, keyUP, keyF, keyI, keyJ, keyK, keyL, keyW, keyESC
let timedEvent, Explore, House;
