// Instantiation code

var roleWorker = require("role.worker");
var roleBuilder = require("role.builder");
var roleHarvester = require("role.harvester");
var creepBuilder = require("helper.creepBuilder");

module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('RIPERONI:', name);
        }
    }
    var workers = 0;
    var builders = 0;
    var harvesters = 0;
    var total = 0;
	for(var name in Game.creeps) {
	    total++;
		var creep = Game.creeps[name];
		if(creep.memory.role == "worker"){
		    roleWorker.run(creep);
		    workers++;
		}
		if(creep.memory.role == "builder"){
		    roleBuilder.run(creep);
		    builders++;
		}
		if(creep.memory.role == "harvester"){
		    roleHarvester.run(creep);
		    harvesters++;
		}
	}
	var totalSpawns = 0;
	for(var name in Game.spawns){totalSpawns++;}
	for(var name in Game.spawns){
	    var spawn = Game.spawns[name];

	    creepBuilder.doit(spawn,total,totalSpawns);
	}

}