ig.module( 'game.levels.level5' )
.requires( 'impact.image','game.entities.patrolPoint','game.entities.launchPad','game.entities.enemy','game.entities.gold','game.entities.player' )
.defines(function(){
LevelLevel5=/*JSON[*/{"entities":[{"type":"EntityPatrolPoint","x":244,"y":72,"settings":{"name":"patrolPoint1"}},{"type":"EntityPatrolPoint","x":644,"y":72,"settings":{"name":"patrolPoint4"}},{"type":"EntityLaunchPad","x":208,"y":180},{"type":"EntityLaunchPad","x":224,"y":450},{"type":"EntityLaunchPad","x":516,"y":450},{"type":"EntityPatrolPoint","x":520,"y":192,"settings":{"name":"patrolPoint8"}},{"type":"EntityPatrolPoint","x":328,"y":192,"settings":{"name":"patrolPoint7"}},{"type":"EntityPatrolPoint","x":588,"y":192,"settings":{"name":"patrolPoint5"}},{"type":"EntityLaunchPad","x":448,"y":180},{"type":"EntityPatrolPoint","x":728,"y":192,"settings":{"name":"patrolPoint6"}},{"type":"EntityLaunchPad","x":62,"y":540},{"type":"EntityLaunchPad","x":296,"y":60},{"type":"EntityEnemy","x":388,"y":64,"settings":{"target":{"1":"patrolPoint1","2":"patrolPoint2"}}},{"type":"EntityEnemy","x":660,"y":180,"settings":{"target":{"1":"patrolPoint5","2":"patrolPoint6"}}},{"type":"EntityEnemy","x":196,"y":184,"settings":{"target":{"1":"patrolPoint9","2":"patrolPoint10"}}},{"type":"EntityEnemy","x":584,"y":64,"settings":{"target":{"1":"patrolPoint3","2":"patrolPoint4"}}},{"type":"EntityEnemy","x":112,"y":276,"settings":{"target":{"1":"patrolPoint11","2":"patrolPoint12"}}},{"type":"EntityEnemy","x":380,"y":272,"settings":{"target":{"1":"patrolPoint13","2":"patrolPoint14"}}},{"type":"EntityEnemy","x":408,"y":184,"settings":{"target":{"1":"patrolPoint7","2":"patrolPoint8"}}},{"type":"EntityEnemy","x":384,"y":544,"settings":{"target":{"1":"patrolPoint21","2":"patrolPoint22"}}},{"type":"EntityEnemy","x":520,"y":456,"settings":{"target":{"1":"patrolPoint19","2":"patrolPoint20"}}},{"type":"EntityEnemy","x":232,"y":452,"settings":{"target":{"1":"patrolPoint17","2":"patrolPoint18"}}},{"type":"EntityPatrolPoint","x":432,"y":72,"settings":{"name":"patrolPoint2"}},{"type":"EntityPatrolPoint","x":480,"y":72,"settings":{"name":"patrolPoint3"}},{"type":"EntityEnemy","x":668,"y":272,"settings":{"target":{"1":"patrolPoint15","2":"patrolPoint16"}}},{"type":"EntityPatrolPoint","x":120,"y":192,"settings":{"name":"patrolPoint9"}},{"type":"EntityPatrolPoint","x":280,"y":192,"settings":{"patrolPoint":10,"name":"patrolPoint10"}},{"type":"EntityPatrolPoint","x":60,"y":284,"settings":{"name":"patrolPoint11"}},{"type":"EntityPatrolPoint","x":164,"y":284,"settings":{"name":"patrolPoint12"}},{"type":"EntityPatrolPoint","x":300,"y":284,"settings":{"name":"patrolPoint13"}},{"type":"EntityPatrolPoint","x":464,"y":284,"settings":{"name":"patrolPoint14"}},{"type":"EntityPatrolPoint","x":576,"y":284,"settings":{"name":"patrolPoint15"}},{"type":"EntityPatrolPoint","x":728,"y":284,"settings":{"name":"patrolPoint16"}},{"type":"EntityPatrolPoint","x":168,"y":464,"settings":{"name":"patrolPoint17"}},{"type":"EntityPatrolPoint","x":296,"y":464,"settings":{"name":"patrolPoint18"}},{"type":"EntityPatrolPoint","x":468,"y":464,"settings":{"name":"patrolPoint19"}},{"type":"EntityPatrolPoint","x":568,"y":460,"settings":{"name":"patrolPoint20"}},{"type":"EntityPatrolPoint","x":68,"y":552,"settings":{"name":"patrolPoint21"}},{"type":"EntityPatrolPoint","x":724,"y":552,"settings":{"name":"patrolPoint22"}},{"type":"EntityGold","x":553,"y":61},{"type":"EntityGold","x":337,"y":61},{"type":"EntityGold","x":297,"y":181},{"type":"EntityGold","x":549,"y":181},{"type":"EntityGold","x":377,"y":271},{"type":"EntityGold","x":669,"y":272},{"type":"EntityGold","x":549,"y":541},{"type":"EntityGold","x":213,"y":541},{"type":"EntityPlayer","x":85,"y":62}],"layer":[{"name":"collision","width":30,"height":20,"linkWithCollision":false,"visible":1,"tilesetName":"","repeat":false,"preRender":false,"distance":1,"tilesize":30,"foreground":false,"data":[[1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0]]},{"name":"main","width":30,"height":20,"linkWithCollision":true,"visible":1,"tilesetName":"media/platform-sheet.png","repeat":false,"preRender":false,"distance":"1","tilesize":30,"foreground":false,"data":[[1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,0,0,16,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,0,0,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,16,16,16,16,0,0,0,0,16,16,16,16,16,16,0,0,0,16,16,16,16,16,16,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,0,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,0,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,1,1,0,0,0]]}]}/*]JSON*/;
LevelLevel5Resources=[new ig.Image('media/platform-sheet.png')];
});