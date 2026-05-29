import type {Block, Rail, Segment} from "./types.ts";
import {scaleToBigInt} from "./helpers/bigint-conversion.ts";
import {compareSegments} from "./helpers/sort.ts";

export function findThermalBlocks(segments: Segment[]) {
    const filteredSegments = segments.filter(segment => segment.type === "rail");
    const sortedSegments = filteredSegments.sort(compareSegments)
    const blocks: Block[] = [];

    let prev: Rail | undefined;
    let consecutiveLength = BigInt(0);
    for (let i = 0; i < sortedSegments.length - 1; i++) {
        const current = sortedSegments[i];
        const difference = scaleToBigInt(current.x2) - scaleToBigInt(current.x1);
        if (prev === undefined || current.y !== prev.y || current.x1 !== prev.x2) {
            prev = current;
            consecutiveLength = difference;
            continue;
        }

        consecutiveLength += difference;
        if (consecutiveLength > scaleToBigInt(500)) {
            blocks.push({ x: prev.x2, y: prev.y })
            consecutiveLength = difference;
        }
        prev = current;
    }

    return blocks;
}