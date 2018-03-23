// Instantiation code

var roleBuilder = require("role.builder");
var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");
var roleClaimer = require("role.claimer");
var roleHomesteader = require("role.homesteader");
var roleBerserker = require("role.berserker");

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
        if(creep.memory.role === "builder"){
		    roleBuilder.run(creep);
		}
		else if(creep.memory.role === "harvester"){
		    roleHarvester.run(creep);
		}
		else if(creep.memory.role === "upgrader"){
		    roleUpgrader.run(creep);
		}
		else if(creep.memory.role === "claimer"){
		    roleClaimer.run(creep);
		    total--;
		}
		else if(creep.memory.role === "homesteader"){
		    roleHomesteader.run(creep);
		    total = total - 3;
		}
		else if(creep.memory.role === "berserker"){
		    roleBerserker.run(creep);
		}
	}
	
	for(var name in Game.creeps) {
	    var creep = Game.creeps[name];
	    if (creep.memory.role === "none"){
		       assigner.assign(creep);
		}
	}
	
	console.log(total);
	
	var totalSpawns = 0;
	for(var name in Game.spawns){totalSpawns++;}
	for(var name in Game.spawns){
	    var spawn = Game.spawns[name];
	    creepBuilder.doit(spawn,total,totalSpawns);
	    if(Game.flags.ClaimThis.color === COLOR_BLUE && spawn.room === Game.flags.ClaimThis.room){
	        Game.flags.ClaimThis.setColor(COLOR_WHITE);
	    }
	}

}