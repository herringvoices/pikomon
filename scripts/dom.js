// import {database} from "./database.js"
import {checkTypes, hand, playCard, playerCard, enemyCard} from "./gameLogic.js"

//VARIABLES
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


//EVENT LISTENERS
choice1.addEventListener('click', () => {playCard(0)})
choice2.addEventListener('click', () => {playCard(1)})
choice3.addEventListener('click', () => {playCard(2)})

//FUNCTIONS

export const inPlay = () => {

    cardSelect.classList.add("hidden")
    instructions.classList.add("hidden")
    startGame.classList.remove("hidden")
    overlay.classList.add("hidden")

    inPlayPlayer.innerHTML = `
        
                            <div class="piko-header">
                                <img src="./assets/${playerCard.type}.svg" class="type-icon">
                                <div class="piko-name">${playerCard.name}</div>
                            </div>
                            <img src="assets/${playerCard.name}.png" class="piko-img">
                            <div class="attack">
                                <span class="attack-label">Attack</span>
                                <div style="margin-left: .75em;">${playerCard.attack}</div>
                            </div>
                            <div class="piko-about">
                                ${playerCard.info} 
                            </div>
                        
        `
        setTimeout(() => {
        inPlayEnemy.innerHTML = `
        
                            <div class="piko-header">
                                <img src="./assets/${enemyCard.type}.svg" class="type-icon">
                                <div class="piko-name">${enemyCard.name}</div>
                            </div>
                            <img src="assets/${enemyCard.name}.png" class="piko-img">
                            <div class="attack">
                                <span class="attack-label">Attack</span>
                                <div style="margin-left: .75em;">${enemyCard.attack}</div>
                            </div>
                            <div class="piko-about">
                                ${enemyCard.info} 
                            </div>
                        
        `
    playerAttackDisplay.innerHTML = playerCard.attack
    enemyAttackDisplay.innerHTML = enemyCard.attack
}, 500)
    setTimeout(() => {
        updateAttack()
    }, 500)
    checkWin()


}

const updateAttack = () => {
    // Only apply the multiplier once
    if (!playerCard.attackUpdated && checkTypes() === "player") {
        playerCard.attack = playerCard.attack * 2
        playerCard.attackUpdated = true
        playerAttackDisplay.innerHTML = playerCard.attack
        playerAttackDisplay.classList.add("strong")

    } else if (!enemyCard.attackUpdated && checkTypes() === "enemy") {
        enemyCard.attack = enemyCard.attack * 2
        enemyCard.attackUpdated = true
        enemyAttackDisplay.innerHTML = enemyCard.attack
        enemyAttackDisplay.classList.add("strong")
    }
}

const choose = (option, index) =>{
    option.innerHTML = `
        <div class="piko-card piko-card-select">
                            <div class="piko-header">
                                <img src="./assets/${hand[index].type}.svg" class="type-icon">
                                <div class="piko-name">${hand[index].name}</div>
                            </div>
                            <img src="assets/${hand[index].name}.png" class="piko-img">
                            <div class="attack">
                                <span class="attack-label">Attack</span>
                                <div style="margin-left: .75em;">${hand[index].attack}</div>
                            </div>
                            <div class="piko-about">
                                ${hand[index].info} 
                            </div>
                        </div>
        `
    }

export const displayHand = () => {
 cardSelect.classList.remove("hidden")
 instructions.classList.remove("hidden")
 startGame.classList.add("hidden")
 choose(choice1, 0)
 choose(choice2, 1)
 choose(choice3, 2)
}



const winnerDOM = (outcome) => {
    overlay.classList.remove("hidden")
    pikoTitle.textContent = "You " + outcome + "!"
    enemyCard = {}
    playerCard = {}

    // Reset attackUpdated flags
    delete playerCard.attackUpdated
    delete enemyCard.attackUpdated
}


const checkWin = () =>{
    setTimeout(() => {
        playerAttackDisplay.className = "player-attack"
    enemyAttackDisplay.className = "enemy-attack"
    if (playerCard.attack > enemyCard.attack) {
        winnerDOM("won")
    } else if (playerCard.attack < enemyCard.attack) {
        winnerDOM("lost")
    } else {
        winnerDOM("tied")
    }

}, 2300) 
}
