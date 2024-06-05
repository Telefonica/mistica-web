import {openStoryPage} from '../test-utils';

const cases = [
    [
        'desktop fullWidth',
        {
            device: 'DESKTOP',
            args: {fullWidth: true},
        },
    ],
    [
        'desktop fullWidth false',
        {
            device: 'DESKTOP',
            args: {fullWidth: false},
        },
    ],
    [
        'desktop boxed',
        {
            device: 'DESKTOP',
            args: {boxed: true},
        },
    ],
    [
        'desktop boxed fullWidth false',
        {
            device: 'DESKTOP',
            args: {boxed: true, fullWidth: false},
        },
    ],
    [
        'desktop inverse',
        {
            device: 'DESKTOP',
            args: {inverse: true},
        },
    ],
    [
        'desktop boxed inverse',
        {
            device: 'DESKTOP',
            args: {inverse: true, boxed: true},
        },
    ],
    [
        'desktop maxHeight',
        {
            device: 'DESKTOP',
            args: {maxHeight: 200},
        },
    ],
    [
        'desktop maxHeight boxed',
        {
            device: 'DESKTOP',
            args: {maxHeight: 200, boxed: true},
        },
    ],
    [
        'desktop empty case',
        {
            device: 'DESKTOP',
            args: {numItems: 0},
        },
    ],
    [
        'desktop empty boxed',
        {
            device: 'DESKTOP',
            args: {numItems: 0, boxed: true},
        },
    ],
    [
        'mobile',
        {
            device: 'MOBILE_IOS',
            args: {},
        },
    ],
    [
        'mobile boxed',
        {
            device: 'MOBILE_IOS',
            args: {boxed: true},
        },
    ],
    [
        'mobile collapse-rows',
        {
            device: 'MOBILE_IOS',
            args: {responsive: 'collapse-rows'},
        },
    ],
    [
        'mobile collapse-rows boxed',
        {
            device: 'MOBILE_IOS',
            args: {responsive: 'collapse-rows', boxed: true},
        },
    ],
    [
        'mobile collapse-rows inverse',
        {
            device: 'MOBILE_IOS',
            args: {responsive: 'collapse-rows', inverse: true},
        },
    ],
    [
        'mobile collapse-rows boxed inverse',
        {
            device: 'MOBILE_IOS',
            args: {responsive: 'collapse-rows', boxed: true, inverse: true},
        },
    ],
] as const;

test.each(cases)('Table %s', async (_name, {device, args}) => {
    const page = await openStoryPage({
        id: 'components-table--default',
        device,
        args,
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
