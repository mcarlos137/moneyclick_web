	import { Component, isValidElement } from "react";
import {
	Grid,
	Form,
	Button,
	Header,
	Image,
	Modal,
	Label,
	Divider,
	Segment,
	Loader,
	Message,
	Container,
	Select,
} from "semantic-ui-react";
import React from "react";
import CurrencyInput from "react-currency-input";
import "./BuySellBTC.css";
import logo64 from "./logo";
import Receipt from "./Receipt";
import mcIcon from "../../img/splash_mc.jpg";
import { isMobile } from "react-device-detect";
import translate from "../../i18n/translate";
import { parse } from "query-string";
import { filter } from "underscore";
import CurrenciesFlag from "../../common/currencyFlag";
import otcService from "../../services/otc";
import userService from "../../services/user";
import * as jsPDF from "jspdf";
import RetailService from "../../services/moneyclick";
import NumberFormat from "react-number-format";
import icon from "../../img/icn-inactivo-comprar.png";
import { array } from "prop-types";
import user from "../../services/user";
import { Document, Page } from "react-pdf";
import Pdf from "react-to-pdf";
import { find, ImageBase } from "office-ui-fabric-react";

class ModalSellBTC extends Component {
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
            operationDate: ""
        }
    }

    async getMovementUser(source) {
		this.setState({ loadingId: true, loadModal: true });

		try {
			const username = window.sessionStorage.getItem("username");
			const response = await user.getMovementsUser(username);

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
							let findCurren = this.props.currenciesData.find((currency) => {
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
							let findCurren = this.props.currenciesData.find((currency) => {
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
			let idcrop = this.state.trackId.substr(-7);
			Object.entries(array).forEach(([k, v]) => {
				if (v.idOperation === idcrop) {
					let dateOp = this.formatDate(new Date(v.key));

					let dateAux = new Date(v.key);
					let dateAvailable = dateAux.setDate(dateAux.getDate() + 3);
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
			//this.loadDataToPrinting();
		} catch (error) {
			console.log(error);
		}
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
	async sellCrypto() {
		this.init();
		try {
			let body = {
				userName: window.sessionStorage.getItem("username"),
				fiatCurrency: this.props.currencySelectedReceive,
				cryptoCurrency: this.props.currencyLabelSelected,
				fiatAmount: this.props.amountReceive,
				cryptoAmount: this.props.amountToChange, // amount en btc
			};

		console.log('body sell ', body);
		
			let responsesellbtc = await user.sellCrypto(body);

			if (responsesellbtc.data.includes("OK")) {
				this.setState({
					fastChangeSucess: true,
					buttonLoader: false,
					trackId: responsesellbtc.data.split("__")[1],
					showModalReceipt: true
				});
			} else {
				if (responsesellbtc.data === "THERE IS NO PRICE FOR THIS CURRENCY") {
					this.setState({
						fastChangeError: true,
						buttonLoader: false,
					});
					setTimeout(() => {
						this.setState({ fastChangeError: false });
						//	this.handleClose();
					}, 5000);
				} else if (responsesellbtc.data === "DOES NOT HAVE ENOUGH BALANCE") {
					this.setState({
						fastChangeBalance: true,
						buttonLoader: false,
					});
					setTimeout(() => {
						this.setState({ fastChangeBalance: false });
						//	this.handleClose();
					}, 8000);
				} else {
					if (responsesellbtc.data === "USER DAYLY LIMIT REACHED") {
						this.setState({
							fastChangeLimitDayly: true,
							buttonLoader: false,
						});
						setTimeout(() => {
							this.setState({ fastChangeLimitDayly: false });
							//	this.handleClose();
						}, 8000);
					}

					if (responsesellbtc.data === "USER MONTHLY LIMIT REACHED") {
						this.setState({
							fastChangeLimitMonthly: true,
							buttonLoader: false,
						});
						setTimeout(() => {
							this.setState({ fastChangeLimitMonthly: false });
							//	this.handleClose();
						}, 8000);
					}
					if (responsesellbtc.data.includes("ICE CHANGE")) {
						this.setState({
							fastChangeErrorPrice: true,
							buttonLoader: false,
						});
						setTimeout(() => {
							this.setState({ fastChangeErrorPrice: false });
							//	this.handleClose();
						}, 7000);
					}
				}
			}
		} catch (error) {
			console.log(error);
			this.setState({ errorInRed: true, formLoad: false });
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

    render() {
        let t = this.state.translator;
        	let labelconfirmMessage,
			labelconfirmMessageError,
			labelErrorBalance;
		
		if (this.state.fastChangeSucess) {
			labelconfirmMessage = (
				<Message info>
					<Message.Header>{t("fastChange.send.success")}</Message.Header>
					<p>{t("fastChange.send.successmessage")}</p>
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
        return (<Modal
            open={this.props.showModalFastChange}
            onClose={this.handleClose}
            size='small'>
            {this.state.showModalReceipt && (
                <Header
                    content={t("sellBTC.modal.sellReceipt")}
                />
            )}
            {!this.state.showModalReceipt && (
                <Header
                    content={t("fastChange.dataOperationSell")}
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
																{t("sellBTC.modal.amountSend")}
															</label>
															<NumberFormat
																value={this.props.amountToChange}
																displayType={"text"}
																thousandSeparator={true}
																decimalScale={8}
																prefix={this.props.currencyLabelSelected + " "}
															/>
														</Form.Field>
															<Form.Field width={16}>
															<label>{t("sellBTC.modal.changeFactor")}</label>
															<span>
																1 {this.props.currencyLabelSelected}
																{" = "}
																<NumberFormat
																	value={this.props.factorToShow}
																	decimalScale={
																		this.props.factorToShow >= 1
																			? 2
																			: this.props.factorToShow < 0.00001
																				? 12
																				: 8
																	}
																	displayType={"text"}
																	thousandSeparator={true}
																/>{" "}
																{this.props.currencyReceive}
															</span>
															<br></br>
										{this.props.factorInverseToShow > "0.000000001" && (<span>
											1 {this.props.currencyReceive}
											{" = "}
											<NumberFormat
												value={this.props.factorInverseToShow}
												decimalScale={
													this.props.factorInverseToShow >= 1
														? 2
														: this.props.factorInverseToShow < 0.00001
															? 12
															: 8
												}
												displayType={"text"}
												thousandSeparator={true}
											/>{" "}
											{this.props.currencyLabelSelected}
										</span>)}
														</Form.Field>
													</Grid.Column>
													<Grid.Column textAlign={"center"}>
														<Form.Field>
															<label>
																{t("sellBTC.modal.amountReceive")}
															</label>
															<NumberFormat
																value={this.props.amountReceive}
																displayType={"text"}
																thousandSeparator={true}
																decimalSeparator='.'
																decimalScale={2}
																prefix={this.props.currencySelectedReceive + " "}
															/>
															
														</Form.Field>
															<Form.Field>
															<label>{t("sellBTC.modal.Commission")}</label>
															<NumberFormat
																decimalScale={2}
																value={
																	this.props.commisionByOperarion !== 0
																		? this.props.commisionByOperarion
																		: 0
																}
																prefix={this.props.currencySelectedReceive + " "}
																displayType={"text"}
																thousandSeparator={true}
															/>
														</Form.Field>
														{this.props.taxVat !== 0 && (<Form.Group inline>
															<Form.Field>
																<label>Tax</label>
																<span>
																	<NumberFormat
																		decimalScale={2}
																		value={
																			this.props.taxVat === 0
																				? 0
																				: this.props.taxVat === ""
																					? 0
																					: this.props.taxVat === undefined
																						? 0
																						: this.props.taxVat === null
																							? 0
																							: this.props.taxVat
																		}
																		displayType={"text"}
																		thousandSeparator={true}
																	/>{" "}
																	{/* {this.props.currencyLabelSelected} */}
																	{this.props.currencyOfCharges !== "BTC"
																		? this.props.currencySelectedReceive
																		: this.props.currencyLabelSelected}{" "}
																</span>
															</Form.Field>
														</Form.Group>)}
														<Form.Field width={16}>
														<label>
															{t("sellBTC.modal.totalToReceive")}
														</label>
														<NumberFormat
															value={this.props.totalToReceive}
															displayType={"text"}
															thousandSeparator={true}
															decimalSeparator='.'
															decimalScale={2}
															prefix={this.props.currencySelectedReceive + " "}
														/>
														<span>
														</span>
														</Form.Field>
														
														</Grid.Column>
												</Grid.Row>
                        </Grid>
                    </Segment>
                </Form>
                {(this.state.fastChangeSucess ||
                    this.state.fastChangeBalance ||
                    this.state.fastChangeError ||
                    this.state.fastChangeErrorPrice ||
                    this.state.fastChangeLimitDayly ||
                    this.state.fastChangeLimitMonthly) && (
                        <Grid>
                            <Grid.Column width={2}></Grid.Column>
                            <Grid.Column width={12}>
                                {labelconfirmMessage}
                                {labelconfirmMessageError}
                                {labelErrorBalance}
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
                                    onClick={this.sellCrypto.bind(this)}>
                                    {t("buyBTC.modal.accept")}
                                </Button>
                            </div>
                        ) : (
                            <Button
                                secondary
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
                            style={{ marginLeft: 40 }}
                            onClick={this.initModal.bind(this)}>
                            {t("buyBTC.modal.close")}
                        </Button>
                        <Divider hidden></Divider>
                    </Modal.Actions>
                )}
        </Modal>)
    
    }
}
export default translate(ModalSellBTC);

