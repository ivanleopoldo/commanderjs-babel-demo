#!/usr/bin/env node

import { Argument, Command } from "@commander-js/extra-typings";
import { post } from "./commands";

const program = new Command();

program
  .description("parent desc")
  .addArgument(new Argument("[name]"))
  .hook("preAction", (com) => {
    if (com.args.length === 0) {
      com.help();
    }
  })
  .action((name) => {
    console.log("parent ", name);
  });

program.addCommand(post);

program.parse(process.argv);
