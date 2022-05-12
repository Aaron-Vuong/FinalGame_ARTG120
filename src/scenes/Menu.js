class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        this.load.spritesheet('FoldOut', './assets/MenuAnims.png', {frameWidth: 1000, frameHeight: 500, startFrame: 0, endFrame: 44});
        this.load.image('MenuLast', './assets/44.png)');
        
    }

    create() {
        //Broshore animation
        this.anims.create({
            key: 'Menu',
            frames: this.anims.generateFrameNumbers('FoldOut', {start: 0, end: 44, first: 44}),
            frameRate: 15,
            repeat: 0
        });
        this.broshore = this.add.sprite(500, 300);
        this.broshore.play('Menu');

        //tried adding just last frame of animation to show up after animatio0n plays
        this.add.sprite('MenuLast',1000, 500);

        console.log(this.broshore.anims.isPlaying);
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
        let x = 0;
        //menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 30, "Housing Crisis", menuConfig).setOrigin(0.5);

        // test button
        const button = new Button(80, 30, 'Start Game', config, this, () => this.scene.start("instructionScreenScene"));
        game.settings = {
            strength: 0,
            score: 0
        }
    }

    update() {
        if (this.broshore.anims.getProgress() == 1) {
            this.broshore.anims.stop();
            this.broshore.anims.setCurrentFrame(this.broshore.anims.currentAnim.frames[44]);    
        }
    }
}