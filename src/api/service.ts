import instance, {
  type AxiosRequestConfig,
  type AxiosInstance,
  type CreateAxiosDefaults,
} from "axios";
import { spawnSync } from "bun";
import temp from "temp";
import fs from "node:fs";

class FetchService {
  axios: AxiosInstance;

  constructor(
    axios?: AxiosInstance | null,
    config?: CreateAxiosDefaults | null,
  ) {
    if (axios) {
      this.axios = axios;
    } else if (config) {
      this.axios = instance.create(config);
    } else {
      this.axios = instance;
    }
  }

  static create(axios?: AxiosInstance, config?: CreateAxiosDefaults) {
    const instance = new FetchService(axios, config);
    return Object.assign(instance.handler, instance);
  }

  handler = async (options: AxiosRequestConfig) => {
    const request_method = options.method?.toLowerCase() || "get";

    if (request_method in this) {
      return await this[request_method](options);
    }
  };

  get = async (options: AxiosRequestConfig) => {
    if (!options.url) throw Error("URL is required");

    const response = await this.axios.get(options.url, {
      ...options,
      method: "GET",
    });
    return response;
  };
  post = async (options: AxiosRequestConfig) => {
    if (!options.url) throw Error("URL is required");
    const tempFile = temp.openSync({ suffix: ".json" });

    spawnSync(["nvim", tempFile.path], {
      stdio: ["inherit", "inherit", "inherit"],
    });

    const output = fs.readFileSync(tempFile.path, "utf-8");
    temp.cleanupSync();

    const response = await this.axios.post(options.url, {
      ...options,
      data: JSON.parse(output),
    });
    return response;
  };
  put = async (options: AxiosRequestConfig) => {
    if (!options.url) throw Error("URL is required");

    const old = await this.get(options);

    const tempFile = temp.openSync({ suffix: ".json" });
    const stream = fs.createWriteStream(tempFile.path);
    stream.write(JSON.stringify(old.data, null, 2));
    stream.end();

    spawnSync(["nvim", tempFile.path], {
      stdio: ["inherit", "inherit", "inherit"],
    });

    const output = fs.readFileSync(tempFile.path, "utf-8");
    temp.cleanupSync();

    const response = await this.axios.put(options.url, {
      ...options,
      data: JSON.parse(output),
    });
    return response;
  };
  delete = async (options: AxiosRequestConfig) => {
    if (!options.url) throw Error("URL is required");

    const response = await this.axios.delete(options.url, options);
    return response;
  };
}

export default FetchService;
