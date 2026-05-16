import { motion } from "framer-motion";
import type { AssistantStatus, EmotionType } from "../../lib/assistant/assistantTypes";

export function LiveAssistantAvatar({
  status,
  emotion,
  customAvatarUrl
}: {
  status: AssistantStatus;
  emotion: EmotionType;
  customAvatarUrl?: string;
}) {
  const statusLabel =
    status === "idle"
      ? "Idle"
      : status === "listening"
        ? "Listening"
        : status === "thinking"
          ? "Thinking"
          : status === "speaking"
            ? "Speaking"
            : "Error";

  return (
    <section className="panel avatar-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Live Avatar</p>
          <h3>ATMURA human-like AI persona</h3>
        </div>
        <span className={`mini-pill ${status}`}>{statusLabel}</span>
      </div>
      <div className={`avatar-stage ${status} ${customAvatarUrl ? "custom-mode" : ""}`}>
        <motion.div
          className="avatar-aura"
          animate={{
            scale: status === "speaking" ? [1, 1.08, 1] : status === "thinking" ? [1, 1.03, 1] : 1,
            opacity: status === "error" ? 0.85 : [0.55, 0.85, 0.55]
          }}
          transition={{ repeat: Infinity, duration: 2.4 }}
        />
        {customAvatarUrl ? (
          <div className="custom-avatar-card">
            <img src={customAvatarUrl} alt="Custom avatar" />
            <span>Custom avatar mode</span>
          </div>
        ) : (
          <div className="human-avatar">
            <motion.div className="avatar-head" animate={{ y: status === "listening" ? 8 : [0, -4, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
              <div className="avatar-hair" />
              <div className="avatar-face">
                <motion.span className={`eye left ${emotion}`} animate={{ scaleY: status === "thinking" ? [1, 0.7, 1] : 1 }} transition={{ repeat: Infinity, duration: 2 }} />
                <motion.span className={`eye right ${emotion}`} animate={{ scaleY: status === "thinking" ? [1, 0.7, 1] : 1 }} transition={{ repeat: Infinity, duration: 2, delay: 0.12 }} />
                <span className={`brow left ${status}`} />
                <span className={`brow right ${status}`} />
                <motion.span
                  className={`mouth ${status}`}
                  animate={{ scaleX: status === "speaking" ? [1, 1.4, 1] : 1, scaleY: status === "speaking" ? [1, 0.75, 1] : 1 }}
                  transition={{ repeat: Infinity, duration: 0.45 }}
                />
              </div>
            </motion.div>
            <div className="avatar-shoulders" />
            <div className="voice-rings">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}
      </div>
      <div className="avatar-readout">
        <div><span>State</span><strong>{status}</strong></div>
        <div><span>Emotion</span><strong>{emotion}</strong></div>
      </div>
    </section>
  );
}
