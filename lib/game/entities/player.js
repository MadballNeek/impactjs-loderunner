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

        // For 64x64 sheet
//        animSheet: new ig.AnimationSheet('media/player-sheet-64x64.png', 64, 64),
//        size: {x: 40, y: 64},
//        offset: {x: 10, y: 1},

//        maxVel: {x: 200, y: 150},
        // For 30x30 sheet
        animSheet: new ig.AnimationSheet('media/player-sheet-30x30.png', 30, 30),
        size: {x: 20, y: 28},
        offset: {x: 5, y: 2},
        flip: false,

        maxVel: {x: 100, y: 150},
        friction: {x: 600, y: 0},
        accelGround: 400,
        accelAir: 200,
        jump: 200,

        canClimb: false,
        isClimbing: false,
        climbSpeed: 100,

        previousPosition: {x: 0, y: 0},

        init: function(x, y, settings) {
            // For 64x64 sheet
//            this.addAnim('idle', 1, [4]);
//            this.addAnim('run', 0.1, [6,3,5,7]);
//            this.addAnim('jump', 1, [3]);
//            this.addAnim('fall', 0.4, [3]);
//            this.addAnim('climb', 0.5, [2,0,1]);
            // For 32x32 sheet
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
            if ((this.vel.y < 0 || this.vel.y > 0) && !this.isClimbing) {
                this.currentAnim = this.anims.jump;
            } else if (this.vel.x != 0) {
                this.currentAnim = this.anims.run;
            } else if (this.isClimbing) {
                this.currentAnim = this.anims.climb;
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
            } else if (ig.input.state('up') && this.canClimb) {
                this.isClimbing = true;
                this.vel.y = -this.climbSpeed;
                this.vel.x = 0;
            } else if (ig.input.state('down') && this.canClimb) {
                this.isClimbing = true;
                //this.vel.y = this.climbSpeed;
                this.vel.x = 0;
            } else {
                this.accel.x = 0;
            }
            // Player reached the top of the ladder, stop him from climbing.
            if (this.isClimbing && this.vel.y <= 0) {
                this.canClimb = false;
            }

            if (this.standing) {
                this.isClimbing = false;
                this.canClimb = false;
            }

            this.previousPosition.x = this.pos.x;
            this.previousPosition.y = this.pos.y;
        },

        update: function() {
            this.movePlayer();
            this.selectAnimation();
            this.parent();
        },

        check: function(other) {
            if (other.name == 'ladder') {
                this.canClimb = true;
            }
        },

        handleMovementTrace: function(res) {
            // Continue resolving the collision as normal
            this.parent(res);
        }

    });
});

