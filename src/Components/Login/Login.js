import React, { Component } from 'react';
import {
  Form,
  Header,
  Message,
  Label,
  Button,
  Modal,
  Icon,
  Input,
  Dropdown,
  Dimmer,
  Loader,
  Grid,
  Divider,
  Image
} from 'semantic-ui-react';
import { parse } from 'query-string';
import { Redirect } from 'react-router-dom';
import './Login.css';
import userService from '../../services/user';
import uuid from 'uuid';
import _ from 'underscore';
import Cookies from 'universal-cookie';
import RetailService from '../../services/moneyclick';
import { Link } from 'react-router-dom';
import translate from '../../i18n/translate';
import prefits from '../../common/prefits';
import NumberFormat from 'react-number-format';
import ReCAPTCHA from 'react-google-recaptcha';
import img1 from '../../img/back-1.png';
import img1english from '../../img/back-1-ingles.png';
import splash_mc from '../../img/splash_mc.jpg';
import {
  osVersion,
  osName,
  fullBrowserVersion,
  browserName,
  mobileVendor,
  mobileModel,
  isMobile,
} from 'react-device-detect';
const recapcha = React.createRef();
const cookies = new Cookies();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorUser: false,
      errorPassword: false,
      message: '',
      headerMessage: '',
      notVerifyUser: false,
      loadForm: false,
      notAuth: false,
      responseAuth: false,
      auth: false,
      varlog: false,
      userType: '',
      address: '',
      userStatus: '',
      balance: null,
      listUser: [],
      userWallets: null,
      showModal: false,
      errorUpdatingDevice: false,
      resultUpdatingMessage: 'notErrors',
      loadingButtons: false,
      contentModal: 'login.errors.notContent',
      currentDeviceStatus: '',
      successUpdate: false,
      readyToRedirect: false,
      tokenurl: '',
      hidden: true,
      retailIds: null,
      balanceBtc: '',
      balanceOtherCurrencies: [],
      balanceMoneyClick: [],
      retailsInfo: [],
      balanceRetail: {},
      translator: props.translate,
      completeAccount: false,
      factorPrefered: false,
      forgotPassword: false,
      prefit: prefits.country,
      countryCode: '',
      searchQuery: null,
      phone: '',
      errorForm: false,
      showFormComplete: false,
      nickname: '',
      email: '',
      errorEmail: false,
      errorNickName: false,
      hasEmail: false,
      captcha: '',
      referralCodeList: {},
      codeSpecial: false,
      load: true,
      spanish: false,
      enableActivateGiftCards: 'false',
    };
    this.handleUser = this.handleUser.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.login = this.login.bind(this);
    this.blankErrors = this.blankErrors.bind(this);
    this.authUserLogin = this.authUserLogin.bind(this);
    this.setLoginFull = this.setLoginFull.bind(this);
    this.acceptUpdateModifications = this.acceptUpdateModifications.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.handleCaptcha = this.handleCaptcha.bind(this);
  }
  componentDidMount() {
    if (window.sessionStorage.getItem('auth') === 'true') {
      window.open('/', '_self');
    } else {
      this.getReferralCode();
      this.getLanguage();
    }
  }
  getLanguage() {
    if (window.sessionStorage.getItem('language') === 'es') {
      this.setState({ spanish: true }, () => {
        this.setState({ load: false });
      });
    } else {
      this.setState({ spanish: false }, () => {
        this.setState({ load: false });
      });
    }
  }
  handleUser(e) {
    this.setState({ user: e.target.value.toLowerCase() });
  }
  handlePassword(e) {
    this.setState({ password: e.target.value });
  }
  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }
  handlePrefit(e, data) {
    this.setState({ countryCode: data.value });
  }
  handleCaptcha(params) {
    this.setState({
      captcha: params,
    });
  }
  closeModalLogin() {
    //this.props.handleClose();
    this.setState({ password: '', countryCode: '', captcha: '', phone: '' });
  }
  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery });
  getActualUserInfo = (allInfo) => {
    var listKeys = Object.keys(allInfo);
    var listActualKeys = [];
    var actualfirstNameKey;
    var actualLastnameKey;
    var actualPhoneKey;
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
    var acutualNickName;
    for (var i = 0; i < listKeys.length; i++) {
      if (listKeys[i].startsWith('firstName')) {
        actualfirstNameKey = listKeys[i];
      } else if (listKeys[i].startsWith('lastName')) {
        actualLastnameKey = listKeys[i];
      } else if (listKeys[i].startsWith('phone')) {
        actualPhoneKey = listKeys[i];
      } else if (listKeys[i].startsWith('questionSecurity')) {
        actualQuestionSecurityKey = listKeys[i];
      } else if (listKeys[i].startsWith('answerSecurity')) {
        actualAnswerSecurityKey = listKeys[i];
      } else if (listKeys[i].startsWith('typeDocumentIdentity')) {
        actualTypeDocumentIdentityKey = listKeys[i];
      } else if (listKeys[i].startsWith('numberDocumentIdentity')) {
        actualNumberDocumentIdentityKey = listKeys[i];
      } else if (listKeys[i].startsWith('gender')) {
        actualGenderKey = listKeys[i];
      } else if (listKeys[i].startsWith('birthdate')) {
        actualBirthdateKey = listKeys[i];
      } else if (listKeys[i].startsWith('birthplace')) {
        actualBirthplaceKey = listKeys[i];
      } else if (listKeys[i].startsWith('familyName')) {
        actualFamilyNameKey = listKeys[i];
      } else if (listKeys[i].startsWith('familyEmail')) {
        actualFamilyEmailKey = listKeys[i];
      } else if (listKeys[i].startsWith('userLocalBitcoin')) {
        actualUserLocalBitcoinKey = listKeys[i];
      } else if (listKeys[i].startsWith('userFacebook')) {
        actualUserFacebookKey = listKeys[i];
      } else if (listKeys[i].startsWith('userDirection')) {
        actualUserAddressKey = listKeys[i];
      } else if (listKeys[i].startsWith('nickname')) {
        acutualNickName = listKeys[i];
      }
    }
    listActualKeys.push(
      actualfirstNameKey,
      actualLastnameKey,
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
      acutualNickName,
      'address',
      'operationAccount',
      'environment',
      'type',
      'active',
      'email',
      'mcWallets',
      'wallets',
      'devices'
    );
    var modifiedObj = _.pick(allInfo, [listActualKeys]);
    var normalizeObject = {};
    Object.entries(modifiedObj).forEach(([key, value]) => {
      if (key.startsWith('firstName')) {
        normalizeObject.firstName = value;
      } else if (key.startsWith('lastName')) {
        normalizeObject.lastName = value;
      } else if (key.startsWith('email')) {
        normalizeObject.email = value;
      } else if (key.startsWith('active')) {
        normalizeObject.active = value;
      } else if (key === 'type') {
        normalizeObject.type = value;
      } else if (key.startsWith('environment')) {
        normalizeObject.environment = value;
      } else if (key.startsWith('operationAccount')) {
        normalizeObject.operationAccount = value;
      } else if (key.startsWith('address')) {
        normalizeObject.address = value;
      } else if (key.startsWith('questionSecurity')) {
        normalizeObject.questionSecurity = value;
      } else if (key.startsWith('answerSecurity')) {
        normalizeObject.answerSecurity = value;
      } else if (key.startsWith('typeDocumentIdentity')) {
        normalizeObject.typeDocumentIdentity = value;
      } else if (key.startsWith('numberDocumentIdentity')) {
        normalizeObject.numberDocumentIdentity = value;
      } else if (key.startsWith('gender')) {
        normalizeObject.gender = value;
      } else if (key.startsWith('birthdate')) {
        normalizeObject.birthdate = value;
      } else if (key.startsWith('birthplace')) {
        normalizeObject.birthplace = value;
      } else if (key.startsWith('familyName')) {
        normalizeObject.familyName = value;
      } else if (key.startsWith('familyEmail')) {
        normalizeObject.familyEmail = value;
      } else if (key.startsWith('userLocalBitcoin')) {
        normalizeObject.userLocalBitcoin = value;
      } else if (key.startsWith('userFacebook')) {
        normalizeObject.userFacebook = value;
      } else if (key.startsWith('userDirection')) {
        normalizeObject.userDirection = value;
      } else if (key.startsWith('phone')) {
        normalizeObject.phone = value;
      } else if (key.startsWith('nickname')) {
        normalizeObject.nickname = value;
      } else if (key.startsWith('wallets')) {
        normalizeObject.wallets = value;
      } else if (key.startsWith('mcWallets')) {
        normalizeObject.mcWallets = value;
      } else if (key.startsWith('devices')) {
        normalizeObject.devices = value;
      }
    });
    return normalizeObject;
  };
  async addInfoUser(user, field, value) {
    try {
      let body = {
        userName: user,
        fieldName: field,
        fieldValue: value,
      };
      const response = await userService.addDataUserAsync(body);
    } catch (error) {}
  }
  authUserLogin(username, password, wallet) {
    userService
      .authUser(username, password)
      .then(async (res) => {
        if (!res.data.errors || res.data.errors.length === 0) {
          console.log('dentro del auth user login', res.data);
          let userConfig = await this.validateUser(res.data.user.username);
          //	//console.log(userConfig);
          if (userConfig !== undefined) {
            sessionStorage.setItem(
              'lastSession',
              new Date().getTime().toString()
            );
            ////console.log(JSON.stringify(res.data.user));
            this.setLoginFull(res, password, userConfig.wallets);
            this.getBalanceMoneyClick(res.data.user.username);
            this.setState({ loadForm: false });
            this.closeModalLogin();
          } else {
            ////console.log(JSON.stringify(res.data.user));
            this.setState({
              errorForm: true,
              message: 'login.errors.credentials.header',
              loadForm: false,
              captcha: '',
            });
            setTimeout(() => {
              this.setState({
                errorForm: false,
              });
            }, 7000);
            if (recapcha.current !== null) {
              recapcha.current.reset('capt');
            }
            window.sessionStorage.removeItem('userBalanceBTC');
          }
        } else if (
          res.data.errors[0].code === 28 ||
          res.data.errors[0].code === 29
        ) {
          let userConfig = await this.validateUser(res.data.user.username);
          if (userConfig !== undefined) {
            sessionStorage.setItem(
              'lastSession',
              new Date().getTime().toString()
            );
            this.setState({ loadForm: false });
            this.closeModalLogin();
            //  this.props.redirect();
            this.setLoginFull(res, password, userConfig.wallets);
            this.getBalanceMoneyClick(res.data.user.username);
          } else {
            this.setState({
              errorForm: true,
              message: 'login.errors.credentials.header',
              loadForm: false,
              captcha: '',
            });
            setTimeout(() => {
              this.setState({
                errorForm: false,
              });
            }, 7000);
            window.sessionStorage.removeItem('userBalanceBTC');
            if (recapcha.current !== null) {
              recapcha.current.reset('capt');
            }
          }

          this.setState({ loadForm: false });
        } else if (res.data.errors[0].code === 71) {
          this.setState({
            errorForm: true,
            message: 'login.errors.credentials.previusSession',
            loadForm: false,
            captcha: '',
          });
          setTimeout(() => {
            this.setState({
              errorForm: false,
            });
          }, 7000);
          window.sessionStorage.removeItem('userBalanceBTC');
          if (recapcha.current !== null) {
            recapcha.current.reset('capt');
          }
        } else {
          //	//console.log("aquii2");
          this.setState({
            errorForm: true,
            message: 'login.errors.credentials.header',
            loadForm: false,
          });
          setTimeout(() => {
            this.setState({
              errorForm: false,
            });
          }, 5000);
          window.sessionStorage.removeItem('userBalanceBTC');
          if (recapcha.current !== null) {
            recapcha.current.reset('capt');
          }
        }
      })
      .catch((error) => {
        console.log(error);
        let e = error.toString();

        if (e.includes('nickname')) {
          this.setState({
            notAuth: true,
            loadForm: false,
          });
          setTimeout(() => {
            this.setState({
              notAuth: false,
            });
          }, 5000);
        }
        // this.setState({
        //   errorCaptcha: true,
        //   message: "login.errors.errorCaptcha",
        //   user: "",
        //   password: "",
        //   loadForm: false,
        // });
        if (recapcha.current !== null) {
          recapcha.current.reset('capt');
        }
        this.blankErrors('errorCaptcha');
      });
  }

  setBalanceInStore(username) {
    userService
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
              if (data.currency === 'BTC') {
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
                  resp.data.result.availableAmounts[0].amount * decimales
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
                  resp.data.result.deferredAmounts[0].amount * decimales
                ) /
                  decimales;
            } else {
              acumdefered = acumdefered;
            }
          }
        }
        result.available = acumdefered;
        result.estimated = data2;
        sessionStorage.setItem('userBalanceBTC', JSON.stringify(result));
      })
      .catch((error) => {
        sessionStorage.setItem('userBalanceBTC', '');
      });
  }
  async validateUser(username) {
    let configUser;
    try {
      const res = await userService.getConfigUserGeneralAsync(username);
      let keys = Object.keys(res.data.result);
      if (keys.length > 0) {
        if (
          res.data.result.type === 'NORMAL' ||
          res.data.result.type === 'BROKER' ||
          res.data.result.type === 'ADMIN' ||
          res.data.result.type === 'BANKER'
        ) {
          this.setBalanceInStore(username);
          configUser = this.getActualUserInfo(res.data.result);
          let dataUser = {
            userDirection:
              configUser.userDirection !== undefined
                ? configUser.userDirection
                : '',
            nickname:
              configUser.nickname !== undefined ? configUser.nickname : '',
          };
          //this.updateWalletCreationDate(dataendUser.wallets);
          console.log(res);
          this.setState({
            userType: res.data.result.type,
            userData: dataUser,
            enableActivateGiftCards: res.data.result.enableActivateGiftCards
              ? 'true'
              : 'false',
          });
          if (res.data.result.verification === undefined) {
            this.setState({
              userStatusC: 'UNINITIATED',
              userStatusA: false,
              userStatusB: false,
              userStatusE: false,
            });
          } else {
            if (res.data.result.verification.C === undefined) {
              this.setState({ userStatusC: 'UNINITIATED' });
            } else {
              this.setState({
                userStatusC:
                  res.data.result.verification.C.userVerificationStatus,
              });
            }
            if (res.data.result.verification.A === undefined) {
              this.setState({
                userStatusA: false,
              });
            } else {
              this.setState({
                userStatusA: true,
              });
            }
            if (res.data.result.verification.B === undefined) {
              this.setState({
                userStatusB: false,
              });
            } else {
              this.setState({
                userStatusB: true,
              });
            }
            if (res.data.result.verification.E === undefined) {
              this.setState({ userStatusE: 'UNINITIATED' });
            } else {
              this.setState({
                userStatusE:
                  res.data.result.verification.E.userVerificationStatus,
              });
            }
          }

          if (res.data.result.mcWallets !== undefined) {
            if (res.data.result.mcWallets.current !== undefined) {
              let current = Object.values(res.data.result.mcWallets.current)[0]
                .address;
              this.setState({
                address: current,
                userWallets: res.data.result.mcWallets,
              });
            } else this.setState({ userWallets: res.data.result.mcWallets });
          } else {
            userService.generateKeyService(username, this.state.password);
          }
          return configUser;
        } else {
          this.setState({
            errorLog: true,
            message: 'login.errors.errorUserNoRegister',
          });
          if (recapcha.current !== null) {
            recapcha.current.reset('capt');
          }
        }
      } else {
        return undefined;
      }
    } catch (error) {
      ////console.log(error);
      this.setState({
        errorCaptcha: true,
        message: 'login.errors.errorCaptcha',
        user: '',
        password: '',
      });
      if (recapcha.current !== null) {
        recapcha.current.reset('capt');
      }
      this.blankErrors('errorCaptcha');
    }
  }

  setLoginFull(res, password, walletsDLBT) {
    console.log('dentro del set login full', res);
    var websocketKey = uuid.v4();
    window.sessionStorage.setItem(
      'firstName',
      res.data.user.firstName !== undefined && res.data.user.firstName !== null
        ? res.data.user.firstName
        : ''
    );
    window.sessionStorage.setItem(
      'lastName',
      res.data.user.lastName !== undefined && res.data.user.lastName !== null
        ? res.data.user.lastName
        : ''
    );
    window.sessionStorage.setItem('phone', res.data.user.phone);
    window.sessionStorage.setItem('countryCode', res.data.user.countryCode);
    window.sessionStorage.setItem('twoFactor', res.data.user.has2FAEnabled);
    window.sessionStorage.setItem('phoneVerified', res.data.user.phoneVerified);
    window.sessionStorage.setItem('username', res.data.user.username);
    window.sessionStorage.setItem(
      'email',
      res.data.user.email !== undefined && res.data.user.email !== null
        ? res.data.user.email
        : ''
    );
    window.sessionStorage.setItem(
      'enableActivateGiftCards',
      res.data.user.enableActivateGiftCards ? 'true' : 'false'
    );
    window.sessionStorage.setItem(
      'usersFrequents',
      JSON.stringify(
        res.data.user.userfrequents !== undefined
          ? res.data.user.userfrequents
          : []
      )
    );
    window.sessionStorage.setItem(
      'preferedSendCodeSecurity',
      res.data.user.preferedSendCodeSecurity
    );
    window.sessionStorage.setItem(
      '2FactorPrefered',
      res.data.user.preferedSendCodeSecurityTwoFactor
    );
    let hashCredencial = btoa(password + ':' + res.data.user.username);
    window.sessionStorage.setItem('header', hashCredencial);

    window.sessionStorage.setItem(
      'devices',
      JSON.stringify(res.data.user.devices)
    );
    window.sessionStorage.setItem(
      'QrGoogleAuth',
      res.data.user.isQrCodeCreated
    );
    window.sessionStorage.setItem(
      'specialreferralCode',
      this.state.codeSpecial
    );
    // this.acceptUpdateModifications();
    if (res.data.user.wallets !== undefined) {
      this.determinateUpdateWallet(res.data.user.wallets, walletsDLBT);
    }

    let usernoAdmin = {
      id: '',
      name: '',
      functionsAvailables: ['not'],
    };
    sessionStorage.setItem(
      'r',
      res.data.user.rol !== null
        ? JSON.stringify(res.data.user.rol)
        : JSON.stringify(usernoAdmin)
    );
    window.sessionStorage.setItem('websocketKey', websocketKey);
    if (res.data.user.has2FAEnabled === true) {
      this.get2FPreference();
      if (
        res.data.user.lastConexion === null ||
        res.data.user.lastConexion === undefined
      ) {
        this.setState({ twoFactor: true });
        window.sessionStorage.setItem('auth', 'false');
        userService.updateLastConexion(res.data.user.username);
      } else {
        let actualDate = new Date();
        let lastDate = new Date(res.data.user.lastConexion);
        let result = actualDate.getTime() - lastDate.getTime();
        if (result > 360) {
          this.setState({ twoFactor: true });
          window.sessionStorage.setItem('auth', 'false');
        } else {
          this.setState({ auth: true });
          window.sessionStorage.setItem('auth', 'true');
        }
      }
    } else {
      this.updateUsersDevices();
      // this.props.redirect();
      this.setState({ auth: true, factorPrefered: false });
      sessionStorage.setItem('auth', 'true');
      userService.updateLastConexion(res.data.user.username);
    }
  }

  determinateUpdateWallet(wallets, walletsTo) {
    let walletsBushido = wallets;
    let walletsToUpdate = [];
    if (walletsTo !== undefined) {
      let currentAddress = Object.values(walletsTo.current)[0].address;
      walletsToUpdate = walletsBushido.filter((wallet) => {
        if (
          wallet.creationDate === undefined ||
          wallet.creationDate === null ||
          wallet.creationDate === 0
        )
          if (wallet.address === currentAddress) return wallet;
      });
      if (walletsToUpdate.length > 0) {
        this.updateWalletCreationDate(walletsToUpdate);
      }
    }
    window.sessionStorage.setItem(
      'wallets',
      JSON.stringify(
        walletsToUpdate.length > 0 ? walletsToUpdate : walletsBushido
      )
    );
  }
  componentWillReceiveProps(nextProps, nextContext) {
    this.getLanguage();
    if (this.props.language !== nextProps.language) {
      this.setState({
        translator: nextProps.translate,
      });
      this.setState({ load: true });
      if (nextProps.language === 'es') {
        this.setState({ spanish: true }, () => {
          this.setState({ load: false });
        });
      } else if (nextProps.language === 'en') {
        this.setState({ spanish: false }, () => {
          this.setState({ load: false });
        });
      } else {
        this.setState({ spanish: true, load: false });
      }
    }
  }
  login() {
    if (
      this.state.countryCode !== '' &&
      this.state.phone !== '' &&
      this.state.password !== ''
    ) {
      if (this.state.captcha !== '') {
        this.setState({
          username: this.state.countryCode + this.state.phone,
          loadForm: true,
        });
        userService
          .findUserByPhone(this.state.phone, this.state.countryCode)
          .then((resp) => {
            // console.log(resp.data);
            if (resp.data.errors === null && resp.data.payload !== null) {
              let user = resp.data.payload[0];
              userService
                .getConfigUserGeneral(user)
                .then((res) => {
                  if (res.data.result.active) {
                    this.setState({
                      dataFullUser: res.data.result,
                    });

                    if (
                      res.data.result.type === 'NORMAL' ||
                      res.data.result.type === 'BROKER' ||
                      res.data.result.type === 'ADMIN' ||
                      res.data.result.type === 'BANKER'
                    ) {
                      userService.getBalanceUser(user);

                      let dataUser = this.getActualUserInfo(res.data.result);
                      this.authUserLogin(
                        user,
                        this.state.password,
                        dataUser.wallets
                      );
                      if (res.data.result.referralCode !== undefined) {
                        Object.entries(this.state.referralCodeList).forEach(
                          ([key, val]) => {
                            if (res.data.result.referralCode === key) {
                              if (val.active !== undefined) {
                                if (val.active) {
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
                                  this.setState({
                                    codeSpecial: false,
                                  });
                                }
                              }
                            }
                          }
                        );
                      }
                      dataUser = {
                        userDirection:
                          dataUser.userDirection !== undefined
                            ? dataUser.userDirection
                            : '',
                        userLocalBitcoin:
                          dataUser.userLocalBitcoin !== undefined
                            ? dataUser.userLocalBitcoin
                            : '',
                        userFacebook:
                          dataUser.userFacebook !== undefined
                            ? dataUser.userFacebook
                            : '',
                      };
                      this.setState({
                        userType: res.data.result.type,
                        userData: dataUser,
                        enableActivateGiftCards: res.data.result
                          .enableActivateGiftCards
                          ? 'true'
                          : 'false',
                      });
                      if (res.data.result.verification === undefined) {
                        this.setState({
                          userStatusC: 'UNINITIATED',
                          userStatusA: false,
                          userStatusB: false,
                        });
                      } else {
                        if (res.data.result.verification.C === undefined) {
                          this.setState({
                            userStatusC: 'UNINITIATED',
                          });
                        } else {
                          this.setState({
                            userStatusC:
                              res.data.result.verification.C
                                .userVerificationStatus,
                          });
                        }
                        if (res.data.result.verification.A === undefined) {
                          this.setState({
                            userStatusA: false,
                          });
                        } else {
                          this.setState({
                            userStatusA: true,
                          });
                        }
                        if (res.data.result.verification.B === undefined) {
                          this.setState({
                            userStatusB: false,
                          });
                        } else {
                          this.setState({
                            userStatusB: true,
                          });
                        }
                        if (res.data.result.verification.E === undefined) {
                          this.setState({
                            userStatusE: false,
                          });
                        } else {
                          this.setState({
                            userStatusE: true,
                          });
                        }
                      }
                      if (res.data.result.mcWallets !== undefined) {
                        if (res.data.result.mcWallets.current !== undefined) {
                          let current = Object.values(
                            res.data.result.mcWallets.current
                          )[0].address;
                          this.setState({
                            address: current,
                            userWallets: res.data.result.mcWallets,
                          });
                        } else
                          this.setState({
                            userWallets: res.data.result.mcWallets,
                          });
                      } else {
                        userService.generateKeyService(
                          user,
                          this.state.password
                        );
                      }
                      //=======================================================================================================
                    } else {
                      //console.log("Aquiiii");
                      this.setState({
                        errorLog: true,
                        message: 'login.errors.errorUserNoRegister',
                        loadForm: false,
                      });
                    }
                  } else {
                    this.setState({
                      loadForm: false,
                      errorLog: true,
                      message: 'login.errors.errorCaptcha3',
                    });
                    setTimeout(() => {
                      this.setState({
                        errorLog: false,
                        message: '',
                      });
                    }, 5000);
                  }
                })
                .catch((error) => {
                  console.log(error);
                  this.setState({
                    errorCaptcha: true,
                    message: 'login.errors.errorCaptcha',
                    user: '',
                    password: '',
                    loadForm: false,
                  });
                  if (recapcha.current !== null) {
                    recapcha.current.reset('capt');
                  }
                  setTimeout(() => {
                    this.setState({
                      errorCaptcha: false,
                      message: '',
                    });
                  }, 6000);
                });
            } else if (resp.data.errors[0].code === 32) {
              this.setState({
                loadForm: false,
                errorLog: true,
                message: 'login.errors.errorUserNoRegister',
              });
              setTimeout(() => {
                this.setState({
                  errorLog: false,
                  message: '',
                });
              }, 5000);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.setState({
          errorCaptcha: true,
          message: 'login.errors.errorCaptcha2',
        });
        this.blankErrors('errorCaptcha');
      }
    } else {
      this.setState({ errorForm: true, message: 'login.errors.errorRequired' });
      setTimeout(() => {
        this.setState({ errorForm: false, message: '' });
      }, 6000);
    }
  }
  blankErrors(label) {
    if (label === 'errorUser') {
      setTimeout(() => {
        this.setState({ errorUser: false, message: '' });
      }, 5000);
    }
    if (label === 'errorPassword') {
      setTimeout(() => {
        this.setState({ errorPassword: false, message: '' });
      }, 5000);
    }
    if (label === 'errorCaptcha') {
      setTimeout(() => {
        this.setState({ errorCaptcha: false, message: '' });
      }, 5000);
    }
    if (label === 'error') {
      setTimeout(() => {
        this.setState({ notVerifyUser: false, notAuth: false });
        // user.updateResponse();
      }, 5000);
    }
  }

  getBalanceMoneyClick(username) {
    RetailService.getBalanceMoneyclick(username)
      .then((resp) => {
        window.sessionStorage.setItem(
          'balanceMoneyClick',
          JSON.stringify(resp.data)
        );
      })
      .catch((error) => {});
  }

  handleForgotPassword() {
    // if (this.props.setView !== undefined) {
    //   this.props.setView("forgotPassword");
    // }
    this.setState({ forgotPassword: true }, () => {
      this.closeModalLogin();
    });
  }

   handleRegistration() {
   window.location.href = '/registration'
  }


  handleUserMC() {
    if (this.props.setView !== undefined) {
      this.props.setView('completeAccount');
    }
    this.setState({ completeAccount: true });
  }
  updateWalletCreationDate(wallets) {
    let promisesArray = wallets.map((wallet) => {
      userService.updateWalletCreation(
        userService.getUserName(),
        wallet.address
      );
    });
    Promise.all(promisesArray)
      .then((result) => {})
      .catch((error) => {});
  }
  addNewBrowserToUser() {
    let cookieSessionUser = cookies.get('SessionUserDevice');
    let creation = new Date();
    let expiration = new Date();
    expiration.setDate(creation.getDate() + 180);
    let body = {
      deviceId:
        cookieSessionUser !== undefined && cookieSessionUser !== null
          ? cookieSessionUser
          : uuid.v4(),
      deviceName:
        (isMobile ? mobileVendor + ' ' + mobileModel : browserName) +
        ', IP: ' +
        window.sessionStorage.getItem('ipAddress'),
      deviceSO: osName + ' ' + osVersion,
      deviceModel: isMobile
        ? mobileModel + ', ' + browserName + ' ' + fullBrowserVersion
        : browserName + ' ' + fullBrowserVersion,
      deviceStatus: true,
      userName: userService.getUserName(),
      source: 'MONEYCLICK_WEB',
    };
    userService
      .addDeviceToUser(body)
      .then((resp) => {
        if (resp.data.payload) {
          cookies.set('SessionUserDevice', body.deviceId, {
            path: '/',
            expires: expiration,
          });
          let devices = JSON.parse(window.sessionStorage.getItem('devices'));
          delete body.userName;
          body.deviceAtDate = new Date().getTime();
          if (devices !== null && devices !== undefined) {
            devices.push(body);
          } else {
            devices = [];
            devices.push(body);
          }
          window.sessionStorage.setItem('devices', JSON.stringify(devices));
          this.setState({
            resultUpdatingMessage: 'login.successUpdating.addDevice',
            successUpdate: true,
          });
          setTimeout(() => {
            this.setState({
              resultUpdatingMessage: '',
              loadingButtons: false,
              contentModal: '',
              currentDeviceStatus: false,
              successUpdate: false,
              showModal: false,
            });
            this.setState({ readyToRedirect: true });
          }, 3000);
        } else {
          if (resp.data.errors.length > 0) {
            if (resp.data.errors[0].code === 55) {
              this.setState({
                resultUpdatingMessage: 'login.errors.deviceInUser',
                errorUpdatingDevice: true,
              });
              setTimeout(() => {
                this.setState({
                  resultUpdatingMessage: '',
                  loadingButtons: false,
                  contentModal: '',
                  currentDeviceStatus: false,
                  errorUpdatingDevice: false,
                  showModal: false, // ,
                });
                this.setState({ readyToRedirect: true });
              }, 3000);
            } else if (resp.data.errors[0].code === 32) {
              this.setState({
                resultUpdatingMessage: 'login.errors.userNotFound',
                errorUpdatingDevice: true,
              });
              setTimeout(() => {
                this.setState({
                  resultUpdatingMessage: '',
                  loadingButtons: false,
                  contentModal: '',
                  currentDeviceStatus: false,
                  errorUpdatingDevice: false,
                  showModal: false,
                });
                this.setState({ readyToRedirect: true });
              }, 3000);
            }
          } else {
            this.setState({
              resultUpdatingMessage: 'login.errors.unexpectedError',
              errorUpdatingDevice: true,
            });
            setTimeout(() => {
              this.setState({
                resultUpdatingMessage: '',
                loadingButtons: false,
                contentModal: '',
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
          resultUpdatingMessage: 'login.errors.unexpectedError',
          errorUpdatingDevice: true,
        });
        setTimeout(() => {
          this.setState({
            resultUpdatingMessage: '',
            loadingButtons: false,
            contentModal: '',
            currentDeviceStatus: false,
            errorUpdatingDevice: false,
            showModal: false,
          });

          this.setState({ readyToRedirect: true });
        }, 3000);
      });
  }
  updateBrowserToUser() {
    let devices = JSON.parse(window.sessionStorage.getItem('devices'));
    let currentDevice = cookies.get('SessionUserDevice');
    let deviceToUpdate = devices.filter((device) => {
      return device.deviceId === currentDevice;
    })[0];
    if (deviceToUpdate !== undefined) {
      deviceToUpdate.deviceStatus = true;
      deviceToUpdate.userName = userService.getUserName();
      userService
        .updateDeviceToUser(deviceToUpdate)
        .then((res) => {
          if (res.data.payload) {
            devices.map((device) => {
              if (device.deviceId === currentDevice) {
                device.deviceStatus = true;
              }
            });
            window.sessionStorage.setItem('devices', JSON.stringify(devices));
            this.setState({
              resultUpdatingMessage: 'login.successUpdating.updateDevice',
              successUpdate: true,
            });
            setTimeout(() => {
              this.setState({
                resultUpdatingMessage: '',
                loadingButtons: false,
                contentModal: '',
                currentDeviceStatus: '',
                successUpdate: false,
                showModal: false,
              });

              this.setState({ readyToRedirect: true });
            }, 3000);
          }
        })
        .catch((error) => {
          this.setState({
            resultUpdatingMessage: 'login.errors.unexpectedError',
            errorUpdatingDevice: true,
          });
          setTimeout(() => {
            this.setState({
              resultUpdatingMessage: '',
              loadingButtons: false,
              contentModal: '',
              currentDeviceStatus: '',
              errorUpdatingDevice: false,
              showModal: false,
            });
            this.setState({ readyToRedirect: true });
          }, 3000);
        });
    }
  }

  get2FPreference() {
    userService
      .preferedUserSendCodeTwoFactor()
      .then((resp) => {
        if (
          resp.data.payload !== false &&
          resp.data.payload !== null &&
          resp.data.payload !== undefined
        ) {
          window.sessionStorage.setItem('2FactorPrefered', resp.data.payload);
          this.setState({ factorPrefered: true });
        } else {
          this.setState({ factorPrefered: false });
        }
      })
      .catch((error) => {});
  }
  containCurrentDevice() {
    let devices;
    let found = 'NOT_FOUND';
    devices = JSON.parse(window.sessionStorage.getItem('devices'));
    let currentDevice = cookies.get('SessionUserDevice');
    if (devices !== undefined && devices !== null) {
      if (currentDevice !== undefined) {
        devices.forEach((device) => {
          if (device.deviceId === currentDevice) {
            if (device.deviceStatus) found = 'DEVICE_ACTIVE';
            else found = 'DEVICE_INACTIVE';
          }
        });
      }
    }
    return found;
  }

  acceptUpdateModifications() {
    let isActive = this.containCurrentDevice();
    if (isActive === 'NOT_FOUND') {
      this.addNewBrowserToUser();
    } else if (isActive === 'DEVICE_INACTIVE') {
      this.updateBrowserToUser();
    } else {
      this.setState({ readyToRedirect: true });
    }
  }
  async updateDataInUser(user, field, value) {
    let body = {
      userName: user,
      fieldName: field,
      fieldValue: value,
    };
    try {
      let response = await userService.addDataUserAsync(body);
      if (response.data !== 'OK') {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  async updateDataExistInUser(user, field, value) {
    let body = {
      userName: user,
      fieldName: field,
      fieldValue: value,
    };
    try {
      let response = await userService.updateUserData(body);
      if (response.data !== 'OK') {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  handleModalClose() {
    this.setState({ viewModalSuccess: false }, () => {
      window.sessionStorage.setItem('timeLogin', new Date());
      this.setState({ auth: true });
      sessionStorage.setItem('auth', 'true');
      window.location.href = '/';
    });
  }
  async completeAccount(username, email, nickname) {
    this.setState({ loadForm: true });
    try {
      let body = { username: username, email: email, nickname: nickname };
      const response = await userService.completeAccountService(body);

      if (response.data.payload === true) {
        let verificationStatus = {
          A: this.state.userStatusA,
          B: this.state.userStatusB,
          C: this.state.userStatusC,
          E: this.state.userStatusE,
        };
        window.sessionStorage.setItem(
          'userVerificationStatus',
          JSON.stringify(verificationStatus)
        );
        window.sessionStorage.setItem(
          'userDataDBTC',
          JSON.stringify(this.state.userData)
        );
        window.sessionStorage.setItem('nickname', this.state.nickname);
        window.sessionStorage.setItem('address', this.state.address);
        window.sessionStorage.setItem('userType', this.state.userType);
        window.sessionStorage.setItem(
          'enableActivateGiftCards',
          this.state.enableActivateGiftCards
        );
        window.sessionStorage.setItem(
          'userWallets',
          JSON.stringify(this.state.userWallets)
        );
        if (this.state.retailIds !== undefined) {
          window.sessionStorage.setItem(
            'retail',
            JSON.stringify(this.state.retailIds)
          );
        }
        if (this.state.hasEmail === true) {
          await this.updateDataExistInUser(username, 'email', this.state.email);
        } else {
          await this.updateDataInUser(username, 'email', this.state.email);
        }
        if (this.state.hasNickname === true) {
          await this.updateDataExistInUser(
            username,
            'nickname',
            this.state.nickname
          );
        } else {
          await this.updateDataInUser(
            username,
            'nickname',
            this.state.nickname
          );
        }
        window.sessionStorage.setItem('email', this.state.email);
        //this.props.handleClose();
        this.setState({ loadForm: false });
        this.setState({ viewModalSuccess: true });
      } else if (response.data.error[0].code === 48) {
        this.setState({
          errorForm: true,
          message: 'registration.errors.form.username',
        });
        setTimeout(() => {
          this.setState({
            errorForm: false,
            message: '',
          });
        }, 6000);
      } else if (response.data.error[0].code === 65) {
        this.setState({
          errorForm: true,
          message: 'registration.errors.form.alreadyEmail',
        });
        setTimeout(() => {
          this.setState({
            errorForm: false,
            message: '',
          });
        }, 6000);
      }
    } catch (error) {
      this.setState({ loadForm: false });
      this.setState({
        errorForm: true,
        message: 'registration.errors.unexpectedError',
      });
      setTimeout(() => {
        this.setState({
          errorForm: false,
          message: '',
        });
      }, 6000);
    }
  }
  handleRegistrerEmail() {
    let regex =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (this.state.email !== '') {
      if (regex.test(this.state.email)) {
        if (this.state.nickname !== '') {
          this.completeAccount(
            this.state.username,
            this.state.email,
            this.state.nickname
          );
        } else {
          this.setState({
            errorNickName: true,
            message: 'registration.errors.RequiredField',
          });
          setTimeout(() => {
            this.setState({
              errorNickName: false,
              message: '',
            });
          }, 6000);
        }
      } else {
        this.setState({
          errorEmail: true,
          message: 'registration.errors.form.email',
        });
        setTimeout(() => {
          this.setState({
            errorEmail: false,
            message: '',
          });
        }, 6000);
      }
    } else {
      this.setState({
        errorEmail: true,
        message: 'registration.errors.form.email',
      });
      setTimeout(() => {
        this.setState({
          errorEmail: false,
          message: '',
        });
      }, 6000);
    }
  }

  updateUsersDevices() {
    let isActive = this.containCurrentDevice();

    if (isActive === 'NOT_FOUND') {
      this.setState({
        showModal: true,
        contentModal: 'login.modalUpdateDevice.contentAdd',
        currentDeviceStatus: isActive,
      });
    } else if (isActive === 'DEVICE_INACTIVE') {
      this.setState({
        showModal: true,
        contentModal: 'login.modalUpdateDevice.contentUpdate',
        currentDeviceStatus: isActive,
      });
    } else {
      this.setState({ readyToRedirect: true });
    }
  }

  closeModalDevices() {
    //console.log("cerrar modal de dispositivos");
    this.setState({
      errorUpdatingDevice: true,
      resultUpdatingMessage: 'login.errors.deviceNotAllowedByUser',
    });
    setTimeout(() => {
      this.setState({
        showModal: false,
        errorUpdatingDevice: false,
        resultUpdatingMessage: '',
        loadingButtons: false,
        currentDeviceStatus: '',
      });
      userService.logout();
      if (this.state.varlog === true) {
        window.location.href =
          '/?' + this.state.typeOffer + '=' + this.state.tokenurl;
      } else {
        window.location.href = '/';
      }
    }, 2000);
  }
  async getReferralCode() {
    try {
      let response = await userService.getReferralCode();
      this.setState({ referralCodeList: response.data });
    } catch (error) {
      //console.log(error);
    }
  }
  render() {
    let t = this.state.translator;
    let errorForm,
      message,
      labelPassword,
      labelUser,
      errorEmail,
      errornickname,
      labelUpdateDevice,
      resultPostMessage,
      labelCaptcha;
    let list = [];
    if (this.state.prefit.length > 0) {
      //	//console.log(this.state.prefit);
      for (let pre of this.state.prefit) {
        if (pre.value !== '') {
          list.push({
            text:
              window.sessionStorage.getItem('language') === 'es'
                ? pre.nombre + ' (+' + pre.value + ')'
                : pre.text + ' (+' + pre.value + ')',
            value: pre.value,
            key: pre.iso2,
          });
        }
      }
    }
    if (this.state.forgotPassword) {
      return <Redirect to='/forgotPassword' />;
      //  window.location.href = "/forgotPassword"
    }
    if (this.state.completeAccount) {
      return <Redirect to='/completeAccount' />;
    }
    if (this.state.errorCaptcha) {
      labelCaptcha = (
        <div>
          <Message error header='Error' content={t(this.state.message)} />
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
              {/* <br />
               <a href="https://clients.dollarbtc.com">
                 https://clients.dollarbtc.com
               </a> */}
            </Message.Content>
          </Message>
          <Divider hidden />
        </div>
      );
    }
    if (this.state.notAuth) {
      message = (
        <Message
          error
          header={t('login.errors.credentials.header')}
          content={t('login.errors.credentials.content')}
        />
      );
      //this.blankErrors("error");
    }
    if (this.state.errorForm) {
      errorForm = <Message error content={t(this.state.message)} />;
    }
    if (this.state.errorEmail) {
      errorEmail = (
        <Label basic color='red' pointing>
          {t(this.state.message)}
        </Label>
      );
    }
    if (this.state.errorNickName) {
      errornickname = (
        <Label basic color='red' pointing>
          {t(this.state.message)}
        </Label>
      );
    }
    if (this.state.auth) {
      if (this.state.readyToRedirect && typeof parse(window.location.search).source === 'undefined') {
        window.location.href = '/';
      } else { 
        window.location.href = '/paymentGateway'+window.location.search;
      }
      resultPostMessage = (
        <div>
          {t('registration.modalResult.resultPost.headerComplete')}
          <Message
            warning
            content={t('registration.modalResult.resultPost.warningMessage')}
          />
          <Message
            info
            content={t('registration.modalResult.resultPost.infoMessage')}
          />
        </div>
      );
      let verificationStatus = {
        A: this.state.userStatusA,
        B: this.state.userStatusB,
        C: this.state.userStatusC,
        E: this.state.userStatusE,
      };
      window.sessionStorage.setItem(
        'userVerificationStatus',
        JSON.stringify(verificationStatus)
      );
      window.sessionStorage.setItem(
        'userDataDBTC',
        JSON.stringify(this.state.userData)
      );
      window.sessionStorage.setItem('nickname', this.state.userData.nickname);
      window.sessionStorage.setItem('address', this.state.address);
      window.sessionStorage.setItem('userType', this.state.userType);
      window.sessionStorage.setItem(
        'enableActivateGiftCards',
        this.state.enableActivateGiftCards
      );
      window.sessionStorage.setItem(
        'userWallets',
        JSON.stringify(this.state.userWallets)
      );
    } else if (this.state.twoFactor === true) {
      let verificationStatus = {
        A: this.state.userStatusA,
        B: this.state.userStatusB,
        C: this.state.userStatusC,
        E: this.state.userStatusE,
      };
      window.sessionStorage.setItem(
        'userVerificationStatus',
        JSON.stringify(verificationStatus)
      );

      window.sessionStorage.setItem('address', this.state.address);
      window.sessionStorage.setItem('userType', this.state.userType);
      window.sessionStorage.setItem(
        'enableActivateGiftCards',
        this.state.enableActivateGiftCards
      );
      window.sessionStorage.setItem('nickname', this.state.userData.nickname);
    }
    if (this.state.errorUser) {
      labelUser = (
        <Label basic color='red' pointing>
          {t(this.state.message)}
        </Label>
      );
    }
    if (this.state.errorPassword) {
      labelPassword = (
        <Label basic color='red' pointing>
          {t(this.state.message)}
        </Label>
      );
    }

    if (this.state.errorUpdatingDevice) {
      labelUpdateDevice = (
        <Message error content={t(this.state.resultUpdatingMessage)} />
      );
    }
    if (this.state.successUpdate) {
      labelUpdateDevice = (
        <Message success content={t(this.state.resultUpdatingMessage)} />
      );
    }

    if (this.state.factorPrefered) {
      window.location.href = '/loginTwoFactor';
    }
    return (
      <div>
        <Modal
          open={this.state.showModal}
          onClose={() => this.closeModalDevices()}
        >
          <Modal.Header>{t('login.modalUpdateDevice.header')}</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              {t(this.state.contentModal)}
              {(this.state.errorUpdatingDevice || this.state.successUpdate) &&
                labelUpdateDevice}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={() => this.closeModalDevices()}
              disabled={this.state.loadingButtons}
              secondary
            >
              {t('login.modalUpdateDevice.buttonNo')}
            </Button>
            <Button
              onClick={this.acceptUpdateModifications}
              disabled={this.state.loadingButtons}
              loading={this.state.loadingButtons}
              color='blue'
            >
              {t('login.modalUpdateDevice.buttonYes')}
            </Button>
          </Modal.Actions>
        </Modal>
        {this.state.load && (
          <Dimmer active inverted>
            <Loader size='small' inverted />
          </Dimmer>
        )}
        <Grid columns='equal' style={{ marginTop: '1rem' }}>
          <Grid.Row>
         <Grid.Column largeScreen={8} computer={8} widescreen={7} mobile={6}>
            {this.state.spanish && <Image horizonta src={img1} size='large' />}

            {!this.state.spanish && <Image src={img1english} size='large' />}
          </Grid.Column>
      
          <Grid.Column
            largeScreen={6}
            computer={7}
            widescreen={7}
            mobile={9}
            style={isMobile ? {marginLeft: '1rem'}:{ marginTop: '6rem', marginLeft: '1rem' }}
          >
            <Header size='large' content={t('login.header')} textAlign='left' />
            {this.state.loadForm && (
              <Dimmer active inverted>
                <Loader size='small' inverted />
              </Dimmer>
            )}
            <Form widths='equal' className='form-login' error unstackable>
              <Form.Group widths='equal'>
                <Form.Field>
                  <label> {t('login.country')}</label>
                  <Dropdown
                    placeholder={t('login.country')}
                    fluid
                    search
                    selection
                    options={list}
                    value={this.state.countryCode}
                    onChange={this.handlePrefit.bind(this)}
                    onSearchChange={this.handleSearchChange.bind(this)}
                  />
                </Form.Field>

                <Form.Field>
                  <label>{t('login.phone')}</label>
                  <NumberFormat
                    value={this.state.phone}
                    allowNegative={false}
                    thousandSeparator={false}
                    placeholder={'12345678'}
                    isAllowed={(values) => {
                      const { value } = values;
                      return value.length <= 20;
                    }}
                    onValueChange={(values) => {
                      const { value } = values;
                      this.setState({ phone: value });
                    }}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Field>
                <label>{t('login.password')}</label>
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
                  type={this.state.hidden ? 'password' : 'text'}
                  value={this.state.password}
                  placeholder={t('login.password')}
                  onChange={this.handlePassword.bind(this)}
                />
              </Form.Field>
              <Form.Field>
                {errorForm}
                {message}
                {labelCaptcha}
              </Form.Field>
              {window.sessionStorage.getItem('language') === 'es' && (
                <div className='captcha'>
                  <p style={{textAlign: 'center'}}>{t('login.captcha')}</p>
                  <ReCAPTCHA
                    id='reca'
                    hl={window.sessionStorage.getItem('language')}
                    ref={recapcha}
                    size={isMobile? 'compact' : 'normal'}
                    style={isMobile ? { paddingLeft: '5em' } : {}}
                    sitekey='6LeuR_AUAAAAACjTTEYOxkyCxqnxU9FhEMzV45xe'
                    onChange={this.handleCaptcha}
                  />
                </div>
              )}
              {window.sessionStorage.getItem('language') === 'en' && (
                <div className='captcha'>
                  <p style={{textAlign: 'center'}}>{t('login.captcha')}</p>
                  <ReCAPTCHA
                    id='reca'
                    hl={window.sessionStorage.getItem('language')}
                    ref={recapcha}
                    size={isMobile ? 'compact' : 'normal'}
                    style={{
                    }}
                    sitekey='6LeuR_AUAAAAACjTTEYOxkyCxqnxU9FhEMzV45xe'
                    onChange={this.handleCaptcha}
                  />
                </div>
              )}
            </Form>
            <div className='button-login'>
              <Divider hidden />

                { /*<Button
                size='large'
                floated='left'
                onClick={this.handleForgotPassword.bind(this)}
              >
                {t('login.forgotPassword')}
              </Button>
              <Button
                floated='right'
                size='large'
                onClick={this.login.bind(this)}
              >
                {t('login.header')}
             </Button>*/}
                <Button
                  
                size='massive'
                onClick={this.login.bind(this)}
              >
                {t('login.header')}
                </Button>
                <div style={{paddingTop: 10,textAlign: 'right'}}>
                	<label>
										<a href='#' onClick={this.handleForgotPassword.bind(this)}>
											{t("login.forgotPassword")}
										</a>
                  </label>
                </div>
                <div style={{paddingTop: 10,textAlign: 'right'}}>
                	<label>
										<a href='#' onClick={this.handleRegistration.bind(this)}>
											{t("login.registration")}
										</a>
                  </label>
                  </div>
                <Divider hidden />
                
              </div>
              
            </Grid.Column>
            </Grid.Row>
        </Grid>
        
        <Modal open={this.state.viewModalSuccess}>
          <Modal.Header>
            {t('registration.modalResult.headerSuccess')}
          </Modal.Header>
          <Modal.Content>{resultPostMessage}</Modal.Content>
          <Modal.Actions>
            <Button secondary onClick={this.handleModalClose.bind(this)}>
              {t('registration.modalResult.closeButton')}
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
export default translate(Login);
