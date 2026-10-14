import {openStoryPage, screen} from '../../test-utils';

const expectAiCardSnapshot = async () => {
    const element = await screen.findByTestId('ai-card');
    const image = await element.screenshot();

    expect(image).toMatchImageSnapshot();
};

test('AiCard static text', async () => {
    await openStoryPage({
        id: 'community-vivo-aicard--default',
        device: 'MOBILE_IOS',
        args: {text: 'Lorem ipsum '},
    });

    await expectAiCardSnapshot();
});

test('AiCard line break at chars', async () => {
    await openStoryPage({
        id: 'community-vivo-aicard--default',
        device: 'MOBILE_IOS',
        args: {text: 'Lorem ipsum ', lineBreakAtChars: 8},
    });

    await expectAiCardSnapshot();
});
