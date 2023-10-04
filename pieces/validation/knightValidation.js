export const knightValidation = (currentPos, destinationPos, board, color) => {
    const [currentX, currentY] = currentPos;
    const [destX, destY] = destinationPos;
    const deltaX = destX - currentX;
    const deltaY = destY - currentY;

    // Knight moves in an L-shape (2 squares in one direction and 1 square in the other)
    if (
        (Math.abs(deltaX) === 2 && Math.abs(deltaY) === 1) ||
        (Math.abs(deltaX) === 1 && Math.abs(deltaY) === 2)
    ) {
        const otherPiece = board[destX][destY];
        // Valid if destination is empty or has an opponent's piece
        return otherPiece ? !otherPiece.startsWith(color) : true;
    }

    return false; // Invalid knight move
};