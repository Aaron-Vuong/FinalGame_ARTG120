class StatsScreen extends Phaser.Scene {
    constructor() {
        super("statsScreenScene");
    }

    preload() {
        this.load.image('stars', './assets/stars.png');
        this.load.spritesheet('idleShip', './assets/idleShip.png', {frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 5});
    }

    create() {

        this.space = this.add.tileSprite(0, 0, 1000, 500, 'stars').setOrigin(0,0);
        //this.planets = this.add.tileSprite(0, 0, 1000, 500, 'planets').setOrigin(0,0);

        this.add.rectangle(500, 60, 400, 50, 0x3333cc).setOrigin(0.5);

        this.add.rectangle(500, 290, 530, 40, 0x051405).setOrigin(0.5);
        this.add.rectangle(500, 210, 530, 40, 0x051405).setOrigin(0.5);

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

        //create idle ship animation
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('idleShip', {start: 0, end: 5, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.idling = this.add.sprite(100,100);
        this.idling.play('idle');
        
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 150, "Choose Your Stats", menuConfig).setOrigin(0.5);

        menuConfig.fontSize = "20px";
        menuConfig.color = "#4bff2b";
        this.stat1 = this.add.text(game.config.width/2, game.config.height/2 + 40, "Strength: 100, Speed 70, Sociability: 40", menuConfig).setOrigin(0.5);
        this.stat4 = this.add.text(game.config.width/2, game.config.height/2 - 40, "Strength: 30, Speed 60, Sociability: 90", menuConfig).setOrigin(0.5);


        //make text interactive
        this.stat1.setInteractive(new Phaser.Geom.Rectangle(0,0, this.stat1.width, this.stat1.height), Phaser.Geom.Rectangle.Contains);
        this.stat4.setInteractive(new Phaser.Geom.Rectangle(0,0, this.stat4.width, this.stat4.height), Phaser.Geom.Rectangle.Contains);


        //listen for when the stat1 is clicked on
        this.stat1.on("pointerdown", function(pointer) {
            game.settings.playerSTRENGTH = 100;
            game.settings.playerSPEED = 70;
            game.settings.playerSOCIAL = 40;
            this.scene.start("cutScreenScene");
            
        }, this); 

        //listen if stat4 is clicked on
        this.stat4.on("pointerdown", function(pointer) {
            game.settings.playerSTRENGTH = 30;
            game.settings.playerSPEED = 60;
            game.settings.playerSOCIAL = 90;
            this.scene.start("cutScreenScene");
            
        }, this);


        // this.button = new Button(500, 400, 'Continue', config, this, 
        //                         () => this.scene.start("cutScreenScene"));
        }
        // https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/?a=13

    update() {
        this.space.tilePositionX += 3;

        this.idling.x = game.input.mousePointer.x;
        this.idling.y = game.input.mousePointer.y;
    }
}