import {openStoryPage, screen} from '../test-utils';

const STORY_IDS: Record<any, string> = {
    cover: 'components-cards-covercard--default',
    data: 'components-cards-datacard--default',
    media: 'components-cards-mediacard--default',
    naked: 'components-cards-nakedcard--default',
};

const TEST_IDS: Record<any, string> = {
    cover: 'CoverCard',
    data: 'DataCard',
    media: 'MediaCard',
    naked: 'NakedCard',
};

const argsReset = {
    headline: 'Tag label',
    pretitle: 'Pretitle',
    Title: 'Item title',
    subtitle: '',
    description: 'This is a description',
    buttonPrimary: true,
    buttonSecondary: false,
    buttonLink: true,
    topActions: false,
    onPress: false,
    onClose: true,
    showFooter: false,
    imageSrc: 'person portrait',
    mediaAspectRatio: '16 9',
    asset: 'icon',
    slot: false,
};

test.each`
    type
    ${'cover'}
    ${'data'}
    ${'media'}
    ${'naked'}
`('Card typologies - $type', async ({type}) => {
    await openStoryPage({
        id: STORY_IDS[type],
        device: 'MOBILE_IOS',
        args: argsReset,
    });

    const card = await screen.findByTestId(TEST_IDS[type]);
    const image = await card.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each`
    type       | size         | variant        | asset          | topActions | mediaPosition | aspectRatio | description
    ${'data'}  | ${'display'} | ${'undefined'} | ${'icon'}      | ${true}    | ${'top'}      | ${'9 10'}   | ${'Data card with display size'}
    ${'data'}  | ${'default'} | ${'undefined'} | ${'icon'}      | ${true}    | ${'top'}      | ${'9 10'}   | ${'Data card with default size'}
    ${'data'}  | ${'default'} | ${'inverse'}   | ${'icon'}      | ${true}    | ${'top'}      | ${'9 10'}   | ${'Data card with default size and inverse variant - see topActions'}
    ${'data'}  | ${'snap'}    | ${'undefined'} | ${'icon'}      | ${true}    | ${'top'}      | ${'9 10'}   | ${'Data card with snap size'}
    ${'cover'} | ${'display'} | ${'undefined'} | ${'icon'}      | ${true}    | ${'top'}      | ${'9 10'}   | ${'Cover card with display size'}
    ${'cover'} | ${'display'} | ${'undefined'} | ${'icon'}      | ${false}   | ${'top'}      | ${'9 10'}   | ${'Cover card with display size - without topActions'}
    ${'cover'} | ${'display'} | ${'undefined'} | ${'undefined'} | ${false}   | ${'top'}      | ${'9 10'}   | ${'Cover card with display size - without topActions or asset'}
    ${'cover'} | ${'default'} | ${'undefined'} | ${'icon'}      | ${true}    | ${'top'}      | ${'9 10'}   | ${'Cover card with default size'}
    ${'cover'} | ${'snap'}    | ${'undefined'} | ${'icon'}      | ${true}    | ${'top'}      | ${'9 10'}   | ${'Cover card with snap size'}
    ${'media'} | ${'display'} | ${'undefined'} | ${'icon'}      | ${true}    | ${'top'}      | ${'9 10'}   | ${'Media card with display size'}
    ${'media'} | ${'snap'}    | ${'undefined'} | ${'icon'}      | ${true}    | ${'top'}      | ${'9 10'}   | ${'Media card with snap size'}
`(
    'Card anatomy - $description',
    async ({type, size, variant, asset, topActions, mediaPosition, aspectRatio, description}) => {
        await openStoryPage({
            id: STORY_IDS[type],
            device: 'MOBILE_IOS',
            args: {
                ...argsReset,
                size,
                variant,
                asset,
                topActions,
                mediaPosition,
                aspectRatio,
                onClose: false,
                description,
            },
        });

        const card = await screen.findByTestId(TEST_IDS[type]);
        const image = await card.screenshot();
        expect(image).toMatchImageSnapshot();
    }
);

test.each`
    type       | mediaPosition | description
    ${'media'} | ${'left'}     | ${'Media card with footer and media on the left'}
    ${'media'} | ${'right'}    | ${'Media card with footer and media on the right'}
    ${'naked'} | ${'left'}     | ${'Naked card with footer and media on the left'}
    ${'naked'} | ${'right'}    | ${'Naked card with footer and media on the right'}
`('Card anatomy - $description', async ({type, mediaPosition, description}) => {
    await openStoryPage({
        id: STORY_IDS[type],
        device: 'MOBILE_IOS',
        args: {
            ...argsReset,
            imageSrc: 'beach',
            videoSrc: 'beach',
            topActions: false,
            onClose: true,
            showFooter: true,
            footerSlot: true,
            mediaPosition,
            description,
        },
    });

    const card = await screen.findByTestId(TEST_IDS[type]);
    const image = await card.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each`
    type       | variant          | backgroundColor | description
    ${'data'}  | ${'default'}     | ${''}           | ${'Data card with default variant'}
    ${'data'}  | ${'inverse'}     | ${''}           | ${'Data card with inverse variant'}
    ${'data'}  | ${'media'}       | ${''}           | ${'Data card with media variant'}
    ${'data'}  | ${'alternative'} | ${''}           | ${'Data card with alternative variant'}
    ${'cover'} | ${'media'}       | ${'red'}        | ${'Cover card with background color'}
`('Card background - $description', async ({type, variant, backgroundColor, description}) => {
    await openStoryPage({
        id: STORY_IDS[type],
        device: 'MOBILE_IOS',
        args: {
            ...argsReset,
            variant,
            backgroundColor,
            description,
            topActions: true,
            onClose: true,
            slot: true,
            imageSrc: 'undefined',
        },
    });

    const card = await screen.findByTestId(TEST_IDS[type]);
    const image = await card.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each`
    type      | slotAlignment | description
    ${'data'} | ${'content'}  | ${'Data card with content slot alignment'}
    ${'data'} | ${'bottom'}   | ${'Data card with bottom slot alignment'}
`('Card slot alignment - $description', async ({type, slotAlignment, description}) => {
    await openStoryPage({
        id: STORY_IDS[type],
        device: 'MOBILE_IOS',
        args: {
            ...argsReset,
            aspectRatio: '9 10',
            slotAlignment,
            slot: true,
            description,
        },
    });

    const card = await screen.findByTestId(TEST_IDS[type]);
    const image = await card.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Card text lines limit', async () => {
    await openStoryPage({
        id: STORY_IDS.data,
        device: 'MOBILE_IOS',
        args: {
            ...argsReset,
            size: 'snap',
            width: 300,
            onClose: false,
            headline: '',
            asset: 'undefined',
            title: 'This is a long title that takes more than one line',
            titleLinesMax: 1,
            pretitle: 'This is a long pretitle that takes more than one line',
            pretitleLinesMax: 1,
            description: 'This is a long description that takes more than one line',
            descriptionLinesMax: 1,
        },
    });

    const card = await screen.findByTestId(TEST_IDS.data);
    const image = await card.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Card footer is forced with buttons and onPress', async () => {
    await openStoryPage({
        id: STORY_IDS.data,
        device: 'MOBILE_IOS',
        args: {
            ...argsReset,
            size: 'snap',
            onClose: false,
            onPress: true,
            description: 'Card footer is forced with buttons and onPress',
            showFooter: false, // this gets overridden
        },
    });

    const card = await screen.findByTestId(TEST_IDS.data);
    const image = await card.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Card footer divider is removed with custom footer color', async () => {
    await openStoryPage({
        id: STORY_IDS.data,
        device: 'MOBILE_IOS',
        args: {
            ...argsReset,
            size: 'snap',
            showFooter: true,
            description: 'Card footer divider is removed with custom footer color',
            footerBackgroundColor: 'red',
        },
    });

    const card = await screen.findByTestId(TEST_IDS.data);
    const image = await card.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each`
    type       | variantOutside | variant      | description
    ${'cover'} | ${'default'}   | ${'default'} | ${'Cover card with default outside and default variant'}
    ${'cover'} | ${'default'}   | ${'inverse'} | ${'Cover card with default outside and inverse variant'}
    ${'cover'} | ${'inverse'}   | ${'default'} | ${'Cover card with inverse outside and default variant'}
    ${'cover'} | ${'inverse'}   | ${'inverse'} | ${'Cover card with inverse outside and inverse variant'}
`('Card outside variant - $description', async ({type, variant, variantOutside, description}) => {
    await openStoryPage({
        id: STORY_IDS[type],
        device: 'MOBILE_IOS',
        args: {
            ...argsReset,
            variant,
            variantOutside,
            description,
            imageSrc: 'empty string',
        },
    });

    const card = await screen.findByTestId('card-container');
    const image = await card.screenshot();
    expect(image).toMatchImageSnapshot();
});
