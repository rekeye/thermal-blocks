import type { Block, Segment } from "./types.ts";

export function findThermalBlocks(segments: Segment[]) {
    const blocks: Block[] = [];

    const sortedSegments = segments.sort((prev, next) => prev.y - next.y)
    console.log(sortedSegments);

    return blocks;
}