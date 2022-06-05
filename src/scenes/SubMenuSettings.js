class Settings extends Phaser.Scene {
    constructor() {
        super("settingsScene");
    }

    init(data) {
        this.planet = data.planet;
        this.soundz = data.sound;
    }

    create() {
        this.booton = this.add.rectangle(0,0, game.config.width * 2, game.config.height * 2, 0x6006ff);
        this.booton.setAlpha(0.3);
        this.booton.setInteractive();
        this.booton.setScrollFactor(0,0);
        this.booton.on("pointerdown", () => {
            this.scene.stop();
            this.scene.run(game.settings.prevScene);
            
        });

        this.settingsRectangle = this.add.rectangle(game.config.width/2, game.config.height/2, 500, 400, 0x6666ff).setInteractive();

        this.settings1 = this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding+100, "Use WASD to move or UP-DOWN-LEFT-RIGHT").setOrigin(0.5);
        this.settings2 = this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding+130, "F to Interact").setOrigin(0.5);
        this.settings1.scale= 1.3;
        this.settings2.scale= 1.3;
        
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.SoundControlButton = new Button(game.config.width/2, game.config.height/2 - 50, "Sound: Off/On", config, this, () => {
            if (game.sound.mute == false) {
                game.sound.mute = true;
            }
            else {
                game.sound.mute = false;
            }
        })
        this.EndCheatButton = new Button(game.config.width/2, game.config.height/2, "Cheat: End game", config, this, () => {
            this.planet.goalMeter = 100;
            this.scene.stop();
            this.scene.run(game.settings.prevScene);
            
        })
    }

    update() {
    }

    RestartMainScene() {
        this.scene.stop();
        this.scene.run(game.settings.prevScene);
    }
}