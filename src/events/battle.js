import Player from "../models/player.model.js";
import Battle from "../models/battle.model.js";

import { HandleMoveSelect } from '../controllers/battle.controller.js'

export default (io) => {
    io.on('connection', (socket) => {
        console.log('A player connected:', socket.id);

        socket.on('join-battle', async (playerData) => {
            const player = new Player({ socketId: socket.id, ...playerData });
            await player.save();

            // Assign player to socket instance
            socket.playerId = player._id;

            const playersCount = await Player.countDocuments();
            if (playersCount === 2) {
                const players = await Player.find();
                const battle = new Battle({
                    player1: players[0]._id,
                    player2: players[1]._id,
                    turn: players[0]._id,
                    state: { /* initial state */ },
                });

                await battle.save();

                io.emit('battle-start', battle);
            }
        });

        socket.on('select-move', async (move) => {
            await HandleMoveSelect(socket, move);
        });

        socket.on('disconnect', async () => {
            console.log('A player disconnected:', socket.id);
            await Player.deleteOne({ socketId: socket.id });
            io.emit('player-disconnected');
        });
    });
}