class Alien extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, playersprite, characterType) {
        super(scene, x, y, texture, frame);

        let textureData = this.scene.textures.get(texture).getSourceImage();
        this.player = playersprite;

        this.type = characterType;
        // Create and set values for the physics sprite owned by this class.
        this.sprite = this.scene.physics.add.sprite(x, y, texture);
        this.scene.physics.add.collider(this.sprite);
        
        this.sprite.setCollideWorldBounds(true);
        this.sprite.body.setAllowGravity(true);

        this.scene.physics.add.overlap(this.scene.player.sprite, this.sprite, this.OverlapObstacle, null, this);
        this.scene.anims.create({
            key: 'bubble',
            frames: this.anims.generateFrameNumbers('dialogueAnim', {start: 0, end: 7, first: 0}),
            frameRate: 15,
            repeat: -1
        });
        
        this.activeConversation = false;

        this.animat = this.scene.add.sprite(this.player.x + 100, this.player.y);
        this.animat.play('bubble');
    }

    update() {
        this.AnimationPositionHandler();
    }

    AnimationPositionHandler() {
        this.animat.x = this.sprite.x - 20;
        this.animat.y = this.sprite.y - 10;
    }

    OverlapObstacle() {
        if (keyF.isDown && !this.activeConversation) {
            console.log("blolkbaerp");
            this.StartConversation();
        }
    }

    ListChoices(speech) {
        let place = 50;
        if (this.type == "Shop") {
            game.settings.prevScene = "shipPlayScene";
            this.scene.scene.pause();
            this.scene.scene.launch("shopScene");
        }
        if (this.type == "Leader") {
            game.settings.prevScene = "shipPlayScene";
            this.scene.scene.pause();
            this.scene.scene.launch("dialogueScene");
        }

        // for (let choice in speech.Planets[game.settings.planet].NPCs[this.type].InitChoices) {
        //     this.choiceText = this.scene.add.text(this.sprite.x, this.sprite.y + place, speech.Planets[game.settings.planet].NPCs[this.type].InitChoices[choice].Text, game.settings.textConfig).setOrigin(0.5);
        //     this.choiceText.setInteractive();

        //     if (this.type == "Shop") {
        //         this.StartShop();
        //     }
        //     if (this.type == "Leader") {
        //         this.StartDialogue();
        //     }
    
        //     console.log(speech.Planets[game.settings.planet].NPCs[this.type].InitChoices[choice].Text);
        //     place += 50;
        // }
    };

    StartConversation() {
        // let speech = this.scene.cache.json.get('sampleDialogue');
        // console.log( speech.Planets[game.settings.planet].NPCs.Shop);
        // this.activeConversation = true;
        // this.scene.add.text(this.sprite.x, this.sprite.y - 100, "Welcome to " + game.settings.planet).setOrigin(0.5);
        // this.scene.add.text(this.sprite.x, this.sprite.y - 50, speech.Planets[game.settings.planet].NPCs[this.type].Dialogue).setOrigin(0.5);
        
        // this.ListChoices(speech);

        if (this.type == "Shop") {
            game.settings.prevScene = "shipPlayScene";
            this.scene.scene.pause();
            this.scene.scene.launch("shopScene");
        }
        if (this.type == "Leader") {
            game.settings.prevScene = "shipPlayScene";
            this.scene.scene.pause();
            this.scene.scene.launch("dialogueScene");
        }
    };

    StartShop() {
        console.log("aporegkjoapbe");
        this.choiceText.on("pointerdown", () => {
            game.settings.prevScene = "shipPlayScene";
            this.scene.scene.pause();
            this.scene.scene.launch("shopScene");
        });
    }
    StartDialogue() {
        this.choiceText.on("pointerdown", () => {
            game.settings.prevScene = "shipPlayScene";
            this.scene.scene.pause();
            this.scene.scene.launch("dialogueScene");
        });
    }
}