import { useState } from "react";
import { FormInput } from "../components/FormInput";
import { Modal } from "../components/Modal";
import { PageHeader } from "../components/PageHeader";
import { PrimaryButton } from "../components/PrimaryButton";
import { ReadingRoomSeat } from "../components/ReadingRoomSeat";
import { SectionTitle } from "../components/SectionTitle";

const seats = Array.from({ length: 12 }, (_, index) => ({
  id: `A-${index + 1}`,
  state: index === 1 ? "booked" : index === 7 ? "disabled" : "available"
})) as Array<{ id: string; state: "available" | "booked" | "disabled" }>;

export function ReadingRoomPage() {
  const [selectedSeat, setSelectedSeat] = useState<string>("");
  const [open, setOpen] = useState(false);

  return (
    <div className="page-stack">
      <PageHeader title="Reading Room" description="Joy tanlash, vaqt bron qilish va QR tasdiq bilan o'quv zali boshqaruvi." />
      <div className="grid split-layout reading-layout">
        <section className="section-block">
          <SectionTitle title="Seat map" description="Mavjud, tanlangan, band va bloklangan joylar aniq ko'rsatilgan." />
          <div className="seat-grid card">
            {seats.map((seat) => (
              <ReadingRoomSeat
                key={seat.id}
                id={seat.id}
                state={seat.state}
                selected={selectedSeat === seat.id}
                onClick={() => setSelectedSeat(seat.id)}
              />
            ))}
          </div>
        </section>
        <section className="card booking-card">
          <SectionTitle title="Bron ma'lumotlari" description="Kun, vaqt va QR tasdiq kartasi." />
          <FormInput label="Sana" type="date" />
          <FormInput label="Vaqt" type="time" />
          <div className="card booking-preview">
            <strong>Tanlangan joy: {selectedSeat || "Tanlanmagan"}</strong>
            <p>Available: yashil, Selected: ko'k, Booked: kulrang, Disabled: qizil.</p>
          </div>
          <PrimaryButton onClick={() => setOpen(true)} disabled={!selectedSeat}>
            QR confirmation
          </PrimaryButton>
        </section>
      </div>
      <Modal open={open} title="QR confirmation card" onClose={() => setOpen(false)}>
        <div className="qr-card">
          <div className="qr-box">QR</div>
          <p>{selectedSeat} joyi 16-may 15:00 ga bron qilindi.</p>
        </div>
      </Modal>
    </div>
  );
}
