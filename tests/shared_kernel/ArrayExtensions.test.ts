import { describe, it } from "node:test";
import assert from "assert/strict";
import "../../src/shared_kernel/ArrayExtensions";
import { areArraysEqual } from "../utilities";

describe("zipWith()", () => {
  it("should correctly zip 2 arrays with same length", () => {
    // arrange
    const first: number[] = [1, 2, 3] 
    const second: string[] = ["first", "second", "third"]
    const want = [[1, "first"], [2, "second"], [3, "third"]]

    // act
    const have = first.zipWith(second)

    // assert
    assert.ok(areArraysEqual(want, have))
  })

  it("should return a new zipped array with the shortest length of the input arrays", () => {
    // arrange
    const first: number[] = [1, 2, 3] 
    const second: string[] = ["first", "second", "third", "fourth", "fifth"]
    const wantLength = Math.min(first.length, second.length)
    const want = [[1, "first"], [2, "second"], [3, "third"]]

    // act
    const have = first.zipWith(second)
    const haveLength = have.length
    
    // arrange
    assert.ok(areArraysEqual(want, have))
    assert.strictEqual(wantLength, haveLength)
  })

  it("should correctly zip more than two arrays together", () => {
    // arrange
    const first: number[] = [1, 2, 3, 4]
    const second: string[] = ["alpha", "beta", "gamma"]
    const third: boolean[] = [true, false]
    const want = [[1, "alpha", true], [2, "beta", false]]
    
    // act
    const have = first.zipWith(second, third)

    // assert
    assert.ok(areArraysEqual(want, have))
  })

  it("should change the result depending on the order of function call", () => {
    // arrange
    const first: number[] = [1, 2, 3] 
    const second: string[] = ["first", "second", "third"]
    const want = [["first", 1], ["second", 2], ["third", 3]]

    // act
    const have = second.zipWith(first)

    // assert
    assert.ok(areArraysEqual(want, have))
  })
})