import React, { Component } from "react";
import {
  Segment,
  Button,
  Modal,
  Form,
  Dimmer,
  Loader,
  Message,
  Input,
  Icon,
  Grid,
  Divider,
} from "semantic-ui-react";
import decode from "../../services/decode";
import { isMobile } from "react-device-detect";
import translate from "../../i18n/translate";
import otcService from "../../services/otc";
import userService from "../../services/user";
import NumberFormat from "react-number-format";
class WithdrawConfirmationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      withDrawSucess: false,
      formLoad: false,
      addFrequent: true,
      password: "",
      hidden: true,
    };
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  handleWithdraw() {
    if (this.state.password !== "") {
      let token = window.sessionStorage.getItem("pass");
      let pass = decode.decode(token);
      let passEnd = decode
        .decode(pass.split("##")[0])
        .replace(/[\u0000-\u0019]+/g, "");
      if (passEnd === this.state.password) {
        this._confirmWithDraw();
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

  async createPaymentFromUser() {
    let bodyPayment = {};
    let payment = this.props.data.payment;
    const username = sessionStorage.getItem("username");
    if (this.props.data.transactionTypeSelected === "OWN") {
      payment.mcVerified = true;
      bodyPayment = {
        userName: username,
        currency: this.props.data.body.currency,
        payment: payment,
      };
    } else {
      bodyPayment = {
        userName: username,
        currency: this.props.data.body.currency,
        payment: payment,
      };
    }
    //console.log('body add payment ', bodyPayment);

    let responseCreate = await otcService.addPayment(bodyPayment);
    //console.log("response add payment ", responseCreate.data);
  }

  handleFrequent(event) {
    const value = event.target.checked;
    this.setState({
      addFrequent: value,
    });
  }

  async _confirmWithDraw() {
    this.setState({
      formLoad: true,
    });
    try {
      await userService.sendToPayment(this.props.data.body);
      if (this.props.data.isCreate && this.state.addFrequent) {
        await this.createPaymentFromUser();
        this.setState({
          formLoad: false,
          withDrawSucess: true,
          password: '',
        });
      } else {
        this.setState({
          formLoad: false,
          withDrawSucess: true,
          password: '',
        });
      }
    } catch (e) {
      let error = e.toString();
      if (error.includes("Network")) {
      } else {
      }
    }
  }

  render() {
    let fieldsExclude = [
      "type",
      "messages",
      "automaticCharge",
      "id",
      "currency",
      "mcVerified",
      "verified",
      "own",
      typeof this.props.data.payment !== 'undefined' &&
      typeof this.props.data.payment.bank !== 'undefined' &&
      typeof this.props.data.paymentType !== 'undefined' &&
      this.props.data.payment.bank === this.props.data.paymentType ? "bank" : ""
    ];
    return (
      <Modal open={this.props.open}>
        <Modal.Header>
          {this.props.translate("withdraw.modal.title")}
        </Modal.Header>
        <Modal.Content>
          {this.state.formLoad && (
            <Dimmer active inverted>
              <Loader size="small" inverted />
            </Dimmer>
          )}
          
          {this.props.data.body !== undefined && (
            <div>
              <label style={{ fontWeight: "bold" }}>
                {this.props.translate("withdraw.modal.amount") + ": "}
              </label>
              <NumberFormat
                value={this.props.data.body.amount}
                displayType={"text"}
                thousandSeparator={true}
              />
              {" " + this.props.data.body.currency}
            </div>
          )}
           {this.props.data.body !== undefined && (
            <div style={{ paddingTop: 10 }}>
              <label style={{ fontWeight: "bold" }}>
                {this.props.translate("withdraw.labels.commision") + ": "}
              </label>
              <NumberFormat
                      value= {this.props.data.commision + " " + this.props.data.body.currency}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={2}
                    />
                    {" " + this.props.data.body.currency}
            </div>
          )}
          {this.props.data.body !== undefined  && this.props.data.body.currency !== 'USD' && this.props.amountUSD !== 0 && (
            <div style={{ paddingTop: 10 }}>
              <b>{this.props.translate("sendMoneyClick.equivalentUSD")}</b>
              <NumberFormat
                value={this.props.amountUSD}
                decimalScale={2}
                displayType={"text"}
                thousandSeparator={true}
              />
              {" $"}
            </div>
          )}
     
          {this.props.data.body !== undefined  && this.props.data.body.currency === 'USD' && this.props.data.paymentType !== undefined && (
            <div style={{ paddingTop: 10 }}>
              <label style={{ fontWeight: "bold" }}>
                {this.props.translate("withdraw.picker.PaymentWithin") + ": "}
              </label>
              {this.props.translate(
                "dynamicForm.labels." + this.props.data.paymentType
              )}
            </div>
          )}
          {this.props.data.payment !== undefined && (
            <div>
              {Object.entries(this.props.data.payment).map(([key, value]) => {
                if (fieldsExclude.findIndex((field) => field === key) === -1) {
                  return (
                    <div key={key} style={{ paddingTop: 10 }}>
                      <label style={{ fontWeight: "bold" }}>
                        {this.props.translate("dynamicForm.labels." + key) +
                          ": "}
                      </label>
                      {value}
                    </div>
                  );
                }
              })}
                   <div style={{ paddingTop: 10 }}>
            <label style={{ fontWeight: "bold" }}>
              {this.props.translate("withdraw.picker.titleTransactionType") +
                ": "}
            </label>
            {this.props.translate(
              "withdraw.modal." + this.props.data.transactionTypeSelected
            )}
          </div>
         
          {this.props.data.body !== undefined && this.props.data.body.description !== "" && (
            <div style={{ paddingTop: 10 }}>
              <label style={{ fontWeight: "bold" }}>
                {this.props.translate("withdraw.modal.description") + ": "}
              </label>
              {this.props.data.body.description}
            </div>
          )}

              {!this.state.withDrawSucess && (
                <div>
                  <label>
                    {this.props.translate("sendMoneyClick.modal.password") +
                      " : "}
                  </label>
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
                </div>
              )}
              {this.props.data.isCreate && !this.state.withDrawSucess && (
                <div style={{ paddingTop: 20 }}>
                  <Form.Checkbox
                    label={this.props.translate("withdraw.modal.addFrequent")}
                    onChange={this.handleFrequent.bind(this)}
                    checked={this.state.addFrequent}
                  />
                </div>
              )}
            </div>
          )}

          {this.props.data.alerts !== undefined &&
            !this.state.withDrawSucess &&
            this.props.data.alerts.map(([key, value]) => {
              let messageAndColor = [];
              if (key.includes(":")) {
                messageAndColor = key.split(":");
              }
              return (
                <div style={{ paddingBottom: 10, paddingTop: 10 }}>
                  <label
                    style={{
                      color:
                        messageAndColor.length > 0
                          ? messageAndColor[0].toString().toLowerCase()
                          : "blue",
                    }}
                  >
                    {messageAndColor.length > 0 ? messageAndColor[1] : key}
                  </label>
                </div>
              );
            })}

          {this.state.showError && (
            <div>
              <Divider hidden></Divider>
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
            </div>
          )}
          {this.state.withDrawSucess && (
            <div
              style={{ color: "#055986", paddingTop: 20, textAlign: "center" }}
            >
              <Message positive>
                {this.props.translate("withdraw.modal.messageOperationSuccess")}
              </Message>
            </div>
          )}
        </Modal.Content>
        <Modal.Actions>
          {!this.state.withDrawSucess && (
            <Button secondary onClick={this.props.closeModal} negative>
              {this.props.translate("withdraw.modal.buttons.cancel")}
            </Button>
          )}

          {this.state.withDrawSucess && (
            <Button
              secondary
              onClick={() => {
                this.setState({ withDrawSucess: false });
                this.props.reloadFields();
              }}
              color="blue"
            >
              {this.props.translate("withdraw.modal.buttons.close")}
            </Button>
          )}
          {!this.state.withDrawSucess && (
            <Button
              onClick={this.handleWithdraw.bind(this)}
              positive
              name="withdraw"
              disabled={this.state.formLoad}
            >
              {this.props.translate("withdraw.modal.buttons.send")}
            </Button>
          )}
        </Modal.Actions>
      </Modal>
    );
  }
}

export default translate(WithdrawConfirmationModal);
