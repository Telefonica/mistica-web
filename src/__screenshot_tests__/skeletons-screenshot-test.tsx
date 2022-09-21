import {openStoryPage, screen} from '../test-utils';

test.each`
    givenStoryPageArgs
    ${{inverse: false}}
    ${{inverse: true}}
    ${{inverse: false, size: 60}}
    ${{inverse: true, size: 60}}
    ${{inverse: false, size: 100}}
    ${{inverse: true, size: 100}}
`(
    `Skeleton circle given inverse $givenStoryPageArgs.inverse and size of $givenStoryPageArgs.size`,
    async ({givenStoryPageArgs}) => {
        await openStoryPage({
            id: 'components-skeletons-skeleton-circle',
            device: 'MOBILE_IOS',
            args: givenStoryPageArgs,
        });

        const element = await screen.findByTestId('skeleton-circle');
        expect(await element.screenshot()).toMatchImageSnapshot();
    }
);

test.each`
    givenStoryPageArgs
    ${{inverse: false}}
    ${{inverse: true}}
`(`Skeleton row given inverse $givenStoryPageArgs.inverse`, async ({givenStoryPageArgs}) => {
    await openStoryPage({
        id: 'components-skeletons-skeleton-row',
        device: 'MOBILE_IOS',
        args: givenStoryPageArgs,
    });

    const element = await screen.findByTestId('skeleton-row');
    expect(await element.screenshot()).toMatchImageSnapshot();
});

test.each`
    givenStoryPageArgs
    ${{inverse: false}}
    ${{inverse: true}}
    ${{inverse: false, height: 70}}
    ${{inverse: true, height: 70}}
    ${{inverse: true, height: 70, width: 30}}
`(
    `Skeleton rectangle given inverse $givenStoryPageArgs.inverse and height $givenStoryPageArgs.height and width $givenStoryPageArgs.width`,
    async ({givenStoryPageArgs}) => {
        await openStoryPage({
            id: 'components-skeletons-skeleton-rectangle',
            device: 'MOBILE_IOS',
            args: givenStoryPageArgs,
        });

        const element = await screen.findByTestId('skeleton-rectangle');
        expect(await element.screenshot()).toMatchImageSnapshot();
    }
);

test.each`
    givenStoryPageArgs
    ${{inverse: false}}
    ${{inverse: true}}
`(`Skeleton text given inverse $givenStoryPageArgs.inverse`, async ({givenStoryPageArgs}) => {
    await openStoryPage({
        id: 'components-skeletons-skeleton-text',
        device: 'MOBILE_IOS',
        args: givenStoryPageArgs,
    });

    const element = await screen.findByTestId('skeleton-text');
    expect(await element.screenshot()).toMatchImageSnapshot();
});

test.each`
    givenStoryPageArgs
    ${{inverse: false}}
    ${{inverse: true}}
`(`Skeleton line given inverse $givenStoryPageArgs.inverse`, async ({givenStoryPageArgs}) => {
    await openStoryPage({
        id: 'components-skeletons-skeleton-line',
        device: 'MOBILE_IOS',
        args: givenStoryPageArgs,
    });

    const element = await screen.findByTestId('skeleton-line');
    expect(await element.screenshot()).toMatchImageSnapshot();
});
