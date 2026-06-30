import { Button } from './Button.jsx';
import { Eyebrow } from './Eyebrow.jsx';
import { Em } from './Em.jsx';

export function CTABand() {
  return (
    <section style={{
      background: 'var(--tha-purple)',
      color: 'var(--fg-on-dark)',
      padding: '100px 48px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 64, alignItems: 'center' }}>
        <div>
          <Eyebrow color="var(--tha-aqua)">For companies with something to prove</Eyebrow>
          <h2 style={{
            font: '700 clamp(40px, 5vw, 72px)/1.02 var(--font-sans)',
            letterSpacing: '-.02em',
            color: 'var(--fg-on-dark)',
            marginTop: 20, marginBottom: 0, maxWidth: '16ch',
          }}>
            Tell us what you're <Em color="var(--tha-lime)">up against.</Em>
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
          <p style={{ font: '400 18px/1.5 var(--font-sans)', color: 'var(--tha-aqua)', margin: 0, maxWidth: '34ch' }}>
            Launch, reposition, defend, scale. One sentence from you, two back from us.
          </p>
          <Button variant="lime" size="lg">Start a conversation →</Button>
        </div>
      </div>
    </section>
  );
}

