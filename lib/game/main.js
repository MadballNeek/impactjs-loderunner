ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'game.levels.level1',
    'game.levels.level2',
    'game.levels.level3',
    'impact.debug.debug',
    'game.system.eventChain',
    'plugins.preloader'
)
.defines(function(){

MyGame = ig.Game.extend({
	player: null,
	font: new ig.Font('media/big-font-red.png'),

    gravity: 300,

    playerRespawnX: 29,
    playerRespawnY: 542,

    numberOfGold: 8,
    currentLevel: "level1",

    respawnPlayerEventChain: null,
    loadLevelNewEventChain: null,

    bgMusic: new ig.Sound('media/sound/music/mnemonic.*', false),
	
	init: function() {
        // According to ImpactJS doc, it's best to turn off sound for mobile.
        if (ig.ua.mobile) {
            ig.Sound.enabled = false;
        }

        this.bindKeys();
        this.loadLevel(LevelLevel1);
//        this.loadLevel(LevelLevel3);
        this.player = this.getEntityByName('player');
        this.respawnPlayerEventChain = EventChain(this)
            .wait(3)
            .then(function() {
                this.respawnPlayer();
            })
            .repeat();
        this.loadLevelNewEventChain = EventChain(this)
            .wait(3)
            .then(function() {
                switch (this.currentLevel) {
                    case "level1":
                        this.currentLevel = "level2";
                        this.loadLevelDeferred(LevelLevel2);
                        break;
                    case "level2":
                        this.currentLevel = "level3";
                        this.loadLevelDeferred(LevelLevel3);
                        break;
                    default:
                        this.currentLevel = "level1";
                        this.loadLevelDeferred(LevelLevel1);
                        break;
                }
            })
            .repeat();

        ig.music.add(this.bgMusic);
        //ig.music.play();
    },

    bindKeys: function() {
        ig.input.bind(ig.KEY.A, 'left');
        ig.input.bind(ig.KEY.D, 'right');
        ig.input.bind(ig.KEY.W, 'up');

        ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
        ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
        ig.input.bind(ig.KEY.SPACE, 'up');
    },

    respawnPlayer: function() {
        var settings = {isDead: false};
        this.player = this.spawnEntity(EntityPlayer, this.playerRespawnX, this.playerRespawnY, settings);
    },

    keepPlayerWithinScreen: function () {
        if (this.player) {
            // Top bounds
            if (this.player.pos.y < this.screen.y) {
                this.player.pos.y = this.screen.y;
            }
            // Left bounds
            if (this.player.pos.x < this.screen.x) {
                this.player.pos.x = this.screen.x;
            }
            // Right bounds
            if (this.player.pos.x > ig.system.width - this.collisionMap.tilesize) {
                this.player.pos.x = ig.system.width - this.collisionMap.tilesize;
            }
        }
    },

    update: function() {
		// Update all entities and backgroundMaps
		this.parent();
        this.keepPlayerWithinScreen();
        if (this.player.isDead) {
            this.respawnPlayerEventChain();
        }
        if (this.numberOfGold == 0) {
            this.loadLevelNewEventChain();
        }
    },
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();

		// Add your own drawing code here
		var x = ig.system.width / 2,
			y = ig.system.height / 2;

        if (this.numberOfGold == 0) {
            this.font.draw('YOU DIDN\'T DIE!', x, y, ig.Font.ALIGN.CENTER);
        }
	}
});


// Start the Game with 60fps, a resolution of 800x600, scaled
// up by a factor of 1.5
ig.main('#canvas', MyGame, 60, 800, 600, 1, MyLoader);

});
