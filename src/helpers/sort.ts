import type {Segment} from "../types.ts";
import {scaleToBigInt} from "./bigint-conversion.ts";

function ascending(a: number, b: number){
    const bigintDiff = scaleToBigInt(a) - scaleToBigInt(b);
    return bigintDiff > 0 ? 1 : bigintDiff < 0 ? -1 : 0;
}

export function compareSegments(a: Segment, b: Segment) {
    if (a.y === b.y && a.type === "rail" && b.type === "rail") return ascending(a.x1, b.x1)
    return ascending(a.y, b.y)
}
