import { checkTypes, hand, playCard, playerCard, enemyCard } from "./gameLogic.js"

// DOM Elements
const overlay = document.getElementById("overlay")
const cardSelect = document.getElementById("card-select")
const instructions = document.getElementById("instructions")
const startGame = document.getElementById("start-game")
const choice1 = document.getElementById("select0")
const choice2 = document.getElementById("select1")
const choice3 = document.getElementById("select2")
const inPlayPlayer = document.getElementById("player-card")
const inPlayEnemy = document.getElementById("enemy-card")
const playerAttackDisplay = document.getElementById("player-attack")
const enemyAttackDisplay = document.getElementById("enemy-attack")
const pikoTitle = document.getElementById("piko-title")
const rollDiv = document.getElementById("roll")

// Event Listeners
choice1.addEventListener('click', () => playCard(0))
choice2.addEventListener('click', () => playCard(1))
choice3.addEventListener('click', () => playCard(2))

// Display hand options
export const displayHand = () => {
    playerAttackDisplay.textContent = 0
    enemyAttackDisplay.textContent = 0
    cardSelect.classList.remove("hidden")
    instructions.classList.remove("hidden")
    startGame.classList.add("hidden")
    // Reset visual effects from type strength
    playerAttackDisplay.className = "player-attack"
    enemyAttackDisplay.className = "enemy-attack"

    choose(choice1, 0)
    choose(choice2, 1)
    choose(choice3, 2)
}

// Show cards in play and initiate attack roll
export const inPlay = () => {
    cardSelect.classList.add("hidden")
    instructions.classList.add("hidden")
    startGame.classList.remove("hidden")
    overlay.classList.add("hidden")

    inPlayPlayer.innerHTML = displayCard(playerCard)
    setTimeout(() => {
        inPlayEnemy.innerHTML = displayCard(enemyCard)
        setTimeout(() => {
            rollDiv.classList.remove("hidden")
        }, 500)
        rollDiv.addEventListener('click', rollAttack)
    }, 500)
}

//Roll to determine the attack values of both sides
const rollAttack = () => {
    const playerAttack = calculateAttack(playerCard.attack)
    const enemyAttack = calculateAttack(enemyCard.attack)

    displayAttackValues(playerAttack, enemyAttack)

    const boostedValues = applyTypeBonus(playerAttack, enemyAttack)
    const finalPlayerAttack = boostedValues.player
    const finalEnemyAttack = boostedValues.enemy

    displayBoostedValues(finalPlayerAttack, finalEnemyAttack)
    setTimeout(() => {
    determineWinner(finalPlayerAttack, finalEnemyAttack)
    }, 1000)

}

// Roll the dice for a given attack stat
const calculateAttack = (attackValue) => {
    return rollDice(attackValue)
}

// Update the DOM with initial attack values
const displayAttackValues = (playerAttack, enemyAttack) => {
    playerAttackDisplay.textContent = playerAttack
    enemyAttackDisplay.textContent = enemyAttack
    rollDiv.classList.add("hidden")
}

// Apply bonuses based on type advantages
const applyTypeBonus = (playerAttack, enemyAttack) => {
    let playerBonus = playerAttack
    let enemyBonus = enemyAttack

    if (checkTypes() === "player") {
        playerBonus *= 2
    } else if (checkTypes() === "enemy") {
        enemyBonus *= 2
    }

    return {
        player: playerBonus,
        enemy: enemyBonus
    }
}

// Update the DOM to show boosted attack values
const displayBoostedValues = (playerAttack, enemyAttack) => {
    playerAttackDisplay.textContent = playerAttack
    enemyAttackDisplay.textContent = enemyAttack

    if (checkTypes() === "player") {
        playerAttackDisplay.classList.add("strong")
    } else if (checkTypes() === "enemy") {
        enemyAttackDisplay.classList.add("strong")
    }



}

// Determine and display the winner
const determineWinner = (playerAttack, enemyAttack) => {
    if (playerAttack > enemyAttack) {
        winnerDOM("won")
    } else if (playerAttack < enemyAttack) {
        winnerDOM("lost")
    } else {
        winnerDOM("tied")
    }
}

// Dice roller
const rollDice = (dice) => Math.floor(Math.random() * dice) + 1

// Display the winner
const winnerDOM = (outcome) => {
    overlay.classList.remove("hidden")
    pikoTitle.textContent = "You " + outcome + "!"
    enemyCard = {}
    playerCard = {}
    
}

// Helper function to display card details
const displayCard = (card) => {
    return `
        <div class="piko-header">
            <img src="./assets/${card.type}.svg" class="type-icon">
            <div class="piko-name">${card.name}</div>
        </div>
        <img src="assets/${card.name}.png" class="piko-img">
        <div class="attack">
            <span class="attack-label">Attack</span>
            <div style="margin-left: .75em;">1d${card.attack}</div>
        </div>
        <div class="piko-about">
            ${card.info} 
        </div>
    `
}

// Helper function to choose cards
const choose = (option, index) => {
    option.innerHTML = '<div class="piko-card piko-card-select">' + displayCard(hand[index]) + '</div>'
}
