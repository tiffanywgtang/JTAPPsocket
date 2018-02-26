const port=process.env.PORT || 10002;
const server = require("http").Server();

var io =require("socket.io")(server);

var allUsers = [];
var allstickers =[];
io.on("connection", function(socket){
    console.log("connet");
    allUsers.push(socket.id);
    console.log(allUsers);
   
    
    socket.emit("yourid", socket.id);
    
    io.emit("userJoined", allUsers);
    
    socket.on("mymove", function(data){
        socket.broadcast.emit("newmove", data)
    })
    
    socket.on("stick", function(data){
        allstickers.push(data);
        io.emit("newSticker", allstickers);
    })
    
    socket.on("joinRoom", function(data){
        socket.join(data);
        socket.myRoom = data;
        socket.emit("yourid", socket.id);
         
            if(!allUsers[data]){
                allUsers[data]=[];
                allstickers[data]=[];
            }

            if(!allstickers[data]){
                allstickers[data]=[];
            }
        allUsers[data].push(socket.id);
        io.to(data).emit("userJoined", allUsers[data]);
        io.to(data).emit("newSticker", allstickers[data]);
    })
    
    socket.on("disconnect", function(){
      var index = allUsers.indexOf(socket.id);
        allUsers.splice(index, 1);
        io.emit("userJoined", allUsers);
    })
});

server.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("Port Running");
})
