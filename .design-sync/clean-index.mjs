// Strips internal "Private/*" story entries from the reference storybook's
// index.json so the converter never indexes them.
//
// Why this exists: storybook 10.2.19 ignores main.ts's `stories` array in the
// build path used here (setting it to welcome-only still indexes all 261
// stories — the "manifest" indexer globs every *-story.tsx regardless), so the
// VERCEL_PROD_BUILD gate that normally drops `src/__private_stories__/` has no
// effect. Private titles whose leaf collides with a public export (e.g.
// "Private/Deprecated Card Stories/DataCard" vs public "DataCard") would merge
// their stories into the public component — and deprecated stories render old
// APIs against the current export, producing wrong output. titleMap nulls
// cannot disambiguate by full title path, only by leaf name, so this filters
// by the "Private/" title prefix instead.
//
// Run after every reference rebuild:
//   npx storybook build -c .storybook -o .design-sync/sb-reference && node .design-sync/clean-index.mjs
import {readFileSync, writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';

const ref = join(dirname(fileURLToPath(import.meta.url)), 'sb-reference', 'index.json');
const idx = JSON.parse(readFileSync(ref, 'utf8'));
const before = Object.keys(idx.entries).length;
for (const [id, e] of Object.entries(idx.entries)) {
    if (typeof e.title === 'string' && e.title.startsWith('Private/')) delete idx.entries[id];
}
const after = Object.keys(idx.entries).length;
writeFileSync(ref, JSON.stringify(idx));
console.error(`clean-index: removed ${before - after} Private/* entries (${before} -> ${after})`);
