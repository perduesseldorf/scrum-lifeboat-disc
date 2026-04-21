import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import LandingScreen from "@/lifeboat/screens/LandingScreen";
import IntroScreen from "@/lifeboat/screens/IntroScreen";
import TestScreen from "@/lifeboat/screens/TestScreen";
import ResultScreen from "@/lifeboat/screens/ResultScreen";
import { computeResult, type Answer, type Result } from "@/lifeboat/scoring";

type Phase = "landing" | "intro" | "test" | "result";

const LifeboatApp = () => {
  const [phase, setPhase] = useState<Phase>("landing");
  const [result, setResult] = useState<Result | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleComplete = (finalAnswers: Answer[]) => {
    const r = computeResult(finalAnswers);
    if (import.meta.env.DEV) {
      console.log("Scores:", r.scores, "Primary:", r.primary, "Secondary:", r.secondary, "Segment:", r.segment.label);
    }
    setAnswers(finalAnswers);
    setResult(r);
    setPhase("result");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleRestart = () => {
    setResult(null);
    setAnswers([]);
    setPhase("landing");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleAdjust = () => {
    setPhase("test");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleDemo = (demoAnswers: Answer[]) => {
    const r = computeResult(demoAnswers);
    if (import.meta.env.DEV) {
      console.log("[demo] Scores:", r.scores, "Primary:", r.primary, "Secondary:", r.secondary, "Segment:", r.segment.label);
    }
    setAnswers(demoAnswers);
    setResult(r);
    setPhase("result");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="pt-16 flex-1 flex flex-col">
        <div className="flex-1 flex items-start sm:items-center justify-center">
          <AnimatePresence mode="wait">
            {phase === "landing" && (
              <LandingScreen
                key="landing"
                onStart={() => setPhase("intro")}
                onDemo={handleDemo}
              />
            )}
            {phase === "intro" && (
              <IntroScreen key="intro" onReady={() => setPhase("test")} />
            )}
            {phase === "test" && (
              <TestScreen
                key="test"
                initialAnswers={answers}
                onComplete={handleComplete}
                onBackToIntro={() => setPhase("intro")}
              />
            )}
            {phase === "result" && result && (
              <ResultScreen
                key="result"
                result={result}
                onRestart={handleRestart}
                onAdjust={answers.length === 24 ? handleAdjust : undefined}
              />
            )}
          </AnimatePresence>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default LifeboatApp;
