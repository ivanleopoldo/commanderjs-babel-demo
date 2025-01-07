import { Command } from "@commander-js/extra-typings";
import axios from "axios";

const program = new Command();

const del = program
  .command("delete")
  .argument("[url]", "URL to request")
  .alias("DELETE")
  .action(async (url) => {
    if (!url) throw Error("URL is required");

    const response = await axios.delete(url);
    console.log(response);
  });

export default del;
