import {openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device} from '../test-utils';

const devices: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];
const controls = [
    'chevron',
    'checkbox',
    'checkbox and onPress',
    'checkbox with custom element',
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
            const extra = false;
            const badge = true;
            cases.push([device, control, extra, badge]);
        }
        for (const extra of [true, false]) {
            const badge = false;
            cases.push([device, 'none', extra, badge]);
        }
    }
    return cases;
};

test.each(getCases())('Row list - %s %s extra %s badge %s', async (device, control, extra, badge) => {
    await openStoryPage({
        id: 'components-lists--row-list-story',
        device: device as Device,
        args: {
            control,
            extra,
            badge,
            headline: 'Headline',
            detail: 'Detail',
            subtitle: 'Subtitle',
        },
    });

    const list = await screen.findByTestId('list');
    const image = await list.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(getCases())('Boxed row list - %s %s extra %s badge %s', async (device, control, extra, badge) => {
    await openStoryPage({
        id: 'components-lists--boxed-row-list-story',
        device: device as Device,
        args: {
            control,
            extra,
            badge,
            headline: 'Headline',
            detail: 'Detail',
            subtitle: 'Subtitle',
        },
    });

    const list = await screen.findByTestId('list');
    const image = await list.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(controls)('Row list disabled - %s', async (control) => {
    await openStoryPage({
        id: 'components-lists--row-list-story',
        device: 'MOBILE_IOS',
        args: {
            control,
            headline: 'Headline',
            badge: true,
            disabled: true,
            detail: 'Detail',
            subtitle: 'Subtitle',
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
            badge: true,
            disabled: true,
            detail: 'Detail',
            subtitle: 'Subtitle',
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
            subtitle: 'Subtitle',
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
            subtitle: 'Subtitle',
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

test('Rows over inverse background', async () => {
    await openStoryPage({
        id: 'components-lists--row-list-story',
        device: 'MOBILE_IOS',
        args: {
            overInverse: true,
        },
    });

    const list = await screen.findByTestId('list');
    const image = await list.screenshot();
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
    const image = await list.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('BoxedRows inverse', async () => {
    await openStoryPage({
        id: 'components-lists--boxed-row-list-story',
        device: 'MOBILE_IOS',
        args: {
            inverse: true,
        },
    });

    const list = await screen.findByTestId('list');
    const image = await list.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('BoxedRows inverse over inverse', async () => {
    await openStoryPage({
        id: 'components-lists--boxed-row-list-story',
        device: 'MOBILE_IOS',
        args: {
            inverse: true,
            overInverse: true,
        },
    });

    const list = await screen.findByTestId('list');
    const image = await list.screenshot();
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
    const image = await list.screenshot();
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
    const image = await list.screenshot();
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
    const image = await list.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(devices)('UnorderedList', async (device) => {
    await openStoryPage({
        id: 'components-lists--unordered-list-story',
        device,
    });

    const list = await screen.findByLabelText('Unordered List');

    const image = await list.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(devices)('UnorderedList default icons', async (device) => {
    await openStoryPage({
        id: 'components-lists--unordered-list-story',
        device,
        args: {customIcon: false},
    });

    const list = await screen.findByLabelText('Unordered List');

    const image = await list.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(devices)('UnorderedList without marker', async (device) => {
    await openStoryPage({
        id: 'components-lists--unordered-list-story',
        device,
        args: {withMarker: false},
    });

    const list = await screen.findByLabelText('Unordered List');

    const image = await list.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(devices)('OrderedList', async (device) => {
    await openStoryPage({
        id: 'components-lists--ordered-list-story',
        device,
    });

    const list = await screen.findByLabelText('Ordered List');

    const image = await list.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(devices)('OrderedList default icons', async (device) => {
    await openStoryPage({
        id: 'components-lists--ordered-list-story',
        device,
        args: {customIcon: false},
    });

    const list = await screen.findByLabelText('Ordered List');

    const image = await list.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(devices)('OrderedList without marker', async (device) => {
    await openStoryPage({
        id: 'components-lists--ordered-list-story',
        device,
        args: {withMarker: false},
    });

    const list = await screen.findByLabelText('Ordered List');

    const image = await list.screenshot();
    expect(image).toMatchImageSnapshot();
});
