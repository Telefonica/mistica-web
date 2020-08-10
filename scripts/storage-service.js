const {BlobServiceClient, StorageSharedKeyCredential} = require('@azure/storage-blob');
const {once} = require('lodash');
const {basename} = require('path');
const {promisify} = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

const {AZURE_ACCOUNT_NAME, AZURE_ACCOUNT_KEY} = process.env;

if (!AZURE_ACCOUNT_KEY || !AZURE_ACCOUNT_KEY) {
    console.error('Missing credentials, check env vars AZURE_ACCOUNT_NAME and AZURE_ACCOUNT_KEY');
    process.exit(1);
}

const CONTAINER_NAME = 'ci-screenshots-' + Date.now();
const DEFAULT_EXPIRY_TIME_MS = 7 * 24 * 60 * 60 * 1000; // one week

const getBlobServiceClient = once(() => {
    const sharedKeyCredential = new StorageSharedKeyCredential(AZURE_ACCOUNT_NAME, AZURE_ACCOUNT_KEY);
    return new BlobServiceClient(`https://${AZURE_ACCOUNT_NAME}.blob.core.windows.net`, sharedKeyCredential);
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

const deleteOldContainers = async (ms = DEFAULT_EXPIRY_TIME_MS) => {
    const now = Date.now();
    const blobServiceClient = await getBlobServiceClient();
    for await (const container of (await getBlobServiceClient()).listContainers()) {
        if (now - container.properties.lastModified > ms) {
            await blobServiceClient.deleteContainer(container.name);
        }
    }
};

module.exports = {uploadFile, deleteOldContainers};
