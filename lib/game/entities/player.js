ig.module(
    'game.entities.player'
)

.requires(
    'impact.entity',
    'game.system.eventChain'
)

.defines(function () {
    EntityPlayer = ig.Entity.extend({
        name: 'player',
        collides: ig.Entity.COLLIDES.PASSIVE,
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,

        animSheet: new ig.AnimationSheet('media/new-player-sheet.png', 30, 30),
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

        isDead: false,
        deathEventChain: null,

        deathFx: new ig.Sound('media/sound/fx/death1.*', false),
        launchFx: new ig.Sound('media/sound/fx/launch-pad1.*', false),

        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [5]);
            this.addAnim('run', 0.1, [6, 5, 12, 13, 7]);
            this.addAnim('jump', 1, [12]);
            this.addAnim('fall', 1, [12]);
            this.addAnim('dead', 0.2, [0, 1, 8, 9, 2, 10, 14, 15], false);
            // Give the player a z-index of 1 so that he draws infront of all other entities.
            this.zIndex = 1;
            this.isDead = false;

            this.deathEventChain = EventChain(this)
                .then(function() {
                    this.deathFx.play();
                    this.currentAnim = this.anims.dead.rewind();
                })
                .wait(1)
                .then(this.kill)
                .repeat();
        },

        selectAnimation: function () {
            if ((this.vel.y < 0 || this.vel.y > 0) && this.isFlying) {
                this.currentAnim = this.anims.jump;
            } else if (this.vel.x != 0) {
                this.currentAnim = this.anims.run;
            } else if (!this.isDead) {
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
            } else {
                this.accel.x = 0;
            }
            // The player will automatically start flying when it overlaps with a launch pad.
            this.flyingLogic();

            if (this.standing) {
                this.isFlying = false;
                this.canFly = false;
                if (ig.input.pressed('up')) {
                    this.vel.y = -this.jump;
                }
            }
        },

        stopMovingPlayer: function () {
            this.accel.x = 0;
            this.accel.y = 0;
        },

        flyingLogic: function () {
            if (this.canFly) {
                this.flyTimer.set(this.timeAllowedToFly);
                this.canFly = false;
                this.launchFx.play();
            }

            if (this.flyTimer.delta() < 0) {
                this.isFlying = true;
                this.vel.y = -this.flySpeed;
            } else if (this.flyTimer.delta() >= 0) {
                this.isFlying = false;
                this.flyTimer.pause();
            }
        },

        update: function () {
            if (!this.isDead) {
                this.movePlayer();
                this.selectAnimation();
            } else if (this.isDead) {
                this.stopMovingPlayer();
                this.deathEventChain();
            }
            this.parent();
        },

        check: function (other) {
            if (other.name == 'launchPad' && !this.isFlying) {
                this.canFly = true;
            }
            if (other.name == 'enemy') {
                this.isDead = true;
            }
        },

        handleMovementTrace: function (res) {
            // Continue resolving the collision as normal
            this.parent(res);
        },

        ready: function() {
            // This is necessary for when new levels load.
            ig.game.player = this;
        }
    });
});