import { assertEquals } from "@std/assert";
import { isSecure, isSecureWithProblemDampener} from "./day2.ts";

Deno.test("isSecure is true for having one number", () => {
  assertEquals(isSecure(["1"]), true);
});

Deno.test("isSecure is true for having three number in ascending order", () => {
    assertEquals(isSecure(["1", "2", "3"]), true);
});

Deno.test("isSecure is true for having three number in descending order", () => {
    assertEquals(isSecure(["2", "1", "0"]), true);
});

Deno.test("isSecure is false when there is a neither asc nor descending part", () => {
    assertEquals(isSecure(["2", "1", "1"]), false);
});

Deno.test("isSecure is false when there is a change from ascending to descending", () => {
    assertEquals(isSecure(["2", "1", "3"]), false);
});

Deno.test("isSecure is false when two numbers have a bigger diff than 3", () => {
    assertEquals(isSecure(["2", "6"]), false);
});

Deno.test("isSecure is false when the sequence contains a difference > 3", () => {
    assertEquals(isSecure(["9", "7", "6", "2", "1"]), false);
});

Deno.test("freestyle 1", function freestyle1() {
    assertEquals(isSecure(["26", "25", "24", "22", "21", "19"]), true);
});


/** Tests for the second part */
Deno.test("isSecure using problem damper is true for descending", () => {
    assertEquals(isSecureWithProblemDampener(["7", "6", "4", "2", "1"]), true);
});

Deno.test("isSecure using problem damper is false for diff problem", () => {
    assertEquals(isSecureWithProblemDampener(["1", "2", "7", "8", "9"]), false);
});

Deno.test("isSecure using problem damper is false for diff problem", () => {
    assertEquals(isSecureWithProblemDampener(["9", "7", "6", "2", "1"]), false);
});

Deno.test("isSecure using problem damper is true by removing the second level, 3.", () => {
    assertEquals(isSecureWithProblemDampener(["1", "3", "2", "4", "5"]), true);
});

Deno.test("isSecure using problem damper is true by removing the third level, 4.", () => {
    assertEquals(isSecureWithProblemDampener(["8", "6", "4", "4", "1"]), true);
});

Deno.test("isSecure using problem damper is true without removing any level.", () => {
    assertEquals(isSecureWithProblemDampener(["1", "3", "6", "7", "9"]), true);
});