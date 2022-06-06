class Interactable extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, playersprite) {
        super(scene, x, y , texture, frame);

        let textureData = this.scene.textures.get(texture).getSourceImage();
        this.interAct = playersprite;

        this.sprite = this.scene.physics.add.sprite(1350, game.config.height/2 + 100, texture);
        this.scene.physics.add.collider(this.sprite);
        

        this.sprite.setCollideWorldBounds(true);
        this.sprite.body.setAllowGravity(true);
        this.sprite.body.setImmovable(true);

        this.sprite.setSize(100, 70, true);

        this.scene.anims.create({
            key: 'squish',
            frames: this.anims.generateFrameNumbers('blobAnim', {start: 0, end: 3, first: 0}),
            frameRate: 5,
            repeat: -1
        });

        this.blobSquish = this.scene.add.sprite(1350, 200);
        this.blobSquish.play('squish');
    }

    update() {
       this.playSquish();
    }

    playSquish() {
        this.sprite.setInteractive();

        this.blobSquish.x = this.sprite.x;
        this.blobSquish.y = this.sprite.y;

        this.sprite.on("pointerdown", () => {
            this.blobSquish.play('squish');
            if (game.settings.planet == "Earth" && 
                (game.planetEarthSettings.Leader == "Phase 1" || game.planetEarthSettings.Leader == "Phase 2") &&
                !this.clicked) {
                game.planetEarthSettings.goalMeter += 10;
            }
            else if (game.settings.planet == "Mars" && 
                    (game.planetEarthSettings.Leader == "Phase 1" || game.planetEarthSettings.Leader == "Phase 2") &&
                    !this.clicked) {
                game.planetMarsSettings.goalMeter += 10;
            }
            this.clicked = true;
        });
    }

}    