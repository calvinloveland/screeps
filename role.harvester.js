

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(typeof(creep.memory.favoriteSource) === "undefined"){
            creep.memory.favoriteSource = 0;
        }
	    if((creep.carry.energy < creep.carryCapacity && creep.memory.harvesting === true) || creep.carry.energy === 0) {
	        creep.memory.harvesting = true;
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[creep.memory.favoriteSource]) == ERR_NOT_IN_RANGE) {
                if(creep.moveTo(sources[creep.memory.favoriteSource])== ERR_NO_PATH){
                    creep.say("NO ROOM");
                    creep.memory.favoriteSource++;
                    if(creep.memory.favoriteSource == sources.length){
                        creep.memory.favoriteSource = 0;
                        creep.memory.role = "none";
                    }
                }
            }
        }
        else {
            creep.memory.harvesting = false;
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType === STRUCTURE_TOWER) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            targets.push(...creep.room.find(FIND_MY_CREEPS,{
                    filter: (foundCreep) => {
                        return foundCreep.memory.role != "harvester" && _.sum(foundCreep.carry) < foundCreep.carryCapacity;
                    }
            }));
            if(targets.length > 0) {
                var best = creep.pos.findClosestByPath(targets);
                if(creep.transfer(best, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(best);
                }
            }
            else{
                creep.memory.role = "none";
            }
        }
	}
};

module.exports = roleHarvester;