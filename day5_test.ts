import { assertEquals } from "@std/assert/equals";
import { isValid, isValidLine, parseRules } from "./day5.ts"

Deno.test("is not valid because 1 needs to come after 2", () => {
     assertEquals(isValid('2', ['1', '2'], ['1']), false);
});

Deno.test("is not valid because 2 needs to come after 1", () => {
    assertEquals(isValid('2', ['1', '2'], ['3']), true);
});


Deno.test('Valid line from aoc puzzle example', () => {
    const ruleDeclarations = getPuzzleExampleRuleLines();

    assertEquals(isValidLine(['75','47','61','53','29'], parseRules(ruleDeclarations)), true);
});

Deno.test('Second valid line from aoc puzzle example', () => {
    const ruleDeclarations = getPuzzleExampleRuleLines();

    assertEquals(isValidLine(['97','61','53','29','13'], parseRules(ruleDeclarations)), true);
});


Deno.test('Third valid line from aoc puzzle example', () => {
    const ruleDeclarations = getPuzzleExampleRuleLines();

    assertEquals(isValidLine(['75','29','13'], parseRules(ruleDeclarations)), true)
});

Deno.test('Invalid line from aoc puzzle example', () => {
    const ruleDeclarations = getPuzzleExampleRuleLines();

    assertEquals(isValidLine(['75','97','47','61','53'], parseRules(ruleDeclarations)), false);
});

function getPuzzleExampleRuleLines():string[] {
    const ruleDeclarations = []
    ruleDeclarations.push('47|53');
    ruleDeclarations.push('97|13');
    ruleDeclarations.push('97|61');
    ruleDeclarations.push('97|47');
    ruleDeclarations.push('75|29');
    ruleDeclarations.push('61|13');
    ruleDeclarations.push('75|53');
    ruleDeclarations.push('29|13');
    ruleDeclarations.push('97|29');
    ruleDeclarations.push('53|29');
    ruleDeclarations.push('61|53');
    ruleDeclarations.push('97|53');
    ruleDeclarations.push('61|29');
    ruleDeclarations.push('47|13');
    ruleDeclarations.push('75|47');
    ruleDeclarations.push('97|75');
    ruleDeclarations.push('47|61');
    ruleDeclarations.push('75|61');
    ruleDeclarations.push('47|29');
    ruleDeclarations.push('75|13');
    ruleDeclarations.push('53|13');
    return ruleDeclarations;
}