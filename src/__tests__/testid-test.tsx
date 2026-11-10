import {test, expect} from '../test-utils/component';

test('Row test ids', async ({mount, page}) => {
    await mount('testid/Scenario1');
    for (const {componentName, internalTestIds} of [
        {
            componentName: 'Row',
            internalTestIds: [
                'headline',
                'title',
                'subtitle',
                'description',
                'detail',
                'asset',
                'slot',
                'chevron',
                'endSlot',
            ],
        },
    ]) {
        const element = page.getByTestId(componentName);
        await expect(element).toHaveCount(1);
        for (const id of internalTestIds) {
            await expect(element.getByTestId(id)).toHaveCount(1);
        }
    }
});
test('DataCard test ids', async ({mount, page}) => {
    await mount('testid/Scenario2');
    for (const {componentName, internalTestIds} of [
        {
            componentName: 'DataCard',
            internalTestIds: [
                'headline',
                'pretitle',
                'title',
                'subtitle',
                'description',
                'asset',
                'topActions',
                'slot',
            ],
        },
    ]) {
        const element = page.getByTestId(componentName);
        await expect(element).toHaveCount(1);
        for (const id of internalTestIds) {
            await expect(element.getByTestId(id)).toHaveCount(1);
        }
    }
});
test('MediaCard test ids', async ({mount, page}) => {
    await mount('testid/Scenario3');
    for (const {componentName, internalTestIds} of [
        {
            componentName: 'MediaCard',
            internalTestIds: [
                'headline',
                'pretitle',
                'title',
                'subtitle',
                'description',
                'asset',
                'topActions',
                'slot',
                'footer',
                'image',
            ],
        },
    ]) {
        const element = page.getByTestId(componentName);
        await expect(element).toHaveCount(1);
        for (const id of internalTestIds) {
            await expect(element.getByTestId(id)).toHaveCount(1);
        }
    }
});
test('NakedCard test ids', async ({mount, page}) => {
    await mount('testid/Scenario4');
    for (const {componentName, internalTestIds} of [
        {
            componentName: 'NakedCard',
            internalTestIds: [
                'headline',
                'pretitle',
                'title',
                'subtitle',
                'description',
                'asset',
                'topActions',
                'slot',
                'footer',
                'image',
            ],
        },
    ]) {
        const element = page.getByTestId(componentName);
        await expect(element).toHaveCount(1);
        for (const id of internalTestIds) {
            await expect(element.getByTestId(id)).toHaveCount(1);
        }
    }
});
test('FeedbackScreen test ids', async ({mount, page}) => {
    await mount('testid/Scenario5');
    for (const {componentName, internalTestIds} of [
        {
            componentName: 'SuccessFeedbackScreen',
            internalTestIds: ['icon', 'title', 'description', 'image', 'slot'],
        },
    ]) {
        const element = page.getByTestId(componentName);
        await expect(element).toHaveCount(1);
        for (const id of internalTestIds) {
            await expect(element.getByTestId(id)).toHaveCount(1);
        }
    }
});
test('InputFields test ids', async ({mount, page}) => {
    await mount('testid/Scenario6');
    for (const {componentName, internalTestIds} of [
        {
            componentName: 'TextField',
            internalTestIds: ['label', 'helperText', 'endHelperText', 'endIcon'],
        },
        {
            componentName: 'SearchField',
            internalTestIds: ['startIcon', 'errorText'],
        },
        // In DateField/MonthField/DatetimeField, we use endIconOverlay for setting the endIcon
        {
            componentName: 'DateField',
            internalTestIds: ['endIcon'],
        },
    ]) {
        const element = page.getByTestId(componentName);
        await expect(element).toHaveCount(1);
        for (const id of internalTestIds) {
            await expect(element.getByTestId(id)).toHaveCount(1);
        }
    }
});
test('Buttons test ids', async ({mount, page}) => {
    await mount('testid/Scenario7');
    for (const {componentName, internalTestIds} of [
        {
            componentName: 'ButtonPrimary',
            internalTestIds: ['startIcon', 'endIcon'],
        },
        {
            componentName: 'ButtonSecondary',
            internalTestIds: ['loadingText'],
        },
    ]) {
        const element = page.getByTestId(componentName);
        await expect(element).toHaveCount(1);
        for (const id of internalTestIds) {
            await expect(element.getByTestId(id)).toHaveCount(1);
        }
    }
});
test('Callout test ids', async ({mount, page}) => {
    await mount('testid/Scenario8');
    for (const {componentName, internalTestIds} of [
        {
            componentName: 'Callout',
            internalTestIds: ['title', 'description', 'asset', 'closeButton'],
        },
    ]) {
        const element = page.getByTestId(componentName);
        await expect(element).toHaveCount(1);
        for (const id of internalTestIds) {
            await expect(element.getByTestId(id)).toHaveCount(1);
        }
    }
});
test('Hero test ids', async ({mount, page}) => {
    await mount('testid/Scenario9');
    for (const {componentName, internalTestIds} of [
        {
            componentName: 'Hero',
            internalTestIds: ['headline', 'pretitle', 'title', 'description', 'slot'],
        },
    ]) {
        const element = page.getByTestId(componentName);
        await expect(element).toHaveCount(1);
        for (const id of internalTestIds) {
            await expect(element.getByTestId(id)).toHaveCount(1);
        }
    }
});
test('CoverHero test ids', async ({mount, page}) => {
    await mount('testid/Scenario10');
    for (const {componentName, internalTestIds} of [
        {
            componentName: 'CoverHero',
            internalTestIds: ['headline', 'pretitle', 'title', 'description', 'slot', 'sideSlot'],
        },
    ]) {
        const element = page.getByTestId(componentName);
        await expect(element).toHaveCount(1);
        for (const id of internalTestIds) {
            await expect(element.getByTestId(id)).toHaveCount(1);
        }
    }
});
test('Header test ids', async ({mount, page}) => {
    await mount('testid/Scenario11');
    for (const {componentName, internalTestIds} of [
        {
            componentName: 'Header',
            internalTestIds: ['headline', 'pretitle', 'title', 'description'],
        },
    ]) {
        const element = page.getByTestId(componentName);
        await expect(element).toHaveCount(1);
        for (const id of internalTestIds) {
            await expect(element.getByTestId(id)).toHaveCount(1);
        }
    }
});
test('MainSectionHeader test ids', async ({mount, page}) => {
    await mount('testid/Scenario12');
    for (const {componentName, internalTestIds} of [
        {
            componentName: 'MainSectionHeader',
            internalTestIds: ['title', 'description'],
        },
    ]) {
        const element = page.getByTestId(componentName);
        await expect(element).toHaveCount(1);
        for (const id of internalTestIds) {
            await expect(element.getByTestId(id)).toHaveCount(1);
        }
    }
});
test('Meter test ids', async ({mount, page}) => {
    await mount('testid/Scenario13');
    for (const {componentName, internalTestIds} of [
        {
            componentName: 'Meter',
            internalTestIds: [],
        },
    ]) {
        const element = page.getByTestId(componentName);
        await expect(element).toHaveCount(1);
        for (const id of internalTestIds) {
            await expect(element.getByTestId(id)).toHaveCount(1);
        }
    }
});
test('Drawer test ids', async ({mount, page}) => {
    await mount('testid/Scenario14');
    for (const {componentName, internalTestIds} of [
        {
            componentName: 'Drawer',
            internalTestIds: ['title', 'subtitle', 'description'],
        },
    ]) {
        const element = page.getByTestId(componentName);
        await expect(element).toHaveCount(1);
        for (const id of internalTestIds) {
            await expect(element.getByTestId(id)).toHaveCount(1);
        }
    }
});
