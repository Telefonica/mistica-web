import {openStoryPage, screen} from '../test-utils';

test.each`
    givenStoryPageArgs
    ${{inverse: false, disableAnimation: true}}
    ${{inverse: true, disableAnimation: true}}
    ${{inverse: false, size: 60, disableAnimation: true}}
    ${{inverse: true, size: 60, disableAnimation: true}}
    ${{inverse: false, size: 100, disableAnimation: true}}
    ${{inverse: true, size: 100, disableAnimation: true}}
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
    ${{inverse: false, disableAnimation: true}}
    ${{inverse: true, disableAnimation: true}}
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
    ${{inverse: false, disableAnimation: true}}
    ${{inverse: true, disableAnimation: true}}
    ${{inverse: false, height: 70, disableAnimation: true}}
    ${{inverse: true, height: 70, disableAnimation: true}}
    ${{inverse: true, height: 70, width: 30, disableAnimation: true}}
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
    ${{inverse: false, disableAnimation: true}}
    ${{inverse: true, disableAnimation: true}}
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
    ${{inverse: false, disableAnimation: true}}
    ${{inverse: true, disableAnimation: true}}
`(`Skeleton line given inverse $givenStoryPageArgs.inverse`, async ({givenStoryPageArgs}) => {
    await openStoryPage({
        id: 'components-skeletons-skeleton-line',
        device: 'MOBILE_IOS',
        args: givenStoryPageArgs,
    });

    const element = await screen.findByTestId('skeleton-line');
    expect(await element.screenshot()).toMatchImageSnapshot();
});
