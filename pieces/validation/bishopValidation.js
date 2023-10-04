export const bishopValidation = (currentPos, destinationPos, board, color) => {
    const [currentX, currentY] = currentPos;
    const [destX, destY] = destinationPos;
    const deltaX = destX - currentX;
    const deltaY = destY - currentY;

    if (Math.abs(deltaX) === Math.abs(deltaY) && deltaX !== 0 && deltaY !== 0) {
        // Moving diagonally
        const xStep = deltaX > 0 ? 1 : -1;
        const yStep = deltaY > 0 ? 1 : -1;
        let x = currentX + xStep;
        let y = currentY + yStep;

        while (x !== destX && y !== destY) {
            if (board[x][y] !== "") {
                return false; // Path is obstructed
            }
            x += xStep;
            y += yStep;
        }

        const otherPiece = board[destX][destY];
        return otherPiece ? !otherPiece.startsWith(color) : true; // Valid if destination is empty or has an opponent's piece
    }

    return false; // Invalid bishop move
};