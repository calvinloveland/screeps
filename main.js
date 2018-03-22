// Instantiation code

var roleBuilder = require("role.builder");
var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");
var creepBuilder = require("helper.creepBuilder");
var assigner = require("helper.assign")

module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('RIPERONI:', name);
        }
    }
    var total = 0;
	for(var name in Game.creeps) {
	    total++;
		var creep = Game.creeps[name];
        if(creep.memory.role == "builder"){
		    roleBuilder.run(creep);
		}
		else if(creep.memory.role == "harvester"){
		    roleHarvester.run(creep);
		}
		else if(creep.memory.role === "upgrader"){
		    roleUpgrader.run(creep);
		}
	}
	
	for(var name in Game.creeps) {
	    if (creep.memory.role == "none"){
		       assigner.assign(creep);
		}
	}
	
	var totalSpawns = 0;
	for(var name in Game.spawns){totalSpawns++;}
	for(var name in Game.spawns){
	    var spawn = Game.spawns[name];

	    creepBuilder.doit(spawn,total,totalSpawns);
	}

}