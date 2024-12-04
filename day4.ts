import { loadPuzzleRows } from "./puzzleLoader.ts";

export function checkXmasOcurrences(matrix:string[][]): number {
    let numXmasOccurences = 0;
    for(let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
        for(let colIndex = 0; colIndex < matrix[rowIndex].length; colIndex++) {
            if (matrix[rowIndex][colIndex] == 'X') {
                numXmasOccurences += checkNext('horizontal right', 'MAS', matrix, rowIndex, colIndex, 0, 1); 
                numXmasOccurences += checkNext('horizontal left', 'MAS', matrix, rowIndex, colIndex, 0, -1); 
                numXmasOccurences += checkNext('vertical down', 'MAS', matrix, rowIndex, colIndex, 1, 0);
                numXmasOccurences += checkNext('vertical up', 'MAS', matrix, rowIndex, colIndex, -1, 0);
                numXmasOccurences += checkNext('diagonal down right', 'MAS', matrix, rowIndex, colIndex, 1, 1);
                numXmasOccurences += checkNext('diagonal up left', 'MAS', matrix, rowIndex, colIndex, -1, -1);
                numXmasOccurences += checkNext('diagonal down left', 'MAS', matrix, rowIndex, colIndex, 1, -1);
                numXmasOccurences += checkNext('diagonal up right', 'MAS', matrix, rowIndex, colIndex, -1, 1);
            }
        }
    }
    return numXmasOccurences;
}

function checkNext(direction: string, checkString: string, matrix: string[][], rowStart: number, colStart: number, rowStepLength: number, colStepLength: number): number {
    let hasCheckString = 1;
    const maxRow = matrix.length -1;
    const maxCol = matrix[0].length -1

    for (let step = 1; step <= checkString.length; step++) {
        const nextChar = checkString[step-1];
        const row = rowStart + step  * rowStepLength;
        const col = colStart + step * colStepLength;
        if (row < 0 || col < 0 
            || row > maxRow || col > maxCol 
        ) {
            // Next would be out of bounds
            hasCheckString = 0;
            break;
        } else if (!(matrix[row][col] === nextChar)) {
            hasCheckString = 0;
            break;
        }
    }
    if (hasCheckString === 1) {
        console.log('Found XMAS for direction', direction)
    }
    return hasCheckString;
}

if (import.meta.main) {
    //const lines = await loadPuzzleRows('./data/aoc_4_1_example.txt');
    const lines = await loadPuzzleRows('./data/aoc_4_1.txt');
    const matrix = []
    for(const line of lines) {
        matrix.push([...line[0]]);
    }
    const numberOfXmas = checkXmasOcurrences(matrix);

    console.log('Found', numberOfXmas, 'XMAS occurences.')
}