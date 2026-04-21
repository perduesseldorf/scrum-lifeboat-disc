import { useState } from "react";
import { motion } from "framer-motion";
import { FastForward } from "lucide-react";
import { DEMO_DC_CHALLENGER } from "../demoPresets";
import type { Answer } from "../scoring";

interface Props {
  onStart: () => void;
  onDemo?: (answers: Answer[]) => void;
}

const LandingScreen = ({ onStart, onDemo }: Props) => {
  const [methodOpen, setMethodOpen] = useState(false);
  // Demo shortcut is intentionally available on production too (lecture / QR testing).
  const showDemo = Boolean(onDemo);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="w-full max-w-xl mx-auto px-6 py-10"
    >
      <div className="flex flex-col items-center text-center space-y-8">
        <div className="space-y-3">
          <p className="text-[10px] uppercase tracking-[0.22em] text-primary font-mono">
            The Scrum Lifeboat · Part III
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-foreground leading-[1.1]">
            Communication Indicator
          </h1>
          <p className="text-sm sm:text-base text-foreground/70 max-w-md mx-auto leading-relaxed">
            A 24-question, 6-minute self-assessment for behavioral style and
            communication preference. For use during the lecture. Nothing you
            answer is stored or shared. All scoring happens on your own device.
          </p>
        </div>

        <button
          onClick={onStart}
          className="px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all duration-300 font-medium tracking-wide focus-ring"
        >
          Start
        </button>

        <button
          onClick={() => setMethodOpen((v) => !v)}
          className="text-[11px] text-foreground/70 hover:text-primary transition-colors font-mono uppercase tracking-wider focus-ring rounded"
        >
          {methodOpen ? "Hide methodology" : "How is this scored?"}
        </button>

        {showDemo && (
          <button
            onClick={() => onDemo?.(DEMO_DC_CHALLENGER)}
            className="flex items-center gap-1.5 text-[10px] text-foreground/60 hover:text-primary transition-colors font-mono uppercase tracking-wider focus-ring rounded border border-dashed border-border/60 hover:border-primary/50 px-3 py-1.5"
            title="Skip to a pre-filled DC Challenger result (preview)"
          >
            <FastForward className="w-3 h-3" />
            Demo: DC Challenger
          </button>
        )}

        {methodOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="text-left text-xs text-foreground/60 leading-relaxed space-y-3 border-t border-border pt-6 max-w-lg"
          >
            <p>
              This is a forced-choice DISC-style indicator, modeled on the
              instrument developed by William Moulton Marston (1928) and the
              adjective-tetrad format used by Everything DiSC and TTI Success
              Insights. Short DISC instruments like this one report an internal
              consistency of around α ≈ .87 (TTI 24-tetrad form). DISC-based
              communication training has been shown to produce small but
              statistically significant improvements in self-reported
              communication awareness (Cohen's d ≈ 0.20 – 0.42, n = 216,
              peer-reviewed). DISC is not without critics — some academic
              reviewers call it pseudoscientific. Treat your result as a
              hypothesis about your current behavior under normal conditions,
              not a fixed label.
            </p>
            <p>
              Scoring: for each of 24 items you pick the option that is{" "}
              <span className="text-foreground/80">most</span> like you and the
              one that is <span className="text-foreground/80">least</span> like
              you. Most choices add a point to that DISC dimension; Least choices
              subtract one. Your four scores land in the range −24 to +24 each.
              The highest is your primary style; if a second dimension is within
              8 points of the primary, it is shown as your secondary blend.
            </p>
            <p className="text-foreground/70">
              Nothing is transmitted. Close the tab and the result is gone.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default LandingScreen;
