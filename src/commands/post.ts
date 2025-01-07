import { Command } from "@commander-js/extra-typings";
import { service } from "@/api";

const program = new Command();

const post = program
  .command("post")
  .argument("[url]", "URL to request")
  .alias("POST")
  .action(async (url) => {
    if (!url) throw Error("URL is required");

    const response = await service.post({
      url: url,
    });
    console.log(response.data);
  });

export default post;
