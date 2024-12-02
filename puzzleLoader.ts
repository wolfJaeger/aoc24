import { parse } from "jsr:@std/csv";

export async function loadPuzzle(fileName:string, delim:string = '   ', columnNames:string[]):Promise<Record<string, string>[]> {
    const puzzleContent = await Deno.readTextFile(fileName);
    return parse(puzzleContent, { columns : columnNames, separator:delim} );
}

export async function loadPuzzleColumns(fileName:string, delim:string = '   '):Promise<string[][]> {
    const puzzleContent = await Deno.readTextFile(fileName);
    const allRecords = parse(puzzleContent, { separator:delim} );
    let allRecordColumns : string[][];
    if (allRecords.length > 0) {
        const numOfColumns = allRecords[0].length;
        allRecordColumns = new Array<Array<string>>(numOfColumns);
        for(let column = 0; column < numOfColumns; column++) {
            allRecordColumns[column] = [];
        }
        allRecords.forEach((recordEntry) => {
            recordEntry.forEach((recordColumn, index )=> {
                allRecordColumns[index].push(recordColumn)
            });
        });
    } else {
        allRecordColumns = new Array<Array<string>>(0);
    }
    return allRecordColumns;
}

export async function loadPuzzleRows(fileName:string, delim:string = '   '):Promise<string[][]> {
    const puzzleContent = await Deno.readTextFile(fileName);
    const allRecords = parse(puzzleContent, { separator:delim} );
    let allRecordRows : string[][];
    if (allRecords.length > 0) {
        const numOfRows = allRecords.length;
        allRecordRows = new Array<Array<string>>(numOfRows);
        
        allRecords.forEach((recordEntry, rowIndex) => {
            allRecordRows[rowIndex] = [];
            recordEntry.forEach((recordColumn)=> {
                allRecordRows[rowIndex].push(recordColumn)
            });
        });
    } else {
        allRecordRows = new Array<Array<string>>(0);
    }
    return allRecordRows;
}
