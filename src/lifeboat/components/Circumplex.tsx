import { SEGMENT_LABELS } from "../scoring";

interface Props {
  x: number;
  y: number;
  primarySegmentIndex: number;
}

// Canvas geometry — SVG user units. Larger canvas + outer labels outside the
// cardinal letters fixes radial overlap (I vs "people-focused", C vs "task-focused").
const SIZE = 400;
const CENTER = SIZE / 2;
const INNER = 66;
const OUTER = 134;
const RING_INNER = 139;
const RING_OUTER = 152;
const SUB_LABEL_R = 114;
// D/I/S/C sit just outside the data plate, *inside* the coloured ring band
const MAIN_LABEL_R = 124;
// Descriptor phrases sit clearly outside the ring, at *non-cardinal* angles so
// they never share a ray with the big letters (main source of overlap).
const AXIS_LABEL_R = 196;
// Small nudge from exact cardinals — keeps "fast/stable" clear of "D" / "S"
const AXIS_FAST = 6;
const AXIS_STABLE = 186;
const AXIS_PEOPLE = 108;
const AXIS_TASK = 252;

const DIM_COLOR = {
  D: "hsl(var(--disc-d))",
  I: "hsl(var(--disc-i))",
  S: "hsl(var(--disc-s))",
  C: "hsl(var(--disc-c))",
} as const;

// Which dimension owns each 12-segment slot.
// Order matches SEGMENT_LABELS: D, Di, iD, I, iS, Si, S, Sc, Cs, C, Cd, Dc
const SEGMENT_OWNER: Array<keyof typeof DIM_COLOR> = [
  "D", "D", "I", "I", "I", "S", "S", "S", "C", "C", "C", "D",
];

const Circumplex = ({ x, y, primarySegmentIndex }: Props) => {
  const maxRadius = 32;
  const clampedRadius = Math.min(Math.sqrt(x * x + y * y), maxRadius);
  const scale = clampedRadius === 0 ? 0 : (OUTER - 10) * (clampedRadius / maxRadius) / clampedRadius;
  const dotX = CENTER + x * scale;
  const dotY = CENTER - y * scale;

  const highlightOwner = SEGMENT_OWNER[primarySegmentIndex];

  const segments = SEGMENT_LABELS.map((label, i) => ({
    label,
    startAngle: i * 30 - 15,
    endAngle: i * 30 + 15,
    labelAngle: i * 30,
    index: i,
    owner: SEGMENT_OWNER[i],
  }));

  const quadrants: Array<{ dim: keyof typeof DIM_COLOR; start: number; end: number }> = [
    { dim: "D", start: -45, end: 45 },
    { dim: "I", start: 45, end: 135 },
    { dim: "S", start: 135, end: 225 },
    { dim: "C", start: 225, end: 315 },
  ];

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="w-full max-w-[min(100%,380px)] mx-auto overflow-visible"
      role="img"
      aria-label="DISC circumplex — your behavioral-style position on four dimensions"
    >
      <defs>
        <radialGradient id="cp-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--primary) / 0.06)" />
          <stop offset="100%" stopColor="hsl(var(--primary) / 0)" />
        </radialGradient>
      </defs>

      <circle cx={CENTER} cy={CENTER} r={OUTER} fill="url(#cp-bg)" />
      <circle cx={CENTER} cy={CENTER} r={OUTER} fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
      <circle cx={CENTER} cy={CENTER} r={INNER} fill="none" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="2 3" />

      {quadrants.map((q) => (
        <path
          key={`ring-${q.dim}`}
          d={describeRingArc(CENTER, CENTER, RING_INNER, RING_OUTER, q.start, q.end)}
          fill={DIM_COLOR[q.dim]}
          opacity={0.38}
        />
      ))}

      {segments.map((seg) => {
        const a1 = discAngleToMathRad(seg.startAngle);
        const x1 = CENTER + INNER * Math.cos(a1);
        const y1 = CENTER - INNER * Math.sin(a1);
        const x2 = CENTER + OUTER * Math.cos(a1);
        const y2 = CENTER - OUTER * Math.sin(a1);
        return (
          <line
            key={`div-${seg.label}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="hsl(var(--border))"
            strokeWidth="1"
          />
        );
      })}

      {/* Primary segment — tint matches the segment's DISC colour (clearer than generic gold) */}
      {segments.map((seg) =>
        seg.index === primarySegmentIndex ? (
          <path
            key={`hl-${seg.label}`}
            d={describeWedge(CENTER, CENTER, OUTER, seg.startAngle, seg.endAngle)}
            fill={DIM_COLOR[highlightOwner]}
            fillOpacity={0.16}
            stroke={DIM_COLOR[highlightOwner]}
            strokeOpacity={0.85}
            strokeWidth="1.25"
          />
        ) : null
      )}

      {segments.map((seg) => {
        const isAxis = seg.label.length === 1;
        if (isAxis) return null;
        const rad = discAngleToMathRad(seg.labelAngle);
        const lx = CENTER + SUB_LABEL_R * Math.cos(rad);
        const ly = CENTER - SUB_LABEL_R * Math.sin(rad);
        return (
          <text
            key={`sub-${seg.label}`}
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground/55"
            fontSize="9"
            fontFamily="'JetBrains Mono', monospace"
            fontWeight={400}
          >
            {seg.label}
          </text>
        );
      })}

      {(["D", "I", "S", "C"] as const).map((dim) => {
        const labelAngle = dim === "D" ? 0 : dim === "I" ? 90 : dim === "S" ? 180 : 270;
        const rad = discAngleToMathRad(labelAngle);
        const lx = CENTER + MAIN_LABEL_R * Math.cos(rad);
        const ly = CENTER - MAIN_LABEL_R * Math.sin(rad);
        return (
          <text
            key={`main-${dim}`}
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={DIM_COLOR[dim]}
            fontSize="15"
            fontFamily="'JetBrains Mono', monospace"
            fontWeight={700}
            letterSpacing="0.04em"
          >
            {dim}
          </text>
        );
      })}

      <AxisLineLabel discAngle={AXIS_FAST} r={AXIS_LABEL_R} line1="fast" line2="pace" />
      <AxisLineLabel discAngle={AXIS_STABLE} r={AXIS_LABEL_R} line1="stable" line2="pace" />
      <AxisLineLabel discAngle={AXIS_TASK} r={AXIS_LABEL_R} line1="task-" line2="focused" />
      <AxisLineLabel discAngle={AXIS_PEOPLE} r={AXIS_LABEL_R} line1="people-" line2="focused" />

      <circle cx={dotX} cy={dotY} r="6.5" fill="hsl(var(--primary))" stroke="hsl(var(--background))" strokeWidth="2" />
      <circle cx={dotX} cy={dotY} r="13" fill="none" stroke="hsl(var(--primary) / 0.35)" strokeWidth="1" />
    </svg>
  );
};

/** Two short lines reduce horizontal extent vs one long string — avoids clashes at any viewport size */
const AxisLineLabel = ({
  discAngle,
  r,
  line1,
  line2,
}: {
  discAngle: number;
  r: number;
  line1: string;
  line2: string;
}) => {
  const rad = discAngleToMathRad(discAngle);
  const lx = CENTER + r * Math.cos(rad);
  const ly = CENTER - r * Math.sin(rad);
  const lineHeight = 9;
  return (
    <text
      x={lx}
      y={ly}
      textAnchor="middle"
      dominantBaseline="middle"
      className="fill-foreground/55"
      fontSize="8"
      fontFamily="'Inter', sans-serif"
      fontStyle="italic"
      letterSpacing="0.02em"
    >
      <tspan x={lx} dy="-3.5">
        {line1}
      </tspan>
      <tspan x={lx} dy={lineHeight}>
        {line2}
      </tspan>
    </text>
  );
};

function discAngleToMathRad(discAngle: number) {
  return ((90 - discAngle) * Math.PI) / 180;
}

function polarToCartesian(cx: number, cy: number, r: number, discAngle: number) {
  const rad = discAngleToMathRad(discAngle);
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}

function describeWedge(cx: number, cy: number, r: number, startDisc: number, endDisc: number) {
  const start = polarToCartesian(cx, cy, r, startDisc);
  const end = polarToCartesian(cx, cy, r, endDisc);
  const sweep = 1;
  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 0 ${sweep} ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

function describeRingArc(
  cx: number,
  cy: number,
  rInner: number,
  rOuter: number,
  startDisc: number,
  endDisc: number
) {
  const deltaDisc = ((endDisc - startDisc) % 360 + 360) % 360;
  const largeArc = deltaDisc > 180 ? 1 : 0;
  const outerStart = polarToCartesian(cx, cy, rOuter, startDisc);
  const outerEnd = polarToCartesian(cx, cy, rOuter, endDisc);
  const innerEnd = polarToCartesian(cx, cy, rInner, endDisc);
  const innerStart = polarToCartesian(cx, cy, rInner, startDisc);
  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
}

export default Circumplex;
