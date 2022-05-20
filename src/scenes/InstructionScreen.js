class InstructionScreen extends Phaser.Scene {
    constructor() {
        super("instructionScreenScene");
    }

    preload() {
        this.load.image('stars', './assets/stars.png');
    }

    create() {
        this.space = this.add.tileSprite(0, 0, 1000, 500, 'stars').setOrigin(0,0);

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

        //menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 30, "Instructions", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 50, "Use Mouse to Choose a Planet", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 90, "Use Arrow Keys to Move Around Towns", menuConfig).setOrigin(0.5);

        const button = new Button(500, 400, 'Continue', config, this, () => this.scene.start("statsScreenScene"));

    }

    update() {
        this.space.tilePositionX += 3;
    }
}