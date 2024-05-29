import {openStoryPage, screen, setRootFontSize} from '../test-utils';

test.each`
    minTimeUnit  | maxTimeUnit
    ${undefined} | ${undefined}
    ${'minutes'} | ${undefined}
    ${undefined} | ${'days'}
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
    ${undefined} | ${undefined}
    ${'minutes'} | ${undefined}
    ${undefined} | ${'days'}
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

test('Timer - boxed', async () => {
    await openStoryPage({
        id: 'components-timer--timer-story',
        args: {minTimeUnit: 'seconds', maxTimeUnit: 'days', boxed: true},
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
