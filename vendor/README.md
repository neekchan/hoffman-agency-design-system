# vendor — the three runtime libraries, kept beside the system

<!-- Vendored by Nicolas Chan on 5 November 2026 so the templates stop depending on unpkg being reachable. -->

| File | What | Version | SHA-384 (matches the pinned CDN integrity) |
|---|---|---|---|
| `react.production.min.js` | React UMD | 18.3.1 | `DGyLxAyjq0f9SPpVevD6IgztCFlnMF6oW/XQGmfe+IsZ8TqEiDrcHkMLKI6fiB/Z` |
| `react-dom.production.min.js` | ReactDOM UMD | 18.3.1 | `gTGxhz21lVGYNMcdJOyq01Edg0jhn/c22nsx0kyqP0TxaV5WVdsSH1fSDUf5YJj1` |
| `babel.min.js` | Babel standalone (JSX in the browser) | 7.29.0 | `m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y` |

Every template (`templates/*/support.js`), both UI-kit pages and the standalone Brand Tour load these first and fall back to the same pinned builds on unpkg only when the folder is not beside the page. Nothing else in the system needs the network to render; the brand fonts are self-hosted in `fonts/`, the curated Fluent emoji in `assets/emoji/`, the photography in `assets/photography/`.

To check a file: `openssl dgst -sha384 -binary <file> | base64` must equal the hash above. Replace all three together when upgrading, and update the `integrity` values in the loaders to match.
