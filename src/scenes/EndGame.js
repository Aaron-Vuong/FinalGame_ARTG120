class EndGame extends Phaser.Scene {
    constructor() {
        super("endGameScene");
    }

    create() {
        this.input.on("pointerdown", () => {
            this.scene.bringToTop("menuScene");
            this.scene.sendToBack("shipPlayScene");
            this.scene.stop();
            this.scene.start("menuScene");
        });

        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '36px',
            color: '#f6e272',
            align: 'center',
            stroke: '#5b5105',
            strokeThickness: 4,
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 650
        }

        this.stars = this.add.tileSprite(0, 0, 1000, 500, "stars").setOrigin(0,0);
        this.planets = this.add.tileSprite(0,0, 1000, 500, 'planets').setOrigin(0,0);

        this.endLabel = this.add.text(game.config.width/2, game.config.height/2, "Game Over", textConfig).setOrigin(0.5);
    }

    update() {
        this.stars.tilePositionX += 3;
        this.planets.tilePositionX += 2;
    }
}