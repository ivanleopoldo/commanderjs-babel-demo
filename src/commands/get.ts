import { Command } from "@commander-js/extra-typings";
import { service } from "@/api";

const program = new Command();

const get = program
  .command("get")
  .argument("[url]", "URL to request")
  .alias("GET")
  .action(async (url) => {
    if (!url) {
      throw Error("URL is required");
    }
    const response = await service.get({ url: url });
    console.log(response.data);
  });

export default get;
