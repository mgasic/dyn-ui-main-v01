const fs = require('fs');
const path = require('path');

const componentDir = path.join('packages', 'dyn-ui-react', 'src', 'components');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else {
            callback(path.join(dir, f));
        }
    });
}

function auditFile(filePath) {
    if (!filePath.endsWith('.module.css')) return;

    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const errors = [];

    lines.forEach((line, index) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('/*') || trimmed.startsWith('*')) return; // Skip comments somewhat

        // check for hex
        if (trimmed.includes('#')) {
            // Find # that is NOT inside var(...)
            // Simple heuristic: if it has # but no 'var(', it's definitely bad.
            // If it has both, we need to be careful.
            // Let's just flag lines with # that don't look like `var(--token, #hex)`
            // or just flag any # if it's not preceded by `,` inside a var.

            // Strict check: we want usage of tokens.
            // If the line contains a hex code, print it for manual review unless it's strictly `var(..., #...)` matches.

            // Actually, let's just flag usage not involving 'var(' at all first.
            if (!trimmed.includes('var(')) {
                errors.push(`Line ${index + 1}: Hardcoded hex color? "${trimmed}"`);
            }
        }

        // check for px
        if (trimmed.includes('px')) {
            if (!trimmed.includes('var(')) {
                // Allow 1px borders
                if ((trimmed.includes('border') || trimmed.includes('outline')) && trimmed.includes('1px')) {
                    // likely ok
                } else {
                    errors.push(`Line ${index + 1}: Hardcoded px value? "${trimmed}"`);
                }
            }
        }
    });

    if (errors.length > 0) {
        console.log(`\n${filePath}:`);
        errors.forEach(e => console.log(e));
    }
}

console.log('Starting Style Audit...');
walkDir(componentDir, auditFile);
console.log('Audit Complete.');
