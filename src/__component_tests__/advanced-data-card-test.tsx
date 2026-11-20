import {test, expect} from '../test-utils/component';

import type {AccessibleName} from './advanced-data-card.story';

const titleFirst =
    'Title Headline Pretitle Subtitle Description Extra line 1 Extra line 2 Extra line 3 Extra line 4';
const pretitleFirst =
    'Pretitle Headline Title Subtitle Description Extra line 1 Extra line 2 Extra line 3 Extra line 4';
for (const action of ['href', 'to', 'onPress'] as const) {
    for (const {pretitleAs, titleAs, expectedLabel} of [
        {pretitleAs: undefined, titleAs: undefined, expectedLabel: titleFirst},
        {pretitleAs: 'h1', titleAs: 'h2', expectedLabel: pretitleFirst},
        {pretitleAs: 'h2', titleAs: 'h1', expectedLabel: titleFirst},
    ] as const) {
        test(`AdvancedDataCard "${action}" label with pretitleAs={${pretitleAs}} and titleAs={${titleAs}}`, async ({
            mount,
        }) => {
            const component = await mount<typeof AccessibleName>('advanced-data-card/AccessibleName', {
                action,
                pretitleAs,
                titleAs,
            });
            await expect(
                component.getByRole(action === 'onPress' ? 'button' : 'link', {
                    name: expectedLabel,
                    exact: true,
                })
            ).toHaveCount(1);
        });
    }
}
