export const pawnValidation = (currentPos, destinationPos, board, color) => {
    const [currentX, currentY] = currentPos;
    const [destX, destY] = destinationPos;
    const deltaX = destX - currentX;
    const deltaY = destY - currentY;

    // Define the direction of pawn movement based on its color
    const direction = color === "white" ? -1 : 1;

    if (
        // Moving one square forward
        (deltaX === 1 * direction && deltaY === 0 && board[destX][destY] === "") ||
        // Moving two squares forward from the starting position
        (deltaX === 2 * direction &&
            deltaY === 0 &&
            currentX === (color === "white" ? 6 : 1) && // White pawns start at row 6, black at row 1
            board[destX][destY] === "" &&
            board[currentX + direction][currentY] === "") ||
        // Capturing a piece diagonally
        (deltaX === 1 * direction &&
            Math.abs(deltaY) === 1 &&
            board[destX][destY] !== "" &&
            !board[destX][destY].startsWith(color))
    ) {
        return true; // Valid pawn move
    }

    return false; // Invalid pawn move
};