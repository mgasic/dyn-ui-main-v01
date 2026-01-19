#!/usr/bin/env node

/**
 * 🎨 Design Tokens Validation Script
 * 
 * Validates all token JSON files against schema requirements
 * Ensures consistency and prevents malformed tokens from breaking builds
 * 
 * Usage: npm run tokens:validate
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const tokensDir = path.join(__dirname, '../tokens');
const errors = [];
const warnings = [];

/**
 * Rule 1: Validate JSON syntax
 */
function validateJsonSyntax(filePath) {
  try {
    JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return null;
  } catch (err) {
    return `Invalid JSON: ${err.message}`;
  }
}

/**
 * Rule 2: Every token must have a value
 */
function validateTokenValues(content, filePath) {
  const localErrors = [];

  function checkValue(obj, path = []) {
    for (const [key, val] of Object.entries(obj)) {
      const currentPath = [...path, key].join('.');

      if (val === null || val === undefined) {
        localErrors.push(`${path.slice(0, -1).join('/')}/${key}: value is null or undefined`);
        return;
      }

      if (typeof val !== 'object') {
        return;
      }

      // Check if this is a token (has 'value' property)
      if ('value' in val) {
        if (val.value === null || val.value === undefined || val.value === '') {
          localErrors.push(`Token '${currentPath}': missing or empty value`);
        }
      } else {
        // Recursively check nested objects
        checkValue(val, [...path, key]);
      }
    }
  }

  checkValue(content);
  return localErrors;
}

/**
 * Rule 3: Token names should follow naming convention
 */
function validateNamingConventions(content, filePath) {
  const localWarnings = [];

  function checkNames(obj, path = []) {
    for (const [key, val] of Object.entries(obj)) {
      // Check if key uses camelCase or kebab-case (allows starting with a digit)
      if (!/^[a-z0-9][a-zA-Z0-9]*$|^[a-z0-9](-[a-z0-9]*)*$/.test(key)) {
        const currentPath = [...path, key].join('.');
        localWarnings.push(`${currentPath}: key should use camelCase or kebab-case`);
      }

      if (typeof val === 'object' && val !== null && !('value' in val)) {
        checkNames(val, [...path, key]);
      }
    }
  }

  checkNames(content);
  return localWarnings;
}

/**
 * Rule 4: Ensure no duplicate token names in global scope
 */
function validateNoDuplicates(allContent) {
  const tokenNames = new Map();
  const duplicates = [];

  function collectTokens(obj, filePath, path = []) {
    for (const [key, val] of Object.entries(obj)) {
      const currentPath = [...path, key].join('.');

      if (typeof val === 'object' && val !== null) {
        if ('value' in val) {
          // It's a token
          const fullName = currentPath;
          if (tokenNames.has(fullName)) {
            duplicates.push({
              name: fullName,
              file1: tokenNames.get(fullName),
              file2: filePath
            });
          } else {
            tokenNames.set(fullName, filePath);
          }
        } else {
          // Recurse
          collectTokens(val, filePath, [...path, key]);
        }
      }
    }
  }

  for (const [filePath, content] of allContent) {
    collectTokens(content, filePath);
  }

  return duplicates;
}

/**
 * Main validation flow
 */
function validateAllTokens() {
  console.log(chalk.blue('\n🎨 Validating Design Tokens...\n'));

  if (!fs.existsSync(tokensDir)) {
    console.error(chalk.red(`❌ Tokens directory not found: ${tokensDir}`));
    process.exit(1);
  }

  const allTokenFiles = getAllJsonFiles(tokensDir);
  const allContent = [];

  for (const filePath of allTokenFiles) {
    const relativePath = path.relative(tokensDir, filePath);

    // Rule 1: JSON syntax
    const syntaxError = validateJsonSyntax(filePath);
    if (syntaxError) {
      errors.push(`${relativePath}: ${syntaxError}`);
      continue;
    }

    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    allContent.push([relativePath, content]);

    // Rule 2: Token values
    const valueErrors = validateTokenValues(content, relativePath);
    errors.push(...valueErrors.map(e => `${relativePath}: ${e}`));

    // Rule 3: Naming conventions
    const namingWarnings = validateNamingConventions(content, relativePath);
    warnings.push(...namingWarnings.map(w => `${relativePath}: ${w}`));
  }

  // Rule 4: No duplicates
  const duplicates = validateNoDuplicates(allContent);
  duplicates.forEach(dup => {
    errors.push(`Duplicate token '${dup.name}' found in ${dup.file1} and ${dup.file2}`);
  });

  // Report results
  console.log(`Found ${allTokenFiles.length} token files\n`);

  if (errors.length > 0) {
    console.error(chalk.red(`❌ VALIDATION FAILED (${errors.length} error${errors.length !== 1 ? 's' : ''})`));
    errors.forEach(err => console.error(chalk.red(`  • ${err}`)));
    console.log();
  } else {
    console.log(chalk.green('✅ All tokens validated successfully'));
  }

  if (warnings.length > 0) {
    console.warn(chalk.yellow(`\n⚠️  ${warnings.length} warning${warnings.length !== 1 ? 's' : ''}`));
    warnings.forEach(warn => console.warn(chalk.yellow(`  • ${warn}`)));
  }

  console.log();
  return errors.length === 0;
}

/**
 * Helper: Get all JSON files recursively
 */
function getAllJsonFiles(dir) {
  const files = [];

  function walk(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.json')) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

// Run validation
const isValid = validateAllTokens();
process.exit(isValid ? 0 : 1);
