class Settings extends Phaser.Scene {
    constructor() {
        super("settingsScene");
    }
    create() {
        this.booton = this.add.rectangle(0,0, game.config.width * 2, game.config.height * 2, 0x6006ff);
    //    this.booton = this.add.image(game.config.width - 100, game.config.height - 100, "buttonSettings").setOrigin(0);
        this.booton.setAlpha(0.3);
        this.booton.setInteractive();
        this.booton.setScrollFactor(0,0);
        this.booton.on("pointerdown", () => {
            this.scene.stop();
            this.scene.run(game.settings.prevScene);

            //Load() {
                //let settingsConfig = {
                   // fontFamily: 'Consolas',
                    //fontSize: '36px',
                    //color: '#85c7b1',
                    //align: 'center',
                    //stroke: '#000000',
                    //strokeThickness: 6,
                    //padding: {
                        //top: 5,
                       // bottom: 5,
                    //},
                    //fixedWidth: 0
               // }
                //menu text
                
            
        });

        this.settingsRectangle = this.add.rectangle(game.config.width/2, game.config.height/2, 500, 400, 0x6666ff).setInteractive();

        this.settings1 = this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding+100, "Use WASD to move or UPDOWNLEFTRIGHT").setOrigin(0.5);
        this.settings2 = this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding+130, "F to Interact").setOrigin(0.5);
        this.settings1.scale= 1.3;
        this.settings2.scale= 1.3;
        
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    }

    update() {
    }

    RestartMainScene() {
        this.scene.stop();
        this.scene.run(game.settings.prevScene);
    }
}