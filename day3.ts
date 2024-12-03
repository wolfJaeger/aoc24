
export function evaluateMultiplies(multiplies:string):number {
    if (multiplies === '') {
        return 0
    } else {
        const extractMultiplies = /(mul\(\d+,\d+\))/g;
        let sumOfMultiplications = 0;
        for (const singleMultiply of multiplies.matchAll(extractMultiplies)) {
            sumOfMultiplications += evaluateMultipy(singleMultiply[1]);
        }
        //console.log('Sum is: ', sumOfMultiplications);
        return sumOfMultiplications;
    }
}

export function evaluateMultipy(singleMultiplication:string):number {
    const extractNumbers = /mul\((\d+),(\d+)\)/g;
    const extractedNumbers = extractNumbers.exec(singleMultiplication);
    //console.log('Extracting original', singleMultiplication);
    if (extractedNumbers != null) {
        const multiplicationResult = parseInt(extractedNumbers[1]) * parseInt(extractedNumbers[2]);
        console.log('Multiply: ', singleMultiplication, ' = ', multiplicationResult);
        return multiplicationResult;
    } else {
        return 0;
    }
}


if (import.meta.main) {
    let sumOfAllLines = 0;
    const completeFileContent = await Deno.readTextFile('./data/aoc_3_1.txt');
     
    // Part 1
    for(const line of completeFileContent.split('\n')) {
        sumOfAllLines += evaluateMultiplies(line);
    }

    // Part 2
    const withoutDisabledInstructions = completeFileContent.replaceAll(/don't\(\).*?do\(\)|don't\(\).*$/gs, '');
    const sumOfCompleteContentWithoutDisabledInstructions = evaluateMultiplies(withoutDisabledInstructions);

    console.log('Sum of all multiplies: ', sumOfAllLines);
    console.log('Sum of all enabled multiplies: ', sumOfCompleteContentWithoutDisabledInstructions);
}