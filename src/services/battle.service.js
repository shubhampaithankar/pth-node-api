export const calculateDamage = (move, attacker, defender) => {
    const baseDamage = move.power;
    const attack = attacker.stats.attack;
    const defense = defender.stats.defense;
    const damage = (baseDamage * (attack / defense)) / 50 + 2;
    return damage;
}