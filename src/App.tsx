import { useMemo } from "react";
import { loadSubstrate } from "./data/fixtures";
import { LeftRail } from "./components/LeftRail";
import { Briefing } from "./components/Briefing";
import { RightColumn } from "./components/RightColumn";
import { ConversationBar } from "./components/ConversationBar";
import { IconReplay } from "./components/icons";

export default function App() {
  // In-memory substrate, cloned from the frozen seed — resettable later.
  const substrate = useMemo(() => loadSubstrate(), []);
  const { agency, agent } = substrate;

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
            <button className="replay" aria-label="Replay the scene">
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

        <div className="shell__body">
          <LeftRail />
          <Briefing substrate={substrate} />
          <RightColumn substrate={substrate} />
        </div>

        <ConversationBar />
      </div>
    </div>
  );
}
