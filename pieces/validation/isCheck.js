import {swapTurnColor} from "../../util/swapCurrentTurn.js";
import {validateMove} from "../validateMove.js";

export const isCheck = (currentBoard, color) => {
    let board = [...currentBoard];

    const currentColor = color;
    const enemyColor = swapTurnColor(color);

    let kingPosition;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] === currentColor+"King"){
                kingPosition = [i,j]
            }
        }
    }


    for (let i = 0; i < 8; i++){
        for ( let j = 0; j <8; j++){
            const piece = board[i][j];
            if (piece.toString().startsWith(enemyColor)){
                if (validateMove([i,j], kingPosition, board)){
                    return true;
                }
            }
        }
    }
    return false;
}