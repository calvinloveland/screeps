var roleSpawn = require("role.spawn.js")
var roleHarvester = require("role.harvester.js")
var roleUpgrader = require("role.upgrader.js")

module.exports.loop = function () {
    for (var name in Game.creeps){
        var c = Game.creeps[name]
        if (c.memory.role == "harvester"){
            roleHarvester.run(c)
        }
        if (c.memory.role == "upgrader"){
            roleUpgrader.run(c)
        }
    }
    
    
     for(var name in Game.spawns){
         var spawn = Game.spawns[name]
         roleSpawn.run(spawn)
 }
}