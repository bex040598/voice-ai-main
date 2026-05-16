const API_BASE = "";
let sharedSessionId = localStorage.getItem("session_id");
let activeAudio = null;
let selectedVoice = null;
let voiceModeAvailable = Boolean(window.speechSynthesis);

function generateFallbackSessionId() {
    return `local-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function getVoiceLabel() {
    if (!voiceModeAvailable) return "Text-only fallback";
    if (!selectedVoice) return "Default browser voice";
    const lang = selectedVoice.lang.toLowerCase();
    if (lang.includes("uz")) return "Uzbek voice";
    if (lang.includes("tr")) return "Turkish fallback";
    if (lang.includes("ru")) return "Russian fallback";
    return `${selectedVoice.name || "Browser"} fallback`;
}

function loadVoices() {
    const voices = window.speechSynthesis?.getVoices?.() || [];
    selectedVoice =
        voices.find((voice) => voice.lang.toLowerCase().includes("uz")) ||
        voices.find((voice) => voice.lang.toLowerCase().includes("tr")) ||
        voices.find((voice) => voice.lang.toLowerCase().includes("ru")) ||
        voices[0] ||
        null;
}

async function ensureSession() {
    if (sharedSessionId) return sharedSessionId;
    try {
        const response = await fetch(`${API_BASE}/api/session`);
        if (!response.ok) throw new Error("Session request failed");
        const data = await response.json();
        sharedSessionId = data.session_id || generateFallbackSessionId();
    } catch (error) {
        console.warn("Session endpoint unavailable, using local fallback session.", error);
        sharedSessionId = generateFallbackSessionId();
    }
    localStorage.setItem("session_id", sharedSessionId);
    return sharedSessionId;
}

function stopAllSpeech() {
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
    if (activeAudio) {
        activeAudio.pause();
        activeAudio.currentTime = 0;
        activeAudio = null;
    }
}

function speakText(text, onStart, onEnd) {
    if (!window.speechSynthesis) {
        voiceModeAvailable = false;
        onEnd?.();
        return;
    }
    stopAllSpeech();
    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.lang = selectedVoice?.lang || "uz-UZ";
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.onstart = () => onStart?.();
    utterance.onend = () => onEnd?.();
    utterance.onerror = () => onEnd?.();
    window.speechSynthesis.speak(utterance);
}

function setAvatarState(targets, state) {
    targets.avatar?.classList.remove("idle", "listening", "thinking", "speaking");
    targets.avatar?.classList.add(state);
    if (targets.stateText) {
        const stateMap = {
            idle: "Kutish rejimi",
            listening: "Eshitmoqda",
            thinking: "O'ylamoqda",
            speaking: "Gapirmoqda"
        };
        targets.stateText.textContent = stateMap[state] || state;
    }
    if (targets.badge) targets.badge.textContent = state.charAt(0).toUpperCase() + state.slice(1);
    if (targets.avatarLabel) {
        const labels = {
            idle: "ATMURA kutish rejimida",
            listening: "ATMURA eshityapti",
            thinking: "ATMURA o'ylayapti",
            speaking: "ATMURA gapiryapti"
        };
        targets.avatarLabel.textContent = labels[state];
    }
}

function addMessage(box, text, sender) {
    const msg = document.createElement("div");
    msg.className = `message ${sender}`;
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;
    msg.appendChild(bubble);
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
}

function addLoading(box) {
    const msg = document.createElement("div");
    msg.className = "message ai";
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.innerHTML = '<span class="typing-indicator"><span></span><span></span><span></span></span>';
    msg.appendChild(bubble);
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
    return msg;
}

function setupRecognition(targets, submitFn) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition || !targets.micBtn) {
        if (targets.micBtn) targets.micBtn.style.display = "none";
        if (targets.voiceOrb) targets.voiceOrb.style.display = "none";
        if (targets.topMicButton) targets.topMicButton.style.display = "none";
        if (targets.recognitionState) targets.recognitionState.textContent = "Unsupported";
        return null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "uz-UZ";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 3;

    recognition.onstart = () => {
        targets.micBtn.classList.add("listening");
        targets.status.textContent = "Eshitilmoqda...";
        setAvatarState(targets, "listening");
    };

    recognition.onend = () => {
        targets.micBtn.classList.remove("listening");
        if (targets.status.textContent === "Eshitilmoqda...") targets.status.textContent = "";
        if (!targets.status.textContent) setAvatarState(targets, "idle");
    };

    recognition.onresult = (event) => {
        const result = event.results[event.results.length - 1];
        targets.input.value = result[0].transcript.trim();
        if (targets.transcriptBox) targets.transcriptBox.textContent = targets.input.value || "Transkript bu yerda ko'rinadi.";
        if (result.isFinal) {
            recognition.stop();
            setTimeout(submitFn, 250);
        }
    };

    recognition.onerror = () => {
        targets.status.textContent = "Mikrofon bilan bog'liq xatolik yuz berdi.";
        if (targets.recognitionState) targets.recognitionState.textContent = "Error";
        setAvatarState(targets, "idle");
    };

    targets.micBtn.addEventListener("click", () => {
        stopAllSpeech();
        recognition.start();
    });
    return recognition;
}

function initAssistant(targets) {
    if (!targets.box || !targets.input || !targets.sendBtn || !targets.status) return;

    if (targets.fallbackState) {
        targets.fallbackState.textContent = getVoiceLabel();
    }
    if (targets.speechState && !voiceModeAvailable) {
        targets.speechState.textContent = "Text only";
    }

    const submit = async () => {
        const text = targets.input.value.trim();
        if (!text) return;

        await ensureSession();
        stopAllSpeech();
        addMessage(targets.box, text, "user");
        targets.input.value = "";
        if (targets.transcriptBox) targets.transcriptBox.textContent = text;
        targets.status.textContent = "Javob tayyorlanmoqda...";
        setAvatarState(targets, "thinking");
        if (targets.recognitionState) targets.recognitionState.textContent = "Captured";

        const loading = addLoading(targets.box);
        const version = Number(document.querySelector(`input[name="${targets.modeName}"]:checked`)?.value || 1);

        try {
            const response = await fetch(`${API_BASE}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: text,
                    session_id: sharedSessionId,
                    version
                })
            });
            if (!response.ok) throw new Error("Network error");
            const data = await response.json();
            loading.remove();
            addMessage(targets.box, data.response, "ai");
            if (targets.preview) targets.preview.textContent = data.response;
            if (targets.speechState) {
                targets.speechState.textContent = version === 2 && data.audio ? "Remote voice" : (voiceModeAvailable ? "Browser speech" : "Text only");
            }
            if (targets.fallbackState) targets.fallbackState.textContent = getVoiceLabel();

            const startSpeaking = () => setAvatarState(targets, "speaking");
            const endSpeaking = () => {
                setAvatarState(targets, "idle");
                targets.status.textContent = "";
            };

            if (version === 2 && data.audio) {
                activeAudio = new Audio(`data:audio/wav;base64,${data.audio}`);
                activeAudio.onplay = startSpeaking;
                activeAudio.onended = endSpeaking;
                activeAudio.onerror = () => speakText(data.response, startSpeaking, endSpeaking);
                activeAudio.play().catch(() => speakText(data.response, startSpeaking, endSpeaking));
            } else {
                speakText(data.response, startSpeaking, endSpeaking);
            }
        } catch (error) {
            console.error(error);
            loading.remove();
            addMessage(targets.box, "Uzr, xatolik yuz berdi. Qayta urinib ko'ring.", "ai");
            targets.status.textContent = "Xatolik yuz berdi.";
            if (targets.speechState) targets.speechState.textContent = "Unavailable";
            setAvatarState(targets, "idle");
        }
    };

    targets.sendBtn.addEventListener("click", submit);
    targets.input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") submit();
    });
    targets.input.addEventListener("input", () => stopAllSpeech());
    setupRecognition(targets, submit);

    if (targets.voiceOrb) {
        targets.voiceOrb.addEventListener("click", () => targets.micBtn?.click());
    }
    if (targets.topMicButton) {
        targets.topMicButton.addEventListener("click", () => targets.micBtn?.click());
    }
}

function initMiniChatToggle() {
    const panel = document.getElementById("miniChat");
    const trigger = document.getElementById("miniAssistantTrigger");
    const openBtn = document.getElementById("miniAssistantOpen");
    const closeBtn = document.getElementById("miniAssistantClose");

    const open = () => panel?.classList.add("open");
    const close = () => panel?.classList.remove("open");
    const toggle = () => panel?.classList.toggle("open");

    trigger?.addEventListener("click", toggle);
    openBtn?.addEventListener("click", open);
    closeBtn?.addEventListener("click", close);
}

function initUploadPreview() {
    const upload = document.getElementById("avatarUpload");
    const preview = document.getElementById("uploadPreview");
    if (!upload || !preview) return;

    upload.addEventListener("change", () => {
        const file = upload.files?.[0];
        preview.textContent = file ? `Selected: ${file.name}` : "No custom image selected";
    });
}

if (window.speechSynthesis) {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
}

initAssistant({
    box: document.getElementById("main-chat-box"),
    input: document.getElementById("main-user-input"),
    sendBtn: document.getElementById("main-send-btn"),
    micBtn: document.getElementById("main-mic-btn"),
    status: document.getElementById("main-status"),
    avatar: document.getElementById("mainAvatar"),
    avatarLabel: document.getElementById("avatarStateLabel"),
    badge: document.getElementById("mainStateBadge"),
    transcriptBox: document.getElementById("transcriptBox"),
    preview: document.getElementById("assistantResponsePreview"),
    recognitionState: document.getElementById("recognitionState"),
    speechState: document.getElementById("speechState"),
    fallbackState: document.getElementById("fallbackState"),
    modeName: "assistant-main",
    voiceOrb: document.getElementById("mainMicButton"),
    topMicButton: document.getElementById("assistantMicTop")
});

initAssistant({
    box: document.getElementById("mini-chat-box"),
    input: document.getElementById("mini-user-input"),
    sendBtn: document.getElementById("mini-send-btn"),
    micBtn: document.getElementById("mini-mic-btn"),
    status: document.getElementById("mini-status"),
    avatar: document.getElementById("miniAvatar"),
    stateText: document.getElementById("miniStateText"),
    modeName: "assistant-mini"
});

initMiniChatToggle();
initUploadPreview();
ensureSession().catch((error) => console.error(error));
