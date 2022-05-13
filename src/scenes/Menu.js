class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        this.load.spritesheet('FoldOut', './assets/MenuAnims.png', {frameWidth: 1000, frameHeight: 500, startFrame: 0, endFrame: 44});
        this.load.image('MenuLast', './assets/44.png)');
        this.load.image('stars', './assets/stars.png');
        
    }

    create() {
        this.stars = this.add.tileSprite(0, 0, 1000, 500, 'stars').setOrigin(0,0);

        //Broshore animation
        this.anims.create({
            key: 'Menu',
            frames: this.anims.generateFrameNumbers('FoldOut', {start: 0, end: 44, first: 44}),
            frameRate: 15,
            repeat: 0
        });
        this.broshore = this.add.sprite(550, 250);
        this.broshore.play('Menu');

        console.log(this.broshore.anims.isPlaying);
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
        let x = 0;
        //menu text
        this.House = this.add.text(game.config.width/2-5, game.config.height/2 - borderUISize - borderPadding - 30, "Housing Crisis", menuConfig).setOrigin(0.5);
        this.House.scale= 0.8;
        this.House.angle = -18;
        
        // test button
        const button = new MenuButton(540, 300, 'Start Game', config, this, () => this.scene.start("instructionScreenScene"));

        game.settings = {
            strength: 0,
            speed: 0,
            soc: 0,
            score: 0,
            planet: "water"
        }

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        if (this.broshore.anims.getProgress() == 1) {
            this.broshore.anims.stop();
            this.broshore.anims.setCurrentFrame(this.broshore.anims.currentAnim.frames[44]);    
        }

        this.stars.tilePositionX += 3;
        
    }
}