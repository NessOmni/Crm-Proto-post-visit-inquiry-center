/* Inline the Vite build into one self-contained HTML file.
   Run after `npm run build` (or use `npm run build:html`). Produces
   docs/omnicasa-prototype.html — openable directly in a browser, no
   server, deterministic and offline (Inter font + photos load from CDN
   when online, fall back gracefully when not). */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const dist = "dist";
let html = readFileSync(join(dist, "index.html"), "utf8");

// Inline the built CSS.
html = html.replace(
  /<link rel="stylesheet"[^>]*href="\/(assets\/[^"]+\.css)"\s*>/,
  (_, p) => `<style>\n${readFileSync(join(dist, p), "utf8")}\n</style>`,
);

// Inline the built JS module (escape any </script> in string literals).
html = html.replace(
  /<script type="module"[^>]*src="\/(assets\/[^"]+\.js)"><\/script>/,
  (_, p) => {
    const js = readFileSync(join(dist, p), "utf8").replace(/<\/script>/g, "<\\/script>");
    return `<script type="module">\n${js}\n</script>`;
  },
);

html = html.replace(
  "<title>Omnicasa — Briefing</title>",
  '<title>Omnicasa — Presentation Prototype (self-contained)</title>\n' +
    "    <!-- Self-contained build of the Omnicasa presentation prototype.\n" +
    "         Deterministic & offline; Inter font and property photos load from\n" +
    "         CDN when online and fall back gracefully offline. Open directly in\n" +
    '         a browser — no build step. Press R (or "Replay the scene") to reset. -->',
);

mkdirSync("docs", { recursive: true });
const out = "docs/omnicasa-prototype.html";
writeFileSync(out, html);

const remaining = (html.match(/\/assets\//g) || []).length;
if (remaining > 0) throw new Error(`Inlining incomplete: ${remaining} /assets refs remain`);
console.log(`wrote ${out}  (${(Buffer.byteLength(html) / 1024).toFixed(0)} KB)`);
