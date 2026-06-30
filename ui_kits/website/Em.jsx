export function Em({ children, color }) {
  return (
    <em style={{
      fontFamily: 'var(--font-serif)',
      fontStyle: 'italic',
      fontWeight: 400,
      color: color || 'inherit',
    }}>{children}</em>
  );
}

