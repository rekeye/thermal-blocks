import type {Block, Rail, Segment} from "./types.ts";
import {scaleToBigInt} from "./helpers/bigint-conversion.ts";
import {compareSegments} from "./helpers/sort.ts";

export function findThermalBlocks(segments: Segment[]) {
    const sortedSegments = segments.sort(compareSegments)
    const blocks: Block[] = [];

    let prev: Rail | undefined;
    let consecutiveLength = BigInt(0);
    for (let i = 0; i < sortedSegments.length - 1; i++) {
        const current = sortedSegments[i];
        if (current.type !== "rail") continue;

        const x1 = scaleToBigInt(current.x1);
        const x2 = scaleToBigInt(current.x2);
        if (prev === undefined || current.y !== prev.y || current.x1 !== prev.x2) {
            prev = current;
            consecutiveLength = x2 - x1;
            continue;
        }

        consecutiveLength += x2 - x1;
        if (consecutiveLength > scaleToBigInt(500)) {
            blocks.push({ x: prev.x2, y: prev.y })
            consecutiveLength = x2 - x1;
        }
        prev = current;
    }

    return blocks;
}