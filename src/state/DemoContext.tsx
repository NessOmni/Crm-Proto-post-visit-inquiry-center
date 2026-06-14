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

/** The home briefing, or the deep Contacts database view. */
export type AppView = "briefing" | "contacts";

/** Who a cross-actor activity item came from — a teammate, or a client
 *  acting through the portal. Drives the attribution element. */
export type ActivityActor =
  | { kind: "teammate"; name: string; initials: string }
  | { kind: "client"; initials: string };

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
  /** Attribution, when the item came from a colleague or a client. */
  actor?: ActivityActor;
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
  // Cross-actor: the wider agency humming — logged, attributed, not pushed.
  {
    id: "ov-team-mandate",
    text: "New mandate · 11 rue Oberkampf — added by Karim Benali",
    tier: "automatic",
    tag: "Automatic",
    time: "07:40",
    group: "overnight",
    actor: { kind: "teammate", name: "Karim Benali", initials: "KB" },
  },
  {
    id: "ov-team-offer",
    text: "Offer logged · 5 rue de Lancry — by Sophie Marchand",
    tier: "automatic",
    tag: "Automatic",
    time: "06:50",
    group: "overnight",
    actor: { kind: "teammate", name: "Sophie Marchand", initials: "SM" },
  },
  {
    id: "ov-client-doc",
    text: "Document uploaded · M. Mercier added his DPE",
    tier: "automatic",
    tag: "Automatic",
    time: "06:20",
    group: "overnight",
    actor: { kind: "client", initials: "JM" },
  },
  {
    id: "ov-client-budget",
    text: "Buyer updated their budget · J. Caron, now 460 k€",
    tier: "automatic",
    tag: "Automatic",
    time: "05:30",
    group: "overnight",
    actor: { kind: "client", initials: "JC" },
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
    replay,
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo(): DemoState {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within DemoProvider");
  return ctx;
}
