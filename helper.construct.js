var buildRoadsOnPath = function(path,room){
    for(var i = 0; i < path.length-1; i++){
        room.createConstructionSite(path[i].x,path[i].y,STRUCTURE_ROAD);
    }
}

var construct = { 
    doit: function(spawn) {
       var extensions = spawn.room.find(FIND_MY_STRUCTURES,{filter:(struct)=>{return struct.structureType === STRUCTURE_EXTENSION}});
       
           for(var i = 0; i < extensions.length; i++){
               var path = spawn.room.findPath(spawn.pos,extensions[i].pos,{ignoreCreeps : true});
               buildRoadsOnPath(path,spawn.room);
           }
        var sources = spawn.room.find(FIND_SOURCES);
           for(var i = 0; i < sources.length; i++){
               var path = spawn.room.findPath(spawn.pos,sources[i].pos,{ignoreCreeps : true});
               buildRoadsOnPath(path,spawn.room);
            }
        var minerals = spawn.room.find(FIND_MINERALS);
           for(var i = 0; i < minerals.length; i++){
               var path = spawn.room.findPath(spawn.pos,minerals[i].pos,{ignoreCreeps : true});
               buildRoadsOnPath(path,spawn.room);
            }
            buildRoadsOnPath(spawn.room.findPath(spawn.pos,spawn.room.controller.pos,{ignoreCreeps : true}),spawn.room);
            for(var i = 0; i < extensions.length; i++){
               var path = spawn.room.findPath(spawn.pos,extensions[i].pos,{ignoreCreeps : true});
               buildRoadsOnPath(path,spawn.room);
           }
           for(var m = 0; m < extensions.length; m++){
               var center = extensions[m].pos;
                        var source = false;
                          for(var k = 0; k < sources.length; k++){  
                              if(sources[k].pos.getRangeTo(center) < 3){
                                  source = true;
                              }
                          }
                          if(!source){
                              for(var i = -1; i < 2; i++){
                                for(var j = -1; j < 2; j++){
                                    if(i !== 0 && j !==0){
                                        var roomPos = new RoomPosition(center.x + i, center.y + j, spawn.room.name);
                                        //console.log(roomPos);
                                        if(roomPos.lookFor(LOOK_STRUCTURES).length === 0){
                                            extensions[m].room.createConstructionSite(center.x + i,center.y + j,STRUCTURE_EXTENSION);
                                        }
                                    }
                                }
                              }
                          }
           }
          var exitT = spawn.pos.findClosestByPath(FIND_EXIT_TOP);
          if(exitT !== null){
            var path = spawn.room.findPath(spawn.pos,exitT,{ignoreCreeps : true});
            buildRoadsOnPath(path,spawn.room);
          }
          var exitB = spawn.pos.findClosestByPath(FIND_EXIT_BOTTOM);
          if(exitB !== null){
            path = spawn.room.findPath(spawn.pos,exitB,{ignoreCreeps : true});
            buildRoadsOnPath(path,spawn.room);
          }
          var exitL = spawn.pos.findClosestByPath(FIND_EXIT_LEFT);
          if(exitL !== null){
            path = spawn.room.findPath(spawn.pos,exitL,{ignoreCreeps : true});
            buildRoadsOnPath(path,spawn.room);
          }
          var exitR = spawn.pos.findClosestByPath(FIND_EXIT_RIGHT);
          if(exitR !== null){
            path = spawn.room.findPath(spawn.pos,exitR,{ignoreCreeps : true});
            buildRoadsOnPath(path,spawn.room);
          }
    }
};

module.exports = construct;