export default function ProgressBar({
  value = 0,
  max = 100,
  showLabel = false,
  className = ''
}) {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  return (
    <div className={`progress-wrapper ${className}`}>
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <span>Progres Belajar</span>
          <span style={{ fontWeight: 600 }}>{percentage}%</span>
        </div>
      )}
      <div className="progress-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
