import { FormInput } from "../components/FormInput";
import { FormSelect } from "../components/FormSelect";
import { PageHeader } from "../components/PageHeader";
import { PrimaryButton } from "../components/PrimaryButton";

export function UploadPage() {
  return (
    <div className="page-stack">
      <PageHeader title="Upload" description="Kafedra va kutubxona resurslarini yuklash uchun tartibli forma." />
      <section className="card upload-form-card">
        <div className="grid card-grid two">
          <FormInput label="Resurs nomi" placeholder="Masalan: Data Mining Lecture Notes" />
          <FormSelect label="Kategoriya" defaultValue="textbook">
            <option value="textbook">Darslik</option>
            <option value="manual">Qo'llanma</option>
            <option value="video">Video</option>
          </FormSelect>
          <FormInput label="Muallif" placeholder="Muallif yoki kafedra" />
          <FormInput label="Fayl" type="file" />
        </div>
        <PrimaryButton>Yuborish</PrimaryButton>
      </section>
    </div>
  );
}
