const ReactRef = typeof React !== 'undefined' ? React : null;

function mergeStyle(...styles) {
  return Object.assign({}, ...styles.filter(Boolean));
}

function fieldId(label, id) {
  return id || String(label || 'field').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function metaText({ helper, error }) {
  if (!helper && !error) return null;
  return (
    <div style={{
      font: '400 12px/1.45 var(--font-sans)',
      color: error ? 'var(--danger)' : 'var(--fg-3)',
      marginTop: 6,
    }}>
      {error || helper}
    </div>
  );
}

const controlBase = {
  width: '100%',
  minHeight: 42,
  padding: '10px 12px',
  border: '1px solid var(--tha-navy-400)',  /* --border-2 (1.53:1) fails the 3:1 UI-boundary minimum at rest */
  borderRadius: 'var(--radius-2)',
  background: 'var(--tha-white)',
  color: 'var(--fg-1)',
  font: '400 14px/1.3 var(--font-sans)',
  outlineColor: 'var(--tha-navy)',
};

export function AppButton({ variant = 'primary', size = 'md', children, style, disabled, loading, ...props }) {
  const variants = {
    primary: { background: 'var(--tha-navy)', color: 'var(--tha-lime)', borderColor: 'var(--tha-navy)' },
    secondary: { background: 'var(--tha-lime)', color: 'var(--tha-navy)', borderColor: 'var(--tha-lime)' },
    neutral: { background: 'var(--tha-white)', color: 'var(--tha-navy)', borderColor: 'var(--border-2)' },
    danger: { background: 'var(--danger)', color: 'var(--tha-white)', borderColor: 'var(--danger)' },
    ghost: { background: 'transparent', color: 'var(--tha-navy)', borderColor: 'var(--tha-navy)' },
  };
  const sizes = {
    sm: { minHeight: 34, padding: '8px 12px', fontSize: 12 },
    md: { minHeight: 40, padding: '10px 14px', fontSize: 14 },
    lg: { minHeight: 46, padding: '12px 18px', fontSize: 15 },
  };

  return (
    <button
      type="button"
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      style={mergeStyle({
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        border: '1.5px solid',
        borderRadius: 'var(--radius-0)',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        font: '700 14px/1 var(--font-sans)',
        letterSpacing: 'var(--track-normal)',
        opacity: disabled ? .48 : 1,
        transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
      }, sizes[size], variants[variant], style)}
      {...props}
    >
      {loading ? 'Working...' : children}
    </button>
  );
}

export function TextField({ label, helper, error, id, prefix, suffix, style, inputStyle, ...props }) {
  const inputId = fieldId(label, id);
  return (
    <label style={mergeStyle({ display: 'block', font: '600 13px/1.25 var(--font-sans)', color: 'var(--fg-1)' }, style)} htmlFor={inputId}>
      <span>{label}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 7 }}>
        {prefix ? <span style={{ font: '500 13px/1 var(--font-mono)', color: 'var(--fg-3)' }}>{prefix}</span> : null}
        <input id={inputId} aria-invalid={!!error} style={mergeStyle(controlBase, error && { borderColor: 'var(--danger)' }, inputStyle)} {...props} />
        {suffix ? <span style={{ font: '500 13px/1 var(--font-mono)', color: 'var(--fg-3)' }}>{suffix}</span> : null}
      </span>
      {metaText({ helper, error })}
    </label>
  );
}

export function TextareaField({ label, helper, error, id, style, inputStyle, rows = 4, ...props }) {
  const inputId = fieldId(label, id);
  return (
    <label style={mergeStyle({ display: 'block', font: '600 13px/1.25 var(--font-sans)', color: 'var(--fg-1)' }, style)} htmlFor={inputId}>
      <span>{label}</span>
      <textarea id={inputId} rows={rows} aria-invalid={!!error} style={mergeStyle(controlBase, {
        minHeight: 104,
        resize: 'vertical',
        marginTop: 7,
        lineHeight: 1.45,
      }, error && { borderColor: 'var(--danger)' }, inputStyle)} {...props} />
      {metaText({ helper, error })}
    </label>
  );
}

export function SelectField({ label, helper, error, id, options = [], style, inputStyle, ...props }) {
  const inputId = fieldId(label, id);
  return (
    <label style={mergeStyle({ display: 'block', font: '600 13px/1.25 var(--font-sans)', color: 'var(--fg-1)' }, style)} htmlFor={inputId}>
      <span>{label}</span>
      <select id={inputId} aria-invalid={!!error} style={mergeStyle(controlBase, { marginTop: 7 }, error && { borderColor: 'var(--danger)' }, inputStyle)} {...props}>
        {options.map(option => (
          <option key={option.value || option} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
      {metaText({ helper, error })}
    </label>
  );
}

export function DateField(props) {
  return <TextField type="date" {...props} />;
}

export function FileField({ label, helper, error, id, style, inputStyle, ...props }) {
  const inputId = fieldId(label, id);
  return (
    <label style={mergeStyle({ display: 'block', font: '600 13px/1.25 var(--font-sans)', color: 'var(--fg-1)' }, style)} htmlFor={inputId}>
      <span>{label}</span>
      <input id={inputId} type="file" aria-invalid={!!error} style={mergeStyle(controlBase, { marginTop: 7, paddingTop: 9 }, error && { borderColor: 'var(--danger)' }, inputStyle)} {...props} />
      {metaText({ helper, error })}
    </label>
  );
}

export function SliderField({ label, helper, error, value = 50, min = 0, max = 100, id, style, ...props }) {
  const inputId = fieldId(label, id);
  return (
    <label style={mergeStyle({ display: 'block', font: '600 13px/1.25 var(--font-sans)', color: 'var(--fg-1)' }, style)} htmlFor={inputId}>
      <span style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
        <span>{label}</span>
        <span style={{ font: '500 12px/1 var(--font-mono)', color: 'var(--fg-3)' }}>{value}</span>
      </span>
      <input id={inputId} type="range" value={value} min={min} max={max} style={{ width: '100%', accentColor: 'var(--tha-navy)', marginTop: 12 }} {...props} />
      {metaText({ helper, error })}
    </label>
  );
}

export function Checkbox({ label, helper, style, ...props }) {
  return (
    <label style={mergeStyle({ display: 'flex', gap: 10, alignItems: 'flex-start', font: '500 14px/1.35 var(--font-sans)', color: 'var(--fg-1)', cursor: 'pointer' }, style)}>
      <input type="checkbox" style={{ width: 17, height: 17, accentColor: 'var(--tha-navy)', marginTop: 1 }} {...props} />
      <span>
        {label}
        {helper ? <span style={{ display: 'block', marginTop: 3, font: '400 12px/1.4 var(--font-sans)', color: 'var(--fg-3)' }}>{helper}</span> : null}
      </span>
    </label>
  );
}

export function RadioGroup({ label, name, options = [], value, style, onChange }) {
  return (
    <fieldset style={mergeStyle({ border: 0, padding: 0, margin: 0 }, style)}>
      <legend style={{ font: '600 13px/1.25 var(--font-sans)', color: 'var(--fg-1)', marginBottom: 10 }}>{label}</legend>
      <div style={{ display: 'grid', gap: 9 }}>
        {options.map(option => (
          <label key={option.value || option} style={{ display: 'flex', gap: 10, alignItems: 'center', font: '500 14px/1.3 var(--font-sans)', color: 'var(--fg-1)', cursor: 'pointer' }}>
            <input
              type="radio"
              name={name}
              value={option.value || option}
              checked={value === (option.value || option)}
              onChange={onChange}
              style={{ width: 17, height: 17, accentColor: 'var(--tha-navy)' }}
            />
            {option.label || option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function Toggle({ label, checked, defaultChecked = false, onChange, style }) {
  const [local, setLocal] = ReactRef.useState(defaultChecked);
  const isOn = checked !== undefined ? checked : local;
  return (
    <label style={mergeStyle({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, font: '600 14px/1.25 var(--font-sans)', color: 'var(--fg-1)', cursor: 'pointer' }, style)}>
      <span>{label}</span>
      <span style={{ position: 'relative', width: 42, height: 24, display: 'inline-flex', alignItems: 'center' }}>
        <input
          type="checkbox"
          role="switch"
          className="tha-toggle-input"
          checked={isOn}
          onChange={event => {
            if (checked === undefined) setLocal(event.target.checked);
            if (onChange) onChange(event);
          }}
          style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
        />
        <span aria-hidden="true" className="tha-toggle-track" style={{
          width: 42,
          height: 24,
          borderRadius: 'var(--radius-pill)',
          background: isOn ? 'var(--tha-navy)' : 'var(--tha-navy-200)',
          transition: 'background var(--dur-fast) var(--ease-out)',
        }} />
        <span aria-hidden="true" style={{
          position: 'absolute',
          top: 3,
          left: isOn ? 21 : 3,
          width: 18,
          height: 18,
          borderRadius: 'var(--radius-pill)',
          background: isOn ? 'var(--tha-lime)' : 'var(--tha-white)',
          transition: 'left var(--dur-fast) var(--ease-out)',
        }} />
      </span>
    </label>
  );
}

export function Tabs({ tabs = [], activeKey, defaultKey, onChange, style }) {
  const [local, setLocal] = ReactRef.useState(defaultKey || (tabs[0] && tabs[0].key));
  const active = activeKey || local;
  return (
    <div style={mergeStyle({ display: 'flex', gap: 2, borderBottom: '1px solid var(--border-2)' }, style)} role="tablist">
      {tabs.map(tab => (
        <button
          key={tab.key}
          type="button"
          role="tab"
          aria-selected={active === tab.key}
          onClick={() => {
            setLocal(tab.key);
            if (onChange) onChange(tab.key);
          }}
          style={{
            padding: '11px 14px',
            border: 0,
            borderBottom: active === tab.key ? '3px solid var(--tha-lime)' : '3px solid transparent',
            background: active === tab.key ? 'var(--tha-navy-050)' : 'transparent',
            color: active === tab.key ? 'var(--tha-navy)' : 'var(--fg-2)',
            font: '700 13px/1 var(--font-sans)',
            cursor: 'pointer',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export function Breadcrumbs({ items = [], style }) {
  return (
    <nav aria-label="Breadcrumb" style={mergeStyle({ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', font: '500 12px/1 var(--font-sans)' }, style)}>
      {items.map((item, index) => (
        <React.Fragment key={item.href || item.label}>
          {index > 0 ? <span style={{ color: 'var(--fg-3)' }}>/</span> : null}
          <a href={item.href || '#'} aria-current={index === items.length - 1 ? 'page' : undefined} style={{ color: index === items.length - 1 ? 'var(--fg-1)' : 'var(--fg-link)', textDecoration: 'none' }}>
            {item.label}
          </a>
        </React.Fragment>
      ))}
    </nav>
  );
}

export function Pagination({ page = 1, total = 5, onPageChange, style }) {
  const pages = Array.from({ length: total }, (_, index) => index + 1);
  return (
    <nav aria-label="Pagination" style={mergeStyle({ display: 'flex', alignItems: 'center', gap: 6 }, style)}>
      {pages.map(item => (
        <button
          key={item}
          type="button"
          aria-current={item === page ? 'page' : undefined}
          onClick={() => onPageChange && onPageChange(item)}
          style={{
            minWidth: 34,
            height: 34,
            border: '1px solid var(--border-2)',
            background: item === page ? 'var(--tha-navy)' : 'var(--tha-white)',
            color: item === page ? 'var(--tha-lime)' : 'var(--fg-1)',
            font: '700 12px/1 var(--font-sans)',
            cursor: 'pointer',
          }}
        >
          {item}
        </button>
      ))}
    </nav>
  );
}

export function Sidebar({ items = [], activeKey, onNavigate, style }) {
  return (
    <aside style={mergeStyle({ width: 232, background: 'var(--tha-navy)', color: 'var(--fg-on-dark)', padding: 18, display: 'grid', gap: 20, alignContent: 'start' }, style)}>
      <img src="../../assets/logo-horizontal-white-lime.svg" alt="The Hoffman Agency" style={{ height: 30, width: 'auto' }} />
      <nav style={{ display: 'grid', gap: 4 }}>
        {items.map(item => (
          <button
            key={item.key}
            type="button"
            onClick={() => onNavigate && onNavigate(item.key)}
            aria-current={activeKey === item.key ? 'page' : undefined}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '11px 12px',
              border: 0,
              borderLeft: activeKey === item.key ? '4px solid var(--tha-lime)' : '4px solid transparent',
              background: activeKey === item.key ? 'rgba(255,255,255,.08)' : 'transparent',
              color: activeKey === item.key ? 'var(--tha-lime)' : 'var(--tha-navy-100)',
              font: '700 13px/1 var(--font-sans)',
              cursor: 'pointer',
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export function MobileMenu({ label = 'Menu', items = [], style }) {
  const [open, setOpen] = ReactRef.useState(false);
  return (
    <div style={mergeStyle({ position: 'relative', display: 'inline-block' }, style)}>
      <AppButton variant="ghost" size="sm" onClick={() => setOpen(!open)} aria-expanded={open}>{label}</AppButton>
      {open ? (
        <div role="menu" style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', minWidth: 220, background: 'var(--tha-white)', border: '1px solid var(--border-2)', boxShadow: 'var(--shadow-2)', zIndex: 5 }}>
          {items.map(item => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              onClick={() => { setOpen(false); item.onSelect && item.onSelect(); }}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 14px', border: 0, borderBottom: '1px solid var(--border-3)', background: 'transparent', color: 'var(--fg-1)', font: '600 13px/1 var(--font-sans)', cursor: 'pointer' }}
            >{item.label}</button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function AlertBanner({ tone = 'info', title, children, style }) {
  const tones = {
    info: { color: 'var(--tha-teal)', bg: 'var(--tha-navy-050)' },
    success: { color: 'var(--success)', bg: 'var(--tha-lime-050)' },
    warning: { color: 'var(--warning)', bg: 'var(--tha-lime-050)', labelColor: '#A06300' /* darkened from --warning #E08A00 (2.6:1) to clear 4.5:1 as title text on lime-050 */ },
    danger: { color: 'var(--danger)', bg: 'var(--tha-navy-050)' },
  };
  const toneStyle = tones[tone] || tones.info;
  return (
    <div role="status" style={mergeStyle({ background: toneStyle.bg, borderRadius: 6, padding: '13px 14px', color: 'var(--fg-1)' }, style)}>
      <div style={{ font: '700 14px/1.25 var(--font-sans)', color: toneStyle.labelColor || toneStyle.color }}>{title}</div>
      {children ? <div style={{ marginTop: 4, font: '400 13px/1.45 var(--font-sans)', color: 'var(--fg-2)' }}>{children}</div> : null}
    </div>
  );
}

export function Toast({ tone = 'info', title, children, action, style }) {
  return (
    <div role="status" style={mergeStyle({ width: 320, background: 'var(--tha-white)', border: '1px solid var(--border-2)', boxShadow: 'var(--shadow-3)', padding: 14, display: 'grid', gap: 8 }, style)}>
      <Badge tone={tone}>{tone}</Badge>
      <div style={{ font: '700 15px/1.2 var(--font-sans)', color: 'var(--fg-1)' }}>{title}</div>
      {children ? <div style={{ font: '400 13px/1.45 var(--font-sans)', color: 'var(--fg-2)' }}>{children}</div> : null}
      {action ? <div>{action}</div> : null}
    </div>
  );
}

function useFocusTrap(open, onClose) {
  const containerRef = ReactRef.useRef(null);
  ReactRef.useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    const node = containerRef.current;
    const getFocusable = () => Array.from(
      node ? node.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])') : []
    );
    const focusable = getFocusable();
    (focusable[0] || node).focus();

    function onKeyDown(e) {
      if (e.key === 'Escape') { onClose && onClose(); return; }
      if (e.key !== 'Tab') return;
      const items = getFocusable();
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
    };
  }, [open, onClose]);
  return containerRef;
}

export function Modal({ open, title, children, footer, onClose, style }) {
  const dialogRef = useFocusTrap(open, onClose);
  if (!open) return null;
  return (
    <div role="presentation" style={{ position: 'fixed', inset: 0, background: 'rgba(14,28,43,.46)', display: 'grid', placeItems: 'center', padding: 24, zIndex: 50 }}>
      <section ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-label={title} style={mergeStyle({ width: 'min(560px, 100%)', background: 'var(--tha-white)', border: '1px solid var(--border-2)', boxShadow: 'var(--shadow-3)' }, style)}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '18px 20px', borderBottom: '1px solid var(--border-2)' }}>
          <h2 style={{ margin: 0, font: '700 20px/1.2 var(--font-sans)', color: 'var(--fg-1)' }}>{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" style={{ width: 32, height: 32, border: 0, background: 'var(--tha-navy-050)', cursor: 'pointer', font: '700 18px/1 var(--font-sans)' }}>x</button>
        </header>
        <div style={{ padding: 20 }}>{children}</div>
        {footer ? <footer style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, padding: '14px 20px', borderTop: '1px solid var(--border-2)' }}>{footer}</footer> : null}
      </section>
    </div>
  );
}

export function Tooltip({ label, children, style }) {
  const [open, setOpen] = ReactRef.useState(false);
  return (
    <span style={mergeStyle({ position: 'relative', display: 'inline-flex' }, style)} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>
      {children}
      {open ? <span role="tooltip" style={{ position: 'absolute', left: '50%', bottom: 'calc(100% + 8px)', transform: 'translateX(-50%)', background: 'var(--tha-navy)', color: 'var(--tha-white)', padding: '7px 9px', font: '600 12px/1 var(--font-sans)', whiteSpace: 'nowrap', zIndex: 10 }}>{label}</span> : null}
    </span>
  );
}

export function Popover({ trigger, title, children, style }) {
  const [open, setOpen] = ReactRef.useState(false);
  return (
    <span style={mergeStyle({ position: 'relative', display: 'inline-flex' }, style)}>
      <span onClick={() => setOpen(!open)}>{trigger}</span>
      {open ? (
        <section style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: 260, background: 'var(--tha-white)', border: '1px solid var(--border-2)', boxShadow: 'var(--shadow-2)', padding: 14, zIndex: 10 }}>
          {title ? <div style={{ font: '700 14px/1.2 var(--font-sans)', marginBottom: 8 }}>{title}</div> : null}
          <div style={{ font: '400 13px/1.45 var(--font-sans)', color: 'var(--fg-2)' }}>{children}</div>
        </section>
      ) : null}
    </span>
  );
}

export function DataTable({ columns = [], rows = [], style }) {
  return (
    <div style={mergeStyle({ overflowX: 'auto', border: '1px solid var(--border-2)', background: 'var(--tha-white)' }, style)}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
        <thead>
          <tr>
            {columns.map(column => <th key={column.key} scope="col" style={{ textAlign: 'left', padding: '11px 12px', borderBottom: '1px solid var(--border-2)', background: 'var(--tha-navy-050)', font: '700 11px/1 var(--font-sans)', letterSpacing: 'var(--track-eyebrow)', textTransform: 'uppercase', color: 'var(--fg-2)' }}>{column.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id || index}>
              {columns.map(column => <td key={column.key} style={{ padding: '12px', borderBottom: index < rows.length - 1 ? '1px solid var(--border-3)' : 0, font: '400 13px/1.35 var(--font-sans)', color: 'var(--fg-1)' }}>{row[column.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DataList({ items = [], style }) {
  return (
    <dl style={mergeStyle({ display: 'grid', gridTemplateColumns: 'minmax(120px, .7fr) 1fr', gap: 0, margin: 0, border: '1px solid var(--border-2)', background: 'var(--tha-white)' }, style)}>
      {items.map(item => (
        <React.Fragment key={item.label}>
          <dt style={{ padding: '11px 12px', borderBottom: '1px solid var(--border-3)', font: '700 12px/1.25 var(--font-sans)', color: 'var(--fg-2)' }}>{item.label}</dt>
          <dd style={{ margin: 0, padding: '11px 12px', borderBottom: '1px solid var(--border-3)', font: '500 13px/1.35 var(--font-sans)', color: 'var(--fg-1)' }}>{item.value}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

export function Avatar({ name, src, size = 36, style }) {
  const initials = String(name || '').split(' ').filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase();
  return src ? (
    <img src={src} alt={name || ''} style={mergeStyle({ width: size, height: size, borderRadius: 'var(--radius-pill)', objectFit: 'cover', border: '1px solid var(--border-2)' }, style)} />
  ) : (
    <span aria-label={name} style={mergeStyle({ width: size, height: size, borderRadius: 'var(--radius-pill)', display: 'inline-grid', placeItems: 'center', background: 'var(--tha-navy)', color: 'var(--tha-lime)', font: '700 12px/1 var(--font-sans)' }, style)}>{initials}</span>
  );
}

export function Badge({ tone = 'neutral', children, style }) {
  const tones = {
    neutral: { color: 'var(--tha-navy)', bg: 'var(--tha-navy-050)', border: 'var(--border-2)' },
    info: { color: 'var(--tha-teal)', bg: 'var(--tha-navy-050)', border: 'var(--tha-teal)' },
    success: { color: 'var(--success)', bg: 'var(--tha-lime-050)', border: 'var(--success)' },
    warning: { color: 'var(--tha-navy)', bg: 'var(--warning)', border: 'var(--warning)' },
    danger: { color: 'var(--danger)', bg: 'var(--tha-navy-050)', border: 'var(--danger)' },
    accent: { color: 'var(--tha-navy)', bg: 'var(--tha-lime)', border: 'var(--tha-lime)' },
  };
  const toneStyle = tones[tone] || tones.neutral;
  return (
    <span style={mergeStyle({ display: 'inline-flex', alignItems: 'center', minHeight: 24, padding: '5px 8px', border: `1px solid ${toneStyle.border}`, borderRadius: 'var(--radius-pill)', background: toneStyle.bg, color: toneStyle.color, font: '700 11px/1 var(--font-sans)', textTransform: 'uppercase', letterSpacing: 'var(--track-wide)' }, style)}>
      {children}
    </span>
  );
}

export function Divider({ label, style }) {
  return (
    <div style={mergeStyle({ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--fg-3)', font: '700 11px/1 var(--font-sans)', letterSpacing: 'var(--track-eyebrow)', textTransform: 'uppercase' }, style)}>
      <span style={{ flex: 1, height: 1, background: 'var(--border-2)' }} />
      {label ? <span>{label}</span> : null}
      <span style={{ flex: 1, height: 1, background: 'var(--border-2)' }} />
    </div>
  );
}

export function Accordion({ items = [], defaultOpen = 0, style }) {
  const [open, setOpen] = ReactRef.useState(defaultOpen);
  return (
    <div style={mergeStyle({ border: '1px solid var(--border-2)', background: 'var(--tha-white)' }, style)}>
      {items.map((item, index) => (
        <section key={item.title} style={{ borderBottom: index < items.length - 1 ? '1px solid var(--border-3)' : 0 }}>
          <button type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)} style={{ width: '100%', padding: '14px 16px', border: 0, background: 'transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'center', font: '700 14px/1.2 var(--font-sans)', color: 'var(--fg-1)', cursor: 'pointer' }}>
            {item.title}
            <span>{open === index ? '-' : '+'}</span>
          </button>
          {open === index ? <div style={{ padding: '0 16px 16px', font: '400 13px/1.5 var(--font-sans)', color: 'var(--fg-2)' }}>{item.content}</div> : null}
        </section>
      ))}
    </div>
  );
}

export function Drawer({ open, title, children, onClose, side = 'right', style }) {
  const drawerRef = useFocusTrap(open, onClose);
  if (!open) return null;
  return (
    <div role="presentation" style={{ position: 'fixed', inset: 0, background: 'rgba(14,28,43,.32)', zIndex: 45 }}>
      <aside ref={drawerRef} tabIndex={-1} role="dialog" aria-modal="true" aria-label={title} style={mergeStyle({ position: 'absolute', top: 0, bottom: 0, [side]: 0, width: 'min(380px, 92vw)', background: 'var(--tha-white)', borderLeft: side === 'right' ? '1px solid var(--border-2)' : 0, borderRight: side === 'left' ? '1px solid var(--border-2)' : 0, boxShadow: 'var(--shadow-3)', padding: 20 }, style)}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 18 }}>
          <h2 style={{ margin: 0, font: '700 20px/1.2 var(--font-sans)' }}>{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" style={{ width: 32, height: 32, border: 0, background: 'var(--tha-navy-050)', cursor: 'pointer' }}>x</button>
        </header>
        {children}
      </aside>
    </div>
  );
}

export function Menu({ label = 'Actions', items = [], style }) {
  const [open, setOpen] = ReactRef.useState(false);
  return (
    <div style={mergeStyle({ position: 'relative', display: 'inline-block' }, style)}>
      <AppButton variant="neutral" size="sm" onClick={() => setOpen(!open)} aria-expanded={open}>{label}</AppButton>
      {open ? (
        <div role="menu" style={{ position: 'absolute', right: 0, top: 'calc(100% + 6px)', minWidth: 180, background: 'var(--tha-white)', border: '1px solid var(--border-2)', boxShadow: 'var(--shadow-2)', zIndex: 10 }}>
          {items.map(item => <button key={item.label} type="button" role="menuitem" onClick={item.onSelect} style={{ width: '100%', padding: '11px 12px', border: 0, borderBottom: '1px solid var(--border-3)', background: 'transparent', textAlign: 'left', color: item.danger ? 'var(--danger)' : 'var(--fg-1)', font: '600 13px/1 var(--font-sans)', cursor: 'pointer' }}>{item.label}</button>)}
        </div>
      ) : null}
    </div>
  );
}

export function ProgressBar({ value = 0, max = 100, label, style }) {
  const pct = Math.max(0, Math.min(100, Math.round((value / max) * 100)));
  return (
    <div style={mergeStyle({ display: 'grid', gap: 8 }, style)}>
      {label ? <div style={{ display: 'flex', justifyContent: 'space-between', font: '600 12px/1 var(--font-sans)', color: 'var(--fg-2)' }}><span>{label}</span><span>{pct}%</span></div> : null}
      <div role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} style={{ height: 8, background: 'var(--tha-navy-100)', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: 'var(--tha-lime)' }} />
      </div>
    </div>
  );
}

export function Spinner({ label = 'Loading', size = 24, style }) {
  return (
    <span role="status" aria-label={label} style={mergeStyle({ display: 'inline-grid', placeItems: 'center', width: size, height: size }, style)}>
      <span style={{ width: size, height: size, border: '3px solid var(--tha-navy-100)', borderTopColor: 'var(--tha-navy)', borderRadius: 'var(--radius-pill)', animation: 'tha-spin 900ms linear infinite' }} />
    </span>
  );
}

export function Skeleton({ lines = 3, style }) {
  return (
    <div aria-hidden="true" style={mergeStyle({ display: 'grid', gap: 8 }, style)}>
      {Array.from({ length: lines }, (_, index) => (
        <span key={index} style={{ height: 12, width: index === lines - 1 ? '64%' : '100%', background: 'var(--tha-navy-100)', display: 'block' }} />
      ))}
    </div>
  );
}
