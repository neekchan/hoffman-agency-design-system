import { Button } from './Button.jsx';

const { useState: useNavState } = React;

export function Nav({ onNavigate, active }) {
  const [open, setOpen] = useNavState(false);
  const links = ['Work', 'Services', 'Thinking', 'About', 'Careers'];
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '22px 48px', borderBottom: '1px solid var(--border-2)',
      background: 'var(--bg-1)', position: 'sticky', top: 0, zIndex: 10,
    }}>
      <a href="#" onClick={e => { e.preventDefault(); onNavigate('home'); }} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img src="../../assets/logo-horizontal-navy-lime.svg" alt="The Hoffman Agency" style={{ height: 38, display: 'block' }} />
      </a>
      <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
        {links.map(l => (
          <a
            key={l}
            href="#"
            onClick={e => { e.preventDefault(); onNavigate(l.toLowerCase()); }}
            style={{
              font: '500 14px/1 var(--font-sans)',
              color: active === l.toLowerCase() ? 'var(--tha-navy)' : 'var(--fg-2)',
              textDecoration: 'none',
              letterSpacing: '-.005em',
              paddingBottom: 6,
              borderBottom: active === l.toLowerCase() ? '2px solid var(--tha-lime)' : '2px solid transparent',
            }}
          >{l}</a>
        ))}
        <Button variant="primary" size="sm" onClick={() => onNavigate('contact')}>
          Start a conversation <span style={{ fontSize: 16 }}>→</span>
        </Button>
      </div>
    </nav>
  );
}


