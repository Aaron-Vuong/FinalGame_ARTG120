class Shop extends Phaser.Scene {
    constructor() {
        super("shopScene");
    }
    create() {
        this.booton = this.add.rectangle(0,0, game.config.width * 2, game.config.height * 2, 0x6226ff);
    //    this.booton = this.add.image(game.config.width - 100, game.config.height - 100, "buttonSettings").setOrigin(0);
        this.booton.setAlpha(0.1);
        this.booton.setInteractive();
        this.booton.setScrollFactor(0,0);
        this.booton.on("pointerdown", () => {
            this.scene.stop();
            this.scene.run(game.settings.prevScene);
        });

        this.settingsRectangle = this.add.rectangle(game.config.width/2, game.config.height/2, 500, 400, 0x6904ff).setInteractive();
        
    }
    update() {
        if (keyESC.isDown) {
            this.RestartMainScene();
        }
    }

    RestartMainScene() {
        this.scene.stop();
        this.scene.run(game.settings.prevScene);
    }
}