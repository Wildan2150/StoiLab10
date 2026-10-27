export default function Badge({
  children,
  variant = 'primary',
  className = '',
  icon = null
}) {
  const variantClass = `badge-${variant}`;

  return (
    <span className={`badge ${variantClass} ${className}`}>
      {icon && <span className="badge-icon">{icon}</span>}
      {children}
    </span>
  );
}
