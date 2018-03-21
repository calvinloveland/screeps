var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy == 0){
            creep.memory.working = false;
            creep.memory.upgradingController = false;
        }
	    if(creep.carry.energy < creep.carryCapacity && creep.memory.working == false) {
            var sources = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy > creep.carryCapacity;
                    }
            });
            if(sources.length < 1){
                creep.memory.role = "harvester";
            }
            else if(creep.withdraw(sources[0],RESOURCE_ENERGY,creep.carryCapacity-creep.carry.energy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            creep.memory.working = true;
            if(creep.room.controller.ticksToDowngrade < 3000 || creep.memory.upgradingController || creep.room.controller.level == 0){
                if(!creep.room.controller.my){
                        creep.moveTo(Game.spawns["Spawn1"]);
                }
                else if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.room.controller);
                    creep.memory.upgradingController = true;
                    
                }
            }
            else{
                 var broken = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.hits < structure.hitsMax * .5 && (structure.structureType != STRUCTURE_RAMPART && structure.structureType != STRUCTURE_WALL)) || structure.hits < 1000;
                    }
                });
                if(broken.length > 0){
                    if(creep.repair(broken[0]) == ERR_NOT_IN_RANGE){
                        creep.moveTo(broken[0]);
                    }
                }
                else{
                    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if(targets.length) {
                        if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0]);
                        }
                    }
                    else if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
                        creep.moveTo(creep.room.controller);
                    }
                }
            }
        }
    }
};

module.exports = roleBuilder;