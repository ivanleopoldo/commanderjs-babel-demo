import { Command } from "@commander-js/extra-typings";
import axios from "axios";
import { spawnSync } from "bun";
import fs from "node:fs";
import temp from "temp";

const program = new Command();

const post = program
  .command("post")
  .argument("[url]", "URL to request")
  .alias("POST")
  .action(async (url) => {
    if (!url) throw Error("URL is required");

    const tempFile = temp.openSync({ suffix: ".json" });

    spawnSync(["nvim", tempFile.path], {
      stdio: ["inherit", "inherit", "inherit"],
    });

    const output = fs.readFileSync(tempFile.path, "utf-8");
    temp.cleanupSync();

    const response = await axios({
      method: "POST",
      url: url,
      data: JSON.parse(output),
    });
    console.log(response.data);
  });

export default post;
