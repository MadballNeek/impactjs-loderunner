ig.module(
    'game.entities.player'
)

.requires(
    'impact.entity'
)

.defines(function() {
    EntityPlayer = ig.Entity.extend({
        animSheet: new ig.AnimationSheet('media/player-sheet.png', 64, 64),
        size: {x: 40, y: 64},
        offset: {x: 10, y: 1},
        flip: false,

        maxVel: {x: 200, y: 150},
        friction: {x: 600, y: 0},
        accelGround: 400,
        accelAir: 200,
        jump: 200,

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [4]);
            this.addAnim('run', 0.1, [4,5,6,7]);
            this.addAnim('jump', 1, [3]);
            this.addAnim('fall', 0.4, [3]);
            this.addAnim('climb', 0.5, [2,0,1]);
        },

        update: function() {
            var accel = this.standing ? this.accelGround : this.accelAir;
            if (ig.input.state('left')) {
                this.accel.x = -accel;
                this.flip = true;
            } else if (ig.input.state('right')) {
                this.accel.x = accel;
                this.flip = false;
            } else {
                this.accel.x = 0;
            }

            if (this.standing && ig.input.pressed('jump')) {
                this.vel.y = -this.jump;
            }

            if (this.vel.y < 0 || this.vel.y > 0) {
                this.currentAnim = this.anims.jump;
            } else if (this.vel.x != 0) {
                this.currentAnim = this.anims.run;
            } else {
                this.currentAnim = this.anims.idle;
            }
            this.currentAnim.flip.x = this.flip;

            this.parent();
        }
    });
});

