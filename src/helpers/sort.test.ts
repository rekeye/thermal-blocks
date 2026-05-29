import { compareSegments } from "./sort.ts";
import type { Segment } from "../types.ts";

const rail = (y: number, x1: number): Segment => ({ type: "rail", y, x1, x2: x1+120 });
const other = (y: number, x: number): Segment => ({ type: "other", y, x });

describe('compareSegments', () => {
    describe('different y values', () => {
        test('returns negative when a.y < b.y', () => {
            expect(compareSegments(rail(1, 0), rail(2, 0))).toBe(-1);
        });

        test('returns positive when a.y > b.y', () => {
            expect(compareSegments(rail(2, 0), rail(1, 0))).toBe(1);
        });

        test('returns 0 when a.y === b.y and both non-rail', () => {
            expect(compareSegments(other(1, 0), other(1, 0))).toBe(0);
        });

        test('ignores x1 when y values differ, even for rails', () => {
            expect(compareSegments(rail(1, 99), rail(2, 0))).toBe(-1);
        });
    });
    describe('same y, both rails', () => {
        test('returns negative when a.x1 < b.x1', () => {
            expect(compareSegments(rail(1, 1), rail(1, 2))).toBe(-1);
        });

        test('returns positive when a.x1 > b.x1', () => {
            expect(compareSegments(rail(1, 2), rail(1, 1))).toBe(1);
        });

        test('returns 0 when a.x1 === b.x1', () => {
            expect(compareSegments(rail(1, 1), rail(1, 1))).toBe(0);
        });
    });
    describe('same y, mixed types', () => {
        test('returns 0 by y when a is rail but b is not', () => {
            expect(compareSegments(rail(1, 0), other(1, 99))).toBe(0);
        });

        test('returns 0 by y when b is rail but a is not', () => {
            expect(compareSegments(other(1, 99), rail(1, 0))).toBe(0);
        });

        test('returns 0 when both are non-rail with same y', () => {
            expect(compareSegments(other(1, 0), other(1, 99))).toBe(0);
        });
    });
    describe('floating point y values', () => {
        test('handles float imprecision in y comparison', () => {
            expect(compareSegments(rail(0.1 + 0.2, 0), rail(0.3, 0))).toBe(0);
        });

        test('correctly orders close but distinct y values', () => {
            expect(compareSegments(rail(1.000001, 0), rail(1.000002, 0))).toBe(-1);
        });
    });
    describe('negative coordinates', () => {
        test('handles negative y values', () => {
            expect(compareSegments(rail(-2, 0), rail(-1, 0))).toBe(-1);
        });

        test('handles negative x1 for rails at same y', () => {
            expect(compareSegments(rail(0, -2), rail(0, -1))).toBe(-1);
        });

        test('handles mixed sign x1 for rails at same y', () => {
            expect(compareSegments(rail(0, -1), rail(0, 1))).toBe(-1);
        });
    });
});