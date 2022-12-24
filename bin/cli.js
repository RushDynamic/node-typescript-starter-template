#!/usr/bin/env node
const { executeCommands } = require('./cmd');
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

const repoName = process.argv[2];
if (!repoName) {
    console.error('Please enter a valid project name.');
    process.exit(-1);
}
executeCommands(repoName);

console.log("\nSetup successful, be sure to update package.json with your app's information.");
console.log('\n\nHappy hacking.');
