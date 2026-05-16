import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

function BaseButton({
  variant,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant: Variant }) {
  return <button {...props} className={`btn btn-${variant} ${className}`.trim()} />;
}

export function PrimaryButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <BaseButton {...props} variant="primary" />;
}

export function SecondaryButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <BaseButton {...props} variant="secondary" />;
}

export function GhostButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <BaseButton {...props} variant="ghost" />;
}
