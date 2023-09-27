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
        const terrain = Game.map.getRoomTerrain(room.name);
            if(terrain.get(center.x + 1, center.y + 1) != 'wall'){
                valid_spots++;
            }
            if(terrain.get(center.x + 1, center.y) != 'wall'){
                valid_spots++;
            }
            if(terrain.get(center.x + 1, center.y - 1) != 'wall'){
                valid_spots++;
            }
            if(terrain.get(center.x, center.y + 1) != 'wall'){
                valid_spots++;
            }
            if(terrain.get(center.x , center.y - 1) != 'wall'){
                valid_spots++;
            }
            if(terrain.get(center.x - 1, center.y + 1) != 'wall'){
                valid_spots++;
            }
            if(terrain.get(center.x - 1, center.y ) != 'wall'){
                valid_spots++;
            }
            if(terrain.get(center.x - 1, center.y - 1) != 'wall'){
                valid_spots++;
            }
        }
    return valid_spots;
};

var assigner = {
    assign : function(unemployed){
    unemployed.say("Job Time!");
    var harvesters = 0;
    var builders = 0;
    var upgraders = 0;
    var remoteHarvesters = 0;
    var miners = 0;
    for(var name in Game.creeps) {
		var creep = Game.creeps[name];
		if (creep.room === unemployed.room ){
		    if(creep.memory.role === "harvester"){
		        harvesters++;
		    }
		    else if(creep.memory.role === "upgrader"){
		        upgraders++;
		    }
		    else if(creep.memory.role ==="builder"){
		        builders++;
		    }
		    else if(creep.memory.role === "miner"){
		        miners++;
		    }
		    else if(creep.memory.role === "remoteHarvester"){
		        remoteHarvesters++;
		    }
		}
    }
    if(unemployed.room.controller == null || !unemployed.room.controller.my){
        unemployed.memory.role = "remoteHarvester";
    }
    else if(harvesters < (getNumGather(unemployed.room)*2) && unemployed.store.getFreeCapacity() > 0){
        unemployed.memory.role = "harvester";
    }
    else if(upgraders < 2 && (unemployed.room.controller.ticksToDowngrade < 4000 || unemployed.room.controller.level == 1)){
        unemployed.memory.role = "upgrader";
    }
    else if(miners < 1 && unemployed.room.controller.level >= 6){
        unemployed.memory.role = "miner";
    }
    else if(typeof(Game.flags.ClaimThis) !== "undefined" && Game.flags.ClaimThis.color == COLOR_BLUE){
        unemployed.memory.role = "homesteader";
    }
    else if(upgraders + builders > 3 && unemployed.store.getFreeCapacity() > 0){
        unemployed.memory.role = "remoteHarvester";
    }
    // Check if there are any construction sites in the room
    else if(unemployed.room.find(FIND_CONSTRUCTION_SITES).length > 0){
        unemployed.memory.role = "builder";
    }
    else{
    unemployed.memory.role = "upgrader";
    }
}
}


module.exports = assigner