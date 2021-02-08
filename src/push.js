const { readFileSync } = require("fs");
const { BlobServiceClient } = require("@azure/storage-blob");
const { getBlobName, getCurrentBranch } = require("./utils");
const config = require("../config");

async function push(service, filePath) {
    const client = BlobServiceClient.fromConnectionString(config.blobStorageConnStr);

    const branch = await getCurrentBranch()

    const containerClient = client.getContainerClient(config.blobContainer);
    const blobClient = containerClient.getBlockBlobClient(getBlobName(service, branch));

    const dat = readFileSync(filePath);
    await blobClient.uploadData(dat);
}

module.exports = { push };
