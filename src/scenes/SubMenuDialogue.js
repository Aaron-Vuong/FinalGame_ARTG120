class Dialogue extends Phaser.Scene {
    constructor() {
        super("dialogueScene");
    }
    create() {
        let speech = this.cache.json.get('sampleDialogue');

        this.settingsRectangle = this.add.rectangle(game.config.width/2, game.config.height/2 + 150, 1000, 200, 0x808080).setInteractive();
        
        this.label = this.add.text(game.config.width/2, game.config.height/2 + 100, " ").setOrigin(0.5).setWordWrapWidth(650);
        // this.buttonGroup = this.add.group();
        this.typewriterText(speech.Planets[game.settings.planet].NPCs["Leader"].Dialogue);
        this.choiceNum = 0;
        this.x = 50;
        this.y = game.config.height/2 + 200;
        for (let choice in speech.Planets[game.settings.planet].NPCs["Leader"].Choices) {
            switch(this.choiceNum) {
                case 0:  
                    this.button = new Button(200, game.config.height/2 + 150, speech.Planets[game.settings.planet].NPCs["Leader"].Choices[choice].Text, config, this, 
                    () => this.scene.start("planetPlayScene"));
                    // this.buttonGroup.add(this.button);
                    break;
                case 1:
                    this.button = new Button(800, game.config.height/2 + 150, speech.Planets[game.settings.planet].NPCs["Leader"].Choices[choice].Text, config, this, 
                    () => this.scene.start("planetPlayScene"));
                    // this.buttonGroup.add(this.button);
                    break;
                case 2:
                    this.button = new Button(200, game.config.height/2 + 200, speech.Planets[game.settings.planet].NPCs["Leader"].Choices[choice].Text, config, this, 
                    () => this.scene.start("planetPlayScene"));
                    // this.buttonGroup.add(this.button);
                    break;
                case 3:
                    this.button = new Button(800, game.config.height/2 + 200, speech.Planets[game.settings.planet].NPCs["Leader"].Choices[choice].Text, config, this, 
                    () => this.scene.start("planetPlayScene"));
                    // this.buttonGroup.add(this.button);
                    break;
            }
            ++this.choiceNum;
        }
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        
    }

    update() {
        if (keyESC.isDown) {
            this.RestartMainScene();
        }
    }

    RestartMainScene() {
        this.scene.stop();
        this.scene.run(game.settings.prevScene);
    }

    typewriterText(text) {
        const length = text.length;
        let i = 0;
        this.time.addEvent({
            callback: () => {
                this.label.text += text[i];
                ++i;
            },
            repeat: length - 1,
            delay: 80
        })

    }

    typewriteTextWrapped(text) {
        const lines = this.label.getWrappedText(text);
        const wrappedText = lines.join('\n');

        this.typewriterText(wrappedText);
    }

    ProcessChoice(speech, choiceNum) {
        if (game.settings.planet == "Earth") {
            game.planetEarthSettings.goalMeter += speech.Planets[game.settings.planet].NPCs["Leader"].Choices[choiceNum].goalMeterEffect;
        }
        if (game.settings.planet == "Mars") {
            game.planetMarsSettings.goalMeter += speech.Planets[game.settings.planet].NPCs["Leader"].Choices[choiceNum].goalMeterEffect;
        }
        this.buttonGroup.clear();
    }
}