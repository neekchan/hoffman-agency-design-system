import { Button } from './Button.jsx';
import { Eyebrow } from './Eyebrow.jsx';
import { Em } from './Em.jsx';

export function Hero() {
  return (
    <section className="tha-hero" style={{
      background: 'var(--bg-1)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="tha-hero__grid" style={{
        maxWidth: 1240, margin: '0 auto', position: 'relative',
        alignItems: 'center',
      }}>
        <div style={{ minWidth: 0 }}>
          <Eyebrow style={{ marginBottom: 32, display: 'block' }}>
            <span style={{
              width: 8, height: 8, background: 'var(--tha-lime)',
              borderRadius: 999, display: 'inline-block', marginRight: 10, verticalAlign: 'middle',
            }} />
            Integrated communications for tech
          </Eyebrow>

          <h1 className="tha-hero__title" style={{
            font: '800 clamp(44px, 5.6vw, 84px)/1.02 var(--font-sans)',
            letterSpacing: '-.03em',
            color: 'var(--tha-navy)',
            margin: 0,
          }}>
            Complexity in.<br />
            <Em color="var(--tha-purple)">Clarity</Em> out.
          </h1>

          <p style={{
            font: '400 20px/1.5 var(--font-sans)',
            color: 'var(--fg-2)',
            maxWidth: '42ch',
            marginTop: 40,
            marginBottom: 40,
          }}>
            We help tech companies turn hard business problems into stories people
            actually remember — across earned, digital, social, content and AI.
          </p>

          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <Button variant="primary" size="lg">See the work <span style={{ fontSize: 18 }}>→</span></Button>
            <Button variant="ghost" size="lg">Our approach</Button>
          </div>
        </div>

        {/* Storyline squiggle — lives in its own grid column, never overlaps type */}
        <div style={{
          minWidth: 0,
          display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
        }}>
          <img
            src="../../assets/storyline-navy-lime.svg"
            alt=""
            style={{
              width: '100%', maxWidth: 460, height: 'auto',
              display: 'block', pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </section>
  );
}


