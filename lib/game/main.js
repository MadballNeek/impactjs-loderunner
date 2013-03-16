ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'game.levels.level1',
    'impact.debug.debug'
)
.defines(function(){

MyGame = ig.Game.extend({
	player: null,
	font: new ig.Font('media/big-font.png'),

    gravity: 300,

    numberOfGold: 8,
    levelOneCompleted: false,
	
	init: function() {
        // Bind keys
        ig.input.bind(ig.KEY.A, 'left');
        ig.input.bind(ig.KEY.D, 'right');
        ig.input.bind(ig.KEY.W, 'up');
        ig.input.bind(ig.KEY.SPACE, 'shoot');

        this.loadLevel(LevelLevel1);
        this.player = this.getEntityByName('player');
    },

    update: function() {
		// Update all entities and backgroundMaps
		this.parent();
        this.keepPlayerWithinScreen();
    },
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();

		// Add your own drawing code here
		var x = ig.system.width / 2,
			y = ig.system.height / 2;

        if (this.numberOfGold == 0) {
            this.font.draw('You Win!', x, y, ig.Font.ALIGN.CENTER);
            this.levelOneCompleted = true;
        }
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
    }
});


// Start the Game with 60fps, a resolution of 800x600, scaled
// up by a factor of 1.5
ig.main('#canvas', MyGame, 60, 800, 600, 1.5);

});
