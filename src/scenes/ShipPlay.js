class ShipPlay extends Phaser.Scene {
    constructor() {
        super("shipPlayScene");
    }

    preload() {
        this.load.image("player", "./assets/playerBox.png");
        this.load.image("alien", "./assets/alien-1.png");
        this.load.spritesheet('dialogueAnim', './assets/talkingDialogueAnim.png', {frameWidth: 15, frameHeight: 15, startFrame: 0, endFrame: 7});

    }

    create() {
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, "Planet: " + game.settings.planet).setOrigin(0.5);
        this.player = new Player(this, game.config.width/2, game.config.height/2, "player", 0);
        this.npc = new Alien(this, game.config.width/2, game.config.height - 80, "alien", 0, this.player.sprite);


        // Set up keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

    }

    update() {
        this.npc.update();
        this.player.update();
    }
}