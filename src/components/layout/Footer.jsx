export default function Footer() {
  return (
    <footer className="footer-bar">
      <div className="footer-container">
        <div className="footer-left">
          <div className="footer-brand">
            <span className="footer-logo">🧪 StoiLab 10</span>
            <p className="footer-tagline">
              Platform Simulasi &amp; Kursus Stoikiometri Kimia Interaktif Kelas 10 SMA
            </p>
          </div>
          <p className="footer-copy">
            Disusun berdasarkan Capaian Pembelajaran Kimia Fase E (Kurikulum Merdeka).
          </p>
        </div>

        <div className="footer-right">
          <div className="footer-badges">
            <span className="footer-pill">🔬 Presisi Ilmiah</span>
            <span className="footer-pill">⚡ Tanpa Rumus Hafalan Buta</span>
            <span className="footer-pill">📱 Mobile &amp; Desktop Friendly</span>
          </div>
          <p className="footer-note">
            Dirancang khusus untuk mendukung siswa dan guru kimia dalam memahami hubungan kuantitatif zat kimia.
          </p>
        </div>
      </div>
    </footer>
  );
}
