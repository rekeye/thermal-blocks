import type {Block, Rail, Segment} from "../types.ts";
import {scaleToBigInt, scaleToFloat} from "./bigint-conversion.ts";

const ascending = (a: number, b: number) => scaleToBigInt(a) - scaleToBigInt(b)

export function compareSegments(a: Segment, b: Segment) {
    const result = a.y === b.y
        ? ascending(a.type === "rail" ? a.x1 : a.x, b.type === "rail" ? b.x1 : b.x)
        : ascending(a.y, b.y)

    return scaleToFloat(result)
}
