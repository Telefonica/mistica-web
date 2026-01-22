import {openStoryPage, screen} from '../test-utils';

test('FileUpload - with drop zone', async () => {
    await openStoryPage({
        id: 'components-fileupload--default',
        device: 'MOBILE_IOS',
        args: {withDropZone: true, withAsset: true},
    });

    const page = await screen.findByTestId('FileUpload');
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('FileUpload - without drop zone', async () => {
    await openStoryPage({
        id: 'components-fileupload--default',
        device: 'MOBILE_IOS',
        args: {withDropZone: false, withAsset: true},
    });

    const page = await screen.findByTestId('FileUpload');
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('FileUpload - with error', async () => {
    await openStoryPage({
        id: 'components-fileupload--default',
        device: 'MOBILE_IOS',
        args: {
            withDropZone: true,
            withAsset: true,
            errorText: 'File size exceeds the maximum allowed (50Mb)',
        },
    });

    const page = await screen.findByTestId('FileUpload');
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('FileUpload - with slot', async () => {
    await openStoryPage({
        id: 'components-fileupload--default',
        device: 'MOBILE_IOS',
        args: {
            withDropZone: true,
            withAsset: true,
            withSlot: true,
        },
    });

    const page = await screen.findByTestId('FileUpload');
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});
