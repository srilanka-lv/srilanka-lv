/**
 * Fails while any TODO_GRIETA placeholder is left in the web app's source,
 * listing each one with the question it needs answered. A pull request is not
 * ready to merge until this passes.
 *
 * `bun run check:placeholders` (from apps/web)
 */
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { type Placeholder, findPlaceholders } from './find-placeholders';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// The marker's own definition, and tests that exercise it, are not placeholders.
const ignored = (file: string): boolean =>
  file === 'src/shared/constants/todo-grieta.ts' || /\.test\.tsx?$/.test(file);

const placeholders: Placeholder[] = [];

const files = (await readdir(path.join(root, 'src'), { recursive: true }))
  .map((file) => path.posix.join('src', file.split(path.sep).join('/')))
  .filter((file) => /\.tsx?$/.test(file) && !ignored(file));

for (const file of files) {
  const source = await readFile(path.join(root, file), 'utf8');
  placeholders.push(...findPlaceholders(file, source));
}

if (placeholders.length === 0) {
  console.log('✓ No TODO_GRIETA placeholders left.');
  process.exit(0);
}

placeholders.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);

console.error(`✗ ${placeholders.length} TODO_GRIETA placeholder(s) still need an answer:\n`);
for (const { file, line, question } of placeholders) {
  console.error(`  apps/web/${file}:${line}`);
  console.error(`    ${question ?? '(bare TODO_GRIETA marker)'}\n`);
}
process.exit(1);
