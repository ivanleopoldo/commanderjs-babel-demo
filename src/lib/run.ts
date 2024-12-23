import instance from "axios";
import * as readline from "node:readline/promises";
import { handleError } from "@/utils/handlers";
import { requestSplitter } from "@/utils/helpers";

export async function run(baseURL: string) {
  const axios = instance.create({ baseURL: baseURL });
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  while (true) {
    const request = await rl.question("");
    const { type, endpoint } = requestSplitter(request);

    if (request) {
      try {
        const res = await axios(endpoint, {
          method: type,
        });
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
