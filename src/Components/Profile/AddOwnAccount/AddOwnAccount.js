import React, { Component } from "react";
import "./AddOwnAccount.css";
import user from "../../../services/user";
import otc from "../../../services/otc";
import paymentApi from "../../../services/payment";
import config from "../../../services/config";
import axios from "axios";
import {
	Segment,
	Header,
	Form,
	Button,
	Message,
	Image,
	Grid,
	Divider,
	Responsive,
} from "semantic-ui-react";
import currency from "../../../common/currency";
import DinamicForm from "../../DinamicForm/DinamicForm";
import translate from "../../../i18n/translate";
import { isMobile } from "react-device-detect";
class AddOwnAccount extends Component {
	constructor(props) {
		super(props);
		this.fields = [];
		this.hasCreditCard = null;
		this.constantPaymentsTypes = new Map();
		this.constantPaymentsTypes.set(
			"TRANSFER_WITH_SPECIFIC_BANK",
			props.translate("profile.addAccount.specificBank"),
		);
		this.constantPaymentsTypes.set(
			"TRANSFER_NATIONAL_BANK",
			props.translate("profile.addAccount.thirdBank"),
		);
		this.constantPaymentsTypes.set(
			"CHECK_DEPOSIT",
			props.translate("profile.addAccount.checkDeposit"),
		);
		this.constantPaymentsTypes.set(
			"CASH_DEPOSIT",
			props.translate("profile.addAccount.cashDeposit"),
		);
		this.constantPaymentsTypes.set(
			"WIRE_TRANSFER",
			props.translate("profile.addAccount.wire"),
		);
		this.constantPaymentsTypes.set(
			"TRANSFER_INTERNATIONAL_BANK",
			props.translate("profile.addAccount.international"),
		);
		this.constantPaymentsTypes.set(
			"TRANSFER_TO_CRYPTO_WALLET",
			props.translate("profile.addAccount.cryptoWallet"),
		);
		this.constantPaymentsTypes.set(
			"CREDIT_CARD",
			props.translate("profile.addAccount.creditCard"),
		);
		this.state = {
			forLoad: false,
			automatic: null,
			firstName: sessionStorage.getItem("firstName"),
			lastName: "",
			idHolder: "",
			nameHolder: "",
			accountNumber: "",
			imgCountry: "",
			bank: "",
			formAdd: Math.random(),
			banks: [],
			paymentBody: [],
			fields: [],
			payment: "",
			paymentName: "",
			clientPaymenType: {},
			paymentTypeBody: "",
			listCountrysView: [],
			listCountrys: [],
			getresult: false,
			listPayments: [
				{
					text: props.translate("profile.addAccount.transfer"),
					value: "TRANSFER_TO_BANK_ACCOUNT",
					key: "bank",
				},
				{
					text: "Zelle",
					value: "ZELLE",
					key: "zell",
				},
			],
			statusB: false,
			statusVerificationData: false,
			list: [],
			currencies: [],
			translator: props.translate,
			specialValue: false,
			paymentsUserForCurrency: [],
			showMessageRecomende: false,
			hasCreditCard: {
				isCreditCard: false,
			},
			country: "",
			viewErrorCurrency: false,
		};
		this.getInfoUser = this.getInfoUser.bind(this);
	}
	componentWillReceiveProps(nextProps, nextContext) {
		if (this.props.language !== nextProps.language) {
			this.setState({
				translator: nextProps.translate,
			});
		}
	}

	getInfoUser() {
		let username = user.getUserName();
		user.getConfigUserGeneral(username).then((resp) => {
			if (resp.data.result.verification !== undefined) {
					if (resp.data.result.verification.B !== undefined) {
						if (resp.data.result.verification.C !== undefined || resp.data.result.verification.E !== undefined) {
							if (resp.data.result.verification.C !== undefined && resp.data.result.verification.C === "OK") {
								this.setState({
									statusB: true,
									statusVerificationData: "OK",
								});
							} else if (resp.data.result.verification.E !== undefined && resp.data.result.verification.E === "OK") {
								this.setState({
									statusB: true,
									statusVerificationData: "OK",
								});
							} else if (resp.data.result.verification.E !== undefined) {
								this.setState({
									statusB: true,
									statusVerificationData: resp.data.result.verification.E.userVerificationStatus,
								});
							} else {
								this.setState({
									statusB: true,
									statusVerificationData: resp.data.result.verification.C.userVerificationStatus,
								});
							}
						} else {
							this.setState({
								statusB: true,
								statusVerificationData: "UNINITIATED",
							});
						}
					} 
			}
			let data = user.getActualUserInfo(resp.data.result);
			// //console.log(data);
			this.setState({ firstName: data.firstName, lastName: data.lastName });
		});
	}
	componentDidMount() {
		let resp;
		//let arr = [];
		this.getInfoUser();
		this.getPaymentsTypes();
		this.setState({ formLoad: true });
		let keys = [];
		resp = otc.getCurrencies();
		//console.log(22);
		resp
			.then((r) => {
				this.setState({ formLoad: false, view: true });
				for (let currency of r.data) {
					keys.push(currency.shortName);
				}
				this.setState(() => ({
					currencies: currency.currencies.filter((currency) => {
						return keys.find((key) => key === currency.alias);
					}),
				}));
			})
			.catch((error) => {
				this.setState({ formLoad: false });
				console.log('e ',error);
			});
	}
	getPaymentsTypes() {
		let array = [];
		otc
			.getAllPaymentsTypes()
			.then((resp) => {
				Object.entries(resp.data).forEach(([key, value]) => {
					let ob = {};
					ob.shortName = key;
					ob.clientPaymentTypes = value;
					array.push(ob);
				});
				this.setState({ list: array });
			})
			.catch((error) => {
				console.log(error);
			});
	}
	getPaymentUser(currency) {
		otc
			.getPayments(currency, sessionStorage.getItem("username"))
			.then((resp) => {
				this.setState({ paymentsUserForCurrency: resp.data });
			})
			.catch((error) => {
				this.setState({ paymentsUserForCurrency: [] });
				//console.log(error);
			});
	}
	async handleCountry(e, data) {
		try {
			let transactionsTypes = await otc._getAllowedAddPayments(data.value);
			if (transactionsTypes.data.own) {
				this.setState({ showMessageRecomende: false });
				let array = [];
				this.getPaymentUser(data.value);
				let payments = this.state.list.find(function (ele) {
					return data.value === ele.shortName;
				});
				this.groupPaymentTypesByCurrency(payments);
				let paymentdata = this.state.currencies.find(function (ele) {
					return data.value === ele.value;
				});

				for (let value of payments.clientPaymentTypes) {
					if (value.allowToAddPayment === true) {
						let has;
						has = this.constantPaymentsTypes.has(value.name);
						if (has) {
							let textView = this.constantPaymentsTypes.get(value.name);
							if (value.name === "TRANSFER_WITH_SPECIFIC_BANK") {
								let arrayText = "";
								for (let test of value.fields) {
									if (test.name === "bank") {
										for (let testvalue of test.values) {
											if (arrayText === "") {
												arrayText = arrayText + testvalue;
											} else {
												arrayText = arrayText + " - " + testvalue;
											}
										}
									}
								}
								textView = textView + " (" + arrayText + ")";
							}
							array.push({
								text: textView, //this.constantPaymentsTypes.get(value.name),
								value: value,
								key: value.name,
							});
						} else {
							array.push({
								text: value.description,
								value: value,
								key: value.name,
							});
						}
					}
				}
				this.fields = [];
				this.setState({
					country: paymentdata.value,
					imgCountry: paymentdata.img,
					listPaymentTypes: array,
					viewErrorCurrency: false,
					getresult: false,
				});
			} else {
				let paymentdata = this.state.currencies.find(function (ele) {
					return data.value === ele.value;
				});
				this.setState({
					getresult: true,
					showMessageRecomende: false,
					fields: [],
					country: paymentdata.value,
					imgCountry: paymentdata.img,
					listPaymentTypes: [],
					viewErrorCurrency: true,
					textMessage: "dynamicForm.emptyFields",
				});
			}
		} catch (error) {
			console.log(error.toString());
		}
	}
	groupPaymentTypesByCurrency(payments) {
		let fields = [];
		let fieldsCreditCard = [];
		let paymentsType = payments.clientPaymentTypes;
		if (paymentsType.length > 0) {
			for (let payment of paymentsType) {
				if (payment.allowToAddPayment === true) {
					for (let field of payment.fields) {
						if (field.client !== undefined && field.client) {
							let ob = {};
							let objCreditCard = {};
							let fieldExist = fields.find(function (element) {
								return element.name === field.name;
							});
							if (fieldExist === undefined) {
								if (field.values !== undefined) {
									let arrayRecomended = [];
									if (
										payment.name === "TRANSFER_WITH_SPECIFIC_BANK" ||
										payment.name === "CREDIT_CARD"
									) {
										this.setState({
											showMessageRecomende: true,
										});

										for (let value of field.values) {
											let objRecomende = {
												value: value,
												text: field.name === "bank" ? "*" + value : value,
											};
											arrayRecomended.push(objRecomende);
										}
										ob.name = field.name;
										ob.values = arrayRecomended;
										ob.required = field.required;
										fields.push(ob);
									}
								} else {
									ob.name = field.name;
									ob.required = field.required;
									fields.push(ob);
								}
								// console.log(fields);
							} else {
								if (field.values !== undefined) {
									fields.map(function (element) {
										if (element.name === field.name) {
											if (field.name !== "accountType") {
												for (let value of field.values) {
													if (element.values.indexOf(value) === -1) {
														let ob = {
															value: value,
															text: value,
														};
														element.values.push(ob);
													}
												}
											}
										}
										return element;
									});
								}
							}
							if (payment.name === "CREDIT_CARD") {
								objCreditCard.name = field.name;
								fieldsCreditCard.push(objCreditCard);
							}
						}
					}
				}
				this.fields = fields;
				let hasCreditCard = {
					isCreditCard: fieldsCreditCard.length > 0,
					fields: fieldsCreditCard,
				};
				this.hasCreditCard = hasCreditCard;
				//console.log(hasCreditCard);
			}
			this.setState({ fields: fields, hasCreditCard: this.hasCreditCard });
			//console.log(fields);
		}
	}
	findTypePaymentName() {}
	handlePayment(e, data) {
		this.fields = data.value.fields;
		this.setState({
			paymentName: data.value.description,
			payment: data.value.name,
			messagesBody: data.value.messages,
			automatic: data.value.automaticCharge,
			forceVerification: data.value.forceVerification,
		});
		// //console.log(data.value);
	}

	handleField(name, value) {
		if (value.toString().includes("*")) {
			value = value.split("*")[0];
		}
		let oj = {
			[name]: value,
		};

		this.setState({ paymentBody: [...this.state.paymentBody, oj] });
	}
	handleNewAcount(e) {
		e.preventDefault();
		let pay = {};
		let body = {};
		for (let value of this.state.paymentBody) {
			Object.entries(value).forEach(([key, val]) => {
				Object.defineProperty(pay, key, {
					value: val,
					enumerable: true,
					configurable: true,
					writable: true,
				});
			});
		}
		//console.log(pay);
		let auxPaymentType = this.state.listPaymentTypes.filter(
			(p) => p.value.name === "CREDIT_CARD",
		);
		if (this.state.specialValue) {
			this.setState({ forceVerification: false });
			body = {
				userName: user.getUserName(),
				currency: this.state.country,
				bankLogin: pay.bankLogin,
				bankPassword: pay.bankPassword,
				paymentBank: pay.bank,
				paymentType: this.state.payment,
			};
			//console.log(body);
			this.setState({ formLoad: true });
			paymentApi
				.createExternalPaymentMethod(body)
				.then((resp) => {
					//console.log(resp);
					let keysRes = Object.keys(resp.data);
					if (keysRes.length > 0) {
						if (this.state.paymentsUserForCurrency.length > 0) {
							let paymentExist = this.state.paymentsUserForCurrency.find(
								function (element) {
									return element.id === resp.data.id;
								},
							);
							if (paymentExist === undefined) {
								this.setState({ formLoad: false, formAdd: Math.random() });
								this.setState({
									viewMessage: true,
									textMessage: "profile.addAccount.messages.addAccountSuccess",
									payment: "",
									country: "",
									idHolder: "",
									bank: "",
									paymentText: "",
									countryText: "",
									accountHolder: "",
									nameHolder: "",
									imgCountr: "",
									banks: [],
									paymentBody: [],
									fields: [],
									clientPaymenType: {},
									paymentTypeBody: "",
									listCountrysView: [],
									getresult: true,
								});
								this.fields = [];
								setTimeout(() => {
									this.setState({ viewMessage: false, textMessage: "" });
									this.handleCancel();
								}, 5000);
							} else {
								this.setState({ formLoad: false });
								this.setState({
									viewMessage: true,
									textMessage:
										"profile.addAccount.messages.errorExistExternalPayment",
									payment: "",
									country: "",
									idHolder: "",
									imgCountr: "",
									bank: "",
									paymentText: "",
									countryText: "",
									accountHolder: "",
									nameHolder: "",
									banks: [],
									paymentBody: [],
									fields: [],
									clientPaymenType: {},
									paymentTypeBody: "",
									listCountrysView: [],
								});
								setTimeout(() => {
									this.setState({ viewMessage: false, textMessage: "" });
								}, 5000);
							}
						} else {
							this.setState({ formLoad: false, formAdd: Math.random() });
							this.setState({
								viewMessage: true,
								textMessage: "profile.addAccount.messages.addAccountSuccess",
								payment: "",
								country: "",
								idHolder: "",
								bank: "",
								paymentText: "",
								countryText: "",
								accountHolder: "",
								nameHolder: "",
								imgCountr: "",
								banks: [],
								paymentBody: [],
								fields: [],
								clientPaymenType: {},
								paymentTypeBody: "",
								listCountrysView: [],
								getresult: true,
							});
							setTimeout(() => {
								this.setState({ viewMessage: false, textMessage: "" });
								this.handleCancel();
							}, 5000);
						}
					} else {
						this.setState({ formLoad: false });
						this.setState({
							viewMessage: true,
							textMessage:
								"profile.addAccount.messages.errorExternalPaymentCreate",
							payment: "",
							country: "",
							idHolder: "",
							imgCountr: "",
							bank: "",
							paymentText: "",
							countryText: "",
							accountHolder: "",
							nameHolder: "",
							banks: [],
							paymentBody: [],
							fields: [],
							clientPaymenType: {},
							paymentTypeBody: "",
							listCountrysView: [],
						});
						setTimeout(() => {
							this.setState({ viewMessage: false, textMessage: "" });
						}, 5000);
					}
				})
				.catch((error) => {
					//console.log(error);
					this.setState({ formLoad: false });
					this.setState({
						viewMessage: true,
						textMessage: "profile.addAccount.messages.errorServer",
						payment: "",
						country: "",
						idHolder: "",
						imgCountr: "",
						bank: "",
						paymentText: "",
						countryText: "",
						accountHolder: "",
						nameHolder: "",
						banks: [],
						paymentBody: [],
						fields: [],
						clientPaymenType: {},
						paymentTypeBody: "",
						listCountrysView: [],
					});
					setTimeout(() => {
						this.setState({ viewMessage: false, textMessage: "" });
					}, 5000);
				});
		} else {
			pay.mcVerified = false;
			pay.messages = this.state.messagesBody;
			pay.type = this.state.payment;
			pay.accountHolderName = this.state.firstName + " " + this.state.lastName;
			pay.automaticCharge = this.state.automatic;
			pay.forceVerification = this.state.forceVerification;
			this.setState({ formLoad: true });
			if (pay.hasOwnProperty("cardType")) {
				pay.messages = auxPaymentType[0].value.messages;
				pay.type = auxPaymentType[0].value.name;
				pay.automaticCharge = auxPaymentType[0].value.automaticCharge;
				pay.forceVerification = auxPaymentType[0].value.forceVerification;
			}
			body = {
				userName: user.getUserName(),
				currency: this.state.country,
				payment: pay,
			};
			otc
				.addPayment(body)
				.then((resp) => {
					if (resp.status === 200) {
						let field = "paymentId__" + resp.data;
						this.addInfoUser(field, resp.data);
						this.setState({ formLoad: false, formAdd: Math.random() });
						this.setState({
							viewMessage: true,
							textMessage: "profile.addAccount.messages.addAccountSuccess",
							payment: "",
							country: "",
							idHolder: "",
							bank: "",
							paymentText: "",
							countryText: "",
							accountHolder: "",
							nameHolder: "",
							imgCountr: "",
							banks: [],
							paymentBody: [],
							fields: [],
							clientPaymenType: {},
							paymentTypeBody: "",
							listCountrysView: [],
							getresult: true,
						});
						this.fields = [];
						setTimeout(() => {
							this.setState({ viewMessage: false, textMessage: "" });
							this.handleCancel();
						}, 5000);
					} else {
						//console.log(resp.status);
					}
				})
				.catch((error) => {
					//console.log(error);
					this.setState({ formLoad: false });
					this.setState({
						viewMessage: true,
						textMessage: "profile.addAccount.messages.errorServer",
						payment: "",
						country: "",
						idHolder: "",
						imgCountr: "",
						bank: "",
						paymentText: "",
						countryText: "",
						accountHolder: "",
						nameHolder: "",
						banks: [],
						paymentBody: [],
						fields: [],
						clientPaymenType: {},
						paymentTypeBody: "",
						listCountrysView: [],
					});
					setTimeout(() => {
						this.setState({ viewMessage: false, textMessage: "" });
					}, 5000);
				});
		}
	}
	handleCancel() {
		if (!this.props.addAccount) {
			this.props.changeItem("list-holder");
			this.props.changeItemTwo("optionCurren");
		}
	}
	async addInfoUser(field, value) {
		try {
			let body = {
				userName: window.sessionStorage.getItem("username"),
				fieldName: field,
				fieldValue: value,
			};
			const response = await user.addDataUserAsync(body);
			if (response.data === "OK") {
				this.initVerificationAccount(field);
			}
		} catch (error) {
			console.log(error);
		}
	}
	initVerificationAccount(value) {
		let body = {
			userName: window.sessionStorage.getItem("username"),
			fieldNames: [value],
			userVerificationType: "D",
			info: "Verification payment from client",
		};
		let url = user.verifyUserRequestCore(body);
		url
			.then((resp) => {
				// //console.log(resp);
				this.setState({ formLoad: false, formAdd: Math.random() });
				this.setState({
					viewMessage: true,
					textMessage: "profile.addAccount.messages.addAccountSuccess",
					payment: "",
					country: "",
					idHolder: "",
					bank: "",
					paymentText: "",
					countryText: "",
					accountHolder: "",
					nameHolder: "",
					imgCountr: "",
					banks: [],
					paymentBody: [],
					fields: [],
					clientPaymenType: {},
					paymentTypeBody: "",
					listCountrysView: [],
					getresult: true,
					hasCreditCard: {
						isCreditCard: false,
					},
				});
				this.fields = [];
				setTimeout(() => {
					this.setState({ viewMessage: false, textMessage: "" });
					this.handleCancel();
					if (this.props.addAccount) {
						this.props.changeStatusForm("OWN");
					}
				}, 5000);
			})
			.catch((error) => {
				console.log(error);
				this.setState({
					viewMessage: true,
					textMessage: "profile.addAccount.messages.errorServer",
					payment: "",
					country: "",
					idHolder: "",
					imgCountr: "",
					bank: "",
					paymentText: "",
					countryText: "",
					accountHolder: "",
					nameHolder: "",
					banks: [],
					paymentBody: [],
					fields: [],
					clientPaymenType: {},
					paymentTypeBody: "",
					listCountrysView: [],
					hasCreditCard: {
						isCreditCard: false,
					},
				});
				setTimeout(() => {
					this.setState({ viewMessage: false, textMessage: "" });
					this.handleCancel();
				}, 5000);
			});
	}
	handleSpecial(value) {
		this.setState({ specialValue: value });
	}
	render() {
		let t = this.state.translator;
		let list = this.state.currencies;
		let message, errorCurrency;
		if (this.state.viewErrorCurrency || this.state.fields.length === 0) {
			errorCurrency = <Message negative content={t(this.state.textMessage)} />;
		}
		if (this.state.viewMessage) {
			message = (
				<Message
					info
					style={isMobile ? { width: 200 } : {}}
					content={t(this.state.textMessage)}
				/>
			);
		}
		let valid = false;
		if (
			this.state.statusB &&
			this.state.statusVerificationData === "OK"
		) {
			valid = true;
		}
		let massageRecomended = (
			<Message color='green' style={isMobile ? { width: 200 } : {}}>
				<span style={{ fontWeight: "bold" }}>
					{t("profile.addOwnAccount.messages.recomended")}
				</span>
			</Message>
		);
		return (
			<div>
				{!this.props.addAccount && (
					<div>
						<Header
							textAlign='center'
							style={isMobile ? { color: "#207ef2" } : {}}>
							{t("profile.addAccount.addPaymentMethod")}
						</Header>
						<Divider
							style={isMobile ? { marginTop: -10, borderColor: "#207ef2" } : {}}
						/>
					</div>
				)}
				{valid === true && (
					<div align='center'>
						<Message
							style={isMobile ? { width: 200 } : {}}
							color='red'
							content={t("profile.addOwnAccount.messages.addPaymentMethod")}
						/>
						{isMobile && <Divider hidden></Divider>}
					</div>
				)}
			
				{this.state.statusVerificationData === "UNINITIATED" && (
					<div>
						{" "}
						<Message
							info
							content={t("profile.addOwnAccount.messages.statusCUninitiated")}
						/>
						<Form.Field>
							<Button
								color='blue'
								onClick={this.handleCancel.bind(this)}
								style={
									isMobile
										? {
												borderRadius: "40px/40px",
												height: "50px",
												width: "200px",
												marginTop: 20,
										  }
										: {}
								}>
								{t("profile.addAccount.buttonBack")}
							</Button>
						</Form.Field>
					</div>
				)}
				{this.state.statusVerificationData === "PROCESSING" && (
					<div>
						{" "}
						<Message
							info
							content={t("profile.addOwnAccount.messages.statusCProcessing")}
						/>
						<Form.Field>
							<Button
								color='blue'
								onClick={this.handleCancel.bind(this)}
								style={
									isMobile
										? {
												borderRadius: "40px/40px",
												height: "50px",
												width: "200px",
												marginTop: 20,
										  }
										: {}
								}>
								{t("profile.addAccount.buttonBack")}
							</Button>
						</Form.Field>
					</div>
				)}
				{this.state.statusVerificationData === "FAIL" && (
					<div>
						{" "}
						<Message
							info
							content={
								<div>
									{t("profile.addOwnAccount.messages.statusCFail.part1")}{" "}
									<a href='/contact'>
										{t("profile.addOwnAccount.messages.statusCFail.contactUs")}
									</a>
								</div>
							}
						/>
						<Form.Field>
							<Button
								color='blue'
								onClick={this.handleCancel.bind(this)}
								style={
									isMobile
										? {
												borderRadius: "40px/40px",
												height: "50px",
												width: "200px",
												marginTop: 20,
										  }
										: {}
								}>
								{t("profile.addAccount.buttonBack")}
							</Button>
						</Form.Field>
					</div>
				)}
				
				{valid === true && (
					<Grid columns='equal'>
						{isMobile && <Grid.Column mobile={2} />}
						<Grid.Column largeScreen='11' mobile={8} computer={11} tablet={11}>
							<Form
								error
								loading={this.state.formLoad}
								key={this.state.formAdd}
								onSubmit={this.handleNewAcount.bind(this)}>
								<Form.Group columns='equal'>
									<Form.Field>
										<label
											style={
												isMobile ? { color: "#207ef2", textAlign: "left" } : {}
											}>
											<strong>{t("recharge.form.fields.currency")}</strong>
										</label>
										<Form.Select
											onChange={this.handleCountry.bind(this)}
											placeholder={t("profile.addAccount.placeholderCoin")}
											options={list}
											size='tiny'
										/>
									</Form.Field>
									<Form.Field>
										<Image
											style={{ marginTop: "24px" }}
											src={this.state.imgCountry}
											circular
											size='mini'
										/>
									</Form.Field>
									<Responsive as={Form.Field} {...Responsive.onlyMobile}>
										{" "}
										<Divider hidden />
										<br />
									</Responsive>
									
								</Form.Group>
								{this.state.showMessageRecomende === true && massageRecomended}
								<DinamicForm
									fields={this.state.fields}
									setDinamicValue={this.handleField.bind(this)}
									operation='buy'
									source='profile'
									thirdAccount={false}
									setSpecialValue={this.handleSpecial.bind(this)}
									creditCard={this.state.hasCreditCard}
								/>
								<Divider hidden />
								{message}
								{this.state.country !== "" && errorCurrency}
								<br />
								<Form.Group>
									{!this.state.getresult && (
										<Form.Field>
											<Form.Button
												type='submit'
												color='blue'
												style={
													isMobile
														? {
																borderRadius: "40px/40px",
																height: "50px",
																width: "200px",
																marginTop: 20,
														  }
														: {}
												}>
												{t("profile.addAccount.buttonAdd")}
											</Form.Button>
										</Form.Field>
									)}
									{!this.props.addAccount && (
										<Form.Field>
											<Button
												color='blue'
												onClick={this.handleCancel.bind(this)}
												style={
													isMobile
														? {
																borderRadius: "40px/40px",
																height: "50px",
																width: "200px",
																marginTop: 20,
														  }
														: {}
												}>
												{t("profile.addAccount.buttonBack")}
											</Button>
										</Form.Field>
									)}
								</Form.Group>
							</Form>
						</Grid.Column>
						<Grid.Column
							largeScreen={5}
							computer={5}
							tablet={5}
							mobile={null}
						/>
					</Grid>
				)}
			</div>
		);
	}
}
export default translate(AddOwnAccount);
