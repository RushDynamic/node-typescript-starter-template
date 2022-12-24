const { execSync } = require('child_process');
const { readFileSync, writeFileSync } = require('node:fs');

const runNativeCommand = (cmd) => {
    try {
        execSync(`${cmd}`, { stdio: 'inherit' });
        return true;
    } catch (e) {
        return false;
    }
};

const getCommands = (repoName) => [
    {
        cmd: `git clone --depth 1 https://github.com/RushDynamic/node-typescript-starter-template ${repoName}`,
        msg: 'Cloning starter template repo',
        native: true
    },
    {
        cmd: () => {
            let content = JSON.parse(readFileSync(`${repoName}/package.json`));
            content.name = repoName;
            content.version = '1.0.0';
            ['description', 'bin', 'author'].forEach((key) => delete content[key]);
            writeFileSync(`${repoName}/package.json`, JSON.stringify(content));
        },
        msg: 'Updating package.json'
    },
    {
        cmd: `cd ${repoName} && rm -rf .git`,
        msg: "Removing template's .git directory",
        native: true
    },
    {
        cmd: () => {
            let content = readFileSync(`${repoName}/bin/README.md`, 'utf-8');
            writeFileSync(`${repoName}/README.md`, content.replace('{app-name}', `${repoName}`));
        },
        msg: 'Adding default README'
    },
    {
        cmd: `cd ${repoName} && rm -rf bin`,
        msg: 'Cleaning up template files',
        native: true
    },
    {
        cmd: `cd ${repoName} && npm install --include=dev`,
        msg: 'Installing dependencies',
        native: true
    }
];

const attemptRollback = (repoName) => {
    try {
        console.log('\nAttempting to remove partial setup files');
        if (runNativeCommand(`rm -rf ${repoName}`)) {
            console.log('Rollback successful');
        } else {
            console.error('Rollback failed');
        }
    } catch (e) {
        // Nothing to handle
    } finally {
        process.exit(-1);
    }
};

const executeCommands = (repoName) => {
    getCommands(repoName).forEach((command, idx, arr) => {
        try {
            console.log(`[${idx + 1}/${arr?.length}] ${command.msg}`);
            if (command.native) {
                if (!runNativeCommand(command.cmd)) {
                    throw { message: 'Native command execution failed' };
                }
            } else {
                command.cmd();
            }
            console.log('\n');
        } catch (e) {
            console.error(
                `An exception occurred on step ${idx + 1}: ${command.msg?.trim()} => ${e.message}`
            );
            attemptRollback(repoName);
        }
    });
};

module.exports = { executeCommands };
