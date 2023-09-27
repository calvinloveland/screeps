/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('helper.openSpace');
 * mod.thing == 'a thing'; // true
 */

/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('helper.assign');
 * mod.thing == 'a thing'; // true
 */

//This is not ready for prime time
var openSpace = {
    is : function(room,pos){
        var center = pos;
        const terrain = Game.map.getRoomTerrain(room.name);
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx == 0 && dy == 0) {
                    continue;
                }
                if (terrain.get(center.x + dx, center.y + dy) != 'wall') {
                    valid_spots++;
                }
            }
        }
}

module.exports = assigner