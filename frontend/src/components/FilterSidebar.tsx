import { FormSelect } from "./FormSelect";

export function FilterSidebar() {
  return (
    <aside className="card filter-sidebar">
      <h3>Filterlar</h3>
      <FormSelect label="Format" defaultValue="all">
        <option value="all">Barchasi</option>
        <option value="pdf">PDF</option>
        <option value="epub">ePub</option>
        <option value="video">Video</option>
      </FormSelect>
      <FormSelect label="Mavjudlik" defaultValue="all">
        <option value="all">Barchasi</option>
        <option value="available">Mavjud</option>
        <option value="reserved">Band qilingan</option>
      </FormSelect>
      <FormSelect label="Fakultet" defaultValue="all">
        <option value="all">Barchasi</option>
        <option value="it">AT</option>
        <option value="management">Menejment</option>
      </FormSelect>
    </aside>
  );
}
