export function FormStepper({
  steps,
  activeIndex
}: {
  steps: string[];
  activeIndex: number;
}) {
  return (
    <ol className="stepper" aria-label="Ro'yxatdan o'tish bosqichlari">
      {steps.map((step, index) => (
        <li key={step} className={`step ${index <= activeIndex ? "active" : ""}`}>
          <span className="step-index">{index + 1}</span>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  );
}
