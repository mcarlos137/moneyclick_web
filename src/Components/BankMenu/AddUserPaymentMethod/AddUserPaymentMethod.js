import React, { Component } from "react";
import ISOCURRENCIES from "../../../common/ISO4217";
import "../../../Components/Admin.css";
import { Form, Select } from "semantic-ui-react";
import config from "../../../services/config";
import axios from "axios";
import userService from "../../../services/user";
import otc from "../../../services/otc";
import translate from "../../../i18n/translate";

class AddUserPaymentMethod extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listUsersEmail: [],
			userToAdd: "",
			translator: props.translate,
			currenciesToAddOptions: [],
			currencyToAdd: "",
			accountHolderToAdd: "",
			accountHolderIdToAdd: "",
			accountNumberToAdd: "",
		};
	}
	componentWillReceiveProps(nextProps, nextContext) {
		if (this.props.language !== nextProps.language) {
			this.setState({
				translator: nextProps.translate,
			});
		}
	}
	componentWillMount() {
		this.getUsers();
		this.loadCurrenciesToSearch();
	}
	loadCurrenciesToSearch = () => {
		//var url = URL_BASE_DBTC + "/otc/getCurrencies";
		let currency =
			window.sessionStorage.getItem("userType") === "BANKER"
				? otc.getCurrenciesBankers(userService.getUserName())
				: otc.getAdminCurrencies(userService.getUserName());
		currency
			.then((resp) => {
				var currencies = resp.data;
				var selectCurrencies = [];
				let currencyCurrent = {};
				for (var i = 0; i < currencies.length; i++) {
					var currencyToAddSelect = {};
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
				}
				this.setState({ currenciesToAddOptions: selectCurrencies });
			})
			.catch((error) => {
				//console.log(error);
			});
	};
	getUsers = () => {
		userService
			.getUsers()
			.then((resp) => {
				var listUser = resp.data.result.users;
				var listEmail = [];
				for (var i = 0; i < listUser.length; i++) {
					if (
						listUser[i].name !== undefined &&
						listUser[i].name !== "" &&
						listUser[i].name !== null
					) {
						var emailOption = {};
						emailOption.key = i;
						emailOption.value = listUser[i].name;
						emailOption.text = listUser[i].name;
						listEmail.push(emailOption);
					}
				}
				this.setState(
					{
						listUsersEmail: listEmail,
					},
					() => {
						this.setState({
							showUserSearch: true,
						});
					},
				);
			})
			.catch((error) => {
				//console.log(error);
			});
	};
	pickUser = (e, data) => {
		this.setState({
			userToAdd: data.value,
		});
	};
	pickCurrency = (e, data) => {
		this.setState({
			currencyToAdd: data.value,
		});
	};
	handleAccountHolder = (e) => {
		this.setState({ accountHolderToAdd: e.target.value });
	};
	handleAccountHolderId = (e) => {
		this.setState({ accountHolderIdToAdd: e.target.value });
	};
	handleAccountNumber = (e) => {
		this.setState({ accountNumberToAdd: e.target.value });
	};
	render() {
		let t = this.state.translator;
		return (
			<Form>
				<Form.Group widths='equal'>
					<Form.Field>
						<label>
							{t("homeLoggedIn.transactions.detail.sendToPayment.user")}
						</label>
						<Select
							search
							placeholder={t("homeLoggedIn.transactions.detail.labels.select")}
							options={this.state.listUsersEmail}
							onChange={this.pickUser}
						/>
					</Form.Field>
					<Form.Field>
						<label>
							{t("homeLoggedIn.transactions.detail.sendToPayment.currency")}
						</label>
						<Select
							search
							placeholder={t("homeLoggedIn.transactions.detail.labels.select")}
							options={this.state.currenciesToAddOptions}
							onChange={this.pickCurrency}
						/>
					</Form.Field>
					<Form.Field>
						<label>
							{t("homeLoggedIn.transactions.detail.sendToPayment.bank")}
						</label>

						<Select
							search
							placeholder={t("homeLoggedIn.transactions.detail.labels.select")}
							options={this.state.currenciesToAddOptions}
							onChange={this.pickCurrency}
						/>
					</Form.Field>
					<Form.Field>
						<label>
							{t("homeLoggedIn.transactions.detail.labels.paymentMethod")}
						</label>
						<Select
							search
							placeholder={t("homeLoggedIn.transactions.detail.labels.select")}
							options={this.state.currenciesToAddOptions}
							onChange={this.pickCurrency}
						/>
					</Form.Field>
				</Form.Group>
				<Form.Group widths='equal'>
					<Form.Field>
						<label>
							{t(
								"homeLoggedIn.transactions.detail.sendToPayment.accountNumber",
							)}
						</label>
						<input
							placeholder='xxxxx-xxxxxx-xxxxxx-xxxxx'
							onChange={this.handleAccountNumber}
						/>
					</Form.Field>
					<Form.Field>
						<label>
							{" "}
							{t(
								"homeLoggedIn.transactions.detail.sendToPayment.accountHolderName",
							)}
						</label>
						<input
							placeholder='Pedro Manrique'
							onChange={this.handleAccountHolder}
						/>
					</Form.Field>
					<Form.Field>
						<label>
							{t("withdraw.formVerification.numberDocumentIdentity")}
						</label>
						<input
							placeholder='xxxx456xxxx'
							onChange={this.handleAccountHolderId}
						/>
					</Form.Field>
				</Form.Group>
			</Form>
		);
	}
}

export default translate(AddUserPaymentMethod);
