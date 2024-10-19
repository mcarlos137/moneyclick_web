import axios from "axios";
import config from "./config.js";
import headers from "./headers";
import _ from "underscore";
import HMACInterceptor from "../hmac/HMACInterceptor";
const URL_BASE_DBTC = config.apiDollarBtcUrl;
export default {
  createHeaders(url, body, method, attachment) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      "Admin",
      "f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
      "eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
      "SHA256"
    );
    let conf;
    if (method === "GET") {
      conf = headers.createHeadersGet(URL_BASE_DBTC, url);
    }
    if (method === "POST") {
      conf = headers.createHeadersPost(URL_BASE_DBTC, url, body, attachment);
    }
    if (method === "PUT") {
      if (body !== undefined) {
        conf = headers.createHeadersPut(URL_BASE_DBTC, url, body);
      } else {
        conf = headers.createHeadersPut(URL_BASE_DBTC, url);
      }
    }
    instance.interceptors.request.use(
      conf => {
        interceptor.process(conf);
        return conf;
      },
      error => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    return instance(conf);
  }
};
