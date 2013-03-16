ig.module(
    'game.entities.player'
)

.requires(
    'impact.entity'
)

.defines(function() {
    EntityPlayer = ig.Entity.extend({
        collides: ig.Entity.COLLIDES.PASSIVE,
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,

        animSheet: new ig.AnimationSheet('media/player-sheet-30x30.png', 30, 30),
        size: {x: 20, y: 28},
        offset: {x: 5, y: 2},
        flip: false,

        maxVel: {x: 100, y: 150},
        friction: {x: 600, y: 0},
        accelGround: 400,
        accelAir: 200,
        jump: 150,

        canFly: false,
        isFlying: false,
        flySpeed: 100,
        flyTimer: new ig.Timer(0.0),
        timeAllowedToFly: 2,

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [2]);
            this.addAnim('run', 0.1, [3,5,6,7]);
            this.addAnim('jump', 1, [5]);
            this.addAnim('fall', 1, [5]);
            this.addAnim('climb', 0.1, [1,0,4]);
            // Give the player a z-index of 1 so that he draws infront of all other entities.
            this.zIndex = 1;
        },

        selectAnimation: function () {
            if ((this.vel.y < 0 || this.vel.y > 0) && this.isFlying) {
                this.currentAnim = this.anims.jump;
            } else if (this.vel.x != 0) {
                this.currentAnim = this.anims.run;
            } else if (this.isFlying) {
                // TODO: Jetpack particles or something?
                //this.currentAnim = this.anims.climb;
            } else {
                this.currentAnim = this.anims.idle;
            }
            this.currentAnim.flip.x = this.flip;
        },

        movePlayer: function () {
            var accel = this.standing ? this.accelGround : this.accelAir;

            if (ig.input.state('left')) {
                this.accel.x = -accel;
                this.flip = true;
            } else if (ig.input.state('right')) {
                this.accel.x = accel;
                this.flip = false;
            } else if (ig.input.state('up')) {
                this.climbingLogic();
            } else {
                this.accel.x = 0;
            }

            if (this.standing) {
                this.isFlying = false;
                this.canFly = false;
                if (ig.input.pressed('up')) {
                    this.vel.y = -this.jump;
                }
            }
        },

        climbingLogic: function () {
            if (this.canFly) {
                this.flyTimer.set(this.timeAllowedToFly);
                this.canFly = false;
            }

            if (this.flyTimer.delta() < 0) {
                this.isFlying = true;
                this.vel.y = -this.flySpeed;
            } else if (this.flyTimer.delta() >= 0) {
                this.isFlying = false;
                this.flyTimer.pause();
            }
        },

        update: function() {
            this.movePlayer();
            this.selectAnimation();
            this.parent();
        },

        check: function(other) {
            if (other.name == 'launchPad') {
                this.canFly = true;
            }
        },

        handleMovementTrace: function(res) {
            // Continue resolving the collision as normal
            this.parent(res);
        }
    });
});

