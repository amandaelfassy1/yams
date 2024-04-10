
export function diceRoll(numDice: number): number[] {
    const result = [];
    for (let i = 0; i < numDice; i++) {
        // Générer un nombre aléatoire entre 1 et 6 (valeur d'un dé)
        const diceValue = Math.floor(Math.random() * 6) + 1;
        result.push(diceValue);
    }
    return result;
}
