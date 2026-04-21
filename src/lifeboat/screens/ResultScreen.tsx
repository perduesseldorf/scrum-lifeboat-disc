import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Pencil } from "lucide-react";
import type { Result } from "../scoring";
import {
  DIM_NAME,
  DIM_TAGLINE,
  PRIMARY_BLOCKS,
  SIGNATURE,
  TRAP,
  VALUABLE_WHEN,
  LIABILITY_WHEN,
  FRENCH_RAVEN,
  CROSS_COMM,
  LIFEBOAT_SIGNATURE,
  ARISTOTLE_HANDOVER,
  type Dim,
} from "../content";
import { headerText } from "../scoring";
import Circumplex from "../components/Circumplex";

interface Props {
  result: Result;
  onRestart: () => void;
  onAdjust?: () => void;
}

const DIMS: Dim[] = ["D", "I", "S", "C"];

// Tailwind class maps for the four DISC accents. Using explicit classes instead of
// template strings so Tailwind's JIT can pick them up at build time.
const DIM_TEXT: Record<Dim, string> = {
  D: "text-disc-d",
  I: "text-disc-i",
  S: "text-disc-s",
  C: "text-disc-c",
};

const DIM_BORDER_L: Record<Dim, string> = {
  D: "border-l-disc-d",
  I: "border-l-disc-i",
  S: "border-l-disc-s",
  C: "border-l-disc-c",
};

const DIM_BG_SOFT: Record<Dim, string> = {
  D: "bg-disc-d/10",
  I: "bg-disc-i/10",
  S: "bg-disc-s/10",
  C: "bg-disc-c/10",
};

const fmtScore = (n: number) => (n >= 0 ? `+${n}` : `${n}`.replace("-", "−"));

const ResultScreen = ({ result, onRestart, onAdjust }: Props) => {
  const header = headerText(result, DIM_NAME);
  const showInverted = result.intensity === "inverted";
  const showBlend = result.showSecondary && !result.isTie && !showInverted;
  const primaryDims: Dim[] = showInverted
    ? DIMS
    : result.isTie
    ? [result.primary, result.secondary]
    : [result.primary];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-6 py-8 space-y-10"
    >
      <section className="text-center space-y-3">
        <p className="text-[10px] uppercase tracking-[0.22em] text-primary font-mono">
          Your result
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-foreground leading-[1.15]">
          {header.main}
        </h1>
        {header.sub && (
          <p className="text-sm text-foreground/60 max-w-md mx-auto leading-relaxed">
            {header.sub}
          </p>
        )}
      </section>

      <section className="space-y-5">
        <div className="flex flex-col items-center gap-4">
          <Circumplex
            x={result.segment.x}
            y={result.segment.y}
            primarySegmentIndex={result.segment.index}
          />
          <p className="text-[10px] uppercase tracking-[0.18em] text-foreground/70 font-mono">
            Where you land · segment {result.segment.label}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
          {DIMS.map((d) => {
            const isPrimary = !showInverted && !result.isTie && d === result.primary;
            const isSecondary =
              !showInverted && ((result.isTie && d === result.secondary) || (result.showSecondary && d === result.secondary));
            return (
              <div
                key={d}
                className={`rounded-md border border-l-[3px] ${DIM_BORDER_L[d]} px-2 py-3 text-center transition-colors ${
                  isPrimary
                    ? `border-primary ${DIM_BG_SOFT[d]}`
                    : isSecondary
                    ? "border-primary/40 bg-card/60"
                    : "border-border/60 bg-card/40"
                }`}
              >
                <div className={`text-[10px] font-mono uppercase tracking-[0.18em] ${DIM_TEXT[d]}`}>
                  {d}
                </div>
                <div
                  className={`font-mono tabular-nums text-xl font-semibold mt-0.5 ${
                    isPrimary ? "text-foreground" : "text-foreground/80"
                  }`}
                >
                  {fmtScore(result.scores[d])}
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-foreground/70 text-center max-w-md mx-auto leading-relaxed">
          The dot on the wheel is the projection of these four scores into a
          single position. Each dimension runs from −24 (you consistently chose
          this as <span className="text-foreground">least like me</span>) to +24
          (as <span className="text-foreground">most like me</span>). Typical
          scores sit well inside ±16.
        </p>
      </section>

      {primaryDims.map((d) => (
        <PrimaryBlockView key={d} dim={d} />
      ))}

      {showBlend && (
        <BlendBlock primary={result.primary} secondary={result.secondary} />
      )}

      <FrenchRavenBlock userPrimary={showInverted ? null : result.primary} />

      <CrossCommBlock userPrimary={showInverted ? null : result.primary} />

      <AristotleHandoverBlock />

      <section className="pt-4 border-t border-border/60 space-y-5">
        <p className="text-[11px] text-foreground/70 italic text-center leading-relaxed max-w-lg mx-auto">
          Indicative assessment. Not a diagnosis, not a validated instrument,
          not a hiring tool. Your result is not stored or transmitted. Take a
          screenshot if you want to keep it.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {onAdjust && (
            <button
              onClick={onAdjust}
              className="flex items-center gap-2 px-4 py-2 border border-border/80 hover:border-primary/60 rounded-md text-sm text-foreground/70 hover:text-primary transition-all duration-300 focus-ring"
            >
              <Pencil className="w-3.5 h-3.5" />
              Adjust answers
            </button>
          )}
          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-4 py-2 border border-border/80 hover:border-primary/60 rounded-md text-sm text-foreground/70 hover:text-primary transition-all duration-300 focus-ring"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Take the test again
          </button>
        </div>
      </section>
    </motion.div>
  );
};

const PrimaryBlockView = ({ dim }: { dim: Dim }) => {
  const b = PRIMARY_BLOCKS[dim];
  return (
    <section className="space-y-6 pt-6 border-t border-border/60">
      <div className="space-y-1">
        <p className={`text-[10px] uppercase tracking-[0.22em] font-mono ${DIM_TEXT[dim]}`}>
          {DIM_TAGLINE[dim]}
        </p>
        <h2 className="font-serif text-2xl font-semibold text-foreground">
          {DIM_NAME[dim]} <span className={DIM_TEXT[dim]}>· {dim}</span>
        </h2>
      </div>

      {/* Lifeboat signature: the didactic hook back into the lecture metaphor */}
      <figure className={`relative pl-4 border-l-2 ${DIM_BORDER_L[dim]}`}>
        <blockquote className="font-serif text-base sm:text-[17px] italic text-foreground/90 leading-relaxed">
          "{LIFEBOAT_SIGNATURE[dim]}"
        </blockquote>
        <figcaption className="mt-1.5 text-[10px] uppercase tracking-[0.18em] font-mono text-foreground/60">
          The Scrum Lifeboat
        </figcaption>
      </figure>

      <Subsection title="How you tend to work" items={b.howYouWork} />
      <Subsection title="Strengths" items={b.strengths} />
      <Subsection title="Blind spots" items={b.blindSpots} />

      {/* Under stress promoted to a callout — this is where the risk lives */}
      <div className={`rounded-md border-l-[3px] ${DIM_BORDER_L[dim]} ${DIM_BG_SOFT[dim]} px-4 py-3`}>
        <h3 className={`text-[10px] uppercase tracking-[0.22em] font-mono ${DIM_TEXT[dim]} mb-1.5`}>
          Under stress
        </h3>
        <p className="text-sm text-foreground leading-relaxed">{b.underStress}</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-[11px] uppercase tracking-[0.18em] text-foreground/70 font-mono">
          How to communicate with you
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-md border border-primary/30 bg-primary/5 p-3">
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-primary mb-1">
              Do
            </div>
            <ul className="space-y-0.5 text-sm text-foreground/90">
              {b.doList.map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3">
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-destructive mb-1">
              Don't
            </div>
            <ul className="space-y-0.5 text-sm text-foreground/90">
              {b.dontList.map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const Subsection = ({ title, items }: { title: string; items: string[] }) => (
  <div className="space-y-1.5">
    <h3 className="text-[11px] uppercase tracking-[0.18em] text-foreground/70 font-mono">
      {title}
    </h3>
    <ul className="space-y-1 text-sm text-foreground/90 leading-relaxed">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="text-primary mt-0.5">·</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const BlendBlock = ({ primary, secondary }: { primary: Dim; secondary: Dim }) => {
  // Four-point structure derived from the notebook (NLM-validated for DC;
  // for other blends the valuable/liability rows anchor on the primary
  // dimension, which is the scoring driver).
  const rows: Array<{ label: string; body: ReactNode; kind: "neutral" | "warn" }> = [
    {
      label: "Signature",
      kind: "neutral",
      body: (
        <>
          You combine the <span className={DIM_TEXT[primary]}>{DIM_NAME[primary]}</span> tendency
          to <span className="text-foreground">{SIGNATURE[primary]}</span> with the{" "}
          <span className={DIM_TEXT[secondary]}>{DIM_NAME[secondary]}</span> tendency to{" "}
          <span className="text-foreground">{SIGNATURE[secondary]}</span>.
        </>
      ),
    },
    {
      label: "Double blind-spot",
      kind: "warn",
      body: (
        <>
          The <span className={DIM_TEXT[primary]}>{DIM_NAME[primary]}</span> trap of{" "}
          <span className="text-foreground">{TRAP[primary]}</span> stacks with the{" "}
          <span className={DIM_TEXT[secondary]}>{DIM_NAME[secondary]}</span> trap of{" "}
          <span className="text-foreground">{TRAP[secondary]}</span>.
        </>
      ),
    },
    {
      label: "Most valuable when",
      kind: "neutral",
      body: <span className="text-foreground/90">{VALUABLE_WHEN[primary]}</span>,
    },
    {
      label: "Biggest liability when",
      kind: "warn",
      body: <span className="text-foreground/90">{LIABILITY_WHEN[primary]}</span>,
    },
  ];

  return (
    <section className="space-y-4 pt-6 border-t border-border/60">
      <div className="space-y-1">
        <p className="text-[10px] uppercase tracking-[0.22em] text-primary font-mono">
          Your blend
        </p>
        <h2 className="font-serif text-xl font-semibold text-foreground">
          <span className={DIM_TEXT[primary]}>{DIM_NAME[primary]}</span>
          <span className="text-foreground/50"> / </span>
          <span className={DIM_TEXT[secondary]}>{DIM_NAME[secondary]}</span>
        </h2>
      </div>

      <dl className="space-y-2">
        {rows.map((r) => (
          <div
            key={r.label}
            className={`grid grid-cols-1 sm:grid-cols-[170px,1fr] gap-x-4 gap-y-1 rounded-md px-3 py-2.5 ${
              r.kind === "warn" ? "bg-destructive/[0.06]" : "bg-card/40"
            }`}
          >
            <dt
              className={`text-[10px] font-mono uppercase tracking-[0.18em] pt-0.5 ${
                r.kind === "warn" ? "text-destructive/85" : "text-foreground/70"
              }`}
            >
              {r.label}
            </dt>
            <dd className="text-sm leading-relaxed text-foreground/85">{r.body}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

const FrenchRavenBlock = ({ userPrimary }: { userPrimary: Dim | null }) => (
  <section className="space-y-4 pt-6 border-t border-border/60">
    <div className="space-y-1">
      <p className="text-[10px] uppercase tracking-[0.22em] text-primary font-mono">
        Didactic link
      </p>
      <h2 className="font-serif text-xl font-semibold text-foreground">
        DISC and French &amp; Raven
      </h2>
    </div>
    <p className="text-xs text-foreground/70 leading-relaxed italic">
      The DISC styles and French &amp; Raven's six bases of social power are two
      independent frameworks. No study in the peer-reviewed DISC literature
      empirically maps them. The pairing below is a teaching-level heuristic —
      treat it as a conversation starter, not a classification.
    </p>
    <div className="space-y-3">
      {(["D", "I", "S", "C"] as Dim[]).map((d) => {
        const isYou = d === userPrimary;
        return (
          <div
            key={d}
            className={`rounded-md border border-l-[3px] ${DIM_BORDER_L[d]} px-3 py-2.5 transition-colors ${
              isYou ? `${DIM_BG_SOFT[d]} border-t-primary/40 border-r-primary/40 border-b-primary/40` : "border-border/60 bg-card/30"
            }`}
          >
            <div className="flex items-baseline justify-between gap-3 mb-1.5">
              <div className="flex items-baseline gap-2">
                <span className={`font-mono font-bold text-sm ${DIM_TEXT[d]}`}>{d}</span>
                <span className="font-serif text-sm text-foreground/85">{DIM_NAME[d]}</span>
              </div>
              {isYou && (
                <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-primary">
                  this is you
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[auto,1fr] gap-x-4 gap-y-1 text-sm leading-relaxed">
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/70 pt-0.5 sm:min-w-[90px]">
                Default
              </span>
              <span className="text-foreground/90">{FRENCH_RAVEN[d].defaultLever}</span>
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/70 pt-0.5 sm:min-w-[90px]">
                Growth area
              </span>
              <span className="text-foreground/85">{FRENCH_RAVEN[d].growthArea}</span>
            </div>
          </div>
        );
      })}
    </div>
    <blockquote className="mt-2 pl-4 border-l-2 border-primary/50 text-base italic font-serif text-foreground leading-relaxed">
      The more interesting question is not which power base you default to —
      but which one you avoid.
    </blockquote>
  </section>
);

const CrossCommBlock = ({ userPrimary }: { userPrimary: Dim | null }) => (
  <section className="space-y-3 pt-6 border-t border-border/60">
    <h2 className="font-serif text-xl font-semibold text-foreground">
      How to reach each style
    </h2>
    <p className="text-xs text-foreground/70 leading-relaxed">
      Short cheatsheet for when you need to get through to someone whose default
      is not yours. The row in <span className="text-primary">champagne</span> is
      your own — skip it or read it as a mirror.
    </p>
    <div className="space-y-2">
      {(["D", "I", "S", "C"] as Dim[]).map((d) => {
        const isYou = d === userPrimary;
        return (
          <div
            key={d}
            className={`flex gap-3 text-sm leading-relaxed rounded-md border border-l-[3px] ${DIM_BORDER_L[d]} px-3 py-2 ${
              isYou ? "bg-primary/[0.06] border-primary/40" : "border-border/50 bg-card/30"
            }`}
          >
            <span className={`font-mono uppercase text-[10px] tracking-[0.18em] pt-1 min-w-[28px] ${DIM_TEXT[d]}`}>
              {d}
            </span>
            <span className="flex-1">
              <span className={`font-serif ${isYou ? "text-foreground/60" : "text-foreground"}`}>
                To a {DIM_NAME[d]}:{" "}
              </span>
              <span className={isYou ? "text-foreground/60" : "text-foreground/90"}>
                {CROSS_COMM[d]}
              </span>
              {isYou && (
                <span className="ml-2 text-[9px] font-mono uppercase tracking-[0.22em] text-primary whitespace-nowrap">
                  (this is you)
                </span>
              )}
            </span>
          </div>
        );
      })}
    </div>
  </section>
);

const AristotleHandoverBlock = () => (
  <section className="relative pt-10 pb-2">
    {/* Slim gold divider to signal "end of test, back to the lecture" */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-primary/40" />
    <div className="text-center space-y-3">
      <p className="text-[10px] uppercase tracking-[0.22em] text-primary font-mono">
        {ARISTOTLE_HANDOVER.kicker}
      </p>
      <h2 className="font-serif text-xl sm:text-2xl font-semibold text-foreground leading-tight">
        {ARISTOTLE_HANDOVER.headline}
      </h2>
      <p className="text-sm text-foreground/80 leading-relaxed max-w-lg mx-auto">
        {ARISTOTLE_HANDOVER.body}
      </p>
    </div>
  </section>
);

export default ResultScreen;
