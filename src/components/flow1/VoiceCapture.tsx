/* The voice-capture sheet: the recording beat (streaming transcript)
   and the processing beat (the assistant visibly doing the work).
   Rises above the conversation bar; dismisses when the card lands. */
import { useDemo } from "../../state/DemoContext";
import { flow1 } from "../../data/fixtures";
import { IconCheck } from "../icons";

const WAVE_BARS = 28;
// Deterministic bar timing — no randomness, identical every run.
const delays = Array.from({ length: WAVE_BARS }, (_, i) => (i % 7) * 0.12);

export function VoiceCapture() {
  const { phase, transcriptText, transcriptDone, stepIndex } = useDemo();

  if (phase !== "recording" && phase !== "processing") return null;
  const recording = phase === "recording";

  return (
    <div className="capture" role="status" aria-live="polite">
      <div className="capture__head">
        <span className="capture__status">
          <span className="capture__pulse" />
          {recording ? "Recording" : "Processing"}
        </span>
        <span className="capture__duration">
          {recording ? flow1.durationLabel : "Post-visit · 12 rue Lamartine"}
        </span>
      </div>

      {recording ? (
        <>
          <div className="wave" aria-hidden="true">
            {delays.map((d, i) => (
              <span key={i} style={{ animationDelay: `${d}s` }} />
            ))}
          </div>
          <p className="capture__transcript">
            {transcriptText}
            {!transcriptDone && <span className="capture__caret" />}
          </p>
        </>
      ) : (
        <div className="capture__steps">
          {flow1.processingSteps.map((label, i) => {
            const done = i < stepIndex;
            const active = i === stepIndex;
            return (
              <div
                key={label}
                className={`step ${done ? "step--done" : ""} ${
                  active ? "step--active" : ""
                }`}
              >
                <span className="step__icon">
                  {done ? (
                    <IconCheck />
                  ) : active ? (
                    <span className="step__spinner" />
                  ) : null}
                </span>
                {label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
