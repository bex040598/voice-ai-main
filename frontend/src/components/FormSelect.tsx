import type { SelectHTMLAttributes } from "react";

export function FormSelect({
  label,
  error,
  id,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string }) {
  const selectId = id || props.name || crypto.randomUUID();
  return (
    <label className="form-field" htmlFor={selectId}>
      <span className="form-label">{label}</span>
      <select id={selectId} {...props} aria-invalid={Boolean(error)} aria-describedby={error ? `${selectId}-error` : undefined}>
        {children}
      </select>
      {error ? (
        <span className="form-error" id={`${selectId}-error`} role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}
