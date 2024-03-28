import axios, { AxiosInstance } from "axios";

class Http {
  private static instance: AxiosInstance;

  static getInstance() {
    if (!Http.instance) {
      Http.instance = axios.create({
        baseURL: "https://timviecits.id.vn",
        timeout: 10000,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    return Http.instance;
  }
}

const http = Http.getInstance();

export default http;
