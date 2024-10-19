import axios from "axios";
import config from "./config";
import HMACInterceptor from "../hmac/HMACInterceptor";
import headers from "./headers";
import interceptorHeader from "./interceptor";
const URL_BASE_DBTC = config.apiDollarBtcUrl;

export default {
  getBalanceMoneyclick(username) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      "Admin",
      "f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
      "eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
      "SHA256"
    );
    let conf = headers.createHeadersGet(
      URL_BASE_DBTC,
      config.urlDollar.getBalanceMoneyclick + username
    );
    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        //console.log(error);
        return Promise.reject(error);
      }
    );
    return instance(conf);
  },
  async sendMoneyClick(
    targetUserName,
    currency,
    amount,
    description,
    targetName,
    international
  ) {
    let base = window.sessionStorage.getItem("firstName");
    let body = {
      baseUserName: window.sessionStorage.getItem("username"),
      baseName: base !== null && base !== "null" ? base : "",
      targetUserName: targetUserName,
      targetName: targetName,
      currency: currency,
      amount: amount,
      description: description,
      international: international,
    };
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      "Admin",
      "f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
      "eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
      "SHA256"
    );
    let conf = headers.createHeadersPost(
      URL_BASE_DBTC,
      config.urlDollar.sendMoneyClick,
      body
    );

    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    const response = await instance(conf);
    if (response.status !== 200) {
      throw Error("Error in request" + response.toString());
    }
    return response;
  },
  async sendBitcoins(body) {
    const RESPONSE = await interceptorHeader.createHeaders(
      config.urlDollar.userMcBalanceOperation,
      body,
      "POST"
    );
    if (RESPONSE.status !== 200) {
      throw Error("Error in get payment for currency");
    }
    return RESPONSE;
  },
  getAchievements() {
    return interceptorHeader.createHeaders(
      config.urlDollar.getAchievements,
      undefined,
      "GET"
    );
  },
};
