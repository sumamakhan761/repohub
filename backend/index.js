const yargs = require('yargs');
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { commitRepo } = require("./controllers/commit");
const { pushRepo } = require("./controllers/push");
const { pullRepo } = require("./controllers/pull");
const { revertRepo } = require("./controllers/revert");

yargs(hideBin(process.argv))
  .command("init", "Initialise a new reposetry", {}, initRepo)
  .command("add <file>", "Add a file to the reposetry", (yargs) => {
    yargs.positional("file", {
      describe: "File to add to the staging area",
      type: "string",
    })
  }, (argv) => {
    addRepo(argv.file);
  })
  .command("command <message>", "Commit the staged files", (yargs) => {
    yargs.positional("message", {
      describe: "Commit message",
      type: "string",
    })
  }, commitRepo)
  .command("push", "Push commit to S3", {}, pushRepo)
  .command("pull", "pull commit to S3", {}, pullRepo)
  .command("revert <commitID>", "Revert to specific commit", (yargs) => {
    yargs.positional("commitID", {
      describe: "Commit ID to revert",
      type: "string",
    })
  }, revertRepo)
  .demandCommand(1, "You need atleast one command").help().argv;

