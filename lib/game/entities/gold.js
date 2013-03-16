ig.module(
    'game.entities.gold'
)

.requires(
    'impact.entity'
)

.defines(function() {
    EntityGold = ig.Entity.extend({
        name: 'gold',
        health: 10,

        collides: ig.Entity.COLLIDES.LITE,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.BOTH,

        animSheet: new ig.AnimationSheet('media/gold-sheet.png', 30, 30),
        size: {x: 30, y: 30},
        offset: {x: 1, y: 1},
        flip: false,

        animationTimer: new ig.Timer(0.0),
        // Random value between 1 and 10.
        animationResetTime: 5.0,

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('reflect', 0.1, [0, 1, 2, 0], true);
            this.addAnim('idle', 1, [0]);
            this.animationTimer.set(this.animationResetTime);
        },

        update: function() {
            if (this.animationTimer.delta() < 0) {
                this.currentAnim.rewind();
            } else if (this.animationTimer.delta() >= this.animationResetTime) {
                this.currentAnim = this.anims.idle;
                this.animationTimer.set(this.animationResetTime);
            }
            this.parent();
        },

        check: function(other) {
            if (other.name == 'player') {
                var player = ig.game.getEntitiesByType(EntityPlayer)[0];
                if (player) {
                    ig.game.numberOfGold--;
                    console.log(ig.game.numberOfGold);
                    this.receiveDamage(10, player);
                }
            }
        }
    });
});