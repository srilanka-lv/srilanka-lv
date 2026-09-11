export default {
  // Biome ignores some staged paths on purpose (see biome.json "files.includes",
  // e.g. the generated serpapi flight data). Without this flag it exits 1 with
  // "No files were processed" and blocks the commit.
  '*.{ts,tsx,js,jsx,json,css}': [
    'biome format --write --no-errors-on-unmatched',
    'biome check --no-errors-on-unmatched',
  ],
};
