/* The reusable "voice moment" — the post-visit pattern, generalized.
   Three beats: the spoken words type out, an "Understood" strip resolves
   the entities + intent (the trust emphasis — correctable-looking chips),
   then drafted outputs / field updates land. Scripted & deterministic;
   used from the home bar, an upload, or a record. */
import { useDemo } from "../../state/DemoContext";
import {
  IconWaveform,
  IconEdit,
  IconCheck,
  IconArrow,
  IconClose,
} from "../icons";

export function VoiceMoment() {
  const {
    voiceScenario,
    voicePhase,
    voiceTranscript,
    voiceTranscriptDone,
    approvedVoice,
    approveVoiceOutput,
    closeVoice,
  } = useDemo();

  if (!voiceScenario) return null;
  const sc = voiceScenario;
  const showUnderstood = voicePhase === "understood" || voicePhase === "drafted";
  const showOutputs = voicePhase === "drafted";

  return (
    <>
      <div className="voice-scrim" onClick={closeVoice} />
      <section className="voice" role="dialog" aria-modal="true" aria-label="Voice moment">
        <header className="voice__head">
          {sc.context === "upload" ? (
            <span className="voice__file">
              <IconWaveform />
              {sc.fileName}
            </span>
          ) : (
            <span className="voice__status">
              <span className="voice__pulse" />
              {sc.context === "record" && sc.scopedTo
                ? `Dictating · for ${sc.scopedTo}`
                : "Dictating"}
            </span>
          )}
          <button className="voice__close" onClick={closeVoice} aria-label="Close">
            <IconClose />
          </button>
        </header>

        {sc.frameCopy && <p className="voice__frame">{sc.frameCopy}</p>}

        <p className="voice__transcript">
          {voiceTranscript}
          {!voiceTranscriptDone && <span className="voice__caret" />}
        </p>

        {showUnderstood && (
          <div className="voice__understood">
            <span className="kicker voice__label">Understood</span>
            <div className="voice__intents">
              {sc.intents.map((intent, i) => (
                <div className="uintent" key={i}>
                  {intent.chips.map((chip) => (
                    <span className="uchip" key={chip.label} title="Tap to correct">
                      <span className="uchip__label">{chip.label}</span>
                      <span className="uchip__value">{chip.value}</span>
                      <IconEdit className="uchip__edit" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {showOutputs && (
          <div className="voice__outputs">
            {sc.outputs.map((out) => {
              const approved = approvedVoice[out.id];
              if (out.kind === "field") {
                return (
                  <div className="voutput voutput--field" key={out.id}>
                    <span className="voutput__title">
                      {out.title} <span className="voutput__detail">{out.detail}</span>
                    </span>
                    <span className="badge badge--auto">Updated</span>
                  </div>
                );
              }
              return (
                <div className="voutput" key={out.id}>
                  <span className="voutput__title">{out.title}</span>
                  {approved ? (
                    <span className="badge badge--auto">
                      <IconCheck /> Approved
                    </span>
                  ) : (
                    <span className="voutput__action">
                      <span className="badge badge--drafted">Drafted · to approve</span>
                      <button
                        className="btn btn--primary voutput__btn"
                        onClick={() => approveVoiceOutput(out.id)}
                      >
                        Approve <IconArrow />
                      </button>
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
