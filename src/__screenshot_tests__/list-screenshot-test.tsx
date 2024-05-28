import {DEVICES, openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device} from '../test-utils';

const devices: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];
const controls = [
    'chevron',
    'checkbox',
    'checkbox and onPress',
    'switch',
    'switch and onPress',
    'radio',
    'radio and onPress',
    'iconButton',
    'iconButton and onPress',
    'custom element',
    'custom element with text',
];

const controlsWithOnPress = ['checkbox', 'switch', 'radio'];
const controlsWithIconButton = ['iconButton', 'iconButton and onPress', 'toggleIconButton'];

const getCases = () => {
    const cases = [];
    for (const device of devices) {
        for (const control of controls) {
            const extraContent = false;
            const withBadge = true;
            cases.push([device, control, extraContent, withBadge]);
        }
        for (const extraContent of [true, false]) {
            const withBadge = false;
            cases.push([device, 'none', extraContent, withBadge]);
        }
    }
    return cases;
};

const fullPageScreenshot = async (element: any, device: Device) => {
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    const currentDevice = DEVICES[device as Device];
    await page.setViewport({...currentDevice.viewport, height});
    return element.screenshot({captureBeyondViewport: false});
};

test.each(getCases())(
    'Row list - %s %s extra %s badge %s',
    async (device, control, extraContent, withBadge) => {
        await openStoryPage({
            id: 'components-lists--row-list-story',
            device: device as Device,
            args: {
                control,
                extraContent,
                withBadge,
                headline: 'Headline',
                detail: 'Detail',
                subtitle: 'Subtitle',
            },
        });

        const list = await screen.findByTestId('list');
        // const image = await list.screenshot();
        const image = await fullPageScreenshot(list, device as Device);
        expect(image).toMatchImageSnapshot();
    }
);

test.each(getCases())(
    'Boxed row list - %s %s extra %s badge %s',
    async (device, control, extraContent, withBadge) => {
        await openStoryPage({
            id: 'components-lists--boxed-row-list-story',
            device: device as Device,
            args: {
                control,
                extraContent,
                withBadge,
                headline: 'Headline',
                detail: 'Detail',
                subtitle: 'Subtitle',
            },
        });

        const list = await screen.findByTestId('list');
        // const image = await list.screenshot();
        const image = await fullPageScreenshot(list, device as Device);
        expect(image).toMatchImageSnapshot();
    }
);

test.each(controls)('Row list disabled - %s', async (control) => {
    await openStoryPage({
        id: 'components-lists--row-list-story',
        device: 'MOBILE_IOS',
        args: {
            control,
            headline: 'Headline',
            withBadge: true,
            disabled: true,
            detail: 'Detail',
            subtitle: 'Subtitle',
        },
    });

    const list = await screen.findByTestId('list');
    // const image = await list.screenshot();
    const image = await fullPageScreenshot(list, 'MOBILE_IOS');
    expect(image).toMatchImageSnapshot();
});

test.each(controls)('Boxed row list disabled - %s', async (control) => {
    await openStoryPage({
        id: 'components-lists--boxed-row-list-story',
        device: 'MOBILE_IOS',
        args: {
            control,
            headline: 'Headline',
            withBadge: true,
            disabled: true,
            detail: 'Detail',
            subtitle: 'Subtitle',
        },
    });

    const list = await screen.findByTestId('list');
    // const image = await list.screenshot();
    const image = await fullPageScreenshot(list, 'MOBILE_IOS');
    expect(image).toMatchImageSnapshot();
});

test('Rows with only a Title content are centered', async () => {
    await openStoryPage({
        id: 'components-lists--boxed-row-list-story',
        device: 'MOBILE_IOS',
        args: {
            title: 'Title',
            subtitle: 'Subtitle',
            headline: '',
            description: '',
            control: 'chevron',
            detail: 'Detail',
        },
    });

    const list = await screen.findByTestId('list');
    // const image = await list.screenshot();
    const image = await fullPageScreenshot(list, 'MOBILE_IOS');
    expect(image).toMatchImageSnapshot();
});

test.each(devices)('Custom row with text centered', async (device) => {
    await openStoryPage({
        id: 'components-lists--boxed-row-list-story',
        device,
        args: {
            control: 'custom element with text',
            title: 'Title',
            subtitle: 'Subtitle',
            headline: '',
            description: '',
            detail: 'Detail',
        },
    });

    const list = await screen.findByTestId('list');
    // const image = await list.screenshot();
    const image = await fullPageScreenshot(list, device);
    expect(image).toMatchImageSnapshot();
});

test.each(controlsWithOnPress)('Click control with onPress - %s', async (control) => {
    await openStoryPage({
        id: 'components-lists--row-list-story',
        device: 'MOBILE_IOS',
        args: {
            control: control + ' and onPress',
        },
    });

    const elements = await screen.findAllByRole(control);
    await elements[0].click();

    const list = await screen.findByTestId('list');
    // const image = await list.screenshot();
    const image = await fullPageScreenshot(list, 'MOBILE_IOS');
    expect(image).toMatchImageSnapshot();
});

test.each(controlsWithIconButton)('Rows with %s using big fontSize', async (control) => {
    await openStoryPage({
        id: 'components-lists--boxed-row-list-story',
        device: 'DESKTOP',
        args: {control},
    });

    await setRootFontSize(32);

    const list = await screen.findByTestId('list');
    // const image = await list.screenshot();
    const image = await fullPageScreenshot(list, 'DESKTOP');
    expect(image).toMatchImageSnapshot();
});

test('Rows over inverse background', async () => {
    await openStoryPage({
        id: 'components-lists--row-list-story',
        device: 'MOBILE_IOS',
        args: {
            overInverse: true,
        },
    });

    const list = await screen.findByTestId('list');
    // const image = await list.screenshot();
    const image = await fullPageScreenshot(list, 'MOBILE_IOS');
    expect(image).toMatchImageSnapshot();
});

test('BoxedRows over inverse background', async () => {
    await openStoryPage({
        id: 'components-lists--boxed-row-list-story',
        device: 'MOBILE_IOS',
        args: {
            overInverse: true,
        },
    });

    const list = await screen.findByTestId('list');
    // const image = await list.screenshot();
    const image = await fullPageScreenshot(list, 'MOBILE_IOS');
    expect(image).toMatchImageSnapshot();
});

test('BoxedRows inverse', async () => {
    await openStoryPage({
        id: 'components-lists--boxed-row-list-story',
        device: 'MOBILE_IOS',
        args: {
            isInverse: true,
        },
    });

    const list = await screen.findByTestId('list');
    // const image = await list.screenshot();
    const image = await fullPageScreenshot(list, 'MOBILE_IOS');
    expect(image).toMatchImageSnapshot();
});

test('BoxedRows inverse over inverse', async () => {
    await openStoryPage({
        id: 'components-lists--boxed-row-list-story',
        device: 'MOBILE_IOS',
        args: {
            isInverse: true,
            overInverse: true,
        },
    });

    const list = await screen.findByTestId('list');
    // const image = await list.screenshot();
    const image = await fullPageScreenshot(list, 'MOBILE_IOS');
    expect(image).toMatchImageSnapshot();
});

test('Rows danger', async () => {
    await openStoryPage({
        id: 'components-lists--row-list-story',
        device: 'MOBILE_IOS',
        args: {
            danger: true,
        },
    });

    const list = await screen.findByTestId('list');
    // const image = await list.screenshot();
    const image = await fullPageScreenshot(list, 'MOBILE_IOS');
    expect(image).toMatchImageSnapshot();
});

test('Rows danger over inverse background', async () => {
    await openStoryPage({
        id: 'components-lists--row-list-story',
        device: 'MOBILE_IOS',
        args: {
            overInverse: true,
            danger: true,
        },
    });

    const list = await screen.findByTestId('list');
    // const image = await list.screenshot();
    const image = await fullPageScreenshot(list, 'MOBILE_IOS');
    expect(image).toMatchImageSnapshot();
});

test('BoxedRows danger', async () => {
    await openStoryPage({
        id: 'components-lists--boxed-row-list-story',
        device: 'MOBILE_IOS',
        args: {
            danger: true,
        },
    });

    const list = await screen.findByTestId('list');
    // const image = await list.screenshot();
    const image = await fullPageScreenshot(list, 'MOBILE_IOS');
    expect(image).toMatchImageSnapshot();
});
