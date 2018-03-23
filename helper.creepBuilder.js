var getNumGather = function(room) {
    var resources = room.find(FIND_SOURCES_ACTIVE);
    var valid_spots = 0;
    for(var index in resources){
        var center = resources[index].pos;
        for(var i = -1; i < 2; i++){
            for(var j = -1; j < 2; j++){
            if(Game.map.getTerrainAt(center.x + i, center.y + j, room.name) != 'wall' && !RoomPosition(center.x + i, center.y + j, room.name).lookFor(LOOK_CREEPS).length){
                valid_spots++;
            }
            }
            
        }
    }
    return valid_spots;
};


var creepBuilder = { 
    doit: function(spawn,totalCreeps,totalSpawns) {
        var hostiles = spawn.room.find(FIND_HOSTILE_CREEPS);
        if(hostiles.length > 0 && spawn.room.energyAvailable > 130) {
            spawn.createCreep([ATTACK,MOVE],undefined,{role:"berserker"});
        }
        else if(typeof(Game.flags.ClaimThis) !== "undefined" && Game.flags.ClaimThis.color == COLOR_BLUE && totalCreeps/totalSpawns > 10){
            if(spawn.room.energyAvailable >= 200){
                spawn.createCreep([WORK,CARRY,MOVE],undefined,{role:"homesteader"})
            }
        }
        else if(typeof(Game.flags.ClaimThis) !== "undefined" && Game.flags.ClaimThis.color == COLOR_GREEN && totalCreeps/totalSpawns > 8){
            if(spawn.room.energyAvailable >= 700){
                spawn.createCreep([CLAIM,MOVE,MOVE],undefined,{role:"claimer"})
            }
        }
        else if(totalCreeps == 0 || !spawn.room.find(FIND_MY_CREEPS).length){
            spawn.createCreep([WORK,CARRY,MOVE],"JESUS THE FIRST BORN SON", {role:"harvester"})
        }
        else if(totalCreeps/totalSpawns < 50){
            
            if(spawn.room.energyAvailable > spawn.room.energyCapacityAvailable * .8){
                
                if(spawn.room.energyAvailable >= 550){
                    spawn.createCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE],undefined,{role:"none"});
                }
                else if(spawn.room.energyAvailable >= 450){
                    spawn.createCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE],undefined,{role:"none"});
                }
                else if(spawn.room.energyAvailable >= 200){
                    spawn.createCreep([WORK,CARRY,MOVE],undefined,{role:"none"});
                }
            }
        }
    }
};

module.exports = creepBuilder;