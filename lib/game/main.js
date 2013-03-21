ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'game.levels.level1',
    'game.levels.level2',
    'impact.debug.debug',
    'game.system.eventChain',
    'plugins.preloader'
)
.defines(function(){

MyGame = ig.Game.extend({
	player: null,
	font: new ig.Font('media/big-font.png'),

    gravity: 300,

    numberOfGold: 8,
    levelOneCompleted: false,
    levelTwoCompleted: false,

    respawnPlayerEventChain: null,
    loadLevelTwoEventChain: null,
	
	init: function() {
        this.bindKeys();
//        this.loadLevel(LevelLevel1);
        this.loadLevel(LevelLevel2);
        this.player = this.getEntityByName('player');
        this.respawnPlayerEventChain = EventChain(this)
            .wait(3)
            .then(function() {
                this.respawnPlayer();
            })
            .repeat();
        this.loadLevelTwoEventChain = EventChain(this)
            .wait(3)
            .then(function() {
                this.numberOfGold = 8;
                this.levelOneCompleted = true;
                this.loadLevelDeferred(LevelLevel2);
            });
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
        // TODO: Remove magic numbers, make x & y properties based on level.
        this.player = this.spawnEntity(EntityPlayer, 29, 542, settings);
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
            if (!this.levelOneCompleted) {
                this.loadLevelTwoEventChain();
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
            this.font.draw('Holla! Get that money money!', x, y, ig.Font.ALIGN.CENTER);
        }
	}
});


// Start the Game with 60fps, a resolution of 800x600, scaled
// up by a factor of 1.5
ig.main('#canvas', MyGame, 60, 800, 600, 1, MyLoader);

});
