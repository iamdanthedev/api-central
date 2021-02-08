const { writeFileSync } = require("fs");
const { BlobServiceClient } = require("@azure/storage-blob");
const { getBlobName, getCurrentBranch } = require("./utils");
const config = require("../config");

async function pull(service, outFile) {
    const client = BlobServiceClient.fromConnectionString(config.blobStorageConnStr);
    const branch = await getCurrentBranch()
    const containerClient = client.getContainerClient(config.blobContainer);

    function download(b = branch) {
        const blobClient = containerClient.getBlobClient(getBlobName(service, b));
        return blobClient.downloadToBuffer();
    }

    let buf;

    try {
        buf = await download();
        writeFileSync(outFile, buf);
    } catch (err) {
        if (err.statusCode !== 404) {
            throw err;
        }

        buf = await download("dev");
    }

    writeFileSync(outFile, buf);
}

module.exports = { pull };
