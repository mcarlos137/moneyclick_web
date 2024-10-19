import React, { Component } from "react";
import "./ButtonEuro.css";
import {
  Button,
  Segment,
  Form,
  Grid,
  Divider,
  TransitionablePortal,
} from "semantic-ui-react";
import translate from "../../i18n/translate";
class ButtonEuro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translator: props.translate,
      animation: "slide right",
      duration: 500,
      open: true,
    };
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.language !== nextProps.language) {
      this.setState({
        translator: nextProps.translate,
      });
    }
  }
  handleClick = () => this.setState((prevState) => ({ open: !prevState.open }));
  render() {
    let t = this.state.translator;
    const { animation, duration, open } = this.state;
    return (
      <div>
        <TransitionablePortal
          className="transition-fix"
          open={open}
          transition={{ animation, duration }}
        >
          <Segment className="segment-euro" floated="left" inverted compact>
            <b style={{ marginLeft: 25, marginRight: 25 }}>
              {t("buttonEuro.header")}
            </b>
            <Divider hidden />
            <Button
              onClick={() =>
                (window.open("https://venezuela-familycard.com/",'_blank' ))
              }
              id="euro-recharge"
              className="button-click-euro"
              content={t("buttonEuro.button")}
            />
          </Segment>
        </TransitionablePortal>
        <Button
          floated="left"
          className="floating-button-recharge"
          icon={open ? "angle left" : "angle right"}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}
export default translate(ButtonEuro);
