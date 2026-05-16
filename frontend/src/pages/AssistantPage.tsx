import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExternalBotFrame } from "../components/assistant/ExternalBotFrame";
import { AssistantChat } from "../components/assistant/AssistantChat";
import { AssistantInputBar } from "../components/assistant/AssistantInputBar";
import { AssistantShell } from "../components/assistant/AssistantShell";
import { AssistantStatusBadge } from "../components/assistant/AssistantStatusBadge";
import { SuggestedPromptGrid } from "../components/assistant/SuggestedPromptGrid";
import { TranscriptPanel } from "../components/assistant/TranscriptPanel";
import { VoiceDiagnosticsPanel } from "../components/assistant/VoiceDiagnosticsPanel";
import { VoiceOutputControls } from "../components/assistant/VoiceOutputControls";
import { VoiceRecorder } from "../components/assistant/VoiceRecorder";
import { LiveAssistantAvatar } from "../components/avatar/LiveAssistantAvatar";
import { PhotoAvatarUploader } from "../components/avatar/PhotoAvatarUploader";
import { useAssistantChat } from "../hooks/useAssistantChat";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { useTextToSpeech } from "../hooks/useTextToSpeech";
import { checkExternalBotHealth } from "../lib/api/atmuAiAdapter";
import { detectEmotion } from "../lib/assistant/emotionDetector";
import type { AssistantStatus, ExternalBotStatus } from "../lib/assistant/assistantTypes";
import type { AvatarProfile } from "../lib/avatar/avatarGenerationAdapter";

export function AssistantPage() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [autoSend, setAutoSend] = useState(true);
  const [externalBotStatus, setExternalBotStatus] = useState<ExternalBotStatus>("checking");
  const [customAvatar, setCustomAvatar] = useState<AvatarProfile | null>(null);

  const speech = useSpeechRecognition();
  const tts = useTextToSpeech();
  const chat = useAssistantChat({
    autoSpeak,
    speak: tts.speak,
    externalBotStatus
  });

  useEffect(() => {
    checkExternalBotHealth().then(setExternalBotStatus);
  }, []);

  useEffect(() => {
    if (speech.finalTranscript) {
      setInput(speech.finalTranscript);
      if (autoSend) {
        void chat.sendMessage(speech.finalTranscript);
        speech.resetTranscript();
      }
    }
  }, [autoSend, chat, speech]);

  const status = useMemo<AssistantStatus>(() => {
    if (speech.error || tts.error || chat.error) return "error";
    if (speech.isListening) return "listening";
    if (chat.isThinking) return "thinking";
    if (tts.isSpeaking) return "speaking";
    return "idle";
  }, [chat.error, chat.isThinking, speech.error, speech.isListening, tts.error, tts.isSpeaking]);

  const latestUserText = [...chat.messages].reverse().find((message) => message.role === "user")?.text || "";
  const emotionInfo = detectEmotion(latestUserText || chat.lastReply?.text || "");
  const fallbackMessage =
    externalBotStatus === "fallback"
      ? "External bot ulanmasa ham local assistant engine ishlayapti."
      : "";

  const selectedVoiceLabel =
    tts.selectedVoice ? `${tts.selectedVoice.name} (${tts.selectedVoice.lang})` : "No voice selected";

  const lastAssistantMessage = [...chat.messages].reverse().find((message) => message.role === "assistant")?.text || "";

  return (
    <AssistantShell
      toast={chat.toastMessage}
      left={
        <>
          <div className="panel stacked-top">
            <div className="top-status-row">
              <AssistantStatusBadge status={status} />
              <span className="mini-pill neutral">Emotion: {emotionInfo.emotion}</span>
            </div>
            <p className="panel-note">{emotionInfo.adaptation}</p>
          </div>
          <LiveAssistantAvatar
            status={status}
            emotion={emotionInfo.emotion}
            customAvatarUrl={customAvatar?.previewUrl}
          />
          <PhotoAvatarUploader onAvatarReady={setCustomAvatar} />
        </>
      }
      center={
        <>
          <section className="panel chat-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Conversation</p>
                <h3>Jonli chat va action flow</h3>
              </div>
              <AssistantStatusBadge status={status} />
            </div>
            <AssistantChat
              messages={chat.messages}
              isThinking={chat.isThinking}
              onAction={(action, text) => {
                void chat.handleAction(action, text, navigate);
              }}
            />
            <AssistantInputBar
              value={input}
              onChange={setInput}
              onSend={() => {
                void chat.sendMessage(input);
                setInput("");
              }}
              onMic={() => {
                if (speech.isListening) {
                  speech.stopListening();
                } else {
                  void speech.startListening();
                }
              }}
              onClear={chat.clearChat}
              micDisabled={!speech.isSupported}
              status={status}
            />
            {chat.routePreview ? <div className="route-preview">{chat.routePreview}</div> : null}
          </section>

          <section className="panel suggested-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Quick Actions</p>
                <h3>Suggested prompts</h3>
              </div>
            </div>
            <SuggestedPromptGrid
              prompts={chat.suggestedPrompts}
              onPick={(prompt) => {
                setInput(prompt);
                void chat.sendMessage(prompt);
              }}
            />
          </section>
        </>
      }
      right={
        <>
          <VoiceRecorder
            isListening={speech.isListening}
            isSupported={speech.isSupported}
            onStart={() => {
              void speech.startListening();
            }}
            onStop={speech.stopListening}
            autoSend={autoSend}
            setAutoSend={setAutoSend}
            status={status}
          />
          <TranscriptPanel transcript={speech.finalTranscript || input} interimTranscript={speech.interimTranscript} />
          <VoiceOutputControls
            autoSpeak={autoSpeak}
            setAutoSpeak={setAutoSpeak}
            voices={tts.voices}
            selectedVoice={tts.selectedVoice}
            setSelectedVoice={tts.setSelectedVoice}
            rate={tts.rate}
            setRate={tts.setRate}
            pitch={tts.pitch}
            setPitch={tts.setPitch}
            onSpeakAgain={() => tts.speak(lastAssistantMessage)}
            onStopSpeaking={tts.stop}
          />
          <VoiceDiagnosticsPanel
            status={status}
            permissionState={speech.permissionState}
            isSpeechSupported={speech.isSupported}
            ttsSupported={tts.isSupported}
            selectedVoiceLabel={selectedVoiceLabel}
            externalBotStatus={externalBotStatus}
            speechError={speech.error}
            ttsError={tts.error}
            fallbackMessage={fallbackMessage || chat.error}
          />
          <ExternalBotFrame status={externalBotStatus} />
        </>
      }
      bottom={
        <div className="bottom-strip panel">
          <div>
            <p className="eyebrow">Support Timeline</p>
            <h3>Assistant online, transcript, TTS va fallback oqimi real ishlayapti</h3>
          </div>
          <div className="timeline-row">
            <span>Mic permission: {speech.permissionState}</span>
            <span>Speech support: {speech.isSupported ? "Yes" : "No"}</span>
            <span>Auto Speak: {autoSpeak ? "ON" : "OFF"}</span>
            <span>Voice: {selectedVoiceLabel}</span>
          </div>
        </div>
      }
    />
  );
}
