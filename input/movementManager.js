import { ChessNotationToArrayXY } from "../board/chessNotationToArrayXY.js";
import {updateBoard} from "../board/updateBoard.js";
import {changeCurrentTurn, getCurrentBoard, getCurrentTurn} from "../gameManager.js";
import {validateMove} from "../pieces/validateMove.js";
import {swapCurrentTurn} from "../util/swapCurrentTurn.js";
import {isCheck} from "../pieces/validation/isCheck.js";

export const handleDrop = (event) => {
    event.preventDefault();
    const pieceId = event.dataTransfer.getData("text/plain"); // Retrieve the data
    const targetSquare = event.target;

    // Check if the drop target is a valid square for the piece to move
    if (targetSquare.classList.contains("square") || targetSquare.classList.contains("squareButton")) {
        const sourceSquareId = pieceId;
        const destinationSquareId = targetSquare.getAttribute("data-chess-location"); // Get the chess location

        const sourceCoordinates = ChessNotationToArrayXY(sourceSquareId);
        const destinationCoordinates = ChessNotationToArrayXY(destinationSquareId);

        // Obtain the current board
        let currentBoard = getCurrentBoard();

        // Get the piece at the source square
        const piece = currentBoard[sourceCoordinates[0]][sourceCoordinates[1]];
        if (!piece.toString().startsWith(getCurrentTurn())){
            alert("IT IS NOT YOUR TURN.")
            return;
        }

        const promise = new Promise((resolve, reject)=> {
            if (isCheck(currentBoard, getCurrentTurn())){
                console.log("henriolem syaay schaak")
                reject("je staat schaak.")
            }
            else if (validateMove(sourceCoordinates, destinationCoordinates, currentBoard)) {
                resolve();
            } else {
                reject("invalid move!");
            }
        }).then(()=>{
            console.log("then functie")
            console.log(`${sourceSquareId}, ${destinationSquareId}`)

            const destinationPiece = currentBoard[destinationCoordinates[0]][destinationCoordinates[1]];
            const isKing = destinationPiece === swapCurrentTurn(getCurrentTurn())+"King"

            if (isKing){
                alert(`${getCurrentTurn()} has won the game!`);
                window.location.reload();
            }


            if (destinationPiece !== "") {
                console.log(`${destinationPiece} was captured`);
            }

            currentBoard[destinationCoordinates[0]][destinationCoordinates[1]] = piece;
            currentBoard[sourceCoordinates[0]][sourceCoordinates[1]] = "";

            const board = document.querySelector("#board");

            changeCurrentTurn();

            updateBoard(board, currentBoard);
        }).catch((error)=>{
            console.log("error")
            if (error.toString().includes("schaak")){
                console.log("schaak error")

                let clonedBoard = currentBoard;
                clonedBoard[destinationCoordinates[0]][destinationCoordinates[1]] = piece;
                clonedBoard[sourceCoordinates[0]][sourceCoordinates[1]] = "";
                console.log("cloned board");

                const isStillCheck = isCheck(clonedBoard, getCurrentTurn());
                console.log("is still check: "+isStillCheck);

                if (isStillCheck){
                    alert("je staat nogsteeds schaak")
                }
                else {
                    console.log("else functie.")
                    const board = document.querySelector("#board");

                    changeCurrentTurn();
                    currentBoard = clonedBoard;
                    updateBoard(board, currentBoard);
                }
            }
            else {
                alert(error);
            }

        })

    }
};

export const allowDrop = (event) => {
    event.preventDefault();
};