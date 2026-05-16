import { useState } from "react";
import {
  applyAvatarProfile,
  generateAvatarProfile,
  type AvatarProfile,
  uploadReferencePhoto
} from "../../lib/avatar/avatarGenerationAdapter";

export function PhotoAvatarUploader({
  onAvatarReady
}: {
  onAvatarReady: (profile: AvatarProfile) => void;
}) {
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("No image selected");

  const handleGenerate = async () => {
    if (!file) return;
    setStatus("Mock processing started...");
    const uploaded = await uploadReferencePhoto(file);
    setPreview(uploaded.previewUrl);
    const profile = await generateAvatarProfile(uploaded);
    await applyAvatarProfile(profile);
    onAvatarReady(profile);
    setStatus("Custom avatar profile created");
  };

  return (
    <section className="panel avatar-upload-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Photo Avatar</p>
          <h3>Custom avatar tayyorlash</h3>
        </div>
      </div>
      <label className="upload-drop">
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            const selected = event.target.files?.[0] || null;
            setFile(selected);
            setStatus(selected ? `Selected: ${selected.name}` : "No image selected");
          }}
        />
        <span>Rasm yuklang va custom avatar profilini yarating.</span>
      </label>
      <button type="button" className="primary-button" onClick={handleGenerate} disabled={!file}>
        Generate custom avatar
      </button>
      <div className="upload-preview">
        {preview ? <img src={preview} alt="Preview" /> : <span>Preview bu yerda ko'rinadi.</span>}
      </div>
      <p className="panel-note">
        Bu demo rejim. Keyinchalik Ready Player Me, D-ID, HeyGen, MediaPipe Face Mesh yoki custom 3D face rig bilan ulash mumkin.
      </p>
      <div className="warning-panel">{status}</div>
    </section>
  );
}
