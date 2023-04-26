const handler = require('serve-handler');
const path = require('path');
const http = require('http');

const storybookPort = 6006;

const server = http.createServer((request, response) => {
    return handler(request, response, {
        public: path.join(__dirname, '..', 'public'),
        cleanUrls: ['/'],
    });
});

server.listen(storybookPort, () => {
    console.log(`Storybook server ready on http://localhost:${storybookPort}`);
});
