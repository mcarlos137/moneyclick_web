import React, { Component } from "react";
import {
  Form,
  Modal,
  Segment,
  Header,
  Grid,
  Button,
  Message,
  Icon,
  Divider,
  Label,
  Popup,
  List,
  Dimmer,
  Loader,
  Image,
  Step,
} from "semantic-ui-react";
import { Document, Page } from "react-pdf";
import "react-circular-progressbar/dist/styles.css";
import "./OptionDetail.css";
import userService from "../../../services/user";
import _ from "underscore";
import config from "../../../services/config";
import translate from "../../../i18n/translate";
import { isMobile } from "react-device-detect";
import attachments from "../../../services/attachments";
import statusGreen from "../../../img/estatus-perfil-2.png";
import statusRed from "../../../img/estatus-perfil-1.png";
const URL_BASE_DBTC = config.apiDollarBtcUrl;
class OptionDetail extends Component {
  constructor(props) {
    super(props);
    this._Mounted = false;
    this.state = {
      firstName: "",
      lastName: "",
      email:
        userService.getUserEmail() !== "null" ? userService.getUserEmail() : "",
      viewMessage: false,
      viewMessageEmail: false,
      userVerifyC:
        userService.getUserVerificationStatus() !== null
          ? userService.getUserVerificationStatus().C
          : "UNINITIATED",
      phoneVerified:
        window.sessionStorage.getItem("phoneVerified") === "true"
          ? true
          : false,
      codeVerify: "",
      loadForm: false,
      resultUpdate: null,
      modalOpen: false,
      sendForm: false,
      sexList: [
        { value: "male", text: "profile.optionDetail.sexList.male" },
        { value: "female", text: "profile.optionDetail.sexList.female" },
      ],
      documentType: [
        { value: "id", text: "ID" },
        { value: "dni", text: "DNI" },
        {
          value: "cedula",
          text: "profile.optionDetail.documentType.identificationCard",
        },
        {
          value: "passport",
          text: "profile.optionDetail.documentType.passport",
        },
        { value: "other", text: "profile.optionDetail.documentType.other" },
      ],
      gender: "",
      birthdate: "",
      //cityOfBirth: "",
      countryOfBirth: "",
      typeDocument: "",
      numberDocumentId: "",
      sendEmail: false,
      userDirection: "",
      show: false,
      userData: {},
      userImage: [],
      userImageProfile:"",
      imageProfile:"",
      interval: null,
      nickname: sessionStorage.getItem("nickname"),
      nicknameTem: "",
      errorInRed: false,
      juridic: false,
      translator: props.translate,
      modalMessage: "profile.optionDetail.messages.emptyMessage",
      userVerifyA:
        userService.getUserVerificationStatus() !== null
          ? userService.getUserVerificationStatus().A
          : "",
    };
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.language !== nextProps.language) {
      this.setState({
        translator: nextProps.translate,
      });
    }
  }

  componentDidMount() {
    this.setState({
      firstName: window.sessionStorage.getItem("firstName"),
      lastName: window.sessionStorage.getItem("lastName"),
    });

    let username = userService.getUserName();
    let data = userService.getConfigUserGeneral(username);
    data
      .then((resp) => {
        //console.log(resp)
        let userData = this.getActualUserInfo(resp.data.result);
        // console.log("UserData",userData)
        sessionStorage.setItem(
          "nickname",
          userData.nickname !== undefined ? userData.nickname : ""
        );
        this.setState(
          {
            userData: userData,
            nickname: userData.nickname !== undefined ? userData.nickname : "",
            juridic:
              resp.data.result.company !== undefined &&
              resp.data.result.company === "true"
                ? true
                : false,
            imageProfile: resp.data.result.profileImage !==undefined ? resp.data.result.profileImage : "",
          },
          () => {
            this._Mounted = true;
          }
        );

        this.loadImageUser(resp.data.result);
        if (resp.data.result.verification === undefined) {
          this.setState({
            userVerifyC: "UNINITIATED",
            show: true,
            phoneVerified: false,
          });
        } else {
          if (resp.data.result.verification.C === undefined) {
            this.setState({ userVerifyC: "UNINITIATED" });
          } else {
            this.setState({
              userVerifyC:
                resp.data.result.verification.C.userVerificationStatus,
              show: true,
            });
          }
          if (resp.data.result.verification.E === undefined) {
            this.setState({ userVerifyE: "UNINITIATED", show: true });
          } else {
            this.setState({
              userVerifyE:
                resp.data.result.verification.E.userVerificationStatus,
              show: true,
            });
          }
          if (resp.data.result.verification.B === undefined) {
            this.setState({ phoneVerified: false });
          } else {
            this.setState({ phoneVerified: true });
          }
          if (resp.data.result.verification.A === undefined) {
            this.setState({ userVerifyA: false });
          } else {
            this.setState({ userVerifyA: true });
          }
        }
      })
      .catch((error) => {
        this.setState({ errorInRed: true, show: true });
        this._Mounted = true;
        //////console.log(error);
      });
  }
  componentWillUnmount() {
    this._Mounted = false;
    clearInterval(this.state.interval);
  }
  async loadImageUser(userInfo) {
    if (userInfo.identityVerificationMc !== undefined) {
      try {
        const response = await attachments.getAttachementUser(
          userService.getUserName(),
          userInfo.identityVerificationMc
        );
        let blob = new Blob([response.data], {
          type: userInfo.identityVerificationMc.includes("pdf")
            ? "application/pdf"
            : response.headers["content-type"],
        });
        let image = URL.createObjectURL(blob);
        this.setState({
          userImage: [
            ...this.state.userImage,
            {
              src: image,
              name: "identityVerificationMc",
              isPdf: userInfo.identityVerificationMc.includes("pdf"),
              message: "profile.optionDetail.docsImages.identity",
              status: true,
            },
          ],
        });
      } catch (error) {
        ////console.log(error);
      }
    }
    if (userInfo.selfieIdentityVerificationMc !== undefined) {
      try {
        const response = await attachments.getAttachementUser(
          userService.getUserName(),
          userInfo.selfieIdentityVerificationMc
        );
        let blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        let image = URL.createObjectURL(blob);
        this.setState({
          userImage: [
            ...this.state.userImage,
            {
              src: image,
              name: "selfieIdentityVerificationMc",
              isPdf: userInfo.selfieIdentityVerificationMc.includes("pdf"),
              message: "profile.optionDetail.docsImages.selfieOfVerification",
              status: true,
            },
          ],
        });
      } catch (error) {
        // //console.log(error);
      }
    }
    if (userInfo.profileImage !== undefined) {
      try {
        let nameValue = String(userInfo.profileImage);
        if (nameValue.includes("https://attachment.dollarbtc.com")) {
          nameValue = nameValue.split("https://attachment.dollarbtc.com")[1];
          nameValue = nameValue.split("/")[2];
        }
        const response = await attachments.getAttachementUser(
          userService.getUserName(),
          nameValue
        );
        let blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        let image = URL.createObjectURL(blob);
        this.setState({
          userImageProfile: image
        });
      } catch (error) {
        //console.log(error);
      }
    }
    if (userInfo.identityURL !== undefined) {
      try {
        let nameValue = String(userInfo.identityURL);
        if (nameValue.includes("https://attachment.dollarbtc.com")) {
          nameValue = nameValue.split("https://attachment.dollarbtc.com")[1];
          nameValue = nameValue.split("/")[2];
        }
        const response = await attachments.getAttachementUser(
          userService.getUserName(),
          nameValue
        );
        let blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        let image = URL.createObjectURL(blob);
        this.setState({
          userImage: [
            ...this.state.userImage,
            {
              src: image,
              name: "identityURL",
              isPdf: userInfo.identityURL.includes("pdf"),
              message: "profile.optionDetail.docsImages.identity",
              status: true,
            },
          ],
        });
      } catch (error) {
        //console.log(error);
      }
    }
    if (userInfo.bankURL !== undefined) {
      try {
        let nameValue = String(userInfo.bankURL);
        if (nameValue.includes("https://attachment.dollarbtc.com")) {
          nameValue = nameValue.split("https://attachment.dollarbtc.com")[1];
          nameValue = nameValue.split("/")[2];
        }
        const response = await attachments.getAttachementUser(
          userService.getUserName(),
          nameValue
        );
        let blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        let image = URL.createObjectURL(blob);
        this.setState({
          userImage: [
            ...this.state.userImage,
            {
              src: image,
              name: "bankURL",
              isPdf: userInfo.bankURL.includes("pdf"),
              message: "profile.optionDetail.docsImages.bank",
              status: true,
            },
          ],
        });
      } catch (error) {
        //console.log(error);
      }
    }
    if (userInfo.locationURL !== undefined) {
      try {
        let nameValue = String(userInfo.locationURL);
        if (nameValue.includes("https://attachment.dollarbtc.com")) {
          nameValue = nameValue.split("https://attachment.dollarbtc.com")[1];
          nameValue = nameValue.split("/")[2];
        }
        const response = await attachments.getAttachementUser(
          userService.getUserName(),
          nameValue
        );
        let blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        let image = URL.createObjectURL(blob);
        this.setState({
          userImage: [
            ...this.state.userImage,
            {
              src: image,
              name: "locationURL",
              isPdf: userInfo.locationURL.includes("pdf"),
              message: "profile.optionDetail.docsImages.location",
              status: true,
            },
          ],
        });
      } catch (error) {
        //console.log(error);
      }
    }
    if (userInfo.selfURL !== undefined) {
      try {
        let nameValue = String(userInfo.selfURL);
        if (nameValue.includes("https://attachment.dollarbtc.com")) {
          nameValue = nameValue.split("https://attachment.dollarbtc.com")[1];
          nameValue = nameValue.split("/")[2];
        }
        const response = await attachments.getAttachementUser(
          userService.getUserName(),
          nameValue
        );
        let blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        let image = URL.createObjectURL(blob);
        this.setState({
          userImage: [
            ...this.state.userImage,
            {
              src: image,
              name: "selfURL",
              isPdf: userInfo.selfURL.includes("pdf"),
              message: "profile.optionDetail.docsImages.selfie",
              status: true,
            },
          ],
        });
      } catch (error) {
        // console.log(error);
      }
    }
  }
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
    var actualCountryOfBirthKey;
  //var actualCityOfBirthKey;
    var actualBirthplaceKey;
    var actualFamilyNameKey;
    var actualFamilyEmailKey;
    var actualUserLocalBitcoinKey;
    var actualUserFacebookKey;
    var actualDescriptionProfileKey;
    var actualWebKey;
    var actualInstagramKey;
    var actualUserAddressKey;
    var actualNickName;
    var actualCompanyName,
      actualCompanyTypeOfFiscalRecord,
      actualCompanyNumberOfFiscalRecord,
      actualCompanyYearRegistration;
    for (var i = 0; i < listKeys.length; i++) {
      if (listKeys[i].startsWith("firstName")) {
        actualfirstNameKey = listKeys[i];
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
      } else if (listKeys[i].startsWith("countryOfBirth")) {
        actualCountryOfBirthKey = listKeys[i];
      }/* else if (listKeys[i].startsWith("cityOfBirth")) {
        actualCityOfBirthKey = listKeys[i];
      }*/ else if (listKeys[i].startsWith("familyName")) {
        actualFamilyNameKey = listKeys[i];
      } else if (listKeys[i].startsWith("familyEmail")) {
        actualFamilyEmailKey = listKeys[i];
      } else if (listKeys[i].startsWith("userLocalBitcoin")) {
        actualUserLocalBitcoinKey = listKeys[i];
      } else if (listKeys[i].startsWith("userFacebook")) {
        actualUserFacebookKey = listKeys[i];
      }else if (listKeys[i].startsWith("descriptionProfile")) {
        actualDescriptionProfileKey = listKeys[i];
      }
      else if (listKeys[i].startsWith("web")) {
        // console.log("listKeys[i]",listKeys[i])
        actualWebKey = listKeys[i];
      }
      else if (listKeys[i].startsWith("instagram")) {
        actualInstagramKey = listKeys[i];
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
      actualCountryOfBirthKey,
      //actualCityOfBirthKey,
      actualBirthplaceKey,
      actualFamilyNameKey,
      actualFamilyEmailKey,
      actualUserLocalBitcoinKey,
      actualUserFacebookKey,
      actualDescriptionProfileKey,
      actualWebKey,
      actualInstagramKey,
      actualUserAddressKey,
      actualNickName,
      actualCompanyName,
      actualCompanyTypeOfFiscalRecord,
      actualCompanyNumberOfFiscalRecord,
      actualCompanyYearRegistration,
      "address",
      "operationAccount",
      "environment",
      "type",
      "active",
      "email"
    );
    var modifiedObj = _.pick(allInfo, [listActualKeys]);
    var normalizeObject = {};
    Object.entries(modifiedObj).forEach(([key, value]) => {
      if (key.startsWith("firstName")) {
        normalizeObject.firstName = value;
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
      } else if (key.startsWith("countryOfBirth")) {
        normalizeObject.countryOfBirth = value;
      } /*else if (key.startsWith("cityOfBirth")) {
        normalizeObject.cityOfBirth = value;
      }*/ else if (key.startsWith("birthplace")) {
        normalizeObject.birthplace = value;
      } else if (key.startsWith("familyName")) {
        normalizeObject.familyName = value;
      } else if (key.startsWith("familyEmail")) {
        normalizeObject.familyEmail = value;
      } else if (key.startsWith("userLocalBitcoin")) {
        normalizeObject.userLocalBitcoin = value;
      } else if (key.startsWith("userFacebook")) {
        normalizeObject.userFacebook = value;
      }
      else if (key.startsWith("descriptionProfile")) {
        normalizeObject.descriptionProfile = value;
      }
      else if (key.startsWith("web")) {
        normalizeObject.web = value;
      }
      else if (key.startsWith("instagram")) {
        normalizeObject.instagram = value;
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
      }
    });
    return normalizeObject;
  };
  handleNickName(e) {
    this.setState({ nicknameTem: e.target.value });
  }
  handleNickNameModal() {
    this.setState({ showModalNick: true });
  }
  hadleVerifyUserTwoLevel() {
    window.location.href = "/verify";
  }
  handleEditProfile() {
    this.setState({
      activeItem: "editProfile",
    });
    this.props.changeItem("editProfile");
  }
  getSexValue(value) {
    let data = this.state.sexList.find(function (ele) {
      return ele.value === value;
    });
    if (data !== undefined) {
      return data.text;
    } else {
      return value;
    }
  }
  getTypeIdentityValue(value) {
    let data = this.state.documentType.find(function (ele) {
      return ele.value === value;
    });
    if (data !== undefined) {
      return data.text;
    } else {
      return value;
    }
  }
  emailVerify() {
    userService.verifyUserInit(this.state.email);
    let interval = setInterval(() => {
      this.getConfigUser();
    }, 10000);
    this.setState({ interval: interval });
    this.setState({ viewMessageEmail: true, sendEmail: true });
    setTimeout(() => {
      this.setState({ viewMessageEmail: false });
    }, 7000);
  }
  handleVerifyPhone() {
    // userService
    //   .sendMessagePhone()
    // ////console.log(this.state.phoneVerified);
    // ////console.log(window.sessionStorage.getItem('language').toUpperCase());
    let body = {
      userName: userService.getUserName(),
      language: window.sessionStorage.getItem("language").toUpperCase(),
      sendSms: true,
      sendMail: false,
    };
    userService
      .sendAuthCodeCore(body)
      .then((resp) => {
        //console.log(resp);
      })
      .catch((error) => {
        //console.log(error);
      });
    this.setState({
      modalOpen: true,
      modalMessage: "profile.optionDetail.messages.modalMessage",
    });
  }
  getConfigUser() {
    let username = userService.getUserName();
    let data = userService.getConfigUserGeneral(username);
    data.then((resp) => {
      if (resp.data.result.verification !== undefined) {
        if (resp.data.result.verification.A !== undefined) {
          this.setState({ userVerifyA: resp.data.result.verification.A });
          this.verifySession(resp);
          clearInterval(this.state.interval);
        }
      }
    });
  }
  verifySession(resp) {
    let userStatusA, userStatusB, userStatusC;

    if (resp.data.result.verification === undefined) {
      userStatusC = "UNINITIATED";
      userStatusA = false;
      userStatusB = false;
    } else {
      if (resp.data.result.verification.C === undefined) {
        userStatusC = "UNINITIATED";
      } else {
        userStatusC = resp.data.result.verification.C.userVerificationStatus;
      }
      if (resp.data.result.verification.A === undefined) {
        userStatusA = false;
      } else {
        userStatusA = true;
      }
      if (resp.data.result.verification.B === undefined) {
        userStatusB = false;
      } else {
        userStatusB = true;
      }
    }

    let verificationStatus = {
      A: userStatusA,
      B: userStatusB,
      C: userStatusC,
    };
    window.sessionStorage.setItem(
      "userVerificationStatus",
      JSON.stringify(verificationStatus)
    );
  }
  handleCodeVerify(e) {
    this.setState({ codeVerify: e.target.value });
  }
  handleConfirmCodePhone() {
    if (this.state.codeVerify !== "") {
      this.setState({ loadForm: true, sendForm: true });
      let body = {
        userName: userService.getUserName(),
        code: this.state.codeVerify,
      };
      userService
        .authCodeCore(body)
        .then(async (resp) => {
          ////console.log(resp);
          if (resp.data === "OK") {
            await userService.verifyPhoneBushido(userService.getUserName());
            //console.log("entrando al validate code con el input lleno OK");
            this.setState({
              resultUpdate: "",
              resultUpdate2: true,
              viewMessage: true,
              textMessage: "profile.optionDetail.messages.phoneVerified",
              phoneVerified: true,
              codeVerify: "",
              loadForm: false,
            });
            window.sessionStorage.setItem("phoneVerified", "true");
            let status = userService.getUserVerificationStatus();
            //console.log(status);
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
              JSON.stringify(statusUpdate)
            );

            let send = {
              userName: sessionStorage.getItem("username"),
              fieldNames: ["phone"],
              userVerificationType: "B",
              info: "Verification of user's telephone number",
            };
            let url = userService.verifyUserRequestCore(send);
            url
              .then((rep) => {
                ////////console.log(rep);
              })
              .catch((error) => {
                ////////console.log(error);
              });
          } else {
            ////console.log('entrando por el else');
            this.setState({
              viewMessage: true,
              resultUpdate: "",
              resultUpdate2: false,
              textMessage:
                "profile.optionDetail.messages.phoneVerificationFail",
              phoneVerified: false,
              codeVerify: "",
              loadForm: false,
            });
          }
        })
        .catch((error) => {
          ////console.log(error);
          this.setState({
            resultUpdate: "",
            resultUpdate2: false,
            viewMessage: true,
            textMessage: "profile.optionDetail.messages.phoneVerificationFail",
            phoneVerified: false,
            codeVerify: "",
            loadForm: false,
          });
        });
    } else {
      this.setState({
        viewMessage: true,
        textMessage: "profile.optionDetail.messages.emptyField",
      });
      setTimeout(() => {
        this.setState({
          viewMessage: false,
          textMessage: "",
        });
      }, 3000);
    }
  }
  closeModalOption() {
    this.setState({
      modalOpen: false,
      modalMessage: "",
      viewMessage: false,
      textMessage: "",
      resultUpdate: null,
      resultUpdate2: false,
      sendForm: false,
      codeVerify: "",
    });
  }
  closeModalOptionNick() {
    this.setState({
      showModalNick: false,
      viewMessageNick: false,
      textMessage: "",
      sendForm: false,
    });
  }

  formatDataVisualUser(string) {
    if (string.length !== undefined) {
      if (string.length > 0) {
        let long = string.length;
        let porcent = Math.round(long * 0.4);
        let array = [];
        for (let x of string) {
          array.push(x);
        }

        let rever = array.reverse();
        let result = "";
        if (rever.length >= 2 && rever.length <= 11) {
          for (let i = 2; i < porcent + 2; i++) {
            if (rever[i] !== undefined) {
              rever[i] = "*";
            } else {
              continue;
            }
          }
        }
        if (rever.length >= 11) {
          for (let i = 4; i < porcent + 4; i++) {
            if (rever[i] !== undefined) {
              rever[i] = "*";
            } else {
              continue;
            }
          }
        }
        if (rever.length < 2) {
          for (let i = 0; i < porcent; i++) {
            if (rever[i] !== undefined) {
              rever[i] = "*";
            } else {
              continue;
            }
          }
        }

        let res = rever.reverse();
        for (let t of res) {
          result = result + t;
        }

        return result;
      }
    }
  }
  async addDataUser() {
    try {
      sessionStorage.setItem("nickname", this.state.nicknameTem);
      let body = {
        userName: userService.getUserName(),
        fieldName: "nickname",
        fieldValue: this.state.nicknameTem,
      };
      const response = await userService.addDataUserAsync(body);
      if (response.data === "OK") {
        this.setState({
          nickname: this.state.nicknameTem,
          viewMessageNick: true,
          textMessage: "profile.optionDetail.messages.nicknameCreated",
          updateNick: true,
        });
      }
    } catch {}
  }
  handleConfirmNickName() {
    if (this.state.nicknameTem !== "") {
      this.setState({ sendForm: true, loadForm: true });
      // ////////console.log(this.state.nicknameTem);
      userService
        .updateNewNickName(this.state.nicknameTem)
        .then((resp) => {
          // ////////console.log(resp);
          this.setState({ loadForm: false });
          if (resp.data.errors === null) {
            if (resp.data.payload === true) {
              this.addDataUser();
            } else {
              this.setState({
                viewMessageNick: true,
                sendForm: false,
                textMessage: "profile.optionDetail.messages.duplicatedNickname",
              });
              setTimeout(() => {
                this.setState({
                  viewMessageNick: false,
                  textMessage: "",
                });
              }, 6000);
            }
          } else {
            this.setState({
              viewMessageNick: true,
              sendForm: false,
              textMessage: "profile.optionDetail.messages.errorServer",
            });
            setTimeout(() => {
              this.setState({
                viewMessageNick: false,
                textMessage: "",
              });
            }, 6000);
          }
        })
        .catch((error) => {
          ////////console.log(error);
        });
    } else {
      this.setState({
        viewMessageNick: true,
        textMessage: "profile.optionDetail.messages.requiredField",
      });
      setTimeout(() => {
        this.setState({
          viewMessageNick: false,
          textMessage: "",
        });
      }, 6000);
    }
  }
  render() {
    let t = this.state.translator;
    let email, phone, message, stepPhone, stepUsuario, images,imagesProfile;
    let cancelButtonModal, buttonModal, messageToken, cancel, nickname;
    if (this.state.viewMessageEmail) {
      message = (
        <Message
          info
          content={t("profile.optionDetail.messages.emailVerification")}
        />
      );
    }
    if (this.state.userData.phone !== undefined) {
      if (this.state.phoneVerified) {
        stepPhone = (
          <Popup
            trigger={
              <div className="content-img-status">
                <Image
                  style={{ width: "100px" }}
                  src={statusGreen}
                  size="tiny"
                />
                <span className="text-status" style={{ color: "#39B54A" }}>
                  {t("profile.optionDetail.stepPhone.phone")}
                </span>
              </div>
            }
            content={t("profile.optionDetail.stepPhone.verified")}
          />
        );
      } else {
        stepPhone = (
          <Popup
            trigger={
              <div className="content-img-status">
                <Image style={{ width: "100px" }} src={statusRed} size="tiny" />
                <span className="text-status" style={{ color: "#C1272D" }}>
                  {t("profile.optionDetail.stepPhone.phone")}
                </span>
              </div>
            }
            content={t("profile.optionDetail.stepPhone.notVerify")}
          />
        );
      }
    } else {
      stepPhone = (
        <Popup
          trigger={
            <div className="content-img-status">
              <Image style={{ width: "100px" }} src={statusRed} size="tiny" />
              <span className="text-status" style={{ color: "#C1272D" }}>
                {t("profile.optionDetail.stepPhone.phone")}
              </span>
            </div>
          }
          content={t("profile.optionDetail.stepPhone.popup")}
        />
      );
    }
    if (this.state.userVerifyC === "UNINITIATED") {
      stepUsuario = (
        <Popup
          trigger={
            <div className="content-img-status">
              <Image style={{ width: "100px" }} src={statusRed} size="tiny" />
              <span className="text-status" style={{ color: "#C1272D" }}>
                {t("profile.optionDetail.stepUser.user")}
              </span>
            </div>
          }
          content={t("profile.optionDetail.stepUser.popup")}
        />
      );
    } else {
      if (this.state.userVerifyC === "OK") {
        stepUsuario = (
          <Popup
            trigger={
              <div className="content-img-status">
                <Image
                  style={{ width: "100px" }}
                  src={statusGreen}
                  size="tiny"
                />
                <span className="text-status" style={{ color: "#39B54A" }}>
                  {t("profile.optionDetail.stepUser.user")}
                </span>
              </div>
            }
            content={t("profile.optionDetail.stage.verified")}
          />
        );
      }
      if (this.state.userVerifyC === "FAIL") {
        stepUsuario = (
          <Popup
            trigger={
              <div className="content-img-status">
                <Image style={{ width: "100px" }} src={statusRed} size="tiny" />
                <span className="text-status" style={{ color: "#C1272D" }}>
                  {t("profile.optionDetail.stepUser.user")}
                </span>
              </div>
            }
            content={t("profile.optionDetail.stage.fail")}
          />
        );
      }
      if (this.state.userVerifyC === "PROCESSING") {
        // Sin color
        stepUsuario = (
          <Popup
            trigger={
              <div className="content-img-status">
                <Image style={{ width: "100px" }} src={statusRed} size="tiny" />
                <span className="text-status" style={{ color: "#C1272D" }}>
                  {t("profile.optionDetail.stepUser.user")}
                </span>
              </div>
            }
            content={t("profile.optionDetail.stage.processing")}
          />
        );
      }
    }
    if (this.state.resultUpdate === null) {
      buttonModal = (
        <Button
          color="blue"
          type="submit"
          disabled={this.state.sendForm}
          onClick={this.handleConfirmCodePhone.bind(this)}
        >
          {t("profile.optionDetail.stepPhone.verify")}
        </Button>
      );
      cancelButtonModal = (
        <Button
          disabled={this.state.sendForm}
          onClick={this.closeModalOption.bind(this)}
        >
          {t("profile.optionDetail.stepPhone.buttonCancel")}
        </Button>
      );
    }
    if (this.state.viewMessage) {
      messageToken = (
        <Message info floating content={t(this.state.textMessage)} />
      );
      cancel = (
        <Button onClick={this.closeModalOption.bind(this)}>
          {t("profile.optionDetail.messages.close")}
        </Button>
      );
    }
    if (this.state.viewMessageNick) {
      messageToken = (
        <Message info floating content={t(this.state.textMessage)} />
      );
    }
    if (this.state.userImage.length > 0) {
      images = this.state.userImage.map((element, id) => {
        if (element.isPdf) {
          return (
            <List.Item
              key={id}
              onClick={() => window.open(element.src, "_blank")}
            >
              <Document file={element.src} externalLinkTarget="_blank">
                <Page pageNumber={1} width={150} height={300} />
              </Document>
            </List.Item>
          );
        } else {
          return (
            <Modal
              key={id}
              trigger={
                <List.Item>
                  <Image
                    src={element.src}
                    size="small"
                    as="a"
                    style={{ maxHeight: "300px" }}
                  />
                </List.Item>
              }
            >
              <Modal.Header>{t(element.message)}</Modal.Header>
              <Modal.Content>
                <Image centered src={element.src} size="medium" />
              </Modal.Content>
            </Modal>
          );
        }
      });
    }
    if (this.state.userImageProfile!=="" && this.state.userImageProfile!==undefined && this.state.userImageProfile!==null) {
      imagesProfile = (
            <Modal
              trigger={
                <List.Item>
                  <Image
                    src={this.state.userImageProfile}
                    size="small"
                    as="a"
                    style={{ maxHeight: "300px" }}
                  />
                </List.Item>
              }
            >
              <Modal.Header>{t("profile.optionDetail.fields.profilePicture")}</Modal.Header>
              <Modal.Content>
                <Image centered src={this.state.userImageProfile} size="small" />
              </Modal.Content>
            </Modal>
          );
    }

    return (
      <div style={{ marginTop: "-12px" }}>
        <Dimmer.Dimmable dimmed={!this.state.show}>
          <Dimmer active={!this.state.show} inverted>
            <Loader>{t("profile.optionDetail.loading")}</Loader>
          </Dimmer>
          {this.state.errorInRed && (
            <Segment>
              <Header textAlign="center">
                {t("profile.optionDetail.messages.yourData")}
              </Header>
              <Message
                info
                content={t("profile.optionDetail.messages.errorInRed")}
              />
            </Segment>
          )}
          {!this.state.errorInRed && (
            <Segment>
              {!isMobile && (
                <Header className="titleComponent" textAlign="center">
                  {t("profile.optionDetail.messages.yourData")}
                </Header>
              )}

              <Grid columns="equal">
                <Grid.Row textAlign="center">
                  <Grid.Column largeScreen={5} computer={5} />
                  <Grid.Column
                    largeScreen={2}
                    computer={2}
                    style={{ marginRight: " -20px", marginLeft: " 20px" }}
                  >
                    <Popup
                      trigger={
                        <div>
                          {!this.state.userVerifyA && (
                            <div className="content-img-status">
                              <Image
                                style={{ width: "100px" }}
                                src={statusRed}
                                size="tiny"
                              />
                              <span
                                className="text-status"
                                style={{ color: "#C1272D" }}
                              >
                                {t("profile.optionDetail.stepEmail.email")}
                              </span>
                            </div>
                          )}

                          {this.state.userVerifyA && (
                            <div className="content-img-status">
                              <Image
                                style={{ width: "100px" }}
                                src={statusGreen}
                                size="tiny"
                              />
                              <span
                                className="text-status"
                                style={{ color: "#39B54A" }}
                              >
                                {t("profile.optionDetail.stepEmail.email")}
                              </span>
                            </div>
                          )}
                        </div>
                      }
                      content={
                        this.state.userVerifyA === false
                          ? t("profile.optionDetail.stepEmail.popup")
                          : t("profile.optionDetail.stepEmail.verified")
                      }
                    />
                  </Grid.Column>
                  <Grid.Column
                    largeScreen={2}
                    computer={2}
                    textAlign="center"
                    style={{ marginRight: " -20px" }}
                  >
                    {stepUsuario}
                  </Grid.Column>

                  <Grid.Column
                    largeScreen={2}
                    computer={2}
                    style={{ marginRight: " -20px" }}
                  >
                    {stepPhone}
                  </Grid.Column>
                  <Grid.Column largeScreen={5} computer={5} />
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column largeScreen={16} computer={16}>
                    {this.state.show && (
                      <Form>
                        <Form.Group widths="equal">
                          <Form.Field>
                            <label>
                              <strong>
                                {t("profile.optionDetail.nickname.value")}{" "}
                                {nickname}
                              </strong>
                              {this.state.nickname === "" && (
                                <Button
                                  size="tiny"
                                  onClick={this.handleNickNameModal.bind(this)}
                                >
                                  {t("profile.optionDetail.nickname.create")}
                                </Button>
                              )}
                            </label>
                            <div />
                            {this.state.nickname !== "" && (
                              <p>{this.state.nickname}</p>
                            )}
                            {(this.state.nickname === undefined || this.state.nickname === "") && <p>{"No Posee"}</p>}
                          </Form.Field>
                          <Form.Field>
                            <label>
                              <strong>
                                {t("profile.optionDetail.fields.name")}
                              </strong>
                            </label>
                            <div />
                            {this.state.userData.firstName !== undefined &&  this.state.userData.firstName !== "" && this.state.userData.firstName !== " " &&(
                              <p>{this.state.userData.firstName}</p>
                            )}
                            {(this.state.userData.firstName === undefined || this.state.userData.firstName === "" || this.state.userData.firstName === " ") && (
                              <p>{"No Posee"}</p>
                            )}
                          </Form.Field>
                          <Form.Field>
                            <label>
                              <strong>
                                {t("profile.optionDetail.fields.lastName")}
                              </strong>
                            </label>
                            <div />
                            {this.state.userData.lastName !== undefined && this.state.userData.lastName !== "" && this.state.userData.lastName !== " " &&(
                              <p>{this.state.userData.lastName}</p>
                            )}
                            {(this.state.userData.lastName === undefined || this.state.userData.lastName === "" || this.state.userData.lastName === " ") && (
                              <p>{"No Posee"}</p>
                            )}
                          </Form.Field>
                          <Form.Field>
                            <label>
                              <strong>
                                {t("profile.optionDetail.fields.email")} {email}
                              </strong>
                              {!this.state.userVerifyA &&
                                this.state.email !== "" && (
                                  <Button
                                    size="tiny"
                                    onClick={this.emailVerify.bind(this)}
                                  >
                                    {t(
                                      "profile.optionDetail.stepEmail.buttonVerify"
                                    )}
                                  </Button>
                                )}
                            </label>
                            <div />
                            <p>{this.state.email}</p>
                            {this.state.email === "" && <p>{"No Posee"}</p>}
                          </Form.Field>
                        </Form.Group>
                        <Form.Group widths="equal">
                          <Form.Field>
                            <label>
                              <strong>
                                {t("profile.optionDetail.fields.phone")} {phone}
                              </strong>
                              {!this.state.phoneVerified && (this.state.userData.phone !== undefined || this.state.userData.phone === "") && (
                                  <Button
                                    size="tiny"
                                    onClick={this.handleVerifyPhone.bind(this)}
                                  >
                                    {t("profile.optionDetail.stepPhone.verify")}
                                  </Button>
                                )}
                            </label>
                            <div />
                            {this.state.userData.phone !== undefined && this.state.userData.phone !== "" && this.state.userData.phone !== " " &&(
                              <p>{this.state.userData.phone}</p>
                            )}
                            {(this.state.userData.phone === undefined || this.state.userData.phone === "" || this.state.userData.phone === " ") && (
                              <p>{"No Posee"}</p>
                            )}
                          </Form.Field>
                          <Form.Field>
                            <label>
                              <strong>
                                {t("profile.optionDetail.fields.id")}
                              </strong>
                            </label>
                            <div />
                            {this.state.userData.typeDocumentIdentity !==
                              undefined && this.state.userData.typeDocumentIdentity !== "" && this.state.userData.typeDocumentIdentity !== " " &&(
                              <p>
                                {t(
                                  this.getTypeIdentityValue(
                                    this.state.userData.typeDocumentIdentity
                                  )
                                )}
                              </p>
                            )}
                            {(this.state.userData.typeDocumentIdentity === undefined || this.state.userData.typeDocumentIdentity === "" || this.state.userData.typeDocumentIdentity === " ") && <p>{"No Posee"}</p>}
                          </Form.Field>
                          <Form.Field>
                            <label>
                              <strong>
                                {t("profile.optionDetail.fields.number")}
                              </strong>
                            </label>
                            <div />
                            {this.state.userData.numberDocumentIdentity !==
                              undefined && this.state.userData.numberDocumentIdentity !== "" && this.state.userData.numberDocumentIdentity !== " " &&(
                              <p>
                                {this.state.userData.numberDocumentIdentity}
                              </p>
                            )}
                            {(this.state.userData.numberDocumentIdentity === undefined || this.state.userData.numberDocumentIdentity === "" || this.state.userData.numberDocumentIdentity === " ") && <p>{"No Posee"}</p>}
                          </Form.Field>
                          <Form.Field>
                            <label>
                              <strong>
                                {t("profile.optionDetail.fields.sex")}
                              </strong>
                            </label>
                            <div />
                            {this.state.userData.gender !== undefined && this.state.userData.gender !== "" && this.state.userData.gender !== " "&&(
                              <p>
                                {t(
                                  this.getSexValue(this.state.userData.gender)
                                )}
                              </p>
                            )}
                            {(this.state.userData.gender === undefined || this.state.userData.gender === "" || this.state.userData.gender === " ") && (
                              <p>{"No Posee"}</p>
                            )}
                          </Form.Field>
                        </Form.Group>
                        <Form.Group widths="equal">
                          <Form.Field width={4}>
                            <label>
                              <strong>
                                {t("profile.optionDetail.fields.birthday")}
                              </strong>
                            </label>
                            <div />
                            {this.state.userData.birthdate !== undefined && this.state.userData.birthdate !== "" && this.state.userData.birthdate !== " " && (
                              <p>
                                {this.state.userData.birthdate.split("T")[0]}
                              </p>
                            )}
                            {(this.state.userData.birthdate === undefined || this.state.userData.birthdate === "" || this.state.userData.birthdate === " ") && (
                              <p>{"No Posee"}</p>
                            )}
                          </Form.Field>
                           <Form.Field width={4}>
                            <label>
                              <strong>
                                {t("profile.optionDetail.fields.countryOfBirth")}
                              </strong>
                            </label>
                            <div />
                            {this.state.userData.countryOfBirth !== undefined && this.state.userData.countryOfBirth !== "" && this.state.userData.countryOfBirth !== " " && (
                              <p>{this.state.userData.countryOfBirth}</p>
                            )}
                            {(this.state.userData.countryOfBirth === undefined || this.state.userData.countryOfBirth === "" || this.state.userData.countryOfBirth === " ") && (
                              <p>{"No Posee"}</p>
                            )}
                          </Form.Field>
                          {/*<Form.Field>
                            <label>
                              <strong>
                                {t("profile.optionDetail.fields.cityOfBirth")}
                              </strong>
                            </label>
                            <div />
                            {this.state.userData.cityOfBirth !== undefined && this.state.userData.cityOfBirth !== "" && this.state.userData.cityOfBirth !== " " && (
                              <p>{this.state.userData.cityOfBirth}</p>
                            )}
                            {(this.state.userData.cityOfBirth === undefined || this.state.userData.cityOfBirth === "" || this.state.userData.cityOfBirth === " ") && (
                              <p>{"No Posee"}</p>
                            )}
                            </Form.Field>*/}
                          <Form.Field width={4}>
                            <label>
                              <strong>
                                {t("profile.optionDetail.fields.birthplace")}
                              </strong>
                            </label>
                            <div />
                            {this.state.userData.birthplace !== undefined && this.state.userData.birthplace !== "" && this.state.userData.birthplace !== " " && (
                              <p>{this.state.userData.birthplace}</p>
                            )}
                            {(this.state.userData.birthplace === undefined || this.state.userData.birthplace === "" || this.state.userData.birthplace === " ") && (
                              <p>{"No Posee"}</p>
                            )}
                          </Form.Field>
                            <Form.Field width={4}>
                            <label>
                              {this.state.juridic && (
                                <strong
                                  style={isMobile ? { color: "#207ef2" } : {}}
                                >
                                  {t(
                                    "profile.optionDetail.fields.companyAddress"
                                  )}
                                </strong>
                              )}
                              {!this.state.juridic && (
                                <strong
                                  style={isMobile ? { color: "#207ef2" } : {}}
                                >
                                  {t("profile.optionDetail.fields.address")}
                                </strong>
                              )}
                            </label>
                            <div />
                            {(this.state.userData.userDirection !==
                              undefined && this.state.userData.userDirection !== "" && this.state.userData.userDirection !== " ") && (
                              <p>{this.state.userData.userDirection}</p>
                            )}
                            {(this.state.userData.userDirection === undefined || this.state.userData.userDirection === "" || this.state.userData.userDirection === " ")&& <p>{"No Posee"}</p>}
                          </Form.Field>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Field>
                            <label>
                              <strong
                                style={isMobile ? { color: "#207ef2" } : {}}
                              >
                                {t("profile.optionDetail.fields.familyContact")}
                              </strong>
                            </label>
                            <div />
                            {this.state.userData.familyName !== undefined && this.state.userData.familyName !== "" && this.state.userData.familyName !== " " &&(
                              <p style={isMobile ? { color: "#207ef2" } : {}}>
                                {this.state.userData.familyName}
                              </p>
                            )}
                            {(this.state.userData.familyName === undefined || this.state.userData.familyName === "" || this.state.userData.familyName === " ")&& (
                              <p>{"No Posee"}</p>
                            )}
                          </Form.Field>
                          <Form.Field>
                            <label>
                              <strong
                                style={isMobile ? { color: "#207ef2" } : {}}
                              >
                                {t("profile.optionDetail.fields.emailContact")}
                              </strong>
                            </label>
                            <div />
                            {this.state.userData.familyEmail !== undefined &&  this.state.userData.familyEmail !== "" && this.state.userData.familyEmail !== " " &&(
                              <p style={isMobile ? { color: "#207ef2" } : {}}>
                                {this.state.userData.familyEmail}
                              </p>
                            )}
                            {(this.state.userData.familyEmail === undefined || this.state.userData.familyEmail === "" || this.state.userData.familyEmail === " ") && (
                              <p>{"No Posee"}</p>
                            )}
                          </Form.Field>
                          <Form.Field>
                            <label>
                              <strong
                                style={isMobile ? { color: "#207ef2" } : {}}
                              >
                                {t(
                                  "profile.optionDetail.fields.securityQuestion"
                                )}
                              </strong>
                            </label>
                            <div />
                            {this.state.userData.questionSecurity !==
                              undefined && this.state.userData.questionSecurity !== "" && this.state.userData.questionSecurity !== " " && (
                              <p style={isMobile ? { color: "#207ef2" } : {}}>
                                {this.formatDataVisualUser(
                                  this.state.userData.questionSecurity
                                )}
                              </p>
                            )}
                            {(this.state.userData.questionSecurity === undefined || this.state.userData.questionSecurity === "" || this.state.userData.questionSecurity === " ") && <p>{"No Posee"}</p>}
                          </Form.Field>
                          <Form.Field>
                            <label>
                              <strong
                                style={isMobile ? { color: "#207ef2" } : {}}
                              >
                                {t(
                                  "profile.optionDetail.fields.securityAnswer"
                                )}
                              </strong>
                            </label>
                            {this.state.userData.answerSecurity !==
                              undefined && this.state.userData.answerSecurity !== "" && this.state.userData.answerSecurity !== " " &&(
                              <p style={isMobile ? { color: "#207ef2" } : {}}>
                                {this.formatDataVisualUser(
                                  this.state.userData.answerSecurity
                                )}
                              </p>
                            )}
                            {(this.state.userData.answerSecurity === undefined || this.state.userData.answerSecurity === "" || this.state.userData.answerSecurity === " ")&& <p>{"No Posee"}</p>}
                          </Form.Field>
                          
                        </Form.Group>
                        <Form.Group>
                           <Form.Field width={4}>
                            <label>
                              <strong
                                style={isMobile ? { color: "#207ef2" } : {}}
                              >
                                {t(
                                  "profile.optionDetail.fields.professionalProfile"
                                )}
                              </strong>
                            </label>
                            <div />
                            {this.state.userData.descriptionProfile !==
                              undefined && this.state.userData.descriptionProfile !== "" && this.state.userData.descriptionProfile !== " " && (
                              <p style={isMobile ? { color: "#207ef2" } : {}}>
                                {this.state.userData.descriptionProfile}
                              </p>
                            )}
                            {(this.state.userData.descriptionProfile === undefined || this.state.userData.descriptionProfile === "" || this.state.userData.descriptionProfile === " ")&& <p>{"No Posee"}</p>}
                          </Form.Field>
                          <Form.Field width={4}>
                            <label>
                              <strong
                                style={isMobile ? { color: "#207ef2" } : {}}
                              >
                                {t(
                                  "profile.optionDetail.fields.webPage"
                                )}
                              </strong>
                            </label>
                            <div />
                            {this.state.userData.web !==
                              undefined && this.state.userData.web !== "" && this.state.userData.web !== " " && (
                              <p style={isMobile ? { color: "#207ef2" } : {}}>
                                {this.state.userData.web}
                              </p>
                            )}
                            {(this.state.userData.web === undefined || this.state.userData.web === "" || this.state.userData.web === " ")&& <p>{"No Posee"}</p>}
                          </Form.Field>
                          <Form.Field width={4}>
                            <label>
                              <strong
                                style={isMobile ? { color: "#207ef2" } : {}}
                              >
                                {t(
                                  "profile.optionDetail.fields.instagram"
                                )}
                              </strong>
                            </label>
                            <div />
                            {this.state.userData.instagram !==
                              undefined && this.state.userData.instagram !== "" && this.state.userData.instagram !== " " && (
                              <p style={isMobile ? { color: "#207ef2" } : {}}>
                                {this.state.userData.instagram}
                              </p>
                            )}
                            {(this.state.userData.instagram === undefined || this.state.userData.instagram === "" || this.state.userData.instagram === " ")&& <p>{"No Posee"}</p>}
                          </Form.Field>
                        </Form.Group>
                           <Form.Field width={4}>
                                      <label>
                                        <strong
                                          style={isMobile ? { color: "#207ef2" } : {}}
                                        >
                                          {t(
                                            "profile.optionDetail.fields.profilePicture"
                                          )}
                                        </strong>
                                      </label>
                                      <div /> 
                                      {(this.state.userImageProfile === "")&& <p><Icon name='user circle'
                            size="huge"
                            style={{ color: '#055990', marginTop: '-6px' }}></Icon></p>}
                    {this.state.userImageProfile !== "" && this.state.userImageProfile !== undefined  &&(
                            <Grid.Row centered style={{ paddingTop: "0px" }}>
                              <Grid.Column
                                largeScreen={16}
                                computer={16}
                                mobile={16}
                                tablet={16}
                              >
                                    {imagesProfile}
                                    {/* {this.state.imageProfile} */}
                              </Grid.Column>
                            </Grid.Row>
                          )}
                          {/* {(this.state.imageProfile === undefined || this.state.imageProfile === "" || this.state.imageProfile === " ")&& <p>{"No Posee"}</p>} */}
                            </Form.Field>
                        
                        <Form.Group>
                          
                        </Form.Group>
                        {this.state.juridic && (
                          <Form.Group widths="equal">
                            <Form.Field>
                              <label>
                                <strong
                                  style={isMobile ? { color: "#207ef2" } : {}}
                                >
                                  {t("profile.optionDetail.fields.companyName")}
                                </strong>
                              </label>
                              <div />
                              {this.state.userData.companyName !==
                                undefined && this.state.userData.companyName !== "" && this.state.userData.companyName !== " " && (
                                <p style={isMobile ? { color: "#207ef2" } : {}}>
                                  {this.state.userData.companyName}
                                </p>
                              )}
                              {(this.state.userData.companyName === undefined || this.state.userData.companyName === "" || this.state.userData.companyName === " ")&& (
                                <p>{"No Posee"}</p>
                              )}
                            </Form.Field>
                            <Form.Field>
                              <label>
                                <strong
                                  style={isMobile ? { color: "#207ef2" } : {}}
                                >
                                  {t(
                                    "profile.optionDetail.fields.documentTypeFiscalRecord"
                                  )}
                                </strong>
                              </label>
                              <div />
                              {this.state.userData.companyTypeOfFiscalRecord !==
                                undefined && this.state.userData.companyTypeOfFiscalRecord !== "" && this.state.userData.companyTypeOfFiscalRecord !== " " && (
                                <p style={isMobile ? { color: "#207ef2" } : {}}>
                                  {
                                    this.state.userData
                                      .companyTypeOfFiscalRecord
                                  }
                                </p>
                              )}
                              {(this.state.userData.companyTypeOfFiscalRecord === undefined || this.state.userData.companyTypeOfFiscalRecord === ""|| this.state.userData.companyTypeOfFiscalRecord === " ")&& (
                                <p>{"No Posee"}</p>
                              )}
                            </Form.Field>
                            <Form.Field>
                              <label>
                                <strong
                                  style={isMobile ? { color: "#207ef2" } : {}}
                                >
                                  {t(
                                    "profile.optionDetail.fields.numberFiscalRecord"
                                  )}
                                </strong>
                              </label>
                              <div />
                              {this.state.userData
                                .companyNumberOfFiscalRecord !== undefined && this.state.userData.companyNumberOfFiscalRecord !== "" && this.state.userData.companyNumberOfFiscalRecord !== " " && (
                                <p style={isMobile ? { color: "#207ef2" } : {}}>
                                  {
                                    this.state.userData
                                      .companyNumberOfFiscalRecord
                                  }
                                </p>
                              )}
                              {(this.state.userData.companyNumberOfFiscalRecord === undefined || this.state.userData.companyNumberOfFiscalRecord === "" || this.state.userData.companyNumberOfFiscalRecord === " ")&& (
                                <p>{"No Posee"}</p>
                              )}
                            </Form.Field>
                            <Form.Field>
                              <label>
                                <strong
                                  style={isMobile ? { color: "#207ef2" } : {}}
                                >
                                  {t(
                                    "profile.optionDetail.fields.registrationYear"
                                  )}
                                </strong>
                              </label>
                              <div />
                              {this.state.userData.companyYearRegistration !==
                                undefined && this.state.userData.companyYearRegistration !== "" && this.state.userData.companyYearRegistration !== " " &&(
                                <p style={isMobile ? { color: "#207ef2" } : {}}>
                                  {this.state.userData.companyYearRegistration}
                                </p>
                              )}
                              {(this.state.userData.companyYearRegistration === undefined || this.state.userData.companyYearRegistration === "" || this.state.userData.companyYearRegistration === " ")&& (
                                <p>{"No Posee"}</p>
                              )}
                            </Form.Field>
                          </Form.Group>
                        )}
                      </Form>
                    )}
                    {message}
                  </Grid.Column>
                </Grid.Row>
                {this.state.userImage.length > 0 && (
                  <Grid.Row centered style={{ paddingTop: "0px" }}>
                    <Grid.Column
                      largeScreen={16}
                      computer={16}
                      mobile={16}
                      tablet={16}
                    >
                      <Header as="h5" textAlign="center">
                        {t("profile.optionDetail.fields.documents")}
                        <Divider hidden />
                        <List
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                          }}
                          horizontal
                        >
                          {images}
                        </List>
                      </Header>
                    </Grid.Column>
                  </Grid.Row>
                )}
              </Grid>
              <Segment textAlign="center" basic>
                <Button
                  color="blue"
                  size="medium"
                  onClick={this.handleEditProfile.bind(this)}
                >
                  <span>{t("profile.optionDetail.buttonUpdate")}</span>
                </Button>
              </Segment>
            </Segment>
          )}
        </Dimmer.Dimmable>
        <Modal open={this.state.modalOpen} size="small">
          <Header
            icon="exclamation circle"
            content={t("profile.optionDetail.modalVerification.header")}
          />

          <Modal.Content>
            <Modal.Description>
              <Form loading={this.state.loadForm} error>
                <Segment basic>
                  <p style={{ fontSize: 14 }}>{t(this.state.modalMessage)}</p>
                  <Form.Field hidden={this.state.resultUpdate2}>
                    <label>
                      {t("profile.optionDetail.modalVerification.labelCode")}
                    </label>
                    <input
                      type="text"
                      value={this.state.codeVerify}
                      onChange={this.handleCodeVerify.bind(this)}
                    />
                  </Form.Field>
                  {messageToken}
                </Segment>
              </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            {cancelButtonModal}
            {buttonModal}
            {cancel}
          </Modal.Actions>
        </Modal>
        <Modal open={this.state.showModalNick} size="small">
          <Header
            icon="exclamation circle"
            content={t("profile.optionDetail.modalNickname.header")}
          />
          <Modal.Content>
            <Modal.Description>
              <Form loading={this.state.loadForm} error>
                <Segment basic>
                  <h3>{t("profile.optionDetail.modalNickname.subHeader")}</h3>

                  <Form.Field>
                    <label>
                      {t("profile.optionDetail.modalNickname.labelNickname")}
                    </label>
                    <input
                      type="text"
                      value={this.state.nicknameTem}
                      onChange={this.handleNickName.bind(this)}
                    />
                  </Form.Field>
                  {messageToken}
                </Segment>
              </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            {!this.state.updateNick && (
              <Button
                color="grey"
                disabled={this.state.sendForm}
                onClick={this.closeModalOptionNick.bind(this)}
              >
                {t("profile.optionDetail.modalNickname.buttonClose")}
              </Button>
            )}
            {!this.state.updateNick && (
              <Button
                color="blue"
                type="submit"
                disabled={this.state.sendForm}
                onClick={this.handleConfirmNickName.bind(this)}
              >
                {t("profile.optionDetail.modalNickname.buttonSave")}
              </Button>
            )}
            {this.state.updateNick && (
              <Button onClick={this.closeModalOptionNick.bind(this)}>
                {t("profile.optionDetail.modalNickname.buttonClose")}
              </Button>
            )}
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
export default translate(OptionDetail);
