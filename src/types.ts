type Rail = { x1: number; x2: number; y: number; type: 'rail' };
type OtherRailElement = { x: number; y: number; type: 'other' };

export type Segment = Rail | OtherRailElement;

export type Block = { x: number; y: number; };