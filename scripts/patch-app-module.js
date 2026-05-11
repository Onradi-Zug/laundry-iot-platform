const fs = require('fs');
const path = require('path');

const MODULE_PATH = path.resolve(__dirname, '../src/app.module.ts'); 
const PROTECTED_MODULE_IMPORT = "import { ProtectedModule } from './protected/protected.module';";

function patchAppModule() {
    try {
        let s;
        console.log(`[PATCHER] Reading file: ${MODULE_PATH}`);
        s = fs.readFileSync(MODULE_PATH, 'utf8');

        if (!s.includes('ProtectedModule')) {
            console.log('[PATCHER] ProtectedModule import missing. Adding it now.');
            s = PROTECTED_MODULE_IMPORT + '\n' + s;
        }

        const regex = /imports\s*:\s*\[([\s\S]*?)\]/g;

        let newContent = s.replace(regex, (match, inner) => {
            if (/ProtectedModule/.test(inner)) {
                console.log('[PATCHER] ProtectedModule already listed in imports. No changes needed.');
                return match; 
            }
            const updatedInner = `ProtectedModule, ${inner}`.trim();
            return `imports: [${updatedInner}]`;
        });

        if (newContent !== s) {
             console.log('[PATCHER] Changes detected. Writing patched content.');
             fs.writeFileSync(MODULE_PATH, newContent);
        } else {
            console.log('[PATCHER] File is already up-to-date. No changes written.');
        }

        console.log('\n✅ SUCCESS: app.module.ts successfully patched and saved.');

    } catch (error) {
        console.error('\n❌ FATAL ERROR during patching process!');
        if (error instanceof SyntaxError) {
             console.error(`Syntax Error: Перевірте кодування файлу і відсутність BOM! Деталі: ${error.message}`);
        } else if (error.code === 'ENOENT') {
            console.error(`File Not Found: Неможливо знайти файл за шляхом: ${MODULE_PATH}`);
        } else {
             console.error(`Невідома помилка виконання: ${error.stack || error.message}`);
        }
    }
}
patchAppModule();
