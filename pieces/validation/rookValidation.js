export const rookValidation = (currentPos, destinationPos, board, color) => {
    const [currentX, currentY] = currentPos;
    const [destX, destY] = destinationPos;
    const deltaX = destX - currentX;
    const deltaY = destY - currentY;

    if (deltaX === 0 && deltaY !== 0) {
        // Moving vertically
        const step = deltaY > 0 ? 1 : -1;
        for (let y = currentY + step; y !== destY; y += step) {
            if (board[currentX][y] !== "") {
                return false; // Path is obstructed
            }
        }
        const otherPiece = board[destX][destY];
        return otherPiece ? !otherPiece.startsWith(color) : true; // Valid if destination is empty or has an opponent's piece
    } else if (deltaY === 0 && deltaX !== 0) {
        // Moving horizontally
        const step = deltaX > 0 ? 1 : -1;
        for (let x = currentX + step; x !== destX; x += step) {
            if (board[x][currentY] !== "") {
                return false; // Path is obstructed
            }
        }
        const otherPiece = board[destX][destY];
        return otherPiece ? !otherPiece.startsWith(color) : true; // Valid if destination is empty or has an opponent's piece
    }

    return false; // Invalid rook move
};