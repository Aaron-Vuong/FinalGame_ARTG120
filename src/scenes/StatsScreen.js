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

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 150, "Stats Screen", menuConfig).setOrigin(0.5);
        var textEntry = this.add.text(game.config.width/2, game.config.height/2, " " + game.settings.stat1, menuConfig).setOrigin(0.5);

        this.input.keyboard.on('keydown', function(event) {
            if(event.keyCode === 8 && textEntry.text.length > 0) {
                textEntry.text = textEntry.text.subtr(0, textEntry.text.length - 1);
            } 
            else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90)) {
                textEntry.text += event.key;
            }
        });

        this.button = new Button(80, 30, 'Start Game', config, this, 
                                () => this.textEntry.text = "Strength: " + (game.settings.stat1 += 1));
    }

    update() {
    }
}