class StatsScreen extends Phaser.Scene {
    constructor() {
        super("statsScreenScene");
    }

    preload() {
        this.load.image('stars', './assets/stars.png');
        //this.load.image('planets', './assets/planets.png');
    }

    create() {

        this.space = this.add.tileSprite(0, 0, 1000, 500, 'stars').setOrigin(0,0);
        //this.planets = this.add.tileSprite(0, 0, 1000, 500, 'planets').setOrigin(0,0);

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '36px',
            color: '#e6c0fc',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 150, "Choose Your Stats", menuConfig).setOrigin(0.5);

        menuConfig.fontSize = "20px";
        menuConfig.color = "#4bff2b";
        this.stat1 = this.add.text(game.config.width/2, game.config.height/2 + 50, "Strength: 100, Speed 70, Sociability: 40", menuConfig).setOrigin(0.5);
        this.stat2 = this.add.text(game.config.width/2, game.config.height/2 + 5, "Strength: 50, Speed 90, Sociability: 70", menuConfig).setOrigin(0.5);
        this.stat3 = this.add.text(game.config.width/2, game.config.height/2 - 50, "Strength: 70, Speed 40, Sociability: 60", menuConfig).setOrigin(0.5);
        this.stat4 = this.add.text(game.config.width/2, game.config.height/2 - 100, "Strength: 30, Speed 60, Sociability: 90", menuConfig).setOrigin(0.5);


        //make text interactive
        this.stat1.setInteractive(new Phaser.Geom.Rectangle(0,0, this.stat1.width, this.stat1.height), Phaser.Geom.Rectangle.Contains);
        this.stat2.setInteractive(new Phaser.Geom.Rectangle(0,0, this.stat2.width, this.stat2.height), Phaser.Geom.Rectangle.Contains);
        this.stat3.setInteractive(new Phaser.Geom.Rectangle(0,0, this.stat3.width, this.stat3.height), Phaser.Geom.Rectangle.Contains);
        this.stat4.setInteractive(new Phaser.Geom.Rectangle(0,0, this.stat4.width, this.stat4.height), Phaser.Geom.Rectangle.Contains);


        //listen for when the stat1 is clicked on
        this.stat1.on("pointerdown", function(pointer) {
            game.settings.strength = 100;
            game.settings.speed = 70;
            game.settings.soc = 40;
            this.scene.start("cutScreenScene");
            console.log(game.settings);
            
        }, this); 

        //listen if stat2 is clicked on
        this.stat2.on("pointerdown", function(pointer) {
            game.settings.strength = 50;
            game.settings.speed = 90;
            game.settings.soc = 70;
            this.scene.start("cutScreenScene");
            console.log(game.settings);
            
        }, this);

         //listen if stat3 is clicked on
         this.stat3.on("pointerdown", function(pointer) {
            game.settings.strength = 70;
            game.settings.speed = 40;
            game.settings.soc = 60;
            this.scene.start("cutScreenScene");
            console.log(game.settings);
            
        }, this);

        //listen if stat4 is clicked on
        this.stat4.on("pointerdown", function(pointer) {
            game.settings.strength = 30;
            game.settings.speed = 60;
            game.settings.soc = 90;
            this.scene.start("cutScreenScene");
            console.log(game.settings);
            
        }, this);


        this.button = new Button(500, 400, 'Continue', config, this, 
                                () => this.scene.start("cutScreenScene"));
        }
        // https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/?a=13

    update() {
        this.space.tilePositionX += 3;
        //this.planets.tilePositionX += 2;
    }
}