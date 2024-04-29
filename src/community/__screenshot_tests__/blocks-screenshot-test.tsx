import {openStoryPage, screen} from '../../test-utils';

test('Blocks Highlighted Value Block', async () => {
    await openStoryPage({id: 'community-blocks--block-highlighted-value', device: 'MOBILE_IOS'});

    const stepper = await screen.findByTestId('highlighted-value-block');

    const image = await stepper.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('Blocks Information Block', async () => {
    await openStoryPage({id: 'community-blocks--block-information', device: 'MOBILE_IOS'});

    const stepper = await screen.findByTestId('information-block');

    const image = await stepper.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each`
    stackingGroup
    ${false}      | ${true}
`('Blocks Progress Block', async ({stackingGroup}) => {
    await openStoryPage({
        id: 'community-blocks--block-progress',
        device: 'MOBILE_IOS',
        args: {stackingGroup},
    });

    const stepper = await screen.findByTestId('progress-block');

    const image = await stepper.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('Blocks Row Block', async () => {
    await openStoryPage({
        id: 'community-blocks--block-row',
        device: 'MOBILE_IOS',
        args: {description: 'This is a very long description to verify text alignment'},
    });

    const stepper = await screen.findByTestId('row-block');

    const image = await stepper.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('Blocks Simple Block', async () => {
    await openStoryPage({id: 'community-blocks--block-simple', device: 'MOBILE_IOS'});

    const stepper = await screen.findByTestId('simple-block');

    const image = await stepper.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('Blocks Value Block', async () => {
    await openStoryPage({id: 'community-blocks--block-value', device: 'MOBILE_IOS'});

    const stepper = await screen.findByTestId('value-block');

    const image = await stepper.screenshot();

    expect(image).toMatchImageSnapshot();
});
