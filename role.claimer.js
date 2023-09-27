

var roleClaimer = {

    /** @param {Creep} creep **/
    run: function (creep) {

        var goalFlag = Game.flags.ClaimThis;

        if (goalFlag.color == COLOR_BLUE) {
            creep.suicide();
        }
        else {
            if (typeof (goalFlag.room) == "undefined") {
                creep.moveTo(goalFlag.pos,{maxOps:1000000000 })
            }
            else {
                var goal = goalFlag.room.controller;
                if (goal.my) {
                    if (creep.room.createConstructionSite(goalFlag.pos, STRUCTURE_SPAWN) == OK) {
                        goalFlag.setColor(COLOR_BLUE);
                    }
                }
                if (goalFlag.color === COLOR_GREEN && creep.claimController(goal) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(goal);
                }
            }
        }
    }
}

module.exports = roleClaimer;