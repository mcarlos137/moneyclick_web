import axios from "axios";
import config from "./config.js";
import headers from "./headers";
import HMACInterceptor from "../hmac/HMACInterceptor";
import interceptorHeader from "./interceptor";
import user from "./user.js";
const URL_BASE_DBTC = config.apiDollarBtcUrl;
const URL_BASE_ORIFICIAL = "http://dollarbtc.ddns.net:8081";
export default {
	addPaymentStatus: false,
	getFinancialTypes(currency) { 
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.getFinancialTypes + currency,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},
	acceptOperationTermsAndConditions(idOperation) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.acceptOperationTermsAndConditions + idOperation,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},

	getAutomaticChatMessages(currency) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.getAutomaticChatMessages + currency + "/ES",
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},

	getOffers() {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.getOffers,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},
	/*getOffers() {
    return axios.get(URL_BASE_DBTC + config.urlDollar.getOffers);
  },*/
	getOffersByCurrency(currency) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.getOffers + "/" + currency,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},
	/*getOffersByCurrency(currency) {
    return axios.get(
      URL_BASE_DBTC + config.urlDollar.getOffers + "/" + currency
    );
  },*/
	async getOffersByCurrencyAsync(currency) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.getOffers + "/" + currency,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},
	/*async getOffersByCurrencyAsync(currency) {
    return await axios.get(
      URL_BASE_DBTC + config.urlDollar.getOffers + "/" + currency
    );
  },*/
	getOffersNewService(currency, id, operation, type) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.getOffers +
				"/" +
				currency +
				"/" +
				id +
				"/" +
				operation +
				"/" +
				type,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},

	getOffersFastChangeCurrentAccounts(currency, paymentId, paymentType) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.getOffers +
				"/" +
				currency +
				"/" +
				paymentId +
				"/" +
				paymentType,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},
	/*getOffersNewService(currency, id, operation, type) {
    ////console.log("getOffersNewService ", currency, id, operation, type);
    return axios.get(
      URL_BASE_DBTC +
        config.urlDollar.getOffers +
        "/" +
        currency +
        "/" +
        id +
        "/" +
        operation +
        "/" +
        type
    );
  },*/
	async getOffersNewServiceAsyn(currency, id, operation, type) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.getOffers +
				"/" +
				currency +
				"/" +
				id +
				"/" +
				operation +
				"/" +
				type,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},
	/*async getOffersNewServiceAsyn(currency, id, operation, type) {
    const RESPONSE = await axios.get(
      URL_BASE_DBTC +
        config.urlDollar.getOffers +
        "/" +
        currency +
        "/" +
        id +
        "/" +
        operation +
        "/" +
        type
    );
    if (RESPONSE.status !== 200) {
      throw Error("error in request");
    }
    return RESPONSE;
  },*/
	getPayments(moneda, username) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.getPayments + username + "/" + moneda,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},
	/*getPayments(moneda, username) {
    //  ////console.log(
    //  URL_BASE_DBTC + config.urlDollar.getPayments + username + "/" + moneda
    // );
    return axios.get(
      URL_BASE_DBTC + config.urlDollar.getPayments + username + "/" + moneda
    );
  },*/
	getPaymentTypes(moneda) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.getPaymentTypes + moneda,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},
	/*getPaymentTypes(moneda) {
    //  ////console.log(URL_BASE_DBTC + config.urlDollar.getPaymentTypes + moneda);
    return axios.get(URL_BASE_DBTC + config.urlDollar.getPaymentTypes + moneda);
  },*/
	getAllPaymentsTypes() {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.getClientPaymentTypes,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},
	adminGetBalance(profile) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.adminGetBalance + profile + "/true",
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},
	/* getAllPaymentsTypes() {
    return axios.get(URL_BASE_DBTC + config.urlDollar.getPaymentTypes);
	},*/
	getDollarBTCPaymentBalanceBankers(body) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersPost(
			URL_BASE_DBTC,
			config.urlDollar.getDollarBTCPaymentBalanceBankers,
			body,
		);

		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		// ////console.log("add payment body", body);
		return instance(conf);
		//return axios.post(URL_BASE_DBTC + config.urlDollar.addPayment, body);
	},
	getDollarBTCPaymentBalance(body) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersPost(
			URL_BASE_DBTC,
			config.urlDollar.getDollarBTCPaymentBalance,
			body,
		);

		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		// ////console.log("add payment body", body);
		return instance(conf);
		//return axios.post(URL_BASE_DBTC + config.urlDollar.addPayment, body);
	},
	modifyOperationCheckList(body) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersPost(
			URL_BASE_DBTC,
			config.urlDollar.modifyOperationCheckList,
			body,
		);

		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		// ////console.log("add payment body", body);
		return instance(conf);
		//return axios.post(URL_BASE_DBTC + config.urlDollar.addPayment, body);
	},
	getBalanceMovements(body) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersPost(
			URL_BASE_DBTC,
			config.urlDollar.getBalanceMovements,
			body,
		);

		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		// ////console.log("add payment body", body);
		return instance(conf);
		//return axios.post(URL_BASE_DBTC + config.urlDollar.addPayment, body);
	},
	getDollarBTCPaymentBalanceMovements(body) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersPost(
			URL_BASE_DBTC,
			config.urlDollar.getDollarBTCPaymentBalanceMovements,
			body,
		);

		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		// ////console.log("add payment body", body);
		return instance(conf);
		//return axios.post(URL_BASE_DBTC + config.urlDollar.addPayment, body);
	},
	async _getAllowedAddPayments(currency) {
		const username = sessionStorage.getItem("username");
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.getAllowedAddPayments + username + "/" + currency,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);

		return instance(conf);
	},
	addPayment(body) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersPost(
			URL_BASE_DBTC,
			config.urlDollar.addPayment,
			body,
		);

		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		// ////console.log("add payment body", body);
		return instance(conf);
		//return axios.post(URL_BASE_DBTC + config.urlDollar.addPayment, body);
	},

	createOperation(body) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersPost(
			URL_BASE_DBTC,
			config.urlDollar.createOperation,
			body,
		);

		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		return instance(conf);
		/*return axios
      .post(URL_BASE_DBTC + config.urlDollar.createOperation, body)
      .then(res => {
        return res;
      })
      .catch(error => {
        ////console.log(error);
      });*/
	},
	getOperations(bodyGetOperations) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersPost(
			URL_BASE_DBTC,
			config.urlDollar.getOperations,
			bodyGetOperations,
		);

		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},
	/*getOperations(bodyGetOperations) {
    ////console.log("bodyGetOperations :", bodyGetOperations);
    return axios.post(
      URL_BASE_DBTC + config.urlDollar.getOperations,
      bodyGetOperations
    );
  },*/
	getOperation(idOperation) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.getOperation + idOperation,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);

		return instance(conf);
	},
	/*getOperation(idOperation) {
    return axios.get(
      URL_BASE_DBTC + config.urlDollar.getOperation + idOperation
    );
  },*/
	getContactMessages(idOperation) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.getContactMessages + idOperation,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},
	/*getContactMessages(idOperation) {
    //  ////console.log(
    //  URL_BASE_DBTC + config.urlDollar.getContactMessages + idOperation
    // );
    return axios.get(
      URL_BASE_DBTC + config.urlDollar.getContactMessages + idOperation
    );
  },*/
	getUserTypePayments() {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.getPayments + sessionStorage.getItem("username"),
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},
	/*getUserTypePayments() {
    let resp = axios
      .get(
        URL_BASE_DBTC +
          config.urlDollar.getPayments +
          sessionStorage.getItem("username")
      )
      .then(res => {
        return res;
      });
    return resp;
  },*/
	getStatusAddPayment() {
		return this.addPaymentStatus;
	},
	addPostOperationMessageSimple(idOperation, message) {
		let msg = message.replace(/ /g, "_");
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.postOperationMessage +
				idOperation +
				"/" +
				sessionStorage.getItem("username") +
				"/" +
				msg,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},

	addPostOperationMessageWithFile(formData) {
		let url = URL_BASE_DBTC + config.urlDollar.otcPostOperationMessage;
		// ////console.log(url);
		const configuration = {
			headers: {
				"content-type": "multipart/form-data",
			},
		};
		return axios.post(url, formData, configuration);
	},
	deletePaymentUser(currency, id) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.removePayment +
				sessionStorage.getItem("username") +
				"/" +
				currency +
				"/" +
				id,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},
	/* deletePaymentUser(currency, id) {
    let url =
      URL_BASE_DBTC +
      config.urlDollar.removePayment +
      sessionStorage.getItem("username") +
      "/" +
      currency +
      "/" +
      id;
    return axios.get(url);
  },*/
	async changeOperationStatus(body) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersPost(
			URL_BASE_DBTC,
			config.urlDollar.changeOperationStatus,
			body,
		);

		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		return await instance(conf);
		const url = URL_BASE_DBTC + config.urlDollar.changeOperationStatus;
		//return await axios.post(url, body);
	},
	getClientPaymentTypes(currency) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.getClientPaymentTypes + currency,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},

	getClientPaymentTypeForCurrency(currency) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.getClientPaymentTypes + currency,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},
	getClientPaymentById(username, idPayment) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.getClientPayment + username + "/" + idPayment,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},
	getClientPayment(idPayment) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.getClientPayment +
				sessionStorage.getItem("username") +
				"/" +
				idPayment,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},
	/*getClientPayment(idPayment) {
    return axios.get(
      URL_BASE_DBTC +
        config.urlDollar.getClientPayment +
        sessionStorage.getItem("email") +
        "/" +
        idPayment
    );
  },*/
	getCurrencies() {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.getCurrencies,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		return instance(conf);
		//return axios.get(URL_BASE_DBTC + config.urlDollar.getCurrencies);
	},
	getCurrenciesBankers(username) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.getCurrenciesBankers + username,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		return instance(conf);
		//return axios.get(URL_BASE_DBTC + config.urlDollar.getCurrencies);
	},
	getAdminCurrencies(username) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.getCurrenciesUser + username,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		return instance(conf);
		//return axios.get(URL_BASE_DBTC + config.urlDollar.getCurrencies);
	},

	getTestHmac() {
		let instance = axios.create();
		let conf = headers.createHeadersGet(URL_BASE_DBTC, "/test/get");
		//////console.log(conf);
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},

	postTestHmac(body) {
		let instance = axios.create();
		let conf = headers.createHeadersPost(URL_BASE_DBTC, "/test/post", body);
		//////console.log(conf);
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},
	getCurrenciesOperator(email) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.getCurrenciesUser + email,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},

	updateCurrenciesToUser(body) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersPost(
			URL_BASE_DBTC,
			config.urlDollar.editCurrenciesUser,
			body,
		);

		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},

	getDollarBTCPayment(currency, id) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.getDollarBTCPayment + currency + "/" + id,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},

	getBalancesNull() {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		var url = URL_BASE_DBTC + config.urlDollar.getBalances;
		let conf = headers.createHeadersGet(url);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},
	getBalances(masterAccount) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		var url =
			URL_BASE_DBTC + config.urlDollar.getBalances + "/" + masterAccount;
		let conf = headers.createHeadersGet(url);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},

	getNames() {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		var url = URL_BASE_DBTC + config.urlDollar.getNames;
		let conf = headers.createHeadersGet(url);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},
	getAutomaticRules() {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		var url = URL_BASE_DBTC + config.urlDollar.getAutomaticRules;
		let conf = headers.createHeadersGet(url);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},
	getDetails() {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		var url = URL_BASE_DBTC + config.urlDollar.getDetails;
		let conf = headers.createHeadersGet(url);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},

	getLimitsOfOperations() {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.getLimits,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},
	getOperationIndexesAndValues() {
		return interceptorHeader.createHeaders(
			config.urlDollar.getOperationIndexesAndValues,
			undefined,
			"GET",
		);
	},
	getOperationIndexesAndValuesBankers(username) {
		return interceptorHeader.createHeaders(
			config.urlDollar.getOperationIndexesAndValuesBankers + username,
			undefined,
			"GET",
		);
	},
	getOperationsFilterAdmin(body) {
		return interceptorHeader.createHeaders(
			config.urlDollar.getOperationsFilterAdmin,
			body,
			"POST",
		);
	},
	getOperationsNewBankers(body) {
		return interceptorHeader.createHeaders(
			config.urlDollar.getOperationsNewBankers,
			body,
			"POST",
		);
	},
	getSpecialPayments(username) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.getSpecialPayments + username,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},
	async getOfficesInfoOtc(currency, officeId) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.getOfficessInfoByBank + currency + "/" + officeId,
		);

		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		const RESPONSE = await instance(conf);
		if (RESPONSE.status !== 200) {
			throw Error("Error in reques");
		}
		return RESPONSE;
	},
	async getOperationAsync(idOperation) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.getOperation + idOperation,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				////console.log(error);
				return Promise.reject(error);
			},
		);
		const RESPONSE = await instance(conf);
		if (RESPONSE.status !== 200) {
			throw Error("error in request");
		}
		return RESPONSE;
	},
	async getOrdersCurrencys(username) {
		const RESPONSE = await interceptorHeader.createHeaders(
			config.urlDollar.getOrdersCurrency + username,
			undefined,
			"GET",
			10000,
		);
		if (RESPONSE.status !== 200) {
			throw Error("Error in get currencies from otc dollarBTC");
		}
		return RESPONSE;
	},
	async _getAllChargues() {
		const RESPONSE = await interceptorHeader.createHeaders(
			config.urlDollar.getNewCharges,
			undefined,
			"GET",
		);

		if (RESPONSE.status !== 200) {
			throw Error("Error in get currencies from otc dollarBTC");
		}
		return RESPONSE;
	},
	async _getAllCharguesNew() {
		const RESPONSE = await interceptorHeader.createHeaders(
			config.urlDollar.getNewCharges,
			undefined,
			"GET",
		);

		if (RESPONSE.status !== 200) {
			throw Error("Error in get currencies from otc dollarBTC");
		}
		return RESPONSE;
	},
	getReviewPerOperation(operation) {
		return interceptorHeader.createHeaders(
			config.urlDollar.getReviewPerOperation + operation,
			undefined,
			"GET",
		);
	},
	getPaymentsAdmin(username, currency) {
		let url;
		if (currency !== undefined) {
			url = config.urlDollar.getPaymentsAdmin + username + "/" + currency;
		} else {
			url = config.urlDollar.getPaymentsAdmin + username;
		}
		return interceptorHeader.createHeaders(url, undefined, "GET");
	},
	getPaymentsBankers(username, currency, id) {
		let url;
		//	if (currency !== undefined && id !== undefined) {
		url =
			config.urlDollar.getDollarBTCPaymentsBankers +
			username +
			"/" +
			currency +
			"/" +
			id;
		//}

		//  else {
		// 	url = config.urlDollar.getDollarBTCPaymentBankers + username ;
		// }
		return interceptorHeader.createHeaders(url, undefined, "GET");
	},

	getOperationCheckList(currency, operationType, status) {
		return interceptorHeader.createHeaders(
			config.urlDollar.getOperationCheckList +
				currency +
				"/" +
				operationType +
				"/" +
				status,
			undefined,
			"GET",
		);
	},
	getAutomaticChatMessagesOperation(
		currency,
		otcOperationType,
		otcOperationStatus,
	) {
		return interceptorHeader.createHeaders(
			config.urlDollar.getAutomaticChatMessages +
				currency +
				"/ES/" +
				otcOperationType +
				"/" +
				otcOperationStatus,
			undefined,
			"GET",
		);
	},
	getMasterAccount(username) {
		return interceptorHeader.createHeaders(
			config.urlDollar.getOTCMasterAccountNames + username,
			undefined,
			"GET",
		);
	},
	getOTCAccountsBalance(username) {
		return interceptorHeader.createHeaders(
			config.urlDollar.getOTCMasterAccountBalances + username,
			undefined,
			"GET",
		);
	},
	getOTCMasterAccountProfitsAndChargesBalance(body) {
		return interceptorHeader.createHeaders(
			config.urlDollar.getOTCMasterAccountProfitsAndChargesBalance,
			body,
			"POST",
		);
	},
	async transferBetweenDollarBTCPaymentsBankers(body) {
		const RESPONSE = await interceptorHeader.createHeaders(
			config.urlDollar.transferBetweenDollarBTCPaymentsBankers,
			body,
			"POST",
		);

		if (RESPONSE.status !== 200) {
			throw Error("Error in get currencies from otc dollarBTC");
		}
		return RESPONSE;
	},
	getReviewPerOperation(operation) {
		return interceptorHeader.createHeaders(
			config.urlDollar.getReviewPerOperation + operation,
			undefined,
			"GET",
		);
	},
	getPaymentsAdmin(username, currency) {
		let url;
		if (currency !== undefined) {
			url = config.urlDollar.getPaymentsAdmin + username + "/" + currency;
		} else {
			url = config.urlDollar.getPaymentsAdmin + username;
		}
		return interceptorHeader.createHeaders(url, undefined, "GET");
	},
	getPaymentsBankers(username, currency) {
		let url;
		if (currency !== undefined) {
			url =
				config.urlDollar.getDollarBTCPaymentsBankers +
				username +
				"/" +
				currency;
		} else {
			url = config.urlDollar.getDollarBTCPaymentBankers + username;
		}
		return interceptorHeader.createHeaders(url, undefined, "GET");
	},
	getOperationCheckList(currency, operationType, status) {
		return interceptorHeader.createHeaders(
			config.urlDollar.getOperationCheckList +
				currency +
				"/" +
				operationType +
				"/" +
				status,
			undefined,
			"GET",
		);
	},
	getAutomaticChatMessagesOperation(
		currency,
		otcOperationType,
		otcOperationStatus,
	) {
		return interceptorHeader.createHeaders(
			config.urlDollar.getAutomaticChatMessages +
				currency +
				"/ES/" +
				otcOperationType +
				"/" +
				otcOperationStatus,
			undefined,
			"GET",
		);
	},
	getMasterAccount(username) {
		return interceptorHeader.createHeaders(
			config.urlDollar.getOTCMasterAccountNames + username,
			undefined,
			"GET",
		);
	},
	getOTCAccountsBalance(username) {
		return interceptorHeader.createHeaders(
			config.urlDollar.getOTCMasterAccountBalances + username,
			undefined,
			"GET",
		);
	},
	getOTCMasterAccountProfitsAndChargesBalance(body) {
		return interceptorHeader.createHeaders(
			config.urlDollar.getOTCMasterAccountProfitsAndChargesBalance,
			body,
			"POST",
		);
	},
	async transferBetweenDollarBTCPaymentsBankers(body) {
		const RESPONSE = await interceptorHeader.createHeaders(
			config.urlDollar.transferBetweenDollarBTCPaymentsBankers,
			body,
			"POST",
		);

		if (RESPONSE.status !== 200) {
			throw Error("error in request");
		}
		return RESPONSE;
	},
	removeCurrencyBankers(currency) {
		//no se usa aun
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.removeCurrencyBankers +
				sessionStorage.getItem("username") +
				"/" +
				currency,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},
	editDollarBTCPaymentBankers(body) {
		return interceptorHeader.createHeaders(
			config.urlDollar.editDollarBTCPaymentBankers,
			body,
			"POST",
		);
	},
	async substractBalanceToDollarBTCPaymentBankers(body) {
		const RESPONSE = await interceptorHeader.createHeaders(
			config.urlDollar.substractBalanceToDollarBTCPaymentBankers,
			body,
			"POST",
		);
		if (RESPONSE.status !== 200) {
			throw Error("Error in susbstract balance");
		}
		return RESPONSE;
	},
	addBalanceToDollarBTCPaymentBankers(body) {
		return interceptorHeader.createHeaders(
			config.urlDollar.addBalanceToDollarBTCPaymentBankers,
			body,
			"POST",
		);
	},
	async sellBtcWithOtcAccount(body) {
		const RESPONSE = await interceptorHeader.createHeaders(
			config.urlDollar.sellBitcoinToOtcAccount,
			body,
			"POST",
		);

		if (RESPONSE.status !== 200) {
			throw Error("error in request");
		}
		return RESPONSE;
	},
	async buyBtcWithPayment(body) {
		const RESPONSE = await interceptorHeader.createHeaders(
			config.urlDollar.buyBitcoinToOtcAccount,
			body,
			"POST",
		);

		if (RESPONSE.status !== 200) {
			throw Error("error in request");
		}
		return RESPONSE;
	},

	addDollarBTCPaymentBankers(body) {
		return interceptorHeader.createHeaders(
			config.urlDollar.addDollarBTCPaymentBankers,
			body,
			"POST",
		);
	},
	getOperationsAdmin(body) {
		return interceptorHeader.createHeaders(
			config.urlDollar.getOperationsAdmin,
			body,
			"POST",
		);
	},
	getOperationsBankers(body) {
		return interceptorHeader.createHeaders(
			config.urlDollar.getOperationsBankers,
			body,
			"POST",
		);
	},
	async changeOperationStatusBuyBalance(body) {
		return await interceptorHeader.createHeaders(
			config.urlDollar.changeOperationStatusBuyBalance,
			body,
			"POST",
		);
	},
	async getChargesSpecifit(body) {
		return await interceptorHeader.createHeaders(
			config.urlDollar.getCharges,
			body,
			"POST",
		);
	},

	getDollarBTCPaymentBalanceMovementsBankers(body) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersPost(
			URL_BASE_DBTC,
			config.urlDollar.getDollarBTCPaymentBalanceMovementsBankers,
			body,
		);

		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},

	addCurrencyBanker(currency) {
		//no se usa aun
		return interceptorHeader.createHeaders(
			config.urlDollar.addCurrencyBanker +
				sessionStorage.getItem("username") +
				"/" +
				currency,
			undefined,
			"GET",
		);
	},
	async changeOperationStatusBanker(body) {
		return await interceptorHeader.createHeaders(
			config.urlDollar.changeOperationStatusBanker,
			body,
			"POST",
		);
	},
	getOperationBankerId(id) {
		//no se usa aun
		return interceptorHeader.createHeaders(
			config.urlDollar.getOperationBankerId + user.getUserName() + "/" + id,
			undefined,
			"GET",
		);
	},
	addScrow(body) {
		return interceptorHeader.createHeaders(
			config.urlDollar.addScrow,
			body,
			"PUT",
		);
	},
	removeScrow(body) {
		return interceptorHeader.createHeaders(
			config.urlDollar.removeScrow,
			body,
			"PUT",
		);
	},

	getScrowBalance(userr) {
		return interceptorHeader.createHeaders(
			config.urlDollar.getScrowBalance + userr,
			undefined,
			"GET",
		);
	},

	getScrowMovements(userName, currency, initTimestamp, finalTimestamp) {
		var dateEndNew = new Date(finalTimestamp).getTime() + 100800000;
		dateEndNew = new Date(dateEndNew);
		var dateInitNew = new Date(initTimestamp).getTime() + 14400000;
		dateInitNew = new Date(dateInitNew);

		return interceptorHeader.createHeaders(
			config.urlDollar.getScrowMovements +
				userName +
				"/" +
				currency +
				"/" +
				dateInitNew.toISOString() +
				"/" +
				dateEndNew.toISOString(),
			undefined,
			"GET",
		);
	},
	async _getAllCharguesNewPost(body) {
		const RESPONSE = await interceptorHeader.createHeaders(
			config.urlDollar.getNewCharges,
			body,
			"POST",
		);
		if (RESPONSE.status !== 200) {
			throw Error("error in request");
		}
		return RESPONSE;
	},

	async _getCryptoBuyAvailableTimestamp(currency, date) {
		
		return interceptorHeader.createHeaders(
			config.urlDollar.getCryptoBuyAvailableTimestamp +
				currency +
				"/" +
				date
			,
			undefined,
			"GET",
		);
	}
};
