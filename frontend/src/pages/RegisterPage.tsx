import { useState } from "react";
import { FormInput } from "../components/FormInput";
import { FormSelect } from "../components/FormSelect";
import { FormStepper } from "../components/FormStepper";
import { PageHeader } from "../components/PageHeader";
import { PrimaryButton, SecondaryButton } from "../components/PrimaryButton";

const steps = ["Role", "Personal", "Academic", "Security", "Complete"];

export function RegisterPage() {
  const [step, setStep] = useState(1);
  return (
    <div className="page-stack">
      <PageHeader title="Register" description="Professional onboarding stepper, shaxsiy va akademik ma'lumotlar, Face ID optional." />
      <section className="card onboarding-card">
        <FormStepper steps={steps} activeIndex={step} />
        <div className="grid card-grid two">
          <FormSelect label="Role" defaultValue="student">
            <option value="student">Talaba</option>
            <option value="teacher">O'qituvchi</option>
            <option value="staff">Xodim</option>
          </FormSelect>
          <FormInput label="F.I.Sh." placeholder="To'liq ism" />
          <FormInput label="Email" placeholder="example@atmu.uz" />
          <FormInput label="Telefon" placeholder="+998 ..." />
          <FormSelect label="Fakultet" defaultValue="at">
            <option value="at">Axborot texnologiyalari</option>
            <option value="biz">Biznes boshqaruvi</option>
          </FormSelect>
          <FormInput label="Face ID status" placeholder="Optional setup available" />
        </div>
        <div className="button-row">
          <SecondaryButton onClick={() => setStep((value) => Math.max(0, value - 1))}>Oldingi</SecondaryButton>
          <PrimaryButton onClick={() => setStep((value) => Math.min(4, value + 1))}>Keyingi</PrimaryButton>
        </div>
      </section>
    </div>
  );
}
