import React, { Component } from "react";
import FormVerificationPhone from "../FormVerificationPhone/FormVerificationPhone";
import userAPI from "../../../services/user";
import translate from "../../../i18n/translate";
import RechargeForm from "../RechargeForm/RechargeForm";
class FormProcessRecharge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toUpdate: 1,
      configUser: this.props.configUser,
      translator: props.translate,
    };
    this._isMounted = false;
  }
  handleToUpdate(value) {
    window.open("/recharge", "_self");
    /* this.setState({
      toUpdate: value
    });*/
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.language !== nextProps.language) {
      this.setState({
        translator: nextProps.translate,
      });
    }
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentDidUpdate(prevProps, prevState, snapshop) {
    if (this._isMounted === true) {
      //console.log("se ejecuto el componentDidUpdate");
      if (prevState.toUpdate !== this.state.toUpdate) {
        let username = userAPI.getUserName();
        //console.log("obtener la data del usuario actualizada");
        userAPI.getConfigUserGeneral(username).then((resp) => {
          this.setState({
            configUser: resp.data.result,
          });
        });
      }
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    let t = this.state.translator;
    return (
      <div>
        {typeof this.state.configUser.verification !== "undefined" &&
          typeof this.state.configUser.verification.B === "undefined" && (
            <FormVerificationPhone
              handleToUpdate={this.handleToUpdate.bind(this)}
            />
          )}
        {typeof this.state.configUser.verification !== "undefined" &&
          typeof this.state.configUser.verification.B !== "undefined" &&
         (
          <RechargeForm
              configUser={this.state.configUser}
              handleToUpdate={this.handleToUpdate.bind(this)}
              handleItemClick={this.props.handleItemClick}
            />
          )}
      </div>
    );
  }
}
export default translate(FormProcessRecharge);
