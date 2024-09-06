// map of socket id and user id
const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
}

export default (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);
        socket.emit('message', 'Welcome to the chat app!');

        const userId = socket.handshake.query.userId;
        if (userId != "undefined") userSocketMap[userId] = socket.id;
    
        // io.emit() is used to send events to all the connected clients
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    
        // socket.on() is used to listen to the events. can be used both on client and server side
        socket.on("disconnect", () => {
            console.log("user disconnected", socket.id);
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        });
    });
}