const port = process.env.PORT || 10004;
const server = require("http").Server();

var io = require("socket.io")(server);

var allplayers = [];
var P1score = 0;
var P2score = 0;

io.on("connection", function(socket){
    
    socket.on("joingame", function(data){
        console.log("joining game", data);
        
        socket.join(data);
        socket.myPlayer = data;
    
    });
    
    socket.on("p1score", function(data){
        console.log("Player one score:", data)
        P1score = data;
        socket.broadcast.emit("p1Score", P1score);
    })
    
    socket.on("p2score", function(data){
        console.log("Player two score:", data)
        P2score = data;
    
        socket.broadcast.emit("p2Score", P2score);
    })
    
    console.log("connect");
    allplayers.push(socket.id);
    console.log(allplayers);
    
    socket.emit("yourid", socket.id);
    
    io.emit("userjoined", allplayers);
    
    socket.on("disconnect", function(){
        var index = allplayers.indexOf(socket.id);
        allplayers.splice(index, 1);
        io.emit("userjoined", allplayers);
    })
});

server.listen(port, (err)=>{
              if(err){
    console.log(err);
    return false;
}
console.log("Port is running");
})
