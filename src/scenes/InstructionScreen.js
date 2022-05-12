class InstructionScreen extends Phaser.Scene {
    constructor() {
        super("instructionScreenScene");
    }
    create() {
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

        //menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 30, "Instruction Screen", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, "Use Arrow Keys to Move", menuConfig).setOrigin(0.5);

        const button = new Button(80, 30, 'Continue', config, this, () => this.scene.start("statsScreenScene"));

    }
}