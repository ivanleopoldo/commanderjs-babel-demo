#!/usr/bin/env node

import { Argument, Command, Option } from "@commander-js/extra-typings";
import { post, get, put, del } from "@/commands";
import { run } from "@/lib/run";
import { handleError } from "@/utils/handlers";

const program = new Command();

program
  .description("A pipeline-based API testing CLI tool")
  .addArgument(new Argument("[url]", "Base API URL"))
  .addOption(
    new Option("-p, --prompt <prompt>", "Prompt message before request string"),
  )
  .addOption(new Option("-e, --editor <editor>", "Editor command"))
  .hook("preAction", (com) => {
    if (com.args.length === 0) {
      com.help();
    }
  })
  .action((url, { prompt, editor }) => {
    if (!url) {
      throw Error("URL is required");
    }

    try {
      const urlObj = new URL(url);

      run(urlObj.href, { prompt: prompt, editor_command: editor });
    } catch (err) {
      handleError(err);
    }
  });

program.addCommand(post);
program.addCommand(get);
program.addCommand(put);
program.addCommand(del);

program.parse(process.argv);
