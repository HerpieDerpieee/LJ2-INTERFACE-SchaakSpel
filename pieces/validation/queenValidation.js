export const queenValidation = (currentPos, destinationPos, board, color) => {
    const [currentX, currentY] = currentPos;
    const [destX, destY] = destinationPos;
    const deltaX = destX - currentX;
    const deltaY = destY - currentY;

    if (
        // Moving horizontally or vertically (rook-like movement)
        (deltaX === 0 && deltaY !== 0) ||
        (deltaY === 0 && deltaX !== 0) ||
        // Moving diagonally (bishop-like movement)
        (Math.abs(deltaX) === Math.abs(deltaY) && deltaX !== 0)
    ) {
        // Check for obstacles in the path
        if (deltaX === 0) {
            // Moving vertically
            const step = deltaY > 0 ? 1 : -1;
            for (let y = currentY + step; y !== destY; y += step) {
                if (board[currentX][y] !== "") {
                    return false; // Path is obstructed
                }
            }
        } else if (deltaY === 0) {
            // Moving horizontally
            const step = deltaX > 0 ? 1 : -1;
            for (let x = currentX + step; x !== destX; x += step) {
                if (board[x][currentY] !== "") {
                    return false; // Path is obstructed
                }
            }
        } else {
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
        }

        const otherPiece = board[destX][destY];
        return otherPiece ? !otherPiece.startsWith(color) : true; // Valid if destination is empty or has an opponent's piece
    }

    return false; // Invalid queen move
};