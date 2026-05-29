import type { Block, Segment } from "./types.ts";

const ascending = (a: number, b: number) => a - b

const compareSegments = (a: Segment, b: Segment) =>
    a.y === b.y
        ? ascending(a.type === "rail" ? a.x1 : a.x, b.type === "rail" ? b.x1 : b.x)
        : ascending(a.y, b.y)

export function findThermalBlocks(segments: Segment[]) {
    const blocks: Block[] = [];

    const sortedSegments = segments.sort(compareSegments)
    let consecutiveLength = 0;
    for (let i = 0; i < sortedSegments.length - 1; i++) {
        const current = sortedSegments[i];
        if (current.type !== "rail") continue;

        const prev = sortedSegments[i - 1];
        if (current.y !== prev.y) continue;

        consecutiveLength += 0;
    }

    return blocks;
}