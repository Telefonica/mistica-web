import {openStoryPage, screen, setRootFontSize} from '../test-utils';

const DEVICE = ['DESKTOP', 'MOBILE_IOS'] as const;

test.each`
    minTimeUnit  | maxTimeUnit
    ${'seconds'} | ${'hours'}
    ${'minutes'} | ${'days'}
    ${'seconds'} | ${'days'}
    ${'minutes'} | ${'days'}
    ${'seconds'} | ${'seconds'}
`(
    'TextTimer - minTimeUnit = $minTimeUnit, maxTimeUnit = $maxTimeUnit',
    async ({minTimeUnit, maxTimeUnit}) => {
        await openStoryPage({
            id: 'components-timer--text-timer-story',
            args: {minTimeUnit, maxTimeUnit},
        });

        const timer = await screen.findByTestId('timer');

        const image = await timer.screenshot();
        expect(image).toMatchImageSnapshot();
    }
);

test.each`
    minTimeUnit  | maxTimeUnit
    ${'seconds'} | ${'hours'}
    ${'minutes'} | ${'days'}
    ${'seconds'} | ${'days'}
    ${'minutes'} | ${'days'}
    ${'seconds'} | ${'seconds'}
`('Timer - minTimeUnit = $minTimeUnit, maxTimeUnit = $maxTimeUnit', async ({minTimeUnit, maxTimeUnit}) => {
    await openStoryPage({
        id: 'components-timer--timer-story',
        args: {minTimeUnit, maxTimeUnit},
    });

    const timer = await screen.findByTestId('timer');

    const image = await timer.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(DEVICE)('Timer - boxed (%s)', async (device) => {
    await openStoryPage({
        id: 'components-timer--timer-story',
        device,
        args: {minTimeUnit: 'seconds', maxTimeUnit: 'days', boxed: true},
    });

    const timer = await screen.findByTestId('timer');

    const image = await timer.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Timer - boxed over media', async () => {
    await openStoryPage({
        id: 'components-timer--timer-story',
        device: 'MOBILE_IOS',
        args: {minTimeUnit: 'seconds', maxTimeUnit: 'days', boxed: true, themeVariant: 'media'},
    });

    const timer = await screen.findByTestId('timer');

    const image = await timer.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Timer - boxed with big fontSize', async () => {
    await openStoryPage({
        id: 'components-timer--timer-story',
        args: {minTimeUnit: 'seconds', maxTimeUnit: 'days', boxed: true},
    });

    await setRootFontSize(32);

    const timer = await screen.findByTestId('timer');

    const image = await timer.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Timer - wraps if needed', async () => {
    await openStoryPage({
        id: 'components-timer--timer-story',
        args: {minTimeUnit: 'seconds', maxTimeUnit: 'days', boxed: true},
    });

    await setRootFontSize(72);

    const timer = await screen.findByTestId('timer');

    const image = await timer.screenshot();
    expect(image).toMatchImageSnapshot();
});
