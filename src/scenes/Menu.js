class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        this.load.spritesheet('FoldOut', './assets/MenuAnims.png', {frameWidth: 1000, frameHeight: 500, startFrame: 0, endFrame: 44});
        
    }

    create() {
        this.scene.anims.create({
            key: 'FoldOut',
            frames: this.anims.generateFrameNumbers('FoldOut', {start: 0, end: 44, first: 0}),
            frameRate: 30
        });
        this.anims.play('FoldOut')

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
        this.add.text(game.config.width/2, game.config.height/2, "Press Space to Play", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 50, "Use <--> to Move", menuConfig).setOrigin(0.5);

 
        // test button
        const button = new Button(80, 30, 'Start Game', config, this, () => this.scene.start("instructionScreenScene"));
        game.settings = {
            stat1: 0,
            score: 0
        }
    }

    update() {
    }
}