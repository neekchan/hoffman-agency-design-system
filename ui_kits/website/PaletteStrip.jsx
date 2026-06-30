export function PaletteStrip() {
  const stops = [
    { bg: 'var(--tha-navy)',   w: 30, label: 'Navy',   fg: 'var(--tha-lime)' },
    { bg: 'var(--tha-lime)',   w: 30, label: 'Lime',   fg: 'var(--tha-navy)' },
    { bg: 'var(--tha-violet)', w: 10, label: 'Lavender', fg: 'var(--tha-navy)' },
    { bg: 'var(--tha-purple)', w: 10, label: 'Purple', fg: 'var(--tha-lime)' },
    { bg: 'var(--tha-aqua)',   w: 10, label: 'Cyan',   fg: 'var(--tha-navy)' },
    { bg: 'var(--tha-teal)',   w: 10, label: 'Teal',   fg: 'var(--tha-aqua)' },
  ];
  return (
    <div style={{ display: 'flex', height: 72 }}>
      {stops.map(s => (
        <div key={s.label} style={{
          flex: `${s.w} 1 0`, background: s.bg, color: s.fg,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 22px',
          font: '700 12px/1 var(--font-sans)',
          letterSpacing: '.14em', textTransform: 'uppercase',
        }}>
          <span>{s.label}</span>
          <span style={{ opacity: .7, font: '500 11px/1 var(--font-mono)', letterSpacing: '.06em' }}>{s.w}%</span>
        </div>
      ))}
    </div>
  );
}

