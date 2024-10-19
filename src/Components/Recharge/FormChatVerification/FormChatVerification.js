import React, { Component } from "react";
import "../Recharge.css";
import {
	Segment,
	Form,
	Grid,
	Button,
	Feed,
	Label,
	Icon,
	Popup,
	Message,
	Responsive,
	Divider,
	Modal,
	Image,
	Container,
	GridRow,
} from "semantic-ui-react";
import Files from "react-files";
import userAPI from "../../../services/user";
import avatarNull from "../../../img/avatarNull.png";
import otcAPI from "../../../services/otc";
import uuid from "uuid";
import { Document, Page } from "react-pdf";
import Sockette from "sockette";
import translate from "../../../i18n/translate";
import TakePhoto from "../../ModalTakePhoto/TakePhoto";
import attachments from "../../../services/attachments";
import { isMobile } from "react-device-detect";
import iconAdj from "../../../img/icn-adjuntar.png";
class FormChatVerification extends Component {
	constructor(props) {
		super(props);
		this.selfRef = React.createRef();
		const listLabelDataToVerify = new Map();
		listLabelDataToVerify.set(
			"email",
			props.translate("recharge.formChatVerification.dataToVerify.email"),
		);
		listLabelDataToVerify.set(
			"phone",
			props.translate("recharge.formChatVerification.dataToVerify.phone"),
		);
		listLabelDataToVerify.set(
			"firstName",
			props.translate("recharge.formChatVerification.dataToVerify.firstName"),
		);
		listLabelDataToVerify.set(
			"lastName",
			props.translate("recharge.formChatVerification.dataToVerify.lastName"),
		);
		listLabelDataToVerify.set(
			"answerSecurity",
			props.translate(
				"recharge.formChatVerification.dataToVerify.answerSecurity",
			),
		);
		listLabelDataToVerify.set(
			"questionSecurity",
			props.translate(
				"recharge.formChatVerification.dataToVerify.questionSecurity",
			),
		);
		listLabelDataToVerify.set(
			"typeDocumentIdentity",
			props.translate(
				"recharge.formChatVerification.dataToVerify.typeDocumentIdentity",
			),
		);
		listLabelDataToVerify.set(
			"numberDocumentIdentity",
			props.translate(
				"recharge.formChatVerification.dataToVerify.numberDocumentIdentity",
			),
		);
		listLabelDataToVerify.set(
			"gender",
			props.translate("recharge.formChatVerification.dataToVerify.gender"),
		);
		listLabelDataToVerify.set(
			"female",
			props.translate("recharge.formChatVerification.dataToVerify.female"),
		);
		listLabelDataToVerify.set(
			"male",
			props.translate("recharge.formChatVerification.dataToVerify.male"),
		);
		listLabelDataToVerify.set(
			"F",
			props.translate("recharge.formChatVerification.dataToVerify.female"),
		);
		listLabelDataToVerify.set(
			"M",
			props.translate("recharge.formChatVerification.dataToVerify.male"),
		);
		listLabelDataToVerify.set(
			"birthdate",
			props.translate("recharge.formChatVerification.dataToVerify.birthdate"),
		);
		listLabelDataToVerify.set(
			"countryOfBirth",
			props.translate("recharge.formChatVerification.dataToVerify.countryOfBirth"),
		);
		listLabelDataToVerify.set(
			"cityOfBirth",
			props.translate("recharge.formChatVerification.dataToVerify.cityOfBirth"),
		);
		listLabelDataToVerify.set(
			"birthplace",
			props.translate("recharge.formChatVerification.dataToVerify.birthplace"),
		);
		listLabelDataToVerify.set(
			"userLocalBitcoin",
			props.translate(
				"recharge.formChatVerification.dataToVerify.userLocalBitcoin",
			),
		);
		listLabelDataToVerify.set(
			"userFacebook",
			props.translate(
				"recharge.formChatVerification.dataToVerify.userFacebook",
			),
		);
		listLabelDataToVerify.set(
			"nickname",
			props.translate("recharge.formChatVerification.dataToVerify.nickname"),
		);
		listLabelDataToVerify.set(
			"familyName",
			props.translate("recharge.formChatVerification.dataToVerify.familyName"),
		);
		listLabelDataToVerify.set(
			"familyEmail",
			props.translate("recharge.formChatVerification.dataToVerify.familyEmail"),
		);
		listLabelDataToVerify.set(
			"userDirection",
			props.translate(
				"recharge.formChatVerification.dataToVerify.userDirection",
			),
		);
		listLabelDataToVerify.set(
			"bank",
			props.translate("recharge.formChatVerification.dataToVerify.bank"),
		);
		listLabelDataToVerify.set(
			"accountNumber",
			props.translate(
				"recharge.formChatVerification.dataToVerify.accountNumber",
			),
		);
		listLabelDataToVerify.set(
			"accountHolderName",
			props.translate(
				"recharge.formChatVerification.dataToVerify.accountHolderName",
			),
		);
		listLabelDataToVerify.set(
			"accountHolderId",
			props.translate(
				"recharge.formChatVerification.dataToVerify.accountHolderId",
			),
		);
		listLabelDataToVerify.set(
			"type",
			props.translate("recharge.formChatVerification.dataToVerify.type"),
		);
		listLabelDataToVerify.set(
			"currency",
			props.translate("recharge.formChatVerification.dataToVerify.currency"),
		);
		listLabelDataToVerify.set(
			"accountType",
			props.translate("recharge.formChatVerification.dataToVerify.accountType"),
		);
		listLabelDataToVerify.set(
			"companyName",
			props.translate("recharge.formChatVerification.dataToVerify.companyName"),
		);
		listLabelDataToVerify.set(
			"companyTypeOfFiscalRecord",
			props.translate(
				"recharge.formChatVerification.dataToVerify.documentTypeFiscalRecord",
			),
		);
		listLabelDataToVerify.set(
			"companyNumberOfFiscalRecord",
			props.translate(
				"recharge.formChatVerification.dataToVerify.numberFiscalRecord",
			),
		);
		listLabelDataToVerify.set(
			"companyYearRegistration",
			props.translate(
				"recharge.formChatVerification.dataToVerify.registrationYear",
			),
		);
		listLabelDataToVerify.set(
			"cardType",
			props.translate("recharge.formChatVerification.dataToVerify.cardType"),
		);
		listLabelDataToVerify.set(
			"cardNumber",
			props.translate("recharge.formChatVerification.dataToVerify.cardNumber"),
		);
		listLabelDataToVerify.set(
			"cardHolderName",
			props.translate(
				"recharge.formChatVerification.dataToVerify.cardHolderName",
			),
		);
		listLabelDataToVerify.set(
			"expDate",
			props.translate("recharge.formChatVerification.dataToVerify.expDate"),
		);
		listLabelDataToVerify.set(
			"csc",
			props.translate("recharge.formChatVerification.dataToVerify.csc"),
		);
		listLabelDataToVerify.set(
			"zipCode",
			props.translate("recharge.formChatVerification.dataToVerify.zipCode"),
		);
		listLabelDataToVerify.set(
			"accountAddress",
			props.translate(
				"recharge.formChatVerification.dataToVerify.accountAddress",
			),
		);
		listLabelDataToVerify.set(
			"accountZip",
			props.translate("recharge.formChatVerification.dataToVerify.accountZip"),
		);
		listLabelDataToVerify.set(
			"bankRoutingNumber",
			props.translate(
				"recharge.formChatVerification.dataToVerify.bankRoutingNumber",
			),
		);
		listLabelDataToVerify.set(
			"bankSwiftCode",
			props.translate(
				"recharge.formChatVerification.dataToVerify.bankSwiftCode",
			),
		);
		listLabelDataToVerify.set(
			"accountWireRoutingNumber",
			props.translate(
				"recharge.formChatVerification.dataToVerify.accountWireRoutingNumber",
			),
		);
		listLabelDataToVerify.set(
			"otherDocument",
			props.translate(
				"recharge.formChatVerification.dataToVerify.otherDocument",
			),
		);
		const mapPayments = new Map();
		mapPayments.set(
			"TRANSFER_WITH_SPECIFIC_BANK",
			props.translate("profile.addAccount.specificBank"),
		);
		mapPayments.set(
			"TRANSFER_NATIONAL_BANK",
			props.translate("profile.addAccount.thirdBank"),
		);
		mapPayments.set(
			"CHECK_DEPOSIT",
			props.translate("profile.addAccount.checkDeposit"),
		);
		mapPayments.set(
			"CASH_DEPOSIT",
			props.translate("profile.addAccount.cashDeposit"),
		);
		mapPayments.set(
			"WIRE_TRANSFER",
			props.translate("profile.addAccount.wire"),
		);
		mapPayments.set(
			"TRANSFER_INTERNATIONAL_BANK",
			props.translate("profile.addAccount.international"),
		);
		mapPayments.set(
			"TRANSFER_TO_CRYPTO_WALLET",
			props.translate("profile.addAccount.cryptoWallet"),
		);
		mapPayments.set(
			"CREDIT_CARD",
			props.translate("profile.addAccount.creditCard"),
		);
		this.state = {
			listLabelDataToVerify: listLabelDataToVerify,
			listPayments: mapPayments,
			contactMessages: [],
			messageWithoutText: false,
			message: "",
			messageErrorAdjuntar: false,
			textMessageNew: "",
			addFile: true,
			fileName: "",
			selectedFile: null,
			extension: "",
			isPdf: false,
			verificationOperationId: "",
			dataToVerify: [],
			clientPaymentToVerify: null,
			dataUserNormalizada: userAPI.getActualUserInfo(this.props.configUser),
			timerId: null,
			cancelVerificationPayment: false,
			configUser: this.props.configUser,
			showButtonCancelVerification: true,
			translator: props.translate,
			isCreditCard: false,
			showImage: false,
			selectImage: "",
		};

		this.blankErrors = this.blankErrors.bind(this);
	}
	setOperationIdVerification() {
		let timerId = setInterval(() => this.getDataUserNow(), 10000);
		this.setState({
			timerId: timerId,
		});
		if (this.props.whatVerify === "C") {
			if (this.state.configUser.verification.C !== undefined) {
				this.setState(
					{
						verificationOperationId: this.state.configUser.verification.C
							.verificationOperationId,
					},
					() => {
						this.openSocket(this.state.verificationOperationId);
					},
				);
			}
		} else {
			this.setState(
				{
					verificationOperationId: this.state.configUser.verification.D
						.verificationOperationId,
				},
				() => {
					this.openSocket(this.state.verificationOperationId);
				},
			);
		}
	}
	componentDidMount() {
		this.setOperationIdVerification();
		this.closeConexionSocket();
		if (this.props.whatVerify === "D") {
			this.loadPaymentProccessing();
		}
		this.loadDataToVerifyIdentification();
	}
	componentWillReceiveProps(nextProps, nextContext) {
		if (this.props.language !== nextProps.language) {
			this.setState({
				translator: nextProps.translate,
			});
		}
	}
	getDataUserNow() {
		let username = userAPI.getUserName();
		try {
			userAPI.getConfigUserGeneral(username).then((resp) => {
				this.setState({
					configUser: resp.data.result,
				});
			});
		} catch (error) {
			console.log("error red", error.toString());
		}
	}

	loadPaymentProccessing() {
		if (typeof this.state.configUser.verification.D != undefined) {
			let paymentIdCompose = this.state.configUser.verification.D.fieldNames.toString();
			otcAPI.getClientPayment(paymentIdCompose.split("__")[1]).then((rest) => {
				this.setState(
					{
						clientPaymentToVerify: rest.data,
					},
					() => {
						this.loadDataToVerifyPayment();
					},
				);
			});
		}
	}
	loadDataToVerifyPayment() {
		var array = [];
		////console.log('clientPaymentToVerify ',this.state.clientPaymentToVerify);
		Object.entries(this.state.clientPaymentToVerify).forEach(([key, val]) => {
			if (
				key !== "id" &&
				key !== "messages" &&
				key !== "active" &&
				key !== "acceptIn" &&
				key !== "acceptOut" &&
				key !== "joinField" &&
				key !== "payWindow" &&
				key !== "joinMyPayments" &&
				key !== "joinFieldValue" &&
				key !== "automaticCharge" &&
				key !== "verified"
			) {
				if (key !== "type") {
					array.push(
						<span key={key}>
							{this.state.listLabelDataToVerify.has(key)
								? this.state.listLabelDataToVerify.get(key)
								: key}
							: {val}
							<br />
						</span>,
					);
				} else {
					array.push(
						<span key={key}>
							{this.state.listLabelDataToVerify.has(key)
								? this.state.listLabelDataToVerify.get(key)
								: key}
							:{" "}
							{this.state.listPayments.has(val)
								? this.state.listPayments.get(val)
								: val}
							<br />
						</span>,
					);
				}
				if (key === "cardNumber") {
					this.setState({ isCreditCard: true });
				}
			}
			this.setState({
				dataToVerify: array,
			});
		});
	}
	enmaskValueByField(key, value) {
		if (key === "phone" && value.toString().trim() !== "") {
			return value.substring(0, 5) + "****" + value.slice(-2);
		} else if (key === "email" && value.toString().trim() !== "") {
			return value.substring(0, 3) + "****@" + value.split("@")[1];
		} else if (key === "answerSecurity" && value.toString().trim() !== "") {
			return value.substring(0, 1) + "****" + value.slice(-2);
		} else if (key === "userLocalBitcoin" && value.toString().trim() !== "") {
			return value.substring(0, 1) + "****" + value.slice(-2);
		} else if (key === "userFacebook" && value.toString().trim() !== "") {
			return value.substring(0, 1) + "****" + value.slice(-2);
		} else if (key === "birthdate" && value.toString().includes("T")) {
			return value.toString().split("T")[0];
		} else {
			return value;
		}
	}
	loadDataToVerifyIdentification() {
		var array = [];
		Object.entries(this.state.dataUserNormalizada).forEach(([key, value]) => {
			////console.log('key ', key, '  value ',value);
			if (
				key !== "active" &&
				key !== "type" &&
				key !== "address" &&
				key !== "operationAccount" &&
				key !== "environment" &&
				key !== "name" &&
				value.toString().trim() !== ""
			) {
				if (key === "gender") {
					array.push(
						<span key={key}>
							{this.state.listLabelDataToVerify.has(key)
								? this.state.listLabelDataToVerify.get(key)
								: key}
							: {this.state.listLabelDataToVerify.get(value)}
							<br />
						</span>,
					);
				} else {
					array.push(
						<span key={key}>
							{this.state.listLabelDataToVerify.has(key)
								? this.state.listLabelDataToVerify.get(key)
								: key}
							: {this.enmaskValueByField(key, value)}
							<br />
						</span>,
					);
				}
			}
		});
		this.setState({
			dataToVerify: array,
		});
	}

	handleSendMessage() {
		if (this.state.selectedFile !== null || this.state.textMessageNew !== "") {
			if (this.state.selectedFile !== null) {
				this.sendMessageWithFile();
			} else {
				this.sendMessageWithOutFile();
			}
			this.setState({
				textMessageNew: "",
			});
			this.deleteFile();
		} else {
			this.setState({
				messageWithoutText: true,
				message: "recharge.formChatVerification.errors.requiredField",
			});
			this.blankErrors("messageWithoutText");
		}
	}

	blankErrors(label) {
		if (label === "messageWithoutText") {
			setTimeout(() => {
				this.setState({ messageWithoutText: false, message: "" });
			}, 5000);
		} else if (label === "messageErrorAdjuntar") {
			setTimeout(() => {
				this.setState({ messageErrorAdjuntar: false, message: "" });
			}, 5000);
		}
	}
	sendMessageWithFile() {
		let formData = new FormData();
		formData.append("attachment", this.state.selectedFile);
		formData.append("userName", window.sessionStorage.getItem("username"));
		formData.append("id", this.state.verificationOperationId);
		formData.append("message", this.state.textMessageNew);
		formData.append("operationMessageSide", "USER");
		otcAPI.addPostOperationMessageWithFile(formData);
		this.deleteFile();
		this.setState({
			textMessageNew: "",
		});
	}
	sendMessageWithOutFile() {
		let formData = new FormData();
		formData.append("userName", window.sessionStorage.getItem("username"));
		formData.append("id", this.state.verificationOperationId);
		formData.append("message", this.state.textMessageNew);
		formData.append("operationMessageSide", "USER");
		otcAPI.addPostOperationMessageWithFile(formData);
		console.log("sendMessageWithOutFile jh");
		this.deleteFile();
		this.setState({
			textMessageNew: "",
		});
	}
	handleChangeTextMessageNew(e) {
		this.setState({
			textMessageNew: e.target.value,
		});
	}
	fileChangedHandler(file) {
		//console.log(file)
		if (file !== undefined && file.length > 0) {
			this.setState({ loadingNewFile: true });
			let obj = file[0];
			let newname1 = file[0].name.replace(/ /g, "-").toLowerCase();
			let newnamesinn = newname1.replace(/ñ/gi, "n");
			let sinacentos = newnamesinn.replace(/[áäà]/gi, "a");
			let newname = sinacentos;
			let f = new File([obj], newname, { type: obj.type });

			this.setState({
				selectedFile: f,
				addFile: false,
				fileName: newname,
				extension: file[0].extension,
			});
		}
	}
	deleteFile() {
		if (this.selfRef !== null && this.selfRef.current !== null) {
			this.selfRef.current.removeFiles();
		}
		this.setState({ selectedFile: {}, addFile: true, fileName: "" });
	}
	fileChangedHandlerError(error) {
		if (error.code === 1) {
			this.setState({
				messageErrorAdjuntar: true,
				message: "recharge.formChatVerification.errors.fileNotSupported",
			});
			setTimeout(() => {
				this.setState({ messageErrorAdjuntar: false, message: "" });
			}, 5000);
		} else {
			this.setState({
				messageErrorAdjuntar: true,
				message: "recharge.formChatVerification.errors.fileSize",
			});
			setTimeout(() => {
				this.setState({ messageErrorAdjuntar: false, message: "" });
			}, 5000);
		}
	}
	socketReady(event, idOperation, webSocketId) {
		//llamar de nuevo cuando seleccione otra operación
		let wsId = null;
		if (webSocketId === null || webSocketId === "") {
			wsId = uuid.v4();
			window.sessionStorage.setItem("recharge.perationSocketId", wsId);
		} else {
			//////console.log("estoy en el else del connect: ", webSocketId);
			wsId = webSocketId;
		}
		let body = {
			method: "getOperationMessages",
			params: {
				id: idOperation,
				side: "User",
				websocketKey: wsId,
			},
		};
		if (this.state.socket !== null && event.target.readyState === 1) {
			try {
				this.state.socket.json(body);
			} catch (e) {}
		}
	}
	reconnectSocket(e, operationId) {
		let ws = window.sessionStorage.getItem("recharge.perationSocketId");
		this.socketReady(e, operationId, ws);
	}
	openSocket = (operationId) => {
		this.setState({
			socket: new Sockette("wss://websocket.dollarbtc.com/otc", {
				onopen: (e) => {
					this.socketReady(
						e,
						operationId,
						window.sessionStorage.getItem("recharge.perationSocketId"),
					);
					//////console.log("conectando...", e);
				},
				onmessage: (e) => {
					this.handleValue(e.data, operationId);
					console.log("respuesta... ", e);
				},
				onreconnect: (e) => {
					this.reconnectSocket(e, operationId);
					console.log("reconectando...", e);
				},
			}),
		});
	};
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
	async getOperationsAttachment(operationId, fileName) {
		let result;
		try {
			const response = await attachments.getOtcAttachment(
				operationId,
				fileName,
			);
			let blob = new Blob([response.data], {
				type: response.headers["content-type"],
			});
			let image = URL.createObjectURL(blob);
			result = image;
		} catch (error) {
			result = "";
		}
		return result;
	}
	async handleValue(value, operationId) {
		let result = JSON.parse(value);
		if (result !== undefined) {
			if (result.params !== undefined) {
				// //console.log(
				// "llega del socket de operaciones de compra ",
				//   result.params
				// );
				for (let i = 0; i < result.params.data.length; i++) {
					let messageToAdd = result.params.data[i];
					if (messageToAdd !== null) {
						//console.log("messageToAdd ", messageToAdd);
						let index = this.state.contactMessages.findIndex((messageAdded) => {
							return messageToAdd.timestamp === messageAdded.timestamp;
						});
						if (index === -1) {
							if (messageToAdd.attachment !== undefined) {
								messageToAdd.urlFile = await this.getOperationsAttachment(
									operationId,
									messageToAdd.attachment,
								);
							}
							this.state.contactMessages.push(messageToAdd);
						}
					}
					if (result.params.data.length > 0) {
						this.state.contactMessages.sort(function (a, b) {
							return new Date(b.timestamp) - new Date(a.timestamp);
						});
						this.setState({
							contactMessages: this.state.contactMessages,
						});
					}
				}
			}
		}
	}
	closeConexionSocket() {
		if (this.state.socket !== null && this.state.socket !== undefined) {
			this.state.socket.close();
			this.setState({
				contactMessages: [],
				selectedFile: null,
			});
		}
		window.sessionStorage.setItem("recharge.perationSocketId", "");
	}
	componentWillUnmount() {
		if (this.state.socket !== undefined && this.state.socket !== null) {
			this.state.socket.close();
		}
		clearInterval(this.state.timerId);
	}
	continue() {
		var num = Math.floor(Math.random() * 100);
		this.props.handleToUpdate(num);
	}

	cancelVerificationPayment() {
		this.setState({
			showButtonCancelVerification: false,
		});
		let idOperationVerification = this.state.configUser.verification.D
			.verificationOperationId;
		////console.log("idOperation ", idOperationVerification);
		userAPI.cancelVerification(idOperationVerification, "D").then((resp) => {
			//////console.log("resp cancelVerification ", resp);
			if (resp.data === "OK") {
				clearInterval(this.state.timerId);
				this.setState({
					cancelVerificationPayment: true,
				});
			} else {
				this.setState({
					showButtonCancelVerification: true,
				});
			}
		});
	}
	handleKeyPressed(e) {
		if (e.which === 13 && !e.shiftKey) {
			e.preventDefault();
			this.handleSendMessage();
		}
	}
	render() {
		let t = this.state.translator;
		let labelMessageErrorAdjunto;
		let labelMessageWithoutText;
		if (this.state.messageWithoutText) {
			labelMessageWithoutText = (
				<div class='widthFull'>
					<Label basic color='red' pointing>
						{t(this.state.message)}
					</Label>
				</div>
			);
		}
		if (this.state.messageErrorAdjuntar) {
			labelMessageErrorAdjunto = (
				<div class='widthFull'>
					<Label basic color='red' pointing>
						{t(this.state.message)}
					</Label>
				</div>
			);
		}
		return (
			<div>
				<Responsive minWidth={992}>
					<Grid columns='equal'>
						<Grid.Column largeScreen={16} mobile={16} tablet={16}>
							<Segment>
								<Form unstackable>
									<Grid columns={16}>
										<Grid.Row centered>
											<Grid.Column
												largeScreen={16}
												computer={16}
												mobile={16}
												tablet={16}>
												{!this.state.cancelVerificationPayment &&
													this.props.whatVerify === "C" &&
													this.state.configUser.verification.C !== undefined &&
													this.state.configUser.verification.C
														.userVerificationStatus === "PROCESSING" && (
														<Message
															info
															header={t(
																"recharge.formChatVerification.verifyC.processing.header",
															)}
															content={t(
																"recharge.formChatVerification.verifyC.processing.content",
															)}
														/>
													)}
												{!this.state.cancelVerificationPayment &&
													this.props.whatVerify === "C" &&
													this.state.configUser.verification.C !== undefined &&
													this.state.configUser.verification.C
														.userVerificationStatus === "FAIL" && (
														<Message color={"red"}>
													<Message.Header>{t("recharge.formChatVerification.verifyC.fail.header")}</Message.Header>
														<p>{t("recharge.formChatVerification.verifyC.fail.content1")}{" "}
															<a href="https://wa.me/+18136871861" target="_blank"><u>{t("recharge.formChatVerification.verifyC.fail.phone")}</u></a>{" "}
													{t("recharge.formChatVerification.verifyC.fail.content2")}</p></Message>
													)}
												{!this.state.cancelVerificationPayment &&
													this.props.whatVerify === "C" &&
													this.state.configUser.verification.C !== undefined &&
													this.state.configUser.verification.C
														.userVerificationStatus === "OK" && (
														<Form.Group>
															<Form.Field width={11}>
																<Message info>
																	<Message.Content>
																		{t(
																			"recharge.formChatVerification.verifyC.success.content",
																		)}
																	</Message.Content>
																</Message>
															</Form.Field>
															<Form.Field width={1} />
															<Form.Field width={4}>
																<div className='marginTopMedium'>
																	<Button
																		color='blue'
																		floated='right'
																		content={t(
																			"recharge.formChatVerification.verifyC.success.buttonContinue",
																		)}
																		onClick={this.continue.bind(this)}
																	/>
																</div>
															</Form.Field>
														</Form.Group>
													)}
												{!this.state.cancelVerificationPayment &&
													this.props.whatVerify === "D" &&
													this.state.configUser.verification.D !== undefined &&
													this.state.configUser.verification.D
														.userVerificationStatus === "PROCESSING" && (
														<Message
															info
															header={t(
																"recharge.formChatVerification.verifyD.processing.header",
															)}
															content={
																this.state.isCreditCard
																	? t(
																			"recharge.formChatVerification.verifyD.processing.creditCardContent",
																	  )
																	: t(
																			"recharge.formChatVerification.verifyD.processing.content",
																	  )
															}
														/>
													)}
												{!this.state.cancelVerificationPayment &&
													this.props.whatVerify === "D" &&
													this.state.configUser.verification.D !== undefined &&
													this.state.configUser.verification.D
														.userVerificationStatus === "FAIL" && (
														<Message
															color={"red"}
															header={t(
																"recharge.formChatVerification.verifyD.fail.header",
															)}
															content={t(
																"recharge.formChatVerification.verifyD.fail.content",
															)}
														/>
													)}
												{!this.state.cancelVerificationPayment &&
													this.props.whatVerify === "D" &&
													this.state.configUser.verification.D !== undefined &&
													this.state.configUser.verification.D
														.userVerificationStatus === "OK" && (
														<Form.Group>
															<Form.Field width={11}>
																<Message info>
																	<Message.Content>
																		{t(
																			"recharge.formChatVerification.verifyD.success.content",
																		)}
																	</Message.Content>
																</Message>
															</Form.Field>
															<Form.Field width={1} />
															<Form.Field width={4}>
																<div className='marginTopMedium'>
																	<Button
																		color='blue'
																		floated='right'
																		content={t(
																			"recharge.formChatVerification.verifyD.success.buttonContinue",
																		)}
																		onClick={this.continue.bind(this)}
																	/>
																</div>
															</Form.Field>
														</Form.Group>
													)}
												{this.state.cancelVerificationPayment && (
													<Form.Group>
														<Form.Field width={11}>
															<Message color={"red"}>
																<Message.Content>
																	{t(
																		"recharge.formChatVerification.verifyD.cancel.content",
																	)}
																</Message.Content>
															</Message>
														</Form.Field>
														<Form.Field width={1} />
														<Form.Field width={4}>
															<div className='marginTopMedium'>
																<Button
																	color='blue'
																	floated='right'
																	content={t(
																		"recharge.formChatVerification.verifyD.cancel.buttonContinue",
																	)}
																	onClick={this.continue.bind(this)}
																/>
															</div>
														</Form.Field>
													</Form.Group>
												)}
											</Grid.Column>
										</Grid.Row>
										{((this.props.whatVerify === "C" &&
											this.state.configUser.verification.C !== undefined &&
											this.state.configUser.verification.C
												.userVerificationStatus !== "OK") ||
											(this.props.whatVerify === "D" &&
												this.state.configUser.verification.D !== undefined &&
												this.state.configUser.verification.D
													.userVerificationStatus !== "OK")) && (
											<Grid.Row>
												{this.state.showButtonCancelVerification && (
													<Grid.Column
														largeScreen={8}
														computer={8}
														mobile={16}
														tablet={16}>
														<Segment>
															<textarea
																rows={2}
																placeholder={t(
																	"recharge.formChatVerification.placeholderChat",
																)}
																onChange={this.handleChangeTextMessageNew.bind(
																	this,
																)}
																value={this.state.textMessageNew}
																onKeyPress={this.handleKeyPressed.bind(this)}
															/>
															<div>{labelMessageWithoutText}</div>
															<br />
															<div className='padding-top-and-button'>
																<Form>
																	<Form.Field>
																		<div align='center'>
																			{this.state.addFile !== true && (
																				<Label>
																					{this.state.fileName}{" "}
																					<Icon
																						name='delete'
																						onClick={this.deleteFile.bind(this)}
																					/>
																				</Label>
																			)}
																		</div>
																	</Form.Field>
																	<Grid columns={4}>
																		<Grid.Column
																			largeScreen={6}
																			computer={6}
																			mobile={16}
																			tablet={6}
																			textAlign='left'>
																			<Form.Field>
																				{this.props.whatVerify === "D" &&
																					this.state
																						.showButtonCancelVerification &&
																					!this.state
																						.cancelVerificationPayment &&
																					this.state.configUser.verification
																						.D !== undefined &&
																					(this.state.configUser.verification.D
																						.userVerificationStatus ===
																						"PROCESSING"|| this.state.configUser.verification.D
																						.userVerificationStatus ===
																						"FAIL") && (
																						<Button
																							basic
																							color='red'
																							//id='button-close'
																							//className="button-close"
																							style={{
																								height: 38,
																								// marginTop:""
																							}}
																							content={t(
																								"recharge.formChatVerification.buttonCancel",
																							)}
																							// compact
																							// basic
																							// size="mini"
																							onClick={this.cancelVerificationPayment.bind(
																								this,
																							)}
																						/>
																					)}
																			</Form.Field>
																		</Grid.Column>
																		<Grid.Column
																			largeScreen={3}
																			computer={3}
																			mobile={16}
																			tablet={3}
																			textAlign='right'
																			verticalAlign={"middle"}
																			style={{ marginRight: -22 }}>
																			<Form.Field>
																				<Files
																					ref={this.selfRef}
																					onChange={this.fileChangedHandler.bind(
																						this,
																					)}
																					onError={this.fileChangedHandlerError.bind(
																						this,
																					)}
																					accepts={["image/*", ".pdf"]}
																					multiple={false}
																					maxFiles={1}
																					maxFileSize={5000000}
																					minFileSize={0}
																					clickable={this.state.addFile}>
																					<Popup
																						content={t(
																							"recharge.formChatVerification.buttonAttachment",
																						)}
																						trigger={
																							<Button
																								compact
																								//color='grey'
																								style={{
																									height: 38,
																								}}>
																								<Image
																									style={{
																										width: "25px",
																										marginTop: "-3px",
																									}}
																									src={iconAdj}
																								/>
																							</Button>
																						}
																					/>
																				</Files>
																			</Form.Field>
																		</Grid.Column>
																		{!isMobile && (<Grid.Column
																			largeScreen={3}
																			computer={3}
																			mobile={16}
																			tablet={3}
																			textAlign='right'
																			verticalAlign={"middle"}
																			style={{ marginRight: -22 }}>
																			<Form.Field>
																				<TakePhoto
																					buttonSize='medium'
																					onHandlerFile={this.fileChangedHandler.bind(
																						this,
																					)}
																				/>
																			</Form.Field>
																		</Grid.Column>)}
																		<Grid.Column
																			largeScreen={4}
																			computer={4}
																			mobile={16}
																			tablet={4}
																			textAlign='right'
																			style={{ marginRight: -20 }}>
																			<Form.Field>
																				<Button
																					color='blue'
																					//size="medium"
																					//compact
																					style={{ height: 40, width: 80 }}
																					//floated={"right"}
																					onClick={this.handleSendMessage.bind(
																						this,
																					)}>
																					{t(
																						"recharge.formChatVerification.buttonSend",
																					)}
																				</Button>
																			</Form.Field>
																		</Grid.Column>
																	</Grid>
																</Form>
															</div>
															<Form.Field width={6}>
																{labelMessageErrorAdjunto}
															</Form.Field>
															<Form.Group inline>
																<Form.Field>
																	<Feed>
																		{this.state.contactMessages.map(
																			(message, i) => (
																				<Feed.Event key={i}>
																					<Feed.Label image={avatarNull} />
																					<Feed.Content>
																						<Feed.Summary>
																							<a href='#'>
																								{message.userName ===
																								sessionStorage.getItem(
																									"username",
																								)
																									? t(
																											"recharge.formChatVerification.labelMe",
																									  )
																									: t(
																											"recharge.formChatVerification.labelModerator",
																									  )}
																							</a>
																							<Feed.Date>
																								{" "}
																								{this.formatDate(
																									new Date(message.timestamp),
																								)}
																							</Feed.Date>
																						</Feed.Summary>
																						<Feed.Extra text>
																							{message.message ===
																							"OPERATION 10 MINUTES LEFT"
																								? t(
																										"recharge.formChatVerification.operationTimeLeft",
																								  )
																								: message.message ===
																								  "OPERATION TIMEOUT"
																								? t(
																										"recharge.formChatVerification.operationTimeExpired",
																								  )
																								: message.message}
																						</Feed.Extra>
																						<Feed.Extra images>
																							<a href='#'>
																								{message.attachment !==
																									undefined && (
																									<Popup
																										trigger={
																											<div>
																												<Icon
																													name='file image outline'
																													size='big'
																													color='blue'
																													onClick={() => {
																														this.setState(
																															{
																																selectImage:
																																	message.urlFile,
																																extension:
																																	message.attachment,
																															},
																															() => {
																																this.setState({
																																	showImage: true,
																																	isPdf: message.attachment.includes(
																																		"pdf",
																																	)
																																		? true
																																		: false,
																																});
																															},
																														);
																													}}
																												/>
																											</div>
																										}
																									/>
																								)}
																							</a>
																						</Feed.Extra>
																					</Feed.Content>
																				</Feed.Event>
																			),
																		)}
																	</Feed>
																</Form.Field>
															</Form.Group>
														</Segment>
													</Grid.Column>
												)}
												<Grid.Column
													largeScreen={
														this.state.showButtonCancelVerification ? 8 : 16
													}
													computer={
														this.state.showButtonCancelVerification ? 8 : 16
													}
													mobile={16}
													tablet={16}>
													<Message info content={this.state.dataToVerify} />
												</Grid.Column>
											</Grid.Row>
										)}
									</Grid>
								</Form>
							</Segment>
						</Grid.Column>
					</Grid>
				</Responsive>
				<Responsive minWidth={0} maxWidth={991}>
					<Grid>
						<Grid.Column mobile={16} tablet={16}>
							<Form unstackable>
								<Grid columns={16}>
									<Grid.Row>
										<Grid.Column mobile={16} tablet={16}>
											{!this.state.cancelVerificationPayment &&
												this.props.whatVerify === "C" &&
												this.state.configUser.verification.C !== undefined &&
												this.state.configUser.verification.C
													.userVerificationStatus === "PROCESSING" && (
													<Message
														info
														header={t(
															"recharge.formChatVerification.verifyC.processing.header",
														)}
														content={t(
															"recharge.formChatVerification.verifyC.processing.content",
														)}
													/>
												)}

											{!this.state.cancelVerificationPayment &&
												this.props.whatVerify === "C" &&
												this.state.configUser.verification.C !== undefined &&
												this.state.configUser.verification.C
													.userVerificationStatus === "FAIL" && (
														<Message color={"red"}>
													<Message.Header>{t("recharge.formChatVerification.verifyC.fail.header")}</Message.Header>
													<p>{t("recharge.formChatVerification.verifyC.fail.content1")}{" "}
														<a href="https://wa.me/18136871861" target="_blank"><u>{t("recharge.formChatVerification.verifyC.fail.phone")}</u></a>{" "}
													{t("recharge.formChatVerification.verifyC.fail.content2")}</p></Message>
													)}
											{!this.state.cancelVerificationPayment &&
												this.props.whatVerify === "C" &&
												this.state.configUser.verification.C !== undefined &&
												this.state.configUser.verification.C
													.userVerificationStatus === "OK" && (
													<Form.Group>
														<Form.Field width={11}>
															<Message info>
																<Message.Content>
																	{t(
																		"recharge.formChatVerification.verifyC.success.content",
																	)}
																</Message.Content>
															</Message>
														</Form.Field>
														<Form.Field width={1} />
														<Form.Field width={4}>
															<div className='marginTopMedium'>
																<Button
																	color='blue'
																	floated='right'
																	content={t(
																		"recharge.formChatVerification.verifyC.success.buttonContinue",
																	)}
																	onClick={this.continue.bind(this)}
																/>
															</div>
														</Form.Field>
													</Form.Group>
												)}
											{!this.state.cancelVerificationPayment &&
												this.props.whatVerify === "D" &&
												this.state.configUser.verification.D !== undefined &&
												this.state.configUser.verification.D
													.userVerificationStatus === "PROCESSING" && (
													<Message
														info
														header={t(
															"recharge.formChatVerification.verifyD.processing.header",
														)}
														content={
															this.state.isCreditCard
																? t(
																		"recharge.formChatVerification.verifyD.processing.creditCardContent",
																  )
																: t(
																		"recharge.formChatVerification.verifyD.processing.content",
																  )
														}
													/>
												)}
											{!this.state.cancelVerificationPayment &&
												this.props.whatVerify === "D" &&
												this.state.configUser.verification.D !== undefined &&
												this.state.configUser.verification.D
													.userVerificationStatus === "FAIL" && (
													<Message
														color={"red"}
														header={t(
															"recharge.formChatVerification.verifyD.fail.header",
														)}
														content={t(
															"recharge.formChatVerification.verifyD.fail.content",
														)}
													/>
												)}
											{!this.state.cancelVerificationPayment &&
												this.props.whatVerify === "D" &&
												this.state.configUser.verification.D !== undefined &&
												this.state.configUser.verification.D
													.userVerificationStatus === "OK" && (
													<div align='center'>
														<Message info>
															<Message.Content>
																{t(
																	"recharge.formChatVerification.verifyD.success.content",
																)}
															</Message.Content>
														</Message>
														<Divider hidden />
														<div style={{ marginLeft: 10 }}>
															<Button
																color='blue'
																style={{
																	borderRadius: "40px/40px",
																	height: "50px",
																	width: "200px",
																}}
																content={t(
																	"recharge.formChatVerification.verifyD.cancel.buttonContinue",
																)}
																onClick={this.continue.bind(this)}
															/>
														</div>
													</div>
												)}
											{this.state.cancelVerificationPayment && (
												<div align='center'>
													<Message color={"red"}>
														<Message.Content>
															{t(
																"recharge.formChatVerification.verifyD.cancel.content",
															)}
														</Message.Content>
													</Message>
													<Divider hidden />
													<div style={{ marginLeft: 10 }}>
														<Button
															color='blue'
															style={{
																borderRadius: "40px/40px",
																height: "50px",
																width: "200px",
															}}
															content={t(
																"recharge.formChatVerification.verifyD.cancel.buttonContinue",
															)}
															onClick={this.continue.bind(this)}
														/>
													</div>
												</div>
											)}
										</Grid.Column>
									</Grid.Row>
									<Grid.Row>
										<Grid.Column mobile={16} tablet={16}>
											<Message info content={this.state.dataToVerify} />
											<div align='center'>
												<Form.Field>
													{this.props.whatVerify === "D" &&
														this.state.showButtonCancelVerification &&
														!this.state.cancelVerificationPayment &&
														this.state.configUser.verification.D !==
															undefined &&
														this.state.configUser.verification.D
															.userVerificationStatus === "PROCESSING" && (
															<Button
																style={{
																	borderRadius: "40px/40px",
																	height: "50px",
																	width: "200px",
																	marginTop: 20,
																}}
																color='red'
																content={t(
																	"recharge.formChatVerification.buttonCancel",
																)}
																compact
																size='mini'
																onClick={this.cancelVerificationPayment.bind(
																	this,
																)}
															/>
														)}
												</Form.Field>
											</div>
											<Divider hidden />
										</Grid.Column>
									</Grid.Row>
								</Grid>
								{((this.props.whatVerify === "C" &&
									this.state.configUser.verification.C !== undefined &&
									this.state.configUser.verification.C
										.userVerificationStatus !== "OK") ||
									(this.props.whatVerify === "D" &&
										this.state.configUser.verification.D !== undefined &&
										this.state.configUser.verification.D
											.userVerificationStatus !== "OK")) &&
									this.state.showButtonCancelVerification && (
										<Grid columns={16}>
											<Grid.Row>
												<textarea
													rows={5}
													placeholder={t(
														"recharge.formChatVerification.placeholderChat",
													)}
													onChange={this.handleChangeTextMessageNew.bind(this)}
													value={this.state.textMessageNew}
													onKeyPress={this.handleKeyPressed.bind(this)}
												/>
												<div>{labelMessageWithoutText}</div>
												<div className='padding-top-and-button'>
													<Form.Field>
														<div align='center'>
															{this.state.addFile !== true && (
																<Label>
																	{this.state.fileName}{" "}
																	<Icon
																		name='delete'
																		onClick={this.deleteFile.bind(this)}
																	/>
																</Label>
															)}
														</div>
													</Form.Field>
												</div>
											</Grid.Row>
											<Grid.Row centered>
												<Grid.Column
													largeScreen={6}
													computer={6}
													mobile={6}
													tablet={6}>
													<Files
														ref={this.selfRef}
														onChange={this.fileChangedHandler.bind(this)}
														onError={this.fileChangedHandlerError.bind(this)}
														accepts={["image/*", ".pdf"]}
														multiple={false}
														maxFiles={1}
														maxFileSize={5000000}
														minFileSize={0}
														clickable={this.state.addFile}>
														{" "}
														<Button
															basic
															size='mini'
															compact
															color='grey'
															disabled={!this.state.addFile}
															style={{
																borderRadius: "20px/20px",
																height: "40px",
																width: "90px",
															}}>
															{t(
																"recharge.formChatVerification.buttonAttachment",
															)}
														</Button>
													</Files>
												</Grid.Column>
											{!isMobile && (<Grid.Column
												largeScreen={4}
												computer={4}
												mobile={4}
												tablet={4}
												verticalAlign={"middle"}
												textAlign={"center"}>
												<TakePhoto
													buttonSize='large'
													onHandlerFile={this.fileChangedHandler.bind(this)}
												/>
											</Grid.Column>)}
												<Grid.Column
													largeScreen={6}
													computer={6}
													mobile={6}
													tablet={6}>
													<Button
														color='blue'
														size='mini'
														compact
														onClick={this.handleSendMessage.bind(this)}
														style={{
															borderRadius: "20px/20px",
															height: "40px",
															width: "90px",
														}}>
														{t("recharge.formChatVerification.buttonSend")}
													</Button>
												</Grid.Column>
											</Grid.Row>
											<Grid.Row>
												<Form.Field width={6}>
													{labelMessageErrorAdjunto}
												</Form.Field>
												<Form.Group inline>
													<Form.Field>
														<Feed>
															{this.state.contactMessages.map((message, i) => (
																<Feed.Event key={i}>
																	<Feed.Label image={avatarNull} />
																	<Feed.Content>
																		<Feed.Summary>
																			<a href='#'>
																				{message.userName ===
																				sessionStorage.getItem("username")
																					? t(
																							"recharge.formChatVerification.labelMe",
																					  )
																					: t(
																							"recharge.formChatVerification.labelModerator",
																					  )}
																			</a>
																			<Feed.Date>
																				{" "}
																				{this.formatDate(
																					new Date(message.timestamp),
																				)}
																			</Feed.Date>
																		</Feed.Summary>
																		<Feed.Extra text>
																			{message.message ===
																			"OPERATION 10 MINUTES LEFT"
																				? t(
																						"recharge.formChatVerification.operationTimeLeft",
																				  )
																				: message.message ===
																				  "OPERATION TIMEOUT"
																				? t(
																						"recharge.formChatVerification.operationTimeExpired",
																				  )
																				: message.message}
																		</Feed.Extra>
																		<Feed.Extra images>
																			<a href='#'>
																				{message.attachment !== undefined && (
																					<Popup
																						trigger={
																							<Icon
																								name='file image outline'
																								size='big'
																								color='blue'
																								onClick={() => {
																									this.setState(
																										{
																											selectImage:
																												message.urlFile,
																											extension:
																												message.attachment,
																										},
																										() => {
																											this.setState({
																												showImage: true,
																												isPdf: message.attachment.includes(
																													"pdf",
																												)
																													? true
																													: false,
																											});
																										},
																									);
																								}}
																							/>
																						}
																						content={t(
																							"recharge.formChatVerification.buttonSeeAttachment",
																						)}
																					/>
																				)}
																			</a>
																		</Feed.Extra>
																	</Feed.Content>
																</Feed.Event>
															))}
														</Feed>
													</Form.Field>
												</Form.Group>
											</Grid.Row>
										</Grid>
									)}
							</Form>
						</Grid.Column>
					</Grid>
				</Responsive>
				<Modal open={this.state.showImage}>
					<Modal.Content>
						{!this.state.isPdf && this.state.selectImage !== "" && (
							<Image centered src={this.state.selectImage} size='medium' />
						)}
						{this.state.isPdf && this.state.selectImage !== "" && (
							<div textAlign='center'>
								<Grid centered>
									<Document
										file={this.state.selectImage}
										externalLinkTarget='_blank'>
										<Page
											pageNumber={1}
											width={isMobile ? 200 : 400}
											height={isMobile ? 200 : 400}
										/>
									</Document>
								</Grid>
							</div>
						)}
					</Modal.Content>
					<Modal.Actions>
						<Button
							onClick={() =>
								this.setState({
									showImage: false,
									selectImage: "",
									isPdf: false,
								})
							}
							color='grey'>
							<p>{t("recharge.modalTerms.buttonClose")}</p>
						</Button>
					</Modal.Actions>
				</Modal>
			</div>
		);
	}
}

export default translate(FormChatVerification);
