
var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if((_.sum(creep.carry) < creep.carryCapacity && creep.memory.harvesting === true) || _.sum(creep.carry) === 0) {
	        
	        creep.room.memory.mining = false;
	        creep.memory.harvesting = true;
	        var extractor = creep.room.find(FIND_MINERALS);
	        if(creep.harvest(extractor[0]) === ERR_NOT_IN_RANGE){
	            creep.moveTo(extractor[0]);
	        }
        }
        else {
            creep.room.memory.mining = true;
            creep.memory.harvesting = false;
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_TERMINAL;
                            
                    }
            });
            for(const resourceType in creep.carry){
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
                }
            }
        }

};

module.exports = roleMiner;