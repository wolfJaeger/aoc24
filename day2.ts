import {loadPuzzleRows} from "./puzzleLoader.ts"


export function isSecure(numbers: string[]) : boolean {
    let isSecure = true;
    let prevIsAsc : boolean = false;
    let prevValue : number = 0;
    for(let numIdx = 0; numIdx < numbers.length && isSecure; numIdx++){
        const currentValue = parseInt(numbers[numIdx]);
        const differnce = Math.abs(currentValue - prevValue);
        const differenceIsBetweenOneAndThree = numIdx < 1 || differnce > 0 && differnce <= 3;
        const isAsc = currentValue - prevValue > 0;
        const noValidComparisonPossible = numIdx < 2;
        if ((noValidComparisonPossible || 
            prevIsAsc == isAsc) 
            && differenceIsBetweenOneAndThree) {
            prevIsAsc = isAsc;
            prevValue = currentValue;
        } else {
            isSecure = false;
        }
    }
    return isSecure;
}

export function isSecureWithProblemDampener(numbers: string[]):boolean {
    if (isSecure(numbers)) {
        return true;
    } else {
        let isSecureWithoutValue = true;
        for(let numberIdx = 0; numberIdx < numbers.length; numberIdx++) {
            isSecureWithoutValue = isSecure(withoutValueOf(numberIdx, numbers));
            if (isSecureWithoutValue) {
                break;
            }
        }
        return isSecureWithoutValue;
    }
}

function withoutValueOf(indexOfValueToRemove: number, originalValues: string[]): string[] {
    const valuesCopy = [...originalValues]
    valuesCopy.splice(indexOfValueToRemove, 1);
    return valuesCopy;
}

async function numberOfSecureRowsOfPuzzle(usingProblemDampener:boolean = false) : Promise<number> {
    const allRecordRows = await loadPuzzleRows('./data/aoc_2_1.txt', ' ');

    let numberOfSecure = 0;
    let rowIsSecure = true;
    allRecordRows.forEach(row => {
        if (usingProblemDampener) {
            rowIsSecure = isSecureWithProblemDampener(row);
        } else {
           rowIsSecure = isSecure(row);
        }
        if (rowIsSecure) {
            numberOfSecure++;
        }
    });
    return numberOfSecure;
}

if (import.meta.main) {
    const numberOfSecureRows = await numberOfSecureRowsOfPuzzle(false);
    console.log("Number of secure rows: ", numberOfSecureRows);
    const numberOfSecureRowsUsingDampener = await numberOfSecureRowsOfPuzzle(true);
    console.log("Number of secure rows using damper: ", numberOfSecureRowsUsingDampener);
}
