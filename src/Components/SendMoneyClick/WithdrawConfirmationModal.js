import React, { Component } from "react";
import {
  Segment,
  Button,
  Modal,
  Form,
  Dimmer,
  Loader
} from "semantic-ui-react";
import {isMobile} from "react-device-detect";
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
            addFrequent: true
        }
    }

    handleWithdraw(){
      this._confirmWithDraw();
       
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
     
      let responseCreate = await otcService.addPayment(bodyPayment);
      console.log('response create ',responseCreate.data);
    }

    handleFrequent(event) {
      const value = event.target.checked;
      this.setState({
        addFrequent: value
      });
    }

    async _confirmWithDraw() {
      this.setState({
        formLoad: true
      });
      try {
        await userService.sendToPayment(this.props.data.body);
        if (this.props.data.isCreate && this.state.addFrequent) {
          await this.createPaymentFromUser();
          this.setState({
            formLoad: false,
            withDrawSucess: true,
          });
        } else {
          this.setState({
            formLoad: false,
            withDrawSucess: true,
          });
        }
      } catch (e) {
        let error = e.toString();
        if (error.includes("Network")) {
      
        } else {
      
        }
      }
    }


  render(){
    const fieldsExclude = ["type","messages","automaticCharge","id","currency","mcVerified","verified"];
      return(
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
          <Segment basic>
          {this.props.data.alerts !== undefined && !this.state.withDrawSucess &&
            this.props.data.alerts.map(([key, value]) => {
            let messageAndColor = [];
            if(key.includes(":")){
              messageAndColor = key.split(":")
            }
            return (<div style={{paddingBottom: 10}}><label style={{color: messageAndColor.length > 0 ? messageAndColor[0].toString().toLowerCase() : "blue"}}>
            {messageAndColor.length > 0 ? messageAndColor[1] : key}
          </label></div>)
          })}
            {this.props.data.body !== undefined &&  (<div>
              {this.props.translate("withdraw.modal.amount")+": "}
              <NumberFormat
              value={this.props.data.body.amount}
              displayType={"text"}
              thousandSeparator={true}
            />
            {" "  + this.props.data.body.currency}
            </div>)}
            <div style={{paddingTop: 10}}>
            {this.props.translate("withdraw.picker.titleTransactionType")+": "+ this.props.translate("withdraw.modal."+this.props.data.transactionTypeSelected)}
            </div>
            {this.props.data.body !== undefined &&  (<div style={{paddingTop: 10}}>
            {this.props.translate("withdraw.labels.commision")+": "+ this.props.data.commision + " "+ this.props.data.body.currency}
            </div>)}
            {this.props.data.body !== undefined &&  (<div style={{paddingTop: 10}}>
            {this.props.translate("withdraw.modal.description")+": "+ this.props.data.body.description}
            </div>)}
            {this.props.data.paymentType !== undefined &&  (<div style={{paddingTop: 10}}>
            {this.props.translate("dynamicForm.labels.text")+": "+ this.props.translate("dynamicForm.labels."+this.props.data.paymentType)}
            </div>)}
            {this.props.data.payment !== undefined && (<div>
            {Object.entries(this.props.data.payment).map(([key, value]) => {
              if(fieldsExclude.findIndex(field => field === key) === -1){
                return(
                  <div key={key} style={{paddingTop: 10}}>
                  {this.props.translate("dynamicForm.labels."+key) +": "+ value}
                  </div>
                );
              }
            })}
             {this.props.data.isCreate && !this.state.withDrawSucess && (<div style={{paddingTop: 10}}>
            <Form.Checkbox
            label={this.props.translate("withdraw.modal.addFrequent")}
                      onChange={this.handleFrequent.bind(this)}
                      checked={this.state.addFrequent}
                    />
            </div>)}
            </div>)}
{this.state.withDrawSucess && (<div style={{color: "#055986",fontSize: isMobile ? 18 : 22,paddingTop: 20,textAlign:"center"}}>
            {this.props.translate("withdraw.modal.messageOperationSuccess")}
            </div>)}
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          {!this.state.withDrawSucess && (
            <Button
              onClick={this.props.closeModal}
              negative
            >
              {this.props.translate("withdraw.modal.buttons.cancel")}
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
          {this.state.withDrawSucess && (
            <Button onClick={()=>{
              this.setState({withDrawSucess: false});
              this.props.reloadFields();
            }} color="blue">
              {this.props.translate("withdraw.modal.buttons.close")}
            </Button>
          )}
        </Modal.Actions>
        </Modal>
      )
  }
}
  
export default translate(WithdrawConfirmationModal);