/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester.js');
 * mod.thing == 'a thing'; // true
 */
 var mySource = null;

module.exports.run = function(creep) {
    sources = creep.room.find(FIND_SOURCES_ACTIVE)
    if(creep.store.getFreeCapacity() == 0){
        var spawns = creep.room.find(FIND_MY_SPAWNS)
        for(var i = 0; i < spawns.length; i++){
            if(creep.transfer(spawns[i], RESOURCE_ENERGY) == OK){
            return;
            }
        }
        creep.moveByPath(creep.pos.findPathTo(spawns[0].pos))
        return;
    }
    var sources = creep.room.find(FIND_SOURCES)
    for (var i =0; i < sources.length; i++){
        var result = creep.harvest(sources[i])
        if (result == OK){
            return;
        }
        else{
            if (creep.memory["mySource"] == null){
                creep.memory["mySource"] = creep.pos.findClosestByPath(FIND_SOURCES)
            }
            if(creep.memory["mySource"] != null){
                if (creep.moveTo(creep.memory["mySource"].pos.x,creep.memory["mySource"].pos.y ) == ERR_NO_PATH){
                    creep.memory["mySource"] = null;
                }
            }
        }
    }
    
   
    
}