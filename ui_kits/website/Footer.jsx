import { Button } from './Button.jsx';
import { Em } from './Em.jsx';

export function Footer() {
  const cols = {
    Agency: ['About', 'People', 'Careers', 'Newsroom'],
    Work: ['Case studies', 'Clients', 'Awards'],
    Services: ['Earned media', 'Content', 'Digital', 'Creative', 'AI comms'],
    Offices: ['San Jose', 'London', 'Singapore', 'Taipei', 'Tokyo', 'Beijing'],
  };
  return (
    <footer style={{ background: 'var(--tha-navy-900)', color: 'var(--fg-on-dark)', padding: '100px 48px 40px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(4, 1fr)', gap: 48, marginBottom: 100 }}>
          <div>
            <img src="../../assets/logo-horizontal-white-lime.svg" alt="The Hoffman Agency" style={{ height: 44, display: 'block', marginBottom: 32 }} />
            <p style={{
              font: '700 36px/1.1 var(--font-sans)',
              letterSpacing: '-.02em',
              color: 'var(--fg-on-dark)',
              margin: 0, maxWidth: '12ch',
            }}>
              Tell us your <Em color="var(--tha-lime)">story.</Em>
            </p>
            <Button variant="lime" style={{ marginTop: 28 }}>hello@hoffman.com →</Button>
          </div>
          {Object.entries(cols).map(([title, items]) => (
            <div key={title}>
              <div style={{ font: '700 12px/1 var(--font-sans)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--tha-lime)', marginBottom: 20 }}>{title}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {items.map(it => (
                  <li key={it}><a href="#" style={{ font: '400 15px/1 var(--font-sans)', color: 'var(--tha-navy-200)', textDecoration: 'none' }}>{it}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{
          borderTop: '1px solid rgba(255,255,255,.1)',
          paddingTop: 28,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          font: '400 13px/1 var(--font-sans)', color: 'var(--tha-navy-300)',
        }}>
          <span>© The Hoffman Agency · est. 1987</span>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#" style={{ color: 'var(--tha-navy-300)', textDecoration: 'none' }}>Privacy</a>
            <a href="#" style={{ color: 'var(--tha-navy-300)', textDecoration: 'none' }}>Terms</a>
            <a href="#" style={{ color: 'var(--tha-navy-300)', textDecoration: 'none' }}>LinkedIn →</a>
          </div>
        </div>
      </div>
    </footer>
  );
}


