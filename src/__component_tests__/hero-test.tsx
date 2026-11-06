import {test, expect} from '../test-utils/component';

import type {ReadingOrder} from './hero.story';

for (const {pretitleAs, titleAs, expectedOrder} of [
    {pretitleAs: undefined, titleAs: undefined, expectedOrder: 'TitleHeadlinePretitleDescription'},
    {pretitleAs: undefined, titleAs: 'span', expectedOrder: 'TitleHeadlinePretitleDescription'},
    {pretitleAs: undefined, titleAs: 'h1', expectedOrder: 'TitleHeadlinePretitleDescription'},
    {pretitleAs: 'span', titleAs: undefined, expectedOrder: 'TitleHeadlinePretitleDescription'},
    {pretitleAs: 'h3', titleAs: undefined, expectedOrder: 'TitleHeadlinePretitleDescription'},
    {pretitleAs: 'h3', titleAs: 'h1', expectedOrder: 'TitleHeadlinePretitleDescription'},
    {pretitleAs: 'span', titleAs: 'h1', expectedOrder: 'TitleHeadlinePretitleDescription'},
    {pretitleAs: 'h1', titleAs: undefined, expectedOrder: 'TitleHeadlinePretitleDescription'},
    {pretitleAs: 'h1', titleAs: 'h3', expectedOrder: 'PretitleHeadlineTitleDescription'},
    {pretitleAs: 'h1', titleAs: 'span', expectedOrder: 'PretitleHeadlineTitleDescription'},
] as const) {
    test(`Hero has correct reading order with pretitleAs={${pretitleAs}} and titleAs={${titleAs}}`, async ({
        mount,
    }) => {
        const component = await mount<typeof ReadingOrder>('hero/ReadingOrder', {pretitleAs, titleAs});
        await expect(component.getByTestId('hero')).toHaveText(expectedOrder);
    });
}
