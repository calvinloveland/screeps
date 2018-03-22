

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.carry.energy === 0) {
            creep.memory.working = false;
        }
        if (creep.carry.energy < creep.carryCapacity && creep.memory.working === false) {
            var sources = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return(structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
                            structure.energy > creep.carryCapacity;
                    }
                })
            ;
            if (sources.length < 1) {
                creep.memory.role = "none";
            }
            else if (creep.withdraw(sources[0], RESOURCE_ENERGY, creep.carryCapacity - creep.carry.energy) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            creep.memory.working = true;
                var broken = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return(((structure.hits < structure.hitsMax * .5 && structure.structureType != STRUCTURE_RAMPART && structure.structureType != STRUCTURE_WALL) || structure.hits < 1000) && (structure.structureType !== STRUCTURE_CONTROLLER));
                        }
                    });
                if (broken.length > 0) {
                    if (creep.repair(broken[0]) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(broken[0]);
                    }
                }
                else {

                    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if (targets.length) {
                        if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0]);
                        }
                    }
                    else {
                        creep.memory.role = "none"
                    }
                }
            }
        }
    }

module.exports = roleBuilder;