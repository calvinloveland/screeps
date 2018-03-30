var findEnergy = {
    
    /** @param {Creep} creep **/
    doIt : function(creep){
        var best = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES),{filter: (source) => {return source.energy > 0}});
        if(creep.pos.getRangeTo(best) === 1){
            //creep.say("MINING");
            creep.harvest(best);
        }
        else{
        best = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES, {filter: (source) => {return (source.energyCapacity  === source.energy || source.energy / source.ticksToRegeneration > 5)}}));
            if (best === null && creep.room.memory.swapped < Game.time - 2){
                creep.say("Buildin");
                    creep.memory.role = "builder";
                    creep.room.memory.swapped = Game.time;
            }
            else if(creep.harvest(best) === ERR_NOT_IN_RANGE) {
                if(creep.moveTo(best)== ERR_NO_PATH){
                    creep.say("No room!");
                }
            }
        }
    }
}

module.exports = findEnergy;