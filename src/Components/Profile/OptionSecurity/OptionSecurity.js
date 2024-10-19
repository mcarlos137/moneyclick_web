import React, { Component } from "react";
import {
  Segment,
  Header,
  Modal,
  Button,
  Form,
  Grid,
  Message,
  Input,
  Image,
  Icon,
  Divider,
  Progress,
  Dropdown,
  List,
  Popup,
  Label,
} from "semantic-ui-react";
import ReactTooltip from "react-tooltip";
//import QRCode from "qrcode.react";
import userService from "../../../services/user";
import "./OptionSecurity.css";
import translate from "../../../i18n/translate";
import iconPass from "../../../img/icn-cambiar-contraseña.png";
import iconTwo from "../../../img/icn-2FA.png";
import attachments from "../../../services/attachments";
class OptionSecurity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      viewMessage: false,
      textMessage: "",
      password: "",
      newPassword: "",
      repeatPassword: "",
      selectedPreferedSendCode: "",
      loadForm: false,
      modalOpen: false,
      errorCode: false,
      modalOpen2: false,
      codetwofactor: false,
      usercode: "",
      modalMessage: "profile.emptyMessage",
      modalTwoFactor: false,
      modalInactiveTwoFactor: false,
      kur: false,
      modalkur: false,
      modalSendCode: false,
      userPhone: window.sessionStorage.getItem("phone"),
      phoneVerified:
        window.sessionStorage.getItem("phoneVerified") === "true"
          ? true
          : false,
      twoFactor:
        window.sessionStorage.getItem("twoFactor") === "true" ? true : false,
      codeVerify: "",
      userVerifyD:
        userService.getUserVerificationStatus() !== null
          ? userService.getUserVerificationStatus().D
          : "UNINITIATED",
      sendRequest: false,
      resultUpdate: false,
      translator: props.translate,
      validActiveTwoFactor: false,
      load: false,
      viewMessageError: false,
      hasQrGoogleAuth:
        window.sessionStorage.getItem("QrGoogleAuth") === "false"
          ? false
          : true,
    };
    this.closeModalOption = this.closeModalOption.bind(this);
    this.closeModalOption2 = this.closeModalOption2.bind(this);
    this.closeModalOption3 = this.closeModalOption3.bind(this);
    this._Mounted = false;
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.language !== nextProps.language) {
      this.setState({
        translator: nextProps.translate,
      });
    }
  }
  componentWillMount() {
    this.verifying();
  }
  componentDidMount() {
    this.get2FPreference();
    this._Mounted = true;
    this.setState({ load: true });
    let userName = userService.getUserName();
    userService
      .getConfigUserGeneral(userName)
      .then((resp) => {
        let user = userService.getActualUserInfo(resp.data.result);
        this.setState({ load: false });

        if (
          user.email !== undefined &&
          user.email !== "" &&
          resp.data.result.verification.A !== undefined
        ) {
          if (
            user.answerSecurity !== undefined &&
            user.questionSecurity !== undefined
          ) {
            if (user.answerSecurity !== "" && user.questionSecurity !== "") {
              this.setState({ validActiveTwoFactor: true });
            } else {
              this.setState({ validActiveTwoFactor: false });
            }
          } else {
            this.setState({ validActiveTwoFactor: false });
          }
        } else {
          console.log("sin correo y pregunta");
          this.setState({ validActiveTwoFactor: false });
        }
      })
      .catch((error) => {
        //////////(error);
        this.setState({ load: false });
      });
  }

  verifying() {
    let username = userService.getUserName();
    let data = userService.getConfigUserGeneral(username);
    data
      .then((resp) => {
        // let userData = this.getActualUserInfo(resp.data.result);
        if (resp.data.result.verification === undefined) {
          this.setState({
            userVerifyC: "UNINITIATED",
            show: true,
            phoneVerified: false,
          });
        } else {
          if (resp.data.result.verification.C === undefined) {
            this.setState({ userVerifyC: "UNINITIATED", show: true });
          } else {
            this.setState({
              userVerifyC:
                resp.data.result.verification.C.userVerificationStatus,
              show: true,
            });
          }
          if (resp.data.result.verification.B === undefined) {
            //console.log('verification B :', resp.data.result.verification.B)
            this.setState({ phoneVerified: false });
            window.sessionStorage.setItem("phoneVerified", "false");
          } else {
            //console.log('verification B :', resp.data.result.verification.B)
            this.setState({ phoneVerified: true });
            window.sessionStorage.setItem("phoneVerified", "true");
          }
          if (resp.data.result.verification.A === undefined) {
            this.setState({ userVerify: false });
          } else {
            this.setState({ userVerify: true });
          }
        }
      })
      .catch((error) => {
        //console.log(error);
      });
  }

  componentWillUnmount() {
    this._Mounted = false;
  }
  closeModalOption() {
    this.setState({
      modalOpen: false,
      modalMessage: "",
      viewMessage: false,
      textMessage: "",
      resultUpdate: false,
    });
  }
  closeModalOption2() {
    this.setState({
      modalSendCode: false,
      modalMessage: "",
      viewMessage: false,
      textMessage: "",
      //sendRequest: false,
      sendRequest2: false,
      resultUpdate: false,
    });
  }
  closeModalOption3() {
    this.setState({
      modalOpen: false,
      selectedPreferedSendCode: "",
      modalMessage: "",
      viewMessage: false,
      textMessage: "",
      modalTwoFactor: false,
      sendRequest: false,
    });
  }
  handleOptionChangePassword() {
    this.props.changeItem("updatePassword");
    this.setState({
      resultUpdate: null,
      viewMessage: false,
      textMessage: "",
      password: "",
      newPassword: "",
      repeatPassword: "",
      loadForm: false,
      modalOpen: false,
      modalMessage: "",
      userPhone: window.sessionStorage.getItem("phone"),
      phoneVerified:
        window.sessionStorage.getItem("phoneVerified") === "true"
          ? true
          : false,
      twoFactor:
        window.sessionStorage.getItem("twoFactor") === "true" ? true : false,
      codeVerify: "",
    });
  }
  handleOptionSendSmsorEmail() {
    this.setState({
      modalSendCode: true,
    });
  }

  activeTwoFactor() {
    this.verifyKur();
    if (window.sessionStorage.getItem("2FactorPrefered") === "PHONE") {
      //('caso phone');
      this.setState({
        modalTwoFactor: true,
        modalMessage: "profile.optionSecurity.activeTwoFactor",
        selectedPreferedSendCode: "PHONE",
      });
    } else if (window.sessionStorage.getItem("2FactorPrefered") === "GOOGLE") {
      //('caso google');
      this.setState({
        modalTwoFactor: true,
        modalMessage: "profile.optionSecurity.activeTwoFactorGA",
        selectedPreferedSendCode:"GOOGLE",
      });
    } else if (
      window.sessionStorage.getItem("2FactorPrefered") === "undefined"
    ) {
      this.setState({
        modalTwoFactor: true,
        modalMessage: "profile.optionSecurity.activeTwoFactor1",
      });
    }
  }
  inactiveTwoFactor() {
    this.setState({
      modalInactiveTwoFactor: true,
      modalMessage: "profile.optionSecurity.inactivateTwoFactor",
    });
  }
  handleVerifyAccount() {
    window.location.href = "/verify";
  }
  handleUpdateActiveTwoFactor() {
    if (
      userService.getPhone() !== null ||
      userService.getPhone() !== undefined
    ) {
      this.setState({ loadForm: true, sendRequest: true });
      let two;
      two = !this.state.twoFactor;
      let body = {
        email: userService.getUserEmail(),
        firstName: window.sessionStorage.getItem("firstName"),
        lastName: window.sessionStorage.getItem("lastName"),
        countryCode: window.sessionStorage.getItem("countryCode"),
        phone: window.sessionStorage.getItem("phone"),
        has2FAEnabled: two,
      };
      userService
        .updateProfile(body, userService.getUserName())
        .then((resp) => {
          //('resp2', resp);
          if (resp.data.payload) {
            this.resultUpdateTwoFactor();
            if (two === true) {
              this.Update2FactorPrefered();
            }
            this.setState({
              viewMessage: true,
              textMessage: "profile.optionSecurity.successUpdate",
              loadForm: false,
            });
          } else {
            this.setState({
              viewMessage: true,
              textMessage: "profile.optionSecurity.errors.failUpdate",
              loadForm: false,
            });
          }

          // setTimeout(() => {
          //   this.closeModalOption3();
          // }, 2000);
        })
        .catch((error) => {
          //////(error);
        });
    }
  }

  createKur() {
    this.setState({ loadForm: true, sendRequest3: true });
    let body = {
      userName: userService.getUserName(),
    };
    userService
      .createGASecretKey(body)
      .then(async (resp) => {
        ////////(resp);
        //this.resultUpdateTwoFactor();
        await userService.updateCreateQrGoogleAuth(userService.getUserName());
        window.sessionStorage.setItem("QrGoogleAuth", true);
        this.setState({
          kur: true,
          sendRequest3: true,
          hasQrGoogleAuth: true,
          loadForm: false,
        });
        this.verifyKur();
      })
      .catch((error) => {
        ////////(error);
        this.setState({
          viewMessage: true,
          textMessage: "profile.optionSecurity.errors.failUpdate",
          loadForm: false,
          kur: false,
          sendRequest3: false,
        });
      });
  }
  verifyKur() {
    this.getGoogleQrUser();
  }
  async getGoogleQrUser() {
    try {
      const response = await attachments.getQRGoogleAuth(
        userService.getUserName()
      );
      //console.log(response);
      //console.log(response.data)
      //var arrayBuffer= new Uint8Array(response.data)
      let blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      //console.log(blob);
      let image = URL.createObjectURL(blob);
      //console.log(image);
      this.setState({
        usercode: image,
      });
    } catch (error) {}
  }
  handleChange(e, { value }) {
    this.setState({ selected: value });
  }

  handleChangeSendCode2Factor(e, { value }) {
    if (value === "PHONE") {
      if (userService.getPhone() !== null || userService.getPhone() !== "") {
        this.setState({ selectedPreferedSendCode: value });
      } else {
        this.setState({
          viewMessage: true,
          textMessage: "profile.optionSecurity.unaddedPhone",
        });
        setTimeout(() => {
          this.setState({
            viewMessage: false,
            textMessage: "",
          });
        }, 3000);
      }
    } else if (value === "GOOGLE") {
      if (userService.getUserEmail() !== "null") {
        if (userService.getUserEmail().split("@")[1] === "gmail.com") {
          this.setState({ selectedPreferedSendCode: value });
        } else {
          this.setState({ selectedPreferedSendCode: value });
        }
      } else {
        this.setState({
          viewMessage: true,
          textMessage: "profile.optionSecurity.unaddedEmail",
        });
        setTimeout(() => {
          this.setState({
            viewMessage: false,
            textMessage: "",
          });
        }, 3000);
      }
    }
  }
  UpdateSecurityCode() {
    this.setState({ loadForm: true });
    //validar que posea telefono o correo
    var body = {
      username: window.sessionStorage.getItem("username"),
      prefered: this.state.selected,
    };
    userService
      .preferedSecurity(body)
      .then((resp) => {
        window.sessionStorage.setItem(
          "preferedSendCodeSecurity",
          this.state.selected
        );

        this.setState({
          viewMessage: true,
          textMessage: "profile.optionSecurity.successUpdate",
          loadForm: false,
          sendRequest2: true,
        });
        // setTimeout(() => {
        //   this.closeModalOption2();
        // }, 2000);
      })
      .catch((error) => {
        this.setState({
          viewMessage: true,
          textMessage: "profile.optionSecurity.errors.failUpdate",
          loadForm: false,
          sendRequest2: false,
        });
      });
  }

  Update2FactorPrefered() {
    if (
      this.state.selectedPreferedSendCode === "" ||
      this.state.selectedPreferedSendCode === null ||
      this.state.selectedPreferedSendCode === undefined
    ) {
      let prefered = "";
      if (window.sessionStorage.getItem("2FactorPrefered") !== "undefined") {

        prefered = window.sessionStorage.getItem("2FactorPrefered");
          
      } else if (userService.getPhone() !== null || userService.getPhone() !== "") {

        prefered = "PHONE";
 
      } else if (userService.getUserEmail() !== "null") {

        prefered = "GOOGLE";
        
      }

      this.setState({
        selectedPreferedSendCode: prefered
      }, () => {
        this.updatePreferedSecurityTwoFactor();
      });

    } else {
      this.updatePreferedSecurityTwoFactor();
    }
  }

  updatePreferedSecurityTwoFactor() {
    var body = {
        username: window.sessionStorage.getItem("username"),
        prefered: this.state.selectedPreferedSendCode,
      };
     userService
        .preferedSecurityTwoFactor(body)
        .then((resp) => {
          ////('resp', resp);
          window.sessionStorage.setItem(
            "2FactorPrefered",
            this.state.selectedPreferedSendCode
          );
          this.setState({
            codetwofactor: true,
            viewMessage: true,
            textMessage: "profile.optionSecurity.successUpdate",
            loadForm: false,
          });
        })
        .catch((error) => {
          ////(error);
          this.setState({
            viewMessage: true,
            textMessage: "profile.optionSecurity.errors.failUpdate",
            loadForm: false,
          });
        });
  }



  get2FPreference() {
    //////(window.sessionStorage.getItem('2FactorPrefered'));
    userService
      .preferedUserSendCodeTwoFactor()
      .then((resp) => {
        if (resp.data.payload === false) {
          window.sessionStorage.setItem("2FactorPrefered", "undefined");
        } else {
          window.sessionStorage.setItem("2FactorPrefered", resp.data.payload);
        }
      })
      .catch((error) => {});
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
  resultUpdateTwoFactor() {
    this.setState({ resultUpdate: true, sendRequest: false });
    this.setState({
      viewMessage: true,
      textMessage: "profile.optionSecurity.successUpdate",
      loadForm: false,
    });
    this.state.twoFactor === true
      ? window.sessionStorage.setItem("twoFactor", false)
      : window.sessionStorage.setItem("twoFactor", true);
    this.state.twoFactor === true
      ? this.setState({ twoFactor: false })
      : this.setState({ twoFactor: true });
  }
  closeModal() {
    this.setState({
      resultUpdate: false,
      modalInactiveTwoFactor: false,
      viewMessage: false,
      modalTwoFactor: false,
      textMessage: "",
    });
    this.setState({
      modalOpen: false,
      selectedPreferedSendCode: "",
      modalMessage: "",
      viewMessage: false,
      textMessage: "",
      modalTwoFactor: false,
      sendRequest: false,
    });
  }

  render() {
    let t = this.state.translator;
    console.log('this.state.phoneVerified ', this.state.phoneVerified);
    console.log(' this.state.validActiveTwoFactor ',  this.state.validActiveTwoFactor);
    let disabledTwoFactor =
      this.state.phoneVerified === false ||
      this.state.validActiveTwoFactor === false
        ? true
        : false;
    let pass = atob(userService.getHeader()).split(":")[0];
    let cont = 0;
    let messageToken,
      percentSecurity,
      buttonActiveTwoFac,
      buttonInactiveTwoFac,
      buttomModal,
      buttonPreferedSendCode,
      buttonsActivateTwoFactor,
      messageError;

    if (this.state.messageError) {
      messageError = (
        <Message info floating content={t(this.state.textMessage)} />
      );
    }
    buttonPreferedSendCode = (
      <div>
        {(this.state.sendRequest2 || this.state.selected === "") && (
          <Button secondary onClick={this.closeModalOption2.bind(this)}>
            {t("profile.optionSecurity.buttonClose")}
          </Button>
        )}

        {!this.state.sendRequest2 && this.state.selected !== "" && (
          <div>
            <Button
              secondary
              onClick={this.closeModalOption2.bind(this)}
              disabled={this.state.sendRequest2}
            >
              {t("profile.optionSecurity.buttonClose")}
            </Button>
            <Button
              color="blue"
              disabled={this.state.sendRequest2}
              onClick={this.UpdateSecurityCode.bind(this)}
            >
              {t("profile.optionSecurity.buttonAccept")}
            </Button>
          </div>
        )}
      </div>
    );
    if (!this.state.resultUpdate) {
      buttonsActivateTwoFactor = (
        <div>
          {this.state.selectedPreferedSendCode === "PHONE" && (
            <div>
              <Button secondary onClick={this.closeModalOption3.bind(this)}>
                {t("profile.optionSecurity.buttonClose")}
              </Button>
              <Button
                color="blue"
                disabled={this.state.sendRequest}
                onClick={this.handleUpdateActiveTwoFactor.bind(this)}
              >
                {t("profile.optionSecurity.buttonAccept")}
              </Button>
            </div>
          )}
          {this.state.selectedPreferedSendCode === "GOOGLE" && (
            <div>
              <Button secondary onClick={this.closeModalOption3.bind(this)}>
                {t("profile.optionSecurity.buttonClose")}
              </Button>

              <Button
                color="blue"
                disabled={this.state.sendRequest}
                onClick={this.handleUpdateActiveTwoFactor.bind(this)}
              >
                {t("profile.optionSecurity.buttonAccept")}
              </Button>
            </div>
          )}
          {this.state.selectedPreferedSendCode === "" && (
            <div>
              <Button secondary onClick={this.closeModalOption3.bind(this)}>
                {t("profile.optionSecurity.buttonClose")}
              </Button>
            </div>
          )}
        </div>
      );
    } else {
      buttonsActivateTwoFactor = (
        <Button secondary onClick={this.closeModal.bind(this)}>
          {t("profile.optionSecurity.buttonClose")}
        </Button>
      );
    }
    if (!this.state.resultUpdate) {
      buttomModal = (
        <div>
          <Button
            secondary
            onClick={this.closeModal.bind(this)}
            color="red"
            //disabled={this.state.sendRequest}
          >
            {t("profile.optionSecurity.buttonNo")}
          </Button>
          <Button
            //	disabled={this.state.sendRequest}
            onClick={this.handleUpdateActiveTwoFactor.bind(this)}
          >
            {t("profile.optionSecurity.buttonYes")}
          </Button>
        </div>
      );
    } else {
      buttomModal = (
        <Button secondary onClick={this.closeModal.bind(this)}>
          {t("profile.optionSecurity.buttonClose")}
        </Button>
      );
    }
    if (this.state.viewMessage) {
      messageToken = (
        <Message info floating content={t(this.state.textMessage)} />
      );
    }
    if (this.state.twoFactor) {
      cont++;
      buttonInactiveTwoFac = (
        <div align="center">
          <Button
            color="blue"
            disabled={disabledTwoFactor}
            onClick={this.inactiveTwoFactor.bind(this)}
          >
            <span>{t("profile.optionSecurity.buttonDisabled2FA")}</span>
          </Button>
        </div>
      );
    } else {
      buttonActiveTwoFac = (
        <div>
          <Button
            color="blue"
            disabled={disabledTwoFactor}
            onClick={this.activeTwoFactor.bind(this)}
          >
            <span>{t("profile.optionSecurity.buttonEnabled2FA")}</span>
          </Button>
        </div>
      );
    }

    if (pass.length >= 8) {
      cont++;
    }
    percentSecurity = (cont / 2) * 100;
    percentSecurity = Math.floor(percentSecurity);
    let optionsPreferedTwoFactor = [];
    let options = [];
    if (this.state.phoneVerified === true) {
      optionsPreferedTwoFactor = [
        {
          key: "GOOGLE",
          text: t(
            "profile.optionSecurity.twoFactorOptions.preferedTwoFactorRequest.google"
          ),
          value: "GOOGLE",
        },
        {
          key: "PHONE",
          text: t(
            "profile.optionSecurity.twoFactorOptions.preferedTwoFactorRequest.sms"
          ),
          value: "PHONE",
        },
      ];

      options = [
        {
          key: "EMAIL",
          text: t(
            "profile.optionSecurity.secureCodeProcessRequest.prefered.email"
          ),
          value: "EMAIL",
        },
        {
          key: "PHONE",
          text: t(
            "profile.optionSecurity.secureCodeProcessRequest.prefered.sms"
          ),
          value: "PHONE",
        },
      ];
    } else {
      if (this.state.phoneVerified === false) {
        options = [
          {
            key: "EMAIL",
            text: t(
              "profile.optionSecurity.secureCodeProcessRequest.prefered.email"
            ),
            value: "EMAIL",
          },
        ];
        optionsPreferedTwoFactor = [
          {
            key: "GOOGLE",
            text: t(
              "profile.optionSecurity.twoFactorOptions.preferedTwoFactorRequest.google"
            ),
            value: "GOOGLE",
          },
        ];
      }
    }

    return (
      <div>
        <ReactTooltip />
        <Grid colums="equal">
          <Grid.Row>
            <Grid.Column largeScreen={2} />
            <Grid.Column largeScreen={14}>
              <Segment basic loading={this.state.load}>
                <div>{t("profile.optionSecurity.progress")}</div>
                <br />
                <Label.Group>
                  <Label
                    color="red"
                    className="progress-security"
                    style={{
                      opacity: percentSecurity > 0 ? 0.2 : 1,
                    }}
                  >
                    {percentSecurity === 0 ? (
                      t("profile.optionSecurity.percents.low").toUpperCase()
                    ) : (
                      <br />
                    )}
                  </Label>
                  <Label
                    color="yellow"
                    className="progress-security"
                    style={{
                      opacity:
                        percentSecurity === 0 ||
                        this.state.twoFactor
                          ? 0.2
                          : 1,
                    }}
                  >
                    {percentSecurity > 0 && !this.state.twoFactor ? (
                      t("profile.optionSecurity.percents.middle").toUpperCase()
                    ) : (
                      <br />
                    )}
                  </Label>
                  <Label
                    color="green"
                    className="progress-security"
                    style={{ opacity: !this.state.twoFactor ? 0.2 : 1 }}
                  >
                    {this.state.twoFactor ? (
                      t("profile.optionSecurity.percents.high").toUpperCase()
                    ) : (
                      <br />
                    )}
                  </Label>
                </Label.Group>
                <br />
                <div style={{ textAling: "center" }}>
                  <p>{t("profile.optionSecurity.list.header")}</p>
                </div>

                <Divider hidden />
                <Grid colums="equal" textAlign="center">
                  <Grid.Row>
                    <Grid.Column largeScreen={7} widescreen={7}>
                      <Popup
                        trigger={
                          <div>
                            <Image
                              style={{ width: "30px" }}
                              src={iconPass}
                              verticalAlign="middle"
                              size="tiny"
                            />
                            <label>
                              {t(
                                "profile.optionSecurity.list.options.changePassword"
                              )}
                            </label>
                          </div>
                        }
                      >
                        {t(
                          "profile.optionSecurity.list.options.recommendation"
                        )}
                      </Popup>
                      <br />
                      {this.state.twoFactor &&
                        window.sessionStorage.getItem("2FactorPrefered") ===
                          "GOOGLE" && <br />}
                      <Button
                        color="blue"
                        onClick={this.handleOptionChangePassword.bind(this)}
                      >
                        <span>
                          {t("profile.optionSecurity.buttonChangePassword")}
                        </span>
                      </Button>
                    </Grid.Column>
                    <Grid.Column largeScreen={7} widescreen={7}>
                      <Popup
                        trigger={
                          <div>
                            <Image
                              style={{ width: "30px" }}
                              src={iconTwo}
                              size="tiny"
                              verticalAlign="middle"
                            />
                            <label>
                              {this.state.twoFactor === false &&
                                t("profile.optionSecurity.list.options.twoFA")}

                              {window.sessionStorage.getItem(
                                "2FactorPrefered"
                              ) === null &&
                                t("profile.optionSecurity.list.options.twoFA") +
                                  "   " +
                                  "via " +
                                  "unknow"}

                              {window.sessionStorage.getItem(
                                "2FactorPrefered"
                              ) === "PHONE" &&
                                this.state.twoFactor === true &&
                                t("profile.optionSecurity.list.options.twoFA") +
                                  "   " +
                                  "via " +
                                  "SMS"}

                              {window.sessionStorage.getItem(
                                "2FactorPrefered"
                              ) !== "null" &&
                                window.sessionStorage.getItem(
                                  "2FactorPrefered"
                                ) === "GOOGLE" &&
                                this.state.twoFactor === true &&
                                t("profile.optionSecurity.list.options.twoFA") +
                                  "    " +
                                  "via " +
                                  "Google Authenticator"}
                            </label>
                          </div>
                        }
                      >
                        {this.state.twoFactor
                          ? t("profile.optionSecurity.popUpActivated")
                          : t("profile.optionSecurity.popUpInactivated")}
                      </Popup>

                      <br />
                      {buttonActiveTwoFac}
                      {buttonInactiveTwoFac}
                    </Grid.Column>
                    <Grid.Column largeScreen={2} />
                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Column>
            <Grid.Column />
          </Grid.Row>
        </Grid>
        <Modal open={this.state.modalInactiveTwoFactor}>
          <Header
            icon="exclamation circle"
            content={t("profile.optionSecurity.verify")}
          />
          <Modal.Content>
            <Modal.Description>
              <Segment basic loading={this.state.loadForm}>
                <p>{t(this.state.modalMessage)}</p>
                <Form error>{messageToken}</Form>
              </Segment>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>{buttomModal}</Modal.Actions>
        </Modal>
        <Modal open={this.state.modalTwoFactor}>
          <Header content={t("profile.optionSecurity.verify")} />
          <Modal.Content>
            <Modal.Description>
              <Segment basic>
                <p>
                  {t("profile.optionSecurity.list.options.labelSmsorEmail")}
                </p>
                <Dropdown
                  placeholder={t(
                    "profile.optionSecurity.list.options.labelSmsorEmail"
                  )}
                  selection
                  fluid
                  options={optionsPreferedTwoFactor}
                  onChange={this.handleChangeSendCode2Factor.bind(this)}
                  value={this.state.selectedPreferedSendCode}
                ></Dropdown>
                {messageError}
              </Segment>

              <Segment basic loading={this.state.loadForm}>
                {!this.state.sendRequest && (
                  <div>
                    {" "}
                    {this.state.selectedPreferedSendCode === "GOOGLE" && (
                      <div>
                        {this.state.hasQrGoogleAuth && (
                          <Grid centered>
                            <Grid.Row>
                              <Image
                                src={this.state.usercode}
                                as="a"
                                size="small"
                              />

                              <Divider hidden></Divider>
                            </Grid.Row>

                            {/* <Button
                              onClick={this.verifyKur.bind(this)}
                              color="green"
                            >
                              {t("profile.optionSecurity.buttonVerify")}
                            </Button> */}
                          </Grid>
                        )}
                        {!this.state.hasQrGoogleAuth && (
                          <div>
                            <Grid centered>
                              <Grid.Row>
                                {/* <Segment>
																{/* <p>Hacer click en el boton "crear"</p> 
															</Segment> */}

                                <Button
                                  onClick={this.createKur.bind(this)}
                                  color="blue"
                                  disabled={this.state.sendRequest3}
                                >
                                  {t("profile.optionSecurity.buttonCreate")}
                                </Button>
                              </Grid.Row>
                            </Grid>
                            <Divider hidden></Divider>{" "}
                          </div>
                        )}
                        <p>{t("profile.optionSecurity.activeTwoFactorGA")}</p>
                      </div>
                    )}
                    {this.state.selectedPreferedSendCode === "PHONE" && (
                      <p>{t("profile.optionSecurity.activeTwoFactor")}</p>
                    )}
                    {this.state.selectedPreferedSendCode === "undefined" && (
                      <p>{t("profile.optionSecurity.activeTwoFactor1")}</p>
                    )}
                  </div>
                )}
                {/* <p>{t(this.state.modalMessage)}</p> */}
                <Divider hidden></Divider>
                <Form error>{messageToken}</Form>
              </Segment>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>{buttonsActivateTwoFactor}</Modal.Actions>
        </Modal>
        <Modal open={this.state.modalSendCode}>
          <Header
            icon="exclamation circle"
            content={t("profile.optionSecurity.verify")}
          />
          <Modal.Content>
            <Modal.Description>
              <Segment basic loading={this.state.loadForm}>
                <p>{t("profile.optionSecurity.list.options.SendSmsorEmail")}</p>

                <Dropdown
                  placeholder={t(
                    "profile.optionSecurity.list.options.labelSmsorEmail"
                  )}
                  selection
                  fluid
                  disabled={this.state.sendRequest2}
                  hidden={this.state.sendRequest2}
                  options={options}
                  onChange={this.handleChange.bind(this)}
                  value={this.state.selected}
                ></Dropdown>
              </Segment>
              <Form error>{messageToken}</Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>{buttonPreferedSendCode}</Modal.Actions>
        </Modal>
      </div>
    );
  }
}
export default translate(OptionSecurity);
