
const player1 = {
    NAME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    POWER: 3,
    POINTS: 0,
};

const player2 = {
    NAME: "Bowser",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    POWER: 5,
    POINTS: 0,
};

// const player3 = {
//     NAME: "Peach",
//     VELOCIDADE: 3,
//     MANOBRABILIDADE: 4,
//     POWER: 2,
//     POINTS: 0,
// };

// const player4 = {
//     NAME: "Luigi",
//     VELOCIDADE: 3,
//     MANOBRABILIDADE: 4,
//     POWER: 4,
//     POINTS: 0,
// };

// const player5 = {
//     NAME: "Yoshi",
//     VELOCIDADE: 2,
//     MANOBRABILIDADE: 4,
//     POWER: 3,
//     POINTS: 0,
// };

// const player6 = {
//     NAME: "Peach",
//     VELOCIDADE: 2,
//     MANOBRABILIDADE: 2,
//     POWER: 5,
//     POINTS: 0,
// };

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random()
    let result 

    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA"
            break;
        default:
            result = "CONFRONTO"
    }
    return result
}

async function logRollResult(characterName, block, diceResult, attribute){
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function playRaceEngine(character1, character2){
    for (let round = 1; round <= 4; round++) {
        console.log(`🏁 Rodada ${round}`);

        // sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        // rolar os dados
        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()

        // teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE

            await logRollResult(
                character1.NAME, 
                "Velocidade💨", 
                diceResult1, 
                character1.VELOCIDADE
            )
            await logRollResult(
                character2.NAME, 
                "Velocidade💨", 
                diceResult2, 
                character2.VELOCIDADE
            )
        }
        if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE

            await logRollResult(
                character1.NAME, 
                "Manobrabilidade 🚗 ", 
                diceResult1, 
                character1.MANOBRABILIDADE
            )
            await logRollResult(
                character2.NAME, 
                "Manobrabilidade 🚗 ", 
                diceResult2, 
                character2.MANOBRABILIDADE
            )
        }
        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.POWER
            let powerResult2 = diceResult2 + character2.POWER

            console.log(`${character1.NAME} confrontou ${character2.NAME}!🥊`);

            await logRollResult(
                character1.NAME, 
                "Poder 🔮 ", 
                diceResult1, 
                character1.POWER
            )
            await logRollResult(
                character2.NAME, 
                "Poder 🔮 ", 
                diceResult2, 
                character2.POWER
            );


            if(powerResult1 > powerResult2 && character2.POINTS > 0){
                console.log(`${character1.NAME} venceu o confronto! ${character2.NAME} perdeu 1 ponto ❌`)
                character2.POINTS --;
            }
            if(powerResult1 > powerResult2 && character1.POINTS > 0){
                console.log(`${character2.NAME} venceu o confronto! ${character1.NAME} perdeu 1 ponto ❌`)
                character1.POINTS --;
            }
            console.log(powerResult2 === powerResult1 ? "Confronto empatado! Nenhum ponto foi perdido" : "");
        }

        // verificando o vencedor
        if(totalTestSkill1 > totalTestSkill2){
            console.log(`${character1.NAME} marcou um ponto!`)
            character1.POINTS++;
        } else if(totalTestSkill2 > totalTestSkill1){
            console.log(`${character2.NAME} marcou um ponto!`)
            character2.POINTS++;
        }

        console.log("_____________________________")
    }

}

async function declareWinner(character1, character2){
    console.log("Resultado Final:")
    console.log(`${character1.NAME}: ${character1.POINTS} ponto(s)`)
    console.log(`${character2.NAME}: ${character2.POINTS} ponto(s)`)

    if(character1.POINTS > character2.POINTS){
        console.log(`\n${character1.NAME} venceu a corrida! 🎇🎆🎉 Paraboins ✨🏆🥇✨🏆🥇`)
    }
    else if(character2.POINTS > character1.POINTS){
        console.log(`\n${character2.NAME} venceu a corrida! 🎇🎆🎉 Paraboins ✨🏆🥇✨🏆🥇`)
    }
    else{
        console.log(`A corrida terminou em EMPATE! 🚫`)
    }
}

(async function main() {
    console.log( `\n 🏁🏁🏁🏁🏁🏁🏁 Corrida Entre ${player1.NAME} e ${player2.NAME} comecando...🏁🏁🏁🏁🏁🏁🏁\n `);
    console.log( `🔊 E foi dada a largada!!!!!`);
    console.log( `________________________________`);

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);

})();

