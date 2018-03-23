/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('helper.assign');
 * mod.thing == 'a thing'; // true
 */
var getNumGather = function(room) {
    var resources = room.find(FIND_SOURCES_ACTIVE);
    var valid_spots = 0;
    for(var i in resources){
        var center = resources[i].pos;
        
            if(Game.map.getTerrainAt(center.x + 1, center.y + 1, room.name) != 'wall'){
                valid_spots++;
            }
            if(Game.map.getTerrainAt(center.x + 1, center.y, room.name) != 'wall'){
                valid_spots++;
            }
            if(Game.map.getTerrainAt(center.x + 1, center.y - 1, room.name) != 'wall'){
                valid_spots++;
            }
            if(Game.map.getTerrainAt(center.x, center.y + 1, room.name) != 'wall'){
                valid_spots++;
            }
            if(Game.map.getTerrainAt(center.x , center.y - 1, room.name) != 'wall'){
                valid_spots++;
            }
            if(Game.map.getTerrainAt(center.x - 1, center.y + 1, room.name) != 'wall'){
                valid_spots++;
            }
            if(Game.map.getTerrainAt(center.x - 1, center.y , room.name) != 'wall'){
                valid_spots++;
            }
            if(Game.map.getTerrainAt(center.x - 1, center.y - 1, room.name) != 'wall'){
                valid_spots++;
            }
        }
    return valid_spots;
};

var assigner = {
    assign : function(unemployed){
    unemployed.say("Job Time!");
    harvesters = 0
    for(var name in Game.creeps) {
		var creep = Game.creeps[name];
		if (creep.room === unemployed.room && creep.memory.role === "harvester"){
		    harvesters++;
		}
    }
    if(harvesters < (getNumGather(unemployed.room)*2)){
        unemployed.memory.role = "harvester";
        return;
    }
    if(unemployed.room.controller.ticksToDowngrade < 4000){
        unemployed.memory.role = "upgrader";
        return;
    }
    unemployed.memory.role = "builder";
    return;
}
}

module.exports = assigner