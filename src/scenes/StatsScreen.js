class StatsScreen extends Phaser.Scene {
    constructor() {
        super("statsScreenScene");
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

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 30, "Stats Screen", menuConfig).setOrigin(0.5);
        this.testX = this.add.text(game.config.width/2, game.config.height/2 + 100, "Starting stuff: " + game.settings.stat1, menuConfig).setOrigin(0.5);

        this.button = new Button(80, 30, 'Start Game', config, this, () => game.settings.stat1 += 1);

    }
    update() {
        this.testX.text = "Starting stuff: " + game.settings.stat1;
    }
}