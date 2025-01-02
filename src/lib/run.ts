import instance from "axios";
import { requestSplitter } from "@/utils/helpers";
import chalk from "chalk";
import fs from "fs";
import { spawn } from "bun";
import temp from "temp";

export async function run(baseURL: string) {
  const axios = instance.create({ baseURL: baseURL });

  console.log("Base URL: ", baseURL);
  while (true) {
    const line = prompt(">");

    if (!line) return;

    const { type, endpoint, body } = requestSplitter(line);
    console.log(
      chalk.green(type) +
        ` ${endpoint}` +
        (body ? `\n${JSON.stringify(body, null, 2)}` : ""),
    );
    if (type === "POST") {
      const tempFile = temp.openSync({ suffix: ".json" });

      const proc = spawn(["nvim", tempFile.path], {
        stdio: ["inherit", "inherit", "inherit"],
      });

      await proc.exited;
      const output = fs.readFileSync(tempFile.path, "utf-8");
      temp.cleanupSync();
      const response = await axios.post(endpoint, JSON.parse(output));
      console.log(response.data);
    } else if (type === "GET") {
      const response = await axios.get(endpoint);
      console.log(response.data);
    }
  }
}
