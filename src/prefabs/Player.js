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
        this.walkAnim.alpha = 0;

        this.scene.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('jumpAlienAnim', {start: 0, end: 17, first: 0}),
            frameRate: 12
        });
        this.walkAnim = this.scene.add.sprite(this.sprite.x, this.sprite.y);
        this.walkAnim.alpha = 0;

        this.jumpAnim = this.scene.add.sprite(this.sprite.x, this.sprite.y);
        this.jumpAnim.alpha = 0;
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
        if (this.sprite.body.velocity.x != 0 && !this.walkAnim.anims.isPlaying) {
            this.jumpAnim.alpha = 0;
            this.walkAnim.alpha = 1;
            this.walkAnim.anims.play('walk');
        }
        if (!this.jumpAnim.anims.isPlaying && !this.sprite.body.touching.down) {
            this.walkAnim.alpha = 0;
            this.jumpAnim.alpha = 1;
            this.jumpAnim.anims.play('jump');
        }
    }
}