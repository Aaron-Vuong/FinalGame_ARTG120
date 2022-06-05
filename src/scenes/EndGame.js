class EndGame extends Phaser.Scene {
    constructor() {
        super("endGameScene");
    }

    create() {
        this.add.text(game.config.width/2, game.config.height/2, "END");
        this.input.on("pointerdown", () => {
            this.scene.bringToTop("menuScene");
            this.scene.sendToBack("shipPlayScene");
            this.scene.stop();
            this.scene.start("menuScene");
        })
    }
}