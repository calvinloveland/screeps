
module.exports.run = function (spawn){
        if (Game.time % 10 == 0){
            spawn.spawnCreep([WORK,CARRY,MOVE], 'Makmoud is slothful' + Game.time, {memory: {role:"upgrader"}})
        }
        else if (Game.time % 10 == 1){
            spawn.spawnCreep([WORK,CARRY,MOVE], 'Makmoud is prideful' + Game.time, {memory: {role:"builder"}})
        }
        else{
            spawn.spawnCreep([WORK,CARRY,MOVE], 'Makmoud is greedy' + Game.time, {memory: {role:"harvester"}})
        }
    };