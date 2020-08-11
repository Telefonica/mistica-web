// @ts-check
const {BlobServiceClient, StorageSharedKeyCredential} = require('@azure/storage-blob');
const {once} = require('lodash');
const {basename} = require('path');
const {promisify} = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);
const core = require('@actions/core');

const ACCOUNT_NAME = core.getInput('azure-account-name') || process.env.INPUT_AZURE_ACCOUNT_NAME;
const ACCOUNT_KEY = core.getInput('azure-account-key') || process.env.INPUT_AZURE_ACCOUNT_KEY;

const CONTAINER_NAME = 'ci-screenshots-' + Date.now();

const DEFAULT_EXPIRY_TIME_MS = 7 * 24 * 60 * 60 * 1000; // one week

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

const deleteOldContainers = async (ms = DEFAULT_EXPIRY_TIME_MS) => {
    const now = Date.now();
    const blobServiceClient = getBlobServiceClient();
    for await (const container of getBlobServiceClient().listContainers()) {
        if (now - container.properties.lastModified.getTime() > ms) {
            await blobServiceClient.deleteContainer(container.name);
        }
    }
};

module.exports = {uploadFile, deleteOldContainers};
