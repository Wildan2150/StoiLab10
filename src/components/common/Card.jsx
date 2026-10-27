export default function Card({
  children,
  className = '',
  interactive = false,
  onClick = null,
  style = {}
}) {
  const interactiveClass = interactive ? 'card-interactive' : '';

  return (
    <div
      className={`card ${interactiveClass} ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
}
