import {findThermalBlocks} from "./script.ts";
import {TEST_INPUT_DATA} from "../data/test-data.ts";
import {INPUT_DATA} from "../data/task-data.ts";

const TEST_EXPECTED_OUTPUT = [
    { x: 390, y: 10 },
    { x: 450, y: 25 },
    { x: 500, y: 55 }
]

const EXPECTED_OUTPUT = [
    {
        x: 335,
        y: 54.08,
    }, {
        x: 671,
        y: 54.08,
    }, {
        x: 335,
        y: 80.87,
    }, {
        x: 671,
        y: 80.87,
    }
]

describe('findThermalBlocks integration test', () => {
    test('should respond with correct thermal break array, given test data', () => {
        expect(findThermalBlocks(TEST_INPUT_DATA)).toEqual(TEST_EXPECTED_OUTPUT)
    })
    test("should respond with correct thermal break array", () => expect(findThermalBlocks(INPUT_DATA)).toEqual(EXPECTED_OUTPUT))
})