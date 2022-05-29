class Spike extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, playersprite) {
        super(scene, x, y , texture, frame);

        let textureData = this.scene.textures.get(texture).getSourceImage();
        this.spikeObj = playersprite;

        this.sprite = this.scene.physics.add.sprite(1800, 200, texture);
        this.scene.physics.add.collider(this.sprite);
        

        this.sprite.setCollideWorldBounds(true);
        this.sprite.body.setAllowGravity(true);
        this.sprite.body.setImmovable(true);

        this.sprite.setSize(50, 70, true);
    }

    update() {

    }
}