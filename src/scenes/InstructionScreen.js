class InstructionScreen extends Phaser.Scene {
    constructor() {
        super("instructionScreenScene");
    }

    preload() {
        this.load.image('stars', './assets/stars.png');
        this.load.spritesheet('idleShip', './assets/idleShip.png', {frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 5});
    }

    create() {
        this.space = this.add.tileSprite(0, 0, 1000, 500, 'stars').setOrigin(0,0);

        this.add.rectangle(500, 169, 270, 55, 0x4d4dff).setOrigin(0.5);
        this.add.rectangle(500, 300, 780, 140, 0x4d4dff).setOrigin(0.5);

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '36px',
            color: '#e6c0fc',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //create idle ship animation
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('idleShip', {start: 0, end: 5, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.idling = this.add.sprite(100,100);
        this.idling.play('idle');

        //menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 40, "Instructions", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, "Use Mouse to Choose a Planet", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 40, "Use Arrow Keys to Move Around Towns", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 90, "Press F to interact with locals", menuConfig).setOrigin(0.5); 
              

        const button = new Button(500, 400, 'Continue', config, this, () => this.scene.start("statsScreenScene"));

    }

    update() {
        this.space.tilePositionX += 3;

        this.idling.x = game.input.mousePointer.x;
        this.idling.y = game.input.mousePointer.y;
    }
}