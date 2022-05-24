class PlanetPlay extends Phaser.Scene {
    constructor() {
        super("planetPlayScene");
    }

    preload() {
        this.load.image('stars', './assets/stars.png');
        this.load.image('planets', './assets/planets.png');
        this.load.image('Earth', './assets/Planet1.png');
        this.load.image('planet2', './assets/Planet2.png');
        this.load.audio('boop', './assets/boopAudio.wav');
        this.load.spritesheet('idleShip', './assets/idleShip.png', {frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 5});
    }

    create() {

        this.stars = this.add.tileSprite(0, 0, 1000, 500, 'stars').setOrigin(0,0);
        this.planets = this.add.tileSprite(0,0, 1000, 500, 'planets').setOrigin(0,0);

        this.planet1 = new Planet(this, game.config.width/3, game.config.height/2 + 80, 'Earth');       
        this.planet1 = new Planet(this, 2*game.config.width/3, game.config.height/2 + 80, 'planet2');

        let music = this.sound.add('boop');

        this.input.on("pointerdown", () => {
            music.play();
        });

        //create idle ship animation
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('idleShip', {start: 0, end: 5, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.idling = this.add.sprite(100,100);
        this.idling.play('idle');

        this.input.on('pointerdown', _ => console.info(_))
    }

    update() {
        this.stars.tilePositionX += 3;
        this.planets.tilePositionX +=2;

        //update idle ship to follow the cursor
        this.idling.x = game.input.mousePointer.x;
        this.idling.y = game.input.mousePointer.y;

    }
}