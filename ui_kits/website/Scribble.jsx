// Hand-drawn lime underline under inline text
export function Scribble({ children, color = 'var(--tha-lime)', strokeWidth = 5 }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      <svg
        viewBox="0 0 200 30"
        preserveAspectRatio="none"
        style={{ position: 'absolute', left: '-2%', bottom: '-0.15em', width: '104%', height: '0.35em', overflow: 'visible' }}
      >
        <path d="M 4 20 Q 50 4, 100 18 T 196 12" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" />
      </svg>
    </span>
  );
}

