class Disguise extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y, texture, frame, speed, playersprite) {
        super(scene, x, y, texture, frame);
        this.costume = playersprite;

        this.sprite = this.scene.physics.add.sprite(Phaser.Math.Between(1000, 1800), 200, texture);
        this.speed = speed;
        this.scene.physics.add.collider(this.sprite);
        
        this.sprite.setCollideWorldBounds(true);
        this.sprite.body.setAllowGravity(true);
        this.sprite.setSize(40, 40, true);
    }

    update() {
        this.sprite.setVelocityY(-this.speed * 100);
        if (this.sprite.y == game.config.height) {
            this.sprite.destroy();
        }
    }
}