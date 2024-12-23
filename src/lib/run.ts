import instance from "axios";
import * as readline from "node:readline/promises";
import { handleError } from "@/utils/handlers";

export async function run(baseURL: string) {
  const axios = instance.create({ baseURL: baseURL });
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  while (true) {
    const request = await rl.question("");

    if (request) {
      try {
        const res = await axios(request);
        console.log(res.data);
      } catch (err) {
        handleError(err);
      }
    } else {
      break;
    }
  }

  rl.close();
}
