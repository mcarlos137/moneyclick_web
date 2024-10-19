import React, { Component } from "react";
import { Segment, Menu, Header, Divider } from "semantic-ui-react";

import WalletAccount from "../WalletAccount/WalletAccount";
import ListAccount from "../ListAccount/ListAccount";
import ListAccountOther from "../ListAccountOther/ListAccountOther";
import translate from "../../../i18n/translate";
import { isMobile } from "react-device-detect";
class OptionCurren extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.activeItem,
      translator: props.translate,
    };
    this._Mounted = false;
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.language !== nextProps.language) {
      this.setState({
        translator: nextProps.translate,
      });
    }
  }
  componentDidMount() {
    this._Mounted = true;
  }

  handleItemClick(id, data) {
    this.setState({ active: data.name });
  }
  handleChangeItem(data) {
    this.setState({ active: data });
  }
  componentWillUnmount() {
    this._Mounted = false;
  }
  render() {
    let t = this.state.translator;
    let active = this.state.active;
    let mount = this._Mounted;
    return (
      <Segment>
        {!isMobile && (
          <Header className="titleComponent" textAlign="center">
            {t("profile.optionCurrent.paymentMethods")}
          </Header>
        )}

        {!isMobile && (
          <div>
            <Menu attached="top" tabular>
              {/* <Menu.Item
                name="wallet"
                content={t("profile.optionCurrent.menu.wallet")}
                active={active === "wallet"}
                onClick={this.handleItemClick.bind(this)}
              /> */}
              <Menu.Item
                content={t("profile.optionCurrent.menu.holder")}
                name="list-holder"
                active={active === "list-holder"}
                onClick={this.handleItemClick.bind(this)}
                style={{
                  maxWidth: window.innerWidth <= 430 ? 90 : "",
                  padding: window.innerWidth <= 430 ? 5 : "",
                  textAlign: "center",
                }}
              />
              <Menu.Item
                content={t("profile.optionCurrent.menu.other")}
                name="list-other"
                active={active === "list-other"}
                onClick={this.handleItemClick.bind(this)}
                style={{
                  maxWidth: window.innerWidth <= 430 ? 90 : "",
                  padding: window.innerWidth <= 430 ? 5 : "",
                  textAlign: "center",
                }}
              />
            </Menu>
            <Segment basic>
              {/* {this.state.active === "wallet" && <WalletAccount />} */}
              {this.state.active === "list-holder" && (
                <ListAccount
                  changeItem={this.props.changeItem}
                  cancel={this.handleChangeItem.bind(this)}
                  changeItemTwo={this.props.changeItemTwo}
                />
              )}
              {this.state.active === "list-other" && (
                <ListAccountOther changeItem={this.props.changeItemTwo} />
              )}
            </Segment>
          </div>
        )}
      </Segment>
    );
  }
}
export default translate(OptionCurren);
