import { Eyebrow } from './Eyebrow.jsx';

// Teal-background quote band. Gives teal its 10% share.
export function QuoteBlock() {
  return (
    <section style={{ background: 'var(--tha-teal)', padding: '120px 48px' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <Eyebrow color="var(--tha-aqua)">Client · VP Communications, Fortune 500 tech</Eyebrow>
        <blockquote style={{
          font: '400 italic clamp(36px, 4.5vw, 64px)/1.15 var(--font-serif)',
          color: 'var(--tha-paper)',
          margin: '32px 0 40px', padding: 0, border: 0,
          maxWidth: '22ch',
        }}>
          &ldquo;They turned a dense technical launch into a story our board actually repeated.&rdquo;
        </blockquote>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 999, background: 'var(--tha-aqua)' }} />
          <div style={{ font: '600 15px/1.4 var(--font-sans)', color: 'var(--tha-paper)' }}>
            Sarah Okonjo<br />
            <span style={{ fontWeight: 400, color: 'var(--tha-aqua)' }}>VP Communications · NovaGraph</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StorylineDivider({ variant = 'light' }) {
  const src = variant === 'dark'
    ? '../../assets/storyline-navy-white.svg'
    : '../../assets/storyline-navy-lime.svg';
  const bg = variant === 'dark' ? 'var(--tha-navy)' : 'var(--bg-1)';
  return (
    <div style={{ background: bg, padding: '40px 0', display: 'flex', justifyContent: 'center' }}>
      <img src={src} alt="" style={{ height: 140, width: 'auto' }} />
    </div>
  );
}


