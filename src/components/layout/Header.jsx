import { useCourseProgress } from '../../hooks/useCourseProgress';

export default function Header() {
  const { gamification, overallProgressPercentage } = useCourseProgress();

  return (
    <header className="header-nav">
      <div className="header-container">
        {/* Brand Identity */}
        <div className="header-brand">
          <div className="brand-icon-box">
            <span className="brand-emoji">🧪</span>
          </div>
          <div className="brand-text">
            <div className="brand-title-wrap">
              <span className="brand-name">StoiLab</span>
              <span className="brand-badge-version">10</span>
            </div>
            <span className="brand-subtitle">Laboratorium &amp; Kursus Stoikiometri Interaktif</span>
          </div>
          <span className="curriculum-tag">Fase E • Kurikulum Merdeka</span>
        </div>

        {/* Global Progress & XP Pill */}
        <div className="header-stats">
          <div className="progress-indicator-pill">
            <div className="progress-info-row">
              <span className="progress-label">Progres Belajar</span>
              <span className="progress-val">{overallProgressPercentage}%</span>
            </div>
            <div className="header-progress-track">
              <div
                className="header-progress-fill"
                style={{ width: `${overallProgressPercentage}%` }}
              />
            </div>
          </div>

          <div className="xp-pill">
            <span className="xp-icon">⚡</span>
            <div className="xp-content">
              <span className="xp-number">{gamification.xp} XP</span>
              <span className="xp-rank">{gamification.currentRank}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
