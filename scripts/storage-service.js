const {BlobServiceClient, StorageSharedKeyCredential} = require('@azure/storage-blob');
const {once} = require('lodash');
const {basename} = require('path');
const {promisify} = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

const ACCOUNT_NAME = process.env.ACCOUNT_NAME || 'pladaria1';
const ACCOUNT_KEY = process.env.ACCOUNT_KEY || '';

const CONTAINER_NAME = 'ci-screenshots-' + Date.now();
const EXPIRY_TIME_MS = 7 * 24 * 60 * 60 * 1000; // one week

const getBlobServiceClient = once(() => {
    const sharedKeyCredential = new StorageSharedKeyCredential(ACCOUNT_NAME, ACCOUNT_KEY);
    return new BlobServiceClient(`https://${ACCOUNT_NAME}.blob.core.windows.net`, sharedKeyCredential);
});

const getContainerClient = once(async () => {
    const containerClient = getBlobServiceClient().getContainerClient(CONTAINER_NAME);
    if (!(await containerClient.exists())) {
        await containerClient.create({access: 'blob'});
    }
    return containerClient;
});

const getBlockBlobClient = async (blobName) => {
    return (await getContainerClient()).getBlockBlobClient(blobName);
};

const uploadFile = async (path, contentType) => {
    const buffer = await readFile(path);
    const filename = basename(path);
    const blockBlobClient = await getBlockBlobClient(filename);
    await blockBlobClient.upload(buffer, buffer.byteLength, {
        blobHTTPHeaders: {blobContentType: contentType},
    });
    return blockBlobClient.url;
};

const deleteContainersOlderThan = async (ms) => {
    const now = Date.now();
    const blobServiceClient = await getBlobServiceClient();
    for await (const container of (await getBlobServiceClient()).listContainers()) {
        if (now - container.properties.lastModified > ms) {
            console.log('delete container', container.name);
            await blobServiceClient.deleteContainer(container.name);
        }
    }
};

async function main() {
    const url = await uploadFile('/home/pladaria/Nextcloud/images/avatars/doge.png', 'image/png');

    console.log(url);

    deleteContainersOlderThan(EXPIRY_TIME_MS);
}

main().catch((err) => {
    console.error('Error running sample:', err.message);
});
