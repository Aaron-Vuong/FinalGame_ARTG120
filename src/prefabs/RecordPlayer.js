class MusicPlayer extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, playersprite) {
        super(scene, x, y , texture, frame);

        let textureData = this.scene.textures.get(texture).getSourceImage();
        this.obj = playersprite;
        this.soundPlay = scene.sound.add("vinylAudio");

        this.sprite = this.scene.physics.add.sprite(700, 200, texture);
        this.scene.physics.add.collider(this.sprite);
        

        this.sprite.setCollideWorldBounds(true);
        this.sprite.body.setAllowGravity(true);
        this.sprite.body.setImmovable(true);

        this.sprite.setSize(40, 70, true);

        this.scene.anims.create({
            key: 'musicPlay',
            frames: this.anims.generateFrameNumbers('note', {start: 0, end: 5, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        this.musical = this.scene.add.sprite(this.obj.x - 100, this.obj.y);
        this.musical.play('musicPlay');
    }

    update() {
        this.animPos();
        this.playAudio();
    }

    animPos() {
        this.musical.x = this.sprite.x - 10;
        this.musical.y = this.sprite.y - 20;
    }

    playAudio() {
        this.sprite.setInteractive();

        this.sprite.on("pointerdown", () => {
            this.scene.sound.play("vinylAudio");
        })
    }
}