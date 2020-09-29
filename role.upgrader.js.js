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
    sources = creep.room.find(FIND_MY_SPAWNS)
    if(creep.store.getUsedCapacity() == 0){
        var spawns = creep.room.find(FIND_MY_SPAWNS)
        for(var i = 0; i < spawns.length; i++){
            if(creep.withdraw(spawns[i], RESOURCE_ENERGY) == OK){
            return;
            }
        }
        creep.moveByPath(creep.pos.findPathTo(spawns[0].pos))
        return;
    }
    else{
        if(creep.upgradeController(creep.room.controller) != OK){
            creep.moveTo(creep.room.controller)
        }
    }
    
   
    
}