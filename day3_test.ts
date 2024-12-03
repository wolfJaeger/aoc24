import { assertEquals } from "@std/assert/equals";
import { evaluateMultiplies, evaluateMultipy} from "./day3.ts";

Deno.test('Single multipy is empty returns 0', () => {
    assertEquals(evaluateMultipy(''), 0);
});

Deno.test('mul(1,1) returns 1', () => {
    assertEquals(evaluateMultipy('mul(1,1)'), 1);
});

Deno.test("Return 0 for given string is empty", () => {
    assertEquals(evaluateMultiplies(''), 0, 'Expecting zero for empty string');
});

Deno.test('Return 1 for \'mul(1,1)\'', () => {
    assertEquals(evaluateMultiplies('mul(1,1)'), 1,);
});

Deno.test('Return 3 for \'mul(1,1)$kdkdmul(1,2)\'', () => {
    assertEquals(evaluateMultiplies('mul(1,1)$kdkdmul(1,2)'), 3,);
});

Deno.test('Return 161 for \'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))\'', () => {
    assertEquals(evaluateMultiplies('xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))'), 161);
});

Deno.test('Return  for \'mul(888,144)~$:,mul(517,97)@) ~mul(394,320)why()when()who()(,%mul(761,855)\'', () =>{
    assertEquals(evaluateMultiplies('xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))'), 161);
});


Deno.test('Some freestyle', () => {
    const withDisabledInstructions = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)don't()+mul(32,64](mul(11,8)undo()?mul(8,5))don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))don't()do anything";
    const expectedWithoutDisabledInstructions = "xmul(2,4)&mul[3,7]!^?mul(8,5))?mul(8,5))";
    const cleanedUp = withDisabledInstructions.replaceAll(/(don't\(\).*?do\(\))|()don't\(\).*?$/g, '');
    assertEquals(cleanedUp, expectedWithoutDisabledInstructions);
}); 


