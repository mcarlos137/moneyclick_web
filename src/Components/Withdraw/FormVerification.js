import { Component } from "react";
import {
  Grid,
  Form,
  Button,
  Message,
  Input,
  Divider,
  Segment,
  Icon,
} from "semantic-ui-react";
import React from "react";
import { isMobile } from "react-device-detect";
import translate from "../../i18n/translate";
import otcService from "../../services/otc";
import userService from "../../services/user";
import moneyclickService from "../../services/moneyclick";
import NumberFormat from "react-number-format";
import TakePhoto from "../ModalTakePhoto/TakePhoto";
import FormVerificationImage from "./FormVerificationImage";
import FieldDinamic from "./FieldDinamic";

class FormVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldsToVerify: [],
      fieldsToShow: [],
      documentFile: null,
      selfieFile: null,
      showMissing: false,
      listFields: [],
      statusIdentityVerificationMc: false,
      statusSelfieIdentityVerificationMc: false,
      oneError: false,
      showPicker: false,
      fieldsSaved: [],
      loadArchive: true,
      sendSuccess: false,
      errorNetwork: false,
      language: window.sessionStorage.getItem("language"),
    };
  }
  componentDidMount() {
    this.loadFields();
  }

  hasDocument(config) {
    let statusIdentityVerificationMc = "false";
    if (
      config.identityVerificationMc !== undefined &&
      config.identityVerificationMc !== null
    ) {
      statusIdentityVerificationMc = "true";
    } else {
      statusIdentityVerificationMc = "false";
    }
    return statusIdentityVerificationMc;
  }

  hasSelfie(config) {
    let statusSelfieIdentityVerificationMc = "false";

    if (
      config.selfieIdentityVerificationMc !== undefined &&
      config.selfieIdentityVerificationMc !== null
    ) {
      statusSelfieIdentityVerificationMc = "true";
    } else {
      statusSelfieIdentityVerificationMc = "false";
    }

    return statusSelfieIdentityVerificationMc;
  }

  setStatusInSessionStorage(fieldsUser, fieldsToVerify) {
    Object.keys(fieldsToVerify).forEach(async (fieldName) => {
      if (fieldsUser.indexOf(fieldName) === -1) {
        sessionStorage.setItem("status" + fieldName, "false"); //Field not present in data.
      } else {
        sessionStorage.setItem("status" + fieldName, "true");
      }
    });
  }

  async loadFields() {
    try {
      let fieldsSaved = [];
      let statusIdentityVerificationMc, statusSelfieIdentityVerificationMc;
      let user = sessionStorage.getItem("username");
      let responseGetConfig = await userService.getConfigUserGeneral(user);

      statusIdentityVerificationMc = this.hasDocument(
        responseGetConfig.data.result
      );
      statusSelfieIdentityVerificationMc = this.hasSelfie(
        responseGetConfig.data.result
      );
      let fieldsToVerify = await userService._getUserVerificationFields();

      const fieldsUser = Object.keys(responseGetConfig.data.result);

      this.setStatusInSessionStorage(fieldsUser, fieldsToVerify.data);

      //	console.log(fieldsToVerify.data);
      //	let arr = [];
      let arr2 = [[]];
      let vf2 = {};
      Object.entries(fieldsToVerify.data).forEach(([key, valu]) => {
        vf2 = {
          EN: "",
          ES: "",
          required: "",
          type: "",
        };

        Object.entries(valu).forEach(([k, v]) => {
          let v4, v1, v2, v3;
          let v44, v11, v22, v33;
          let v45;

          if (k === "EN") {
            v1 = "";
            v1 = v.split(" ");
            if (v1.length < 2) {
              v2 =
                v1[0].charAt(0).toUpperCase() +
                v1[0].substring(1, v1[0].length);

              v4 = v2;
              v = v4;

              vf2.EN = v;
            } else if (v1.length >= 2) {
              v2 =
                v1[0].charAt(0).toUpperCase() +
                v1[0].substring(1, v1[0].length);

              v3 =
                v1[1].charAt(0).toUpperCase() +
                v1[1].substring(1, v1[1].length);

              v4 = v2 + " " + v3;
              v = v4;
              vf2.EN = v;
            }
          } else if (k === "ES") {
            v11 = "";
            v11 = v.split(" ");
            if (v11.length < 2) {
              v22 =
                v11[0].charAt(0).toUpperCase() +
                v11[0].substring(1, v11[0].length);
              v45 = v22;

              v = v45;

              vf2.ES = v;
              //	Object.assign(vf2[key], { [k]: vf2[key].ES });
            } else if (v11.length === 2) {
              v22 =
                v11[0].charAt(0).toUpperCase() +
                v11[0].substring(1, v11[0].length);

              v33 =
                v11[1].charAt(0).toUpperCase() +
                v11[1].substring(1, v11[1].length);

              v45 = v22 + " " + v33;

              v = v45;

              vf2.ES = v;
            } else if (v11.length > 2) {
              v22 =
                v11[0].charAt(0).toUpperCase() +
                v11[0].substring(1, v11[0].length);

              v33 =
                v11[1].charAt(0).toUpperCase() +
                v11[1].substring(1, v11[1].length);
              v44 =
                v11[2].charAt(0).toUpperCase() +
                v11[2].substring(1, v11[2].length);

              v45 = v22 + " " + v33 + " " + v44;

              v = v45;

              vf2.ES = v;
            }
          } else if (k === "required") {
            vf2.required = v;
          } else if (k === "type") {
            vf2.type = v;
          } else if (k === "values") {
            vf2.values = v;
          }
        });
        arr2.push([key, vf2]);
      });
      arr2.shift();
      this.setState(
        {
          statusIdentityVerificationMc: statusIdentityVerificationMc,
          statusSelfieIdentityVerificationMc: statusSelfieIdentityVerificationMc,
          fieldsToVerify: arr2, // Object.entries(fieldsToVerify.data),
        },
        async () => {
          let fieldsToShow = [];
          this.state.fieldsToVerify.map(async (field) => {
            let statusField = sessionStorage.getItem("status" + field[0]);
            if (statusField === "false") {
              fieldsToShow.push(field);
              this.setState({ [field[0]]: "" });
            }
            fieldsSaved.push(field[0]); //fieldsSaved: Array fields to sended to verify.
          });
          fieldsSaved.push("identityVerificationMc");
          fieldsSaved.push("selfieIdentityVerificationMc");

          this.setState({
            fieldsSaved: fieldsSaved,
          });
          this.setState({
            loadArchive: false,
            fieldsToShow: fieldsToShow,
          });
        }
      );
    } catch (e) {
      this.setState({
        errorNetwork: true,
      });
    }
  }

  setDataToFhater(data) {
    this.setState(data);
  }

  validateState(nameState) {
    let valid = false;

    if (this.state[nameState].toString().trim() !== "") {
      valid = true;
    }

    return valid;
  }

  async addDocumentToUser(username) {
    let response = true;
    if (this.state.statusIdentityVerificationMc === "false") {
      const formData = new FormData();
      try {
        formData.append(
          "attachment",
          this.state.documentFile.file,
          this.state.documentFile.name
        );
        formData.append("userName", username);
        formData.append("fieldName", "identityVerificationMc");
        await userService.userAddAttachment(formData);
      } catch (e) {
        response = false;
      }
    }

    return response;
  }

  async addSelfieToUser(username) {
    let response = true;
    if (this.state.statusSelfieIdentityVerificationMc === "false") {
      const formData = new FormData();
      try {
        formData.append(
          "attachment",
          this.state.selfieFile.file,
          this.state.selfieFile.name
        );
        formData.append("userName", username);
        formData.append("fieldName", "selfieIdentityVerificationMc");
        await userService.userAddAttachment(formData);
      } catch (e) {
        console.log("error 501 ", e.toString());
        response = false;
      }
    }

    return response;
  }

  async initVerify(username) {
    try {
      let resp = await userService.verifyIdentityMoneyClick(
        this.state.fieldsSaved
      );

      if (resp.data.toString().includes("USER DOES NOT HAVE FIELDNAME")) {
        const fieldMissing = resp.data.toString().split("FIELDNAME ")[1];
        if (fieldMissing === "identityVerificationMc") {
          await this.addDocumentToUser(username);
          await this.initVerify(username);
        } else if (fieldMissing === "selfieIdentityVerificationMc") {
          await this.addSelfieToUser(username);
          await this.initVerify(username);
        } else {
          let bodyAdd = {
            userName: username,
            fieldName: fieldMissing,
            fieldValue: this.state[fieldMissing],
          };
          await userService.addDataUserAsync(bodyAdd);
          await this.initVerify(username);
        }
      } else {
        this.setState({
          loadArchive: false,
          sendSuccess: true,
        });
      }
    } catch (error) {
      let e = error.toString();
      console.log(e);
    }
  }

  addInfo(username) {
    this.state.fieldsToShow.map(async (field) => {
      try {
        let body = {
          userName: username,
          fieldName: field[0],
          fieldValue: this.state[field[0]],
        };
        await userService.addDataUserAsync(body);

        sessionStorage.setItem("status" + field[0], "true");
      } catch (e) {
        console.log(e);
      }
      return field;
    });

    if (
      this.state.statusIdentityVerificationMc === "false" ||
      this.state.statusSelfieIdentityVerificationMc === "false"
    ) {
      if (this.state.statusIdentityVerificationMc === "false") {
        this.addDocumentToUser(username);
      }

      if (this.state.statusSelfieIdentityVerificationMc === "false") {
        this.addSelfieToUser(username);
      }

      setTimeout(async () => {
        await this.initVerify(username);
      }, 8000);
    } else {
      setTimeout(async () => {
        await this.initVerify(username);
      }, 4000);
    }
  }

  async sendIndentityVerication() {
    this.setState({ loadArchive: true });

    const username = sessionStorage.getItem("username");

    let isValid = await this.validate();

    if (isValid) {
      try {
        if (this.state.fieldsToShow.length > 0) {
          this.addInfo(username);
        } else {
          if (
            this.state.statusIdentityVerificationMc === "false" ||
            this.state.statusSelfieIdentityVerificationMc === "false"
          ) {
            try {
              if (this.state.statusIdentityVerificationMc === "false") {
                await this.addDocumentToUser(username);
              }

              if (this.state.statusSelfieIdentityVerificationMc === "false") {
                await this.addSelfieToUser(username);
              }

              setTimeout(async () => {
                await this.initVerify(username);
              }, 8000);
            } catch (erroro) {
              this.setState({
                loadArchive: false,
              });
            }
          } else {
            userService.verifyIdentityMoneyClick(this.state.fieldsSaved);

            this.setState({
              loadArchive: false,
            });
          }
        }
      } catch (e) {
        let error = e.toString();
        console.log(error);
        if (error.includes("Network")) {
          this.setState({
            loadArchive: false,
          });
        } else {
          this.setState({
            loadArchive: false,
          });
        }
      }
    } else {
      this.setState({
        loadArchive: false,
      });
    }
  }

  async validate() {
    let valid = true;

    this.state.fieldsToVerify.forEach(async (field) => {
      let statusField = sessionStorage.getItem("status" + field[0]);
      if (
        statusField === "false" &&
        this.state[field[0]].toString().trim() === "" &&
        field[1].required
      ) {
        valid = false;
        this.setState({ showMissing: true }, () => {
          setTimeout(async () => {
            this.setState({ showMissing: false });
          }, 5000);
        });
      }
    });

    if (
      this.state.statusIdentityVerificationMc === "false" &&
      (this.state.documentFile === null ||
        this.state.documentFile.name === undefined)
    ) {
      this.setState({ showMissing: true }, () => {
        setTimeout(async () => {
          this.setState({ showMissing: false });
        }, 5000);
      });
      valid = false;
    }

    if (
      this.state.statusSelfieIdentityVerificationMc === "false" &&
      (this.state.selfieFile === null ||
        this.state.selfieFile.name === undefined)
    ) {
      this.setState({ showMissing: true }, () => {
        setTimeout(async () => {
          this.setState({ showMissing: false });
        }, 5000);
      });
      valid = false;
    }

    return valid;
  }

  setDocument(document) {
    this.setState({
      documentFile: document,
    });
  }

  setSelfie(selfie) {
    this.setState({
      selfieFile: selfie,
    });
  }

  goToWithdraw() {
    this.props.setVerification(true);
  }

  reload() {
    this.loadFields();
  }

  render() {
    let langOld = this.state.language;
    let langActual = window.sessionStorage.getItem("language");
    if (langOld !== langActual) {
      this.reload();
      window.location.reload();
    }
    return (
      <Segment loading={this.state.loadArchive} basic={true}>
        {!this.state.sendSuccess && (
          <div>
              <Grid columns={16}>
                <Grid.Row>
                  <Grid.Column
                    largeScreen={1}
                    mobile={1}
                    tablet={1}
                    computer={1}
                  />
                  <Grid.Column
                    largeScreen={14}
                    mobile={14}
                    tablet={14}
                    computer={14}
                  >
                    <div>
                      <label style={{ textAlign: "justify" }}>
                        {this.props.translate(
                          "withdraw.modal.uploadDescription"
                        )}
                      </label>
                    </div>
                  </Grid.Column>
                  <Grid.Column
                    largeScreen={1}
                    mobile={1}
                    tablet={1}
                    computer={1}
                  />
                </Grid.Row>
              </Grid>
              <Grid columns={3}>
                <Grid.Column
                  largeScreen={1}
                  mobile={1}
                  tablet={1}
                  computer={1}
                />
                <Grid.Column
                  largeScreen={14}
                  mobile={14}
                  tablet={14}
                  computer={14}
                >
                  <Form>
                    {this.state.fieldsToShow.length > 0 && (
                      <Grid columns={2}>
                        {this.state.fieldsToShow.map((field) => {
                          return (
                            <Grid.Column
                              largeScreen={8}
                              mobile={8}
                              tablet={8}
                              computer={8}
                            >
                              <FieldDinamic
                                key={field[0]}
                                fieldName={field[0]}
                                fields={field[1]}
                                setData={this.setDataToFhater.bind(this)}
                                showMissing={
                                  this.state.showMissing &&
                                  field[1].required &&
                                  !this.validateState(field[0])
                                }
                              />
                            </Grid.Column>
                          );
                        })}
                      </Grid>
                    )}
                    {(this.state.fieldsToShow.length > 0 ||
                      this.state.statusIdentityVerificationMc === "false" ||
                        this.state.statusSelfieIdentityVerificationMc ===
                          "false") && (
                        <FormVerificationImage
                          validate={this.state.showMissing}
                          setDocument={this.setDocument.bind(this)}
                          setSelfie={this.setSelfie.bind(this)}
                        />
                      )}
                  </Form>
                </Grid.Column>
                <Grid.Column
                  largeScreen={1}
                  mobile={1}
                  tablet={1}
                  computer={1}
                />
              </Grid>
              {(this.state.fieldsToShow.length > 0 ||
                this.state.statusIdentityVerificationMc === "false" ||
                  this.state.statusSelfieIdentityVerificationMc ===
                    "false") && (
                  <div style={{ textAlign: "center", paddingTop: 30 }}>
                    <Button
                      onClick={this.sendIndentityVerication.bind(this)}
                      style={isMobile ? { width: 80 } : { width: 130 }}
                    >
                      <label>
                        {this.props.translate(
                          "withdraw.modal.buttons.sendVerification"
                        )}
                      </label>
                    </Button>
                  </div>
                )}
            </div>
        )}
        {this.state.sendSuccess && (
          <div>
            <div style={{ textAlign: "center", paddingTop: 50 }}>
              <Icon
                name="check circle outline"
                link
                style={{
                  fontSize: 40,
                  color: "#055990",
                  paddingBottom: 20,
                }}
              ></Icon>
            </div>
            <div style={{ textAlign: "center", paddingTop: 40 }}>
              <label
                style={{
                  color: "#055990",
                  marginBottom: 10,
                  fontSize: 17,
                }}
              >
                {this.props.translate(
                  "withdraw.formVerification.messageOperationSuccess"
                )}
              </label>
            </div>
            <div style={{ textAlign: "center", paddingTop: 60 }}>
              <Button
                onClick={this.goToWithdraw.bind(this)}
                style={isMobile ? { width: 80 } : { width: 150 }}
              >
                <label>
                  {this.props.translate("withdraw.modal.buttons.accept")}
                </label>
              </Button>
            </div>
          </div>
        )}
      </Segment>
    );
  }
}

export default translate(FormVerification);
