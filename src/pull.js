const { writeFileSync } = require("fs");
const { BlobServiceClient } = require("@azure/storage-blob");
const { AzureCliCredential } = require("@azure/identity");
const { getBlobName, parseServicePath } = require("./utils");
const config = require("../config");

async function pull(servicePath, outFile, defaultBranch = "dev") {
    const cred = new AzureCliCredential();
    const client = new BlobServiceClient(`https://${config.blobStorageName}.blob.core.windows.net`, cred);

    const { service, branch } = parseServicePath(servicePath, defaultBranch);

    const containerClient = client.getContainerClient(config.blobContainer);
    const blobClient = containerClient.getBlobClient(getBlobName(service, branch));

    const buf = await blobClient.downloadToBuffer();
    writeFileSync(outFile, bug);
}

module.exports = { pull };
