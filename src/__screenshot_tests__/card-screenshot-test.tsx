import {test, expectScreenshot} from '../test-utils/playwright';
import {
    BLAU_SKIN,
    ESIMFLAG_SKIN,
    MOVISTAR_SKIN,
    O2_SKIN,
    TELEFONICA_SKIN,
    VIVO_EVOLUTION_SKIN,
    VIVO_SKIN,
} from '../skins/constants';
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
    videoLoop: false,
    videoAutoPlay: false,
};

for (const testCase of [{type: 'cover'}, {type: 'data'}, {type: 'media'}, {type: 'naked'}] as const) {
    const {type} = testCase;
    test(`Card typologies - ${testCase.type}`, async () => {
        await openStoryPage({
            id: STORY_IDS[type],
            device: 'MOBILE_IOS',
            args: argsReset,
        });

        const card = await screen.findByTestId(TEST_IDS[type]);
        await expectScreenshot(card);
    });
}

for (const testCase of [
    {
        type: 'data',
        size: 'display',
        variant: 'undefined',
        asset: 'icon',
        topActions: true,
        mediaPosition: 'top',
        description: 'Data card with display size',
    },
    {
        type: 'data',
        size: 'default',
        variant: 'undefined',
        asset: 'icon',
        topActions: true,
        mediaPosition: 'top',
        description: 'Data card with default size',
    },
    {
        type: 'data',
        size: 'default',
        variant: 'inverse',
        asset: 'icon',
        topActions: true,
        mediaPosition: 'top',
        description: 'Data card with default size and inverse variant - see topActions',
    },
    {
        type: 'data',
        size: 'snap',
        variant: 'undefined',
        asset: 'icon',
        topActions: true,
        mediaPosition: 'top',
        description: 'Data card with snap size',
    },
    {
        type: 'cover',
        size: 'display',
        variant: 'undefined',
        asset: 'icon',
        topActions: true,
        mediaPosition: 'top',
        description: 'Cover card with display size',
    },
    {
        type: 'cover',
        size: 'display',
        variant: 'undefined',
        asset: 'icon',
        topActions: false,
        mediaPosition: 'top',
        description: 'Cover card with display size - without topActions',
    },
    {
        type: 'cover',
        size: 'display',
        variant: 'undefined',
        asset: 'undefined',
        topActions: false,
        mediaPosition: 'top',
        description: 'Cover card with display size - without topActions or asset',
    },
    {
        type: 'cover',
        size: 'default',
        variant: 'undefined',
        asset: 'icon',
        topActions: true,
        mediaPosition: 'top',
        description: 'Cover card with default size',
    },
    {
        type: 'cover',
        size: 'snap',
        variant: 'undefined',
        asset: 'icon',
        topActions: true,
        mediaPosition: 'top',
        description: 'Cover card with snap size',
    },
    {
        type: 'media',
        size: 'display',
        variant: 'undefined',
        asset: 'icon',
        topActions: true,
        mediaPosition: 'top',
        description: 'Media card with display size',
    },
    {
        type: 'media',
        size: 'snap',
        variant: 'undefined',
        asset: 'icon',
        topActions: true,
        mediaPosition: 'top',
        description: 'Media card with snap size',
    },
] as const) {
    const {type, size, variant, asset, topActions, mediaPosition, description} = testCase;
    test(`Card anatomy - ${testCase.description}`, async () => {
        await openStoryPage({
            id: STORY_IDS[type],
            device: 'MOBILE_IOS',
            args: {
                ...argsReset,
                size,
                variant: variant === 'inverse' ? 'brand' : variant,
                asset,
                topActions,
                mediaPosition,
                onClose: false,
                description,
            },
        });

        const card = await screen.findByTestId(TEST_IDS[type]);
        await expectScreenshot(card);
    });
}

for (const testCase of [
    {type: 'media', mediaPosition: 'left', description: 'Media card with footer and media on the left'},
    {type: 'media', mediaPosition: 'right', description: 'Media card with footer and media on the right'},
    {type: 'naked', mediaPosition: 'left', description: 'Naked card with footer and media on the left'},
    {type: 'naked', mediaPosition: 'right', description: 'Naked card with footer and media on the right'},
] as const) {
    const {type, mediaPosition, description} = testCase;
    test(`Card anatomy - ${testCase.description}`, async () => {
        await openStoryPage({
            id: STORY_IDS[type],
            device: 'MOBILE_IOS',
            args: {
                ...argsReset,
                imageSrc: 'beach',
                videoSrc: 'beach',
                // In acceptance tests, videos never autoplay, but `videoAutoPlay: false` forces the
                // card into "paused" state after load (changing the overlay icon and breaking snapshots).
                videoAutoPlay: true,
                topActions: false,
                onClose: true,
                showFooter: true,
                footerSlot: true,
                mediaPosition,
                description,
            },
        });

        const card = await screen.findByTestId(TEST_IDS[type]);
        await expectScreenshot(card);
    });
}

for (const testCase of [
    {
        type: 'naked',
        mediaPosition: 'top',
        mediaWidth: '150px',
        description: 'Naked card with circledImage and media on the top',
    },
    {
        type: 'naked',
        mediaPosition: 'left',
        mediaWidth: '150px',
        description: 'Naked card with circledImage and media on the left',
    },
    {
        type: 'naked',
        mediaPosition: 'right',
        mediaWidth: '150px',
        description: 'Naked card with circledImage and media on the right',
    },
] as const) {
    const {type, mediaPosition, mediaWidth, description} = testCase;
    test(`Card anatomy - ${testCase.description}`, async () => {
        await openStoryPage({
            id: STORY_IDS[type],
            device: 'MOBILE_IOS',
            args: {
                ...argsReset,
                imageSrc: 'beach',
                topActions: false,
                onClose: true,
                showFooter: true,
                footerSlot: true,
                mediaPosition,
                mediaWidth,
                description,
                circledImage: true,
            },
        });

        const card = await screen.findByTestId(TEST_IDS[type]);
        await expectScreenshot(card);
    });
}

for (const testCase of [
    {type: 'data', variant: 'default', backgroundColor: '', description: 'Data card with default variant'},
    {type: 'data', variant: 'inverse', backgroundColor: '', description: 'Data card with inverse variant'},
    {type: 'data', variant: 'media', backgroundColor: '', description: 'Data card with media variant'},
    {
        type: 'data',
        variant: 'alternative',
        backgroundColor: '',
        description: 'Data card with alternative variant',
    },
    {
        type: 'cover',
        variant: 'media',
        backgroundColor: 'red',
        description: 'Cover card with background color',
    },
] as const) {
    const {type, variant, backgroundColor, description} = testCase;
    test(`Card background - ${testCase.description}`, async () => {
        await openStoryPage({
            id: STORY_IDS[type],
            device: 'MOBILE_IOS',
            args: {
                ...argsReset,
                variant: variant === 'inverse' ? 'brand' : variant,
                backgroundColor,
                description,
                topActions: true,
                onClose: true,
                slot: true,
                imageSrc: 'undefined',
            },
        });

        const card = await screen.findByTestId(TEST_IDS[type]);
        await expectScreenshot(card);
    });
}

for (const testCase of [
    {type: 'data', slotAlignment: 'content', description: 'Data card with content slot alignment'},
    {type: 'data', slotAlignment: 'bottom', description: 'Data card with bottom slot alignment'},
] as const) {
    const {type, slotAlignment, description} = testCase;
    test(`Card slot alignment - ${testCase.description}`, async () => {
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
        await expectScreenshot(card);
    });
}

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
    await expectScreenshot(card);
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
    await expectScreenshot(card);
});

for (const testCase of [
    {
        variantOutside: 'default',
        variant: 'default',
        footerVariant: '',
        footerBackgroundColor: '',
        description: 'Card with default variant',
    },
    {
        variantOutside: 'default',
        variant: 'inverse',
        footerVariant: '',
        footerBackgroundColor: '',
        description: 'Card with inverse variant',
    },
    {
        variantOutside: 'default',
        variant: 'default',
        footerVariant: '',
        footerBackgroundColor: 'red',
        description: 'Card with background color',
    },
    {
        variantOutside: 'default',
        variant: 'default',
        footerVariant: 'inverse',
        footerBackgroundColor: '',
        description: 'Card with inverse footer variant and default outside',
    },
    {
        variantOutside: 'inverse',
        variant: 'default',
        footerVariant: 'inverse',
        footerBackgroundColor: '',
        description: 'Card with inverse footer variant and inverse outside',
    },
] as const) {
    const {variantOutside, variant, footerVariant, footerBackgroundColor, description} = testCase;
    test(`Card footer and divider - ${testCase.description}`, async () => {
        await openStoryPage({
            id: STORY_IDS.data,
            device: 'MOBILE_IOS',
            args: {
                ...argsReset,
                headline: '',
                pretitle: '',
                title: 'Footer and divider',
                variantOutside: variantOutside === 'inverse' ? 'brand' : variantOutside,
                variant: variant === 'inverse' ? 'brand' : variant,
                footerVariant: footerVariant === 'inverse' ? 'brand' : footerVariant,
                footerBackgroundColor,
                description,
                topActions: false,
                onClose: false,
                slot: false,
                showFooter: true,
            },
        });

        const card = await screen.findByTestId('card-container');
        await expectScreenshot(card);
    });
}

for (const testCase of [
    {
        type: 'cover',
        variantOutside: 'default',
        variant: 'default',
        description: 'Cover card with default outside and default variant',
    },
    {
        type: 'cover',
        variantOutside: 'default',
        variant: 'inverse',
        description: 'Cover card with default outside and inverse variant',
    },
    {
        type: 'cover',
        variantOutside: 'inverse',
        variant: 'default',
        description: 'Cover card with inverse outside and default variant',
    },
    {
        type: 'cover',
        variantOutside: 'inverse',
        variant: 'inverse',
        description: 'Cover card with inverse outside and inverse variant',
    },
] as const) {
    const {type, variant, variantOutside, description} = testCase;
    test(`Card outside variant - ${testCase.description}`, async () => {
        await openStoryPage({
            id: STORY_IDS[type],
            device: 'MOBILE_IOS',
            args: {
                ...argsReset,
                variant: variant === 'inverse' ? 'brand' : variant,
                variantOutside: variantOutside === 'inverse' ? 'brand' : variantOutside,
                description,
                showFooter: true,
                footerSlot: true,
                imageSrc: 'empty string',
            },
        });

        const card = await screen.findByTestId('card-container');
        await expectScreenshot(card);
    });
}

for (const testCase of [
    {skin: MOVISTAR_SKIN},
    {skin: O2_SKIN},
    {skin: VIVO_SKIN},
    {skin: VIVO_EVOLUTION_SKIN},
    {skin: TELEFONICA_SKIN},
    {skin: BLAU_SKIN},
    {skin: ESIMFLAG_SKIN},
] as const) {
    const {skin} = testCase;
    test(`Card cover footer with image background - ${testCase.skin}`, async () => {
        await openStoryPage({
            id: STORY_IDS.cover,
            device: 'MOBILE_IOS',
            skin,
            args: {
                ...argsReset,
                showFooter: true,
                footerSlot: false,
                imageSrc: 'person portrait',
            },
        });

        const card = await screen.findByTestId('card-container');
        await expectScreenshot(card);
    });
}

for (const testCase of [
    {gradientOverlayColor: '#F00'},
    {gradientOverlayColor: '#00FF00'},
    {gradientOverlayColor: 'rgba(255, 255, 0, 1)'},
    {gradientOverlayColor: 'transparent'},
] as const) {
    const {gradientOverlayColor} = testCase;
    test(`Card cover with custom gradientOverlayColor - ${testCase.gradientOverlayColor}`, async () => {
        await openStoryPage({
            id: STORY_IDS.cover,
            device: 'MOBILE_IOS',
            args: {
                ...argsReset,
                showFooter: true,
                footerSlot: false,
                imageSrc: 'beach',
                gradientOverlayColor,
            },
        });

        const card = await screen.findByTestId(TEST_IDS.cover);
        await expectScreenshot(card);
    });
}

test('NakedCard over inverse', async () => {
    await openStoryPage({
        id: STORY_IDS.naked,
        device: 'MOBILE_IOS',
        args: {
            ...argsReset,
            variantOutside: 'brand',
        },
    });

    const card = await screen.findByTestId(TEST_IDS.naked);
    await expectScreenshot(card);
});

test('DataCard with segregateTouchableContent', async () => {
    await openStoryPage({
        id: STORY_IDS.data,
        device: 'MOBILE_IOS',
        args: {
            ...argsReset,
            onPress: true,
            segregateTouchableContent: true,
            description: 'Description',
            pretitle: 'Pretitle',
            title: '',
        },
    });

    (await screen.findByRole('button', {name: 'Pretitle'})).focus();

    const card = await screen.findByTestId(TEST_IDS.data);
    await expectScreenshot(card);
});

for (const testCase of [
    {card: 'data', control: 'checkbox'},
    {card: 'media', control: 'switch'},
    {card: 'cover', control: 'radio'},
    {card: 'naked', control: 'checkbox'},
    {card: 'advanced', control: 'checkbox'},
] as const) {
    const {card, control} = testCase;
    test(`Selectable ${testCase.card} cards with ${testCase.control} selector`, async () => {
        await openStoryPage({
            id: 'components-cards-selection--selection',
            device: 'MOBILE_IOS',
            args: {card, control},
        });
        const container = await screen.findByTestId('card-container');
        await (await screen.findByRole(control, {name: 'First This is a description'})).click();
        await expectScreenshot(container);
    });
}

test('Custom card selection and lock action', async () => {
    await openStoryPage({id: 'components-cards-selection--custom-selection', device: 'MOBILE_IOS'});
    const container = await screen.findByTestId('card-container');
    await expectScreenshot(container);
    await (await screen.findByRole('button', {name: 'Select card'})).click();
    await (await screen.findByRole('button', {name: 'Add favorite'})).click();
    await (await screen.findByRole('button', {name: 'Lock'})).click();
    await expectScreenshot(container);
});

for (const testCase of ['data', 'advanced']) {
    const card = testCase;
    test(`Selectable ${testCase} card with keyboard focus`, async () => {
        const page = await openStoryPage({
            id: 'components-cards-selection--selection',
            device: 'DESKTOP',
            args: {card},
        });
        const surface = await screen.findByRole('checkbox', {name: 'First This is a description'});
        await surface.focus();
        await page.keyboard.press('Space');
        const container = await screen.findByTestId('card-container');
        await expectScreenshot(container);
    });
}

test('Selectable card with custom render in slot', async () => {
    await openStoryPage({
        id: 'components-cards-selection--selection',
        device: 'MOBILE_IOS',
        args: {customRender: true},
    });
    const [control] = await screen.findAllByRole('checkbox', {name: 'Custom control'});
    await control.click();
    const container = await screen.findByTestId('card-container');
    await expectScreenshot(container);
});

for (const testCase of [
    {skin: BLAU_SKIN, device: 'MOBILE_ANDROID'},
    {skin: BLAU_SKIN, device: 'MOBILE_IOS'},
    {skin: VIVO_SKIN, device: 'MOBILE_ANDROID'},
    {skin: VIVO_SKIN, device: 'MOBILE_IOS'},
    {skin: VIVO_EVOLUTION_SKIN, device: 'MOBILE_ANDROID'},
    {skin: VIVO_EVOLUTION_SKIN, device: 'MOBILE_IOS'},
] as const) {
    const {skin, device} = testCase;
    test(`Selectable advanced card with switch - ${testCase.skin} - ${testCase.device}`, async () => {
        await openStoryPage({
            id: 'components-cards-selection--advanced-switch',
            skin,
            device,
            viewport: {width: 360, height: 640, deviceScaleFactor: 2},
        });
        const card = await screen.findByTestId('AdvancedDataCard');
        await expectScreenshot(card);
    });
}

for (const testCase of ['checkbox', 'switch', 'radio']) {
    const control = testCase;
    test(`Selectable cover cards with ${testCase} and aspect ratio`, async () => {
        await openStoryPage({
            id: 'components-cards-selection--selection',
            device: 'MOBILE_IOS',
            args: {card: 'cover', control, aspectRatio: '1 1'},
        });
        await (await screen.findByRole(control, {name: 'First This is a description'})).click();
        const container = await screen.findByTestId('card-container');
        await expectScreenshot(container);
    });
}
