// Canonical answer presets for mockup / lecture-dry-run demos.
// Each preset generates 24 answers that produce a specific target profile,
// so the speaker can skip the click-through and jump straight to the result
// screen. These are dev/demo tools only — they are surfaced through the
// "Demo" button on the landing screen.

import { TETRADS, type Dim } from "./content";
import type { Answer } from "./scoring";

type DimPattern = { most: Dim; least: Dim };

function buildPreset(patterns: DimPattern[]): Answer[] {
  if (patterns.length !== TETRADS.length) {
    throw new Error(
      `Demo preset must have ${TETRADS.length} patterns, got ${patterns.length}`
    );
  }
  return TETRADS.map((t, i) => ({
    itemId: t.id,
    most: patterns[i].most,
    least: patterns[i].least,
  }));
}

// DC Challenger: high D, close C secondary, pushed-down I and S.
// Expected scores: D = +13, C = +11, I = -13, S = -11.
// Produces: primary = D (clear), secondary = C, blend shown, segment = "Dc".
export const DEMO_DC_CHALLENGER: Answer[] = buildPreset([
  ...Array.from({ length: 13 }, () => ({ most: "D" as Dim, least: "I" as Dim })),
  ...Array.from({ length: 11 }, () => ({ most: "C" as Dim, least: "S" as Dim })),
]);
