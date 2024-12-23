import { Command } from "@commander-js/extra-typings";

const program = new Command();

const put = program
  .command("put")
  .alias("PUT")
  .action(() => {
    console.log("put");
  });

export default put;
