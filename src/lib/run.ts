import { type TRunOptions } from "@/lib/types";
import { requestSplitter } from "@/utils/helpers";
import instance from "axios";
import { spawnSync } from "bun";
import chalk from "chalk";
import fs from "fs";
import temp from "temp";

export async function run(baseURL: string, options: TRunOptions) {
  const default_options = {
    prompt: options.prompt || ">",
    editor_command: options.editor_command || "nvim",
  };

  const axios = instance.create({ baseURL: baseURL });

  console.log("Base URL: ", baseURL);
  while (true) {
    const line = prompt(default_options.prompt);

    if (!line) return;

    const { type, endpoint, body } = requestSplitter(line);
    console.log(
      chalk.green(type) +
        ` ${endpoint}` +
        (body ? `\n${JSON.stringify(body, null, 2)}` : ""),
    );

    if (type === "POST" || type === "PUT") {
      const tempFile = temp.openSync({ suffix: ".json" });

      spawnSync([default_options.editor_command, tempFile.path], {
        stdio: ["inherit", "inherit", "inherit"],
      });

      const output = fs.readFileSync(tempFile.path, "utf-8");
      temp.cleanupSync();
      const response = await axios.post(endpoint, JSON.parse(output));
      console.log(response.data);
    } else {
      const response = await axios.get(endpoint);
      console.log(response.data);
    }
  }
}
