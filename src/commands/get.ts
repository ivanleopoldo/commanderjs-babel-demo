import { Command } from "@commander-js/extra-typings";

const program = new Command();

const get = program
  .command("get")
  .alias("GET")
  .action(() => {
    console.log("get");
  });

export default get;
