/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.homesteader');
 * mod.thing == 'a thing'; // true
 */

var roleHomesteader = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var goalFlag = Game.flags.ClaimThis;
        if(typeof(goalFlag) === "undefined"){
            creep.memory.role = "harvester"
        }
        else{
            // Activate safe mode if available
            if(typeof(creep.room.controller) !== "undefined" && creep.room.controller.safeModeAvailable > 0){
                creep.room.controller.activateSafeMode();
            }
            // Remove all construction sites except spawn if there is no spawn
            // And switch to builder role
            if(creep.room.find(FIND_MY_SPAWNS).length === 0){
                var sites = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(sites.length > 0){

                for(var i in sites){
                    if(sites[i].structureType != STRUCTURE_SPAWN){
                        sites[i].remove();
                    }
                    else{

                creep.memory.role = "builder";
                    }
                }
            }
            }
            // Move a bit closer to the flag before we get a new job
            if(creep.pos.getRangeTo(goalFlag.pos) > 5){
                creep.say("Off I Go!")
                creep.moveTo(goalFlag.pos, {reusePath: 50, maxOps: 100000});
            }
            else{
                // Check to see if we have a spawn
                // If we do, then we are done here
                if (creep.room.find(FIND_MY_SPAWNS).length > 0) {
                    goalFlag.remove();
                }
                creep.room.createConstructionSite(goalFlag.pos, STRUCTURE_SPAWN);
                creep.memory.role = "builder";
            }
        }
    }
}
    

module.exports = roleHomesteader;