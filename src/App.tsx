import { useState } from "react";
import { useDemo } from "./state/DemoContext";
import { useKeyboardNav } from "./state/useKeyboardNav";
import { LeftRail } from "./components/LeftRail";
import { Briefing } from "./components/Briefing";
import { RightColumn } from "./components/RightColumn";
import { ConversationBar } from "./components/ConversationBar";
import { VoiceCapture } from "./components/flow1/VoiceCapture";
import { ReviewSheet } from "./components/flow1/ReviewSheet";
import { LeadLens } from "./components/flow2/LeadLens";
import { ContactsView } from "./components/contacts/ContactsView";
import { IconReplay } from "./components/icons";

export default function App() {
  const { substrate, replay, view, goHome } = useDemo();
  const { agency, agent } = substrate;
  useKeyboardNav();

  // UI preference, kept out of the demo scene (not reset by Replay).
  const [railCollapsed, setRailCollapsed] = useState(false);

  const onContacts = view === "contacts";

  return (
    <div className="canvas">
      <div className="shell">
        <header className="shell__header">
          <button className="brand" onClick={goHome} title="Back to the briefing">
            <span className="brand__mark serif">Omnicasa</span>
            <span className="brand__sep" />
            <span className="kicker">{agency.name}</span>
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <button className="replay" aria-label="Replay the scene" onClick={replay}>
              <IconReplay />
              Replay the scene
            </button>
            <div className="agent-chip">
              <span className="agent-chip__avatar">{agent.initials}</span>
              <span>
                <span className="agent-chip__name">
                  {agent.firstName} {agent.lastName}
                </span>
                <br />
                <span className="agent-chip__role">{agent.role}</span>
              </span>
            </div>
          </div>
        </header>

        <div
          className={`shell__body ${railCollapsed ? "shell__body--rail-collapsed" : ""} ${
            onContacts ? "shell__body--contacts" : ""
          }`}
        >
          <LeftRail
            collapsed={railCollapsed}
            onToggle={() => setRailCollapsed((c) => !c)}
          />
          {onContacts ? (
            <ContactsView />
          ) : (
            <>
              {/* The centre column: briefing scrolls; the voice/conversation
                  dock is anchored to its bottom, aligned to the content column. */}
              <div className="center">
                <Briefing />
                <VoiceCapture />
                <ConversationBar />
              </div>
              <RightColumn />
            </>
          )}
        </div>
      </div>

      <ReviewSheet />
      <LeadLens />
    </div>
  );
}
