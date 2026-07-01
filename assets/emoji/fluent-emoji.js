/* ==========================================================================
   The Hoffman Agency — Fluent Emoji injector
   --------------------------------------------------------------------------
   A drop-in <fluent-emoji> custom element that renders Microsoft Fluent
   Emoji (static + animated) for visual storytelling in decks.

   Sources (open-source, MIT):
     • Static  — github.com/microsoft/fluentui-emoji  (Color / Flat / 3D / High-Contrast)
     • Animated — github.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis (APNG)
   Pulled from jsDelivr by default; resolves a LOCAL copy first when this
   script's tag carries  data-base="<folder>"  and the file exists there
   (so the curated set works offline / behind a firewall). Missing locals or
   a bad animated path fall back to the CDN colour SVG automatically.

   Usage (markup):
     <fluent-emoji name="rocket"></fluent-emoji>            inline, rides the text baseline
     <fluent-emoji name="rocket" variant="animated"></fluent-emoji>
     <fluent-emoji name="chart increasing" size="120"></fluent-emoji>   big, as a graphic
     <fluent-emoji>🚀</fluent-emoji>                         resolve by glyph
   Attributes: name · variant(color|flat|3d|animated, default color) ·
               size(px or any CSS length, default 1em) · label(aria, optional).

   API:  window.FluentEmoji = { map, resolve, url(name,variant), names() }
   ========================================================================== */
(function () {
  // CDN refs are PINNED to specific commits for reproducibility — @main / @master
  // move under you, which can silently change or break rendering. The locally
  // vendored curated set in this folder was pulled from these exact commits, so
  // local (offline) and CDN (fallback) always agree. To refresh: bump both SHAs
  // and re-pull the curated files.
  var CDN_STATIC = 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@62ecdc0d7ca5c6df32148c169556bc8d3782fca4/assets';
  var CDN_ANIM   = 'https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis@55e1dceff489121c3f7c7a7ec4f4d401d2cbd53e/Emojis';
  var thisScript = document.currentScript;
  var LOCAL = thisScript && thisScript.dataset ? (thisScript.dataset.base || null) : null;

  /* Curated storytelling map.  key (kebab) -> { n: display name, c: category, g: glyph }.
     The snake-case static filename is derived from the display name, so adding
     an emoji is one line. Categories are the Animated-Fluent-Emojis folders. */
  var MAP = {
    'rocket':            { n: 'Rocket', c: 'Travel and places', g: '🚀' },
    'fire':              { n: 'Fire', c: 'Travel and places', g: '🔥' },
    'high-voltage':      { n: 'High voltage', c: 'Travel and places', g: '⚡' },
    'light-bulb':        { n: 'Light bulb', c: 'Objects', g: '💡' },
    'sparkles':          { n: 'Sparkles', c: 'Activities', g: '✨' },
    'star':              { n: 'Star', c: 'Travel and places', g: '⭐' },
    'glowing-star':      { n: 'Glowing star', c: 'Travel and places', g: '🌟' },
    'chart-increasing':  { n: 'Chart increasing', c: 'Objects', g: '📈' },
    'chart-decreasing':  { n: 'Chart decreasing', c: 'Objects', g: '📉' },
    'bar-chart':         { n: 'Bar chart', c: 'Objects', g: '📊' },
    'direct-hit':        { n: 'Bullseye', c: 'Activities', g: '🎯' },
    'trophy':            { n: 'Trophy', c: 'Activities', g: '🏆' },
    'party-popper':      { n: 'Party popper', c: 'Activities', g: '🎉' },
    'hundred-points':    { n: 'Hundred points', c: 'Smilies', g: '💯' },
    'handshake':         { n: 'Handshake', c: 'Hand gestures', g: '🤝' },
    'thumbs-up':         { n: 'Thumbs up', c: 'Hand gestures', g: '👍' },
    'clapping-hands':    { n: 'Clapping hands', c: 'Hand gestures', g: '👏' },
    'raising-hands':     { n: 'Raising hands', c: 'Hand gestures', g: '🙌' },
    'person-raising-hand': { n: 'Person raising hand', c: 'People', ca: 'People with activities', g: '🙋', t: 1 },
    'man-raising-hand':   { n: 'Man raising hand', c: 'People', ca: 'People with activities', g: '🙋‍♂️', t: 1 },
    'woman-raising-hand': { n: 'Woman raising hand', c: 'People', ca: 'People with activities', g: '🙋‍♀️', t: 1 },
    'folded-hands':      { n: 'Folded hands', c: 'Hand gestures', g: '🙏' },
    'flexed-biceps':     { n: 'Flexed biceps', c: 'Hand gestures', g: '💪' },
    'brain':             { n: 'Brain', c: 'Hand gestures', g: '🧠' },
    'eyes':              { n: 'Eyes', c: 'Hand gestures', g: '👀' },
    'robot':             { n: 'Robot', c: 'Smilies', g: '🤖' },
    'money-bag':         { n: 'Money bag', c: 'Objects', g: '💰' },
    'money-with-wings':  { n: 'Money with wings', c: 'Objects', g: '💸' },
    'briefcase':         { n: 'Briefcase', c: 'Objects', g: '💼' },
    'globe-asia':        { n: 'Globe showing asia-australia', c: 'Travel and places', g: '🌏' },
    'globe-europe':      { n: 'Globe showing europe-africa', c: 'Travel and places', g: '🌍' },
    'globe-americas':    { n: 'Globe showing americas', c: 'Travel and places', g: '🌎' },
    'world-map':         { n: 'World map', c: 'Travel and places', g: '🗺️' },
    'compass':           { n: 'Compass', c: 'Travel and places', g: '🧭' },
    'telescope':         { n: 'Telescope', c: 'Objects', g: '🔭' },
    'magnifying-glass':  { n: 'Magnifying glass tilted left', c: 'Objects', g: '🔍' },
    'crystal-ball':      { n: 'Crystal ball', c: 'Activities', g: '🔮' },
    'puzzle-piece':      { n: 'Puzzle piece', c: 'Activities', g: '🧩' },
    'gear':              { n: 'Gear', c: 'Objects', g: '⚙️' },
    'wrench':            { n: 'Wrench', c: 'Objects', g: '🔧' },
    'hammer':            { n: 'Hammer', c: 'Objects', g: '🔨' },
    'key':               { n: 'Key', c: 'Objects', g: '🔑' },
    'locked':            { n: 'Locked', c: 'Objects', g: '🔒' },
    'unlocked':          { n: 'Unlocked', c: 'Objects', g: '🔓' },
    'link':              { n: 'Link', c: 'Objects', g: '🔗' },
    'megaphone':         { n: 'Megaphone', c: 'Objects', g: '📣' },
    'loudspeaker':       { n: 'Loudspeaker', c: 'Objects', g: '📢' },
    'bell':              { n: 'Bell', c: 'Objects', g: '🔔' },
    'speech-balloon':    { n: 'Speech balloon', c: 'Smilies', g: '💬' },
    'thought-balloon':   { n: 'Thought balloon', c: 'Smilies', g: '💭' },
    'memo':              { n: 'Memo', c: 'Objects', g: '📝' },
    'books':             { n: 'Books', c: 'Objects', g: '📚' },
    'pushpin':           { n: 'Pushpin', c: 'Objects', g: '📌' },
    'calendar':          { n: 'Calendar', c: 'Objects', g: '📅' },
    'package':           { n: 'Package', c: 'Objects', g: '📦' },
    'envelope':          { n: 'Envelope', c: 'Objects', g: '✉️' },
    'file-folder':       { n: 'File folder', c: 'Objects', g: '📁' },
    'clapper-board':     { n: 'Clapper board', c: 'Objects', g: '🎬' },
    'mobile-phone':      { n: 'Mobile phone', c: 'Objects', g: '📱' },
    'laptop':            { n: 'Laptop', c: 'Objects', g: '💻' },
    'seedling':          { n: 'Seedling', c: 'Animals', g: '🌱' },
    'alarm-clock':       { n: 'Alarm clock', c: 'Travel and places', g: '⏰' },
    'hourglass-done':    { n: 'Hourglass done', c: 'Travel and places', g: '⌛' },
    'hourglass':         { n: 'Hourglass not done', c: 'Travel and places', g: '⏳' },
    'check-mark':        { n: 'Check mark button', c: 'Symbols', g: '✅' },
    'cross-mark':        { n: 'Cross mark', c: 'Symbols', g: '❌' },
    'warning':           { n: 'Warning', c: 'Symbols', g: '⚠️' }
  };

  function snake(name) {
    // keep hyphens — microsoft filenames preserve them (e.g. asia-australia)
    return String(name).toLowerCase().replace(/[^a-z0-9-]+/g, '_').replace(/^_|_$/g, '');
  }
  function titleCase(name) {
    return String(name).split(' ').map(function (w) {
      return w.split('-').map(function (p) { return p ? p.charAt(0).toUpperCase() + p.slice(1) : p; }).join('-');
    }).join(' ');
  }
  function kebab(name) {
    return String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  function resolve(name) {
    if (!name) return null;
    var k = kebab(name);
    if (MAP[k]) return Object.assign({ key: k }, MAP[k]);
    for (var key in MAP) { if (MAP[key].g === name) return Object.assign({ key: key }, MAP[key]); }
    for (var key2 in MAP) { if (kebab(MAP[key2].n) === k) return Object.assign({ key: key2 }, MAP[key2]); }
    return null;
  }
  function styleBits(v) {
    if (v === 'flat') return { f: 'Flat', s: 'flat', e: 'svg' };
    if (v === '3d')   return { f: '3D', s: '3d', e: 'png' };
    if (v === 'hc')   return { f: 'High Contrast', s: 'high_contrast', e: 'svg' };
    return { f: 'Color', s: 'color', e: 'svg' };
  }
  function cdnStatic(e, v) {
    var b = styleBits(v);
    return CDN_STATIC + '/' + encodeURIComponent(e.n) + '/' + encodeURIComponent(b.f) + '/' + snake(e.n) + '_' + b.s + '.' + b.e;
  }
  function cdnAnim(e) {
    return CDN_ANIM + '/' + encodeURIComponent(e.c) + '/' + encodeURIComponent(titleCase(e.n)) + '.png';
  }
  function localUrl(e, v) {
    if (!LOCAL) return null;
    if (v === 'animated') return LOCAL.replace(/\/$/, '') + '/animated/' + e.key + '.png';
    var b = styleBits(v);
    return LOCAL.replace(/\/$/, '') + '/' + (v === 'color' ? 'color' : v) + '/' + e.key + '.' + b.e;
  }
  // Public URL helper — best primary URL (local if a base is set, else CDN).
  function url(name, variant) {
    var e = resolve(name); if (!e) return null;
    var v = (variant || 'color').toLowerCase();
    return localUrl(e, v) || (v === 'animated' ? cdnAnim(e) : cdnStatic(e, v));
  }

  // tone key -> microsoft folder + filename suffix, and Tarikul animated words.
  // '' = the default (microsoft nests it under a "Default" folder for toneable emoji).
  var TONES = {
    '':             { folder: 'Default',      file: 'default',      anim: '' },
    'light':        { folder: 'Light',        file: 'light',        anim: 'Light Skin Tone' },
    'medium-light': { folder: 'Medium-Light', file: 'medium-light', anim: 'Medium-Light Skin Tone' },
    'medium':       { folder: 'Medium',       file: 'medium',       anim: 'Medium Skin Tone' },
    'medium-dark':  { folder: 'Medium-Dark',  file: 'medium-dark',  anim: 'Medium-Dark Skin Tone' },
    'dark':         { folder: 'Dark',         file: 'dark',         anim: 'Dark Skin Tone' }
  };
  function toneOf(t) { return TONES[(t || '').toLowerCase()] || TONES['']; }
  // animated (Tarikul): "<Name>[ <Tone> Skin Tone].png" in the category folder
  function cdnAnimToned(e, t) {
    if (!e.t) return cdnAnim(e);
    var T = toneOf(t);
    var nm = T.anim ? titleCase(e.n) + ' ' + T.anim : titleCase(e.n);
    var cat = (T.anim && e.ca) ? e.ca : e.c;   // toned variants can live in a different category folder
    return CDN_ANIM + '/' + encodeURIComponent(cat) + '/' + encodeURIComponent(nm) + '.png';
  }
  // static (microsoft): toneable emoji nest under "<Name>/<Folder>/<Style>/<snake>_<style>_<tone>.<ext>"
  function cdnStaticToned(e, v, t) {
    if (!e.t) return cdnStatic(e, v);
    var b = styleBits(v), T = toneOf(t);
    return CDN_STATIC + '/' + encodeURIComponent(e.n) + '/' + encodeURIComponent(T.folder) + '/' +
      encodeURIComponent(b.f) + '/' + snake(e.n) + '_' + b.s + '_' + T.file + '.' + b.e;
  }

  // Render the image into a SHADOW ROOT — the DC/React host owns the light DOM
  // and will wipe any <img> appended there, so it must live in shadow.
  function render(el) {
    var name = el.getAttribute('name') || (el.textContent || '').trim();
    var variant = (el.getAttribute('variant') || 'color').toLowerCase();
    var tone = el.getAttribute('tone') || '';
    var size = el.getAttribute('size') || '1em';
    if (/^\d+(\.\d+)?$/.test(size)) size = size + 'px';
    var root = el.shadowRoot || el.attachShadow({ mode: 'open' });
    var e = resolve(name);
    if (!e) { root.innerHTML = ''; el.textContent = name || ''; return; }
    var label = el.getAttribute('label') || e.n;
    var toned = e.t && toneOf(tone).anim;
    var primary = (!toned && localUrl(e, variant)) || (variant === 'animated' ? cdnAnimToned(e, tone) : cdnStaticToned(e, variant, tone));
    var colorToned = cdnStaticToned(e, 'color', tone);   // same tone, static colour
    var colorPlain = cdnStaticToned(e, 'color', '');      // default tone, static colour
    root.innerHTML = '<img alt="' + label.replace(/"/g, '') + '" role="img" draggable="false" ' +
      'style="width:' + size + ';height:' + size + ';display:block;object-fit:contain" />';
    var img = root.firstChild;
    img.onerror = function () {
      if (img.getAttribute('src') !== colorToned) { img.src = colorToned; return; }
      if (img.getAttribute('src') !== colorPlain) { img.src = colorPlain; return; }
      img.onerror = null;
    };
    img.src = primary;
    el.style.display = 'inline-flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    el.style.lineHeight = '0';
    el.style.verticalAlign = '-0.18em';
  }

  if (!customElements.get('fluent-emoji')) {
    customElements.define('fluent-emoji', class extends HTMLElement {
      static get observedAttributes() { return ['name', 'variant', 'size', 'label', 'tone']; }
      connectedCallback() { render(this); }
      attributeChangedCallback() { render(this); }
    });
  }

  window.FluentEmoji = {
    map: MAP,
    resolve: resolve,
    url: url,
    names: function () { return Object.keys(MAP); }
  };
})();
