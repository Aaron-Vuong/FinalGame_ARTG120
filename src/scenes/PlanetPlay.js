class PlanetPlay extends Phaser.Scene {
    constructor() {
        super("planetPlayScene");
    }

    preload() {
        this.load.image('stars', './assets/stars.png');
        this.load.image('planets', './assets/planets.png');
        this.load.image('Earth', './assets/Planet1.png');
        this.load.image('planet2', './assets/Planet2.png');
    }

    create() {

        this.stars = this.add.tileSprite(0, 0, 1000, 500, 'stars').setOrigin(0,0);
        this.planets = this.add.tileSprite(0,0, 1000, 500, 'planets').setOrigin(0,0);

        this.planet1 = new Planet(this, game.config.width/3, game.config.height/2 + 80, 'Earth');       
        this.planet1 = new Planet(this, 2*game.config.width/3, game.config.height/2 + 80, 'planet2');
    }

    update() {
        this.stars.tilePositionX += 3;
        this.planets.tilePositionX +=2;

    }
}