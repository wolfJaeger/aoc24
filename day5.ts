import { loadPuzzleRows } from "./puzzleLoader.ts";

export function isValidLine(values:string[], rules:Map<string, Array<string>>) : boolean{
    let isValidLine = true;
    for (const value of values) {
        const rulesForValue = rules.get(value) || [];
        if (!isValid(value, values, rulesForValue)) {
            isValidLine = false;
            break;
        }
    }
    return isValidLine;

}

export function isValid(value:string, values:string[], valuesThatNeedToComeAfter:string[]):boolean {
    if (value === '') {
        return false;
    }
    const indexOfValue = values.indexOf(value);
    let isValid = true;
    for(const mustComeAfter  of valuesThatNeedToComeAfter) {
        if (value !== mustComeAfter) {
            const indexOfMustComeAfter = values.indexOf(mustComeAfter);
            if (indexOfMustComeAfter > -1) {
                const distance = indexOfMustComeAfter - indexOfValue;
                if (distance < 0) {
                    isValid = false;
                    break;
                }
            }
        }
    }
    return isValid;
}

export function parseRules(rulesDeclarations:string[]) : Map<string, Array<string>> {
    const rulesMap = new Map<string, Array<string>>();
    rulesDeclarations.forEach(declaration => {
        const ruleSplit = declaration.split('|');
        if (ruleSplit.length > 1) {
            const rule = ruleSplit[0];
            for(let nextIdx = 1; nextIdx < ruleSplit.length; nextIdx++) {
                const mustComeNext = rulesMap.get(rule);
                if (mustComeNext) {
                    mustComeNext.push(ruleSplit[nextIdx]);
                } else {
                    rulesMap.set(rule, [ruleSplit[nextIdx]]);
                }
            }
        }
    });
    return rulesMap;
}

if (import.meta.main) {
    const ruleLines = await Deno.readTextFile('./data/aoc_5_rules.txt').then(content => content.split('\r\n'));
    const valueLines = await Deno.readTextFile('./data/aoc_5_ordered_values.txt').then(content => content.split('\r\n'));
    const rulesMap = parseRules(ruleLines);
    console.log('Rules: ', rulesMap);
    const sumOfValid = sumUpAllMiddleValuesOfValidOrderedLines(valueLines, rulesMap);
    const sumOfReorderedInvalid = sumUpMiddleValuesOfReorderedInvalidOrderedLines(valueLines, rulesMap);

    
    console.log('Amount of correct middles:', sumOfValid);
    console.log('Amount of incorrect ordered after reordering middles:', sumOfReorderedInvalid);
}

function sumUpAllMiddleValuesOfValidOrderedLines(valueLines: string[], rulesMap: Map<string, string[]>) {
    let amountOfAllMiddleValues = 0;
    valueLines.forEach(valueLine => {
        const values = valueLine.split(',');
        if (isValidLine(values, rulesMap)) {
            const middleIndex = Math.round(values.length / 2) -1;
            amountOfAllMiddleValues += parseInt(values[middleIndex]);
        }
    });
    return amountOfAllMiddleValues;
}

function sumUpMiddleValuesOfReorderedInvalidOrderedLines(valueLines: string[], rulesMap: Map<string, string[]>) {
    let amountOfAllMiddleValues = 0;
    valueLines.forEach(valueLine => {
        const values = valueLine.split(',');
        if (!isValidLine(values, rulesMap)) {
            values.sort((a , b) => sortByRules(a, b, rulesMap));
            const middleIndex = Math.round(values.length / 2) -1;
            amountOfAllMiddleValues += parseInt(values[middleIndex]);
        }
    });
    return amountOfAllMiddleValues;
}

function sortByRules(a: string, b: string, rulesMap: Map<string, string[]>): number {
    const valuesToComeAfterA = rulesMap.get(a) || [];
    const valuesToComeAfterB = rulesMap.get(b) || [];
    if (valuesToComeAfterA.indexOf(b) >= 0) {
        return -1;
    } else if (valuesToComeAfterB.indexOf(a) >= 0) {
        return 1;
    } else {
        return 0;
    }
}
