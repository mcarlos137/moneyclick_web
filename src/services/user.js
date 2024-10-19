import axios from 'axios';
import config from './config.js';
import headers from './headers';
import decode from './decode';
import _ from 'underscore';
import HMACInterceptor from '../hmac/HMACInterceptor';
import interceptorHeader from './interceptor';
const URL_BASE_DBTC = config.apiDollarBtcUrl;
const URL_BASE_BUSHIDO = config.apiBushidoBaseUrl;

export default {
  users: [],
  sussesfullRegister: false,
  result: null,
  requestVerify: false,
  notVerifyUser: true,
  notAuth: false,
  responseAuth: false,
  updateUser: null,
  tokenPasswordUpdate: null,
  validVerifyPhone: null,
  responseSendPhone: null,

  async updateUserData(body) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersPut(
      URL_BASE_DBTC,
      config.urlDollar.userModifyInfo,
      body
    );

    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    const RESPONSE = await instance(conf);
    if (RESPONSE.status !== 200) {
      throw Error('error in request');
    }
    return RESPONSE;
  },
  async getAlertByCurrencyAndPaymentType(currency, paymentType) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersGet(
      URL_BASE_DBTC,
      config.urlDollar.getAlerts +
        '/' +
        currency +
        '/' +
        paymentType +
        '/' +
        sessionStorage.getItem('language').toString().toUpperCase()
    );
    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    return instance(conf);
  },
  async getAlertCrypto(currency, balanceOperationType, paymentType) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersGet(
      URL_BASE_DBTC,
      config.urlDollar.getAlerts +
        '/' +
        currency +
        '/' +
        balanceOperationType +
        '/' +
        paymentType +
        '/' +
        sessionStorage.getItem('language').toString().toUpperCase()
    );
    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    return instance(conf);
  },
  async fastChange(body) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersPost(
      URL_BASE_DBTC,
      config.urlDollar.fastChange,
      body
    );

    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    const response = await instance(conf);
    if (response.status !== 200) {
      throw Error('Error in request' + response.toString());
    }
    return response;
  },
  async addDataUserAsync(body) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersPost(
      URL_BASE_DBTC,
      config.urlDollar.userAddInfo,
      body
    );

    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    const response = await instance(conf);
    if (response.status !== 200) {
      throw Error('Error in request' + response.toString());
    }
    return response;
  },
  userMovements(user, dateEnd, dateInit) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersGet(
      URL_BASE_DBTC,
      config.urlDollar.userMovements + dateInit
    );
    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    return instance(conf);
  },
  getListUsers() {
    return this.users;
  },
  sigNin(body) {
    ////console.log(URL_BASE_BUSHIDO + config.urlBushido.registration);
    return axios.post(URL_BASE_BUSHIDO + config.urlBushido.registration, body);
  },
  setPinUserB(body) {
    ////console.log("pind");
    return axios.post(
      URL_BASE_BUSHIDO + config.urlBushido.registrationPin,
      body
    );
  },
  sigNinDollarBtcB(body) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersPost(
      URL_BASE_DBTC,
      config.urlDollar.userCreate,
      body
    );

    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    // ////console.log("add payment body", body);
    return instance(conf);
  },
  verifyUserRequestCore(body) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersPost(
      URL_BASE_DBTC,
      config.urlDollar.startVerification,
      body
    );

    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    // ////console.log("add payment body", body);
    return instance(conf);
  },

  async updatePassword(username, password, code) {
    var pass = decode.encode(password + '__' + username + '__' + code);
    var hash = decode.randomBytes(50);
    var endPass = decode.encode(pass + decode.bytesToBase64(hash));
    let body = {
      username: username,
      passwordEncode: endPass,
    };
    const RESPONSE = await axios.post(
      URL_BASE_BUSHIDO + config.urlBushido.updatePasswordMoneyClickUpdate,
      body
    );
    if (RESPONSE.status !== 200) {
      throw Error('Error sending SMS, code: ' + RESPONSE.status);
    }
    return RESPONSE;
  },

  getActualUserInfo(allInfo) {
    var listKeys = Object.keys(allInfo);
    var listActualKeys = [];
    var actualFirstnameKey;
    var actualLastnameKey;
    var actualPhoneKey;
    var actualQuestionSecurityKey;
    var actualAnswerSecurityKey;
    let otherDocument;
    var actualTypeDocumentIdentityKey;
    var actualNumberDocumentIdentityKey;
    var actualGenderKey;
    var actualBirthdateKey;
    var actualCountryOfBirthKey;
    var actualCityOfBirthKey;
    var actualBirthplaceKey;
    var actualFamilyNameKey;
    var actualFamilyEmailKey;
    var actualUserLocalBitcoinKey;
    var actualUserFacebookKey;
    var actualDescriptionProfileKey;
    var actualWebKey;
    var actualInstagramKey;
    var actualUserAddressKey;
    var actualNickname;
    let actualCompanyName,
      actualCompanyTypeOfFiscalRecord,
      actualCompanyNumberOfFiscalRecord,
      actualCompanyYearRegistration;
    for (var i = 0; i < listKeys.length; i++) {
      if (listKeys[i].startsWith('firstName')) {
        actualFirstnameKey = listKeys[i];
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
      } else if (listKeys[i].startsWith('otherDocument')) {
        otherDocument = listKeys[i];
      } else if (listKeys[i].startsWith('numberDocumentIdentity')) {
        actualNumberDocumentIdentityKey = listKeys[i];
      } else if (listKeys[i].startsWith('gender')) {
        actualGenderKey = listKeys[i];
      } else if (listKeys[i].startsWith('birthdate')) {
        actualBirthdateKey = listKeys[i];
      } else if (listKeys[i].startsWith('birthplace')) {
        actualBirthplaceKey = listKeys[i];
      } else if (listKeys[i].startsWith('countryOfBirth')) {
        actualCountryOfBirthKey = listKeys[i];
      } else if (listKeys[i].startsWith('cityOfBirth')) {
        actualCityOfBirthKey = listKeys[i];
      } else if (listKeys[i].startsWith('familyName')) {
        actualFamilyNameKey = listKeys[i];
      } else if (listKeys[i].startsWith('familyEmail')) {
        actualFamilyEmailKey = listKeys[i];
      } else if (listKeys[i].startsWith('userLocalBitcoin')) {
        actualUserLocalBitcoinKey = listKeys[i];
      } else if (listKeys[i].startsWith('userFacebook')) {
        actualUserFacebookKey = listKeys[i];
      } else if (listKeys[i].startsWith('descriptionProfile')) {
        actualDescriptionProfileKey = listKeys[i];
      } else if (listKeys[i].startsWith('web')) {
        actualWebKey = listKeys[i];
      } else if (listKeys[i].startsWith('instagram')) {
        actualInstagramKey = listKeys[i];
      } else if (listKeys[i].startsWith('userDirection')) {
        actualUserAddressKey = listKeys[i];
      } else if (listKeys[i].startsWith('nickname')) {
        actualNickname = listKeys[i];
      } else if (listKeys[i].startsWith('companyName')) {
        actualCompanyName = listKeys[i];
      } else if (listKeys[i].startsWith('companyTypeOfFiscalRecord')) {
        actualCompanyTypeOfFiscalRecord = listKeys[i];
      } else if (listKeys[i].startsWith('companyNumberOfFiscalRecord')) {
        actualCompanyNumberOfFiscalRecord = listKeys[i];
      } else if (listKeys[i].startsWith('companyYearRegistration')) {
        actualCompanyYearRegistration = listKeys[i];
      }
    }
    listActualKeys.push(
      actualFirstnameKey,
      actualLastnameKey,
      actualPhoneKey,
      actualQuestionSecurityKey,
      actualAnswerSecurityKey,
      actualTypeDocumentIdentityKey,
      otherDocument,
      actualNumberDocumentIdentityKey,
      actualGenderKey,
      actualBirthdateKey,
      actualCountryOfBirthKey,
      actualCityOfBirthKey,
      actualBirthplaceKey,
      actualFamilyNameKey,
      actualFamilyEmailKey,
      actualUserLocalBitcoinKey,
      actualUserFacebookKey,
      actualDescriptionProfileKey,
      actualWebKey,
      actualInstagramKey,
      actualUserAddressKey,
      actualNickname,
      actualCompanyName,
      actualCompanyTypeOfFiscalRecord,
      actualCompanyNumberOfFiscalRecord,
      actualCompanyYearRegistration,
      'address',
      'operationAccount',
      'environment',
      'type',
      'active',
      'email',
      'wallets',
      'name'
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
      } else if (key.startsWith('otherDocument')) {
        normalizeObject.otherDocument = value;
      } else if (key.startsWith('numberDocumentIdentity')) {
        normalizeObject.numberDocumentIdentity = value;
      } else if (key.startsWith('gender')) {
        normalizeObject.gender = value;
      } else if (key.startsWith('birthdate')) {
        normalizeObject.birthdate = value;
      } else if (key.startsWith('countryOfBirth')) {
        normalizeObject.countryOfBirth = value;
      } else if (key.startsWith('cityOfBirth')) {
        normalizeObject.cityOfBirth = value;
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
      } else if (key.startsWith('descriptionProfile')) {
        normalizeObject.descriptionProfile = value;
      } else if (key.startsWith('web')) {
        normalizeObject.web = value;
      } else if (key.startsWith('instagram')) {
        normalizeObject.instagram = value;
      } else if (key.startsWith('userDirection')) {
        normalizeObject.userDirection = value;
      } else if (key.startsWith('phone')) {
        normalizeObject.phone = value;
      } else if (key.startsWith('nickname')) {
        normalizeObject.nickname = value;
      } else if (key.startsWith('companyName')) {
        normalizeObject.companyName = value;
      } else if (key.startsWith('companyTypeOfFiscalRecord')) {
        normalizeObject.companyTypeOfFiscalRecord = value;
      } else if (key.startsWith('companyNumberOfFiscalRecord')) {
        normalizeObject.companyNumberOfFiscalRecord = value;
      } else if (key.startsWith('companyYearRegistration')) {
        normalizeObject.companyYearRegistration = value;
      } else if (key.startsWith('wallets')) {
        normalizeObject.wallets = Object.values(value.current)[0].address;
      } else if (key.startsWith('name')) {
        normalizeObject.name = value;
      }
    });

    return normalizeObject;
  },
  generateKeyService(username, password) {
    console.log('dentro del generateKeyService');
    var bodyBushido = {
      userEmail: username,
      currency: 'BTC',
    };
    this.generateAddress(bodyBushido, username, password)
      .then((res) => {
        if (res.data !== null) {
          if (res.data.errors === null && res.data.payload !== null) {
            let address = res.data.payload.split('__')[0];
            let privateKey = res.data.payload.split('__')[1];
            window.sessionStorage.setItem('address', address);
            var btcbody = {
              userName: username,
              balanceOperationType: 'RECEIVE',
              address: address,
              privateKey: privateKey,
              amounts: {
                BTC: 0,
              },
              targetAddress: '',
              additionalInfo: 'INITIAL DEPOSIT',
            };
            this.balanceOperation(btcbody)
              .then((res) => {
                ////console.log(res);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }
      })
      .catch((error) => {
        ////console.log(error);
      });
  },
  generateAddress(body, username, password) {
    return axios.post(URL_BASE_BUSHIDO + config.urlBushido.keyGenerate, body, {
      auth: {
        username: username,
        password: password,
      },
    });
  },
  balanceOperation(body) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersPost(
      URL_BASE_DBTC,
      config.urlDollar.userBalanceOperation,
      body
    );

    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    return instance(conf);
  },
  verifyUserInit(email) {
    if (
      typeof sessionStorage.getItem('emailSend') !== 'undefined' &&
      typeof sessionStorage.getItem('emailSend') !== null &&
      sessionStorage.getItem('emailSend') !== 'true'
    ) {
      var body = { email: email, reset: false, source: 'MONEYCLICK_WEB' };
      axios
        .post(URL_BASE_BUSHIDO + config.urlBushido.verifyInit, body)
        .then((res) => {
          //console.log(res);
          sessionStorage.setItem('emailSend', 'true');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  verifyUserRequest(body) {
    ////console.log("verificando usuarios");
    return axios.post(
      URL_BASE_BUSHIDO + config.urlBushido.verifyConfirm,
      body
    );
  },
  authUser(email, password) {
    // var resp;
    var pass = decode.encode(password);
    var pin = decode.encode('2018');
    var hash = decode.randomBytes(50);
    var pinHash = decode.randomBytes(50);
    var endPass = decode.encode(pass + decode.bytesToBase64(hash));
    var endPin = decode.encode(pin + decode.bytesToBase64(pinHash));
    sessionStorage.setItem('pass', endPass);
    var request = {
      userIdOrEmail: email.toLowerCase(),
      credentials: [endPass, endPin],
      source: 'web',
    };

    return axios.post(URL_BASE_BUSHIDO + config.urlBushido.auth, request);
  },
  updateLastConexion(user) {
    let data = new Date();
    // ////console.log(data)
    axios
      .post(
        URL_BASE_BUSHIDO + config.urlBushido.updateLastConexion + user,
        data
      )
      .then((resp) => {
        //////console.log(resp);
      })
      .catch((error) => {
        //  ////console.log(error);
      });
  },
  updateNewNickName(nickname) {
    console.log(sessionStorage.getItem('username'));
    let body = {
      nickname: nickname,
      email: sessionStorage.getItem('username'),
    };
    return axios.post(
      URL_BASE_BUSHIDO + config.urlBushido.updateNickName,
      body
    );
  },
  setValueTosessionStorage(field, value) {
    sessionStorage.setItem(field, value);
  },
  updateProfile(body, username) {
    return axios
      .put(URL_BASE_BUSHIDO + config.urlBushido.updateUser + username, body, {
        auth: {
          username: atob(this.getHeader()).split(':')[1],
          password: atob(this.getHeader()).split(':')[0],
        },
      })
      .catch((error) => {
        console.log(error);
      });
  },
  /*sentTokenUpdatePassword() {
    var request = {
      email: sessionStorage.getItem('username'),
      reset: false,
      source: 'PORTAL_NORMAL',
    };
    return axios.post(
      URL_BASE_BUSHIDO + config.urlBushido.passwordReset,
      request,
      {
        auth: {
          username: atob(this.getHeader()).split(':')[1],
          password: atob(this.getHeader()).split(':')[0],
        },
      }
    );
  },*/
  addInfoToUserDollarBtc(user, fieldName, value) {
    console.log('addInfoToUserDollarBtc ', user, fieldName, value);
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersGet(
      URL_BASE_DBTC,
      config.urlDollar.userConfig + user + '/OK'
    );
    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        console.log(error);
        return Promise.reject(error);
      }
    );

    let keys = [];
    console.log(fieldName, value);
    if (value !== undefined) {
      try {
        instance(conf).then((respu) => {
          let res = respu.data.result;
          keys = Object.keys(res);
          if (keys.indexOf(fieldName) === -1) {
            let body = {
              userName: this.getUserName(),
              fieldName: fieldName,
              fieldValue: value,
            };

            let confTwo = headers.createHeadersPost(
              URL_BASE_DBTC,
              config.urlDollar.userAddInfo,
              body
            );

            instance.interceptors.request.use(
              (confTwo) => {
                interceptor.process(confTwo);
                return confTwo;
              },
              (error) => {
                console.log('error ', error);
                return Promise.reject(error);
              }
            );

            instance(confTwo)
              .then((resp) => {
                console.log(resp);
              })
              .catch((error) => {
                this.addInfoToUserDollarBtc(user, fieldName, value);
                console.log(error);
              });
          } else {
            let cont = 0;
            for (let key in res) {
              if (fieldName === key) {
                for (let obj in res) {
                  if (obj.indexOf('__') === -1) {
                    if (fieldName === obj) {
                      cont++;
                    }
                  } else if (obj.split('__')[0] === fieldName) {
                    cont++;
                  }
                }
                if (cont > 1) {
                  let index = cont - 1;
                  let campo = fieldName + '__' + index;
                  Object.entries(res).forEach(([k, v]) => {
                    if (k === campo) {
                      if (v !== value) {
                        let newValue = cont;
                        fieldName = fieldName + '__' + newValue;
                        let body = {
                          userName: this.getUserName(),
                          fieldName: fieldName,
                          fieldValue: value,
                        };

                        let confThree = headers.createHeadersPost(
                          URL_BASE_DBTC,
                          config.urlDollar.userAddInfo,
                          body
                        );

                        instance.interceptors.request.use(
                          (confThree) => {
                            interceptor.process(conf);
                            return confThree;
                          },
                          (error) => {
                            return Promise.reject(error);
                          }
                        );

                        instance(confThree)
                          .then((resp) => {
                            ////console.log(resp);
                          })
                          .catch((error) => {
                            this.addInfoToUserDollarBtc(user, fieldName, value);
                            ////console.log(error);
                          });
                      }
                    }
                  });
                } else {
                  if (value !== res[key]) {
                    fieldName = fieldName + '__' + 1;
                    let body = {
                      userName: this.getUserName(),
                      fieldName: fieldName,
                      fieldValue: value,
                    };

                    let confFour = headers.createHeadersPost(
                      URL_BASE_DBTC,
                      config.urlDollar.userAddInfo,
                      body
                    );

                    instance.interceptors.request.use(
                      (confFour) => {
                        interceptor.process(conf);
                        return confFour;
                      },
                      (error) => {
                        return Promise.reject(error);
                      }
                    );

                    instance(confFour)
                      .then((resp) => {
                        ////console.log(resp);
                      })
                      .catch((error) => {
                        this.addInfoToUserDollarBtc(user, fieldName, value);
                        ////console.log(error);
                      });
                  }
                }
              }
            }
          }
        });
      } catch (error) {}
    }
  },
  /*confirChanguePassword(token, password) {
    let urlinit = URL_BASE_BUSHIDO + config.urlBushido.passwordResetInit;
    let urlconfir = URL_BASE_BUSHIDO + config.urlBushido.passwordResetConfirm;
    var hashCredencial = '';
    var request = { token: token };
    axios.post(urlinit, request).then((res) => {
      if (!res.data.errors || res.data.errors.length === 0) {
        this.tokenPasswordUpdate = true;
        if (res.data.payload === true) {
          this.tokenPasswordUpdate = false;
        } else {
          var req = { token: token, password: password };
          axios.post(urlconfir, req).then((res) => {
            if (!res.data.errors || res.data.errors.length === 0) {
              this.tokenPasswordUpdate = true;
              hashCredencial = btoa(
                password + ':' + sessionStorage.getItem('username')
              );
              sessionStorage.setItem('header', hashCredencial);
            } else {
              this.tokenPasswordUpdate = false;
            }
          });
        }
      }
    });
  },*/
  sendMessagePhone() {
    let url = URL_BASE_BUSHIDO + config.urlBushido.tokenPhone;
    let body = {
      username: sessionStorage.getItem('username'),
      enforceSms: true,
      phoneNumber:
        sessionStorage.getItem('countryCode') +
        '-' +
        sessionStorage.getItem('phone'),
    };
    //  ////console.log(body, url);
    return axios.post(url, body, {
      auth: {
        username: atob(this.getHeader()).split(':')[1],
        password: atob(this.getHeader()).split(':')[0],
      },
    });
  },
  confirmPhone(code) {
    let url = URL_BASE_BUSHIDO + config.urlBushido.verifyCodePhone;
    let body = {
      token: sessionStorage.getItem('username'),
      code: code,
    };
    return axios.post(url, body, {
      auth: {
        username: atob(this.getHeader()).split(':')[1],
        password: atob(this.getHeader()).split(':')[0],
      },
    });
  },
  getBalanceUser(username) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersGet(
      URL_BASE_DBTC,
      config.urlDollar.userBalance + username
    );
    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    return instance(conf);
  },
  getConfigUserGeneral(username) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersGet(
      URL_BASE_DBTC,
      config.urlDollar.userConfig + username + '/OK'
    );
    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    return instance(conf);
  },
  async _getUserVerificationFields() {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersGet(
      URL_BASE_DBTC,
      config.urlDollar.getUserVerificationFields + 'E'
    );
    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    const RESPONSE = await instance(conf);
    if (RESPONSE.status !== 200) {
      throw 'Error';
    }
    return RESPONSE;
  },
  async _deleteVerificationE() {
    let body = {
      userName: '584245787154',
      userVerificationType: 'E',
      removeFieldNames: [
        'firstName',
        'lastName',
        'typeDocumentIdentity',
        'numberDocumentIdentity',
        'gender',
        'birthdate',
        'birthplace',
        'userDirection',
        'questionSecurity',
        'answerSecurity',
        'identityVerificationMc',
        'selfieIdentityVerificationMc',
      ],
    };

    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersPut(
      URL_BASE_DBTC,
      config.urlDollar.deleteVerificationE,
      body
    );

    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    const RESPONSE = await instance(conf);
    if (RESPONSE.status !== 200) {
      throw Error('error in request');
    }
    return RESPONSE;
  },
  async getConfigUserGeneralAsync(username) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersGet(
      URL_BASE_DBTC,
      config.urlDollar.userConfig + username + '/OK'
    );
    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    const RESPONSE = await instance(conf);
    if (RESPONSE.status !== 200) {
      throw 'Error';
    }
    return RESPONSE;
  },
  getVerifications(username, status) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersGet(
      URL_BASE_DBTC,
      config.urlDollar.getVerifications + status
    );
    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    return instance(conf);
  },
  getUserConfigs(body) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersPost(
      URL_BASE_DBTC,
      config.urlDollar.getConfigs,
      body
    );
    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    return instance(conf);
    //return axios.post(URL_BASE_DBTC + config.urlDollar.getConfigs, body);
  },
  userAddAttachment(body) {
    let url = URL_BASE_DBTC + config.urlDollar.userAddAttachment;
    // //console.log(url);
    const configuration = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    return axios.post(url, body, configuration);
  },
  userAddAttachmentDistTwo(body) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersPostDistinctTwo(
      URL_BASE_DBTC,
      config.urlDollar.userAddAttachment,
      body
    );
    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    return instance(conf);
    //return axios.post(URL_BASE_DBTC + config.urlDollar.getConfigs, body);
  },
  userProcessVerification(body) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersPut(
      URL_BASE_DBTC,
      config.urlDollar.processVerification,
      body
    );
    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    return instance(conf);
  },
  createOperator(email) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let body = {
      userName: email,
    };
    let conf = headers.createHeadersPut(
      URL_BASE_DBTC,
      config.urlDollar.userToOperator,
      body
    );
    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    return instance(conf);
  },

  transferBTC(body) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );

    let conf = headers.createHeadersPut(
      URL_BASE_DBTC,
      config.urlDollar.transferBTC,
      body
    );

    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    return instance(conf);
  },
  // Get Metods generals >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  updateResponse() {
    this.requestVerify = false;
    this.sussesfullRegister = false;
    this.result = '';
    // this.notVerifyUser = true;
    // this.notAuth = false;
  },

  getNotAuth() {
    return this.notAuth;
  },
  getUpdateUser() {
    return this.updateUser;
  },
  getUserStatus() {
    return sessionStorage.getItem('verify');
  },
  getResponseAuth() {
    return this.responseAuth;
  },
  getUserAuth() {
    return sessionStorage.getItem('auth');
  },
  getUserName() {
    return sessionStorage.getItem('username');
  },
  getUserEmail() {
    return sessionStorage.getItem('email');
  },
  getAddress() {
    return sessionStorage.getItem('address');
  },
  getAddressEtherUsdt() {
    return sessionStorage.getItem('addressEtherUsdt');
  },
  getAddressTronUsdt() {
    return sessionStorage.getItem('addressTronUsdt');
  },
  getResponseResult() {
    return this.sussesfullRegister;
  },
  getResutlPost() {
    return this.result;
  },
  getRequestVerify() {
    return this.requestVerify;
  },
  getHeader() {
    return sessionStorage.getItem('header');
  },
  getUserLocal() {
    return sessionStorage.getItem('user');
  },
  getPhone() {
    let phone =
      sessionStorage.getItem('countryCode') + sessionStorage.getItem('phone');
    return phone;
  },
  getResultSendTokenUpdatePassword() {
    return this.tokenPasswordUpdate;
  },
  getResultVerifyPhone() {
    return this.validVerifyPhone;
  },
  getUserVerificationStatus() {
    let data = sessionStorage.getItem('userVerificationStatus');
    if (data !== null && data !== undefined) {
      let js = JSON.parse(data);
      return js;
    } else {
      return null;
    }
  },
  getUserRol() {
    let data = sessionStorage.getItem('r');
    if (data !== null && data !== undefined) {
      let js = JSON.parse(data);
      return js;
    } else {
      return null;
    }
  },
  getBalanceStorageUserBTC() {
    let data = sessionStorage.getItem('userBalanceBTC');
    if (data !== null && data !== undefined && data !== '') {
      let js = JSON.parse(data);
      return js;
    } else {
      let js = {
        available: 0,
        estimated: 0,
      };
      return js;
    }
  },
  getDataUserBTC() {
    let data = sessionStorage.getItem('userDataDBTC');
    if (
      sessionStorage.getItem('userDataDBTC') !== null &&
      sessionStorage.getItem('userDataDBTC') !== undefined
    ) {
      let js = JSON.parse(data);
      return js;
    } else {
      return null;
    }
  },
  logout() {
    try {
      this.closeSession(this.getUserName());
      sessionStorage.clear();
      sessionStorage.removeItem('auth');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('header');
      sessionStorage.removeItem('address');
      sessionStorage.removeItem('websocketKey');
      sessionStorage.removeItem('wallets');
      sessionStorage.removeItem('userWallets');
      this.notAuth = true;
      this.notVerifyUser = true;
    } catch (error) {
      sessionStorage.clear();
      sessionStorage.removeItem('auth');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('header');
      sessionStorage.removeItem('address');
      sessionStorage.removeItem('websocketKey');
      sessionStorage.removeItem('wallets');
      sessionStorage.removeItem('userWallets');
      this.notAuth = true;
      this.notVerifyUser = true;
    }
  },
  markMessageAsRead(username, id) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let body = {
      userName: username,
      id: id,
    };
    let conf = headers.createHeadersPut(
      URL_BASE_DBTC,
      config.urlDollar.markMessageAsRead,
      body
    );
    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    return instance(conf);
  },

  cancelVerification(idOperationVerification, userVerificationType) {
    const instance = axios.create();
    let body = {
      userName: sessionStorage.getItem('username'),
      verificationOperationId: idOperationVerification,
      userVerificationType: userVerificationType,
    };
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersPut(
      URL_BASE_DBTC,
      config.urlDollar.cancelVerification,
      body
    );

    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    // ////console.log("add payment body", body);
    return instance(conf);
  },
  updateWalletCreation(email, address) {
    let url = URL_BASE_BUSHIDO + config.urlBushido.updateWalletCreation + email;
    let body = {
      address: address,
    };
    return axios.post(url, body, {
      auth: {
        username: atob(this.getHeader()).split(':')[1],
        password: atob(this.getHeader()).split(':')[0],
      },
    });
  },

  addNewWalletToUser(body) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersPost(
      URL_BASE_DBTC,
      config.urlDollar.addWallet,
      body
    );
    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    return instance(conf);
  },

  async signinUserToBushido(body) {
    const RESPONSE = await axios.post(
      URL_BASE_BUSHIDO + config.urlBushido.registrationMoneyclick,
      body
    );
    //console.log(RESPONSE);
    if (RESPONSE.status !== 200) {
      throw Error('Error en la operacion');
    }
    return RESPONSE;
  },

  addDeviceToUser(body) {
    let url = URL_BASE_BUSHIDO + config.urlBushido.addDevice;
    return axios.post(url, body, {
      auth: {
        username: atob(this.getHeader()).split(':')[1],
        password: atob(this.getHeader()).split(':')[0],
      },
    });
  },
  updateDeviceToUser(body) {
    let url = URL_BASE_BUSHIDO + config.urlBushido.updateDevice;
    return axios.post(url, body, {
      auth: {
        username: atob(this.getHeader()).split(':')[1],
        password: atob(this.getHeader()).split(':')[0],
      },
    });
  },
  processBalanceMovements(body) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersPost(
      URL_BASE_DBTC,
      config.urlDollar.processBalanceMovement,
      body
    );

    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    // ////console.log("add payment body", body);
    return instance(conf);
  },
  processBalanceMovementsNNull(userName, balance, wallet) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersGet(
      URL_BASE_DBTC,

      config.urlDollar.processBalanceMovement + wallet
    );

    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    // ////console.log("add payment body", body);
    return instance(conf);
  },
  processBalanceMovementsFail(userName, balance, message) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersGet(
      URL_BASE_DBTC,
      config.urlDollar.processBalanceMovement + message
    );

    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    // ////console.log("add payment body", body);
    return instance(conf);
  },
  changeProfile(username, userprofile) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let body = {
      userName: username,
      userProfile: userprofile,
    };
    let conf = headers.createHeadersPut(
      URL_BASE_DBTC,
      config.urlDollar.changeProfile,
      body
    );
    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    return instance(conf);
  },
  getSecurityQuestionsByUser(user, quantity) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersGet(
      URL_BASE_DBTC,
      config.urlDollar.getSecurityQuestionsByUser + user + '/' + quantity
    );
    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    return instance(conf);
  },
  validateSecurityAnswer(body) {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.post['Accept'] = 'text/plain';
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersPost(
      URL_BASE_DBTC,
      config.urlDollar.validateSecurityAnswer,
      body
    );

    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    // ////console.log("add payment body", body);
    return instance(conf);
  },
  async completeAccountService(body) {
    const RESPONSE = await axios.post(
      URL_BASE_BUSHIDO + config.urlBushido.accountComplete,
      body
    );
    if (RESPONSE.status !== 200) {
      throw Error('Error in complete account');
    }
    return RESPONSE;
  },

  preferedSecurity(body) {
    let url = URL_BASE_BUSHIDO + config.urlBushido.preferedSecurity;

    return axios.post(url, body, {
      auth: {
        username: atob(this.getHeader()).split(':')[1],
        password: atob(this.getHeader()).split(':')[0],
      },
    });
  },
  createGASecretKey(body) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersPost(
      URL_BASE_DBTC,
      config.urlDollar.createGASecretKey,
      body
    );

    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    // ////console.log("add payment body", body);
    return instance(conf);
  },
  verifyGACode(body) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersPost(
      URL_BASE_DBTC,
      config.urlDollar.verifyGACode,
      body
    );

    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    // ////console.log("add payment body", body);
    return instance(conf);
  },
  getGAQRCodeUrl() {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersGet(
      URL_BASE_DBTC,
      config.urlDollar.getGAQRCodeUrl +
        window.sessionStorage.getItem('username')
    );
    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    return instance(conf);
  },
  preferedSecurityTwoFactor(body) {
    return axios.post(
      URL_BASE_BUSHIDO + config.urlBushido.preferedSecurityTwoFactor,
      body,
      {
        auth: {
          username: atob(this.getHeader()).split(':')[1],
          password: atob(this.getHeader()).split(':')[0],
        },
      }
    );
  },
  preferedUserSendCodeTwoFactor() {
    return axios.get(
      URL_BASE_BUSHIDO +
        config.urlBushido.preferedUserSendCodeTwoFactor +
        this.getUserName()
    );
  },
  authCodeCore(body) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersPost(
      URL_BASE_DBTC,
      config.urlDollar.authCodeCore, //+window.sessionStorage.getItem('username'),
      body
    );

    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    // ////console.log("add payment body", body);
    return instance(conf);
  },
  sendAuthCodeCore(body) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersPost(
      URL_BASE_DBTC,
      config.urlDollar.sendAuthCodeCore,
      body
    );
    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    return instance(conf);
  },
  passwordResetToken(body) {
    return axios.post(
      URL_BASE_BUSHIDO + config.urlBushido.passwordResetToken,
      body
    );
  },
  passwordResetCode(body) {
    return axios.post(
      URL_BASE_BUSHIDO + config.urlBushido.passwordResetCode,
      body
    );
  },
  async removeVerificationProccessToUser(body) {
    const RESPONSE = await interceptorHeader.createHeaders(
      config.urlDollar.removeVerificationUser,
      body,
      'PUT'
    );
    if (RESPONSE.status !== 200) {
      throw Error('Error in remove verification');
    }
    return RESPONSE;
  },
  async sendTokenToEmailUser(body) {
    const RESPONSE = await axios.post(
      URL_BASE_BUSHIDO + config.urlBushido.generateTokenVerify,
      body,
      {
        auth: {
          username: atob(this.getHeader()).split(':')[1],
          password: atob(this.getHeader()).split(':')[0],
        },
      }
    );
    if (RESPONSE.status !== 200) {
      throw Error('Error in send code');
    }
    return RESPONSE;
  },
  async verifyTokenToEmail(token) {
    const RESPONSE = await axios.post(
      URL_BASE_BUSHIDO + config.urlBushido.verifyToken,
      token,
      {
        auth: {
          username: atob(this.getHeader()).split(':')[1],
          password: atob(this.getHeader()).split(':')[0],
        },
        headers: { 'Content-Type': 'text/plain' },
      }
    );
    if (RESPONSE.status !== 200) {
      throw Error('Error in send code');
    }
    return RESPONSE;
  },

  async verifyPhoneBushido(username) {
    const RESPONSE = await axios.put(
      URL_BASE_BUSHIDO + config.urlBushido.validatePhone,
      username,
      { headers: { 'Content-Type': 'text/plain' } }
    );
    if (RESPONSE.status !== 200) {
      throw Error('Error in get payment for currency');
    }
    return RESPONSE;
  },

  findUserByPhone(phone, countryCode) {
    return axios.get(
      URL_BASE_BUSHIDO +
        config.urlBushido.findUserByPhone +
        phone +
        '/' +
        countryCode
    );
  },

  findUserByEmail(email) {
    return axios.get(
      URL_BASE_BUSHIDO + config.urlBushido.findUserByEmail + email
    );
  },
  getUserVerificationFields() {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersGet(
      URL_BASE_DBTC,
      config.urlDollar.getUserVerificationFields + 'E'
    );
    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    return instance(conf);
  },
  sendToPayment(body) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersPost(
      URL_BASE_DBTC,
      config.urlDollar.sendToPayment,
      body
    );
    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    return instance(conf);
  },
  async verifyIdentityMoneyClick(fieldsToVerify) {
    let username = sessionStorage.getItem('username');
    let body = {
      userName: username,
      fieldNames: fieldsToVerify,
      userVerificationType: 'E',
      info: 'Verification user account MC',
    };
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersPost(
      URL_BASE_DBTC,
      config.urlDollar.startVerification,
      body
    );
    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    return instance(conf);
  },
  _hasIdentityMC(userConfig) {
    let isValid = false;
    let arrayType = ['C', 'E'];

    arrayType.forEach((type) => {
      if (userConfig.verification !== undefined) {
        if (
          userConfig.verification[type] !== undefined &&
          !(userConfig.verification[type].userVerificationStatus === 'FAIL')
        ) {
          isValid = true;
        }
      }
    });
    return isValid;
  },
  async getFactor(currencyBase, currencyTarget) {
    //   console.log('base ', currencyBase, currencyTarget);
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersGet(
      URL_BASE_DBTC,
      config.urlDollar.getFactor + currencyBase + '/' + currencyTarget
    );
    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    return instance(conf);
  },
  async getCryptoPrice(fiat, crypto) {
    //  console.log('getCryptoPrice ', fiat, crypto);
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersGet(
      URL_BASE_DBTC,
      config.urlDollar.getCryptoPrice + crypto + '/' + fiat
    );
    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    return instance(conf);
  },
  async getReceiveAuthorization(username) {
    const RESPONSE = await interceptorHeader.createHeaders(
      config.urlDollar.getReceiveAuthorizacion + username,
      undefined,
      'GET'
    );

    if (RESPONSE.status !== 200) {
      throw Error('Error in get getReceiveAuthorization');
    }

    return RESPONSE;
  },
  async changeStatusReceiveAuthorization(body) {
    const RESPONSE = await interceptorHeader.createHeaders(
      config.urlDollar.changeStatusReceiveAuthorization,
      body,
      'PUT'
    );

    if (RESPONSE.status !== 200) {
      throw Error('Error in get changeStatusReceiveAuthorization');
    }
    console.log(RESPONSE);
    return RESPONSE;
  },
  async getMessageReceiveAuthorization(id, language) {
    const RESPONSE = await interceptorHeader.createHeaders(
      config.urlDollar.getMessageReceive + id + '/' + language,
      undefined,
      'GET'
    );

    if (RESPONSE.status !== 200) {
      throw Error('Error in get getReceiveAuthorization');
    }

    return RESPONSE;
  },

  async getMovementsUser(username) {
    var dateEnd = new Date();
    var timeback = 1000 * 60 * 60 * 24 * 90;
    var dateInit = new Date(dateEnd.getTime() - timeback);
    var timeadd = 1000 * 60 * 60 * 48;
    dateEnd = new Date(dateEnd.getTime() + timeadd);
    const RESPONSE = await interceptorHeader.createHeaders(
      config.urlDollar.getBalanceMovementsMoneyClick +
        '/' +
        username +
        '/' +
        dateInit.toISOString() +
        '/' +
        dateEnd.toISOString(),
      undefined,
      'GET'
    );

    if (RESPONSE.status !== 200) {
      throw Error(
        'Error en la operacion  /mcUser/getBalanceMovementsMoneyClick cause: '
      );
    }
    return RESPONSE;
  },
  async getMovementsUserRange(username, dateInit, dateEnd) {
    var dateEndNew = new Date(dateEnd).getTime() + 100800000;
    dateEndNew = new Date(dateEndNew);
    var dateInitNew = new Date(dateInit).getTime() + 14400000;
    dateInitNew = new Date(dateInitNew);
    const RESPONSE = await interceptorHeader.createHeaders(
      config.urlDollar.getBalanceMovementsMoneyClick +
        '/' +
        username +
        '/' +
        dateInitNew.toISOString() +
        '/' +
        dateEndNew.toISOString(),
      undefined,
      'GET'
    );

    if (RESPONSE.status !== 200) {
      throw Error(
        'Error en la operacion  /mcUser/getBalanceMovementsMoneyClick cause: '
      );
    }
    return RESPONSE;
  },
  async getOperationsByFilter(body) {
    const RESPONSE = await interceptorHeader.createHeaders(
      config.urlDollar.getOperationWithFilter,
      body,
      'POST'
    );
    if (RESPONSE.status !== 200) {
      throw Error('Fail to get operations Retail');
    }
    return RESPONSE;
  },
  async updateCreateQrGoogleAuth(username) {
    const RESPONSE = await axios.put(
      URL_BASE_BUSHIDO + config.urlBushido.updateCreateQrGoogleAuth,
      username,
      { headers: { 'Content-Type': 'text/plain' } }
    );
    if (RESPONSE.status !== 200) {
      throw Error('Error in get payment for currency');
    }
    return RESPONSE;
  },

  checkNickname(nickname) {
    return axios.get(
      URL_BASE_BUSHIDO + config.urlBushido.checkNickname + nickname
    );
  },
  async getBuyBalanceGetDollarBTCPayments(currency) {
    let username = sessionStorage.getItem('username');
    const RESPONSE = await interceptorHeader.createHeaders(
      config.urlDollar.buyBalanceGetDollarBTCPayments +
        username +
        '/' +
        currency,
      undefined,
      'GET'
    );
    if (RESPONSE.status !== 200) {
      throw Error('Fail to get BuyBalanceGetDollarBTCPayments');
    }
    return RESPONSE;
  },

  // async getOperationsByFilter(body)
  // {
  //   const RESPONSE = await interceptorHeader.createHeaders(
  //     config.urlDollar.getOperationWithFilter,
  //     body,
  //     "POST"
  //   );
  //   if (RESPONSE.status !== 200) {
  //     throw Error("Fail to get operations Retail");
  //   }
  //   return RESPONSE;
  // },
  async closeSession(username) {
    /*const RESPONSE = await axios.put(
      URL_BASE_BUSHIDO + config.urlBushido.closeSession,
      username,
      { headers: { "Content-Type": "text/plain" } }
    );
    if (RESPONSE.status !== 200) {
      throw Error("Error in get payment for currency");
    }
    return RESPONSE;*/
  },
  async updateLastActivity() {
    /*const RESPONSE = await axios.put(
      URL_BASE_BUSHIDO + config.urlBushido.uptadeLastActivity,
      this.getUserName(),
      { headers: { "Content-Type": "text/plain" } }
    );
    if (RESPONSE.status !== 200) {
      throw Error("Error in get payment for currency");
    }
    return RESPONSE;*/
  },
  async getReferralCode() {
    const RESPONSE = await interceptorHeader.createHeaders(
      config.urlDollar.referralCodes,
      undefined,
      'GET'
    );
    if (RESPONSE.status !== 200) {
      throw Error('Fail to get referralCode');
    }
    return RESPONSE;
  },
  async userAddAttachmentAsync(body) {
    const RESPONSE = await interceptorHeader.createHeaders(
      config.urlDollar.userAddAttachment,
      body,
      'POST',
      true
    );
    if (RESPONSE.status !== 200) {
      throw Error('Error in complete account');
    }
    return RESPONSE;
  },
  async addUserFrequent(codCountry, phone, nameUserFrequent, username) {
    let body = {
      username: username,
      phone: phone,
      codCountry: codCountry,
      nameUserFrequent: nameUserFrequent,
    };

    //console.log("body addFrequent ", body);

    const RESPONSE = await axios.post(
      URL_BASE_BUSHIDO + config.urlBushido.addUserFrequent,
      body
    );
    if (RESPONSE.status !== 200) {
      throw Error('Error operation /addUserFrequentCheck');
    }
    return RESPONSE;
  },
  async getUserByPhone(countryCode, phone) {
    const RESPONSE = await axios.get(
      URL_BASE_BUSHIDO +
        config.urlBushido.getUserByPhone +
        '/' +
        phone +
        '/' +
        countryCode,
      { timeout: 10000 }
    );
    if (RESPONSE.status !== 200) {
      throw Error('Error in service list user');
    }
    return RESPONSE;
  },
  async deleteUserFrequent(userToDelete) {
    const RESPONSE = await axios.post(
      URL_BASE_BUSHIDO + config.urlBushido.deleteUserFrequent,
      userToDelete
    );
    if (RESPONSE.status !== 200) {
      throw Error('Error in service delete user from frequents');
    }
    return RESPONSE;
  },

  activateUser(username) {
    let body = {
      userName: username,
    };
    return interceptorHeader.createHeaders(
      config.urlDollar.userActive,
      body,
      'PUT'
    );
  },
  async getSendOperationType(targetAddress) {
    const RESPONSE = await interceptorHeader.createHeaders(
      config.urlDollar.getSendOperationType + targetAddress,
      undefined,
      'GET'
    );
    if (RESPONSE.status !== 200) {
      throw Error('Error getSendOpetarionType, code: ' + RESPONSE.status);
    }
    return RESPONSE;
  },
  getUsers() {
    return interceptorHeader.createHeaders(
      config.urlDollar.userList,
      undefined,
      'GET'
    );
  },
  getBankers(username) {
    return interceptorHeader.createHeaders(
      config.urlDollar.bankersList + username,
      undefined,
      'GET'
    );
  },
  getConfigBankers(username) {
    const instance = axios.create();
    let interceptor = new HMACInterceptor(
      'Admin',
      'f0d16792-cdc9-4585-a5fd-bae3d898d8c5',
      'eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==',
      'SHA256'
    );
    let conf = headers.createHeadersGet(
      URL_BASE_DBTC,
      config.urlDollar.getConfigBankers + username
    );
    instance.interceptors.request.use(
      (conf) => {
        interceptor.process(conf);
        return conf;
      },
      (error) => {
        ////console.log(error);
        return Promise.reject(error);
      }
    );
    return instance(conf);
  },
  async applyGiftCard(body) {
    const RESPONSE = await interceptorHeader.createHeaders(
      config.urlDollar.applyGiftCard,
      body,
      'POST'
    );
    if (RESPONSE.status !== 200) {
      throw Error('Error in get getReceiveAuthorization');
    }

    return RESPONSE;
  },
  deleteDeviceUser(body) {
    return axios.put(URL_BASE_BUSHIDO + config.urlBushido.deleteDevice, body, {
      auth: {
        username: atob(this.getHeader()).split(':')[1],
        password: atob(this.getHeader()).split(':')[0],
      },
    });
  },
  getReferredUsers(username) {
    return interceptorHeader.createHeaders(
      config.urlDollar.getReferredUsers + username,
      undefined,
      'GET'
    );
  },

  async buyCrypto(body) {
    const RESPONSE = await interceptorHeader.createHeaders(
      config.urlDollar.buyCrypto,
      body,
      'PUT'
    );
    if (RESPONSE.status !== 200) {
      throw Error('Error updating');
    }
    return RESPONSE;
  },

  async sellCrypto(body) {
    const RESPONSE = await interceptorHeader.createHeaders(
      config.urlDollar.sellCrypto,
      body,
      'PUT'
    );
    if (RESPONSE.status !== 200) {
      throw Error('Error updating');
    }
    return RESPONSE;
  },
  async getNotifications() {
    let username = sessionStorage.getItem('username');
    // let username = await AsyncStorage.getItem('username');
    const RESPONSE = await interceptorHeader.createHeaders(
      config.urlDollar.getAllNotificationByUser + username,
      undefined,
      'GET'
    );
    if (RESPONSE.status !== 200) {
      throw Error('Error operation /addTokenApp');
    }
    return RESPONSE;
  },
  async makeRead(id) {
    let username = sessionStorage.getItem('username');
    //  let username = await AsyncStorage.getItem('username');
    const RESPONSE = await interceptorHeader.createHeaders(
      config.urlDollar.makeToReadNoti + username + '/' + id,
      undefined,
      'GET'
    );
    if (RESPONSE.status !== 200) {
      throw Error('Error operation /addTokenApp');
    }
    return RESPONSE;
  },
  /*async getBtcPrice(currency) {
		const instance = axios.create();
		let interceptor = new HMACInterceptor(
			"Admin",
			"f0d16792-cdc9-4585-a5fd-bae3d898d8c5",
			"eox4TsBBPhpi737yMxpdBbr3sgg/DEC4m47VXO0B8qJLsbdMsmN47j/ZF/EFpyUKtAhm0OWXMGaAjRaho7/93Q==",
			"SHA256",
		);
		let conf = headers.createHeadersGet(
			URL_BASE_DBTC,
			config.urlDollar.getBtcPrice + currency,
		);
		instance.interceptors.request.use(
			(conf) => {
				interceptor.process(conf);
				return conf;
			},
			(error) => {
				return Promise.reject(error);
			},
		);
		return instance(conf);
	},*/
};
