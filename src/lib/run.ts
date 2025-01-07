import { TRunOptions } from "./types";
import { requestSplitter } from "@/utils/helpers";
import { FetchService } from "@/api";
import chalk from "chalk";

export async function run(baseURL: string, options: TRunOptions) {
  const default_options = {
    prompt: options.prompt || ">",
    editor_command: options.editor_command || "nvim",
  };

  const axios = FetchService.create(undefined, { baseURL: baseURL });

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

    const response = await axios({ method: type, url: endpoint });
    console.log(response.data);
  }
}
