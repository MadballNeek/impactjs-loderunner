ig.module(
    'game.entities.enemy'
)

.requires(
    'impact.entity'
)

.defines(function() {
    EntityEnemy = ig.Entity.extend({
        // This will be overriden in Weltmeister.
        name: 'enemy',
        health: 10,

        collides: ig.Entity.COLLIDES.PASSIVE,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,

        animSheet: new ig.AnimationSheet('media/enemy-run-sheet.png', 30, 30),
        size: {x: 20, y: 25},
        offset: {x: 4, y: 4},
        flip: false,

        maxVel: {x: 75, y: 150},
        friction: {x: 1, y: 0},
        accelGround: 400,
        // The enemy should never be in the air, but just in case!
        accelAir: 200,

        walkLeft: false,
        walkRight: true,
        destinationPatrolPoint: null,
        leftWaypointDirection: 1,
        rightWaypointDirection: -1,

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('run', 0.2, [2, 1, 0]);
            this.destinationPatrolPoint = -1;
        },

        checkPatrolPointDistance: function () {
            for (var t in this.target) {
                var entity = ig.game.getEntityByName(this.target[t]);
                if (entity && entity instanceof EntityPatrolPoint) {
                    if (this.distanceTo(entity) < 5) {
                        if (entity.name == this.target[1]) {
                            this.destinationPatrolPoint = this.rightWaypointDirection;
                        } else {
                            this.destinationPatrolPoint = this.leftWaypointDirection;
                        }
                    }
                }
            }
        },

        update: function() {
            this.currentAnim = this.anims.run;

            this.checkPatrolPointDistance();

            var accel = this.standing ? this.accelGround : this.accelAir;
            if (this.destinationPatrolPoint == this.leftWaypointDirection) {
                this.accel.x = -accel;
                this.flip = false;
            } else if (this.destinationPatrolPoint == this.rightWaypointDirection) {
                this.accel.x = accel;
                this.flip = true;
            }
            this.currentAnim.flip.x = this.flip;

            this.parent();
        }
    });
});
