import { Eyebrow } from './Eyebrow.jsx';
import { Em } from './Em.jsx';

// Services — each discipline gets a secondary color accent.
// Palette rotates through: lavender, purple, cyan, teal, plus two lime.
export function Services() {
  const services = [
    { name: 'Earned media',        desc: 'Pitches that land. Narratives that travel.',           accent: 'var(--tha-violet)' },
    { name: 'Content',             desc: 'Long-form that earns its runtime.',                    accent: 'var(--tha-aqua)' },
    { name: 'Digital + social',    desc: 'Opinions sharp enough to share.',                      accent: 'var(--tha-lime)' },
    { name: 'Creative',            desc: 'Campaigns with a pulse, not a pitch deck.',            accent: 'var(--tha-purple)' },
    { name: 'AI communications',   desc: 'For the companies building it, and the ones catching up.', accent: 'var(--tha-teal)' },
    { name: 'Research + strategy', desc: 'The argument, before the asset.',                      accent: 'var(--tha-lime)' },
  ];
  return (
    <section style={{ background: 'var(--tha-navy)', color: 'var(--fg-on-dark)', padding: '120px 48px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <Eyebrow color="var(--tha-lime)">What we do</Eyebrow>
        <h2 style={{
          font: '700 clamp(40px, 5.5vw, 80px)/1.02 var(--font-sans)',
          letterSpacing: '-.02em',
          color: 'var(--fg-on-dark)',
          maxWidth: '16ch',
          marginTop: 18, marginBottom: 80,
        }}>
          Six disciplines.<br /><Em color="var(--tha-lime)">One</Em> story.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderTop: '1px solid rgba(255,255,255,.12)' }}>
          {services.map((s, i) => (
            <div key={s.name} style={{
              padding: '36px 32px 44px',
              borderBottom: '1px solid rgba(255,255,255,.12)',
              borderRight: (i + 1) % 3 !== 0 ? '1px solid rgba(255,255,255,.12)' : 'none',
              display: 'flex', flexDirection: 'column', gap: 10,
              minHeight: 220, position: 'relative',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 6 }}>
                <span style={{
                  display: 'inline-block', width: 14, height: 14,
                  background: s.accent, borderRadius: 999,
                }} />
                <span style={{ font: '500 13px/1 var(--font-mono)', color: s.accent }}>
                  0{i + 1}
                </span>
              </div>
              <h3 style={{
                font: '600 28px/1.1 var(--font-sans)',
                letterSpacing: '-.015em',
                margin: '4px 0 6px',
              }}>{s.name}</h3>
              <p style={{
                font: '400 15px/1.5 var(--font-sans)',
                color: 'var(--tha-navy-200)',
                margin: 0, maxWidth: '32ch',
              }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


