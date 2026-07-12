export function StatsStrip() {
  const stats = [
    { num: '39', unit: 'years', label: 'Tech comms, specifically.', color: 'var(--tha-violet)' },
    { num: '7',  unit: 'offices',label: 'SJ · LDN · SG · TPE · TKY · BJ · SEL.', color: 'var(--tha-aqua)' },
    { num: '312',unit: 'clients',label: 'From pre-seed to Fortune 50.', color: 'var(--tha-lime)' },
    { num: '4.2B',unit: 'reach', label: 'Earned impressions in 2025.', color: 'var(--tha-teal)' },
  ];
  return (
    <section className="tha-statsstrip__section" style={{ background: 'var(--bg-1)', borderTop: '1.5px solid var(--tha-navy)' }}>
      <div className="tha-statsstrip" style={{ maxWidth: 1240, margin: '0 auto' }}>
        {stats.map((s) => (
          <div key={s.unit} className="tha-statsstrip__item" style={{
            padding: '0 28px',
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

