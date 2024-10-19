import React, { Component } from "react";
import ISOCURRENCIES from "../../../common/ISO4217";
import "../../HomeLoggedIn/HomeLoggedNew.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "../../../Components/Admin.css";
import {
	Form,
	Button,
	Divider,
	Icon,
	Header,
	List,
	Loader,
	Dimmer,
	Image,
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
	Grid,
} from "semantic-ui-react";

import currencyFlag from "../../../common/currencyFlag";
import ReactTable from "react-table";
import NumberFormat from "react-number-format";
import user from "../../../services/user";
import otc from "../../../services/otc";
import _ from "underscore";
import translate from "../../../i18n/translate";
class Scrow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			translator: props.translate,
			currencyLabelSelected: "",
			loadTable: false,
			currentIndex: 0,
			currenciesSelect: [],
			imgCurrencySelected: "",
			scrowBalance: [],
			data: [],
			successOperationScrow: false,
			errorOperationScrow: false,
			formLoad: false,
			openConfirm: false,
			WhatsToShow: "",
			initTimestamp: "",
			messageOperation: "",
			finalTimestamp: "",
			amountScrow: "",
		};
	}
	responsive = {
		0: { items: 1 },
		600: { items: 3 },
		1024: { items: 3 },
	};
	componentWillReceiveProps(nextProps, nextContext) {
		if (this.props.language !== nextProps.language) {
			this.setState({
				translator: nextProps.translate,
			});
		}
	}

	addScrow() {
		this.setState({ formLoad: true });
		let body = {
			userName: user.getUserName(),
			currency: this.state.currencyLabelSelected,
			amount: Number(this.state.amountScrow),
		};

		otc
			.addScrow(body)
			.then((resp) => {
				//	console.log(resp);
				if (resp.data.includes("OK")) {
					this.setState({
						formLoad: false,
						successOperationScrow: true,
						messageOperation: "fastChange.send.successmessage",
					});

					setTimeout(() => {
						this.setState({
							successOperationScrow: false,
							messageOperation: "",
							openConfirm: false,
							currencyLabelSelected: "",
							amountScrow: "",
							imgCurrencySelected: "",
						});
						//	this.getCurrencies();
						this.getScrowBalance();
					}, 5000);
				} else if (resp.data === "DOES NOT HAVE ENOUGH BALANCE") {
					this.setState({
						formLoad: false,
						errorOperationScrow: true,
						messageOperation: "sendMoneyClick.modal.withoutBalance",
					});

					setTimeout(() => {
						this.setState({
							errorOperationScrow: false,
							messageOperation: "",
							openConfirm: false,
						});
					}, 5000);
				} else {
					this.setState({
						formLoad: false,
						errorOperationScrow: true,
						messageOperation: "fastChange.send.fail",
					});

					setTimeout(() => {
						this.setState({
							errorOperationScrow: false,
							messageOperation: "",
							openConfirm: false,
						});
					}, 5000);
				}
			})
			.catch((error) => {
				this.setState({
					formLoad: false,
					errorOperationScrow: true,
					messageOperation: "fastChange.send.fail",
				});

				setTimeout(() => {
					this.setState({
						errorOperationScrow: false,
						messageOperation: "",
						openConfirm: false,
					});
				}, 5000);
				//	console.log(error);
			});
	}

	componentDidMount() {
		this._isMounted = true;
		this.getCurrencies();
		this.getScrowBalance();
	}
	getImageCurrency(currency) {
		let currencySelected = currencyFlag.currenciesFlag[currency];
		//console.log("getImageCurrency ", currency, currencySelected);
		if (currencySelected !== undefined) {
			this.setState({
				imgCurrencySelected: currencySelected.img,
			});
		}
	}
	getCurrencies() {
		let arrayCurrenciesSelect = [];
		this.setState({ loadForm: true });
		otc
			.getCurrenciesBankers(user.getUserName())
			.then((response) => {
				this.setState({ loadForm: false });
				response.data.map((currency) => {
					let item = {};
					item.text = currency.fullName;
					item.value = currency.shortName;
					item.key = currency.shortName;
					arrayCurrenciesSelect.push(item);
					return currency;
				});

				this.setState({
					// currencies: response.data,
					currenciesSelect: arrayCurrenciesSelect,
				});
			})
			.catch((error) => {
				console.log("error ", error);
			});
	}
	removeScrow() {
		this.setState({ formLoad: true });
		let body = {
			userName: user.getUserName(),
			currency: this.state.currencyLabelSelected,
			amount: Number(this.state.amountScrow),
		};

		otc
			.removeScrow(body)
			.then((resp) => {
				//	console.log(resp);
				if (resp.data === "OK") {
					this.setState({
						formLoad: false,
						successOperationScrow: true,
						messageOperation: "fastChange.send.successmessage",
					});

					setTimeout(() => {
						this.setState({
							successOperationScrow: false,
							messageOperation: "",
							openConfirm: false,
							currencyLabelSelected: "",
							amountScrow: "",
							imgCurrencySelected: "",
						});

						this.getScrowBalance();
					}, 5000);
				} else if (resp.data === "DOES NOT HAVE ENOUGH BALANCE") {
					this.setState({
						formLoad: false,
						errorOperationScrow: true,
						messageOperation: "sendMoneyClick.modal.withoutBalance",
					});

					setTimeout(() => {
						this.setState({
							errorOperationScrow: false,
							messageOperation: "",
							openConfirm: false,
						});
					}, 5000);
				}
			})
			.catch((error) => {
				console.log(error);
				this.setState({
					formLoad: false,
					errorOperationScrow: true,
					messageOperation: "fastChange.send.fail",
				});

				setTimeout(() => {
					this.setState({
						errorOperationScrow: false,
						messageOperation: "",
						openConfirm: false,
					});
				}, 5000);
			});
	}

	getScrowBalance() {
		otc
			.getScrowBalance(user.getUserName())
			.then((resp) => {
				//	console.log(resp.data);
				if (
					resp.data.length !== 0 &&
					resp.data !== null &&
					typeof resp.data !== 'undefined' &&
					resp.data !== ""
				) {
					let arr = [];
					let body1 = {};

					let currency = [];
					let body2 = {};
					Object.entries(currencyFlag).forEach(([k, v]) => {
						Object.entries(v).forEach(([ki, vi]) => {
							body2 = {
								currency: ki,
								img: vi.img,
							};
							currency.push(body2);
						});
					});
					//	console.log(currency);
					Object.entries(resp.data).forEach(([k, v]) => {
						let curren = currency.find(function (element) {
							if (element.currency === v.currency) {
								body1 = {
									currency: v.currency,
									amount: v.amount,
									img: element.img,
								};
								arr.push(body1);
								//	console.log(arr);
							}
						});
					});

					this.setState({ scrowBalance: arr });
					//console.log(this.state.scrowBalance);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}
	handleAmount(values) {
		const { value } = values;
		this.setState({
			amountScrow: value,
		});
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

	getScrowMovements() {
		// this.setState({ loadTable: true });
		let array1 = [];
		this.setState({ data: [] });
		if (
			this.state.currencyLabelSelected !== undefined &&
			this.state.currencyLabelSelected !== "" &&
			this.state.dateFrom !== undefined &&
			this.state.dateFrom !== "" &&
			this.state.dateTo !== undefined &&
			this.state.dateTo !== ""
		) {
			otc
				.getScrowMovements(
					user.getUserName(),
					this.state.currencyLabelSelected,
					this.state.dateFrom,
					this.state.dateTo,
				)
				.then((resp) => {
					let preprocess = resp.data;
					let body = {};

					Object.entries(preprocess).forEach(([key, value]) => {
						let statusOp = {};
						let receiver,
							amountOp,
							currencyOp,
							typeAmount,
							dateOperation2,
							dateOperation,
							sended,
							initialAmount,
							comision,
							typeOp,
							typeOp2;
						dateOperation = key.split("__")[0];
						dateOperation2 = this.formatDate(new Date(dateOperation));
						let t = this.state.translator;
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
							}
							if (inerKey === "substractedAmount") {
								sended = "true";
								currencyOp = inerValue.currency;
								typeAmount = "substractedAmount";
								if (currencyOp === "BTC") {
									initialAmount = this.floorDecimals(
										inerValue.initialAmount,
										8,
									);
									comision = this.floorDecimals(
										inerValue.amount - inerValue.initialAmount,
										8,
									);
								} else {
									initialAmount = this.floorDecimals(
										inerValue.initialAmount,
										2,
									);
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
							}
							if (inerKey === "balanceOperationType") {
								typeOp = inerValue;

								let val = typeOp
									.toLocaleString("en-US", {
										maximumFractionDigits: 12,
									})
									.toLowerCase();

								let translate =
									"homeLoggedIn.transactions.detail.labels." + val;
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
								//console.log(statusOp);
							}
						});
						let ob = {
							initialAmount: initialAmount,
							//	comision: comision,
							//	sended: sended,
							//	receiver: receiver,
							currency: currencyOp,
							amount: amountOp,
							status: statusOp,
							type: typeOp2,
							date: dateOperation2,
							key: dateOperation,
							//	btcPrice: btcPrice,
							//	flag: flagData,
							//	style: "",
							//	user: user,
							//	description: description,
							//	canceledReason: canceledReason,
							//	fulladdress: fulladdress,
							typeOp: typeOp,
							//		accountAddress: accountAddress,
							//		accountHolderName: accountHolderName,
							//	accountNumber: accountNumber,
							//		accountZip: accountZip,
							//	automaticCharge: automaticCharge,
							//	bank: bank,
							//	bankRoutingNumber: bankRoutingNumber,
							//	bankSwiftCode: bankSwiftCode,
							//currencySend: currencySend,
							//		typeSend: typeSend,
							//	verified: verified,
							//	zelle: zelle,
							typeAmount: typeAmount,
						};

						array1.push(ob);
					});
					// array.sort((a, b) => {
					// 	return new Date(b.key).getTime() - new Date(a.key).getTime();
					// });
					//	console.log(array1);
					this.setState({ data: array1 });
					//	console.log(this.state.data);
					this.setState({ loadTable: false }); //
				})
				.catch((error) => {
					this.setState({ loadTable: false });
					console.log(error);
				});
		}
	}
	floorDecimals = (value, numberDecimals) => {
		let decimales = Math.pow(10, numberDecimals);
		return Math.floor(value * decimales) / decimales;
	};

	handleChangeCurrencySelect(e, data) {
		if (data !== null && data !== undefined && data !== "") {
			this.setState({
				currencyLabelSelected: data.value,
			});
			this.getImageCurrency(data.value);
		} else {
			this.setState({
				currencyLabelSelected: "",
			});
		}
	}

	handleChangeOptionsScrow(e, data) {
		this.setState({
			WhatsToShow: data.value,
			amountScrow: "",
			currencyLabelSelected: "",
			imgCurrencySelected: "",
		});
	}
	aceptSendConfirm() {
		//this.setState({ formLoad: true });if)=
		if (this.state.WhatsToShow === "removeScrow") {
			this.removeScrow();
		} else {
			this.addScrow();
		}
	}
	closeSendConfirm() {
		this.setState({
			openConfirm: false,
		});
	}
	pickDateFrom(e, date) {
		this.setState({ dateFrom: e.target.value });
	}

	pickDateTo(e, date1) {
		this.setState({ dateTo: e.target.value });
	}

	slideTo(i) {
		if (this._isMounted) {
			this.setState({ currentIndex: i });
		}
	}
	onSlideChange(e) {}
	onSlideChanged(e) {
		if (this._isMounted) {
			this.setState({ currentIndex: e.item });
		}
	}

	slideNext() {
		if (this._isMounted) {
			this.setState({ currentIndex: this.state.currentIndex + 1 });
		}
	}

	slidePrev() {
		if (this._isMounted) {
			this.setState({ currentIndex: this.state.currentIndex - 1 });
		}
	}
	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		let currentIndex, carouselBalance;
		currentIndex = this.state.currentIndex;
		let t = this.state.translator;
		let oldlanguage = this.state.language;
		let newlanguage = window.sessionStorage.getItem("language");
		let wordbalance =
			this.state.language === "es" ? "Saldo en Garantia" : "Escrow Balance";
		if (oldlanguage !== newlanguage) {
			this.getScrowMovements();

			this.setState({
				language: newlanguage,
			});
		}
		let statusLabelNew = (status) => {
			return (
				<Label size='mini' color={status.color}>
					<Icon name={status.icon} />
					{status.name}
				</Label>
			);
		};
		const paymentMovementsTableHeaders = [
			{
				Header: t("homeLoggedIn.transactions.detail.labels.date"),
				accessor: "date",
			},
			{
				Header: t("profile.optionDevices.tableHeader.operation"),
				accessor: "typeOp",
				Cell: (row) => {
					if (row.value === "BANKER_REMOVE_BALANCE") {
						return "Resta de Escrow";
					} else if (row.value === "BANKER_ADD_BALANCE") {
						return "Recarga de Escrow";
					} else {
						return row.value;
					}
				},
			},
			{
				Header: t("homeLoggedIn.transactions.detail.labels.amount2"),
				accessor: "amount",
				getProps: (state, rowInfo, column) => {
					return {
						style: {
							textAlign: "right",
						},
					};
				},
				Cell: (row) =>
					row.original.typeOp === "BANKER_ADD_BALANCE" ? (
						<p style={{ color: "green" }}>
							<NumberFormat
								value={this.floorDecimals(row.value, 8)}
								displayType={"text"}
								thousandSeparator={true}
							/>
						</p>
					) : (
						<p style={{ color: "red" }}>
							<NumberFormat
								value={this.floorDecimals(row.value, 8)}
								displayType={"text"}
								thousandSeparator={true}
							/>
						</p>
					),
				width: 200,
			},
			{
				Header: t("profile.optionDevices.tableHeader.status"),
				accessor: "status",
				Cell: (row) => {
					if (row.value === "OK") {
						return (
							<Label color='green'>
								<Icon name='check circle' />
								OK
							</Label>
						);
					} else if (row.value === "PROCESSING") {
						return (
							<Label color='blue'>
								<Icon name='sync' loading />
								{/* PROCESANDO */}
								{t("receiveBitcoins.table.cells.processing")}
							</Label>
						);
					} else if (row.value === "FAIL") {
						return (
							<Popup
								trigger={
									<Label color='red'>
										<Icon name='warning circle' />
										{t("receiveBitcoins.table.cells.failure")}
									</Label>
								}
								content={row.original.message}
								on='hover'
							/>
						);
					}
				},
				width: 150,
			},
		];

		const transactionTableHeaders = [
			{
				Header: t("homeLoggedIn.tableHeaders.date"),
				accessor: "date",

				width: 200,
				//	filterMethod: (filter, row) => customOptionsFilterMethod2(filter, row),
			},
			{
				Header: t("homeLoggedIn.tableHeaders.operation"),
				accessor: "type",
				width: 200,
				filterable: true,
				//	filterMethod: (filter, row) => customOptionsFilterMethod(filter, row),
			},
			{
				Header: t("homeLoggedIn.tableHeaders.amount"),
				accessor: "amount",
				filterable: true,
				getProps: () => {
					return {
						style: {
							textAlign: "right",
						},
					};
				},
				width: 70,
				Cell: (row) => {
					if (row.value !== null) {
						let number = row.value.toString();
						if (number.includes("e")) {
							let neww = row.value.toFixed(8);
							return <div> {neww}</div>;
						} else {
							return (
								<NumberFormat
									value={row.value}
									displayType={"text"}
									thousandSeparator={true}
									style={{
										color:
											row.original.typeAmount === "addedAmount"
												? "#4c9917"
												: "#db2828",
									}}
								/>
							);
						}
					} else {
						return "N/A";
					}
				},
			},
			{
				Header: t("homeLoggedIn.tableHeaders.currency"),
				accessor: "currency",
				minWidth: 70,
				filterable: true,
				//	filterMethod: (filter, row) => customOptionsFilterMethod3(filter, row),
				// Cell: (row) =>
				// {
				// if (row.value !== "ETH") {
				//   return (
				//     <div>
				//       <Flag name={row.original.flag} /> {row.value}
				//     </div>
				//   );
				// } else {
				//   return (
				//     <div>
				//       <Icon name={row.original.icon} /> {row.value}
				//     </div>
				//   );
				// }
				//}
			},
			{
				Header: t("homeLoggedIn.tableHeaders.status"),
				accessor: "status",
				filterable: true,
				sortable: false,
				minWidth: 90,
				//	filterMethod: (filter, row) => customOptionsFilterMethod4(filter, row),
				Cell: (row) => {
					return statusLabelNew(row.value);
				},
			},
		];

		let optionsScrow = [
			{
				key: "addScrow",
				text: t("nav.addScrow"),
				value: "addScrow",
			},
			{
				key: "removeScrow",
				text: t("nav.removeScrow"),
				value: "removeScrow",
			},
			{
				key: "getMovementsScrow",
				text: t("recharge.escrow.getMovementsScrow"),
				value: "getMovementsScrow",
			},
		];

		let labelMessageError, labelMessageSuccess;
		if (this.state.errorOperationScrow) {
			let content = t(this.state.messageOperation);
			labelMessageError = <Message error content={content} />;
		}
		if (this.state.successOperationScrow) {
			let content = t(this.state.messageOperation);
			labelMessageSuccess = <Message success content={content} />;
		}

		let listItem2 = this.state.scrowBalance.map((item, i) => (
			<Segment key={`key-${i}`} basic>
				<Grid centered>
					<Grid.Column width={1}></Grid.Column>
					<Grid.Column width={14}>
						<Form>
							<Form.Group inline>
								<Image
									// style={{ marginLeft: "150px" }}
									size='mini'
									circular
									src={item.img}
								/>
								<h4 className='title-balance'>
									{" "}
									{wordbalance} {item.currency}
								</h4>
							</Form.Group>
						</Form>

						<p className='balance' style={{ textAlign: "center" }}>
							<NumberFormat
								value={this.floorDecimals(
									item.amount,
									item.currency === "BTC" || item.currency === "ETH" ? 8 : 2,
								)}
								displayType={"text"}
								thousandSeparator={true}
							/>
						</p>
					</Grid.Column>
					<Grid.Column width={1}></Grid.Column>
				</Grid>
			</Segment>
		));

		if (this._isMounted) {
			carouselBalance = (
				<AliceCarousel
					id='alice-custom'
					items={listItem2}
					autoPlay={false}
					startIndex={currentIndex}
					fadeOutAnimation={true}
					mouseDragEnabled={false}
					playButtonEnabled={false}
					autoPlayInterval={4000}
					buttonsDisabled={true}
					keysControlDisabled={true}
					dotsDisabled={true}
					responsive={this.responsive}
					disableAutoPlayOnAction={true}
					onSlideChange={this.onSlideChange}
					onSlideChanged={this.onSlideChanged}
					itemsInSlide={3}
				/>
			);
		}
		return (
			<div>
				<Segment>
					<Grid>
						<Grid.Row verticalAlign='top' textAlign='center'>
							<Grid.Column
								largeScreen={1}
								computer={1}
								widescreen={1}
								tablet={1}
								verticalAlign='middle'
								textAlign='center'>
								<Button
									basic
									name='left'
									circular
									icon='angle left'
									onClick={this.slidePrev.bind(this)}
									className='button-carousel-balance'
								/>
							</Grid.Column>
							<Grid.Column
								largeScreen={14}
								computer={14}
								widescreen={14}
								tablet={14}>
								<Segment
									basic
									style={{
										backgroundColor: "#f4f4f4",
									}}
									loading={this.state.scrowBalance.length <= 0}>
									{carouselBalance}
								</Segment>
							</Grid.Column>
							<Grid.Column
								largeScreen={1}
								computer={1}
								widescreen={1}
								tablet={1}
								verticalAlign='middle'
								textAlign='center'>
								<Button
									basic
									name='right'
									circular
									icon='angle right'
									style={{
										marginLeft: -8,
									}}
									className='button-carousel-balance'
									onClick={this.slideNext.bind(this)}
								/>
							</Grid.Column>
						</Grid.Row>
					</Grid>

					<Grid centered>
						<Grid.Row centered>
							<Grid.Column width={3}></Grid.Column>
							<Grid.Column textAlign={"center"} width={10}>
								<Segment basic>
									<Form textAlign='center'>
										<Form.Field textAlign='center'>
											<label>{t("recharge.escrow.wish")}</label>

											<Select
												placeholder={t(
													"homeLoggedIn.transactions.detail.labels.select",
												)}
												style={{ marginLeft: "10px" }}
												options={optionsScrow}
												onChange={this.handleChangeOptionsScrow.bind(
													this,
												)}></Select>
										</Form.Field>
									</Form>
								</Segment>
							</Grid.Column>
							<Grid.Column width={3}></Grid.Column>
						</Grid.Row>
					</Grid>
					<Grid centered>
						<Grid.Row>
							<Grid.Column width={3}></Grid.Column>
							<Grid.Column width={10} textAlign='center'>
								{this.state.WhatsToShow !== "" &&
									this.state.WhatsToShow !== "getMovementsScrow" && (
										<Form>
											<Form.Group>
												<Form.Field style={{ marginLeft: "30px" }}>
													<label>{t("recharge.escrow.currency")}</label>
													<Select
														search
														placeholder={t(
															"homeLoggedIn.transactions.detail.labels.select",
														)}
														options={this.state.currenciesSelect}
														onChange={this.handleChangeCurrencySelect.bind(
															this,
														)}
														value={this.state.currencyLabelSelected}
													/>
												</Form.Field>

												<Form.Field style={{ marginLeft: "20px" }}>
													<Divider hidden style={{ marginBottom: "3.5px" }} />
													<Image
														size='mini'
														circular
														src={this.state.imgCurrencySelected}
													/>
												</Form.Field>

												<Form.Field style={{ marginLeft: "20px" }}>
													<label>{t("sendBitcoins.amount")}</label>
													<NumberFormat
														value={this.state.amountScrow}
														allowNegative={false}
														thousandSeparator={true}
														//placeholder={this.state.currencyLabelSelected}
														onValueChange={this.handleAmount.bind(this)}
														name='fiat'
													/>
												</Form.Field>

												{this.state.WhatsToShow === "removeScrow" && (
													<Form.Field>
														<Button
															disabled={
																this.state.currencyLabelSelected === "" ||
																this.state.amountScrow === ""
															}
															color='blue'
															style={{ marginTop: 25, marginLeft: "30px" }}
															type='submit'
															onClick={() => {
																this.setState({
																	openConfirm: true,
																});
															}}>
															{t("nav.remove")}
														</Button>
													</Form.Field>
												)}
												{this.state.WhatsToShow === "addScrow" && (
													<Form.Field>
														<Button
															disabled={
																this.state.currencyLabelSelected === "" ||
																this.state.amountScrow === ""
															}
															color='blue'
															style={{ marginTop: 25, marginLeft: "30px" }}
															type='submit'
															onClick={() => {
																this.setState({
																	openConfirm: true,
																});
															}}>
															{t("nav.add")}
														</Button>
													</Form.Field>
												)}
											</Form.Group>
										</Form>
									)}
							</Grid.Column>
							<Grid.Column width={3}></Grid.Column>
						</Grid.Row>
						<Grid.Row>
							{this.state.WhatsToShow === "getMovementsScrow" && (
								<div>
									<Form>
										<Form.Group>
											<Form.Field>
												<label>
													{t(
														"homeLoggedIn.transactions.detail.labels.currencytoConsult",
													)}
												</label>
												<Select
													search
													placeholder={t(
														"homeLoggedIn.transactions.detail.labels.select",
													)}
													options={this.state.currenciesSelect}
													onChange={this.handleChangeCurrencySelect.bind(this)}
												/>
											</Form.Field>

											<Form.Field>
												<label>
													{" "}
													{t(
														"homeLoggedIn.transactions.detail.labels.initDate",
													)}
												</label>
												<Input
													type='date'
													name='date1'
													onChange={this.pickDateFrom.bind(this)}></Input>
											</Form.Field>

											<Form.Field>
												<label>
													{" "}
													{t("homeLoggedIn.transactions.detail.labels.endDate")}
												</label>
												<Input
													type='date'
													name='date2'
													onChange={this.pickDateTo.bind(this)}></Input>
											</Form.Field>

											<Form.Button
												disabled={
													this.state.currencyLabelSelected === "" ||
													this.state.dateFrom === "" ||
													this.state.dateFrom === undefined ||
													this.state.dateTo === undefined ||
													this.state.dateTo === ""
												}
												icon
												labelPosition='left'
												color='blue'
												style={{ marginTop: 30 }}
												type='submit'
												onClick={this.getScrowMovements.bind(this)}>
												<Icon name='search' />
												{t("homeLoggedIn.transactions.detail.labels.search")}
											</Form.Button>
										</Form.Group>
									</Form>

									{/* <Divider /> */}
									{/* <Header as='h4'>
										{/* Movimientos de los medios de pago consultados 
										{t("profile.optionMovements.movementspaymentMethod")}
									</Header> */}
									{this.state.data.length > 0 && (
										<ReactTable
											loading={this.state.loadTable}
											// defaultSorted={[
											// 	{
											// 		id: "date",
											// 		desc: true,
											// 	},
											// ]}
											className='transactionTable'
											data={this.state.data}
											columns={transactionTableHeaders}
											defaultPageSize={5}
											previousText={t("profile.optionDevices.table.previous")}
											nextText={t("profile.optionDevices.table.next")}
											loadingText={
												t("profile.optionDevices.table.loading") + "..."
											}
											noDataText={t("homeLoggedIn.table.noData")}
											pageText={t("homeLoggedIn.table.page")}
											ofText={t("homeLoggedIn.table.of")}
											rowsText={t("homeLoggedIn.table.rows")}
											pageJumpText={t("profile.optionDevices.table.pageJump")}
											rowsSelectorText={t(
												"profile.optionDevices.table.rowSelector",
											)}
											minRow={5}
										/>
									)}
								</div>
							)}
						</Grid.Row>
					</Grid>

					<Divider hidden></Divider>

					{/* {labelMessageError}
					{labelMessageSuccess} */}
				</Segment>
				<Modal
					open={this.state.openConfirm}
					onClose={this.closeSendConfirm}
					className='Recharge'>
					<Modal.Header>{t("recharge.escrow.escrowOperation")}</Modal.Header>
					<Modal.Content>
						<Modal.Description>
							<label>{t("recharge.escrow.areyouSure")}</label>

							{labelMessageSuccess}
							{labelMessageError}
						</Modal.Description>
					</Modal.Content>
					<Modal.Actions>
						<Button
							secondary
							onClick={this.closeSendConfirm.bind(this)}
							disabled={this.state.formLoad}>
							{"No"}
						</Button>
						<Button
							onClick={this.aceptSendConfirm.bind(this)}
							disabled={
								this.state.formLoad ||
								this.state.successOperationScrow ||
								this.state.errorOperationScrow
							}
							color='blue'>
							{t("recharge.modalConfirm.buttonAccept")}
						</Button>
					</Modal.Actions>
				</Modal>
			</div>
		);
	}
}

export default translate(Scrow);
