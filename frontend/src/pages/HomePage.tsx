import { books, departments, notifications, stats } from "../data/mockData";
import { BookCard } from "../components/BookCard";
import { DepartmentCard } from "../components/DepartmentCard";
import { NotificationCard } from "../components/NotificationCard";
import { PrimaryButton, SecondaryButton } from "../components/PrimaryButton";
import { SectionTitle } from "../components/SectionTitle";
import { StatCard } from "../components/StatCard";

export function HomePage() {
  return (
    <div className="page-stack">
      <section className="hero-surface">
        <div className="hero-copy">
          <p className="eyebrow soft">University digital library</p>
          <h1>ATMU Smart UniLibrary</h1>
          <p>
            Elektron katalog, kafedralar resurslari, AI qidiruv, kitob band qilish va o'quv zali bron qilish — barchasi yagona platformada.
          </p>
          <div className="hero-actions">
            <PrimaryButton onClick={() => (window.location.href = "/catalog")}>Katalogga kirish</PrimaryButton>
            <SecondaryButton onClick={() => (window.location.href = "/ai-search")}>AI qidiruv</SecondaryButton>
            <SecondaryButton onClick={() => (window.location.href = "/reading-room")}>O'quv zalidan joy olish</SecondaryButton>
          </div>
        </div>
        <div className="hero-dashboard card">
          <div className="dashboard-grid">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
          <div className="hero-mini-panels">
            <article className="mini-panel">
              <strong>Face ID status</strong>
              <p>Faol • 98.4% aniqlik</p>
            </article>
            <article className="mini-panel">
              <strong>AI tavsiyalar</strong>
              <p>Bugun 3 ta yangi fan resursi tavsiya qilindi</p>
            </article>
            <article className="mini-panel">
              <strong>Notification preview</strong>
              <p>2 ta yangi resurs va 1 ta o'quv zali tasdig'i</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-block">
        <SectionTitle eyebrow="Overview" title="Live statistics" description="Kutubxona, foydalanuvchilar va AI servislar bo'yicha jonli ko'rsatkichlar." />
        <div className="grid stats-grid">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionTitle eyebrow="Departments" title="Departments hub" description="Fakultetlar kesimida resurslar, fanlar va o'qituvchilar." />
        <div className="grid card-grid three">
          {departments.map((department) => (
            <DepartmentCard key={department.id} {...department} />
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionTitle eyebrow="Recommended" title="Recommended books" description="Eng ko'p o'qilgan va tavsiya qilingan materiallar." />
        <div className="grid card-grid two">
          {books.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      </section>

      <section className="grid split-layout">
        <div className="section-block">
          <SectionTitle eyebrow="Reading room" title="Reading room preview" description="Bugungi bo'sh joylar, seanslar va navbatlar." />
          <div className="card preview-card">
            <p>A-zal: 18 bo'sh joy</p>
            <p>B-zal: 6 bo'sh joy</p>
            <p>Keyingi bron: 14:30</p>
          </div>
        </div>
        <div className="section-block">
          <SectionTitle eyebrow="AI search" title="AI assistant preview" description="Manbali javoblar va tezkor yo'naltirish." />
          <div className="card preview-card">
            <p>AI qidiruv bugun 302 ta savolga javob berdi.</p>
            <p>Eng ko'p so'ralgan mavzu: kutubxona navigatsiyasi.</p>
          </div>
        </div>
      </section>

      <section className="section-block">
        <SectionTitle eyebrow="Center" title="Notifications preview" description="Muhim yangiliklar va shaxsiy bildirishnomalar." />
        <div className="grid card-grid three">
          {notifications.map((notification) => (
            <NotificationCard key={notification.title} {...notification} />
          ))}
        </div>
      </section>
    </div>
  );
}
