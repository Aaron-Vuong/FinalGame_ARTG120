class Alien extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, playersprite, characterType) {
        super(scene, x, y, texture, frame);

        let textureData = this.scene.textures.get(texture).getSourceImage();
        this.player = playersprite;

        this.type = characterType;
        // Create and set values for the physics sprite owned by this class.
        this.sprite = this.scene.physics.add.sprite(Phaser.Math.Between(textureData.width, game.config.width - textureData.width), 0, texture);
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

    StartConversation() {
        let speech = this.scene.cache.json.get('sampleDialogue');
        console.log( speech.Planets[game.settings.planet].NPCs.Shop);
        this.activeConversation = true;
        this.scene.add.text(this.sprite.x, this.sprite.y + 50, "Welcome to " + game.settings.planet).setOrigin(0.5);
        this.scene.add.text(this.sprite.x, this.sprite.y + 100, speech.Planets[game.settings.planet].NPCs[this.type].Dialogue).setOrigin(0.5);

    };
    
    StopConversation() {
        this.activeConversation = false;
        this.activeConversationState = null;
        this.scene.scene.isPaused = false;
    };
    
    UpdateConversationState(stateId) {
        this.activeConversationState = stateId;
        // $showConversationState is a jQuery function that manages the DOM
        $showConversationState(this.activeConversation, stateId);
    };
}