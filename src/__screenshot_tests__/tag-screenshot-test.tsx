import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen, setRootFontSize} from '../test-utils';

const BADGE_OPTIONS = [1, 10, true];

test('Tags', async () => {
    await openStoryPage({
        id: 'components-tag--default',
        device: 'DESKTOP',
    });

    const tag = await screen.findByTestId('tags');

    await expectScreenshot(tag);
});

test('Tags without icon', async () => {
    await openStoryPage({
        id: 'components-tag--default',
        device: 'DESKTOP',
        args: {icon: false},
    });

    const tag = await screen.findByTestId('tags');

    await expectScreenshot(tag);
});

test('Tags inverse', async () => {
    await openStoryPage({
        id: 'components-tag--default',
        device: 'DESKTOP',
        args: {variantOutside: 'brand'},
    });

    const tag = await screen.findByTestId('tags');

    await expectScreenshot(tag);
});

test('Tags dark mode', async () => {
    await openStoryPage({
        id: 'components-tag--default',
        device: 'DESKTOP',
        isDarkMode: true,
    });

    const tag = await screen.findByTestId('tags');

    await expectScreenshot(tag);
});

test('Tags inverse and dark mode', async () => {
    await openStoryPage({
        id: 'components-tag--default',
        device: 'DESKTOP',
        isDarkMode: true,
        args: {variantOutside: 'brand'},
    });

    const tag = await screen.findByTestId('tags');

    await expectScreenshot(tag);
});

test('Tags short label', async () => {
    await openStoryPage({
        id: 'components-tag--default',
        device: 'DESKTOP',
        args: {label: '1'},
    });

    const tag = await screen.findByTestId('tags');

    await expectScreenshot(tag);
});

test('Tags long label', async () => {
    await openStoryPage({
        id: 'components-tag--default',
        device: 'MOBILE_IOS',
        args: {label: 'This is a super long label that should overflow and show ellipsis'},
    });

    const tag = await screen.findByTestId('tags');

    await expectScreenshot(tag);
});

test('Tags with large fontSize', async () => {
    await openStoryPage({
        id: 'components-tag--default',
        device: 'DESKTOP',
    });

    await setRootFontSize(32);

    const tag = await screen.findByTestId('tags');

    await expectScreenshot(tag);
});

for (const testCase of BADGE_OPTIONS) {
    const badge = testCase;
    test(`Tags with badge={${testCase}}`, async () => {
        await openStoryPage({
            id: 'components-tag--default',
            device: 'DESKTOP',
            args: {badge},
        });

        const tag = await screen.findByTestId('tags');

        await expectScreenshot(tag);
    });
}

test('Tags with badge and large fontSize', async () => {
    await openStoryPage({
        id: 'components-tag--default',
        device: 'DESKTOP',
        args: {badge: 1},
    });

    await setRootFontSize(32);

    const tag = await screen.findByTestId('tags');

    await expectScreenshot(tag);
});

test('Tags with custom colors', async () => {
    await openStoryPage({
        id: 'components-tag--default',
        device: 'DESKTOP',
        args: {
            badge: 1,
            colorConfig: 'custom color',
            textColorCustom: 'yellow',
            backgroundColorCustom: 'blue',
        },
    });

    await setRootFontSize(32);

    const tag = await screen.findByTestId('tags');

    await expectScreenshot(tag);
});

test('Tags small variant', async () => {
    await openStoryPage({
        id: 'components-tag--default',
        device: 'DESKTOP',
        args: {small: true},
    });

    const tag = await screen.findByTestId('tags');

    await expectScreenshot(tag);
});

test('Tags small variant without icon', async () => {
    await openStoryPage({
        id: 'components-tag--default',
        device: 'DESKTOP',
        args: {small: true, icon: false},
    });

    const tag = await screen.findByTestId('tags');

    await expectScreenshot(tag);
});

for (const testCase of BADGE_OPTIONS) {
    const badge = testCase;
    test(`Tags small variant with badge={${testCase}}`, async () => {
        await openStoryPage({
            id: 'components-tag--default',
            device: 'DESKTOP',
            args: {small: true, badge},
        });

        const tag = await screen.findByTestId('tags');

        await expectScreenshot(tag);
    });
}
