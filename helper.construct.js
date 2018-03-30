var buildRoadsOnPath = function(path,room){
    for(var i = 0; i < path.length-1; i++){
        room.createConstructionSite(path[i].x,path[i].y,STRUCTURE_ROAD);
    }
}

var construct = { 
    doit: function(spawn) {
       var extensions = spawn.room.find(FIND_MY_STRUCTURES,{filter:(struct)=>{return struct.structureType === STRUCTURE_EXTENSION}});
       var sources = spawn.room.find(FIND_SOURCES);
           for(var i = 0; i < extensions.length; i++){
               var path = spawn.room.findPath(spawn.pos,extensions[i].pos,{ignoreCreeps : true});
               buildRoadsOnPath(path,spawn.room);
           }
           for(var i = 0; i < sources.length; i++){
               var path = spawn.room.findPath(spawn.pos,sources[i].pos,{ignoreCreeps : true});
               buildRoadsOnPath(path,spawn.room);
}
       
    }
};

module.exports = construct;