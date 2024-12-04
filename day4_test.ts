import { assertEquals } from "@std/assert/equals";
import { checkXmasOcurrences } from "./day4.ts";

Deno.test("0 is returned for 1-line with three chars.", () => {
    const matrix : string[][]=[];
    matrix.push([..."XMA"]);
    console.log('Matrix is: ', matrix);
    assertEquals(checkXmasOcurrences(matrix), 0);
});

Deno.test("1 is returned for 1-line with 'XMAS''.", () => {
    const matrix : string[][]=[];
    matrix.push([..."XMAS"]);
    assertEquals(checkXmasOcurrences(matrix), 1);
});

Deno.test("3 is returned for 1-line with 'XMASSAMXMAS''.", () => {
    const matrix : string[][]=[];
    matrix.push([..."XMASAMXMAS"]);
    assertEquals(checkXmasOcurrences(matrix), 3);
});

Deno.test("2 is returned for 1-line with 'XMASAMX''.", () => {
    const matrix : string[][]=[];
    matrix.push([..."XMASAMX"]);
    assertEquals(checkXmasOcurrences(matrix), 2);
});

Deno.test("2 is returned for 2-line with 'XMAS\nXMAS''.", () => {
    const matrix : string[][]=[];
    matrix.push([..."XMAS"]);
    matrix.push([..."XMAS"]);
    assertEquals(checkXmasOcurrences(matrix), 2);
});

Deno.test("1 is returned for 2-line with 'XMAS'T'.", () => {
    const matrix : string[][]=[];
    matrix.push([..."X"]);
    matrix.push([..."M"]);
    matrix.push([..."A"]);
    matrix.push([..."S"]);
    assertEquals(checkXmasOcurrences(matrix), 1);
});

Deno.test("2 is returned for 2-line with 'XMAS\nSAMX'T'.", () => {
    const matrix : string[][]=[];
    matrix.push([..."XS"]);
    matrix.push([..."MA"]);
    matrix.push([..."AM"]);
    matrix.push([..."SX"]);
    assertEquals(checkXmasOcurrences(matrix), 2);
});

Deno.test("1 is returned for having XMAS vertical up-right and down-right.", () => {
    const matrix : string[][]=[];
    matrix.push([..."XSMS"]);
    matrix.push([..."MMAM"]);
    matrix.push([..."MMAM"]);
    matrix.push([..."XMMS"]);
    assertEquals(checkXmasOcurrences(matrix), 2);
});

Deno.test("18 is returned for example on aoc part 1 description.", () => {
    const matrix : string[][]=[];
    matrix.push([..."MMMSXXMASM"]);
    matrix.push([..."MSAMXMSMSA"]);
    matrix.push([..."AMXSXMAAMM"]);
    matrix.push([..."MSAMASMSMX"]);
    matrix.push([..."XMASAMXAMM"]);
    matrix.push([..."XXAMMXXAMA"]);
    matrix.push([..."SMSMSASXSS"]);
    matrix.push([..."SAXAMASAAA"]);
    matrix.push([..."MAMMMXMMMM"]);
    matrix.push([..."MXMXAXMASX"]);

    assertEquals(checkXmasOcurrences(matrix), 18);
});


