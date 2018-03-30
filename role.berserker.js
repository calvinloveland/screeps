var roleBerserker = {

    /** @param {Creep} creep **/
    run: function (creep) {
        
            var hostiles = creep.room.find(FIND_HOSTILE_CREEPS,{filter:(hc)=>{
                return hc.owner.username !== "Source Keeper"}});
            if(typeof( creep.room.controller) !== "undefined" && !creep.room.controller.my){
                hostiles.push(... creep.room.find(FIND_STRUCTURES));
                if(creep.room === Game.flags.Attack.room  && hostiles.length < 1){
                    Game.flags.Attack.setColor(COLOR_GREEN);
                }
            }
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