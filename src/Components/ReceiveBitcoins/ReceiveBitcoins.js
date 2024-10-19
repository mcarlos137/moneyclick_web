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
  Modal,
  Header,
} from "semantic-ui-react";
import React from "react";
import { isMobile } from "react-device-detect";
import translate from "../../i18n/translate";
import NumberFormat from "react-number-format";
import WalletAccount from "../Profile/WalletAccount/WalletAccount";
class ReceiveBitcoins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translator: props.translate,
    };
  }

  async componentDidMount() {}
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.language !== nextProps.language) {
      this.setState({
        translator: nextProps.translate,
      });
    }
  }

  render() {
    let t = this.state.translator;
    return (
      <Segment
        //   loading={this.state.formLoad}
        basic={true}
      >
        <Divider hidden />
        <Grid columns={3}>
          <Grid.Column
            largeScreen={2}
            mobile={1}
            tablet={1}
            computer={2}
            widescreen={2}
          />
          <Grid.Column
            largeScreen={12}
            computer={14}
            widescreen={12}
            mobile={14}
            tablet={14}
          >
            <Segment inverted textAlign="left" className="titleComponents">
              <h4 className="headerComponent">{t("receiveBitcoins.header")}</h4>
            </Segment>
            <Divider hidden></Divider>
            <Form error>
              <WalletAccount />
            </Form>
          </Grid.Column>
          <Grid.Column
            largeScreen={2}
            mobile={1}
            tablet={1}
            computer={2}
            widescreen={2}
          />
        </Grid>
      </Segment>
    );
  }
}
export default translate(ReceiveBitcoins);
