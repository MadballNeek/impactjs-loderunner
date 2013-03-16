ig.module(
    'game.entities.ladder'
)

.requires(
    'impact.entity'
)

.defines(function() {
   EntityLadder = ig.Entity.extend({
       name: "ladder",

       collides: ig.Entity.COLLIDES.LITE,
       type: ig.Entity.TYPE.B,
       checkAgainst: ig.Entity.TYPE.BOTH,

       animSheet: new ig.AnimationSheet('media/platform-sheet.png', 30, 30),
       size: {x: 30, y: 30},
       flip: false,

       init: function(x, y, settings) {
           this.parent(x, y, settings);
           this.addAnim('ladder', 1, [16]);
       },

       update: function() {
       },

       check: function(other) {
       }
   });
});