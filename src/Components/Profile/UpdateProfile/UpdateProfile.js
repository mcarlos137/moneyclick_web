import React, { Component } from "react";
import {
  Segment,
  Header,
  Message,
  Form,
  Button,
  Grid,
  Divider,
  Modal,
  Dropdown,
  Icon
} from "semantic-ui-react";
import "./UpdateProfile.css";
import attachments from "../../../services/attachments";
import userService from "../../../services/user";
import prefits from "../../../common/prefits";
import config from "../../../services/config";
import Files from "react-files";
import FormData from "form-data";
import self from "../../../img/verifyiconId.png";
import bank from "../../../img/verifyicon2.png";
import location from "../../../img/verifyicon3.png";
import id from "../../../img/verifyicon1.png";
import translate from "../../../i18n/translate";
import Resizer from "react-image-file-resizer";
class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this._Mounted = false;
    this.profileRef = React.createRef();
    this.dniRef = React.createRef();
    this.bankRef = React.createRef();
    this.locationRef = React.createRef();
    this.selfRef = React.createRef();
    this.newresice = this.newresice.bind(this);
    this.state = {
      idImg: id,
      addFileDni: true,
      idImgProfile: "",
      addFileProfile: true,
      existProfile:false,
      bankImg: bank,
      addFileBank: true,
      addFileLocation: true,
      selffImg: self,
      addFileSelf: true,
      idFile: {},
      profileFile: {},
      bankFile: {},
      errorNetwork: false,
      locationFile: {},
      selfFile: {},
      errorFileDni: false,
      errorFileProfile: false,
      errorFileBank: false,
      errorFileLocation: false,
      errorFileSelf: false,
      prefit: [],
      firstName: "",
      lastName: "",
      partialPhone: "",
      partialNumber: "",
      birtdate: "",
      birtdateCountry: "",
      //cityOfBirth: "",
      countryOfBirth: "",
      sex: "",
      typeDocument: "",
      otherDocument: "",
      numberDocumentId: "",
      direction: "",
      question: "",
      request: "",
      nameFamily: "",
      emailFamily: "",
      userLocalBitcoin: "",
      userFacebook: "",
      professionalProfile: "",
      webPage: "", 
      instagram: "",
      profilePicture:"",
      companyName: "",
      companyNumberOfFiscalRecord: "",
      locationLegalRegistry: "",
      numberLocationLegalRegistry: "",
      yearRegistry: "",
      formLoad: false,
      viewMessage: false,
      textMessage: "",
      resultUpdate: null,
      viewButton: true,
      selectOther: false,
      hiddenWarning: false,
      twoFactor:
        window.sessionStorage.getItem("twoFactor") === "true" ? true : false,
      email:
        userService.getUserEmail() === "null" ? "" : userService.getUserEmail(),
      username: userService.getUserName(),
      sexList: [
        {
          key: "m",
          value: "male",
          text: props.translate("profile.updateProfile.sexList.male"),
        },
        {
          key: "f",
          value: "female",
          text: props.translate("profile.updateProfile.sexList.female"),
        },
      ],
      documentType: [
        {
          key: "i",
          value: "id",
          text: props.translate("profile.updateProfile.documentType.id"),
        },
        {
          key: "dn",
          value: "dni",
          text: props.translate("profile.updateProfile.documentType.dni"),
        },
        {
          key: "cd",
          value: "cedula",
          text: props.translate(
            "profile.updateProfile.documentType.identificationCard"
          ),
        },
        {
          key: "pass",
          value: "passport",
          text: props.translate("profile.updateProfile.documentType.passport"),
        },
        {
          key: "ot",
          value: "other",
          text: props.translate("profile.updateProfile.documentType.other"),
        },
      ],
      open: false,
      endsend: false,
      userData: {},
      userVerifyC: "",
      juridic: false,
      translator: props.translate,
      searchQuery: null,
      actualPhone: "",
      dataNotSet: [],
      statusIdentityVerificationMc: false,
      statusSelfieIdentityVerificationMc: false,
      fieldsSaved: "",
      fieldsToVerify: [],
      emailAdded: false,
      verify: false,
    };
    // this.resize = this.resize.bind(this);
    this.resizeImageData = this.resizeImageData.bind(this);
    this.onLoadFileSend = this.onLoadFileSend.bind(this);
    this.sendFiles = this.sendFiles.bind(this);
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.language !== nextProps.language) {
      this.setState(
        {
          translator: nextProps.translate,
        },
        () => {
          this.setState({
            documentType: [
              {
                key: "i",
                value: "id",
                text: nextProps.translate(
                  "profile.updateProfile.documentType.id"
                ),
              },
              {
                key: "dn",
                value: "dni",
                text: nextProps.translate(
                  "profile.updateProfile.documentType.dni"
                ),
              },
              {
                key: "cd",
                value: "cedula",
                text: nextProps.translate(
                  "profile.updateProfile.documentType.identificationCard"
                ),
              },
              {
                key: "pass",
                value: "passport",
                text: nextProps.translate(
                  "profile.updateProfile.documentType.passport"
                ),
              },
              {
                key: "ot",
                value: "other",
                text: nextProps.translate(
                  "profile.updateProfile.documentType.other"
                ),
              },
            ],
            sexList: [
              {
                key: "m",
                value: "male",
                text: nextProps.translate("profile.updateProfile.sexList.male"),
              },
              {
                key: "f",
                value: "female",
                text: nextProps.translate(
                  "profile.updateProfile.sexList.female"
                ),
              },
            ],
          });
        }
      );
    }
  }
  componentDidMount() {
    this.setState({
      prefit: prefits.country,
      firstName: window.sessionStorage.getItem("firstName"),
      lastName: window.sessionStorage.getItem("lastName"),
      partialPhone: window.sessionStorage.getItem("countryCode"),
      partialNumber: window.sessionStorage.getItem("phone"),
      actualPhone:
        window.sessionStorage.getItem("countryCode") +
        window.sessionStorage.getItem("phone"),
    });
    let username = userService.getUserName();
    let data = userService.getConfigUserGeneral(username);

    data.then((resp) => {
      let userData = userService.getActualUserInfo(resp.data.result);
      console.log("UserData",resp.data.result)
      this.setDataUser(resp.data.result);
      this.setState(
        { existProfile:
            resp.data.result.profileImage === undefined
              ? false
              : resp.data.result.profileImage === ""
              ? false
              : resp.data.result.profileImage === null
              ? false
              : true,
          existId:
            resp.data.result.identityURL === undefined
              ? false
              : resp.data.result.identityURL === ""
              ? false
              : resp.data.result.identityURL === null
              ? false
              : true,
          existBank:
            resp.data.result.bankURL === undefined
              ? false
              : resp.data.result.bankURL === ""
              ? false
              : resp.data.result.bankURL === null
              ? false
              : true,
          existSelf:
            resp.data.result.selfURL === undefined
              ? false
              : resp.data.result.selfURL === ""
              ? false
              : resp.data.result.selfURL === null
              ? false
              : true,
          existLocation:
            resp.data.result.locationURL === undefined
              ? false
              : resp.data.result.locationURL === ""
              ? false
              : resp.data.result.locationURL === null
              ? false
              : true,
          existEmail: resp.data.result.email === undefined ? false : true,
        },
        () => console.log(this.state.existId)
      );
         this.loadImageUser(resp.data.result);
    
      //this.loadFieldsVerification(resp);
      if (userData.typeDocumentIdentity !== undefined) {
        let document = this.state.documentType.find(function (element) {
          //  //console.log(element.value);
          return element.value === userData.typeDocumentIdentity;
        });
        if (document === undefined) {
          this.setState({ typeDocument: "other" });
        } else {
          this.setState({ typeDocument: userData.typeDocumentIdentity });
        }
      } else {
        this.setState({ typeDocument: "" });
      }
      this.setState(
        {
          juridic:
            resp.data.result.company !== undefined &&
            resp.data.result.company === "true"
              ? true
              : false,
          userData: resp.data.result,
          firstName: userData.firstName !== undefined ? userData.firstName : "",
          lastName: userData.lastName !== undefined ? userData.lastName : "",
          question:
            userData.questionSecurity !== undefined
              ? userData.questionSecurity
              : "",
          request:
            userData.answerSecurity !== undefined
              ? userData.answerSecurity
              : "",
          birtdate:
            userData.birthdate !== undefined
              ? userData.birthdate.split("T")[0]
              : "",
          birtdateCountry:
            userData.birthplace !== undefined ? userData.birthplace : "",
          countryOfBirth:
            userData.countryOfBirth !== undefined ? userData.countryOfBirth : "",
          /*cityOfBirth:
            userData.cityOfBirth !== undefined ? userData.cityOfBirth : "",*/
          
          sex: userData.gender !== undefined ? userData.gender : "",

          numberDocumentId:
            userData.numberDocumentIdentity !== undefined
              ? userData.numberDocumentIdentity
              : "",
          direction:
            userData.userDirection !== undefined ? userData.userDirection : "",
          nameFamily:
            userData.familyName !== undefined ? userData.familyName : "",
          emailFamily:
            userData.familyEmail !== undefined ? userData.familyEmail : "",
          userLocalBitcoin:
            userData.userLocalBitcoin !== undefined
              ? userData.userLocalBitcoin
              : "",
          userFacebook:
            userData.userFacebook !== undefined ? userData.userFacebook : "",
          professionalProfile:
            userData.descriptionProfile !== undefined ? userData.descriptionProfile : "",
          webPage:
            userData.web !== undefined ? userData.web : "",
          instagram:
            userData.instagram !== undefined ? userData.instagram : "",
          companyName:
            resp.data.result.companyName !== undefined
              ? resp.data.result.companyName
              : "",
          numberLocationLegalRegistry:
            resp.data.result.companyNumberOfFiscalRecord !== undefined
              ? resp.data.result.companyNumberOfFiscalRecord
              : "",
          locationLegalRegistry:
            resp.data.result.companyTypeOfFiscalRecord !== undefined
              ? resp.data.result.companyTypeOfFiscalRecord
              : "",
          yearRegistry:
            resp.data.result.companyYearRegistration !== undefined
              ? resp.data.result.companyYearRegistration
              : "",
        },
        () => {
          this.setState({
            locationImg: this.state.juridic ? id : location,
          });
          this._Mounted = true;
        }
      );

      if (resp.data.result.verification === undefined) {
        this.setState({
          userVerifyC: "UNINITIATED",
          userVerifyE: "UNINITIATED",
          show: true,
        });
      } else {
        if (resp.data.result.verification.E === undefined) {
          this.setState({ userVerifyE: "UNINITIATED", show: true });
        } else {
          this.setState({
            userVerifyE: resp.data.result.verification.E.userVerificationStatus,
            show: true,
          });
        }
        if (resp.data.result.verification.A === undefined) {
          this.setState({ userVerifyA: "UNINITIATED" });
        } else {
          this.setState({
            userVerifyA: resp.data.result.verification.A.userVerificationStatus,
          });
        }
        if (resp.data.result.verification.C === undefined) {
          this.setState({ userVerifyC: "UNINITIATED" });
        } else {
          this.setState({
            userVerifyC: resp.data.result.verification.C.userVerificationStatus,
            show: true,
          });
        }
      }
    });
  }
  async loadImageUser(userInfo) {
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
          // userImageProfile: [
          //   ...this.state.userImageProfile,
          //   {
          //     src: image,
          //     name: "profileURL",
          //     isPdf: userInfo.profileURL.includes("profileURL"),
          //     message: "profile.optionDetail.docsImages.identity",
          //     status: true,
          //   },
          // ],
          addFileProfile: false,
          idImgProfile:image,
        });
      } catch (error) {
        //console.log(error);
      }
    }
  }
  setDataUser(data) {
    let dataNotSet = [];
    Object.entries(data).forEach(([key, value]) => {
      dataNotSet.push({ field: key, value: value });
    });
    this.setState({ dataNotSet: dataNotSet });
  }
  async defineDataToAddAndUpdate(data, source) {
      let cont = 0;
      for (let field of data) {
        let findfield = this.state.dataNotSet.find((data) => {
          return field.field === data.field;
        });
        let body = {
          userName: field.email,
          fieldName: field.field,
          fieldValue: field.data,
        };
        cont++;
        if (findfield === undefined) {
          await this.addDataUserAsync(body);
        } else {
          await this.updateDataUser(body);
        }
      }

      if (source === "update") {
        if (cont === data.length) {
          await this.onLoadFileSend(source);
          this.setState({
            formLoad: false,
            viewMessage: true,
            viewButton: false,
            endsend: true,
            textMessage: "profile.updateProfile.successUpdate",
            firstName: window.sessionStorage.getItem("firstName"),
            lastName: window.sessionStorage.getItem("lastName"),
            twoFactor:
              window.sessionStorage.getItem("twoFactor") === "true"
                ? true
                : false,
          });
          setTimeout(() => {
            // this.closeModalEnd();
            window.location.href = "/profile";
          }, 5000);
          // this.resultUpdate();
        }
      } else {
        this.onLoadFileSend(source);
      }
  }
 
  handlefirstName(e) {
    this.setState({ firstName: e.target.value });
  }
  handleEmail(e) {
    this.setState({ email: e.target.value }, () => {
      if (this.state.email !== "") {
        this.setState({ emailAdded: true });
      } else {
        this.setState({ emailAdded: false });
      }
    });
  }
  handleLastName(e) {
    this.setState({ lastName: e.target.value });
  }
  handlePrefit(e, data) {
    this.setState({ partialPhone: data.value });
  }
  handleNumberPhone(e, data) {
    var numeros = "0123456789";
    let valid;
    if (e.target.value !== "") {
      for (let elem in e.target.value) {
        if (numeros.indexOf(e.target.value.charAt(elem), 0) !== -1) {
          valid = true;
        } else {
          valid = false;
        }
      }
      if (valid) {
        this.setState({ partialNumber: e.target.value });
      } else {
        this.setState({
          errorCode: true,
        });
      }
    } else {
      this.setState({ partialNumber: e.target.value });
    }
  }
  handleBirtdate(e, data) {
    this.setState({ birtdate: e.target.value });
  }
  handleBirtdateCountry(e, data) {
    this.setState({ birtdateCountry: e.target.value });
  }

  handleCountryOfBirth(e, data) {
    this.setState({ countryOfBirth: data.value });
  }

   /*handleCityOfBirth(e, data) {
    this.setState({ cityOfBirth: e.target.value });
  }
*/
  
  handleSex(e, data) {
    this.setState({ sex: data.value });
    let da = this.state.sexList.find(function (ele) {
      return ele.value === e.target.value;
    });
    if (da !== undefined) {
    }
  }
  handleTypeDocument(e, data) {
    if (data.value === "other") {
      this.setState({ selectOther: true });
    } else {
      this.setState({ selectOther: false });
    }
    this.setState({
      typeDocument: data.value,
      typeDocumentText: data.value,
    });
    let da = this.state.documentType.find(function (ele) {
      return ele.text === data.value;
    });
    if (da !== undefined) {
    }
  }
  handleOtherTypeDocument(e, data) {
    this.setState({
      otherDocument: e.target.value,
      typeDocument: e.target.value,
    });
  }
  handleNumberDocumentId(e, data) {
    this.setState({ numberDocumentId: e.target.value });
  }
  handleDirection(e, data) {
    this.setState({ direction: e.target.value });
  }
  handleQuestion(e, data) {
    this.setState({ question: e.target.value });
  }
  handleNameFamily(e, data) {
    this.setState({ nameFamily: e.target.value });
  }
  handleEmailFamily(e, data) {
    this.setState({ emailFamily: e.target.value });
  }
  handleUserLocalBitcoin(e, data) {
    this.setState({ userLocalBitcoin: e.target.value });
  }
  handleUserFacebook(e, data) {
    this.setState({ userFacebook: e.target.value });
  }
  handleProfessionalProfile(e, data) {
    this.setState({ professionalProfile: e.target.value });
  }
  handleWebPage(e, data) {
    this.setState({ webPage: e.target.value });
  }
  handleInstagram(e, data) {
    this.setState({ instagram: e.target.value });
  }
  handleRequest(e, data) {
    this.setState({ request: e.target.value });
  }
  handleCancel() {
    this.setState({
      partialPhone: window.sessionStorage.getItem("countryCode"),
      firstName: window.sessionStorage.getItem("firstName"),
      lastName: window.sessionStorage.getItem("lastName"),
      partialNumber: window.sessionStorage.getItem("phone"),
      actualPhone:
        window.sessionStorage.getItem("countryCode") +
        window.sessionStorage.getItem("phone"),
    });

    this.props.changeItem("optionDetail");
  }
  handleTypeRegistryLegaly(e, data) {
    this.setState({ locationLegalRegistry: e.target.value });
  }
  handleNumberRegistryLegaly(e, data) {
    this.setState({ numberLocationLegalRegistry: e.target.value });
  }
  handleCompanyName(e, data) {
    this.setState({ companyName: e.target.value });
  }
  handleYearRegistryCompany(e, data) {
    this.setState({ yearRegistry: e.target.value });
  }
  addedEmailValidate() {
    let validate = false;
    if (this.state.emailAdded) {
      let regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (this.state.email !== "") {
        if (regex.test(this.state.email)) {
          validate = true;
        } else {
          validate = false;
          this.setState({
            formLoad: false,
            viewMessage: true,
            textMessage: "registration.errors.form.email",
          });
          setTimeout(() => {
            this.setState({
              viewMessage: false,
              textMessage: "",
            });
          }, 6000);
        }
      }
    } else {
      validate = true;
    }
    return validate;
  }

  validateImages() {
    console.log('validate images');
   if (this.state.firstName === "") {
     this.setState({
        viewMessage: true,
        textMessage: "recharge.formVerificationIdentity.errors.firstName",
      });
      setTimeout(() => {
        this.setState({
          viewMessage: false,
          textMessage: "",
        });
      }, 5000);
      return false;
    } else if (this.state.lastName === "") {
      this.setState({
       viewMessage: true,
        textMessage: "recharge.formVerificationIdentity.errors.lastName",
      });
      setTimeout(() => {
        this.setState({
         viewMessage: false,
          textMessage: "",
        });
      }, 5000);
      return false;
    } else if (this.state.sex === "") {
      this.setState({
       viewMessage: true,
        textMessage: "recharge.formVerificationIdentity.errors.sex",
      });
      setTimeout(() => {
        this.setState({
         viewMessage: false,
          textMessage: "",
        });
      }, 5000);
      return false;
    } else if (this.state.typeDocument === "") {
      this.setState({
       viewMessage: true,
        textMessage: "recharge.formVerificationIdentity.errors.typeDocument",
      });
      setTimeout(() => {
        this.setState({
         viewMessage: false,
          textMessage: "",
        });
      }, 5000);
      return false;
   }
   else if (this.state.numberDocumentId === "") {
      this.setState({
       viewMessage: true,
        textMessage: "recharge.formVerificationIdentity.errors.numberDocument",
      });
      setTimeout(() => {
        this.setState({
         viewMessage: false,
          textMessage: "",
        });
      }, 5000);
      return false;
    } else if (this.state.birthdate === "") {
      this.setState({
      viewMessage: true,
        textMessage: "recharge.formVerificationIdentity.errors.birthdate",
      });
      setTimeout(() => {
        this.setState({
        viewMessage: false,
          textMessage: "",
        });
      }, 5000);
      return false;
    } else if (this.state.countryOfBirth === "") {
      this.setState({
      viewMessage: true,
        textMessage: "recharge.formVerificationIdentity.errors.countryOfBirth",
      });
      setTimeout(() => {
        this.setState({
         viewMessage: false,
          textMessage: "",
        });
      }, 5000);
      return false;
    }else if (this.state.birtdateCountry === "") {
      this.setState({
      viewMessage: true,
        textMessage: "recharge.formVerificationIdentity.errors.birthplace",
      });
      setTimeout(() => {
        this.setState({
         viewMessage: false,
          textMessage: "",
        });
      }, 5000);
      return false;
    }  else if (this.state.direction === "") {
      this.setState({
       viewMessage: true,
        textMessage: "recharge.formVerificationIdentity.errors.direction",
      });
      setTimeout(() => {
        this.setState({
        viewMessage: false,
          textMessage: "",
        });
      }, 5000);
      return false;
    } else if (
      this.state.typeDocument === "other" &&
      this.state.otherDocument === ""
    ) {
      this.setState({
       viewMessage: true,
        textMessage:
          "recharge.formVerificationIdentity.errors.emptyIDNumberType",
      });
      setTimeout(() => {
        this.setState({
          viewMessage: false,
          textMessage: "",
        });
      }, 5000);
      return false;
    } else if (this.state.numberDocumentId === "") {
      this.setState({
       viewMessage: true,
        textMessage: "recharge.formVerificationIdentity.errors.emptyIDNumber",
      });
      setTimeout(() => {
        this.setState({
          viewMessage: false,
          textMessage: "",
        });
      }, 5000);
      return false;
    } else if (
      this.state.idFile.file === undefined &&
      !this.state.existId
    ) {
      this.setState({
        viewMessage: true,
        errorFileDni: true,
        textMessage: "recharge.formVerificationIdentity.errors.missingFiles",
      });
      setTimeout(() => {
        this.setState({ errorFileDni: false, textMessage: "",viewMessage: false });
      }, 5000);
      return false;
    } else if (
      this.state.bankFile.file === undefined &&
      !this.state.existBank
    ) {
      this.setState({
        viewMessage: true,
        errorFileBank: true,
        textMessage: "recharge.formVerificationIdentity.errors.missingFiles",
      });
      setTimeout(() => {
        this.setState({ errorFileBank: false, textMessage: "",viewMessage: false });
      }, 5000);
      return false;
    } else if (this.state.juridic &&
      this.state.locationFile.file === undefined &&
      !this.state.existLocation
    ) {
      this.setState({
        viewMessage: true,
        errorFileLocation: true,
        textMessage: "recharge.formVerificationIdentity.errors.missingFiles",
      });
      setTimeout(() => {
        this.setState({ errorFileLocation: false, textMessage: "",viewMessage: false });
      }, 5000);
      return false;
    } else if (
      this.state.selfFile.file === undefined &&
      !this.state.existSelf
    ) {
      this.setState({
        viewMessage: true,
        errorFileSelf: true,
        textMessage: "recharge.formVerificationIdentity.errors.missingFiles",
      });
      setTimeout(() => {
        this.setState({ errorFileSelf: false, textMessage: "", viewMessage: false });
      }, 5000);
      return false;
    } else if (
      this.state.juridic &&
      this.state.companyName.toString().trim() === ""
    ) {
       this.setState({
                            endsend: true,
                            formLoad: false,
                            viewMessage: true,
                            textMessage:
                              "profile.updateProfile.errors.emptyFiscalRecordName",
                          });
                          setTimeout(() => {
                            this.setState({
                              viewMessage: false,
                              textMessage: "",
                            });
                          }, 5000);
      return false;
    } else if (
      this.state.juridic &&
      this.state.yearRegistry.toString().trim() === ""
    ) {
   this.setState({
                              endsend: true,
                              formLoad: false,
                              viewMessage: true,
                              textMessage:
                                "profile.updateProfile.errors.emptyFiscalRecordYear",
                            });
                            setTimeout(() => {
                              this.setState({
                                viewMessage: false,
                                textMessage: "",
                              });
                            }, 5000);
      return false;
    } else if (
      this.state.juridic &&
      this.state.locationLegalRegistry.toString().trim() === ""
    ) {
   this.setState({
                                endsend: true,
                                formLoad: false,
                                viewMessage: true,
                                textMessage:
                                  "profile.updateProfile.errors.emptyFiscalRecordType",
                              });
                              setTimeout(() => {
                                this.setState({
                                  viewMessage: false,
                                  textMessage: "",
                                });
                              }, 5000);
      return false;
    } else if (
      this.state.juridic &&
      this.state.numberLocationLegalRegistry.toString().trim() === ""
    ) {
     this.setState({
                                  endsend: true,
                                  formLoad: false,
                                  viewMessage: true,
                                  textMessage:
                                    "profile.updateProfile.errors.emptyFiscalRecord",
                                });
                                setTimeout(() => {
                                  this.setState({
                                    viewMessage: false,
                                    textMessage: "",
                                  });
                                }, 5000);
      return false;
    }
    return true;
  }
  handleUpdateProfileModal(e, data) {
    console.log('handleUpdateProfile modal');
    if (this.state.partialPhone !== "") {
      if (this.state.partialNumber.length >= 7) {
        if (this.state.partialNumber !== "") {
          this.setState({ formLoad: true });
          let emailValidate = this.addedEmailValidate();
          if (emailValidate) {
            var user = {
              email: this.state.email,
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              countryCode: this.state.partialPhone,
              phone: this.state.partialNumber,
              has2FAEnabled: this.state.twoFactor, //this.state.twoFactor
            };
            userService
              .updateProfile(user, userService.getUserName())
              .then(async (resp) => {
                if (resp.data.erros == null && resp.data.payload === true) {
                  let fullPhone =
                    this.state.partialPhone + this.state.partialNumber;
                  if (fullPhone !== this.state.actualPhone) {
                    this.removeVeritication();
                    let body = {
                      userName: userService.getUserName(),
                      fieldName: "phone",
                      fieldValue:
                        this.state.partialPhone + this.state.partialNumber,
                    };
                    await userService.updateUserData(body);
                  }
                  userService.addInfoToUserDollarBtc(
                    this.state.username,
                    "firstName",
                    this.state.firstName
                  );
                  if (this.state.emailAdded) {
                    if (this.state.existEmail === false) {
                      let b = {
                        userName: userService.getUserName(),
                        fieldName: "email",
                        fieldValue: this.state.email,
                      };
                      await userService.addDataUserAsync(b);
                      sessionStorage.setItem("email", this.state.email);
                    } else {
                      let b = {
                        userName: userService.getUserName(),
                        fieldName: "email",
                        fieldValue: this.state.email,
                      };
                      await userService.updateUserData(b);
                      sessionStorage.setItem("email", this.state.email);
                    }
                  }

                  userService.addInfoToUserDollarBtc(
                    this.state.username,
                    "lastName",
                    this.state.lastName
                  );

                  sessionStorage.setItem("firstName", this.state.firstName);
                  sessionStorage.setItem("lastName", this.state.lastName);
                  if (
                    this.state.partialNumber !== sessionStorage.getItem("phone")
                  ) {
                    sessionStorage.setItem("phoneVerified", false);
                  }
                  sessionStorage.setItem("phone", this.state.partialNumber);
                  sessionStorage.setItem(
                    "countryCode",
                    this.state.partialPhone
                  );
                  sessionStorage.setItem("twoFactor", this.state.twoFactor);

                  let array = [
                    {
                      email: userService.getUserName(),
                      field: "firstName",
                      data: this.state.firstName,
                    },
                    {
                      email: userService.getUserName(),
                      field: "lastName",
                      data: this.state.lastName,
                    },
                    {
                      email: userService.getUserName(),
                      field: "phone",
                      data: this.state.partialPhone + this.state.partialNumber,
                    },
                    {
                      email: userService.getUserName(),
                      field: "answerSecurity",
                      data: this.state.request,
                    },
                    {
                      email: userService.getUserName(),
                      field: "questionSecurity",
                      data: this.state.question,
                    },
                    {
                      email: userService.getUserName(),
                      field: "typeDocumentIdentity",
                      data: this.state.typeDocument,
                    },
                    {
                      email: userService.getUserName(),
                      field: "numberDocumentIdentity",
                      data: this.state.numberDocumentId,
                    },
                    {
                      email: userService.getUserName(),
                      field: "gender",
                      data: this.state.sex,
                    },
                    {
                      email: userService.getUserName(),
                      field: "birthdate",
                      data: this.state.birtdate,
                    },{
                      email: userService.getUserName(),
                      field: "countryOfBirth",
                      data: this.state.countryOfBirth,
                    },
                    /* {
                      email: userService.getUserName(),
                      field: "cityOfBirth",
                      data: this.state.cityOfBirth,
                    },*/
                    {
                      email: userService.getUserName(),
                      field: "birthplace",
                      data: this.state.birtdateCountry,
                    },
                    {
                      email: userService.getUserName(),
                      field: "familyName",
                      data: this.state.nameFamily,
                    },
                    {
                      email: userService.getUserName(),
                      field: "familyEmail",
                      data: this.state.emailFamily,
                    },
                    {
                      email: userService.getUserName(),
                      field: "userLocalBitcoin",
                      data: this.state.userLocalBitcoin,
                    },
                    {
                      email: userService.getUserName(),
                      field: "userFacebook",
                      data: this.state.userFacebook,
                    },
                    {
                      email: userService.getUserName(),
                      field: "descriptionProfile",
                      data: this.state.professionalProfile,
                    },
                    {
                      email: userService.getUserName(),
                      field: "web",
                      data: this.state.webPage,
                    },
                    {
                      email: userService.getUserName(),
                      field: "instagram",
                      data: this.state.instagram,
                    },
                    {
                      email: userService.getUserName(),
                      field: "userDirection",
                      data: this.state.direction,
                    },
                  ];
                  if (this.state.juridic === false) {
                    this.defineDataToAddAndUpdate(array, data.name);
                  } else {
                    array.push({
                      email: userService.getUserName(),
                      field: "companyName",
                      data: this.state.companyName,
                    });
                    array.push({
                      email: userService.getUserName(),
                      field: "companyTypeOfFiscalRecord",
                      data: this.state.locationLegalRegistry,
                    });
                    array.push({
                      email: userService.getUserName(),
                      field: "companyNumberOfFiscalRecord",
                      data: this.state.numberLocationLegalRegistry,
                    });
                    array.push({
                      email: userService.getUserName(),
                      field: "companyYearRegistration",
                      data: this.state.yearRegistry,
                    });
                    this.setState({ arrayUserData: array }, () => {
                      this.defineDataToAddAndUpdate(array, data.name);
                    });
                  }
                } else if (resp.data.errors[0].code === 20) {
                  this.setState({ formLoad: false });
                  this.setState({
                    viewMessage: true,
                    textMessage: "profile.updateProfile.errors.repeatedEmail",
                  });
                  setTimeout(() => {
                    this.setState({
                      resultUpdate: null,
                      viewMessage: false,
                      textMessage: "",
                    });
                  }, 8000);
                } else {
                  this.setState({ formLoad: false });
                  this.setState({
                    viewMessage: true,
                    textMessage: "profile.updateProfile.errors.repeatedPhone",
                    endsend: true,
                  });
                  setTimeout(() => {
                    this.setState({
                      resultUpdate: null,
                      viewMessage: false,
                      textMessage: "",
                      endsend: false,
                      open: false,
                    });
                  }, 8000);
                }
              })
              .catch((error) => {
                //console.log(error);
                this.setState({
                  viewMessage: true,
                  textMessage: "profile.updateProfile.errors.errorServer",
                });
                setTimeout(() => {
                  this.setState({
                    resultUpdate: null,
                    viewMessage: false,
                    textMessage: "",
                  });
                }, 5000);
              });
          }
        } else {
          this.setState({
            viewMessage: true,
            textMessage: "profile.updateProfile.errors.emptyPhone",
          });
          setTimeout(() => {
            this.setState({
              resultUpdate: null,
              viewMessage: false,
              textMessage: "",
            });
          }, 5000);
        }
      } else {
        this.setState({
          viewMessage: true,
          textMessage: "profile.updateProfile.errors.longPhone",
        });
        setTimeout(() => {
          this.setState({
            resultUpdate: null,
            viewMessage: false,
            textMessage: "",
          });
        }, 5000);
      }
    } else {
      this.setState({
        viewMessage: true,
        textMessage: "profile.updateProfile.errors.emptyFields",
      });
      setTimeout(() => {
        this.setState({
          resultUpdate: null,
          viewMessage: false,
          textMessage: "",
        });
      }, 5000);
    }
  }

  validateFieldsVerify(array) {
    let valid = true;
    for (let i = 0; i < array.length; i++) {
      Object.entries(this.state.fieldsVerify).forEach(([key, valueField]) => {
        if (array[i].field === key) {
          if (array[i].data === "" && valueField.required) {
            valid = false;
          }
        }
      });
    }
    if (!this.state.statusIdentityVerificationMc) {
      if (this.state.idFile.file !== undefined) {
        valid = true;
      } else {
        valid = false;
      }
    }

    if (!this.state.statusSelfieIdentityVerificationMc) {
      if (this.state.selfFile.file !== undefined) {
        valid = true;
      } else {
        valid = false;
      }
    }
    return valid;
  }
  async addDataUserAsync(body) {
    try {
      let response = await userService.addDataUserAsync(body);
      if (response.data !== "OK") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  async updateDataUser(body) {
    console.log('bodyyy ', body);
    try {
      let response = await userService.updateUserData(body);
      if (response.data !== "OK") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  async addDataUser(objnw, arra, contaaa, source) {
    try {
      let keys = [];

      if (contaaa < arra.length) {
        keys = Object.keys(this.state.userData);
        if (keys.indexOf(objnw.field) === -1) {
          let body = {
            userName: this.state.username,
            fieldName: objnw.field,
            fieldValue: objnw.data,
          };

          let resp = await this.addDataUserAsync(body);
          if (resp) {
            contaaa = contaaa + 1;
            this.addDataUser(arra[contaaa], arra, contaaa, source);
          } else {
            contaaa = contaaa + 1;
            this.addDataUser(arra[contaaa], arra, contaaa, source);
          }
        } else {
          let cont = 0;
          for (let key in this.state.userData) {
            if (objnw.field === key) {
              for (let obj in this.state.userData) {
                if (obj.indexOf("__") === -1) {
                  if (objnw.field === obj) {
                    cont++;
                  }
                } else if (obj.split("__")[0] === objnw.field) {
                  cont++;
                }
              }
              if (cont > 1) {
                let index = cont - 1;
                let campo = objnw.field + "__" + index;
                Object.entries(this.state.userData).forEach(([k, v]) => {
                  if (k === campo) {
                    if (v !== objnw.data) {
                      let newValue = cont;
                      objnw.field = objnw.field + "__" + newValue;
                      let body = {
                        userName: this.state.username,
                        fieldName: objnw.field,
                        fieldValue: objnw.data,
                      };
                      this.addDataUserAsync(body);

                      contaaa = contaaa + 1;
                      this.addDataUser(arra[contaaa], arra, contaaa, source);

                      //   //console.log(error);
                    } else {
                      contaaa = contaaa + 1;
                      this.addDataUser(arra[contaaa], arra, contaaa, source);
                    }
                  }
                });
              } else {
                if (objnw.data !== this.state.userData[key]) {
                  objnw.field = objnw.field + "__" + 1;
                  let body = {
                    userName: this.state.username,
                    fieldName: objnw.field,
                    fieldValue: objnw.data,
                  };
                  // //console.log(body);
                  this.addDataUserAsync(body);
                  contaaa = contaaa + 1;
                  this.addDataUser(arra[contaaa], arra, contaaa, source);
                } else {
                  contaaa = contaaa + 1;
                  this.addDataUser(arra[contaaa], arra, contaaa, source);
                }
              }
            }
          }
        }
      } else {
        if (source === "update") {
          if (
            !this.state.statusIdentityVerificationMc ||
            !this.state.statusSelfieIdentityVerificationMc
          ) {
            this.setState({ verify: false }, () => {
              this.onLoadFileSend();
            });
          } else {
            this.setState({
              formLoad: false,
              viewMessage: true,
              viewButton: false,
              endsend: true,
              textMessage: "profile.updateProfile.successUpdate",
              firstName: window.sessionStorage.getItem("firstName"),
              lastName: window.sessionStorage.getItem("lastName"),
              twoFactor:
                window.sessionStorage.getItem("twoFactor") === "true"
                  ? true
                  : false,
            });
            setTimeout(() => {
             // this.closeModalEnd();
              window.location.href = "/profile";
            }, 5000);
          }
        } else {
          this.setState({ verify: true }, () => {
            if (
              !this.state.statusIdentityVerificationMc ||
              !this.state.statusSelfieIdentityVerificationMc
            ) {
              this.onLoadFileSend();
            } else {
              this.initVerification();
            }
          });
        }
      }
    } catch {}
  }

  resultUpdate() {
    setTimeout(() => {
      this.setState({
        resultUpdate: userService.getUpdateUser(),
        formLoad: false,
        viewMessage: true,
        textMessage: "profile.updateProfile.successUpdate",
        firstName: window.sessionStorage.getItem("firstName"),
        lastName: window.sessionStorage.getItem("lastName"),
        twoFactor:
          window.sessionStorage.getItem("twoFactor") === "true" ? true : false,
      });
      this.closeOption();
    }, 8000);
    setTimeout(() => {
             // this.closeModalEnd();
              window.location.href = "/profile";
            }, 5000);
  }
  async removeVeritication() {
    let body = {
      userName: userService.getUserName(),
      userVerificationType: "B",
    };
    try {
      const response = await userService.removeVerificationProccessToUser(body);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  showModal() {
    if (this.state.juridic === false) {
      console.log('validateImages no');
      let validate = this.addedEmailValidate();
      let validateImages = this.validateImages();
      console.log('1 ', validate, validateImages);
      if (validate && validateImages) {
        this.setState({ open: true });
      }
    } else {
       console.log('validateImages si');
      if (this.state.companyName !== "") {
        if (this.state.yearRegistry !== "") {
          if (this.state.locationLegalRegistry !== "") {
            if (this.state.numberLocationLegalRegistry !== "") {
              let validate = this.addedEmailValidate();
              let validateImages = this.validateImages();
              console.log('validate ',validate,  validateImages);
              if (validate && validateImages) {
                this.setState({ open: true });
              }
            } else {
              this.setState({
                viewMessage: true,
                textMessage: "profile.updateProfile.errors.emptyFiscalRecord",
              });
              setTimeout(() => {
                this.setState({
                  viewMessage: false,
                  textMessage: "",
                });
              }, 5000);
            }
          } else {
            this.setState({
              viewMessage: true,
              textMessage: "profile.updateProfile.errors.emptyFiscalRecordType",
            });
            setTimeout(() => {
              this.setState({
                viewMessage: false,
                textMessage: "",
              });
            }, 5000);
          }
        } else {
          this.setState({
            viewMessage: true,
            textMessage: "profile.updateProfile.errors.emptyFiscalRecordYear",
          });
          setTimeout(() => {
            this.setState({
              viewMessage: false,
              textMessage: "",
            });
          }, 5000);
        }
      } else {
        this.setState({
          viewMessage: true,
          textMessage: "profile.updateProfile.errors.emptyFiscalRecordName",
        });
        setTimeout(() => {
          this.setState({
            viewMessage: false,
            textMessage: "",
          });
        }, 5000);
      }
    }
  }

  closeOption() {
    setTimeout(() => {
      this.setState({
        resultUpdate: null,
        viewMessage: false,
        textMessage: "",
      });
      if (this.props.source === "profile") {
        this.props.changeItem("optionDetail");
      } else {
        this.props.endUpdate(true);
      }
    }, 5000);
  }

  async onLoadFileSend(source) {
    console.log('source ', source);
    let arrayToFile = [];
    let arrayToProfileFile = [];
      if (this.state.profileFile.file !== undefined) {
        arrayToProfileFile.push({
          name: "attachment",
          file: this.state.profileFile.file,
          fileName: this.state.profileFile.name,
          fieldName: this.state.profileFile.key,
        });
    }
    if (this.state.existId !== true) {
      if (this.state.idFile.file !== undefined) {
        arrayToFile.push({
          name: "attachment",
          file: this.state.idFile.file,
          fileName: this.state.idFile.name,
          fieldName: this.state.idFile.key,
        });
      }
    }
    if (this.state.existBank !== true) {
      if (this.state.bankFile.file !== undefined) {
        arrayToFile.push({
          name: "attachment",
          file: this.state.bankFile.file,
          fileName: this.state.bankFile.name,
          fieldName: this.state.bankFile.key,
        });
      }
    }
    if (this.state.juridic && this.state.existLocation !== true) {
      if (this.state.locationFile.file) {
        arrayToFile.push({
          name: "attachment",
          file: this.state.locationFile.file,
          fileName: this.state.locationFile.name,
          fieldName: this.state.locationFile.key,
        });
      }
    }
    if (this.state.existSelf !== true) {
      if (this.state.selfFile.file) {
        arrayToFile.push({
          name: "attachment",
          file: this.state.selfFile.file,
          fileName: this.state.selfFile.name,
          fieldName: this.state.selfFile.key,
        });
      }
    }
    for (let data of arrayToFile) {
      let findField = this.state.dataNotSet.find((field) => {
        return field.field === data.fieldName;
      });

      if (findField === undefined) {
        let formData = new FormData();
        formData.append("attachment", data.file, data.fileName);
        formData.append("userName", window.sessionStorage.getItem("username"));
        formData.append("fieldName", data.fieldName);
        try {
          await userService.userAddAttachmentAsync(formData);
        } catch (error) {
          console.log(error);
          this.setState({
            errorNetwork: true,
            textMessage: "buy.formVerificationIdentity.errors.errorNetwork",
            formLoad: false,
            endsend: true,
          });
          break;
        }
      } else {
        try {
          if (findField.value !== "" || findField.value !== null) {
            let formData = new FormData();
            formData.append("attachment", data.file, data.fileName);
            formData.append(
              "userName",
              window.sessionStorage.getItem("username")
            );
            formData.append("fieldName", data.fieldName);
            await userService.userAddAttachmentAsync(formData);
          }
        } catch (error) {
          console.log(error);
          let e = error.toString();
          if (e.includes("Network")) {
            this.setState({
              errorNetwork: true,
              textMessage: "buy.formVerificationIdentity.errors.errorNetwork",
              formLoad: false,
            });
          } else {
            this.setState({
              errorNetwork: true,
              textMessage: "buy.formVerificationIdentity.errors.errorNetwork",
              formLoad: false,
              endsend: true,
            });
          }

          break;
        }
      }
    }
    for (let data of arrayToProfileFile) {
      let findField = this.state.dataNotSet.find((field) => {
        return field.field === data.fieldName;
      });
      if (findField === undefined) {
        let formData = new FormData();
        formData.append("attachment", data.file, data.fileName);
        formData.append("userName", window.sessionStorage.getItem("username"));
        formData.append("fieldName", data.fieldName);
         console.log("ifformData",formData)
        try {
          await userService.userAddAttachmentAsync(formData);
        } catch (error) {
          this.setState({
            errorFileProfile: true,
            textMessage: "profile.updateProfile.errors.errorFileProfile",
            formLoad: false,
            endsend: true,
          });
          break;
        }
      } 
      else {
        try {
           console.log("try")
          if (findField.value !== "" && findField.value !== null) {
            let formData = new FormData();
            formData.append("attachment", data.file, findField.value);
            formData.append(
              "userName",
              window.sessionStorage.getItem("username")
            );
            formData.append("fieldName", data.fieldName);
           await userService.userAddAttachmentAsync(formData);
          }
        } catch (error) {
          console.log(error);
          let e = error.toString();
          if (e.includes("Network")) {
             console.log("entra en error network");
            this.setState({
              errorFileProfile: true,
              textMessage: "profile.updateProfile.errors.errorFileProfile",
              formLoad: false,
            });
          } else {
            this.setState({
              errorFileProfile: true,
              textMessage: "profile.updateProfile.errors.errorFileProfile",
              formLoad: false,
              endsend: true,
            });
          }

          break;
        }
      }
    }
    if (source !== "update") {
      this.initVerification();
    }
  }
  sendFiles(formdata, cont, array) {
    let validForm = false;
    if (formdata !== undefined) {
      for (var key of formdata.entries()) {
        validForm = true;
        console.log(key[0] + ", " + key[1]);
      }
    }

    if (cont < array.length) {
      if (validForm) {
        let url = userService.userAddAttachment(formdata);
        url
          .then((res) => {
            cont = cont + 1;
            this.sendFiles(array[cont], cont, array);
            this.setState(
              {
                contSend: this.state.contSend + 1,
              },
              () => {}
            );
          })
          .catch((error) => {
            console.log(error);
            cont = cont + 1;
            this.sendFiles(array[cont], cont, array);
          });
      } else {
        cont = cont + 1;
        this.sendFiles(array[cont], cont, array);
        this.setState(
          {
            contSend: this.state.contSend + 1,
          },
          () => {}
        );
      }
    } else {
      if (this.state.verify) {
        this.initVerification();
      } else {
        this.setState({
          formLoad: false,
          viewMessage: true,
          viewButton: false,
          endsend: true,
          textMessage: "profile.updateProfile.successUpdate",
          firstName: window.sessionStorage.getItem("firstName"),
          lastName: window.sessionStorage.getItem("lastName"),
          twoFactor:
            window.sessionStorage.getItem("twoFactor") === "true"
              ? true
              : false,
        });
        setTimeout(() => {
          // this.closeModalEnd();
          window.location.href = "/profile";
        }, 5000);
      }
    }
  }
  initVerification() {
    console.log('initVerification ');
    let fields = [];
    if (!this.state.juridic) {
      fields = [
        "identityURL",
        "bankURL",
        "selfURL",
        "firstName",
        "lastName",
        "phone",
        "questionSecurity",
        "answerSecurity",
        "typeDocumentIdentity",
        "numberDocumentIdentity",
        "gender",
        "birthdate",
        "countryOfBirth",
        "birthplace",
        "familyName",
        "familyEmail",
        "userLocalBitcoin",
        "userFacebook",
        "descriptionProfile",
        "web",
        "instagram",
        "userDirection",
      ];
    } else {
      fields = [
        "identityURL",
        "bankURL",
        "locationURL",
        "selfURL",
        "firstName",
        "lastName",
        "phone",
        "questionSecurity",
        "answerSecurity",
        "typeDocumentIdentity",
        "numberDocumentIdentity",
        "gender",
        "birthdate",
        "countryOfBirth",
        //"cityOfBirth",
        "birthplace",
        "familyName",
        "familyEmail",
        "userLocalBitcoin",
        "userFacebook",
        "descriptionProfile",
        "web",
        "instagram",
        "userDirection",
        "companyName",
        "companyTypeOfFiscalRecord",
        "companyNumberOfFiscalRecord",
        "companyYearRegistration",
      ];
    }

    let body = {
      userName: window.sessionStorage.getItem("username"),
      fieldNames: fields,
      userVerificationType: "C",
      info: "Initial verification user account",
    };
    let url = userService.verifyUserRequestCore(body);
   
    url
      .then(async (rep) => {
      console.log('resul verification ', rep.data);
        if (rep.data !== "OK") {
          let s = rep.data.split("USER DOES NOT HAVE FIELDNAME ");
          if (s[1] === "firstName") {
            userService.addInfoToUserDollarBtc(
              userService.getUserName(),
              "firstName",
              this.state.firstName
            );
            setTimeout(() => {
              this.initVerification();
            }, 5000);
          }
          if (s[1] === "lastName") {
            userService.addInfoToUserDollarBtc(
              userService.getUserName(),
              "lastName",
              this.state.lastName
            );
            setTimeout(() => {
              this.initVerification();
            }, 5000);
          }
          if (s[1] === "phone") {
            userService.addInfoToUserDollarBtc(
              userService.getUserName(),
              "phone",
              this.state.partialPhone + this.state.partialNumber
            );
            setTimeout(() => {
              this.initVerification();
            }, 5000);
          }
          if (s[1] === "questionSecurity") {
            userService.addInfoToUserDollarBtc(
              userService.getUserName(),
              "questionSecurity",
              this.state.question
            );
            setTimeout(() => {
              this.initVerification();
            }, 5000);
          }
          if (s[1] === "answerSecurity") {
            userService.addInfoToUserDollarBtc(
              userService.getUserName(),
              "answerSecurity",
              this.state.request
            );
            setTimeout(() => {
              this.initVerification();
            }, 5000);
          }
          if (s[1] === "typeDocumentIdentity") {
            userService.addInfoToUserDollarBtc(
              userService.getUserName(),
              "typeDocumentIdentity",
              this.state.typeDocument
            );
            setTimeout(() => {
              this.initVerification();
            }, 5000);
          }
          if (s[1] === "numberDocumentIdentity") {
            userService.addInfoToUserDollarBtc(
              userService.getUserName(),
              "numberDocumentIdentity",
              this.state.numberDocumentId
            );
            setTimeout(() => {
              this.initVerification();
            }, 5000);
          }
          if (s[1] === "gender") {
            userService.addInfoToUserDollarBtc(
              userService.getUserName(),
              "gender",
              this.state.sex
            );
            setTimeout(() => {
              this.initVerification();
            }, 5000);
          }
          if (s[1] === "birthdate") {
            userService.addInfoToUserDollarBtc(
              userService.getUserName(),
              "birthdate",
              this.state.birtdate
            );
            setTimeout(() => {
              this.initVerification();
            }, 5000);
          }
          if (s[1] === "countryOfBirth") {
            userService.addInfoToUserDollarBtc(
              userService.getUserName(),
              "countryOfBirth",
              this.state.countryOfBirth
            );
            setTimeout(() => {
              this.initVerification();
            }, 5000);
          }
          
           /*if (s[1] === "cityOfBirth") {
            userService.addInfoToUserDollarBtc(
              userService.getUserName(),
              "cityOfBirth",
              this.state.cityOfBirth
            );
            setTimeout(() => {
              this.initVerification();
            }, 5000);
           }*/
          
          if (s[1] === "birthplace") {
            userService.addInfoToUserDollarBtc(
              userService.getUserName(),
              "birthplace",
              this.state.birtdateCountry
            );
            setTimeout(() => {
              this.initVerification();
            }, 5000);
          }
          if (s[1] === "familyName") {
            userService.addInfoToUserDollarBtc(
              userService.getUserName(),
              "familyName",
              this.state.nameFamily
            );
            setTimeout(() => {
              this.initVerification();
            }, 5000);
          }
          if (s[1] === "familyEmail") {
            userService.addInfoToUserDollarBtc(
              userService.getUserName(),
              "familyEmail",
              this.state.emailFamily
            );
            setTimeout(() => {
              this.initVerification();
            }, 5000);
          }
          if (s[1] === "userLocalBitcoin") {
            userService.addInfoToUserDollarBtc(
              userService.getUserName(),
              "userLocalBitcoin",
              this.state.userLocalBitcoin
            );
            setTimeout(() => {
              this.initVerification();
            }, 5000);
          }
          if (s[1] === "userFacebook") {
            userService.addInfoToUserDollarBtc(
              userService.getUserName(),
              "userFacebook",
              this.state.userFacebook
            );
            setTimeout(() => {
              this.initVerification();
            }, 5000);
          }
          if (s[1] === "descriptionProfile") {
            userService.addInfoToUserDollarBtc(
              userService.getUserName(),
              "descriptionProfile",
              this.state.professionalProfile
            );
            setTimeout(() => {
              this.initVerification();
            }, 5000);
          }
          if (s[1] === "web") {
            userService.addInfoToUserDollarBtc(
              userService.getUserName(),
              "web",
              this.state.webPage
            );
            setTimeout(() => {
              this.initVerification();
            }, 5000);
          }
          if (s[1] === "instagram") {
            userService.addInfoToUserDollarBtc(
              userService.getUserName(),
              "instagram",
              this.state.instagram
            );
            setTimeout(() => {
              this.initVerification();
            }, 5000);
          }
          if (s[1] === "userDirection") {
            userService.addInfoToUserDollarBtc(
              userService.getUserName(),
              "userDirection",
              this.state.direction
            );
            setTimeout(() => {
              this.initVerification();
            }, 5000);
          }
          if (s[1] === "companyName") {
            userService.addInfoToUserDollarBtc(
              userService.getUserName(),
              "companyName",
              this.state.companyName
            );
            setTimeout(() => {
              this.initVerification();
            }, 5000);
          }
          if (s[1] === "companyTypeOfFiscalRecord") {
            userService.addInfoToUserDollarBtc(
              userService.getUserName(),
              "companyTypeOfFiscalRecord",
              this.state.locationLegalRegistry
            );
            setTimeout(() => {
              this.initVerification();
            }, 5000);
          }
          if (s[1] === "companyYearRegistration") {
            userService.addInfoToUserDollarBtc(
              userService.getUserName(),
              "companyYearRegistration",
              this.state.yearRegistry
            );
            setTimeout(() => {
              this.initVerification();
            }, 5000);
          }
          if (s[1] === "companyNumberOfFiscalRecord") {
            userService.addInfoToUserDollarBtc(
              userService.getUserName(),
              "companyNumberOfFiscalRecord",
              this.state.numberLocationLegalRegistry
            );
            setTimeout(() => {
              this.initVerification();
            }, 5000);
          }
          if (s[1] === "identityURL" && this.state.existId === false) {
            let formData = new FormData();
            formData.append(
              "attachment",
              this.state.idFile.file,
              this.state.idFile.name
            );
            formData.append(
              "userName",
              window.sessionStorage.getItem("username")
            );
            formData.append("fieldName", this.state.idFile.key);
            this.sendSimpleFile(formData);
          }
          if (s[1] === "bankURL" && this.state.existBank === false) {
            let formDataBank = new FormData();
            formDataBank.append(
              "attachment",
              this.state.bankFile.file,
              this.state.bankFile.name
            );
            formDataBank.append(
              "userName",
              window.sessionStorage.getItem("username")
            );
            formDataBank.append("fieldName", this.state.bankFile.key);
            this.sendSimpleFile(formDataBank);
          }
          if (s[1] === "locationURL" && this.state.existLocation === false) {
            let formDataLocation = new FormData();
            formDataLocation.append(
              "attachment",
              this.state.locationFile.file,
              this.state.locationFile.name
            );
            formDataLocation.append(
              "userName",
              window.sessionStorage.getItem("username")
            );
            formDataLocation.append("fieldName", this.state.locationFile.key);
            this.sendSimpleFile(formDataLocation);
          }
          if (s[1] === "selfURL" && this.state.existSelf === false) {
            let formDataSelfie = new FormData();
            formDataSelfie.append(
              "attachment",
              this.state.selfFile.file,
              this.state.selfFile.name
            );
            formDataSelfie.append(
              "userName",
              window.sessionStorage.getItem("username")
            );
            formDataSelfie.append("fieldName", this.state.selfFile.key);
            this.sendSimpleFile(formDataSelfie);
          }
        } else {
          this.setState({ formLoad: false, endsend: true, viewButton: false });
          this.setState({
            viewMessage: true,
            textMessage: "profile.updateProfile.successSentData"
          });

          this.setState({
            addFileSelf: true,
          });

          this.setState({
            addFileLocation: true,
          });

          this.setState({
            addFileBank: true,
          });

          this.setState({
            addFileDni: true,
          });
        }
      })
      .catch((error) => {
        let e = error.toString();
        if (e.includes("Network")) {
          this.setState({
            errorNetwork: true,
            textMessage: "buy.formVerificationIdentity.errors.errorNetwork",
            formLoad: false,
          });
        } else {
          this.setState({
            errorNetwork: true,
            textMessage: "buy.formVerificationIdentity.errors.errorNetwork",
            formLoad: false,
          });
        }
        // ////console.log(error);
      });
  }
  onRemoveFile(e, data) {
    if (data.id === "file-profile") {
      this.profileRef.current.removeFiles();
      this.setState({
        profileFile: {},
        idImgProfile: "",
        addFileProfile: true,
        existProfile:false
      });
    }
    if (data.id === "file-dni") {
      this.dniRef.current.removeFiles();
      this.setState({
        idFile: {},
        idImg: id,
        addFileDni: true,
      });
    }
    if (data.id === "file-bank") {
      this.bankRef.current.removeFiles();
      this.setState({
        bankFile: {},
        bankImg: bank,
        addFileBank: true,
      });
    }
    if (data.id === "file-location") {
      this.locationRef.current.removeFiles();
      this.setState({
        locationFile: {},
        locationImg: this.state.juridic ? id : location,
        addFileLocation: true,
      });
    }
    if (data.id === "file-self") {
      this.selfRef.current.removeFiles();
      this.setState({
        selfFile: {},
        selffImg: self,
        addFileSelf: true,
      });
    }
  }
  onFilesChange(files) {
    if (files !== undefined && files.length > 0) {
      // ////console.log(files[0]);
      if (files[0].extension !== "pdf") {
        if (files[0].size > 5000000) {
          let obj = files[0];
          //console.log(obj)
          let newname1 = files[0].name.replace(/ /g, "-").toLowerCase();
          let newnamesinn = newname1.replace(/ñ/gi, "n");
          let sinacentos = newnamesinn.replace(/[áäà]/gi, "a");
          let newname = sinacentos;
          let f = new File([obj], newname, { type: obj.type });
          var object = {
            img: obj.preview.url,
            name: f.name,
            type: f.type,
            extension: files[0].extension,
            key: "identityURL",
            file: f,
          };
          let ex = String(files[0].extension);
          this.newresice(f, ex.toLocaleUpperCase(), "idFile", object);
          this.setState({
            idImg: obj.preview.url,
            addFileDni: false,
          });
        } else {
          let obj = files[0];
          //console.log(obj)
          let newname1 = files[0].name.replace(/ /g, "-").toLowerCase();
          let newnamesinn = newname1.replace(/ñ/gi, "n");
          let sinacentos = newnamesinn.replace(/[áäà]/gi, "a");
          let newname = sinacentos;
          let f = new File([obj], newname, { type: obj.type });
          var object = {
            img: obj.preview.url,
            name: f.name,
            type: f.type,
            extension: files[0].extension,
            key: "identityURL",
            file: f,
          };
          this.setState({
            idFile: object,
            idImg: obj.preview.url,
            addFileDni: false,
          });
        }
      } else {
        let obj = files[0];
        //console.log(obj)
        let newname1 = files[0].name.replace(/ /g, "-").toLowerCase();
        let newnamesinn = newname1.replace(/ñ/gi, "n");
        let sinacentos = newnamesinn.replace(/[áäà]/gi, "a");
        let newname = sinacentos;
        let f = new File([obj], newname, { type: obj.type });
        var object = {
          img: obj.preview.url,
          name: f.name,
          type: f.type,
          extension: files[0].extension,
          key: "identityURL",
          file: f,
        };

        this.setState({
          idFile: object,
          idImg: obj.preview.url,
          addFileDni: false,
        });
      }
    }
  }
  newresice(file, type, target, ob) {
    Resizer.imageFileResizer(
      file,
      1024,
      678,
      type,
      70,
      0,
      (uri) => {
        var end = new File([uri], ob.name, {
          type: ob.type,
          lastModified: Date.now(),
        });
        ob.file = end;
        this.setState({ [target]: ob });
        //  ////console.log(uri, ob);
      },
      "blob"
    );
  }
  resizeImageData(maxWidth, maxHeight, quality, type, dataUrl, fn, ob, st) {
    var image = new Image();
    image.src = dataUrl;
    var resizedDataUrl;
    let fileend, endFile;
    image.onload = () => {
      var canvas = document.createElement("canvas");
      var width = image.width;
      var height = image.height;

      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      canvas.toBlob(
        (blog) => {
          ////console.log(blog);
        },
        type,
        quality
      );
      //  ////console.log(canvas.width, canvas.height);
      var byteString;
      resizedDataUrl = canvas.toDataURL(type, quality);
      if (resizedDataUrl.split(",")[0].indexOf("base64") >= 0)
        byteString = atob(resizedDataUrl.split(",")[1]);
      else byteString = unescape(resizedDataUrl.split(",")[1]);
      // separate out the mime component
      var mimeString = resizedDataUrl.split(",")[0].split(":")[1].split(";")[0];
      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      fileend = new Blob([ia], { type: mimeString });
      var end = new File([fileend], ob.name, {
        type: mimeString,
        lastModified: Date.now(),
      });
      ob.file = fileend;
      // ////console.log(end, fileend, ob);
      fn({ [st]: ob });
    };
  }
  onFilesError(error, file) {
    if (error.code === 1) {
      this.setState({
        errorFileDni: true,
        textMessage: "profile.updateProfile.errors.fileNotSupported",
      });
      setTimeout(() => {
        this.setState({ errorFileDni: false, textMessage: "" });
      }, 5000);
    } else {
      this.setState({
        errorFileDni: true,
        textMessage: "profile.updateProfile.errors.fileSize",
      });
      setTimeout(() => {
        this.setState({ errorFileDni: false, textMessage: "" });
      }, 5000);
    }
  }
   onFilesChangeProfile(file) {
    if (file !== undefined && file.length > 0) {
      if (file[0].extension !== "pdf") {
        if (file[0].size > 2097152) {
          let obj = file[0];
          //console.log(obj)
          let newname1 = file[0].name.replace(/ /g, "-").toLowerCase();
          let newnamesinn = newname1.replace(/ñ/gi, "n");
          let sinacentos = newnamesinn.replace(/[áäà]/gi, "a");
          let newname = sinacentos;
          let f = new File([obj], newname, { type: obj.type });
          var object = {
            img: obj.preview.url,
            name: f.name,
            type: f.type,
            extension: file[0].extension,
            key: "profileImage",
            file: f,
          };
          this.setState({
            idImgProfile: obj.preview.url,
            addFileProfile: false,
            existProfile:true
          });
          let ex = String(file[0].extension);
          this.newresice(f, ex.toLocaleUpperCase(), "profileFile", object);
        } else {
          let obj = file[0];
          //console.log(obj)
          let newname1 = file[0].name.replace(/ /g, "-").toLowerCase();
          let newnamesinn = newname1.replace(/ñ/gi, "n");
          let sinacentos = newnamesinn.replace(/[áäà]/gi, "a");
          let newname = sinacentos;
          let f = new File([obj], newname, { type: obj.type });
          var object = {
            img: obj.preview.url,
            name: f.name,
            type: f.type,
            extension: file[0].extension,
            key: "profileImage",
            file: f,
          };
          this.setState({
            idImgProfile: obj.preview.url,
            profileFile: object,
            addFileProfile: false,
            existProfile:true
          });
        }
      } 
    }
  }
  onFilesChangeBank(file) {
    if (file !== undefined && file.length > 0) {
      if (file[0].extension !== "pdf") {
        if (file[0].size > 5000000) {
          let obj = file[0];
          //console.log(obj)
          let newname1 = file[0].name.replace(/ /g, "-").toLowerCase();
          let newnamesinn = newname1.replace(/ñ/gi, "n");
          let sinacentos = newnamesinn.replace(/[áäà]/gi, "a");
          let newname = sinacentos;
          let f = new File([obj], newname, { type: obj.type });
          var object = {
            img: obj.preview.url,
            name: f.name,
            type: f.type,
            extension: file[0].extension,
            key: "bankURL",
            file: f,
          };
          this.setState({
            bankImg: obj.preview.url,
            addFileBank: false,
          });
          let ex = String(file[0].extension);
          this.newresice(f, ex.toLocaleUpperCase(), "bankFile", object);
        } else {
          let obj = file[0];
          //console.log(obj)
          let newname1 = file[0].name.replace(/ /g, "-").toLowerCase();
          let newnamesinn = newname1.replace(/ñ/gi, "n");
          let sinacentos = newnamesinn.replace(/[áäà]/gi, "a");
          let newname = sinacentos;
          let f = new File([obj], newname, { type: obj.type });
          var object = {
            img: obj.preview.url,
            name: f.name,
            type: f.type,
            extension: file[0].extension,
            key: "bankURL",
            file: f,
          };
          this.setState({
            bankImg: obj.preview.url,
            bankFile: object,
            addFileBank: false,
          });
        }
      } else {
        let obj = file[0];
        //console.log(obj)
        let newname1 = file[0].name.replace(/ /g, "-").toLowerCase();
        let newnamesinn = newname1.replace(/ñ/gi, "n");
        let sinacentos = newnamesinn.replace(/[áäà]/gi, "a");
        let newname = sinacentos;
        let f = new File([obj], newname, { type: obj.type });
        var object = {
          img: obj.preview.url,
          name: f.name,
          type: f.type,
          extension: file[0].extension,
          key: "bankURL",
          file: f,
        };
        this.setState({
          bankImg: obj.preview.url,
          bankFile: object,
          addFileBank: false,
        });
      }
    }
  }
  onFilesErrorProfile(error, file) {
    if (error.code === 1) {
      this.setState({
        errorFileProfile: true,
        textMessage: "profile.updateProfile.errors.fileNotSupported",
      });
      setTimeout(() => {
        this.setState({ errorFileProfile: false, textMessage: "" });
      }, 5000);
    } else {
      this.setState({
        errorFileProfile: true,
        textMessage: "profile.updateProfile.errors.fileSize",
      });
      setTimeout(() => {
        this.setState({ errorFileProfile: false, textMessage: "" });
      }, 5000);
    }
  }
  onFilesErrorBank(error, file) {
    if (error.code === 1) {
      this.setState({
        errorFileBank: true,
        textMessage: "profile.updateProfile.errors.fileNotSupported",
      });
      setTimeout(() => {
        this.setState({ errorFileBank: false, textMessage: "" });
      }, 5000);
    } else {
      this.setState({
        errorFileBank: true,
        textMessage: "profile.updateProfile.errors.fileSize",
      });
      setTimeout(() => {
        this.setState({ errorFileBank: false, textMessage: "" });
      }, 5000);
    }
  }
  onFilesChangeLocation(file) {
    if (file !== undefined && file.length > 0) {
      if (file[0].extension !== "pdf") {
        if (file[0].size > 5000000) {
          let obj = file[0];
          //console.log(obj)
          let newname1 = file[0].name.replace(/ /g, "-").toLowerCase();
          let newnamesinn = newname1.replace(/ñ/gi, "n");
          let sinacentos = newnamesinn.replace(/[áäà]/gi, "a");
          let newname = sinacentos;
          let f = new File([obj], newname, { type: obj.type });
          var object = {
            img: obj.preview.url,
            name: f.name,
            type: f.type,
            extension: file[0].extension,
            key: "locationURL",
            file: f,
          };
          this.setState({
            locationImg: obj.preview.url,
            addFileLocation: false,
          });
          let ex = String(file[0].extension);
          this.newresice(f, ex.toLocaleUpperCase(), "locationFile", object);
        } else {
          let obj = file[0];
          //console.log(obj)
          let newname1 = file[0].name.replace(/ /g, "-").toLowerCase();
          let newnamesinn = newname1.replace(/ñ/gi, "n");
          let sinacentos = newnamesinn.replace(/[áäà]/gi, "a");
          let newname = sinacentos;
          let f = new File([obj], newname, { type: obj.type });
          var object = {
            img: obj.preview.url,
            name: f.name,
            type: f.type,
            extension: file[0].extension,
            key: "locationURL",
            file: f,
          };
          this.setState({
            locationImg: obj.preview.url,
            locationFile: object,
            addFileLocation: false,
          });
        }
      } else {
        let obj = file[0];
        //console.log(obj)
        let newname1 = file[0].name.replace(/ /g, "-").toLowerCase();
        let newnamesinn = newname1.replace(/ñ/gi, "n");
        let sinacentos = newnamesinn.replace(/[áäà]/gi, "a");
        let newname = sinacentos;
        let f = new File([obj], newname, { type: obj.type });
        var object = {
          img: obj.preview.url,
          name: f.name,
          type: f.type,
          extension: file[0].extension,
          key: "locationURL",
          file: f,
        };
        this.setState({
          locationImg: obj.preview.url,
          locationFile: object,
          addFileLocation: false,
        });
      }
    }
  }
  onFilesErrorLocation(error, file) {
    if (error.code === 1) {
      this.setState({
        errorFileLocation: true,
        textMessage: "profile.updateProfile.errors.fileNotSupported",
      });
      setTimeout(() => {
        this.setState({ errorFileLocation: false, textMessage: "" });
      }, 5000);
    } else {
      this.setState({
        errorFileLocation: true,
        textMessage: "profile.updateProfile.errors.fileSize",
      });
      setTimeout(() => {
        this.setState({ errorFileLocation: false, textMessage: "" });
      }, 5000);
    }
  }
  onFilesChangeSelfie(file) {
    if (file !== undefined && file.length > 0) {
      if (file[0].extension !== "pdf") {
        if (file[0].size > 2000000) {
          let obj = file[0];
          //console.log(obj)
          let newname1 = file[0].name.replace(/ /g, "-").toLowerCase();
          let newnamesinn = newname1.replace(/ñ/gi, "n");
          let sinacentos = newnamesinn.replace(/[áäà]/gi, "a");
          let newname = sinacentos;
          let f = new File([obj], newname, { type: obj.type });
          var object = {
            img: obj.preview.url,
            name: f.name,
            type: f.type,
            extension: file[0].extension,
            key: "selfURL",
            file: f,
          };
          this.setState({
            selffImg: obj.preview.url,
            addFileSelf: false,
          });
          let ex = String(file[0].extension);
          this.newresice(f, ex.toLocaleUpperCase(), "selfFile", object);
        } else {
          let obj = file[0];
          //console.log(obj)
          let newname1 = file[0].name.replace(/ /g, "-").toLowerCase();
          let newnamesinn = newname1.replace(/ñ/gi, "n");
          let sinacentos = newnamesinn.replace(/[áäà]/gi, "a");
          let newname = sinacentos;
          let f = new File([obj], newname, { type: obj.type });
          var object = {
            img: obj.preview.url,
            name: f.name,
            type: f.type,
            extension: file[0].extension,
            key: "selfURL",
            file: f,
          };
          this.setState({
            selffImg: obj.preview.url,
            selfFile: object,
            addFileSelf: false,
          });
        }
      } else {
        // eslint-disable-next-line no-redeclare
        let obj = file[0];
        //console.log(obj)
        let newname1 = file[0].name.replace(/ /g, "-").toLowerCase();
        let newnamesinn = newname1.replace(/ñ/gi, "n");
        let sinacentos = newnamesinn.replace(/[áäà]/gi, "a");
        let newname = sinacentos;
        let f = new File([obj], newname, { type: obj.type });
        var object = {
          img: obj.preview.url,
          name: f.name,
          type: f.type,
          extension: obj.extension,
          key: "selfURL",
          file: f,
        };
        this.setState({
          selffImg: obj.preview.url,
          selfFile: object,
          addFileSelf: false,
        });
      }
    }
  }
  onFilesErrorSelfie(error, file) {
    if (error.code === 1) {
      this.setState({
        errorFileSelf: true,
        textMessage: "profile.updateProfile.errors.fileNotSupported",
      });
      setTimeout(() => {
        this.setState({ errorFileSelf: false, textMessage: "" });
      }, 5000);
    } else {
      this.setState({
        errorFileSelf: true,
        textMessage: "profile.updateProfile.errors.fileSize",
      });
      setTimeout(() => {
        this.setState({ errorFileSelf: false, textMessage: "" });
      }, 5000);
    }
  }
  closeModalEnd() {
    this.setState({ open: false, endsend: false, hiddenWarning: true });
    //window.location.href = "/profile";
  }
  closeModal() {
    this.setState({ open: false });
  }
  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery });
  render() {
    let t = this.state.translator;

    let message, messageErrord, messageErrorb,messageErrorP, messageErrorl, messageErrors;
    let list = [];
    if (this.state.prefit.length > 0) {
      for (let pre of this.state.prefit) {
        if (pre.value !== "") {
          list.push({
            text:
              window.sessionStorage.getItem("language") === "es"
                ? pre.nombre
                : pre.text,
            value: window.sessionStorage.getItem("language") === "es"
                ? pre.nombre
                : pre.text,
            key: pre.iso2,
          });
        }
      }
    }
    let list2 = this.state.prefit.map((element, i) => (
      <option value={element.value} key={i}>
        {element.text}
      </option>
    ));
    if (this.state.viewMessage) {
      message = <Message info floating content={t(this.state.textMessage)} />;
    }
     if (this.state.errorFileProfile) {
      messageErrorP = (
        <Message color="red" style={{ padding: "inherit" }}>
          <span style={{ fontSize: "9px" }}>{t(this.state.textMessage)}</span>
        </Message>
      );
    }
    if (this.state.errorFileDni) {
      messageErrord = (
        <Message color="red" style={{ padding: "inherit" }}>
          <span style={{ fontSize: "9px" }}>{t(this.state.textMessage)}</span>
        </Message>
      );
    }
    if (this.state.errorFileBank) {
      messageErrorb = (
        <Message color="red" style={{ padding: "inherit" }}>
          <span style={{ fontSize: "9px" }}>{t(this.state.textMessage)}</span>
        </Message>
      );
    }
    if (this.state.errorFileLocation) {
      messageErrorl = (
        <Message color="red" style={{ padding: "inherit" }}>
          <span style={{ fontSize: "9px" }}>{t(this.state.textMessage)}</span>
        </Message>
      );
    }
    if (this.state.errorFileSelf) {
      messageErrors = (
        <Message color="red" style={{ padding: "inherit" }}>
          <span style={{ fontSize: "9px" }}>{t(this.state.textMessage)}</span>
        </Message>
      );
    }
    let messageFileInstrutionsOne = "";
    let messageFileInstrutionsTwo = "";
    if (
      this.state.existId !== true ||
      this.state.existBank !== true ||
      this.state.existLocation !== true ||
      this.state.existSelf !== true
    ) {
      if (!this.state.juridic) {
        messageFileInstrutionsOne = (
          <div style={{ width: "100%", marginTop: "8px", textAlign: "center" }}>
            {t(
              "profile.updateProfile.form.verifyCUninitiatedPersonal.messageFile"
            )}
          </div>
        );
      } else {
        messageFileInstrutionsOne = (
          <div style={{ width: "100%", marginTop: "8px", textAlign: "center" }}>
            {t(
              "profile.updateProfile.form.verifyCUninitiatedCompany.messageFile"
            )}
          </div>
        );
      }
    }
    if (
      this.state.existId !== true ||
      this.state.existBank !== true ||
      this.state.existLocation !== true ||
      this.state.existSelf !== true
    ) {
      if (!this.state.juridic) {
        messageFileInstrutionsTwo = (
          <div
            style={{
              marginTop: "5px",
              textAlign: "center",
              marginBottom: "5px",
            }}
          >
            {t(
              "profile.updateProfile.form.verifyCUninitiatedPersonal.supportedTypeFiles"
            )}
          </div>
        );
      } else {
        messageFileInstrutionsTwo = (
          <div
            style={{
              marginTop: "5px",
              textAlign: "center",
              marginBottom: "5px",
            }}
          >
            {t(
              "profile.updateProfile.form.verifyCUninitiatedCompany.supportedTypeFiles"
            )}
          </div>
        );
      }
    }
    return (
      <div>
        <Segment loading={this.state.formLoad || this._Mounted === false || this.state.profileFile === {}}>
          <Header textAlign="center" className="titleComponent">
            {t("profile.updateProfile.header")}
          </Header>
          <Form>
            <Divider hidden />
            <Form.Group>
              <Form.Input
                disabled={this.state.userVerifyC !== "UNINITIATED" && this.state.userVerifyC !== "FAIL"}
                required
                label={t("profile.updateProfile.form.name")}
                width={4}
                placeholder={t("profile.updateProfile.form.placeholderName")}
                value={this.state.firstName}
                onChange={this.handlefirstName.bind(this)}
              />
              <Form.Input
                disabled={this.state.userVerifyC !== "UNINITIATED" && this.state.userVerifyC !== "FAIL"}
                required
                label={t("profile.updateProfile.form.lastName")}
                width={4}
                placeholder={t(
                  "profile.updateProfile.form.placeholderLastName"
                )}
                value={this.state.lastName}
                onChange={this.handleLastName.bind(this)}
              />
              <Form.Select
                disabled={this.state.userVerifyC !== "UNINITIATED" && this.state.userVerifyC !== "FAIL"}
                required
                width={4}
                id="select-rebeld-sex"
                placeholder={t("profile.updateProfile.form.placeholderSex")}
                value={this.state.sex}
                options={this.state.sexList}
                onChange={this.handleSex.bind(this)}
                label={t("profile.updateProfile.form.sex")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Select
                disabled={this.state.userVerifyC !== "UNINITIATED" && this.state.userVerifyC !== "FAIL"}
                required
                width={4}
                id="select-rebeld"
                placeholder={t(
                  "profile.updateProfile.form.placeholderDocumentType"
                )}
                value={this.state.typeDocument}
                options={this.state.documentType}
                onChange={this.handleTypeDocument.bind(this)}
                label={t("profile.updateProfile.form.documentType")}
              />

              {this.state.selectOther && (
                <Form.Input
                  disabled={this.state.userVerifyC !== "UNINITIATED" && this.state.userVerifyC !== "FAIL"}
                  width={4}
                  label={t("profile.updateProfile.form.other")}
                  value={this.state.otherDocument}
                  onChange={this.handleOtherTypeDocument.bind(this)}
                />
              )}
              <Form.Input
                disabled={this.state.userVerifyC !== "UNINITIATED" && this.state.userVerifyC !== "FAIL"}
                required
                width={4}
                label={t("profile.updateProfile.form.numberId")}
                value={this.state.numberDocumentId}
                onChange={this.handleNumberDocumentId.bind(this)}
              />
              {this.state.userVerifyA !== "OK" && (
                <Form.Input
                  width={4}
                  label={t("profile.updateProfile.form.email")}
                  value={this.state.email}
                  onChange={this.handleEmail.bind(this)}
                />
              )}
            </Form.Group>
            <Form.Group>
              <Form.Input
                disabled={this.state.userVerifyC !== "UNINITIATED" && this.state.userVerifyC !== "FAIL"}
                required
                label={t("profile.updateProfile.form.birthday")}
                type="date"
                width={4}
                value={this.state.birtdate}
                onChange={this.handleBirtdate.bind(this)}
              />
              <Form.Dropdown
                disabled={this.state.userVerifyC !== "UNINITIATED" && this.state.userVerifyC !== "FAIL"}
                required={ true}
                    label={t("profile.updateProfile.form.countryOfBirth")}
                    placeholder={t('login.country')}
                    fluid
                    search
                    selection
                    width={ 4}
                    options={list}
                    value={this.state.countryOfBirth}
                    onChange={this.handleCountryOfBirth.bind(this)}
                    onSearchChange={this.handleSearchChange.bind(this)}
              />
              {/*<Form.Input
                disabled={this.state.userVerifyC !== "UNINITIATED" && this.state.userVerifyC !== "FAIL"}
                required
                width={4}
                label={t("profile.updateProfile.form.cityOfBirth")}
                value={this.state.cityOfBirth}
                onChange={this.handleCityOfBirth.bind(this)}
              />*/}
              <Form.Input
                disabled={this.state.userVerifyC !== "UNINITIATED" && this.state.userVerifyC !== "FAIL"}
                required
                width={4}
                label={t("profile.updateProfile.form.birthplace")}
                value={this.state.birtdateCountry}
                onChange={this.handleBirtdateCountry.bind(this)}
              />
              {/* <Form.Select
                label={t('profile.updateProfile.form.placeholderCountry')}
                required
                width={4}
                selection
                search={true}
                options={list}
                value={this.state.partialPhone}
                placeholder={t('profile.updateProfile.form.placeholderCountry')}
                onChange={this.handlePrefit.bind(this)}
                onSearchChange={this.handleSearchChange.bind(this)}
              />
              <Form.Input
                required
                width={4}
                label={t('profile.updateProfile.form.phone')}
                placeholder={t('profile.updateProfile.form.placeholderPhone')}
                value={this.state.partialNumber}
                onChange={this.handleNumberPhone.bind(this)}
              /> */}
            </Form.Group>
            <Form.Group>
              <Form.Input
                width={4}
                label={t("profile.updateProfile.form.securityQuestion")}
                value={this.state.question}
                onChange={this.handleQuestion.bind(this)}
              />
              <Form.Input
                width={4}
                label={t("profile.updateProfile.form.securityAnswer")}
                value={this.state.request}
                onChange={this.handleRequest.bind(this)}
              />
              <Form.Input
                width={4}
                label={
                  this.state.juridic === true
                    ? t("profile.updateProfile.form.contactCompany")
                    : t("profile.updateProfile.form.contactFamily")
                }
                value={this.state.nameFamily}
                placeholder={t("profile.updateProfile.form.placeholderContact")}
                onChange={this.handleNameFamily.bind(this)}
              />
              <Form.Input
                width={4}
                label={
                  this.state.juridic === true
                    ? t("profile.updateProfile.form.contactEmailCompany")
                    : t("profile.updateProfile.form.contactEmailFamily")
                }
                value={this.state.emailFamily}
                placeholder={
                  this.state.juridic === true
                    ? t("profile.updateProfile.form.contactEmailCompany")
                    : t("profile.updateProfile.form.contactEmailFamily")
                }
                type="email"
                onChange={this.handleEmailFamily.bind(this)}
              />
            </Form.Group>
            <Form.Group>
              {/* <Form.Input
                width={4}
                label={t("profile.updateProfile.form.localbitcoinUser")}
                value={this.state.userLocalBitcoin}
                onChange={this.handleUserLocalBitcoin.bind(this)}
              />
              <Form.Input
                width={4}
                label={t("profile.updateProfile.form.facebookUser")}
                value={this.state.userFacebook}
                onChange={this.handleUserFacebook.bind(this)}
              /> */}
              <Form.Input
                width={4}
                label={t("profile.updateProfile.form.professionalProfile")}
                value={this.state.professionalProfile}
                onChange={this.handleProfessionalProfile.bind(this)}
              />
              <Form.Input
                width={4}
                label={t("profile.updateProfile.form.webPage")}
                value={this.state.webPage}
                onChange={this.handleWebPage.bind(this)}
              />
              <Form.Input
                width={4}
                label={t("profile.updateProfile.form.instagram")}
                value={this.state.instagram}
                onChange={this.handleInstagram.bind(this)}
              /> 
                <div inline style={{marginLeft:10}}>
              <Form.Field
                                    label={t("profile.updateProfile.form.profilePicture")}
                                  ></Form.Field>
                <Files
                              required
                             // className="files-dropzone"
                              ref={this.profileRef}
                              onChange={this.onFilesChangeProfile.bind(this)}
                              onError={this.onFilesErrorProfile.bind(this)}
                              accepts={["image/*"]}
                              multiple={false}
                              maxFiles={1}
                              id="profile"
                              maxFileSize={2097152}
                              minFileSize={0}
                              clickable={this.state.addFileProfile}
                            >
                              <Header textAlign="center">

                                {this.state.profileFile.extension !== "pdf" && this.state.idImgProfile !==""&& this.state.existProfile &&(
                                  <img
                                    alt=""
                                    src={this.state.idImgProfile}
                                    className="imageFileV"
                                  />
                                )}
                                {this.state.profileFile.name === undefined && !this.state.existProfile&& (
                                  <Button style={{marginTop:3, height:35}}
                                  >{t("profile.updateProfile.form.attachPhoto")}</Button>
                                  
                                )}
                                {messageErrorP}
                              </Header>
                            </Files>
                             {!this.state.addFileProfile && (
                              <Button
                                color="blue"
                                size="tiny"
                                id="file-profile"
                                onClick={this.onRemoveFile.bind(this)}
                              >
                                {t(
                                  "profile.updateProfile.form.verifyCUninitiatedPersonal.buttonChange"
                                )}
                              </Button>
                            )}
                            {this.errorFileProfile && (
                              <Message
                                error
                                content={t(
                                  "profile.updateProfile.form.verifyCUninitiatedPersonal.fileNotSupported"
                                )}
                              />
                            )}
                            <br />
              </div>
            </Form.Group>
            <Form.Group>
              <Form.TextArea
                disabled={this.state.userVerifyC !== "UNINITIATED" && this.state.userVerifyC !== "FAIL"}
                required
                width={16}
                label={
                  this.state.juridic === true
                    ? t("profile.updateProfile.form.addressCompany")
                    : t("profile.updateProfile.form.addressPersonal")
                }
                value={this.state.direction}
                onChange={this.handleDirection.bind(this)}
              />
            </Form.Group>
            <Divider hidden />
            {this.state.userVerifyC === "UNINITIATED" && !this.state.juridic && (
              <Grid centered>
                <div>
                  <Message
                    warning
                    header={t(
                      "profile.updateProfile.form.verifyCUninitiatedPersonal.warning"
                    )}
                    content={t(
                      "profile.updateProfile.form.verifyCUninitiatedPersonal.messageWarning"
                    )}
                  />
                </div>
                {messageFileInstrutionsOne}

                {messageFileInstrutionsTwo}
                <Grid.Row>
                  {this.state.existId !== true && (
                    <Grid.Column
                      largeScreen={4}
                      computer={4}
                      tablet={16}
                      mobile={16}
                    >
                      <Form.Field required>
                        <Segment placeholder className="images-verify">
                          <Form.Field>
                            <Files
                              required
                              className="files-dropzone"
                              ref={this.dniRef}
                              onChange={this.onFilesChange.bind(this)}
                              onError={this.onFilesError.bind(this)}
                              accepts={["image/*", ".pdf"]}
                              multiple={false}
                              maxFiles={1}
                              id="identity"
                              maxFileSize={5000000}
                              minFileSize={0}
                              clickable={this.state.addFileDni}
                            >
                              <Header textAlign="center">
                                {this.state.idFile.extension !== "pdf" && (
                                  <img
                                    alt=""
                                    src={this.state.idImg}
                                    className="imageFileV"
                                  />
                                )}

                                {this.state.idFile.extension === "pdf" && (
                                  <div>
                                    <Icon
                                      name="file pdf"
                                      size="big"
                                      color="blue"
                                    />
                                  </div>
                                )}
                                {this.state.idFile.name !== undefined && (
                                  <p style={{ fontSize: "11px" }}>
                                       {this.state.idFile.name.length > 25 ? (this.state.idFile.name.substr(0,24)+ "...") : this.state.idFile.name}
                                  </p>
                                )}
                                {this.state.idFile.name === undefined && (
                                  <p style={{ fontSize: "11px" }}>
                                    {t(
                                      "profile.updateProfile.form.verifyCUninitiatedPersonal.documentID"
                                    )}
                                  </p>
                                )}
                                {messageErrord}
                              </Header>
                            </Files>

                            {!this.state.addFileDni && (
                              <Button
                                color="blue"
                                size="tiny"
                                id="file-dni"
                                onClick={this.onRemoveFile.bind(this)}
                              >
                                {t(
                                  "profile.updateProfile.form.verifyCUninitiatedPersonal.buttonChange"
                                )}
                              </Button>
                            )}
                            {this.errorFileDni && (
                              <Message
                                error
                                content={t(
                                  "profile.updateProfile.form.verifyCUninitiatedPersonal.fileNotSupported"
                                )}
                              />
                            )}
                            <br />
                          </Form.Field>
                        </Segment>
                      </Form.Field>
                    </Grid.Column>
                  )}
                  {this.state.existBank !== true && (
                    <Grid.Column
                      largeScreen={4}
                      computer={4}
                      tablet={16}
                      mobile={16}
                    >
                      <Form.Field required>
                        {" "}
                        <Segment placeholder className="images-verify">
                          <Form.Field>
                            <Files
                              className="files-dropzone"
                              ref={this.bankRef}
                              onChange={this.onFilesChangeBank.bind(this)}
                              onError={this.onFilesErrorBank.bind(this)}
                              accepts={["image/*", ".pdf"]}
                              multiple={false}
                              maxFiles={1}
                              maxFileSize={5000000}
                              minFileSize={0}
                              clickable={this.state.addFileBank}
                            >
                              <Header textAlign="center">
                                {this.state.bankFile.extension !== "pdf" && (
                                  <img
                                    alt=""
                                    src={this.state.bankImg}
                                    className="imageFileV"
                                  />
                                )}

                                {this.state.bankFile.extension === "pdf" && (
                                  <div>
                                    <Icon
                                      name="file pdf"
                                      size="big"
                                      color="blue"
                                    />
                                  </div>
                                )}
                                {this.state.bankFile.name !== undefined && (
                                  <p style={{ fontSize: "11px" }}>
                                    {this.state.bankFile.name.length > 25 ? (this.state.bankFile.name.substr(0,24)+ "...") : this.state.bankFile.name}
                                  </p>
                                )}
                                {this.state.bankFile.name === undefined && (
                                  <p style={{ fontSize: "11px" }}>
                                    {t(
                                      "profile.updateProfile.form.verifyCUninitiatedPersonal.bankAccountSupport"
                                    )}
                                  </p>
                                )}
                                {messageErrorb}
                              </Header>
                            </Files>

                            {!this.state.addFileBank && (
                              <Button
                                color="blue"
                                size="tiny"
                                id="file-bank"
                                onClick={this.onRemoveFile.bind(this)}
                              >
                                {t(
                                  "profile.updateProfile.form.verifyCUninitiatedPersonal.buttonChange"
                                )}
                              </Button>
                            )}
                            {this.errorFileBank && (
                              <Message
                                error
                                content={t(
                                  "profile.updateProfile.form.verifyCUninitiatedPersonal.fileNotSupported"
                                )}
                              />
                            )}
                          </Form.Field>
                        </Segment>
                      </Form.Field>
                    </Grid.Column>
                  )}
                  {this.state.existSelf !== true && (
                    <Grid.Column
                      largeScreen={4}
                      computer={4}
                      tablet={16}
                      mobile={16}
                    >
                      <Form.Field required>
                        <Segment placeholder className="images-verify">
                          <Form.Field>
                            <Files
                              className="files-dropzone"
                              ref={this.selfRef}
                              onChange={this.onFilesChangeSelfie.bind(this)}
                              onError={this.onFilesErrorSelfie.bind(this)}
                              accepts={["image/*"]}
                              multiple={false}
                              maxFiles={1}
                              maxFileSize={2000000}
                              minFileSize={0}
                              clickable={this.state.addFileSelf}
                            >
                              <Header textAlign="center">
                                {this.state.selfFile.extension !== "pdf" && (
                                  <img
                                    alt=""
                                    src={this.state.selffImg}
                                    className="imageFileV"
                                  />
                                )}
                                {this.state.selfFile.extension === "pdf" && (
                                  <div>
                                    <Icon
                                      name="file pdf"
                                      size="big"
                                      color="blue"
                                    />
                                  </div>
                                )}
                                {this.state.selfFile.name !== undefined && (
                                  <p style={{ fontSize: "11px" }}>
                                    {this.state.selfFile.name.length > 25 ? (this.state.selfFile.name.substr(0,24)+ "...") : this.state.selfFile.name}
                                  </p>
                                )}
                                {this.state.selfFile.name === undefined && (
                                  <p style={{ fontSize: "11px" }}>
                                    {t(
                                      "profile.updateProfile.form.verifyCUninitiatedPersonal.selfieSupport"
                                    )}
                                  </p>
                                )}
                                {messageErrors}
                              </Header>
                            </Files>

                            {!this.state.addFileSelf && (
                              <Button
                                color="blue"
                                size="tiny"
                                id="file-self"
                                onClick={this.onRemoveFile.bind(this)}
                              >
                                {t(
                                  "profile.updateProfile.form.verifyCUninitiatedPersonal.buttonChange"
                                )}
                              </Button>
                            )}
                            {this.errorFileSelf && (
                              <Message
                                error
                                content={t(
                                  "profile.updateProfile.form.verifyCUninitiatedPersonal.fileNotSupported"
                                )}
                              />
                            )}
                          </Form.Field>
                        </Segment>
                      </Form.Field>
                    </Grid.Column>
                  )}
                </Grid.Row>
              </Grid>
            )}
            {this.state.userVerifyC === "UNINITIATED" &&
              this.state.juridic === true && (
                <Grid centered>
                <Grid.Row>
                   <Grid.Column
                      largeScreen={4}
                      computer={4}
                      tablet={16}
                      mobile={16}
                    >
                  <Form.Input
                      required
                      label={t(
                        "profile.updateProfile.form.verifyCUninitiatedCompany.name"
                      )}
                      value={this.state.companyName}
                      onChange={this.handleCompanyName.bind(this)}
                    />
                  </Grid.Column>
                   <Grid.Column
                      largeScreen={4}
                      computer={4}
                      tablet={16}
                      mobile={16}
                    >
                    <Form.Input
                      required
                      label={t(
                        "profile.updateProfile.form.verifyCUninitiatedCompany.registerYear"
                      )}
                      value={this.state.yearRegistry}
                      onChange={this.handleYearRegistryCompany.bind(this)}
                    />
                  </Grid.Column>
                   <Grid.Column
                      largeScreen={4}
                      computer={4}
                      tablet={16}
                      mobile={16}
                    >
                  <Form.Input
                      required
                      label={t(
                        "profile.updateProfile.form.verifyCUninitiatedCompany.registerFiscalType"
                      )}
                      value={this.state.locationLegalRegistry}
                      onChange={this.handleTypeRegistryLegaly.bind(this)}
                    />
                  </Grid.Column>
                  <Grid.Column
                      largeScreen={4}
                      computer={4}
                      tablet={16}
                      mobile={16}
                    >
                  <Form.Input
                      required
                      label={t(
                        "profile.updateProfile.form.verifyCUninitiatedCompany.registerFiscalNumber"
                      )}
                      value={this.state.numberLocationLegalRegistry}
                      onChange={this.handleNumberRegistryLegaly.bind(this)}
                    />
                    </Grid.Column>
                  </Grid.Row>
                  <div>
                    <Message
                      warning
                      header={t(
                        "profile.updateProfile.form.verifyCUninitiatedCompany.warning"
                      )}
                      content={t(
                        "profile.updateProfile.form.verifyCUninitiatedCompany.messageWarning"
                      )}
                    />
                  </div>
                  <br />
                  <Divider hidden />
                  {messageFileInstrutionsOne}
                  {messageFileInstrutionsTwo}
                  <Grid.Row textAlign="center">
                    {this.state.existId !== true && (
                      <Grid.Column
                        largeScreen={4}
                        computer={4}
                        tablet={16}
                        mobile={16}
                      >
                        {" "}
                        <Form.Field required>
                          <Segment placeholder className="images-verify">
                            <Form.Field>
                              <Files
                                required
                                className="files-dropzone"
                                ref={this.dniRef}
                                onChange={this.onFilesChange.bind(this)}
                                onError={this.onFilesError.bind(this)}
                                accepts={["image/*", ".pdf"]}
                                multiple={false}
                                maxFiles={1}
                                id="identity"
                                maxFileSize={5000000}
                                minFileSize={0}
                                clickable={this.state.addFileDni}
                              >
                                <Header textAlign="center">
                                  {this.state.idFile.extension !== "pdf" && (
                                    <img
                                      alt=""
                                      src={this.state.idImg}
                                      className="imageFileV"
                                    />
                                  )}
                                  {this.state.idFile.extension === "pdf" && (
                                    <div>
                                      <Icon
                                        name="file pdf"
                                        size="big"
                                        color="blue"
                                      />
                                    </div>
                                  )}

                                  {this.state.idFile.name !== undefined && (
                                    <p style={{ fontSize: "11px" }}>
                                       {this.state.selfFile.idFile.length > 25 ? (this.state.idFile.name.substr(0,24)+ "...") : this.state.idFile.name}
                                    </p>
                                  )}
                                  {this.state.idFile.name === undefined && (
                                    <p style={{ fontSize: "11px" }}>
                                      {t(
                                        "profile.updateProfile.form.verifyCUninitiatedCompany.documentID"
                                      )}
                                    </p>
                                  )}
                                  {messageErrord}
                                </Header>
                              </Files>
                              {!this.state.addFileDni && (
                                <Button
                                  color="blue"
                                  size="tiny"
                                  id="file-dni"
                                  onClick={this.onRemoveFile.bind(this)}
                                >
                                  {t(
                                    "profile.updateProfile.form.verifyCUninitiatedCompany.buttonChange"
                                  )}
                                </Button>
                              )}
                              {this.errorFileDni && (
                                <Message
                                  error
                                  content={t(
                                    "profile.updateProfile.form.verifyCUninitiatedCompany.fileNotSupported"
                                  )}
                                />
                              )}
                              <br />
                            </Form.Field>
                          </Segment>
                        </Form.Field>
                      </Grid.Column>
                    )}
                    {this.state.existBank !== true && (
                      <Grid.Column
                        largeScreen={4}
                        computer={4}
                        tablet={16}
                        mobile={16}
                      >
                        <Form.Field required>
                          <Segment placeholder className="images-verify">
                            <Form.Field>
                              <Files
                                className="files-dropzone"
                                ref={this.bankRef}
                                onChange={this.onFilesChangeBank.bind(this)}
                                onError={this.onFilesErrorBank.bind(this)}
                                accepts={["image/*", ".pdf"]}
                                multiple={false}
                                maxFiles={1}
                                maxFileSize={5000000}
                                minFileSize={0}
                                clickable={this.state.addFileBank}
                              >
                                <Header textAlign="center">
                                  {this.state.bankFile.extension !== "pdf" && (
                                    <img
                                      alt=""
                                      src={this.state.bankImg}
                                      className="imageFileV"
                                    />
                                  )}
                                  {this.state.bankFile.extension === "pdf" && (
                                    <div>
                                      <Icon
                                        name="file pdf"
                                        size="big"
                                        color="blue"
                                      />
                                    </div>
                                  )}
                                  {this.state.bankFile.name !== undefined && (
                                    <p style={{ fontSize: "11px" }}>
                                        {this.state.bankFile.name.length > 25 ? (this.state.bankFile.name.substr(0,24)+ "...") : this.state.bankFile.name}
                                    </p>
                                  )}
                                  {this.state.bankFile.name === undefined && (
                                    <p style={{ fontSize: "11px" }}>
                                      {t(
                                        "profile.updateProfile.form.verifyCUninitiatedCompany.bankAccountSupport"
                                      )}
                                    </p>
                                  )}
                                  {messageErrorb}
                                </Header>
                              </Files>

                              {!this.state.addFileBank && (
                                <Button
                                  color="blue"
                                  size="tiny"
                                  id="file-bank"
                                  onClick={this.onRemoveFile.bind(this)}
                                >
                                  {t(
                                    "profile.updateProfile.form.verifyCUninitiatedCompany.buttonChange"
                                  )}
                                </Button>
                              )}
                              {this.errorFileBank && (
                                <Message
                                  error
                                  content={t(
                                    "profile.updateProfile.form.verifyCUninitiatedCompany.fileNotSupported"
                                  )}
                                />
                              )}
                            </Form.Field>
                          </Segment>
                        </Form.Field>
                      </Grid.Column>
                    )}
                    {this.state.existLocation !== true && (
                      <Grid.Column
                        largeScreen={4}
                        computer={4}
                        tablet={16}
                        mobile={16}
                      >
                        <Form.Field required>
                          <Segment placeholder className="images-verify">
                            <Form.Field>
                              <Files
                                className="files-dropzone"
                                ref={this.locationRef}
                                onChange={this.onFilesChangeLocation.bind(this)}
                                onError={this.onFilesErrorLocation.bind(this)}
                                accepts={["image/*", ".pdf"]}
                                multiple={false}
                                maxFiles={1}
                                maxFileSize={5000000}
                                minFileSize={0}
                                clickable={this.state.addFileLocation}
                              >
                                <Header textAlign="center">
                                  {this.state.locationFile.extension !== "pdf" && (
                                    <img
                                      alt=""
                                      src={this.state.locationImg}
                                      className="imageFileV"
                                    />
                                  )}
                                  {this.state.locationFile.extension ===
                                    "pdf" && (
                                    <div>
                                      <Icon
                                        name="file pdf"
                                        size="big"
                                        color="blue"
                                      />
                                    </div>
                                  )}
                                  {this.state.locationFile.name !==
                                    undefined && (
                                    <p style={{ fontSize: "11px" }}>
                                        {this.state.locationFile.name.length > 25 ? (this.state.locationFile.name.substr(0,24)+ "...") : this.state.locationFile.name}
                                    </p>
                                  )}
                                  {this.state.locationFile.name ===
                                    undefined && (
                                    <p style={{ fontSize: "11px" }}>
                                      {t(
                                        "profile.updateProfile.form.verifyCUninitiatedCompany.registerFiscal"
                                      )}
                                    </p>
                                  )}
                                  {messageErrorl}
                                </Header>
                              </Files>

                              {!this.state.addFileLocation && (
                                <Button
                                  color="blue"
                                  size="tiny"
                                  id="file-location"
                                  onClick={this.onRemoveFile.bind(this)}
                                >
                                  {t(
                                    "profile.updateProfile.form.verifyCUninitiatedCompany.buttonChange"
                                  )}
                                </Button>
                              )}
                              {this.errorFileLocation && (
                                <Message
                                  error
                                  content={t(
                                    "profile.updateProfile.form.verifyCUninitiatedCompany.fileNotSupported"
                                  )}
                                />
                              )}
                            </Form.Field>
                          </Segment>
                        </Form.Field>
                      </Grid.Column>
                    )}
                    {this.state.existSelf !== true && (
                      <Grid.Column
                        largeScreen={4}
                        computer={4}
                        tablet={16}
                        mobile={16}
                      >
                        <Form.Field required>
                          <Segment placeholder className="images-verify">
                            <Form.Field>
                              <Files
                                className="files-dropzone"
                                ref={this.selfRef}
                                onChange={this.onFilesChangeSelfie.bind(this)}
                                onError={this.onFilesErrorSelfie.bind(this)}
                                accepts={["image/*", ".pdf"]}
                                multiple={false}
                                maxFiles={1}
                                maxFileSize={5000000}
                                minFileSize={0}
                                clickable={this.state.addFileSelf}
                              >
                                <Header textAlign="center">
                                  {this.state.selfFile.extension !== "pdf" && (
                                    <img
                                      alt=""
                                      src={this.state.selffImg}
                                      className="imageFileV"
                                    />
                                  )}
                                  {this.state.selfFile.extension === "pdf" && (
                                    <div>
                                      <Icon
                                        name="file pdf"
                                        size="big"
                                        color="blue"
                                      />
                                    </div>
                                  )}
                                  {this.state.selfFile.name !== undefined && (
                                    <p style={{ fontSize: "11px" }}>
                                        {this.state.selfFile.name.length > 25 ? (this.state.selfFile.name.substr(0,24)+ "...") : this.state.selfFile.name}
                                    </p>
                                  )}
                                  {this.state.selfFile.name === undefined && (
                                    <p style={{ fontSize: "11px" }}>
                                      {t(
                                        "profile.updateProfile.form.verifyCUninitiatedCompany.selfieSupport"
                                      )}
                                    </p>
                                  )}
                                  {messageErrors}
                                </Header>
                              </Files>

                              {!this.state.addFileSelf && (
                                <Button
                                  color="blue"
                                  size="tiny"
                                  id="file-self"
                                  onClick={this.onRemoveFile.bind(this)}
                                >
                                  {t(
                                    "profile.updateProfile.form.verifyCUninitiatedCompany.buttonChange"
                                  )}
                                </Button>
                              )}
                              {this.errorFileSelf && (
                                <Message
                                  error
                                  content={t(
                                    "profile.updateProfile.form.verifyCUninitiatedCompany.fileNotSupported"
                                  )}
                                />
                              )}
                            </Form.Field>
                          </Segment>
                        </Form.Field>
                      </Grid.Column>
                    )}
                  </Grid.Row>
                </Grid>
              )}
          </Form>
          <Segment textAlign="center" basic>
            {message}
            {this.state.userVerifyC === "UNINITIATED" && !this.state.hiddenWarning && (
              <Message
                warning
                content={t(
                  "profile.updateProfile.form.verifyCUninitiatedPersonal.message"
                )}
              />
            )}
            {this.state.viewButton && (
              <Button
                onClick={
                  this.state.userVerifyC === "UNINITIATED"
                    ? this.showModal.bind(this)
                    : this.handleUpdateProfileModal.bind(this)
                }
                color="blue"
                name="update"
              >
                {t("profile.updateProfile.form.buttonSave")}
              </Button>
            )}
            {/* {this.state.userVerifyE === "UNINITIATED" && (
              <Button onClick={this.showModal.bind(this)} color="blue">
                {t("profile.updateProfile.form.buttonVerify")}
              </Button>
            )} */}
          </Segment>
          <Segment textAlign="center" basic>
            <Button onClick={this.handleCancel.bind(this)} basic>
              {t("profile.updateProfile.form.buttonBack")}
            </Button>
          </Segment>
        </Segment>
        <Modal open={this.state.open}>
          <Modal.Header>
            {t("profile.updateProfile.modalInitVerification.header")}
          </Modal.Header>
          <Modal.Content>
            <Segment basic loading={this.state.formLoad}>
              {
                !this.state.viewMessage&& ( <div>
                {t("profile.updateProfile.modalInitVerification.warning")}
              </div>)
              }
              {message}
            </Segment>
          </Modal.Content>
          <Modal.Actions>
            {!this.state.endsend && (
              <Button
                onClick={this.closeModal.bind(this)}
                negative
                name="update"
                disabled={this.state.formLoad}
              >
                {t("profile.updateProfile.modalInitVerification.buttonNo")}
              </Button>
            )}
            {!this.state.endsend && (
              <Button
                onClick={this.handleUpdateProfileModal.bind(this)}
                positive
                name="verify"
                disabled={this.state.formLoad}
              >
                {t("profile.updateProfile.modalInitVerification.buttonYes")}
              </Button>
            )}
            {this.state.endsend && (
              <Button onClick={this.closeModalEnd.bind(this)}>
                {t("profile.updateProfile.modalInitVerification.buttonClose")}
              </Button>
            )}
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
export default translate(UpdateProfile);
