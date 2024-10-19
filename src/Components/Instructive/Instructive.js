import React, { Component } from "react";
import {
  Header,
  Accordion,
  Grid,
  Container,
  Segment,
  Divider,
  Icon,
  Responsive,
} from "semantic-ui-react";
import translate from "../../i18n/translate";
import "./Instructive.css";
import { isMobile } from "react-device-detect";
import { parse } from "query-string";
class Instructive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translator: props.translate,
      activeIndex: 0,
    };
  }
  componentDidMount() {
    const query = parse(window.location.search);
    if (query.l !== undefined) {
      let lang = { value: query.l };
      this.props.handleClick(null, lang);
    }
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.language !== nextProps.language) {
      this.setState({
        translator: nextProps.translate,
      });
    }
  }
  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    let t = this.state.translator;
    const { activeIndex } = this.state;
    return (
      <div>
        <Responsive>
          {!isMobile && <Divider hidden />}
          <Grid>
            {!isMobile && (
              <Grid.Column largeScreen={2} computer={1} widescreen={2} />
            )}
            <Grid.Column largeScreen={12} computer={14} widescreen={12}>
              <Segment basic={true}>
                {window.sessionStorage.getItem("auth") === "true" && (
                  <Segment
                    inverted
                    textAlign="left"
                    className="titleComponents"
                  >
                    <h4 className="headerComponent">
                      {t("instructive.title")}
                    </h4>
                  </Segment>
                )}
                {window.sessionStorage.getItem("auth") !== "true" && (
                  <div>
                    <Divider hidden />
                    <Header
                      size="large"
                      content={t("instructive.title")}
                      textAlign="left"
                    />
                  </div>
                )}
                <Divider hidden></Divider>
                <Container>
                  <Grid columns={1}>
                    <Grid.Column
                      largeScreen={16}
                      mobile={16}
                      tablet={16}
                      computer={16}
                    >
                      {!isMobile && (
                        <Accordion>
                          <Accordion.Title
                            active={activeIndex === 0}
                            index={0}
                            onClick={this.handleClick}
                            className="title-items"
                          >
                            <Icon name="dropdown" />
                            {t("instructive.web.registration.header")}
                          </Accordion.Title>
                          <Accordion.Content
                            active={activeIndex === 0}
                            className="content-items"
                          >
                            <ol>
                              <li value="1">
                                {t("instructive.web.registration.item1")}
                              </li>
                              <li>
                                {t("instructive.web.registration.item2")}
                                <b>{t("instructive.web.registration.item3")}</b>
                              </li>
                              <li>{t("instructive.web.registration.item4")}</li>
                              <li>{t("instructive.web.registration.item5")}</li>
                              <li>{t("instructive.web.registration.item6")}</li>
                            </ol>
                          </Accordion.Content>
                          <Accordion.Title
                            active={activeIndex === 1}
                            index={1}
                            onClick={this.handleClick}
                            className="title-items"
                          >
                            <Icon name="dropdown" />
                            {t("instructive.web.deposit.header")}
                          </Accordion.Title>
                          <Accordion.Content
                            active={activeIndex === 1}
                            className="content-items"
                          >
                            <b>{t("instructive.web.deposit.item1")}</b>
                            <br />
                            <ol>
                              <li value="1">
                                {t("instructive.web.deposit.item2")}{" "}
                                <b>{t("instructive.web.deposit.item3")}</b>{" "}
                                {t("instructive.web.deposit.item4")}
                              </li>
                              <li>{t("instructive.web.deposit.item5")}</li>
                              <li> {t("instructive.web.deposit.item6")}</li>
                              <li>{t("instructive.web.deposit.item7")}</li>
                              <li>{t("instructive.web.deposit.item8")}</li>
                              <li>{t("instructive.web.deposit.item9")}</li>
                              <li>
                                {t("instructive.web.deposit.item10")}{" "}
                                <b>{t("instructive.web.deposit.item11")}</b>{" "}
                                {t("instructive.web.deposit.item12")}
                              </li>
                              <li>{t("instructive.web.deposit.item13")}</li>
                              <li>{t("instructive.web.deposit.item14")}</li>
                            </ol>
                            <b>{t("instructive.web.deposit.item15")}</b>
                            <ol>
                              <li type="disc">
                                {t("instructive.web.deposit.item17")}
                              </li>
                              <li type="disc">
                                {t("instructive.web.deposit.item17")}
                              </li>
                              <li type="disc">
                                {t("instructive.web.deposit.item18")}
                              </li>
                              <li type="disc">
                                {t("instructive.web.deposit.item19")}
                              </li>
                            </ol>
                            <b>{t("instructive.web.deposit.item20")}</b>
                            <ol>
                              <li value="1">
                                {t("instructive.web.deposit.item21")}{" "}
                                <b>{t("instructive.web.deposit.item22")}</b>{" "}
                                {t("instructive.web.deposit.item23")}
                              </li>
                              <li>{t("instructive.web.deposit.item24")}</li>
                              <li>{t("instructive.web.deposit.item25")}</li>
                              <li>{t("instructive.web.deposit.item26")}</li>
                            </ol>
                          </Accordion.Content>
                          <Accordion.Title
                            active={activeIndex === 2}
                            index={2}
                            onClick={this.handleClick}
                            className="title-items"
                          >
                            <Icon name="dropdown" />
                            {t("instructive.web.sendMc.header")}
                          </Accordion.Title>
                          <Accordion.Content
                            active={activeIndex === 2}
                            className="content-items"
                          >
                            <ol>
                              <li value="1">
                                {t("instructive.web.sendMc.item1")}
                                <b>{t("instructive.web.sendMc.item2")}</b>
                                {t("instructive.web.sendMc.item3")}
                              </li>
                              <li>{t("instructive.web.sendMc.item4")}</li>
                              <li>{t("instructive.web.sendMc.item5")}</li>
                              <li>{t("instructive.web.sendMc.item6")}</li>
                              <li>
                                {" "}
                                {t("instructive.web.sendMc.item7")}
                                <b>{t("instructive.web.sendMc.item8")}</b>{" "}
                                {t("instructive.web.sendMc.item9")}
                                <b>{t("instructive.web.sendMc.item10")}</b>{" "}
                                {t("instructive.web.sendMc.item11")}
                              </li>
                              <li>{t("instructive.web.sendMc.item12")}</li>
                            </ol>
                          </Accordion.Content>
                          <Accordion.Title
                            active={activeIndex === 3}
                            index={3}
                            onClick={this.handleClick}
                            className="title-items"
                          >
                            <Icon name="dropdown" />
                            {t("instructive.web.sendToPayments.header")}
                          </Accordion.Title>
                          <Accordion.Content
                            active={activeIndex === 3}
                            className="content-items"
                          >
                            <ol>
                              <li type="disc">
                                {t("instructive.web.sendToPayments.item1")}
                              </li>
                              <li type="disc">
                                {t("instructive.web.sendToPayments.item2")}
                              </li>
                              <li type="disc">
                                {t("instructive.web.sendToPayments.item3") !==
                                  "instructive.web.sendToPayments.item3" &&
                                  t("instructive.web.sendToPayments.item3")}
                                <b>
                                  {t("instructive.web.sendToPayments.item4")}
                                </b>
                                {t("instructive.web.sendToPayments.item5")}
                              </li>
                              <li type="disc">
                                {t("instructive.web.sendToPayments.item6")}
                              </li>
                            </ol>
                            <b> {t("instructive.web.sendToPayments.item7")}</b>
                            <ol>
                              <li value="1">
                                {t("instructive.web.sendToPayments.item8")}
                              </li>
                              <li>
                                {t("instructive.web.sendToPayments.item9")}{" "}
                                <br />
                                {t("instructive.web.sendToPayments.item10")}
                                <b>
                                  {t("instructive.web.sendToPayments.item11")}
                                </b>
                                {t("instructive.web.sendToPayments.item12")}
                              </li>
                              <li>
                                {t("instructive.web.sendToPayments.item13")}
                              </li>
                              <li>
                                {t("instructive.web.sendToPayments.item14")}
                              </li>
                            </ol>
                          </Accordion.Content>
                          <Accordion.Title
                            active={activeIndex === 4}
                            index={4}
                            onClick={this.handleClick}
                            className="title-items"
                          >
                            <Icon name="dropdown" />
                            {t("instructive.web.sendBitcoins.header")}
                          </Accordion.Title>
                          <Accordion.Content
                            active={activeIndex === 4}
                            className="content-items"
                          >
                            <ol>
                              <li type="1">
                                {t("instructive.web.sendBitcoins.item1")}
                                <b>
                                  {" "}
                                  {t("instructive.web.sendBitcoins.item2")}
                                </b>
                                {t("instructive.web.sendBitcoins.item3")}
                              </li>
                              <li>{t("instructive.web.sendBitcoins.item4")}</li>
                              <li>{t("instructive.web.sendBitcoins.item5")}</li>
                              <li>
                                {t("instructive.web.sendBitcoins.item6")}
                                <b>{t("instructive.web.sendBitcoins.item7")}</b>
                                {t("instructive.web.sendBitcoins.item8")}
                              </li>
                              <li>{t("instructive.web.sendBitcoins.item9")}</li>
                            </ol>
                          </Accordion.Content>

                          <Accordion.Title
                            active={activeIndex === 5}
                            index={5}
                            onClick={this.handleClick}
                            className="title-items"
                          >
                            <Icon name="dropdown" />
                            {t("instructive.web.fastChange.header")}
                          </Accordion.Title>
                          <Accordion.Content
                            active={activeIndex === 5}
                            className="content-items"
                          >
                            <ol>
                              <li value="1">
                                {t("instructive.web.fastChange.item1")}
                                <b>{t("instructive.web.fastChange.item2")}</b>
                              </li>
                              <li> {t("instructive.web.fastChange.item3")}</li>
                              <li>{t("instructive.web.fastChange.item4")}</li>
                              <li>{t("instructive.web.fastChange.item5")}</li>
                              <li>{t("instructive.web.fastChange.item6")}</li>
                              <li>{t("instructive.web.fastChange.item7")}</li>
                              <li>{t("instructive.web.fastChange.item8")}</li>
                              <li>
                                {t("instructive.web.fastChange.item9")}
                                <b>{t("instructive.web.fastChange.item10")}</b>
                                {t("instructive.web.fastChange.item11")}
                              </li>
                            </ol>

                            <ol>
                              <b> {t("instructive.web.fastChange.item12")}</b>
                              <li type="disc">
                                {t("instructive.web.fastChange.item13")}
                              </li>
                              <li type="disc">
                                {t("instructive.web.fastChange.item14")}
                              </li>
                              <li type="disc">
                                {t("instructive.web.fastChange.item15")}
                              </li>
                              <li type="disc">
                                {t("instructive.web.fastChange.item16")}
                              </li>
                            </ol>
                          </Accordion.Content>

                          <Accordion.Title
                            active={activeIndex === 6}
                            index={6}
                            onClick={this.handleClick}
                            className="title-items"
                          >
                            <Icon name="dropdown" />
                            {t("instructive.web.conditions.header")}
                          </Accordion.Title>
                          <Accordion.Content
                            active={activeIndex === 6}
                            className="content-items"
                          >
                            <ol>
                              <li value="1">
                                {t("instructive.web.conditions.item1")}{" "}
                                <b>{t("instructive.web.conditions.item2")}</b>{" "}
                              </li>
                              <li>{t("instructive.web.conditions.item3")}</li>
                              <li>{t("instructive.web.conditions.item4")}</li>
                              <li>{t("instructive.web.conditions.item5")}</li>
                              <li>{t("instructive.web.conditions.item6")}</li>
                              <li>{t("instructive.web.conditions.item7")}</li>
                            </ol>
                          </Accordion.Content>

                          <Accordion.Title
                            active={activeIndex === 7}
                            index={7}
                            onClick={this.handleClick}
                            className="title-items"
                          >
                            <Icon name="dropdown" />
                            {t("instructive.web.disclaimer.header")}
                          </Accordion.Title>
                          <Accordion.Content
                            active={activeIndex === 7}
                            className="content-items"
                          >
                            <ol>
                              <li type="disc">
                                {t("instructive.web.disclaimer.item1")}
                              </li>
                              <li type="disc">
                                {t("instructive.web.disclaimer.item2")}
                                <b>{t("instructive.web.disclaimer.item3")}</b>
                              </li>
                              <li type="disc">
                                {t("instructive.web.disclaimer.item4")}
                              </li>
                            </ol>
                          </Accordion.Content>
                          <Accordion.Title
                            active={activeIndex === 8}
                            index={8}
                            onClick={this.handleClick}
                            className="title-items"
                          >
                            <Icon name="dropdown" />
                            {t("instructive.web.alert.header")}
                          </Accordion.Title>
                          <Accordion.Content
                            active={activeIndex === 8}
                            className="content-items"
                          >
                            <ol>
                              <li type="disc">
                                {t("instructive.web.alert.item1")}{" "}
                                <b>{t("instructive.web.alert.item2")}</b>{" "}
                                {t("instructive.web.alert.item3")}
                              </li>
                              <li type="disc">
                                {t("instructive.web.alert.item4")}
                              </li>
                              <li type="disc">
                                {t("instructive.web.alert.item5")}
                              </li>
                              <li type="disc">
                                {t("instructive.web.alert.item6")}
                              </li>
                            </ol>
                          </Accordion.Content>
                          {/* <Accordion.Title
                          active={activeIndex === 8}
                          index={8}
                          onClick={this.handleClick}
                          className="title-items"
                        >
                          <Icon name="dropdown" />
                          {t("instructive.automaticChange.header")}
                        </Accordion.Title>
                        <Accordion.Content
                          active={activeIndex === 8}
                          className="content-items"
                        >
                          <ol>
                            <li type="disc">
                              {t("instructive.automaticChange.item1")}
                            </li>
                            <li type="disc">
                              {t("instructive.automaticChange.item2")}
                            </li>
                          </ol>
                        </Accordion.Content> */}
                        </Accordion>
                      )}
                      {isMobile && (
                        <Accordion>
                          <Accordion.Title
                            active={activeIndex === 0}
                            index={0}
                            onClick={this.handleClick}
                            className="title-items"
                          >
                            <Icon name="dropdown" />
                            {t("instructive.app.registration.header")}
                          </Accordion.Title>
                          <Accordion.Content
                            active={activeIndex === 0}
                            className="content-items"
                          >
                            <ol>
                              <li value="1">
                                {t("instructive.app.registration.item1")}
                              </li>
                              <li>{t("instructive.app.registration.item2")}</li>
                              <li>{t("instructive.app.registration.item3")}</li>
                              <li>{t("instructive.app.registration.item4")}</li>
                              <li>{t("instructive.app.registration.item5")}</li>
                              <li>{t("instructive.app.registration.item6")}</li>
                              {t("instructive.app.registration.item7") !==
                                "instructive.app.registration.item7" && (
                                <li>
                                  {t("instructive.app.registration.item7")}
                                </li>
                              )}
                            </ol>
                          </Accordion.Content>
                          <Accordion.Title
                            active={activeIndex === 1}
                            index={1}
                            onClick={this.handleClick}
                            className="title-items"
                          >
                            <Icon name="dropdown" />
                            {t("instructive.app.deposit.header")}
                          </Accordion.Title>
                          <Accordion.Content
                            active={activeIndex === 1}
                            className="content-items"
                          >
                            <b>{t("instructive.app.deposit.item27")}</b>
                            <br />
                            <ol>
                              <li value="1">
                                {t("instructive.app.deposit.item28")}{" "}
                              </li>
                              <li>
                                {t("instructive.app.deposit.item29")}
                                <b> {t("instructive.app.deposit.item30")}</b>
                                {t("instructive.app.deposit.item31")}
                              </li>
                              <li> {t("instructive.app.deposit.item32")}</li>
                              <li>
                                {t("instructive.app.deposit.item33")}
                                <b>{t("instructive.app.deposit.item34")}</b>
                                {t("instructive.app.deposit.item35")}
                              </li>
                              <li>{t("instructive.app.deposit.item36")}</li>
                            </ol>
                            <b>{t("instructive.app.deposit.item1")}</b>
                            <br />
                            <ol>
                              <li value="1">
                                {t("instructive.app.deposit.item2")}{" "}
                                <b>{t("instructive.app.deposit.item3")}</b>{" "}
                                {t("instructive.app.deposit.item4")}
                              </li>
                              <li>{t("instructive.app.deposit.item5")}</li>
                              <li> {t("instructive.app.deposit.item6")}</li>
                              <li>{t("instructive.app.deposit.item7")}</li>
                              <li>{t("instructive.app.deposit.item8")}</li>
                              <li>{t("instructive.app.deposit.item9")}</li>
                              <li>
                                {t("instructive.app.deposit.item10")}{" "}
                                <b>{t("instructive.app.deposit.item11")}</b>{" "}
                                {t("instructive.app.deposit.item12")}
                              </li>
                              <li>{t("instructive.app.deposit.item13")}</li>
                              <li>{t("instructive.app.deposit.item14")}</li>
                            </ol>
                            <b>{t("instructive.app.deposit.item15")}</b>
                            <ol>
                              <li type="disc">
                                {t("instructive.app.deposit.item16")}
                              </li>
                              <li type="disc">
                                {t("instructive.app.deposit.item17")}
                              </li>
                              <li type="disc">
                                {t("instructive.app.deposit.item18")}
                              </li>
                              <li type="disc">
                                {t("instructive.app.deposit.item19")}
                              </li>
                            </ol>
                            <b>{t("instructive.app.redeemMc.header")}</b>
                            <ol>
                              <li value="1">
                                {t("instructive.app.redeemMc.item1")}
                                <b>{t("instructive.app.redeemMc.item2")}</b>
                                {t("instructive.app.redeemMc.item3")}
                              </li>
                              <li>{t("instructive.app.redeemMc.item4")}</li>
                              <li>{t("instructive.app.redeemMc.item5")}</li>
                              <li>{t("instructive.app.redeemMc.item6")}</li>
                            </ol>
                            <b>{t("instructive.app.deposit.item20")}</b>
                            <ol>
                              <li value="1">
                                {t("instructive.app.deposit.item21")}{" "}
                                <b>{t("instructive.app.deposit.item22")}</b>{" "}
                                {t("instructive.app.deposit.item23")}
                              </li>
                              <li>{t("instructive.app.deposit.item24")}</li>
                              <li>{t("instructive.app.deposit.item25")}</li>
                              <li>{t("instructive.app.deposit.item26")}</li>
                            </ol>
                          </Accordion.Content>
                          <Accordion.Title
                            active={activeIndex === 2}
                            index={2}
                            onClick={this.handleClick}
                            className="title-items"
                          >
                            <Icon name="dropdown" />
                            {t("instructive.app.sendMc.header")}
                          </Accordion.Title>
                          <Accordion.Content
                            active={activeIndex === 2}
                            className="content-items"
                          >
                            <ol>
                              <li value="1">
                                {t("instructive.app.sendMc.item1")}
                                <b>{t("instructive.app.sendMc.item2")}</b>
                                {t("instructive.app.sendMc.item3")}
                              </li>
                              <li>{t("instructive.app.sendMc.item4")}</li>
                              <li>{t("instructive.app.sendMc.item5")}</li>
                              <li>{t("instructive.app.sendMc.item6")}</li>
                              <li>{t("instructive.app.sendMc.item7")}</li>
                              <li>
                                {" "}
                                {t("instructive.app.sendMc.item8")}
                                <b>{t("instructive.app.sendMc.item9")}</b>
                                {t("instructive.app.sendMc.item10")}
                                <b>{t("instructive.app.sendMc.item11")}</b>
                                {t("instructive.app.sendMc.item12")}
                              </li>
                              <li>{t("instructive.app.sendMc.item13")}</li>
                            </ol>
                          </Accordion.Content>
                          <Accordion.Title
                            active={activeIndex === 3}
                            index={3}
                            onClick={this.handleClick}
                            className="title-items"
                          >
                            <Icon name="dropdown" />
                            {t("instructive.app.sendToPayments.header")}
                          </Accordion.Title>
                          <Accordion.Content
                            active={activeIndex === 3}
                            className="content-items"
                          >
                            <ol>
                              <li type="disc">
                                {t("instructive.app.sendToPayments.item1")}
                              </li>
                              <li type="disc">
                                {t("instructive.app.sendToPayments.item2")}
                              </li>
                              <li type="disc">
                                {t("instructive.app.sendToPayments.item3") !==
                                  "instructive.app.sendToPayments.item3" &&
                                  t("instructive.app.sendToPayments.item3")}
                                <b>
                                  {t("instructive.app.sendToPayments.item4")}
                                </b>
                                {t("instructive.app.sendToPayments.item5")}
                              </li>
                              <li type="disc">
                                {t("instructive.app.sendToPayments.item6")}
                              </li>
                            </ol>
                            <b> {t("instructive.app.sendToPayments.item7")}</b>
                            <ol>
                              <li value="1">
                                {t("instructive.app.sendToPayments.item8")}
                              </li>
                              <li>
                                {t("instructive.app.sendToPayments.item9")}{" "}
                                <br />
                                {t("instructive.app.sendToPayments.item10")}
                                <b>
                                  {t("instructive.app.sendToPayments.item11")}
                                </b>
                                {t("instructive.app.sendToPayments.item12")}
                              </li>
                              <li>
                                {t("instructive.app.sendToPayments.item13")}
                              </li>
                              <li>
                                {t("instructive.app.sendToPayments.item14")}
                              </li>
                              <li>
                                {t("instructive.app.sendToPayments.item15")}
                              </li>
                            </ol>
                          </Accordion.Content>
                          <Accordion.Title
                            active={activeIndex === 4}
                            index={4}
                            onClick={this.handleClick}
                            className="title-items"
                          >
                            <Icon name="dropdown" />
                            {t("instructive.app.payShops.header")}
                          </Accordion.Title>
                          <Accordion.Content
                            active={activeIndex === 4}
                            className="content-items"
                          >
                            <ol>
                              <li type="1">
                                {t("instructive.app.payShops.item1")}
                              </li>
                              <li>
                                {t("instructive.app.payShops.item2")}
                                <b>{t("instructive.app.payShops.item3")}</b>
                                {t("instructive.app.payShops.item4")}
                              </li>
                              <li>{t("instructive.app.payShops.item5")}</li>
                              <li>{t("instructive.app.payShops.item6")}</li>
                              <li>
                                {t("instructive.app.payShops.item7")}
                                <b>{t("instructive.app.payShops.item8")}</b>
                                {t("instructive.app.payShops.item9")}
                                <b>{t("instructive.app.payShops.item10")}</b>
                                {t("instructive.app.payShops.item11")}
                              </li>
                              <li>{t("instructive.app.payShops.item12")}</li>
                            </ol>
                          </Accordion.Content>

                          <Accordion.Title
                            active={activeIndex === 5}
                            index={5}
                            onClick={this.handleClick}
                            className="title-items"
                          >
                            <Icon name="dropdown" />
                            {t("instructive.app.sendBitcoins.header")}
                          </Accordion.Title>
                          <Accordion.Content
                            active={activeIndex === 5}
                            className="content-items"
                          >
                            <ol>
                              <li type="1">
                                {t("instructive.app.sendBitcoins.item1")}
                                <b>
                                  {" "}
                                  {t("instructive.app.sendBitcoins.item2")}
                                </b>
                                {t("instructive.app.sendBitcoins.item3")}
                              </li>
                              <li>{t("instructive.app.sendBitcoins.item4")}</li>
                              <li>{t("instructive.app.sendBitcoins.item5")}</li>
                              <li>
                                {t("instructive.app.sendBitcoins.item6")}
                                <b>{t("instructive.app.sendBitcoins.item7")}</b>
                                {t("instructive.app.sendBitcoins.item8")}
                              </li>
                              <li>{t("instructive.app.sendBitcoins.item9")}</li>
                            </ol>
                          </Accordion.Content>

                          <Accordion.Title
                            active={activeIndex === 6}
                            index={6}
                            onClick={this.handleClick}
                            className="title-items"
                          >
                            <Icon name="dropdown" />
                            {t("instructive.app.fastChange.header")}
                          </Accordion.Title>
                          <Accordion.Content
                            active={activeIndex === 6}
                            className="content-items"
                          >
                            <ol>
                              <li value="1">
                                {t("instructive.app.fastChange.item1")}
                                <b>{t("instructive.app.fastChange.item2")}</b>
                              </li>
                              <li> {t("instructive.app.fastChange.item3")}</li>
                              <li>{t("instructive.app.fastChange.item4")}</li>
                              <li>{t("instructive.app.fastChange.item5")}</li>
                              <li>{t("instructive.app.fastChange.item6")}</li>
                              <li>{t("instructive.app.fastChange.item7")}</li>
                              <li>{t("instructive.app.fastChange.item8")}</li>
                              <li>
                                {t("instructive.app.fastChange.item9")}
                                <b>{t("instructive.app.fastChange.item10")}</b>
                                {t("instructive.app.fastChange.item11")}
                              </li>
                            </ol>

                            <ol>
                              <b> {t("instructive.app.fastChange.item12")}</b>
                              <li type="disc">
                                {t("instructive.app.fastChange.item13")}
                              </li>
                              <li type="disc">
                                {t("instructive.app.fastChange.item14")}
                              </li>
                              <li type="disc">
                                {t("instructive.app.fastChange.item15")}
                              </li>
                              <li type="disc">
                                {t("instructive.app.fastChange.item16")}
                              </li>
                            </ol>
                          </Accordion.Content>
                          <Accordion.Title
                            active={activeIndex === 7}
                            index={7}
                            onClick={this.handleClick}
                            className="title-items"
                          >
                            <Icon name="dropdown" />
                            {t("instructive.app.loadBalanceRetail.header")}
                          </Accordion.Title>
                          <Accordion.Content
                            active={activeIndex === 7}
                            className="content-items"
                          >
                            {t("instructive.app.loadBalanceRetail.item1")}
                            <ol>
                              <li type="1">
                                {t("instructive.app.loadBalanceRetail.item2")}
                              </li>
                              <li>
                                {t("instructive.app.loadBalanceRetail.item3")}
                              </li>
                              <li>
                                {t("instructive.app.loadBalanceRetail.item4")}
                              </li>
                            </ol>
                          </Accordion.Content>
                          <Accordion.Title
                            active={activeIndex === 8}
                            index={8}
                            onClick={this.handleClick}
                            className="title-items"
                          >
                            <Icon name="dropdown" />
                            {t("instructive.app.balance.header")}
                          </Accordion.Title>
                          <Accordion.Content
                            active={activeIndex === 8}
                            className="content-items"
                          >
                            {t("instructive.app.balance.item1") !==
                              "instructive.app.balance.item1" &&
                              t("instructive.app.balance.item1")}
                            <b>{t("instructive.app.balance.item2")}</b>
                            {t("instructive.app.balance.item3")}
                          </Accordion.Content>
                          <Accordion.Title
                            active={activeIndex === 9}
                            index={9}
                            onClick={this.handleClick}
                            className="title-items"
                          >
                            <Icon name="dropdown" />
                            {t("instructive.app.transactions.header")}
                          </Accordion.Title>
                          <Accordion.Content
                            active={activeIndex === 9}
                            className="content-items"
                          >
                            {t("instructive.app.transactions.item1")}
                            <b>{t("instructive.app.transactions.item2")}</b>
                            {t("instructive.app.transactions.item3")}
                            <b>{t("instructive.app.transactions.item4")}</b>
                            {t("instructive.app.transactions.item5")}
                            <b>{t("instructive.app.transactions.item6")}</b>
                            {t("instructive.app.transactions.item7") !==
                              "instructive.app.transactions.item7" &&
                              t("instructive.app.transactions.item7")}
                          </Accordion.Content>
                          <Accordion.Title
                            active={activeIndex === 10}
                            index={10}
                            onClick={this.handleClick}
                            className="title-items"
                          >
                            <Icon name="dropdown" />
                            {t("instructive.app.automaticChange.header")}
                          </Accordion.Title>
                          <Accordion.Content
                            active={activeIndex === 10}
                            className="content-items"
                          >
                            <ol>
                              <li value="1">
                                {t("instructive.app.automaticChange.item1")}
                              </li>
                              <li>
                                {t("instructive.app.automaticChange.item2")}
                              </li>
                            </ol>
                          </Accordion.Content>

                          <Accordion.Title
                            active={activeIndex === 11}
                            index={11}
                            onClick={this.handleClick}
                            className="title-items"
                          >
                            <Icon name="dropdown" />
                            {t("instructive.app.conditions.header")}
                          </Accordion.Title>
                          <Accordion.Content
                            active={activeIndex === 11}
                            className="content-items"
                          >
                            <ol>
                              <li value="1">
                                {t("instructive.app.conditions.item1")}{" "}
                                <b>{t("instructive.app.conditions.item2")}</b>{" "}
                              </li>
                              <li>{t("instructive.app.conditions.item3")}</li>
                              <li>{t("instructive.app.conditions.item4")}</li>
                              <li>{t("instructive.app.conditions.item5")}</li>
                              <li>{t("instructive.app.conditions.item6")}</li>
                              <li>{t("instructive.app.conditions.item7")}</li>
                            </ol>
                          </Accordion.Content>

                          <Accordion.Title
                            active={activeIndex === 12}
                            index={12}
                            onClick={this.handleClick}
                            className="title-items"
                          >
                            <Icon name="dropdown" />
                            {t("instructive.web.disclaimer.header")}
                          </Accordion.Title>
                          <Accordion.Content
                            active={activeIndex === 12}
                            className="content-items"
                          >
                            <ol>
                              <li type="disc">
                                {t("instructive.web.disclaimer.item1")}
                              </li>
                              <li type="disc">
                                {t("instructive.web.disclaimer.item2")}
                                <b>{t("instructive.web.disclaimer.item3")}</b>
                              </li>
                              <li type="disc">
                                {t("instructive.web.disclaimer.item4")}
                              </li>
                            </ol>
                          </Accordion.Content>
                          <Accordion.Title
                            active={activeIndex === 13}
                            index={13}
                            onClick={this.handleClick}
                            className="title-items"
                          >
                            <Icon name="dropdown" />
                            {t("instructive.web.alert.header")}
                          </Accordion.Title>
                          <Accordion.Content
                            active={activeIndex === 13}
                            className="content-items"
                          >
                            <ol>
                              <li type="disc">
                                {t("instructive.web.alert.item1")}{" "}
                                <b>{t("instructive.web.alert.item2")}</b>{" "}
                                {t("instructive.web.alert.item3")}
                              </li>
                              <li type="disc">
                                {t("instructive.web.alert.item4")}
                              </li>
                              <li type="disc">
                                {t("instructive.web.alert.item5")}
                              </li>
                              <li type="disc">
                                {t("instructive.web.alert.item6")}
                              </li>
                            </ol>
                          </Accordion.Content>
                        </Accordion>
                      )}
                    </Grid.Column>
                  </Grid>
                </Container>
              </Segment>
              <Divider hidden />
            </Grid.Column>
            <Grid.Column largeScreen={2} computer={1} widescreen={2} />
          </Grid>
        </Responsive>
      </div>
    );
  }
}
export default translate(Instructive);
