import { Command } from "@commander-js/extra-typings";

const program = new Command();

const del = program
  .command("delete")
  .alias("DELETE")
  .action(() => {
    console.log("delete");
  });

export default del;
