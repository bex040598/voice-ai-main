export function VoiceOutputControls({
  autoSpeak,
  setAutoSpeak,
  voices,
  selectedVoice,
  setSelectedVoice,
  rate,
  setRate,
  pitch,
  setPitch,
  onSpeakAgain,
  onStopSpeaking
}: {
  autoSpeak: boolean;
  setAutoSpeak: (value: boolean) => void;
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  setSelectedVoice: (voice: SpeechSynthesisVoice | null) => void;
  rate: number;
  setRate: (value: number) => void;
  pitch: number;
  setPitch: (value: number) => void;
  onSpeakAgain: () => void;
  onStopSpeaking: () => void;
}) {
  return (
    <section className="panel tts-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Voice Output</p>
          <h3>Text-to-speech boshqaruvi</h3>
        </div>
      </div>
      <label className="toggle-row">
        <input type="checkbox" checked={autoSpeak} onChange={(event) => setAutoSpeak(event.target.checked)} />
        <span>Auto Speak</span>
      </label>
      <label className="control-group">
        <span>Voice select</span>
        <select
          value={selectedVoice?.voiceURI || ""}
          onChange={(event) => {
            const voice = voices.find((item) => item.voiceURI === event.target.value) || null;
            setSelectedVoice(voice);
          }}
        >
          {voices.map((voice) => (
            <option key={voice.voiceURI} value={voice.voiceURI}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </label>
      <label className="control-group">
        <span>Rate: {rate.toFixed(2)}</span>
        <input type="range" min="0.7" max="1.2" step="0.01" value={rate} onChange={(event) => setRate(Number(event.target.value))} />
      </label>
      <label className="control-group">
        <span>Pitch: {pitch.toFixed(2)}</span>
        <input type="range" min="0.8" max="1.3" step="0.01" value={pitch} onChange={(event) => setPitch(Number(event.target.value))} />
      </label>
      <div className="button-row">
        <button type="button" className="primary-button" onClick={onSpeakAgain}>
          Speak Again
        </button>
        <button type="button" className="ghost-button" onClick={onStopSpeaking}>
          Stop Speaking
        </button>
      </div>
    </section>
  );
}
