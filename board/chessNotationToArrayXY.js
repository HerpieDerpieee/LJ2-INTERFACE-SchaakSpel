export const ChessNotationToArrayXY = (chessLocation) => {
    const firstLetter = chessLocation[0];
    const secondNumber = chessLocation[1];

    let coordinates = [];
    switch (firstLetter.toUpperCase()){
        default:
            console.error("Invalid input in ChessNotationToArrayXY function.");
            break;

        case "A":
            coordinates.push(0);
            break;
        case "B":
            coordinates.push(1);
            break;
        case "C":
            coordinates.push(2);
            break;
        case "D":
            coordinates.push(3);
            break;
        case "E":
            coordinates.push(4);
            break;
        case "F":
            coordinates.push(5);
            break;
        case "G":
            coordinates.push(6);
            break;
        case "H":
            coordinates.push(7);
            break;
    }
    coordinates.push(parseInt(secondNumber)-1);

    return coordinates;
}