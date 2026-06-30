export function Eyebrow({ children, color, style }) {
  return (
    <span style={{
      font: '700 12px/1 var(--font-sans)',
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: color || 'var(--fg-2)',
      ...style,
    }}>{children}</span>
  );
}

