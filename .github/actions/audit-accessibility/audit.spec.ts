import fs from 'fs';
import {test, expect} from 'playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {PATH_AXE_REPORTS, getAuditCases, getAxeReportPath, getDisabledRules} from './audit-rules';

import type {Page} from 'playwright/test';
import type {AxeResults} from 'axe-core';

const openStory = async (page: Page, story: string, skin: string) => {
    // Late images and fonts change the color contrast results
    await page.goto(`/iframe.html?viewMode=story&id=${story}&skin=${skin}`, {waitUntil: 'networkidle'});
    const storyRoot = page.locator('#storybook-root > *').first();
    try {
        await storyRoot.waitFor({state: 'attached', timeout: 5000});
    } catch {
        // Some stories legitimately render no content, so a missing root is not a failure
    }
};

const runAxe = (page: Page, story: string, skin: string) =>
    new AxeBuilder({page})
        // ignored because some stories don't include an H1 header
        .disableRules(['page-has-heading-one', ...getDisabledRules(story, skin)])
        .analyze();

// The CI action builds the pull request report from these files
const saveAxeResults = async (result: AxeResults, story: string, skin: string) => {
    const reportPath = getAxeReportPath(story, skin);
    fs.mkdirSync(PATH_AXE_REPORTS, {recursive: true});
    fs.writeFileSync(reportPath, JSON.stringify(result, null, 2));
    await test.info().attach('axe-results', {path: reportPath, contentType: 'application/json'});
};

const summarizeViolations = (result: AxeResults) =>
    result.violations.map(({id, help, nodes}) => `${id}: ${help} (${nodes.length} nodes)`);

test.beforeEach(async ({page}) => {
    // Preserve the user-agent marker Mistica uses to detect the test environment.
    await page.addInitScript(() => {
        const userAgent = navigator.userAgent;
        Object.defineProperty(navigator, 'userAgent', {get: () => `${userAgent} acceptance-test`});
    });
});

for (const {story, skin} of getAuditCases()) {
    test(`${story} [${skin}]`, async ({page}) => {
        await openStory(page, story, skin);

        const result = await runAxe(page, story, skin);
        await saveAxeResults(result, story, skin);

        expect(summarizeViolations(result)).toEqual([]);
    });
}
