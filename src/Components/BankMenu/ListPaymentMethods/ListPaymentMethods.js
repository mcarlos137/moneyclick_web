import React, { Component } from "react";
import ISOCURRENCIES from "../../../common/ISO4217";
import "../../../Components/Admin.css";
import {
	Form,
	Button,
	Divider,
	Icon,
	Header,
	Loader,
	Dimmer,
	Modal,
	Select,
	Message,
	Label,
	Flag,
	Input,
	TextArea,
	Checkbox,
	Segment,
	Popup,
} from "semantic-ui-react";
import ReactTable from "react-table";
import NumberFormat from "react-number-format";
import userService from "../../../services/user";
import otc from "../../../services/otc";
import _ from "underscore";
import translate from "../../../i18n/translate";
import paymentInstructionsDefault from "../../../common/paymentInstructionsDefault";
class ListPaymentMethods extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listPaymentMethods: [],
			showPaymentMethodsTable: false,
			editModal: false,
			totalAmount: "",
			statusToChange: null,
			acceptOutToChange: null,
			acceptInToChange: null,
			totalBalanceToShow: 0,
			statusesOptions: [],
			transferOptions: [
				{ key: "add", value: "add", text: "Adicionar" },
				{ key: "substract", value: "substract", text: "Restar" },
				{ key: "buyBtc", value: "buyBtc", text: "Compra de bitcoins" },
				{ key: "sellBtc", value: "sellBtc", text: "Venta de bitcoins" },
				{
					key: "transferBtc",
					value: "transferBtc",
					text: "Transferencia de fondos",
				},
			],
			acceptOutOptions: [],
			acceptInOptions: [],
			rowToChange: null,
			jsonToEdit: {},
			loadEdit: false,
			transferModal: false,
			checkedMoneclick: false,
			transferOptionSelected: "",
			amountToTransfer: "",
			loadTransfer: false,
			showMessageSucessBalanceOperation: false,
			typesToEdit: [],
			paymentTypeModalOpen: false,
			paymentTypeToAdd: "",
			paymentWindow: "",
			joinMyPaymentsBoolean: false,
			joinFieldValueBoolean: false,
			periodTimeToAdd: "minutes",
			toConfirmPaymentTypes: [],
			paymentTypesByCurrencyOptions: [],
			currenciesToAddOptions: [],
			allFieldsArray: [],
			paymentTypesOptions: [],
			optsModal: false,
			optType: "",
			optAction: "",
			optSource: "",
			changeEditPayment: false,
			rowCurrency: "",
			rowId: "",
			BUY__ALERT_BLUE: "",
			BUY__ALERT_RED: "",
			BUY__ALERT_GREEN: "",
			SELL__ALERT_GREEN: "",
			SELL__ALERT_BLUE: "",
			SELL__ALERT_RED: "",
			sell_instruction: "",
			buy_instruction: "",
			buy_instruction_mc: "",
			defaultMessagesAlert: [],
			defaultMessagesAlertEn: [],
			textGreenSell: true,
			textBlueSell: true,
			textRedSell: true,
			textGreenBuy: true,
			textBlueBuy: true,
			textRedBuy: true,
			optionMessage: true,
			messageError: false,
			nameText: "",
			nameTextAlert: "",
			nameOptions: "",
			indexType: "",
			editPaymentType: false,
			optionPaymentType: false,
			descriptionOperation: "",
			messagesAlertOptions: [
				{ value: "default", text: "Por defecto" },
				{ value: "other", text: "Otro" },
			],
			rulesSend: [],
			rulesBuy: [],
			typePaymentRuleSelected: "",
			typePaymentRuleSelectedBuy: "",
			minOperation: "",
			maxOperation: "",
			minOperationBuy: "",
			maxOperationBuy: "",
			operationStatusMessageBuy: "",
			operationStatusMessage: "",
			statusOptionsBuy: [],
			statusOptionsSell: [],
			languageMessage: "",
			languageMessageBuy: "",
			allStatus: [],
			messageInstructionsSell: [],
			messageInstructionsBuy: [],
			optionsLanguageSell: [],
			optionsLanguageBuy: [],
			typeMessageSelectedSell: "",
			typeMessageSelectedBuy: "",
			optionsTypeMessagesBuy: [],
			optionsTypeMessagesSell: [],
			isAlertMessage: false,
			isInstructionsMessage: false,
			typeAlertSelected: "",
			useInstructionsDefaultBuy: false,
			useInstructionsDefaultMcBuy: false,
			useInstructionsDefaultSell: false,
			translator: props.translate,
			defaultInstructions: {
				buy: {},
				sell: {},
			},
			existsDefaultInstructionsBuy: "",
			existsDefaultInstructionsSell: "",
			amountToTransferBtc: "",
			otcSelected: "",
			totalAmountBuy: "",
			otcOptions: [],
			accountOptions: [],
			accountSelected: "",
			paymentTypesOptionsBuy: [],
			paymentTypesOptionsSend: [],
			messageInstructionsMcBuy: [],
			languageMessageMcBuy: "",
			operationStatusMessageMcBuy: "",
			isAlertMessageMcBuy: false,
			optionsTypeMessagesBuy: [],
			isInstructionsMessageMcBuy: false,
		};
		this.closeModalEditOpts = this.closeModalEditOpts.bind(this);
		this.editAcceptInOrOut = this.editAcceptInOrOut.bind(this);
		this.pickOTCOperationStatusToSearch = this.pickOTCOperationStatusToSearch.bind(
			this,
		);
		this.onChangeTypeMessageSell = this.onChangeTypeMessageSell.bind(this);
		this.onChangeTypeMessageBuy = this.onChangeTypeMessageBuy.bind(this);
		this.onChangeInstructionsDefaultBuy = this.onChangeInstructionsDefaultBuy.bind(
			this,
		);
		this.onChangeInstructionsDefaultSell = this.onChangeInstructionsDefaultSell.bind(
			this,
		);
	}
	componentWillReceiveProps(nextProps, nextContext) {
		if (this.props.language !== nextProps.language) {
			this.setState({
				translator: nextProps.translate,
			});
		}
	}
	setTotalAmountOperationSend(value) {
		this.setState({ totalAmount: value });
	}
	setTotalAmountOperationBuy(value) {
		this.setState({ totalAmountBuy: value });
	}
	componentDidMount() {
		this.loadStatusOptions();
		this.loadAcceptOutOptions();
		this.loadAcceptInOptions();
		this.getPaymentMethods();
		this.loadCurrencies();
		//	this.getMasterAccount();
	}
	componentWillMount() {
		this.setOperationsStatusSellAndBuy();
	}

	getPaymentMethodsBalance = (body) => {
		this.setState({ showResult: false });

		let url = otc.getDollarBTCPaymentBalanceBankers(body); //Bankers
		url
			.then((res) => {
				// this.setState({
				// 	showResult: true,
				// });
				console.log(res);
				var paymentMethodShow = [];
				var totalBalance = 0;
				Object.entries(res.data).forEach(([key, value]) => {
					var paymentMetToAdd = {};
					paymentMetToAdd.id = key;
					paymentMetToAdd.amounts = [];
					var amountToPush = {};
					if (value.length > 0) {
						for (var i = 0; i < value.length; i++) {
							amountToPush = {};
							amountToPush.currency = value[i].currency;
							amountToPush.amount = value[i].amount;
							paymentMetToAdd.amounts.push(amountToPush);
						}
					} else {
						amountToPush.amount = 0;
						paymentMetToAdd.amounts.push(amountToPush);
					}
					paymentMethodShow.push(paymentMetToAdd);
				});
				for (var j = 0; j < paymentMethodShow.length; j++) {
					for (var y = 0; y < paymentMethodShow[j].amounts.length; y++)
						totalBalance =
							totalBalance + paymentMethodShow[j].amounts[y].amount;
				}
				//	this.getPaymentMethodsMovements();
				this.setState({
					//	paymentMethodsAmount: paymentMethodShow,
					totalBalanceToShow: totalBalance !== undefined ? totalBalance : 0,
				});
				//	console.log("totalBalanceToShow:", this.state.totalBalanceToShow);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	getPaymentMethods = () => {
		let currencyService =
			window.sessionStorage.getItem("userType") === "BANKER"
				? otc.getPaymentsBankers(userService.getUserName())
				: otc.getPaymentsAdmin(userService.getUserName()); //userService.getUserName()

		currencyService
			.then((resp) => {
				this.makeDataTable(resp.data);
			})
			.catch((error) => {
				//console.log(error);
			});
	};
	makeDataTable = (paymentMethods) => {
		//console.log(paymentMethods);
		var paymentMethodsWithCurrency = [];
		Object.entries(paymentMethods).forEach(([currency, paymentMethod]) => {
			for (let i = 0; i < paymentMethod.length; i++) {
				let paymentToAdd = {};
				paymentToAdd.currency = currency;
				let countryCoin = currency.split("_");
				let currencyCurrent = ISOCURRENCIES.ISOCURRENCIES.filter((c) => {
					if (countryCoin.length > 1)
						return c.flag === countryCoin[0].toLowerCase();
					else return c.key === countryCoin[0];
				})[0];
				if (currencyCurrent !== undefined) {
					paymentToAdd.flag = currencyCurrent.flag;
				} else paymentToAdd.icon = currency === "ETH" ? "ethereum" : "globe";
				paymentToAdd.id = paymentMethod[i].id;
				paymentToAdd.active = paymentMethod[i].active;
				if (paymentMethod[i].type === "TRANSFER_INTERNATIONAL_BANK") {
					paymentToAdd.type = "Transferencia internacional (Swift o Aba)";
				} else if (paymentMethod[i].type === "CASH_DEPOSIT") {
					paymentToAdd.type = "Depósito en efectivo";
				} else if (paymentMethod[i].type === "TRANSFER_WITH_SPECIFIC_BANK") {
					paymentToAdd.type = "Transferencia desde un banco específico";
				} else if (paymentMethod[i].type === "TRANSFER_NATIONAL_BANK") {
					paymentToAdd.type = "Transferencia desde un tercer banco";
				} else if (paymentMethod[i].type === "TRANSFER_TO_CRYPTO_WALLET") {
					paymentToAdd.type = "Transferencia desde una crypto wallet";
				} else if (paymentMethod[i].type === "WIRE_TRANSFER") {
					paymentToAdd.type = "Wire (Transferencia cablegráfica)";
				} else if (paymentMethod[i].type === "CHECK_DEPOSIT") {
					paymentToAdd.type = "Depósito en cheque";
				} else if (paymentMethod[i].type === "CREDIT_CARD") {
					paymentToAdd.type = "Tarjeta de crédito";
				} else if (paymentMethod[i].type === "PERSONAL_CHECK_DEPOSIT") {
					paymentToAdd.type = "Cheque personal";
				} else if (paymentMethod[i].type === "CASHIER_CHECK_DEPOSIT") {
					paymentToAdd.type = "Cheque de gerencia";
				} else if (paymentMethod[i].type === "MONEY_ORDER") {
					paymentToAdd.type = "Orden de dinero";
				} else {
					paymentToAdd.type = paymentMethod[i].type;
				}
				paymentToAdd.bank = paymentMethod[i].bank;
				paymentToAdd.accountNumber = paymentMethod[i].accountNumber;
				paymentToAdd.accountHolderName = paymentMethod[i].accountHolderName;
				paymentToAdd.accountHolderId = paymentMethod[i].accountHolderId;
				paymentToAdd.accountType = paymentMethod[i].accountType;
				paymentToAdd.email = paymentMethod[i].email;
				paymentToAdd.userName = paymentMethod[i].userName;
				paymentToAdd.info =
					paymentMethod[i].bank !== undefined
						? paymentMethod[i].bank +
						  (paymentMethod[i].accountNumber !== undefined
								? " - " + paymentMethod[i].accountNumber
								: "") +
						  (paymentMethod[i].accountHolderName !== undefined
								? " - " + paymentMethod[i].accountHolderName
								: "") +
						  (paymentMethod[i].accountHolderId !== undefined
								? " - " + paymentMethod[i].accountHolderId
								: "") +
						  (paymentMethod[i].accountType !== undefined
								? " - " + paymentMethod[i].accountType
								: "")
						: paymentMethod[i].walletAddress;
				paymentToAdd.acceptOut = paymentMethod[i].acceptOut;
				paymentToAdd.acceptIn = paymentMethod[i].acceptIn;
				paymentToAdd.originalPayment = paymentMethod[i];
				paymentMethodsWithCurrency.push(paymentToAdd);
			}
		});
		this.setState({
			listPaymentMethods: paymentMethodsWithCurrency,
			showPaymentMethodsTable: true,
		});
	};
	closeEditModal = () => {
		this.setState({
			editModal: false,
			changeEditPayment: false,
			toEditDataName: null,
			toEditDataValue: null,
			acceptInToChange: null,
			acceptOutToChange: null,
			statusToChange: null,
			textGreenSell: true,
			textBlueSell: true,
			textRedSell: true,
			textGreenBuy: true,
			textBlueBuy: true,
			textRedBuy: true,
			optionMessage: true,
			messageError: false,
			editPaymentType: false,
			greenAlertOption: "",
			blueAlertOption: "",
			redAlertOption: "",
			greenBuyAlertOption: "",
			blueBuyAlertOption: "",
			redBuyAlertOption: "",
			BUY__ALERT_BLUE: "",
			BUY__ALERT_RED: "",
			BUY__ALERT_GREEN: "",
			SELL__ALERT_GREEN: "",
			SELL__ALERT_BLUE: "",
			SELL__ALERT_RED: "",
			sell_instruction: "",
			buy_instruction: "",
			buy_instruction_mc: "",
			optionPaymentType: false,
			nameOptions: "",
			paymentTypeToAdd: "",
			paymentWindow: "",
			rulesSend: [],
			rulesBuy: [],
			minOperation: "",
			maxOperation: "",
			typePaymentRuleSelected: "",
			minOperationBuy: "",
			maxOperationBuy: "",
			typePaymentRuleSelectedBuy: "",
			loadEdit: false,
		});
	};
	closeTransferModal = () => {
		this.setState({
			transferModal: false,
			amountToTransfer: "",
			transferOptionSelected: "",
			textGreenSell: true,
			textBlueSell: true,
			textRedSell: true,
			textGreenBuy: true,
			textBlueBuy: true,
			textRedBuy: true,
			optionMessage: true,
			messageError: false,
			greenAlertOption: "",
			blueAlertOption: "",
			redAlertOption: "",
			greenBuyAlertOption: "",
			blueBuyAlertOption: "",
			redBuyAlertOption: "",
			BUY__ALERT_BLUE: "",
			BUY__ALERT_RED: "",
			BUY__ALERT_GREEN: "",
			SELL__ALERT_GREEN: "",
			SELL__ALERT_BLUE: "",
			SELL__ALERT_RED: "",
			sell_instruction: "",
			buy_instruction: "",
			buy_instruction_mc: "",
			descriptionOperation: "",
			otcSelected: "",
			viewMasterAccountOptions: false,
			viewTransferAccountOptions: false,
			amountToTransferBtc: "",
			checkedMoneclick: false,
		});
	};
	closeModalEditOpts = () => {
		this.setState({
			optsModal: false,
			optType: "",
			optAction: "",
		});
	};

	openEditOptsModal = (row, source) => {
		////console.log(row);
		////console.log(source);
		otc
			.getPaymentsBankers(userService.getUserName(), row.currency, row.id)
			.then((resp) => {
				var paymentTypesArray = [];
				let id, setnew;
				Object.entries(resp.data).forEach(([key, value]) => {
					Object.entries(value).forEach(([ke, val]) => {
						Object.entries(val).forEach(([k, v]) => {
							if (k === "id") {
								id = v;

								if (row.id === id) {
									setnew = val;
								}
							}
						});
					});
				});

				// let arr = [];
				setnew.types = [
					{
						name: setnew.type,
						payWindow: setnew.payWindow,
						joinFieldValue: setnew.joinFieldValue,
						joinMyPayments: setnew.joinMyPayments,
						messages: setnew.messages,
					},
				];
				// arr.push(body);

				// setnew.types = arr;

				for (var c = 0; c < this.state.paymentTypesOptions.length; c++) {
					if (
						this.state.paymentTypesOptions[c].key.split("/")[0] === row.currency
					) {
						paymentTypesArray.push(this.state.paymentTypesOptions[c]);
					}
				}
				var definitivePaymentArray = _.reject(paymentTypesArray, function (el) {
					for (var i = 0; i < setnew.type.length; i++) {
						return el.key.split("/")[1] === setnew.type[i].name;
					}
				});
				// let types = [];
				// types.push(setnew.types);
				this.setState(
					{
						optSource: source.split("__")[0],
						rowToChange: row,
						jsonToEdit: setnew,
						typesToEdit: setnew.types,

						paymentTypesByCurrencyOptions: definitivePaymentArray,
						optType: source.split("__")[0] === "in" ? "Acreditar" : "Debitar",
						optAction:
							source.split("__")[1] === "activate" ? "Activar" : "Inactivar",
					},
					() => {
						this.setState({ optsModal: true });
					},
				);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	openEditModal = (row) => {
		//console.log(row);
		let id, setnew;
		otc
			.getPaymentsBankers(userService.getUserName(), row.currency, row.id)
			.then((resp) => {
				//	console.log(resp.data);

				Object.entries(resp.data).forEach(([key, value]) => {
					Object.entries(value).forEach(([ke, val]) => {
						Object.entries(val).forEach(([k, v]) => {
							if (k === "id") {
								id = v;

								if (row.id === id) {
									setnew = val;
								}
							}
						});
					});
				});

				setnew.types = [
					{
						name: setnew.type,
						payWindow: setnew.payWindow,
						joinFieldValue: setnew.joinFieldValue,
						joinMyPayments: setnew.joinMyPayments,
						messages: setnew.messages,
					},
				];

				var paymentTypesArray = [];
				for (var c = 0; c < this.state.paymentTypesOptions.length; c++) {
					if (
						this.state.paymentTypesOptions[c].key.split("/")[0] === row.currency
					) {
						paymentTypesArray.push(this.state.paymentTypesOptions[c]);
					}
				}

				var definitivePaymentArray = _.reject(paymentTypesArray, function (el) {
					for (var i = 0; i < setnew.types.length; i++) {
						return el.key.split("/")[1] === setnew.types[i].name;
					}
				});
				let rules = [];
				let rulesBuy = [];
				if (setnew.sendToPayments !== undefined) {
					for (let rule of setnew.sendToPayments) {
						let newrule = {
							type: rule.type,
							minPerOperationAmount: rule.minPerOperationAmount,
							maxPerOperationAmount: rule.maxPerOperationAmount,
							key: row.currency + "/" + rule.type,
						};
						let findTypePayment = paymentTypesArray.find(function (payment) {
							return payment.key.split("/")[1] === rule.type;
						});
						if (
							rule.totalAmount !== undefined &&
							rule.totalAmount !== null &&
							rule.totalAmount !== ""
						) {
							newrule.totalAmount = rule.totalAmount;
						}
						if (
							rule.accumulatedAmount !== undefined &&
							rule.accumulatedAmount !== null &&
							rule.accumulatedAmount !== ""
						) {
							newrule.accumulatedAmount = rule.accumulatedAmount;
						}
						newrule.text =
							findTypePayment.text +
							" - " +
							"Min. " +
							this.format(rule.minPerOperationAmount) +
							" - " +
							"Max. " +
							this.format(rule.maxPerOperationAmount);
						if (
							newrule.totalAmount !== "" &&
							newrule.totalAmount !== null &&
							newrule.totalAmount !== undefined
						) {
							newrule.text =
								newrule.text +
								"  -  " +
								"Total. " +
								this.format(rule.totalAmount);
						}
						if (
							newrule.accumulatedAmount !== "" &&
							newrule.accumulatedAmount !== null &&
							newrule.accumulatedAmount !== undefined
						) {
							newrule.text =
								newrule.text +
								" - " +
								"Total Acumulado. " +
								this.format(rule.accumulatedAmount);
						} else {
							newrule.text = newrule.text + " - " + "Total Acumulado. " + "0";
						}
						rules.push(newrule);
					}
				}

				let paymentToPickerBuy = [];
				let paymentToPickerSend = [];
				if (setnew.buyBalance !== undefined) {
					for (let rule of setnew.buyBalance) {
						let newrule = {
							type: rule.type,
							minPerOperationAmount: rule.minPerOperationAmount,
							maxPerOperationAmount: rule.maxPerOperationAmount,
							key: row.currency + "/" + rule.type,
						};
						if (
							rule.totalAmountBuy !== undefined &&
							rule.totalAmountBuy !== null &&
							rule.totalAmountBuy !== ""
						) {
							newrule.totalAmountBuy = rule.totalAmountBuy;
						}
						if (
							rule.accumulatedAmountBuy !== undefined &&
							rule.accumulatedAmountBuy !== null &&
							rule.accumulatedAmountBuy !== ""
						) {
							newrule.accumulatedAmountBuy = rule.accumulatedAmountBuy;
						}
						let findTypePayment = paymentTypesArray.find(function (payment) {
							return payment.key.split("/")[1] === rule.type;
						});
						if (findTypePayment !== undefined) {
							newrule.text =
								findTypePayment.text +
								" - " +
								"Min. " +
								this.format(rule.minPerOperationAmount) +
								" - " +
								"Max. " +
								this.format(rule.maxPerOperationAmount);
							if (
								newrule.totalAmountBuy !== "" &&
								newrule.totalAmountBuy !== null &&
								newrule.totalAmountBuy !== undefined
							) {
								newrule.text =
									newrule.text +
									"  -  " +
									"Total. " +
									this.format(rule.totalAmountBuy);
							}
							if (
								newrule.accumulatedAmountBuy !== "" &&
								newrule.accumulatedAmountBuy !== null &&
								newrule.accumulatedAmountBuy !== undefined
							) {
								newrule.text =
									newrule.text +
									"  -  " +
									"Total Acumulado. " +
									this.format(rule.accumulatedAmountBuy);
							} else {
								newrule.text =
									newrule.text + "  -  " + "Total Acumulado. " + "0";
							}
							rulesBuy.push(newrule);
						}
					}
				}

				for (let payment of paymentTypesArray) {
					let findPaymentType = rulesBuy.find((element) => {
						return element.type === payment.key.split("/")[1];
					});
					if (findPaymentType === undefined) {
						paymentToPickerBuy.push(payment);
					}
					let findPaymentTypeSend = rules.find((element) => {
						return element.type === payment.key.split("/")[1];
					});
					if (findPaymentTypeSend === undefined) {
						paymentToPickerSend.push(payment);
					}
				}

				this.setState(
					{
						statusToChange: row.active,
						acceptOutToChange: row.acceptOut,
						acceptInToChange: row.acceptIn,
						rowToChange: row,
						jsonToEdit: setnew,
						typesToEdit: setnew.types,
						paymentTypesByCurrencyOptions: definitivePaymentArray,
						paymentTypesOptionsSend: paymentToPickerSend,
						paymentTypesOptionsBuy: paymentToPickerBuy,
						allPaymentTypesAvaible: paymentTypesArray,
						rulesSend: rules,
						rulesBuy: rulesBuy,
					},
					() => {
						this.setState({ editModal: true, optionEdit: false });
					},
				);
			})
			.catch((error) => {
				//console.log(error);
			});
	};
	setPicketPaymentTypeSelectSend(e, data) {
		this.setState({ typePaymentRuleSelected: data.value });
	}
	setMinAmountOperationSend(value) {
		this.setState({ minOperation: value });
	}
	setMaxAmountOperationSend(value) {
		this.setState({ maxOperation: value });
	}
	format(n, sep, decimals) {
		let newn = parseFloat(n);
		//sep = sep || "."; // Default to period as decimal separator
		//decimals = decimals || 2; // Default to 2 decimals
		return (
			// n.toLocaleString().split(sep)[0] + sep + n.toFixed(decimals).split(sep)[1]
			new Intl.NumberFormat().format(newn)
		);
	}
	addRulesToSendPayments() {
		let min = Number(this.state.minOperation);
		let max = Number(this.state.maxOperation);
		if (min < max) {
			let value = this.state.typePaymentRuleSelected.split("/")[1];
			let originalValue = this.state.typePaymentRuleSelected;
			let text = this.state.paymentTypesOptions.find(function (element) {
				return element.value === originalValue;
			});

			let rule = {
				type: value,
				minPerOperationAmount: Number(this.state.minOperation),
				maxPerOperationAmount: Number(this.state.maxOperation),
				totalAmount: Number(this.state.totalAmount),
				text:
					text.text +
					" - " +
					"Min. " +
					this.format(this.state.minOperation.toString()) +
					" - " +
					"Max. " +
					this.format(this.state.maxOperation.toString()) +
					" - " +
					" Total. " +
					this.format(this.state.totalAmount.toString()),
				key: this.state.paymentTypeSelectSend,
			};
			this.setState({ rulesSend: [...this.state.rulesSend, rule] }, () => {
				let newOptions = this.state.paymentTypesOptionsSend.filter(function (
					element,
				) {
					return element.value !== originalValue;
				});

				this.setState({
					paymentTypesOptionsSend: newOptions,
					typePaymentRuleSelected: "",
					minOperation: "",
					maxOperation: "",
					totalAmount: "",
					changeEditPayment: true,
				});
			});
		} else {
			this.setState({ errorAmount: true });
			setTimeout(() => {
				this.setState({ errorAmount: false });
			}, 6000);
		}
	}
	removeRulesToSendPayments(key) {
		let newRules = this.state.rulesSend.filter(function (element) {
			return element.key !== key;
		});
		this.setState({ rulesSend: newRules, changeEditPayment: true });
		let findOption = this.state.paymentTypesOptions.find(function (element) {
			return element.value === key;
		});
		this.setState({
			paymentTypesOptionsSend: [
				...this.state.paymentTypesOptionsSend,
				findOption,
			],
		});
	}
	setPicketPaymentTypeSelectBuy(e, data) {
		this.setState({ typePaymentRuleSelectedBuy: data.value });
	}
	setMinAmountOperationBuy(value) {
		this.setState({ minOperationBuy: value });
	}
	setMaxAmountOperationBuy(value) {
		this.setState({ maxOperationBuy: value });
	}
	addRulesToBuyPayments() {
		let min = Number(this.state.minOperationBuy);
		let max = Number(this.state.maxOperationBuy);
		if (min < max) {
			let value = this.state.typePaymentRuleSelectedBuy.split("/")[1];
			let originalValue = this.state.typePaymentRuleSelectedBuy;
			let text = this.state.paymentTypesOptions.find(function (element) {
				return element.value === originalValue;
			});
			let rule = {
				type: value,
				minPerOperationAmount: Number(this.state.minOperationBuy),
				maxPerOperationAmount: Number(this.state.maxOperationBuy),
				totalAmountBuy: Number(this.state.totalAmountBuy),
				text:
					text.text +
					" - " +
					"Min. " +
					this.format(this.state.minOperationBuy.toString()) +
					" - " +
					"Max. " +
					this.format(this.state.maxOperationBuy.toString()) +
					" - " +
					"Total. " +
					this.format(this.state.totalAmountBuy.toString()),
				key: this.state.paymentTypeSelectBuy,
			};
			this.setState({ rulesBuy: [...this.state.rulesBuy, rule] }, () => {
				let newOptions = this.state.paymentTypesOptionsBuy.filter(function (
					element,
				) {
					return element.value !== originalValue;
				});

				this.setState({
					paymentTypesOptionsBuy: newOptions,
					typePaymentRuleSelectedBuy: "",
					minOperationBuy: "",
					maxOperationBuy: "",
					totalAmountBuy: "",
					changeEditPayment: true,
				});
			});
		} else {
			this.setState({ errorAmountBuy: true });
			setTimeout(() => {
				this.setState({ errorAmountBuy: false });
			}, 6000);
		}
	}
	removeRulesToBuyPayments(key) {
		let newRules = this.state.rulesBuy.filter(function (element) {
			return element.key !== key;
		});
		this.setState({ rulesBuy: newRules, changeEditPayment: true }, () =>
			console.log(newRules, this.state.rulesBuy),
		);
		let findOption = this.state.paymentTypesOptions.find(function (element) {
			return element.value === key;
		});
		this.setState({
			paymentTypesOptionsBuy: [
				...this.state.paymentTypesOptionsBuy,
				findOption,
			],
		});
	}
	openTransferModal = (row) => {
		var body = {
			userName: userService.getUserName(), //userService.getUserName(),
			currency: row.currency,
			paymentIds: [row.id],
			initTimestamp: "",
			finalTimestamp: "",
		};

		otc
			.getPaymentsBankers(userService.getUserName(), row.currency, row.id)
			.then((resp) => {
				console.log(resp);
				this.setState(
					{
						rowToChange: row,
						jsonToEdit: resp.data,
					},
					() => {
						this.setState({ transferModal: true });
						this.getPaymentMethodsBalance(body); //ojo revisar
					},
				);
			})
			.catch((error) => {
				//console.log(error);
			});
	};

	editPayment() {
		this.setState({ loadEdit: true, optionEdit: false });
		var newStatus = this.state.statusToChange;
		var newAcceptOut = this.state.acceptOutToChange;
		var newAcceptIn = this.state.acceptInToChange;
		var jsonPayment = {};
		Object.entries(this.state.jsonToEdit).forEach(([key, value]) => {
			if (key !== "buyBalance" && key !== "sendToPayments") {
				Object.defineProperty(jsonPayment, key, {
					value: value,
					enumerable: true,
					configurable: true,
					writable: true,
				});
			}
		});
		var typesToEdit = this.state.typesToEdit;
		jsonPayment.active = newStatus;
		jsonPayment.acceptOut = newAcceptOut;
		jsonPayment.acceptIn = newAcceptIn;
		jsonPayment.types = typesToEdit;
		if (this.state.rulesSend.length > 0) {
			let rulesToset = [];
			for (let rule of this.state.rulesSend) {
				let rul = {
					type: rule.type,
					minPerOperationAmount: rule.minPerOperationAmount,
					maxPerOperationAmount: rule.maxPerOperationAmount,
					totalAmount: rule.totalAmount,
				};
				rulesToset.push(rul);
			}
			jsonPayment.sendToPayments = rulesToset;
		}
		if (this.state.rulesBuy.length > 0) {
			let rulesTo = [];
			for (let rule of this.state.rulesBuy) {
				let rul = {
					type: rule.type,
					minPerOperationAmount: rule.minPerOperationAmount,
					maxPerOperationAmount: rule.maxPerOperationAmount,
					totalAmountBuy: rule.totalAmountBuy,
				};
				rulesTo.push(rul);
			}
			jsonPayment.buyBalance = rulesTo;
		}

		var body = {
			userName: userService.getUserName(),
			id: this.state.rowToChange.id,
			currency: this.state.rowToChange.currency,
			payment: jsonPayment,
		};
		otc
			.editDollarBTCPaymentBankers(body)
			.then((res) => {
				this.getPaymentMethods();
				this.closeEditModal();
				this.setState({ loadEdit: false, changeEditPayment: false });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	getOptionsAccount = () => {
		let username = userService.getUserName();
		let currency = this.state.rowToChange.currency;
		let id = this.state.rowToChange.id;
		let services =
			window.sessionStorage.getItem("userType") === "BANKER"
				? otc.getPaymentsBankers(username, currency)
				: otc.getPaymentsAdmin(username, currency);
		services
			.then((resp) => {
				var accountsArray = resp.data;
				var AccountsBank = [];
				var objectToPush;
				let idBase = this.state.rowToChange.id;
				for (var i = 0; i < accountsArray.length; i++) {
					if (accountsArray[i].id !== idBase) {
						if (AccountsBank.length === 0) {
							objectToPush = {};
							objectToPush.key = accountsArray[i].id;
							objectToPush.text =
								accountsArray[i].bank + "-" + accountsArray[i].accountNumber;
							objectToPush.value = accountsArray[i].id;
						} else {
							for (var j = 0; j < AccountsBank.length; j++) {
								if (
									AccountsBank[j].key !== undefined ||
									AccountsBank[j].key !== null
								) {
									objectToPush = {};
									if (accountsArray[i].id !== AccountsBank[j].key) {
										objectToPush.key = accountsArray[i].id;
										objectToPush.text =
											accountsArray[i].bank +
											"-" +
											accountsArray[i].accountNumber;
										objectToPush.value = accountsArray[i].id;
									} else {
										// console.log(
										// 	"repetido",
										// 	accountsArray[i].id,
										// 	" - ",
										// 	AccountsBank[j].key,
										// );
										objectToPush = null;
									}
								}
							}
						}
						if (objectToPush !== null) AccountsBank.push(objectToPush);
					}
				}
				this.setState({
					accountOptions: AccountsBank,
				});
			})
			.catch((error) => {});
	};

	transferAmountToPaymentMethod = () => {
		this.setState({ loadTransfer: true });
		let service;
		var body = {
			id: this.state.rowToChange.id,
			userName: userService.getUserName(),
			currency: this.state.rowToChange.currency,
			amount: this.state.amountToTransfer,
			additionalInfo: this.state.descriptionOperation,
			//	compensateMoneyclick: this.state.checkedMoneclick,
		};
		if (this.state.transferOptionSelected === "add") {
			service = otc.addBalanceToDollarBTCPaymentBankers(body);
		} else if (this.state.transferOptionSelected === "substract") {
			service = otc.substractBalanceToDollarBTCPaymentBankers(body);
		} //else if (this.state.transferOptionSelected === "sellBtc") {
		// 	//service = otc.substractBalanceToDollarBTCPayment(body);
		// 	let bodyOtc = {
		// 		id: this.state.rowToChange.id,
		// 		currency: this.state.rowToChange.currency,
		// 		amount: this.state.amountToTransfer,
		// 		additionalInfo: this.state.descriptionOperation,
		// 		masterAccountName: this.state.otcSelected,
		// 		masterAccountAmount: this.state.amountToTransferBtc,
		// 	};

		// 	this.movementToSpecialBalance(bodyOtc, "sellBtc");
		// }
		//  else if (this.state.transferOptionSelected === "buyBtc") {
		// 	let bodyOtc = {
		// 		id: this.state.rowToChange.id,
		// 		currency: this.state.rowToChange.currency,
		// 		amount: this.state.amountToTransfer,
		// 		additionalInfo: this.state.descriptionOperation,
		// 		masterAccountName: this.state.otcSelected,
		// 		masterAccountAmount: this.state.amountToTransferBtc,
		// 	};
		// 	this.movementToSpecialBalance(bodyOtc, "buyBtc");
		// }
		//  else if (this.state.transferOptionSelected === "transferBtc") {
		// 	let bodyOtc = {
		// 		baseId: this.state.rowToChange.id,
		// 		targetId: this.state.accountSelected,
		// 		additionalInfo: this.state.descriptionOperation,
		// 		currency: this.state.rowToChange.currency,
		// 		amount: this.state.amountToTransfer,
		// 	};
		// 	this.movementToSpecialBalance(bodyOtc, "transferBtc");
		// }
		if (
			this.state.transferOptionSelected !== "sellBtc" &&
			this.state.transferOptionSelected !== "buyBtc" &&
			this.state.transferOptionSelected !== "transferBtc"
		) {
			service
				.then((resp) => {
					this.setState({ showMessageSucessBalanceOperation: true });
					setTimeout(() => {
						this.setState({
							showMessageSucessBalanceOperation: false,
							loadTransfer: false,
						});
						this.closeTransferModal();
					}, 3000);
				})
				.catch((error) => {});
		}
	};

	// getMasterAccount() {
	// 	//REVISAR SI ES NECESARIO O SE ELIMINA O SE CAMBIA POR OTRO SERVICIO BANKER
	// 	let username = userService.getUserName();
	// 	otc
	// 		.getMasterAccount(username)
	// 		.then((resp) => {
	// 			var OTCaccountsArray = resp.data;
	// 			var OTCAccountsToSelect = [];
	// 			for (var i = 0; i < OTCaccountsArray.length; i++) {
	// 				var objectToPush = {};
	// 				objectToPush.key = OTCaccountsArray[i].name;
	// 				objectToPush.text = OTCaccountsArray[i].description;
	// 				objectToPush.currencies = OTCaccountsArray[i].currencies;
	// 				objectToPush.value = OTCaccountsArray[i].name;
	// 				OTCAccountsToSelect.push(objectToPush);
	// 			}
	// 			this.setState({
	// 				otcOptions: OTCAccountsToSelect,
	// 			});
	// 		})
	// 		.catch((error) => {});
	// }

	editAcceptInOrOut = () => {
		this.setState({ loadEdit: true });
		var jsonPayment = this.state.jsonToEdit;
		var typesToEdit = this.state.typesToEdit;
		if (this.state.optSource === "out")
			jsonPayment.acceptOut = !jsonPayment.acceptOut;
		else if (this.state.optSource === "in")
			jsonPayment.acceptIn = !jsonPayment.acceptIn;
		jsonPayment.types = typesToEdit;
		var body = {
			userName: userService.getUserName(),
			id: this.state.rowToChange.id,
			currency: this.state.rowToChange.currency,
			payment: jsonPayment,
		};
		otc
			.editDollarBTCPaymentBankers(body)
			.then((res) => {
				this.getPaymentMethods();
				this.closeModalEditOpts();
				this.setState({ loadEdit: false });
			})
			.catch((error) => {
				//console.log(error);
			});
	};
	pickStatusToChange = (e, data) => {
		this.setState({ statusToChange: data.value, changeEditPayment: true });
	};
	pickTransferOption = (e, data) => {
		if (data.value === "buyBtc" || data.value === "sellBtc") {
			this.setState({
				viewMasterAccountOptions: true,
				viewTransferAccountOptions: false,
			});
		} else if (data.value === "transferBtc") {
			this.getOptionsAccount();
			this.setState({
				viewMasterAccountOptions: false,
				viewTransferAccountOptions: true,
			});
		} else {
			this.setState({
				viewMasterAccountOptions: false,
				viewTransferAccountOptions: false,
			});
		}
		this.setState({ transferOptionSelected: data.value });
	};
	pickOtcOption(e, data) {
		this.setState({ otcSelected: data.value });
	}
	pickAccountOption(e, data) {
		this.setState({ accountSelected: data.value });
	}
	pickAcceptOutToChange = (e, data) => {
		this.setState({ acceptOutToChange: data.value, changeEditPayment: true });
	};
	pickAcceptInToChange = (e, data) => {
		this.setState({ acceptInToChange: data.value, changeEditPayment: true });
	};
	loadStatusOptions = () => {
		var statuses = [
			{ key: "TRUE", value: true, text: "ACTIVO" },
			{ key: "FALSE", value: false, text: "INACTIVO" },
		];
		this.setState({ statusesOptions: statuses });
	};
	loadAcceptOutOptions = () => {
		var statuses = [
			{ key: "TRUE", value: true, text: "ACTIVO" },
			{ key: "FALSE", value: false, text: "INACTIVO" },
		];
		this.setState({ acceptOutOptions: statuses });
	};
	loadAcceptInOptions = () => {
		var statuses = [
			{ key: "TRUE", value: true, text: "ACTIVO" },
			{ key: "FALSE", value: false, text: "INACTIVO" },
		];
		this.setState({ acceptInOptions: statuses });
	};
	removePaymentType = (paymentTypeName) => {
		var optionsToAddArray = this.state.paymentTypesByCurrencyOptions;
		var objectToPush = {};
		objectToPush.key = this.state.currencyToAdd + "/" + paymentTypeName;
		objectToPush.value = this.state.currencyToAdd + "/" + paymentTypeName;
		if (paymentTypeName === "TRANSFER_INTERNATIONAL_BANK") {
			objectToPush.text = "Transferencia internacional (Swift o Aba)";
		} else if (paymentTypeName === "CASH_DEPOSIT") {
			objectToPush.text = "Depósito en efectivo";
		} else if (paymentTypeName === "TRANSFER_WITH_SPECIFIC_BANK") {
			objectToPush.text = "Transferencia desde un banco específico";
		} else if (paymentTypeName === "TRANSFER_NATIONAL_BANK") {
			objectToPush.text = "Transferencia desde un tercer banco";
		} else if (paymentTypeName === "TRANSFER_TO_CRYPTO_WALLET") {
			objectToPush.text = "Transferencia desde una crypto wallet";
		} else if (paymentTypeName === "WIRE_TRANSFER") {
			objectToPush.text = "Wire (Transferencia cablegráfica)";
		} else if (paymentTypeName === "CHECK_DEPOSIT") {
			objectToPush.text = "Depósito en cheque";
		} else if (paymentTypeName === "CREDIT_CARD") {
			objectToPush.text = "Tarjeta de crédito";
		} else if (paymentTypeName === "PERSONAL_CHECK_DEPOSIT") {
			objectToPush.text = "Cheque personal";
		} else if (paymentTypeName === "CASHIER_CHECK_DEPOSIT") {
			objectToPush.text = "Cheque de gerencia";
		} else if (paymentTypeName === "MONEY_ORDER") {
			objectToPush.text = "Orden de dinero";
		} else {
			objectToPush.text = paymentTypeName;
		}
		optionsToAddArray.push(objectToPush);
		var removedPaymentTypeArray = _.reject(
			this.state.typesToEdit,
			function (el) {
				return el.name === paymentTypeName;
			},
		);
		this.setState({
			typesToEdit: removedPaymentTypeArray,
			paymentTypesByCurrencyOptions: optionsToAddArray,
			changeEditPayment: true,
		});
	};
	addPaymentType = () => {
		var paymentTypes = this.state.typesToEdit;
		var paymentTypeObjectToAdd = {};
		var paymentToRemove = this.state.paymentTypeToAdd;
		paymentTypeObjectToAdd.name = this.state.paymentTypeToAdd.split("/")[1];
		paymentTypeObjectToAdd.payWindow =
			this.state.paymentWindow + " " + this.state.periodTimeToAdd;
		paymentTypeObjectToAdd.joinMyPayments = this.state.joinMyPaymentsBoolean;
		paymentTypeObjectToAdd.joinFieldValue = this.state.joinFieldValueBoolean;
		paymentTypeObjectToAdd.messages = {};
		if (this.state.messageInstructionsBuy.length > 0) {
			for (let message of this.state.messageInstructionsBuy) {
				Object.defineProperty(paymentTypeObjectToAdd.messages, message.key, {
					value: message.value,
					enumerable: true,
					configurable: true,
					writable: true,
				});
			}
		}
		if (this.state.messageInstructionsSell.length > 0) {
			for (let message of this.state.messageInstructionsSell) {
				Object.defineProperty(paymentTypeObjectToAdd.messages, message.key, {
					value: message.value,
					enumerable: true,
					configurable: true,
					writable: true,
				});
			}
		}
		paymentTypes.push(paymentTypeObjectToAdd);
		var removedPaymentTypeArray = _.reject(
			this.state.paymentTypesByCurrencyOptions,
			function (el) {
				return el.key === paymentToRemove;
			},
		);

		this.setState(
			{
				typesToEdit: paymentTypes,
				paymentTypesByCurrencyOptions: removedPaymentTypeArray,
			},
			() => {
				this.setState({
					paymentTypeModalOpen: false,
					editModal: true,
					changeEditPayment: true,
					paymentWindow: "",
					BUY__ALERT_BLUE: "",
					BUY__ALERT_RED: "",
					BUY__ALERT_GREEN: "",
					SELL__ALERT_GREEN: "",
					SELL__ALERT_BLUE: "",
					SELL__ALERT_RED: "",
					optionEdit: false,
					greenAlertOption: "",
					blueAlertOption: "",
					redAlertOption: "",
					greenBuyAlertOption: "",
					blueBuyAlertOption: "",
					redBuyAlertOption: "",
					textGreenSell: true,
					textBlueSell: true,
					textRedSell: true,
					textGreenBuy: true,
					textBlueBuy: true,
					textRedBuy: true,
					sell_instruction: "",
					buy_instruction: "",
					buy_instruction_mc: "",
				});
			},
		);
	};
	editPaymentType = () => {
		this.setState((state) => {
			const typesToEdit = state.typesToEdit.map((item, index) => {
				if (index === this.state.indexType) {
					item.payWindow =
						this.state.paymentWindow + " " + this.state.periodTimeToAdd;
					item.joinMyPayments = this.state.joinMyPaymentsBoolean;
					item.joinFieldValue = this.state.joinFieldValueBoolean;
					if (this.state.messageInstructionsBuy.length > 0) {
						for (let message of this.state.messageInstructionsBuy) {
							Object.defineProperty(item.messages, message.key, {
								value: message.value,
								enumerable: true,
								configurable: true,
								writable: true,
							});
						}
					}
					if (this.state.messageInstructionsSell.length > 0) {
						for (let message of this.state.messageInstructionsSell) {
							Object.defineProperty(item.messages, message.key, {
								value: message.value,
								enumerable: true,
								configurable: true,
								writable: true,
							});
						}
					}
					return item;
				} else {
					return item;
				}
			});
			return {
				typesToEdit,
			};
		});

		this.setState({
			paymentTypeModalOpen: false,
			editModal: true,
			optionEdit: true,
			paymentTypeToAdd: "",
			paymentWindow: "",
			periodTimeToAdd: "minutes",
			joinMyPaymentsBoolean: false,
			joinFieldValueBoolean: false,
			greenAlertOption: "",
			blueAlertOption: "",
			redAlertOption: "",
			greenBuyAlertOption: "",
			blueBuyAlertOption: "",
			redBuyAlertOption: "",
			textGreenSell: true,
			textBlueSell: true,
			textRedSell: true,
			textGreenBuy: true,
			textBlueBuy: true,
			textRedBuy: true,
			optionMessage: true,
			BUY__ALERT_BLUE: "",
			BUY__ALERT_RED: "",
			BUY__ALERT_GREEN: "",
			SELL__ALERT_GREEN: "",
			SELL__ALERT_BLUE: "",
			SELL__ALERT_RED: "",
			sell_instruction: "",
			buy_instruction: "",
			nameTextAlert: "",
		});
	};
	modalEditPaymentType = (data, row) => {
		this.setState({
			paymentTypeModalOpen: true,
			editModal: false,
			editPaymentType: true,
			optionPaymentType: true,
			optionMessage: false,
			changeEditPayment: true,
			indexType: row,
		});
		this.setOperationsStatusSellAndBuy();

		var paymentTypes = [];
		var array = [],
			arrayEn = [];

		let type = this.state.typesToEdit.find(function (element) {
			return element.name === data;
		});
		//console.log(type);
		if (type.payWindow.split(" ")[1] === "minutes") {
			this.setState({ periodTimeToAdd: "minutes" });
		} else {
			this.setState({ periodTimeToAdd: "hours" });
		}
		for (var c = 0; c < this.state.paymentTypesOptions.length; c++) {
			if (
				this.state.paymentTypesOptions[c].key.split("/")[0] ===
				this.state.rowToChange.currency
			) {
				paymentTypes.push(this.state.paymentTypesOptions[c]);
			}
		}

		let options = paymentTypes.find(function (element) {
			return element.key.split("/")[1] === type.name;
		});
		//console.log(options);

		Object.entries(options.messages).forEach(([key, value]) => {
			let objMessage = {
				name: key,
				val: value,
			};
			if (key.includes("__EN")) {
				arrayEn.push(objMessage);
			} else {
				array.push(objMessage);
			}
		});

		let auxMessagesBuy = [];
		let auxMessagesSell = [];
		Object.keys(type.messages).forEach((key) => {
			let keySplitted = key.split("__");
			if (
				key.includes("BUY") &&
				type.messages[key] !== "" &&
				!key.includes("MC")
			) {
				auxMessagesBuy.push({
					key: key,
					value: type.messages[key],
					text:
						keySplitted.length > 3
							? key.split("__")[3] +
							  " - " +
							  key.split("__")[2] +
							  " - " +
							  this.state.allStatus.find(
									(status) => status.key === key.split("__")[1],
							  ).text
							: (key.split("__")[2] !== undefined
									? key.split("__")[2] + " - "
									: "") + key.split("__")[1],
				});
			} else if (key.includes("SELL") && type.messages[key] !== "") {
				auxMessagesSell.push({
					key: key,
					value: type.messages[key],
					text:
						keySplitted.length > 3
							? key.split("__")[3] +
							  " - " +
							  key.split("__")[2] +
							  " - " +
							  this.state.allStatus.find(
									(status) => status.key === key.split("__")[1],
							  ).text
							: (key.split("__")[2] !== undefined
									? key.split("__")[2] + " - "
									: "") + key.split("__")[1],
				});
			} else if (
				key.includes("BUY") &&
				type.messages[key] !== "" &&
				key.includes("MC")
			) {
				auxMessagesBuy.push({
					key: key,
					value: type.messages[key],
					text:
						keySplitted.length > 3
							? key.split("__")[3] +
							  " - " +
							  key.split("__")[2] +
							  " - " +
							  this.state.allStatus.find(
									(status) => status.key === key.split("__")[1],
							  ).text
							: (key.split("__")[2] !== undefined
									? key.split("__")[2] + " - "
									: "") + key.split("__")[1],
				});
			}
		});
		this.setState({
			paymentTypeToAdd: options.value,
			paymentWindow: type.payWindow.split(" ")[0],
			joinMyPaymentsBoolean: type.joinMyPayments,
			joinFieldValueBoolean: type.joinFieldValue,
			paymentTypesByCurrencyOptions: paymentTypes,
			defaultMessagesAlert: array,
			defaultMessagesAlertEn: arrayEn,
			messageInstructionsSell: auxMessagesSell,
			messageInstructionsBuy: auxMessagesBuy,
		});
	};
	openAddPaymentTypeModal = () => {
		this.setState({
			paymentTypeModalOpen: true,
			editModal: false,
			optionPaymentType: false,
			optionEdit: false,
			greenAlertOption: "",
			blueAlertOption: "",
			redAlertOption: "",
			greenBuyAlertOption: "",
			blueBuyAlertOption: "",
			redBuyAlertOption: "",
			paymentWindow: "",
		});
		this.setOperationsStatusSellAndBuy();
	};
	closeAddPaymentTypeModal = () => {
		this.setState({
			paymentTypeModalOpen: false,
			paymentTypeToAdd: "",
			paymentWindow: "",
			joinMyPaymentsBoolean: false,
			joinFieldValueBoolean: false,
			periodTimeToAdd: "minutes",
			editModal: true,
			textGreenSell: true,
			textBlueSell: true,
			textRedSell: true,
			textGreenBuy: true,
			textBlueBuy: true,
			textRedBuy: true,
			optionMessage: true,
			messageError: false,
			nameText: "",
			greenAlertOption: "",
			blueAlertOption: "",
			redAlertOption: "",
			greenBuyAlertOption: "",
			blueBuyAlertOption: "",
			redBuyAlertOption: "",
			BUY__ALERT_BLUE: "",
			BUY__ALERT_RED: "",
			BUY__ALERT_GREEN: "",
			SELL__ALERT_GREEN: "",
			SELL__ALERT_BLUE: "",
			SELL__ALERT_RED: "",
			paymentType: false,
			editPaymentType: false,
			changeEditPayment: false,
			changeToEdit: true,
			optionEdit: false,
			operationStatusMessageBuy: "",
			operationStatusMessage: "",
			operationStatusMessageMcBuy: "",
			languageMessage: "",
			languageMessageBuy: "",
			languageMessageMcBuy: "",
			messageInstructionsSell: [],
			messageInstructionsBuy: [],
			optionsLanguageSell: [],
			optionsLanguageBuy: [],
			operationStatusMessageMcBuy: [],
			typeMessageSelectedMcBuy: "",
			typeMessageSelectedSell: "",
			typeMessageSelectedBuy: "",
			optionsTypeMessagesBuy: [],
			optionsTypeMessagesSell: [],
			isAlertMessage: false,
			isAlertMessageMcBuy: false,
			isInstructionsMessage: false,
			typeAlertSelected: "",
			useInstructionsDefaultBuy: false,
			useInstructionsDefaultMcBuy: false,
			useInstructionsDefaultSell: false,
			defaultInstructions: {
				buy: {},
				sell: {},
			},
			existsDefaultInstructionsBuy: "",
			existsDefaultInstructionsSell: "",
		});
	};

	loadCurrencies = () => {
		let currencyService =
			window.sessionStorage.getItem("userType") === "BANKER"
				? otc.getCurrenciesBankers(userService.getUserName())
				: otc.getAdminCurrencies(userService.getUserName());

		currencyService
			.then((resp) => {
				var currencies = resp.data;
				var selectCurrencies = [];
				var fieldsByCurrencies = [];
				var paymentTypesArray = [];
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
					selectCurrencies.push(currencyToAddSelect);
					var objectFieldsByCurrenciesToPush = {};
					var clientPaymentTypesArray = [];
					objectFieldsByCurrenciesToPush.currency = currencies[i].shortName;
					for (var j = 0; j < currencies[i].clientPaymentTypes.length; j++) {
						var objectPaymentTypeToPush = {};
						objectPaymentTypeToPush.messages =
							currencies[i].clientPaymentTypes[j].messages;
						objectPaymentTypeToPush.key =
							currencies[i].shortName +
							"/" +
							currencies[i].clientPaymentTypes[j].name;
						objectPaymentTypeToPush.value =
							currencies[i].shortName +
							"/" +
							currencies[i].clientPaymentTypes[j].name;
						objectPaymentTypeToPush.text =
							currencies[i].clientPaymentTypes[j].name;
						if (
							currencies[i].clientPaymentTypes[j].name ===
							"TRANSFER_INTERNATIONAL_BANK"
						) {
							objectPaymentTypeToPush.text =
								"Transferencia internacional (Swift o Aba)";
						} else if (
							currencies[i].clientPaymentTypes[j].name === "CASH_DEPOSIT"
						) {
							objectPaymentTypeToPush.text = "Depósito en efectivo";
						} else if (
							currencies[i].clientPaymentTypes[j].name ===
							"TRANSFER_WITH_SPECIFIC_BANK"
						) {
							objectPaymentTypeToPush.text =
								"Transferencia desde un banco específico";
						} else if (
							currencies[i].clientPaymentTypes[j].name ===
							"TRANSFER_NATIONAL_BANK"
						) {
							objectPaymentTypeToPush.text =
								"Transferencia desde un tercer banco";
						} else if (
							currencies[i].clientPaymentTypes[j].name ===
							"TRANSFER_TO_CRYPTO_WALLET"
						) {
							objectPaymentTypeToPush.text =
								"Transferencia desde una crypto wallet";
						} else if (
							currencies[i].clientPaymentTypes[j].name === "WIRE_TRANSFER"
						) {
							objectPaymentTypeToPush.text =
								"Wire (Transferencia cablegráfica)";
						} else if (
							currencies[i].clientPaymentTypes[j].name === "CHECK_DEPOSIT"
						) {
							objectPaymentTypeToPush.text = "Depósito en cheque";
						} else if (
							currencies[i].clientPaymentTypes[j].name === "CREDIT_CARD"
						) {
							objectPaymentTypeToPush.text = "Tarjeta de crédito";
						} else if (
							currencies[i].clientPaymentTypes[j].name ===
							"PERSONAL_CHECK_DEPOSIT"
						) {
							objectPaymentTypeToPush.text = "Cheque personal";
						} else if (
							currencies[i].clientPaymentTypes[j].name ===
							"CASHIER_CHECK_DEPOSIT"
						) {
							objectPaymentTypeToPush.text = "Cheque de gerencia";
						} else if (
							currencies[i].clientPaymentTypes[j].name === "MONEY_ORDER"
						) {
							objectPaymentTypeToPush.text = "Orden de dinero";
						} else {
							objectPaymentTypeToPush.text =
								currencies[i].clientPaymentTypes[j].name;
						}
						paymentTypesArray.push(objectPaymentTypeToPush);
						for (
							var k = 0;
							k < currencies[i].clientPaymentTypes[j].fields.length;
							k++
						) {
							if (
								!JSON.stringify(clientPaymentTypesArray).includes(
									currencies[i].clientPaymentTypes[j].fields[k].name,
								)
							) {
								clientPaymentTypesArray.push(
									currencies[i].clientPaymentTypes[j].fields[k],
								);
							} else {
								if (
									currencies[i].clientPaymentTypes[j].fields[k].values !==
									undefined
								) {
									for (var y = 0; y < clientPaymentTypesArray.length; y++) {
										if (
											clientPaymentTypesArray[y].name ===
											currencies[i].clientPaymentTypes[j].fields[k].name
										) {
											clientPaymentTypesArray[y].values = _.union(
												clientPaymentTypesArray[y].values,
												currencies[i].clientPaymentTypes[j].fields[k].values,
											);
										}
									}
								}
							}
						}
					}
					var fieldsArrayUniq = _.uniq(clientPaymentTypesArray, "name");
					objectFieldsByCurrenciesToPush.clientPaymentTypes = fieldsArrayUniq;
					fieldsByCurrencies.push(objectFieldsByCurrenciesToPush);
				}

				this.setState({
					currenciesToAddOptions: selectCurrencies,
					allFieldsArray: fieldsByCurrencies,
					paymentTypesOptions: paymentTypesArray,
					paymentTypesOptionsSend: paymentTypesArray,
					paymentTypesOptionsBuy: paymentTypesArray,
				});
			})
			.catch((error) => {
				//console.log(error);
			});
	};
	pickMessagesAlert = (e, data) => {
		if (data.name === "alert_sell_green") {
			this.setState({ greenAlertOption: data.value, optionEdit: false });
			if (data.value === "default") {
				this.setState({ textGreenSell: true });
				let messageGreen = this.state.defaultMessagesAlert.find(function (
					element,
				) {
					return element.name === "SELL__ALERT_GREEN";
				});

				if (messageGreen !== undefined) {
					this.setState(
						{
							SELL__ALERT_GREEN: messageGreen.val,
						},
						() => {
							this.setState({ sell_instruction: this.state.SELL__ALERT_GREEN });
						},
					);
				} else {
					this.setState({
						messageError: true,
						nameText: "alert_sell_green",
						SELL__ALERT_GREEN: "",
					});
				}
			} else {
				this.setState({
					textGreenSell: false,
					SELL__ALERT_GREEN: "",
					nameText: "",
				});
			}
		} else if (data.name === "alert_sell_blue") {
			this.setState({ blueAlertOption: data.value, optionEdit: false });
			if (data.value === "default") {
				this.setState({ textBlueSell: true });
				let messageBlue = this.state.defaultMessagesAlert.find(function (
					element,
				) {
					return element.name === "SELL__ALERT_BLUE";
				});
				if (messageBlue !== undefined) {
					this.setState(
						{
							SELL__ALERT_BLUE: messageBlue.val,
						},
						() => {
							this.setState({ sell_instruction: this.state.SELL__ALERT_BLUE });
						},
					);
				} else {
					this.setState({
						messageError: true,
						nameText: "alert_sell_blue",
						SELL__ALERT_BLUE: "",
					});
				}
			} else {
				this.setState({
					textBlueSell: false,
					SELL__ALERT_BLUE: "",
					nameText: "",
				});
			}
		} else if (data.name === "alert_sell_red") {
			this.setState({ redAlertOption: data.value, optionEdit: false });
			if (data.value === "default") {
				this.setState({ textRedSell: true });
				let messageRed = this.state.defaultMessagesAlert.find(function (
					element,
				) {
					return element.name === "SELL__ALERT_RED";
				});
				//console.log(messageRed);
				if (messageRed !== undefined) {
					this.setState(
						{
							SELL__ALERT_RED: messageRed.val,
						},
						() => {
							this.setState({ sell_instruction: this.state.SELL__ALERT_RED });
						},
					);
				} else {
					this.setState({
						messageError: true,
						nameText: "alert_sell_red",
						SELL__ALERT_RED: "",
					});
				}
			} else {
				this.setState({
					textRedSell: false,
					SELL__ALERT_RED: "",
					nameText: "",
				});
			}
		} else if (data.name === "alert_buy_green") {
			this.setState({ greenBuyAlertOption: data.value, optionEdit: false });
			if (data.value === "default") {
				this.setState({ textGreenBuy: true });
				let message = this.state.defaultMessagesAlert.find(function (element) {
					return element.name === "BUY__ALERT_GREEN";
				});
				if (message !== undefined) {
					this.setState(
						{
							BUY__ALERT_GREEN: message.val,
						},
						() => {
							this.setState({ buy_instruction: this.state.BUY__ALERT_GREEN });
						},
					);
				} else {
					this.setState({
						messageError: true,
						nameText: "alert_buy_green",
						BUY__ALERT_GREEN: "",
					});
				}
			} else {
				this.setState({
					textGreenBuy: false,
					BUY__ALERT_GREEN: "",
					nameText: "",
				});
			}
		} else if (data.name === "alert_buy_blue") {
			this.setState({ blueBuyAlertOption: data.value, optionEdit: false });
			if (data.value === "default") {
				this.setState({ textBlueBuy: true });
				let message = this.state.defaultMessagesAlert.find(function (element) {
					return element.name === "BUY__ALERT_BLUE";
				});
				if (message !== undefined) {
					this.setState(
						{
							BUY__ALERT_BLUE: message.val,
						},
						() => {
							this.setState({ buy_instruction: this.state.BUY__ALERT_BLUE });
						},
					);
				} else {
					this.setState({
						messageError: true,
						nameText: "alert_buy_blue",
						BUY__ALERT_BLUE: "",
					});
				}
			} else {
				this.setState({
					textBlueBuy: false,
					BUY__ALERT_BLUE: "",
					nameText: "",
				});
			}
		} else if (data.name === "alert_buy_red") {
			this.setState({ redBuyAlertOption: data.value, optionEdit: false });
			if (data.value === "default") {
				this.setState({ textRedBuy: true });
				let message = this.state.defaultMessagesAlert.find(function (element) {
					return element.name === "BUY__ALERT_RED";
				});
				if (message !== undefined) {
					this.setState(
						{
							BUY__ALERT_RED: message.val,
						},
						() => {
							this.setState({ buy_instruction: this.state.BUY__ALERT_RED });
						},
					);
				} else {
					this.setState({
						messageError: true,
						nameText: "alert_buy_red",
						BUY__ALERT_RED: "",
					});
				}
			} else {
				this.setState({ textRedBuy: false, BUY__ALERT_RED: "", nameText: "" });
			}
		}
	};
	pickMessagesAlertMc = (e, data) => {
		if (data.name === "alert_buy_green_mc") {
			this.setState({ greenBuyAlertOption: data.value, optionEdit: false });
			if (data.value === "default") {
				this.setState({ textGreenBuy: true });
				let message = this.state.defaultMessagesAlert.find(function (element) {
					return element.name === "BUY__ALERT_GREEN";
				});
				if (message !== undefined) {
					this.setState(
						{
							BUY__ALERT_GREEN: message.val,
						},
						() => {
							this.setState({
								buy_instruction_mc: this.state.BUY__ALERT_GREEN,
							});
						},
					);
				} else {
					this.setState({
						messageError: true,
						nameText: "alert_buy_green",
						BUY__ALERT_GREEN: "",
					});
				}
			} else {
				this.setState({
					textGreenBuy: false,
					BUY__ALERT_GREEN: "",
					nameText: "",
				});
			}
		} else if (data.name === "alert_buy_blue_mc") {
			this.setState({ blueBuyAlertOption: data.value, optionEdit: false });
			if (data.value === "default") {
				this.setState({ textBlueBuy: true });
				let message = this.state.defaultMessagesAlert.find(function (element) {
					return element.name === "BUY__ALERT_BLUE";
				});
				if (message !== undefined) {
					this.setState(
						{
							BUY__ALERT_BLUE: message.val,
						},
						() => {
							this.setState({ buy_instruction_mc: this.state.BUY__ALERT_BLUE });
						},
					);
				} else {
					this.setState({
						messageError: true,
						nameText: "alert_buy_blue",
						BUY__ALERT_BLUE: "",
					});
				}
			} else {
				this.setState({
					textBlueBuy: false,
					BUY__ALERT_BLUE: "",
					nameText: "",
				});
			}
		} else if (data.name === "alert_buy_red_mc") {
			this.setState({ redBuyAlertOption: data.value, optionEdit: false });
			if (data.value === "default") {
				this.setState({ textRedBuy: true });
				let message = this.state.defaultMessagesAlert.find(function (element) {
					return element.name === "BUY__ALERT_RED";
				});
				if (message !== undefined) {
					this.setState(
						{
							BUY__ALERT_RED: message.val,
						},
						() => {
							this.setState({ buy_instruction_mc: this.state.BUY__ALERT_RED });
						},
					);
				} else {
					this.setState({
						messageError: true,
						nameText: "alert_buy_red",
						BUY__ALERT_RED: "",
					});
				}
			} else {
				this.setState({ textRedBuy: false, BUY__ALERT_RED: "", nameText: "" });
			}
		}
	};
	pickpaymentTypeToAdd = (e, data) => {
		let array = [];
		this.setState({
			paymentTypeToAdd: data.value,
			defaultMessagesAlert: [],
			optionMessage: false,
			messageError: false,
			nameText: "",
		});
		//console.log(this.state.paymentTypesByCurrencyOptions);
		let paymentType = this.state.paymentTypesByCurrencyOptions.find(function (
			element,
		) {
			return element.key === data.value;
		});
		//console.log(paymentType);
		Object.entries(paymentType.messages).forEach(([key, value]) => {
			let objMessage = {
				name: key,
				val: value,
			};

			array.push(objMessage);
		});
		//console.log(array);
		this.setState({ defaultMessagesAlert: array });
	};

	handlePaymentWindow = (e) => {
		this.setState({ optionEdit: false });
		//console.log(e.target.value);
		this.setState({
			paymentWindow: e.target.value,
		});
	};

	handleGreenAlert = (e) => {
		this.setState(
			{
				SELL__ALERT_GREEN: e.target.value,
				optionEdit: false,
			},
			() => {
				this.setState({ sell_instruction: this.state.SELL__ALERT_GREEN });
			},
		);
	};
	handleBlueAlert = (e) => {
		this.setState(
			{
				SELL__ALERT_BLUE: e.target.value,
				optionEdit: false,
			},
			() => {
				this.setState({ sell_instruction: this.state.SELL__ALERT_BLUE });
			},
		);
	};
	handleRedAlert = (e) => {
		this.setState(
			{
				SELL__ALERT_RED: e.target.value,
				optionEdit: false,
			},
			() => {
				this.setState({ sell_instruction: this.state.SELL__ALERT_RED });
			},
		);
	};
	handleBuyGreenAlert = (e) => {
		this.setState(
			{
				BUY__ALERT_GREEN: e.target.value,
				optionEdit: false,
			},
			() => {
				this.setState({ buy_instruction: this.state.BUY__ALERT_GREEN });
			},
		);
	};
	handleBuyBlueAlert = (e) => {
		this.setState(
			{
				BUY__ALERT_BLUE: e.target.value,
				optionEdit: false,
			},
			() => {
				this.setState({ buy_instruction: this.state.BUY__ALERT_BLUE });
			},
		);
	};
	handleBuyRedAlert = (e) => {
		this.setState(
			{
				BUY__ALERT_RED: e.target.value,
				optionEdit: false,
			},
			() => {
				this.setState({ buy_instruction: this.state.BUY__ALERT_RED });
			},
		);
	};
	toggleJoinMyPayments = (e, data) => {
		this.setState({ joinMyPaymentsBoolean: data.checked, optionEdit: false });
	};
	toggleJoinFieldValue = (e, data) => {
		this.setState({ joinFieldValueBoolean: data.checked, optionEdit: false });
	};
	handleDescription(e, data) {
		this.setState({ descriptionOperation: data.value });
	}
	pickOTCOperationStatusToSearch(e, data) {
		//console.log(data.value);
		let existsDefaultInstructionsSell = this.state.defaultInstructions.sell[
			data.value
		][this.state.languageMessage];
		this.setState({
			operationStatusMessage: data.value,
			existsDefaultInstructionsSell,
		});
	}
	pickOTCOperationStatusBuy = (e, data) => {
		let existsDefaultInstructionsBuy = this.state.defaultInstructions.buy[
			data.value
		][this.state.languageMessageBuy];
		this.setState({
			operationStatusMessageBuy: data.value,
			existsDefaultInstructionsBuy,
		});
	};
	pickLanguageMessage(e, data) {
		this.setState(
			{
				languageMessage: data.value,
				operationStatusMessage: "",
				existsDefaultInstructionsSell: "",
			},
			() => {
				let existingStatusByLang = this.state.messageInstructionsSell
					.filter((msg) => {
						return msg.key.includes(this.state.languageMessage);
					})
					.map((m) => {
						return m.key.split("__")[1];
					});
			},
		);
	}
	pickLanguageMessageBuy(e, data) {
		this.setState(
			{
				languageMessageBuy: data.value,
				operationStatusMessageBuy: "",
				existsDefaultInstructionsBuy: "",
			},
			() => {
				let existingStatusByLang = this.state.messageInstructionsBuy
					.filter((msg) => {
						return msg.key.includes(this.state.languageMessageBuy);
					})
					.map((m) => {
						return m.key.split("__")[1];
					});
			},
		);
	}
	pickLanguageMessageMcBuy(e, data) {
		this.setState(
			{
				languageMessageMcBuy: data.value,
				operationStatusMessageMcBuy: "",
				existsDefaultInstructionsBuy: "",
			},
			() => {
				let existingStatusByLang = this.state.messageInstructionsMcBuy
					.filter((msg) => {
						return msg.key.includes(this.state.languageMessageMcBuy);
					})
					.map((m) => {
						return m.key.split("__")[1];
					});
			},
		);
	}
	addMessageInstructionsBuy() {
		let status = this.state.operationStatusMessageBuy;
		let statusFind = this.state.allStatus.find(function (element) {
			return element.value === status;
		});
		let message,
			auxMessages = [];
		if (this.state.typeMessageSelectedBuy === "ALERT") {
			let typeAlert;
			if (this.state.BUY__ALERT_GREEN !== "") {
				typeAlert = "ALERT_GREEN";
				message = {
					key: "BUY__" + typeAlert + "__" + this.state.languageMessageBuy,
					value: this.state.BUY__ALERT_GREEN,
					text: this.state.languageMessageBuy + " - " + typeAlert,
				};
				auxMessages.push(message);
			}
			if (this.state.BUY__ALERT_BLUE !== "") {
				typeAlert = "ALERT_BLUE";
				message = {
					key: "BUY__" + typeAlert + "__" + this.state.languageMessageBuy,
					value: this.state.BUY__ALERT_BLUE,
					text: this.state.languageMessageBuy + " - " + typeAlert,
				};
				auxMessages.push(message);
			}
			if (this.state.BUY__ALERT_RED !== "") {
				typeAlert = "ALERT_RED";
				message = {
					key: "BUY__" + typeAlert + "__" + this.state.languageMessageBuy,
					value: this.state.BUY__ALERT_RED,
					text: this.state.languageMessageBuy + " - " + typeAlert,
				};
				auxMessages.push(message);
			}
		} else if (this.state.typeMessageSelectedMcBuy === "ALERT_MC") {
			let typeAlert;
			if (this.state.BUY__ALERT_GREEN !== "") {
				typeAlert = "ALERT_GREEN";
				message = {
					key:
						"MC_BUY_BALANCE__" +
						typeAlert +
						"__" +
						this.state.languageMessageMcBuy,
					value: this.state.BUY__ALERT_GREEN,
					text: this.state.languageMessageMcBuy + " MC" + " - " + typeAlert,
				};
				auxMessages.push(message);
			}
			if (this.state.BUY__ALERT_BLUE !== "") {
				typeAlert = "ALERT_BLUE";
				message = {
					key:
						"MC_BUY_BALANCE__" +
						typeAlert +
						"__" +
						this.state.languageMessageMcBuy,
					value: this.state.BUY__ALERT_BLUE,
					text: this.state.languageMessageMcBuy + " MC" + " - " + typeAlert,
				};
				auxMessages.push(message);
			}
			if (this.state.BUY__ALERT_RED !== "") {
				typeAlert = "ALERT_RED";
				message = {
					key:
						"MC_BUY_BALANCE__" +
						typeAlert +
						"__" +
						this.state.languageMessageMcBuy,
					value: this.state.BUY__ALERT_RED,
					text: this.state.languageMessageMcBuy + " MC" + " - " + typeAlert,
				};
				auxMessages.push(message);
			}
		} else if (this.state.typeMessageSelectedMcBuy === "INSTRUCTIONS_MC") {
			let statusSelected = this.state.operationStatusMessageMcBuy;
			let statusFindMC = this.state.allStatus.find(function (element) {
				return element.value === statusSelected;
			});
			message = {
				key:
					"MC_BUY_BALANCE__" +
					this.state.operationStatusMessageMcBuy +
					"__INSTRUCTIONS__" +
					this.state.languageMessageMcBuy,
				value: this.state.buy_instruction_mc,
				text: this.state.languageMessageMcBuy + " - " + statusFindMC.text,
			};
			auxMessages.push(message);
		} else {
			message = {
				key:
					"BUY__" +
					this.state.operationStatusMessageBuy +
					"__INSTRUCTIONS__" +
					this.state.languageMessageBuy,
				value: this.state.buy_instruction,
				text: this.state.languageMessageBuy + " - " + statusFind.text,
			};
			auxMessages.push(message);
		}
		let auxNewKeys = auxMessages.map((item) => item.key);
		let auxMessageInstructionBuy = this.state.messageInstructionsBuy.filter(
			(msg) => auxNewKeys.indexOf(msg.key) < 0,
		);
		this.setState(
			{
				messageInstructionsBuy: [...auxMessageInstructionBuy, ...auxMessages],
			},
			() => {
				let filterArray = this.state.messageInstructionsBuy.filter(
					(element) => {
						return element.key.includes("EN") || element.key.includes("ES");
					},
				);
				if (filterArray.length === 2) {
					let newStatusAvailable = this.state.statusOptionsBuy.filter(
						(element) => {
							return element.value !== status;
						},
					);
					this.setState({ statusOptionsBuy: newStatusAvailable });
				}
			},
		);
		this.setState({
			operationStatusMessageBuy: "",
			languageMessageBuy: "",
			languageMessageMcBuy: "",
			operationStatusMessageMcBuy: "",
			buy_instruction: "",
			existsDefaultInstructionsBuy: "",
			useInstructionsDefaultBuy: false,
			useInstructionsDefaultMcBuy: false,
			BUY__ALERT_GREEN: "",
			BUY__ALERT_BLUE: "",
			BUY__ALERT_RED: "",
			redBuyAlertOption: "",
			blueBuyAlertOption: "",
			greenBuyAlertOption: "",
			buy_instruction_mc: "",
		});
	}
	addMessageInstructionsSell() {
		let status = this.state.operationStatusMessage;
		let statusFind = this.state.allStatus.find(function (element) {
			return element.value === status;
		});

		let message,
			auxMessages = [];
		if (this.state.typeMessageSelectedSell === "ALERT") {
			let typeAlert;
			if (this.state.SELL__ALERT_GREEN !== "") {
				typeAlert = "ALERT_GREEN";
				message = {
					key: "SELL__" + typeAlert + "__" + this.state.languageMessage,
					value: this.state.SELL__ALERT_GREEN,
					text: this.state.languageMessage + " - " + typeAlert,
				};
				auxMessages.push(message);
			}
			if (this.state.SELL__ALERT_BLUE !== "") {
				typeAlert = "ALERT_BLUE";
				message = {
					key: "SELL__" + typeAlert + "__" + this.state.languageMessage,
					value: this.state.SELL__ALERT_BLUE,
					text: this.state.languageMessage + " - " + typeAlert,
				};
				auxMessages.push(message);
			}
			if (this.state.SELL__ALERT_RED !== "") {
				typeAlert = "ALERT_RED";
				message = {
					key: "SELL__" + typeAlert + "__" + this.state.languageMessage,
					value: this.state.SELL__ALERT_RED,
					text: this.state.languageMessage + " - " + typeAlert,
				};
				auxMessages.push(message);
			}
		} else {
			message = {
				key:
					"SELL__" +
					this.state.operationStatusMessage +
					"__INSTRUCTIONS__" +
					this.state.languageMessage,
				value: this.state.sell_instruction,
				text: this.state.languageMessage + " - " + statusFind.text,
			};
			auxMessages.push(message);
		}
		let auxNewKeys = auxMessages.map((item) => item.key);
		let auxMessageInstructionSell = this.state.messageInstructionsSell.filter(
			(msg) => auxNewKeys.indexOf(msg.key) < 0,
		);
		this.setState(
			{
				messageInstructionsSell: [...auxMessageInstructionSell, ...auxMessages],
			},
			() => {
				let filterArray = this.state.messageInstructionsSell.filter(
					(element) => {
						return (
							(element.key.includes("EN") || element.key.includes("ES")) &&
							element.key.includes(status)
						);
					},
				);
				if (filterArray.length === 2) {
					let newStatusAvailable = this.state.statusOptionsSell.filter(
						(element) => {
							return element.value !== status;
						},
					);
					this.setState({ statusOptionsSell: newStatusAvailable });
				}
			},
		);
		this.setState({
			operationStatusMessage: "",
			languageMessage: "",
			sell_instruction: "",
			existsDefaultInstructionsSell: "",
			useInstructionsDefaultSell: false,
			SELL__ALERT_GREEN: "",
			SELL__ALERT_BLUE: "",
			SELL__ALERT_RED: "",
			redAlertOption: "",
			blueAlertOption: "",
			greenAlertOption: "",
			languageMessageMcBuy: "",
			operationStatusMessageMcBuy: "",
		});
	}
	removeMessageBuy(key) {
		let newMessageBuy = this.state.messageInstructionsBuy.filter(function (
			element,
		) {
			return element.key !== key;
		});
		let typesToEdit = this.state.typesToEdit;
		delete typesToEdit[this.state.indexType].messages[key];
		this.setState({
			messageInstructionsBuy: newMessageBuy,
			typesToEdit,
		});
		let keySplit = key.split("__")[1];
		let findTypeToincludeArray = this.state.allStatus.find(function (ele) {
			return ele.value === keySplit;
		});
		if (findTypeToincludeArray !== undefined) {
			this.setState({
				statusOptionsBuy: [
					...this.state.statusOptionsBuy,
					findTypeToincludeArray,
				],
			});
		}
	}
	removeMessageSell(key) {
		let newMessageSell = this.state.messageInstructionsSell.filter(function (
			element,
		) {
			return element.key !== key;
		});
		let typesToEdit = this.state.typesToEdit;
		delete typesToEdit[this.state.indexType].messages[key];
		this.setState({
			messageInstructionsSell: newMessageSell,
			typesToEdit,
		});
		let keySplit = key.split("__")[1];
		let findTypeToincludeArray = this.state.allStatus.find(function (ele) {
			return ele.value === keySplit;
		});
		if (findTypeToincludeArray !== undefined) {
			this.setState({
				statusOptionsSell: [
					...this.state.statusOptionsSell,
					findTypeToincludeArray,
				],
			});
		}
	}
	setOperationsStatusSellAndBuy() {
		var operationsStatuses = [
			{
				key: "WAITING_FOR_PAYMENT",
				value: "WAITING_FOR_PAYMENT",
				text: "ESPERANDO POR PAGO",
			},
			{
				key: "CANCELED",
				value: "CANCELED",
				text: "CANCELADA",
			},
			{
				key: "SUCCESS",
				value: "SUCCESS",
				text: "EXITOSA",
			},
			{
				key: "CLAIM",
				value: "CLAIM",
				text: "RECLAMO",
			},
			// {
			//   key: "WAITING_FOR_PAYMENT_METHOD_VERIFICATION",
			//   icon: "payment",
			//   value: "WAITING_FOR_PAYMENT_METHOD_VERIFICATION",
			//   text: "ESPERANDO VERIFICACIÓN DE PAGO"
			// },
			{
				key: "PAY_VERIFICATION",
				value: "PAY_VERIFICATION",
				text: "VERIFICANDO PAGO",
			},
			{
				key: "WAITING_TO_START_OPERATION",
				value: "WAITING_TO_START_OPERATION",
				text: "ESPERANDO PARA INICIAR OPERACIÓN",
			},
		];
		let typeMessage = [
			{
				key: "ALERT",
				value: "ALERT",
				text: "Alerta",
			},
			{
				key: "INSTRUCTIONS",
				value: "INSTRUCTIONS",
				text: "Instrucciones",
			},
		];
		let typeMessageBuy = [
			{
				key: "ALERT_MC",
				value: "ALERT_MC",
				text: "Alerta",
			},
			{
				key: "INSTRUCTIONS_MC",
				value: "INSTRUCTIONS_MC",
				text: "Instrucciones",
			},
		];
		let instructionByStatus = paymentInstructionsDefault;
		this.setState({
			statusOptionsSell: operationsStatuses,
			statusOptionsBuy: operationsStatuses,
			allStatus: operationsStatuses,
			optionsTypeMessagesBuy: typeMessage,
			optionsTypeMessagesSell: typeMessage,
			optionsTypeMessagesMcBuy: typeMessageBuy,
			defaultInstructions: instructionByStatus,
		});
	}
	onChangeTypeMessageSell(e, data) {
		this.setState({ optionsLenguageSell: [] });
		let isAlert = false,
			isInstructions = false;
		if (data.value === "ALERT") {
			isAlert = true;
		} else isInstructions = true;
		var optionsLenguage = [
			{ key: "EN", text: "Inglés", value: "EN" },
			{ key: "ES", text: "Español", value: "ES" },
		];
		this.setState({ optionsLenguageSell: optionsLenguage });
		this.setState({
			typeMessageSelectedSell: data.value,
			isAlertMessageSell: isAlert,
			isInstructionsMessageSell: isInstructions,
		});
	}
	onChangeTypeMessageBuy(e, data) {
		this.setState({ optionsLenguageBuy: [] });
		let isAlert = false,
			isInstructions = false;
		if (data.value === "ALERT") {
			isAlert = true;
		} else isInstructions = true;
		var optionsLenguage = [
			{ key: "EN", text: "Inglés", value: "EN" },
			{ key: "ES", text: "Español", value: "ES" },
		];
		this.setState({ optionsLenguageBuy: optionsLenguage });
		this.setState({
			typeMessageSelectedBuy: data.value,
			isAlertMessageBuy: isAlert,
			isInstructionsMessageBuy: isInstructions,
		});
	}
	pickOTCOperationStatusMcBuy = (e, data) => {
		this.setState(
			{
				operationStatusMessageMcBuy: data.value,
				existsDefaultInstructionsBuy: this.state.defaultInstructions.buy[
					data.value
				][this.state.languageMessageMcBuy],
			},
			() => console.log(this.state.existsDefaultInstructionsBuy),
		);
	};
	onChangeTypeMessageMcBuy(e, data) {
		this.setState({ optionsLenguageMcBuy: [] });
		var optionsLenguage = [
			{ key: "EN", text: "Inglés", value: "EN" },
			{ key: "ES", text: "Español", value: "ES" },
		];
		this.setState({ optionsLenguageMcBuy: optionsLenguage });

		this.setState({
			typeMessageSelectedMcBuy: data.value,
			isAlertMcMessageBuy: data.value === "ALERT_MC",
			isInstructionsMessageMcBuy: data.value !== "ALERT_MC",
		});
	}
	onChangeInstructionsDefaultBuy(e, data) {
		let msg = data.checked ? this.state.existsDefaultInstructionsBuy : "";
		this.setState({
			useInstructionsDefaultBuy: data.checked,
			buy_instruction: msg,
		});
	}
	onChangeInstructionsDefaultMcBuy(e, data) {
		let msg = data.checked ? this.state.existsDefaultInstructionsBuy : "";
		this.setState({
			useInstructionsDefaultBuy: data.checked,
			buy_instruction_mc: msg,
		});
	}
	onChangeInstructionsDefaultSell(e, data) {
		let msg = data.checked ? this.state.existsDefaultInstructionsSell : "";
		this.setState({
			useInstructionsDefaultSell: data.checked,
			sell_instruction: msg,
		});
	}
	render() {
		//	console.log("typesToEdit:", this.state.typesToEdit);
		let t = this.state.translator;
		let messageSucessBalanceOperation;
		if (this.state.showMessageSucessBalanceOperation) {
			messageSucessBalanceOperation = (
				<Message positive>
					<Message.Header>{t("fastChange.send.success")}</Message.Header>
					<p>{t("fastChange.modifybalance")}</p>
				</Message>
			);
		}
		//let type =  t("profile.optionDevices.tableHeader.type")

		const paymentTypesTableHeaders = [
			{
				Header: t("profile.optionDevices.tableHeader.type"),
				accessor: "name",
				Cell: (row) => {
					if (row.value === "TRANSFER_INTERNATIONAL_BANK") {
						return "Transferencia internacional (Swift o Aba)";
					} else if (row.value === "CASH_DEPOSIT") {
						return "Depósito en efectivo";
					} else if (row.value === "TRANSFER_WITH_SPECIFIC_BANK") {
						return "Transferencia desde un banco específico";
					} else if (row.value === "TRANSFER_NATIONAL_BANK") {
						return "Transferencia desde un tercer banco";
					} else if (row.value === "TRANSFER_TO_CRYPTO_WALLET") {
						return "Transferencia desde una crypto wallet";
					} else if (row.value === "WIRE_TRANSFER") {
						return "Wire (Transferencia cablegráfica)";
					} else if (row.value === "CHECK_DEPOSIT") {
						return "Depósito en cheque";
					} else if (row.value === "CREDIT_CARD") {
						return "Tarjeta de crédito";
					} else if (row.value === "PERSONAL_CHECK_DEPOSIT") {
						return "Cheque personal";
					} else if (row.value === "CASHIER_CHECK_DEPOSIT") {
						return "Cheque de gerencia";
					} else if (row.value === "MONEY_ORDER") {
						return "Orden de dinero";
					} else {
						return row.value;
					}
				},
			},
			{
				Header: t("profile.optionDevices.tableHeader.windowpayment"),
				accessor: "payWindow",
				width: 136,
				Cell: (row) => {
					return row.value
						.replace("minutes", "minutos")
						.replace("hours", "horas");
				},
			},

			{
				Header: t("profile.optionDevices.tableHeader.paymentMethodRequired"),
				accessor: "joinMyPayments",
				Cell: (row) => {
					if (row.value) {
						return <Icon color='green' name='check' />;
					} else {
						return <Icon color='red' name='cancel' />;
					}
				},
			},
			{
				Header: t("profile.optionDevices.tableHeader.joinFields"),
				accessor: "joinFieldValue",
				Cell: (row) => {
					if (row.value) {
						return <Icon color='green' name='check' />;
					} else {
						return <Icon color='red' name='cancel' />;
					}
				},
			},
			{
				Header: t("profile.optionDevices.tableHeader.messages"),
				accessor: "messages",
				width: 200,
				getProps: (state, rowInfo, column) => {
					return {
						style: {
							maxHeight: 120,
							overflowY: "auto",
						},
					};
				},
				Cell: (row) => {
					//	console.log(row);
					let output = [];
					Object.keys(row.value).forEach((key) => {
						output.push(key + ":: " + row.value[key]);
					});
					if (output.length > 0) {
						return output.map((info, i) => (
							<div key={i} style={{ marginTop: 10 }}>
								{info.split(": ")[1].length > 0 && (
									<Label
										style={{ cursor: "pointer" }}
										color={
											info.includes("ALERT")
												? info.split("ALERT_")[1].split(":: ")[0].includes("__")
													? info.split("ALERT_")[1].split("__")[0].toLowerCase()
													: info
															.split("ALERT_")[1]
															.split(":: ")[0]
															.toLowerCase()
												: ""
										}
										content={
											info.split(":: ")[1].length > 30
												? info.split(":: ")[1].substring(0, 30) + "..."
												: info.split(":: ")[1]
										}
										title={info.split(":: ")[1]}
									/>
								)}
							</div>
						));
					} else {
						return "No se agregaron mensajes";
					}
				},
			},
			{
				Header: t("profile.optionDevices.tableHeader.actions"),
				accessor: "actions",
				width: 100,
				Cell: (row) => {
					return (
						<div>
							<Button
								color='blue'
								onClick={() =>
									this.modalEditPaymentType(row.original.name, row.index)
								}
								title={t("retail.buyOrSellBalanceRetails.dialog.edit")}
								size='mini'
								icon
								circular>
								<Icon name='edit outline' />
							</Button>
							<Button
								color='red'
								onClick={() => this.removePaymentType(row.original.name)}
								title={t("retail.buyOrSellBalanceRetails.dialog.delete")}
								size='mini'
								icon
								circular>
								<Icon name='cancel' />
							</Button>
						</div>
					);
				},
			},
		];
		const paymentMethodsTableHeaders = [
			{
				Header: "Id",
				accessor: "id",
				Cell: (row) => {
					return row.value.slice(-4);
				},
				width: 60,
			},
			{
				Header: t("profile.optionDevices.tableHeader.currency"),
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
				Header: t("profile.optionDevices.tableHeader.type"),
				accessor: "type",
				width: 260,
				filterable: false,
			},
			{
				Header: t("profile.optionDevices.tableHeader.information"),
				accessor: "info",
				filterable: false,
			},
			{
				Header: t("profile.optionDevices.tableHeader.debit"),
				accessor: "acceptOut",
				filterable: false,
				Cell: (row) => {
					if (row.value === true) {
						return (
							<Button
								size='tiny'
								animated='vertical'
								onClick={() =>
									this.openEditOptsModal(row.original, "out__inactivate")
								}>
								<Button.Content hidden>
									<Icon color='red' name='cancel' />
								</Button.Content>
								<Button.Content visible>
									<Icon color='green' name='checkmark' />
								</Button.Content>
							</Button>
						);
					} else {
						return (
							<Button
								size='tiny'
								animated='vertical'
								onClick={() =>
									this.openEditOptsModal(row.original, "out__activate")
								}>
								<Button.Content visible>
									<Icon color='red' name='cancel' />
								</Button.Content>
								<Button.Content hidden>
									<Icon color='green' name='checkmark' />
								</Button.Content>
							</Button>
						);
					}
				},
				width: 70,
			},
			{
				Header: t("profile.optionDevices.tableHeader.accredit"),
				accessor: "acceptIn",
				filterable: false,
				Cell: (row) => {
					if (row.value === true) {
						return (
							<Button
								size='tiny'
								animated='vertical'
								onClick={() =>
									this.openEditOptsModal(row.original, "in__inactivate")
								}>
								<Button.Content hidden>
									<Icon color='red' name='cancel' />
								</Button.Content>
								<Button.Content visible>
									<Icon color='green' name='checkmark' />
								</Button.Content>
							</Button>
						);
					} else {
						return (
							<Button
								size='tiny'
								animated='vertical'
								onClick={() =>
									this.openEditOptsModal(row.original, "in__activate")
								}>
								<Button.Content visible>
									<Icon color='red' name='cancel' />
								</Button.Content>
								<Button.Content hidden>
									<Icon color='green' name='checkmark' />
								</Button.Content>
							</Button>
						);
					}
				},
				width: 85,
			},
			{
				Header: t("profile.optionDevices.tableHeader.status"),
				accessor: "active",
				Cell: (row) => {
					if (row.value === true) {
						return (
							<Label color='green'>
								<Icon name='checkmark' />{" "}
								{t("profile.optionDevices.statusActive")}
							</Label>
						);
					} else {
						return (
							<Label color='red'>
								<Icon name='cancel' />{" "}
								{t("profile.optionDevices.statusInactive")}
							</Label>
						);
					}
				},
				width: 110,
			},
			{
				Header: t("profile.optionDevices.tableHeader.actions"),
				accessor: "actions",
				width: 75,
				filterable: false,
				Cell: (row) => {
					return (
						<div>
							<Button
								onClick={() => this.openEditModal(row.original)}
								color='blue'
								size='tiny'
								title={t("homeLoggedIn.transactions.detail.labels.edit")}
								circular
								icon>
								<Icon name='edit outline' />
							</Button>
							<Button
								onClick={() => this.openTransferModal(row.original)}
								color='blue'
								size='tiny'
								title={t(
									"homeLoggedIn.transactions.detail.labels.addSubsBalance",
								)}
								circular
								icon>
								<Icon name='exchange' />
							</Button>
						</div>
					);
				},
			},
		];
		return (
			<div>
				{!this.state.showPaymentMethodsTable && (
					<Dimmer active inverted>
						<Loader inverted>{t("homeLoggedIn.table.loading")}...</Loader>
					</Dimmer>
				)}
				<ReactTable
					className='transactionTable'
					data={this.state.listPaymentMethods}
					columns={paymentMethodsTableHeaders}
					defaultPageSize={5}
					previousText={t("homeLoggedIn.table.previous")}
					nextText={t("homeLoggedIn.table.next")}
					loadingText={t("homeLoggedIn.table.loading")}
					noDataText={t("homeLoggedIn.table.noData")}
					pageText={t("homeLoggedIn.table.page")}
					ofText={t("homeLoggedIn.table.of")}
					rowsText={t("homeLoggedIn.table.rows")}
					pageJumpText={t("homeLoggedIn.table.pageJump")}
					rowsSelectorText={t("homeLoggedIn.table.rowsSelector")}
					minRow={5}
					filterable
					defaultFilterMethod={(filter, row, column) => {
						const id = filter.pivotId || filter.id;
						return row[id] !== undefined
							? String(row[id]).startsWith(filter.value.toUpperCase()) ||
									String(row[id]).includes(filter.value) ||
									(row[id] && filter.value.toLowerCase().startsWith("a")) ||
									(!row[id] && filter.value.toLowerCase().startsWith("i"))
							: true;
					}}
				/>
				<Modal
					open={this.state.transferModal}
					onClose={this.closeTransferModal}>
					<Modal.Header>
						{t("homeLoggedIn.transactions.detail.labels.addSubsBalance")}
					</Modal.Header>
					<Modal.Content>
						<Modal.Description>
							{this.state.rowToChange !== null && (
								<p style={{ textAlign: "justify" }}>
									{t(
										"homeLoggedIn.transactions.detail.retail.buyOrSellBalanceRetails.dialog.rememberaddsubs",
									)}{" "}
									<b>{this.state.rowToChange.id.slice(-4)}</b>{" "}
									{t(
										"homeLoggedIn.transactions.detail.retail.buyOrSellBalanceRetails.dialog.ofTheCurrency",
									)}{" "}
									{this.state.rowToChange.flag !== undefined ? (
										<Flag name={this.state.rowToChange.flag} />
									) : (
										<Icon name={this.state.rowToChange.icon} />
									)}
									<b>{this.state.rowToChange.currency}</b>,{" "}
									{t(
										"homeLoggedIn.transactions.detail.retail.buyOrSellBalanceRetails.dialog.ofThePayment",
									)}{" "}
									<b>{this.state.rowToChange.type}</b>{" "}
									{t(
										"homeLoggedIn.transactions.detail.retail.buyOrSellBalanceRetails.dialog.andTheData",
									)}{" "}
									<b>{this.state.rowToChange.info}</b>
								</p>
							)}
							<Divider hidden />

							<label style={{ marginLeft: "590px" }}>
								{window.sessionStorage.getItem("language") === "es"
									? "Saldo Disponible:" + "    " + this.state.totalBalanceToShow
									: " Avaliable Balance:" +
									  "    " +
									  this.state.totalBalanceToShow}
							</label>
							<Divider hidden />
							<Form>
								<Form.Group>
									<Form.Field>
										<label>
											{" "}
											{t("homeLoggedIn.transactions.detail.labels.type")}
										</label>
										<Select
											search
											placeholder={t(
												"homeLoggedIn.transactions.detail.labels.select",
											)}
											options={this.state.transferOptions}
											onChange={this.pickTransferOption}
										/>
									</Form.Field>
									{this.state.transferOptionSelected !== "sellBtc" &&
										this.state.transferOptionSelected !== "buyBtc" &&
										this.state.transferOptionSelected !== "transferBtc" &&
										this.state.transferOptionSelected !== "" && (
											<Form.Field>
												<label>
													{t("homeLoggedIn.transactions.detail.labels.amount")}
												</label>
												{this.state.rowToChange !== undefined &&
													this.state.rowToChange !== null && (
														<NumberFormat
															placeholder='0.00'
															thousandSeparator={true}
															decimalScale={2}
															fixedDecimalScale={true}
															onValueChange={(values) => {
																const { value } = values;
																this.setState({
																	amountToTransfer: parseFloat(value),
																});
															}}
															suffix={
																"   " +
																this.state.rowToChange.currency.toUpperCase()
															}
														/>
													)}
											</Form.Field>
										)}
									{this.state.transferOptionSelected !== "sellBtc" &&
										this.state.transferOptionSelected !== "buyBtc" &&
										this.state.transferOptionSelected !== "transferBtc" &&
										this.state.transferOptionSelected !== "" && (
											<Form.Field>
												<label>
													{t(
														"homeLoggedIn.transactions.detail.labels.description",
													)}
												</label>
												<Form.Input
													value={this.state.descriptionOperation}
													onChange={this.handleDescription.bind(
														this,
													)}></Form.Input>
											</Form.Field>
										)}
									{/* {(this.state.transferOptionSelected === "add" ||
										this.state.transferOptionSelected === "substract") &&
										{
											/* <Form.Field style={{ marginTop: "32px" }}>
											<Checkbox
												label='Compensa MoneyClick'
												onChange={() =>
													this.setState({
														checkedMoneclick: !this.state.checkedMoneclick,
													})
												}
												checked={this.state.checkedMoneclick}
											/>
										</Form.Field> 
										}} */}
								</Form.Group>
								{this.state.viewMasterAccountOptions && (
									<Form.Group>
										<Form.Field widths='8'>
											<label>
												{t(
													"homeLoggedIn.transactions.detail.labels.otcAccount",
												)}
											</label>
											<Select
												search
												placeholder={t(
													"homeLoggedIn.transactions.detail.labels.select",
												)}
												options={this.state.otcOptions}
												onChange={this.pickOtcOption.bind(this)}
												value={this.state.otcSelected}
											/>
										</Form.Field>
										<Form.Field widths='4'>
											<label>
												{" "}
												{t(
													"homeLoggedIn.transactions.detail.labels.amount",
												)}{" "}
												{""}BTC
											</label>
											{this.state.rowToChange !== undefined &&
												this.state.rowToChange !== null && (
													<NumberFormat
														placeholder='0.00000000'
														thousandSeparator={true}
														decimalScale={8}
														fixedDecimalScale={true}
														onValueChange={(values) => {
															const { value } = values;
															this.setState({
																amountToTransferBtc: parseFloat(value),
															});
														}}
														suffix={"   " + "BTC"}
													/>
												)}
										</Form.Field>
										<Form.Field>
											<label>
												{t("homeLoggedIn.transactions.detail.labels.amount")}
											</label>
											{this.state.rowToChange !== undefined &&
												this.state.rowToChange !== null && (
													<NumberFormat
														placeholder='0.00'
														thousandSeparator={true}
														decimalScale={2}
														fixedDecimalScale={true}
														onValueChange={(values) => {
															const { value } = values;
															this.setState({
																amountToTransfer: parseFloat(value),
															});
														}}
														suffix={
															"   " +
															this.state.rowToChange.currency.toUpperCase()
														}
													/>
												)}
										</Form.Field>
										<Form.Field>
											<label>
												{t(
													"homeLoggedIn.transactions.detail.labels.description",
												)}
											</label>
											<Form.Input
												value={this.state.descriptionOperation}
												onChange={this.handleDescription.bind(
													this,
												)}></Form.Input>
										</Form.Field>
									</Form.Group>
								)}
								{this.state.viewTransferAccountOptions && (
									<Form.Group>
										<Form.Field widths='8'>
											<label>
												{t(
													"homeLoggedIn.transactions.detail.labels.accountToTransfer",
												)}
											</label>
											<Select
												search
												placeholder={t(
													"homeLoggedIn.transactions.detail.labels.select",
												)}
												options={this.state.accountOptions}
												onChange={this.pickAccountOption.bind(this)}
												value={this.state.accountSelected}
											/>
										</Form.Field>
										{/* <Form.Field widths="4">
                      <label>{t("homeLoggedIn.transactions.detail.labels.amount")} en BTC</label>
                      {this.state.rowToChange !== undefined &&
                        this.state.rowToChange !== null && (
                          <NumberFormat
                            placeholder="0.00000000"
                            thousandSeparator={true}
                            decimalScale={8}
                            fixedDecimalScale={true}
                            onValueChange={values => {
                              const { value } = values;
                              this.setState({
                                amountToTransferBtc: parseFloat(value)
                              });
                            }}
                            suffix={"   " + "BTC"}
                          />
                        )}
                    </Form.Field>*/}
										<Form.Field>
											<label>
												{t("homeLoggedIn.transactions.detail.labels.amount")}
											</label>
											{this.state.rowToChange !== undefined &&
												this.state.rowToChange !== null && (
													<NumberFormat
														placeholder='0.00'
														thousandSeparator={true}
														decimalScale={2}
														fixedDecimalScale={true}
														onValueChange={(values) => {
															const { value } = values;
															this.setState({
																amountToTransfer: parseFloat(value),
															});
														}}
														suffix={
															"   " +
															this.state.rowToChange.currency.toUpperCase()
														}
													/>
												)}
										</Form.Field>
										<Form.Field>
											<label>
												{t(
													"homeLoggedIn.transactions.detail.labels.description",
												)}
											</label>
											<Form.Input
												value={this.state.descriptionOperation}
												onChange={this.handleDescription.bind(
													this,
												)}></Form.Input>
										</Form.Field>
									</Form.Group>
								)}
								{messageSucessBalanceOperation}
							</Form>
						</Modal.Description>
					</Modal.Content>
					<Modal.Actions>
						<Button onClick={this.closeTransferModal} color='grey'>
							<Icon name='remove' />{" "}
							{t("homeLoggedIn.transactions.detail.labels.cancel")}
						</Button>
						{this.state.viewMasterAccountOptions !== true && (
							<Button
								onClick={this.transferAmountToPaymentMethod}
								disabled={
									this.state.transferOptionSelected === "" ||
									this.state.amountToTransfer === "" ||
									this.state.descriptionOperation === ""
								}
								type='submit'
								color='blue'
								loading={this.state.loadTransfer}>
								<Icon name='checkmark' />{" "}
								{t("homeLoggedIn.transactions.detail.labels.addSubs")}
							</Button>
						)}
						{this.state.viewMasterAccountOptions === true && (
							<Button
								onClick={this.transferAmountToPaymentMethod}
								disabled={
									this.state.transferOptionSelected === "" ||
									this.state.amountToTransfer === "" ||
									this.state.descriptionOperation === "" ||
									this.state.amountToTransferBtc === "" ||
									this.state.otcSelected === ""
								}
								type='submit'
								color='blue'
								loading={this.state.loadTransfer}>
								<Icon name='checkmark' />{" "}
								{t("homeLoggedIn.transactions.detail.labels.addSubs")}
							</Button>
						)}
					</Modal.Actions>
				</Modal>
				<Modal
					open={this.state.paymentTypeModalOpen}
					onClose={this.closeAddPaymentTypeModal}>
					{this.state.editPaymentType ? (
						<Header
							icon='edit'
							content={t(
								"homeLoggedIn.transactions.detail.labels.edittypepayment",
							)}
						/>
					) : (
						<Header
							icon='add'
							content={t(
								"homeLoggedIn.transactions.detail.labels.addtypepayment",
							)}
						/>
					)}
					<Modal.Content>
						<Form>
							<Form.Group widths='equal'>
								<Form.Field>
									<label>
										{t("homeLoggedIn.transactions.detail.labels.typepayment")}
									</label>
									<Select
										disabled={this.state.optionPaymentType}
										defaultValue={this.state.paymentTypeToAdd}
										placeholder={t(
											"homeLoggedIn.transactions.detail.labels.select",
										)}
										options={this.state.paymentTypesByCurrencyOptions}
										onChange={this.pickpaymentTypeToAdd}
										value={this.state.paymentTypeToAdd}
									/>
								</Form.Field>
								<Form.Field>
									<label>
										{t("homeLoggedIn.transactions.detail.labels.windowPayment")}
									</label>
									<Input
										label={
											<Select
												defaultValue={this.state.periodTimeToAdd}
												options={[
													{
														key: "minutes",
														value: "minutes",
														text: "min",
													},
													{
														key: "hours",
														value: "hours",
														text: "hrs",
													},
												]}
												onChange={(e, data) => {
													this.setState({ periodTimeToAdd: data.value });
												}}
											/>
										}
										labelPosition='right'
										placeholder='90'
										onChange={this.handlePaymentWindow}
										value={this.state.paymentWindow}
										defaultValue={this.state.paymentWindow}
									/>
								</Form.Field>
							</Form.Group>
							<Form.Group widths='equal'>
								<Form.Field>
									<Checkbox
										label={t(
											"homeLoggedIn.transactions.detail.labels.requiredPaymentMethod",
										)}
										onChange={this.toggleJoinMyPayments}
										checked={this.state.joinMyPaymentsBoolean}
									/>
								</Form.Field>
								<Form.Field>
									<Checkbox
										label={t(
											"homeLoggedIn.transactions.detail.labels.requiredJoinField",
										)}
										onChange={this.toggleJoinFieldValue}
										checked={this.state.joinFieldValueBoolean}
									/>
								</Form.Field>
							</Form.Group>
							<Divider
								content={t(
									"homeLoggedIn.transactions.detail.labels.salesMessages",
								)}
								horizontal
							/>
							<div>
								{((this.state.isAlertMessageSell &&
									this.state.languageMessage !== "") ||
									this.state.messageInstructionsSell.find((m) =>
										m.key.includes("ALERT"),
									) !== undefined) && (
									<label style={{ fontWeight: "bold" }}>
										{t("homeLoggedIn.transactions.detail.labels.alertMessages")}
									</label>
								)}

								{this.state.messageInstructionsSell.map((item, index) => {
									if (item.key.includes("ALERT")) {
										return (
											<Popup
												size='mini'
												trigger={
													<Label
														key={index}
														style={{ marginBottom: 10 }}
														color={item.key
															.split("__")[1]
															.split("_")[1]
															.toLowerCase()}>
														{item.value.length > 12
															? item.text +
															  " - " +
															  item.value.slice(0, 12) +
															  "..."
															: item.text + " - " + item.value}
														<Icon
															name='delete'
															onClick={() => this.removeMessageSell(item.key)}
														/>
													</Label>
												}>
												{item.value}
											</Popup>
										);
									}
								})}
							</div>
							<div>
								{((this.state.isInstructionsMessageSell &&
									this.state.languageMessage !== "") ||
									this.state.messageInstructionsSell.find((m) =>
										m.key.includes("INSTRUCTIONS"),
									) !== undefined) && (
									<label style={{ fontWeight: "bold" }}>
										{t(
											"homeLoggedIn.transactions.detail.labels.instructionMessages",
										)}
									</label>
								)}

								{this.state.messageInstructionsSell.map((item, index) => {
									if (item.key.includes("INSTRUCTIONS")) {
										return (
											<Popup
												size='mini'
												trigger={
													<Label key={index} style={{ marginBottom: 10 }}>
														{item.value.length > 12
															? item.text +
															  " - " +
															  item.value.slice(0, 12) +
															  "..."
															: item.text + " - " + item.value}
														<Icon
															name='delete'
															onClick={() => this.removeMessageSell(item.key)}
														/>
													</Label>
												}>
												{item.value}
											</Popup>
										);
									}
								})}
							</div>
							<Form.Group widths='equal'>
								<Form.Field>
									<label>
										{" "}
										{t("homeLoggedIn.transactions.detail.labels.typeMessages")}
									</label>
									<Select
										disabled={this.state.paymentTypeToAdd === ""}
										placeholder={t(
											"homeLoggedIn.transactions.detail.labels.select",
										)}
										value={this.state.typeMessageSelectedSell}
										options={this.state.optionsTypeMessagesSell}
										onChange={this.onChangeTypeMessageSell}
									/>
								</Form.Field>
								<Form.Field>
									<label>
										{" "}
										{t("homeLoggedIn.transactions.detail.labels.language")}
									</label>
									<Select
										disabled={this.state.typeMessageSelectedSell === ""}
										placeholder={t(
											"homeLoggedIn.transactions.detail.labels.select",
										)}
										options={this.state.optionsLenguageSell}
										value={this.state.languageMessage}
										onChange={this.pickLanguageMessage.bind(this)}
									/>
								</Form.Field>
								<Form.Field style={{ marginTop: 24 }}>
									<Button
										color='blue'
										disabled={
											this.state.languageMessage === "" ||
											this.state.sell_instruction === ""
										}
										onClick={this.addMessageInstructionsSell.bind(this)}>
										{t(
											"homeLoggedIn.transactions.detail.labels.includeMessage",
										)}
									</Button>
								</Form.Field>
							</Form.Group>

							{this.state.isAlertMessageSell && (
								<div>
									{this.state.languageMessage !== "" && (
										<Form.Group widths='equal'>
											<Form.Field>
												<label>
													{t(
														"homeLoggedIn.transactions.detail.labels.greenAlert",
													)}
												</label>
												<Select
													search
													placeholder={t("dinamicForm.placeholderOption")}
													name='alert_sell_green'
													disabled={this.state.optionMessage}
													options={this.state.messagesAlertOptions}
													onChange={this.pickMessagesAlert.bind(this)}
													value={this.state.greenAlertOption}
												/>
												<Divider hidden />
												{this.state.messageError &&
													this.state.nameText === "alert_sell_green" && (
														<Label basic color='red' pointing='below'>
															{t(
																"homeLoggedIn.transactions.detail.labels.noDefaultMessages",
															)}
														</Label>
													)}
												<TextArea
													disabled={this.state.textGreenSell}
													placeholder={t(
														"homeLoggedIn.transactions.detail.labels.insertMessage",
													)}
													onChange={this.handleGreenAlert}
													value={this.state.SELL__ALERT_GREEN}
												/>
											</Form.Field>
											<Form.Field>
												<label>
													{t(
														"homeLoggedIn.transactions.detail.labels.blueAlert",
													)}
												</label>
												<Select
													search
													placeholder={t("dinamicForm.placeholderOption")}
													name='alert_sell_blue'
													disabled={this.state.optionMessage}
													options={this.state.messagesAlertOptions}
													onChange={this.pickMessagesAlert}
													value={this.state.blueAlertOption}
												/>
												<Divider hidden />
												{this.state.messageError &&
													this.state.nameText === "alert_sell_blue" && (
														<Label basic color='red' pointing='below'>
															{t(
																"homeLoggedIn.transactions.detail.labels.noDefaultMessages",
															)}
														</Label>
													)}
												<TextArea
													disabled={this.state.textBlueSell}
													placeholder={t(
														"homeLoggedIn.transactions.detail.labels.insertMessage",
													)}
													onChange={this.handleBlueAlert}
													value={this.state.SELL__ALERT_BLUE}
												/>
											</Form.Field>
											<Form.Field>
												<label>
													{t(
														"homeLoggedIn.transactions.detail.labels.redAlert",
													)}
												</label>
												<Select
													search
													placeholder={t("dinamicForm.placeholderOption")}
													name='alert_sell_red'
													disabled={this.state.optionMessage}
													options={this.state.messagesAlertOptions}
													onChange={this.pickMessagesAlert}
													value={this.state.redAlertOption}
												/>
												<Divider hidden />
												{this.state.messageError &&
													this.state.nameText === "alert_sell_red" && (
														<Label basic color='red' pointing='below'>
															{t(
																"homeLoggedIn.transactions.detail.labels.noDefaultMessages",
															)}
														</Label>
													)}
												<TextArea
													disabled={this.state.textRedSell}
													placeholder={t(
														"homeLoggedIn.transactions.detail.labels.insertMessage",
													)}
													onChange={this.handleRedAlert}
													value={this.state.SELL__ALERT_RED}
												/>
											</Form.Field>
										</Form.Group>
									)}
								</div>
							)}

							{this.state.isInstructionsMessageSell && (
								<div>
									{this.state.languageMessage !== "" && (
										<Form.Group>
											<Form.Field width={5}>
												<label>
													{t("homeLoggedIn.transactions.detail.labels.status2")}
												</label>
												<Select
													disabled={this.state.paymentTypeToAdd === ""}
													placeholder={t(
														"homeLoggedIn.transactions.detail.labels.select",
													)}
													value={this.state.operationStatusMessage}
													options={this.state.statusOptionsSell}
													onChange={this.pickOTCOperationStatusToSearch.bind(
														this,
													)}
												/>
											</Form.Field>
											{this.state.existsDefaultInstructionsSell !== "" && (
												<Form.Field>
													<Checkbox
														label={
															<label>
																{t(
																	"homeLoggedIn.transactions.detail.labels.useDefaultMessage",
																)}
															</label>
														}
														checked={this.state.useInstructionsDefaultSell}
														onChange={this.onChangeInstructionsDefaultSell}
													/>
												</Form.Field>
											)}
										</Form.Group>
									)}
									{this.state.operationStatusMessage !== "" &&
										this.state.languageMessage !== "" && (
											<Form.Field fluid>
												<label>
													{t("homeLoggedIn.transactions.detail.labels.Message")}
												</label>
												{/* <Select
                          search
                          placeholder="{("homeLoggedIn.transactions.detail.labels.select")}e una opción"
                          name="sell_instruction"
                          disabled={this.state.optionMessage}
                          options={this.state.messagesAlertOptions}
                          onChange={this.pickMessagesAlert}
                          value={this.state.redAlertOption}
                        />
                        <Divider hidden />
                        {this.state.messageError &&
                          this.state.nameText === "alert_sell_red" && (
                            <Label basic color="red" pointing="below">
                              {("homeLoggedIn.transactions.detail.labels.noDefaultMessages")}
                            </Label>
                          )} */}
												<TextArea
													fluid
													disabled={
														this.state.languageMessage === "" ||
														this.state.operationStatusMessage === "" ||
														this.state.useInstructionsDefaultSell
													}
													placeholder={t(
														"homeLoggedIn.transactions.detail.labels.insertMessage",
													)}
													onChange={(e, data) =>
														this.setState({ sell_instruction: data.value })
													}
													value={this.state.sell_instruction}
												/>
											</Form.Field>
										)}
								</div>
							)}
							{/*Los mensajes de compra a partir de aqui*/}
							<Divider
								content={t(
									"homeLoggedIn.transactions.detail.labels.buyMessages",
								)}
								horizontal
							/>
							<div>
								{((this.state.isAlertMessageBuy &&
									this.state.languageMessageBuy !== "") ||
									this.state.messageInstructionsBuy.find(
										(m) => m.key.includes("ALERT") && !m.key.includes("MC"),
									) !== undefined) && (
									<label style={{ fontWeight: "bold" }}>
										{t("homeLoggedIn.transactions.detail.labels.alertMessages")}
									</label>
								)}

								{this.state.messageInstructionsBuy.map((item, index) => {
									if (item.key.includes("ALERT") && !item.key.includes("MC")) {
										return (
											<Popup
												size='mini'
												trigger={
													<Label
														key={index}
														style={{ marginBottom: 10 }}
														color={item.key
															.split("__")[1]
															.split("_")[1]
															.toLowerCase()}>
														{item.value.length > 12
															? item.text +
															  " - " +
															  item.value.slice(0, 12) +
															  "..."
															: item.text + " - " + item.value}
														<Icon
															name='delete'
															onClick={() => this.removeMessageBuy(item.key)}
														/>
													</Label>
												}>
												{item.value}
											</Popup>
										);
									}
								})}
							</div>
							<div>
								{((this.state.isInstructionsMessageBuy &&
									this.state.languageMessageBuy !== "") ||
									this.state.messageInstructionsBuy.find(
										(m) =>
											m.key.includes("INSTRUCTIONS") && !m.key.includes("MC"),
									) !== undefined) && (
									<label style={{ fontWeight: "bold" }}>
										{t(
											"homeLoggedIn.transactions.detail.labels.instructionMessages",
										)}
									</label>
								)}

								{this.state.messageInstructionsBuy.map((item, index) => {
									if (
										item.key.includes("INSTRUCTIONS") &&
										!item.key.includes("MC")
									) {
										return (
											<Popup
												size='mini'
												trigger={
													<Label key={index} style={{ marginBottom: 10 }}>
														{item.value.length > 12
															? item.text +
															  " - " +
															  item.value.slice(0, 12) +
															  "..."
															: item.text + " - " + item.value}
														<Icon
															name='delete'
															onClick={() => this.removeMessageBuy(item.key)}
														/>
													</Label>
												}>
												{item.value}
											</Popup>
										);
									}
								})}
							</div>
							<Form.Group widths='equal'>
								<Form.Field>
									<label>
										{t("homeLoggedIn.transactions.detail.labels.typeMessages")}
									</label>
									<Select
										disabled={this.state.paymentTypeToAdd === ""}
										placeholder={t(
											"homeLoggedIn.transactions.detail.labels.select",
										)}
										value={this.state.typeMessageSelectedBuy}
										options={this.state.optionsTypeMessagesBuy}
										onChange={this.onChangeTypeMessageBuy}
									/>
								</Form.Field>
								<Form.Field>
									<label>
										{t("homeLoggedIn.transactions.detail.labels.language")}
									</label>
									<Select
										disabled={this.state.typeMessageSelectedBuy === ""}
										placeholder={t(
											"homeLoggedIn.transactions.detail.labels.select",
										)}
										options={this.state.optionsLenguageBuy}
										value={this.state.languageMessageBuy}
										onChange={this.pickLanguageMessageBuy.bind(this)}
									/>
								</Form.Field>
								<Form.Field style={{ marginTop: 24 }}>
									<Button
										color='blue'
										disabled={
											this.state.languageMessageBuy === "" ||
											this.state.buy_instruction === ""
										}
										onClick={this.addMessageInstructionsBuy.bind(this)}>
										{t(
											"homeLoggedIn.transactions.detail.labels.includeMessage",
										)}
									</Button>
								</Form.Field>
							</Form.Group>

							{this.state.isAlertMessageBuy &&
								this.state.languageMessageBuy !== "" && (
									<Form.Group widths='equal'>
										<Form.Field>
											<label>
												{t(
													"homeLoggedIn.transactions.detail.labels.greenAlert",
												)}
											</label>
											<Select
												search
												placeholder={t("dinamicForm.placeholderOption")}
												name='alert_buy_green'
												disabled={this.state.optionMessage}
												options={this.state.messagesAlertOptions}
												onChange={this.pickMessagesAlert}
												value={this.state.greenBuyAlertOption}
											/>
											<Divider hidden />
											{this.state.messageError &&
												this.state.nameText === "alert_buy_green" && (
													<Label basic color='red' pointing='below'>
														{t(
															"homeLoggedIn.transactions.detail.labels.noDefaultMessages",
														)}
													</Label>
												)}
											<TextArea
												disabled={this.state.textGreenBuy}
												placeholder={t(
													"homeLoggedIn.transactions.detail.labels.insertMessage",
												)}
												onChange={this.handleBuyGreenAlert}
												value={this.state.BUY__ALERT_GREEN}
											/>
										</Form.Field>
										<Form.Field>
											<label>
												{t("homeLoggedIn.transactions.detail.labels.blueAlert")}
											</label>
											<Select
												search
												placeholder={t("dinamicForm.placeholderOption")}
												name='alert_buy_blue'
												disabled={this.state.optionMessage}
												options={this.state.messagesAlertOptions}
												onChange={this.pickMessagesAlert}
												value={this.state.blueBuyAlertOption}
											/>
											<Divider hidden />
											{this.state.messageError &&
												this.state.nameText === "alert_buy_blue" && (
													<Label basic color='red' pointing='below'>
														{t(
															"homeLoggedIn.transactions.detail.labels.noDefaultMessages",
														)}
													</Label>
												)}
											<TextArea
												disabled={this.state.textBlueBuy}
												placeholder={t(
													"homeLoggedIn.transactions.detail.labels.insertMessage",
												)}
												onChange={this.handleBuyBlueAlert}
												value={this.state.BUY__ALERT_BLUE}
											/>
										</Form.Field>
										<Form.Field>
											<label>
												{t("homeLoggedIn.transactions.detail.labels.redAlert")}
											</label>
											<Select
												search
												placeholder={t("dinamicForm.placeholderOption")}
												name='alert_buy_red'
												disabled={this.state.optionMessage}
												options={this.state.messagesAlertOptions}
												onChange={this.pickMessagesAlert}
												value={this.state.redBuyAlertOption}
											/>
											<Divider hidden />
											{this.state.messageError &&
												this.state.nameText === "alert_buy_red" && (
													<Label basic color='red' pointing='below'>
														{t(
															"homeLoggedIn.transactions.detail.labels.noDefaultMessages",
														)}
													</Label>
												)}
											<TextArea
												disabled={this.state.textRedBuy}
												placeholder={t(
													"homeLoggedIn.transactions.detail.labels.insertMessage",
												)}
												onChange={this.handleBuyRedAlert}
												value={this.state.BUY__ALERT_RED}
											/>
										</Form.Field>
									</Form.Group>
								)}

							{this.state.isInstructionsMessageBuy && (
								<div>
									{this.state.languageMessageBuy !== "" && (
										<Form.Group>
											<Form.Field width={5}>
												<label>
													{t("homeLoggedIn.transactions.detail.labels.status2")}
												</label>
												<Select
													placeholder={t(
														"homeLoggedIn.transactions.detail.labels.select",
													)}
													disabled={this.state.paymentTypeToAdd === ""}
													options={this.state.statusOptionsBuy}
													value={this.state.operationStatusMessageBuy}
													onChange={this.pickOTCOperationStatusBuy.bind(this)}
												/>
											</Form.Field>
											{this.state.existsDefaultInstructionsBuy && (
												<Form.Field>
													<Checkbox
														label={
															<label>
																{t(
																	"homeLoggedIn.transactions.detail.labels.useDefaultMessage",
																)}
															</label>
														}
														checked={this.state.useInstructionsDefaultBuy}
														onChange={this.onChangeInstructionsDefaultBuy}
													/>
												</Form.Field>
											)}
										</Form.Group>
									)}
									{this.state.languageMessageBuy !== "" &&
										this.state.operationStatusMessageBuy !== "" && (
											<Form.Field fluid>
												<label>
													{t("homeLoggedIn.transactions.detail.labels.message")}
												</label>
												<TextArea
													fluid
													disabled={
														this.state.languageMessageBuy === "" ||
														this.state.operationStatusMessageBuy === "" ||
														this.state.useInstructionsDefaultBuy
													}
													placeholder={t(
														"homeLoggedIn.transactions.detail.labels.insertMessage",
													)}
													onChange={(e, data) =>
														this.setState({ buy_instruction: data.value })
													}
													value={this.state.buy_instruction}
												/>
											</Form.Field>
										)}
								</div>
							)}
							<Divider
								content={t(
									"homeLoggedIn.transactions.detail.labels.alertMessageRecharge",
								)}
								horizontal
							/>
							<div>
								{((this.state.isAlertMessageMcBuy &&
									this.state.languageMessageMcBuy !== "") ||
									this.state.messageInstructionsBuy.find(
										(m) => m.key.includes("ALERT") && m.key.includes("MC"),
									) !== undefined) && (
									<label style={{ fontWeight: "bold" }}>
										{t("homeLoggedIn.transactions.detail.labels.alertMessages")}
									</label>
								)}

								{this.state.messageInstructionsBuy.map((item, index) => {
									if (item.key.includes("ALERT") && item.key.includes("MC")) {
										return (
											<Popup
												size='mini'
												trigger={
													<Label
														key={index}
														style={{ marginBottom: 10 }}
														color={item.key
															.split("__")[1]
															.split("_")[1]
															.toLowerCase()}>
														{item.value.length > 12
															? item.text +
															  " - " +
															  item.value.slice(0, 12) +
															  "..."
															: item.text + " - " + item.value}
														<Icon
															name='delete'
															onClick={() => this.removeMessageBuy(item.key)}
														/>
													</Label>
												}>
												{item.value}
											</Popup>
										);
									}
								})}
							</div>
							<div>
								{((this.state.isInstructionsMessageMcBuy &&
									this.state.languageMessageMcBuy !== "") ||
									this.state.messageInstructionsBuy.find(
										(m) =>
											m.key.includes("INSTRUCTIONS") && m.key.includes("MC"),
									) !== undefined) && (
									<label style={{ fontWeight: "bold" }}>
										{t(
											"homeLoggedIn.transactions.detail.labels.instructionMessages",
										)}
									</label>
								)}

								{this.state.messageInstructionsBuy.map((item, index) => {
									if (
										item.key.includes("INSTRUCTIONS") &&
										item.key.includes("MC")
									) {
										return (
											<Label key={index} style={{ marginBottom: 10 }}>
												{item.value.length > 10
													? item.text + " - " + item.value.slice(0, 9) + "..."
													: item.text + " - " + item.value}
												<Icon
													name='delete'
													onClick={() => this.removeMessageBuy(item.key)}
												/>
											</Label>
										);
									}
								})}
							</div>
							<Form.Group widths='equal'>
								<Form.Field>
									<label>
										{t("homeLoggedIn.transactions.detail.labels.typeMessages")}
									</label>
									<Select
										disabled={this.state.paymentTypeToAdd === ""}
										placeholder={t(
											"homeLoggedIn.transactions.detail.labels.select",
										)}
										value={this.state.typeMessageSelectedMcBuy}
										options={this.state.optionsTypeMessagesMcBuy}
										onChange={this.onChangeTypeMessageMcBuy.bind(this)}
									/>
								</Form.Field>
								<Form.Field>
									<label>
										{t("homeLoggedIn.transactions.detail.labels.language")}
									</label>
									<Select
										disabled={this.state.typeMessageSelectedMcBuy === ""}
										placeholder={t(
											"homeLoggedIn.transactions.detail.labels.select",
										)}
										options={this.state.optionsLenguageMcBuy}
										value={this.state.languageMessageMcBuy}
										onChange={this.pickLanguageMessageMcBuy.bind(this)}
									/>
								</Form.Field>
								<Form.Field style={{ marginTop: 24 }}>
									<Button
										color='blue'
										disabled={
											this.state.languageMessageMcBuy === "" ||
											this.state.buy_instruction_mc === ""
										}
										onClick={this.addMessageInstructionsBuy.bind(this)}>
										{t(
											"homeLoggedIn.transactions.detail.labels.includeMessage",
										)}
									</Button>
								</Form.Field>
							</Form.Group>
							{this.state.isAlertMessageMcBuy &&
								this.state.languageMessageMcBuy !== "" && (
									<Form.Group widths='equal'>
										<Form.Field>
											<label>
												{" "}
												{t(
													"homeLoggedIn.transactions.detail.labels.greenAlert",
												)}
											</label>
											<Select
												search
												placeholder={t("dinamicForm.placeholderOption")}
												name='alert_buy_green_mc'
												disabled={this.state.optionMessage}
												options={this.state.messagesAlertOptions}
												onChange={this.pickMessagesAlertMc.bind(this)}
												value={this.state.greenBuyAlertOption}
											/>
											<Divider hidden />
											{this.state.messageError &&
												this.state.nameText === "alert_buy_green_mc" && (
													<Label basic color='red' pointing='below'>
														{t(
															"homeLoggedIn.transactions.detail.labels.noDefaultMessages",
														)}
													</Label>
												)}
											<TextArea
												disabled={this.state.textGreenBuy}
												placeholder={t(
													"homeLoggedIn.transactions.detail.labels.insertMessage",
												)}
												onChange={this.handleBuyGreenAlert}
												value={this.state.BUY__ALERT_GREEN}
											/>
										</Form.Field>
										<Form.Field>
											<label>
												{t("homeLoggedIn.transactions.detail.labels.blueAlert")}
											</label>
											<Select
												search
												placeholder={t("dinamicForm.placeholderOption")}
												name='alert_buy_blue_mc'
												disabled={this.state.optionMessage}
												options={this.state.messagesAlertOptions}
												onChange={this.pickMessagesAlertMc.bind(this)}
												value={this.state.blueBuyAlertOption}
											/>
											<Divider hidden />
											{this.state.messageError &&
												this.state.nameText === "alert_buy_blue_mc" && (
													<Label basic color='red' pointing='below'>
														{t(
															"homeLoggedIn.transactions.detail.labels.noDefaultMessages",
														)}
													</Label>
												)}
											<TextArea
												disabled={this.state.textBlueBuy}
												placeholder={t(
													"homeLoggedIn.transactions.detail.labels.insertMessage",
												)}
												onChange={this.handleBuyBlueAlert}
												value={this.state.BUY__ALERT_BLUE}
											/>
										</Form.Field>
										<Form.Field>
											<label>
												{t("homeLoggedIn.transactions.detail.labels.blueAlert")}
											</label>
											<Select
												search
												placeholder={t("dinamicForm.placeholderOption")}
												name='alert_buy_red_mc'
												disabled={this.state.optionMessage}
												options={this.state.messagesAlertOptions}
												onChange={this.pickMessagesAlertMc.bind(this)}
												value={this.state.redBuyAlertOption}
											/>
											<Divider hidden />
											{this.state.messageError &&
												this.state.nameText === "alert_buy_red_mc" && (
													<Label basic color='red' pointing='below'>
														{t(
															"homeLoggedIn.transactions.detail.labels.noDefaultMessages",
														)}
													</Label>
												)}
											<TextArea
												disabled={this.state.textRedBuy}
												placeholder={t(
													"homeLoggedIn.transactions.detail.labels.insertMessage",
												)}
												onChange={this.handleBuyRedAlert}
												value={this.state.BUY__ALERT_RED}
											/>
										</Form.Field>
									</Form.Group>
								)}
							{this.state.isInstructionsMessageMcBuy && (
								<div>
									{this.state.languageMessageMcBuy !== "" && (
										<Form.Group>
											<Form.Field width={5}>
												<label>
													{t("homeLoggedIn.transactions.detail.labels.status2")}
												</label>
												<Select
													placeholder={t(
														"homeLoggedIn.transactions.detail.labels.select",
													)}
													disabled={this.state.paymentTypeToAdd === ""}
													options={this.state.statusOptionsBuy}
													value={this.state.operationStatusMessageMcBuy}
													onChange={this.pickOTCOperationStatusMcBuy.bind(this)}
												/>
											</Form.Field>
											{this.state.existsDefaultInstructionsBuy !== "" && (
												<Form.Field style={{ marginTop: "30px" }}>
													<Checkbox
														label={
															<label>
																{t(
																	"homeLoggedIn.transactions.detail.labels.useDefaultMessage",
																)}
															</label>
														}
														checked={this.state.useInstructionsDefaultMcBuy}
														onChange={this.onChangeInstructionsDefaultMcBuy.bind(
															this,
														)}
													/>
												</Form.Field>
											)}
										</Form.Group>
									)}
									{this.state.languageMessageMcBuy !== "" &&
										this.state.operationStatusMessageMcBuy !== "" && (
											<Form.Field fluid>
												<label>
													{t("homeLoggedIn.transactions.detail.labels.message")}
												</label>
												<TextArea
													fluid
													disabled={
														this.state.languageMessageMcBuy === "" ||
														this.state.operationStatusMessageMcBuy === "" ||
														this.state.useInstructionsDefaultMcBuy
													}
													placeholder={t(
														"homeLoggedIn.transactions.detail.labels.insertMessage",
													)}
													onChange={(e, data) =>
														this.setState({ buy_instruction_mc: data.value })
													}
													value={this.state.buy_instruction_mc}
												/>
											</Form.Field>
										)}
								</div>
							)}
						</Form>
					</Modal.Content>
					<Modal.Actions>
						<Button
							type='submit'
							onClick={this.closeAddPaymentTypeModal}
							color='grey'
							icon
							labelPosition='left'>
							<Icon name='cancel' />
							{t(
								"homeLoggedIn.transactions.detail.retail.buyOrSellBalanceRetails.dialog.cancel",
							)}
						</Button>
						{!this.state.editPaymentType && (
							<Button
								type='submit'
								onClick={this.addPaymentType}
								color='blue'
								icon
								labelPosition='left'
								disabled={
									this.state.paymentTypeToAdd === "" ||
									this.state.paymentWindow === ""
								}>
								<Icon name='add' />
								{t(
									"homeLoggedIn.transactions.detail.retail.buyOrSellBalanceRetails.dialog.add",
								)}
							</Button>
						)}
						{this.state.editPaymentType && (
							<Button
								type='submit'
								onClick={this.editPaymentType}
								color='blue'
								icon
								labelPosition='left'
								disabled={
									this.state.paymentTypeToAdd === "" ||
									this.state.paymentWindow === "" ||
									this.state.optionEdit
								}>
								<Icon name='add' />
								{t(
									"homeLoggedIn.transactions.detail.retail.buyOrSellBalanceRetails.dialog.edit",
								)}
							</Button>
						)}
					</Modal.Actions>
				</Modal>
				<Modal
					size='tiny'
					open={this.state.optsModal}
					onClose={this.closeModalEditOpts}>
					<Modal.Header>
						{t("sendTokenResetPassword.form.buttonConfirm")}
					</Modal.Header>
					<Modal.Content>
						<p>
							{t(
								"homeLoggedIn.transactions.detail.retail.buyOrSellBalanceRetails.dialog.desire",
							)}
							{this.state.optAction}{" "}
							{t(
								"homeLoggedIn.transactions.detail.retail.buyOrSellBalanceRetails.dialog.optionForFunction",
							)}{" "}
							{this.state.optType}?{" "}
						</p>
					</Modal.Content>
					<Modal.Actions>
						<Button negative onClick={this.closeModalEditOpts}>
							No
						</Button>
						<Button
							positive
							icon='checkmark'
							labelPosition='right'
							content='Si'
							loading={this.state.loadEdit}
							onClick={this.editAcceptInOrOut}
						/>
					</Modal.Actions>
				</Modal>
				<Modal open={this.state.editModal} onClose={this.closeEditModal}>
					<Modal.Header>
						{t(
							"homeLoggedIn.transactions.detail.retail.buyOrSellBalanceRetails.dialog.editPaymentMethod",
						)}
					</Modal.Header>
					<Modal.Content>
						<Modal.Description>
							{this.state.rowToChange !== null && (
								<p style={{ textAlign: "justify" }}>
									{t(
										"homeLoggedIn.transactions.detail.retail.buyOrSellBalanceRetails.dialog.remember",
									)}{" "}
									<b>{this.state.rowToChange.id.slice(-4)}</b>{" "}
									{t(
										"homeLoggedIn.transactions.detail.retail.buyOrSellBalanceRetails.dialog.ofTheCurrency",
									)}{" "}
									{this.state.rowToChange.flag !== undefined ? (
										<Flag name={this.state.rowToChange.flag} />
									) : (
										<Icon name={this.state.rowToChange.icon} />
									)}
									<b>{this.state.rowToChange.currency}</b>,{" "}
									{t(
										"homeLoggedIn.transactions.detail.retail.buyOrSellBalanceRetails.dialog.ofThePayment",
									)}{" "}
									<b>{this.state.rowToChange.type}</b>{" "}
									{t(
										"homeLoggedIn.transactions.detail.retail.buyOrSellBalanceRetails.dialog.andTheData",
									)}{" "}
									<b>{this.state.rowToChange.info}</b>
								</p>
							)}
							<Divider />
							<Form>
								<Form.Group widths='equal'>
									<Form.Field>
										<label>
											{t("profile.optionDevices.tableHeader.status")}
										</label>
										<Select
											search
											placeholder={t(
												"homeLoggedIn.transactions.detail.labels.select",
											)}
											options={this.state.statusesOptions}
											onChange={this.pickStatusToChange}
											value={this.state.statusToChange}
										/>
									</Form.Field>
									<Form.Field>
										<label>
											{" "}
											{t(
												"homeLoggedIn.transactions.detail.retail.buyOrSellBalanceRetails.dialog.debit",
											)}
										</label>
										<Select
											search
											placeholder={t("dinamicForm.placeholderOption")}
											options={this.state.acceptOutOptions}
											onChange={this.pickAcceptOutToChange}
											value={this.state.acceptOutToChange}
										/>
									</Form.Field>
									<Form.Field>
										<label>
											{t(
												"homeLoggedIn.transactions.detail.retail.buyOrSellBalanceRetails.dialog.accredit",
											)}
										</label>
										<Select
											search
											placeholder={t("dinamicForm.placeholderOption")}
											options={this.state.acceptInOptions}
											onChange={this.pickAcceptInToChange}
											value={this.state.acceptInToChange}
										/>
									</Form.Field>
								</Form.Group>
							</Form>
							<Divider section />
							<div style={{ textAlign: "right" }}>
								<Button
									color='blue'
									icon
									labelPosition='left'
									onClick={this.openAddPaymentTypeModal}>
									<Icon name='add' />
									{t(
										"homeLoggedIn.transactions.detail.retail.buyOrSellBalanceRetails.dialog.addTypePayments",
									)}
								</Button>
							</div>
							<ReactTable
								style={{ marginTop: 20 }}
								className='transactionTable'
								data={this.state.typesToEdit}
								columns={paymentTypesTableHeaders}
								defaultPageSize={5}
								previousText={t("homeLoggedIn.table.previous")}
								nextText={t("homeLoggedIn.table.next")}
								loadingText={t("homeLoggedIn.table.loading")}
								noDataText={t("homeLoggedIn.table.noData")}
								pageText={t("homeLoggedIn.table.page")}
								ofText={t("homeLoggedIn.table.of")}
								rowsText={t("homeLoggedIn.table.rows")}
								pageJumpText={t("homeLoggedIn.table.pageJump")}
								rowsSelectorText={t("homeLoggedIn.table.rowsSelector")}
								minRow={5}
							/>
							<Segment basic>
								<Header as='h4'>
									{t(
										"homeLoggedIn.transactions.detail.retail.buyOrSellBalanceRetails.dialog.sendMoneyParams",
									)}
								</Header>
								{this.state.errorAmount && (
									<Message negative>
										<Message.Header>Error</Message.Header>
										<p>
											{" "}
											{t(
												"homeLoggedIn.transactions.detail.retail.buyOrSellBalanceRetails.dialog.errorMessageMaxAmount",
											)}
										</p>
									</Message>
								)}
								<div>
									{this.state.rulesSend.map((item, index) => (
										<Label key={index} style={{ marginBottom: 10 }}>
											{item.text}
											<Icon
												name='delete'
												onClick={() => this.removeRulesToSendPayments(item.key)}
											/>
										</Label>
									))}
								</div>
								<Form style={{ marginTop: 20 }}>
									<Form.Group widths='equal'>
										<Form.Select
											fluid
											label={t(
												"homeLoggedIn.transactions.detail.retail.buyOrSellBalanceRetails.dialog.typesPaymentMethod",
											)}
											options={this.state.paymentTypesOptionsSend}
											placeholder='Tipos'
											onChange={this.setPicketPaymentTypeSelectSend.bind(this)}
											value={this.state.typePaymentRuleSelected}
										/>
										<Form.Field fluid>
											<label>
												{" "}
												{t(
													"homeLoggedIn.transactions.detail.retail.buyOrSellBalanceRetails.dialog.minAmount",
												)}
											</label>
											<NumberFormat
												value={this.state.minOperation}
												allowNegative={false}
												thousandSeparator={true}
												placeholder=''
												allowNegative={false}
												onValueChange={(values) =>
													this.setMinAmountOperationSend(values.value)
												}
												name='fiat'
											/>
										</Form.Field>
										<Form.Field fluid>
											<label>
												{" "}
												{t(
													"homeLoggedIn.transactions.detail.retail.buyOrSellBalanceRetails.dialog.maxAmount",
												)}
											</label>
											<NumberFormat
												value={this.state.maxOperation}
												allowNegative={false}
												thousandSeparator={true}
												placeholder=''
												allowNegative={false}
												onValueChange={(values) =>
													this.setMaxAmountOperationSend(values.value)
												}
												name='fiat'
											/>
										</Form.Field>
										<Button
											color='blue'
											disabled={
												this.state.typePaymentRuleSelected === "" ||
												this.state.minOperation === "" ||
												this.state.maxOperation === ""
											}
											style={{ marginTop: 23, height: 38 }}
											onClick={this.addRulesToSendPayments.bind(this)}>
											{t("withdraw.modal.buttons.add")}
										</Button>
									</Form.Group>
								</Form>
							</Segment>
							<Segment basic>
								<Header as='h4'>
									{t(
										"homeLoggedIn.transactions.detail.retail.buyOrSellBalanceRetails.dialog.paramsRecharge",
									)}
								</Header>
								{this.state.errorAmounBuy && (
									<Message negative>
										<Message.Header>Error</Message.Header>
										<p>
											{t(
												"homeLoggedIn.transactions.detail.retail.buyOrSellBalanceRetails.dialog.errorMessageMaxAmount",
											)}
										</p>
									</Message>
								)}
								<div>
									{this.state.rulesBuy.map((item, index) => (
										<Label key={index} style={{ marginBottom: 10 }}>
											{item.text}
											<Icon
												name='delete'
												onClick={() => this.removeRulesToBuyPayments(item.key)}
											/>
										</Label>
									))}
								</div>
								<Form style={{ marginTop: 20 }}>
									<Form.Group widths='equal'>
										<Form.Select
											fluid
											label={t(
												"homeLoggedIn.transactions.detail.retail.buyOrSellBalanceRetails.dialog.typesPaymentMethod",
											)}
											options={this.state.paymentTypesOptionsBuy}
											placeholder={t("types")}
											onChange={this.setPicketPaymentTypeSelectBuy.bind(this)}
											value={this.state.typePaymentRuleSelectedBuy}
										/>
										<Form.Field fluid>
											<label>
												{t(
													"homeLoggedIn.transactions.detail.retail.buyOrSellBalanceRetails.dialog.minAmount",
												)}
											</label>
											<NumberFormat
												value={this.state.minOperationBuy}
												allowNegative={false}
												thousandSeparator={true}
												placeholder=''
												allowNegative={false}
												onValueChange={(values) =>
													this.setMinAmountOperationBuy(values.value)
												}
												name='fiat'
											/>
										</Form.Field>
										<Form.Field fluid>
											<label>
												{t("homeLoggedIn.transactions.detail.retail.maxAmount")}
											</label>
											<NumberFormat
												value={this.state.maxOperationBuy}
												allowNegative={false}
												thousandSeparator={true}
												placeholder=''
												allowNegative={false}
												onValueChange={(values) =>
													this.setMaxAmountOperationBuy(values.value)
												}
												name='fiat'
											/>
										</Form.Field>
										<Button
											color='blue'
											disabled={
												this.state.typePaymentRuleSelectedBuy === "" ||
												this.state.minOperationBuy === "" ||
												this.state.maxOperationBuy === ""
											}
											style={{ marginTop: 23, height: 38 }}
											onClick={this.addRulesToBuyPayments.bind(this)}>
											{t("withdraw.modal.buttons.add")}
										</Button>
									</Form.Group>
								</Form>
							</Segment>
						</Modal.Description>
					</Modal.Content>
					<Modal.Actions>
						<Button onClick={this.closeEditModal} color='grey'>
							<Icon name='remove' /> {t("withdraw.modal.buttons.cancel")}
						</Button>
						<Button
							onClick={this.editPayment.bind(this)}
							disabled={
								this.state.changeEditPayment === false ||
								this.state.typesToEdit.length < 1
							}
							type='submit'
							color='blue'
							loading={this.state.loadEdit}>
							<Icon name='checkmark' /> {t("withdraw.modal.buttons.edit")}
						</Button>
					</Modal.Actions>
				</Modal>
			</div>
		);
	}
}

export default translate(ListPaymentMethods);
