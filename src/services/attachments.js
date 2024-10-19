import axios from "axios";
import config from "./config.js";
import HMACInterceptor from "../hmac/HMACInterceptor";
import headers from "./headers";
const URL_BASE_DBTC = config.apiDollarBtcUrl;

export default {
  async getAttachementByRetail(idRetail, nameFile) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      "Admin",
      "f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
      "eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
      "SHA256"
    );
    let conf = headers.createHeadersGet(
      URL_BASE_DBTC,
      config.urlDollar.getAttachmentRetail + idRetail + "/" + nameFile,
      true
    );
    instance.interceptors.request.use(
      conf => {
        interceptor.process(conf);
        return conf;
      },
      error => {
        return Promise.reject(error);
      }
    );
    const RESPONSE = await instance(conf);
    if (RESPONSE.status !== 200) {
      throw Error("Error in request");
    }
    return RESPONSE;
  },
  async getAttachementUser(username, fileName) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      "Admin",
      "f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
      "eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
      "SHA256"
    );
    let conf = headers.createHeadersGet(
      URL_BASE_DBTC,
      config.urlDollar.getAttachmentsUser + username + "/" + fileName,
      true
    );
    instance.interceptors.request.use(
      conf => {
        interceptor.process(conf);
        return conf;
      },
      error => {
        return Promise.reject(error);
      }
    );
    const RESPONSE = await instance(conf);
    if (RESPONSE.status !== 200) {
      throw Error("Error in request");
    }
    return RESPONSE;
  },
  async getQRGoogleAuth(username) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      "Admin",
      "f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
      "eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
      "SHA256"
    );
    let conf = headers.createHeadersGet(
      URL_BASE_DBTC,
      config.urlDollar.getQrAttachmentGoogleAuth + username,
      true
    );
    instance.interceptors.request.use(
      conf => {
        interceptor.process(conf);
        return conf;
      },
      error => {
        return Promise.reject(error);
      }
    );
    const RESPONSE = await instance(conf);
    if (RESPONSE.status !== 200) {
      throw Error("Error in request");
    }
    return RESPONSE;
  },
  async getOtcAttachment(otcOperaionId, fileName) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      "Admin",
      "f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
      "eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
      "SHA256"
    );
    let conf = headers.createHeadersGet(
      URL_BASE_DBTC,
      config.urlDollar.getOtcOperationFile + otcOperaionId + "/" + fileName,
      true
    );
    instance.interceptors.request.use(
      conf => {
        interceptor.process(conf);
        return conf;
      },
      error => {
        return Promise.reject(error);
      }
    );
    const RESPONSE = await instance(conf);
    if (RESPONSE.status !== 200) {
      throw Error("Error in request");
    }
    return RESPONSE;
  }
};
