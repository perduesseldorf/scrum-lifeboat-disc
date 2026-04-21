import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, FastForward } from "lucide-react";
import { TETRADS, ADJECTIVE_HINTS, type TetradOption, type Dim } from "../content";
import { seededShuffle, type Answer } from "../scoring";

interface Props {
  onComplete: (answers: Answer[]) => void;
  onBackToIntro: () => void;
  initialAnswers?: Answer[];
}

const TestScreen = ({ onComplete, onBackToIntro, initialAnswers }: Props) => {
  const [sessionSeed] = useState(() => Math.floor(Math.random() * 1_000_000));
  const [blockedHint, setBlockedHint] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, { most?: Dim; least?: Dim }>>(() => {
    if (!initialAnswers || initialAnswers.length === 0) return {};
    const seeded: Record<number, { most?: Dim; least?: Dim }> = {};
    for (const a of initialAnswers) {
      seeded[a.itemId] = { most: a.most, least: a.least };
    }
    return seeded;
  });
  const allAnswered = Object.keys(answers).length === TETRADS.length &&
    TETRADS.every((t) => answers[t.id]?.most && answers[t.id]?.least);

  const shuffledTetrads = useMemo(
    () =>
      TETRADS.map((t) => ({
        ...t,
        options: seededShuffle(t.options, sessionSeed + t.id * 31),
      })),
    [sessionSeed]
  );

  const total = shuffledTetrads.length;
  const tetrad = shuffledTetrads[current];
  const currentAnswer = answers[tetrad.id] ?? {};

  const handlePick = (dim: Dim) => {
    setAnswers((prev) => {
      const a = prev[tetrad.id] ?? {};
      if (a.most === dim) return { ...prev, [tetrad.id]: { ...a, most: undefined } };
      if (a.least === dim) return { ...prev, [tetrad.id]: { ...a, least: undefined } };
      if (!a.most) return { ...prev, [tetrad.id]: { ...a, most: dim } };
      if (!a.least) return { ...prev, [tetrad.id]: { ...a, least: dim } };
      return { ...prev, [tetrad.id]: { most: dim, least: undefined } };
    });
  };

  const canProceed = Boolean(currentAnswer.most && currentAnswer.least);
  const isLast = current === total - 1;

  useEffect(() => {
    if (canProceed) setBlockedHint(false);
  }, [canProceed]);

  const buildFinalAnswers = (): Answer[] =>
    TETRADS.map((t) => {
      const a = answers[t.id]!;
      return { itemId: t.id, most: a.most!, least: a.least! };
    });

  const handleNext = () => {
    if (!canProceed) {
      setBlockedHint(true);
      window.setTimeout(() => setBlockedHint(false), 3200);
      return;
    }
    if (isLast) {
      onComplete(buildFinalAnswers());
    } else {
      setCurrent((c) => c + 1);
    }
  };

  const handleJumpToResult = () => {
    if (allAnswered) onComplete(buildFinalAnswers());
  };

  const handleBack = () => {
    if (current === 0) {
      onBackToIntro();
    } else {
      setCurrent((c) => c - 1);
    }
  };

  const progressPct = ((current + (canProceed ? 1 : 0)) / total) * 100;

  return (
    <div className="w-full max-w-xl mx-auto px-6 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] touch-manipulation">
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/70">
          <span className="w-14 sm:w-16" aria-hidden />
          <span>
            Question {current + 1} of {total}
          </span>
          {allAnswered ? (
            <button
              type="button"
              onClick={handleJumpToResult}
              className="flex items-center gap-1 text-primary/80 hover:text-primary transition-colors focus-ring rounded touch-manipulation"
              title="All answered — re-score now"
            >
              Result
              <FastForward className="w-3 h-3" />
            </button>
          ) : (
            <span className="invisible">Result</span>
          )}
        </div>
        <div className="h-[2px] w-full bg-border/60 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={false}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tetrad.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className="space-y-1 mb-4">
            <p className="text-[10px] uppercase tracking-[0.22em] text-primary font-mono">
              First tap = Most like you · Second tap = Least like you
            </p>
            <p className="text-xs text-foreground/70">
              Tap a selected card again to clear it.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:gap-3">
            {tetrad.options.map((opt) => (
              <OptionCard
                key={`${tetrad.id}-${opt.dim}`}
                option={opt}
                state={
                  currentAnswer.most === opt.dim
                    ? "most"
                    : currentAnswer.least === opt.dim
                    ? "least"
                    : "idle"
                }
                onClick={() => handlePick(opt.dim)}
              />
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <div className="text-[11px] text-foreground/70 min-h-[2.5rem] flex flex-col justify-center">
              {currentAnswer.most && !currentAnswer.least && "Now tap the one that is least like you."}
              {!currentAnswer.most && "Tap the one that is most like you."}
              {currentAnswer.most && currentAnswer.least && "Ready to continue."}
              {blockedHint && (
                <span className="mt-1 text-destructive text-[11px] font-medium" role="status">
                  Pick both Most and Least for this question — then Next works.
                </span>
              )}
            </div>
            <div className="flex flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="flex flex-1 sm:flex-initial items-center justify-center gap-1.5 min-h-[44px] px-4 py-2.5 rounded-md border border-border/80 bg-card/50 text-foreground hover:bg-card hover:border-primary/40 transition-colors font-medium text-sm tracking-wide focus-ring touch-manipulation"
                aria-label={current === 0 ? "Back to instructions" : "Back to previous question"}
              >
                <ChevronLeft className="w-4 h-4 shrink-0" />
                {current === 0 ? "Intro" : "Back"}
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-disabled={!canProceed}
                className={`flex-1 sm:flex-initial min-h-[44px] min-w-[44%] sm:min-w-[140px] px-5 py-2.5 rounded-md transition-all duration-300 font-medium text-sm tracking-wide focus-ring touch-manipulation ${
                  canProceed
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-muted text-muted-foreground cursor-not-allowed border border-border/80"
                }`}
              >
                {isLast ? "See result" : "Next"}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

interface OptionCardProps {
  option: TetradOption;
  state: "idle" | "most" | "least";
  onClick: () => void;
}

const OptionCard = ({ option, state, onClick }: OptionCardProps) => {
  const base =
    "relative w-full text-left px-5 py-3.5 rounded-lg border transition-all duration-200 focus-ring group";
  const byState: Record<typeof state, string> = {
    idle:
      "border-border/80 bg-card/40 hover:border-primary/60 hover:bg-card/80",
    most:
      "border-primary bg-primary/10 text-foreground",
    least:
      "border-destructive/70 bg-destructive/10 text-foreground",
  };

  const hint = ADJECTIVE_HINTS[option.text];

  return (
    <button type="button" onClick={onClick} className={`${base} ${byState[state]} touch-manipulation`}>
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-base sm:text-lg font-serif tracking-wide leading-tight">
            {option.text}
          </div>
          {hint && (
            <div className="mt-1 text-[11px] sm:text-xs text-foreground/70 font-sans italic leading-snug">
              {hint}
            </div>
          )}
        </div>
        {state !== "idle" && (
          <span
            className={`shrink-0 mt-0.5 text-[9px] font-mono uppercase tracking-[0.18em] px-2 py-0.5 rounded ${
              state === "most"
                ? "text-primary-foreground bg-primary"
                : "text-destructive-foreground bg-destructive/80"
            }`}
          >
            {state}
          </span>
        )}
      </div>
    </button>
  );
};

export default TestScreen;
