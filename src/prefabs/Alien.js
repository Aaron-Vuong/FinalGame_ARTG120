class Alien extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, playersprite) {
        super(scene, x, y, texture, frame);

        let textureData = this.scene.textures.get(texture).getSourceImage();
        this.player = playersprite;

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
        
        this.animat = this.scene.add.sprite(this.player.x + 100, this.player.y);
        this.animat.play('bubble');
    }

    update() {
        AnimationPositionHandler();
    }

    AnimationPositionHandler() {
        this.animat.x = this.sprite.x - 20;
        this.animat.y = this.sprite.y - 10;
    }

    OverlapObstacle() {
        if (keyF.isDown) {
            console.log("blolkbaerp");
        }
    }
}