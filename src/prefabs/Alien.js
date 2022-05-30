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
        this.scene.anims.create({
            key: 'fButton',
            frames: this.anims.generateFrameNumbers('fInteract', {start: 0, end: 1, first: 0}),
            frameRate: 2,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'downButton',
            frames: this.anims.generateFrameNumbers('downInteract', {start: 0, end: 1, first: 0}),
            frameRate: 2,
            repeat: -1
        });
        
        this.activeConversation = false;

        this.animat = this.scene.add.sprite(this.player.x + 100, this.player.y);
        this.animat.play('bubble');
        
        this.button1 = this.scene.add.sprite(this.sprite.x + 50, this.sprite.y - 50);
        this.button1.play('fButton');
        
        this.button2 = this.scene.add.sprite(this.sprite.x - 50, this.sprite.y - 50);
        this.button2.play('downButton');
    }

    update() {
        this.AnimationPositionHandler();
    }
    

    AnimationPositionHandler() {
        this.animat.x = this.sprite.x - 20;
        this.animat.y = this.sprite.y - 10;
        this.button2.x = this.sprite.x - 10;
        this.button2.y = this.sprite.y - 30;
        this.button1.x = this.sprite.x + 10;
        this.button1.y = this.sprite.y - 30;
    }

    OverlapObstacle() {
        this.button1.setVisible(true);
        this.button2.setVisible(true);
        if ((keyF.isDown || keyDOWN.isDown) && !this.activeConversation) {
            this.StartConversation();
        }
    }

    StartConversation() {
        if (this.type == "Shop") {
            game.settings.prevScene = "shipPlayScene";
            this.scene.scene.pause();
            this.scene.scene.launch("shopScene");
        }
        if (this.type == "Leader") {
            game.settings.prevScene = "shipPlayScene";
            this.scene.scene.pause();
            this.scene.scene.launch("dialogueScene", {type: this.type});
        }
    };
}