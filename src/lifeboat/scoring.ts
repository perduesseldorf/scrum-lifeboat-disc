// DISC scoring logic.
// Source of truth: CONTENT.md Section 5.
// Pure functions only; no side effects, no storage.

import type { Dim } from "./content";

export type Intensity = "strong" | "clear" | "emerging" | "inverted";

export interface Answer {
  itemId: number;
  most: Dim;
  least: Dim;
}

export interface Scores {
  D: number;
  I: number;
  S: number;
  C: number;
}

export interface Result {
  scores: Scores;
  primary: Dim;
  secondary: Dim;
  gap: number;
  showSecondary: boolean;
  intensity: Intensity;
  segment: {
    index: number;
    label: string;
    angleDeg: number;
    x: number;
    y: number;
    radius: number;
  };
  isTie: boolean;
  validity: {
    rushedOrGamed: boolean;
  };
}

const DIMS: Dim[] = ["D", "I", "S", "C"];

export const SEGMENT_LABELS = [
  "D",  "Di", "iD",
  "I",  "iS", "Si",
  "S",  "Sc", "Cs",
  "C",  "Cd", "Dc",
] as const;

export function computeScores(answers: Answer[]): Scores {
  const s: Scores = { D: 0, I: 0, S: 0, C: 0 };
  for (const a of answers) {
    s[a.most] += 1;
    s[a.least] -= 1;
  }
  return s;
}

export function computeResult(answers: Answer[]): Result {
  const scores = computeScores(answers);

  const sorted = DIMS
    .map((d) => ({ dim: d, value: scores[d] }))
    .sort((a, b) => b.value - a.value);

  const primary = sorted[0].dim;
  const secondary = sorted[1].dim;
  const gap = sorted[0].value - sorted[1].value;
  const isTie = sorted[0].value === sorted[1].value;
  const showSecondary = gap <= 8 && !isTie;

  let intensity: Intensity;
  const top = sorted[0].value;
  if (top < 0) intensity = "inverted";
  else if (top >= 16) intensity = "strong";
  else if (top >= 8) intensity = "clear";
  else intensity = "emerging";

  const x = scores.I - scores.C;
  const y = scores.D - scores.S;
  const angleRad = Math.atan2(y, x);
  let angleDeg = (angleRad * 180) / Math.PI;
  if (angleDeg < 0) angleDeg += 360;

  const discAngle = ((90 - angleDeg) % 360 + 360) % 360;
  const segmentIndex = Math.floor((discAngle + 15) / 30) % 12;
  const segmentLabel = SEGMENT_LABELS[segmentIndex];
  const radius = Math.sqrt(x * x + y * y);

  const mostCount: Scores = { D: 0, I: 0, S: 0, C: 0 };
  for (const a of answers) mostCount[a.most] += 1;
  const maxMost = Math.max(mostCount.D, mostCount.I, mostCount.S, mostCount.C);
  const rushedOrGamed = maxMost > 20;

  return {
    scores,
    primary,
    secondary,
    gap,
    showSecondary,
    intensity,
    segment: { index: segmentIndex, label: segmentLabel, angleDeg, x, y, radius },
    isTie,
    validity: { rushedOrGamed },
  };
}

export function headerText(r: Result, dimName: Record<Dim, string>): { main: string; sub?: string } {
  if (r.intensity === "inverted") {
    return {
      main: "No clear preference emerged",
      sub: "None of the four dimensions stood out in your answers. That's unusual in a short instrument and usually means you were deliberately flexible. The blocks below still describe the four styles; pick the one that resonates most.",
    };
  }
  if (r.isTie) {
    return {
      main: `Co-primary: ${dimName[r.primary]} and ${dimName[r.secondary]}`,
      sub: "Two dimensions came out equally strong. This happens with highly adaptive respondents. Read both primary blocks below.",
    };
  }
  const intensityWord = r.intensity.charAt(0).toUpperCase() + r.intensity.slice(1);
  if (r.showSecondary) {
    return { main: `${intensityWord} ${dimName[r.primary]}, with a ${dimName[r.secondary]} secondary` };
  }
  return { main: `${intensityWord} ${dimName[r.primary]} preference` };
}

// Fisher-Yates, seeded deterministically per session so that the option order
// stays stable across re-renders within the same test session.
export function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = arr.slice();
  let s = seed | 0;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) | 0;
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
