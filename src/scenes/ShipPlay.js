class ShipPlay extends Phaser.Scene {
    constructor() {
        super("shipPlayScene");
    }

    preload() {
        this.load.image("player", "./assets/AlienProtag.png");
        this.load.image("alien", "./assets/NPC1.png");
        this.load.image("alien2", "./assets/NPC1Spec.png");
        this.load.image("alien3", "./assets/NPC1Spec2.png");
        this.load.image("marsalien", "./assets/NPC2.png");
        this.load.image("marsalien2", "./assets/NPC2Spec.png");
        this.load.image("marsalien3", "./assets/NPC2Spec2.png");
        this.load.image("floor", "./assets/sampleFloor.png");
        this.load.image("BG", "./assets/TestBG.png");
        this.load.image("BG2", "./assets/FuturisticBG.png");
        this.load.image("Houses1", "./assets/Houses1.png");
        this.load.image("Houses2", "./assets/Houses2.png");
        this.load.image("buttonSettings", "./assets/ButtonX.png");
        this.load.image("Shop", "./assets/Shop.png");
        this.load.image("vinyl", "./assets/vinyl.png");
        this.load.image("dialogueBox", "./assets/PlaceholderDialogueBox.png");
        this.load.image("blob", "./assets/blob.png");
        this.load.image("topHat", "./assets/topHat.png");
        this.load.image("Heels", "./assets/heels.png");
        this.load.image("Goggles", "./assets/goggle.png");
        this.load.image("Food", "./assets/FruitFood.png");
        this.load.image("Fuel", "./assets/Fuel.png");
        this.load.image("spike", "./assets/spike.png");
        this.load.audio("vinylAudio", "./assets/song_sfx.wav");
        this.load.audio("ForestBG", "./assets/ForestPlanetBG.wav");
        this.load.audio("FutureBG", "./assets/FuturisticPlanetBG.wav");
        this.load.spritesheet("blobAnim", "./assets/blobAnim2.png", {frameWidth:90, frameHeight:120, startFrame:0, endFrame:3});
        this.load.spritesheet("note", "./assets/note.png", {frameWidth: 20, frameHeight: 20, startFrame: 0, endFrame: 5});
        this.load.spritesheet('dialogueAnim', './assets/talkingDialogueAnim.png', {frameWidth: 15, frameHeight: 15, startFrame: 0, endFrame: 7});
        this.load.spritesheet('AlienAnim', './assets/AlienAnims.png', {frameWidth: 31, frameHeight: 56, startFrame: 0, endFrame: 11});
        this.load.spritesheet('jumpAlienAnim', './assets/JumpAlienAnim.png', {frameWidth: 31, frameHeight: 56, startFrame: 0, endFrame: 16});
        this.load.spritesheet('fInteract', './assets/FInteractButton.png', {frameWidth: 15, frameHeight: 15, startFrame: 0, endFrame: 1});
        this.load.spritesheet('downInteract', './assets/DownArrowInteractButton.png', {frameWidth: 15, frameHeight: 15, startFrame: 0, endFrame: 1});
    }

    create() {
        
        if (game.settings.planet == "Earth") {
            this.bg = this.add.tileSprite(0, 195, 2000, 400, 'BG', 0).setOrigin(0,0);
            this.Houses2 = this.add.tileSprite(0, 184, 2000, 400, 'Houses2', 0).setOrigin(0,0);
            this.Forest = this.sound.add('ForestBG');
            this.Forest.setLoop(true);
            this.Forest.volume = 0.2;
            this.Forest.play();
            this.soundz = this.Forest;
            
            this.shop = this.add.tileSprite(100, 350, 240, 136, 'Shop', 0).setOrigin(0,0);
            this.food = this.add.tileSprite(302, 435, 29, 31, 'Food', 0).setOrigin(0,0);
            this.fuel = this.add.tileSprite(235, 430, 29, 31, 'Fuel', 0).setOrigin(0,0);
            this.player = new Player(this, game.config.width/2, game.config.height/2 + 100, "player", 0);
            
            this.npcSHOP = new Alien(this, game.config.width/2 + 100, game.config.height - 80, "alien3", 0, this.player.sprite, "Leader", this.planet);
            this.npc2 = new Alien(this, 280, 370, "alien2", 0, this.player.sprite, "Shop", this.planet);
            this.npc3 = new Alien(this, 400, 370, "alien", 0, this.player.sprite, "Other", this.planet);
            this.planet = game.planetEarthSettings;
        }
        if (game.settings.planet == "Mars") {
            this.bg2 = this.add.tileSprite(0, 195, 2000, 400, 'BG2', 0).setOrigin(0,0);
            this.Houses = this.add.tileSprite(0, 180, 2000, 400, 'Houses1', 0).setOrigin(0,0);
            this.Future = this.sound.add('FutureBG');
            this.Future.setLoop(true);
            this.Future.volume = 0.2;
            this.Future.play();
            this.soundz = this.Future;
            
            this.shop = this.add.tileSprite(100, 350, 240, 136, 'Shop', 0).setOrigin(0,0);
            this.food = this.add.tileSprite(302, 435, 29, 31, 'Food', 0).setOrigin(0,0);
            this.fuel = this.add.tileSprite(235, 430, 29, 31, 'Fuel', 0).setOrigin(0,0);
            this.player = new Player(this, game.config.width/2, game.config.height/2 + 100, "player", 0);
            
            this.npcSHOP = new Alien(this, game.config.width/2 + 100, game.config.height - 80, "marsalien3", 0, this.player.sprite, "Leader", this.planet);
            this.npc2 = new Alien(this, 280, 370, "marsalien2", 0, this.player.sprite, "Shop", this.planet);
            this.npc3 = new Alien(this, 400, 370, "marsalien", 0, this.player.sprite, "Other", this.planet);
            this.planet = game.planetMarsSettings;
        }
        this.oldGoalMeter = this.planet.goalMeter;

        this.recPlay = new MusicPlayer(this, 0, 0, "vinyl", 0, this.player.sprite, "Shop").setInteractive();
        this.blob = new Interactable(this, 0, 0, "blob", 0, this.player.sprite);
        this.spike = new Spike(this, 0, 0, "spike", 0, this.player.sprite);
        this.hat =  new Disguise(this, 0, 0, "topHat", 0, this.player.sprite, 1);
        this.goggle = new Disguise(this, 0, 0, "Goggles", 0, this.player.sprite, 0);

        this.progressBarOutline = this.add.rectangle(game.config.width/2 + 120, game.config.height/2 - 105, 154, 20, 0x000000).setScrollFactor(0);
        this.progressBar = this.add.rectangle(game.config.width/2 + 120, game.config.height/2 - 105, 150, 15, 0x808080).setScrollFactor(0);
        this.progressBarComplete = this.add.rectangle(game.config.width/2 + 44, game.config.height/2 - 112.5, 0, 15, 0x228B22).setScrollFactor(0).setOrigin(0);
        this.progressText = this.add.text(game.config.width/2 + 120, game.config.height/2 - 105, "Planet Acceptance", {fontSize: 8, fontFamily: "Arial", fontStyle: "bold"}).setScrollFactor(0).setOrigin(0.5);

        this.music = this.sound.add("vinylAudio");

        // Settings Button
        this.booton = this.add.image(game.config.width/2 + 210, game.config.height/2 - 120, "buttonSettings").setOrigin(0).setInteractive().setScrollFactor(0);

        this.booton.on("pointerdown", () => {
            game.settings.prevScene = "shipPlayScene";
            this.scene.pause();
            this.scene.launch("settingsScene", {planet: this.planet, song: this.soundz});
        });

        this.floor = this.physics.add.sprite(game.config.width, game.config.height, "floor", 0).setImmovable(true);
        this.floor.body.setAllowGravity(false);

        this.objectsGrp = this.add.group([this.goggle.sprite, this.hat.sprite]);
        this.peopleGrp = this.add.group([this.player.sprite, this.npcSHOP.sprite, this.npc2.sprite, this.npc3.sprite]);
        this.floorGrp = this.add.group([this.floor, this.recPlay.sprite, this.blob.sprite, this.spike.sprite]);
        

        this.physics.add.collider(this.floorGrp, this.objectsGrp);
        this.physics.add.collider(this.floorGrp, this.peopleGrp);

        //get disguises
        this.physics.add.overlap(this.objectsGrp, this.player.sprite, this.getDisguise, null, this);

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


        // Set up keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
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

        this.UpdateProgressBar();
        this.CheckProgression();
        this.hat.update();
        this.npcSHOP.update();
        this.npc2.update();
        this.npc3.update();
        this.player.update();
        this.recPlay.update();
        this.blob.update();
    }

    UpdateProgressBar() {
        if (this.planet.goalMeter != this.oldGoalMeter) {
            this.tweens.add({
                targets: this.progressBarComplete,
                width: {from: 150 * (this.oldGoalMeter/100), to: 150 * (this.planet.goalMeter/100)},
                ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 3000,
                repeat: 0,            // -1: infinity
                yoyo: false
            })
            this.oldGoalMeter = this.planet.goalMeter
        }
    }

    CheckProgression() {
        if (this.planet.goalMeter >= 10 && this.planet.goalMeter < 100) {
            this.planet.Other = "Phase 1";
        }
        if (this.planet.goalMeter >= 20 && this.planet.goalMeter < 100) {
            this.planet.Leader = "Phase 1";
            this.planet.Other = "Phase 1";
        }
        if (this.planet.goalMeter >= 50 && this.planet.goalMeter < 100) {
            this.planet.Leader = "Phase 2";
            this.planet.Other = "Phase 2";
        }
        else if (this.planet.goalMeter >= 100) {
            this.planet.Leader = "End";
            this.planet.Other = "End";
            this.scene.start("endGameScene");
        }
    }
}   