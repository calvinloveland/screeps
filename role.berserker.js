var roleBerserker = {

    /** @param {Creep} creep **/
    run: function (creep) {
        
            var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
            if(hostiles.length > 0) {
                var best = creep.pos.findClosestByPath(hostiles);
                if(creep.attack(best) === ERR_NOT_IN_RANGE){
                    creep.moveTo(best);
                }
            }
            else if(typeof(Game.flags.Attack) !== "undefined"){
                creep.moveTo(Game.flags.Attack.pos);
            }
        }
    }

module.exports = roleBerserker;