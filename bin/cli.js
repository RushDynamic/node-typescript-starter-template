#!/usr/bin/env node

const { execSync } = require('child_process');

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
const installDepsCmd = `cd ${repoName} && npm install --include=dev`;

console.log(`Cloning repo: ${repoName}`);
const gitRes = runCmd(gitCheckoutCmd);
if (!gitRes) process.exit(-1);

console.log('Installing dependencies');
const depsRes = runCmd(installDepsCmd);
if (!depsRes) process.exit(-1);

console.log('Setup successful, happy hacking!');
