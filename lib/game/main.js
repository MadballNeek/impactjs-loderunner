ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'game.levels.level1',
    'game.levels.level2',
    'game.levels.level3',
    'game.levels.level4',
    'game.levels.level5',
    'impact.debug.debug',
    'game.system.eventChain',
    'plugins.preloader'
)
.defines(function(){

MyGame = ig.Game.extend({
	player: null,
	font: new ig.Font('media/big-font.png'),

    gravity: 300,

    playerRespawnX: 29,
    playerRespawnY: 542,

    numberOfGold: 8,
    numberOfDeaths: 0,
    gameOver: false,

    respawnPlayerEventChain: null,
    loadLevelNewEventChain: null,
    levels: null,
    levelIndex: 0,

	init: function() {
        // According to ImpactJS doc, it's best to turn off sound for mobile.
        if (ig.ua.mobile) {
            ig.Sound.enabled = false;
        }

        this.levels = [LevelLevel1, LevelLevel2, LevelLevel3, LevelLevel4, LevelLevel5];

        this.bindKeys();
        this.loadLevel(this.levels[this.levelIndex]);
        this.player = this.getEntityByName('player');
        this.respawnPlayerEventChain = EventChain(this)
            .wait(3)
            .then(function() {
                this.numberOfDeaths++;
                this.respawnPlayer();
            })
            .repeat();
        this.loadLevelNewEventChain = EventChain(this)
            .wait(3)
            .then(function() {
                this.levelIndex++;
                if (this.levelIndex < this.levels.length) {
                    this.loadLevelDeferred(this.levels[this.levelIndex]);
                }
            })
            .repeat();
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
            if (this.levelIndex == this.levels.length - 1) {
                this.gameOver = true;
            }
            if (!this.gameOver) {
                this.loadLevelNewEventChain();
            }
        }
    },
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();

		// Add your own drawing code here
		var x = ig.system.width / 2,
			y = ig.system.height / 2;

        if (this.numberOfGold == 0) {
            if (this.gameOver) {
                this.font.draw('YOU WON! Thanks for playing.', x, y - 60, ig.Font.ALIGN.CENTER);
                this.font.draw('Now go tell someone else to play.', x, y - 30, ig.Font.ALIGN.CENTER);
                this.font.draw('Or go complain how bad it was.', x, y, ig.Font.ALIGN.CENTER);
                this.font.draw('Don\'t forget to include a link.', x, y + 30, ig.Font.ALIGN.CENTER);
                this.font.draw('Okay thanks bye.', x, y + 60, ig.Font.ALIGN.CENTER);
            } else if (this.numberOfDeaths > 1) {
                this.font.draw('YOU ONLY DIED ' + this.numberOfDeaths + ' TIMES!', x, y, ig.Font.ALIGN.CENTER);
                this.font.draw('On to the next level.', x, y + 30, ig.Font.ALIGN.CENTER);
            } else if (this.numberOfDeaths == 1) {
                this.font.draw('YOU ONLY DIED ONCE! Not too shabby.', x, y, ig.Font.ALIGN.CENTER);
                this.font.draw('On to the next level.', x, y + 30, ig.Font.ALIGN.CENTER);
            } else {
                this.font.draw('YOU DIDN\'T DIE! Impressive.', x, y, ig.Font.ALIGN.CENTER);
                this.font.draw('On to the next level.', x, y + 30, ig.Font.ALIGN.CENTER);
            }
        }
	}
});


// Start the Game with 60fps, a resolution of 800x600, scaled
// up by a factor of 1.5
ig.main('#canvas', MyGame, 60, 800, 600, 1, MyLoader);

});
