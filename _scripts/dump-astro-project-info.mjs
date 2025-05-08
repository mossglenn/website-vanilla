/**
 * 📦 Astro Project Snapshot Script
 *
 * This script generates a comprehensive markdown summary of the current Astro project,
 * including file structure, environment info, and key config files (e.g. package.json, tailwind.config.ts).
 *
 * It is intended for debugging, analysis, and sharing project context — especially when asking for help.
 * The output is saved to `.reference-files/astro-project-dump.md` and zipped as `.reference-files/astro-project-snapshot.zip`.
 *
 * The generated files are ignored by Git, ESLint, and Prettier, as they are not meant to be edited or versioned.
 *
 * Usage:
 *   npm dump
 */

// dump-astro-project.mjs
import { execSync } from 'child_process';
import { promises as fs } from 'fs';

const OUT_FILE = '.project-summaries/astro-project-dump.md';
const ZIP_FILE = '.project-summaries/astro-project-snapshot.zip';
const SECTIONS = [];

async function safeRead(file) {
  try {
    const content = await fs.readFile(file, 'utf8');
    return content;
  } catch {
    return null;
  }
}

function getFileHeader(title) {
  return `\n## 📄 ${title}\n\n\`\`\`\n`;
}

async function dumpConfigFile(name, filePath) {
  const content = await safeRead(filePath);
  if (content) {
    SECTIONS.push(getFileHeader(name) + content + '\n```');
  }
}

function runCommand(command) {
  try {
    return execSync(command, { encoding: 'utf8' }).trim();
  } catch {
    return 'Command failed';
  }
}

async function zipOutput() {
  const zipCmd = `zip -j ${ZIP_FILE} ${OUT_FILE}`;
  try {
    execSync(zipCmd);
    console.log(`📦 Snapshot zipped to ${ZIP_FILE}`);
  } catch (err) {
    console.error('❌ Failed to create zip archive:', err.message);
  }
}

async function main() {
  SECTIONS.push(`# 🧾 Astro Project Snapshot\nGenerated: ${new Date().toISOString()}`);

  // Node and npm versions
  SECTIONS.push(`\n## 🔧 Environment\n\n\`\`\`bash
Node: ${runCommand('node -v')}
npm: ${runCommand('npm -v')}
pnpm: ${runCommand('pnpm -v')}
\`\`\``);

  // Directory structure
  SECTIONS.push(
    `\n## 📁 File Structure\n\n\`\`\`bash\n${runCommand('find . -type d \\( -name node_modules -o -name dist -o -name .git -o -name .astro -o -name .netlify \\) -prune -false -o -type f -print | sort')}\n\`\`\``
  );

  // Config files
  await dumpConfigFile('package.json', 'package.json');
  await dumpConfigFile('astro.config.mjs', 'astro.config.mjs');
  await dumpConfigFile('tailwind.config.ts', 'tailwind.config.ts');
  await dumpConfigFile('postcss.config.js', 'postcss.config.js');
  await dumpConfigFile('eslint.config.js', 'eslint.config.js');
  await dumpConfigFile('.prettierrc', '.prettierrc');
  await dumpConfigFile('.prettierignore', '.prettierignore');
  await dumpConfigFile('.gitignore', '.gitignore');
  await dumpConfigFile('.vscode/settings.json', '.vscode/settings.json');
  await dumpConfigFile('README.md', 'README.md');

  const envContents = await safeRead('.env');
  if (envContents) {
    SECTIONS.push(
      `\n## ⚠️ .env (values redacted)\n\n\`\`\`\n${envContents.replace(/=.*/g, '=***REDACTED***')}\n\`\`\``
    );
  }

  await fs.writeFile(OUT_FILE, SECTIONS.join('\n'));
  console.log(`✅ Project snapshot written to: ${OUT_FILE}`);

  await zipOutput();
}

main();
