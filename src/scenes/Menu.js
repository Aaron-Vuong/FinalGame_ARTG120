class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        this.load.spritesheet('FoldOut', './assets/MenuAnims.png', {frameWidth: 1000, frameHeight: 500, startFrame: 0, endFrame: 44});
        this.load.image('stars', './assets/stars.png');
        this.load.audio('SoundButton', './assets/ButtonSoundEffect.wav');
        this.load.audio('MenuBG', './assets/SpaceBGMusic.wav');

        this.load.json("sampleDialogue", "./src/json/Dialogue.json");
    }

    create() {
        this.Space = this.sound.add('MenuBG');
        this.Space.setLoop(true);
        this.Space.volume = 0.2;
        this.Space.play();

        this.stars = this.add.tileSprite(0, 0, 1000, 500, 'stars').setOrigin(0,0).setInteractive();
        this.stars.on('pointerdown', () => this.EndAnim());

        //Broshore animation
        this.anims.create({
            key: 'Menu',
            frames: this.anims.generateFrameNumbers('FoldOut', {start: 0, end: 44, first: 44}),
            frameRate: 15,
            repeat: 0
        });

        this.broshore = this.add.sprite(550, 250);
        this.broshore.play('Menu');
        
        game.settings = {
            score: 0,
            planet: "water",
            prevScene: "menuScene",
            textConfig: {
                fontFamily: 'Courier',
                fontSize: '36px',
                color: '#e6c0fc',
                align: 'center',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                fixedWidth: 0
            },

            playerSTRENGTH: 0,
            playerSPEED: 0,
            playerSOCIAL: 0,
            playerFUEL: 2,
            playerMONEY: 100
        }

        game.planetEarthSettings = {
            goalMeter: 0,
            Leader: "Init",
            Other: "Init"
        }
        game.planetMarsSettings = {
            goalMeter: 0,
            Leader: "Init",
            Other: "Init"
        }

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    }

    update() {
        if ( this.broshore.anims.getProgress() == 1 ) {
            this.EndAnim();
        }
        this.stars.tilePositionX += 3;   
    }

    EndAnim() {
        this.broshore.anims.stop();
        this.broshore.anims.setCurrentFrame(this.broshore.anims.currentAnim.frames[44]);
        this.MenuLoad();
    }

    MenuLoad() {
        let menuConfig = {
            fontFamily: 'Consolas',
            fontSize: '36px',
            color: '#85c7b1',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 6,
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //menu text
        this.House = this.add.text(game.config.width/2-5, game.config.height/2 - borderUISize - borderPadding - 30, "Housing Crisis", menuConfig).setOrigin(0.5);
        this.House.scale= 0.8;
        this.House.angle = -18;
        this.House.delay = 2000;

        // test button
        const button = new MenuButton(540, 300, 'Start Game', config, this, () => {
            this.scene.start("instructionScreenScene");
            this.sound.play('SoundButton')
            // this.Space.stop();
        });
    }
}