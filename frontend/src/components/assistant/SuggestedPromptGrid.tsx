export function SuggestedPromptGrid({
  prompts,
  onPick
}: {
  prompts: string[];
  onPick: (prompt: string) => void;
}) {
  return (
    <div className="suggested-grid">
      {prompts.map((prompt) => (
        <button key={prompt} type="button" className="suggested-card" onClick={() => onPick(prompt)}>
          {prompt}
        </button>
      ))}
    </div>
  );
}
