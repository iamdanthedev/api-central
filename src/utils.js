const { exec } = require('child_process');

function parseServicePath(serviceName, defaultBranch) {
    let service = "";
    let branch = defaultBranch;

    if (serviceName.includes("#")) {
        [service, branch] = serviceName.split("#")
    } else {
        service = serviceName;
    }

    return { service, branch };
}

function getBlobName(service, branch) {
    return `${service}/${branch}/schema.json`;
}

function getCurrentBranch() {
    if (process.env["API_CENTRAL_BRANCH"]) {
        return Promise.resolve(process.env["API_CENTRAL_BRANCH"])
    }

    return new Promise((resolve, reject) => {

        exec("git branch --show-current", (err, stdout, stderr) => {
            if (err) {
                return reject(err)
            }

            resolve(stdout.replace("\n", ""))
        });
    })
}



module.exports = {
    parseServicePath,
    getBlobName,
    getCurrentBranch
}
