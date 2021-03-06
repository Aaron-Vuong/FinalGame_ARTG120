class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        
        this.sprite = this.scene.physics.add.sprite(game.config.width/2, game.config.height/2 - borderUISize*4 - borderPadding*2+330, texture).setOrigin(0.5,0.5);
        this.sprite.setCollideWorldBounds(true);
        this.moveSpeed = 300;

        this.scene.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('AlienAnim', {start: 0, end: 11, first: 0}),
            frameRate: 8
        });
        this.scene.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('jumpAlienAnim', {start: 0, end: 16, first: 0}),
            frameRate: 12
        });
    }

    update() {
        this.MovementHandler();
        this.AnimationHandler();
    }
    MovementHandler() {
        if (this.sprite.body.onFloor() && (keySPACE.isDown || keyUP.isDown || keyW.isDown)) {
            this.sprite.setVelocityY(-this.moveSpeed);
        }
        if(keyLEFT.isDown || keyA.isDown) {
            this.sprite.setVelocityX(-(this.moveSpeed));
        } else if (keyRIGHT.isDown || keyD.isDown) {
            this.sprite.setVelocityX(this.moveSpeed);
        }
        else {
            this.sprite.setVelocityX(0);
        }
    }

    AnimationHandler() {
        if (this.sprite.body.onFloor() && (keySPACE.isDown || keyUP.isDown || keyW.isDown)) {
            this.sprite.anims.play('jump');
        }
        else if ((keyLEFT.isDown || keyA.isDown || keyRIGHT.isDown || keyD.isDown) && !this.sprite.anims.isPlaying) {
            this.sprite.anims.play('walk');
        }
        this.sprite.on('animationcomplete', () => {
            this.sprite.setTexture('player', 0);
        }, this);

    }
}