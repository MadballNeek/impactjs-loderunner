ig.module(
    'game.entities.launchPad'
)

.requires(
    'impact.entity'
)

.defines(function() {
   EntityLaunchPad = ig.Entity.extend({
       name: "launchPad",

       collides: ig.Entity.COLLIDES.LITE,
       type: ig.Entity.TYPE.B,
       checkAgainst: ig.Entity.TYPE.BOTH,

       animSheet: new ig.AnimationSheet('media/launch-pad-sheet.png', 30, 30),
       size: {x: 30, y: 30},
       flip: false,

       recharging: false,
       rechargingTimer: new ig.Timer(0.0),

       init: function(x, y, settings) {
           this.parent(x, y, settings);
           this.addAnim('launching', 0.3, [0, 1, 2, 3]);
       },

       update: function() {
           this.currentAnim = this.anims.launching;
           this.parent();
       }
   });
});