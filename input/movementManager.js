import { ChessNotationToArrayXY } from "../board/chessNotationToArrayXY.js";
import {updateBoard} from "../board/updateBoard.js";
import {changeCurrentTurn, getCurrentBoard, getCurrentTurn} from "../gameManager.js";
import {validateMove} from "../pieces/validateMove.js";
import {swapTurnColor} from "../util/swapCurrentTurn.js";
import {isCheck} from "../pieces/validation/isCheck.js";

export const handleDrop = (event) => {
    event.preventDefault();
    const pieceId = event.dataTransfer.getData("text/plain");
    const targetSquare = event.target;

    // Check if the drop target is a valid square for the piece to move
    if (!targetSquare.classList.contains("square") && !targetSquare.classList.contains("squareButton")) return;


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
        if (!validateMove(sourceCoordinates, destinationCoordinates, currentBoard)){
            reject("invalid move!");
        }
        if (isCheck(currentBoard, getCurrentTurn())){
            reject("je staat schaak.")
        }
        resolve("its a valid move!");

    }).then((response)=>{
        if (!response.toString().startsWith("its a valid move!")) return;
        doMove(sourceSquareId, destinationSquareId, sourceCoordinates, destinationCoordinates, piece);
    }).catch((error)=>{
        console.log(`❌ ${error}`)
        if (!error.toString().includes("schaak")){ console.error(error); return;}

        console.log("⚙️ current board:")
        console.warn(currentBoard);

        let clonedBoard = JSON.parse(JSON.stringify(currentBoard));
        clonedBoard[destinationCoordinates[0]][destinationCoordinates[1]] = piece;
        clonedBoard[sourceCoordinates[0]][sourceCoordinates[1]] = "";
        console.log("⚙️ cloned board:");
        console.warn(clonedBoard);

        const isStillCheck = isCheck(clonedBoard, getCurrentTurn());
        console.log("⚙️ is still check: "+isStillCheck);

        if (isStillCheck){
            console.log("❌ je staat nogsteeds schaak")
        }
        else {
            console.log("✅ VALID BLOCKED CHECK.")
            doMove(sourceSquareId, destinationSquareId, sourceCoordinates, destinationCoordinates, piece);
        }

    })
};

export const allowDrop = (event) => {
    event.preventDefault();
};


const doMove = (sourceSquareId, destinationSquareId, sourceCoordinates, destinationCoordinates, piece) => {
    let currentBoard = getCurrentBoard();

    const destinationPiece = currentBoard[destinationCoordinates[0]][destinationCoordinates[1]];
    const isKing = destinationPiece === swapTurnColor(getCurrentTurn())+"King"

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
}