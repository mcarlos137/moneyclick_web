import React, { Component } from "react";
import "../../Admin.css";
import {
	Container,
	Grid,
	Form,
	Divider,
	Icon,
	Header,
	Loader,
	Dimmer,
	Popup,
	Segment,
	Modal,
	Select,
	List,
} from "semantic-ui-react";
import config from "../../../services/config";
import axios from "axios";
import NumberFormat from "react-number-format";
import translate from "../../../i18n/translate";
import userService from "../../../services/user";

import _ from "underscore";

class ProfileBalance extends Component {
	constructor(props) {
		super(props);
		this.state = {
			translator: props.translate,
			listUsersProfiles: [],
			profileToSearch: "",
			flagUser: "",
			profileBalance: null,
			showProfileToSearch: false,
			showProfileDetail: true,
			userInfo: {},
		};
	}
	componentWillReceiveProps(nextProps, nextContext) {
		if (this.props.language !== nextProps.language) {
			this.setState({
				translator: nextProps.translate,
			});
		}
	}
	getActualUserInfo = (allInfo) => {
		var listKeys = Object.keys(allInfo);
		var listActualKeys = [];
		var actualfirstNameKey;
		var actualLastnameKey;
		var actualPhoneKey;
		var actualFlag;
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
		var actualWallets;
		var isACompany = false;
		for (var i = 0; i < listKeys.length; i++) {
			if (listKeys[i] === "company") {
				isACompany = true;
			}
			if (listKeys[i].startsWith("firstName")) {
				actualfirstNameKey = listKeys[i];
			} else if (listKeys[i].startsWith("flag")) {
				actualFlag = listKeys[i];
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
			} else if (listKeys[i].startsWith("wallets")) {
				actualWallets = listKeys[i];
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
			actualFlag,
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
			actualWallets,
			"address",
			"operationAccount",
			"environment",
			"type",
			"active",
			"email",
		);
		var allKeys = listActualKeys.concat(otherKeys);
		var modifiedObj = _.pick(allInfo, [allKeys]);
		var normalizeObject = { other: [] };
		Object.entries(modifiedObj).forEach(([key, value]) => {
			if (key.startsWith("firstName")) {
				normalizeObject.firstName = value;
			} else if (key.startsWith("flag")) {
				Object.entries(value).forEach(([k, v]) => {
					if (k === "color") {
						normalizeObject.flag = v;
						this.setState({ flagUser: v });
					}
				});
				// normalizeObject.flag = value;
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
	openUserDetailModal = (user) => {
		this.getUserConfig(user);
	};
	getUserConfig = (username) => {
		this.setState({ flagUser: "", userSelected: username });
		userService
			.getConfigUserGeneral(username)
			.then((resp) => {
				var lastUserInfo = this.getActualUserInfo(resp.data.result);
				// console.log(lastUserInfo.other);
				// Object.entries(lastUserInfo.other).map((k) => {
				// 	console.log(k.dataName);
				// 	console.log(k.dataValue);
				// });
				//	console.log("lastUserInfo:", lastUserInfo);
				this.setState({
					userInfo: lastUserInfo,
					userDetailModal: true,
				});
			})
			.catch((error) => {
				//console.log(error);
			});
	};
	componentDidMount() {
		this.getUsersProfile();
	}
	getUsersProfile = () => {
		var profiles = [
			{ key: "NORMAL", value: "NORMAL", text: "NORMAL" },
			{ key: "ADMIN", value: "ADMIN", text: "ADMIN" },
			{
				key: "PRO_TRADER_MASTER",
				value: "PRO_TRADER_MASTER",
				text: "PRO_TRADER_MASTER",
			},
			{
				key: "PRO_TRADER_TESTER",
				value: "PRO_TRADER_TESTER",
				text: "PRO_TRADER_TESTER",
			},
			{
				key: "PRO_TRADER_EMULATED",
				value: "PRO_TRADER_EMULATED",
				text: "PRO_TRADER_EMULATED",
			},
			{ key: "PRO_TRADER", value: "PRO_TRADER", text: "PRO_TRADER" },
			{ key: "BROKER", value: "BROKER", text: "BROKER" },
		];
		this.setState({ listUsersProfiles: profiles }, () => {
			this.setState({ showProfileToSearch: true });
		});
	};
	floorDecimals = (value, numberDecimals) => {
		let decimales = Math.pow(10, numberDecimals);
		return Math.floor(value * decimales) / decimales;
	};
	getProfileBalance = () => {
		this.setState({ showProfileDetail: false }, () => {
			userService
				.getBalanceAdmin(this.state.profileToSearch)
				.then((resp) => {
					this.setState(
						{
							profileBalance: resp.data.result,
						},
						() => {
							this.setState({
								showProfileDetail: true,
							});
						},
					);
				})
				.catch((error) => {
					this.setState({ showProfileDetail: true });
					console.log(error);
				});
		});
	};
	pickProfile = (e, data) => {
		this.setState({ profileToSearch: data.value });
	};
	render() {
		let t = this.state.translator;
		//	console.log(this.state.userInfo);
		return (
			<div>
				<Modal
					closeIcon
					open={this.state.userDetailModal}
					onClose={this.closeUserDetailModal}>
					<Modal.Header>
						{t("profile.optionDetail.messages.userDetail")}
					</Modal.Header>
					<Modal.Content>
						<Modal.Description>
							<Form>
								{this.state.userInfo.isACompany && (
									<Divider horizontal>
										<Header as='h4'>
											{" "}
											{t("profile.optionDetail.messages.companyData")}
										</Header>
									</Divider>
								)}
								{this.state.userInfo.isACompany && (
									<Form.Group widths='equal'>
										<Form.Field>
											<label>
												{" "}
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
												{" "}
												{t(
													"profile.updateProfile.form.verifyCUninitiatedCompany.registerFiscalType",
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
												{" "}
												{t(
													"profile.updateProfile.form.verifyCUninitiatedCompany.registerFiscalNumber",
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
												{" "}
												{t(
													"profile.updateProfile.form.verifyCUninitiatedCompany.registerYear",
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
										{" "}
										{t("homeLoggedIn.transactions.detail.labels.personalData")}
									</Header>
								</Divider>
								<Form.Group widths='equal'>
									<Form.Field>
										<label>{t("profile.updateProfile.form.name")}</label>
										<p className='infoUserParagraph'>
											{this.state.userInfo.firstName !== undefined &&
											this.state.userInfo.firstName !== ""
												? this.state.userInfo.firstName
												: t("dynamicForm.labels.descriptionContent")}
										</p>
									</Form.Field>
									<Form.Field>
										<label>{t("profile.updateProfile.form.lastName")}</label>
										<p className='infoUserParagraph'>
											{this.state.userInfo.lastName !== undefined &&
											this.state.userInfo.lastName !== ""
												? this.state.userInfo.lastName
												: t("dynamicForm.labels.descriptionContent")}
										</p>
									</Form.Field>
									<Form.Field>
										<label>{t("profile.updateProfile.form.sex")}</label>
										{window.sessionStorage.getItem("language") === "es" && (
											<p className='infoUserParagraph'>
												{this.state.userInfo.gender !== undefined &&
												this.state.userInfo.gender !== ""
													? this.state.userInfo.gender === "male"
														? "Masculino"
														: "Femenino"
													: t("dynamicForm.labels.descriptionContent")}
											</p>
										)}
										{window.sessionStorage.getItem("language") === "en" && (
											<p className='infoUserParagraph'>
												{this.state.userInfo.gender !== undefined &&
												this.state.userInfo.gender !== ""
													? this.state.userInfo.gender === "male"
														? "Male"
														: "Female"
													: t("dynamicForm.labels.descriptionContent")}
											</p>
										)}
									</Form.Field>
									<Form.Field>
										<label>
											{t("profile.updateProfile.form.documentType")}
										</label>
										<p className='infoUserParagraph'>
											{this.state.userInfo.typeDocumentIdentity !== undefined &&
											this.state.userInfo.typeDocumentIdentity !== ""
												? this.state.userInfo.typeDocumentIdentity
												: t("dynamicForm.labels.descriptionContent")}
										</p>
									</Form.Field>
									<Form.Field>
										<label> {t("profile.updateProfile.form.numberId")}</label>
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
										<label>{t("profile.updateProfile.form.birthday")}</label>
										<p className='infoUserParagraph'>
											{this.state.userInfo.birthdate !== undefined &&
											this.state.userInfo.birthdate !== ""
												? this.state.userInfo.birthdate
												: t("dynamicForm.labels.descriptionContent")}
										</p>
									</Form.Field>
									<Form.Field>
										<label>{t("profile.updateProfile.form.birthplace")}</label>
										<p className='infoUserParagraph'>
											{this.state.userInfo.birthplace !== undefined &&
											this.state.userInfo.birthplace !== ""
												? this.state.userInfo.birthplace
												: t("dynamicForm.labels.descriptionContent")}
										</p>
									</Form.Field>
									<Form.Field>
										<label>
											{t("profile.updateProfile.form.addressPersonal")}
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
										<label>{t("profile.updateProfile.form.phone")}</label>
										<p className='infoUserParagraph'>
											{this.state.userInfo.phone !== undefined &&
											this.state.userInfo.phone !== ""
												? this.state.userInfo.phone
												: t("dynamicForm.labels.descriptionContent")}
										</p>
									</Form.Field>
									{/* <Form.Field>
										<label>
											{" "}
											{t("profile.updateProfile.form.localbitcoinUser")}
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
											{" "}
											{t("profile.updateProfile.form.facebookUser")}
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
											{t("profile.updateProfile.form.securityQuestion")}
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
											{t("profile.updateProfile.form.securityAnswer")}
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
											{t("profile.updateProfile.form.contactFamily")}
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
											{t("profile.updateProfile.form.contactEmailFamily")}
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
										{this.state.userInfo.email !== undefined &&
										this.state.userInfo.email !== ""
											? this.state.userInfo.email
											: t("dynamicForm.labels.descriptionContent")}
									</Form.Field>
									<Form.Field>
										<label>
											{t("profile.updateProfile.form.addressPersonal")}
										</label>
										{this.state.userInfo.address !== undefined &&
										this.state.userInfo.address !== ""
											? this.state.userInfo.address
											: t("dynamicForm.labels.descriptionContent")}
									</Form.Field>
									<Form.Field />
									<Form.Field style={{ marginLeft: -140 }}>
										<label>{t("profile.optionDetail.fields.userType")}</label>
										{this.state.userInfo.type}
									</Form.Field>
									<Form.Field>
										<label>{t("profile.optionDetail.fields.statusUser")}</label>
										{window.sessionStorage.getItem("language") === "es" && (
											<p>
												{this.state.userInfo.active ? "Activo" : "Inactivo"}
											</p>
										)}
										{window.sessionStorage.getItem("language") === "en" && (
											<p>
												{this.state.userInfo.active ? "Active" : "Inactive"}
											</p>
										)}
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
									{this.state.userInfo.wallets !== undefined && (
										<Form.Field style={{ marginRight: -100 }}>
											<label>
												{" "}
												{t("homeLoggedIn.transactions.detail.labels.addreses")}
											</label>
											<List divided relaxed>
												{Object.keys(this.state.userInfo.wallets.old).map(
													(key) => {
														return (
															<List.Item key={key}>
																<List.Content>
																	<List.Header>
																		{
																			this.state.userInfo.wallets.old[key]
																				.address
																		}
																	</List.Header>
																	<List.Description>
																		{window.sessionStorage.getItem(
																			"language",
																		) === "es"
																			? "Creación"
																			: "Creation"}
																		:{" "}
																		{new Date(key).toLocaleDateString("en-US")}
																	</List.Description>
																</List.Content>
															</List.Item>
														);
													},
												)}
											</List>
										</Form.Field>
									)}
									<Form.Field />
								</Form.Group>
								{this.state.userInfo &&
									this.state.userInfo.other &&
									this.state.userInfo.other.length > 0 && (
										<Container>
											<Divider horizontal>
												<Header as='h4'>
													{" "}
													{t("profile.optionDetail.stepUser.aditionalData")}
												</Header>
											</Divider>
											<Form.Group widths={5}>
												{/* {this.state.userInfo.other.map((k) => {
													return (
														<Form.Field key={k.dataName}>
															<label>
																{k.dataName === "nickname"
																	? "Nombre de usuario"
																	: k.dataName}
															</label>
															<p className='infoUserParagraph'>{k.dataValue}</p>
														</Form.Field>
													);
												})} */}
												{Object.entries(this.state.userInfo.other).map((k) => {
													return (
														<Form.Field key={k.dataName}>
															<label>
																{k.dataName === "nickname"
																	? t("profile.optionDetail.nickname.value")
																	: k.dataName}
															</label>
															<p className='infoUserParagraph'>{k.dataValue}</p>
														</Form.Field>
													);
												})}
											</Form.Group>
										</Container>
									)}
							</Form>
						</Modal.Description>
					</Modal.Content>
				</Modal>
				{!this.state.showProfileToSearch && (
					<Dimmer active inverted>
						<Loader inverted>
							{" "}
							{t("profile.optionDevices.table.loading")}...
						</Loader>
					</Dimmer>
				)}
				{!this.state.showProfileDetail && (
					<Dimmer active inverted>
						<Loader inverted>
							{" "}
							{t("profile.optionDevices.table.loading")}...
						</Loader>
					</Dimmer>
				)}
				<Form>
					<Form.Group>
						<Form.Field>
							<label>
								{t("homeLoggedIn.transactions.detail.labels.profileToConsult")}:
							</label>
							<Select
								search
								placeholder={t(
									"homeLoggedIn.transactions.detail.labels.select",
								)}
								options={this.state.listUsersProfiles}
								onChange={this.pickProfile}
							/>
						</Form.Field>
						<Form.Button
							disabled={this.state.profileToSearch === ""}
							icon
							labelPosition='left'
							color='blue'
							style={{ marginTop: 23 }}
							type='submit'
							onClick={this.getProfileBalance}>
							<Icon name='search' />
							{t("homeLoggedIn.transactions.detail.labels.search")}
						</Form.Button>
					</Form.Group>
				</Form>
				{this.state.flagUser !== "" &&
					this.state.userInfo.flag !== "" &&
					this.state.userInfo.flag !== undefined &&
					this.state.userInfo.flag !== null && (
						<Popup
							position='top center'
							trigger={
								<Segment
									textAlign='center'
									color={this.state.userInfo.flag.toLowerCase()}
									inverted>
									{this.state.userInfo.flag === "GREEN"
										? "Usuario Confiable"
										: this.state.userInfo.flag === "PURPLE"
										? "Usuario problemático"
										: this.state.userInfo.flag === "RED"
										? "Usuario Estafador"
										: this.state.userInfo.flag === "BLACK"
										? "Usuario Suspendido"
										: this.state.userInfo.flag === "ORANGE"
										? "Usuario en Investigación"
										: this.state.userInfo.flag === "YELLOW"
										? "Usuario Sospechoso"
										: this.state.userInfo.flag === "BLUE"
										? "Usuario VIP"
										: ""}
								</Segment>
							}
							content='Tipo de Alerta'
						/>
					)}
				{this.state.profileBalance !== null && (
					<div>
						<Divider section />
						<Grid>
							<Grid.Row columns='equal'>
								<Grid.Column>
									{this.state.profileBalance.availableAmounts.length > 0 ? (
										<List as='ol'>
											<List.Item>
												<List.Header>
													{" "}
													{t(
														"homeLoggedIn.transactions.detail.labels.availableAmounts",
													)}
												</List.Header>
												<List.Item as='ol'>
													{this.state.profileBalance.availableAmounts.map(
														(availableAmount) => (
															<List.Item
																as='li'
																value='-'
																key={availableAmount.currency}>
																<div>
																	<label>
																		<b>{availableAmount.currency}: </b>
																	</label>{" "}
																	<NumberFormat
																		value={this.floorDecimals(
																			availableAmount.amount,
																			8,
																		)}
																		displayType={"text"}
																		thousandSeparator={true}
																	/>
																</div>
															</List.Item>
														),
													)}
												</List.Item>
											</List.Item>
										</List>
									) : (
										<p>
											{" "}
											{t(
												"homeLoggedIn.transactions.detail.labels.profileValuesEmpty",
											)}
										</p>
									)}
								</Grid.Column>
							</Grid.Row>
						</Grid>
						<Divider hidden />
						{this.state.profileBalance.users.length > 0 ? (
							<div>
								<label>
									<b>
										{t("homeLoggedIn.transactions.detail.labels.usersBelongs")}:
									</b>
								</label>
								<Divider fitted hidden />
								<Grid>
									<Grid.Row columns={4}>
										{this.state.profileBalance.users.map((user, i) => (
											<Grid.Column key={i}>
												<p
													className='fake-link'
													onClick={() => this.openUserDetailModal(user)}>
													{user}
												</p>
											</Grid.Column>
										))}
									</Grid.Row>
								</Grid>
							</div>
						) : (
							<p>{t("homeLoggedIn.transactions.detail.labels.profileEmpty")}</p>
						)}
					</div>
				)}
			</div>
		);
	}
}

export default translate(ProfileBalance);
