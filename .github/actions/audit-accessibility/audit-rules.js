// @ts-check
// Shared by main.js (the CI report) and audit.spec.ts (the audit)
const fs = require('fs');
const path = require('path');

const PATH_STORYBOOK_INDEX = path.join(__dirname, '../../../public/index.json');
const PATH_AXE_REPORTS = path.join(__dirname, '../../../reports/accessibility');
const AXE_REPORT_NAME_SEPARATOR = '--';

const SKINS = ['Movistar', 'O2', 'Vivo', 'Vivo-evolution', 'Blau'];

const STORIES_BLACKLIST = new Set([
    'welcome-welcome--mistica',
    'icons-catalog--catalog', // takes a lot of time to parse and it is not very relevant for a11y
]);

/**
 * @type {Record<string, Record<string, Array<string>>>}
 */
const disabledRulesByStoryAndSkin = {
    'components-carousels-slideshow--default': {
        all: ['scrollable-region-focusable'],
    },
    'components-carousels-slideshow--with-carousel-context': {
        all: ['scrollable-region-focusable'],
    },
    'components-carousels-centeredcarousel--default': {
        all: ['scrollable-region-focusable'],
    },
    'components-carousels-centeredcarousel--with-controls': {
        all: ['scrollable-region-focusable'],
    },
    'layout-horizontalscroll--default': {
        all: ['scrollable-region-focusable'],
    },

    'patterns-loading--loading-screen-story': {
        all: ['color-contrast'],
    },
    'patterns-loading--brand-loading-screen-story': {
        all: ['color-contrast'],
    },

    'utilities-animations-fadein--default': {
        all: ['color-contrast'],
    },
    'utilities-animations-fadeout--default': {
        all: ['color-contrast'],
    },

    'patterns-feedback-feedbackscreen--feedback-screen-story': {
        Blau: ['color-contrast'],
    },
    'community-examplecomponent--default': {
        Blau: ['color-contrast'],
    },
    'private-components-in-different-skins--default': {
        Blau: ['color-contrast'],
    },
};

/**
 * @param {string} story
 * @param {string} skin
 * @returns {Array<string>}
 */
const getDisabledRules = (story, skin) => {
    const disabledRulesForStory = disabledRulesByStoryAndSkin[story] || {};
    const disabledRulesForSkin = disabledRulesForStory[skin] || [];
    const disabledRulesForAllSkins = disabledRulesForStory.all || [];
    return [...disabledRulesForSkin, ...disabledRulesForAllSkins];
};

/**
 * @returns {Array<{story: string, skin: string}>}
 */
const getAuditCases = () => {
    if (!fs.existsSync(PATH_STORYBOOK_INDEX)) {
        throw new Error('Static storybook build not found. Execute `yarn storybook-static` first');
    }
    const {entries} = JSON.parse(fs.readFileSync(PATH_STORYBOOK_INDEX, 'utf8'));
    return Object.keys(entries)
        .filter((story) => !STORIES_BLACKLIST.has(story))
        .flatMap((story) => SKINS.map((skin) => ({story, skin})));
};

/**
 * @param {string} story
 * @param {string} skin
 * @returns {string}
 */
const getAxeReportPath = (story, skin) =>
    path.join(PATH_AXE_REPORTS, `${story}${AXE_REPORT_NAME_SEPARATOR}${skin}.json`);

/**
 * Story ids also contain the separator, but skin names do not, so the last one splits them
 * @param {string} reportPath
 * @returns {{story: string, skin: string}}
 */
const parseAxeReportPath = (reportPath) => {
    const name = path.basename(reportPath, '.json');
    const separatorIndex = name.lastIndexOf(AXE_REPORT_NAME_SEPARATOR);
    return {
        story: name.slice(0, separatorIndex),
        skin: name.slice(separatorIndex + AXE_REPORT_NAME_SEPARATOR.length),
    };
};

module.exports = {
    PATH_AXE_REPORTS,
    getAuditCases,
    getAxeReportPath,
    getDisabledRules,
    parseAxeReportPath,
};
