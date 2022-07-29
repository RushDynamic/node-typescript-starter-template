#!/usr/bin/env node
const { execSync } = require('child_process');
const ascii = `
 ____   __ __   _____ __ __ 
|    \\ |  |  | / ___/|  |  |
|  D  )|  |  |(   \\_ |  |  |
|    / |  |  | \\__  ||  _  |
|    \\ |  :  | /  \\ ||  |  |
|  .  \\|     | \\    ||  |  |
|__|\\_| \\__,_|  \\___||__|__|
                            `;
console.log(ascii);

const runCmd = (cmd) => {
    try {
        execSync(`${cmd}`, { stdio: 'inherit' });
        return true;
    } catch (e) {
        console.log(`An exception occurred while running cmd: ${cmd}: ${e.getMessage()}`);
        return false;
    }
};

const repoName = process.argv[2];
const gitCheckoutCmd = `git clone --depth 1 https://github.com/RushDynamic/node-typescript-starter-template ${repoName}`;
const removeGitDirCmd = `cd ${repoName} && rm -rf .git`;
const installDepsCmd = `cd ${repoName} && npm install --include=dev`;

// clone repo
const gitRes = runCmd(gitCheckoutCmd);
if (!gitRes) process.exit(-1);

// delete .git dir
console.log("Removing template's .git directory");
const removeRes = runCmd(removeGitDirCmd);
if (!removeRes) process.exit(-1);

// install deps
console.log('Installing dependencies');
const depsRes = runCmd(installDepsCmd);
if (!depsRes) process.exit(-1);

console.log("Setup successful, be sure to update package.json with your app's  information");
console.log('Happy hacking.');
