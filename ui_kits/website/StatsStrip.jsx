export function StatsStrip() {
  const stats = [
    { num: '39', unit: 'years', label: 'Tech comms, specifically.', color: 'var(--tha-violet)' },
    { num: '7',  unit: 'offices',label: 'SJ · LDN · SG · TPE · TKY · BJ · SEL.', color: 'var(--tha-aqua)' },
    { num: '312',unit: 'clients',label: 'From pre-seed to Fortune 50.', color: 'var(--tha-lime)' },
    { num: '4.2B',unit: 'reach', label: 'Earned impressions in 2025.', color: 'var(--tha-teal)' },
  ];
  return (
    <section style={{ background: 'var(--bg-1)', padding: '80px 48px', borderTop: '1.5px solid var(--tha-navy)' }}>
      <div style={{
        maxWidth: 1240, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
      }}>
        {stats.map((s, i) => (
          <div key={s.unit} style={{
            padding: '0 28px',
            borderRight: i < 3 ? '1px solid var(--border-2)' : 'none',
            display: 'flex', flexDirection: 'column', gap: 12,
          }}>
            <div style={{
              width: 36, height: 4, background: s.color, marginBottom: 6,
            }} />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{
                font: '800 56px/1 var(--font-sans)',
                letterSpacing: '-.03em',
                color: 'var(--tha-navy)',
              }}>{s.num}</span>
              <span style={{
                font: '500 14px/1 var(--font-mono)',
                color: s.color,
                textTransform: 'uppercase', letterSpacing: '.1em',
              }}>{s.unit}</span>
            </div>
            <div style={{ font: '400 14px/1.4 var(--font-sans)', color: 'var(--fg-2)' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

