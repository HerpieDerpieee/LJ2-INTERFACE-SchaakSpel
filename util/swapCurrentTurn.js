export const swapCurrentTurn = (color) => {
    if (color === "black"){
        return "white";
    } else if (color==="white"){
        return "black";
    }
}