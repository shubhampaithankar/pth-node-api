import Player from "../models/player.model.js"
import Battle from "../models/battle.model.js"

import { calculateDamage } from "../services/battle.service.js"

export const HandleMoveSelect = async (socket, move) => {
    const battle = await Battle.findOne({ $or: [{ player1: socket.playerId }, { player2: socket.playerId }] });
    if (!battle) return;

    const currentPlayer = battle.turn.toString() === socket.playerId.toString() ? 'player1' : 'player2';
    const opponentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';

    const attacker = battle[currentPlayer].pokemon[battle[currentPlayer].activePokemonIndex];
    const defender = battle[opponentPlayer].pokemon[battle[opponentPlayer].activePokemonIndex];

    const damage = calculateDamage(move, attacker, defender);
    defender.hp -= damage;
    
    battle.markModified('state');
    await battle.save();

    socket.to(battle[opponentPlayer].socketId).emit('move-executed', { damage });
    socket.emit('move-executed', { damage });
}