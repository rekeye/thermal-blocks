import {scaleToBigInt} from "./bigint-conversion.ts";

describe('bigint conversion', () => {
    test('should convert 2.5923 to 2592300n', () => {
        expect(scaleToBigInt(2.5923)).toBe(2592300n);
    });
    test('should convert integer 1 to 1000000n', () => {
        expect(scaleToBigInt(1)).toBe(1000000n);
    });
    test('should convert 0 to 0n', () => {
        expect(scaleToBigInt(0)).toBe(0n);
    });
    test('should convert 1.5 to 1500000n', () => {
        expect(scaleToBigInt(1.5)).toBe(1500000n);
    });
    test('should convert -1 to -1000000n', () => {
        expect(scaleToBigInt(-1)).toBe(-1000000n);
    });
    test('should convert -2.5923 to -2592300n', () => {
        expect(scaleToBigInt(-2.5923)).toBe(-2592300n);
    });
    test('should convert 0.000001 to 1n', () => {
        expect(scaleToBigInt(0.000001)).toBe(1n);
    });
    test('should convert 1.123456 to 1123456n', () => {
        expect(scaleToBigInt(1.123456)).toBe(1123456n);
    });
    test('should correctly handle float imprecision: 0.1 + 0.2', () => {
        expect(scaleToBigInt(0.1 + 0.2)).toBe(300000n); // 0.30000000000000004 raw
    });
    test('should correctly handle float imprecision: 1.1 + 2.2', () => {
        expect(scaleToBigInt(1.1 + 2.2)).toBe(3300000n); // 3.3000000000000003 raw
    });
    test('should convert 1000000 to 1000000000000n', () => {
        expect(scaleToBigInt(1000000)).toBe(1000000000000n);
    });
    test('should convert 9999.999999 to 9999999999n', () => {
        expect(scaleToBigInt(9999.999999)).toBe(9999999999n);
    });
    test('should round down 1.0000004 to 1000000n', () => {
        expect(scaleToBigInt(1.0000004)).toBe(1000000n);
    });
    test('should round up 1.0000005 to 1000001n', () => {
        expect(scaleToBigInt(1.0000005)).toBe(1000001n);
    });
    test('should round down -1.0000004 to -1000000n', () => {
        expect(scaleToBigInt(-1.0000004)).toBe(-1000000n);
    });
    test('should round up -1.0000005 to -1000001n', () => {
        expect(scaleToBigInt(-1.0000005)).toBe(-1000001n);
    });
});