// Webpack loader to inject story source code into story parameters
const fs = require('fs');

module.exports = function (source) {
    // Only process story files
    if (this.resourcePath.includes('-story.tsx') || this.resourcePath.includes('.stories.tsx')) {
        const filePath = this.resourcePath;

        // Read the original source file
        const originalSource = fs.readFileSync(filePath, 'utf-8');

        // Escape backticks and template literals in the source code
        const escapedSource = originalSource
            .replace(/\\/g, '\\\\')
            .replace(/`/g, '\\`')
            .replace(/\$\{/g, '\\${');

        // Inject a global variable with the source code
        const injection = `
// Injected by story-source-loader
if (typeof window !== 'undefined') {
    window.__STORY_SOURCE__ = window.__STORY_SOURCE__ || {};
    window.__STORY_SOURCE__['${filePath}'] = \`${escapedSource}\`;
}
`;

        return injection + '\n' + source;
    }

    return source;
};
