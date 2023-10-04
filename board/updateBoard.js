import { ChessNotationToArrayXY } from "./chessNotationToArrayXY.js";
import { swapColor } from "../util/colors.js";

// Function to handle the drag-and-drop behavior
const handleDragStart = (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
};

export const updateBoard = (boardElement, boardArray) => {
    let color = "#383838";
    boardElement.innerHTML = "";

    const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

    letters.forEach((letter) => {
        numbers.forEach((number) => {
            const newPosition = `${letter}${number}`;
            const newPositionCoordinates = ChessNotationToArrayXY(newPosition);
            const pieceName = boardArray[newPositionCoordinates[0]][newPositionCoordinates[1]];

            let child = document.createElement("div");
            child.setAttribute("id", newPosition);
            child.setAttribute("data-chess-location", newPosition);
            child.style.background = color;
            child.classList.add("square");

            if (pieceName !== "") {
                child.classList.add("pieceButton");
                child.innerHTML = `<img
                    src="src/images/${pieceName}.png"
                    class='squareButton'
                    draggable="true"
                    alt="chessPiece"
                    data-chess-location=${newPosition}
                />`;

                // Add the drag event listener here
                child.querySelector("img").addEventListener("dragstart", (event) => {
                    event.dataTransfer.setData("text/plain", newPosition);
                });
            }

            boardElement.appendChild(child);
            color = swapColor(color);
        });
        color = swapColor(color);
    });
};