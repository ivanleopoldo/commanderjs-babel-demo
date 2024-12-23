import { Command } from "@commander-js/extra-typings";

const program = new Command();

const post = program
  .command("post")
  .alias("POST")
  .action(() => {
    console.log("post");
  });

export default post;
