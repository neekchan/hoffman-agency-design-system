export function Button({ variant = 'primary', children, onClick, size = 'md', style }) {
  const base = {
    font: '600 15px/1 var(--font-sans)',
    padding: size === 'lg' ? '18px 28px' : size === 'sm' ? '10px 18px' : '14px 22px',
    fontSize: size === 'lg' ? 17 : size === 'sm' ? 13 : 15,
    minHeight: size === 'lg' ? 53 : size === 'sm' ? 44 : 46,  /* WCAG 2.5.5 44x44 touch target floor */
    boxSizing: 'border-box',
    border: 0,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    borderRadius: 0,
    letterSpacing: '-.005em',
    transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast)',
  };
  const variants = {
    primary: { background: 'var(--tha-navy)', color: 'var(--tha-lime)' },
    lime: { background: 'var(--tha-lime)', color: 'var(--tha-navy)' },
    ghost: { background: 'transparent', color: 'var(--tha-navy)', border: '1.5px solid var(--tha-navy)' },
    ghostLight: { background: 'transparent', color: 'var(--tha-paper)', border: '1.5px solid var(--tha-paper)' },
  };
  return (
    <button type="button" onClick={onClick} style={{ ...base, ...variants[variant], ...style }}>
      {children}
    </button>
  );
}

