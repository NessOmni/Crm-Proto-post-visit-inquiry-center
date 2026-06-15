/* The assistant command surface — the inverse of a CRUD palette.
   Summoned over the calm briefing (⌘K, or by focusing the dock input);
   the home stays behind it. The only verbs are the actual work: there
   are no "Add / Create / New" commands here. Five job suggestions, each
   a real-estate task on a concrete fixture object. Selecting the offer —
   or typing the canned line — runs the existing comprehension moment.
   Reuses the voice component for hold-to-dictate. Deterministic. */
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useDemo } from "../state/DemoContext";
import {
  IconFileSignature,
  IconGauge,
  IconFileText,
  IconBellRing,
  IconRadar,
  IconMic,
  IconArrow,
} from "./icons";

/** A suggested job: a workflow icon, the task as a verb, a concrete
 *  fixture object. `run` is set only on the wired comprehension demo. */
interface Suggestion {
  icon: ReactNode;
  label: string;
  meta?: string;
  run?: boolean;
}

const SUGGESTIONS: Suggestion[] = [
  {
    icon: <IconFileSignature />,
    label: "Draft an offer — 12 rue Lamartine",
    meta: "€840 000 · Julien Mercier",
    run: true,
  },
  { icon: <IconGauge />, label: "Estimate 9 rue des Martyrs" },
  { icon: <IconFileText />, label: "Draft owner report — Hélène Fontaine" },
  {
    icon: <IconBellRing />,
    label: "Follow up with Sarah Petit",
    meta: "before 11:30",
  },
  { icon: <IconRadar />, label: "Publish 15 rue Beaurepaire to the portals" },
];

export function CommandSurface() {
  const { commandOpen, closeCommand, startVoice } = useDemo();
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Take focus on open; clear the line on close.
  useEffect(() => {
    if (commandOpen) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 0);
      return () => window.clearTimeout(t);
    }
    setText("");
  }, [commandOpen]);

  if (!commandOpen) return null;

  const runOffer = () => startVoice("offer-lamartine");

  // The canned typed line resolves the same way as selecting the card.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const t = text.trim().toLowerCase();
    if (t.includes("offer") && (t.includes("lamartine") || t.includes("840"))) {
      runOffer();
    }
  };

  return (
    <>
      <div className="command-scrim" onClick={closeCommand} />
      <section
        className="command"
        role="dialog"
        aria-modal="true"
        aria-label="Assistant"
      >
        <div className="command__sugs">
          <span className="kicker command__label">Suggested for today</span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s.label}
              type="button"
              className="command-sug"
              onClick={s.run ? runOffer : undefined}
              aria-disabled={s.run ? undefined : true}
            >
              <span className="command-sug__icon">{s.icon}</span>
              <span className="command-sug__text">{s.label}</span>
              {s.meta && <span className="command-sug__meta">{s.meta}</span>}
            </button>
          ))}
        </div>

        <form className="command__inputrow" onSubmit={onSubmit}>
          <input
            ref={inputRef}
            className="command__input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Tell me what to do — or ask anything."
            aria-label="Tell me what to do, or ask anything"
          />
          {text.trim() ? (
            <button
              type="submit"
              className="command__enter"
              aria-label="Run"
            >
              <IconArrow />
            </button>
          ) : (
            <button
              type="button"
              className="command__mic"
              aria-label="Hold to dictate"
              onClick={() => startVoice("global")}
            >
              <IconMic />
            </button>
          )}
        </form>
      </section>
    </>
  );
}
