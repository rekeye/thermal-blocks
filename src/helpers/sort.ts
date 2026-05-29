import type {Rail} from "../types.ts";
import {scaleToBigInt} from "./bigint-conversion.ts";

function ascending(a: number, b: number) {
    const bigintDiff = scaleToBigInt(a) - scaleToBigInt(b);
    return bigintDiff > 0n ? 1 : bigintDiff < 0n ? -1 : 0;
}

export function compareRails(a: Rail, b: Rail) {
    if (a.y === b.y) {
        return ascending(a.x1, b.x1)
    }
    return ascending(a.y, b.y)
}
