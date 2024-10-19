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
	Select,
	List,
	Message,
	Segment,
	Popup,
	Modal,
	Image,
} from "semantic-ui-react";
import config from "../../../services/config";
import translate from "../../../i18n/translate";
import user from "../../../services/user";
import axios from "axios";
import _ from "underscore";
import attachments from "../../../services/attachments";
import { Document, Page } from "react-pdf";
class UserBalance extends Component {
	constructor(props) {
		super(props);
		this.state = {
			translator: props.translate,
			listUsersEmail: [],
			userToSearch: "",
			userBalance: null,
			userSelected: "",
			showUserBalance: false,
			showUserSearch: false,
			flagUser: "",
			userInfo: {},
			loadSearch: false,
			showInactivationSuccessMessage: false,
			showInactivationErrorMessage: false,
			showActivationSuccessMessage: false,
			showActivationErrorMessage: false,
			showDeleteSuccessMessage: false,
			showDeleteErrorMessage: false,
			imagesUser: [],
			loadImages: false,
		};
		this.loadUserImages = this.loadUserImages.bind(this);
	}
	componentWillReceiveProps(nextProps, nextContext) {
		if (this.props.language !== nextProps.language) {
			this.setState({
				translator: nextProps.translate,
			});
		}
	}
	componentDidMount() {}

	floorDecimals = (value, numberDecimals) => {
		let decimales = Math.pow(10, numberDecimals);
		return Math.floor(value * decimales) / decimales;
	};

	getActualUserInfo = (allInfo) => {
		var listKeys = Object.keys(allInfo);
		var listActualKeys = [];
		var actualfirstNameKey;
		var actualLastnameKey;
		var otherNotificationTokens;
		var actualPhoneKey;
		var actualflag;
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
		var actualMCWallets;
		var isACompany = false;
		var paymentCommissions = [];
		let imagesUser = [];
		for (var i = 0; i < listKeys.length; i++) {
			if (listKeys[i] === "company") {
				isACompany = true;
			}
			if (listKeys[i].startsWith("firstName")) {
				actualfirstNameKey = listKeys[i];
			} else if (listKeys[i].startsWith("otherNotificationTokens")) {
				otherNotificationTokens = listKeys[i];
			} else if (listKeys[i].startsWith("lastName")) {
				actualLastnameKey = listKeys[i];
			} else if (listKeys[i].startsWith("flag")) {
				actualflag = listKeys[i];
			} else if (listKeys[i].startsWith("paymentCommissions")) {
				paymentCommissions.push(listKeys[i]);
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
			} else if (listKeys[i].startsWith("mcWallets")) {
				actualMCWallets = listKeys[i];
			} else if (listKeys[i].endsWith("URL")) {
				imagesUser.push(listKeys[i]);
			} else if (
				listKeys[i] !== "name" &&
				listKeys[i] !== "masterWalletIds" &&
				listKeys[i] !== "verification" &&
				!listKeys[i].endsWith("URL") &&
				listKeys[i] !== "company" &&
				listKeys[i] !== "automaticChange"
			) {
				otherKeys.push(listKeys[i]);
			}
		}
		listActualKeys.push(
			actualfirstNameKey,
			actualLastnameKey,
			actualPhoneKey,
			otherNotificationTokens,
			actualQuestionSecurityKey,
			actualAnswerSecurityKey,
			actualTypeDocumentIdentityKey,
			actualNumberDocumentIdentityKey,
			actualGenderKey,
			actualBirthdateKey,
			actualflag,
			actualBirthplaceKey,
			actualFamilyNameKey,
			actualFamilyEmailKey,
			actualUserLocalBitcoinKey,
			actualUserFacebookKey,
			actualUserAddressKey,
			paymentCommissions,
			actualNickName,
			actualCompanyName,
			actualCompanyTypeOfFiscalRecord,
			actualCompanyNumberOfFiscalRecord,
			actualCompanyYearRegistration,
			actualWallets,
			actualMCWallets,
			"address",
			"operationAccount",
			"environment",
			"type",
			"active",
			"email",
		);
		var allKeys = listActualKeys.concat(otherKeys);
		if (imagesUser.length > 0) allKeys = allKeys.concat(imagesUser);
		var modifiedObj = _.pick(allInfo, [allKeys]);
		var normalizeObject = { other: [], images: [] };
		Object.entries(modifiedObj).forEach(([key, value]) => {
			if (key.startsWith("firstName")) {
				normalizeObject.firstName = value;
			} else if (key.startsWith("lastName")) {
				normalizeObject.lastName = value;
			} else if (key.startsWith("otherNotificationTokens")) {
				normalizeObject.otherNotificationTokens = value;
			} else if (key.startsWith("paymentCommissions")) {
				let ob = {};

				Object.entries(value).forEach(([k, v]) => {
					ob.currency = k;
					ob.commissionToDeposit = v.mcBuyBalancePercent;
					ob.commissionToTransfer = v.sendToPaymentPercent;

					normalizeObject.paymentCommissions = ob;
				});
			} else if (key.startsWith("flag")) {
				Object.entries(value).forEach(([k, v]) => {
					if (k === "color") {
						normalizeObject.flag = v;
						this.setState({ flagUser: v });
					}
				});
				// normalizeObject.flag = value;
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
			} else if (key.startsWith("mcWallets")) {
				normalizeObject.mcWallets = value;
			} else if (key.startsWith("identityURL")) {
				normalizeObject.images.push({
					dataName: "Identificación",
					dataValue: value,
				});
			} else if (key.startsWith("bankURL")) {
				normalizeObject.images.push({
					dataName: "Comprobante Bancario",
					dataValue: value,
				});
			} else if (key.startsWith("locationURL")) {
				normalizeObject.images.push({
					dataName: "Comprobante de Dirección",
					dataValue: value,
				});
			} else if (key.startsWith("selfURL")) {
				normalizeObject.images.push({
					dataName: "Selfie con Identificación",
					dataValue: value,
				});
			} else if (!key.startsWith("paymentId")) {
				normalizeObject.other.push({ dataName: key, dataValue: value });
			}
		});
		normalizeObject.isACompany = isACompany;
		return normalizeObject;
	};
	getUserBalance = () => {
		this.setState({ showUserBalance: false, loadSearch: true, imagesUser: [] });
		this.setState({ flagUser: "", userSelected: this.state.userToSearch });
		// user
		// 	.getBalanceUser(this.state.userToSearch)
		// 	.then((response) => {
		// console.log(response);
		user
			.getConfigUserGeneral(this.state.userToSearch)
			.then((resp) => {
				//	console.log("resp:", resp);
				var actualUserInfo = this.getActualUserInfo(resp.data.result);
				let oldAdrres = [];
				if (actualUserInfo.wallets !== undefined) {
					Object.entries(actualUserInfo.wallets).forEach(([key, value]) => {
						if (key === "current") {
							Object.entries(value).forEach(([inerKey, inerValue]) => {
								if (inerValue.address !== undefined) {
									actualUserInfo.address = inerValue.address;
								}
							});
						} else {
							Object.entries(value).forEach(([inerKey, inerValue]) => {
								if (inerValue.address !== undefined) {
									oldAdrres.push({
										create: inerKey,
										value: inerValue.address,
									});
								}
							});
						}
					});
				}
				actualUserInfo.oldAdrres = oldAdrres;
				//	console.log(actualUserInfo);
				this.setState(
					{
						userInfo: actualUserInfo,
						showUserBalance: true,
						loadSearch: false,
					},
					() => {
						this.loadUserImages(this.state.userToSearch);
					},
				);
			})
			.catch((error) => {
				console.log(error);
			});
		this.setState({ userBalance: this.state.userInfo });
		// }) response.data.result
		// .catch((error) => {
		// 	this.setState({ showUserBalance: true });
		// 	//console.log(error);
		// });
	};
	pickUser = (e, data) => {
		this.setState({ userToSearch: data.value });
	};
	onDocumentLoadSuccess = ({ numPages }) => {
		this.setState({ numPages });
	};
	async loadUserImages(username) {
		this.setState({ loadImages: true });
		let arrayImage = [];
		if (this.state.userInfo.images.length > 0) {
			for (let image of this.state.userInfo.images) {
				try {
					const response = await attachments.getAttachementUser(
						username,
						image.dataValue,
					);
					let imageURL;
					let blob = new Blob([response.data], {
						type: response.headers["content-type"],
					});
					imageURL = URL.createObjectURL(blob);

					arrayImage.push({
						dataName: image.dataName,
						dataValue: imageURL,
						isPdf: image.dataValue.includes("pdf"),
					});
				} catch (error) {
					console.log(error);
					continue;
				}
			}
			let images = arrayImage.map((value) => {
				if (value.isPdf) {
					return (
						<List.Item onClick={() => window.open(value.dataValue, "_blank")}>
							<Document
								file={value.dataValue}
								externalLinkTarget='_blank'
								onLoadSuccess={this.onDocumentLoadSuccess.bind(this)}>
								<Page pageNumber={1} width={150} height={150} />
							</Document>
						</List.Item>
					);
				} else {
					return (
						<Modal
							closeIcon
							key={value.dataName}
							trigger={
								<List.Item>
									<Image
										src={value.dataValue}
										size='small'
										style={{
											maxHeight: "100px",
											maxWidth: "150px",
											cursor: "pointer",
										}}
									/>
								</List.Item>
							}>
							<Modal.Header>{value.dataName}</Modal.Header>
							<Modal.Content>
								<Image centered src={value.dataValue} size='medium' />
							</Modal.Content>
						</Modal>
					);
				}
			});
			this.setState(
				{
					imagesUser: images,
				},
				() => {
					this.setState({ loadImages: false });
				},
			);
		} else this.setState({ loadImages: false });
	}
	handleSearchUser = (e) => {
		this.setState({ userToSearch: e.target.value });
		//console.log(e.target.value);
	};
	render() {
		let t = this.state.translator;
		let inactivationSuccessMessage,
			inactivationErrorMessage,
			activationSuccessMessage,
			activationErrorMessage,
			deleteSuccessMessage,
			deleteErrorMessage;
		if (this.state.showInactivationErrorMessage) {
			inactivationErrorMessage = (
				<Message negative>
					<Message.Header>Error</Message.Header>
					<p>
						{t("homeLoggedIn.transactions.detail.labels.errorInactivateUser")}
					</p>
				</Message>
			);
		}
		if (this.state.showInactivationSuccessMessage) {
			inactivationSuccessMessage = (
				<Message positive>
					<Message.Header>
						{t("homeLoggedIn.transactions.detail.labels.userInactivated")}
					</Message.Header>
					<p>
						{t("homeLoggedIn.transactions.detail.labels.successInactivateUser")}
					</p>
				</Message>
			);
		}
		if (this.state.showActivationErrorMessage) {
			activationErrorMessage = (
				<Message negative>
					<Message.Header>Error</Message.Header>
					<p>
						{t("homeLoggedIn.transactions.detail.labels.errorActivateUser")}
					</p>
				</Message>
			);
		}
		if (this.state.showActivationSuccessMessage) {
			activationSuccessMessage = (
				<Message positive>
					<Message.Header>
						{t("homeLoggedIn.transactions.detail.labels.userActivated")}
					</Message.Header>
					<p>
						{t("homeLoggedIn.transactions.detail.labels.successActivateUser")}
					</p>
				</Message>
			);
		}
		if (this.state.showDeleteErrorMessage) {
			deleteErrorMessage = (
				<Message negative>
					<Message.Header>Error</Message.Header>
					<p>{t("homeLoggedIn.transactions.detail.labels.errordeleteUser")}</p>
				</Message>
			);
		}
		if (this.state.showDeleteSuccessMessage) {
			deleteSuccessMessage = (
				<Message positive>
					<Message.Header>
						{t("homeLoggedIn.transactions.detail.labels.userEliminated")}
					</Message.Header>
					<p>
						{t("homeLoggedIn.transactions.detail.labels.successdeleteUser")}
					</p>
				</Message>
			);
		}

		return (
			<div>
				{!this.state.showUserSearch && this.state.listUsersEmail === "" && (
					<Dimmer active inverted>
						<Loader inverted>
							{t("profile.optionDevices.table.loading")}...
						</Loader>
					</Dimmer>
				)}
				<Form>
					<Form.Group>
						<Form.Field>
							<Form.Field>
								<label>
									{t("homeLoggedIn.transactions.detail.labels.userToConsult")}:
								</label>
								<input
									placeholder={t(
										"homeLoggedIn.transactions.detail.labels.select",
									)}
									onChange={this.handleSearchUser.bind(this)}
								/>
							</Form.Field>
						</Form.Field>
						<Form.Button
							disabled={this.state.userToSearch === ""}
							icon
							labelPosition='left'
							color='blue'
							style={{ marginTop: 23 }}
							type='submit'
							onClick={this.getUserBalance.bind(this)}
							loading={this.state.loadSearch}>
							<Icon name='search' />
							{t("homeLoggedIn.transactions.detail.labels.search")}
						</Form.Button>
					</Form.Group>
					{inactivationSuccessMessage}
					{inactivationErrorMessage}
					{activationSuccessMessage}
					{activationErrorMessage}
				</Form>

				{this.state.userBalance !== null && (
					<div>
						{!this.state.showUserBalance && (
							<Dimmer active inverted>
								<Loader inverted>
									{" "}
									{t("profile.optionDevices.table.loading")} ...
								</Loader>
							</Dimmer>
						)}
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
						<Grid>
							<Grid.Row>
								<Grid.Column>
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
														{t(
															"profile.updateProfile.form.verifyCUninitiatedCompany.registerFiscalNumber",
														)}
													</label>
													<p className='infoUserParagraph'>
														{this.state.userInfo.companyNumberOfFiscalRecord !==
															undefined &&
														this.state.userInfo.companyNumberOfFiscalRecord !==
															""
															? this.state.userInfo.companyNumberOfFiscalRecord
															: t("dynamicForm.labels.descriptionContent")}
													</p>
												</Form.Field>
												<Form.Field>
													<label>
														{" "}
														{t(
															"profile.updateProfile.form.verifyCUninitiatedCompany.registerYear",
														)}{" "}
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
												<label>{t("profile.updateProfile.form.name")}</label>
												<p className='infoUserParagraph'>
													{this.state.userInfo.firstName !== undefined &&
													this.state.userInfo.firstName !== ""
														? this.state.userInfo.firstName
														: t("dynamicForm.labels.descriptionContent")}
												</p>
											</Form.Field>
											<Form.Field>
												<label>
													{t("profile.updateProfile.form.lastName")}
												</label>
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
													{this.state.userInfo.typeDocumentIdentity !==
														undefined &&
													this.state.userInfo.typeDocumentIdentity !== ""
														? this.state.userInfo.typeDocumentIdentity
														: t("dynamicForm.labels.descriptionContent")}
												</p>
											</Form.Field>
											<Form.Field>
												<label>
													{t("profile.updateProfile.form.numberId")}
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
													{t("profile.updateProfile.form.birthday")}
												</label>
												<p className='infoUserParagraph'>
													{this.state.userInfo.birthdate !== undefined &&
													this.state.userInfo.birthdate !== ""
														? this.state.userInfo.birthdate
														: t("dynamicForm.labels.descriptionContent")}
												</p>
											</Form.Field>
											<Form.Field>
												<label>
													{" "}
													{t("profile.updateProfile.form.birthplace")}
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
													{" "}
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
												<label> {t("profile.updateProfile.form.phone")}</label>
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
													{" "}
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
													{" "}
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
											<Form.Field style={{ marginRight: -100 }}>
												<label>
													{" "}
													{t("profile.updateProfile.form.addressPersonal")}
												</label>
												{this.state.userInfo.address !== undefined &&
												this.state.userInfo.address !== ""
													? this.state.userInfo.address
													: t("dynamicForm.labels.descriptionContent")}
											</Form.Field>
											<Form.Field />
											<Form.Field>
												<label>
													{t("profile.optionDetail.fields.userType")}
												</label>
												{this.state.userInfo.type}
											</Form.Field>
											<Form.Field>
												<label>
													{t("profile.optionDetail.fields.statusUser")}
												</label>
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
												<label>
													{" "}
													{t("profile.optionDetail.nickname.value")}
												</label>
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
													{" "}
													{t(
														"homeLoggedIn.transactions.detail.labels.operationAccount",
													)}{" "}
												</label>
												{this.state.userInfo.operationAccount}
											</Form.Field>
											{this.state.userInfo.wallets !== undefined &&
												this.state.userInfo.oldAdrres !== undefined && (
													<Form.Field style={{ marginRight: -60 }}>
														<label>
															{" "}
															{t(
																"homeLoggedIn.transactions.detail.labels.addreses",
															)}
														</label>
														<List
															divided
															relaxed
															style={{
																maxHeight: "100px",
																maxWidth: "350px",
																overflow: "auto",
															}}>
															{this.state.userInfo.oldAdrres.map(
																(item, index) => {
																	return (
																		<List.Item key={index}>
																			<List.Content>
																				<List.Header>{item.value}</List.Header>
																				<List.Description>
																					{window.sessionStorage.getItem(
																						"language",
																					) === "es"
																						? "Creación"
																						: "Creation"}
																					:{" "}
																					{new Date(
																						item.create,
																					).toLocaleDateString("en-US")}
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
										{this.state.imagesUser.length > 0 && (
											<Grid.Row style={{ paddingTop: "0px" }}>
												<Grid.Column
													largeScreen={16}
													computer={16}
													mobile={16}
													tablet={16}>
													{this.state.loadImages && (
														<Dimmer active inverted>
															<Loader inverted>
																{" "}
																{t("profile.optionDevices.table.loading")}...
															</Loader>
														</Dimmer>
													)}
													<Header as='h5' textAlign='center'>
														{t("profile.optionDetail.fields.documents")}
														<Divider hidden />
														<List horizontal>{this.state.imagesUser}</List>
													</Header>
												</Grid.Column>
											</Grid.Row>
										)}
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
														{this.state.userInfo.other.map((k) => {
															return (
																<Form.Field>
																	<label>
																		{k.dataName === "nickname"
																			? t("profile.optionDetail.nickname.value")
																			: k.dataName}
																	</label>
																	<p className='infoUserParagraph'>
																		{k.dataValue}
																	</p>
																</Form.Field>
															);
														})}
													</Form.Group>
												</Container>
											)}
									</Form>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</div>
				)}
			</div>
		);
	}
}

export default translate(UserBalance);
