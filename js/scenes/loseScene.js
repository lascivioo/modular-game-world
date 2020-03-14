var maxTime, lifeDown;

class loseScene extends Phaser.Scene {
    constructor() {
        super("loss");

    }

    preload() {

        this.load.image('BG', 'assets/images/bg.png');
        this.load.image('restart', 'assets/images/RESTART.png');
    }

    create() {
        this.add.image(console.width/2, console.height/2, "BG");
        this.add.text370(340, 30, 'You Lost!', {
            font: '40px Arial',
            fill: '#FF8C00'
        });
        const restartBtn = this.add.image(400, 250, 'restart').setScale(.5);
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