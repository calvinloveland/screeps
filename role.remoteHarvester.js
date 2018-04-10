var findSource = require("helper.findSource");
var findRoom = require("functions.rooms");

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(typeof(creep.memory.home) === "undefined"){
            creep.memory.home = creep.room;
        }
        
	    if((creep.carry.energy < creep.carryCapacity && creep.memory.harvesting === true) || creep.carry.energy === 0) {
	        creep.memory.harvesting = true;
	        if(typeof(creep.room.controller) === "undefined" || !creep.room.controller.my){
	            
	            findSource.doIt(creep);
	        }
            else{
               if(typeof(creep.memory.goal) === "undefined"  || creep.memory.otherRoom === "none"){
                   var num = Math.random();
                   if(num < .25){
                       creep.memory.otherRoom = "left"
                   }
                   else if(num < .5){
                       creep.memory.otherRoom = "right"
                   }
                   else if(num < .75){
                       creep.memory.otherRoom = "up"
                   }
                   else {
                       creep.memory.otherRoom = "down"
                   }
               }
               otherRoom = findRoom(creep.room,creep.memory.otherRoom); 
               if(creep.moveTo(otherRoom) === ERR_NO_PATH){
                   creep.say("NoPath" + creep.memory.otherRoom);
                   creep.memory.otherRoom = "none";
               }
            }
        }
        else {
            creep.memory.harvesting = false;
            if(typeof(creep.room.controller) === "undefined" || !creep.room.controller.my){
                
               creep.moveTo(new RoomPosition(25,25,creep.memory.home.name));
	        }
            else{
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType === STRUCTURE_TOWER|| structure.structureType === STRUCTURE_LINK) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            targets.push(...creep.room.find(FIND_MY_CREEPS,{
                    filter: (foundCreep) => {
                        return (foundCreep.memory.role != "harvester" && foundCreep.memory.role != "remoteHarvester") && _.sum(foundCreep.carry) < foundCreep.carryCapacity;
                    }
            }));
            if(targets.length > 0) {
                var best = creep.pos.findClosestByPath(targets);
                if(creep.transfer(best, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

                    creep.moveTo(best);
                }
                else{
                    //console.log(best);
                    //creep.say(creep.transfer(best, RESOURCE_ENERGY));
                }
            }
            else{
                creep.memory.role = "none";
            }
            }
        }
	}
};

module.exports = roleHarvester;