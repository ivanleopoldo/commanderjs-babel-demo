#!/usr/bin/env node

import { Argument, Command } from "@commander-js/extra-typings";
import { post, get, put, del } from "@/commands";
import { run } from "@/core/run";
import { handleError } from "@/utils/error-handler";

const program = new Command();

program
  .description("A pipeline-based API testing CLI tool")
  .addArgument(new Argument("[url]", "Base API URL"))
  .hook("preAction", (com) => {
    if (com.args.length === 0) {
      com.help();
    }
  })
  .action((url) => {
    if (!url) {
      throw Error("URL is required");
    }

    try {
      const urlObj = new URL(url);

      if (urlObj.href.trim().endsWith("/")) {
        url = url.slice(0, -1);
      }

      run(url);
    } catch (err) {
      handleError(err);
    }
  });

program.addCommand(post);
program.addCommand(get);
program.addCommand(put);
program.addCommand(del);

program.parse(process.argv);
