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
import { IconReplay } from "./components/icons";

export default function App() {
  const { substrate, replay } = useDemo();
  const { agency, agent } = substrate;
  useKeyboardNav();

  // UI preference, kept out of the demo scene (not reset by Replay).
  const [railCollapsed, setRailCollapsed] = useState(false);

  return (
    <div className="canvas">
      <div className="shell">
        <header className="shell__header">
          <div className="brand">
            <span className="brand__mark serif">Omnicasa</span>
            <span className="brand__sep" />
            <span className="kicker">{agency.name}</span>
          </div>

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
          className={`shell__body ${railCollapsed ? "shell__body--rail-collapsed" : ""}`}
        >
          <LeftRail
            collapsed={railCollapsed}
            onToggle={() => setRailCollapsed((c) => !c)}
          />
          {/* The centre column: briefing scrolls; the voice/conversation
              dock is anchored to its bottom, aligned to the content column. */}
          <div className="center">
            <Briefing />
            <VoiceCapture />
            <ConversationBar />
          </div>
          <RightColumn />
        </div>
      </div>

      <ReviewSheet />
      <LeadLens />
    </div>
  );
}
