class PlanetPlay extends Phaser.Scene {
    constructor() {
        super("planetPlayScene");
    }
    create() {

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '36px',
            color: '#ffffff',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, "This is a play scene", menuConfig).setOrigin(0.5);

        
    }
}