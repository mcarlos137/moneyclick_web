import React, { Component } from "react";
import "../Recharge.css";
import { Message,Responsive,Divider } from "semantic-ui-react";

import userAPI from "../../../services/user";
import translate from "../../../i18n/translate";
var i = 0;
class FormVerificationEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translator: props.translate
    };
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.language !== nextProps.language) {
      this.setState({
        translator: nextProps.translate
      });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshop) {
    ////console.log('se ejecuto el componentDidUpdate');
    // this.props.handleToUpdate(i++); comentado por error en version movil
  }
  componentDidMount() {
    userAPI.verifyUserInit(sessionStorage.getItem("email"));
  }
  render() {
    let t = this.state.translator;
    return (
      <div>
          <Responsive minWidth={992}>
        <Message
          info
          content={
            t("recharge.formVerificationEmail.msg1") +
            sessionStorage.getItem("email") +
            t("recharge.formVerificationEmail.msg2")
          }
        />
        </Responsive>
          <Responsive minWidth={0} maxWidth={991} >
             <Message
          info
          content={
            t("recharge.formVerificationEmail.msg1") +
            sessionStorage.getItem("email") +
            t("recharge.formVerificationEmail.msg2")
          }
        />
        <Divider hidden style={{ height:200}} ></Divider>
          </Responsive>
      </div>
    );
  }
}
export default translate(FormVerificationEmail);
