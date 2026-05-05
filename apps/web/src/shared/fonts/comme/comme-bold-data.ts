import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const fontPath = require.resolve('@fontsource/comme/files/comme-latin-700-normal.woff');

export const commeBoldData = readFileSync(fontPath);
