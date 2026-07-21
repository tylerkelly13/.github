import { createRequire } from "node:module";
import path from "node:path";

// Anchor resolution to the caller's working directory (not this file's
// location) so it walks up through the caller repo's node_modules.
const require = createRequire(path.join(process.cwd(), "package.json"));

let range = "";
try {
  range = require("@typescript-eslint/typescript-estree/package.json").peerDependencies?.typescript ?? "";
} catch {
  process.exit(0);
}

// crude but sufficient: an explicit upper bound at or below 7 means TS7 is still blocked
const upperBounds = [...range.matchAll(/<\s*(\d+)/g)].map((m) => Number(m[1]));
const blocksTs7 = upperBounds.length > 0 && upperBounds.every((major) => major <= 7);

console.log(JSON.stringify({ range, supported: !blocksTs7 }));
