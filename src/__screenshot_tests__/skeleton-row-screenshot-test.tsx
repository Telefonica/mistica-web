import {openStoryPage, screen} from '../test-utils';

test.each`
    givenInverse
    ${false}
    ${true}
`(`Given inverse $givenInverse and height of $givenHeight`, async ({givenInverse}) => {
    await openStoryPage({
        id: 'components-skeletons-skeleton-row',
        device: 'MOBILE_IOS',
        args: {inverse: givenInverse, disableAnimation: true},
    });

    const element = await screen.findByTestId('skeleton-row');
    expect(await element.screenshot()).toMatchImageSnapshot();
});
