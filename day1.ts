import {loadPuzzleColumns} from "./puzzleLoader.ts"

/* Load puzzle input */
const puzzleInput = await loadPuzzleColumns('./data/aoc_1_1.txt');
const leftContents =  puzzleInput[0]; 
const rightContents = puzzleInput[1];

/********* First part of the puzzle **********/
leftContents.sort();
rightContents.sort();
const numberOfEntries = leftContents.length;
let distanceOfAll = 0;
for(let lineNumber = 0; lineNumber < numberOfEntries; lineNumber++) {
    distanceOfAll = distanceOfAll + Math.abs(parseInt(leftContents[lineNumber]) - parseInt(rightContents[lineNumber]))
}

console.log('Distance of all is: ', distanceOfAll)

/********* Second part **********/
let distanceScore = 0;
leftContents.forEach(content => {
    const elementsFound = rightContents.filter((el) => el == content)
    distanceScore = distanceScore + parseInt(content) * elementsFound.length;
});
console.log('Distance score is: ', distanceScore)