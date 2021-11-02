const StaticServer = require('static-server');
const path = require('path');

const storybookPort = 6006;

console.log('Starting storybook server');

new StaticServer({
    rootPath: path.join(__dirname, '..', 'public'),
    port: storybookPort,
}).start(() => {
    console.log(`Storybook server ready on http://localhost:${storybookPort}`);
});
