import {openStoryPage, screen} from '../test-utils';
import type {Device} from '../test-utils';

const devices: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];
const controls = ['chevron', 'checkbox', 'switch', 'radio', 'custom element'];

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
            id: 'components-lists-rowlist--default',
            device: device as Device,
            args: {
                control,
                extraContent,
                withBadge,
                headline: 'Headline',
            },
        });

        const list = await screen.findByTestId('row-list');
        const image = await list.screenshot();
        expect(image).toMatchImageSnapshot();
    }
);

test.each(getCases())(
    'Boxed row list - %s %s extra %s badge %s',
    async (device, control, extraContent, withBadge) => {
        await openStoryPage({
            id: 'components-lists-boxedrowlist--default',
            device: device as Device,
            args: {
                control,
                extraContent,
                withBadge,
                headline: 'Headline',
            },
        });

        const list = await screen.findByTestId('boxed-row-list');
        const image = await list.screenshot();
        expect(image).toMatchImageSnapshot();
    }
);
