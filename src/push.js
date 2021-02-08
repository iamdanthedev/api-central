const { readFileSync, writeFileSync } = require("fs");
const { BlobServiceClient } = require("@azure/storage-blob");
const { AzureCliCredential } = require("@azure/identity");
const { getBlobName, parseServicePath } = require("./utils");
const config = require("../config");

async function push(servicePath, filePath, defaultBranch = "dev") {
    const cred = new AzureCliCredential();
    const client = new BlobServiceClient(`https://${config.blobStorageName}.blob.core.windows.net`, cred);

    const { service, branch } = parseServicePath(servicePath, defaultBranch);

    const containerClient = client.getContainerClient(config.blobContainer);
    const blobClient = containerClient.getBlockBlobClient(getBlobName(service, branch));

    const dat = readFileSync(filePath);
    await blobClient.uploadData(dat);
}

module.exports = { push };
