import { Button } from './Button.jsx';
import { Eyebrow } from './Eyebrow.jsx';
import { Em } from './Em.jsx';

// Case-study grid — each card gets a secondary-color tag + rule.
export function CaseStudyGrid() {
  const cases = [
    {
      client: 'Enterprise AI startup',
      tag: 'Launch narrative',
      headline: 'From stealth to front page in six weeks.',
      stat: '38 tier-1 placements',
      accent: 'var(--tha-violet)',
      img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80',
    },
    {
      client: 'Global cloud provider',
      tag: 'Thought leadership',
      headline: 'A CTO who people actually quote.',
      stat: '4.2M audience reach',
      accent: 'var(--tha-aqua)',
      img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
    },
    {
      client: 'Fintech infrastructure',
      tag: 'Category creation',
      headline: 'Named the category. Owned the category.',
      stat: 'Featured in 12 Tier-1s',
      accent: 'var(--tha-teal)',
      img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80',
    },
    {
      client: 'Developer platform',
      tag: 'Community + content',
      headline: 'Turned a docs site into a movement.',
      stat: '92k new signups',
      accent: 'var(--tha-purple)',
      img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
    },
  ];
  return (
    <section style={{ background: 'var(--bg-1)', padding: '120px 48px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64 }}>
          <div>
            <Eyebrow>Selected work</Eyebrow>
            <h2 style={{
              font: '700 clamp(40px, 5.5vw, 72px)/1.02 var(--font-sans)',
              letterSpacing: '-.02em',
              color: 'var(--tha-navy)',
              marginTop: 16, marginBottom: 0, maxWidth: '14ch',
            }}>
              Stories that <Em color="var(--tha-purple)">moved</Em> something.
            </h2>
          </div>
          <Button variant="ghost">All case studies →</Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 48 }}>
          {cases.map(c => (
            <a key={c.client} href="#" style={{
              display: 'block', textDecoration: 'none', color: 'inherit',
              borderTop: `2.5px solid ${c.accent}`, paddingTop: 20,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
                <span style={{
                  font: '700 11px/1 var(--font-sans)',
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: c.accent,
                  padding: '6px 10px',
                  background: 'var(--tha-navy)',
                }}>{c.tag}</span>
                <span style={{ font: '500 12px/1 var(--font-mono)', color: 'var(--fg-2)' }}>{c.client}</span>
              </div>
              <div style={{ aspectRatio: '4/3', overflow: 'hidden', background: 'var(--tha-navy-100)', marginBottom: 24, position: 'relative' }}>
                <img src={c.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: c.accent, mixBlendMode: 'multiply', opacity: 0.12 }} />
              </div>
              <h3 style={{
                font: '600 32px/1.12 var(--font-sans)',
                letterSpacing: '-.02em',
                color: 'var(--tha-navy)',
                margin: '0 0 12px', maxWidth: '18ch',
              }}>{c.headline}</h3>
              <div style={{ font: '500 13px/1 var(--font-mono)', color: 'var(--fg-2)' }}>
                <span style={{ color: c.accent }}>●</span>  {c.stat}  →
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}


