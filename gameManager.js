
import { createStarterBoard } from "./pieces/startingPositions.js";
import { updateBoard } from "./board/updateBoard.js";
import { handleDrop, allowDrop } from "./input/movementManager.js";
import {swapCurrentTurn} from "./util/swapCurrentTurn.js";

let currentBoard = createStarterBoard();
let currentTurn = "white";

export const getCurrentBoard = () => {
    return [...currentBoard];
}
export const changeCurrentTurn = () => {
    currentTurn = swapCurrentTurn(currentTurn);
    document.querySelector("#turnIndicator").style.backgroundColor = currentTurn;
    document.querySelector("#turnIndicator").style.color = swapCurrentTurn(currentTurn);
}
export const getCurrentTurn = () => {
    return currentTurn;
}

const StartGame = () => {
    const board = document.querySelector("#board");
    updateBoard(board, currentBoard);

    // Pass currentBoard and isValidMove as parameters to the handleDrop function
    board.addEventListener("drop", (event) => handleDrop(event));
    board.addEventListener("dragover", allowDrop);
}

document.addEventListener("DOMContentLoaded", () => {
    StartGame();
})