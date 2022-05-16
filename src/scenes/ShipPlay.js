class ShipPlay extends Phaser.Scene {
    constructor() {
        super("shipPlayScene");
    }

    preload() {
        this.load.image("player", "./assets/AlienProtag.png");
        this.load.image("alien", "./assets/NPC1.png");
        this.load.image("floor", "./assets/sampleFloor.png");
        this.load.image("buttonSettings", "./assets/ButtonX.png");
        this.load.spritesheet('dialogueAnim', './assets/talkingDialogueAnim.png', {frameWidth: 15, frameHeight: 15, startFrame: 0, endFrame: 7});

    }

    create() {

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, "Planet: " + game.settings.planet).setOrigin(0.5);
        this.player = new Player(this, game.config.width/2, game.config.height/2, "player", 0);
        this.npc = new Alien(this, game.config.width/2, game.config.height - 80, "alien", 0, this.player.sprite);

        this.booton = this.add.image(game.config.width - 50, 15, "buttonSettings").setOrigin(0);
        this.booton.setInteractive();
        this.booton.setScrollFactor(0,0);

        this.floor = this.physics.add.sprite(game.config.width, game.config.height, "floor", 0).setImmovable(true);
        this.floorGrp = this.add.group({
            immovable: true,
            allowGravity: false
        });
        this.floorGrp.add(this.floor);
        this.physics.add.collider(this.floorGrp, this.player.sprite);
        
        this.physics.add.collider(this.floorGrp, this.npc.sprite);
        this.floor.body.setAllowGravity(false);

        this.cam1 = this.cameras.main.setViewport(0, 0, game.config.width, game.config.height);
        this.cameras.main.setBounds(0, 0, 2000, 3000);
        this.cam1.startFollow(this.player.sprite);
        this.cam1.setLerp(0.1,0);
        this.cam1.setDeadzone(300);

        let controlConfig = {
            camera: this.cameras.main,      // which camera?
            left: keyLEFT,             // define keys...
            right: keyRIGHT,
            zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
            zoomSpeed: 0.01,
            acceleration: 0.06,             // physics values (keep these low)
            drag: 0.0005,
            maxSpeed: 0.5
        }
        
        this.camControl = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

        this.actionsContainer = document.body.appendChild(document.createElement("div"));
        let button = this.actionsContainer.appendChild(document.createElement("button"));

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
        this.camControl.update();
        this.npc.update();
        this.player.update();
    }
}