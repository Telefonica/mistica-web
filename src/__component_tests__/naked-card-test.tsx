import {test, expect} from '../test-utils/component';

import type {AccessibleName} from './naked-card.story';

const titleFirst = 'Title Headline Pretitle Description Extra line 1 Extra line 2';
const pretitleFirst = 'Pretitle Headline Title Description Extra line 1 Extra line 2';
for (const action of ['href', 'to', 'onPress'] as const) {
    for (const {pretitleAs, titleAs, expectedLabel} of [
        {pretitleAs: undefined, titleAs: undefined, expectedLabel: titleFirst},
        {pretitleAs: 'h1', titleAs: 'h2', expectedLabel: pretitleFirst},
        {pretitleAs: 'h2', titleAs: 'h1', expectedLabel: titleFirst},
    ] as const) {
        test(`NakedCard "${action}" label with pretitleAs={${pretitleAs}} and titleAs={${titleAs}}`, async ({
            mount,
        }) => {
            const component = await mount<typeof AccessibleName>('naked-card/AccessibleName', {
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
test('NakedCard onClose custom label', async ({mount}) => {
    const component = await mount('naked-card/Closable');
    await component.getByRole('button', {name: 'custom close label'}).click();
    await expect(component.getByTestId('closes')).toHaveValue('1');
});
for (const action of ['href', 'to', 'onPress'] as const) {
    test(`NakedCard snap "${action}" label`, async ({mount}) => {
        const component = await mount('naked-card/AccessibleName', {action, snap: true});
        await expect(
            component.getByRole(action === 'onPress' ? 'button' : 'link', {
                name: 'Title Subtitle Description Extra line 1 Extra line 2',
                exact: true,
            })
        ).toHaveCount(1);
    });
}
