class Disguise extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y, texture, frame, speed, playersprite) {
        super(scene, x, y, texture, frame);
        this.costume = playersprite;

        this.sprite = this.scene.physics.add.sprite(Phaser.Math.Between(1000, 1800), 200, texture);
        this.speed = speed;

        this.sprite.setCollideWorldBounds(true);
        this.sprite.body.setAllowGravity(true);
        this.sprite.body.setImmovable(true);

        this.sprite.setSize(40, 55, true);
    }

    update() {
        this.sprite.setVelocityY(-this.speed * 100);
        if (this.sprite.y == game.config.height) {
            this.sprite.destroy();
        }
    }

    /*disguiseSpawner(filename) {
        const disguise = this.physics.add.sprite(Phaser.Math.Between(texture.width, game.config.width - texture.width), 0, filename);
        this.physics.add.collider(disguise);
        disguise.body.setAllowGravity();
    }*/
}