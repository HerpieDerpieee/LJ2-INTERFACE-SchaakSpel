import {ChessNotationToArrayXY} from "../board/chessNotationToArrayXY.js";

import {kingValidation} from "./validation/kingValidation.js";
import {rookValidation} from "./validation/rookValidation.js";
import {bishopValidation} from "./validation/bishopValidation.js";
import {pawnValidation} from "./validation/pawnValidation.js";
import {knightValidation} from "./validation/knightValidation.js";
import {queenValidation} from "./validation/queenValidation.js";
export const validateMove = (source, destination, board) => {

    const currentBoard = board;

    const currentCoordinates = source;
    const movingToCoordinates = destination;

    const currentPiece = currentBoard[currentCoordinates[0]][currentCoordinates[1]];
    const color = currentPiece.toString().substring(0, 5)


    //Alle validatielogica (behalve de koning/king) is geschreven door ChatGPT, ik had persoonlijk geen zin om alle logica te gaan begrijpen om het te implementen.
    //De rest van heel het spel is wel geschreven door mij.

    if (currentPiece.toString().endsWith("Pawn")){
        return pawnValidation(currentCoordinates, movingToCoordinates, board, color);
    }
    if (currentPiece.toString().endsWith("King")){
        return kingValidation(currentCoordinates, movingToCoordinates, board, color);
    }
    if (currentPiece.toString().endsWith("Rook")){
        return rookValidation(currentCoordinates, movingToCoordinates, board, color);
    }
    if (currentPiece.toString().endsWith("Bishop")){
        return bishopValidation(currentCoordinates, movingToCoordinates, board, color);
    }
    if (currentPiece.toString().endsWith("Knight")){
        return knightValidation(currentCoordinates, movingToCoordinates, board, color);
    }
    if (currentPiece.toString().endsWith("Queen")){
        return queenValidation(currentCoordinates, movingToCoordinates, board, color);
    }
}