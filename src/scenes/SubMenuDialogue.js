class Dialogue extends Phaser.Scene {
    constructor() {
        super("dialogueScene");
    }
    create() {
        let speech = this.cache.json.get('sampleDialogue');

        this.settingsRectangle = this.add.rectangle(game.config.width/2, game.config.height/2 + 150, 1000, 200, 0x808080).setInteractive();
        
        this.label = this.add.text(game.config.width/2, game.config.height/2 + 100, " ").setOrigin(0.5).setWordWrapWidth(650);
        this.buttonGroup = this.add.group();
        this.LDialogue = this.typewriterText(speech.Planets[game.settings.planet].NPCs["Leader"].Dialogue);
        console.log(speech.Planets[game.settings.planet].NPCs["Leader"].InitChoices[0].Target);
        this.choiceNum = 0;
        this.choicePicked = -1;
        for (let choice in speech.Planets[game.settings.planet].NPCs["Leader"].InitChoices) {
            switch(this.choiceNum) {
                case 0:  
                    this.choicePicked = 0;
                    this.buttonz = new Button(200, game.config.height/2 + 150, speech.Planets[game.settings.planet].NPCs["Leader"].InitChoices[choice].Text, config, this, 
                    () => this.ProcessChoice(speech, speech.Planets[game.settings.planet].NPCs["Leader"].InitChoices[0].Target, "InitChoices"));
                    // this.buttonGroup.add(this.buttonz);
                    break;
                case 1:
                    this.choicePicked = 1;
                    this.button = new Button(800, game.config.height/2 + 150, speech.Planets[game.settings.planet].NPCs["Leader"].InitChoices[choice].Text, config, this, 
                    () => this.ProcessChoice(speech, speech.Planets[game.settings.planet].NPCs["Leader"].InitChoices[1].Target, "InitChoices"));
                    // this.buttonGroup.add(this.button);
                    break;
                case 2:
                    this.choicePicked = 2;
                    this.button = new Button(200, game.config.height/2 + 200, speech.Planets[game.settings.planet].NPCs["Leader"].InitChoices[choice].Text, config, this, 
                    () => this.ProcessChoice(speech, speech.Planets[game.settings.planet].NPCs["Leader"].InitChoices[2].Target, "InitChoices"));
                    // this.buttonGroup.add(this.button);
                    break;
                case 3:
                    this.choicePicked = 3;
                    this.button = new Button(800, game.config.height/2 + 200, speech.Planets[game.settings.planet].NPCs["Leader"].InitChoices[choice].Text, config, this, 
                    () => this.ProcessChoice(speech, speech.Planets[game.settings.planet].NPCs["Leader"].InitChoices[3].Target, "InitChoices"));
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

    ProcessChoice(speech, target, parent) {
        console.log("blop");
        this.label.text = " ";
        if (game.settings.planet == "Earth") {
            game.planetEarthSettings.goalMeter += speech.Planets[game.settings.planet].NPCs["Leader"][parent][this.choicePicked].goalMeterEffect;
        }
        if (game.settings.planet == "Mars") {
            game.planetMarsSettings.goalMeter += speech.Planets[game.settings.planet].NPCs["Leader"][parent][this.choicePicked].goalMeterEffect;
        }
        // this.buttonGroup.clear();
        
        this.choiceNum = 0;
        for (let choice in speech.Planets[game.settings.planet].NPCs["Leader"][target]) {
            if (speech.Planets[game.settings.planet].NPCs["Leader"][target][choice].Target == "End") {
                this.RestartMainScene();
            }
            switch(this.choiceNum) {
                case 0:
                    this.typewriterText(speech.Planets[game.settings.planet].NPCs["Leader"][target][choice].Dialogue);
                    this.button = new Button(200, game.config.height/2 + 150, speech.Planets[game.settings.planet].NPCs["Leader"][target][choice].Text, config, this, 
                    () => this.ProcessChoice(speech, 
                        speech.Planets[game.settings.planet].NPCs["Leader"][target][choice].Target, 
                        speech.Planets[game.settings.planet].NPCs["Leader"][target][choice].Parent));
                    // this.buttonGroup.add(this.button);
                    break;
                case 1:
                    this.typewriterText(speech.Planets[game.settings.planet].NPCs["Leader"][target][choice].Dialogue);
                    this.button = new Button(800, game.config.height/2 + 150, speech.Planets[game.settings.planet].NPCs["Leader"][target][choice].Text, config, this, 
                    () => this.ProcessChoice(speech, 
                        speech.Planets[game.settings.planet].NPCs["Leader"][target][choice].Target, 
                        speech.Planets[game.settings.planet].NPCs["Leader"][target][choice].Parent));
                    // this.buttonGroup.add(this.button);
                    break;
                case 2:
                    this.typewriterText(speech.Planets[game.settings.planet].NPCs["Leader"][target][choice].Dialogue);
                    this.button = new Button(200, game.config.height/2 + 200, speech.Planets[game.settings.planet].NPCs["Leader"][target][choice].Text, config, this, 
                    () => this.ProcessChoice(speech, 
                        speech.Planets[game.settings.planet].NPCs["Leader"][target][choice].Target, 
                        speech.Planets[game.settings.planet].NPCs["Leader"][target][choice].Parent));
                    // this.buttonGroup.add(this.button);
                    break;
                case 3:
                    this.typewriterText(speech.Planets[game.settings.planet].NPCs["Leader"][target][choice].Dialogue);
                    this.button = new Button(800, game.config.height/2 + 200, speech.Planets[game.settings.planet].NPCs["Leader"][target][choice].Text, config, this, 
                    () => this.ProcessChoice(speech, 
                        speech.Planets[game.settings.planet].NPCs["Leader"][target][choice].Target, 
                        speech.Planets[game.settings.planet].NPCs["Leader"][target][choice].Parent));
                    // this.buttonGroup.add(this.button);
                    break;
            }
            ++this.choiceNum;
        }
    }
}