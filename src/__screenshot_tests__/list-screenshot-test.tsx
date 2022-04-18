import {openStoryPage, screen} from '../test-utils';

import type {Device} from '../test-utils';

const devices: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];
const controls = [
    'chevron',
    'checkbox',
    'checkbox and onPress',
    'switch',
    'switch and onPress',
    'radio',
    'custom element',
    'custom element with text',
];

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
        },
    });

    const list = await screen.findByTestId('list');
    const image = await list.screenshot();
    expect(image).toMatchImageSnapshot();
});
