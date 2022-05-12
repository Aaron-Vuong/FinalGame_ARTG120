class PlanetPlay extends Phaser.Scene {
    constructor() {
        super("planetPlayScene");
    }

    preload() {
        this.load.image('stars', './assets/stars.png');
        this.load.image('planets', './assets/planets.png');
    }

    create() {

        this.stars = this.add.tileSprite(0, 0, 1000, 500, 'stars').setOrigin(0,0);
        this.planets = this.add.tileSprite(0,0, 1000, 500, 'planets').setOrigin(0,0);

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

    update() {
        this.stars.tilePositionX += 3;
        this.planets.tilePositionX +=2;
    }
}