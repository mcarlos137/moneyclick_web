import React, { Component } from "react";
import "../Recharge.css";
import {
  Header,
  Segment,
  Form,
  Grid,
  Button,
  Modal,
  Label,
  Icon,
  Message,
  Responsive,
  Divider,
  Input,
  TextArea,
  Select,
} from "semantic-ui-react";
import { isMobile } from "react-device-detect";
import Files from "react-files";
import id from "../../../img/verifyicon1.png";
import bank from "../../../img/verifyicon2.png";
import location from "../../../img/verifyicon3.png";
import selff from "../../../img/verifyiconId.png";
import userAPI from "../../../services/user";
import translate from "../../../i18n/translate";
import Resizer from "react-image-file-resizer";
import user from "../../../services/user";
import prefits from "../../../common/prefits";
class FormVerificationIdentity extends Component {
  constructor(props) {
    super(props);
    this.firstNameRef = React.createRef();
    this.lastNameRef = React.createRef();
    this.birthdateRef = React.createRef();
    this.birthdateCountryRef = React.createRef();
    this.sexRef = React.createRef();
    this.birthdateCountryRef = React.createRef();
    this.typeDocumentRef = React.createRef();
    this.otherDocumentRef = React.createRef();
    this.numberDocumentIdRef = React.createRef();
    this.directionRef = React.createRef();
    this.questionRef = React.createRef();
    this.responseRef = React.createRef();
    this.nameFamilyRef = React.createRef();
    this.emailFamilyRef = React.createRef();

    this.companyNameRef = React.createRef();
    this.yearRegistryRef = React.createRef();
    this.locationLegalRegistryRef = React.createRef();
    this.numberLocationLegalRegistryRef = React.createRef();

    this.dniRef = React.createRef();
    this.bankRef = React.createRef();
    this.locationRef = React.createRef();
    this.selfRef = React.createRef();
    this.newresice = this.newresice.bind(this);
    this.state = {
      dataPreload: null,
      firstName: "",
      lastName: "",
      userPhone: "",
      partialPhone: "",
      birthdate: "",
      birthdateCountry: "",
      //cityOfBirth: "",
      countryOfBirth: "",
      sex: "",
      sexList: [
        {
          key: "m",
          value: "male",
          text: props.translate(
            "recharge.formVerificationIdentity.sexList.male"
          ),
        },
        {
          key: "f",
          value: "female",
          text: props.translate(
            "recharge.formVerificationIdentity.sexList.female"
          ),
        },
      ],
      documentType: [
        {
          key: "i",
          value: "id",
          text: props.translate(
            "recharge.formVerificationIdentity.documentType.id"
          ),
        },
        {
          key: "dn",
          value: "dni",
          text: props.translate(
            "recharge.formVerificationIdentity.documentType.dni"
          ),
        },
        {
          key: "cd",
          value: "cedula",
          text: props.translate(
            "recharge.formVerificationIdentity.documentType.identificationCard"
          ),
        },
        {
          key: "pass",
          value: "passport",
          text: props.translate(
            "recharge.formVerificationIdentity.documentType.passport"
          ),
        },
        {
          key: "ot",
          value: "other",
          text: props.translate(
            "recharge.formVerificationIdentity.documentType.other"
          ),
        },
      ],
      email:
        this.props.configUser.email !== undefined
          ? this.props.configUser.email
          : "",
      username: this.props.configUser.name,
      typeDocument: "",
      otherDocument: "",
      numberDocumentId: "",
      isPdf: false,
      direction: "",
      question: "",
      request: "",
      nameFamily: "",
      emailFamily: "",
      userLocalBitcoin: "",
      userFacebook: "",
      idImg: id,
      addFileDni: true,
      bankImg: bank,
      addFileBank: true,
      locationImg: location,
      addFileLocation: true,
      selffImg: selff,
      addFileSelf: true,
      idFile: {},
      bankFile: {},
      locationFile: {},
      selfFile: {},
      errorFileDni: false,
      errorFileBank: false,
      errorFileLocation: false,
      errorFileSelf: false,
      messageText: "",
      errorPaymentType: false,
      errorTypeDocument: false,
      errorDocument: false,
      errorQuestion: false,
      errorResponse: false,
      errorNetwork: false,
      errorOtherTypedocument: false,
      selecteOtherFile: false,
      errorFile: false,
      arrayUserData: [],
      userData: this.props.configUser,
      identitySended: false,
      translator: props.translate,
      juridic: false,
      companyName: "",
      companyTypeOfFiscalRecord: "",
      companyNumberOfFiscalRecord: "",
      companyYearRegistration: "",
      prefit: []
    };
    this.initVerification = this.initVerification.bind(this);
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.language !== nextProps.language) {
      this.setState(
        {
          translator: nextProps.translate,
        },
        () => {
          this.setState({
            sexList: [
              {
                key: "m",
                value: "male",
                text: nextProps.translate(
                  "recharge.formVerificationIdentity.sexList.male"
                ),
              },
              {
                key: "f",
                value: "female",
                text: nextProps.translate(
                  "recharge.formVerificationIdentity.sexList.female"
                ),
              },
            ],
            documentType: [
              {
                key: "i",
                value: "id",
                text: nextProps.translate(
                  "recharge.formVerificationIdentity.documentType.id"
                ),
              },
              {
                key: "dn",
                value: "dni",
                text: nextProps.translate(
                  "recharge.formVerificationIdentity.documentType.dni"
                ),
              },
              {
                key: "cd",
                value: "cedula",
                text: nextProps.translate(
                  "recharge.formVerificationIdentity.documentType.identificationCard"
                ),
              },
              {
                key: "pass",
                value: "passport",
                text: nextProps.translate(
                  "recharge.formVerificationIdentity.documentType.passport"
                ),
              },
              {
                key: "ot",
                value: "other",
                text: nextProps.translate(
                  "recharge.formVerificationIdentity.documentType.other"
                ),
              },
            ],
          });
        }
      );
    }
  }
  componentDidMount() {
    this.validateImages(this.state.userData);
    this.setState(
      {
        prefit: prefits.country,
        dataPreLoad: userAPI.getActualUserInfo(this.state.userData),
        juridic:
          this.state.userData.company !== undefined &&
          this.state.userData.company === "true"
            ? true
            : false,
      },
      () => {
        this.setState({
            locationImg: this.state.juridic ? location : selff,
        })
        this.formatPreviusData(userAPI.getActualUserInfo(this.state.userData));
      }
    );
  }

  validateImages(userData) {
    if (userData.identityURL !== undefined) {
      this.setState({
        hasIdentityURL: true,
      });
    } else {
      this.setState({
        hasIdentityURL: false,
      });
    }
    if (userData.bankURL !== undefined) {
      this.setState({
        hasBankURL: true,
      });
    } else {
      this.setState({
        hasBankURL: false,
      });
    }
    if (userData.locationURL !== undefined) {
      this.setState({
        hasLocationURL: true,
      });
    } else {
      this.setState({
        hasLocationURL: false,
      });
    }
    if (userData.selfURL !== undefined) {
      this.setState({
        hasSelfURL: true,
      });
    } else {
      this.setState({
        hasSelfURL: false,
      });
    }
  }
  formatPreviusData(userData) {
    if (
      userData.firstName !== undefined &&
      userData.firstName.toString().trim() !== ""
    ) {
      this.setState({
        firstName: userData.firstName,
        hasFirstName: true,
      });
    }
    if (
      userData.lastName !== undefined &&
      userData.lastName.toString().trim() !== ""
    ) {
      this.setState({
        lastName: userData.lastName,
        hasLastName: true,
      });
    }
    if (
      userData.birthdate !== undefined &&
      userData.birthdate.toString().trim() !== ""
    ) {
      if(userData.birthdate.includes("T")){
        this.setState({
          birthdate: userData.birthdate.split("T")[0],
          hasBirthdate: true,
        });
        
      }else{
        this.setState({
        birthdate: userData.birthdate,
        hasBirthdate: true,
      });
      }
      
    }
    if (
      userData.gender !== undefined &&
      userData.gender.toString().trim() !== ""
    ) {
      this.setState({
        sex:
          userData.gender === "M" || userData.gender === "male"
            ? "male"
            : "female",
        hasSex: true,
      });
    } else {
      this.setState({
        sex: "male",
        hasSex: false,
      });
    }
    if (
      userData.birthplace !== undefined &&
      userData.birthplace.toString().trim() !== ""
    ) {
      this.setState({
        birthdateCountry: userData.birthplace,
        hasBirthdateCountry: true,
      });
    }

     if (
      userData.countryOfBirth !== undefined &&
      userData.countryOfBirth.toString().trim() !== ""
    ) {
      this.setState({
        countryOfBirth: userData.countryOfBirth,
        hasCountryOfBirth: true,
      });
    }

    /* if (
      userData.cityOfBirth !== undefined &&
      userData.cityOfBirth.toString().trim() !== ""
    ) {
      this.setState({
        cityOfBirth: userData.cityOfBirth,
        hasCityOfBirth: true,
      });
    }*/

    if (
      userData.userDirection !== undefined &&
      userData.userDirection.toString().trim() !== ""
    ) {
      this.setState({
        direction: userData.userDirection,
        hasDirection: true,
      });
    }
    if (
      userData.typeDocumentIdentity !== undefined &&
      userData.typeDocumentIdentity.toString().trim() !== ""
    ) {
      this.setState({
        typeDocument: userData.typeDocumentIdentity,
        selecteOtherFile: userData.typeDocumentIdentity === "other",
        hasTypeDocument: true,
      });
    } else {
      this.setState({
        typeDocument: "id",
        hasTypeDocument: false,
      });
    }
     if (
      userData.otherDocument !== undefined &&
      userData.otherDocument.toString().trim() !== ""
    ) {
      this.setState({
        otherDocument: userData.otherDocument,
        hasOtherDocument: true,
      });
    }
    if (
      userData.numberDocumentIdentity !== undefined &&
      userData.numberDocumentIdentity.toString().trim() !== ""
    ) {
      this.setState({
        numberDocumentId: userData.numberDocumentIdentity,
        hasNumberDocumentId: true,
      });
    }
    if (
      userData.questionSecurity !== undefined &&
      userData.questionSecurity.toString().trim() !== ""
    ) {
      this.setState({
        question: userData.questionSecurity,
        hasQuestion: true,
      });
    }
    if (
      userData.answerSecurity !== undefined &&
      userData.answerSecurity.toString().trim() !== ""
    ) {
      this.setState({
        request: userData.answerSecurity,
        hasRequest: true,
      });
    }
    if (
      userData.familyName !== undefined &&
      userData.familyName.toString().trim() !== ""
    ) {
      this.setState({
        nameFamily: userData.familyName,
        hasNameFamily: true,
      });
    }
    if (
      userData.familyEmail !== undefined &&
      userData.familyEmail.toString().trim() !== ""
    ) {
      this.setState({
        emailFamily: userData.familyEmail,
        hasEmailFamily: true,
      });
    }
    if (
      userData.userFacebook !== undefined &&
      userData.userFacebook.toString().trim() !== ""
    ) {
      this.setState({
        userFacebook: userData.userFacebook,
        hasUserFacebook: true,
      });
    }
    if (
      userData.userLocalBitcoin !== undefined &&
      userData.userLocalBitcoin.toString().trim() !== ""
    ) {
      this.setState({
        userLocalBitcoin: userData.userLocalBitcoin,
        hasUserLocalBitcoin: true,
      });
    }

    if (this.state.juridic) {
      if (
        userData.companyName !== undefined &&
        userData.companyName.toString().trim() !== ""
      ) {
        this.setState({
          companyName: userData.companyName,
          hasCompanyName: true,
        });
      }
      if (
        userData.companyTypeOfFiscalRecord !== undefined &&
        userData.companyTypeOfFiscalRecord.toString().trim() !== ""
      ) {
        this.setState({
          locationLegalRegistry: userData.companyTypeOfFiscalRecord,
          hasLocationLegalRegistry: true,
        });
      }
      if (
        userData.companyNumberOfFiscalRecord !== undefined &&
        userData.companyNumberOfFiscalRecord.toString().trim() !== ""
      ) {
        this.setState({
          numberLocationLegalRegistry: userData.companyNumberOfFiscalRecord,
          hasNumberLocationLegalRegistry: true,
        });
      }
      if (
        userData.companyYearRegistration !== undefined &&
        userData.companyYearRegistration.toString().trim() !== ""
      ) {
        this.setState({
          yearRegistry: userData.companyYearRegistration,
          hasYearRegistry: true,
        });
      }
    }
  }
  handleRequest(e, data) {
    this.setState({ request: e.target.value });
  }
  handleTypeDocument(e, data) {
    this.setState({
      selecteOtherFile: data.value === "other",
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
  handlefirstName(e) {
    this.setState({ firstName: e.target.value });
  }
  handleLastName(e) {
    this.setState({ lastName: e.target.value });
  }
  handlebirthdate(e, data) {
    this.setState({ birthdate: e.target.value });
  }
  handleSex(e, data) {
    this.setState({ sex: data.value });
  }
  onFilesChange(files) {
    if (files !== undefined && files.length > 0) {
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
            extension: obj.extension,
            key: "identityURL",
            file: f,
          };
          this.setState({
            idImg: obj.preview.url,
            addFileDni: false,
          });
          let ex = String(obj.extension);
          this.newresice(f, ex.toLocaleUpperCase(), "idFile", object);
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
            extension: obj.extension,
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
          extension: obj.extension,
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
  onFilesError(error, file) {
    if (error.code === 1) {
      this.setState({
        errorFileDni: true,
        textMessage:
          "recharge.formVerificationIdentity.errors.fileNotSupported",
      });
      setTimeout(() => {
        this.setState({ errorFileDni: false, textMessage: "" });
      }, 5000);
    } else {
      this.setState({
        errorFileDni: true,
        textMessage: "recharge.formVerificationIdentity.errors.fileSize",
      });
      setTimeout(() => {
        this.setState({ errorFileDni: false, textMessage: "" });
      }, 5000);
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
            extension: obj.extension,
            key: "bankURL",
            file: f,
          };
          this.setState({
            bankImg: obj.preview.url,
            addFileBank: false,
          });
          let ex = String(obj.extension);
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
            extension: obj.extension,
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
          extension: obj.extension,
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
  onFilesErrorBank(error, file) {
    if (error.code === 1) {
      this.setState({
        errorFileBank: true,
        textMessage:
          "recharge.formVerificationIdentity.errors.fileNotSupported",
      });
      setTimeout(() => {
        this.setState({ errorFileBank: false, textMessage: "" });
      }, 5000);
    } else {
      this.setState({
        errorFileBank: true,
        textMessage: "recharge.formVerificationIdentity.errors.fileSize",
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
            extension: obj.extension,
            key: "locationURL",
            file: f,
          };
          this.setState({
            locationImg: obj.preview.url,
            addFileLocation: false,
          });
          let ex = String(obj.extension);
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
            extension: obj.extension,
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
          extension: obj.extension,
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
        textMessage:
          "recharge.formVerificationIdentity.errors.fileNotSupported",
      });
      setTimeout(() => {
        this.setState({ errorFileLocation: false, textMessage: "" });
      }, 5000);
    } else {
      this.setState({
        errorFileLocation: true,
        textMessage: "recharge.formVerificationIdentity.errors.fileSize",
      });
      setTimeout(() => {
        this.setState({ errorFileLocation: false, textMessage: "" });
      }, 5000);
    }
  }
  onFilesChangeSelfie(file) {
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
            extension: obj.extension,
            key: "selfURL",
            file: f,
          };
          this.setState({
            selffImg: obj.preview.url,
            addFileSelf: false,
          });
          let ex = String(obj.extension);
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
        textMessage:
          "recharge.formVerificationIdentity.errors.fileNotSupported",
      });
      setTimeout(() => {
        this.setState({ errorFileSelf: false, textMessage: "" });
      }, 5000);
    } else {
      this.setState({
        errorFileSelf: true,
        textMessage: "recharge.formVerificationIdentity.errors.fileSize",
      });
      setTimeout(() => {
        this.setState({ errorFileSelf: false, textMessage: "" });
      }, 5000);
    }
  }
  onRemoveFile(e, data) {
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
        locationImg: location,
        addFileLocation: true,
      });
    }
    if (data.id === "file-self") {
      this.selfRef.current.removeFiles();
      this.setState({
        selfFile: {},
        selffImg: selff,
        addFileSelf: true,
      });
    }
  }

  handleCancel() {
    window.location.href = "/";
  }

  onLoadFile(e, data) {
    let validate = this.validateFormVerification();
    console.log("validate ", validate);
    if (validate) {
      this.setState({
        identitySended: true,
        formLoad: true,
      });

      let array = [
        {
          email: this.state.username,
          field: "firstName",
          data: this.state.firstName,
        },
        {
          email: this.state.username,
          field: "lastName",
          data: this.state.lastName !== "" ? this.state.lastName : " ",
        },
        {
          email: this.state.username,
          field: "answerSecurity",
          data: this.state.request !== "" ? this.state.request : " ",
        },
        {
          email: this.state.username,
          field: "questionSecurity",
          data: this.state.question,
        },
        {
          email: this.state.username,
          field: "typeDocumentIdentity",
          data: this.state.typeDocument,
        },
        {
          email: this.state.username,
          field: "numberDocumentIdentity",
          data: this.state.numberDocumentId,
        },
        {
          email: this.state.username,
          field: "gender",
          data: this.state.sex,
        },
        {
          email: this.state.username,
          field: "birthdate",
          data: this.state.birthdate,
        },
        {
          email: this.state.username,
          field: "familyName",
          data: this.state.nameFamily,
        },
        {
          email: this.state.username,
          field: "familyEmail",
          data: this.state.emailFamily,
        },
        {
          email: this.state.username,
          field: "userDirection",
          data: this.state.direction,
        },
        {
          email: this.state.username,
          field: "birthplace",
          data: this.state.birthdateCountry,
        },
        {
          email: this.state.username,
          field: "countryOfBirth",
          data: this.state.countryOfBirth,
        },
        /*{
          email: this.state.username,
          field: "cityOfBirth",
          data: this.state.cityOfBirth,
        },*/
        {
          email: this.state.username,
          field: "userLocalBitcoin",
          data: this.state.userLocalBitcoin,
        },
        {
          email: this.state.username,
          field: "userFacebook",
          data: this.state.userFacebook,
        },
      ];
      if (this.state.otherDocument !== "") { 
         array.push({
          email: this.state.username,
          field: "otherDocument",
          data: this.state.otherDocument,
        });
      }
      if (this.state.juridic) {
        array.push({
          email: this.state.username,
          field: "companyName",
          data: this.state.companyName,
        });
        array.push({
          email: this.state.username,
          field: "companyTypeOfFiscalRecord",
          data: this.state.locationLegalRegistry,
        });
        array.push({
          email: this.state.username,
          field: "companyNumberOfFiscalRecord",
          data: this.state.numberLocationLegalRegistry,
        });
        array.push({
          email: this.state.username,
          field: "companyYearRegistration",
          data: this.state.yearRegistry,
        });
      }
      this.setState({ arrayUserData: array }, () => {
        var user = {
          email: this.state.email,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          countryCode: sessionStorage.getItem("countryCode"),
          phone: sessionStorage.getItem("phone"),
          has2FAEnabled: window.sessionStorage.getItem("twoFactor"), //this.state.twoFactor
        };
        userAPI
          .updateProfile(user, userAPI.getUserName())
          .then((resp) => {
            try {
              userAPI.addInfoToUserDollarBtc(
                this.state.username,
                "firstName",
                this.state.firstName
              );
              userAPI.addInfoToUserDollarBtc(
                this.state.username,
                "lastName",
                this.state.lastName
              );
              userAPI.addInfoToUserDollarBtc(
                this.state.username,
                "phone",
                sessionStorage.getItem("countryCode") +
                  sessionStorage.getItem("phone")
              );
              sessionStorage.setItem("firstName", this.state.firstName);
              sessionStorage.setItem("lastName", this.state.lastName);
              let cont = 0;
              this.addDataUser(
                this.state.arrayUserData[0],
                this.state.arrayUserData,
                cont
              );
            } catch (error) {
              this.tryCatch(error);
            }
          })
          .catch((error) => {
            this.tryCatch(error);
          });
      });
    }
  }

  tryCatch(error) {
    let e = error.toString();
    if (e.includes("Network")) {
      ////console.log(error)
      this.setState({
        errorNetwork: true,
        textMessage: "recharge.formVerificationIdentity.errors.errorNetwork",
        identitySended: false,
        formLoad: false,
      });

      setTimeout(() => {
        this.setState({
          errorNetwork: false,
          textMessage: "",
        });
      }, 4000);
    }
  }
  async addDataUser(objnw, arra, contaaa) {
    let keys = [];
    keys = Object.keys(this.state.userData);
    for (let data of arra) {
      let body = {
        userName: this.state.username,
        fieldName: data.field,
        fieldValue: data.data,
      };
      if (keys.indexOf(data.field) === -1) {
        await this.addDataUserAsync(body);
      } else {
        await this.updateDataUser(body);
      }
    }
    this.onLoadFileSend();
  }
  async addDataUserAsync(body) {
    try {
      let response = await userAPI.addDataUserAsync(body);
      if (response.data !== "OK") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      this.tryCatch(error);
      return false;
    }
  }
  async updateDataUser(body) {
    try {
      let response = await userAPI.updateUserData(body);
      if (response.data !== "ok") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      this.tryCatch(error);
      return false;
    }
  }
  onLoadFileSend() {
    let array = [];
    let formData = new FormData();
    let username = window.sessionStorage.getItem("username");
    if (!this.state.hasIdentityURL) {
      formData.append(
        "attachment",
        this.state.idFile.file,
        this.state.idFile.name
      );
      formData.append("userName", username);
      formData.append("fieldName", "identityURL");
      array.push(formData);
    }

    if (!this.state.hasBankURL) {
      let formDataBank = new FormData();
      formDataBank.append(
        "attachment",
        this.state.bankFile.file,
        this.state.bankFile.name
      );
      formDataBank.append("userName", username);
      formDataBank.append("fieldName", "bankURL");
      array.push(formDataBank);
    }

    if (!this.state.hasLocationURL) {
      let formDataLocation = new FormData();
      formDataLocation.append(
        "attachment",
        this.state.locationFile.file,
        this.state.locationFile.name
      );
      formDataLocation.append("userName", username);
      formDataLocation.append("fieldName", "locationURL");
      array.push(formDataLocation);
    }
    if (this.state.juridic && !this.state.hasSelfURL) {
      let formDataSelfie = new FormData();
      formDataSelfie.append(
        "attachment",
        this.state.selfFile.file,
        this.state.selfFile.name
      );
      formDataSelfie.append("userName", username);
      formDataSelfie.append("fieldName", "selfURL");
      array.push(formDataSelfie);
    }
    let cont = 0;
    setTimeout(() => {
      if (array.length > 0) {
        this.sendFiles(array[0], cont, array);
      } else {
        this.initVerification();
      }
    }, 2000);
  }

  sendSimpleFile(formdata) {
    let config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    /*var url = "https://service8081.dollarbtc.com/userAddAttachment";
    Axios.post(url, formdata, config)*/
    console.log('formdata ', formdata);
    let url = userAPI.userAddAttachment(formdata);
    url
      .then((resp) => {
        //console.log(resp);
      })
      .catch((error) => {
        this.tryCatch(error);
      });
  }
  sendFiles(formdata, cont, array) {
    let config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    let url = userAPI.userAddAttachment(formdata);
    let limit = array.length;
    if (cont <= limit) {
      url
        .then((res) => {
          cont = cont + 1;

          this.sendFiles(array[cont], cont, array);
          this.setState({ contSend: this.state.contSend + 1 }, () => {});
        })
        .catch((error) => {
          let e = error.toString();

          if (e.includes("Network")) {
            this.setState({
              identitySended: false,
              formLoad: false,
              errorNetwork: true,
              textMessage:
                "recharge.formVerificationIdentity.errors.errorNetwork",
            });

            setTimeout(() => {
              this.setState({
                errorNetwork: false,
                textMessage: "",
              });
            }, 4000);
          } else {
            cont = cont + 1;
            this.sendFiles(array[cont], cont, array);
          }
        });
    } else {
      this.initVerification();
    }
  }

  initVerification() {
    let fields = [];
    if (!this.state.juridic) {
      fields = [
        "identityURL",
        "bankURL",
        "locationURL",
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
        "userDirection",
      ];
      if (this.state.otherDocument !== "") { 
        fields.push(
          "otherDocument"
        );
      }
    } else {
      fields = [
        "identityURL",
        "bankURL",
        "locationURL",
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
        "userDirection",
        "companyName",
        "companyTypeOfFiscalRecord",
        "companyNumberOfFiscalRecord",
        "companyYearRegistration",
      ];
       if (this.state.otherDocument !== "") { 
        fields.push(
          "otherDocument"
        );
      }
    }
    let body = {
      userName: window.sessionStorage.getItem("username"),
      fieldNames: fields,
      userVerificationType: "C",
      info: "Initial verification user account",
    };
    let url = userAPI.verifyUserRequestCore(body);
    url
      .then((rep) => {
        ////console.log(rep);
        if (rep.data !== "OK") {
          this.setState({
            formLoad: false,
          });
          let s = rep.data.split("USER DOES NOT HAVE FIELDNAME ");
          try {
            if (s[1] === "firstName") {
              userAPI.addInfoToUserDollarBtc(
                this.state.username,
                "firstName",
                this.state.firstName
              );
              setTimeout(() => {
                this.initVerification();
              }, 5000);
            }
            if (s[1] === "lastName") {
              userAPI.addInfoToUserDollarBtc(
                this.state.username,
                "lastName",
                this.state.lastName
              );
              setTimeout(() => {
                this.initVerification();
              }, 5000);
            }
            if (s[1] === "phone") {
              userAPI.addInfoToUserDollarBtc(
                this.state.username,
                "phone",
                this.state.partialPhone + this.state.partialNumber
              );
              setTimeout(() => {
                this.initVerification();
              }, 5000);
            }
            if (s[1] === "questionSecurity") {
              userAPI.addInfoToUserDollarBtc(
                this.state.username,
                "questionSecurity",
                this.state.question
              );
              setTimeout(() => {
                this.initVerification();
              }, 5000);
            }
            if (s[1] === "answerSecurity") {
              userAPI.addInfoToUserDollarBtc(
                this.state.username,
                "answerSecurity",
                this.state.request
              );
              setTimeout(() => {
                this.initVerification();
              }, 5000);
            }
            if (s[1] === "typeDocumentIdentity") {
              userAPI.addInfoToUserDollarBtc(
                this.state.username,
                "typeDocumentIdentity",
                this.state.typeDocument
              );
              setTimeout(() => {
                this.initVerification();
              }, 5000);
            }
             if (s[1] === "otherDocument") {
              userAPI.addInfoToUserDollarBtc(
                this.state.username,
                "otherDocument",
                this.state.otherDocument
              );
              setTimeout(() => {
                this.initVerification();
              }, 5000);
            }
            if (s[1] === "numberDocumentIdentity") {
              userAPI.addInfoToUserDollarBtc(
                this.state.username,
                "numberDocumentIdentity",
                this.state.numberDocumentId
              );
              setTimeout(() => {
                this.initVerification();
              }, 5000);
            }
            if (s[1] === "gender") {
              userAPI.addInfoToUserDollarBtc(
                this.state.username,
                "gender",
                this.state.sex
              );
              setTimeout(() => {
                this.initVerification();
              }, 5000);
            }
            if (s[1] === "birthdate") {
              userAPI.addInfoToUserDollarBtc(
                this.state.username,
                "birthdate",
                this.state.birthdate
              );
              setTimeout(() => {
                this.initVerification();
              }, 5000);
            }
            if (s[1] === "birthplace") {
              userAPI.addInfoToUserDollarBtc(
                this.state.username,
                "birthplace",
                this.state.birthdateCountry
              );
              setTimeout(() => {
                this.initVerification();
              }, 5000);
            }

            if (s[1] === "countryOfBirth") {
              userAPI.addInfoToUserDollarBtc(
                this.state.username,
                "countryOfBirth",
                this.state.countryOfBirth
              );
              setTimeout(() => {
                this.initVerification();
              }, 5000);
            }

            /*if (s[1] === "cityOfBirth") {
              userAPI.addInfoToUserDollarBtc(
                this.state.username,
                "cityOfBirth",
                this.state.cityOfBirth
              );
              setTimeout(() => {
                this.initVerification();
              }, 5000);
            }*/

            if (s[1] === "familyName") {
              userAPI.addInfoToUserDollarBtc(
                this.state.username,
                "familyName",
                this.state.nameFamily
              );
              setTimeout(() => {
                this.initVerification();
              }, 5000);
            }
            if (s[1] === "familyEmail") {
              userAPI.addInfoToUserDollarBtc(
                this.state.username,
                "familyEmail",
                this.state.emailFamily
              );
              setTimeout(() => {
                this.initVerification();
              }, 5000);
            }
            if (s[1] === "userLocalBitcoin") {
              userAPI.addInfoToUserDollarBtc(
                this.state.username,
                "userLocalBitcoin",
                this.state.userLocalBitcoin
              );
              setTimeout(() => {
                this.initVerification();
              }, 5000);
            }
            if (s[1] === "userFacebook") {
              userAPI.addInfoToUserDollarBtc(
                this.state.username,
                "userFacebook",
                this.state.userFacebook
              );
              setTimeout(() => {
                this.initVerification();
              }, 5000);
            }
            if (s[1] === "userDirection") {
              userAPI.addInfoToUserDollarBtc(
                this.state.username,
                "userDirection",
                this.state.direction
              );
              setTimeout(() => {
                this.initVerification();
              }, 5000);
            }
            if (s[1] === "companyName") {
              userAPI.addInfoToUserDollarBtc(
                this.state.username,
                "companyName",
                this.state.direction
              );
              setTimeout(() => {
                this.initVerification();
              }, 5000);
            }
            if (s[1] === "companyTypeOfFiscalRecord") {
              userAPI.addInfoToUserDollarBtc(
                this.state.username,
                "companyTypeOfFiscalRecord",
                this.state.direction
              );
              setTimeout(() => {
                this.initVerification();
              }, 5000);
            }
            if (s[1] === "companyYearRegistration") {
              userAPI.addInfoToUserDollarBtc(
                this.state.username,
                "companyYearRegistration",
                this.state.direction
              );
              setTimeout(() => {
                this.initVerification();
              }, 5000);
            }
            if (s[1] === "companyNumberOfFiscalRecord") {
              userAPI.addInfoToUserDollarBtc(
                this.state.username,
                "companyNumberOfFiscalRecord",
                this.state.direction
              );
              setTimeout(() => {
                this.initVerification();
              }, 5000);
            }
            if (s[1] === "identityURL") {
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
              formData.append("fieldName", "identityURL");
              this.sendSimpleFile(formData);
            }
            if (s[1] === "bankURL") {
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
              formDataBank.append("fieldName", "bankURL");
              this.sendSimpleFile(formDataBank);
            }
            if (s[1] === "locationURL") {
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
              formDataLocation.append("fieldName", "locationURL");
              this.sendSimpleFile(formDataLocation);
            }
            if (s[1] === "selfURL" && this.state.juridic) {
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
              formDataSelfie.append("fieldName", "selfURL");
              this.sendSimpleFile(formDataSelfie);
            }
          } catch (error) {
            this.tryCatch(error);
          }
        } else {
          ////console.log("el servicio no es OK")
          var num = Math.floor(Math.random() * 100);
          this.props.handleToUpdate(num);
          this.setState({ formLoad: false, endsend: true });
          this.setState({
            viewMessage: true,
            textMessage: "recharge.formVerificationIdentity.successFilesFiles",
            idFile: {},
            bankFile: {},
            locationFile: {},
            selfFile: {},
          });
          this.selfRef.current.removeFiles();
          this.setState({
            selfFile: {},
            selffImg: selff,
            addFileSelf: true,
          });
          this.locationRef.current.removeFiles();
          this.setState({
            locationFile: {},
            locationImg: this.state.juridic ? location : selff,
            addFileLocation: true,
          });
          this.bankRef.current.removeFiles();
          this.setState({
            bankFile: {},
            bankImg: bank,
            addFileBank: true,
          });
          this.dniRef.current.removeFiles();
          this.setState({
            idFile: {},
            idImg: id,
            addFileDni: true,
          });
        }
      })
      .catch((error) => {
        this.tryCatch(error);
      });
  }
  validateFormVerification() {
    if (this.state.firstName === "") {
      this.firstNameRef.current.focus();
      this.setState({
        errorFirstName: true,
        textMessage: "recharge.formVerificationIdentity.errors.requiredField",
      });
      setTimeout(() => {
        this.setState({
          errorFirstName: false,
          textMessage: "",
        });
      }, 5000);
      return false;
    } else if (this.state.lastName === "") {
      this.lastNameRef.current.focus();
      this.setState({
        errorLastName: true,
        textMessage: "recharge.formVerificationIdentity.errors.requiredField",
      });
      setTimeout(() => {
        this.setState({
          errorLastName: false,
          textMessage: "",
        });
      }, 5000);
      return false;
    } else if (this.state.birthdate === "") {
      this.birthdateRef.current.focus();
      this.setState({
        errorBirthdate: true,
        textMessage: "recharge.formVerificationIdentity.errors.requiredField",
      });
      setTimeout(() => {
        this.setState({
          errorBirthdate: false,
          textMessage: "",
        });
      }, 5000);
      return false;
    } else if (this.state.birthdateCountry === "") {
      this.birthdateCountryRef.current.focus();
      this.setState({
        errorBirthdateCountry: true,
        textMessage: "recharge.formVerificationIdentity.errors.requiredField",
      });
      setTimeout(() => {
        this.setState({
          errorBirthdateCountry: false,
          textMessage: "",
        });
      }, 5000);
      return false;
    } else if (this.state.direction === "") {
      this.directionRef.current.focus();
      this.setState({
        errorDirection: true,
        textMessage: "recharge.formVerificationIdentity.errors.requiredField",
      });
      setTimeout(() => {
        this.setState({
          errorDirection: false,
          textMessage: "",
        });
      }, 5000);
      return false;
    } else if (
      this.state.typeDocument === "other" &&
      this.state.otherDocument === ""
    ) {
      this.otherDocumentRef.current.focus();
      this.setState({
        errorOtherTypedocument: true,
        textMessage:
          "recharge.formVerificationIdentity.errors.emptyIDNumberType",
      });
      setTimeout(() => {
        this.setState({
          errorOtherTypedocument: false,
          textMessage: "",
        });
      }, 5000);
      return false;
    } else if (this.state.numberDocumentId === "") {
      this.numberDocumentIdRef.current.focus();
      this.setState({
        errorDocument: true,
        textMessage: "recharge.formVerificationIdentity.errors.emptyIDNumber",
      });
      setTimeout(() => {
        this.setState({
          errorDocument: false,
          textMessage: "",
        });
      }, 5000);
      return false;
    } else if (
      this.state.idFile.file === undefined &&
      !this.state.hasIdentityURL
    ) {
      this.setState({
        viewMessage: true,
        errorFileDni: true,
        textMessage: "recharge.formVerificationIdentity.errors.missingFiles",
      });
      setTimeout(() => {
        this.setState({ errorFileDni: false, textMessage: "" });
      }, 5000);
      return false;
    } else if (
      this.state.bankFile.file === undefined &&
      !this.state.hasBankURL
    ) {
      this.setState({
        viewMessage: true,
        errorFileBank: true,
        textMessage: "recharge.formVerificationIdentity.errors.missingFiles",
      });
      setTimeout(() => {
        this.setState({ errorFileBank: false, textMessage: "" });
      }, 5000);
      return false;
    } else if (
      this.state.locationFile.file === undefined &&
      !this.state.hasLocationURL
    ) {
      this.setState({
        viewMessage: true,
        errorFileLocation: true,
        textMessage: "recharge.formVerificationIdentity.errors.missingFiles",
      });
      setTimeout(() => {
        this.setState({ errorFileLocation: false, textMessage: "" });
      }, 5000);
      return false;
    } else if (
      this.state.selfFile.file === undefined &&
      !this.state.hasSelfURL && this.state.juridic
    ) {
      this.setState({
        viewMessage: true,
        errorFileSelf: true,
        textMessage: "recharge.formVerificationIdentity.errors.missingFiles",
      });
      setTimeout(() => {
        this.setState({ errorFileSelf: false, textMessage: "" });
      }, 5000);
      return false;
    } else if (
      this.state.juridic &&
      this.state.companyName.toString().trim() === ""
    ) {
      this.companyNameRef.current.focus();
      this.setState({
        errorCompanyName: true,
        textMessage: "recharge.formVerificationIdentity.errors.requiredField",
      });
      setTimeout(() => {
        this.setState({
          errorCompanyName: false,
          textMessage: "",
        });
      }, 5000);
      return false;
    } else if (
      this.state.juridic &&
      this.state.yearRegistry.toString().trim() === ""
    ) {
      this.yearRegistryRef.current.focus();
      this.setState({
        errorYearRegistry: true,
        textMessage: "recharge.formVerificationIdentity.errors.requiredField",
      });
      setTimeout(() => {
        this.setState({
          errorYearRegistry: false,
          textMessage: "",
        });
      }, 5000);
      return false;
    } else if (
      this.state.juridic &&
      this.state.locationLegalRegistry.toString().trim() === ""
    ) {
      this.locationLegalRegistryRef.current.focus();
      this.setState({
        errorLocationLegalRegistry: true,
        textMessage: "recharge.formVerificationIdentity.errors.requiredField",
      });
      setTimeout(() => {
        this.setState({
          errorLocationLegalRegistry: false,
          textMessage: "",
        });
      }, 5000);
      return false;
    } else if (
      this.state.juridic &&
      this.state.numberLocationLegalRegistry.toString().trim() === ""
    ) {
      this.numberLocationLegalRegistryRef.current.focus();
      this.setState({
        errorNumberLocationLegalRegistry: true,
        textMessage: "recharge.formVerificationIdentity.errors.requiredField",
      });
      setTimeout(() => {
        this.setState({
          errorNumberLocationLegalRegistry: false,
          textMessage: "",
        });
      }, 5000);
      return false;
    }
    return true;
  }

  handlebirthdateCountry(e, data) {
    this.setState({ birthdateCountry: e.target.value });
  }

  handleUserLocalBitcoin(e, data) {
    this.setState({ userLocalBitcoin: e.target.value });
  }
  handleUserFacebook(e, data) {
    this.setState({ userFacebook: e.target.value });
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
        this.setState({ [target]: ob }, () => {
          //////console.log(this.state.idFile);
        });
        //  //////console.log(uri, ob);
      },
      "blob"
    );
  }

   handleCountryOfBirth(e, data) {
    this.setState({ countryOfBirth: data.value });
  }

  /* handleCityOfBirth(e, data) {
    this.setState({ cityOfBirth: e.target.value });
  }*/

  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery });
  
  render() {
    let t = this.state.translator;
    let errorFirstName,
      errorLastName,
      errorBirthdate,
      errorBirthdateCountry,
      errorSex,
      errorTypeDocument,
      errorDocument,
      errorDirection,
      errorQuestion,
      errorNameFamily,
      errorEmailFamily,
      errorOtherTypedocument,
      errorResponse,
      errorNetwork,
      errorCompanyName,
      errorYearRegistry,
      errorLocationLegalRegistry,
      errorNumberLocationLegalRegistry;
    let messageErrorDNI,
      messageErrorBANK,
      messageErrorLOCATION,
      messageErrorSELF;

     let list = [];
    if (this.state.prefit.length > 0) {
      for (let pre of this.state.prefit) {
        if (pre.value !== "") {
          list.push({
            text:
              window.sessionStorage.getItem("language") === "es"
                ? pre.nombre + " (+" + pre.value + ")"
                : pre.text + " (+" + pre.value + ")",
            value: window.sessionStorage.getItem("language") === "es"
                ? pre.nombre
                : pre.text,
            key: pre.iso2,
          });
        }
      }
    }

    if (this.state.errorFirstName) {
      errorFirstName = (
        <Label basic color="red" pointing>
          {t(this.state.textMessage)}
        </Label>
      );
    }
    if (this.state.errorLastName) {
      errorLastName = (
        <Label basic color="red" pointing>
          {t(this.state.textMessage)}
        </Label>
      );
    }
    if (this.state.errorBirthdate) {
      errorBirthdate = (
        <Label basic color="red" pointing>
          {t(this.state.textMessage)}
        </Label>
      );
    }
    if (this.state.errorSex) {
      errorSex = (
        <Label basic color="red" pointing>
          {t(this.state.textMessage)}
        </Label>
      );
    }
    if (this.state.errorBirthdateCountry) {
      errorBirthdateCountry = (
        <Label basic color="red" pointing>
          {t(this.state.textMessage)}
        </Label>
      );
    }
    if (this.state.errorDirection) {
      errorDirection = (
        <Label basic color="red" pointing>
          {t(this.state.textMessage)}
        </Label>
      );
    }
    if (this.state.errorTypeDocument) {
      errorTypeDocument = (
        <Label basic color="red" pointing>
          {t(this.state.textMessage)}
        </Label>
      );
    }
    if (this.state.errorOtherTypedocument) {
      errorOtherTypedocument = (
        <Label basic color="red" pointing>
          {t(this.state.textMessage)}
        </Label>
      );
    }
    if (this.state.errorDocument) {
      errorDocument = (
        <Label basic color="red" pointing>
          {t(this.state.textMessage)}
        </Label>
      );
    }

    if (this.state.errorNameFamily) {
      errorNameFamily = (
        <Label basic color="red" pointing>
          {t(this.state.textMessage)}
        </Label>
      );
    }
    if (this.state.errorEmailFamily) {
      errorEmailFamily = (
        <Label basic color="red" pointing>
          {t(this.state.textMessage)}
        </Label>
      );
    }
    if (this.state.errorQuestion) {
      errorQuestion = (
        <Label basic color="red" pointing>
          {t(this.state.textMessage)}
        </Label>
      );
    }
    if (this.state.errorResponse) {
      errorResponse = (
        <Label basic color="red" pointing>
          {t(this.state.textMessage)}
        </Label>
      );
    }

    if (this.state.errorFileDni) {
      messageErrorDNI = (
        <Label basic color="red" pointing>
          {t(this.state.textMessage)}
        </Label>
      );
    }
    if (this.state.errorFileBank) {
      messageErrorBANK = (
        <Label basic color="red" pointing>
          {t(this.state.textMessage)}
        </Label>
      );
    }
    if (this.state.errorFileLocation) {
      messageErrorLOCATION = (
        <Label basic color="red" pointing>
          {t(this.state.textMessage)}
        </Label>
      );
    }
    if (this.state.errorFileSelf) {
      messageErrorSELF = (
        <Label basic color="red" pointing>
          {t(this.state.textMessage)}
        </Label>
      );
    }

    if (this.state.errorCompanyName) {
      errorCompanyName = (
        <Label basic color="red" pointing>
          {t(this.state.textMessage)}
        </Label>
      );
    }

    if (this.state.errorYearRegistry) {
      errorYearRegistry = (
        <Label basic color="red" pointing>
          {t(this.state.textMessage)}
        </Label>
      );
    }
    if (this.state.errorLocationLegalRegistry) {
      errorLocationLegalRegistry = (
        <Label basic color="red" pointing>
          {t(this.state.textMessage)}
        </Label>
      );
    }
    if (this.state.errorNumberLocationLegalRegistry) {
      errorNumberLocationLegalRegistry = (
        <Label basic color="red" pointing>
          {t(this.state.textMessage)}
        </Label>
      );
    }
    return (
      <div>
        <Grid divided>
          <Grid.Row centered>
            <Grid.Column largeScreen={16} tablet={16} mobile={16} computer={16}>
              <Segment basic={isMobile} loading={this.state.formLoad}>
                <Form>
                  <Form.Group>
                    <Form.Field width={8} required>
                      <label>
                        {t("recharge.formVerificationIdentity.form.name")}
                      </label>
                      <Input
                        ref={this.firstNameRef}
                        placeholder={t(
                          "recharge.formVerificationIdentity.form.placeholderName"
                        )}
                        value={this.state.firstName}
                        onChange={this.handlefirstName.bind(this)}
                        disabled={this.state.hasFirstName}
                      />
                      {errorFirstName}
                    </Form.Field>
                    <Form.Field width={8} required>
                      <label>
                        {t("recharge.formVerificationIdentity.form.lastName")}
                      </label>
                      <Input
                        ref={this.lastNameRef}
                        placeholder={t(
                          "recharge.formVerificationIdentity.form.placeholderLastName"
                        )}
                        value={this.state.lastName}
                        onChange={this.handleLastName.bind(this)}
                        disabled={this.state.hasLastName}
                      />
                      {errorLastName}
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>
                    <Form.Field width={8} required>
                      <label>
                        {t("recharge.formVerificationIdentity.form.birthday")}
                      </label>
                      <Input
                        ref={this.birthdateRef}
                        type="date"
                        value={this.state.birthdate}
                        onChange={this.handlebirthdate.bind(this)}
                        disabled={this.state.hasBirthdate}
                      />
                      {errorBirthdate}
                    </Form.Field>
                    <Form.Field width={8} required>
                      <label>
                        {t("recharge.formVerificationIdentity.form.sex")}
                      </label>
                      <Select
                        ref={this.sexRef}
                        className="inputStyle"
                        placeholder={t(
                          "recharge.formVerificationIdentity.form.placeholderSex"
                        )}
                        options={this.state.sexList}
                        onChange={this.handleSex.bind(this)}
                        value={this.state.sex}
                        disabled={this.state.hasSex}
                      />
                      {errorSex}
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>
                    <Form.Dropdown
                      label={t("profile.updateProfile.form.countryOfBirth")}
                      placeholder={t('login.country')}
                      fluid
                      search
                      selection
                      width={8}
                      options={list}
                      value={this.state.countryOfBirth}
                      onChange={this.handleCountryOfBirth.bind(this)}
                      onSearchChange={this.handleSearchChange.bind(this)}
                      disabled={this.state.hasCountryOfBirth}
                    />
                      <Form.Field width={8} required>
                      <label>
                        {t("recharge.formVerificationIdentity.form.birthplace")}
                      </label>
                      <TextArea
                        rows={ 1}
                        width={16}
                        ref={this.birthdateCountryRef}
                        value={this.state.birthdateCountry}
                        onChange={this.handlebirthdateCountry.bind(this)}
                        disabled={this.state.hasBirthdateCountry}
                      />
                      {errorBirthdateCountry}
                    </Form.Field>
                    {/*<Form.Input
                      required
                      width={8}
                      label={t("profile.updateProfile.form.cityOfBirth")}
                      value={this.state.cityOfBirth}
                      onChange={this.handleCityOfBirth.bind(this)}
                        disabled={this.state.hasCityOfBirth}
                    />*/}
                  </Form.Group>

                  <Form.Group>
                  
                    <Form.Field width={16} required>
                      <label>
                        {this.state.juridic === true
                          ? t("profile.updateProfile.form.addressCompany")
                          : t("profile.updateProfile.form.addressPersonal")}
                      </label>
                      <TextArea
                        width={16}
                        ref={this.directionRef}
                        value={this.state.direction}
                        onChange={this.handleDirection.bind(this)}
                        disabled={this.state.hasDirection}
                      />
                      {errorDirection}
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>
                    <Form.Field
                      width={this.state.typeDocument !== "other" ? 8 : 6}
                      required
                    >
                      <label>
                        {t(
                          "recharge.formVerificationIdentity.form.documentType"
                        )}
                      </label>
                      <Select
                        ref={this.typeDocumentRef}
                        placeholder={t(
                          "recharge.formVerificationIdentity.form.placeholderDocumentType"
                        )}
                        options={this.state.documentType}
                        onChange={this.handleTypeDocument.bind(this)}
                        value={this.state.typeDocument}
                        disabled={this.state.hasTypeDocument}
                      />
                      {errorTypeDocument}
                    </Form.Field>
                    {this.state.selecteOtherFile && (
                      <Form.Field width={5} required>
                        <label>
                          {t("recharge.formVerificationIdentity.form.other")}
                        </label>
                        <Input
                          ref={this.otherDocumentRef}
                          value={this.state.otherDocument}
                          onChange={this.handleOtherTypeDocument.bind(this)}
                          disabled={this.state.hasOtherDocument}
                        />
                        {errorOtherTypedocument}
                      </Form.Field>
                    )}
                    <Form.Field
                      width={this.state.typeDocument !== "other" ? 8 : 5}
                      required
                    >
                      <label>
                        {t("recharge.formVerificationIdentity.form.numberId")}
                      </label>
                      <Input
                        ref={this.numberDocumentIdRef}
                        value={this.state.numberDocumentId}
                        onChange={this.handleNumberDocumentId.bind(this)}
                        disabled={this.state.hasNumberDocumentId}
                      />
                      {errorDocument}
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>
                    <Form.Field width={8}>
                      <label>
                        {this.state.juridic
                          ? t(
                              "recharge.formVerificationIdentity.form.contactCompany"
                            )
                          : t(
                              "recharge.formVerificationIdentity.form.contactFamily"
                            )}
                      </label>
                      <Input
                        ref={this.nameFamilyRef}
                        value={this.state.nameFamily}
                        onChange={this.handleNameFamily.bind(this)}
                        disabled={this.state.hasNameFamily}
                      />
                      {errorNameFamily}
                    </Form.Field>
                    <Form.Field width={8}>
                      <label>
                        {t(
                          "recharge.formVerificationIdentity.form.contactEmailFamily"
                        )}
                      </label>
                      <Input
                        ref={this.emailFamilyRef}
                        width={8}
                        value={this.state.emailFamily}
                        placeholder="Email "
                        type="email"
                        onChange={this.handleEmailFamily.bind(this)}
                        disabled={this.state.hasEmailFamily}
                      />
                      {errorEmailFamily}
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>
                    <Form.Field width={8}>
                      <label>
                        {t(
                          "recharge.formVerificationIdentity.form.securityQuestion"
                        )}
                      </label>
                      <Input
                        ref={this.questionRef}
                        value={this.state.question}
                        onChange={this.handleQuestion.bind(this)}
                        disabled={this.state.hasQuestion}
                      />
                      {errorQuestion}
                    </Form.Field>
                    <Form.Field width={8}>
                      <label>
                        {t(
                          "recharge.formVerificationIdentity.form.securityAnswer"
                        )}
                      </label>
                      <Input
                        ref={this.responseRef}
                        value={this.state.request}
                        onChange={this.handleRequest.bind(this)}
                        disabled={this.state.hasRequest}
                      />
                      {errorResponse}
                    </Form.Field>
                  </Form.Group>
                  {this.state.juridic && (
                    <div>
                      <Form.Group>
                        <Form.Field width={8}>
                          <label>
                            {t(
                              "recharge.formVerificationIdentity.form.verifyCUninitiatedCompany.name"
                            )}
                          </label>
                          <Input
                            ref={this.companyNameRef}
                            value={this.state.companyName}
                            onChange={this.handleCompanyName.bind(this)}
                            disabled={this.state.hasCompanyName}
                          />
                          {errorCompanyName}
                        </Form.Field>
                        <Form.Field width={8}>
                          <label>
                            {t(
                              "recharge.formVerificationIdentity.form.verifyCUninitiatedCompany.registerYear"
                            )}
                          </label>
                          <Input
                            ref={this.yearRegistryRef}
                            label={t()}
                            value={this.state.yearRegistry}
                            onChange={this.handleYearRegistryCompany.bind(this)}
                            disabled={this.state.hasYearRegistry}
                          />
                          {errorYearRegistry}
                        </Form.Field>
                      </Form.Group>
                      <Form.Group>
                        <Form.Field width={8}>
                          <label>
                            {t(
                              "recharge.formVerificationIdentity.form.verifyCUninitiatedCompany.registerFiscalType"
                            )}
                          </label>
                          <Input
                            ref={this.locationLegalRegistryRef}
                            value={this.state.locationLegalRegistry}
                            onChange={this.handleTypeRegistryLegaly.bind(this)}
                            disabled={this.state.hasLocationLegalRegistry}
                          />
                          {errorLocationLegalRegistry}
                        </Form.Field>
                        <Form.Field width={8}>
                          <label>
                            {t(
                              "recharge.formVerificationIdentity.form.verifyCUninitiatedCompany.registerFiscalNumber"
                            )}
                          </label>
                          <Input
                            ref={this.numberLocationLegalRegistryRef}
                            value={this.state.numberLocationLegalRegistry}
                            onChange={this.handleNumberRegistryLegaly.bind(
                              this
                            )}
                            disabled={this.state.hasNumberLocationLegalRegistry}
                          />
                          {errorNumberLocationLegalRegistry}
                        </Form.Field>
                      </Form.Group>
                      {(!this.state.hasIdentityURL ||
                    !this.state.hasLocationURL ||
                    !this.state.hasBankURL ||
                    (this.state.juridic && !this.state.hasSelfURL)) && (
                    <div>
                      <div
                        style={{
                          width: "100%",
                          marginTop: "20px",
                          textAlign: "center",
                        }}
                      >
                        {this.state.juridic
                          ? t(
                              "recharge.formVerificationIdentity.form.verifyCUninitiatedCompany.messageFile"
                            )
                          : t(
                              "recharge.formVerificationIdentity.form.verifyCUninitiatedPersonal.messageFile"
                            )}
                      </div>
                      <div
                        style={{
                          marginTop: "10px",
                          textAlign: "center",
                          marginBottom: 20,
                        }}
                      >
                        {this.state.juridic
                          ? t(
                              "recharge.formVerificationIdentity.form.verifyCUninitiatedCompany.supportedTypeFiles"
                            )
                          : t(
                              "recharge.formVerificationIdentity.form.verifyCUninitiatedPersonal.supportedTypeFiles"
                            )}
                      </div>
                    </div>
                    )}
                      <Grid centered>
                        <Grid.Row centered>
                          {!this.state.hasIdentityURL && (
                            <Grid.Column
                              width={isMobile ? 16 : 4}
                              textAlign={"center"}
                            >
                              <Segment placeholder className="sizeSement">
                                <Files
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
                                        {this.state.idFile.name}
                                      </p>
                                    )}
                                    {this.state.idFile.name === undefined && (
                                      <p style={{ fontSize: "11px" }}>
                                        {t(
                                          "recharge.formVerificationIdentity.form.verifyCUninitiatedCompany.documentID"
                                        )}
                                      </p>
                                    )}
                                    {messageErrorDNI}
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
                                      "recharge.formVerificationIdentity.form.verifyCUninitiatedCompany.buttonChange"
                                    )}
                                  </Button>
                                )}
                                {this.errorFileDni && (
                                  <Message
                                    error
                                    content={t(
                                      "recharge.formVerificationIdentity.form.verifyCUninitiatedCompany.fileNotSupported"
                                    )}
                                  />
                                )}
                                <br />
                              </Segment>
                            </Grid.Column>
                          )}

                          {!this.state.hasBankURL && (
                            <Grid.Column
                              width={isMobile ? 16 : 4}
                              textAlign={"center"}
                            >
                              <Segment placeholder className="sizeSement">
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
                                    {this.state.bankFile.extension !==
                                      "pdf" && (
                                      <img
                                        alt=""
                                        src={this.state.bankImg}
                                        className="imageFileV"
                                      />
                                    )}

                                    {this.state.bankFile.extension ===
                                      "pdf" && (
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
                                        {this.state.bankFile.name}
                                      </p>
                                    )}
                                    {this.state.bankFile.name === undefined && (
                                      <p style={{ fontSize: "11px" }}>
                                        {t(
                                          "recharge.formVerificationIdentity.form.verifyCUninitiatedCompany.bankAccountSupport"
                                        )}
                                      </p>
                                    )}
                                    {messageErrorBANK}
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
                                      "recharge.formVerificationIdentity.form.verifyCUninitiatedCompany.buttonChange"
                                    )}
                                  </Button>
                                )}
                                {this.errorFileBank && (
                                  <Message
                                    error
                                    content={t(
                                      "recharge.formVerificationIdentity.form.verifyCUninitiatedCompany.fileNotSupported"
                                    )}
                                  />
                                )}
                              </Segment>
                            </Grid.Column>
                          )}
                          {!this.state.hasLocationURL && (
                            <Grid.Column
                              width={isMobile ? 16 : 4}
                              textAlign={"center"}
                            >
                              <Segment placeholder className="sizeSement">
                                <Files
                                  className="files-dropzone"
                                  ref={this.locationRef}
                                  onChange={this.onFilesChangeLocation.bind(
                                    this
                                  )}
                                  onError={this.onFilesErrorLocation.bind(this)}
                                  accepts={["image/*", ".pdf"]}
                                  multiple={false}
                                  maxFiles={1}
                                  maxFileSize={5000000}
                                  minFileSize={0}
                                  clickable={this.state.addFileLocation}
                                >
                                  <Header textAlign="center">
                                    {this.state.locationFile.extension !==
                                      "pdf" && (
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
                                        {this.state.locationFile.name}
                                      </p>
                                    )}
                                    {this.state.locationFile.name ===
                                      undefined && (
                                      <p style={{ fontSize: "11px" }}>
                                        {t(
                                          "recharge.formVerificationIdentity.form.verifyCUninitiatedCompany.registerFiscal"
                                        )}
                                      </p>
                                    )}
                                    {messageErrorLOCATION}
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
                                      "recharge.formVerificationIdentity.form.verifyCUninitiatedCompany.buttonChange"
                                    )}
                                  </Button>
                                )}
                                {this.errorFileLocation && (
                                  <Message
                                    error
                                    content={t(
                                      "recharge.formVerificationIdentity.form.verifyCUninitiatedCompany.fileNotSupported"
                                    )}
                                  />
                                )}
                              </Segment>
                            </Grid.Column>
                          )}
                          {!this.state.hasSelfURL && (
                            <Grid.Column
                              width={isMobile ? 16 : 4}
                              textAlign={"center"}
                            >
                              <Segment placeholder className="sizeSement">
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
                                    {this.state.selfFile.extension !==
                                      "pdf" && (
                                      <img
                                        alt=""
                                        src={this.state.selffImg}
                                        className="imageFileV"
                                      />
                                    )}

                                    {this.state.selfFile.extension ===
                                      "pdf" && (
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
                                        {this.state.selfFile.name}
                                      </p>
                                    )}
                                    {this.state.selfFile.name === undefined && (
                                      <p style={{ fontSize: "11px" }}>
                                        {t(
                                          "recharge.formVerificationIdentity.form.verifyCUninitiatedCompany.selfieSupport"
                                        )}
                                      </p>
                                    )}
                                    {messageErrorSELF}
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
                                      "recharge.formVerificationIdentity.form.verifyCUninitiatedCompany.buttonChange"
                                    )}
                                  </Button>
                                )}
                                {this.errorFileSelf && (
                                  <Message
                                    error
                                    content={t(
                                      "recharge.formVerificationIdentity.form.verifyCUninitiatedCompany.fileNotSupported"
                                    )}
                                  />
                                )}
                              </Segment>
                            </Grid.Column>
                                    )}
                        </Grid.Row>
                      </Grid>
                    </div>
                  )}
                 
                  {!this.state.juridic && (
                    <Grid centered>
                      {(!this.state.hasIdentityURL ||
                    !this.state.hasLocationURL ||
                    !this.state.hasBankURL ||
                    (this.state.juridic && !this.state.hasSelfURL)) && (
                    <div>
                      <div
                        style={{
                          width: "100%",
                          marginTop: "20px",
                          textAlign: "center",
                        }}
                      >
                        {this.state.juridic
                          ? t(
                              "recharge.formVerificationIdentity.form.verifyCUninitiatedCompany.messageFile"
                            )
                          : t(
                              "recharge.formVerificationIdentity.form.verifyCUninitiatedPersonal.messageFile"
                            )}
                      </div>
                      <div
                        style={{
                          marginTop: "10px",
                          textAlign: "center",
                          marginBottom: 20,
                        }}
                      >
                        {this.state.juridic
                          ? t(
                              "recharge.formVerificationIdentity.form.verifyCUninitiatedCompany.supportedTypeFiles"
                            )
                          : t(
                              "recharge.formVerificationIdentity.form.verifyCUninitiatedPersonal.supportedTypeFiles"
                            )}
                      </div>
                    </div>
                    )}
                      <Grid.Row centered>
                        {!this.state.hasIdentityURL && (
                          <Grid.Column
                            width={isMobile ? 16 : 4}
                          >
                             <Form.Field>
                              <Segment
                              placeholder
                              className="sizeSement"
                            >
                              <Files
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
                                      {this.state.idFile.name}
                                    </p>
                                  )}
                                  {this.state.idFile.name === undefined && (
                                    <p style={{ fontSize: "11px" }}>
                                      {t(
                                        "recharge.formVerificationIdentity.form.verifyCUninitiatedPersonal.documentID"
                                      )}
                                    </p>
                                  )}
                                  {messageErrorDNI}
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
                                    "recharge.formVerificationIdentity.form.verifyCUninitiatedPersonal.buttonChange"
                                  )}
                                </Button>
                              )}
                              {this.errorFileDni && (
                                <Message
                                  error
                                  content={t(
                                    "recharge.formVerificationIdentity.form.verifyCUninitiatedPersonal.fileNotSupported"
                                  )}
                                />
                              )}
                            </Segment>
                            </Form.Field>   
                          </Grid.Column>
                        )}
                        {!this.state.hasLocationURL && (
                          <Grid.Column width={isMobile ? 16 : 4}>
                            <Form.Field>
                              <Segment placeholder className="sizeSement">
                                <Files
                                  className="files-dropzone"
                                  ref={this.locationRef}
                                  onChange={this.onFilesChangeLocation.bind(
                                    this
                                  )}
                                  onError={this.onFilesErrorLocation.bind(this)}
                                  accepts={["image/*", ".pdf"]}
                                  multiple={false}
                                  maxFiles={1}
                                  maxFileSize={5000000}
                                  minFileSize={0}
                                  clickable={this.state.addFileLocation}
                                >
                                  <Header textAlign="center">
                                    {this.state.locationFile.extension !==
                                      "pdf" && (
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
                                        {this.state.locationFile.name}
                                      </p>
                                    )}
                                    {this.state.locationFile.name ===
                                      undefined && (
                                      <p style={{ fontSize: "11px" }}>
                                        {t(
                                          "recharge.formVerificationIdentity.form.verifyCUninitiatedPersonal.addressSupport"
                                        )}
                                      </p>
                                    )}
                                    {messageErrorLOCATION}
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
                                      "recharge.formVerificationIdentity.form.verifyCUninitiatedPersonal.buttonChange"
                                    )}
                                  </Button>
                                )}
                                {this.errorFileLocation && (
                                  <Message
                                    error
                                    content={t(
                                      "recharge.formVerificationIdentity.form.verifyCUninitiatedPersonal.fileNotSupported"
                                    )}
                                  />
                                )}
                              </Segment>
                            </Form.Field>
                          </Grid.Column>
                        )}
                        {!this.state.hasBankURL && (
                          <Grid.Column width={isMobile ? 16 : 4}>
                            <Form.Field>
                              <Segment placeholder className="sizeSement">
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
                                    {this.state.bankFile.extension !==
                                      "pdf" && (
                                      <img
                                        alt=""
                                        src={this.state.bankImg}
                                        className="imageFileV"
                                      />
                                    )}
                                    {this.state.bankFile.extension ===
                                      "pdf" && (
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
                                        {this.state.bankFile.name}
                                      </p>
                                    )}
                                    {this.state.bankFile.name === undefined && (
                                      <p style={{ fontSize: "11px" }}>
                                        {t(
                                          "recharge.formVerificationIdentity.form.verifyCUninitiatedPersonal.bankAccountSupport"
                                        )}
                                      </p>
                                    )}
                                    {messageErrorBANK}
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
                                      "recharge.formVerificationIdentity.form.verifyCUninitiatedPersonal.buttonChange"
                                    )}
                                  </Button>
                                )}
                                {this.errorFileBank && (
                                  <Message
                                    error
                                    content={t(
                                      "recharge.formVerificationIdentity.form.verifyCUninitiatedPersonal.fileNotSupported"
                                    )}
                                  />
                                )}
                              </Segment>
                            </Form.Field>
                            <Divider hidden></Divider>
                          </Grid.Column>
                        )}
                       </Grid.Row>
                    </Grid>
                  )}
                </Form>
                <div style={{paddingTop: 20}} align="center">
                  <Message
                    warning
                    content={t(
                      "recharge.formVerificationIdentity.errors.missingFields"
                    )}
                  />

                  <Divider hidden></Divider>
                </div>
                <Form.Field>
                  <div align="center" hidden={this.state.identitySended}>
                    <Form.Button
                      onClick={this.onLoadFile.bind(this)}
                      color="blue"
                    >
                      {t("recharge.formVerificationIdentity.form.buttonVerify")}
                    </Form.Button>
                    <Divider hidden></Divider>
                    {!isMobile && (
                      <Form.Button onClick={this.handleCancel.bind(this)} basic>
                        {t("profile.updateProfile.form.buttonBack")}
                      </Form.Button>
                    )}
                  </div>
                </Form.Field>

                <Divider hidden />
                {this.state.errorNetwork && (
                  <div>
                    <Message error content={t(this.state.textMessage)} />
                  </div>
                )}
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row />
        </Grid>
      </div>
    );
  }
}
export default translate(FormVerificationIdentity);
