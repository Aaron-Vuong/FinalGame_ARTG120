class Interactable extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, playersprite) {
        super(scene, x, y , texture, frame);

        let textureData = this.scene.textures.get(texture).getSourceImage();
        this.interAct = playersprite;

        this.sprite = this.scene.physics.add.sprite(Phaser.Math.Between(200, 900), 200, texture);
        this.scene.physics.add.collider(this.sprite);
        

        this.sprite.setCollideWorldBounds(true);
        this.sprite.body.setAllowGravity(true);
        this.sprite.body.setImmovable(true);

        this.sprite.setSize(40, 70, true);
    }

    update() {

    }

}    