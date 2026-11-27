const fs = require('fs');
const path = require('path');

const reportsDir = path.resolve(__dirname, '../reports/playwright-merged');
const outputDir = path.join(reportsDir, 'json');
const report = JSON.parse(fs.readFileSync(path.join(reportsDir, 'results.json'), 'utf8'));
const copiedAttachments = new Map();

fs.rmSync(outputDir, {recursive: true, force: true});
fs.mkdirSync(path.join(outputDir, 'attachments'), {recursive: true});

const prepareAttachments = (value) => {
    if (Array.isArray(value)) {
        value.forEach(prepareAttachments);
        return;
    }
    if (!value || typeof value !== 'object') {
        return;
    }

    for (const attachment of value.attachments || []) {
        if (!attachment.path) {
            continue;
        }
        const source = attachment.path;
        if (!copiedAttachments.has(source)) {
            const filename = `${copiedAttachments.size + 1}-${path.basename(source)}`;
            const relativePath = `attachments/${filename}`;
            fs.copyFileSync(source, path.join(outputDir, relativePath));
            copiedAttachments.set(source, relativePath);
        }
        attachment.path = copiedAttachments.get(source);
    }
    Object.values(value).forEach(prepareAttachments);
};

prepareAttachments(report);
fs.writeFileSync(path.join(outputDir, 'results.json'), JSON.stringify(report, null, 2));
console.log(`Prepared the JSON report with ${copiedAttachments.size} portable attachments.`);
