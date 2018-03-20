const server = require('http').Server();
const port = process.env.PORT || 10003;

var io = require('socket.io')(server);

var Qobj=[];
var names = [];
var playerScore=0;

io.on("connection", function(socket){
   console.log("user connected"); 
    
    
   socket.on("qSubmit", function(data){
       Qobj.push(data);
       console.log(Qobj);
    })
    
    io.emit("quiz",Qobj);
    
    socket.on("uName", function(data){
        console.log("username sent = " +data);
        names.push(data);
        io.emit("names", names);
        
    });
    
    
    socket.on("playerScore", function(data){
        socket.player={
            id:socket.id,
            name:data.username,
            playerScore:data.score
        }
       
        console.log("opp score: " +socket.player);
    });
    
   io.emit("oppScore", socket.player);
    
    
    socket.on("answerA", function(data){
        console.log("Host's answers: "+Qobj[0].A);
        console.log("Player's answers: "+data);
        
        var msg=false;
       if(data == Qobj[0].A){
           msg=true;
       } 
        socket.emit("resultA", msg);
    });
    
    socket.on("answerB", function(data){
        console.log("Host's answers: "+Qobj[1].A);
        console.log("Player's answers: "+data);
        
        var msg=false;
       if(data == Qobj[1].A){
           msg=true;
       } 
        socket.emit("resultB", msg);
    });
    
    socket.on("answerC", function(data){
        console.log("Host's answers: "+Qobj[2].A);
        console.log("Player's answers: "+data);
        
        var msg=0;
       if(data == Qobj[2].A){
           msg=10;
       } 
        socket.emit("resultC", msg);
    }); 
    
    socket.on("answerD", function(data){
        console.log("Host's answers: "+Qobj[3].A);
        console.log("Player's answers: "+data);
        
        var msg=0;
       if(data == Qobj[3].A){
           msg=10;
       } 
        socket.emit("resultD", msg);
    });
    
    socket.on("answerE", function(data){
        console.log("Host's answers: "+Qobj[4].A);
        console.log("Player's answers: "+data);
        
        var msg=0;
       if(data == Qobj[4].A){
           msg=10;
       } 
        socket.emit("resultE", msg);
    });
    
    
    
    
    socket.on("disconnect", function(){
        var index = names.indexOf(socket.id);
        names.splice(index, 1);
        io.emit("names", names);
        console.log("user has disconnected");
    
    })
});

server.listen(port,(err)=>{
    if(err){
        
        console.log("error: " +err);
        return false;
    }
    
    console.log("socket port is running");
})

