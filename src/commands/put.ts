import { Command } from "@commander-js/extra-typings";
import axios from "axios";
import { spawnSync } from "bun";
import fs from "node:fs";
import temp from "temp";

const program = new Command();

const put = program
  .command("put")
  .argument("[url]", "URL to request")
  .alias("PUT")
  .action(async (url) => {
    if (!url) throw Error("URL is required");

    const res = await axios.get(url);

    const tempFile = temp.openSync({ suffix: ".json" });
    const stream = fs.createWriteStream(tempFile.path);
    stream.write(JSON.stringify(res.data, null, 2));
    stream.end();

    spawnSync(["nvim", tempFile.path], {
      stdio: ["inherit", "inherit", "inherit"],
    });

    const output = fs.readFileSync(tempFile.path, "utf-8");
    temp.cleanupSync();
    const response = await axios.put(url, JSON.parse(output));
    console.log(response.data);
  });

export default put;
