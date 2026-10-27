import { useCourseProgress } from '../../hooks/useCourseProgress';
import { COURSE_CHAPTERS } from '../../data/courseChapters';
import { BADGES } from '../../data/badges';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import QuickFormulaWidget from '../../components/chemistry/QuickFormulaWidget';

export default function HomePage({ onSelectChapter }) {
  const {
    progress,
    gamification,
    toggleMilestone,
    unlockBadge
  } = useCourseProgress();

  return (
    <div className="home-page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge-tag">
            <span className="badge-glow-dot"></span>
            <span>Kurikulum Merdeka Fase E • Kimia Kelas 10 SMA</span>
          </div>

          <h1 className="hero-title">
            Kuasai <span className="highlight-gradient">Stoikiometri</span> Lewat Simulasi &amp; Laboratorium Virtual
          </h1>

          <p className="hero-description">
            Eksplorasi hubungan kuantitatif zat kimia dari tingkat makroskopis (gram dan liter)
            hingga mikroskopis (mol dan jumlah molekul) dengan visual interaktif, tanpa sekadar menghafal rumus.
          </p>

          <div className="hero-cta-group">
            <Button
              size="lg"
              onClick={() => onSelectChapter && onSelectChapter('ch1')}
              icon="🚀"
            >
              Mulai Perjalanan Belajar (Bab 1)
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                const el = document.getElementById('roadmap-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              icon="🗺️"
            >
              Lihat Peta Belajar
            </Button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="metrics-banner">
            <div className="metric-item">
              <span className="metric-val">5 Bab</span>
              <span className="metric-sub">Alur Kursus Berurutan</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-val">4 Lab</span>
              <span className="metric-sub">Simulator Interaktif</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-val">100%</span>
              <span className="metric-sub">Presisi Ilmiah &amp; M-R-S</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-val">5 Lencana</span>
              <span className="metric-sub">Sertifikat Digital</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="main-content-grid">
        {/* Left Column: Roadmap / Peta Belajar */}
        <section id="roadmap-section" className="roadmap-column">
          <div className="section-header">
            <div>
              <div className="section-label">ALUR PEMBELAJARAN BERURUTAN</div>
              <h2 className="section-title">Peta Perjalanan Belajar Kursus</h2>
            </div>
            <span className="badge badge-primary">5 Milestone Utama</span>
          </div>

          <div className="chapters-timeline">
            {COURSE_CHAPTERS.map((chapter) => {
              const completedSections = chapter.sections.filter(
                (sec) => progress.milestoneProgress[sec.id]
              ).length;
              const isAllDone = completedSections === chapter.sections.length;
              const isStarted = completedSections > 0;

              return (
                <div
                  key={chapter.id}
                  className={`chapter-timeline-card ${isAllDone ? 'chapter-card-completed' : ''}`}
                >
                  <div className="timeline-marker">
                    <span className="marker-icon">{chapter.icon}</span>
                    <span className="marker-line"></span>
                  </div>

                  <div className="timeline-content">
                    <div className="chapter-header-row">
                      <div className="chapter-title-group">
                        <span className="chapter-num-badge">Bab {chapter.number}</span>
                        <h3 className="chapter-heading">{chapter.title}</h3>
                      </div>
                      {isAllDone ? (
                        <Badge variant="success" icon="✓">Selesai</Badge>
                      ) : isStarted ? (
                        <Badge variant="warning" icon="⏳">Sedang Berjalan</Badge>
                      ) : (
                        <Badge variant="primary">Tersedia</Badge>
                      )}
                    </div>

                    <div className="chapter-subtitle-text">{chapter.subtitle}</div>
                    <p className="chapter-desc-text">{chapter.description}</p>

                    {/* Section Checkpoints */}
                    <div className="checkpoints-box">
                      <div className="checkpoints-title">
                        Materi &amp; Checkpoint Praktik ({completedSections}/{chapter.sections.length}):
                      </div>
                      <div className="checkpoints-list">
                        {chapter.sections.map((sec) => {
                          const isChecked = !!progress.milestoneProgress[sec.id];
                          return (
                            <label
                              key={sec.id}
                              className={`checkpoint-item ${isChecked ? 'checkpoint-checked' : ''}`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleMilestone(sec.id)}
                                className="checkpoint-checkbox"
                              />
                              <span className="checkpoint-id-tag">{sec.id}</span>
                              <span className="checkpoint-name">{sec.title}</span>
                              <span className="checkpoint-type-badge">{sec.type}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div className="chapter-footer-action">
                      <Button
                        variant={chapter.number === 1 ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => onSelectChapter && onSelectChapter(chapter.id)}
                        icon="👉"
                      >
                        Buka Modul Bab {chapter.number}
                      </Button>
                      <span className="chapter-xp-hint">
                        Selesaikan untuk meraih hingga +{chapter.sections.length * 15 + 50} XP
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Right Column: Lab Highlights, Live Mr Widget & Badges */}
        <aside className="sidebar-column">
          {/* Quick interactive Mr Widget */}
          <QuickFormulaWidget />

          {/* Virtual Labs Feature Highlights */}
          <Card className="lab-showcase-card">
            <div className="card-top-header">
              <span className="card-top-label">FASILITAS SIMULASI</span>
              <h3 className="card-top-title">4 Laboratorium Virtual Utama</h3>
            </div>

            <div className="lab-cards-list">
              <div className="lab-mini-item">
                <div className="lab-item-icon">⚖️</div>
                <div className="lab-item-info">
                  <div className="lab-item-title">Neraca Digital Lavoisier</div>
                  <div className="lab-item-desc">
                    Bandingkan reaksi pada labu tertutup vs terbuka untuk membuktikan kekekalan massa.
                  </div>
                </div>
              </div>

              <div className="lab-mini-item">
                <div className="lab-item-icon">🌉</div>
                <div className="lab-item-info">
                  <div className="lab-item-title">The Mole Highway (Jembatan Mol)</div>
                  <div className="lab-item-desc">
                    Konversi 4 arah terpadu antara massa (g), partikel, volume gas (STP/RTP), dan molaritas.
                  </div>
                </div>
              </div>

              <div className="lab-mini-item">
                <div className="lab-item-icon">🧪</div>
                <div className="lab-item-info">
                  <div className="lab-item-title">Solver Rumus Empiris &amp; Molekul</div>
                  <div className="lab-item-desc">
                    Hitung perbandingan mol unsur untuk menentukan rumus empiris dan rumus molekul sejati.
                  </div>
                </div>
              </div>

              <div className="lab-mini-item">
                <div className="lab-item-icon">🔬</div>
                <div className="lab-item-info">
                  <div className="lab-item-title">Simulator Pereaksi Pembatas (M-R-S)</div>
                  <div className="lab-item-desc">
                    Visualisasi partikel molekul reaktan yang berikatan membentuk produk dan zat sisa.
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Badges / Gamifikasi Showcase */}
          <Card className="badges-showcase-card">
            <div className="card-top-header">
              <span className="card-top-label">PAPAN PRESTASI SISWA</span>
              <h3 className="card-top-title">Koleksi Lencana Penghargaan</h3>
            </div>
            <p className="badges-desc">
              Raih pencapaian di setiap bab untuk membuka lencana digital dan klaim sertifikat kelulusan stoikiometri:
            </p>

            <div className="badges-grid-home">
              {BADGES.map((badge) => {
                const isUnlocked = gamification.badges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`badge-item-box ${isUnlocked ? 'badge-unlocked' : 'badge-locked'}`}
                    title={badge.description}
                  >
                    <div className="badge-item-icon-wrap">
                      <span className="badge-item-emoji">{badge.icon}</span>
                      {isUnlocked && <span className="badge-check-dot">✓</span>}
                    </div>
                    <div className="badge-item-meta">
                      <div className="badge-item-name">{badge.name}</div>
                      <div className="badge-item-xp">+{badge.xpReward} XP</div>
                    </div>
                    {!isUnlocked && (
                      <button
                        type="button"
                        className="btn-unlock-test"
                        onClick={() => unlockBadge(badge.id)}
                        title="Klik untuk membuka lencana ini"
                      >
                        Buka
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
