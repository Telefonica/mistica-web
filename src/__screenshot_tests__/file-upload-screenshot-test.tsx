import path from 'path';
import {openStoryPage, screen} from '../test-utils';
import {prepareFile} from '@telefonica/acceptance-testing';

test('FileUpload - with drop zone', async () => {
    await openStoryPage({
        id: 'components-input-fields-fileupload--default',
        device: 'MOBILE_IOS',
        args: {withDropZone: true, withAsset: true},
    });

    const fileUploader = await screen.findByTestId('FileUpload');
    const image = await fileUploader.screenshot();

    expect(image).toMatchImageSnapshot();

    await fileUploader.hover();
    const hoverImage = await fileUploader.screenshot();

    expect(hoverImage).toMatchImageSnapshot();
});

test('FileUpload - without drop zone', async () => {
    await openStoryPage({
        id: 'components-input-fields-fileupload--default',
        device: 'MOBILE_IOS',
        args: {withDropZone: false, withAsset: true},
    });

    const fileUploader = await screen.findByTestId('FileUpload');
    const image = await fileUploader.screenshot();

    expect(image).toMatchImageSnapshot();
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
    const image = await fileUploader.screenshot();

    expect(image).toMatchImageSnapshot();
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
    const firstFixturePath = prepareFile(path.join(__dirname, '__fixtures__', 'file-upload-1.txt'));
    const secondFixturePath = prepareFile(path.join(__dirname, '__fixtures__', 'file-upload-2.svg'));
    await fileInput.uploadFile(firstFixturePath);
    await screen.findByText('file-upload-1.txt');

    const imageWithOneFile = await fileUploader.screenshot();
    expect(imageWithOneFile).toMatchImageSnapshot();

    // Upload second file
    await fileInput.uploadFile(secondFixturePath);
    await screen.findByText('file-upload-2.svg');
    await screen.findAllByRole('button', {name: /^Remove file/});

    const imageWithTwoFiles = await fileUploader.screenshot();
    expect(imageWithTwoFiles).toMatchImageSnapshot();

    // Remove one file
    const removeButtons = await screen.findAllByRole('button', {name: /^Remove file/});
    await removeButtons[0].click();
    await screen.findByText('file-upload-2.svg');
    await expect(screen.findByText('file-upload-1.txt')).rejects.toThrow();

    const imageAfterRemoval = await fileUploader.screenshot();
    expect(imageAfterRemoval).toMatchImageSnapshot();
});
