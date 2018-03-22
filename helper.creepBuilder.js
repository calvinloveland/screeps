

var creepBuilder = { 
    doit: function(spawn,totalCreeps,totalSpawns) {
        if(totalCreeps == 0){
            spawn.createCreep([WORK,CARRY,MOVE],"JESUS THE LORD AND SAVIOR", {role:"harvester"})
        }
        else if(totalCreeps/totalSpawns < 20){
            
            if(spawn.room.energyAvailable > spawn.room.energyCapacityAvailable * .8){
                
                if(spawn.room.energyAvailable >= 550){
                    spawn.createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],undefined,{role:"none"});
                }
                else if(spawn.room.energyAvailable >= 450){
                    spawn.createCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE],undefined,{role:"none"});
                }
                else if(spawn.room.energyAvailable >= 200){
                    spawn.createCreep([WORK,CARRY,MOVE],undefined,{role:"none"});
                }
            }
        }
    }
};

module.exports = creepBuilder;