class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        
        this.sprite = this.scene.physics.add.sprite(game.config.width/2, game.config.height/2 - borderUISize*4 - borderPadding*2, texture).setOrigin(0.5,0.5);

        this.sprite.setCollideWorldBounds(true);
        this.moveSpeed = 300;
    }

    update() {
        if(keyLEFT.isDown || keyA.isDown) {
            this.sprite.setVelocityX(-(this.moveSpeed));
        } else if (keyRIGHT.isDown || keyD.isDown) {
            this.sprite.setVelocityX(this.moveSpeed);
        }
        else {
            this.sprite.setVelocityX(0);
        }
        
    }
    
}