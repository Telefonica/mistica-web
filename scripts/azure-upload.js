const {BlobServiceClient, StorageSharedKeyCredential, ContainerClient} = require('@azure/storage-blob');

// https://portal.azure.com/#@telefonicacorp.onmicrosoft.com/resource/subscriptions/0e142fc2-3ef6-4b19-8f69-598c2f96ddc4/resourceGroups/test/providers/Microsoft.Storage/storageAccounts/pladaria1/keys

const account = process.env.ACCOUNT_NAME || 'pladaria1';
const accountKey = process.env.ACCOUNT_KEY || '';

const CONTAINER_NAME = 'my-container';

console.log({account, accountKey});

async function main() {
    // Enter your storage account name and shared key

    // Use StorageSharedKeyCredential with storage account and account key
    // StorageSharedKeyCredential is only avaiable in Node.js runtime, not in browsers
    const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

    // ONLY AVAILABLE IN NODE.JS RUNTIME
    // DefaultAzureCredential will first look for Azure Active Directory (AAD)
    // client secret credentials in the following environment variables:
    //
    // - AZURE_TENANT_ID: The ID of your AAD tenant
    // - AZURE_CLIENT_ID: The ID of your AAD app registration (client)
    // - AZURE_CLIENT_SECRET: The client secret for your AAD app registration
    //
    // If those environment variables aren't found and your application is deployed
    // to an Azure VM or App Service instance, the managed service identity endpoint
    // will be used as a fallback authentication source.
    // const defaultAzureCredential = new DefaultAzureCredential();

    // You can find more TokenCredential implementations in the [@azure/identity](https://www.npmjs.com/package/@azure/identity) library
    // to use client secrets, certificates, or managed identities for authentication.

    // Use AnonymousCredential when url already includes a SAS signature
    // const anonymousCredential = new AnonymousCredential();

    // List containers
    const blobServiceClient = new BlobServiceClient(
        // When using AnonymousCredential, following url should include a valid SAS or support public access
        `https://${account}.blob.core.windows.net`,
        sharedKeyCredential
    );

    let container;

    for await (const currentContainer of blobServiceClient.listContainers()) {
        if (currentContainer.name === CONTAINER_NAME) {
            container = currentContainer;
            break;
        }
    }

    if (container) {
        console.log('container exists:', CONTAINER_NAME);
    } else {
        const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);
        const createContainerResponse = await containerClient.create();
        console.log(`Create container ${CONTAINER_NAME} successfully`, createContainerResponse.requestId);
    }

    const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);
    // console.log(containerClient);

    /*
    // Create a blob
    const content = 'hello';
    const blobName = 'newblob' + new Date().getTime();
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(content, Buffer.byteLength(content));
    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);

    // List blobs
    i = 1;
    for await (const blob of containerClient.listBlobsFlat()) {
        console.log(`Blob ${i++}: ${blob.name}`);
    }

    // Get blob content from position 0 to the end
    // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
    // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
    const downloadBlockBlobResponse = await blockBlobClient.download(0);
    console.log(
        'Downloaded blob content',
        await streamToString(downloadBlockBlobResponse.readableStreamBody)
    );

    // Delete container
    await containerClient.delete();

    console.log('deleted container');
    */
}
/*
// A helper method used to read a Node.js readable stream into string
async function streamToString(readableStream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        readableStream.on('data', (data) => {
            chunks.push(data.toString());
        });
        readableStream.on('end', () => {
            resolve(chunks.join(''));
        });
        readableStream.on('error', reject);
    });
}
*/

main().catch((err) => {
    console.error('Error running sample:', err.message);
});
