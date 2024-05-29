import axios, { AxiosInstance } from "axios";

class Http {
  private static instance: AxiosInstance;

  static getInstance() {
    if (!Http.instance) {
      Http.instance = axios.create({
        baseURL: "https://timviecits.id.vn",
        timeout: 60000,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
    return Http.instance;
  }
}

const httpform = Http.getInstance();

class Http2 {
  private static instance: AxiosInstance;

  static getInstance() {
    if (!Http2.instance) {
      Http2.instance = axios.create({
        baseURL: "https://timviecits.id.vn",
        timeout: 60000,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    return Http2.instance;
  }
}

const httpjson = Http2.getInstance();

export default { httpform, httpjson };
