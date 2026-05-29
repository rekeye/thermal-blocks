import {findThermalBlocks} from "./script.ts";
import {TEST_INPUT_DATA} from "../data/test-data.ts";

const EXPECTED_OUTPUT = [
    { x: 390, y: 10 },
    { x: 450, y: 25 },
    { x: 500, y: 55 }
]

describe('findThermalBlocks integration test', () => {
    test('should respond with correct thermal break array', () => {
        expect(findThermalBlocks(TEST_INPUT_DATA)).toEqual(EXPECTED_OUTPUT)
    })
})