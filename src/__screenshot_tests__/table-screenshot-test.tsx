import {openStoryPage} from '../test-utils';

const cases = [
    [
        'desktop fullWidth',
        {
            device: 'DESKTOP',
            args: {fullWidth: true},
            fullPageScreenshot: false,
        },
    ],
    [
        'desktop fullWidth false',
        {
            device: 'DESKTOP',
            args: {fullWidth: false},
            fullPageScreenshot: false,
        },
    ],
    [
        'desktop boxed',
        {
            device: 'DESKTOP',
            args: {boxed: true},
            fullPageScreenshot: false,
        },
    ],
    [
        'desktop boxed fullWidth false',
        {
            device: 'DESKTOP',
            args: {boxed: true, fullWidth: false},
            fullPageScreenshot: false,
        },
    ],
    [
        'desktop inverse',
        {
            device: 'DESKTOP',
            args: {inverse: true},
            fullPageScreenshot: false,
        },
    ],
    [
        'desktop boxed inverse',
        {
            device: 'DESKTOP',
            args: {inverse: true, boxed: true},
            fullPageScreenshot: false,
        },
    ],
    [
        'desktop maxHeight',
        {
            device: 'DESKTOP',
            args: {maxHeight: 200},
            fullPageScreenshot: false,
        },
    ],
    [
        'desktop maxHeight boxed',
        {
            device: 'DESKTOP',
            args: {maxHeight: 200, boxed: true},
            fullPageScreenshot: false,
        },
    ],
    [
        'desktop empty case',
        {
            device: 'DESKTOP',
            args: {numItems: 0},
            fullPageScreenshot: false,
        },
    ],
    [
        'desktop empty boxed',
        {
            device: 'DESKTOP',
            args: {numItems: 0, boxed: true},
            fullPageScreenshot: false,
        },
    ],
    [
        'desktop with actions',
        {
            device: 'DESKTOP',
            args: {numItems: 6, withActions: true},
            fullPageScreenshot: false,
        },
    ],
    [
        'desktop collapse-rows with actions',
        {
            device: 'DESKTOP',
            args: {numItems: 6, responsive: 'collapse-rows', withActions: true},
            fullPageScreenshot: false,
        },
    ],
    [
        'desktop boxed with actions',
        {
            device: 'DESKTOP',
            args: {numItems: 6, boxed: true, withActions: true},
            fullPageScreenshot: false,
        },
    ],
    [
        'desktop collapse-rows boxed with actions',
        {
            device: 'DESKTOP',
            args: {numItems: 6, boxed: true, responsive: 'collapse-rows', withActions: true},
            fullPageScreenshot: false,
        },
    ],
    [
        'mobile',
        {
            device: 'MOBILE_IOS',
            args: {},
            fullPageScreenshot: false,
        },
    ],
    [
        'mobile boxed',
        {
            device: 'MOBILE_IOS',
            args: {boxed: true},
            fullPageScreenshot: false,
        },
    ],
    [
        'mobile collapse-rows',
        {
            device: 'MOBILE_IOS',
            args: {responsive: 'collapse-rows'},
            fullPageScreenshot: false,
        },
    ],
    [
        'mobile collapse-rows boxed',
        {
            device: 'MOBILE_IOS',
            args: {responsive: 'collapse-rows', boxed: true},
            fullPageScreenshot: false,
        },
    ],
    [
        'mobile collapse-rows inverse',
        {
            device: 'MOBILE_IOS',
            args: {responsive: 'collapse-rows', inverse: true},
            fullPageScreenshot: false,
        },
    ],
    [
        'mobile collapse-rows boxed inverse',
        {
            device: 'MOBILE_IOS',
            args: {responsive: 'collapse-rows', boxed: true, inverse: true},
            fullPageScreenshot: false,
        },
    ],
    [
        'tablet with actions',
        {
            device: 'TABLET',
            args: {numItems: 6, withActions: true},
            fullPageScreenshot: true,
        },
    ],
    [
        'tablet collapse-rows with actions',
        {
            device: 'TABLET',
            args: {numItems: 6, responsive: 'collapse-rows', withActions: true},
            fullPageScreenshot: true,
        },
    ],
    [
        'tablet boxed with actions',
        {
            device: 'TABLET',
            args: {numItems: 6, boxed: true, withActions: true},
            fullPageScreenshot: true,
        },
    ],
    [
        'tablet collapse-rows boxed with actions',
        {
            device: 'TABLET',
            args: {numItems: 6, boxed: true, responsive: 'collapse-rows', withActions: true},
            fullPageScreenshot: true,
        },
    ],
] as const;

test.each(cases)('Table %s', async (_name, {device, args, fullPageScreenshot}) => {
    const page = await openStoryPage({
        id: 'components-table--default',
        device,
        args,
    });

    const image = await page.screenshot({fullPage: fullPageScreenshot});
    expect(image).toMatchImageSnapshot();
});
