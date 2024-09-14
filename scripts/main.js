import { startGame } from "./gameLogic.js"

const startButton = document.getElementById("start-button")

startButton.addEventListener("click", startGame)
