import {test, expect} from '../test-utils/component';

test('TrackingConfig context providers', async ({mount}) => {
    const component = await mount('analytics/Nested');
    for (const text of [
        'test1: google-analytics-4',
        'test2: universal-analytics',
        'test3: google-analytics-4',
    ])
        await expect(component.getByText(text, {exact: true})).toHaveCount(1);
});
