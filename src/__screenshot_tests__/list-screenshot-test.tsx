import {openStoryPage, screen, setRootFontSize} from '../test-utils';

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
const controlsWithIconButton = ['iconButton', 'iconButton and onPress'];

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
            },
        });

        const list = await screen.findByTestId('list');
        const image = await list.screenshot();
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
            },
        });

        const list = await screen.findByTestId('list');
        const image = await list.screenshot();
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
        },
    });

    const list = await screen.findByTestId('list');
    const image = await list.screenshot();
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
        },
    });

    const list = await screen.findByTestId('list');
    const image = await list.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Rows with only a Title content are centered', async () => {
    await openStoryPage({
        id: 'components-lists--boxed-row-list-story',
        device: 'MOBILE_IOS',
        args: {
            title: 'Title',
            subtitle: '',
            headline: '',
            description: '',
            control: 'chevron',
            detail: 'Detail',
        },
    });

    const list = await screen.findByTestId('list');
    const image = await list.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(devices)('Custom row with text centered', async (device) => {
    await openStoryPage({
        id: 'components-lists--boxed-row-list-story',
        device,
        args: {
            control: 'custom element with text',
            title: 'Title',
            subtitle: '',
            headline: '',
            description: '',
            detail: 'Detail',
        },
    });

    const list = await screen.findByTestId('list');
    const image = await list.screenshot();
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
    const image = await list.screenshot();
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
    const image = await list.screenshot();
    expect(image).toMatchImageSnapshot();
});
