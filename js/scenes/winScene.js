var maxTime, lifeDown;
var text;

class winScene extends Phaser.Scene {
    constructor() {
        super("win");
    }

    preload() {

        this.load.image('BG', 'assets/images/bg.png');
        this.load.image('restart', 'assets/images/RESTART.png');
    }

    create() {
        this.add.image(console.width/2, console.height/2, "BG");
        const winmssg = this.add.text(340, 30, 'You Won!', {
            font: '60px Arial',
            fill: '#FF8C00'
        });
        this.add.text(340, 30, 'Your score:', {
            font: '40px Arial',
            fill: '#FF8C00'
        });
        this.add.text(340, 30, score, {
            font: '40px Arial',
            fill: '#FF8C00'
        });

        const restartBtn = this.add.image(550, 300, 'restart').setScale(.5);
        restartBtn.setInteractive();
        restartBtn.on('pointerdown', () => {
            maxTime = 100;
            lifeDown = 10;
            this.scene.start("playGame");
        });
    }

    update() {

    }
}
