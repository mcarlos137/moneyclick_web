import React, { Component } from "react";
import {
	Button,
	Image,
	Form,
	Dimmer,
	Loader,
	Dropdown,
	Input,
	Header,
	Segment,
	Grid,
	Divider,
	Modal,
	Label,
	Message,
	Icon,
} from "semantic-ui-react";
import "./Registration.css";
import { parse } from "query-string";
import NumberFormat from "react-number-format";
import Cookies from "universal-cookie";
import ReCAPTCHA from "react-google-recaptcha";
import image from "../../../src/img/icn-verificacion.png";
import img1 from "../../img/back-1.png";
import img1english from "../../img/back-1-ingles.png";
import prefits from "../../common/prefits";
import uuid from "uuid";
import user from "../../services/user";
//import termsAndConditions from "../../common/termsAndConditions";
import TermsAndConditions from '../TermsAndConditions/TermsAndConditionsMoneyClick';
import translate from "../../i18n/translate";
import { Redirect } from "react-router-dom";
import {
	osVersion,
	osName,
	fullBrowserVersion,
	browserName,
	mobileVendor,
	mobileModel,
	isMobile,
} from "react-device-detect";
const recapcha = React.createRef();
const cookies = new Cookies();
class Registration extends Component {
	constructor(props) {
		super(props);
		this.state = {
			captchaValue: "",
			errorAlreadyPhone: false,
			password: "",
			email: "",
			nickname: "",
			firstname: "",
			referralCode: "",
			deviceId: "",
			deviceModel: "",
			deviceName: "",
			deviceSO: "",
			notAuth: false,
			passwordRepeat: "",
			listUser: [],
			registration: false,
			conditions: "false",
			prefit: prefits.country,
			loadform: false,
			statusModal: false,
			resultPost: " ",
			userType: "",
			tokenurl: "",
			notAuth: false,
			hasNickname: false,
			hasEmail: false,
			messageError: "",
			varlog: false,
			hiddenRepeat: true,
			errorForm: false,
			errorPassword: false,
			errorRepeatPassword: false,
			errorCondition: false,
			errorPhone: false,
			errorCaptcha: false,
			errorCode: false,
			errorEmail: false,
			errorReferral: false,
			seeTermsAndConditions: false,
			//termsAndConditions: termsAndConditions,
			company: false,
			loading: false,
			codeSended: false,
			userData: "",
			userStatusC: "",
			userStatusB: false,
			userStatusA: false,
			modalCode: false,
			message: "",
			timer: false,
			code: "",
			errorCode: false,
			errorNickName: false,
			errorCountry: false,
			showFormComplete: false,
			hidden: true,
			viewModalSuccess: false,
			hiddenRepeat: true,
			verifiedPhone: false,
			verified: false,
			address: "",
			userWallets: "",
			translator: props.translate,
			captcha: "",
			referralCodeList: {},
			codeSpecial: false,
			load: true,
			spanish: false,
		};

		this.handleCaptcha = this.handleCaptcha.bind(this);
		this.handleUserEmail = this.handleUserEmail.bind(this);
		this.handleUserPassword = this.handleUserPassword.bind(this);
		this.handleRepeatPassword = this.handleRepeatPassword.bind(this);
		this.handleConditions = this.handleConditions.bind(this);
		this.handleRegistrer = this.handleRegistrer.bind(this);
		this.onClickCloseModalTermsAndConditions = this.onClickCloseModalTermsAndConditions.bind(
			this,
		);
		this.onClickTermsAndConditions = this.onClickTermsAndConditions.bind(this);
		this.authUserLogin = this.authUserLogin.bind(this);
		this.setLoginFull = this.setLoginFull.bind(this);
		this.setLoginNotVerifiedEmail = this.setLoginNotVerifiedEmail.bind(this);
		this.sigNin = this.sigNin.bind(this);
		this.sigNinDollarBtc = this.sigNinDollarBtc.bind(this);
		this.setPinUser = this.setPinUser.bind(this);
		this.toggleShow = this.toggleShow.bind(this);
		this.toggleShowRepeat = this.toggleShowRepeat.bind(this);
		this.handleCodeReferral = this.handleCodeReferral.bind(this);
	}

	componentWillReceiveProps(nextProps, nextContext) {
		this.getLanguage();
		if (this.props.language !== nextProps.language) {
			this.setState({
				translator: nextProps.translate,
			});
			this.setState({ load: true });
			if (nextProps.language === "es") {
				this.setState({ spanish: true }, () => {
					this.setState({ load: false });
				});
			} else if (nextProps.language === "en") {
				this.setState({ spanish: false }, () => {
					this.setState({ load: false });
				});
			} else {
				this.setState({ spanish: true, load: false });
			}
		}
	}
	getLanguage() {
		if (window.sessionStorage.getItem("language") === "es") {
			this.setState({ spanish: true }, () => {
				this.setState({ load: false });
			});
		} else {
			this.setState({ spanish: false }, () => {
				this.setState({ load: false });
			});
		}
	}
	handleCaptcha(params) {
		this.setState({
			captcha: params,
		});
	}
	handleUserEmail(e) {
		this.setState({ email: e.target.value.toLowerCase() });
	}
	handleNickName(e) {
		this.setState({ nickname: e.target.value });
	}
	handleUserPassword(e) {
		this.setState({ password: e.target.value, nameHide: "password" });
	}
	handleRepeatPassword(e) {
		this.setState({
			passwordRepeat: e.target.value,
			hideRepeatPass: "passwordRepeat",
		});
	}
	handleCodeReferral(e) {
		if (e.target.value.length <= 15) {
			this.setState({
				referralCode: e.target.value,
			});
		}
	}
	handleConditions(e) {
		if (this.state.conditions === "false") {
			this.setState({ conditions: "true" });
		} else {
			this.setState({ conditions: "false" });
		}

		this.onClickCloseModalTermsAndConditions();
	}
	handleRegistryCompany() {
		this.setState({ company: !this.state.company });
	}
	handleModalClose() {
		this.setState({ statusModal: false, resultPost: "" });

		let query = parse(window.location.search);
		let tokenUrl = "";
		let typeOffer = "";
		if (query.offerKey !== undefined) {
			tokenUrl = query.offerKey;
			typeOffer = "offerKey";
			window.location.href = "/?" + typeOffer + "=" + tokenUrl;
		} else if (query.brokerOfferKey !== undefined) {
			tokenUrl = query.brokerOfferKey;
			typeOffer = "brokerOfferKey";
			window.location.href = "/?" + typeOffer + "=" + tokenUrl;
		} else {
			this.setState({
				registrer: true,
			});
		}
	}
	toggleShow() {
		this.setState({ hidden: !this.state.hidden });
	}
	toggleShowRepeat() {
		this.setState({ hiddenRepeat: !this.state.hiddenRepeat });
	}
	setBalanceInStore(username) {
		user
			.getBalanceUser(username)
			.then((resp) => {
				let acum = 0;
				let result = {
					available: 0,
					estimated: 0,
				};
				let acumdefered = 0;
				if (
					resp.data.result.modelBalances !== undefined &&
					resp.data.result.modelBalances.length > 0
				) {
					for (let val of resp.data.result.modelBalances) {
						for (let data of val.availableAmounts) {
							if (data.currency === "BTC") {
								acum = acum + parseFloat(data.amount);
							}
						}
					}
				}
				let decimales = Math.pow(10, 8);
				let data2 = Math.floor(acum * decimales) / decimales;
				if (resp.data.result.availableAmounts !== undefined) {
					if (resp.data.result.availableAmounts.length > 0) {
						if (resp.data.result.availableAmounts[0].amount > 0) {
							acumdefered =
								acumdefered +
								Math.floor(
									resp.data.result.availableAmounts[0].amount * decimales,
								) /
									decimales;
						} else {
							acumdefered = acumdefered;
						}
					}
				}
				if (resp.data.result.deferredAmounts !== undefined) {
					if (resp.data.result.deferredAmounts.length > 0) {
						if (resp.data.result.deferredAmounts[0].amount > 0) {
							acumdefered =
								acumdefered +
								Math.floor(
									resp.data.result.deferredAmounts[0].amount * decimales,
								) /
									decimales;
						} else {
							acumdefered = acumdefered;
						}
					}
				}
				result.available = acumdefered;
				result.estimated = data2;
				sessionStorage.setItem("userBalanceBTC", JSON.stringify(result));

				this.setState({
					resultPost: "success",
					viewModalSuccess: true,
				});
			})
			.catch((error) => {
				sessionStorage.setItem("userBalanceBTC", "");
			});
	}
	sigNin(email, password) {
		this.setState({
			registration: true,
		});
		this.sendCode();
	}
	handleCode(e) {
		if (/^([0-9])*$/.test(e.target.value)) {
			this.setState({
				code: e.target.value,
				errorCode: false,
			});
		} else {
			this.setState({
				errorCode: true,
			});
		}
	}
	async addDataUserAsync(body) {
		try {
			let response = await user.addDataUserAsync(body);
			if (response.data !== "OK") {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			return false;
		}
	}

	handleRegistrer() {
		//	console.log("dentro del handle register");
		this.setState({
			loadform: true,
		});
		let regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		let phone = this.state.countryCode + this.state.phone;
		console.log('phone ',);
		if (Number.isNaN(phone) || phone === undefined || phone === "" || phone.includes(".")) {
			this.setState({
				errorPhone: true,
				messageError: "sendMoneyClick.errorPhone",
				loadform: false,
			});
			this.blankErrors("errorPhone");
		} else {
			if (this.state.nickname !== "") {
				user
					.checkNickname(this.state.nickname)
					.then((res) => {
						//console.log("checkNicname:", res)
						if (res.data.payload === true) {
							if (regex.test(this.state.email)) {
								user
									.findUserByEmail(this.state.email)
									.then((resp) => {
										//console.log("checkEmail:", resp)
										if (resp.data.payload === true) {
											if (this.state.password !== "") {
												if (this.state.password.length >= 4) {
													if (
														this.state.password === this.state.passwordRepeat
													) {
														if (
															this.state.phone !== "" &&
															this.state.phone !== undefined &&
															this.state.phone !== null
														) {
															if (
																this.state.countryCode !== "" &&
																this.state.countryCode !== null &&
																this.state.countryCode !== undefined
															) {
																if (this.state.conditions === "true") {
																	if (
																		this.state.captcha !== "" &&
																		this.state.captcha !== null &&
																		this.state.captcha !== undefined
																	) {
																		if (
																			this.state.referralCode !== "" &&
																			this.state.referralCode !== null &&
																			this.state.referralCode !== undefined
																		) {
																			let validCode = false;
																			Object.entries(
																				this.state.referralCodeList,
																			).forEach(([key, val]) => {
																				if (this.state.referralCode === key) {
																					if (val.active !== undefined) {
																						if (val.active) {
																							validCode = true;
																							if (val.special !== undefined) {
																								if (val.special) {
																									this.setState({
																										codeSpecial: true,
																									});
																								} else {
																									this.setState({
																										codeSpecial: false,
																									});
																								}
																							}
																						} else {
																							validCode = false;
																						}
																					}
																				}
																			});
																			if (validCode) {
																				user
																					.findUserByPhone(
																						this.state.phone,
																						this.state.countryCode,
																					)
																					.then(async (resp) => {
																						//console.log("checkPhone:", resp)
																						if (
																							resp.data.errors === null &&
																							resp.data.payload !== null
																						) {
																							this.setState({
																								loadform: false,
																								errorForm: true,
																								messageError:
																									"registration.errors.errorSign",
																							});
																							setTimeout(() => {
																								this.setState({
																									errorForm: false,
																									messageError: "",
																								});
																							}, 5000);
																						} else if (
																							resp.data.errors[0].code === 32
																						) {
																							let valit = await this.verifyThisUserInCore(
																								phone,
																							);
																							//console.log("checkExist:", valit)
																							if (valit !== "USER_EXIST") {
																								this.setState({
																									loadform: true,
																								});
																								this.sigNin(
																									phone,
																									this.state.password,
																								);
																							} else {
																								//console.log("dentro del else")
																								this.setState({
																									loadform: false,
																									errorForm: true,
																									messageError:
																										"registration.errors.errorSign",
																								});
																								setTimeout(() => {
																									this.setState({
																										errorForm: false,
																										messageError: "",
																									});
																								}, 5000);
																							}
																						}
																					})
																					.catch((error) => {});
																			} else {
																				this.setState({
																					loadform: false,
																					errorReferral: true,
																					message:
																						"registration.errors.errorReferralCode",
																				});
																				this.blankErrors("errorReferral");
																			}
																		} else {
																			user
																				.findUserByPhone(
																					this.state.phone,
																					this.state.countryCode,
																				)
																				.then(async (resp) => {
																					//console.log("checkPhone:", resp)
																					if (
																						resp.data.errors === null &&
																						resp.data.payload !== null
																					) {
																						this.setState({
																							loadform: false,
																							errorForm: true,
																							messageError:
																								"registration.errors.errorSign",
																						});
																						setTimeout(() => {
																							this.setState({
																								errorForm: false,
																								messageError: "",
																							});
																						}, 5000);
																					} else if (
																						resp.data.errors[0].code === 32
																					) {
																						let valit = await this.verifyThisUserInCore(
																							phone,
																						);
																						//	console.log("checkExist:", valit);
																						if (valit !== "USER_EXIST") {
																							this.setState({ loadform: true });
																							this.sigNin(
																								phone,
																								this.state.password,
																							);
																						} else {
																							//console.log("dentro del else")
																							this.setState({
																								loadform: false,
																								errorForm: true,
																								messageError:
																									"registration.errors.errorSign",
																							});
																							setTimeout(() => {
																								this.setState({
																									errorForm: false,
																									messageError: "",
																								});
																							}, 5000);
																						}
																					}
																				})
																				.catch((error) => {
																					console.log(error);
																				});
																		}
																	} else {
																		this.setState({
																			loadform: false,
																			errorCaptcha: true,
																			message: "login.errors.errorCaptcha2",
																		});
																		setTimeout(() => {
																			this.setState({
																				errorCaptcha: false,
																				message: "",
																				loadform: false,
																			});
																		}, 5000);
																	}
																} else {
																	this.setState({
																		loadform: false,
																		errorForm: true,
																		messageError:
																			"registration.errors.form.terms",
																	});
																	this.blankErrors("other");
																}
															} else {
																this.setState({
																	loadform: false,
																	errorCountry: true,
																	messageError:
																		"registration.errors.errorRequiredField",
																});
																this.blankErrors("errorCountry");
															}
														} else {
															this.setState({
																loadform: false,
																errorPhone: true,
																messageError:
																	"registration.errors.errorRequiredField",
															});
															this.blankErrors("errorPhone");
														}
													} else {
														this.setState({
															loadform: false,
															errorRepeatPassword: true,
															messageError:
																"registration.errors.form.confirmPassword",
														});
														this.blankErrors("errorRepeatPassword");
													}
												} else {
													this.setState({
														loadform: false,
														errorPassword: true,
														messageError: "registration.errors.form.password",
													});
													this.blankErrors("errorPassword");
												}
											} else {
												this.setState({
													loadform: false,
													errorPassword: true,
													messageError:
														"registration.errors.errorRequiredField",
												});
												this.blankErrors("errorPassword");
											}
										} else {
											this.setState({
												loadform: false,
												errorForm: true,
												messageError: "registration.errors.form.alreadyEmail",
											});
											setTimeout(() => {
												this.setState({
													errorForm: false,
													messageError: "",
												});
											}, 5000);
										}
									})
									.catch((error) => {
										let e = error.toString();
										if (e.includes("Network")) {
											this.setState({
												loadform: false,
												errorForm: true,
												messageError: "registration.errors.errorNetwork",
											});
											setTimeout(() => {
												this.setState({
													errorForm: false,
													messageError: "",
												});
											}, 5000);
										} else {
											this.setState({
												loadform: false,
												errorForm: true,
												messageError: "login.errors.unexpectedError",
											});
											setTimeout(() => {
												this.setState({
													errorForm: false,
													messageError: "",
												});
											}, 5000);
										}
									});
							} else {
								this.setState({
									loadform: false,
									errorEmail: true,
									messageError: "registration.errors.form.email",
								});
								this.blankErrors("errorEmail");
							}
						} else {
							this.setState({
								loadform: false,
								errorForm: true,
								messageError: "registration.errors.form.username",
							});
							setTimeout(() => {
								this.setState({
									errorForm: false,
								});
							}, 4000);
							this.blankErrors("errornickname");
						}
					})
					.catch((e) => {
						this.setState({
							loadform: false,
						});
					});
			} else {
				this.setState({
					errorNickName: true,
					messageError: "registration.errors.errorRequiredField",
					loadform: false,
				});
				this.blankErrors("errornickname");
			}
		}
	}
	blankErrors(label) {
		if (label === "errorEmail") {
			setTimeout(() => {
				this.setState({ errorEmail: false, messageError: "" });
			}, 5000);
		}
		if (label === "errorPassword") {
			setTimeout(() => {
				this.setState({ errorPassword: false, messageError: "" });
			}, 5000);
		}
		if (label === "errorRepeatPassword") {
			setTimeout(() => {
				this.setState({ errorRepeatPassword: false, messageError: "" });
			}, 5000);
		}
		if (label === "errornickname") {
			setTimeout(() => {
				this.setState({ errorNickName: false, messageError: "" });
			}, 5000);
		}
		if (label === "errorPhone") {
			setTimeout(() => {
				this.setState({ errorPhone: false, messageError: "" });
			}, 5000);
		}
		if (label === "errorCaptcha") {
			setTimeout(() => {
				this.setState({ errorCaptcha: false, message: "" });
			}, 5000);
		}
		if (label === "errorCountry") {
			setTimeout(() => {
				this.setState({ errorCountry: false, messageError: "" });
			}, 5000);
		}
		if (label === "errorReferral") {
			setTimeout(() => {
				this.setState({ errorReferral: false, messageError: "" });
			}, 5000);
		}
		if (label === "other") {
			setTimeout(() => {
				this.setState({ errorForm: false, messageError: "" });
			}, 5000);
		}
	}

	async verifyThisUserInCore(fullphone) {
		try {
			const resp = await user.getConfigUserGeneral(fullphone);
			//console.log("verifyUserCore:", resp)
			let findUser = resp.data.result;

			let key = Object.keys(findUser);

			if (key.length > 0) {
				if (findUser.createdFromMCSend !== undefined) {
					if (findUser.createdFromMCSend === true) {
						return "ACTIVE_AND_CREATE";
					} else {
						return "CREATE";
					}
				} else {
					return "USER_EXIST";
				}
			} else {
				let findUserByPhone = this.state.listUser.find(function (element) {
					return element.phone === fullphone;
				});

				if (findUserByPhone === undefined) {
					return "CREATE";
				} else {
					return "PHONE_IN_USE";
				}
			}
		} catch (error) {
			return "CREATE";
		}
	}

	authUserLogin(username, password, walletsDLBT) {
		user
			.authUser(username, password)
			.then((res) => {
				if (!res.data.errors || res.data.errors.length === 0) {
					this.setLoginNotVerifiedEmail(res, username, password, walletsDLBT);
				} else if (
					res.data.errors[0].code === 28 ||
					res.data.errors[0].code === 29
				) {
					this.setLoginNotVerifiedEmail(res, username, password, walletsDLBT);
				} else {
					this.setState({ noauth: true });
				}
				this.setState({ loadForm: false, user: "", password: "" });
			})
			.catch((error) => {
				let e = error.toString();
				if (e.includes("Network")) {
					this.setState({
						loadform: false,
						errorForm: true,
						messageError: "registration.errors.errorNetwork",
					});
					setTimeout(() => {
						this.setState({
							errorForm: false,
							textMessage: "",
						});
					}, 4000);
				} else {
					this.setState({
						errorCaptcha: true,
						message: "login.errors.errorCaptcha",
						loadform: false,
					});
					if (recapcha.current !== null) {
						recapcha.current.reset("capt");
					}
					this.blankErrors("errorCaptcha");
				}
			});
	}

	addNewBrowserToUser() {
		let cookieSessionUser = cookies.get("SessionUserDevice");
		let creation = new Date();
		let expiration = new Date();
		expiration.setDate(creation.getDate() + 180);

		let body = {
			deviceId:
				cookieSessionUser !== undefined && cookieSessionUser !== null
					? cookieSessionUser
					: uuid.v4(),
			deviceName:
				(isMobile ? mobileVendor + " " + mobileModel : browserName) +
				", IP: " +
				window.sessionStorage.getItem("ipAddress"),
			deviceSO: osName + " " + osVersion,
			deviceModel: isMobile
				? mobileModel + ", " + browserName + " " + fullBrowserVersion
				: browserName + " " + fullBrowserVersion,
			deviceStatus: true,
			userName: user.getUserName(),
			source: "MONEYCLICK_WEB",
		};

		this.setState({
			deviceId: body.deviceId,
			deviceName: body.deviceName,
			deviceSO: body.deviceSO,
			deviceModel: body.deviceModel,
			deviceStatus: body.deviceStatus,
		});
	}

	addDeviceToUser(body) {
		let expiration = new Date();
		user
			.addDeviceToUser(body)
			.then((resp) => {
				if (resp.data.payload) {
					cookies.set("SessionUserDevice", body.deviceId, {
						path: "/",
						expires: expiration,
					});
					let devices = JSON.parse(window.sessionStorage.getItem("devices"));
					delete body.userName;
					body.deviceAtDate = new Date().getTime();
					if (devices !== null && devices !== undefined) {
						devices.push(body);
					} else {
						devices = [];
						devices.push(body);
					}
					window.sessionStorage.setItem("devices", JSON.stringify(devices));
					this.setState({
						resultUpdatingMessage: "login.successUpdating.addDevice",
						successUpdate: true,
					});
					setTimeout(() => {
						this.setState({
							resultUpdatingMessage: "",
							// loadingButtons: false,
							contentModal: "",
							currentDeviceStatus: false,
							successUpdate: false,
							// showModal: false
						});
						this.setState({ readyToRedirect: true });
					}, 3000);
				} else {
					if (resp.data.errors.length > 0) {
						if (resp.data.errors[0].code === 55) {
							this.setState({
								resultUpdatingMessage: "login.errors.deviceInUser",
								errorUpdatingDevice: true,
							});
							setTimeout(() => {
								this.setState({
									resultUpdatingMessage: "",
									loadingButtons: false,
									contentModal: "",
									currentDeviceStatus: false,
									errorUpdatingDevice: false,
									showModal: false,
								});
								this.setState({ readyToRedirect: true });
							}, 3000);
						} else if (resp.data.errors[0].code === 32) {
							this.setState({
								resultUpdatingMessage: "login.errors.userNotFound",
								errorUpdatingDevice: true,
							});
							setTimeout(() => {
								this.setState({
									resultUpdatingMessage: "",
									loadingButtons: false,
									contentModal: "",
									currentDeviceStatus: false,
									errorUpdatingDevice: false,
									showModal: false,
								});
								this.setState({ readyToRedirect: true });
							}, 3000);
						}
					} else {
						this.setState({
							resultUpdatingMessage: "login.errors.unexpectedError",
							errorUpdatingDevice: true,
						});
						setTimeout(() => {
							this.setState({
								resultUpdatingMessage: "",
								loadingButtons: false,
								contentModal: "",
								currentDeviceStatus: false,
								errorUpdatingDevice: false,
								showModal: false,
							});
							this.setState({ readyToRedirect: true });
						}, 3000);
					}
				}
			})
			.catch((error) => {
				this.setState({
					resultUpdatingMessage: "login.errors.unexpectedError",
					errorUpdatingDevice: true,
				});
				setTimeout(() => {
					this.setState({
						resultUpdatingMessage: "",
						loadingButtons: false,
						contentModal: "",
						currentDeviceStatus: false,
						errorUpdatingDevice: false,
						showModal: false,
					});

					this.setState({ readyToRedirect: true });
				}, 3000);
			});
	}
	setLoginFull(res, password, walletsDLBT) {
		var websocketKey = uuid.v4();

		window.sessionStorage.setItem(
			"lastName",
			res.data.user.lastName !== undefined && res.data.user.lastName !== null
				? res.data.user.lastName
				: "",
		);
		window.sessionStorage.setItem("nickname", this.state.nickname);
		// window.sessionStorage.setItem("firstName", this.state.firstname);
		window.sessionStorage.setItem("countryCode", res.data.user.countryCode);
		window.sessionStorage.setItem("twoFactor", res.data.user.has2FAEnabled);
		//se valida el nro con el username del usuario ke es el mismo phone

		window.sessionStorage.setItem("username", res.data.user.username);
		window.sessionStorage.setItem("email", res.data.user.email);
		window.sessionStorage.setItem(
			"preferedSendCodeSecurity",
			res.data.user.preferedSendCodeSecurity,
		);
		window.sessionStorage.setItem(
			"2FactorPrefered",
			res.data.user.twoFactorPrefered,
		);

		window.sessionStorage.setItem("phoneVerified", "true");
		let status = user.getUserVerificationStatus();
		// //// (status);
		let statusUpdate;
		if (status === null) {
			statusUpdate = {
				A: status,
				B: true,
				C: status,
			};
		} else {
			statusUpdate = {
				A: status.A,
				B: true,
				C: status.C,
			};
		}

		window.sessionStorage.setItem(
			"userVerificationStatus",
			JSON.stringify(statusUpdate),
		);

		let hashCredencial = btoa(password + ":" + res.data.user.username);
		window.sessionStorage.setItem("header", hashCredencial);
		window.sessionStorage.setItem("verify", true);
		window.sessionStorage.setItem(
			"devices",
			JSON.stringify(res.data.user.devices),
		);
		window.sessionStorage.setItem(
			"specialreferralCode",
			this.state.codeSpecial,
		);
		this.determinateUpdateWallet(res.data.user.wallets, walletsDLBT);
		let usernoAdmin = {
			id: "",
			name: "",
			functionsAvailables: ["not"],
		};
		sessionStorage.setItem(
			"r",
			res.data.user.rol !== null
				? JSON.stringify(res.data.user.rol)
				: JSON.stringify(usernoAdmin),
		);
		window.sessionStorage.setItem("websocketKey", websocketKey);
		// this.updateUsersDevices();
		if (res.data.user.has2FAEnabled === true) {
			//  this.get2FPreference();
			if (
				res.data.user.lastConexion === null ||
				res.data.user.lastConexion === undefined
			) {
				this.setState({ twoFactor: true });
				window.sessionStorage.setItem("auth", false);
				user.updateLastConexion(res.data.user.username);
			} else {
				let actualDate = new Date();
				let lastDate = new Date(res.data.user.lastConexion);
				let result = actualDate.getTime() - lastDate.getTime();
				if (result > 360) {
					this.setState({ twoFactor: true });
					window.sessionStorage.setItem("auth", false);
				} else {
					this.setState({ auth: true });
					window.sessionStorage.setItem("auth", true);
				}
			}
		} else {
			this.setState({ auth: true, factorPrefered: true });
			sessionStorage.setItem("auth", true);
			user.updateLastConexion(res.data.user.username);
		}
	}
	setLoginNotVerifiedEmail(res, email, password, walletsDLBT) {
		let send = {
			userName: res.data.user.username,
			fieldName: "email",
			fieldValue: this.state.email,
		};

		this.addDataUserAsync(send);

		var websocketKey = uuid.v4();
		window.sessionStorage.setItem("auth", true);
		window.sessionStorage.setItem("websocketKey", websocketKey);
		// window.sessionStorage.setItem(
		//   "firstName",
		//   res.data.user.firstName !== undefined && res.data.user.firstName !== null
		//     ? res.data.user.firstName
		//     : ""
		// );
		// window.sessionStorage.setItem("firstName", this.state.firstname)
		window.sessionStorage.setItem("nickname", this.state.nickname);
		window.sessionStorage.setItem(
			"lastName",
			res.data.user.lastName !== undefined && res.data.user.lastName !== null
				? res.data.user.lastName
				: "",
		);
		//window.sessionStorage.setItem("phone", this.state.phone);
		// window.sessionStorage.setItem("nickname", this.state.nickname);
		window.sessionStorage.setItem("countryCode", this.state.countryCode);
		window.sessionStorage.setItem("twoFactor", res.data.user.has2FAEnabled);
		//se valida el nro con el username del usuario ke es el mismo phone
		window.sessionStorage.setItem("verify", true);
		window.sessionStorage.setItem("username", res.data.user.username);
		window.sessionStorage.setItem("email", this.state.email);
		window.sessionStorage.setItem(
			"preferedSendCodeSecurity",
			res.data.user.preferedSendCodeSecurity,
		);
		window.sessionStorage.setItem(
			"2FactorPrefered",
			res.data.user.preferedSendCodeSecurityTwoFactor,
		);

		window.sessionStorage.setItem("phoneVerified", "true");
		window.sessionStorage.setItem(
			"specialreferralCode",
			this.state.codeSpecial,
		);
		// window.sessionStorage.setItem("phoneVerified", res.data.user.phoneVerified);
		let status = user.getUserVerificationStatus();
		let statusUpdate;
		if (status === null) {
			statusUpdate = {
				A: status,
				B: true,
				C: status,
			};
		} else {
			statusUpdate = {
				A: status.A,
				B: true,
				C: status.C,
			};
		}

		window.sessionStorage.setItem(
			"userVerificationStatus",
			JSON.stringify(statusUpdate),
		);

		// let phone = email
		let send2 = {
			userName: res.data.user.username,
			fieldNames: ["phone"],
			userVerificationType: "B",
			info: "Verification of user's telephone number",
		};

		user
			.verifyUserRequestCore(send2)
			.then((rep) => {})
			.catch((error) => {
				let e = error.toString();
				if (e.includes("Network")) {
					this.setState({
						loadform: false,
						errorForm: true,
						messageError: "registration.errors.errorNetwork",
					});
					setTimeout(() => {
						this.setState({
							errorForm: false,
							textMessage: "",
						});
					}, 4000);
				} else {
					// ("error de verifyUserCore:", error);
				}
			});

		let hashCredencial = btoa(password + ":" + email);
		window.sessionStorage.setItem("header", hashCredencial);
		let walletsBushido = res.data.user.wallets;
		let walletsToUpdate = [];
		if (walletsDLBT !== undefined) {
			let currentAddress = Object.values(walletsDLBT.current)[0].address;
			//////// (currentAddress);
			walletsToUpdate = walletsBushido.filter((wallet) => {
				if (
					wallet.creationDate === undefined ||
					wallet.creationDate === null ||
					wallet.creationDate === 0
				)
					if (wallet.address === currentAddress) return wallet;
			});
			//////// (walletsToUpdate);
		}
		window.sessionStorage.setItem(
			"wallets",
			JSON.stringify(
				walletsToUpdate.length > 0 ? walletsToUpdate : walletsBushido,
			),
		);
		user.updateLastConexion(email);
		this.setState({ auth: true });
	}
	onClickCloseModalTermsAndConditions() {
		this.setState({
			seeTermsAndConditions: false,
		});
	}
	componentDidMount() {
		//this.clearFields()
		this.readUrlWhitParams();
		this.addNewBrowserToUser();
		this.getReferralCode();
		this.getLanguage();
	}
	onClickTermsAndConditions() {
		this.setState({
			seeTermsAndConditions: true,
		});
	}

	readUrlWhitParams() {
		let query = parse(window.location.search);

		if (query === "" || query === null) {
			// //// ("no tiene nada la url", query);
			this.setState({ varlog: false });
		} else {
			//  //// ("dentro del else del readUrlParams");
			let tokenUrl = [];
			let typeOffer = "";
			if (query.offerKey !== undefined) {
				tokenUrl = query.offerKey;
				typeOffer = "offerKey";
			} else if (query.brokerOfferKey !== undefined) {
				tokenUrl = query.brokerOfferKey;
				typeOffer = "brokerOfferKey";
			}

			if (tokenUrl !== undefined && tokenUrl !== " " && tokenUrl !== null) {
				this.setState({
					varlog: true,
				});
				this.setState({
					tokenurl: tokenUrl,
					typeOffer: typeOffer,
				});
			}
		}
	}
	gotoLoginToken() {
		window.location.href =
			"/login/?" + this.state.typeOffer + "=" + this.state.tokenurl;
	}

	handleModalCloseRegistration() {
		this.setState({ viewModalSuccess: false }, () => {
			window.sessionStorage.setItem("timeLogin", new Date());

			window.location.href = "/";
		});
	}
	handlePassword(e) {
		this.setState({ password: e.target.value });
	}
	handlePrefit(e, data) {
		this.setState({ countryCode: data.value });
	}
	handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery });

	loginCode() {
		if (this.state.code !== "") {
			let request = {
				userName: this.state.countryCode + this.state.phone,
				//email: this.state.email,
				code: this.state.code,
				// registration: this.state.registration,
			};

			user
				.authCodeCore(request)
				.then((res) => {
					if (res.data === "OK") {
						this.setState({
							verified: true,
							verifiedPhone: true,
						});

						this.beforeSetPin();
					} else {
						this.setState({
							loadform: false,
							message: "login2FA.errors.failAuth",
							errorCode: true,
						});
						setTimeout(() => {
							this.setState({
								message: "",
								errorCode: false,
								//showFormComplete: false
							});
						}, 5000);
					}
				})
				.catch((error) => {
					let e = error.toString();
					if (e.includes("Network")) {
						this.setState({
							loadform: false,
							errorForm: true,
							messageError: "registration.errors.errorNetwork",
						});
						setTimeout(() => {
							this.setState({
								errorForm: false,
								textMessage: "",
								showFormComplete: false,
							});
						}, 4000);
					} else {
						this.setState({
							loadform: false,
							message: "login2FA.errors.serverError",
							errorCode: true,
						});
						setTimeout(() => {
							this.setState({
								message: "",
								errorCode: false,
								showFormComplete: false,
							});
						}, 5000);
					}
				});
		} else {
			this.setState({
				loadform: false,
				errorCode: true,
				message: "login2FA.errors.requiredField",
			});
			setTimeout(() => {
				this.setState({ errorCode: false, message: "" });
			}, 5000);
		}
	}
	sendCode() {
		this.setState({ code: "", loadform: true });

		let body = {
			userName: this.state.countryCode + this.state.phone,
			language: this.state.spanish === true ? "ES" : "EN",
			sendSms: true,
			sendMail: false,
			mcNewUser: true,
		};
		user
			.findUserByPhone(this.state.phone, this.state.countryCode)
			.then((resp) => {
				if (resp.data.errors === null && resp.data.payload !== null) {
					this.setState({
						loadform: false,
						errorForm: true,
						messageError: "registration.errors.errorSign",
					});
					setTimeout(() => {
						this.setState({
							errorForm: false,
							messageError: "",
						});
					}, 5000);
				} else if (resp.data.errors[0].code === 32) {
					user
						.sendAuthCodeCore(body)
						.then((resp) => {
							let text =
								this.state.translator(
									"buy.formVerificationPhone.messages.sentToken.part1",
								) +
								this.state.countryCode +
								this.state.phone.substring(0, 3) +
								this.state.translator(
									"buy.formVerificationPhone.messages.sentToken.part2",
								) +
								this.state.phone.slice(-2) +
								this.state.translator(
									"buy.formVerificationPhone.messages.sentToken.part3",
								);
							if (resp.data === "OK") {
								this.setState({
									loading: false,
									loadform: false,
									codeSended: true,

									showFormComplete: true,
									showModalRegistration: false,
									message: text,
									timer: true,
								});

								setTimeout(() => {
									this.setState({
										timer: false,
									});
								}, 60000);
							} else {
								this.setState({
									loading: false,
									// phoneInvalide: true,
									textMessage: "buy.formVerificationPhone.errors.tokenNotSent",
								});
							}
						})
						.catch((error) => {
							let e = error.toString();
							if (e.includes("Network")) {
								this.setState({
									loadform: false,
									errorForm: true,
									messageError: "registration.errors.errorNetwork",
								});
								setTimeout(() => {
									this.setState({
										errorForm: false,
										textMessage: "",
									});
								}, 4000);
							}
						});
				}
			});
	}
	beforeSetPin() {
		//i	console.log("en el before set Pin");
		let phone = this.state.countryCode + this.state.phone;

		var userdollarbtc = {
			userName: phone,
			referralCode: this.state.referralCode,
			email: this.state.email,
			masterWalletIds: {},
			amounts: {
				BTC: 0,
				USDT: 0,
				ETH: 0,
			},
			userProfile: "NORMAL",
		};

		let body = {
			password: this.state.password,
			phone: this.state.phone,
			countryCode: this.state.countryCode,
			deviceId: this.state.deviceId,
			deviceName: this.state.deviceName,
			deviceSO: this.state.deviceSO,
			deviceModel: this.state.deviceModel,
			organization: "individuals",
			regCode: this.state.code,
			firstName: "", //this.state.firstname,
			source: "MONEYCLICK_WEB",
		};

		if (this.state.password !== "" && this.state.passwordRepeat !== "") {
			this.setState({
				loadform: true,
			});
			window.sessionStorage.setItem("username", phone);
			window.sessionStorage.setItem("countryCode", this.state.countryCode);
			window.sessionStorage.setItem("phone", this.state.phone);
			window.sessionStorage.setItem("password", this.state.password);
			window.sessionStorage.setItem("phoneVerified", "true");

			window.sessionStorage.setItem("nickname", this.state.nickname);

			user
				.findUserByPhone(this.state.phone, this.state.countryCode)
				.then(async (resp) => {
					if (resp.data.errors === null && resp.data.payload !== null) {
						this.setState({
							loadform: false,
							errorForm: true,
							messageError: "registration.errors.errorSign",
						});
						setTimeout(() => {
							this.setState({
								errorForm: false,
								messageError: "",
							});
						}, 5000);
					} else if (resp.data.errors[0].code === 32) {
						let valit = await this.verifyThisUserInCore(phone);
						//console.log(valit);
						if (valit !== "USER_EXIST") {
							let result = await this.verifyThisUserInCore(phone); //retorna la accion en el back

							if (result === "ACTIVE_AND_CREATE") {
								//console.log("dentro de ACTIVE_AND_CREATE");
								let active = user.activateUser(phone);
								//console.log("activo ? :", active);
								user
									.signinUserToBushido(body)
									.then((res) => {
										//console.log("respuesta del sigiN bushido:", res);
										if (res.data.payload && res.data.errors === null) {
											var wallets = {};
											for (var i = 0; i < res.data.payload.length; i++) {
												Object.defineProperty(
													wallets,
													res.data.payload[i].currency,
													{
														value: res.data.payload[i].name,
														enumerable: true,
														configurable: true,
														writable: true,
													},
												);
											}
											userdollarbtc.masterWalletIds = wallets;

											var userr = {
												email: this.state.email, // phone tentativo para saber por donde se va a buscar el usuario
												firstName: "", //this.state.firstname,
												lastName: "",
												countryCode: this.state.countryCode,
												phone: this.state.phone,
												has2FAEnabled: false,
											};
											let hashCredencial = btoa(
												this.state.password + ":" + phone,
											);
											window.sessionStorage.setItem("header", hashCredencial);

											user
												.updateNewNickName(this.state.nickname)
												.then((resp) => {
													//console.log("respuesta del updatenickname");
												})
												.catch((e) => {
													//console.log("error de catch update nickname");
												});

											user
												.updateProfile(userr, phone)
												.then(async (resp) => {
													if (resp.data.payload === true) {
														let a = await user.verifyPhoneBushido(phone);

														let send = {
															userName: phone,
															fieldName: "nickname",
															fieldValue: this.state.nickname,
														};

														await this.addDataUserAsync(send); // agregamos el dato al core ke viene del form

														let as = {
															userName: phone,
															fieldName: "phone",
															fieldValue: phone,
														};

														await this.addDataUserAsync(as); // agregamos el dato al core ke viene del form
														//console.log("antes del authuserlogin");
														this.authUserLogin(phone, this.state.password); //aca se verifica el phone en dbtc
														this.setBalanceInStore(phone);
														user.generateKeyService(phone, this.state.password);

														setTimeout(() => {
															this.setState({ viewModalSuccess: false }, () => {
																window.sessionStorage.setItem(
																	"timeLogin",
																	new Date(),
																);

																window.location.href = "/";
															});
														}, 7000);
													} else {
														//console.log("payload !== true updateing profile");
													}
												})
												.catch((error) => {
													//console.log("error catch ", error);
													let e = error.toString();
													if (e.includes("Network")) {
														this.setState({
															loadform: false,
															errorForm: true,
															messageError: "registration.errors.errorNetwork",
														});
														setTimeout(() => {
															this.setState({
																errorForm: false,
																textMessage: "",
															});
														}, 4000);
													}
												});
										} else {
											if (res.data.errors[0].code === 48) {
												this.setState({ loadform: false });
												this.setState({
													errorForm: true,
													messageError: "registration.errors.form.phone",
												});

												setTimeout(() => {
													this.setState({ errorForm: false, messageError: "" });
												}, 6000);
											}
											if (res.data.errors[0].code === 20) {
												this.setState({ loadform: false });
												this.setState({
													errorForm: true,
													messageError: "registration.errors.form.username",
												});
												setTimeout(() => {
													this.setState({ errorForm: false, messageError: "" });
												}, 6000);
											}
											if (res.data.errors[0].code === 7) {
												this.setState({ loadform: false });
												this.setState({
													errorForm: true,
													messageError: "registration.errors.form.phone",
												});
												setTimeout(() => {
													this.setState({ errorForm: false, messageError: "" });
												}, 6000);
											}
										}
									})
									.catch((error) => {
										let e = error.toString();
										if (e.includes("Network")) {
											this.setState({
												loadform: false,
												errorForm: true,
												messageError: "registration.errors.errorNetwork",
											});
											setTimeout(() => {
												this.setState({
													errorForm: false,
													textMessage: "",
												});
											}, 4000);
										} else {
											console.log(error);
										}
									});
							} else {
								//console.log("otro caso del active and create");
								user
									.signinUserToBushido(body)
									.then((res) => {
										if (res.data.payload && res.data.errors === null) {
											var wallets = {};
											for (var i = 0; i < res.data.payload.length; i++) {
												Object.defineProperty(
													wallets,
													res.data.payload[i].currency,
													{
														value: res.data.payload[i].name,
														enumerable: true,
														configurable: true,
														writable: true,
													},
												);
											}
											userdollarbtc.masterWalletIds = wallets;

											var userr = {
												email: this.state.email, // phone tentativo para saber por donde se va a buscar el usuario
												firstName: "", //this.state.firstname,
												lastName: "",
												countryCode: this.state.countryCode,
												phone: this.state.phone,
												has2FAEnabled: false,
											};

											let hashCredencial = btoa(
												this.state.password + ":" + phone,
											);
											window.sessionStorage.setItem("header", hashCredencial);

											user
												.updateNewNickName(this.state.nickname)
												.then((resp) => {})
												.catch((e) => {});

											user
												.updateProfile(userr, phone) //update phone en bushido
												.then(async (resp) => {
													if (resp.data.payload === true) {
														let a = await user.verifyPhoneBushido(phone); //verificacion del phone en bushido

														this.sigNinDollarBtc(
															userdollarbtc,
															this.state.password,
														);
													}
												})
												.catch((error) => {
													let e = error.toString();
													if (e.includes("Network")) {
														this.setState({
															loadform: false,
															errorForm: true,
															messageError: "registration.errors.errorNetwork",
														});
														setTimeout(() => {
															this.setState({
																errorForm: false,
																textMessage: "",
															});
														}, 4000);
													}
												});
										} else {
											//	console.log("dentro del else de errores ");
											if (res.data.errors[0].code === 48) {
												this.setState({ loadform: false });
												this.setState({
													errorForm: true,
													messageError: "registration.errors.form.phone",
												});

												setTimeout(() => {
													this.setState({ errorForm: false, messageError: "" });
												}, 6000);
											}
											if (res.data.errors[0].code === 20) {
												this.setState({ loadform: false });
												this.setState({
													errorForm: true,
													messageError: "registration.errors.form.username",
												});
												setTimeout(() => {
													this.setState({ errorForm: false, messageError: "" });
												}, 6000);
											}
											if (res.data.errors[0].code === 7) {
												this.setState({ loadform: false });
												this.setState({
													errorForm: true,
													messageError: "registration.errors.form.phone",
												});
												setTimeout(() => {
													this.setState({ errorForm: false, messageError: "" });
												}, 6000);
											}
										}
									})
									.catch((error) => {
										let e = error.toString();
										if (e.includes("Network")) {
											this.setState({
												loadform: false,
												errorForm: true,
												messageError: "registration.errors.errorNetwork",
											});
											setTimeout(() => {
												this.setState({
													errorForm: false,
													textMessage: "",
												});
											}, 4000);
										} else {
											this.setState({ loadform: false });
											this.setState({
												errorForm: true,
												messageError: "registration.errors.unexpectedError",
											});
										}
									});
							}
						} else {
							this.setState({
								loadform: false,
								errorForm: true,
								messageError: "registration.errors.errorSign",
							});
							setTimeout(() => {
								this.setState({
									errorForm: false,
									messageError: "",
								});
							}, 5000);
						}
					}
				})
				.catch((error) => {
					let e = error.toString();
					if (e.includes("Network")) {
						this.setState({
							loadform: false,
							errorForm: true,
							messageError: "registration.errors.errorNetwork",
						});
						setTimeout(() => {
							this.setState({
								errorForm: false,
								textMessage: "",
							});
						}, 4000);
					} else {
					}
				});
		}
	}

	setPinUser(pin, body, password) {
		user
			.setPinUserB(pin)
			.then((res) => {
				if (res.data.payload != null) {
					this.sigNinDollarBtc(body, password);
				}
			})
			.catch((error) => {
				let e = error.toString();
				if (e.includes("Network")) {
					this.setState({
						loadform: false,
						errorForm: true,
						messageError: "registration.errors.errorNetwork",
					});
					setTimeout(() => {
						this.setState({
							errorForm: false,
							textMessage: "",
						});
					}, 4000);
				} else {
					this.setState({ loadform: false });
				}
			});
	}
	async sigNinDollarBtc(body, password) {
		let phone;

		phone = this.state.countryCode + this.state.phone;

		user
			.sigNinDollarBtcB(body) //............user/create
			.then(async (resp) => {
				if (resp.data.result === "OK") {
					let em = {
						userName: phone,
						fieldName: "phone",
						fieldValue: phone,
					};

					await this.addDataUserAsync(em);

					let f = {
						userName: phone,
						fieldName: "nickname",
						fieldValue: this.state.nickname,
					};

					await this.addDataUserAsync(f);

					let f2 = {
						userName: phone,
						fieldName: "sourceSignin",
						fieldValue: "MONEYCLICK WEB",
					};

					await this.addDataUserAsync(f2);
					let setCompany = {
						userName: body.userName,
						fieldName: "company",
						fieldValue: this.state.company,
					};
					this.addDataUserAsync(setCompany);
					this.authUserLogin(body.userName, password); //aca se verifica el phone en dbtc
					this.setBalanceInStore(body.userName);
					user.generateKeyService(body.userName, password);

					setTimeout(() => {
						this.setState({ viewModalSuccess: false }, () => {
							window.sessionStorage.setItem("timeLogin", new Date());

							window.location.href = "/";
						});
					}, 7000);
				} else {
					this.setState({
						loadform: false,
						errorForm: true,
						messageError: "registration.errors.errorSign",
					});
				}
			})
			.catch((error) => {
				let e = error.toString();
				if (e.includes("Network")) {
					this.setState({
						loadform: false,
						errorForm: true,
						messageError: "registration.errors.errorNetwork",
					});
					setTimeout(() => {
						this.setState({
							errorForm: false,
							textMessage: "",
						});
					}, 4000);
				} else {
				}
			});
	}

	reSentCode() {
		this.setState({ code: "" });
		let body = {};

		body = {
			userName: this.state.countryCode + this.state.phone,
			language: "EN",
			sendSms: true,
			sendMail: false,
			mcNewUser: true,
		};

		user
			.sendAuthCodeCore(body)
			.then((res) => {
				this.setState({
					timer: true,
				});
				setTimeout(() => {
					this.setState({ timer: false });
				}, 60000);
			})
			.catch((error) => {
				this.setState({
					timer: false,
				});
				setTimeout(() => {
					this.setState({ timer: true });
				}, 60000);
			});
	}

	handleEmailFamily(e, data) {
		let mail = e.target.value;
		this.setState({ email: mail });
	}
	handleCloseRegistration() {
		this.setState({ showFormComplete: false });
	}
	clearFields() {
		this.setState({
			showFormComplete: false,
			viewModalSuccess: false,
			nickname: "",
			captchaValue: "",
			email: "",
			phone: "",
			countryCode: "",
			password: "",
			passwordRepeat: "",
			conditions: "",
			captcha: "",
			referralCode: "",
		});
		//this.props.handleCloseRegistration();
	}
	async getReferralCode() {
		try {
			let response = await user.getReferralCode();
			this.setState({ referralCodeList: response.data });
		} catch (error) {
			let e = error.toString();
			if (e.includes("Network")) {
				this.setState({
					loadform: false,
					errorForm: true,
					messageError: "registration.errors.errorNetwork",
				});
				setTimeout(() => {
					this.setState({
						errorForm: false,
						textMessage: "",
					});
				}, 4000);
			}
		}
	}
	render() {
		let errorPassword;
		let errorEmail;
		let labelCode;
		let errorAlreadyPhone;
		let errorPhone;
		let errorCountry;
		let message, labelCaptcha;
		let errorRepeatPassword;
		let errorForm, labelReferral;
		let resultPostMessage, errornickname;
		let resultPost = this.state.resultPost;
		let t = this.state.translator;
		let list = [];
		if (this.state.prefit.length > 0) {
			for (let pre of this.state.prefit) {
				if (pre.value !== "") {
					list.push({
						text:
							window.sessionStorage.getItem("language") === "es"
								? pre.nombre + " (+" + pre.value + ")"
								: pre.text + " (+" + pre.value + ")",
						value: pre.value,
						key: pre.iso2,
					});
				}
			}
		}
		if (this.state.errorCode) {
			labelCode = (
				<Label basic color='red' pointing>
					{t(this.state.message)}
				</Label>
			);
		}
		if (this.state.errorReferral) {
			labelReferral = (
				<Label basic color='red' pointing>
					{t(this.state.message)}
				</Label>
			);
		}
		if (this.state.notAuth) {
			message = (
				<Message
					compact
					error
					header={t("login.errors.credentials.header")}
					content={t("login.errors.credentials.content")}
				/>
			);
		}
		if (this.state.registrer) {
			return <Redirect to='/' />;
		}

		if (this.state.errorCaptcha) {
			labelCaptcha = (
				<div>
					<Message error header='Error' content={t(this.state.message)} />
					<Divider hidden />
				</div>
			);
		}

		if (this.state.errorAlreadyPhone) {
			errorAlreadyPhone = (
				<div>
					<Message error header='Error' content={this.state.message} />
					<Divider hidden />
				</div>
			);
		}
		if (this.state.errorLog) {
			labelCaptcha = (
				<div>
					<Message info>
						<Message.Content>
							{t(this.state.message)}
							<br />
							<a href='https://clients.dollarbtc.com'>
								https://clients.dollarbtc.com
							</a>
						</Message.Content>
					</Message>
					<Divider hidden />
				</div>
			);
		}
		if (this.state.errorPassword) {
			errorPassword = (
				<Label basic color='red' pointing>
					{t(this.state.messageError)}
				</Label>
			);
		}
		if (this.state.errorNickName) {
			errornickname = (
				<Label basic color='red' pointing>
					{t(this.state.messageError)}
				</Label>
			);
		}
		if (this.state.errorEmail) {
			errorEmail = (
				<Label basic color='red' pointing>
					{t(this.state.messageError)}
				</Label>
			);
		}
		if (this.state.errorRepeatPassword) {
			errorRepeatPassword = (
				<Label basic color='red' pointing>
					{t(this.state.messageError)}
				</Label>
			);
		}

		if (this.state.errorPhone) {
			errorPhone = (
				<Label basic color='red' pointing>
					{t(this.state.messageError)}
				</Label>
			);
		}

		if (this.state.errorCountry) {
			errorCountry = (
				<Label basic color='red' pointing>
					{t(this.state.messageError)}
				</Label>
			);
		}

		if (this.state.errorForm) {
			errorForm = <Message error content={t(this.state.messageError)} />;
		}
		if (resultPost === "success") {
			resultPostMessage = (
				<div>
					<Message
						info
						content={t("registration.modalResult.resultPost.headerComplete")}
					/>
				</div>
			);
		} else {
			resultPostMessage = <div>{resultPost}</div>;
		}
		return (
			<div>
				<Grid columns='equal' style={isMobile ? { marginTop: "3rem" } : { marginTop: "1rem" }}>
					<Grid.Column largeScreen={8} computer={8} widescreen={7} mobile={6}>
						{this.state.spanish && <Image src={img1} size='large' />}
						{!this.state.spanish && <Image src={img1english} size='large' />}
					</Grid.Column>
					<Grid.Column
						largeScreen={6}
						computer={7}
						widescreen={7}
						mobile={9}
						style={isMobile ? { marginTop: "1rem" }:{ marginTop: "6rem" }}>
						<Header
							size='large'
							content={t("registration.registerUser")}
							textAlign='left'
						/>

						{this.state.loadform && (
							<Dimmer active inverted>
								<Loader size='small' inverted />
							</Dimmer>
						)}

						<Form widths='equal' className='form-login' error unstackable>
							<Form.Field>
								<Form.Input
									type='text'
									label={t("registration.form.username")}
									placeholder={t("registration.form.username")}
									value={this.state.nickname}
									onChange={(e, data) => {
										if (e.target.value.length <= 20) {
											this.setState({ nickname: e.target.value.trim() });
										}
									}}
								/>
								{errornickname}
							</Form.Field>
							<Form.Group widths='equal'>
								<Form.Field>
									<label> {t("login.country")}</label>
									<Dropdown
										placeholder={t("login.country")}
										fluid
										search
										selection
										options={list}
										value={this.state.countryCode}
										onChange={this.handlePrefit.bind(this)}
										onSearchChange={this.handleSearchChange.bind(this)}
										required
									/>
									{errorCountry}
								</Form.Field>

								<Form.Field>
									<label>{t("login.phone")}</label>
									<NumberFormat
										required
										value={this.state.phone}
										allowNegative={false}
										thousandSeparator={false}
										placeholder={"12345678"}
										isAllowed={(values) => {
											const { value } = values;
											return value.length <= 20;
										}}
										onValueChange={(values) => {
											const { value } = values;
											this.setState({ phone: value });
										}}
									/>
									{errorPhone}
								</Form.Field>
							</Form.Group>
							<Form.Field>
								<label>{t("login.email")}</label>
								<Input
									value={this.state.email}
									placeholder='Email'
									required
									type='email'
									onChange={this.handleEmailFamily.bind(this)}
								/>
								{errorEmail}
							</Form.Field>
							<Form.Field>
								<label>{t("login.password")}</label>
								<Input
									icon={
										this.state.hidden ? (
											<Icon
												name='eye'
												circular
												link
												onClick={this.toggleShow.bind(this)}
											/>
										) : (
											<Icon
												name='eye slash'
												circular
												link
												onClick={this.toggleShow.bind(this)}
											/>
										)
									}
									type={this.state.hidden ? "password" : "text"}
									value={this.state.password}
									onChange={this.handlePassword.bind(this)}
									required
								/>
								{errorPassword}
							</Form.Field>

							<Form.Field>
								<label>{t("login.passwordrepeat")}</label>
								<Input
									icon={
										this.state.hiddenRepeat ? (
											<Icon
												name='eye'
												circular
												link
												onClick={this.toggleShowRepeat.bind(this)}
											/>
										) : (
											<Icon
												name='eye slash'
												circular
												link
												onClick={this.toggleShowRepeat.bind(this)}
											/>
										)
									}
									type={this.state.hiddenRepeat ? "password" : "text"}
									value={this.state.passwordRepeat}
									onChange={this.handleRepeatPassword.bind(this)}
									required
								/>
								{errorRepeatPassword}
							</Form.Field>

							{/* <Form.Field>
								<label>{t("registration.form.referralCode")}</label>
								<Input
									type='text'
									placeholder={t("registration.form.referralCodeOptional")}
									value={this.state.referralCode}
									onChange={this.handleCodeReferral}
								/>
								{labelReferral}
							</Form.Field> */}
							<Form.Checkbox
								style={isMobile ? {}: { marginLeft: "115px" }}
								label={t("registration.form.companyText")}
								onChange={this.handleRegistryCompany.bind(this)}
								checked={this.state.company}
							/>
							<Form.Field>
								{errorForm}
								{message}
								{errorAlreadyPhone}
								{labelCaptcha}
							</Form.Field>
							<Divider hidden />
							{window.sessionStorage.getItem("language") === "es" && (
								<div className='captcha'>
									 <p style={{textAlign: 'center'}}>{t("login.captcha")}</p>
									<ReCAPTCHA
										id='reca'
										ref={recapcha}
										hl={window.sessionStorage.getItem("language")}
										size={isMobile ? "compact" : "normal"}
										style={{
											marginLeft: isMobile ? 20 : 95,
										}}
										sitekey='6LeuR_AUAAAAACjTTEYOxkyCxqnxU9FhEMzV45xe'
										onChange={this.handleCaptcha}
									/>
								</div>
							)}
							{window.sessionStorage.getItem("language") === "en" && (
								<div className='captcha'>
									 <p style={{textAlign: 'center'}}>{t("login.captcha")}</p>
									<ReCAPTCHA
										id='reca'
										ref={recapcha}
										hl={window.sessionStorage.getItem("language")}
										size={isMobile ? "compact" : "normal"}
										style={{
											marginLeft: isMobile ? 20 : 95,
										}}
										sitekey='6LeuR_AUAAAAACjTTEYOxkyCxqnxU9FhEMzV45xe'
										onChange={this.handleCaptcha}
									/>
								</div>
							)}
							{/*<Form.Group inline style={isMobile ? {textAlign: 'left'}:{ marginLeft: "115px" }}>
								<Form.Checkbox
									onChange={this.handleConditions}
									checked={this.state.conditions === "true"}
								/>
								<Form.Field>
									<label style={isMobile ? {marginBottom: 30, marginhLeft: 20}:{ marginLeft: "-150px" }}>
										{t("registration.form.terms.first")}
										<a href='#' onClick={this.onClickTermsAndConditions}>
											{t("registration.form.terms.second")}
										</a>
									</label>
								</Form.Field>
									</Form.Group>*/}
							{!isMobile && <Divider hidden={true}></Divider>}
							<Grid >
								{!isMobile && <Grid.Column largeScreen={3} computer={3} widescreen={3}></Grid.Column>}
								<Grid.Column largeScreen={1} computer={2} widescreen={1} mobile={2}>
											<Form.Checkbox
									onChange={this.handleConditions}
									checked={this.state.conditions === "true"}
								/>
								</Grid.Column>
								<Grid.Column largeScreen={8} computer={8} widescreen={8} mobile={13}>
										<Form.Field>
									<label>
										{t("registration.form.terms.first")}
										<a href='#' onClick={this.onClickTermsAndConditions}>
											{t("registration.form.terms.second")}
										</a>
									</label>
								</Form.Field>
								</Grid.Column>
							</Grid>
						</Form>

						<Divider hidden />

						{!this.state.showFormComplete && (
							<div className='button-login'>
								<Button onClick={this.handleRegistrer.bind(this)}>
									{t("registration.signup")}
								</Button>
							</div>
						)}
					</Grid.Column>
					<Grid.Column largeScreen={2} computer={1} widescreen={2} />
				</Grid>
				<Divider hidden />
				<Modal
					open={this.state.showFormComplete}
					onClose={() => this.clearFields()}
					size='tiny'>
					<Modal.Content>
						{!this.state.viewModalSuccess && (
							<div>
								<Form loading={this.state.loadform} error unstackable>
									<Form.Field>
										<Image
											src={image}
											size='small'
											style={{ marginLeft: "200px" }}></Image>
									</Form.Field>
									<Form.Field>
										<label>{t("login2FA.body3")}</label>
									</Form.Field>
									<Form.Field>
										<label>{t("login2FA.form.label")}</label>
										<input
											placeholder='xxxxxxx'
											value={this.state.code}
											maxLength='7'
											onChange={this.handleCode.bind(this)}
										/>
										{labelCode}
									</Form.Field>
									<Divider hidden />

									<Header textAlign='center'>
										<Form.Button
											onClick={this.loginCode.bind(this)}
											color='blue'
											size='large'>
											{t("login2FA.form.buttonConfirm")}
										</Form.Button>
										<Button
											disabled={this.state.timer}
											onClick={this.reSentCode.bind(this)}
											color='blue'
											size='small'>
											{t("login2FA.form.buttonResend")}
										</Button>
										<Divider hidden />
										<Form.Field style={{ marginLeft: "100px" }}>
											{errorForm}
											{message}
										</Form.Field>
									</Header>
								</Form>
							</div>
						)}
						{this.state.viewModalSuccess && <div>{resultPostMessage}</div>}
					</Modal.Content>
					{this.state.viewModalSuccess && (
						<Modal.Actions className='actions-login'>
							<Button
								color='blue'
								secondary
								onClick={() => this.handleModalCloseRegistration()}>
								{t("registration.modalResult.closeButton")}
							</Button>
						</Modal.Actions>
					)}
				</Modal>
				<Modal open={this.state.seeTermsAndConditions}>
					<Modal.Header>{t("registration.modalTerms.header")}</Modal.Header>
					 <Modal.Content>
            <Modal.Description>
              <Message info>
                <TermsAndConditions />
              </Message>
            </Modal.Description>
          </Modal.Content>
					<Modal.Actions>
						<Button
							secondary
							onClick={this.onClickCloseModalTermsAndConditions.bind(this)}>
							{t("registration.modalTerms.closeButton")}
						</Button>
						<Button color='blue' onClick={this.handleConditions}>
							{t("registration.modalTerms.agreeButton")}
						</Button>
					</Modal.Actions>
				</Modal>
			</div>
		);
	}
}
export default translate(Registration);
