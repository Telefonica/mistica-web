import {openStoryPage, screen} from '../test-utils';

test.each`
    givenInverse
    ${false}
    ${true}
`(`Given inverse $givenInverse `, async ({givenInverse}) => {
    await openStoryPage({
        id: 'components-skeletons-skeleton-text',
        device: 'MOBILE_IOS',
        args: {inverse: givenInverse, disableAnimation: true},
    });

    const element = await screen.findByTestId('skeleton-text');
    expect(await element.screenshot()).toMatchImageSnapshot();
});
