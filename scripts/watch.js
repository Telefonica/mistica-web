// @flow
const {spawn} = require('child_process');

const babelProcess = spawn('yarn', ['build', '--watch']);

babelProcess.stdout.on('data', (data) => {
    const strOut = `${data}`;
    if (strOut.includes('Successfully compiled')) {
        console.log('Babel compiled');
        // flow copy sources
        spawn('yarn', ['postbuild'], {stdio: 'inherit'});
    }
});
