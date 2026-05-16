import type { InputHTMLAttributes } from "react";

export function FormInput({
  label,
  error,
  id,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  const inputId = id || props.name || crypto.randomUUID();
  return (
    <label className="form-field" htmlFor={inputId}>
      <span className="form-label">{label}</span>
      <input id={inputId} {...props} aria-invalid={Boolean(error)} aria-describedby={error ? `${inputId}-error` : undefined} />
      {error ? (
        <span className="form-error" id={`${inputId}-error`} role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}
