class Disguise extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y, texture, frame, playersprite, identifier) {
        super(scene, x, y, texture, frame);
        
        this.textureData = this.scene.textures.get(texture).getSourceImage();
        this.costume = playersprite;
        this.identifier = identifier;
        this.sprite = this.scene.physics.add.sprite(Phaser.Math.Between(1000, 1800), 200, texture);
        this.scene.physics.add.collider(this.sprite);
        
        this.sprite.setCollideWorldBounds(true);
        this.sprite.body.setAllowGravity(true);
        this.sprite.setSize(40, 50, true);
        this.clicked = false;
        this.sprite.setInteractive();
    }

    update() {
        this.updateInventory();
    }

    updateInventory() {
        this.sprite.on("pointerdown", () => {
            if (game.settings.planet == "Earth" && 
                (game.planetEarthSettings.Leader == "Phase 1" || game.planetEarthSettings.Leader == "Phase 2") &&
                this.identifier == 1 &&
                !this.clicked) {
                game.planetEarthSettings.goalMeter += 20;
            }
            else if (game.settings.planet == "Mars" && 
                    (game.planetMarsSettings.Leader == "Phase 1" || game.planetMarsSettings.Leader == "Phase 2") &&
                    this.identifier == 0 &&
                    !this.clicked) {
                game.planetMarsSettings.goalMeter += 20;
            }
            this.clicked = true;
        });
    }
}