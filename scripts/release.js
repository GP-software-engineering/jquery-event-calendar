/**
 * Release Script
 * Automatically tags and pushes a new release based on the package.json version.
 * Supports auto-confirmation via the '-y' or '--yes' argument.
 */
const { execSync } = require('child_process');
const readline = require('readline');
const packageJson = require('../package.json');

const version = packageJson.version;
const tagName = `v${version}`;
const args = process.argv.slice(2);
const autoConfirm = args.includes('-y') || args.includes('--yes');

/**
 * Executes a shell command synchronously and returns the output.
 * @param {string} command - The shell command to execute.
 * @returns {string} The trimmed standard output.
 */
function runCommand(command) {
    try {
        return execSync(command, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
    } catch (error) {
        return null;
    }
}

// 1. Check if the tag already exists locally
const existingTag = runCommand(`git tag -l ${tagName}`);
if (existingTag === tagName) {
    console.error(`\x1b[31m[ERROR] Tag ${tagName} already exists locally. Please increment the version in package.json.\x1b[0m`);
    process.exit(1);
}

// 2. Function to execute the release process
function executeRelease() {
    console.log(`\n\x1b[36m🚀 Creating release for ${tagName}...\x1b[0m`);
    try {
        execSync(`git tag -a ${tagName} -m "Release ${tagName}"`, { stdio: 'inherit' });
        execSync(`git push origin ${tagName}`, { stdio: 'inherit' });
        console.log(`\x1b[32m✅ Successfully tagged and pushed ${tagName}!\x1b[0m`);
    } catch (error) {
        console.error(`\x1b[31m[ERROR] Failed to tag or push release.\x1b[0m`);
        process.exit(1);
    }
}

// 3. Prompt for confirmation if not auto-confirmed
if (autoConfirm) {
    executeRelease();
} else {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question(`\x1b[33m❓ Are you sure you want to release ${tagName}? (y/N) \x1b[0m`, (answer) => {
        if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
            executeRelease();
        } else {
            console.log('\x1b[31m❌ Release aborted by user.\x1b[0m');
        }
        rl.close();
    });
}