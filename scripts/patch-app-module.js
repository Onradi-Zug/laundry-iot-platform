const fs = require('fs');
const p = 'src/app.module.ts';
let s = fs.readFileSync(p, 'utf8');

// Додати імпорт, якщо його немає
if (!/ProtectedModule/.test(s)) {
  s = 'import { ProtectedModule } from \"./protected/protected.module\";\\n' + s;
}

// Вставити ProtectedModule у масив imports, якщо ще не вставлено
s = s.replace(/imports\\s*:\\s*\

\[([\\s\\S]*?)\\]

/, (m, inner) => {
  if (/ProtectedModule/.test(inner)) return m;
  return 'imports: [ProtectedModule,' + inner + ']';
});

fs.writeFileSync(p, s);
console.log('app.module.ts patched');
