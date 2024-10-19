import React, { Component } from "react";
import "./Home.css";
import HomeLoggedIn from "../HomeLoggedIn/HomeLoggedIn.js";
import HomeMobile from "../HomeMobile/HomeMobile.js";
import img1 from "../../img/back-1.png";
import img1english from "../../img/back-1-ingles.png";
import img2 from "../../img/back-3.png";
import icn11 from "../../img/icn-11.png";
import hicn2 from "../../img/hlicn-2.png";
import hicn1 from "../../img/icn-3-es.png";
import hicn1En from "../../img/icn-3-INGLES.png";
import hicn3 from "../../img/hlicn-3.png";
import img3 from "../../img/tablet.png";
import logoMC from "../../img/logo.png";
import translate from "../../i18n/translate";
import appStore from "../../img/appStore.png";
import playStore from "../../img/playStore.png";
import phone from "../../img/back-2.png";
import laptop from "../../img/laptop.png";
import item1 from "../../img/icn-1.png";
import item2 from "../../img/icn-2.png";
import item3 from "../../img/icn-3.png";
import user from "../../services/user";
import moneyclickServices from "../../services/moneyclick";
import iconUser from "../../img/icn-usuarios.png";
import iconBitcoins from "../../img/icn-bitcoins.png";
import iconTrans from "../../img/icn-operaciones.png";
import { isMobile } from "react-device-detect";
import { parse } from "query-string";
import {
  Image,
  Grid,
  Statistic,
  Button,
  Segment,
  Message,
  Loader,
  Dimmer,
  Divider,
} from "semantic-ui-react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translator: props.translate,
      userVerify: false,
      emailVerify: "",
      showModalRegistration: false,
      readyToRedirect: false,
      load: true,
      spanish: false,
      achievements: {},
      loadAchievements: false,
    };
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.language !== nextProps.language) {
      this.setState({
        translator: nextProps.translate,
      });
      this.setState({ load: true });
      if (nextProps.language === "es") {
        this.setState({ spanish: true }, () => {
          this.setState({ load: false });
        });
      } else if (nextProps.language === "en") {
        this.setState({ spanish: false }, () => {
          this.setState({ load: false });
        });
      } else {
        this.setState({ spanish: true, load: false });
      }
    }
  }
  componentDidMount() {
    // console.log(
    //   "La resolución de tu pantalla es: " +
    //     window.screen.width +
    //     " x " +
    //     window.screen.height
    // );
    this.getLanguage();
    this.getAchievements();
    const query = parse(window.location.search);

    if (query.t !== undefined) {
      var body = {
        token: query.t,
        email: query.e,
      };
      this.setState({ emailVerify: query.e });
      user.verifyUserRequest(body).then(async (rep) => {
        this.setState({ userVerify: true });
        let userInfo = {
          userName: query.u,
          fieldName: "email",
          fieldValue: query.e,
        };
        await user.addDataUserAsync(userInfo);
        this.sendStartVerificationEmail(query.u);
        if (window.sessionStorage.getItem("auth") !== undefined) {
          if (window.sessionStorage.getItem("auth") === "true") {
            window.sessionStorage.setItem("verify", true);
          }
        }
      });
    }
  }
  getLanguage() {
    if (window.sessionStorage.getItem("language") === "es") {
      this.setState({ spanish: true }, () => {
        this.setState({ load: false });
      });
    } else {
      this.setState({ spanish: false }, () => {
        this.setState({ load: false });
      });
    }
  }
  closeMessage() {
    setTimeout(() => {
      this.setState({
        userVerify: false,
      });
      var uri = window.location.toString();
      if (uri.indexOf("?") > 0) {
        var clean_uri = uri.substring(0, uri.indexOf("?"));
        window.history.replaceState({}, document.title, clean_uri);
      }
    }, 10000);
  }
  sendStartVerificationEmail(email) {
    let bodybtc = {
      userName: email,
      fieldNames: ["email"],
      userVerificationType: "A",
      info: "Verification user email",
    };
    user
      .verifyUserRequestCore(bodybtc)
      .then((res) => {
        //console.log(res);
      })
      .catch((error) => {
        //console.log(error);
      });
  }
  handleRegistration() {
    this.setState({ showModalRegistration: true });
  }
  handleCloseRegistration() {
    this.setState({ showModalRegistration: false });
  }
  reload() {
    this.setState({ readyToRedirect: true });
  }
  getAchievements() {
    this.setState({ loadAchievements: true });
    moneyclickServices
      .getAchievements()
      .then((resp) => {
        let obAchievement = {};
        obAchievement.users = resp.data.users;
        obAchievement.transactions = resp.data.transactions;
        obAchievement.bitcoins = resp.data.bitcoins;
        this.setState({ achievements: obAchievement, loadAchievements: false });
      })
      .catch((error) => {});
  }
  render() {
    let t = this.state.translator;
    let rail;
    if (this.state.userVerify) {
      rail = (
        <Grid.Row textAlign="center" columns="equal" className="row-mobile">
          <Grid.Column />
          <Grid.Column width={10}>
            <Message
              style={{ top: 26 }}
              color="blue"
              inverted
              content={
                <div>
                  {t("home.notificationEmailVerify.header.line1")}
                  <strong> {this.state.emailVerify} </strong>
                  {t("home.notificationEmailVerify.header.line2")}
                  <br />
                  {t("home.notificationEmailVerify.content")}
                </div>
              }
              size="tiny"
            />
          </Grid.Column>
          <Grid.Column />
        </Grid.Row>
      );
      this.closeMessage();
    }
    return (
      <div>
        {window.sessionStorage.getItem("auth") !== "true" && (
          <div>
            {!isMobile && (
              <div>
                {this.state.load && (
                  <Dimmer active inverted>
                    <Loader size="small" inverted />
                  </Dimmer>
                )}
                {!this.state.load && (
                  <Grid columns="equal">
                    {rail}
                    <Grid.Row columns="equal" className="row-mobile">
                      <Grid.Column
                        largeScreen={8}
                        computer={8}
                        widescreen={8}
                        tablet={8}
                        mobile={6}
                      >
                        {this.state.spanish && (
                          <Image src={img1} className="image1" size="large" />
                        )}
                        {!this.state.spanish && (
                          <Image
                            src={img1english}
                            className="image1"
                            size="large"
                          />
                        )}
                      </Grid.Column>
                      <Grid.Column
                        largeScreen={5}
                        computer={7}
                        widescreen={4}
                        tablet={8}
                        mobile={10}
                      >
                        <Grid.Row textAlign="center" className="logo">
                          <Image
                            src={logoMC}
                            size="large"
                            style={{ marginLeft: 30 }}
                          />
                          <br />
                          <div className="text1">
                            <span>{t("home.text1")}</span>
                          </div>

                          <br />
                          <div className="text13">
                            <span>{t("home.text13")}</span>
                          </div>
                          <br />
                          <Image.Group
                            size="small"
                            // className="storeImages"
                          >
                            <a
                              href="https://play.google.com/store/apps/details?id=com.dollarbtc.moneyclick"
                              target="_blank"
                            >
                              <Image src={playStore} />
                            </a>
                            <a
                              href="https://apps.apple.com/us/app/moneyclick/id1501864260?l"
                              target="_blank"
                            >
                              <Image
                                src={appStore}
                                style={{ marginLeft: "2em" }}
                              />
                            </a>
                          </Image.Group>
                          <br></br>
                          <div className="text13">
                            <span>
                              {t("home.text14")}
                              <strong>{t("home.text16")}</strong>
                              {t("home.text17")}
                            </span>
                          </div>
                        </Grid.Row>
                      </Grid.Column>
                      <Grid.Column
                        largeScreen={3}
                        computer={1}
                        widescreen={4}
                      />
                    </Grid.Row>
                    {/* <Grid.Row
                      centered
                      columns="equal"
                      style={{ marginTop: -18 }}
                      textAlign="center"
                    >
                      <Grid.Column widescreen={2}></Grid.Column>
                      <Grid.Column
                        largeScreen={16}
                        computer={16}
                        mobile={16}
                        tablet={16}
                        widescreen={12}
                        className="band-achie"
                        textAlign="center"
                      >
                        <Segment
                          color="blue"
                          inverted
                          loading={this.state.loadAchievements}
                          style={{
                            alignItems: "center",
                            display: "inline-flex",
                            margin: "auto",
                            borderRadius: 0,
                          }}
                        >
                          <Statistic.Group
                            inverted
                            widths={16}
                            style={{
                              alignItems: "center",
                              display: "inline-flex",
                              margin: "auto",
                            }}
                          >
                            <Statistic style={{ width: 65, marginLeft: -20 }}>
                              <Image src={iconUser} style={{ width: 65 }} />
                            </Statistic>
                            <Statistic
                              size="mini"
                              floated="left"
                              style={{ marginRight: "2rem", marginLeft: -5 }}
                            >
                              <Statistic.Value
                                className="text-value"
                                id="value-Stad"
                              >
                                {this.state.achievements.users}
                              </Statistic.Value>
                              <Statistic.Label style={{ textAlign: "left" }}>
                                {t("home.achievement.user")}
                              </Statistic.Label>
                            </Statistic>

                            <Statistic size="small"></Statistic>
                            <Statistic>
                              <Image
                                src={iconTrans}
                                style={{ width: 80, marginTop: 8 }}
                                verticalAlign="middle"
                              />
                            </Statistic>
                            <Statistic
                              size="tiny"
                              floated="left"
                              style={{ marginRight: "2rem" }}
                            >
                              <Statistic.Value
                                className="text-value"
                                id="value-Stad"
                              >
                                {this.state.achievements.transactions}
                              </Statistic.Value>
                              <Statistic.Label style={{ textAlign: "left" }}>
                                {t("home.achievement.transactions")}
                              </Statistic.Label>
                            </Statistic>

                            <Statistic size="small"></Statistic>
                            <Statistic>
                              <Image src={iconBitcoins} style={{ width: 60 }} />
                            </Statistic>
                            <Statistic size="tiny" floated="left">
                              <Statistic.Value
                                className="text-value"
                                id="value-Stad"
                              >
                                {this.state.achievements.bitcoins}
                              </Statistic.Value>
                              <Statistic.Label style={{ textAlign: "left" }}>
                                {t("home.achievement.btc")}
                              </Statistic.Label>
                            </Statistic>
                          </Statistic.Group>
                        </Segment>
                      </Grid.Column>
                      <Grid.Column widescreen={2}></Grid.Column>
                    </Grid.Row> */}
                    <Grid.Row
                      centered
                      columns="equal"
                      //style={{ marginTop: "-9em" }}
                    >
                      <Grid.Column
                        largeScreen={3}
                        computer={2}
                        widescreen={5}
                        tablet={2}
                      />
                      <Grid.Column
                        largeScreen={5}
                        computer={6}
                        widescreen={3}
                        tablet={6}
                        mobile={4}
                      >
                        <div className="text-button-rechargue">
                          <span className="text2">
                            <strong>
                              <h1>
                                {t("home.text2")} {t("home.text3")}
                              </h1>
                            </strong>
                            {/* <strong>
                          <h1></h1>
                        </strong> */}
                          </span>
                          <br />
                          <span className="text4">{t("home.text4")}</span>
                          <br />
                          <br />
                          <Button
                            onClick={() => {
                              window.location.href = "/registration";
                            }}
                          >
                            {t("nav.signuphome")}
                          </Button>
                        </div>
                      </Grid.Column>
                      <Grid.Column
                        largeScreen={8}
                        computer={8}
                        widescreen={8}
                        tablet={8}
                        mobile={12}
                      >
                        {/* <Segment secondary size="small" className="seg-text">
                      <span className="textMessage">
                        0000
                        <br />
                        <strong>{t("home.textMessage1")}</strong>
                        {t("home.textMessage2")}
                      </span>
                    </Segment> */}
                        <Image src={laptop} className="image2" />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row
                      //style={{ marginTop: "-6em" }}
                      textAlign="center"
                    >
                      <Grid.Column widescreen={2} />
                      <Grid.Column
                        largeScreen={16}
                        computer={16}
                        widescreen={12}
                        tablet={16}
                        mobile={16}
                      >
                        <h2 className="title-mc">MoneyClick</h2>
                        <div className="text5">
                          {/* <span>{t("home.text5")}</span> */}
                          {/* <br /> */}
                          <span>{t("home.text6")}</span>
                        </div>
                      </Grid.Column>
                      <Grid.Column widescreen={2} />
                    </Grid.Row>

                    <Grid.Row
                      verticalAlign="middle"
                      textAlign="justified"
                      centered
                      columns="equal"
                    >
                      <Grid.Column
                        largeScreen={2}
                        computer={2}
                        widescreen={2}
                        tablet={4}
                        mobile={4}
                        verticalAlign="middle"
                      >
                        <Image src={icn11} size="small" centered />
                      </Grid.Column>
                      <Grid.Column
                        largeScreen={3}
                        computer={3}
                        widescreen={3}
                        tablet={4}
                        mobile={4}
                        verticalAlign="middle"
                      >
                        <Image src={item2} size="small" centered />
                      </Grid.Column>
                      <Grid.Column
                        largeScreen={3}
                        computer={3}
                        widescreen={3}
                        tablet={4}
                        mobile={4}
                        verticalAlign="middle"
                      >
                        {this.state.spanish && (
                          <Image src={hicn1} size="small" centered />
                        )}
                        {!this.state.spanish && (
                          <Image src={hicn1En} size="small" centered />
                        )}
                      </Grid.Column>
                      <Grid.Column
                        largeScreen={3}
                        computer={3}
                        widescreen={3}
                        tablet={4}
                        mobile={4}
                        verticalAlign="middle"
                      >
                        <Image src={item3} centered size="small" />
                      </Grid.Column>
                      <Grid.Column
                        largeScreen={3}
                        computer={3}
                        widescreen={3}
                        tablet={4}
                        mobile={4}
                        verticalAlign="middle"
                      >
                        <Image src={hicn3} size="medium" centered />
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row
                      verticalAlign="top"
                      textAlign="center"
                      centered
                      columns="equal"
                    >
                      <Grid.Column
                        largeScreen={2}
                        computer={2}
                        widescreen={2}
                        tablet={1}
                        mobile={1}
                        verticalAlign="top"
                      >
                        <span className="item-text">{t("home.item1")}</span>
                      </Grid.Column>
                      <Grid.Column
                        largeScreen={3}
                        computer={3}
                        widescreen={3}
                        tablet={4}
                        mobile={4}
                        verticalAlign="top"
                      >
                        <span className="item-text">{t("home.item2")}</span>
                      </Grid.Column>
                      <Grid.Column
                        largeScreen={3}
                        computer={3}
                        widescreen={3}
                        tablet={4}
                        mobile={4}
                        verticalAlign="top"
                      >
                        <span className="item-text">
                          {t("homeLoggedIn.item1")}
                        </span>
                      </Grid.Column>
                      <Grid.Column
                        largeScreen={3}
                        computer={3}
                        widescreen={3}
                        tablet={4}
                        mobile={4}
                        verticalAlign="top"
                      >
                        <span className="item-text">{t("home.item3")}</span>
                      </Grid.Column>
                      <Grid.Column
                        largeScreen={3}
                        computer={3}
                        widescreen={3}
                        tablet={1}
                        mobile={1}
                        verticalAlign="top"
                      >
                        <span className="item-text">
                          {t("homeLoggedIn.item3")}
                        </span>
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row columns={2} style={{ marginTop: "-12em" }}>
                      <Grid.Column
                        largeScreen={8}
                        computer={8}
                        widescreen={8}
                        tablet={8}
                        mobile={8}
                        //style={{ marginTop: "-50px" }}
                      >
                        <Image src={img2} className="image3" size="big" />
                      </Grid.Column>
                      <Grid.Column
                        largeScreen={8}
                        computer={8}
                        widescreen={8}
                        tablet={8}
                        mobile={8}
                        verticalAlign="middle"
                        textAlign="left"
                      >
                        <div className="div-items">
                          <h2 className="title2">{t("home.text7")}</h2>
                          <div className="items">
                            <span>{t("home.text8")}</span>
                            <br />
                            <br />
                            <span>{t("home.text9")}</span>
                            <br />
                            <br />
                            <span>{t("home.text10")}</span>
                          </div>
                          <br />
                        </div>

                        {/* <Button className="button-download">
                  {t("home.buttonDownload")}
                </Button> */}
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row
                      centered
                      style={{
                        marginTop: window.innerWidth >= 1200 ? "0em" : "-7em",
                      }}
                    >
                      <Grid.Column
                        largeScreen={1}
                        computer={1}
                        widescreen={1}
                        tablet={1}
                        mobile={1}
                      />
                      <Grid.Column
                        largeScreen={5}
                        computer={5}
                        widescreen={5}
                        tablet={5}
                        mobile={5}
                        verticalAlign="middle"
                        textAlign="left"
                      >
                        <div className="text6">
                          <h2 className="title2">{t("home.retailTitle")}</h2>
                          <span>{t("home.text11")}</span>
                          <br />
                        </div>
                        <br />
                        <br />
                        <div className="text15">
                          {" "}
                          <span>
                            <strong>{t("home.text15")}</strong>
                          </span>
                        </div>
                        <br />
                        <Image.Group
                          size="small"
                          style={{ marginLeft: "35px" }}
                        >
                          <a
                            href="https://play.google.com/store/apps/details?id=com.dollarbtc.moneyclick"
                            target="_blank"
                          >
                            <Image src={playStore} />
                          </a>
                          <a
                            href="https://apps.apple.com/us/app/moneyclick/id1501864260?l"
                            target="_blank"
                          >
                            <Image
                              src={appStore}
                              style={{ marginLeft: "1em" }}
                            />
                          </a>
                          <br />
                          <br />
                        </Image.Group>
                      </Grid.Column>

                      <Grid.Column
                        largeScreen={6}
                        computer={6}
                        widescreen={6}
                        tablet={6}
                        mobile={6}
                        verticalAlign="middle"
                      >
                        <Image
                          src={img3}
                          className="image4"
                          style={{ marginLeft: "40px" }}
                        />
                      </Grid.Column>
                      <Grid.Column
                        largeScreen={1}
                        computer={1}
                        widescreen={1}
                        tablet={1}
                        mobile={1}
                      />
                    </Grid.Row>
                  </Grid>
                )}
              </div>
            )}
            {isMobile && (
              <div>
                <HomeMobile />
              </div>
            )}
          </div>
        )}

        {window.sessionStorage.getItem("auth") === "true" && (
          <HomeLoggedIn></HomeLoggedIn>
        )}
      </div>
    );
  }
}

export default translate(Home);
