// Hand-drawn circle annotation around children
export function Circle({ children, color = 'var(--tha-lime)', rotate = -2 }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', padding: '0 6px' }}>
      {children}
      <svg
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ position: 'absolute', inset: '-14% -4%', width: '108%', height: '128%', overflow: 'visible', pointerEvents: 'none' }}
      >
        <ellipse cx="100" cy="30" rx="94" ry="26" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" transform={`rotate(${rotate} 100 30)`} />
      </svg>
    </span>
  );
}

