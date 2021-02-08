function parseServicePath(serviceName, defaultBranch) {
    let service = "";
    let branch = defaultBranch;

    if (serviceName.contains("#")) {
        [service, branch] = serviceName.split("#")
    } else {
        service = serviceName;
    }

    return { service, branch };
}

function getBlobName(service, branch) {
    return `${service}/${branch}/schema.json`;
}


module.exports = {
    parseServicePath,
    getBlobName
}
