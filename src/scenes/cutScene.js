class CutScreen extends Phaser.Scene {
    constructor() {
        super("cutScreenScene");
    }

    preload() {
        this.load.image('stars', './assets/stars.png');
        this.load.spritesheet('idleShip', './assets/idleShip.png', {frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 6});
    }

    create() {
        //add scrolling background
        this.space = this.add.tileSprite(0, 0, 1000, 500, 'stars').setOrigin(0,0);

        //create idle ship animation
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('idleShip', {start: 0, end: 6, first: 0}),
            frameRate: 10,
            repeat: true
        });
        this.idling = this.add.sprite(100,100);
        this.idling.play('idle');

        //text config
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '36px',
            color: '#e6c0fc',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 650
        }

        this.label = this.add.text(game.config.width/2, game.config.height/2 + 20, " ", menuConfig).setOrigin(0.5).setWordWrapWidth(650);
        
        this.typewriterText('A long time ago you lived on a planet called Planet-284. You loved it there, but you never quite fit in. Since you are all grown up now, it is time to explore the universe to find a new home! You must go around interacting with the locals of each planet and see how well you fit in.');



        this.button = new Button(80, 30, 'Start Playing', config, this, 
                                () => this.scene.start("planetPlayScene"));
    }

    update() {
        this.space.tilePositionX += 3;
    }

    /**
     * 
     * @param {string} text 
     */

    typewriterText(text) {
        const length = text.length;
        let i = 0;
        this.time.addEvent({
            callback: () => {
                this.label.text += text[i];
                ++i;
            },
            repeat: length - 1,
            delay: 180
        })

    }

    typewriteTextWrapped(text) {
        const lines = this.label.getWrappedText(text);
        const wrappedText = lines.join('\n');

        this.typewriterText(wrappedText);
    }
}