export function TranscriptPanel({
  transcript,
  interimTranscript
}: {
  transcript: string;
  interimTranscript: string;
}) {
  return (
    <section className="panel transcript-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Transcript</p>
          <h3>Speech-to-text oqimi</h3>
        </div>
      </div>
      <div className="transcript-box">
        <strong>Final transcript</strong>
        <p>{transcript || "Final transcript shu yerda ko'rinadi."}</p>
      </div>
      <div className="transcript-box interim">
        <strong>Interim transcript</strong>
        <p>{interimTranscript || "Interim capture kutilmoqda."}</p>
      </div>
    </section>
  );
}
