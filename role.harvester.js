

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(!creep.memory.favoriteSource){
            creep.memory.favoriteSource = 0;
        }
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[creep.memory.favoriteSource]) == ERR_NOT_IN_RANGE) {
                if(creep.moveTo(sources[creep.memory.favoriteSource])== ERR_NO_PATH){
                    creep.say("NO ROOM");
                    creep.memory.favoriteSource++;
                    if(creep.memory.favoriteSource == sources.length){
                        creep.memory.favoriteSource = 0;
                        creep.memory.role = "builder";
                    }
                }
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else{
                creep.memory.role = "builder";
            }
        }
	}
};

module.exports = roleHarvester;