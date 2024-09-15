import { displayHand, inPlay } from "./dom.js"
import { database } from "./database.js"

// Global variables for hand and cards
export let hand = []
export let playerCard = {}
export let enemyCard = {}

// Start the game by drawing the player's hand
export const startGame = () => {
    drawHand()
}

// Draws a hand of three cards
const drawHand = () => {
    hand = []
    for (let i = 0; i < 3; i++) {
        hand.push(randomCard())
    }
    displayHand()
}

// Gets a random card from the database
const randomCard = () => {
    let cardId = Math.floor(Math.random() * database.length) + 1
    return database.find(item => item.id === cardId)
}

// Player selects a card to play
export const playCard = (index) => {
    playerCard = hand[index]
    enemyCard = randomCard()
    inPlay()
}

// Check types to determine strength in combat
export const checkTypes = () => {
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
