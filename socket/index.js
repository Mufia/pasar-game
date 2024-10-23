const io = require ("socket.io") (8900, {
    cors:{
        origin : "https://pasar-game-client.vercel.app"
    },
});

io.on ("connection",(socket)=> {
    console.log("a user connected.")
}) 