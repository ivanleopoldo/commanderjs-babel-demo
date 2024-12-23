#!/usr/bin/env node

import { Argument, Command } from "@commander-js/extra-typings";
import { post } from "./commands";
import get from "./commands/get";
import put from "./commands/put";
import del from "./commands/delete";

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
    } catch (err) {
      console.error("Must be a valid URL");
    }
  });

program.addCommand(post);
program.addCommand(get);
program.addCommand(put);
program.addCommand(del);

program.parse(process.argv);
