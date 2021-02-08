#!/usr/bin/env node

const program = require("commander");
const { resolve } = require("path");
const packageJson = require("./package.json")
const { pull } = require("./src/pull")
const { push } = require("./src/push")

program.version(packageJson.version)

program
    .command("push <service> <schema>")
    .description("push a schema file to the api repository")
    .action(async (service, schema) => {
        console.log ({ service, schema })
        const fullpath = resolve(schema);
        await push(service, fullpath);
        console.info("done");
    });

program
    .command("pull <service> <outfile>")
    .description("pull a schema from the api repository and save as outfile")
    .action(async (service, outfile) => {
        const fullpath = resolve(outfile);
        await pull(service, fullpath);
        console.log({ service, outfile, fullpath });
    })

program.parse(process.argv)
