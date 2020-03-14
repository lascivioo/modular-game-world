var player;
var cursors;
var belowLayer, worldLayer, aboveLayer, winLayer, enemyLayer;
var lifeDown = 10;
var health, healthLbl;
var t_timer;
var map;
var tileset;
var speed;
var t_score;
var score = 0;
var maxTime = 60;
var initialTime;


class Level1 extends Phaser.Scene{
    constructor(){
      super("playGame");  
    }
    preload() {
        this.load.tilemapTiledJSON("map", "assets/maps/main-map.json"); // loads map
        this.load.image("player", "assets/images/player.png");
        this.load.image("floor", "assets/images/floor.png");
    }

    create() {
        cursors = this.input.keyboard.createCursorKeys();

        var ground = this.add.image(config.width/2, config.height/2, "floor");
        ground.setScale(1.6);
        
        map = this.make.tilemap({ key: "map" });
        tileset = map.addTilesetImage("tiles", "tiles");

        // layers
        lavaLayer = map.createStaticLayer("Lava", tileset, 0, 0);
        borderLayer = map.createStaticLayer("Border", tileset, 0, 0);
        coinLayer = map.createDynamicLayer("Coins", tileset, 0, 0);


        // objects have collision property
        lavaLayer.setCollisionByProperty({ collides: true });
        borderLayer.setCollisionByProperty({ collides: true });
        coinLayer.setCollisionByProperty({ collides: true });
       
        this.cameras.main.setBounds(0, 359, map.widthInPixels, map.heightInPixels);
        const startCoords = map.findObject("Objects", obj => obj.name === "spawn");

        player = this.add.image(startCoords.x, startCoords.y, "player");
        this.physics.add.collider(player, borderLayer);

        this.cameras.main.startFollow(player);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        
        initialTime = maxTime;
        t_timer = this.add.text(370, 30, '', {
            font: '40px Arial',
            fill: '#FF8C00'

        });

        healthLbl = this.add.text(20, 20, 'Life:', {
            font: '40px Arial',
            fill: '#FFFFFF'
        });

        
        health = this.add.text(20, 60, '100%', {
            font: '50px Arial',
            fill: '#FFD700'
        });

        t_score = this.add.text(750, 20, score);

        health.setScrollFactor(0);
        healthLbl.setScrollFactor(0);
        t_timer.setScrollFactor(0);

        this.physics.add.collider(player, coinLayer, collect, null, this);
        // colliding with lava causes damage
        this.physics.add.collider(player, lavaLayer, damage, null, this);
    }

    update() {

        maxTime -= 0.018;
        t_timer.setText(Math.round(maxTime));
    
        speed = 175;

        // Stop any previous movement from the last frame
        player.body.setVelocity(0);

        // Horizontal movement
        if (cursors.left.isDown) {
            player.body.setVelocityX(-speed);
        } else if (cursors.right.isDown) {
            player.body.setVelocityX(speed);
        }

        // Vertical movement
        if (cursors.up.isDown) {
            player.body.setVelocityY(-speed);
        } else if (cursors.down.isDown) {
            player.body.setVelocityY(speed);
        }

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        player.body.velocity.normalize().scale(speed);

        // Update the animation last and give left/right animations precedence over up/down animations
        if ((maxTime <= 0) || (lifeDown == 0)) {
            this.scene.start("loss");
        }

        if ((maxTime <=0) && (lifeDown >= 1)){
            this.scene.start("win");
        }
        if (lifeDown == 9) {
            health.setText("90");
        } else if (lifeDown == 8) {
            health.setText("80");
        } else if (lifeDown == 7) {
            health.setText("70");
        } else if (lifeDown == 6) {
            health.setText("60");
        } else if (lifeDown == 5) {
            health.setText("50");
        } else if (lifeDown == 4) {
            health.setText("40");
        } else if (lifeDown == 3) {
            health.setText("30");
        } else if (lifeDown == 2) {
            health.setText("20");
        } else if (lifeDown == 1) {
            health.setText("10");
        } else {
            health.setText("100");
        }

    }
}

