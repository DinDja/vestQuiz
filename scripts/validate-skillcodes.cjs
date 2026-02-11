const fs = require('fs');
const path = require('path');

const subjPath = path.resolve(__dirname, '../src/constants/subjects.jsx');
const skillPath = path.resolve(__dirname, '../src/components/quiz/DifficultySelector.jsx');

const subjRaw = fs.readFileSync(subjPath, 'utf8');
const skillRaw = fs.readFileSync(skillPath, 'utf8');

// extract all skillCode values from subjects.jsx
const skillCodeRegex = /skillCode:\s*'([^']+)'/g;
const subjCodes = new Set();
let m;
while ((m = skillCodeRegex.exec(subjRaw)) !== null) subjCodes.add(m[1]);

// extract all SKILL_MAP keys from DifficultySelector.jsx
const skillMapKeyRegex = /'([A-Z0-9-]+)':/g;
const mapKeys = new Set();
while ((m = skillMapKeyRegex.exec(skillRaw)) !== null) mapKeys.add(m[1]);

const missing = [];
for (const code of Array.from(subjCodes).sort()) {
  if (!mapKeys.has(code)) missing.push(code);
}

if (missing.length === 0) {
  console.log('✅ All skillCode values in subjects.jsx are present in SKILL_MAP.');
  process.exit(0);
} else {
  console.error('❌ Missing skillCode keys in SKILL_MAP:');
  missing.forEach(c => console.error('  -', c));
  process.exit(2);
}
