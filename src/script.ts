import type {Block, Rail, Segment} from "./types.ts";

function scaleToBigInt(n: number) {
    const scaled = n * 1e6;
    const tolerance = scaled >= 0 ? 1e-9 : -1e-9;
    return BigInt(Math.round(scaled + tolerance));
}
function scaleToFloat(n: bigint) {
    const scaled = Number(n / BigInt(1e6));
    return Number(scaled.toFixed(6));
}

const ascending = (a: number, b: number) => scaleToBigInt(a) - scaleToBigInt(b)

function compareSegments(a: Segment, b: Segment) {
    const result = a.y === b.y
        ? ascending(a.type === "rail" ? a.x1 : a.x, b.type === "rail" ? b.x1 : b.x)
        : ascending(a.y, b.y)

    return scaleToFloat(result)
}

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
            consecutiveLength = BigInt(0);
        }

        prev = current;
    }

    return blocks;
}