class Shop extends Phaser.Scene {
    constructor() {
        super("shopScene");
    }

    preload() {
        this.load.image("Goggles", "./assets/goggle.png");
        this.load.image("bunnyEars", "./assets/bunnyEars.png");
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

        //text config
        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '26px',
            color: '#f6e272',
            align: 'center',
            stroke: '#5b5105',
            strokeThickness: 4,
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //shop title
        this.add.text(game.config.width/2 - 30, game.config.height/2-180, "SHOP", textConfig, 0);

        //item prices
        this.add.text(game.config.width/2 - 210, game.config.height/2 + 100, "Price: 100", textConfig, 0);
        this.add.text(game.config.width/2 + 70, game.config.height/2 + 100, "Price: 60", textConfig, 0);

        //items to buy in shop
        this.item = this.add.image(game.config.width/2 - 130, game.config.height/2, "Goggles");
        this.item2 = this.add.image(game.config.width/2 + 130, game.config.height/2, "bunnyEars");

        //set interactive
        this.item.setInteractive();
        this.item2.setInteractive();
    }
    update() {
    }

    RestartMainScene() {
        this.scene.stop();
        this.scene.run(game.settings.prevScene);
    }
}