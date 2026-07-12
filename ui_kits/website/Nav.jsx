import { Button } from './Button.jsx';

const { useState: useNavState } = React;

export function Nav({ onNavigate, active }) {
  const [open, setOpen] = useNavState(false);
  const links = ['Work', 'Services', 'Thinking', 'About', 'Careers'];
  const go = (dest) => { onNavigate(dest); setOpen(false); };
  return (
    <nav className="tha-nav" style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '22px 48px', borderBottom: '1px solid var(--border-2)',
      background: 'var(--bg-1)', position: 'sticky', top: 0, zIndex: 10,
    }}>
      <a href="#" onClick={e => { e.preventDefault(); go('home'); }} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img src="../../assets/logo-horizontal-navy-lime.svg" alt="The Hoffman Agency" style={{ height: 38, display: 'block' }} />
      </a>

      <button
        type="button"
        className="tha-nav__toggle"
        aria-expanded={open}
        aria-controls="tha-nav-links"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen(o => !o)}
        style={{
          background: 'none', border: '1px solid var(--border-2)',
          borderRadius: 6, width: 44, height: 44, cursor: 'pointer', color: 'var(--tha-navy)',
        }}
      >
        <span aria-hidden="true" style={{ font: '400 20px/1 var(--font-sans)' }}>{open ? '✕' : '☰'}</span>
      </button>

      <div id="tha-nav-links" className={`tha-nav__links${open ? ' is-open' : ''}`} style={{ gap: 40, alignItems: 'center' }}>
        {links.map(l => (
          <button
            key={l}
            type="button"
            onClick={() => go(l.toLowerCase())}
            aria-current={active === l.toLowerCase() ? 'page' : undefined}
            style={{
              display: 'inline-flex', alignItems: 'flex-end', minHeight: 44,  /* 44px hit area; text stays bottom-aligned so the underline sits snug beneath it */
              background: 'none', border: 0, cursor: 'pointer',
              font: '500 14px/1 var(--font-sans)',
              color: active === l.toLowerCase() ? 'var(--tha-navy)' : 'var(--fg-2)',
              letterSpacing: '-.005em',
              padding: '0 6px 6px',
              borderBottom: active === l.toLowerCase() ? '2px solid var(--tha-lime)' : '2px solid transparent',
            }}
          >{l}</button>
        ))}
        <Button variant="primary" size="sm" onClick={() => go('contact')}>
          Start a conversation <span style={{ fontSize: 16 }}>→</span>
        </Button>
      </div>
    </nav>
  );
}


