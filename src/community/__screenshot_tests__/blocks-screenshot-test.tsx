import {test, expectScreenshot} from '../../test-utils/playwright';
import {openStoryPage, screen} from '../../test-utils';

test('Blocks Highlighted Value Block', async () => {
    await openStoryPage({id: 'community-vivo-blocks--block-highlighted-value', device: 'MOBILE_IOS'});

    const stepper = await screen.findByTestId('highlighted-value-block');

    await expectScreenshot(stepper);
});

test('Blocks Information Block', async () => {
    await openStoryPage({id: 'community-vivo-blocks--block-information', device: 'MOBILE_IOS'});

    const stepper = await screen.findByTestId('information-block');

    await expectScreenshot(stepper);
});

for (const testCase of [{stackingGroup: false}, {stackingGroup: true}] as const) {
    const {stackingGroup} = testCase;
    test(`Blocks Progress Block (${JSON.stringify(testCase)})`, async () => {
        await openStoryPage({
            id: 'community-vivo-blocks--block-progress',
            device: 'MOBILE_IOS',
            args: {stackingGroup},
        });

        const stepper = await screen.findByTestId('progress-block');

        await expectScreenshot(stepper);
    });
}

test('Blocks Row Block', async () => {
    await openStoryPage({
        id: 'community-vivo-blocks--block-row',
        device: 'MOBILE_IOS',
        args: {description: 'This is a very long description to verify text alignment'},
    });

    const stepper = await screen.findByTestId('row-block');

    await expectScreenshot(stepper);
});

test('Blocks Simple Block', async () => {
    await openStoryPage({id: 'community-vivo-blocks--block-simple', device: 'MOBILE_IOS'});

    const stepper = await screen.findByTestId('simple-block');

    await expectScreenshot(stepper);
});

test('Blocks Value Block', async () => {
    await openStoryPage({id: 'community-vivo-blocks--block-value', device: 'MOBILE_IOS'});

    const stepper = await screen.findByTestId('value-block');

    await expectScreenshot(stepper);
});
