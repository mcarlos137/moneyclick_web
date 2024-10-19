import React, { Component } from "react";
import "../OTC.css";
import {
	Menu,
	Segment,
	Container,
	Form,
	Button,
	Select,
	Input,
	Icon,
	Message,
	Flag,
	Dimmer,
	Loader,
	Popup,
	Modal,
	Feed,
	Grid,
	TextArea,
	Divider,
	Label,
	Header,
	Image,
	Checkbox,
	List,
	Dropdown,
} from "semantic-ui-react";
import attachmentimg from "../../../img/icn-adjuntar.png";
import ReactTable from "react-table";
import config from "../../../services/config";
import otc from "../../../services/otc";
import axios from "axios";
import moment from "moment";
import avatarNull from "../../../img/avatarNull.png";
import Sockette from "sockette";
import userService from "../../../services/user";
import NumberFormat from "react-number-format";
import uuid from "uuid";
import translate from "../../../i18n/translate";
import _ from "underscore";
import Countdown from "react-countdown-now";
import ISOCURRENCIES from "../../../common/ISO4217";
import * as jsPDF from "jspdf";
import attachments from "../../../services/attachments";
import { Document, Page } from "react-pdf";
const URL_BASE_DBTC = config.apiDollarBtcUrl;
const URL_WEBSOCKET_DBTC = config.webSocketsDBTC;
class ActualOperations extends Component {
	constructor(props) {
		super(props);
		this.state = {
			translator: props.translate,
			operationsTable: [],
			dateFrom: null,
			dateTo: null,
			showOperationsTable: false,
			showUserVerifi: false,
			messageToSend: "",
			langOld: window.sessionStorage.getItem("language"),
			socket: null,
			oldOperationsMessages: [],
			expandedRow: null,
			showOperationMessages: false,
			viewButton: false,
			key: Math.random(),
			selectedFile: null,
			keyFile: Math.random(),
			loadingSendButton: false,
			modalChangeStatus: false,
			idToChangeStatus: "",
			currencyToChangeStatus: "",
			usernameToChangeStatus: "",
			createdFromMCSend: "",
			operationTypeToChangeStatus: "",
			flagToChangeStatus: "",
			statusToChangeStatus: "",
			selectStatusChange: [],
			statusToAdd: "",
			expanded: {},
			allMessagesSocket: null,
			identityURLToVerify: null,
			bankURLToVerify: null,
			selfURLToVerify: null,
			locationURLToVerify: null,
			identityVerificationMcURLToVerify: null,
			selfieVerificationMcURLToVerify: null,
			idsNewMessageIcon: [],
			newIdMessage: false,
			paymentMethods: null,
			selectCurrencyPaymentMethodsAllowed: [],
			paymentMethodToChange: "",
			loadModal: false,
			cancellationReason: "",
			fail: false,
			failnegative: false,
			showMessageCanc: true,
			message: "",
			keyFormChangeStatus: Math.random(),
			loadChangeStatus: false,
			typePaidToChangeStatus: "",
			paymentInfoToChangeStatus: "",
			loadingNewFile: false,
			usernameToSearch: null,
			currencyToSearch: null,
			paymentTypeToSearch: {},
			fieldNames: [],
			OTCOperationTypeToSearch: null,
			OTCOperationStatusToSearch: null,
			currenciesToSearch: [],
			usernamesToSearch: [],
			OTCOperationTypesToSearch: [],
			OTCOperationStatusesToSearch: [],
			paymentTypesToSearch: [],
			automaticMessagesToShow: [],
			sendingAutomaticMessage: false,
			userDetailModal: false,
			searchLoad: false,
			userInfo: {},
			userVerifi: {},
			walletUser: "",
			requirementsChecklist: [],
			checklistReady: false,
			automaticMessageReady: false,
			loadUpdateChecklist: false,
			modalNoPaymentForThisCurrency: false,
			timeForOperationInMiliseconds: 0,
			localDateInMiliseconds: 0,
			expandedUserVerificationStatus: null,
			modalEditUser: false,
			modalRemoveUser: false,
			activeItemEditUser: "addData",
			toEditDataName: null,
			toEditDataValue: null,
			addDataFormKey: Math.random(),
			failAddInfo: false,
			messageAddInfo: "",
			loadEditUser: false,
			loadRemoveUser: false,
			dataNameToEditOptions: [],
			otherDocumentsToShow: [],
			userVerificationLoadingNewFile: false,
			userVerificationSelectedFile: null,
			detailRemoveVerifi: false,
			failRemoveVerifi: false,
			failRemoveVerifierror: false,
			errorInRed: false,
			userKeyFile: Math.random(),
			genderOptions: [
				{ key: "male", value: "male", text: "Masculino" },
				{ key: "female", value: "female", text: "Femenino" },
			],
			documentTypeOptions: [
				{ key: "dni", value: "dni", text: "DNI" },
				{ key: "id", value: "id", text: "ID" },
				{ key: "cedula", value: "cedula", text: "Cédula" },
				{ key: "passport", value: "passport", text: "Pasaporte" },
				{ key: "other", value: "other", text: "Otro" },
			],
			deleteClientPaymentCheck: false,
			dataPdfOperation: [],
			dataToPdf: [],
			showStatusVerify: false,
		};
		this.typeOperation = React.createRef();
		this._isMounted = false;
	}
	componentWillReceiveProps(nextProps, nextContext) {
		if (this.props.language !== nextProps.language) {
			this.setState({
				translator: nextProps.translate,
			});
		}
	}
	handleReason(e, data) {
		this.setState({ cancellationReason: data.value });
	}
	getActualUserInfo = (allInfo) => {
		var listKeys = Object.keys(allInfo);
		var listActualKeys = [];
		var actualfirstNameKey;
		var actualLastnameKey;
		var actualPhoneKey;
		var actualQuestionSecurityKey;
		var actualAnswerSecurityKey;
		var actualTypeDocumentIdentityKey;
		var actualNumberDocumentIdentityKey;
		var actualGenderKey;
		var actualBirthdateKey;
		var actualBirthplaceKey;
		var actualFamilyNameKey;
		var actualFamilyEmailKey;
		var actualUserLocalBitcoinKey;
		var actualUserFacebookKey;
		var actualUserAddressKey;
		var otherKeys = [];
		var actualNickName;
		var actualCompanyName,
			actualCompanyTypeOfFiscalRecord,
			actualCompanyNumberOfFiscalRecord,
			actualCompanyYearRegistration;
		var isACompany = false;
		var mcWallets, wallets;
		for (var i = 0; i < listKeys.length; i++) {
			if (listKeys[i] === "company") {
				isACompany = true;
			}
			if (listKeys[i].startsWith("firstName")) {
				actualfirstNameKey = listKeys[i];
			} else if (listKeys[i].startsWith("lastName")) {
				actualLastnameKey = listKeys[i];
			} else if (listKeys[i].startsWith("phone")) {
				actualPhoneKey = listKeys[i];
			} else if (listKeys[i].startsWith("questionSecurity")) {
				actualQuestionSecurityKey = listKeys[i];
			} else if (listKeys[i].startsWith("answerSecurity")) {
				actualAnswerSecurityKey = listKeys[i];
			} else if (listKeys[i].startsWith("typeDocumentIdentity")) {
				actualTypeDocumentIdentityKey = listKeys[i];
			} else if (listKeys[i].startsWith("numberDocumentIdentity")) {
				actualNumberDocumentIdentityKey = listKeys[i];
			} else if (listKeys[i].startsWith("gender")) {
				actualGenderKey = listKeys[i];
			} else if (listKeys[i].startsWith("birthdate")) {
				actualBirthdateKey = listKeys[i];
			} else if (listKeys[i].startsWith("birthplace")) {
				actualBirthplaceKey = listKeys[i];
			} else if (listKeys[i].startsWith("familyName")) {
				actualFamilyNameKey = listKeys[i];
			} else if (listKeys[i].startsWith("familyEmail")) {
				actualFamilyEmailKey = listKeys[i];
			} else if (listKeys[i].startsWith("userLocalBitcoin")) {
				actualUserLocalBitcoinKey = listKeys[i];
			} else if (listKeys[i].startsWith("userFacebook")) {
				actualUserFacebookKey = listKeys[i];
			} else if (listKeys[i].startsWith("userDirection")) {
				actualUserAddressKey = listKeys[i];
			} else if (listKeys[i].startsWith("nickname")) {
				actualNickName = listKeys[i];
			} else if (listKeys[i].startsWith("companyName")) {
				actualCompanyName = listKeys[i];
			} else if (listKeys[i].startsWith("companyTypeOfFiscalRecord")) {
				actualCompanyTypeOfFiscalRecord = listKeys[i];
			} else if (listKeys[i].startsWith("companyNumberOfFiscalRecord")) {
				actualCompanyNumberOfFiscalRecord = listKeys[i];
			} else if (listKeys[i].startsWith("companyYearRegistration")) {
				actualCompanyYearRegistration = listKeys[i];
			} else if (listKeys[i].startsWith("mcWallets")) {
				mcWallets = listKeys[i];
			} else if (listKeys[i].startsWith("wallets")) {
				wallets = listKeys[i];
			} else if (
				listKeys[i] !== "name" &&
				listKeys[i] !== "masterWalletIds" &&
				listKeys[i] !== "verification" &&
				!listKeys[i].endsWith("URL") &&
				listKeys[i] !== "company"
			) {
				otherKeys.push(listKeys[i]);
			}
		}
		listActualKeys.push(
			actualfirstNameKey,
			actualLastnameKey,
			actualPhoneKey,
			actualQuestionSecurityKey,
			actualAnswerSecurityKey,
			actualTypeDocumentIdentityKey,
			actualNumberDocumentIdentityKey,
			actualGenderKey,
			actualBirthdateKey,
			actualBirthplaceKey,
			actualFamilyNameKey,
			actualFamilyEmailKey,
			actualUserLocalBitcoinKey,
			actualUserFacebookKey,
			actualUserAddressKey,
			actualNickName,
			actualCompanyName,
			actualCompanyTypeOfFiscalRecord,
			actualCompanyNumberOfFiscalRecord,
			actualCompanyYearRegistration,
			"address",
			"operationAccount",
			"environment",
			"type",
			"active",
			"email",
			"mcWallets",
			"wallets",
		);
		var allKeys = listActualKeys.concat(otherKeys);
		var modifiedObj = _.pick(allInfo, [allKeys]);
		var normalizeObject = { other: [] };
		Object.entries(modifiedObj).forEach(([key, value]) => {
			if (key.startsWith("firstName")) {
				normalizeObject.firstName = value;
			} else if (key.startsWith("lastName")) {
				normalizeObject.lastName = value;
			} else if (key.startsWith("email")) {
				normalizeObject.email = value;
			} else if (key.startsWith("active")) {
				normalizeObject.active = value;
			} else if (key === "type") {
				normalizeObject.type = value;
			} else if (key.startsWith("environment")) {
				normalizeObject.environment = value;
			} else if (key.startsWith("operationAccount")) {
				normalizeObject.operationAccount = value;
			} else if (key.startsWith("address")) {
				normalizeObject.address = value;
			} else if (key.startsWith("questionSecurity")) {
				normalizeObject.questionSecurity = value;
			} else if (key.startsWith("answerSecurity")) {
				normalizeObject.answerSecurity = value;
			} else if (key.startsWith("typeDocumentIdentity")) {
				normalizeObject.typeDocumentIdentity = value;
			} else if (key.startsWith("numberDocumentIdentity")) {
				normalizeObject.numberDocumentIdentity = value;
			} else if (key.startsWith("gender")) {
				normalizeObject.gender = value;
			} else if (key.startsWith("birthdate")) {
				normalizeObject.birthdate = value;
			} else if (key.startsWith("birthplace")) {
				normalizeObject.birthplace = value;
			} else if (key.startsWith("familyName")) {
				normalizeObject.familyName = value;
			} else if (key.startsWith("familyEmail")) {
				normalizeObject.familyEmail = value;
			} else if (key.startsWith("userLocalBitcoin")) {
				normalizeObject.userLocalBitcoin = value;
			} else if (key.startsWith("userFacebook")) {
				normalizeObject.userFacebook = value;
			} else if (key.startsWith("userDirection")) {
				normalizeObject.userDirection = value;
			} else if (key.startsWith("phone")) {
				normalizeObject.phone = value;
			} else if (key.startsWith("nickname")) {
				normalizeObject.nickname = value;
			} else if (key.startsWith("companyName")) {
				normalizeObject.companyName = value;
			} else if (key.startsWith("companyTypeOfFiscalRecord")) {
				normalizeObject.companyTypeOfFiscalRecord = value;
			} else if (key.startsWith("companyNumberOfFiscalRecord")) {
				normalizeObject.companyNumberOfFiscalRecord = value;
			} else if (key.startsWith("companyYearRegistration")) {
				normalizeObject.companyYearRegistration = value;
			} else if (key.startsWith("mcWallets")) {
				normalizeObject.mcWallets = value;
			} else if (key.startsWith("wallets")) {
				normalizeObject.wallets = value;
			} else if (!key.startsWith("paymentId")) {
				normalizeObject.other.push({ dataName: key, dataValue: value });
			}
		});
		normalizeObject.isACompany = isACompany;
		return normalizeObject;
	};
	closeUserDetailModal = () => {
		this.setState({ userDetailModal: false });
	};
	closeNoPaymentForThisCurrencyModal = () => {
		this.setState({ modalNoPaymentForThisCurrency: false });
	};
	checkRequirement = (e, data) => {
		var labelValue = data.label;
		var checkedValue = data.checked;
		var objectToSet = this.state.requirementsChecklist;
		for (var i = 0; i < objectToSet.length; i++) {
			if (objectToSet[i].label === labelValue) {
				objectToSet[i].checked = checkedValue;
				break;
			}
		}
		this.setState(
			{ requirementsChecklist: objectToSet },
			this.updateChecklist(),
		);
	};
	checkDeleteClientPayment = (e, data) => {
		this.setState({ deleteClientPaymentCheck: data.checked });
	};
	openUserDetailModal = (user) => {
		this.getUserConfig(user);
		this.setState({
			userDetailModal: true,
		});
	};
	arraysEqual = (a, b) => {
		if (a === b) return true;
		if (a == null || b == null) return false;
		if (a.length !== b.length) return false;
		for (var i = 0; i < a.length; ++i) {
			if (a[i] !== b[i]) return false;
		}
		return true;
	};
	// getChecklist = (oldChecklist, currency, operationType, status) => {
	// 	this.setState({ requirementsChecklist: [] });
	// 	if (operationType === "COMPRA") {
	// 		operationType = "BUY";
	// 	} else if (operationType === "VENTA") {
	// 		operationType = "SELL";
	// 	} else if (operationType === "ENVIO A MEDIO DE PAGO") {
	// 		operationType = "SEND_TO_PAYMENT";
	// 	} else if ("RECARGA DE SALDO") {
	// 		operationType = "MC_BUY_BALANCE";
	// 	}
	// 	/*var url =
	//     URL_BASE_DBTC +
	//     "/otc/getOperationCheckList/" +
	//     currency +
	//     "/" +
	//     operationType +
	//     "/" +
	//     status;*/
	// 	let url = otc.getOperationCheckList(currency, operationType, status); //REVISAR
	// 	if (oldChecklist !== undefined) {
	// 		var result = Object.keys(oldChecklist).map(function (key) {
	// 			return { label: key, checked: oldChecklist[key] };
	// 		});
	// 		url
	// 			.then((resp) => {
	// 				var resultCompareLabel = [];
	// 				resp.data.map(function (key) {
	// 					return resultCompareLabel.push(key);
	// 				});
	// 				var oldChecklistCompareLabel = [];
	// 				for (var i = 0; i < result.length; i++) {
	// 					oldChecklistCompareLabel.push(result[i].label);
	// 				}
	// 				var areEquals = this.arraysEqual(
	// 					resultCompareLabel,
	// 					oldChecklistCompareLabel,
	// 				);
	// 				if (!areEquals) {
	// 					result = resp.data.map(function (key) {
	// 						return { label: key, checked: false };
	// 					});
	// 				}
	// 				this.setState(
	// 					{
	// 						requirementsChecklist: result,
	// 					},
	// 					this.setState({ checklistReady: true }),
	// 				);
	// 			})
	// 			.catch((error) => {
	// 				this.setState({ checklistReady: true });
	// 			});
	// 	} else {
	// 		url
	// 			.then((resp) => {
	// 				var result = resp.data.map(function (key) {
	// 					return { label: key, checked: false };
	// 				});
	// 				this.setState(
	// 					{
	// 						requirementsChecklist: result,
	// 					},
	// 					this.setState({ checklistReady: true }),
	// 				);
	// 			})
	// 			.catch((error) => {
	// 				//console.log(error);
	// 				this.setState({ checklistReady: true });
	// 			});
	// 	}
	// };
	// async removeVeritication() {
	//   let body = {
	//     userName: this.state.expandedRow.original.username,
	//     userVerificationType: "E",
	//   };
	//   try {
	//     const response = await userService.removeVerificationProccessToUser(body);
	//     this.setState({ expanded: {} });
	//     if (response.data === "OK") {
	//       this.setState({ userVerifi: true }, () => {
	//         setTimeout(() => {
	//           this.setState({
	//             userVerifi: false,
	//           });
	//         }, 3000);
	//       });
	//     }
	//   } catch (error) {
	//     // console.log(error);
	//   }
	// }
	getUserConfig = (username) => {
		this.setState({ showStatusVerify: true, userInfo: {} });
		userService
			.getConfigBankers(username)
			.then(async (resp) => {
				var otherDocuments = [];
				this.setState({ showStatusVerify: false });
				Object.entries(resp.data.result).forEach(async ([key, value]) => {
					if (
						key.endsWith("URL") &&
						key !== "identityURL" &&
						key !== "bankURL" &&
						key !== "locationURL" &&
						key !== "selfURL"
					) {
						var nameToShow = key.split("URL")[0].replace(/_/g, " ");

						let valueUrl = await this.getImageToShow(username, value);
						otherDocuments.push({ name: nameToShow, url: valueUrl });
					}
				});
				var lastUserInfo = this.getActualUserInfo(resp.data.result);
				this.formatDataUserToPdf(lastUserInfo);
				let identityURL = {};
				let bankURL = {};
				let locationURL = {};
				let selfURL = {};
				let identityVerificationMc = {};
				let selfieVerificationMc = {};

				if (
					resp.data.result.identityURL !== null &&
					resp.data.result.identityURL !== undefined
				) {
					identityURL.isPdf = resp.data.result.identityURL.includes("pdf");
					identityURL.file = await this.getImageToShow(
						username,
						resp.data.result.identityURL,
					);
				} else {
					identityURL = null;
				}

				if (
					resp.data.result.bankURL !== null &&
					resp.data.result.bankURL !== undefined
				) {
					bankURL.isPdf = resp.data.result.bankURL.includes("pdf");
					bankURL.file = await this.getImageToShow(
						username,
						resp.data.result.bankURL,
					);
				} else {
					bankURL = null;
				}

				if (
					resp.data.result.selfURL !== null &&
					resp.data.result.selfURL !== undefined
				) {
					selfURL.isPdf = resp.data.result.selfURL.includes("pdf");
					selfURL.file = await this.getImageToShow(
						username,
						resp.data.result.selfURL,
					);
				} else {
					selfURL = null;
				}

				if (
					resp.data.result.locationURL !== null &&
					resp.data.result.locationURL !== undefined
				) {
					locationURL.isPdf = resp.data.result.locationURL.includes("pdf");
					locationURL.file = await this.getImageToShow(
						username,
						resp.data.result.locationURL,
					);
				} else {
					locationURL = null;
				}

				if (
					resp.data.result.identityVerificationMc !== null &&
					resp.data.result.identityVerificationMc !== undefined
				) {
					identityVerificationMc.isPdf = resp.data.result.identityVerificationMc.includes(
						"pdf",
					);
					identityVerificationMc.file = await this.getImageToShow(
						username,
						resp.data.result.identityVerificationMc,
					);
				} else {
					identityVerificationMc = null;
				}
				if (
					resp.data.result.selfieIdentityVerificationMc !== null &&
					resp.data.result.selfieIdentityVerificationMc !== undefined
				) {
					selfieVerificationMc.isPdf = resp.data.result.selfieIdentityVerificationMc.includes(
						"pdf",
					);
					selfieVerificationMc.file = await this.getImageToShow(
						username,
						resp.data.result.selfieIdentityVerificationMc,
					);
				} else {
					selfieVerificationMc = null;
				}

				this.setState({
					otherDocumentsToShow: otherDocuments,
					userInfo: lastUserInfo,
					identityURLToVerify: identityURL,
					bankURLToVerify: bankURL,
					selfURLToVerify: selfURL,
					locationURLToVerify: locationURL,
					identityVerificationMcURLToVerify: identityVerificationMc,
					selfieVerificationMcURLToVerify: selfieVerificationMc,
				});
			})
			.catch((error) => {
				this.setState({ showStatusVerify: false });
				//console.log(error);
			});
	};
	async getImageToShow(username, fileName) {
		let result, type;

		if (fileName.includes("pdf")) {
			type = "application/pdf";
		} else if (fileName.includes("jpg") || fileName.includes("jpeg")) {
			type = "image/jpg";
		} else if (fileName.includes("png")) {
			type = "image/png";
		} else {
			type = "";
		}
		try {
			const response = await attachments.getAttachementUser(username, fileName);
			let blob = new Blob([response.data], {
				type: type !== "" ? type : response.headers["content-type"],
			});
			let image = URL.createObjectURL(blob);
			result = image;
		} catch (error) {
			result = "";
		}
		return result;
	}
	componentWillUnmount() {
		this._isMounted = false;
		if (this.state.allMessagesSocket !== null) {
			this.state.allMessagesSocket.close();
		}
		if (this.state.socket !== null) {
			this.state.socket.close();
			window.sessionStorage.setItem("otcOperationSocketId", "");
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		if (this.state.messageToSend !== nextState.messageToSend) {
			return false;
		}
		if (this.state.expandedRow !== nextState.expandedRow) {
			return false;
		}
		if (this.state.selectedFile !== nextState.selectedFile) {
			return false;
		}

		return true;
	}
	handleMessage = (e) => {
		this.setState({ messageToSend: e.target.value });
	};
	sendMessage = (id, username, message) => {
		if (
			message !== "" ||
			(this.state.selectedFile !== null &&
				this.state.selectedFile !== undefined)
		) {
			this.setState({
				loadingSendButton: true,
			});

			const messageUnderscored = message.replace(/\s/g, "_");
			if (this.state.selectedFile === null) {
				//var url = URL_BASE_DBTC + config.urlDollar.otcPostOperationMessage;
				const formData = new FormData();
				formData.append("id", id);
				formData.append("userName", userService.getUserName());
				formData.append("message", messageUnderscored);
				formData.append("operationMessageSide", "ADMIN");
				/* axios
          .post(url, formData)*/
				let OTCPOST = otc.addPostOperationMessageWithFile(formData); //REVISAR
				OTCPOST.then((resp) => {
					this.setState({ messageToSend: "" }, () => {
						this.setState({
							key: Math.random(),
							keyFile: Math.random(),
							selectedFile: null,
							loadingSendButton: false,
						});
					});
				}).catch((error) => {
					//console.log(error);
				});
			} else {
				//var urlImg = URL_BASE_DBTC + config.urlDollar.otcPostOperationMessage;
				const formData = new FormData();
				formData.append("attachment", this.state.selectedFile);
				formData.append("id", id);
				formData.append("userName", userService.getUserName());
				formData.append("message", messageUnderscored);
				formData.append("operationMessageSide", "ADMIN");

				/*axios
          .post(urlImg, formData)*/
				let OTCPOST = otc.addPostOperationMessageWithFile(formData); //REVISAR
				OTCPOST.then((res) => {
					this.setState({
						messageToSend: "",
						key: Math.random(),
						keyFile: Math.random(),
						selectedFile: null,
						loadingSendButton: false,
					});
				}).catch((error) => {
					//console.log(error);
				});
			}
		}
	};

	openSocketAllMessages = () => {
		this.setState({
			allMessagesSocket: new Sockette(URL_WEBSOCKET_DBTC + "/otc", {
				onopen: (e) => this.sendNotificationSubscribe(),
				onmessage: (e) => this.showNotification(e.data),
			}),
		});
	};
	showNotification = (value) => {
		if (this._isMounted) {
			let keys = Object.keys(value);
			////console.log(value);
			if (keys.length > 1) {
				let result = JSON.parse(value);
				var newAdminMessages = [];
				newAdminMessages = result.params.data;
				if (newAdminMessages.length > 0) {
					this.getOperationsFilter();
					for (var i = 0; i < newAdminMessages.length; i++) {
						this.showNewMessageIcon(newAdminMessages[i].id);
					}
				}
			}
		}
	};
	showNewMessageIcon = (idToShow) => {
		var newId = idToShow;
		var idsIcons = this.state.idsNewMessageIcon;
		idsIcons.push(newId);
		this.setState({ idsNewMessageIcon: idsIcons, newIdMessage: true });
	};
	sendNotificationSubscribe = () => {
		let subscribe = {
			method: "getAdminOperationMessages",
			params: {
				maxQuantity: 10,
				websocketKey: window.sessionStorage.getItem("websocketKey"),
			},
		};
		try {
			this.state.allMessagesSocket.json(subscribe);
		} catch (e) {}
	};
	reconnectSocket(e, operationId) {
		let ws = window.sessionStorage.getItem("otcOperationSocketId");
		this.socketReady(e, operationId, ws);
	}
	openSocket = (operationId) => {
		this.setState({
			socket: new Sockette(URL_WEBSOCKET_DBTC + "/otc", {
				onopen: (e) =>
					this.socketReady(
						operationId,
						window.sessionStorage.getItem("otcOperationSocketId"),
					),
				onmessage: (e) => this.handleValue(e.data, operationId),
				onreconnect: (e) => this.reconnectSocket(e, operationId),
			}),
		});
	};
	async handleValue(value, operationId) {
		let result = JSON.parse(value);
		if (result.method === "oldOperationMessages") {
			var oldMessages = [];
			oldMessages = result.params.data;
			for (let message of oldMessages) {
				if (message.attachment !== undefined) {
					message.urlFile = await this.getOperationsAttachment(
						message.id,
						message.attachment,
					);
				}
			}
			oldMessages.sort(function (a, b) {
				return new Date(b.timestamp) - new Date(a.timestamp);
			});
			this.setState({ oldOperationsMessages: oldMessages }, () => {
				this.setState({ showOperationMessages: true });
			});
		} else if (result.method === "currentOperationMessages") {
			var newMessages = result.params.data;
			var messagesToAdd = [];
			messagesToAdd = this.state.oldOperationsMessages;
			if (newMessages.length > 0) {
				for (var newMess of newMessages) {
					if (newMess.attachment !== undefined) {
						newMess.urlFile = await this.getOperationsAttachment(
							newMess.id,
							newMess.attachment,
						);
					}
					messagesToAdd.push(newMess);
				}
				messagesToAdd.sort(function (a, b) {
					return new Date(b.timestamp) - new Date(a.timestamp);
				});
				this.setState({ oldOperationsMessages: messagesToAdd }, () => {
					this.setState({ showOperationMessages: true });
				});
			}
		}
	}
	async getOperationsAttachment(operationId, fileName) {
		let result, type;
		try {
			const response = await attachments.getOtcAttachment(
				operationId,
				fileName,
			);
			if (fileName.includes("pdf")) {
				type = "application/pdf";
			} else if (fileName.includes("jpg") || fileName.includes("jpeg")) {
				type = "image/jpg";
			} else if (fileName.includes("png")) {
				type = "image/png";
			} else {
				type = "";
			}
			let blob = new Blob([response.data], {
				type: type !== "" ? type : response.headers["content-type"],
			});
			let image = URL.createObjectURL(blob);
			result = image;
		} catch (error) {
			result = "";
		}
		return result;
	}
	socketReady = (operationId, webSocketId) => {
		let wsId = null;
		if (webSocketId === null || webSocketId === "") {
			wsId = uuid.v4();
			window.sessionStorage.setItem("otcOperationSocketId", wsId);
		} else {
			wsId = webSocketId;
		}
		let men = {
			method: "getOperationMessages",
			params: {
				id: operationId,
				side: "Admin",
				websocketKey: wsId,
			},
		};
		try {
			this.state.socket.json(men);
		} catch (e) {}
		setTimeout(() => {
			this.setState({
				showOperationMessages: true,
			});
		}, 1500);
	};
	componentDidMount() {
		this._isMounted = true;
		this.loadCurrenciesToSearch();
		this.loadUsernameToSearch();
		//	this.loadOTCOperationTypesToSearch();
		//this.loadOTCOperationStatusesToSearch();
		this.loadPaymentTypesToSearch();
		this.getOperationsFilter();
		//this.openSocketAllMessages();
		this.getPaymentMethods();
		// this.showNotification(this.props.state.notificationsAdmin);
		window.sessionStorage.setItem("otcOperationSocketId", "");
		window.sessionStorage.setItem("websocketKey", uuid.v4());
	}
	// componentWillReceiveProps(nextProps, nextContext) {
	// 	if (this.props.state.unreadAdmin !== nextProps.state.unreadAdmin) {
	// 		this.showNotification(nextProps.state.notificationsAdmin);
	// 	}
	// }
	addPaymentToOperation = (operation) => {
		var operationPayment = {};
		var paymentInfoConcat = "";
		if (operation !== null) {
			Object.entries(operation).forEach(([paymentName, paymentInfo]) => {
				if (paymentName === "type") {
					if (paymentInfo === "TRANSFER_INTERNATIONAL_BANK") {
						operationPayment.type = "Transferencia internacional (Swift o Aba)";
					} else if (paymentInfo === "CASH_DEPOSIT") {
						operationPayment.type = "Depósito en efectivo";
					} else if (paymentInfo === "TRANSFER_WITH_SPECIFIC_BANK") {
						operationPayment.type = "Transferencia desde un banco específico";
					} else if (paymentInfo === "TRANSFER_NATIONAL_BANK") {
						operationPayment.type = "Transferencia desde un tercer banco";
					} else if (paymentInfo === "TRANSFER_TO_CRYPTO_WALLET") {
						operationPayment.type = "Transferencia desde una crypto wallet";
					} else if (paymentInfo === "WIRE_TRANSFER") {
						operationPayment.type = "Wire (Transferencia cablegráfica)";
					} else if (paymentInfo === "CHECK_DEPOSIT") {
						operationPayment.type = "Depósito en cheque";
					} else if (paymentInfo === "CREDIT_CARD") {
						operationPayment.type = "Tarjeta de crédito";
					} else if (paymentInfo === "PERSONAL_CHECK_DEPOSIT") {
						operationPayment.type = "Cheque personal";
					} else if (paymentInfo === "CASHIER_CHECK_DEPOSIT") {
						operationPayment.type = "Cheque de gerencia";
					} else if (paymentInfo === "MONEY_ORDER") {
						operationPayment.type = "Orden de dinero";
					} else {
						operationPayment.type = paymentInfo;
					}
				} else {
					if (
						paymentName !== "id" &&
						paymentName !== "acceptIn" &&
						paymentName !== "acceptOut" &&
						paymentName !== "active" &&
						paymentName !== "messages" &&
						paymentName !== "automaticCharge" &&
						paymentName !== "payWindow" &&
						paymentName !== "joinField" &&
						paymentName !== "joinFieldValue" &&
						paymentName !== "joinMyPayments" &&
						paymentName !== "verified" &&
						paymentName !== "value" &&
						paymentName !== "text" &&
						paymentName !== "description" &&
						paymentName !== "sendToPayments" &&
						paymentName !== "buyBalance" &&
						paymentName !== "types"
					) {
						if (paymentInfoConcat === "") {
							paymentInfoConcat = paymentInfoConcat.concat(paymentInfo);
						} else {
							paymentInfoConcat = paymentInfoConcat
								.concat("-")
								.concat(paymentInfo);
						}
					}
				}
			});
			operationPayment.paymentInfo = paymentInfoConcat;
			return operationPayment;
		}
	};
	makeDataTable = (operations) => {
		var tableOperationsToShow = [];
		for (var i = 0; i < operations.length; i++) {
			var operationToAdd = {};
			operationToAdd.notFormattedDate = new Date(operations[i].timestamp);
			operationToAdd.date = new Date(operations[i].timestamp);
			operationToAdd.username = operations[i].userName;
			operationToAdd.currency = operations[i].currency;
			if (operations[i].checkList !== undefined) {
				operationToAdd.checkList = operations[i].checkList;
			}
			if (
				operations[i].clientPayment !== undefined &&
				operations[i].clientPayment !== null
			) {
				var paymentInfoConcat = "";

				operationToAdd.clientPayment = operations[i].clientPayment;
				let typePayment =
					operations[i].clientPayment.type === "CREDIT_CARD"
						? "CREDIT_CARD"
						: operations[i].clientPayment.cardType !== undefined
						? "CREDIT_CARD"
						: operations[i].clientPayment.type;
				Object.entries(operations[i].clientPayment).forEach(
					// eslint-disable-next-line no-loop-func
					([paymentName, paymentInfo]) => {
						if (
							paymentName !== "automaticCharge" &&
							paymentName !== "messages" &&
							paymentName !== "type" &&
							paymentName !== "verified" &&
							paymentName !== "id"
						) {
							if (typePayment !== "CREDIT_CARD") {
								if (paymentInfoConcat === "") {
									paymentInfoConcat = paymentInfoConcat.concat(paymentInfo);
								} else {
									paymentInfoConcat = paymentInfoConcat
										.concat("-")
										.concat(paymentInfo);
								}
							} else {
								if (paymentInfoConcat === "") {
									if (paymentName === "cardNumber") {
										paymentInfo = "N. de tarjeta: " + paymentInfo;
									} else if (paymentName === "cardHolderName") {
										paymentInfo = "Titular de la tarjeta: " + paymentInfo;
									} else if (paymentName === "expDate") {
										paymentInfo = "Fecha expiración: " + paymentInfo;
									} else if (paymentName === "csc") {
										paymentInfo = "Código Seg.: " + paymentInfo;
									} else if (paymentName === "zipCode") {
										paymentInfo = "Código postal: " + paymentInfo;
									} else if (paymentName === "accountHolderName") {
										paymentInfo = "Titular de la cuenta: " + paymentInfo;
									} else {
										paymentInfo = paymentInfo;
									}
									paymentInfoConcat = paymentInfoConcat.concat(paymentInfo);
								} else {
									if (paymentName === "cardNumber") {
										paymentInfo = "N. de tarjeta: " + paymentInfo;
									} else if (paymentName === "cardHolderName") {
										paymentInfo = "Titular de la tarjeta: " + paymentInfo;
									} else if (paymentName === "expDate") {
										paymentInfo = "Fecha expiración: " + paymentInfo;
									} else if (paymentName === "csc") {
										paymentInfo = "Código Seg: " + paymentInfo;
									} else if (paymentName === "zipCode") {
										paymentInfo = "Código postal: " + paymentInfo;
									} else if (paymentName === "accountHolderName") {
										paymentInfo = "Titular de la cuenta: " + paymentInfo;
									} else {
										paymentInfo = paymentInfo;
									}

									paymentInfoConcat = paymentInfoConcat
										.concat(" - ")
										.concat(paymentInfo);
								}
							}
						}
					},
				);
				operationToAdd.clientPayment = paymentInfoConcat;
			}

			let countryCoin = operationToAdd.currency.split("_");
			let countryPrefix = countryCoin.length > 1 ? countryCoin[0] : "";
			let symbol = countryCoin.length > 1 ? countryCoin[1] : countryCoin[0];
			let currencyCurrent = ISOCURRENCIES.ISOCURRENCIES.filter((c) => {
				if (countryCoin.length > 1)
					return c.flag === countryPrefix.toLowerCase();
				else return c.key === symbol;
			})[0];
			if (currencyCurrent !== undefined) {
				operationToAdd.flag = currencyCurrent.flag;
			} else operationToAdd.flag = symbol === "ETH" ? "ethereum" : "globe";

			if (operations[i].otcOperationType === "SELL") {
				operationToAdd.operationType = "VENTA";
				if (
					operations[i].dollarBTCPayment !== undefined &&
					operations[i].dollarBTCPayment !== null
				) {
					operationToAdd.dollarBTCToPay = operations[i].dollarBTCPayment;
				} else {
					operationToAdd.dollarBTCToPay = "adminChoose";
				}
			} else if (operations[i].otcOperationType === "BUY") {
				operationToAdd.operationType = "COMPRA";
				if (
					operations[i].dollarBTCPayment !== undefined &&
					operations[i].dollarBTCPayment !== null
				) {
					operationToAdd.dollarBTCToPay = operations[i].dollarBTCPayment;
				} else {
					operationToAdd.dollarBTCToPay = "adminChoose";
				}
			} else if (operations[i].otcOperationType === "ENVIO A MEDIO DE PAGO") {
				operationToAdd.operationType = "ENVIO A MEDIO DE PAGO";
				if (
					operations[i].dollarBTCPayment !== undefined &&
					operations[i].dollarBTCPayment !== null
				) {
					operationToAdd.dollarBTCToPay = operations[i].dollarBTCPayment;
				} else {
					operationToAdd.dollarBTCToPay = "adminChoose";
				}
			} else if (operations[i].otcOperationType === "SEND_TO_PAYMENT") {
				operationToAdd.operationType = "ENVIO A MEDIO DE PAGO";
				if (
					operations[i].dollarBTCPayment !== undefined &&
					operations[i].dollarBTCPayment !== null
				) {
					operationToAdd.dollarBTCToPay = operations[i].dollarBTCPayment;
				} else {
					operationToAdd.dollarBTCToPay = "adminChoose";
				}
			} else if (operations[i].otcOperationType === "MC_BUY_BALANCE") {
				operationToAdd.operationType = "RECARGA DE SALDO";
				if (
					operations[i].dollarBTCPayment !== undefined &&
					operations[i].dollarBTCPayment !== null
				) {
					operationToAdd.dollarBTCToPay = operations[i].dollarBTCPayment;
				} else {
					operationToAdd.dollarBTCToPay = "adminChoose";
				}
			} else {
				operationToAdd.operationType = operations[i].otcOperationType;
			}
			if (operations[i].price !== undefined) {
				operationToAdd.amountBTC = operations[i].amount / operations[i].price;
			} else {
				operationToAdd.amountBTC = null;
			}
			operationToAdd.price = operations[i].price;
			operationToAdd.amount = operations[i].amount;
			operationToAdd.status = operations[i].otcOperationStatus;
			operationToAdd.id = operations[i].id;
			operationToAdd.idToShow = operations[i].id.slice(-4);
			operationToAdd.fullObject = operations[i];
			if (
				operations[i].dollarBTCPayment !== undefined &&
				operations[i].dollarBTCPayment !== null
			) {
				let merged = {
					...operationToAdd,
					...this.addPaymentToOperation(operations[i].dollarBTCPayment),
				};
				tableOperationsToShow.push(merged);
			} else {
				tableOperationsToShow.push(operationToAdd);
			}
		}

		this.setState({
			operationsTable: tableOperationsToShow,
			showOperationsTable: true,
			searchLoad: false,
		});
	};
	validateData(value) {
		if (value !== undefined) {
			return " - " + value;
		} else {
			return " ";
		}
	}
	getOperations = () => {
		this.setState({ searchLoad: true });
		// var url = URL_BASE_DBTC + config.urlDollar.getOperationsAdmin;
		var body = {
			userName: userService.getUserName(),
			operationUserName: this.state.usernameToSearch,
			currency: this.state.currencyToSearch,
			otcOperationType: this.state.OTCOperationTypeToSearch,
			otcOperationStatus: this.state.OTCOperationStatusToSearch,
			specialIndexes: this.state.paymentTypeToSearch,
			initTimestamp: this.state.dateFrom,
			finalTimestamp: this.state.dateTo,
		};
		let url = otc.getOperationsNewBankers(body); //REVISAR getOperationsNewBankers tentativo
		/*axios
      .post(url, body)*/
		url
			.then((res) => {
				this.makeDataTable(res.data);
			})
			.catch((error) => {
				this.setState({ errorInRed: true, searchLoad: false });
			});
	};
	getOperationsFilter = () => {
		this.setState({ searchLoad: true, errorInRed: false });
		// var url = URL_BASE_DBTC + config.urlDollar.getOperationsAdmin;
		var body = {
			userName: userService.getUserName(),
			operationUserNames: this.state.usernameToSearch,
			currencies: this.state.currencyToSearch,
			otcOperationTypes: this.state.OTCOperationTypeToSearch,
			otcOperationStatuses: this.state.OTCOperationStatusToSearch,
			specialIndexes: this.state.paymentTypeToSearch,
			initTimestamp: this.state.dateFrom,
			finalTimestamp: this.state.dateTo,
		};
		let url = otc.getOperationsNewBankers(body);
		/*axios
      .post(url, body)*/
		url
			.then((res) => {
				this.makeDataTable(res.data);
			})
			.catch((error) => {
				this.setState({ errorInRed: true, searchLoad: false });
			});
	};
	fileChangedHandler = (event) => {
		//  if(event.target.files[0].name.includes(" ")===true){
		//   return event.target.files[0].name= event.target.files[0].name.replace(/\s/g, "_");

		// }
		// console.log("include",event.target.files[0])
		let obj = event.target.files[0];
		//console.log(obj)
		let newname1 = event.target.files[0].name.replace(/ /g, "-").toLowerCase();
		let newnamesinn = newname1.replace(/ñ/gi, "n");
		let sinacentos = newnamesinn.replace(/[áäà]/gi, "a");
		let newname = sinacentos;
		let f = new File([obj], newname, { type: obj.type });

		this.setState({ loadingNewFile: true });
		this.setState({ selectedFile: event.target.files[0] }, () =>
			this.setState({ loadingNewFile: false }),
		);
	};
	userVerificationFileChangedHandler = (event) => {
		this.setState({ userVerificationLoadingNewFile: true });
		this.setState({ userVerificationSelectedFile: event.target.files[0] }, () =>
			this.setState({ userVerificationLoadingNewFile: false }),
		);
	};
	closeChangeStatus = () => {
		this.setState({
			modalChangeStatus: false,
			idToChangeStatus: "",
			usernameToChangeStatus: "",
			currencyToChangeStatus: "",
			operationTypeToChangeStatus: "",
			flagToChangeStatus: "",
			statusToChangeStatus: "",
			typePaidToChangeStatus: "",
			paymentInfoToChangeStatus: "",
			dollarBTCToPayToChangeStatus: "",
			statusToAdd: null,
			deleteClientPaymentCheck: false,
		});
	};
	validateData(value) {
		if (value !== undefined) {
			return "-" + value;
		} else {
			return " ";
		}
	}
	openChangeStatus = (
		id,
		username,
		currency,
		operationType,
		flag,
		status,
		typePaid,
		paymentInfo,
		dollarBTCToPay,
	) => {
		if (
			dollarBTCToPay !== "adminChoose" &&
			dollarBTCToPay !== undefined &&
			dollarBTCToPay !== null
		) {
			this.setState({ paymentMethodToChange: dollarBTCToPay.id });
			dollarBTCToPay.infoToShow =
				dollarBTCToPay.bank !== undefined
					? this.validateData(dollarBTCToPay.id.slice(-4)) +
					  this.validateData(dollarBTCToPay.bank) +
					  this.validateData(dollarBTCToPay.accountHolderName) +
					  this.validateData(dollarBTCToPay.accountNumber) +
					  this.validateData(dollarBTCToPay.accountHolderId)
					: this.validateData(dollarBTCToPay.id.slice(-4)) +
					  this.validateData(dollarBTCToPay.walletAddress);
			if (dollarBTCToPay.type === "TRANSFER_INTERNATIONAL_BANK") {
				dollarBTCToPay.typeSpanish =
					"Transferencia internacional (Swift o Aba)";
			} else if (dollarBTCToPay.type === "CASH_DEPOSIT") {
				dollarBTCToPay.typeSpanish = "Depósito en efectivo";
			} else if (dollarBTCToPay.type === "TRANSFER_WITH_SPECIFIC_BANK") {
				dollarBTCToPay.typeSpanish = "Transferencia desde un banco específico";
			} else if (dollarBTCToPay.type === "TRANSFER_NATIONAL_BANK") {
				dollarBTCToPay.typeSpanish = "Transferencia desde un tercer banco";
			} else if (dollarBTCToPay.type === "TRANSFER_TO_CRYPTO_WALLET") {
				dollarBTCToPay.typeSpanish = "Transferencia desde una crypto wallet";
			} else if (dollarBTCToPay.type === "WIRE_TRANSFER") {
				dollarBTCToPay.typeSpanish = "Wire (Transferencia cablegráfica)";
			} else if (dollarBTCToPay.type === "CHECK_DEPOSIT") {
				dollarBTCToPay.typeSpanish = "Depósito en cheque";
			} else if (dollarBTCToPay.type === "CREDIT_CARD") {
				dollarBTCToPay.typeSpanish = "Tarjeta de crédito";
			} else if (dollarBTCToPay.type === "PERSONAL_CHECK_DEPOSIT") {
				dollarBTCToPay.typeSpanish = "Cheque personal";
			} else if (dollarBTCToPay.type === "CASHIER_CHECK_DEPOSIT") {
				dollarBTCToPay.typeSpanish = "Cheque de gerencia";
			} else if (dollarBTCToPay.type === "MONEY_ORDER") {
				dollarBTCToPay.typeSpanish = "Orden de dinero";
			} else {
				dollarBTCToPay.typeSpanish = dollarBTCToPay.type;
			}
		}
		var allCurrencyPaymentMethods = this.state.paymentMethods;
		var selectCurrencyPaymentMethods = [];
		Object.entries(allCurrencyPaymentMethods).forEach(
			([currencyPaymentMethod, methodPaymentInfo]) => {
				if (currencyPaymentMethod === currency) {
					selectCurrencyPaymentMethods = methodPaymentInfo;
				}
			},
		);
		for (var i = 0; i < selectCurrencyPaymentMethods.length; i++) {
			if (
				selectCurrencyPaymentMethods[i].acceptOut === false ||
				selectCurrencyPaymentMethods[i].active === false
			) {
				selectCurrencyPaymentMethods.splice(i, 1);
			}
		}
		var idsPayment = [];
		var balanceObject = {};
		for (var y = 0; y < selectCurrencyPaymentMethods.length; y++) {
			idsPayment.push(selectCurrencyPaymentMethods[y].id);
		}
		if (idsPayment.length > 0) {
			//var url = URL_BASE_DBTC + "/otc/getDollarBTCPaymentBalance";
			var body = {
				userName: userService.getUserName(),
				currency: currency,
				paymentIds: idsPayment,
			};

			let url = otc.getDollarBTCPaymentBalanceBankers(body);
			url
				.then((res) => {
					balanceObject = res.data;
					Object.entries(balanceObject).forEach(([idPayment, arrayBalance]) => {
						for (var z = 0; z < selectCurrencyPaymentMethods.length; z++) {
							if (idPayment === selectCurrencyPaymentMethods[z].id) {
								if (arrayBalance.length > 0) {
									for (var x = 0; x < arrayBalance.length; x++) {
										if (arrayBalance[x].currency === currency) {
											selectCurrencyPaymentMethods[z].balance = arrayBalance[
												x
											].amount.toLocaleString("en-US", {
												maximumFractionDigits: 4,
											});
										}
									}
								} else {
									selectCurrencyPaymentMethods[z].balance = 0;
								}
							}
						}
					});
					var definitiveSelectPaymentMethods = [];
					for (var j = 0; j < selectCurrencyPaymentMethods.length; j++) {
						var paymentMethodToPush = {};
						paymentMethodToPush.key = selectCurrencyPaymentMethods[j].id;
						paymentMethodToPush.value = selectCurrencyPaymentMethods[j].id;
						paymentMethodToPush.text =
							selectCurrencyPaymentMethods[j].bank !== undefined
								? selectCurrencyPaymentMethods[j].id.slice(-4) +
								  this.validateData(selectCurrencyPaymentMethods[j].bank) +
								  this.validateData(
										selectCurrencyPaymentMethods[j].accountHolderName,
								  ) +
								  this.validateData(
										selectCurrencyPaymentMethods[j].accountNumber,
								  ) +
								  this.validateData(
										selectCurrencyPaymentMethods[j].accountHolderId,
								  ) +
								  this.validateData(currency) +
								  " " +
								  selectCurrencyPaymentMethods[j].balance
								: selectCurrencyPaymentMethods[j].id.slice(-4) +
								  this.validateData(
										selectCurrencyPaymentMethods[j].walletAddress,
								  ) +
								  this.validateData(currency) +
								  " " +
								  selectCurrencyPaymentMethods[j].balance;
						if (
							selectCurrencyPaymentMethods[j].balance.replace(/,/g, "") >=
							this.state.expandedRow.original.amount
						) {
							definitiveSelectPaymentMethods.push(paymentMethodToPush);
						}
					}
					var definitiveSelectPaymentMethodsUniqueKey = _.uniq(
						definitiveSelectPaymentMethods,
						"key",
					);
					this.setState(
						{
							modalChangeStatus: true,
							selectCurrencyPaymentMethodsAllowed: definitiveSelectPaymentMethodsUniqueKey,
							idToChangeStatus: id,
							usernameToChangeStatus: username,
							currencyToChangeStatus: currency,
							operationTypeToChangeStatus: operationType,
							flagToChangeStatus: flag,
							statusToChangeStatus: status,
							typePaidToChangeStatus: typePaid,
							paymentInfoToChangeStatus: paymentInfo,
							dollarBTCToPayToChangeStatus: dollarBTCToPay,
						},
						() => {
							this.getAvailableStatusToChange();
						},
					);
				})
				.catch((error) => {
					//console.log(error);
				});
		} else {
			this.setState({ modalNoPaymentForThisCurrency: true });
		}
	};
	getAvailableStatusToChange = () => {
		var allStatus = [
			"WAITING_FOR_PAYMENT",
			"CANCELED",
			"SUCCESS",
			//"WAITING_FOR_PAYMENT_METHOD_VERIFICATION"
		];
		var allStatusWhenPaid = ["CANCELED", "SUCCESS"];
		if (
			this.state.statusToChangeStatus.toString() !== "PAY_VERIFICATION" &&
			this.state.statusToChangeStatus.toString() !== "CLAIM"
		) {
			var index = allStatus.indexOf(this.state.statusToChangeStatus.toString());
			if (index > -1) {
				var availableStatus = [];
				allStatus.splice(index, 1);
				if (
					this.state.statusToChangeStatus.toString() === "WAITING_FOR_PAYMENT"
				) {
					var waitingVerificationPaidIndex = allStatus.indexOf(
						"WAITING_FOR_PAYMENT_METHOD_VERIFICATION",
					);
					if (waitingVerificationPaidIndex > -1) {
						allStatus.splice(waitingVerificationPaidIndex, 1);
					}
					if (
						this.state.operationTypeToChangeStatus === "COMPRA" ||
						this.state.operationTypeToChangeStatus === "RECARGA DE SALDO"
					) {
						var finishedIndex = allStatus.indexOf("SUCCESS");
						if (finishedIndex > -1) {
							allStatus.splice(finishedIndex, 1);
						}
					}
				}
				if (
					this.state.statusToChangeStatus.toString() !==
					"WAITING_TO_START_OPERATION"
				) {
					let waitingToStartStatusIndex = allStatus.indexOf(
						"WAITING_FOR_PAYMENT",
					);
					if (waitingToStartStatusIndex > -1)
						allStatus.splice(waitingToStartStatusIndex, 1);
				}
				for (var i = 0; i < allStatus.length; i++) {
					var status = "";
					if (allStatus[i] === "PAY_VERIFICATION") {
						status =
							window.sessionStorage.getItem("language") === "es"
								? "VERIFICANDO PAGO"
								: "PAY_VERIFICATION";
					} else if (allStatus[i] === "CANCELED") {
						status =
							window.sessionStorage.getItem("language") === "es"
								? "CANCELADA"
								: "CANCEL";
					} else if (allStatus[i] === "SUCCESS") {
						status =
							window.sessionStorage.getItem("language") === "es"
								? "EXITOSA"
								: "SUCCESS";
					} else if (
						allStatus[i] === "WAITING_FOR_PAYMENT_METHOD_VERIFICATION"
					) {
						status =
							window.sessionStorage.getItem("language") === "es"
								? "ESPERANDO VERIFICACIÓN DE PAGO"
								: "WAITING_FOR_PAYMENT_METHOD_VERIFICATION";
					} /*else if (allStatus[i] === "WAITING_TO_START_OPERATION") {
            status = "ESPERANDO PARA INICIAR OPERACIÓN";
          }*/ else if (
						allStatus[i] === "WAITING_FOR_PAYMENT"
					) {
						status =
							window.sessionStorage.getItem("language") === "es"
								? "ESPERANDO POR PAGO"
								: "WAITING_FOR_PAYMENT";
					}
					var itemToAdd = {
						key: allStatus[i],
						value: allStatus[i],
						text: status,
					};
					availableStatus.push(itemToAdd);
				}
				this.setState({ selectStatusChange: availableStatus });
			}
		} else {
			var availableStatusWhenIsPaid = [];
			for (var j = 0; j < allStatusWhenPaid.length; j++) {
				var statusPaid = "";
				if (allStatusWhenPaid[j] === "CANCELED") {
					statusPaid =
						window.sessionStorage.getItem("language") === "es"
							? "CANCELADA"
							: "CANCELED";
				} else if (
					allStatusWhenPaid[j] === "FINISHED" ||
					allStatusWhenPaid[j] === "SUCCESS"
				) {
					statusPaid =
						window.sessionStorage.getItem("language") === "es"
							? "EXITOSA"
							: "SUCCESS";
				}
				var itemToAddWhenPaid = {
					key: allStatusWhenPaid[j],
					value: allStatusWhenPaid[j],
					text: statusPaid,
				};
				availableStatusWhenIsPaid.push(itemToAddWhenPaid);
			}
			this.setState({ selectStatusChange: availableStatusWhenIsPaid });
		}
	};
	getPaymentMethods = () => {
		otc
			.getPaymentsBankers(userService.getUserName())
			.then((resp) => {
				this.setState({ paymentMethods: resp.data });
			})
			.catch((error) => {
				//console.log(error);
			});
	};
	pickStatus = (e, data) => {
		this.setState({ statusToAdd: data.value, deleteClientPaymentCheck: false });
	};
	pickPaymentMethod = (e, data) => {
		this.setState({ paymentMethodToChange: data.value });
	};
	pickUsernameToSearch = (e, data) => {
		if (data.value.length !== 0) {
			this.setState({ usernameToSearch: data.value });
		} else {
			this.setState({ usernameToSearch: null });
		}
	};
	pickPaymentMethodToSearch = (e, data) => {
		if (data.value.length !== 0) {
			this.setState({ paymentTypeToSearch: { Banks: data.value } });
		} else {
			this.setState({ paymentTypeToSearch: {} });
		}
	};
	pickCurrencyToSearch = (e, data) => {
		if (data.value.length !== 0) {
			this.setState({ currencyToSearch: data.value });
		} else {
			this.setState({ currencyToSearch: null });
		}
	};
	pickOTCOperationTypeToSearch = (e, data) => {
		if (data.value.length !== 0 && data.value !== "ENVIO A MEDIO DE PAGO") {
			this.setState({ OTCOperationTypeToSearch: data.value });
		} else if (data.value === "ENVIO A MEDIO DE PAGO") {
			this.setState({ OTCOperationTypeToSearch: "SEND_TO_PAYMENT" });
		} else {
			this.setState({ OTCOperationTypeToSearch: null });
		}
	};
	pickOTCOperationStatusToSearch = (e, data) => {
		if (data.value.length !== 0) {
			this.setState({ OTCOperationStatusToSearch: data.value });
		} else {
			this.setState({ OTCOperationStatusToSearch: null });
		}
	};
	focusRowExpanded = () => {
		if (
			this.typeOperation !== null &&
			this.typeOperation !== undefined &&
			this.typeOperation.current !== null &&
			this.typeOperation.current !== undefined
		) {
			this.typeOperation.current.focus();
		}
	};
	// updateChecklist = () => {
	// 	this.setState({ loadUpdateChecklist: true });
	// 	//var url = URL_BASE_DBTC + "/otc/modifyOperationCheckList";
	// 	var result = {};
	// 	for (var i = 0; i < this.state.requirementsChecklist.length; i++) {
	// 		result[
	// 			this.state.requirementsChecklist[i].label
	// 		] = this.state.requirementsChecklist[i].checked;
	// 	}
	// 	var body = {
	// 		id: this.state.expandedRow.original.id,
	// 		checkList: result,
	// 	};
	// 	/*axios
	//     .post(url, body)*/
	// 	let url = otc.modifyOperationCheckList(body); //REVISAR
	// 	url
	// 		.then((res) => {
	// 			this.getOperationsFilter();
	// 			this.setState({ loadUpdateChecklist: false });
	// 		})
	// 		.catch((error) => {
	// 			//console.log(error);
	// 		});
	// };
	updateChecklistVerifi = () => {
		var result = {};
		for (var i = 0; i < this.state.requirementsChecklist.length; i++) {
			result[
				this.state.requirementsChecklist[i].label
			] = this.state.requirementsChecklist[i].checked;
		}
		// var body = {
		//   id: this.state.expandedRow.original.id,
		//   checkList: result,
		// };
	};
	changeStatus = () => {
		this.setState({ loadModal: true, loadChangeStatus: true });
		//var url = URL_BASE_DBTC + config.urlDollar.changeOperationStatus;
		var paymentIdOrNull = null;
		if (this.state.paymentMethodToChange !== "") {
			paymentIdOrNull = this.state.paymentMethodToChange;
		}
		var body = {
			id: this.state.idToChangeStatus,
			otcOperationStatus: this.state.statusToAdd,
			paymentId: paymentIdOrNull,
			userChange: false,
			canceledReason: this.state.cancellationReason,
			otcOperationType: this.state.OTCOperationTypeToSearch,
		};
		let methodExecute;
		//console.log(this.state.operationTypeToChangeStatus);
		if (this.state.operationTypeToChangeStatus === "RECARGA DE SALDO") {
			methodExecute = otc.changeOperationStatusBanker(body); //REVISAR
		} else {
			methodExecute = otc.changeOperationStatusBanker(body); //REVISAR
		}

		methodExecute
			.then((res) => {
				this.setState({ loadModal: false, keyFormChangeStatus: Math.random() });
				if (res.data === "OK") {
					this.setState({
						fail: true,
						showMessageCanc: false,
						statusToAdd: null,
						cancellationReason: "",
						message:
							"La operación está cambiando de estatus. Por favor, espere unos segundos.",
					});
					setTimeout(() => {
						this.setState({
							fail: null,
							message: "",
							idToChangeStatus: "",
							statusToAdd: "",
							paymentMethodToChange: "",
							loadChangeStatus: false,
							showMessageCanc: true,
						});
						this.setState({ expanded: {} });
						this.getOperationsFilter();
						this.closeChangeStatus();
					}, 3000);
				} else {
					let resp;
					if (res.data === "DOES NOT HAVE ENOUGH BALANCE") {
						resp =
							window.sessionStorage.getItem("language") === "es"
								? "El medio de pago no posee suficiente saldo"
								: "DOES NOT HAVE ENOUGH BALANCE";
					}
					if (res.data === "OPERATION NOT ALLOWED") {
						resp =
							window.sessionStorage.getItem("language") === "es"
								? "OPERACIÓN NO PERMITIDA"
								: "OPERATION NOT ALLOWED";
					} else if (res.data === "FAIL") {
						resp =
							window.sessionStorage.getItem("language") === "es"
								? "FALLIDA"
								: "FAIL";
					} else if (
						res.data === "SEND MUST HAVE REQUEST PAYMENT ID TO FINISH STATUS"
					) {
						resp =
							window.sessionStorage.getItem("language") === "es"
								? "Por Favor , recuerde elegir el medio de pago"
								: "SEND MUST HAVE REQUEST PAYMENT ID TO FINISH STATUS";
					} else {
						resp = res.data;
					}
					this.setState({
						showMessageCanc: false,
						failnegative: true,
						message: resp,
						cancellationReason: "",
					});
					setTimeout(() => {
						this.setState({
							showMessageCanc: true,
							failnegative: null,
							message: "",
							idToChangeStatus: "",
							paymentMethodToChange: "",
							statusToAdd: "",
							loadChangeStatus: false,
						});
						this.closeChangeStatus();
						this.getOperationsFilter();
					}, 7000);
				}
			})
			.catch((error) => {
				//console.log(error);
			});
	};
	enterPressed = (event) => {
		var code = event.keyCode || event.which;
		if (code === 13) {
			this.sendMessage(
				this.state.expandedRow.original.id,
				this.state.expandedRow.original.username,
				this.state.messageToSend,
			);
		}
	};
	floorDecimals = (value, numberDecimals) => {
		let decimales = Math.pow(10, numberDecimals);
		return Math.floor(value * decimales) / decimales;
	};
	loadCurrenciesToSearch = () => {
		//var url = URL_BASE_DBTC + "/otc/getCurrencies";

		let currency =
			window.sessionStorage.getItem("userType") === "BANKER"
				? otc.getCurrenciesBankers(userService.getUserName())
				: otc.getAdminCurrencies(userService.getUserName());
		currency
			.then((resp) => {
				let currencies = resp.data;
				let selectCurrencies = [];
				let currencyCurrent = {};
				for (let i = 0; i < currencies.length; i++) {
					let currencyToAddSelect = {};
					let countryCoin = currencies[i].shortName.split("_");
					currencyCurrent = ISOCURRENCIES.ISOCURRENCIES.filter((c) => {
						if (countryCoin.length > 1)
							return c.flag === countryCoin[0].toLowerCase();
						else return c.key === countryCoin[0];
					})[0];
					if (currencyCurrent !== undefined) {
						currencyToAddSelect.flag = currencyCurrent.flag;
					} else
						currencyToAddSelect.icon =
							currencies[i].shortName === "ETH" ? "ethereum" : "globe";
					currencyToAddSelect.key = currencies[i].shortName;
					currencyToAddSelect.value = currencies[i].shortName;
					currencyToAddSelect.text = currencies[i].fullName;
					/*if (currencies[i].shortName === "USD") {
                      currencyToAddSelect.key = "USD";
                      currencyToAddSelect.value = "USD";
                      currencyToAddSelect.text = currencies[i].fullName;
                      currencyToAddSelect.flag = "us";
                    } else if (currencies[i].shortName === "VES") {
                      currencyToAddSelect.key = "VES";
                      currencyToAddSelect.value = "VES";
                      currencyToAddSelect.text = currencies[i].fullName;
                      currencyToAddSelect.flag = "ve";
                    } else if (currencies[i].shortName === "COP") {
                      currencyToAddSelect.key = "COP";
                      currencyToAddSelect.value = "COP";
                      currencyToAddSelect.text = currencies[i].fullName;
                      currencyToAddSelect.flag = "co";
                    } else if (currencies[i].shortName === "EUR") {
                      currencyToAddSelect.key = "EUR";
                      currencyToAddSelect.value = "EUR";
                      currencyToAddSelect.text = currencies[i].fullName;
                      currencyToAddSelect.flag = "eu";
                    } else if (currencies[i].shortName === "RD$") {
                      currencyToAddSelect.key = "RD$";
                      currencyToAddSelect.value = "RD$";
                      currencyToAddSelect.text = currencies[i].fullName;
                      currencyToAddSelect.flag = "do";
                    } else if (currencies[i].shortName === "CLP") {
                      currencyToAddSelect.key = "CLP";
                      currencyToAddSelect.value = "CLP";
                      currencyToAddSelect.text = currencies[i].fullName;
                      currencyToAddSelect.flag = "cl";
                    } else if (currencies[i].shortName === "PEN") {
                      currencyToAddSelect.key = "PEN";
                      currencyToAddSelect.value = "PEN";
                      currencyToAddSelect.text = currencies[i].fullName;
                      currencyToAddSelect.flag = "pe";
                    } else if (currencies[i].shortName === "BRL") {
                      currencyToAddSelect.key = "BRL";
                      currencyToAddSelect.value = "BRL";
                      currencyToAddSelect.text = currencies[i].fullName;
                      currencyToAddSelect.flag = "br";
                    } else if (currencies[i].shortName === "ARS") {
                      currencyToAddSelect.key = "ARS";
                      currencyToAddSelect.value = "ARS";
                      currencyToAddSelect.text = currencies[i].fullName;
                      currencyToAddSelect.flag = "ar";
                    } else if (currencies[i].shortName === "MXN") {
                      currencyToAddSelect.key = "MXN";
                      currencyToAddSelect.value = "MXN";
                      currencyToAddSelect.text = currencies[i].fullName;
                      currencyToAddSelect.flag = "mx";
                    } else if (currencies[i].shortName === "CRC") {
                      currencyToAddSelect.key = "CRC";
                      currencyToAddSelect.value = "CRC";
                      currencyToAddSelect.text = currencies[i].fullName;
                      currencyToAddSelect.flag = "cr";
                    } else if (currencies[i].shortName === "PAB") {
                      currencyToAddSelect.key = "PAB";
                      currencyToAddSelect.value = "PAB";
                      currencyToAddSelect.text = currencies[i].fullName;
                      currencyToAddSelect.flag = "pa";
                    } else if (currencies[i].shortName === "PA_USD") {
                      currencyToAddSelect.key = "PA_USD";
                      currencyToAddSelect.value = "PA_USD";
                      currencyToAddSelect.text = currencies[i].fullName;
                      currencyToAddSelect.flag = "pa";
                    } else if (currencies[i].shortName === "ETH") {
                      currencyToAddSelect.key = "ETH";
                      currencyToAddSelect.value = "ETH";
                      currencyToAddSelect.text = currencies[i].fullName;
                      currencyToAddSelect.icon = "ethereum";
                    }*/
					//console.log("currency to add select: ", currencyToAddSelect);
					selectCurrencies.push(currencyToAddSelect);
				}
				this.setState({ currenciesToSearch: selectCurrencies });
			})
			.catch((error) => {
				//console.log(error);
			});
	};
	loadUsernameToSearch = () => {
		var url = URL_BASE_DBTC + config.urlDollar.bankersList;
		let username = window.sessionStorage.getItem("username");
		// falta servicio de usuarios por banker
		userService
			.getBankers(username)
			.then((resp) => {
				var listUser = resp.data.result.users;
				var listEmail = [];
				listEmail.push({ key: "ALL", value: "ALL", text: "TODOS" });
				for (var i = 0; i < listUser.length; i++) {
					var emailOption = {};
					emailOption.key = i;
					emailOption.value = listUser[i].name;
					emailOption.text = listUser[i].name;
					listEmail.push(emailOption);
				}
				this.setState({
					usernamesToSearch: listEmail,
				});
			})
			.catch((error) => {
				//console.log(error);
			});
	};
	loadPaymentTypesToSearch = () => {
		/*var url = URL_BASE_DBTC + "/otc/getOperationIndexesAndValues";
    axios
			.get(url)*/
		//	getOperationIndexesAndValues
		let username = window.sessionStorage.getItem("username");
		let url =
			window.sessionStorage.getItem("userType") === "BANKER"
				? otc.getOperationIndexesAndValuesBankers(username)
				: otc.getOperationIndexesAndValues(username);
		url
			.then((resp) => {
				var listPaymentMethods = [];
				Object.entries(resp.data).forEach(([indexes, values]) => {
					if (indexes === "Banks") {
						for (var i = 0; i < values.length; i++) {
							var bankToPush = {};
							bankToPush.key = values[i];
							bankToPush.value = values[i];
							bankToPush.text = values[i];
							listPaymentMethods.push(bankToPush);
						}
					}
				});
				this.setState({
					paymentTypesToSearch: listPaymentMethods,
				});
			})
			.catch((error) => {
				//console.log(error);
			});
	};
	// loadOTCOperationTypesToSearch = () => {
	// 	let t = this.state.translator;
	// 	var operationsTypes = [
	// 		{
	// 			key: "SELL",
	// 			value: "SELL",
	// 			text: t("homeLoggedIn.transactions.detail.labels.SELL"),
	// 		},
	// 		{
	// 			key: "BUY",
	// 			value: "BUY",
	// 			text: t("homeLoggedIn.transactions.detail.labels.BUY"),
	// 		},
	// 		{
	// 			key: "SEND_TO_PAYMENT",
	// 			value: "SEND_TO_PAYMENT",
	// 			text: t("homeLoggedIn.transactions.detail.labels.SEND_TO_PAYMENT"),
	// 		},
	// 		{
	// 			key: "MC_BUY_BALANCE",
	// 			value: "MC_BUY_BALANCE",
	// 			text: t("homeLoggedIn.transactions.detail.labels.MC_BUY_BALANCE"),
	// 		},
	// 	];
	// 	this.setState({ OTCOperationTypesToSearch: operationsTypes });
	// };
	// loadOTCOperationStatusesToSearch = () => {
	// 	var operationsStatuses;
	// 	if (window.sessionStorage.getItem("language") === "es") {
	// 		operationsStatuses = [
	// 			{
	// 				key: "WAITING_FOR_PAYMENT",
	// 				icon: "sync",
	// 				value: "WAITING_FOR_PAYMENT",
	// 				text: "ESPERANDO POR PAGO",
	// 			},
	// 			{
	// 				key: "CANCELED",
	// 				icon: "warning circle",
	// 				value: "CANCELED",
	// 				text: "CANCELADA",
	// 			},
	// 			{
	// 				key: "SUCCESS",
	// 				icon: "check circle",
	// 				value: "SUCCESS",
	// 				text: "EXITOSA",
	// 			},
	// 			{
	// 				key: "CLAIM",
	// 				icon: "info",
	// 				value: "CLAIM",
	// 				text: "RECLAMO",
	// 			},
	// 			// {
	// 			//   key: "WAITING_FOR_PAYMENT_METHOD_VERIFICATION",
	// 			//   icon: "payment",
	// 			//   value: "WAITING_FOR_PAYMENT_METHOD_VERIFICATION",
	// 			//   text: "ESPERANDO VERIFICACIÓN DE PAGO"
	// 			// },
	// 			{
	// 				key: "PAY_VERIFICATION",
	// 				icon: "info",
	// 				value: "PAY_VERIFICATION",
	// 				text: "VERIFICANDO PAGO",
	// 			},
	// 			{
	// 				key: "WAITING_TO_START_OPERATION",
	// 				icon: "wait",
	// 				value: "WAITING_TO_START_OPERATION",
	// 				text: "ESPERANDO PARA INICIAR OPERACIÓN",
	// 			},
	// 		];
	// 	} else {
	// 		operationsStatuses = [
	// 			{
	// 				key: "WAITING_FOR_PAYMENT",
	// 				icon: "sync",
	// 				value: "WAITING_FOR_PAYMENT",
	// 				text: "WAITING FOR PAYMENT",
	// 			},
	// 			{
	// 				key: "CANCELED",
	// 				icon: "warning circle",
	// 				value: "CANCELED",
	// 				text: "CANCELED",
	// 			},
	// 			{
	// 				key: "SUCCESS",
	// 				icon: "check circle",
	// 				value: "SUCCESS",
	// 				text: "SUCCESS",
	// 			},
	// 			{
	// 				key: "CLAIM",
	// 				icon: "info",
	// 				value: "CLAIM",
	// 				text: "CLAIM",
	// 			},
	// 			// {
	// 			//   key: "WAITING_FOR_PAYMENT_METHOD_VERIFICATION",
	// 			//   icon: "payment",
	// 			//   value: "WAITING_FOR_PAYMENT_METHOD_VERIFICATION",
	// 			//   text: "ESPERANDO VERIFICACIÓN DE PAGO"
	// 			// },
	// 			{
	// 				key: "PAY_VERIFICATION",
	// 				icon: "info",
	// 				value: "PAY_VERIFICATION",
	// 				text: "PAY VERIFICATION",
	// 			},
	// 			{
	// 				key: "WAITING_TO_START_OPERATION",
	// 				icon: "wait",
	// 				value: "WAITING_TO_START_OPERATION",
	// 				text: "WAITING TO START OPERATION",
	// 			},
	// 		];
	// 	}

	// 	this.setState({ OTCOperationStatusesToSearch: operationsStatuses });
	// };
	formatDate(date) {
		let regi = "es-ES";
		let cad = "";
		var options = {
			year: "numeric",
			month: "short",
			day: "2-digit",
			hour: "numeric",
			minute: "2-digit",
			hour12: "true",
		};
		let data = date.toLocaleString(regi, options);
		if (regi === "es-ES") {
			data = data.split(" ");
			let day = data[0];
			let month = data[1];
			data[0] = month;
			data[1] = day;

			for (date of data) {
				cad = cad + " " + date;
			}
		} else {
			cad = data;
		}
		return cad;

		// lunes, 26 de diciembre de 2050 9 a. m.
	}
	formatDateModal(date) {
		let regi = "es-ES";
		let cad = "";
		var options = {
			year: "numeric",
			month: "short",
			day: "2-digit",
		};
		let data = date.toLocaleString(regi, options);
		if (regi === "es-ES") {
			data = data.split(" ");
			let day = data[0];
			let month = data[1];
			data[0] = month;
			data[1] = day;

			for (date of data) {
				cad = cad + " " + date;
			}
		} else {
			cad = data;
		}

		return cad;
	}
	getAutomaticChatMessages = (currency) => {
		let url = otc.getAutomaticChatMessages(currency); //REVISAR
		url
			.then((resp) => {
				this.setState(
					{
						automaticMessagesToShow: resp.data,
					},
					this.setState({ automaticMessageReady: true }),
				);
			})
			.catch((error) => {
				this.setState({ errorInRed: true, searchLoad: false });
			});
	};
	getAutomaticChatMessagesOperation = (
		currency,
		otcOperationType,
		otcOperationStatus,
	) => {
		let operationType;
		// if (otcOperationType === "COMPRA") {
		// 	operationType = "BUY";
		// } else if (otcOperationType === "VENTA") {
		// 	operationType = "SELL";
		// } else
		if (otcOperationType === "ENVIO A MEDIO DE PAGO") {
			operationType = "SEND_TO_PAYMENT";
		} else if (otcOperationType === "RECARGA DE SALDO") {
			operationType = "MC_BUY_BALANCE";
		}
		if (operationType !== undefined) {
			let url = otc.getAutomaticChatMessagesOperation(
				currency,
				operationType,
				otcOperationStatus,
			); //REVISAR
			url
				.then((resp) => {
					this.setState(
						{
							automaticMessagesToShow: resp.data,
						},
						this.setState({ automaticMessageReady: true }),
					);
				})
				.catch((error) => {
					this.setState({ errorInRed: true, searchLoad: false });
				});
		}
	};
	printInvoice() {
		let doc = new jsPDF();

		doc.addFont("Montserrat");
		doc.setFontSize(18);
		doc.text(60, 20, "Datos de Cliente");
		let x = 20,
			y = 40;
		doc.setFontSize(12);
		for (let data of this.state.dataToPdf) {
			doc.text(data.label + ":" + " " + data.value, x, y);
			y = y + 10;
		}
		doc.setFontSize(18);
		doc.text("Datos de operación", 60, y + 10);
		doc.setFontSize(12);
		y = y + 20;
		for (let data of this.state.dataPdfOperation) {
			doc.text(data.label + ":" + " " + data.value, x, y);
			y = y + 10;
		}
		//  doc.addImage(ima, "PNG", 10, 40, 180, 180);
		doc.save("Comprobante.pdf");
	}
	loadAutomaticMessage = (id, messageToLoad) => {
		this.setState({ messageToSend: messageToLoad });
		if (
			messageToLoad !== "" ||
			(this.state.selectedFile !== null &&
				this.state.selectedFile !== undefined)
		) {
			this.setState({
				loadingSendButton: true,
				sendingAutomaticMessage: true,
			});
			const messageUnderscored = messageToLoad.replace(/\s/g, "_");
			if (this.state.selectedFile === null) {
				const formData = new FormData();
				formData.append("id", id);
				formData.append("userName", userService.getUserName());
				formData.append("message", messageUnderscored);
				formData.append("operationMessageSide", "ADMIN");
				/*axios
          .post(url, formData)*/
				let OTCPOST = otc.addPostOperationMessageWithFile(formData);
				OTCPOST.then((resp) => {
					this.setState({ messageToSend: "" }, () => {
						this.setState({
							key: Math.random(),
							keyFile: Math.random(),
							selectedFile: null,
							loadingSendButton: false,
							sendingAutomaticMessage: false,
						});
					});
				}).catch((error) => {
					//console.log(error);
				});
			} else {
				const formData = new FormData();
				formData.append("attachment", this.state.selectedFile);
				formData.append("id", id);
				formData.append("userName", userService.getUserName());
				formData.append("message", messageUnderscored);
				formData.append("operationMessageSide", "ADMIN");
				/*axios
          .post(urlImg, formData)*/
				let OTCPOST = otc.addPostOperationMessageWithFile(formData);
				OTCPOST.then((res) => {
					this.setState({
						messageToSend: "",
						key: Math.random(),
						keyFile: Math.random(),
						selectedFile: null,
						loadingSendButton: false,
						sendingAutomaticMessage: false,
					});
				}).catch((error) => {
					//console.log(error);
				});
			}
		}
	};
	convertUTCDateToLocalDate = (date) => {
		var newDate = new Date(
			date.getTime() + date.getTimezoneOffset() * 60 * 1000,
		);

		var offset = date.getTimezoneOffset() / 60;
		var hours = date.getHours();

		newDate.setHours(hours - offset);

		return newDate;
	};
	getUserVerification = (username) => {
		this.setState({ viewButton: false });
		userService
			.getConfigUserGeneral(username)
			.then((resp) => {
				this.formatDataUserToPdf(resp.data.result);
				if (resp.data.result.verification.C !== undefined) {
					if (resp.data.result.verification.C.userVerificationStatus === "OK") {
						this.setState({ expandedUserVerificationStatus: "OK" });
					} else {
						this.setState({ expandedUserVerificationStatus: "FAIL" });
					}
				} else {
					if (resp.data.result.verification.E !== undefined) {
						if (
							resp.data.result.verification.E.userVerificationStatus === "OK" &&
							this.state.expandedRow.original.operationType ===
								"ENVIO A MEDIO DE PAGO"
						) {
							this.setState({
								expandedUserVerificationStatus: "OK",
								viewButton: true,
							});
						} else {
							this.setState({ expandedUserVerificationStatus: "FAIL" });
						}
					} else {
						this.setState({ expandedUserVerificationStatus: "FAIL" });
					}
				}
			})
			.catch((error) => {
				this.setState({ errorInRed: true });
			});
	};
	validateTimeForBuy = (dateOperationString, minutesForBuy) => {
		if (
			minutesForBuy !== undefined &&
			minutesForBuy !== null &&
			minutesForBuy !== ""
		) {
			let sp = minutesForBuy.split("minutes");
			let minut = sp[0].trim();
			let min180 = minut * 60000; //60 * 1000 = 60 segundos .

			let dateOperation = this.convertUTCDateToLocalDate(
				new Date(dateOperationString),
			);
			let dateNow = this.convertUTCDateToLocalDate(new Date());
			this.setState({
				localDateInMiliseconds: Date.now(),
			});

			let timeRest = min180 - (dateNow.getTime() - dateOperation.getTime());

			if (timeRest > 0) {
				this.setState({
					timeForOperationInMiliseconds: timeRest,
				});
			} else {
				this.setState({
					timeForOperationInMiliseconds: 0,
				});
			}
		}
	};
	handleDataName = (e) => {
		this.setState({ toEditDataName: e.target.value });
	};
	handleDataValue = (e) => {
		this.setState({ toEditDataValue: e.target.value });
	};
	handleItemEditUser = (e, { name }) => {
		this.getDataNamesOptions();
		this.setState({
			activeItemEditUser: name,
			toEditDataName: null,
			toEditDataValue: null,
			userVerificationSelectedFile: null,
		});
	};
	addDocumentToUser = () => {
		this.setState({ loadEditUser: true });
		var dataName = this.state.toEditDataName.replace(/\s/g, "_");
		dataName = dataName + "URL";
		const formData = new FormData();
		formData.append("attachment", this.state.userVerificationSelectedFile);
		formData.append("userName", this.state.expandedRow.original.username);
		formData.append("fieldName", dataName);
		/*axios
      .post(url, formData)*/
		let url = userService.userAddAttachment(formData);
		url
			.then((resp) => {
				if (resp.status === 200) {
					this.setState({
						toEditDataName: null,
						addDataFormKey: Math.random(),
						loadEditUser: false,
						userVerificationSelectedFile: null,
					});
				} else {
					this.setState({
						failAddInfo: true,
						messageAddInfo: resp.data,
						loadEditUser: false,
					});
					setTimeout(() => {
						this.setState({
							failAddInfo: false,
						});
					}, 5000);
				}
			})
			.catch((error) => {
				if (error.response.status === 500) {
					this.setState({
						failAddInfo: true,
						messageAddInfo:
							"Ha habido un error agregando el nuevo documento, por favor revise si ya este usuario posee un documento con dicho nombre",
						loadEditUser: false,
					});
					setTimeout(() => {
						this.setState({
							failAddInfo: false,
						});
					}, 5000);
				}
			});
	};
	DataRemoveVerifiToUser = (username) => {
		this.setState({ userVerifi: {} });
		userService
			.getConfigUserGeneral(username)
			.then(async (resp) => {
				var result = resp.data.result.verification.E.fieldNames.map(function (
					key,
				) {
					return { label: key, checked: false };
				});
				this.setState({
					userVerifi: result,
				});
			})
			.catch((error) => {
				//console.log(error);
			});
	};
	removeVerifiToUser = async () => {
		this.setState({ loadRemoveUser: true });

		let fieldNames = [];
		this.state.userVerifi.map(function (key) {
			if (key.checked === true) {
				fieldNames.push(key.label);
			}
		});

		let body = {
			userName: this.state.expandedRow.original.username,
			userVerificationType: "E",
			removeFieldNames: fieldNames,
		};
		try {
			const response = await userService.removeVerificationProccessToUser(body);

			if (response.data === "OK") {
				this.setState({
					loadRemoveUser: false,
					failRemoveVerifi: true,
					detailRemoveVerifi: true,
					messageRemoveVerifi:
						"La eliminación de los datos se realizo exitosamente",
				});
				setTimeout(() => {
					this.closeRemoveUserModal();
					this.setState({ expanded: {} });
				}, 5000);
			} else {
				this.setState({
					loadRemoveUser: false,
					failRemoveVerifierror: true,
					detailRemoveVerifi: true,
					messageRemoveVerifi: "Disculpe ha ocurrido un error",
				});
				setTimeout(() => {
					this.closeRemoveUserModal();
					this.setState({ expanded: {} });
				}, 5000);
			}
		} catch (error) {
			// console.log(error);
		}
	};
	addInfoToUser = async () => {
		this.setState({ loadEditUser: true });
		const dataName = this.state.toEditDataName.replace(/\s/g, "_");
		var body = {
			userName: this.state.expandedRow.original.username,
			fieldName: dataName,
			fieldValue: this.state.toEditDataValue,
		};
		try {
			const resp = await userService.addDataUserAsync(body);
			if (resp.data === "OK") {
				this.setState({
					toEditDataName: null,
					toEditDataValue: null,
					addDataFormKey: Math.random(),
					loadEditUser: false,
				});
			} else {
				this.setState({
					failAddInfo: true,
					messageAddInfo: resp.data,
					loadEditUser: false,
				});
				setTimeout(() => {
					this.setState({
						failAddInfo: false,
					});
				}, 5000);
			}
		} catch (error) {
			this.setState({
				failAddInfo: true,
				messageAddInfo: "Error intente mas tarde",
				loadEditUser: false,
			});
			setTimeout(() => {
				this.setState({
					failAddInfo: false,
				});
			}, 5000);
		}
	};
	modifyInfoToUser = async () => {
		this.setState({ loadEditUser: true });
		const dataName = this.state.toEditDataName.replace(/\s/g, "_");
		var body = {
			userName: this.state.expandedRow.original.username,
			fieldName: dataName,
			fieldValue: this.state.toEditDataValue,
		};
		try {
			const resp = await userService.updateUserData(body);
			if (resp.data === "OK") {
				this.getDataNamesOptions();
				this.setState({
					toEditDataName: null,
					toEditDataValue: null,
					editDataFormKey: Math.random(),
					loadEditUser: false,
				});
			} else {
				this.setState({
					failAddInfo: true,
					messageAddInfo: resp.data,
					loadEditUser: false,
				});
				setTimeout(() => {
					this.setState({
						failAddInfo: false,
					});
				}, 5000);
			}
		} catch (error) {
			this.setState({
				failAddInfo: true,
				messageAddInfo: "Error intente mas tarde",
				loadEditUser: false,
			});
			setTimeout(() => {
				this.setState({
					failAddInfo: false,
				});
			}, 5000);
		}
	};
	pickToEdit = (e, data) => {
		this.setState({ toEditDataName: data.value, toEditDataValue: null });
	};
	pickGenderToEdit = (e, data) => {
		this.setState({ toEditDataValue: data.value });
	};
	pickDocumentTypeToEdit = (e, data) => {
		this.setState({ toEditDataValue: data.value });
	};
	saveOperationDataToPdf(data) {
		let dataToPush = [];
		//this.getDataNamesOptions();
		this.setState({ dataPdfOperation: [] });
		Object.entries(data.row).forEach(([key, value]) => {
			if (key === "date") {
				dataToPush.push({ label: "Fecha", value: this.formatDate(value) });
			} else if (key === "username") {
				dataToPush.push({ label: "Usuario", value: value });
			} else if (key === "currency") {
				dataToPush.push({ label: "Moneda", value: value });
			} else if (key === "operationType") {
				dataToPush.push({ label: "Tipo operación", value: value });
			} else if (key === "price") {
				dataToPush.push({
					label: "Precio",
					value: this.floorDecimals(value, 2),
				});
			} else if (key === "amount") {
				dataToPush.push({
					label: "Monto",
					value: this.floorDecimals(value, 2),
				});
			} else if (key === "amountBTC") {
				dataToPush.push({
					label: "Monto BTC",
					value: this.floorDecimals(value, 8),
				});
			}
		});
		if (data.original.charges !== undefined) {
			Object.entries(data.original.charges).forEach(
				([chargeKey, chargeValue]) => {
					if (chargeKey === "COMMISSION") {
						dataToPush.push({
							label: "Comision",
							value: chargeValue.amount + " " + chargeValue.currency,
						});
					}
					if (chargeKey === "VAT") {
						dataToPush.push({
							label: "VAT",
							value: chargeValue.amount + " " + chargeValue.currency,
						});
					}
				},
			);
		}
		if (
			data.original.fullObject !== undefined &&
			data.original.fullObject !== null
		) {
			if (
				data.original.fullObject.clientPayment !== undefined &&
				data.original.fullObject.clientPayment !== null
			) {
				Object.entries(data.original.fullObject.clientPayment).forEach(
					([clientKey, clientValue]) => {
						if (clientKey === "bank") {
							dataToPush.push({
								label: "Banco",
								value: clientValue,
							});
						}
						if (clientKey === "accountNumber") {
							dataToPush.push({
								label: "Numero de cuenta",
								value: clientValue,
							});
						}
						if (clientKey === "accountHolderName") {
							dataToPush.push({
								label: "Títular de la cuenta",
								value: clientValue,
							});
						}
					},
				);
			}
		}
		this.setState({ dataPdfOperation: dataToPush });
	}
	formatDataUserToPdf(data) {
		let optionsPdf = [];
		Object.entries(data).forEach(([key, value]) => {
			if (
				key !== "active" &&
				key !== "address" &&
				key !== "environment" &&
				key !== "masterWalletIds" &&
				key !== "operationAccount" &&
				key !== "type" &&
				key !== "active" &&
				key !== "verification" &&
				key !== "name" &&
				key !== "email" &&
				!key.startsWith("paymentId") &&
				!key.endsWith("URL")
			) {
				var dataName = "";
				if (key === "questionSecurity") {
					dataName = "Pregunta de seguridad";
				} else if (key === "lastName") {
					dataName = "Apellidos";
				} else if (key === "answerSecurity") {
					dataName = "Respuesta de seguridad";
				} else if (key === "typeDocumentIdentity") {
					dataName = "Tipo de documento de identidad";
				} else if (key === "numberDocumentIdentity") {
					dataName = "Número de documento de identidad";
				} else if (key === "gender") {
					dataName = "Sexo";
					value === "male" ? (value = "Masculino") : (value = "Femenino");
				} else if (key === "birthdate") {
					dataName = "Fecha de nacimiento";
				} else if (key === "birthplace") {
					dataName = "Lugar de nacimiento";
				} else if (key === "familyName") {
					dataName = "Familiar de contacto";
				} else if (key === "familyEmail") {
					dataName = "Email del contacto";
				} else if (key === "userLocalBitcoin") {
					dataName = "Usuario LocalBitcoin";
				} else if (key === "userFacebook") {
					dataName = "Usuario Facebook";
				} else if (key === "userDirection") {
					dataName = "Dirección";
				} else if (key === "firstName") {
					dataName = "Nombres";
				} else if (key === "phone") {
					dataName = "Teléfono";
				} else if (key === "nickname") {
					dataName = "Nombre de usuario";
				} else if (key === "companyName") {
					dataName = "Nombre de la compañia";
				} else if (key === "companyTypeOfFiscalRecord") {
					dataName = "Tipo de registro fiscal";
				} else if (key === "companyNumberOfFiscalRecord") {
					dataName = "Número de registro fiscal";
				} else if (key === "companyYearRegistration") {
					dataName = "Año de registro de la compañia";
				} else {
					dataName = key.replace(/_/g, " ");
				}
				if (value === "") {
					value = "No posee";
				} else if (value === "cedula") {
					value = "Cédula de identidad";
				} else if (value === "passport") {
					value = "Pasaporte";
				} else if (value === "dni") {
					value = "DNI";
				} else if (value === "id") {
					value = "ID";
				}
				var toPush = {
					key: key,
					value: key,
					text: dataName + ": " + value,
				};
				if (
					key === "lastName" ||
					key === "firstName" ||
					key === "typeDocumentIdentity" ||
					key === "numberDocumentIdentity" ||
					key === "phone" ||
					key === "companyName" ||
					key === "companyTypeOfFiscalRecord" ||
					key === "companyNumberOfFiscalRecord" ||
					key === "companyYearRegistration"
				) {
					var objPdf = {
						label: dataName,
						value: value,
					};
					optionsPdf.push(objPdf);
				}
			}
		});
		this.setState({
			dataToPdf: optionsPdf,
		});
	}
	getDataNamesOptions = () => {
		this.setState({ dataToPdf: [], dataNameToEditOptions: [] });
		userService
			.getConfigUserGeneral(this.state.expandedRow.original.username)
			.then((resp) => {
				var options = [];
				var optionsPdf = [];
				var normalizaeObject = this.getActualUserInfo(resp.data.result);
				delete normalizaeObject.other;
				delete normalizaeObject.isACompany;
				Object.entries(normalizaeObject).forEach(([key, value]) => {
					if (
						key !== "active" &&
						key !== "address" &&
						key !== "environment" &&
						key !== "masterWalletIds" &&
						key !== "operationAccount" &&
						key !== "type" &&
						key !== "active" &&
						key !== "verification" &&
						key !== "name" &&
						key !== "email" &&
						!key.startsWith("paymentId") &&
						!key.endsWith("URL")
					) {
						var dataName = "";
						if (key === "questionSecurity") {
							dataName = "Pregunta de seguridad";
						} else if (key === "lastName") {
							dataName = "Apellidos";
						} else if (key === "answerSecurity") {
							dataName = "Respuesta de seguridad";
						} else if (key === "typeDocumentIdentity") {
							dataName = "Tipo de documento de identidad";
						} else if (key === "numberDocumentIdentity") {
							dataName = "Número de documento de identidad";
						} else if (key === "gender") {
							dataName = "Sexo";
							value === "male" ? (value = "Masculino") : (value = "Femenino");
						} else if (key === "birthdate") {
							dataName = "Fecha de nacimiento";
						} else if (key === "birthplace") {
							dataName = "Lugar de nacimiento";
						} else if (key === "familyName") {
							dataName = "Familiar de contacto";
						} else if (key === "familyEmail") {
							dataName = "Email del contacto";
						} else if (key === "userLocalBitcoin") {
							dataName = "Usuario LocalBitcoin";
						} else if (key === "userFacebook") {
							dataName = "Usuario Facebook";
						} else if (key === "userDirection") {
							dataName = "Dirección";
						} else if (key === "firstName") {
							dataName = "Nombres";
						} else if (key === "phone") {
							dataName = "Teléfono";
						} else if (key === "nickname") {
							dataName = "Nombre de usuario";
						} else if (key === "companyName") {
							dataName = "Nombre de la compañia";
						} else if (key === "companyTypeOfFiscalRecord") {
							dataName = "Tipo de registro fiscal";
						} else if (key === "companyNumberOfFiscalRecord") {
							dataName = "Número de registro fiscal";
						} else if (key === "companyYearRegistration") {
							dataName = "Año de registro de la compañia";
						} else {
							dataName = key.replace(/_/g, " ");
						}
						if (value === "") {
							value = "No posee";
						} else if (value === "cedula") {
							value = "Cédula de identidad";
						} else if (value === "passport") {
							value = "Pasaporte";
						} else if (value === "dni") {
							value = "DNI";
						} else if (value === "id") {
							value = "ID";
						}
						var toPush = {
							key: key,
							value: key,
							text: dataName + ": " + value,
						};
						if (
							key === "lastName" ||
							key === "firstName" ||
							key === "typeDocumentIdentity" ||
							key === "numberDocumentIdentity" ||
							key === "phone" ||
							key === "companyName" ||
							key === "companyTypeOfFiscalRecord" ||
							key === "companyNumberOfFiscalRecord" ||
							key === "companyYearRegistration"
						) {
							var objPdf = {
								label: dataName,
								value: value,
							};
							optionsPdf.push(objPdf);
						}

						options.push(toPush);
					}
				});
				this.setState({
					dataNameToEditOptions: options,
					dataToPdf: optionsPdf,
				});
			})
			.catch((error) => {
				this.setState({ errorInRed: true });
			});
	};

	openEditUserModal = (row, username) => {
		this.setState({
			modalEditUser: true,
		});
	};
	closeEditUserModal = () =>
		this.setState({ modalEditUser: false, activeItemEditUser: "addData" });
	openRemoveUserModal = (row, username) => {
		this.setState({
			modalRemoveUser: true,
		});
		this.DataRemoveVerifiToUser(username);
	};
	closeRemoveUserModal = () => this.setState({ modalRemoveUser: false });
	handleChecked = (e, data) => {
		var labelValue = data.value;
		var checkedValue = data.checked;
		var objectToSet = this.state.userVerifi;
		for (var i = 0; i < objectToSet.length; i++) {
			if (objectToSet[i].label === labelValue) {
				objectToSet[i].checked = checkedValue;
				break;
			}
		}
		this.setState({ userVerifi: objectToSet });
		this.showButtonVerifi();
	};
	showButtonVerifi() {
		let cont = 0;
		this.state.userVerifi.map(function (key) {
			if (key.checked === true) {
				cont = cont + 1;
			}
		});

		if (cont >= 1) {
			this.setState({ showUserVerifi: true });
		} else {
			this.setState({ showUserVerifi: false });
		}
	}
	pickDateFrom = (e, data) => {
		this.setState({ dateFrom: e.target.value });
	};
	pickDateTo = (e, data) => {
		this.setState({ dateTo: e.target.value });
	};

	render() {
		let t = this.state.translator;
		//let langNew =  window.sessionStorage.getItem("language");
		var operationsStatuses = [
			{
				key: "WAITING_FOR_PAYMENT",
				icon: "sync",
				value: "WAITING_FOR_PAYMENT",
				text: t("homeLoggedIn.transactions.detail.labels.WAITING_FOR_PAYMENT"),
			},
			{
				key: "CANCELED",
				icon: "warning circle",
				value: "CANCELED",
				text: t("homeLoggedIn.transactions.detail.labels.CANCELED"),
			},
			{
				key: "SUCCESS",
				icon: "check circle",
				value: "SUCCESS",
				text: t("homeLoggedIn.transactions.detail.labels.SUCCESS"),
			},
			{
				key: "CLAIM",
				icon: "info",
				value: "CLAIM",
				text: t("homeLoggedIn.transactions.detail.labels.CLAIM"),
			},
			// {
			//   key: "WAITING_FOR_PAYMENT_METHOD_VERIFICATION",
			//   icon: "payment",
			//   value: "WAITING_FOR_PAYMENT_METHOD_VERIFICATION",
			//   text: "ESPERANDO VERIFICACIÓN DE PAGO"
			// },
			{
				key: "PAY_VERIFICATION",
				icon: "info",
				value: "PAY_VERIFICATION",
				text: t("homeLoggedIn.transactions.detail.labels.PAY_VERIFICATION"),
			},
			// {
			// 	key: "WAITING_TO_START_OPERATION",
			// 	icon: "wait",
			// 	value: "WAITING_TO_START_OPERATION",
			// 	text: t(
			// 		"homeLoggedIn.transactions.detail.labels.WAITING_TO_START_OPERATION",
			// 	),
			// },
		];

		var operationsTypes = [
			// {
			// 	key: "SELL",
			// 	value: "SELL",
			// 	text: t("homeLoggedIn.transactions.detail.labels.SELL"),
			// },
			// {
			// 	key: "BUY",
			// 	value: "BUY",
			// 	text: t("homeLoggedIn.transactions.detail.labels.BUY"),
			// },
			{
				key: "SEND_TO_PAYMENT",
				value: "SEND_TO_PAYMENT",
				text: t("homeLoggedIn.transactions.detail.labels.SEND_TO_PAYMENT"),
			},
			{
				key: "MC_BUY_BALANCE",
				value: "MC_BUY_BALANCE",
				text: t("homeLoggedIn.transactions.detail.labels.MC_BUY_BALANCE"),
			},
		];

		let message, errorInRed;
		if (this.state.errorInRed) {
			errorInRed = (
				<Message info content={t("profile.optionDetail.messages.errorInRed")} />
			);
		}
		if (this.state.fail) {
			message = <Message info content={this.state.message} />;
		}
		if (this.state.failnegative) {
			message = <Message negative content={this.state.message} />;
		}
		const customOptionsFilterMethod = (filter, row) => {
			if (filter.value === "") {
				return true;
			}
			if (row.id.toLowerCase().includes(filter.value.toLowerCase()) === false) {
				return row[filter.id].includes(filter.value);
			} else {
				return true;
			}
		};
		const customOptionsFilterMethod2 = (filter, row) => {
			let date = this.formatDate(row.date);
			if (filter.value === "") {
				return true;
			}
			if (date.toLowerCase().includes(filter.value.toLowerCase()) === false) {
				return date.includes(filter.value);
			} else {
				return true;
			}
		};

		const operationsTableHeaders = [
			{
				Header: <Icon name='mail' />,
				accessor: "actions",
				width: 32,
				Cell: (row) => {
					if (
						row.original.status !== "FINISHED" &&
						row.original.status !== "SUCCESS"
					) {
						var icon;
						if (this.state.newIdMessage) {
							for (var i = 0; i < this.state.idsNewMessageIcon.length; i++) {
								if (this.state.idsNewMessageIcon[i] === row.original.id) {
									icon = (
										<Popup
											trigger={<Icon color='red' name='exclamation' />}
											content={t(
												"homeLoggedIn.transactions.detail.labels.newMessage",
											)}
										/>
									);
								}
							}
						}
					}
					return <div>{icon}</div>;
				},
			},
			{
				Header: t("homeLoggedIn.transactions.detail.labels.date"),
				accessor: "date",
				width: 134,
				filterable: true,
				minWidth: 110,
				width: 180,
				filterMethod: (filter, row) => customOptionsFilterMethod2(filter, row),
				Cell: (row) => {
					return this.formatDate(row.value);
				},
			},
			{
				Header: "ID",
				accessor: "id",
				width: 60,
				filterable: true,
				filterMethod: (filter, row) => customOptionsFilterMethod(filter, row),
				Cell: (row) => {
					return row.value.slice(-4);
				},
			},
			{
				Header: t("profile.optionDetail.stepUser.user"),
				accessor: "username",
				width: 110,
				Cell: (row) => {
					return (
						<p
							className='fake-link'
							onClick={() => this.openUserDetailModal(row.value)}>
							{row.value}
						</p>
					);
				},
			},
			{
				Header: t("homeLoggedIn.transactions.detail.labels.currency2"),
				accessor: "currency",
				Cell: (row) => {
					if (row.value !== "ETH") {
						return (
							<div>
								<Flag name={row.original.flag} /> {row.value}
							</div>
						);
					} else {
						return (
							<div>
								<Icon name={row.original.icon} /> {row.value}
							</div>
						);
					}
				},
				width: 70,
			},
			{
				Header: t("profile.optionDevices.tableHeader.operation"),
				accessor: "operationType",
				width: 107,
			},
			{
				Header: t("homeLoggedIn.transactions.detail.labels.price"),
				accessor: "price",
				width: 120,
				getProps: () => {
					return {
						style: {
							textAlign: "left",
						},
					};
				},
				Cell: (row) => {
					if (row.value !== undefined) {
						return (
							<NumberFormat
								value={this.floorDecimals(row.value, 2)}
								decimalScale={2}
								fixedDecimalScale={true}
								displayType={"text"}
								thousandSeparator={true}
							/>
						);
					} else {
						return "N/A";
					}
				},
			},
			{
				Header: t("homeLoggedIn.transactions.detail.labels.amount2"),
				accessor: "amount",
				width: 120,
				getProps: () => {
					return {
						style: {
							textAlign: "left",
						},
					};
				},
				Cell: (row) => {
					return (
						<NumberFormat
							value={this.floorDecimals(row.value, 2)}
							decimalScale={2}
							fixedDecimalScale={true}
							displayType={"text"}
							thousandSeparator={true}
						/>
					);
				},
			},
			{
				Header:
					t("homeLoggedIn.transactions.detail.labels.amount2") + "" + " BTC",
				accessor: "amountBTC",
				getProps: () => {
					return {
						style: {
							textAlign: "left",
						},
					};
				},
				width: 120,
				Cell: (row) => {
					if (row.value !== null) {
						return (
							<NumberFormat
								value={this.floorDecimals(row.value, 8)}
								displayType={"text"}
								thousandSeparator={true}
							/>
						);
					} else {
						return "N/A";
					}
				},
			},
			{
				Header: t("profile.optionDevices.tableHeader.status"),
				accessor: "status",
				Cell: (row) => {
					if (row.value === "STARTED") {
						return (
							<Label color='blue'>
								<Icon name='hourglass start' />
								{t("homeLoggedIn.tableHeader.statusValues.started")}
							</Label>
						);
					} else if (row.value === "WAITING_FOR_PAYMENT") {
						return (
							<Label color='blue'>
								<Icon name='sync' loading />
								{t("homeLoggedIn.tableHeader.statusValues.waitingPayment")}
							</Label>
						);
					} else if (row.value === "CANCELED") {
						return (
							<Label color='red'>
								<Icon name='warning circle' />
								{t("homeLoggedIn.tableHeader.statusValues.canceled")}
							</Label>
						);
					} else if (
						row.value === "FINISHED" ||
						row.original.status === "SUCCESS"
					) {
						return (
							<Label color='green'>
								<Icon name='check circle' />
								{t("homeLoggedIn.tableHeader.statusValues.success")}
							</Label>
						);
					} else if (row.value === "PAID" || row.value === "PAY_VERIFICATION") {
						return (
							<Label color='orange'>
								<Icon name='info' />
								{t("homeLoggedIn.tableHeader.statusValues.payVerification")}
							</Label>
						);
					} else if (row.value === "WAITING_FOR_PAYMENT_METHOD_VERIFICATION") {
						return (
							<Label color='yellow'>
								<Icon name='payment' loading />
								{t(
									"homeLoggedIn.tableHeader.statusValues.waitingPayVerification",
								)}
							</Label>
						);
					} else if (row.value === "WAITING_TO_START_OPERATION") {
						return (
							<Label color='purple'>
								<Icon name='wait' />
								{t("homeLoggedIn.tableHeader.statusValues.waitingToStart")}
							</Label>
						);
					} else if (row.value === "CLAIM") {
						return (
							<Label color='grey'>
								<Icon name='info' />
								{t("homeLoggedIn.tableHeader.statusValues.claim")}
							</Label>
						);
					} else {
						return (
							<Label color='grey'>
								<Icon name='info' />
								{row.value}
							</Label>
						);
					}
				},
			},
		];
		let addInfoMessage;
		if (this.state.failAddInfo) {
			addInfoMessage = (
				<Message negative>
					<Message.Header>Error</Message.Header>
					<p>{this.state.messageAddInfo}</p>
				</Message>
			);
		}
		let removeVerifiMessage;
		if (this.state.failRemoveVerifi) {
			removeVerifiMessage = (
				<Message info>
					<Message.Header>
						{t("profile.optionDetail.messages.successElimination")}
					</Message.Header>
					<p>{this.state.messageRemoveVerifi}</p>
				</Message>
			);
		}
		if (this.state.failRemoveVerifierror) {
			removeVerifiMessage = (
				<Message negative>
					<Message.Header>
						{t("profile.optionDetail.messages.successElimination")}
					</Message.Header>
					<p>{this.state.messageRemoveVerifi}</p>
				</Message>
			);
		}
		return (
			<div>
				{/* <Modal open={this.state.userVerifi} onClose={!this.state.userVerifi}>
          <Modal.Header>Eliminar verificación del usuario</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Message positive>
                <p>
                  La verificación del usuario ha sido eliminada exitosamente.
                </p>
              </Message>
            </Modal.Description>
          </Modal.Content>
        </Modal> */}
				<Modal
					closeIcon
					open={this.state.userDetailModal}
					onClose={this.closeUserDetailModal}>
					<Modal.Header>
						{t("profile.optionDetail.messages.userDetail")}
					</Modal.Header>
					<Modal.Content scrolling>
						{Object.keys(this.state.userInfo).length === 0 && (
							<Segment basic loading></Segment>
						)}
						{Object.keys(this.state.userInfo).length > 0 && (
							<Modal.Description>
								<Form>
									{this.state.userInfo.isACompany && (
										<Divider horizontal>
											<Header as='h4'>
												{t("profile.optionDetail.messages.companyData")}
											</Header>
										</Divider>
									)}
									{this.state.userInfo.isACompany && (
										<Form.Group widths='equal'>
											<Form.Field>
												<label>
													{t("profile.optionDetail.messages.companyName")}
												</label>
												<p className='infoUserParagraph'>
													{this.state.userInfo.companyName !== undefined &&
													this.state.userInfo.companyName !== ""
														? this.state.userInfo.companyName
														: t("dynamicForm.labels.descriptionContent")}
												</p>
											</Form.Field>
											<Form.Field>
												<label>
													{t(
														"recharge.formVerificationIdentity.form.verifyCUninitiatedCompany.registerFiscalType",
													)}
												</label>
												<p className='infoUserParagraph'>
													{this.state.userInfo.companyTypeOfFiscalRecord !==
														undefined &&
													this.state.userInfo.companyTypeOfFiscalRecord !== ""
														? this.state.userInfo.companyTypeOfFiscalRecord
														: t("dynamicForm.labels.descriptionContent")}
												</p>
											</Form.Field>
											<Form.Field>
												<label>
													{t(
														"recharge.formVerificationIdentity.form.verifyCUninitiatedCompany.registerFiscalNumber",
													)}
												</label>
												<p className='infoUserParagraph'>
													{this.state.userInfo.companyNumberOfFiscalRecord !==
														undefined &&
													this.state.userInfo.companyNumberOfFiscalRecord !== ""
														? this.state.userInfo.companyNumberOfFiscalRecord
														: t("dynamicForm.labels.descriptionContent")}
												</p>
											</Form.Field>
											<Form.Field>
												<label>
													{t(
														"recharge.formVerificationIdentity.form.verifyCUninitiatedCompany.registerYear",
													)}
												</label>
												<p className='infoUserParagraph'>
													{this.state.userInfo.companyYearRegistration !==
														undefined &&
													this.state.userInfo.companyYearRegistration !== ""
														? this.state.userInfo.companyYearRegistration
														: t("dynamicForm.labels.descriptionContent")}
												</p>
											</Form.Field>
										</Form.Group>
									)}
									<Divider horizontal>
										<Header as='h4'>
											{t(
												"homeLoggedIn.transactions.detail.labels.personalData",
											)}
										</Header>
									</Divider>
									<Form.Group widths='equal'>
										<Form.Field>
											<label>
												{t("recharge.formVerificationIdentity.form.name")}
											</label>
											<p className='infoUserParagraph'>
												{this.state.userInfo.firstName !== undefined &&
												this.state.userInfo.firstName !== ""
													? this.state.userInfo.firstName
													: t("dynamicForm.labels.descriptionContent")}
											</p>
										</Form.Field>
										<Form.Field>
											<label>
												{t("recharge.formVerificationIdentity.form.lastName")}
											</label>
											<p className='infoUserParagraph'>
												{this.state.userInfo.lastName !== undefined &&
												this.state.userInfo.lastName !== ""
													? this.state.userInfo.lastName
													: t("dynamicForm.labels.descriptionContent")}
											</p>
										</Form.Field>
										<Form.Field>
											<label>
												{t("recharge.formVerificationIdentity.form.sex")}
											</label>
											<p className='infoUserParagraph'>
												{this.state.userInfo.gender !== undefined &&
												this.state.userInfo.gender !== ""
													? this.state.userInfo.gender === "male"
														? t("profile.optionDetail.sexList.male")
														: t("profile.optionDetail.sexList.female")
													: t("profile.documentType.other")}
											</p>
										</Form.Field>
										<Form.Field>
											<label>
												{" "}
												{t(
													"recharge.formVerificationIdentity.form.documentType",
												)}
											</label>
											<p className='infoUserParagraph'>
												{this.state.userInfo.typeDocumentIdentity !==
													undefined &&
												this.state.userInfo.typeDocumentIdentity !== ""
													? this.state.userInfo.typeDocumentIdentity
													: t("dynamicForm.labels.descriptionContent")}
											</p>
										</Form.Field>
										<Form.Field>
											<label>
												{" "}
												{t("recharge.formVerificationIdentity.form.numberId")}
											</label>
											<p className='infoUserParagraph'>
												{this.state.userInfo.numberDocumentIdentity !==
													undefined &&
												this.state.userInfo.numberDocumentIdentity !== ""
													? this.state.userInfo.numberDocumentIdentity
													: t("dynamicForm.labels.descriptionContent")}
											</p>
										</Form.Field>
									</Form.Group>
									<Form.Group widths='equal'>
										<Form.Field>
											<label>
												{t("recharge.formVerificationIdentity.form.birthday")}
											</label>
											<p className='infoUserParagraph'>
												{this.state.userInfo.birthdate !== undefined &&
												this.state.userInfo.birthdate !== ""
													? this.formatDateModal(
															new Date(this.state.userInfo.birthdate),
													  )
													: t("dynamicForm.labels.descriptionContent")}
											</p>
										</Form.Field>
										<Form.Field>
											<label>
												{t("recharge.formVerificationIdentity.form.birthplace")}
											</label>
											<p className='infoUserParagraph'>
												{this.state.userInfo.birthplace !== undefined &&
												this.state.userInfo.birthplace !== ""
													? this.state.userInfo.birthplace
													: t("dynamicForm.labels.descriptionContent")}
											</p>
										</Form.Field>
										<Form.Field>
											<label>
												{t(
													"recharge.formVerificationIdentity.form.addressPersonal",
												)}
											</label>
											<p className='infoUserParagraph'>
												{this.state.userInfo.userDirection !== undefined &&
												this.state.userInfo.userDirection !== ""
													? this.state.userInfo.userDirection
													: t("dynamicForm.labels.descriptionContent")}
											</p>
										</Form.Field>
										<Form.Field>
										</Form.Field>
										<Form.Field>
											<label>
												{t("recharge.formVerificationIdentity.form.phone")}
											</label>
											<p className='infoUserParagraph'>
												{this.state.userInfo.phone !== undefined &&
												this.state.userInfo.phone !== ""
													? this.state.userInfo.phone
													: t("dynamicForm.labels.descriptionContent")}
											</p>
										</Form.Field>
										{/* <Form.Field>
											<label>
												{t(
													"recharge.formVerificationIdentity.form.localbitcoinUser",
												)}
											</label>
											<p className='infoUserParagraph'>
												{this.state.userInfo.userLocalBitcoin !== undefined &&
												this.state.userInfo.userLocalBitcoin !== ""
													? this.state.userInfo.userLocalBitcoin
													: t("dynamicForm.labels.descriptionContent")}
											</p>
										</Form.Field> */}
									</Form.Group>
									<Form.Group widths='equal'>
										{/* <Form.Field>
											<label>
												{t(
													"recharge.formVerificationIdentity.form.facebookUser",
												)}
											</label>
											<p className='infoUserParagraph'>
												{this.state.userInfo.userFacebook !== undefined &&
												this.state.userInfo.userFacebook !== ""
													? this.state.userInfo.userFacebook
													: t("dynamicForm.labels.descriptionContent")}
											</p>
										</Form.Field> */}
										<Form.Field>
											<label>
												{" "}
												{t(
													"recharge.formVerificationIdentity.form.securityQuestion",
												)}
											</label>
											<p className='infoUserParagraph'>
												{this.state.userInfo.questionSecurity !== undefined &&
												this.state.userInfo.questionSecurity !== ""
													? this.state.userInfo.questionSecurity
													: t("dynamicForm.labels.descriptionContent")}
											</p>
										</Form.Field>
										<Form.Field>
											<label>
												{t(
													"recharge.formVerificationIdentity.form.securityAnswer",
												)}
											</label>
											<p className='infoUserParagraph'>
												{this.state.userInfo.answerSecurity !== undefined &&
												this.state.userInfo.answerSecurity !== ""
													? this.state.userInfo.answerSecurity
													: t("dynamicForm.labels.descriptionContent")}
											</p>
										</Form.Field>
										<Form.Field>
											<label>
												{" "}
												{t(
													"recharge.formVerificationIdentity.form.contactFamily",
												)}
											</label>
											<p className='infoUserParagraph'>
												{this.state.userInfo.familyName !== undefined &&
												this.state.userInfo.familyName !== ""
													? this.state.userInfo.familyName
													: t("dynamicForm.labels.descriptionContent")}
											</p>
										</Form.Field>
										<Form.Field>
											<label>
												{" "}
												{t(
													"recharge.formVerificationIdentity.form.contactEmailFamily",
												)}
											</label>
											<p className='infoUserParagraph'>
												{this.state.userInfo.familyEmail !== undefined &&
												this.state.userInfo.familyEmail !== ""
													? this.state.userInfo.familyEmail
													: t("dynamicForm.labels.descriptionContent")}
											</p>
										</Form.Field>
										<Form.Field>
										</Form.Field>
									</Form.Group>
									<Divider horizontal>
										<Header as='h4'>
											{t("homeLoggedIn.transactions.detail.labels.userData")}
										</Header>
									</Divider>
									<Form.Group widths='equal'>
										<Form.Field>
											<label>Email</label>
											{this.state.userInfo.email}
										</Form.Field>
										<Form.Field style={{ marginRight: -110 }}>
											<label>{t("profile.optionDetail.fields.address")}</label>
											{this.state.walletUser !== undefined &&
											this.state.walletUser !== ""
												? this.state.walletUser
												: t("dynamicForm.labels.descriptionContent")}
										</Form.Field>
										<Form.Field />
										<Form.Field>
											<label>{t("profile.optionDetail.fields.userType")}</label>
											{this.state.userInfo.type}
										</Form.Field>
										<Form.Field>
											<label>
												{t("profile.optionDetail.fields.statusUser")}
											</label>
											{this.state.userInfo.active
												? t("profile.optionDevices.statusActive")
												: t("profile.optionDevices.statusInactive")}
										</Form.Field>
									</Form.Group>
									<Form.Group widths='equal'>
										<Form.Field>
											<label>{t("profile.optionDetail.nickname.value")}</label>
											{this.state.userInfo.nickname !== undefined &&
											this.state.userInfo.nickname !== ""
												? this.state.userInfo.nickname
												: t("dynamicForm.labels.descriptionContent")}
										</Form.Field>
										<Form.Field>
											<label>
												{t(
													"homeLoggedIn.transactions.detail.labels.enviromentUser",
												)}
											</label>
											{this.state.userInfo.environment}
										</Form.Field>
										<Form.Field>
											<label>
												{t(
													"homeLoggedIn.transactions.detail.labels.operationAccount",
												)}
											</label>
											{this.state.userInfo.operationAccount}
										</Form.Field>
										<Form.Field />
										<Form.Field />
									</Form.Group>
									{/* {this.state.userInfo &&
                  this.state.userInfo.other !==undefined&&
                  this.state.userInfo.other.length   > 0 && (
                    <Container>
                      <Form.Group widths="equal">
                        {this.state.userInfo.other.map(k => {
                          return (
                            <div>
                              {k.dataName !== "wallets" && k.dataName!== "identityVerificationMc"&&(
                                <Form.Field>
                                  <label>
                                  
                                    {k.dataName === "nickname"
                                      ? "Nombre de usuario":k.dataName === "createdFromMCSend"? "Creado desde MoneyClick": k.dataName}
                                  </label>
                                  <p className="infoUserParagraph">
                                    {" "}
                                    {(k.dataName === "createdFromMCSend" &&
                                      k.dataValue===true)  ? "Si" : (k.dataName === "createdFralseomMCSend"&&
                                      k.dataValue===false) ? "No":(k.dataName === "automaticChange" &&
                                      k.dataValue.active===true)  ? "Activado":k.dataValue }
                                  </p>
                                </Form.Field>
                                
                              )}
                            </div>
                          );
                        })}
                      </Form.Group>     
                    </Container>
                  )} */}
									<Container textAlign='center'>
										<Divider horizontal>
											<Header as='h4'>
												{t("profile.optionDetail.stepUser.aditionalData")}
											</Header>
										</Divider>
										<Grid centered columns={2}>
											<Grid.Column>
												<Grid.Row>
													<div style={{ textAlign: "center" }}>
														<p>
															<b style={{ color: "#207ef2" }}>
																{this.state.userInfo.isACompany
																	? t(
																			"profile.updateProfile.form.verifyCUninitiatedCompany.documentID",
																	  )
																	: t("profile.optionDetail.fields.id")}
															</b>
														</p>
														{this.state.identityURLToVerify !== undefined &&
														this.state.identityURLToVerify !== null &&
														this.state.identityURLToVerify !== "" &&
														this.state.identityURLToVerify.isPdf ? ( // primer caso de pdf
															<div>
																<List.Item>
																	<Document
																		file={this.state.identityURLToVerify.file}
																		externalLinkTarget='_blank'>
																		<Page
																			pageNumber={1}
																			width={200}
																			height={200}
																		/>
																	</Document>
																</List.Item>
																{this.state.identityURLToVerify.file !== "" && (
																	<Button
																		as='a'
																		href={this.state.identityURLToVerify.file}
																		target='_blank'
																		rel='noopener noreferrer'>
																		{t(
																			"recharge.history.accordion.buttonDownload",
																		)}{" "}
																		{""} PDF
																	</Button>
																)}
															</div>
														) : this.state.identityURLToVerify !== undefined &&
														  this.state.identityURLToVerify !== null &&
														  this.state.identityURLToVerify !== "" ? (
															<Modal
																//key={id}
																trigger={
																	// <List.Item>
																	<Image
																		title={t(
																			"homeLoggedIn.transactions.detail.labels.fullScreen",
																		)}
																		src={this.state.identityURLToVerify.file}
																		target='_blank'
																		rel='noopener noreferrer'
																		alt=''
																		size='medium'
																		as='a'
																		style={{
																			maxHeight: "200px",
																		}}
																	/>
																	// </List.Item> */}
																}>
																{/* <Modal.Header>{t(element.message)}</Modal.Header> */}
																<Modal.Content>
																	<Image
																		centered
																		src={this.state.identityURLToVerify.file}
																		size='huge'
																	/>
																</Modal.Content>
															</Modal>
														) : (
															<Segment size='tiny' placeholder>
																<Header icon>
																	<Icon name='file image outline' />
																	{t(
																		"recharge.formVerificationIdentity.errors.notUploaded",
																	)}
																</Header>
															</Segment>
														)}
													</div>
												</Grid.Row>
											</Grid.Column>
											<Grid.Column>
												<Grid.Row>
													<div style={{ textAlign: "center" }}>
														<p>
															<b style={{ color: "#207ef2" }}>
																{this.state.userInfo.isACompany
																	? t(
																			"recharge.formVerificationIdentity.form.verifyCUninitiatedCompany.bankAccountSupport",
																	  )
																	: t(
																			"recharge.formVerificationIdentity.form.verifyCUninitiatedPersonal.bankAccountSupport",
																	  )}
															</b>
														</p>
														{this.state.bankURLToVerify !== undefined &&
														this.state.bankURLToVerify !== null &&
														this.state.bankURLToVerify !== "" &&
														this.state.bankURLToVerify.isPdf ? ( // segundo caso de pdf
															<div>
																<List.Item>
																	<Document
																		file={this.state.bankURLToVerify.file}
																		externalLinkTarget='_blank'>
																		<Page
																			pageNumber={1}
																			width={200}
																			height={200}
																		/>
																	</Document>
																</List.Item>

																<Button
																	as='a'
																	href={this.state.bankURLToVerify.file}
																	target='_blank'
																	rel='noopener noreferrer'>
																	{t(
																		"recharge.history.accordion.buttonDownload",
																	)}{" "}
																	{""} PDF
																</Button>
															</div>
														) : this.state.bankURLToVerify !== undefined &&
														  this.state.bankURLToVerify !== null &&
														  this.state.bankURLToVerify !== "" ? (
															<Modal
																//key={id}
																trigger={
																	// <List.Item>
																	<Image
																		centered
																		title={t(
																			"homeLoggedIn.transactions.detail.labels.fullScreen",
																		)}
																		src={this.state.bankURLToVerify.file}
																		target='_blank'
																		rel='noopener noreferrer'
																		alt=''
																		size='medium'
																		as='a'
																		style={{
																			maxHeight: "200px",
																		}}
																	/>
																	// </List.Item> */}
																}>
																{/* <Modal.Header>{t(element.message)}</Modal.Header> */}
																<Modal.Content>
																	<Image
																		centered
																		src={this.state.bankURLToVerify.file}
																		size='huge'
																	/>
																</Modal.Content>
															</Modal>
														) : (
															<Segment size='tiny' placeholder>
																<Header icon>
																	<Icon name='file image outline' />
																	{t(
																		"recharge.formVerificationIdentity.errors.notUploaded",
																	)}
																</Header>
															</Segment>
														)}
													</div>
												</Grid.Row>
											</Grid.Column>
											<Grid.Column>
												<Grid.Row>
													<div style={{ textAlign: "center" }}>
														<p>
															<b style={{ color: "#207ef2" }}>
																{this.state.userInfo.isACompany
																	? t(
																			"recharge.formVerificationIdentity.form.verifyCUninitiatedCompany.registerFiscal",
																	  )
																	: t(
																			"recharge.formVerificationIdentity.form.verifyCUninitiatedPersonal.addressSupport",
																	  )}
															</b>
														</p>
														{this.state.locationURLToVerify !== undefined &&
														this.state.locationURLToVerify !== null &&
														this.state.locationURLToVerify !== "" &&
														this.state.locationURLToVerify.isPdf ? ( //tercer caso pdf
															<div>
																<List.Item>
																	<Document
																		file={this.state.locationURLToVerify.file}
																		externalLinkTarget='_blank'>
																		<Page
																			pageNumber={1}
																			width={200}
																			height={200}
																		/>
																	</Document>
																</List.Item>
																<Button
																	as='a'
																	href={this.state.locationURLToVerify.file}
																	target='_blank'
																	rel='noopener noreferrer'>
																	{t(
																		"recharge.history.accordion.buttonDownload",
																	)}{" "}
																	{""} PDF
																</Button>
															</div>
														) : this.state.locationURLToVerify !== undefined &&
														  this.state.locationURLToVerify !== null &&
														  this.state.locationURLToVerify !== "" ? (
															<Modal
																//key={id}
																trigger={
																	// <List.Item>
																	<div centered>
																		<Image
																			centered
																			title={t(
																				"homeLoggedIn.transactions.detail.labels.fullScreen",
																			)}
																			src={this.state.locationURLToVerify.file}
																			target='_blank'
																			rel='noopener noreferrer'
																			alt=''
																			size='medium'
																			as='a'
																			style={{
																				maxHeight: "200px",
																			}}
																		/>
																	</div>
																	// </List.Item> */}
																}>
																{/* <Modal.Header>{t(element.message)}</Modal.Header> */}
																<Modal.Content>
																	<Image
																		centered
																		src={this.state.locationURLToVerify.file}
																		size='huge'
																	/>
																</Modal.Content>
															</Modal>
														) : (
															<Segment size='tiny' placeholder>
																<Header icon>
																	<Icon name='file image outline' />
																	{t(
																		"recharge.formVerificationIdentity.errors.notUploaded",
																	)}
																</Header>
															</Segment>
														)}
													</div>
												</Grid.Row>
											</Grid.Column>
											<Grid.Column>
												<Grid.Row>
													<div style={{ textAlign: "center" }}>
														<p>
															<b style={{ color: "#207ef2" }}>
																{this.state.userInfo.isACompany
																	? t(
																			"recharge.formVerificationIdentity.form.verifyCUninitiatedCompany.selfieSupport",
																	  )
																	: t(
																			"recharge.formVerificationIdentity.form.verifyCUninitiatedPersonal.addressSupport",
																	  )}
															</b>
														</p>
														{this.state.selfURLToVerify !== undefined &&
														this.state.selfURLToVerify !== null &&
														this.state.selfURLToVerify !== "" &&
														this.state.selfURLToVerify.isPdf ? ( // cuarto caso de pdf
															<div>
																<List.Item>
																	<Document
																		file={this.state.selfURLToVerify.file}
																		externalLinkTarget='_blank'>
																		<Page
																			pageNumber={1}
																			width={200}
																			height={200}
																		/>
																	</Document>
																</List.Item>
																<Button
																	as='a'
																	href={this.state.selfURLToVerify.file}
																	target='_blank'
																	rel='noopener noreferrer'>
																	{t(
																		"recharge.history.accordion.buttonDownload",
																	)}{" "}
																	{""} PDF
																</Button>
															</div>
														) : this.state.selfURLToVerify !== undefined &&
														  this.state.selfURLToVerify !== null &&
														  this.state.selfURLToVerify !== "" ? (
															<Modal
																//key={id}
																trigger={
																	// <List.Item>
																	<Image
																		title={t(
																			"homeLoggedIn.transactions.detail.labels.fullScreen",
																		)}
																		src={this.state.selfURLToVerify.file}
																		target='_blank'
																		rel='noopener noreferrer'
																		alt=''
																		size='medium'
																		as='a'
																		style={{
																			maxHeight: "200px",
																		}}
																	/>
																	// </List.Item> */}
																}>
																{/* <Modal.Header>{t(element.message)}</Modal.Header> */}
																<Modal.Content>
																	<Image
																		centered
																		src={this.state.selfURLToVerify.file}
																		size='huge'
																	/>
																</Modal.Content>
															</Modal>
														) : (
															<Segment size='tiny' placeholder>
																<Header icon>
																	<Icon name='file image outline' />
																	{t(
																		"recharge.formVerificationIdentity.errors.notUploaded",
																	)}
																	.
																</Header>
															</Segment>
														)}
													</div>
												</Grid.Row>
											</Grid.Column>
											<Grid.Column>
												<Grid.Row>
													<div style={{ textAlign: "center" }}>
														<p>
															<b style={{ color: "#207ef2" }}>
																{"Verificación de Identidad MoneyClick"}
															</b>
														</p>
														{this.state.identityVerificationMcURLToVerify !==
															undefined &&
														this.state.identityVerificationMcURLToVerify !==
															null &&
														this.state.identityVerificationMcURLToVerify !==
															"" &&
														this.state.identityVerificationMcURLToVerify
															.isPdf ? (
															// segundo caso de pdf
															<div>
																<List.Item>
																	<Document
																		file={
																			this.state
																				.identityVerificationMcURLToVerify.file
																		}
																		externalLinkTarget='_blank'>
																		<Page
																			pageNumber={1}
																			width={200}
																			height={200}
																		/>
																	</Document>
																</List.Item>
																<Button
																	as='a'
																	href={
																		this.state.identityVerificationMcURLToVerify
																			.file
																	}
																	target='_blank'
																	rel='noopener noreferrer'>
																	{t(
																		"recharge.history.accordion.buttonDownload",
																	)}{" "}
																	{""} PDF
																</Button>
															</div>
														) : this.state.identityVerificationMcURLToVerify !==
																undefined &&
														  this.state.identityVerificationMcURLToVerify !==
																null &&
														  this.state.identityVerificationMcURLToVerify !==
																"" ? (
															<Modal
																//key={id}
																trigger={
																	// <List.Item>
																	<Image
																		title={t(
																			"homeLoggedIn.transactions.detail.labels.fullScreen",
																		)}
																		src={
																			this.state
																				.identityVerificationMcURLToVerify.file
																		}
																		target='_blank'
																		rel='noopener noreferrer'
																		alt=''
																		size='medium'
																		as='a'
																		style={{ maxHeight: "200px" }}
																	/>
																	// </List.Item> */}
																}>
																<Modal.Content>
																	<Image
																		centered
																		src={
																			this.state
																				.identityVerificationMcURLToVerify.file
																		}
																		size='huge'
																	/>
																</Modal.Content>
															</Modal>
														) : (
															<Segment size='tiny' placeholder>
																<Header icon>
																	<Icon name='file image outline' />
																	{t(
																		"recharge.formVerificationIdentity.errors.notUploaded",
																	)}
																	.
																</Header>
															</Segment>
														)}
													</div>
												</Grid.Row>
											</Grid.Column>
											<Grid.Column>
												<Grid.Row>
													<div style={{ textAlign: "center" }}>
														<p>
															<b style={{ color: "#207ef2" }}>
																{
																	"Selfie de Verificación de Identidad MoneyClick"
																}
															</b>
														</p>
														{this.state.selfieVerificationMcURLToVerify !==
															undefined &&
														this.state.selfieVerificationMcURLToVerify !==
															null &&
														this.state.selfieVerificationMcURLToVerify !== "" &&
														this.state.selfieVerificationMcURLToVerify.isPdf ? (
															// segundo caso de pdf
															<div>
																<List.Item>
																	<Document
																		file={
																			this.state.selfieVerificationMcURLToVerify
																				.file
																		}
																		externalLinkTarget='_blank'>
																		<Page
																			pageNumber={1}
																			width={200}
																			height={200}
																		/>
																	</Document>
																</List.Item>
																<Button
																	as='a'
																	href={
																		this.state.selfieVerificationMcURLToVerify
																			.file
																	}
																	target='_blank'
																	rel='noopener noreferrer'>
																	{t(
																		"recharge.history.accordion.buttonDownload",
																	)}{" "}
																	{""} PDF
																</Button>
															</div>
														) : this.state.selfieVerificationMcURLToVerify !==
																undefined &&
														  this.state.selfieVerificationMcURLToVerify !==
																null &&
														  this.state.selfieVerificationMcURLToVerify !==
																"" ? (
															<Modal
																//key={id}
																trigger={
																	// <List.Item>
																	<Image
																		title={t(
																			"homeLoggedIn.transactions.detail.labels.fullScreen",
																		)}
																		src={
																			this.state.selfieVerificationMcURLToVerify
																				.file
																		}
																		target='_blank'
																		rel='noopener noreferrer'
																		alt=''
																		size='medium'
																		as='a'
																		style={{ maxHeight: "200px" }}
																	/>
																	// </List.Item> */}
																}>
																<Modal.Content>
																	<Image
																		centered
																		src={
																			this.state.selfieVerificationMcURLToVerify
																				.file
																		}
																		size='huge'
																	/>
																</Modal.Content>
															</Modal>
														) : (
															<Segment size='tiny' placeholder>
																<Header icon>
																	<Icon name='file image outline' />
																	{t(
																		"recharge.formVerificationIdentity.errors.notUploaded",
																	)}
																	.
																</Header>
															</Segment>
														)}
													</div>
												</Grid.Row>
											</Grid.Column>
											{this.state.otherDocumentsToShow.length > 0 && (
												<Container>
													<Divider horizontal>
														<Header as='h4'>Otros documentos</Header>
													</Divider>

													<Grid columns={2}>
														{this.state.otherDocumentsToShow.map((document) => {
															return (
																<Grid.Column key={document.url}>
																	{document.url !== undefined &&
																	(document.url.endsWith(".pdf") ||
																		document.url.endsWith(".PDF")) ? (
																		<Grid centered>
																			<Grid.Row>
																				<label>
																					<b
																						style={{
																							color: "#207ef2",
																						}}>
																						{document.name}
																					</b>
																				</label>
																			</Grid.Row>
																			<Grid.Row>
																				<iframe
																					title='PDF'
																					src={document.url}
																					width='300'
																					height='250'
																					frameBorder='0'
																					allowFullScreen
																				/>
																				<Button
																					as='a'
																					href={document.url}
																					target='_blank'
																					rel='noopener noreferrer'>
																					Ver PDF pantalla completa
																				</Button>
																			</Grid.Row>
																		</Grid>
																	) : document.url !== undefined &&
																	  document.url !== null ? (
																		<Grid centered>
																			<Grid.Row>
																				<label>{document.name}</label>
																			</Grid.Row>
																			<Grid.Row>
																				<Image
																					title={t(
																						"homeLoggedIn.transactions.detail.labels.fullScreen",
																					)}
																					target='_blank'
																					rel='noopener noreferrer'
																					alt=''
																					href={document.url}
																					src={document.url}
																					size='medium'
																				/>
																			</Grid.Row>
																		</Grid>
																	) : (
																		<Segment size='tiny' placeholder>
																			<Header icon>
																				<Icon name='file image outline' />
																				{t(
																					"recharge.formVerificationIdentity.errors.notUploaded",
																				)}
																				.
																			</Header>
																		</Segment>
																	)}
																</Grid.Column>
															);
														})}
													</Grid>
												</Container>
											)}
										</Grid>
									</Container>
								</Form>
							</Modal.Description>
						)}
					</Modal.Content>
				</Modal>
				<Modal
					closeIcon
					open={this.state.modalNoPaymentForThisCurrency}
					onClose={this.closeNoPaymentForThisCurrencyModal}>
					<Modal.Header>
						{t("homeLoggedIn.transactions.detail.labels.warningImportant")}
					</Modal.Header>
					<Modal.Content>
						<Modal.Description>
							<p>{t("fastChange.errorPymentMethod")}</p>
						</Modal.Description>
					</Modal.Content>
				</Modal>
				{!this.state.showOperationsTable && !this.state.errorInRed && (
					<Dimmer active inverted>
						<Loader inverted>
							{t("profile.optionDevices.table.loading")}...
						</Loader>
					</Dimmer>
				)}
				<Divider hidden />
				<Grid>
					<Grid.Column largeScreen={2} computer={1} widescreen={2} />

					<Grid.Column largeScreen={12} computer={14} widescreen={12}>
						<Segment inverted textAlign='left' className='titleComponents'>
							<h4 className='headerComponent'>{t("nav.otcOperationsTitle")}</h4>
						</Segment>
						<Divider hidden></Divider>
						<Form>
							<Form.Group centered>
								{/* style={{ marginRight: 70 }} */}
								<Form.Field width={4}>
									<label>
										{t(
											"homeLoggedIn.transactions.detail.labels.currencytoConsult",
										)}
									</label>
									<Dropdown
										placeholder={t(
											"homeLoggedIn.transactions.detail.labels.select",
										)}
										fluid
										multiple
										search
										selection
										options={this.state.currenciesToSearch}
										onChange={this.pickCurrencyToSearch}
									/>
								</Form.Field>
								{/* <Form.Field>
              <label>Usuario a consultar</label>
              <Select
                search
                placeholder="Seleccione un usuario"
                options={this.state.usernamesToSearch}
                onChange={this.pickUsernameToSearch}
              />
            </Form.Field> */}
								<Form.Field width={4}>
									<label>
										{t(
											"homeLoggedIn.transactions.detail.labels.paymentMethodtoConsult",
										)}
									</label>
									<Dropdown
										placeholder={t(
											"homeLoggedIn.transactions.detail.labels.select",
										)}
										fluid
										multiple
										search
										selection
										options={this.state.paymentTypesToSearch}
										onChange={this.pickPaymentMethodToSearch}
									/>
								</Form.Field>
								<Form.Field width={4}>
									<label>
										{" "}
										{t(
											"homeLoggedIn.transactions.detail.labels.operationToConsult",
										)}
									</label>
									<Dropdown
										placeholder={t(
											"homeLoggedIn.transactions.detail.labels.select",
										)}
										fluid
										multiple
										search
										selection
										options={
											// window.sessionStorage.getItem("language") === "es"
											// 	? this.state.OTCOperationTypesToSearch
											// 	: this.state.OTCOperationTypesToSearch.value
											operationsTypes
										}
										onChange={this.pickOTCOperationTypeToSearch}
									/>
								</Form.Field>
								{/* <Form.Field></Form.Field> */}
							</Form.Group>
							<Form.Group centered>
								<Form.Field width={4}>
									<label>
										{" "}
										{t(
											"homeLoggedIn.transactions.detail.labels.statusToConsult",
										)}
									</label>
									<Dropdown
										placeholder={t(
											"homeLoggedIn.transactions.detail.labels.select",
										)}
										fluid
										multiple
										search
										selection
										options={operationsStatuses}
										onChange={this.pickOTCOperationStatusToSearch}
									/>
								</Form.Field>
								<Form.Field width={4}>
									<label>
										{t("homeLoggedIn.transactions.detail.labels.initDate")}
									</label>
									<Input
										type='date'
										name='date1'
										onChange={this.pickDateFrom}></Input>
								</Form.Field>

								<Form.Field width={4}>
									<label>
										{t("homeLoggedIn.transactions.detail.labels.endDate")}
									</label>
									<Input
										type='date'
										name='date2'
										onChange={this.pickDateTo}></Input>
								</Form.Field>
								<Form.Button
									icon
									labelPosition='left'
									color='blue'
									style={{ marginTop: 23 }}
									type='submit'
									onClick={this.getOperationsFilter}
									loading={this.state.searchLoad}>
									<Icon name='search' />
									{t("homeLoggedIn.transactions.detail.labels.search")}
								</Form.Button>
							</Form.Group>
							{this.state.errorInRed && (
								<Modal.Content>{errorInRed}</Modal.Content>
							)}
						</Form>

						<Divider section />
						{!this.state.errorInRed && (
							<ReactTable
								key={this.state.keyOperationTable}
								defaultSorted={[
									{ id: "status", desc: true },
									{
										id: "date",
										desc: false,
									},
								]}
								style={{ fontSize: 12 }}
								className='transactionTable'
								data={this.state.operationsTable}
								columns={operationsTableHeaders}
								defaultPageSize={5}
								previousText={t("profile.optionDevices.table.previous")}
								nextText={t("profile.optionDevices.table.next")}
								loadingText={t("profile.optionDevices.table.loading")}
								noDataText={t("profile.optionDevices.table.noData")}
								pageText={t("profile.optionDevices.table.page")}
								ofText={t("profile.optionDevices.table.of")}
								rowsText={t("profile.optionDevices.table.rows")}
								pageJumpText={t("profile.optionDevices.table.pageJump")}
								rowsSelectorText={t("profile.optionDevices.table.rowSelector")}
								minRow={5}
								collapseOnDataChange={false}
								expanded={this.state.expanded}
								onExpandedChange={(newExpanded, index, event) => {
									var otherExpandedRow = false;
									if (newExpanded[index[0]] === false) {
										newExpanded = {};
									} else {
										Object.keys(newExpanded).map((k) => {
											newExpanded[k] = parseInt(k) === index[0] ? {} : false;
											otherExpandedRow = true;
											return null;
										});
									}
									this.setState(
										{
											...this.state,
											expanded: newExpanded,
										},
										() => {
											this.saveOperationDataToPdf(this.state.expandedRow);
											if (
												this.state.socket !== null &&
												this.state.socket !== undefined
											) {
												this.state.socket.close();
												window.sessionStorage.setItem(
													"otcOperationSocketId",
													"",
												);
												this.setState(
													{
														socket: null,
														oldOperationsMessages: [],
														showOperationMessages: false,
														checklistReady: false,
														automaticMessageReady: false,
														selectedFile: null,
													},
													() => {
														if (
															(this.state.socket === null ||
																this.state.socket === undefined) &&
															otherExpandedRow
														) {
															this.openSocket(
																this.state.expandedRow.original.id,
															);
														}
													},
												);
											} else {
												this.openSocket(this.state.expandedRow.original.id);
											}
										},
									);
									setTimeout(() => {
										this.getUserVerification(
											this.state.expandedRow.original.username,
										);
										this.validateTimeForBuy(
											this.state.expandedRow.original.notFormattedDate,
											this.state.expandedRow.original.dollarBTCToPay.payWindow,
										);
										this.focusRowExpanded();
										this.getChecklist(
											this.state.expandedRow.original.checkList,
											this.state.expandedRow.original.currency,
											this.state.expandedRow.original.operationType,
											this.state.expandedRow.original.status,
										);
										if (this.state.expandedRow.original.currency === "USD") {
											this.getAutomaticChatMessagesOperation(
												this.state.expandedRow.original.currency,
												this.state.expandedRow.original.operationType,
												this.state.expandedRow.original.status,
											);
										} else {
											this.getAutomaticChatMessages(
												this.state.expandedRow.original.currency,
											);
										}

										var indexRemove = this.state.idsNewMessageIcon.indexOf(
											this.state.expandedRow.original.id,
										);
										if (indexRemove > -1) {
											this.state.idsNewMessageIcon.splice(indexRemove, 1);
										}
									}, 1000);
								}}
								SubComponent={(row) => {
									this.state.expandedRow = row;
									return (
										<Container style={{ padding: 30 }}>
											{(!this.state.showOperationMessages ||
												!this.state.checklistReady ||
												!this.state.automaticMessageReady) && (
												<Dimmer active inverted>
													<Loader inverted>
														{t("profile.optionDevices.table.loading")}...
													</Loader>
												</Dimmer>
											)}
											<Modal
												open={this.state.modalChangeStatus}
												onClose={this.closeChangeStatus}>
												<Modal.Header>
													{t(
														"homeLoggedIn.transactions.detail.labels.changestatus",
													)}
												</Modal.Header>
												<Modal.Content>
													<Modal.Description>
														<p>
															{t(
																"homeLoggedIn.transactions.detail.labels.areYouSure",
															)}{" "}
															<b>{this.state.idToChangeStatus.slice(-4)}</b>{" "}
															{t(
																"homeLoggedIn.transactions.detail.labels.oftheUser",
															)}{" "}
															<b>{this.state.usernameToChangeStatus}</b>
															{t(
																"homeLoggedIn.transactions.detail.labels.whoseOperation",
															)}{" "}
															<b>{this.state.operationTypeToChangeStatus}</b>
															{t(
																"homeLoggedIn.transactions.detail.labels.andCurrecyIs",
															)}
															&ensp;
															<Flag name={this.state.flagToChangeStatus} />
															<b>{this.state.currencyToChangeStatus}</b>?
														</p>
														{this.state.operationTypeToChangeStatus ===
															"COMPRA" &&
															this.state.expandedRow.original.clientPayment !==
																undefined &&
															this.state.expandedRow.original.clientPayment !==
																null && (
																<div>
																	<Divider />
																	<p>
																		<b>
																			{" "}
																			{t(
																				"homeLoggedIn.transactions.detail.labels.clientAccount",
																			)}
																		</b>{" "}
																		{this.state.paymentInfoToChangeStatus}
																	</p>
																</div>
															)}
														{this.state.operationTypeToChangeStatus ===
															"COMPRA" && (
															<Segment secondary>
																<p>
																	{t(
																		"homeLoggedIn.transactions.detail.labels.acreditAccountType",
																	)}
																	<b>
																		{" "}
																		{
																			this.state.dollarBTCToPayToChangeStatus
																				.typeSpanish
																		}
																	</b>{" "}
																	{t(
																		"homeLoggedIn.transactions.detail.labels.whoseDataIs",
																	)}{" "}
																	<b>
																		{
																			this.state.dollarBTCToPayToChangeStatus
																				.infoToShow
																		}
																	</b>
																</p>
															</Segment>
														)}
														{this.state.operationTypeToChangeStatus ===
															"VENTA" ||
															(this.state.operationTypeToChangeStatus ===
																"ENVIO A MEDIO DE PAGO" && (
																<div>
																	<Divider />
																	<p>
																		<b>
																			{t(
																				"homeLoggedIn.transactions.detail.labels.clientAccount",
																			)}
																		</b>{" "}
																		{this.state.paymentInfoToChangeStatus}
																	</p>
																</div>
															))}
														{this.state.operationTypeToChangeStatus ===
															"VENTA" &&
															this.state.dollarBTCToPayToChangeStatus !==
																"adminChoose" && (
																<Segment secondary>
																	<p>
																		{t(
																			"homeLoggedIn.transactions.detail.labels.acreditAccountType",
																		)}
																		<b>
																			{" "}
																			{
																				this.state.dollarBTCToPayToChangeStatus
																					.typeSpanish
																			}
																		</b>{" "}
																		{t(
																			"homeLoggedIn.transactions.detail.labels.whoseDataIs",
																		)}{" "}
																		<b>
																			{
																				this.state.dollarBTCToPayToChangeStatus
																					.infoToShow
																			}
																		</b>
																	</p>
																</Segment>
															)}
														<Divider />
														<Form
															loading={this.state.loadModal}
															key={this.state.keyFormChangeStatus}>
															{this.state.showMessageCanc && (
																<Form.Field>
																	<Select
																		placeholder={t(
																			"homeLoggedIn.transactions.detail.labels.select",
																		)}
																		disabled={this.state.loadChangeStatus}
																		options={this.state.selectStatusChange}
																		onChange={this.pickStatus}
																	/>
																</Form.Field>
															)}
															{/* {this.state.operationTypeToChangeStatus ===
                                      "COMPRA" &&
                                      this.state.expandedRow.original.status ===
                                        "WAITING_FOR_PAYMENT_METHOD_VERIFICATION" &&
                                      this.state.statusToAdd === "CANCELED" && (
                                        <Form.Field>
                                          <Checkbox
                                            onChange={
                                              this.checkDeleteClientPayment
                                            }
                                            label="Eliminar medio de pago del usuario"
                                          />
                                        </Form.Field>
                                      )} */}
															{this.state.showMessageCanc &&
																this.state.operationTypeToChangeStatus ===
																	"VENTA" &&
																(row.original.status !== "FINISHED" ||
																	row.original.status !== "SUCCESS") &&
																this.state.dollarBTCToPayToChangeStatus ===
																	"adminChoose" &&
																this.state.statusToAdd !== "CANCELED" && (
																	<Form.Field>
																		<Select
																			disabled={this.state.loadChangeStatus}
																			placeholder={t(
																				"homeLoggedIn.transactions.detail.labels.select",
																			)}
																			options={
																				this.state
																					.selectCurrencyPaymentMethodsAllowed
																			}
																			onChange={this.pickPaymentMethod}
																		/>
																	</Form.Field>
																)}
															{this.state.showMessageCanc &&
																this.state.operationTypeToChangeStatus ===
																	"ENVIO A MEDIO DE PAGO" &&
																(row.original.status !== "FINISHED" ||
																	row.original.status !== "SUCCESS") &&
																this.state.dollarBTCToPayToChangeStatus ===
																	"adminChoose" &&
																this.state.statusToAdd !== "CANCELED" && (
																	<Form.Field>
																		<Select
																			disabled={this.state.loadChangeStatus}
																			placeholder={t(
																				"homeLoggedIn.transactions.detail.labels.select",
																			)}
																			options={
																				this.state
																					.selectCurrencyPaymentMethodsAllowed
																			}
																			onChange={this.pickPaymentMethod}
																		/>
																	</Form.Field>
																)}
															{this.state.showMessageCanc &&
																this.state.statusToAdd === "CANCELED" && (
																	<div>
																		<Form.Input
																			placeholder='' //'Indique la razon de la Cancelación'
																			onChange={this.handleReason.bind(this)}
																			value={
																				this.state.cancellationReason
																			}></Form.Input>
																		<Message
																			color='yellow'
																			content={t(
																				"homeLoggedIn.transactions.detail.labels.cancelConfirm",
																			)}
																		/>
																	</div>
																)}
															{message}
														</Form>
													</Modal.Description>
												</Modal.Content>
												<Modal.Actions>
													<Button
														onClick={this.closeChangeStatus}
														disabled={this.state.loadChangeStatus}
														color='red'>
														<Icon name='remove' /> No
													</Button>
													<Button
														disabled={
															this.state.statusToAdd === "" ||
															((row.original.status !== "FINISHED" ||
																row.original.status !== "SUCCESS") &&
																this.state.operationTypeToChangeStatus ===
																	"VENTA" &&
																this.state.dollarBTCToPayToChangeStatus ===
																	"adminChoose" &&
																this.state.statusToAdd !== "CANCELED" &&
																this.state.paymentMethodToChange === "")
														}
														loading={this.state.loadChangeStatus}
														onClick={this.changeStatus}
														color='green'>
														<Icon name='checkmark' />
														{window.sessionStorage.getItem("language") === "es"
															? "Si"
															: "Yes"}
													</Button>
												</Modal.Actions>
											</Modal>

											<Divider />
											<Grid columns='equal'>
												<Grid.Row>
													<Grid.Column width={6} textAlign='justified'>
														<Grid>
															<Grid.Row>
																{this.state.expandedUserVerificationStatus ===
																"OK" ? (
																	<Icon
																		title={
																			window.sessionStorage.getItem(
																				"language",
																			) === "es"
																				? "Verificado"
																				: "Verified"
																		}
																		color='green'
																		name='check'
																	/>
																) : (
																	<Icon
																		title={
																			window.sessionStorage.getItem(
																				"language",
																			) === "es"
																				? "No Verificado"
																				: "Not Verified"
																		}
																		color='red'
																		name='ban'
																	/>
																)}
																<div style={{ color: "#207ef2" }}>
																	<p
																		className='fake-link'
																		onClick={() => {
																			this.setState(
																				{ showStatusVerify: true },
																				() => {
																					this.openUserDetailModal(
																						this.state.expandedRow.original
																							.username,
																					);
																				},
																			);
																		}}>
																		{this.state.expandedRow.original.username}
																	</p>
																</div>
																&nbsp;
																{this.state.viewButton && (
																	<Modal
																		open={this.state.modalRemoveUser}
																		onClose={this.closeRemoveUserModal}
																		trigger={
																			<Popup
																				trigger={
																					<Button
																						style={{ marginTop: -5 }}
																						onClick={() =>
																							this.openRemoveUserModal(
																								this.state.expandedRow.original,
																								this.state.expandedRow.original
																									.username,
																							)
																						}
																						circular
																						size='tiny'
																						color='blue'
																						icon
																						compact>
																						<Icon name='ban' />
																					</Button>
																				}
																				content={t(
																					"homeLoggedIn.transactions.detail.labels.deleteVerification",
																				)}
																			/>
																		}>
																		<Modal.Header>
																			<Icon name='trash' />
																			{t(
																				"homeLoggedIn.transactions.detail.labels.deleteVerification",
																			)}
																		</Modal.Header>
																		{!this.state.detailRemoveVerifi && (
																			<Modal.Content>
																				{Object.keys(this.state.userVerifi)
																					.length === 0 && (
																					<Segment basic loading></Segment>
																				)}
																				{Object.keys(this.state.userVerifi)
																					.length > 0 && (
																					<Modal.Description>
																						<Header as='h4'>
																							{t(
																								"homeLoggedIn.transactions.detail.labels.insetTheDeleteDataUser",
																							)}{" "}
																							{
																								this.state.expandedRow.original
																									.username
																							}
																							?
																						</Header>

																						<Divider hidden />
																						<Form>
																							<Form.Group grouped>
																								{this.state.userVerifi.map(
																									(k) => {
																										return (
																											<div>
																												<Form.Field
																													style={{
																														marginLeft: 50,
																													}}>
																													<Checkbox
																														label={
																															k.label ===
																															"identityVerificationMc"
																																? t(
																																		"homeLoggedIn.transactions.detail.labels.mcIdentityImg",
																																  )
																																: k.label ===
																																  "firstName"
																																? t(
																																		"profile.optionDetail.fields.name",
																																  )
																																: k.label ===
																																  "lastName"
																																? t(
																																		"profile.optionDetail.fields.lastName",
																																  )
																																: k.label ===
																																  "typeDocumentIdentity"
																																? "Tipo de documento de identidad"
																																: k.label ===
																																  "numberDocumentIdentity"
																																? t(
																																		"profile.optionDetail.fields.number",
																																  )
																																: k.label ===
																																  "birthdate"
																																? t(
																																		"profile.optionDetail.fields.birthday",
																																  )
																																: k.label ===
																																  "selfieIdentityVerificationMc"
																																? t(
																																		"homeLoggedIn.transactions.detail.labels.mcIdentitySelfie",
																																  )
																																: k.label ===
																																  "birthplace"
																																? t(
																																		"profile.optionDetail.fields.birthplace",
																																  )
																																: t(
																																		"profile.optionDetail.fields.address",
																																  )
																														}
																														value={k.label}
																														onClick={this.handleChecked.bind(
																															this,
																														)}
																														checked={k.checked}
																													/>
																												</Form.Field>
																											</div>
																										);
																									},
																								)}
																								<Divider hidden />
																							</Form.Group>
																						</Form>
																					</Modal.Description>
																				)}
																			</Modal.Content>
																		)}
																		{this.state.detailRemoveVerifi && (
																			<Modal.Content>
																				{removeVerifiMessage}
																			</Modal.Content>
																		)}
																		<Modal.Actions>
																			<Button
																				onClick={this.closeRemoveUserModal}>
																				<Icon name='arrow alternate circle left' />
																				{t(
																					"homeLoggedIn.transactions.detail.labels.cancel",
																				)}
																			</Button>
																			{!this.state.detailRemoveVerifi &&
																				this.state.showUserVerifi && (
																					<Button
																						color='blue'
																						type='submit'
																						loading={this.state.loadRemoveUser}
																						onClick={this.removeVerifiToUser}>
																						{t(
																							"homeLoggedIn.transactions.detail.labels.deleteData",
																						)}
																					</Button>
																				)}
																		</Modal.Actions>
																	</Modal>
																)}
																&nbsp;
																<Modal
																	open={this.state.modalEditUser}
																	onClose={this.closeEditUserModal}
																	trigger={
																		<Popup
																			trigger={
																				<Button
																					style={{ marginTop: -5 }}
																					onClick={() =>
																						this.openEditUserModal(
																							this.state.expandedRow.original,
																							this.state.expandedRow.original
																								.username,
																						)
																					}
																					circular
																					size='tiny'
																					color='blue'
																					icon
																					compact>
																					<Icon name='edit outline' />
																				</Button>
																			}
																			content={t(
																				"homeLoggedIn.transactions.detail.labels.editUser",
																			)}
																		/>
																	}>
																	<Modal.Header>
																		<Icon name='edit outline' />
																		{t(
																			"homeLoggedIn.transactions.detail.labels.editUser",
																		)}
																	</Modal.Header>
																	<Modal.Content>
																		<Modal.Description>
																			<Header as='h4'>
																				{t(
																					"homeLoggedIn.transactions.detail.labels.addNewData",
																				)}{" "}
																				{
																					this.state.expandedRow.original
																						.username
																				}
																				?
																			</Header>
																			<Divider hidden />
																			<Menu pointing secondary>
																				<Menu.Item
																					content={t(
																						"homeLoggedIn.transactions.detail.labels.addData",
																					)}
																					name='addData'
																					active={
																						this.state.activeItemEditUser ===
																						"addData"
																					}
																					onClick={this.handleItemEditUser}
																				/>
																				<Menu.Item
																					content={t(
																						"homeLoggedIn.transactions.detail.labels.editData",
																					)}
																					name='editData'
																					active={
																						this.state.activeItemEditUser ===
																						"editData"
																					}
																					onClick={this.handleItemEditUser}
																				/>
																				<Menu.Item
																					content={t(
																						"homeLoggedIn.transactions.detail.labels.addDocument",
																					)}
																					name='addDocument'
																					active={
																						this.state.activeItemEditUser ===
																						"addDocument"
																					}
																					onClick={this.handleItemEditUser}
																				/>
																			</Menu>
																			{this.state.activeItemEditUser ===
																				"addData" && (
																				<Form>
																					<Form.Group
																						widths='equal'
																						key={this.state.addDataFormKey}>
																						<Form.Field>
																							<label>
																								{t(
																									"profile.optionDetail.fields.name",
																								)}
																							</label>
																							<input
																								placeholder={t(
																									"profile.firstPet",
																								)}
																								onChange={this.handleDataName}
																							/>
																						</Form.Field>
																						<Form.Field>
																							<label>
																								{t("profile.value")}
																							</label>
																							<input
																								placeholder={
																									window.sessionStorage.getItem(
																										"language",
																									) === "es"
																										? "Pez dorado"
																										: "Golden fish"
																								}
																								onChange={this.handleDataValue}
																							/>
																						</Form.Field>
																						<Form.Button
																							style={{ marginTop: 23 }}
																							content='Añadir dato'
																							color='blue'
																							type='submit'
																							loading={this.state.loadEditUser}
																							disabled={
																								this.state.toEditDataName ===
																									null ||
																								this.state.toEditDataValue ===
																									null
																							}
																							onClick={this.addInfoToUser}
																						/>
																					</Form.Group>
																					{addInfoMessage}
																				</Form>
																			)}
																			{this.state.activeItemEditUser ===
																				"editData" && (
																				<Form>
																					<Form.Group
																						widths='equal'
																						key={this.state.editDataFormKey}>
																						<Form.Field>
																							<label>
																								{t(
																									"profile.optionDetail.fields.name",
																								)}
																							</label>
																							<Select
																								placeholder={t(
																									"profile.firstPet",
																								)}
																								search
																								onChange={this.pickToEdit}
																								options={
																									this.state
																										.dataNameToEditOptions
																								}
																							/>
																						</Form.Field>
																						{this.state.toEditDataName !==
																							"gender" &&
																							this.state.toEditDataName !==
																								"typeDocumentIdentity" && (
																								<Form.Field>
																									<label>
																										{t("profile.newValue")}
																									</label>
																									<input
																										placeholder={
																											window.sessionStorage.getItem(
																												"language",
																											) === "es"
																												? "Pez dorado"
																												: "Golden fish"
																										}
																										onChange={
																											this.handleDataValue
																										}
																									/>
																								</Form.Field>
																							)}
																						{this.state.toEditDataName ===
																							"gender" && (
																							<Form.Field>
																								<label>
																									{t("profile.newValue")}
																								</label>
																								<Select
																									placeholder={t(
																										"profile.optionDetail.sexList.male",
																									)}
																									search
																									onChange={
																										this.pickGenderToEdit
																									}
																									options={
																										this.state.genderOptions
																									}
																								/>
																							</Form.Field>
																						)}
																						{this.state.toEditDataName ===
																							"typeDocumentIdentity" &&
																							(this.state.toEditDataValue ===
																								null ||
																								this.state.toEditDataValue ===
																									"id" ||
																								this.state.toEditDataValue ===
																									"cedula" ||
																								this.state.toEditDataValue ===
																									"passport" ||
																								this.state.toEditDataValue ===
																									"dni") && (
																								<Form.Field>
																									<label>
																										{t("profile.newValue")}
																									</label>
																									<Select
																										placeholder='DNI'
																										search
																										onChange={
																											this
																												.pickDocumentTypeToEdit
																										}
																										options={
																											this.state
																												.documentTypeOptions
																										}
																									/>
																								</Form.Field>
																							)}
																						{this.state.toEditDataName ===
																							"typeDocumentIdentity" &&
																							(this.state.toEditDataValue ===
																								"other" ||
																								(this.state.toEditDataValue !==
																									null &&
																									this.state.toEditDataValue !==
																										"id" &&
																									this.state.toEditDataValue !==
																										"cedula" &&
																									this.state.toEditDataValue !==
																										"passport" &&
																									this.state.toEditDataValue !==
																										"dni")) && (
																								<Form.Field>
																									<label>
																										{t("profile.newValue")}
																									</label>
																									<input
																										placeholder={
																											window.sessionStorage.getItem(
																												"language",
																											) === "es"
																												? "Licencia de conducir"
																												: "Driver License"
																										}
																										onChange={
																											this.handleDataValue
																										}
																									/>
																								</Form.Field>
																							)}
																						<Form.Button
																							style={{ marginTop: 23 }}
																							content={t(
																								"homeLoggedIn.transactions.detail.labels.editData",
																							)}
																							color='blue'
																							type='submit'
																							loading={this.state.loadEditUser}
																							disabled={
																								this.state.toEditDataName ===
																									null ||
																								this.state.toEditDataValue ===
																									null
																							}
																							onClick={this.modifyInfoToUser}
																						/>
																					</Form.Group>
																					{addInfoMessage}
																				</Form>
																			)}
																			{this.state.activeItemEditUser ===
																				"addDocument" && (
																				<Form>
																					<Form.Group
																						widths='equal'
																						key={this.state.addDataFormKey}>
																						<Form.Field>
																							<label>
																								{t(
																									"profile.optionDetail.fields.name",
																								)}
																							</label>
																							<input
																								placeholder={
																									window.sessionStorage.getItem(
																										"language",
																									) === "es"
																										? "Firma del usuario"
																										: "User Sign"
																								}
																								onChange={this.handleDataName}
																							/>
																						</Form.Field>
																						<Form.Field>
																							<Button
																								style={{ marginTop: 25 }}
																								as='label'
																								size='mini'
																								htmlFor='hidden-new-file-userVerification'
																								color='grey'
																								loading={
																									this.state
																										.userVerificationLoadingNewFile
																								}
																								basic>
																								{/* {t(
																									"profile.waitingVerification.chatWiting.buttonAttachment",
																								)} */}
																								<Image
																									src={attachmentimg}
																									style={{
																										width: "40px",
																										marginTop: "-3px",
																									}}
																								/>
																							</Button>
																							{this.state
																								.userVerificationSelectedFile !==
																								null &&
																								this.state
																									.userVerificationSelectedFile !==
																									undefined && (
																									<Grid.Row>
																										<Label>
																											{
																												this.state
																													.userVerificationSelectedFile
																													.name
																											}
																										</Label>
																									</Grid.Row>
																								)}
																							<Input
																								id='hidden-new-file-userVerification'
																								key={this.state.keyFile}
																								type='file'
																								accept='image/*'
																								onChange={
																									this
																										.userVerificationFileChangedHandler
																								}
																								style={{ display: "none" }}
																							/>
																						</Form.Field>
																						<Form.Button
																							style={{ marginTop: 23 }}
																							// content={t(
																							// 	"profile.waitingVerification.chatWiting.buttonAttachment",
																							// )}
																							color='blue'
																							type='submit'
																							loading={this.state.loadEditUser}
																							disabled={
																								this.state.toEditDataName ===
																									null ||
																								this.state
																									.userVerificationSelectedFile ===
																									null
																							}
																							onClick={this.addDocumentToUser}>
																							<Image
																								src={attachmentimg}
																								style={{
																									width: "40px",
																									marginTop: "-3px",
																								}}
																							/>
																						</Form.Button>
																					</Form.Group>
																					{addInfoMessage}
																				</Form>
																			)}
																		</Modal.Description>
																	</Modal.Content>
																	<Modal.Actions>
																		<Button onClick={this.closeEditUserModal}>
																			<Icon name='arrow alternate circle left' />{" "}
																			{t(
																				"homeLoggedIn.transactions.detail.labels.cancel",
																			)}
																		</Button>
																	</Modal.Actions>
																</Modal>
															</Grid.Row>
															{this.state.expandedRow.original
																.dollarBTCToPay !== "adminChoose" ? (
																<Grid.Row>
																	<p style={{ textAlign: "left" }}>
																		<b>{t("nav.paymentMethod")}:</b>{" "}
																		{this.state.expandedRow.original.type}
																	</p>
																	<p style={{ textAlign: "left" }}>
																		{
																			this.state.expandedRow.original
																				.paymentInfo
																		}
																	</p>
																</Grid.Row>
															) : (
																<Grid.Row>
																	<p style={{ textAlign: "left" }}>
																		<b>{t("nav.paymentMethod")}:</b> Por definir
																	</p>
																</Grid.Row>
															)}
															{this.state.expandedRow.original.operationType ===
																"VENTA" && (
																<Grid.Row>
																	<p style={{ textAlign: "left" }}>
																		<b>
																			{" "}
																			{t(
																				"homeLoggedIn.transactions.detail.labels.clientAccount",
																			)}{" "}
																		</b>
																		{this.state.expandedRow.original
																			.clientPayment !== ""
																			? this.state.expandedRow.original
																					.clientPayment
																			: t(
																					"homeLoggedIn.transactions.detail.labels.noInfoAccount",
																			  )}
																	</p>
																</Grid.Row>
															)}
															{this.state.expandedRow.original.operationType ===
																"COMPRA" && (
																<Grid.Row>
																	<p style={{ textAlign: "left" }}>
																		<b>
																			{" "}
																			{t(
																				"homeLoggedIn.transactions.detail.labels.clientAccount",
																			)}{" "}
																		</b>
																		{this.state.expandedRow.original
																			.clientPayment !== ""
																			? this.state.expandedRow.original
																					.clientPayment
																			: t(
																					"homeLoggedIn.transactions.detail.labels.noInfoAccount",
																			  )}
																	</p>
																</Grid.Row>
															)}
															{this.state.expandedRow.original.operationType ===
																"RECARGA DE SALDO" && (
																<Grid.Row>
																	<p style={{ textAlign: "left" }}>
																		<b>
																			{" "}
																			{t(
																				"homeLoggedIn.transactions.detail.labels.clientAccount",
																			)}
																			:{" "}
																		</b>
																		{this.state.expandedRow.original
																			.clientPayment !== ""
																			? this.state.expandedRow.original
																					.clientPayment
																			: t(
																					"homeLoggedIn.transactions.detail.labels.noInfoAccount",
																			  )}
																	</p>
																</Grid.Row>
															)}
															{this.state.expandedRow.original.operationType ===
																"ENVIO A MEDIO DE PAGO" && (
																<Grid.Row>
																	<p style={{ textAlign: "left" }}>
																		<b>
																			{" "}
																			{t(
																				"homeLoggedIn.transactions.detail.labels.clientAccount",
																			)}
																			:{" "}
																		</b>
																		{this.state.expandedRow.original
																			.clientPayment !== ""
																			? this.state.expandedRow.original
																					.clientPayment
																			: t(
																					"homeLoggedIn.transactions.detail.labels.noInfoAccount",
																			  )}
																	</p>
																</Grid.Row>
															)}
															{(row.original.status === "WAITING_FOR_PAYMENT" ||
																row.original.status ===
																	"WAITING_FOR_PAYMENT_METHOD_VERIFICATION") &&
																(this.state.expandedRow.original
																	.operationType === "COMPRA" ||
																	this.state.expandedRow.original
																		.operationType === "RECARGA DE SALDO") && (
																	<Grid.Row>
																		<Countdown
																			date={
																				this.state.localDateInMiliseconds +
																				this.state.timeForOperationInMiliseconds
																			}
																			renderer={(props) => {
																				if (props.total > 10800000) {
																					props.total = 0;
																				}
																				return (
																					<p>
																						<b>
																							{t(
																								"homeLoggedIn.transactions.detail.labels.windowPayment",
																							)}
																						</b>
																						<strong
																							style={{
																								fontWeight: "normal",
																								color:
																									Math.floor(
																										props.total / (1000 * 60),
																									) > 0
																										? "black"
																										: "red",
																							}}>
																							{" "}
																							{Math.floor(
																								props.total / (1000 * 60),
																							)}{" "}
																							Min{" "}
																						</strong>
																					</p>
																				);
																			}}
																		/>
																	</Grid.Row>
																)}
														</Grid>
														{this.state.requirementsChecklist.length > 0 && (
															<Grid style={{ marginTop: 20 }}>
																<Form>
																	<Form.Group grouped>
																		<label>
																			{t(
																				"homeLoggedIn.transactions.detail.labels.validationRequirements",
																			)}
																		</label>
																		{this.state.requirementsChecklist.map(
																			(requirements, i) => {
																				return (
																					<Form.Field key={i}>
																						<Checkbox
																							onChange={this.checkRequirement}
																							label={requirements.label}
																							defaultChecked={
																								requirements.checked
																							}
																						/>
																					</Form.Field>
																				);
																			},
																		)}
																	</Form.Group>
																</Form>
															</Grid>
														)}
														{row.original.status !== "CANCELED" &&
															(row.original.status !== "FINISHED" ||
																row.original.status !== "SUCCESS") &&
															row.original.status !==
																"WAITING_TO_START_OPERATION" && (
																<Grid textAlign='center' stretched>
																	<Grid.Row verticalAlign='bottom'>
																		{this.state.expandedRow.original
																			.operationType !==
																			"ENVIO A MEDIO DE PAGO" && (
																			<Button
																				style={{
																					marginLeft: -15,
																					marginTop: 15,
																				}}
																				onClick={() =>
																					this.openChangeStatus(
																						row.original.id,
																						row.original.username,
																						row.original.currency,
																						row.original.operationType,
																						row.original.flag,
																						row.original.status,
																						row.original.type,
																						row.original.clientPayment,
																						row.original.dollarBTCToPay,
																					)
																				}
																				icon
																				labelPosition='left'
																				color='blue'
																				type='submit'
																				size='tiny'
																				floated='right'>
																				<Icon name='edit outline' />
																				{t(
																					"homeLoggedIn.transactions.detail.labels.changeStatusButton",
																				)}
																			</Button>
																		)}
																	</Grid.Row>
																</Grid>
															)}
													</Grid.Column>
													{this.state.expandedRow.original.operationType !==
													"ENVIO A MEDIO DE PAGO" ? (
														<Grid.Column width={5}>
															<Form>
																<Form.Field key={this.state.key}>
																	<TextArea
																		ref={this.typeOperation}
																		onChange={this.handleMessage}
																		placeholder=''
																		onKeyPress={this.enterPressed}
																	/>
																</Form.Field>
																<Container>
																	<Grid columns='equal'>
																		<Grid.Row columns='equal'>
																			<Grid.Column width={8}>
																				<Grid.Row>
																					<Button
																						as='label'
																						size='mini'
																						htmlFor='hidden-new-file'
																						color='grey'
																						loading={this.state.loadingNewFile}
																						basic>
																						{/* {t(
																							"profile.waitingVerification.chatWiting.buttonAttachment",
																						)} */}
																						<Image
																							src={attachmentimg}
																							style={{
																								width: "40px",
																								marginTop: "-3px",
																							}}
																						/>
																					</Button>
																				</Grid.Row>
																				{this.state.selectedFile !== null &&
																					this.state.selectedFile !==
																						undefined && (
																						<Grid.Row>
																							<Label style={{ width: 110 }}>
																								{this.state.selectedFile.name}
																							</Label>
																						</Grid.Row>
																					)}
																			</Grid.Column>
																			<Input
																				id='hidden-new-file'
																				key={this.state.keyFile}
																				type='file'
																				accept='image/*'
																				onChange={this.fileChangedHandler}
																				style={{ display: "none" }}
																			/>
																			<Grid.Column width={6}>
																				<Button
																					size='mini'
																					loading={this.state.loadingSendButton}
																					onClick={() => {
																						this.sendMessage(
																							row.original.id,
																							row.original.username,
																							this.state.messageToSend,
																						);
																					}}
																					color='blue'>
																					{t("nav.send2")}
																				</Button>
																			</Grid.Column>
																		</Grid.Row>
																		{this.state.expandedRow.original.status ===
																			"CLAIM" && (
																			<Grid.Row columns='1'>
																				<Grid.Column>
																					<Button
																						size='tiny'
																						color='blue'
																						onClick={this.printInvoice.bind(
																							this,
																						)}>
																						{t(
																							"homeLoggedIn.transactions.detail.labels.printing",
																						)}
																					</Button>
																				</Grid.Column>
																			</Grid.Row>
																		)}
																		{this.state.automaticMessagesToShow
																			.length !== 0 && (
																			<Segment
																				style={{
																					marginTop: 5,
																					width: 305,
																					marginLeft: 12,
																				}}>
																				<Grid.Row>
																					<Grid.Column>
																						<Header as='h4'>
																							{t(
																								"homeLoggedIn.transactions.detail.labels.defaultMessages",
																							)}
																						</Header>
																					</Grid.Column>
																				</Grid.Row>
																				<Divider fitted />
																				<Grid.Row>
																					<Grid.Column>
																						{this.state.automaticMessagesToShow.map(
																							(automaticMessage) => (
																								<Button
																									key={automaticMessage}
																									compact
																									size='mini'
																									style={{ marginBottom: 5 }}
																									onClick={() => {
																										this.loadAutomaticMessage(
																											row.original.id,
																											automaticMessage,
																										);
																									}}
																									loading={
																										this.state
																											.sendingAutomaticMessage
																									}>
																									{automaticMessage}
																								</Button>
																							),
																						)}
																					</Grid.Column>
																				</Grid.Row>
																			</Segment>
																		)}
																	</Grid>
																</Container>
															</Form>
														</Grid.Column>
													) : (
														<Grid.Column width={7}>
															{this.state.expandedRow.original.operationType ===
																"ENVIO A MEDIO DE PAGO" && (
																<div>
																	<Form>
																		<Form.Field key={this.state.key}>
																			<TextArea
																				ref={this.typeOperation}
																				onChange={this.handleMessage}
																				placeholder=''
																				onKeyPress={this.enterPressed}
																			/>
																		</Form.Field>
																		<Container>
																			<Grid columns='equal'>
																				<Grid.Row columns='equal'>
																					<Grid.Column width={10}>
																						<Grid.Row>
																							<Button
																								as='label'
																								style={{
																									height: 300,
																									height: 30,
																									fontSize: 12,
																								}}
																								htmlFor='hidden-new-file'
																								color='grey'
																								loading={
																									this.state.loadingNewFile
																								}
																								basic>
																								{/* {t(
																									"profile.waitingVerification.chatWiting.buttonAttachment",
																								)} */}
																								<Image
																									src={attachmentimg}
																									style={{
																										width: "40px",
																										marginTop: "-3px",
																									}}
																								/>
																							</Button>
																						</Grid.Row>
																						{this.state.selectedFile !== null &&
																							this.state.selectedFile !==
																								undefined && (
																								<Grid.Row>
																									<Label style={{ width: 110 }}>
																										{
																											this.state.selectedFile
																												.name
																										}
																									</Label>
																								</Grid.Row>
																							)}
																					</Grid.Column>
																					<Input
																						id='hidden-new-file'
																						key={this.state.keyFile}
																						type='file'
																						accept='image/*'
																						onChange={this.fileChangedHandler}
																						style={{ display: "none" }}
																					/>
																					<Grid.Column width={4}>
																						<Button
																							size='mini'
																							loading={
																								this.state.loadingSendButton
																							}
																							onClick={() => {
																								this.sendMessage(
																									row.original.id,
																									row.original.username,
																									this.state.messageToSend,
																								);
																							}}
																							color='blue'>
																							{t("nav.send2")}
																						</Button>
																					</Grid.Column>
																				</Grid.Row>
																				{this.state.expandedRow.original
																					.status === "CLAIM" && (
																					<Grid.Row columns='1'>
																						<Grid.Column>
																							<Button
																								size='tiny'
																								color='blue'
																								onClick={this.printInvoice.bind(
																									this,
																								)}>
																								{t(
																									"profile.waitingVerification.chatWiting.printing",
																								)}
																							</Button>
																						</Grid.Column>
																					</Grid.Row>
																				)}
																			</Grid>
																		</Container>

																		<Segment
																		// style={{
																		//   marginTop: 5,
																		//   width: 700,
																		//   marginLeft: 12,
																		// }}
																		>
																			<Grid.Row>
																				<Grid.Column>
																					<Header as='h4'>
																						{t(
																							"homeLoggedIn.transactions.detail.labels.documentRegister",
																						)}
																					</Header>
																				</Grid.Column>
																			</Grid.Row>
																			<Divider fitted />
																			<Grid.Row>
																				<Feed
																					style={{
																						height: 100,
																						overflowX: "auto",
																					}}>
																					{this.state.oldOperationsMessages.map(
																						(oldMessage) => (
																							<Feed.Event
																								key={oldMessage.timestamp}>
																								{/* <Feed.Label>
                                      <img alt="" src={avatarNull} />
                                    </Feed.Label> */}

																								<Feed.Content>
																									<Feed.Summary>
																										{/* <Feed.User>
                                          {oldMessage.userName ===
                                          sessionStorage.getItem("email")
                                            ? "Yo"
                                            : oldMessage.userName}
                                        </Feed.User>{" "} */}

																										<span
																											style={{
																												fontWeight: "normal",
																											}}>
																											{oldMessage.message}
																										</span>
																										<br></br>
																										{oldMessage.attachment !==
																											undefined && (
																											<div>
																												<Popup
																													trigger={
																														<Button
																															onClick={() =>
																																window.open(
																																	oldMessage.urlFile,
																																	"_blank",
																																)
																															}
																															size='tiny'
																															color='blue'
																															icon>
																															<Icon name='file image outline' />
																														</Button>
																													}
																													content={t(
																														"profile.waitingVerification.chatWaiting.buttonSeeAttachment",
																													)}
																												/>{" "}
																												{oldMessage.attachment}
																												<Feed.Date>
																													<br></br>
																													{this.formatDate(
																														new Date(
																															oldMessage.timestamp,
																														),
																													)}
																												</Feed.Date>
																											</div>
																										)}
																										{oldMessage.attachment ===
																											undefined && (
																											<Feed.Date>
																												{this.formatDate(
																													new Date(
																														oldMessage.timestamp,
																													),
																												)}
																											</Feed.Date>
																										)}
																									</Feed.Summary>
																								</Feed.Content>
																							</Feed.Event>
																						),
																					)}
																				</Feed>
																			</Grid.Row>
																		</Segment>
																	</Form>
																</div>
															)}
															{this.state.expandedRow.original.operationType !==
																"ENVIO A MEDIO DE PAGO" && (
																<Grid.Row>
																	<p style={{ textAlign: "left" }}>
																		<b>
																			{" "}
																			{t(
																				"homeLoggedIn.transactions.detail.labels.clientAccount",
																			)}{" "}
																		</b>
																		{this.state.expandedRow.original
																			.clientPayment !== ""
																			? this.state.expandedRow.original
																					.clientPayment
																			: t(
																					"homeLoggedIn.transactions.detail.labels.noInfoAccount",
																			  )}
																	</p>
																</Grid.Row>
															)}
														</Grid.Column>
													)}
													{this.state.expandedRow.original.operationType !==
													"ENVIO A MEDIO DE PAGO" ? (
														<Grid.Column>
															<Segment>
																<Feed
																	style={{
																		height: 350,
																		overflowX: "auto",
																	}}>
																	{this.state.oldOperationsMessages.map(
																		(oldMessage) => (
																			<Feed.Event key={oldMessage.timestamp}>
																				<Feed.Label>
																					<img alt='' src={avatarNull} />
																				</Feed.Label>
																				<Feed.Content>
																					<Feed.Summary>
																						<Feed.User>
																							{oldMessage.userName ===
																							sessionStorage.getItem("email")
																								? "Yo"
																								: oldMessage.userName}
																						</Feed.User>{" "}
																						<span
																							style={{ fontWeight: "normal" }}>
																							{oldMessage.message}
																						</span>{" "}
																						{oldMessage.attachment !==
																							undefined && (
																							<Popup
																								trigger={
																									<Button
																										onClick={() =>
																											window.open(
																												oldMessage.urlFile,
																												"_blank",
																											)
																										}
																										size='tiny'
																										color='blue'
																										icon>
																										<Icon name='file image outline' />
																									</Button>
																								}
																								content={t(
																									"profile.waitingVerification.chatWaiting.buttonSeeAttachment",
																								)}
																							/>
																						)}
																						<Feed.Date>
																							{this.formatDate(
																								new Date(oldMessage.timestamp),
																							)}
																						</Feed.Date>
																					</Feed.Summary>
																				</Feed.Content>
																			</Feed.Event>
																		),
																	)}
																</Feed>
															</Segment>
														</Grid.Column>
													) : (
														<Grid.Column>
															<Button
																style={{ marginLeft: -15, marginTop: 15 }}
																onClick={() =>
																	this.openChangeStatus(
																		row.original.id,
																		row.original.username,
																		row.original.currency,
																		row.original.operationType,
																		row.original.flag,
																		row.original.status,
																		row.original.type,
																		row.original.clientPayment,
																		row.original.dollarBTCToPay,
																	)
																}
																icon
																labelPosition='right'
																color='blue'
																type='submit'
																size='tiny'
																floated='right'>
																<Icon name='edit outline' />
																{t(
																	"homeLoggedIn.transactions.detail.labels.changeStatusButton",
																)}
															</Button>
														</Grid.Column>
													)}
												</Grid.Row>
											</Grid>
										</Container>
									);
								}}
							/>
						)}
					</Grid.Column>
					<Grid.Column largeScreen={2} computer={1} widescreen={2} />
				</Grid>
			</div>
		);
	}
}
export default translate(ActualOperations);
