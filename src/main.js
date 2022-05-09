let config = {
    type: Phaser.CANVAS,
    width: 1080, 
    height: 520,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300}
        }
    },
    scene: [Menu, InstructionScreen, StatsScreen, ShipPlay, PlanetPlay] 
}

let game = new Phaser.Game(config); 

// UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;