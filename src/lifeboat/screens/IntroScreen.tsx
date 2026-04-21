import { motion } from "framer-motion";

interface Props {
  onReady: () => void;
}

const IntroScreen = ({ onReady }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="w-full max-w-xl mx-auto px-6 py-10"
    >
      <div className="space-y-6">
        <p className="text-[10px] uppercase tracking-[0.22em] text-primary font-mono">
          Before you begin
        </p>
        <div className="space-y-4 text-sm text-foreground/80 leading-relaxed">
          <p>
            This is a short, indicative self-assessment for{" "}
            <span className="font-serif italic text-foreground">
              The Scrum Lifeboat
            </span>{" "}
            lecture, modeled on the DISC framework (Marston, 1928). It is not a
            validated diagnostic test, not a hiring tool, and not peer-reviewed.
            Estimated reliability for short DISC forms like this one is
            α ≈ .87. DISC-based training shows small but statistically
            significant effects on self-reported communication awareness
            (d ≈ 0.20 – 0.42). Some academic critics call DISC pseudoscientific.
            Treat your result as a hypothesis about your current preferences,
            not a label.
          </p>
          <p>
            Nothing you answer is transmitted, stored, or shared. You can stop
            at any time.
          </p>
          <p className="text-foreground/70">
            Answer fast, on first instinct. It takes about six minutes.
          </p>
        </div>

        <div className="pt-4">
          <button
            onClick={onReady}
            className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all duration-300 font-medium tracking-wide focus-ring"
          >
            I'm ready
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default IntroScreen;
