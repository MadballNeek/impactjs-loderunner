ig.module(
    'game.entities.patrolPoint'
)

.requires(
    'impact.entity'
)

.defines(function() {
    EntityPatrolPoint = ig.Entity.extend({
        // Weltmeister properties
        _wmScalable: true,
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(196, 255, 0, 0.7)',

        name: 'patrolPoint',

        collides: ig.Entity.COLLIDES.NEVER,
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,

        size: {x: 1, y: 16},

        init: function(x, y, settings) {
            this.parent(x, y, settings);
        },

        update: function() {
            this.parent();
        }
    });
});