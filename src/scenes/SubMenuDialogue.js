class Dialogue extends Phaser.Scene {
    constructor() {
        super("dialogueScene");
    }

    // Initialize the dialogue scene with the Alien's datatype.
    init(data) {
        this.type = data.type;
    }

    // CREATE
    create() {
        // JSON File that contains all NPC Dialogue.
        let speech = this.cache.json.get('sampleDialogue');
        // Dialogue Box
        this.settingsRectangle = this.add.rectangle(game.config.width/2, game.config.height/2 + 150, 1000, 200, 0x808080).setInteractive();
        this.settingsRectangle.on('pointerdown', () => this.SkipDialogue(speech));

        this.buttonPositions = [[200, game.config.height/2 + 150], 
                                [800, game.config.height/2 + 150], 
                                [200, game.config.height/2 + 200],
                                [800, game.config.height/2 + 200]];

        if (game.settings.planet == "Earth") { this.planet = game.planetEarthSettings; }
        else if (game.settings.planet == "Mars") { this.planet = game.planetMarsSettings; }
        if (this.type == "Leader") { this.dialogueState = this.planet.Leader; }
        else if (this.type == "Other") { this.dialogueState = this.planet.Other; }

        this.buttonGroup = this.add.group();

        this.label = this.add.text(game.config.width/2, game.config.height/2 + 100, " ").setOrigin(0.5).setWordWrapWidth(650);
        this.LDialogue = this.typewriterText(speech.Planets[game.settings.planet].NPCs[this.type][this.dialogueState].InitChoices.Dialogue);

        this.mostRecentChoice = "InitChoices";
        for (let choice in speech.Planets[game.settings.planet].NPCs[this.type][this.dialogueState].InitChoices.Choices) {
            this.button = new Button(this.buttonPositions[choice][0], this.buttonPositions[choice][1], speech.Planets[game.settings.planet].NPCs[this.type][this.dialogueState].InitChoices.Choices[choice].Text, config, this, 
            () => this.ProcessChoice(speech, speech.Planets[game.settings.planet].NPCs[this.type][this.dialogueState].InitChoices.Choices[choice].Target, "InitChoices", choice));
            this.buttonGroup.add(this.button.button);
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
    
    EndGame() {
        this.scene.stop();
        this.scene.start("endGameScene");
    }

    typewriterText(text) {
        const length = text.length;
        let i = 0;
        this.typewriter = this.time.addEvent({
            callback: () => {
                this.label.text += text[i];
                ++i;
            },
            repeat: length - 1,
            delay: 60
        })

    }

    typewriteTextWrapped(text) {
        const lines = this.label.getWrappedText(text);
        const wrappedText = lines.join('\n');

        this.typewriterText(wrappedText);
    }

    SkipDialogue(speech) {
        this.typewriter.remove();
        this.label.text = speech.Planets[game.settings.planet].NPCs[this.type][this.dialogueState][this.mostRecentChoice].Dialogue;
    }

    ProcessChoice(speech, target, parent, choicePicked) {
        this.typewriter.remove();
        this.buttonGroup.clear(true, true);
        this.label.text = " ";

        let choiceChosenFull = speech.Planets[game.settings.planet].NPCs[this.type][this.dialogueState][parent].Choices[choicePicked];
        if (game.settings.planet == "Earth" && choiceChosenFull.AlreadyVisited == false) {
            game.planetEarthSettings.goalMeter += choiceChosenFull.GoalMeterEffect;
        }
        if (game.settings.planet == "Mars" && choiceChosenFull.AlreadyVisited == false) {
            game.planetMarsSettings.goalMeter += choiceChosenFull.GoalMeterEffect;
        }
        choiceChosenFull.AlreadyVisited = true;

        this.typewriterText(speech.Planets[game.settings.planet].NPCs[this.type][this.dialogueState][target].Dialogue);
        
        this.mostRecentChoice = target;

        for (let choice in speech.Planets[game.settings.planet].NPCs[this.type][this.dialogueState][target].Choices) {
            let currChoice = speech.Planets[game.settings.planet].NPCs[this.type][this.dialogueState][target].Choices[choice];
            if (currChoice.Target == "End") {
                this.RestartMainScene();
            }
            if (currChoice.Target == "EndGame") {
                this.EndGame();
            }

            this.button = new Button(this.buttonPositions[choice][0], this.buttonPositions[choice][1], currChoice.Text, config, this, 
                () => this.ProcessChoice(speech, currChoice.Target, currChoice.Parent, choice));
            this.buttonGroup.add(this.button.button);
        }
    }
}