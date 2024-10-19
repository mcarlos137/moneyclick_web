import React, { Component } from "react";
import {
  Segment,
  Button,
  Modal,
  Form,
  Dimmer,
  Loader,
  Input,
  Grid,
  Icon,
  Message,
} from "semantic-ui-react";
import { isMobile } from "react-device-detect";
import translate from "../../i18n/translate";
import otcService from "../../services/otc";
import userService from "../../services/user";
import mcService from "../../services/moneyclick";
import NumberFormat from "react-number-format";
import decode from "../../services/decode";
class SendMoneyClickConfirmationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendSucess: false,
      load: false,
      addFrequent: true,
      hidden: true,
      password: "",
    };
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  handleFrequent(event) {
    const value = event.target.checked;
    this.setState({
      addFrequent: value,
    });
  }

  async _sendMoneyClick() {
    if (this.state.password !== "") {
      let token = window.sessionStorage.getItem("pass");
      let pass = decode.decode(token);
      let passEnd = decode
        .decode(pass.split("##")[0])
        .replace(/[\u0000-\u0019]+/g, "");
      if (passEnd === this.state.password) {
        this.setState({ load: true });
        this.setState({
          sendSucess: false,
          errorRequest: false,
          availableSend: false,
          viewModalErrorConexcion: false,
        });
        let response;
        try {
          if (this.props.isRegisterUser === true) {
          
            response = await mcService.sendMoneyClick(
              this.props.userNameReceiverRegister,
              this.props.currency,
              this.props.amount,
              this.props.description,
              this.props.receiverName +
                " (+" +
                this.props.countryCode +
                +this.props.phone +
                ") ",
              this.props.internationalReceiver
            );
          } else {
           
            response = await mcService.sendMoneyClick(
              this.props.countryCode + this.props.phone,
              this.props.currency,
              this.props.amount,
              this.props.description,
              this.props.receiverName +
                " (+" +
                this.props.countryCode +
                this.props.phone +
                ") ",
              this.props.internationalReceiver
            );
          }
          this.setState({ load: false });

          if (response.data === "OK") {
            this.setState({
              firstNameReceiverRegister: "",
              userNameReceiverRegister: "",
              password: "",
              sendSucess: true,
              amountByCurrency: this.state.amountByCurrencyAfterSend,
            });
          } else if (response.data === "DOES NOT HAVE ENOUGH BALANCE") {
            this.setState({
              availableSend: true,
              messageError: this.props.translate(
                "sendMoneyClick.modal.withoutBalance"
              ),
              showError: true,
            });
            setTimeout(() => {
              this.setState({ messageError: "", showError: false });
            }, 8000);
          } else if (response.data === "USER DAYLY LIMIT REACHED") {
            this.setState({
              availableSend: true,
              messageError: this.props.translate(
                "sendMoneyClick.modal.userDaylyLimitReached"
              ),
              showError: true,
            });
            setTimeout(() => {
              this.setState({ messageError: "", showError: false });
            }, 8000);
          } else if (response.data === "USER MONTHLY LIMIT REACHED") {
            this.setState({
              availableSend: true,
              messageError: this.props.translate(
                "sendMoneyClick.modal.userMoytlyLimitReached"
              ),
              showError: true,
            });
            setTimeout(() => {
              this.setState({ messageError: "", showError: false });
            }, 8000);
          } else if (response.data === "AUTHORIZATION REJECTED") {
            this.setState({
              availableSend: true,
              messageError: this.props.translate(
                "sendMoneyClick.modal.errorNotAuthUser"
              ),
              showError: true,
            });
            setTimeout(() => {
              this.setState({ messageError: "", showError: false });
            }, 8000);
          }
        } catch (e) {
          // console.log(e);
          this.setState({ load: false });
          this.setState({
            availableSend: true,
            messageError: this.props.translate(
              "sendMoneyClick.modal.errorInService"
            ),
            showError: true,
          });
          setTimeout(() => {
            this.setState({ messageError: "", showError: false });
          }, 8000);
        }
      } else {
        this.setState({
          messageError: this.props.translate(
            "sendMoneyClick.modal.errorMachPassword"
          ),
          showError: true,
        });
        setTimeout(() => {
          this.setState({ messageError: "", showError: false });
        }, 8000);
      }
    } else {
      this.setState({
        missingPassword: true,
      });
      setTimeout(() => {
        this.setState({ missingPassword: false });
      }, 5000);
    }
  }

  async addUserFrequent() {
    this.setState({ load: true });
    try {
      let phone = this.props.phone;
      let receiverName = this.props.receiverName;
      let resp = await userService.addUserFrequent(
        this.props.countryCode,
        phone,
        receiverName,
        window.sessionStorage.getItem("username")
      );
      let frequents = this.props.userFrequents;
      frequents.push({
        username: window.sessionStorage.getItem("username"),
        phone: phone,
        codCountry: this.props.countryCode,
        nameUserFrequent: receiverName,
      });
      this.props.updateUserFrequents(frequents);
      this.setState({
        load: false,
      });
      console.log("frequents ", frequents);
      window.sessionStorage.setItem(
        "usersFrequents",
        JSON.stringify(frequents)
      );
      this.setState({ visibleModalSend: false });
      this.setState({ load: false });
      //this.props.cleanFields();
    } catch (error) {
      console.log("error ", error);
      this.setState({ load: false });
      this.setState({
        visibleModalSend: false,
      });
      this.props.cleanFields();
    }
  }

  cleanFields() {
    if (!this.props.existPhoneInListFrequent && this.state.addFrequent) {
      this.addUserFrequent();
      this.props.closeModal();
      this.props.cleanFields();
      this.setState({
        sendSucess: false,
        load: false,
        addFrequent: true,
        hidden: true,
        password: "",
      });
    } else {
      this.setState({
        sendSucess: false,
        load: false,
        addFrequent: true,
        hidden: true,
        password: "",
      });
      this.props.closeModal();
      this.props.cleanFields();
    }
  }

  render() {
    return (
      <Modal open={this.props.open}>
        <Modal.Header>
          {this.props.translate("sendMoneyClick.modal.dataOperation")}
        </Modal.Header>
        <Modal.Content>
          {this.state.load && (
            <Dimmer active inverted>
              <Loader size="small" inverted />
            </Dimmer>
          )}
          <Segment>
            <Grid>
              <Grid.Row>
                <Grid.Column
                  largeScreen={8}
                  computer={8}
                  widescreen={8}
                  mobile={16}
                >
                  <div>
                    <label style={{ fontWeight: "bold" }}>
                      {this.props.translate("sendMoneyClick.modal.receiver")}
                    </label>
                    <label>{this.props.receiverName}</label>
                  </div>
                </Grid.Column>
                <Grid.Column
                  largeScreen={8}
                  computer={8}
                  widescreen={8}
                  mobile={16}
                >
                  <div>
                    <label style={{ fontWeight: "bold" }}>
                      {this.props.translate("sendMoneyClick.modal.phone")}
                    </label>
                    <label>{this.props.countryCode + this.props.phone}</label>
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column
                  largeScreen={8}
                  computer={8}
                  widescreen={8}
                  mobile={16}
                >
                  <div>
                    <label style={{ fontWeight: "bold" }}>
                      {this.props.translate("sendMoneyClick.modal.amount")}
                    </label>

                    <NumberFormat
                      value={this.props.amount}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={
                        this.props.currency !== "BTC" &&
                        this.props.currency !== "ETH"
                          ? 2
                          : 8
                      }
                      prefix={this.props.currency + " "}
                    />
                  </div>
                </Grid.Column>

                <Grid.Column
                  largeScreen={8}
                  computer={8}
                  widescreen={8}
                  mobile={16}
                >
                  {this.props.commision !== 0 && (
                    <div>
                      <label>
                        {this.props.translate(
                          "sendMoneyClick.modal.commission"
                        )}
                      </label>
                      <NumberFormat
                        value={this.props.commision}
                        displayType={"text"}
                        thousandSeparator={true}
                        decimalScale={
                          this.props.currency !== "BTC" &&
                          this.props.currency !== "ETH"
                            ? 2
                            : 8
                        }
                        prefix={this.props.currency + " "}
                      />
                    </div>
                  )}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                {this.props.amountUSD!==0 &&
                <Grid.Column
                  largeScreen={8}
                  computer={8}
                  widescreen={8}
                  mobile={16}
                >
                  {" "}
                  <div>
                    <b>
                      {this.props.translate("sendMoneyClick.equivalentUSD")}
                    </b>
                    <NumberFormat
                      value={this.props.amountUSD}
                      decimalScale={2}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                    {" $"}
                  </div>
                </Grid.Column>}
                {this.props.description !== "" && (
                  <Grid.Column
                    largeScreen={8}
                    computer={8}
                    widescreen={8}
                    mobile={16}
                  >
                    <div>
                      <label style={{ fontWeight: "bold" }}>
                        {this.props.translate(
                          "sendMoneyClick.modal.description"
                        )}
                      </label>
                      <label>{this.props.description}</label>
                    </div>
                  </Grid.Column>
                )}
              </Grid.Row>
{/* 
              {this.props.description !== "" && (
                <Grid.Column
                  largeScreen={8}
                  computer={8}
                  widescreen={8}
                  mobile={16}
                ></Grid.Column>
              )} */}
              {!this.state.sendSucess && (
                <Grid.Column
                  largeScreen={8}
                  computer={8}
                  widescreen={8}
                  mobile={16}
                  verticalAlign={"middle"}
                >
                  <label>
                    {this.props.translate("sendMoneyClick.modal.password")}
                  </label>
                </Grid.Column>
              )}
              {!this.state.sendSucess && (
                <Grid.Column
                  largeScreen={8}
                  computer={8}
                  widescreen={8}
                  mobile={16}
                >
                  <Input
                    value={this.state.password}
                    onChange={(e) => {
                      this.setState({ password: e.target.value });
                    }}
                    icon={
                      this.state.hidden ? (
                        <Icon
                          name="eye slash"
                          circular
                          link
                          onClick={this.toggleShow.bind(this)}
                        />
                      ) : (
                        <Icon
                          name="eye"
                          circular
                          link
                          onClick={this.toggleShow.bind(this)}
                        />
                      )
                    }
                    type={this.state.hidden ? "password" : "text"}
                  />
                  {this.state.missingPassword && (
                    <div style={{ paddingTop: 5 }}>
                      <label style={{ color: "red" }}>
                        {this.props.translate(
                          "sendMoneyClick.modal.errorIsRequired"
                        )}
                      </label>
                    </div>
                  )}
                </Grid.Column>
              )}
            </Grid>
            {this.state.sendSucess && !this.props.existPhoneInListFrequent && (
              <Grid>
                <Grid.Row>
                  <Grid.Column
                    largeScreen={16}
                    computer={16}
                    widescreen={16}
                    mobile={16}
                  >
                    <Form.Checkbox
                      label={this.props.translate(
                        "sendMoneyClick.modal.addUserFrequent"
                      )}
                      onChange={this.handleFrequent.bind(this)}
                      checked={this.state.addFrequent}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            )}
          </Segment>
          <Grid>
            <Grid.Row>
              <Grid.Column
                largeScreen={16}
                computer={16}
                widescreen={16}
                mobile={16}
                textAlign={"center"}
              >
                {!this.props.isRegisterUser && (
                  <label style={{ color: "#055990" }}>
                    {this.props.receiverName}
                    {this.props.translate(
                      "sendMoneyClick.messageNotRegisterUser"
                    )}
                  </label>
                )}
                {this.props.isRegisterUser && !this.state.sendSucess && (
                  <label style={{ color: "#055990" }}>
                    {this.props.translate("sendMoneyClick.messageRegisterUser")}
                    {" " + this.props.firstNameReceiverRegister}
                  </label>
                )}
              </Grid.Column>
            </Grid.Row>
            {this.state.sendSucess && (
              <Grid.Row>
                <Grid.Column
                  largeScreen={16}
                  computer={16}
                  widescreen={16}
                  mobile={16}
                  textAlign={"center"}
                >
                  <label style={{ color: "#055990" }}>
                    {this.props.translate(
                      "sendMoneyClick.modal.operationSuccess"
                    )}
                  </label>
                </Grid.Column>
              </Grid.Row>
            )}
            {this.state.showError && (
              <Grid.Row>
                <Grid.Column
                  largeScreen={16}
                  computer={16}
                  widescreen={16}
                  mobile={16}
                  textAlign={"center"}
                >
                  <Message error>{this.state.messageError}</Message>
                </Grid.Column>
              </Grid.Row>
            )}
          </Grid>
        </Modal.Content>
        <Modal.Actions className="actions-modal">
          {!this.state.sendSucess && (
            <Button secondary onClick={this.props.closeModal}>
              {this.props.translate("sendMoneyClick.modal.cancel")}
            </Button>
          )}
          {!this.state.sendSucess && (
            <Button onClick={this._sendMoneyClick.bind(this)}>
              {this.props.translate("sendMoneyClick.modal.accept")}
            </Button>
          )}
          {this.state.sendSucess && (
            <Button onClick={this.cleanFields.bind(this)}>
              {this.props.translate("sendMoneyClick.modal.accept")}
            </Button>
          )}
        </Modal.Actions>
      </Modal>
    );
  }
}

export default translate(SendMoneyClickConfirmationModal);
