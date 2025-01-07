import { Command } from "@commander-js/extra-typings";
import { service } from "@/api";

const program = new Command();

const put = program
  .command("put")
  .argument("[url]", "URL to request")
  .alias("PUT")
  .action(async (url) => {
    if (!url) throw Error("URL is required");

    const response = await service.put({
      url: url,
    });
    console.log(response.data);
  });

export default put;
