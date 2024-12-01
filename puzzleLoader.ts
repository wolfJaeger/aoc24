import { parse } from "jsr:@std/csv";

export async function loadPuzzle(fileName:string, columnNames:string[]):Promise<Record<string, string>[]> {
    const puzzleContent = await Deno.readTextFile(fileName);
    return parse(puzzleContent, { columns : columnNames, separator:'   '} );
}

export async function loadPuzzleColumns(fileName:string):Promise<string[][]> {
    const puzzleContent = await Deno.readTextFile(fileName);
    const allRecords = parse(puzzleContent, { separator:'   '} );
    let allRecordColumns : string[][];
    if (allRecords.length > 0) {
        const numOfColumns = allRecords[0].length;
        allRecordColumns = new Array<Array<string>>(numOfColumns);
        for(let column = 0; column < numOfColumns; column++) {
            allRecordColumns[column] = new Array<string>();
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
