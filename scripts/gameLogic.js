import {displayHand, inPlay} from "./dom.js"
import {database} from "./database.js"
export let hand = []
export let playerCard = {}
export let enemyCard = {}

export const playCard = (index) => {
playerCard = hand[index]
enemyCard = randomCard()
inPlay()
}

export const startGame = () => {
    drawHand()
}

const drawHand = () => {
    hand = []
    hand.push(randomCard())
    hand.push(randomCard())
    hand.push(randomCard())

    displayHand()

}

//Gets a random card from the database
const randomCard = () => {
    let cardId = Math.floor(Math.random() * database.length) + 1
    return database.find(item => item.id === cardId)
}

export const checkTypes = () => {
    // Define the strengths of each type
    const strengths = {
        'meat': 'plant',
        'plant': 'rock',
        'rock': 'bot',
        'bot': 'meat'
    }

    const playerType = playerCard.type
    const enemyType = enemyCard.type

    if (strengths[playerType] === enemyType) {
        return "player"
    } else if (strengths[enemyType] === playerType) {
        return "enemy"
    } else {
        return "neutral"
    }
}

