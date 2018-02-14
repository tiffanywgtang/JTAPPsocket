const server = require('http').Server();
const port = process.env.PORT || 10001;

var io = require('socket.io')(server);

var names = [];
var allmsgs= [];

io.on("connection", function(socket){
   console.log("user connected"); 
    console.log(socket.id);
    
    socket.on("uName", function(data){
        console.log("username sent = " +data);
        names.push(data);
        io.emit("names", names);
        
    });
    
    socket.on("msg", function(data){
        console.log("msg sent = " +data);
        allmsgs.push(data);
        io.emit("allmsgs", allmsgs);
    });
    
    socket.on("disconnect", function(){
        var index = names.indexOf(socket.id);
        names.splice(index, 1);
        io.emit("names", names);
        console.log("user has disconnected");
        console.log(socket.id);
    })
});

server.listen(port,(err)=>{
    if(err){
        
        console.log("error: " +err);
        return false;
    }
    
    console.log("socket port is running");
})





