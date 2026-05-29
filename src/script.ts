import type {Block, Rail, Segment} from "./types.ts";
import {scaleToBigInt} from "./helpers/bigint-conversion.ts";
import {compareRails} from "./helpers/sort.ts";

export function findThermalBlocks(segments: Segment[]) {
    const rails = segments.filter(segment => segment.type === "rail");
    const sortedRails = rails.sort(compareRails)
    const blocks: Block[] = [];

    let prev: Rail | undefined;
    let consecutiveLength = 0n;
    for (let i = 0; i < sortedRails.length - 1; i++) {
        const current = sortedRails[i];
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