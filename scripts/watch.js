// @flow
const {spawn} = require('child_process');

const babelProcess = spawn('yarn', ['build', '--watch']);
babelProcess.on('message', (m) => {
    console.log('new message', m);
});

babelProcess.stdout.on('data', (data) => {
    const strOut = `${data}`;
    if (strOut.includes('Successfully compiled')) {
        console.log('Babel compied');
        spawn('yarn', ['postbuild'], {stdio: 'inherit'});
    }
});
