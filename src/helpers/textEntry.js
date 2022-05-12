this.input.keyboard.on('keydown', function(event) {
    if(event.keyCode === 8 && textEntry.text.length > 0) {
        textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
    } 
    else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90)) {
        textEntry.text += event.key;
    }
});

var textEntry = this.add.text(game.config.width/2, game.config.height/2, " " + this.textEntry, menuConfig).setOrigin(0.5);