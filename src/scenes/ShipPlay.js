class ShipPlay extends Phaser.Scene {
    constructor() {
        super("shipPlayScene");
    }

    preload() {
        this.load.image("player", "./assets/AlienProtag.png");
        this.load.image("alien", "./assets/NPC1.png");
        this.load.image("floor", "./assets/sampleFloor.png");
        this.load.image("BG", "./assets/TestBG.png");
        this.load.image("buttonSettings", "./assets/ButtonX.png");
        this.load.image("Shop", "./assets/Shop.png");
        this.load.image("vinyl", "./assets/vinyl.png");
        this.load.image("dialogueBox", "./assets/PlaceholderDialogueBox.png");
        this.load.image("blob", "./assets/blob.png");
        this.load.image("Food", "./assets/FruitFood.png");
        this.load.image("Fuel", "./assets/Fuel.png");
        this.load.image("spike", "./assets/spike.png");
        this.load.audio("vinylAudio", "./assets/song_sfx.wav");
        this.load.spritesheet("blobAnim", "./assets/blobAnim2.png", {frameWidth:90, frameHeight:120, startFrame:0, endFrame:3});
        this.load.spritesheet("note", "./assets/note.png", {frameWidth: 20, frameHeight: 20, startFrame: 0, endFrame: 5});
        this.load.spritesheet('dialogueAnim', './assets/talkingDialogueAnim.png', {frameWidth: 15, frameHeight: 15, startFrame: 0, endFrame: 7});
        this.load.spritesheet('AlienAnim', './assets/AlienAnims.png', {frameWidth: 31, frameHeight: 56, startFrame: 0, endFrame: 12});
        this.load.spritesheet('jumpAlienAnim', './assets/JumpAlienAnim.png', {frameWidth: 31, frameHeight: 56, startFrame: 0, endFrame: 17});
    }

    create() {
        this.bg = this.add.tileSprite(0, 200, 2000, 400, 'BG', 0).setOrigin(0,0);
        this.shop = this.add.tileSprite(100, 350, 240, 136, 'Shop', 0).setOrigin(0,0);
        this.food = this.add.tileSprite(302, 435, 29, 31, 'Food', 0).setOrigin(0,0);
        this.fuel = this.add.tileSprite(235, 430, 29, 31, 'Fuel', 0).setOrigin(0,0);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, "Planet: " + game.settings.planet).setOrigin(0.5);
        this.player = new Player(this, game.config.width/2, game.config.height/2 + 100, "player", 0);
        this.npcSHOP = new Alien(this, game.config.width/2 + 100, game.config.height - 80, "alien", 0, this.player.sprite, "Leader");
        this.recPlay = new MusicPlayer(this, game.config.width/2, game.config.height - 35, "vinyl", 0, this.player.sprite, "Shop");
        this.blob = new Interactable(this, game.config.width/2, game.config.height - 35, "blob", 0, this.player.sprite);
        this.spike = new Spike(this, game.config.width/2, game.config.height - 35, "spike", 0, this.player.sprite);
        this.npc2 = new Alien(this, 280, 370, "alien", 0, this.player.sprite, "Shop");

        this.recPlay.setInteractive();
        this.music = this.sound.add("vinylAudio");

        //make blob squish when clicked on
        

        // Settings Button
        this.booton = this.add.image(game.config.width/2 + 200, game.config.height/2 - 100, "buttonSettings").setOrigin(0);
        this.booton.setInteractive();
        this.booton.setScrollFactor(0,0);
        this.booton.on("pointerdown", () => {
            game.settings.prevScene = "shipPlayScene";
            this.scene.pause();
            this.scene.launch("settingsScene")
        });

        this.settingsfunc = () => {
            game.settings.prevScene = "shipPlayScene";
            this.scene.pause();
            this.scene.launch("settingsScene");
        }
        

        this.floor = this.physics.add.sprite(game.config.width, game.config.height, "floor", 0).setImmovable(true);
        this.floorGrp = this.add.group({
            immovable: true,
            allowGravity: false
        });
        this.floorGrp.add(this.floor);
        this.physics.add.collider(this.floorGrp, this.player.sprite);
        this.physics.add.collider(this.player.sprite, this.recPlay.sprite);
        this.physics.add.collider(this.player.sprite, this.blob.sprite);
        this.physics.add.collider(this.player.sprite, this.spike.sprite);
        this.physics.add.collider(this.floorGrp, this.spike.sprite);
        this.physics.add.collider(this.floorGrp, this.blob.sprite);
        this.physics.add.collider(this.floorGrp, this.recPlay.sprite);
        this.physics.add.collider(this.floorGrp, this.npcSHOP.sprite);
        
        this.physics.add.collider(this.floorGrp, this.npc2.sprite);
        this.floor.body.setAllowGravity(false);

        this.cam1 = this.cameras.main.setViewport(0, 0, game.config.width, game.config.height);
        this.cameras.main.setBounds(0, 0, 2000, 3000);
        this.cam1.startFollow(this.player.sprite, true);
        this.cam1.setLerp(1,0.1);
        this.cam1.setDeadzone(400);
        this.cam1.setZoom(2);

        let controlConfig = {
            camera: this.cameras.main,      // which camera?
            left: keyJ,             // define keys...
            right: keyL,
            down: keyK,
            zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
            zoomSpeed: 0.01,
            acceleration: 0.06,             // physics values (keep these low)
            drag: 0.0005,
            maxSpeed: 0.5
        }
        this.camControl = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
        
        this.physics.world.setBounds(0, -3000 + game.config.height, 2000, 3000);
        // this.actionsContainer = document.body.appendChild(document.createElement("div"));
        // let button = this.actionsContainer.appendChild(document.createElement("button"));

        
        // Set up keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        
        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    }

    update() {
        this.camControl.update();
        this.npcSHOP.update();
        this.npc2.update();
        this.player.update();
        this.recPlay.update();
        this.blob.update();
    }

    disguiseSpawner(filename) {
        let texture = this.textures.get(filename).getSourceImage();
        const disguise = this.physics.add.sprite(Phaser.Math.Between(texture.width, game.config.width - texture.width), 0, filename);
        this.physics.add.collider(disguise);
        disguise.body.setAllowGravity();
    }
}   