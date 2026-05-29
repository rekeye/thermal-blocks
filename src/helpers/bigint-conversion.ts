export function scaleToBigInt(n: number) {
    const scaled = n * 1e6;
    const tolerance = scaled >= 0 ? 1e-9 : -1e-9;
    return BigInt(Math.round(scaled + tolerance));
}
export function scaleToFloat(n: bigint) {
    const scaled = Number(n / BigInt(1e6));
    return Number(scaled.toFixed(6));
}
