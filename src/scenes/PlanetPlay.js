class PlanetPlay extends Phaser.Scene {
    constructor() {
        super("planetPlayScene");
    }

    preload() {
        this.load.image('stars', './assets/stars.png');
        this.load.image('planets', './assets/planets.png');
        this.load.image('planet1', './assets/Planet1.png');
        this.load.image('planet2', './assets/Planet2.png');
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
        this.planet1 = this.add.image(game.config.width/2, game.config.height/2 + 50, 'planet1');

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, "This is a play scene", menuConfig).setOrigin(0.5);
        this.planet1.setInteractive(new Phaser.Geom.Rectangle(game.config.width / 3, game.config.height/2, this.planet1.width, this.planet1.height), Phaser.Geom.Rectangle.Contains);
        // this.stat1.setInteractive(new Phaser.Geom.Rectangle(2*game.config.width / 3, game.config.height/2, this.stat1.width, this.stat1.height), Phaser.Geom.Rectangle.Contains);
        console.log(this.planet1.width);
        this.input.on("pointerdown", function(pointer) {
            game.settings.planet = "earth";
            this.scene.start("shipPlayScene");
            console.log(game.settings.planet);
        }, this); 
    }

    update() {
        this.stars.tilePositionX += 3;
        this.planets.tilePositionX +=2;

    }
}