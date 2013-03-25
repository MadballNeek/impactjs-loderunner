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

    numberOfGoldLeft: 8,
    maxGoldPerLevel: 8,
    numberOfDeaths: 0,
    gameOver: false,

    respawnPlayerEventChain: null,
    loadLevelNewEventChain: null,
    levelEndEventChain: null,
    levels: null,
    levelIndex: 0,
    playTime: 0.0,

	init: function() {
        this.logAnalyticsEvent('Start');

        // According to ImpactJS doc, it's best to turn off sound for mobile.
        if (ig.ua.mobile) {
            ig.Sound.enabled = false;
        }
        document.title = "Impact Runner - Level 1";
        this.bindKeys();

        this.levels = [LevelLevel1, LevelLevel2, LevelLevel3, LevelLevel4, LevelLevel5];
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
                    document.title = "Impact Runner - Level " + (this.levelIndex + 1);
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

    showEndOfLevelMessage: function() {
        var x = ig.system.width / 2,
            y = ig.system.height / 2;

        if (this.gameOver) {
            this.font.draw('YOU WON! Thanks for playing.', x, y - 60, ig.Font.ALIGN.CENTER);
            this.font.draw('Now go tell someone else to play.', x, y - 30, ig.Font.ALIGN.CENTER);
            this.font.draw('Or go complain how bad it was.', x, y, ig.Font.ALIGN.CENTER);
            this.font.draw('Don\'t forget to include a link.', x, y + 30, ig.Font.ALIGN.CENTER);
            this.font.draw('Okay thanks bye.', x, y + 60, ig.Font.ALIGN.CENTER);
        } else if (this.numberOfDeaths > 1) {
            this.font.draw('YOU DIED ' + this.numberOfDeaths + ' TIMES!', x, y, ig.Font.ALIGN.CENTER);
            this.font.draw('On to the next level.', x, y + 30, ig.Font.ALIGN.CENTER);
        } else if (this.numberOfDeaths == 1) {
            this.font.draw('YOU ONLY DIED ONCE! Not too shabby.', x, y, ig.Font.ALIGN.CENTER);
            this.font.draw('On to the next level.', x, y + 30, ig.Font.ALIGN.CENTER);
        } else {
            this.font.draw('YOU DIDN\'T DIE! Impressive.', x, y, ig.Font.ALIGN.CENTER);
            this.font.draw('On to the next level.', x, y + 30, ig.Font.ALIGN.CENTER);
        }
    },

    logAnalyticsEvent: function(message) {
        ig.global._gaq.push(['_trackEvent', 'Game', message]);
    },

    // The player entity's ready function will need to call this,
    // to ensure the values are set properly and at the appropiate time.
    resetLevelValues: function(player) {
        this.numberOfGoldLeft = this.maxGoldPerLevel;
        this.numberOfDeaths = 0;
        this.player = player;
        this.playerRespawnX = player.pos.x;
        this.playerRespawnY = player.pos.y;
        this.logAnalyticsEvent('Level ' + (this.levelIndex + 1) + ' started at playTime ' + this.playTime);
    },

    update: function() {
		this.parent();

        this.playTime += ig.system.tick;

        this.keepPlayerWithinScreen();
        if (this.player.isDead) {
            this.respawnPlayerEventChain();
        }
        if (this.numberOfGoldLeft == 0) {
            if (this.levelIndex == this.levels.length - 1) {
                this.gameOver = true;
            }
            if (!this.gameOver) {
                this.loadLevelNewEventChain();
            }
        }
    },
	
	draw: function() {
		this.parent();

        if (this.numberOfGoldLeft == 0) {
            this.showEndOfLevelMessage();
        }
	}
});


// Start the Game with 60fps, a resolution of 800x600, scaled
// up by a factor of 1.5
ig.main('#canvas', MyGame, 60, 800, 600, 1, MyLoader);

});
