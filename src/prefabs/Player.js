class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        
        this.sprite = this.scene.physics.add.sprite(game.config.width/2, game.config.height/2 - borderUISize*4 - borderPadding*2+330, texture).setOrigin(0.5,0.5);
        this.sprite.setCollideWorldBounds(true);
        this.moveSpeed = 300;

        this.activeConversation = false;

        this.scene.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('AlienAnim', {start: 0, end: 12, first: 0}),
            frameRate: 8
        });
        this.walkAnim = this.scene.add.sprite(this.sprite.x, this.sprite.y);
        this.walkAnim.setVisible(false);

        this.scene.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('jumpAlienAnim', {start: 0, end: 17, first: 0}),
            frameRate: 12
        });
        
        this.jumpAnim = this.scene.add.sprite(this.sprite.x, this.sprite.y);
        this.jumpAnim.setVisible(false);
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
        this.walkAnim.x = this.sprite.x;
        this.walkAnim.y = this.sprite.y;

        this.jumpAnim.x = this.sprite.x;
        this.jumpAnim.y = this.sprite.y;
        
        if (!this.jumpAnim.anims.isPlaying && !this.sprite.body.touching.down) {
            this.jumpAnim.setVisible(true);
            this.jumpAnim.anims.play('jump');
        }
        if ((keyLEFT.isDown || keyA.isDown || keyRIGHT.isDown || keyD.isDown) && !this.walkAnim.anims.isPlaying) {
            this.walkAnim.setVisible(true);
            this.walkAnim.anims.play('walk');
        }
        if (!this.walkAnim.anims.isPlaying) {
            this.walkAnim.setVisible(false);
        }
        if (!this.jumpAnim.anims.isPlaying) {
            this.jumpAnim.setVisible(false);
        }

    }
}