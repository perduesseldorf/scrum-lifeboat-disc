// DISC Indicator content data.
// Source of truth: CONTENT.md in the project root.
// Every change here must stay in sync with CONTENT.md Section 4.2 and 6.

export type Dim = "D" | "I" | "S" | "C";

export interface TetradOption {
  text: string;
  dim: Dim;
}

export interface Tetrad {
  id: number;
  options: TetradOption[]; // always length 4, exactly one per dimension
}

// Adjective bank → 24 tetrads.
// Canonical order per row: D | I | S | C. Render order is randomized per session.
export const TETRADS: Tetrad[] = [
  { id: 1,  options: [{ text: "Decisive",       dim: "D" }, { text: "Enthusiastic",  dim: "I" }, { text: "Patient",       dim: "S" }, { text: "Analytical",  dim: "C" }] },
  { id: 2,  options: [{ text: "Direct",         dim: "D" }, { text: "Sociable",      dim: "I" }, { text: "Supportive",    dim: "S" }, { text: "Precise",     dim: "C" }] },
  { id: 3,  options: [{ text: "Assertive",      dim: "D" }, { text: "Outgoing",      dim: "I" }, { text: "Reliable",      dim: "S" }, { text: "Methodical",  dim: "C" }] },
  { id: 4,  options: [{ text: "Competitive",    dim: "D" }, { text: "Charismatic",   dim: "I" }, { text: "Loyal",         dim: "S" }, { text: "Systematic",  dim: "C" }] },
  { id: 5,  options: [{ text: "Bold",           dim: "D" }, { text: "Persuasive",    dim: "I" }, { text: "Calm",          dim: "S" }, { text: "Careful",     dim: "C" }] },
  { id: 6,  options: [{ text: "Daring",         dim: "D" }, { text: "Energetic",     dim: "I" }, { text: "Dependable",    dim: "S" }, { text: "Accurate",    dim: "C" }] },
  { id: 7,  options: [{ text: "Determined",     dim: "D" }, { text: "Lively",        dim: "I" }, { text: "Cooperative",   dim: "S" }, { text: "Thorough",    dim: "C" }] },
  { id: 8,  options: [{ text: "Driven",         dim: "D" }, { text: "Engaging",      dim: "I" }, { text: "Understanding", dim: "S" }, { text: "Logical",     dim: "C" }] },
  { id: 9,  options: [{ text: "Pioneering",     dim: "D" }, { text: "Cheerful",      dim: "I" }, { text: "Gentle",        dim: "S" }, { text: "Meticulous",  dim: "C" }] },
  { id: 10, options: [{ text: "Resolute",       dim: "D" }, { text: "Inspiring",     dim: "I" }, { text: "Steady",        dim: "S" }, { text: "Organized",   dim: "C" }] },
  { id: 11, options: [{ text: "Authoritative",  dim: "D" }, { text: "Expressive",    dim: "I" }, { text: "Accommodating", dim: "S" }, { text: "Reserved",    dim: "C" }] },
  { id: 12, options: [{ text: "Dynamic",        dim: "D" }, { text: "Convincing",    dim: "I" }, { text: "Tolerant",      dim: "S" }, { text: "Cautious",    dim: "C" }] },
  { id: 13, options: [{ text: "Competitive",    dim: "D" }, { text: "Expressive",    dim: "I" }, { text: "Understanding", dim: "S" }, { text: "Reserved",    dim: "C" }] },
  { id: 14, options: [{ text: "Bold",           dim: "D" }, { text: "Convincing",    dim: "I" }, { text: "Gentle",        dim: "S" }, { text: "Cautious",    dim: "C" }] },
  { id: 15, options: [{ text: "Daring",         dim: "D" }, { text: "Enthusiastic",  dim: "I" }, { text: "Steady",        dim: "S" }, { text: "Analytical",  dim: "C" }] },
  { id: 16, options: [{ text: "Determined",     dim: "D" }, { text: "Sociable",      dim: "I" }, { text: "Accommodating", dim: "S" }, { text: "Precise",     dim: "C" }] },
  { id: 17, options: [{ text: "Driven",         dim: "D" }, { text: "Outgoing",      dim: "I" }, { text: "Tolerant",      dim: "S" }, { text: "Methodical",  dim: "C" }] },
  { id: 18, options: [{ text: "Pioneering",     dim: "D" }, { text: "Charismatic",   dim: "I" }, { text: "Patient",       dim: "S" }, { text: "Systematic",  dim: "C" }] },
  { id: 19, options: [{ text: "Resolute",       dim: "D" }, { text: "Persuasive",    dim: "I" }, { text: "Supportive",    dim: "S" }, { text: "Careful",     dim: "C" }] },
  { id: 20, options: [{ text: "Authoritative",  dim: "D" }, { text: "Energetic",     dim: "I" }, { text: "Reliable",      dim: "S" }, { text: "Accurate",    dim: "C" }] },
  { id: 21, options: [{ text: "Dynamic",        dim: "D" }, { text: "Lively",        dim: "I" }, { text: "Loyal",         dim: "S" }, { text: "Thorough",    dim: "C" }] },
  { id: 22, options: [{ text: "Decisive",       dim: "D" }, { text: "Engaging",      dim: "I" }, { text: "Calm",          dim: "S" }, { text: "Logical",     dim: "C" }] },
  { id: 23, options: [{ text: "Direct",         dim: "D" }, { text: "Cheerful",      dim: "I" }, { text: "Dependable",    dim: "S" }, { text: "Meticulous",  dim: "C" }] },
  { id: 24, options: [{ text: "Assertive",      dim: "D" }, { text: "Inspiring",     dim: "I" }, { text: "Cooperative",   dim: "S" }, { text: "Organized",   dim: "C" }] },
];

// Short behavioral gloss for each adjective, shown in small gray text under the word.
// Stays in I-statement form, present tense, observable behavior — never evaluative.
// Kept roughly symmetric in tone across D/I/S/C to avoid biasing the forced choice.
export const ADJECTIVE_HINTS: Record<string, string> = {
  // D — task-focused, fast-paced
  Decisive: "I make calls quickly and move on.",
  Direct: "I say what I mean, plainly.",
  Assertive: "I speak up and hold my position.",
  Competitive: "I play to win.",
  Bold: "I take risks others hesitate to take.",
  Daring: "I try things before they feel safe.",
  Determined: "I stay on it until it's done.",
  Driven: "I work hard toward my goals.",
  Pioneering: "I go first into new territory.",
  Resolute: "I hold my position under pressure.",
  Authoritative: "I take charge and give direction.",
  Dynamic: "I bring energy and push things forward.",

  // I — people-focused, fast-paced
  Enthusiastic: "I get excited and show it.",
  Sociable: "I connect easily with people.",
  Outgoing: "I approach people first.",
  Charismatic: "I draw people in naturally.",
  Persuasive: "I bring people around to my view.",
  Energetic: "I keep the room alive.",
  Lively: "I show visible energy and warmth.",
  Engaging: "I pull others into the conversation.",
  Cheerful: "I stay upbeat and positive.",
  Inspiring: "I help others see what's possible.",
  Expressive: "I show how I feel openly.",
  Convincing: "I make my case so people buy in.",

  // S — people-focused, stable-paced
  Patient: "I take my time with people.",
  Supportive: "I back others when they need help.",
  Reliable: "I do what I say I'll do.",
  Loyal: "I stay committed to my team.",
  Calm: "I stay composed under pressure.",
  Dependable: "People can count on me.",
  Cooperative: "I work with others, not around them.",
  Understanding: "I listen before I react.",
  Gentle: "I handle people with care.",
  Steady: "I keep a consistent pace.",
  Accommodating: "I make room for other people's needs.",
  Tolerant: "I accept difference without pushing back.",

  // C — task-focused, stable-paced
  Analytical: "I break things down before I act.",
  Precise: "I care about getting it exactly right.",
  Methodical: "I work step by step.",
  Systematic: "I follow a clear structure.",
  Careful: "I check before I commit.",
  Accurate: "I work to avoid mistakes.",
  Thorough: "I don't skip the details.",
  Logical: "I reason things out before deciding.",
  Meticulous: "I pay close attention to every detail.",
  Organized: "I keep work structured and in order.",
  Reserved: "I hold back until I'm sure.",
  Cautious: "I weigh risk before I move.",
};

export const DIM_NAME: Record<Dim, string> = {
  D: "Dominant",
  I: "Influential",
  S: "Steady",
  C: "Conscientious",
};

export const DIM_TAGLINE: Record<Dim, string> = {
  D: "Task-focused, fast-paced",
  I: "People-focused, fast-paced",
  S: "People-focused, stable-paced",
  C: "Task-focused, stable-paced",
};

// Per-dimension content for the result screen (Section 6.4 of CONTENT.md).
export interface PrimaryBlock {
  howYouWork: string[];
  strengths: string[];
  blindSpots: string[];
  underStress: string;
  doList: string[];
  dontList: string[];
}

export const PRIMARY_BLOCKS: Record<Dim, PrimaryBlock> = {
  D: {
    howYouWork: [
      "You decide first and refine later.",
      "You prefer speed over consensus.",
      "You take ownership without waiting for permission.",
    ],
    strengths: [
      "You break deadlocks.",
      "You drive results when others stall.",
      "You challenge the status quo and speak candidly, even when it is uncomfortable.",
    ],
    blindSpots: [
      "You push past people who need more time.",
      "Your directness reads as aggression, especially to S and C types.",
      "You confuse silence with agreement.",
    ],
    underStress: "You double down, cut people off, and decide unilaterally.",
    doList: ["Lead with the headline.", "Bring options.", "Keep it short."],
    dontList: ["Bury the decision.", "Over-explain.", "Run it by committee."],
  },
  I: {
    howYouWork: [
      "You move through people, conversations, networks.",
      "You sell the vision before the plan is finalized.",
      "You energize momentum and break tension.",
    ],
    strengths: [
      "You align people who would otherwise not align.",
      "You turn setbacks into narratives the team can follow.",
      "You build buy-in without formal authority.",
    ],
    blindSpots: [
      "You overpromise and under-track.",
      "You prioritize harmony over honest disagreement.",
      "You confuse activity with progress.",
    ],
    underStress: "You talk more, commit faster, and avoid the uncomfortable conversation.",
    doList: ["Open with enthusiasm.", "Leave room for dialogue.", "Recognize the contribution."],
    dontList: ["Open with data only.", "Stay formal and cold.", "Cut off the story."],
  },
  S: {
    howYouWork: [
      "You protect continuity and cohesion.",
      "You deliver reliably, without drama.",
      "You hear what is said and what is not said.",
    ],
    strengths: [
      "You are the person the team still trusts after a hard sprint.",
      "You stabilize new members and new processes.",
      "You hold the line when others pivot every week.",
    ],
    blindSpots: [
      "You delay hard conversations.",
      "You mistake your own silence for agreement, and so do others.",
      "You absorb dysfunction instead of naming it.",
    ],
    underStress: "You withdraw, over-accommodate, and avoid conflict until it becomes unavoidable.",
    doList: ["Give context.", "Take it step by step.", "Ask for input explicitly."],
    dontList: ["Rush the decision.", "Spring surprises.", "Mistake calm for consent."],
  },
  C: {
    howYouWork: [
      "You verify before you commit.",
      "You work from evidence and standards.",
      "You catch what others miss.",
    ],
    strengths: [
      "You keep the work honest.",
      "You make quality visible and repeatable.",
      "You surface the technical risk others would rather ignore.",
    ],
    blindSpots: [
      "You optimize the model when the deadline is tomorrow.",
      "You disengage from people you judge as sloppy.",
      "You mistake precision for progress.",
    ],
    underStress: "You go quieter, descend further into detail, detach from the team.",
    doList: ["Bring data.", "Respect the process.", "Give time to think."],
    dontList: ["Rush.", "Be vague.", "Dismiss the concern about quality."],
  },
};

// Signature one-liners — kept as infinitive phrases (no subject) so they drop
// into sentences like "you combine the tendency to X with the tendency to Y".
// Phrasing validated against notebook sources (Everything DiSC / TTI).
export const SIGNATURE: Record<Dim, string> = {
  D: "decide quickly and drive toward the bottom line",
  I: "energize momentum and inspire people to collaborate",
  S: "hold steady continuity and protect the team's harmony",
  C: "verify the evidence and keep quality strict and visible",
};

// Team-situation phrases sourced from the notebook (High-D/I/S/C leadership
// value-vs-liability tables). Used by BlendBlock to assemble a structured
// read-out per primary dimension.
export const VALUABLE_WHEN: Record<Dim, string> = {
  D: "a crisis needs fast decisions, obstacles broken through, and bottom-line results driven hard.",
  I: "the team needs morale rebuilt, buy-in created, and positive momentum maintained through collaboration.",
  S: "the work needs stable continuity, consistent execution, and loyal, harmonious relationships kept intact.",
  C: "a complex problem needs systematic analysis, strict quality control, and accuracy enforced through planning.",
};

export const LIABILITY_WHEN: Record<Dim, string> = {
  D: "the moment asks for patience, collaboration, psychological safety, and empathetic listening.",
  I: "the work asks for routine execution, strict attention to detail, and independent follow-through.",
  S: "the situation asks for rapid transformation, sudden change, or fast, unpopular decisions.",
  C: "the situation is ambiguous and demands quick, intuitive decisions without complete data.",
};

export const TRAP: Record<Dim, string> = {
  D: "cutting people off and deciding unilaterally",
  I: "overpromising and avoiding the hard conversation",
  S: "delaying hard conversations and absorbing dysfunction",
  C: "optimizing precision past the deadline",
};

export interface FrenchRavenPoint {
  defaultLever: string;
  growthArea: string;
}

export const FRENCH_RAVEN: Record<Dim, FrenchRavenPoint> = {
  D: {
    defaultLever: "Legitimate. Your default levers are the authority of the role and the speed of the call.",
    growthArea: "Expert and Referent — build credibility through visible competence and trusted relationships, not only through the force of the call.",
  },
  I: {
    defaultLever: "Referent / Reward (social). Your default levers are likability and recognition.",
    growthArea: "Expert — charisma carries you until a technical stakeholder stops believing you. Invest depth in one domain your team actually needs.",
  },
  S: {
    defaultLever: "Referent. Your default lever is trust built over time.",
    growthArea: "Legitimate and Expert — decide visibly; be seen as an authority in your own right. Do not only earn influence behind the scenes.",
  },
  C: {
    defaultLever: "Expert / Informational. Your default levers are knowledge and data.",
    growthArea: "Referent — expertise without relationship gets ignored. Build the relationships that let your analysis land.",
  },
};

export const CROSS_COMM: Record<Dim, string> = {
  D: "Lead with the decision. Keep it short. Offer options, not open questions.",
  I: "Open with the story and the energy. Recognize the contribution before you ask for change.",
  S: "Give context and time. Ask for their input explicitly. Do not mistake calm for consent.",
  C: "Bring the data in writing. Respect the process. Let them push back without taking it personally.",
};

// Lifeboat signature one-liners — the didactic hook that ties the DISC result
// back to the lecture metaphor. Shown directly under the primary-block header.
// Sourced verbatim from CONTENT.md §1.2.
export const LIFEBOAT_SIGNATURE: Record<Dim, string> = {
  D: "In the lifeboat, the D grabs the oars first — but rows in the wrong direction if no one checks the compass.",
  I: "The I keeps morale alive when the shore is still invisible — but will promise land five times before anyone actually sees it.",
  S: "The S keeps the boat together so it doesn't capsize — but will bail water for a week before naming the leak.",
  C: "The C finds the leak — and wants to audit the hull before anyone starts bailing.",
};

// Handover block shown at the very end of the result screen, before the
// disclaimer and action buttons. Bridges into the next section of the lecture
// (Aristotle — Logos / Pathos / Ethos).
//
// Mapping is a teaching-level heuristic only. The notebook sources contain no
// empirical DISC ↔ Aristotle link, but the behavioral-trait bridge below is
// consistent with the dimension definitions (C / D as data-driven → Logos,
// I as emotional → Pathos, S as trust-based + C as expertise-based → Ethos).
// The lecturer frames it as a heuristic when presenting it live; the body text
// itself stays free of jargon disclaimers to keep the hand-off clean.
export const ARISTOTLE_HANDOVER = {
  kicker: "What's next in the lecture",
  headline: "From where you are — to how you persuade.",
  body:
    "Aristotle names three ways to move people. Logos — logic and data — is home ground for the analytical C and the bottom-line D. Pathos — feeling — is where the I lives. Ethos — character and credibility — is built on the trust an S extends and the expertise a C commands. The next part of the lecture is how to reach the people for whom your natural pillar is a stretch.",
} as const;
