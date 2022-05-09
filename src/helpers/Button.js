// Code from:
// https://www.webtips.dev/webtips/phaser/interactive-buttons-in-phaser3

class Button {
    constructor(x, y, label, config, scene, callback) {
        const button = scene.add.text(x, y, label, config)
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#111' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => callback())
            .on('pointerover', () => button.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => button.setStyle({ fill: '#FFF' }));
    }
}