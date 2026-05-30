# Thermal Break Detection for Rail Segments

Given an array of inputs, detects where thermal breaks must be placed along horizontal rail runs, based on a maximum continuous length of 500 inches.

---

## Input Types

```ts
type Rail = {
    x1: number;
    x2: number;
    y: number;
    type: "rail";
};
type OtherRailElement = {
    x: number;
    y: number;
    type: "other";
};
```

## Solution

1. **Filter** — keep only `rail` elements
2. **Sort** — by `y` ascending, then `x1` ascending
3. **Sweep** — for each `y` group, walk segments in order:
    - Two segments are considered continuous if `(current.x1 - previous.x2) ≤ 1e-6`
    - Accumulate length; when the total would exceed 500 inches, emit a break at the previous segment's `x2` and reset
    - A gap between segments starts a new chain

Overall complexity is `O(n log n)`, dominated by the sort.

## Output

```ts
{
    x: number;
    y: number;
}[]
```

An array of coordinates where thermal breaks should be placed.

## Usage

```bash
bun install   # install dependencies
bun solution      # run the algorithm
bun test      # run tests
```