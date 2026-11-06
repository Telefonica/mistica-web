import {test, expect, expectScreenshot} from '../test-utils/playwright';
import path from 'path';
import {openStoryPage, screen} from '../test-utils';

const variants = ['default', 'brand', 'alternative', 'negative', 'media'] as const;

for (const testCase of variants) {
    const variantOutside = testCase;
    test(`FileUpload - with drop zone (${testCase})`, async () => {
        await openStoryPage({
            id: 'components-input-fields-fileupload--default',
            device: 'DESKTOP',
            args: {withDropZone: true, withAsset: true, variantOutside},
        });

        const fileUploader = await screen.findByTestId('FileUpload');
        await expectScreenshot(fileUploader);

        await fileUploader.hover();
        await expectScreenshot(fileUploader);
    });
}

test('FileUpload - without drop zone', async () => {
    await openStoryPage({
        id: 'components-input-fields-fileupload--default',
        device: 'MOBILE_IOS',
        args: {withDropZone: false, withAsset: true},
    });

    const fileUploader = await screen.findByTestId('FileUpload');
    await expectScreenshot(fileUploader);
});

test('FileUpload - with error', async () => {
    await openStoryPage({
        id: 'components-input-fields-fileupload--default',
        device: 'MOBILE_IOS',
        args: {
            withDropZone: true,
            withAsset: true,
            errorText: 'File size exceeds the maximum allowed of 50Mb',
        },
    });

    const fileUploader = await screen.findByTestId('FileUpload');
    await expectScreenshot(fileUploader);
});

test('FileUpload - upload multiple files and remove', async () => {
    await openStoryPage({
        id: 'components-input-fields-fileupload--default',
        device: 'MOBILE_IOS',
        args: {withDropZone: true, withAsset: true, allowAppend: true, multiple: true},
    });

    const fileUploader = await screen.findByTestId('FileUpload');

    // Upload first file
    const fileInput = await screen.findByLabelText('Drag or upload your file');
    const firstFixturePath = path.join(__dirname, '__fixtures__', 'file-upload-1.txt');
    const secondFixturePath = path.join(__dirname, '__fixtures__', 'file-upload-2.png');
    await fileInput.setInputFiles(firstFixturePath);
    await screen.findByText('file-upload-1.txt');

    await expectScreenshot(fileUploader);

    // Upload second file
    await fileInput.setInputFiles(secondFixturePath);
    await screen.findByText('file-upload-2.png');
    await screen.findAllByRole('button', {name: /^Eliminar archivo/});

    await expectScreenshot(fileUploader);

    // Remove one file
    const removeButtons = await screen.findAllByRole('button', {name: /^Eliminar archivo/});
    await removeButtons[0].click();
    await screen.findByText('file-upload-2.png');
    await expect(screen.findByText('file-upload-1.txt')).rejects.toThrow();

    await expectScreenshot(fileUploader);
});

test('FileUpload - custom gallery', async () => {
    await openStoryPage({
        id: 'components-input-fields-fileupload--custom-gallery',
        device: 'MOBILE_IOS',
    });

    const fileUploader = await screen.findByTestId('FileUpload');
    const fileInput = await screen.findByLabelText('Gallery');
    const firstFixturePath = path.join(__dirname, '__fixtures__', 'file-upload-2.png');
    const secondFixturePath = path.join(__dirname, '__fixtures__', 'file-upload-3.png');

    await fileInput.setInputFiles(firstFixturePath);
    await screen.findByLabelText('Remove file-upload-2.png');
    await fileInput.setInputFiles(secondFixturePath);
    await screen.findByLabelText('Remove file-upload-3.png');

    await expectScreenshot(fileUploader);
});
