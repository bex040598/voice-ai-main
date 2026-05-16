import { FormInput } from "./FormInput";
import { PrimaryButton } from "./PrimaryButton";

export function SearchPanel({
  title,
  description,
  value,
  onChange,
  actionLabel,
  onSubmit
}: {
  title: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
  actionLabel: string;
  onSubmit: () => void;
}) {
  return (
    <section className="card search-panel">
      <div className="section-title">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="search-panel-row">
        <FormInput
          label="Qidiruv"
          placeholder="Kitob, muallif, fan yoki kalit so'z"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <PrimaryButton onClick={onSubmit}>{actionLabel}</PrimaryButton>
      </div>
    </section>
  );
}
