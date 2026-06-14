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
import type { Substrate, TrustTier, VoiceScenario } from "../data/types";
import { loadSubstrate, flow1, voiceScenarios } from "../data/fixtures";
import { commById, outputRecipient } from "../data/selectors";

/** Flow 1 progresses through these phases. */
export type Flow1Phase = "idle" | "recording" | "processing" | "ready" | "approved";

/** A generalized "voice moment" plays through these beats. */
export type VoicePhase = "transcribing" | "understood" | "drafted";

/** The home briefing, or the deep Contacts database view. */
export type AppView = "briefing" | "contacts";

/** What set off an assistant action that another actor caused. The actor
 *  of the log line is ALWAYS the assistant; this names the source.
 *  Three visually distinct kinds make the fold legible. */
export type TriggerSource =
  | { kind: "teammate"; name: string; initials: string; detail: string }
  | { kind: "assistant-of"; name: string; detail: string }
  | { kind: "client"; detail: string };

export interface ActivityEntry {
  id: string;
  text: string;
  tier: TrustTier;
  tag: string;
  time: string;
  /** Which session the entry belongs to — drives the "Overnight" eyebrow. */
  group: "overnight" | "approved";
  /** Provenance, when the assistant enriched from a source. */
  source?: string;
  /** What triggered this assistant action — a teammate, a colleague's
   *  assistant, or a client. The action itself is always the assistant's. */
  triggeredBy?: TriggerSource;
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

  // Flow 2 — the Lead Lens
  lensOpen: boolean;
  selectedLeadId: string | null;
  repliedLeadIds: Record<string, boolean>;

  // Navigation — which surface is showing
  view: AppView;

  // Voice — the generalized "voice moment"
  voiceScenario: VoiceScenario | null;
  voicePhase: VoicePhase;
  voiceTranscript: string;
  voiceTranscriptDone: boolean;
  approvedVoice: Record<string, boolean>;

  // actions
  startVoiceNote: () => void;
  openReview: () => void;
  closeReview: () => void;
  approve: () => void;
  openLens: () => void;
  closeLens: () => void;
  selectLead: (id: string) => void;
  sendReply: (id: string) => void;
  openContacts: () => void;
  goHome: () => void;
  startVoice: (id: string) => void;
  closeVoice: () => void;
  approveVoiceOutput: (outputId: string) => void;
  replay: () => void;
}

const DemoContext = createContext<DemoState | null>(null);

// Reveal cadence — calm but stage-paced.
const TOKEN_MS = 68;
const PROCESS_STEP_MS = 480;

/* What the assistant handled overnight, shown in the activity rail on
   load (newest-ish first; the lead-ranking item leads). These span the
   product's range: lead handling, email triage, dedup, market veille,
   and listing monitoring. All Automatic · handled. */
const OVERNIGHT_ACTIVITY: ActivityEntry[] = [
  {
    id: "ov-leads",
    text: "6 enquiries ranked by likelihood to convert · 24 rue de la Roquette",
    tier: "automatic",
    tag: "Automatic",
    time: "05:47",
    group: "overnight",
  },
  {
    id: "ov-emails",
    text: "Overnight emails sorted · 5 logged, none need you",
    tier: "automatic",
    tag: "Automatic",
    time: "06:04",
    group: "overnight",
  },
  {
    id: "ov-enrich-contact",
    text: "Contact enriched · Margaux Bonnet — employer + 2nd phone added",
    tier: "automatic",
    tag: "Automatic",
    time: "06:12",
    group: "overnight",
    source: "inbox",
  },
  {
    id: "ov-enrich-owner",
    text: "Owner note updated · Hélène Fontaine — from her latest email",
    tier: "automatic",
    tag: "Automatic",
    time: "05:55",
    group: "overnight",
    source: "inbox",
  },
  {
    id: "ov-call",
    text: "Call transcribed · M. Bertin · 8 min — number matched to contact, 3 actions detected",
    tier: "automatic",
    tag: "Automatic",
    time: "04:30",
    group: "overnight",
    source: "call · 08 Jun",
  },
  // Cross-actor: every line is MY assistant's action; the source that
  // set it off rides along as a "triggered by" tag.
  {
    id: "ov-resp-karim",
    text: "Drafted buyer alert · Mme Durand",
    tier: "automatic",
    tag: "Automatic",
    time: "07:42",
    group: "overnight",
    triggeredBy: {
      kind: "teammate",
      name: "Karim Benali",
      initials: "KB",
      detail: "new mandate, 11 rue Oberkampf",
    },
  },
  {
    id: "ov-resp-mesh",
    text: "Drafted price-update note · 9 rue des Martyrs",
    tier: "automatic",
    tag: "Automatic",
    time: "04:55",
    group: "overnight",
    triggeredBy: {
      kind: "assistant-of",
      name: "Karim",
      detail: "flagged a new comparable",
    },
  },
  {
    id: "ov-resp-mercier",
    text: "Filed M. Mercier's DPE · 12 rue Lamartine now complete",
    tier: "automatic",
    tag: "Automatic",
    time: "06:21",
    group: "overnight",
    triggeredBy: { kind: "client", detail: "M. Mercier upload" },
  },
  {
    id: "ov-resp-caron",
    text: "Re-checked J. Caron's matches · 1 new fit",
    tier: "automatic",
    tag: "Automatic",
    time: "05:31",
    group: "overnight",
    triggeredBy: {
      kind: "client",
      detail: "J. Caron updated budget to 460 k€",
    },
  },
  {
    id: "ov-dedup",
    text: "1 duplicate enquiry merged",
    tier: "automatic",
    tag: "Automatic",
    time: "03:18",
    group: "overnight",
  },
  {
    id: "ov-market",
    text: "Market scan complete · 3 active sectors, no price alerts",
    tier: "automatic",
    tag: "Automatic",
    time: "02:30",
    group: "overnight",
  },
  {
    id: "ov-listing",
    text: "Listing health checked · 12 rue Lamartine, on track",
    tier: "automatic",
    tag: "Automatic",
    time: "01:40",
    group: "overnight",
  },
];

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
    // Concrete clock timestamp from the action's record.
    return {
      id,
      text,
      tier: comm.tier,
      tag: "Approved",
      time: comm.createdAt.slice(11, 16),
      group: "approved" as const,
    };
  });
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [substrate, setSubstrate] = useState<Substrate>(() => loadSubstrate());
  const [phase, setPhase] = useState<Flow1Phase>("idle");
  const [revealCount, setRevealCount] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [reviewOpen, setReviewOpen] = useState(false);
  // The rail starts populated with the overnight session — never empty.
  const [activity, setActivity] = useState<ActivityEntry[]>(OVERNIGHT_ACTIVITY);

  // Flow 2
  const [lensOpen, setLensOpen] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [repliedLeadIds, setRepliedLeadIds] = useState<Record<string, boolean>>({});

  // Navigation
  const [view, setView] = useState<AppView>("briefing");

  // Voice — the generalized voice moment (global / upload / record).
  const [voiceId, setVoiceId] = useState<string | null>(null);
  const [voicePhase, setVoicePhase] = useState<VoicePhase>("transcribing");
  const [voiceReveal, setVoiceReveal] = useState(0);
  const [approvedVoice, setApprovedVoice] = useState<Record<string, boolean>>({});

  const tokens = useMemo(() => flow1.transcript.split(" "), []);
  const approveTimer = useRef<number | null>(null);

  const voiceScenario = voiceId ? voiceScenarios[voiceId] : null;
  const voiceTokens = useMemo(
    () => (voiceId ? voiceScenarios[voiceId].transcript.split(" ") : []),
    [voiceId],
  );

  // --- Voice: stream the transcript, then reveal Understood, then drafts.
  useEffect(() => {
    if (!voiceId || voicePhase !== "transcribing") return;
    setVoiceReveal(0);
    const timers: number[] = [];
    let i = 0;
    const interval = window.setInterval(() => {
      i += 1;
      setVoiceReveal(i);
      if (i >= voiceTokens.length) {
        window.clearInterval(interval);
        timers.push(window.setTimeout(() => setVoicePhase("understood"), 520));
      }
    }, 58);
    return () => {
      window.clearInterval(interval);
      timers.forEach(window.clearTimeout);
    };
  }, [voiceId, voicePhase, voiceTokens.length]);

  useEffect(() => {
    if (!voiceId || voicePhase !== "understood") return;
    const t = window.setTimeout(() => setVoicePhase("drafted"), 1100);
    return () => window.clearTimeout(t);
  }, [voiceId, voicePhase]);

  const startVoice = useCallback((id: string) => {
    if (!voiceScenarios[id]) return;
    setVoiceId(id);
    setVoicePhase("transcribing");
    setVoiceReveal(0);
    setApprovedVoice({});
  }, []);

  const closeVoice = useCallback(() => setVoiceId(null), []);

  const approveVoiceOutput = useCallback((outputId: string) => {
    setApprovedVoice((prev) => ({ ...prev, [outputId]: true }));
  }, []);

  const voiceTranscript = useMemo(
    () => voiceTokens.slice(0, voiceReveal).join(" "),
    [voiceTokens, voiceReveal],
  );

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
    // Prepend the four approved actions; the overnight feed remains below.
    setActivity([...buildActivity(substrate), ...OVERNIGHT_ACTIVITY]);
    if (approveTimer.current) window.clearTimeout(approveTimer.current);
    approveTimer.current = window.setTimeout(() => setReviewOpen(false), 680);
  }, [substrate]);

  // --- Flow 2 actions ---
  const openLens = useCallback(() => {
    setSelectedLeadId((prev) => prev ?? substrate.leads[0]?.id ?? null);
    setLensOpen(true);
  }, [substrate.leads]);

  const closeLens = useCallback(() => setLensOpen(false), []);
  const selectLead = useCallback((id: string) => setSelectedLeadId(id), []);

  // --- Navigation ---
  const openContacts = useCallback(() => setView("contacts"), []);
  const goHome = useCallback(() => setView("briefing"), []);

  const sendReply = useCallback((id: string) => {
    setRepliedLeadIds((prev) => ({ ...prev, [id]: true }));
    setSubstrate((prev) => ({
      ...prev,
      leads: prev.leads.map((l) =>
        l.id === id ? { ...l, status: "active" } : l,
      ),
    }));
  }, []);

  const replay = useCallback(() => {
    if (approveTimer.current) window.clearTimeout(approveTimer.current);
    setSubstrate(loadSubstrate());
    setPhase("idle");
    setRevealCount(0);
    setStepIndex(0);
    setReviewOpen(false);
    setActivity(OVERNIGHT_ACTIVITY); // back to the overnight state, not empty
    setLensOpen(false);
    setSelectedLeadId(null);
    setRepliedLeadIds({});
    setView("briefing"); // back to the home briefing; Contacts filters unmount
    setVoiceId(null);
    setVoicePhase("transcribing");
    setVoiceReveal(0);
    setApprovedVoice({});
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
    lensOpen,
    selectedLeadId,
    repliedLeadIds,
    view,
    voiceScenario,
    voicePhase,
    voiceTranscript,
    voiceTranscriptDone: voiceReveal >= voiceTokens.length && voiceTokens.length > 0,
    approvedVoice,
    startVoiceNote,
    openReview,
    closeReview,
    approve,
    openLens,
    closeLens,
    selectLead,
    sendReply,
    openContacts,
    goHome,
    startVoice,
    closeVoice,
    approveVoiceOutput,
    replay,
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo(): DemoState {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within DemoProvider");
  return ctx;
}
