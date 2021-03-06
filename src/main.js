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
            debug : false
        }
    },
    scene: [Menu, 
            InstructionScreen, 
            CutScreen, 
            StatsScreen, 
            ShipPlay, 
            PlanetPlay, 
            Settings,
            Shop,
            Dialogue,
            EndGame]
}

let game = new Phaser.Game(config); 

// UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

//move variables
let keyLEFT, keyDOWN, keyRIGHT, keyUP, keyA, keyD, keySPACE, keyF, keyI, keyJ, keyK, keyL, keyW, keyESC;

//timer variables
let timedEvent, Explore, House;
