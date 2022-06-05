class Shop extends Phaser.Scene {
    constructor() {
        super("shopScene");
    }

    init(data) {
        this.planet = data.planet;
    }

    preload() {
        this.load.image("Food", "./assets/FruitFood.png");
        this.load.image("Fuel", "./assets/Fuel.png");
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

        this.settingsRectangle = this.add.rectangle(game.config.width/2, game.config.height/2, 500, 400, 0xd5e1e3).setInteractive();
        this.resourceTextRectangle = this.add.rectangle(120, 75, 200, 40, 0xd5e1e3);
        //text config
        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '26px',
            color: '#ed9a09',
            align: 'center',
            stroke: '#5b5105',
            strokeThickness: 4,
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        
        this.moneyText = this.add.text(120, 75, "MONEY: " + 100, textConfig, 0).setOrigin(0.5);

        //shop title
        this.add.text(game.config.width/2 - 30, game.config.height/2-180, "SHOP", textConfig, 0);

        //item prices
        this.add.text(game.config.width/2 - 210, game.config.height/2 + 100, "Price: 60", textConfig, 0);
        this.add.text(game.config.width/2 + 70, game.config.height/2 + 100, "Price: 100", textConfig, 0);

        //items to buy in shop
        this.item = this.add.image(game.config.width/2 - 130, game.config.height/2, "Food").setInteractive();
        this.item2 = this.add.image(game.config.width/2 + 130, game.config.height/2-15, "Fuel").setInteractive();
        this.item.scale = 8;
        this.item2.scale = 6;

        this.item.input.alwaysEnabled = true;
        this.item.alpha = 0.7;
        this.item.on("pointerover", () => { this.item.alpha = 1; })
        this.item.on("pointerout", () => { this.item.alpha = 0.7; });
        this.item.on("pointerdown", () => {
            if (game.settings.playerMONEY >= 60) {
                game.settings.playerMONEY -= 60;
                this.planet.goalMeter += 20;
            }

        });

        this.item2.input.alwaysEnabled = true;
        this.item2.alpha = 0.7;
        this.item2.on("pointerover", () => { this.item2.alpha = 1; })
        this.item2.on("pointerout", () => { this.item2.alpha = 0.7; });
        this.item2.on("pointerdown", () => { 
            if (game.settings.playerMONEY >= 60) {
                game.settings.playerMONEY -= 100;
                this.planet.goalMeter += 40;
            }
            
        });
    }
    update() {
        this.UpdateResourceText();
    }

    UpdateResourceText() {
        this.moneyText.text = "MONEY: " + game.settings.playerMONEY;
    }
    

    RestartMainScene() {
        this.scene.stop();
        this.scene.run(game.settings.prevScene);
    }
}