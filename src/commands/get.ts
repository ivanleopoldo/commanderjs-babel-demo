import { Command } from "@commander-js/extra-typings";
import axios from "axios";

const program = new Command();

const get = program
  .command("get")
  .argument("[url]", "URL to request")
  .alias("GET")
  .action(async (url) => {
    if (!url) {
      throw Error("URL is required");
    }
    const response = await axios.get(url);
    console.log(response.data);
  });

export default get;
