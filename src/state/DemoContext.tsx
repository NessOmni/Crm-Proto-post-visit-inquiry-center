/* ============================================================
   Demo state — the single in-memory store both flows read.
   Owns the substrate, the Flow 1 state machine, the activity
   log, and the global reset behind "Replay the scene".
   Deterministic & offline; all timing is fixture-driven.
   ============================================================ */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Substrate, TrustTier } from "../data/types";
import { loadSubstrate, flow1 } from "../data/fixtures";
import { commById, outputRecipient } from "../data/selectors";

/** Flow 1 progresses through these phases. */
export type Flow1Phase = "idle" | "recording" | "processing" | "ready" | "approved";

export interface ActivityEntry {
  id: string;
  text: string;
  tier: TrustTier;
  tag: string;
  time: string;
}

interface DemoState {
  substrate: Substrate;

  // Flow 1
  phase: Flow1Phase;
  transcriptText: string;
  transcriptDone: boolean;
  stepIndex: number; // count of completed processing steps
  reviewOpen: boolean;

  activity: ActivityEntry[];

  // actions
  startVoiceNote: () => void;
  openReview: () => void;
  closeReview: () => void;
  approve: () => void;
  replay: () => void;
}

const DemoContext = createContext<DemoState | null>(null);

// Reveal cadence — calm but stage-paced.
const TOKEN_MS = 68;
const PROCESS_STEP_MS = 480;

function buildActivity(substrate: Substrate): ActivityEntry[] {
  return flow1.outputIds.map((id) => {
    const comm = commById(substrate, id);
    const who = outputRecipient(substrate, comm);
    let text: string;
    switch (comm.kind) {
      case "owner-update":
        text = `Owner update sent to ${who}`;
        break;
      case "buyer-follow-up":
        text = `Follow-up sent to ${who}`;
        break;
      case "objection":
        text = "Objections logged · 12 rue Lamartine";
        break;
      default:
        text = `Estimation opportunity flagged · ${who}`;
    }
    return { id, text, tier: comm.tier, tag: "Approved", time: "Just now" };
  });
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [substrate, setSubstrate] = useState<Substrate>(() => loadSubstrate());
  const [phase, setPhase] = useState<Flow1Phase>("idle");
  const [revealCount, setRevealCount] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [activity, setActivity] = useState<ActivityEntry[]>([]);

  const tokens = useMemo(() => flow1.transcript.split(" "), []);
  const approveTimer = useRef<number | null>(null);

  // --- Recording: stream the transcript, then move to processing ---
  useEffect(() => {
    if (phase !== "recording") return;
    setRevealCount(0);
    const timers: number[] = [];
    let i = 0;
    const interval = window.setInterval(() => {
      i += 1;
      setRevealCount(i);
      if (i >= tokens.length) {
        window.clearInterval(interval);
        timers.push(window.setTimeout(() => setPhase("processing"), 720));
      }
    }, TOKEN_MS);
    return () => {
      window.clearInterval(interval);
      timers.forEach(window.clearTimeout);
    };
  }, [phase, tokens.length]);

  // --- Processing: tick through the checklist, then land the card ---
  useEffect(() => {
    if (phase !== "processing") return;
    setStepIndex(0);
    const timers: number[] = [];
    const total = flow1.processingSteps.length;
    for (let s = 1; s <= total; s += 1) {
      timers.push(window.setTimeout(() => setStepIndex(s), PROCESS_STEP_MS * s));
    }
    timers.push(
      window.setTimeout(() => setPhase("ready"), PROCESS_STEP_MS * total + 520),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [phase]);

  const startVoiceNote = useCallback(() => {
    setPhase((p) => (p === "idle" ? "recording" : p));
  }, []);

  const openReview = useCallback(() => setReviewOpen(true), []);
  const closeReview = useCallback(() => setReviewOpen(false), []);

  const approve = useCallback(() => {
    setPhase("approved");
    setActivity(buildActivity(substrate));
    if (approveTimer.current) window.clearTimeout(approveTimer.current);
    approveTimer.current = window.setTimeout(() => setReviewOpen(false), 680);
  }, [substrate]);

  const replay = useCallback(() => {
    if (approveTimer.current) window.clearTimeout(approveTimer.current);
    setSubstrate(loadSubstrate());
    setPhase("idle");
    setRevealCount(0);
    setStepIndex(0);
    setReviewOpen(false);
    setActivity([]);
  }, []);

  const transcriptText = useMemo(
    () => tokens.slice(0, revealCount).join(" "),
    [tokens, revealCount],
  );

  const value: DemoState = {
    substrate,
    phase,
    transcriptText,
    transcriptDone: revealCount >= tokens.length,
    stepIndex,
    reviewOpen,
    activity,
    startVoiceNote,
    openReview,
    closeReview,
    approve,
    replay,
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo(): DemoState {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within DemoProvider");
  return ctx;
}
