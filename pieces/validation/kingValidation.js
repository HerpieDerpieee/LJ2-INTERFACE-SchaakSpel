export const kingValidation = (currentPos, destinationPos, board, color) => {
    const distanceX = Math.abs(destinationPos[0] - currentPos[0]);
    const distanceY = Math.abs(destinationPos[1] - currentPos[1]);

    if (distanceX===1||distanceX===-1||distanceY===1||distanceY===-1) {
        const otherPiece = board[destinationPos[0]][destinationPos[1]].toString();
        if (otherPiece.startsWith(color)) return false;

        //only 1 square, and not a white piece.
        return true
    }

    return false;
}