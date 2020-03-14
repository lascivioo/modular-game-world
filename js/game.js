var config = {
    type: Phaser.AUTO,
      width: 800,
      height: 600,
      scene: [Level1, winScene, loseScene],
      physics: {
          default: 'arcade',
          arcade: {
              gravity: {y: 0},
              debug: false
          }
      },
  };
  
let game = new Phaser.Game(config);

function damage(player, enemy) {
    this.cameras.main.shake(500);
    lifeDown -= 1;
    console.log("Life: " + lifeDown);
};

function win() {
    this.scene.start("winScene");
};

function collect(){
    coinLayer.removeTileAt(coin.x, coin.y); // remove the tile/coin
    score++; // add 10 points to the score
    scoreText.setText(score);
}