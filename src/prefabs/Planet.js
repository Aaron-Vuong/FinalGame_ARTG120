class Planet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.moveSpeed = 3;

        this.planet = this.scene.add.image(x, y, texture).setInteractive();
        this.planet.input.alwaysEnabled = true;
        this.planet.alpha = 0.7;
        this.planet.on("pointerover", () => { this.planet.alpha = 1; })
        this.planet.on("pointerout", () => { this.planet.alpha = 0.7; });
        this.planet.on("pointerdown", () => { game.settings.planet = texture;
                                              this.scene.scene.start("shipPlayScene");
                                              game.sound.stopAll();
        });
    }

    update() {

    }
    
}