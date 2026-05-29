import {compareRails} from "./sort.ts";
import {Rail} from "../types.ts";

const rail = (y: number, x1: number): Rail => ({ type: "rail", y, x1, x2: x1+120 });

describe('compareSegments', () => {
    describe('different y values', () => {
        test('returns negative when a.y < b.y', () => {
            expect(compareRails(rail(1, 0), rail(2, 0))).toBe(-1);
        });

        test('returns positive when a.y > b.y', () => {
            expect(compareRails(rail(2, 0), rail(1, 0))).toBe(1);
        });

        test('ignores x1 when y values differ', () => {
            expect(compareRails(rail(1, 99), rail(2, 0))).toBe(-1);
        });
    });
    describe('same y', () => {
        test('returns negative when a.x1 < b.x1', () => {
            expect(compareRails(rail(1, 1), rail(1, 2))).toBe(-1);
        });

        test('returns positive when a.x1 > b.x1', () => {
            expect(compareRails(rail(1, 2), rail(1, 1))).toBe(1);
        });

        test('returns 0 when a.x1 === b.x1', () => {
            expect(compareRails(rail(1, 1), rail(1, 1))).toBe(0);
        });
    });
    describe('floating point y values', () => {
        test('handles float imprecision in y comparison', () => {
            expect(compareRails(rail(0.1 + 0.2, 0), rail(0.3, 0))).toBe(0);
        });

        test('correctly orders close but distinct y values', () => {
            expect(compareRails(rail(1.000001, 0), rail(1.000002, 0))).toBe(-1);
        });
    });
    describe('negative coordinates', () => {
        test('handles negative y values', () => {
            expect(compareRails(rail(-2, 0), rail(-1, 0))).toBe(-1);
        });

        test('handles negative x1 for rails at same y', () => {
            expect(compareRails(rail(0, -2), rail(0, -1))).toBe(-1);
        });

        test('handles mixed sign x1 for rails at same y', () => {
            expect(compareRails(rail(0, -1), rail(0, 1))).toBe(-1);
        });
    });
});