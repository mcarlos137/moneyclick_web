import { Component } from "react";
import {
	Grid,
	Form,
	Button,
	Header,
	Modal,
	Divider,
	Segment,
	Message,
} from "semantic-ui-react";
import React from "react";
import "./BuySellBTC.css";
import logo64 from "./logo";
import mcIcon from "../../img/splash_mc.jpg";
import translate from "../../i18n/translate";
import { parse } from "query-string";
import CurrenciesFlag from "../../common/currencyFlag";
import * as jsPDF from "jspdf";
import NumberFormat from "react-number-format";
import userService from "../../services/user";
import otcService from "../../services/otc";
import TermsAndConditions from '../TermsAndConditions/TermsAndConditionsMoneyClick';
import otc from "../../services/otc";

class ModalBuyBTC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            translator: props.translate,
            showModalReceipt: false,
            loadModal: false,
            buttonLoader: false,
            trackId: '',
            fastChangeSucess: false,
            fastChangeBalance: false,
            fastChangeError:false,
            fastChangeErrorPrice:false,
            fastChangeLimitDayly:false,
            fastChangeLimitMonthly: false,
            dataToPdf: "",
            data: "",
            availableDate: "",
            operationDate: "",
			alerts: [],
			conditions: false
        }
    }

	componentDidMount(){
		this.loadMessageAlerts();
	}

	componentDidUpdate(prevProps) {
		if (this.props.currencyReceive !== prevProps.currencyReceive) {
			this.loadMessageAlerts();
		}
	}

	async loadMessageAlerts() {
		let arrayAlert = [];
		let alerts = await userService.getAlertCrypto(this.props.currencyReceive, "MC_BUY_CRYPTO","MAIN");
		console.log('alerts ', alerts.data);
		Object.entries(alerts.data).forEach(([key, value]) => {
      		arrayAlert.push([key + ':' + value]);
    	});
		this.setState({
			alerts: arrayAlert
		});
	}

    async getMovementUser(source) {
		this.setState({ loadingId: true, loadModal: true });

		try {
			const username = window.sessionStorage.getItem("username");
			const response = await userService.getMovementsUser(username);

			let keys = Object.keys(response.data);
			if (keys.length > 0) {
				await this.formatedDataToRender(response.data, false);
			} else {
				this.setState({
					data: [],
					loadingId: false,
				});
			}
		} catch (error) {
			//	this.setState({ isFetching: false });
			this.setState({ loadingId: false, data: [] });
		}
	}

    	printInvoice() {
		var src = logo64.filetest;
		//document.body.appendChild(img);
		let trackID = "";
		let title = "";
		let titlestring = "";
		let t = this.state.translator;
		title = t("buyBTC.modal.buyReceipt");
		titlestring = title.toString();
		let doc = new jsPDF();
		var imgData = src;
		doc.text(200, 15, trackID );
		doc.addImage(imgData, "PNG", 80, 5, 40, 20);
		// addImage(imageData, format, x, y, width, height, alias, compression, rotation);
		doc.setFontType("bold");
		doc.setFontSize(12);
		doc.text(75, 35, "Mountain View Pay LLC.");
		doc.text(80, 40, "+1 (470) 273-9398");
		doc.setFontType("normal");
		doc.text(40, 45, "2003 Monterey Parkway Sandy Springs, GA Zip code 30350");

		doc.setFontSize(14);
		doc.setFontType("bold");
		doc.text(87, 60, t("buyBTC.pdf.invoice"));
		doc.setFontType("normal");
		// let x = 60,
		let y = 70;
		doc.setFontSize(12);
			let titleAdded = true;
		for (let data of this.state.dataToPdf) {
			if (data.label.includes("Id")) {
				doc.setFontType("bold");
				doc.text(data.label + ":", 40, y);
				doc.setFontType("normal");
				y = y + 7;
				doc.text(data.value, 40, y);
				trackID = data.value;
			}  else if (
			(data.label === "Exchange Rate" ||
				data.label === "Precio de Cambio") && titleAdded
			) {
				doc.setFontType("bold");
				doc.text(data.label + ":", 40, y);
				doc.setFontType("normal");
				y = y + 7;
				doc.text(data.value, 40, y);
				titleAdded = false;
			} else if (
					(data.label === "Exchange Rate" ||
				data.label === "Precio de Cambio")
				
			) {
				doc.text(data.value, 40, y);
			} else if (
				data.label.includes("Comis") ||
				data.label.includes("Commis")
			) {
				doc.setFontType("bold");
				doc.text(data.label +":", 40, y);
				doc.setFontType("normal");
				y = y + 7;
				doc.text(data.value + " " + this.props.currencyOfCharges, 40, y);
				
			} else if (
				data.label.includes("Tax")
			) {
				if (Number(data.value) > 0) {
					doc.setFontType("bold");
					doc.text(data.label + ":", 40, y);
					doc.setFontType("normal");
					y = y + 7;
					doc.text(data.value + " " + this.props.currencyOfCharges, 40, y);
				} else {
					y = y - 10
				}
			} else {
				doc.setFontType("bold");
				doc.text(data.label + ":", 40, y);
				doc.setFontType("normal");
				y = y + 7;
				doc.text(data.value, 40, y);
			}
			y = y + 10;
			}

	
		y = y + 20;
		doc.setTextColor(100);
		doc.text(65, y, "Website : https://moneyclick.com");
		doc.save(trackID + ".pdf");
    }
    
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

		return cad.trim();
    }

    getFirtWord(string) {
		let letter = "";
		if (string.indexOf("SEND_TO") !== -1 || string.indexOf("SEND TO") !== -1) {
			letter = "SEND TO ";
		} else if (string.indexOf("OTC") !== -1) {
			letter = "OTC ";
		}
		return letter;
    }
    
    floorDecimals(value, numberDecimals) {
		let decimales = Math.pow(10, numberDecimals);
		return Math.floor(value * decimales) / decimales;
	}
    
	async formatedDataToRender(data, isFilter) {
		let array = [];
		let oldData = [];

		this.setState({ data: [] });
		try {
			Object.entries(data).forEach(([key, value]) => {
				let t = this.state.translator;
				let dateOperation,
					typeOp,
					typeOp2,
					amountOp,
					currencyOp,
					btcPrice,
					flagData,
					user,
					description,
					targetAddress,
					initialAmount,
					comision,
					sended,
					receiver,
					fulladdress,
					idOperation,
					dateOperation2,
					accountAddress,
					accountHolderName,
					accountNumber,
					accountZip,
					automaticCharge,
					bank,
					bankRoutingNumber,
					bankSwiftCode,
					currencySend,
					typeSend,
					verified,
					zelle,
					typeAmount,
					canceledReason = "";
				dateOperation = key.split("__")[0];

				dateOperation2 = this.formatDate(new Date(dateOperation));
				let statusOp = {};
				let cont = 0;
				Object.entries(value).forEach(([inerKey, inerValue]) => {
					if (inerKey === "addedAmount") {
						receiver = "true";
						amountOp = inerValue.amount;
						currencyOp = inerValue.currency;
						typeAmount = "addedAmount";

						if (currencyOp !== "BTC" && currencyOp !== "ETH") {
							amountOp = this.floorDecimals(inerValue.amount, 2);
						} else {
							amountOp = inerValue.amount.toFixed(8);
						}

						flagData = CurrenciesFlag.currenciesFlag[inerValue.currency];
						if (flagData === undefined) {
							let findCurren = this.state.currenciesData.find((currency) => {
								return currency.shortName === inerValue.currency;
							});
							if (findCurren !== undefined) {
								flagData = {
									key: findCurren.shortName.toLowerCase(),
									value: findCurren.shortName,
									flag: findCurren.shortName.toLowerCase(),
									text: findCurren.shortName,
									img: mcIcon,
									alias: findCurren.shortName,
									isCripto: false,
									symbol: " ",
									priority: 10,
								};
							}
						}
					}

					if (inerKey === "substractedAmount") {
						sended = "true";
						currencyOp = inerValue.currency;
						typeAmount = "substractedAmount";
						if (currencyOp === "BTC" || currencyOp === "ETH") {
							initialAmount = this.floorDecimals(inerValue.initialAmount, 8);
							comision = this.floorDecimals(
								inerValue.amount - inerValue.initialAmount,
								8,
							);
						} else {
							initialAmount = this.floorDecimals(inerValue.initialAmount, 2);
							comision = this.floorDecimals(
								inerValue.amount - inerValue.initialAmount,
								2,
							);
						}
						if (currencyOp !== "BTC" && currencyOp !== "ETH") {
							amountOp = this.floorDecimals(inerValue.amount, 2);
						} else {
							if (inerValue.initialAmount === undefined) {
								amountOp = inerValue.amount.toFixed(8);
							} else {
								amountOp = inerValue.initialAmount.toFixed(8);
							}
						}
						flagData = CurrenciesFlag.currenciesFlag[inerValue.currency];
						if (flagData === undefined) {
							let findCurren = this.state.currenciesData.find((currency) => {
								return currency.shortName === inerValue.currency;
							});
							if (findCurren !== undefined) {
								flagData = {
									key: findCurren.shortName.toLowerCase(),
									value: findCurren.shortName,
									flag: findCurren.shortName.toLowerCase(),
									text: findCurren.shortName,
									img: mcIcon,
									alias: findCurren.shortName,
									isCripto: false,
									symbol: " ",
									priority: 10,
								};
							}
						}
					}
					if (inerKey === "balanceOperationType") {
						typeOp = inerValue;

						let val = typeOp
							.toLocaleString("en-US", {
								maximumFractionDigits: 12,
							})
							.toLowerCase();

						let translate = "homeLoggedIn.transactions.detail.labels." + val;
						let string = translate.toString();

						typeOp2 = this.state.translator(string);
					}
					if (inerKey === "balanceOperationStatus") {
						if (inerValue === "OK") {
							statusOp.color = "green";
							statusOp.icon = "check circle";
							statusOp.name = this.state.translator(
								"homeLoggedIn.transactions.detail.statusOperation.success",
							);
						} else if (inerValue === "WAITING_FOR_PAYMENT") {
							statusOp.color = "blue";
							statusOp.icon = "sync";
							statusOp.name = this.state.translator(
								"homeLoggedIn.tableHeaders.statusValues.waitingPayment",
							);
						} else if (inerValue === "FAIL") {
							statusOp.color = "red";
							statusOp.icon = "warning circle";
							statusOp.name = this.state.translator(
								"homeLoggedIn.transactions.detail.statusOperation.fail",
							);
						} else if (inerValue === "CANCELED") {
							statusOp.color = "red";
							statusOp.icon = "warning circle";
							statusOp.name = this.state.translator(
								"homeLoggedIn.tableHeaders.statusValues.canceled",
							);
						} else if (inerValue === "PAY_VERIFICATION") {
							statusOp.color = "orange";
							statusOp.icon = "info";
							statusOp.name = this.state.translator(
								"homeLoggedIn.tableHeaders.statusValues.payVerification",
							);
						} else if (inerValue === "CLAIM") {
							statusOp.color = "grey";
							statusOp.icon = "info";
							statusOp.name = this.state.translator(
								"homeLoggedIn.tableHeaders.statusValues.claim",
							);
						} else if (inerValue === "PROCESSING") {
							statusOp.color = "grey";
							statusOp.icon = "info";
							statusOp.name = this.state.translator(
								"homeLoggedIn.tableHeaders.statusValues.processing",
							);
						} else {
							statusOp.color = "grey";
							statusOp.icon = "info";
							statusOp.name = inerValue;
						}
					}
					if (inerKey === "additionalInfo") {
						let t = this.state.translator;
						if (inerValue.indexOf("DESCRIPTION") !== -1) {
							let info = inerValue.split(" ");
							if (info[2] === "PAYMENT") {
								user = "";
							} else {
								if (inerValue.indexOf("-") !== -1) {
									let sendTo = inerValue.split("-")[0];

									let first = this.getFirtWord(sendTo);

									user = sendTo.split(first)[1];
								} else {
									user = info[2];
								}
							}
							let desc = inerValue.split("DESCRIPTION")[1];
							if (desc.charAt(0) !== " ") {
								description = desc;
							} else {
								description = desc.substring(1, desc.length);
							}
						} else if (inerValue.indexOf("OTC operation id") !== -1) {
							let value = inerValue.split("OTC operation id ")[1];
							let id = value.substring(value.length - 7, value.length);
							idOperation = id;
						} else if (inerValue.indexOf("ROLLBACK FROM") !== -1) {
							let val = inerValue.split("ROLLBACK FROM ")[1];
							user = val;
							description = t(
								"homeLoggedIn.transactions.detail.labels.rollback",
							);
						} else if (inerValue.indexOf("RECEIVE FROM") !== -1) {
							let content = inerValue.split("RECEIVE FROM ");
							user = content[1];
							description = t(
								"homeLoggedIn.transactions.detail.labels.addAmount",
							); // t(
							//);
						} else if (inerValue.indexOf("SELL GIFT CARD COMMISSION") !== -1) {
							let content = inerValue.split("SELL GIFT CARD COMMISSION");
							user = content[1];
							description = t(
								"homeLoggedIn.transactions.detail.labels.sell_gift_card_commission",
							); // t(
							//);
						} else if (inerValue.indexOf("CHANGE FROM") !== -1) {
							let content = inerValue.split("CHANGE FROM ");
							let currencies = content[1].split("-")[0];
							description =
								t("homeLoggedIn.transactions.detail.labels.change_from") +
								currencies.split("TO")[0] +
								" -> " +
								currencies.split("TO")[1];
						} else if (inerValue.includes("BUY BALANCE RETAIL")) {
							let idRetail = inerValue.split(" ")[3];
							idRetail = idRetail.substring(
								idRetail.length - 4,
								idRetail.length,
							);
							description =
								t("homeLoggedIn.transactions.detail.labels.mc_retail_buy") +
								" " +
								idRetail;
						} else if (inerValue.includes("SELL BALANCE RETAIL")) {
							let idRetail = inerValue.split(" ")[3];
							idRetail = idRetail.substring(
								idRetail.length - 4,
								idRetail.length,
							);
							description =
								t("homeLoggedIn.transactions.detail.labels.mc_retail_sell") +
								" " +
								idRetail;
						} else if (inerValue.includes("ADDED TO RETAIL ESCROW")) {
							let idRetail = inerValue.split(" ")[4];
							idRetail = idRetail.substring(
								idRetail.length - 4,
								idRetail.length,
							);
							description =
								t(
									"homeLoggedIn.transactions.detail.labels.added_to_retail_escrow",
								) +
								" " +
								idRetail;
						} else if (inerValue.includes("INITIAL_MOVEMENT")) {
							let idRetail = inerValue.split(" ")[4];
							idRetail = idRetail.substring(
								idRetail.length - 4,
								idRetail.length,
							);
							description = t(
								"homeLoggedIn.transactions.detail.labels.initial_movements",
							);
						} else if (inerValue.includes("RECEIVED FROM OUTSIDE WALLET")) {
							description = t(
								"homeLoggedIn.transactions.detail.labels.receive_out",
							);
						} else if (inerValue.includes("TARGET ADDRESS")) {
							if (inerValue.split("TARGET ADDRESS", 1) !== "") {
								description = inerValue.split("TARGET ADDRESS", 1);
							} else {
								let idRetail = inerValue.split("TARGET ADDRESS", 2);
								description =
									idRetail[0] +
									" " +
									t("homeLoggedIn.transactions.detail.labels.walletTarget") +
									" " +
									idRetail[1];
							}
						} else {
							description = inerValue;
						}
					}
					if (inerKey === "btcPrice") {
						btcPrice = inerValue;
					}
					if (inerKey === "balanceOperationProcessId") {
						let id = inerValue.substring(
							inerValue.length - 7,
							inerValue.length,
						);
						idOperation = id;
					}
					if (inerKey === "operationId") {
						let id = inerValue.substring(
							inerValue.length - 7,
							inerValue.length,
						);
						idOperation = id;
					}
					if (inerKey === "targetAddress") {
						let sub = "...";
						sub =
							sub +
							inerValue.substring(inerValue.length - 10, inerValue.length);
						targetAddress = sub;
						fulladdress = inerValue;
					}
					if (inerKey === "canceledReason") {
						canceledReason = inerValue;
					}
					if (inerKey === "clientPayment") {
						accountAddress = inerValue.accountAddress;
						accountHolderName = inerValue.accountHolderName;
						accountNumber = inerValue.accountNumber;
						accountZip = inerValue.accountZip;
						automaticCharge = inerValue.automaticCharge;
						bank = inerValue.bank;
						bankRoutingNumber = inerValue.bankRoutingNumber;
						bankSwiftCode = inerValue.bankSwiftCode;
						currencySend = inerValue.currency;
						if (inerValue.type === "TRANSFER_WITH_SPECIFIC_BANK") {
							typeSend = t("profile.addAccount.specificBank");
						} else if (inerValue.type === "TRANSFER_NATIONAL_BANK") {
							typeSend = t("profile.addAccount.thirdBank");
						} else if (inerValue.type === "CHECK_DEPOSIT") {
							typeSend = t("profile.addAccount.checkDeposit");
						} else {
							typeSend = t("profile.addAccount.checkDeposit");
						}

						verified = inerValue.verified;
						zelle = inerValue.zelle;
					}
				});

				let ob = {
					initialAmount: initialAmount,
					comision: comision,
					sended: sended,
					receiver: receiver,
					currency: currencyOp,
					amount: amountOp,
					status: statusOp,
					type: typeOp2,
					date: dateOperation2,
					key: dateOperation,
					btcPrice: btcPrice,
					flag: flagData,
					style: "",
					user: user,
					description: description,
					canceledReason: canceledReason,
					fulladdress: fulladdress,
					typeOp: typeOp,
					accountAddress: accountAddress,
					accountHolderName: accountHolderName,
					accountNumber: accountNumber,
					accountZip: accountZip,
					automaticCharge: automaticCharge,
					bank: bank,
					bankRoutingNumber: bankRoutingNumber,
					bankSwiftCode: bankSwiftCode,
					currencySend: currencySend,
					typeSend: typeSend,
					verified: verified,
					zelle: zelle,
					typeAmount: typeAmount,
					idOperation: idOperation,
                };
                
				if (targetAddress !== undefined) {
					ob.targetAddress = targetAddress;
					ob.fulladdress = fulladdress;
				}

				array.push(ob);
			});

			array.sort((a, b) => {
				return new Date(b.key).getTime() - new Date(a.key).getTime();
			});
			const dateAvailableAux = await otc._getCryptoBuyAvailableTimestamp(this.props.currencyReceive,  new Date().toISOString());

			let idcrop = this.state.trackId.substr(-7);

			Object.entries(array).forEach(([k, v]) => {
				if (v.idOperation === idcrop) {

					let dateOp = this.formatDate(new Date(v.key));

					let dateAvailable = dateAvailableAux.data;

					let dateAvailableFinal = this.formatDate(new Date(dateAvailable));

					this.setState({
						operationDate: dateOp,
						availableDate: dateAvailableFinal,
					});
				}
			});

			if (isFilter) {
				this.setState({ data: array }, () => {
					this.showOperationByUrl(this.state.data);
				});
			} else {
				this.setState({ data: array, oldData: array }, () => {
					this.showOperationByUrl(this.state.data);
				});
			}
			this.setState({ loadingId: false });
			this.loadDataToPrinting();
		} catch (error) {
			console.log(error);
		}
    }

    loadDataToPrinting() {
		//this.determinateTotals();
		let optionsPdf = [];
		let t = this.state.translator;
		let obPrint = {
			trackId: this.state.trackId,
			dateOperation: this.state.operationDate,
			dateAvailable: this.state.availableDate,
			amountSend: this.props.amountToChange,
			commission: this.props.commisionByOperarion,
			tax: this.props.taxVat,
			totalSend: this.props.totalToSend,
			factorInverse: this.props.factorToShow,
		};
		if (this.props.factorInverseToShow > "0.000000001") {
			obPrint.factor = this.props.factorInverseToShow;
			obPrint.amountReceive = this.props.amountReceiveToShow;
		} else {
			obPrint.amountReceive = this.props.amountReceiveToShow;
		}
		
		Object.entries(obPrint).forEach(([ke, val]) => {
			let objPdf = {
				label: "",
				value: "",
			};
			if (ke === "dateOperation") {
				objPdf.label = t("fastChange.dateOperation");
				objPdf.value = val;
				optionsPdf.push(objPdf);
			} else if (ke === "trackId") {
				objPdf.label = t("fastChange.idOperation");
				objPdf.value = val.substr(-7);
				optionsPdf.push(objPdf);
			} else if (ke === "dateAvailable") {
				objPdf.label = t("fastChange.dateAvailable");
				objPdf.value = val;
				optionsPdf.push(objPdf);
			} else if (ke === "amountSend") {
				objPdf.label = t("buyBTC.modal.amountSend");
				objPdf.value = Number(val).toFixed(2).toString() + " " + this.props.currencyLabelSelected;
				optionsPdf.push(objPdf);
			} else if (ke === "amountReceive") {
				objPdf.label = t("buyBTC.modal.amountReceive");
				objPdf.value = Number(val).toFixed(this.props.currencyReceive === "USDT" ? 2 : 8).toString() + " " + this.props.currencyReceive;
				optionsPdf.push(objPdf);
			} else if (ke === "commission") {
				objPdf.label = t("buyBTC.modal.Commission");
				objPdf.value = this.props.currencyOfCharges !== "BTC" && this.props.currencyOfCharges !== "ETH" ?  Number(val).toFixed(2) : Number(val).toFixed(8);
				optionsPdf.push(objPdf);
			} else if (ke === "tax") {
				objPdf.label = t("buyBTC.modal.tax");
				objPdf.value = this.props.currencyOfCharges !== "BTC" && this.props.currencyOfCharges !== "ETH" ?  Number(val).toFixed(2) : Number(val).toFixed(8);
				optionsPdf.push(objPdf);
			} else if (ke === "totalSend") {
				objPdf.label = t("buyBTC.modal.totalToSend");
				objPdf.value = val + " " + this.props.currencyLabelSelected;
				optionsPdf.push(objPdf);
			} else if (ke === "factorInverse") {
				objPdf.label = t("buyBTC.modal.changeFactorInverse");
				objPdf.value =
					"1" +
					" " +
					this.props.currencyReceive +
					" " +
					"=" +
					"  " +
					Number(val).toFixed(2).toString() +
					"  " +
					this.props.currencyLabelSelected;
				optionsPdf.push(objPdf);
			}  else if (ke === "factor") {
				objPdf.label = t("buyBTC.modal.changeFactor");

				objPdf.value =
					"1" +
					" " +
					this.props.currencyLabelSelected +
					" " +
					"=" +
					"  " +
					Number(val).toFixed(this.props.currencyReceive === "USDT" ? 2 : 8).toString() +
					"  " + this.props.currencyReceive;
				optionsPdf.push(objPdf);
			}
			else {
				objPdf.label = "";
				objPdf.value = "";
				optionsPdf.push(objPdf);
			}
		});
        if (optionsPdf !== "") {
					this.setState({ showModalReceipt: true });
				}
		this.setState({ dataToPdf: optionsPdf, loadModal: false }, () => {
			console.log('optionsPdf ', optionsPdf);
		});
	
	}
    
    	showOperationByUrl(data) {
		var idUrl = parse(window.location.search).id;
		if (idUrl !== undefined) {
			var uri = window.location.toString();
			if (uri.indexOf("?") > 0) {
				var clean_uri = uri.substring(0, uri.indexOf("?"));
				window.history.replaceState({}, document.title, clean_uri);
			}
			for (let i = 0; i < data.length; i++) {
				if (data[i].idOperation !== undefined) {
					if (idUrl.slice(-7) === data[i].idOperation) {
						var index = i;
						let operationIndex = {
							[index]: {},
						};
						this.expandedOperation(operationIndex, [i]);
					}
				}
			}
		}
    }
    
    expandedOperation(newExpanded, index, event) {
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
		this.setState({
			...this.state,
			expanded: newExpanded,
		});
	}

    init() {
        this.setState({
            fastChangeSucess: false,
            fastChangeBalance: false,
            fastChangeError: false,
            fastChangeErrorPrice: false,
            fastChangeLimitDayly: false,
            fastChangeLimitMonthly: false,
        });
    }
    async buyCrypto() {
		if(this.state.conditions){
        this.init();
		try {
			this.setState({ loadModal: true });
			let body = {
				userName: window.sessionStorage.getItem("username"),
				cryptoCurrency: this.props.currencyReceive,
				fiatCurrency: this.props.currencyLabelSelected,
				fiatAmount: this.props.amountToChange,
				cryptoAmount: this.props.amountReceive,
			};
		console.log('body buy', body);
			let responsebuybtc = await userService.buyCrypto(body);
			console.log('resp buy', responsebuybtc.data);
			if (responsebuybtc.data.includes("OK")) {
				this.setState({
					fastChangeSucess: true,
					buttonLoader: false,
                    trackId: responsebuybtc.data.split("__")[1],
                });
                this.getMovementUser(window.sessionStorage.getItem("username"));
			} else {
				if (responsebuybtc.data === "DOES NOT HAVE ENOUGH BALANCE") {
					this.setState({
						loadModal: false,
						fastChangeBalance: true,
						buttonLoader: false,
					});
					setTimeout(() => {
						this.setState({ fastChangeBalance: false });
					}, 5000);
				} else {
					if (responsebuybtc.data === "USER DAYLY LIMIT REACHED") {
						this.setState({
							loadModal: false,
							fastChangeLimitDayly: true,
							buttonLoader: false,
						});
						setTimeout(() => {
							this.setState({ fastChangeLimitDayly: false });
						}, 5000);
					}

					if (responsebuybtc.data === "USER MONTHLY LIMIT REACHED") {
						this.setState({
							loadModal: false,
							fastChangeLimitMonthly: true,
							buttonLoader: false,
						});
						setTimeout(() => {
							this.setState({ fastChangeLimitMonthly: false });
						}, 5000);
					}

					if (responsebuybtc.data.includes("ICE CHANGE")) {
						this.setState({
							loadModal: false,
							fastChangeErrorPrice: true,
							buttonLoader: false,
						});
						setTimeout(() => {
							this.setState({ fastChangeErrorPrice: false });
						}, 7000);
					}
					if (responsebuybtc.data === "THERE IS NO PRICE FOR THIS CURRENCY") {
						this.setState({
							loadModal: false,
							fastChangeError: true,
							buttonLoader: false,
						});
						setTimeout(() => {
							this.setState({ fastChangeError: false });
						}, 5000);
					}
				}
			}
		} catch (error) {
			console.log(error);
			this.setState({ errorInRed: true, formLoad: false, loadModal: false });
		}
	} else {
			this.setState({
				emptyConditions: true,
				buttonLoader: false,
			});
			setTimeout(() => {
				this.setState({ emptyConditions: false });
			}, 5000);
	}
    }

	initModal() {

		this.setState({
		  showModalReceipt: false,
            loadModal: false,
            buttonLoader: false,
            trackId: '',
            fastChangeSucess: false,
            fastChangeBalance: false,
            fastChangeError:false,
            fastChangeErrorPrice:false,
            fastChangeLimitDayly:false,
            fastChangeLimitMonthly: false,
            dataToPdf: "",
            data: "",
            availableDate: "",
            operationDate: ""
		});

		this.props.handleCloseSucess();
	}

	closeModal() {
		this.setState({
			fastChangeSucess: false,
			fastChangeBalance: false,
			fastChangeError: false,
			fastChangeErrorPrice: false,
			fastChangeLimitDayly: false,
			fastChangeLimitMonthly: false,
		});
		this.props.closeModal();
	}

	handleConditions(e) {
		this.setState({ conditions: !this.state.conditions });
		this.onClickCloseModalTermsAndConditions();
	}

	agree(){
		this.setState({ conditions: true });
		this.onClickCloseModalTermsAndConditions();
	}

	onClickCloseModalTermsAndConditions() {
		this.setState({
			seeTermsAndConditions: false,
		});
	}

	onClickTermsAndConditions() {
		this.setState({
			seeTermsAndConditions: true,
		});
	}

    render() {
        let t = this.state.translator;
        	let labelconfirmMessage,
			labelconfirmMessageError,
			labelErrorBalance,
			labelErrorConditions;
		
		if (this.state.fastChangeSucess) {
			labelconfirmMessage = (
				<Message info>
					<Message.Header>{t("fastChange.send.success")}</Message.Header>
					<p>{t("fastChange.send.successmessage")}</p>
				</Message>
			);
		}

		if(this.state.emptyConditions){
			labelErrorConditions = (
				<Message negative>
					<p>
						{t("fastChange.errorConditions")}
					</p>
				</Message>
			);
		}

		if (this.state.fastChangeBalance) {
			labelErrorBalance = (
				<Message negative>
					<p>
						{t("fastChange.errorGetBalance") +
							this.floorDecimals(this.props.avalilableToChange, 2) +
							" " +
							this.props.currencyLabelSelected}
					</p>
				</Message>
			);
		}
		if (this.state.fastChangeLimitDayly) {
			labelconfirmMessage = (
				<Message negative>
					<p>{t("fastChange.errorGetDayly")}</p>
				</Message>
			);
		}
		if (this.state.fastChangeLimitMonthly) {
			labelconfirmMessage = (
				<Message negative>
					<p>{t("fastChange.errorGetMonthly")}</p>
				</Message>
			);
		}
		if (this.state.fastChangeError) {
			labelconfirmMessageError = (
				<Message error>
					<p>{t("fastChange.send.fail")}</p>
				</Message>
			);
		}
		if (this.state.fastChangeErrorPrice) {
			labelconfirmMessageError = (
				<Message error>
					<p>{t("fastChange.priceChange")}</p>
				</Message>
			);
		}
        return (<div>
			<Modal
            open={this.props.showModalFastChange}
            onClose={this.handleClose}
            size='small'>
            {this.state.showModalReceipt && (
                <Header
                    content={t("buyBTC.modal.buyReceipt")}
                    subheader={t("fastChange.dateOperation") + ":   " +
                        this.state.operationDate +
											  "   " +
											  " - " +
											  "   " +
											  t("fastChange.dateAvailable") + " : "+ this.state.availableDate}
                />
            )}
            {!this.state.showModalReceipt && (
                <Header
                    content={t("fastChange.dataOperationBuy")}
                />
            )}

            <Modal.Content>
                <Form widths='equal' className='form-login' error unstackable>
                    <Segment basic loading={this.state.loadModal}>
                        <Grid>
                            {this.state.showModalReceipt && (
                                <Grid.Row centered>
                                    <label>
                                        <b>{t("fastChange.idOperation")}:</b>
                                        {"  "} {this.state.trackId.substr(-7)}
                                    </label>
                                </Grid.Row>
                            )}
                                <Grid.Row columns={"equal"}>
                                    <Grid.Column textAlign={"center"}>
                                        <Form.Field width={16}>
                                            <label>
                                                {t("buyBTC.modal.amountSend")}
                                            </label>
                                            <NumberFormat
                                                value={this.props.amountToChange}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                decimalScale={
                                                    this.props.currencyLabelSelected !== "BTC" &&
                                                        this.props.currencyLabelSelected !== "ETH"
                                                        ? 2
                                                        : 8
                                                }
                                                prefix={this.props.currencyLabelSelected + " "}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>{t("buyBTC.modal.Commission")}</label>
                                            <NumberFormat
                                                decimalScale={2}
                                                value={this.props.commisionByOperarion === 0 ? "0.00" : this.props.commisionByOperarion}
                                                prefix={
                                                    this.props.currencyLabelSelected + " "}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                            />
                                        </Form.Field>
                                        {this.props.taxVat !== 0 && (<Form.Group inline>
                                            <Form.Field>
                                                <label>Tax</label>
                                                    <NumberFormat
                                                        decimalScale={2}
                                                        value={this.props.taxVat}
                                                        displayType={"text"}
                                                        thousandSeparator={true}
                                                    />{" "}
                                                    {this.props.currencyOfCharges + " "}
                                            </Form.Field>
                                        </Form.Group>)}
                                        <Form.Field>
                                            <label>{t("buyBTC.modal.totalToSend")}</label>
                                            <NumberFormat
                                                decimalScale={2}
                                                value={this.props.totalToSend}
                                                prefix={this.props.currencyLabelSelected + " "}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                            />
                                        </Form.Field>
                                    </Grid.Column>
                                    <Grid.Column textAlign={"center"}>
													
                                        <Form.Field width={16}>
                                            <label>{t("buyBTC.modal.changeFactor")}</label>
										<span>
											1 {this.props.currencyReceive}
											{" = "}
											<NumberFormat
												value={this.props.factorToShow}
												decimalScale={2}
												displayType={"text"}
												thousandSeparator={true}
											/>{" "}
											{this.props.currencyLabelSelected}
										</span>
										{this.props.factorInverseToShow > "0.00000001" && (<div>
												 <br></br><span>
                                                1 {this.props.currencyLabelSelected}
                                                {" = "}
                                                <NumberFormat
                                                    value={this.props.factorInverseToShow}
														decimalScale={
															this.props.currencyReceive === "BTC" ||
                                                        	this.props.currencyReceive === "ETH"
                                                        	? 8
                                                        	: 2}
                                                    displayType={"text"}
                                                    thousandSeparator={true}
                                                />{" "}
                                                {this.props.currencyReceive}
                                            </span></div>)}
                                        </Form.Field>
                                        <Form.Field>
                                            <label>
                                                {t("buyBTC.modal.amountReceive")}
                                            </label>
                                            <NumberFormat
                                                value={this.props.amountReceiveToShow}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                decimalSeparator='.'
                                                decimalScale={this.props.currencyReceive === "USDT"
                                                        ? 2
                                                        : 8}
                                                prefix={this.props.currencyReceive + " "}
                                            />
															
                                        </Form.Field>
                                    </Grid.Column>
                                </Grid.Row>

                            {!this.state.showModalReceipt && (
                                <Grid.Row centered>
                                     {this.state.alerts.map(([key, value]) => {
              							let messageAndColor = [];
              							if (key.includes(":")) {
                							messageAndColor = key.split(":");
              							}
              							return (
                							<div style={{ paddingBottom: 10 }}>
                  								<label
                    							style={{color: messageAndColor.length > 0 ? 
													messageAndColor[0].toString().toLowerCase() 
													: "blue",
                    								}}
                  								>
                    								{messageAndColor.length > 0 ? messageAndColor[1] : key}
                  								</label>
                							</div>
              							);
            						})}
                                </Grid.Row>
                            )}
							{!this.state.showModalReceipt && (
                                <Grid.Row>
									
								<Form.Checkbox
									onChange={this.handleConditions.bind(this)}
									checked={this.state.conditions}
								/>
								<Form.Field>
									<label style={{ paddingLeft: 15}}>
										{t("registration.form.terms.first")}
										<a href='#' onClick={this.onClickTermsAndConditions.bind(this)}>
											{t("registration.form.terms.second")}
										</a>
									</label>
								</Form.Field>
							</Grid.Row>)}
                            {this.state.showModalReceipt && (
                                <Grid.Row centered>
                                        <Button
                                            loading={this.state.buttonLoader}
                                            disabled={this.state.buttonLoader}
                                            floated='center'
                                            onClick={this.printInvoice.bind(this)}>
                                            {t("fastChange.print")}
                                        </Button>
                                </Grid.Row>
                            )}
                        </Grid>
                    </Segment>
                </Form>
                {(this.state.fastChangeSucess ||
                    this.state.fastChangeBalance ||
                    this.state.fastChangeError ||
                    this.state.fastChangeErrorPrice ||
                    this.state.fastChangeLimitDayly ||
                    this.state.fastChangeLimitMonthly || this.state.emptyConditions) && (
                        <Grid>
                            <Grid.Column width={2}></Grid.Column>
                            <Grid.Column width={12}>
                                {labelconfirmMessage}
                                {labelconfirmMessageError}
                                {labelErrorBalance}
								{labelErrorConditions}
                            </Grid.Column>
                            <Grid.Column width={2}></Grid.Column>
                        </Grid>
                    )}
            </Modal.Content>
            {!this.state.fastChangeSucess &&
                !this.state.fastChangeError &&
                !this.state.fastChangeErrorPrice &&
                !this.state.fastChangeBalance &&
                !this.state.fastChangeLimitDayly && (
                    <Modal.Actions className='actions-modal'>
                        {!this.state.showModalReceipt ? (
                            <div>
                                <Button secondary onClick={this.closeModal.bind(this)}>
                                    {t("buyBTC.modal.cancel")}
                                </Button>

                                <Button
                                    loading={this.state.buttonLoader}
                                    disabled={this.state.buttonLoader}
                                    floated='center'
                                    onClick={this.buyCrypto.bind(this)}>
                                    {t("buyBTC.modal.accept")}
                                </Button>
                            </div>
                        ) : (
                            <Button
                                secondary
								active={!this.state.conditions}
                                onClick={this.initModal.bind(this)}>
                                {t("buyBTC.modal.close")}
                            </Button>
                        )}
                    </Modal.Actions>
                )}
            {(this.state.fastChangeSucess ||
                this.state.fastChangeBalance ||
                this.state.fastChangeError ||
                this.state.fastChangeErrorPrice ||
                this.state.fastChangeLimitDayly ||
                this.state.fastChangeLimitMonthly) && (
                    <Modal.Actions className='actions-modal'>
                        <Button
                            secondary
                            floated='right'
                            style={{ marginLeft: 40, paddingButton: 10 }}
                            onClick={this.initModal.bind(this)}>
                            {t("buyBTC.modal.close")}
					</Button>
					<Divider hidden></Divider>
                    </Modal.Actions>
                )}
        </Modal><Modal open={this.state.seeTermsAndConditions}>
					<Modal.Header>{t("registration.modalTerms.header")}</Modal.Header>
					<Modal.Content>
						<TermsAndConditions />
					</Modal.Content>
					<Modal.Actions>
						<Button
							secondary
							onClick={this.onClickCloseModalTermsAndConditions.bind(this)}>
							{t("registration.modalTerms.closeButton")}
						</Button>
						<Button color='blue' onClick={this.agree.bind(this)}>
							{t("registration.modalTerms.agreeButton")}
						</Button>
					</Modal.Actions>
				</Modal></div>)
		
    
    }
}
export default translate(ModalBuyBTC);

