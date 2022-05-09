class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
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
        let x = 0;
        //menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 30, "Blop", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, "Press Space to Play", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 50, "Avoid the animals!", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 100, "Use <--> to Move", menuConfig).setOrigin(0.5);

 
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