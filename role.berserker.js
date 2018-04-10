var roleBerserker = {

    /** @param {Creep} creep **/
    run: function (creep) {
        
            var hostiles = creep.room.find(FIND_HOSTILE_CREEPS,{filter:(hc)=>{
                return hc.owner.username !== "Source Keeper"}});
            if(hostiles.length > 0) {
                var best = creep.pos.findClosestByPath(hostiles);
                if(creep.attack(best) === ERR_NOT_IN_RANGE){
                    creep.moveTo(best);
                }
            }
            else if(typeof(Game.flags.Attack) !== "undefined" && creep.room !== Game.flag.Attack.room){
                creep.moveTo(Game.flags.Attack.pos);
            }
            else if (typeof(Game.flags.Attack) !== "undefined"  && Game.flags.Attack.setColor !== COLOR_GREEN){
                hostiles.push(... creep.room.find(FIND_STRUCTURES,{filter : (struct)=>{return !struct.my}}));
                if(typeof(Game.flags.Attack) !== "undefined" && creep.room === Game.flags.Attack.room  && hostiles.length < 1){
                    Game.flags.Attack.setColor(COLOR_GREEN);
                }
            }
            else{
                creep.memory.role = "scout";
            }
        }
    }

module.exports = roleBerserker;