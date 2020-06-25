const {spawn} = require('child_process');

const babelProcess = spawn('yarn', ['build', '--watch']);

/**
 * @type {import('child_process').ChildProcess}
 */
let postBuildProcess;

let postBuildPending = false;

const postBuild = () => {
    // `exitCode === null` means still running
    if (postBuildProcess && postBuildProcess.exitCode === null) {
        // https://github.com/nodejs/node/issues/3617
        if (process.platform !== 'win32') {
            // kill process group
            process.kill(-postBuildProcess.pid);
        }
        postBuildPending = true;
        return;
    }

    postBuildPending = false;
    postBuildProcess = spawn('yarn', ['postbuild'], {stdio: 'inherit', detached: true});
    postBuildProcess.on('exit', () => {
        if (postBuildPending) {
            postBuild();
        } else {
            console.log('Done');
        }
    });
};

babelProcess.stdout.on('data', (data) => {
    const strOut = `${data}`;
    if (strOut.includes('Successfully compiled')) {
        postBuild();
    }
});

// CTRL+C
process.on('SIGINT', () => {
    if (postBuildProcess && postBuildProcess.exitCode === null && process.platform !== 'win32') {
        process.kill(-postBuildProcess.pid);
    }
});
