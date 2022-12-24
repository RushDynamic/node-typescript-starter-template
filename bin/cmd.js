const { execSync } = require('child_process');

const runCommand = (cmd) => {
    try {
        execSync(`${cmd}`, { stdio: 'inherit' });
        return true;
    } catch (e) {
        console.error(`An exception occurred while running cmd: ${cmd}: ${e.message}`);
        return false;
    }
};

const getCommands = (repoName) => [
    {
        cmd: `git clone --depth 1 https://github.com/RushDynamic/node-typescript-starter-template ${repoName}`,
        msg: '\nCloning starter template repo'
    },
    {
        cmd: `cd ${repoName} && rm -rf .git`,
        msg: "\nRemoving template's .git directory"
    },
    {
        cmd: `cd ${repoName} && rm -rf bin`,
        msg: '\nCleaning up template files'
    },
    {
        cmd: `cd ${repoName} && npm install --include=dev`,
        msg: '\nInstalling dependencies'
    }
];

const executeCommands = (repoName) => {
    getCommands(repoName).forEach((command) => {
        console.log(command.msg);
        if (!runCommand(command.cmd)) {
            process.exit(-1);
        }
    });
};

module.exports = { executeCommands };
