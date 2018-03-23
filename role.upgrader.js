var roleUpgrader = {
    
    /** @param {Creep} creep **/
    run : function (creep) {
        if (creep.carry.energy === 0) {
            creep.memory.working = false;
        }
         if(typeof(creep.room.controller.sign) === "undefined" || creep.room.controller.sign.text !== "Nivlac13 > Makmoud98"){
             if(creep.signController(creep.room.controller,"Nivlac13 > Makmoud98") === ERR_NOT_IN_RANGE){
                 creep.moveTo(creep.room.controller);
             }
         }
        else if (creep.carry.energy < creep.carryCapacity && creep.memory.working === false) {
            var sources = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                    return(structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
                structure.energy > creep.carryCapacity;
        }
        });
            if (sources.length < 1) {
                creep.memory.role = "harvester";
            }
            else if (creep.withdraw(sources[0], RESOURCE_ENERGY, creep.carryCapacity - creep.carry.energy) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            creep.memory.working = true;
                if (!creep.room.controller.my) {
                    creep.moveTo(Game.spawns["Spawn1"]);
                }
                else if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                    creep.memory.upgradingController = true;

                }
        }
    }
}

module.exports = roleUpgrader;