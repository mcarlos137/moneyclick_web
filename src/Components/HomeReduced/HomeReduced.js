import React, { Component } from "react";
import "./HomeReduced.css";
import HomeLoggedIn from "../HomeLoggedIn/HomeLoggedIn.js";
import HomeMobile from "../HomeMobile/HomeMobile.js";
import img1 from "../../img/back-1-reduced.png";
import img1english from "../../img/back-1-reduced-ingles.png";
import imgCupon from "../../img/iconos-cupon.png";
import imgCuponEnglish from "../../img/iconos-cupon-ingles.png";
import translate from "../../i18n/translate";
import appStore from "../../img/icono-appstore.png";
import playStore from "../../img/icono-playstore.png";
import user from "../../services/user";
import { isMobile } from "react-device-detect";
import { parse } from "query-string";
import {
  Image,
  Grid,
  Message,
  Loader,
  Dimmer,
  Button,
} from "semantic-ui-react";

class HomeReduced extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translator: props.translate,
      userVerify: false,
      emailVerify: "",
      showModalRegistration: false,
      readyToRedirect: false,
      load: true,
      spanish: true,
    };
  }
  componentWillReceiveProps(nextProps, nextContext) {
    this.getLanguage();
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
    this.getLanguage();
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
    } else if (window.sessionStorage.getItem("language") === "en") {
      this.setState({ spanish: false }, () => {
        this.setState({ load: false });
      });
    } else {
      this.setState({ spanish: true, load: false });
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
  render() {
    let t = this.state.translator;
    let rail;
    if (this.state.userVerify) {
      rail = (
        <Grid.Row textAlign="center" columns="equal" className="row-mobile">
          <Grid.Column />
          <Grid.Column width={10}>
            <Message
              color="blue"
              inverted
              header={
                <div>
                  {t("home.notificationEmailVerify.header.line1")}
                  <strong> {this.state.emailVerify} </strong>
                  {t("home.notificationEmailVerify.header.line2")}
                </div>
              }
              content={t("home.notificationEmailVerify.content")}
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
                    <Grid.Row columns="equal">
                      <Grid.Column
                        largeScreen={8}
                        computer={8}
                        widescreen={8}
                        tablet={8}
                        mobile={6}
                      >
                        {this.state.spanish && (
                          <Image src={img1} className="image1-reduced" />
                        )}
                        {!this.state.spanish && (
                          <Image src={img1english} className="image1-reduced" />
                        )}
                      </Grid.Column>
                      <Grid.Column
                        largeScreen={6}
                        computer={7}
                        widescreen={5}
                        tablet={8}
                        mobile={10}
                      >
                        <Grid.Row textAlign="center" className="logo">
                          {this.state.spanish && (
                            <Image
                              src={imgCupon}
                              style={{ marginTop: "8em" }}
                            />
                          )}
                          {!this.state.spanish && (
                            <Image
                              src={imgCuponEnglish}
                              style={{ marginTop: "8em" }}
                            />
                          )}
                          <br />
                          <h2 className="home-reduced-title">
                            {t("home.homeReduced.title")}
                          </h2>
                          <div>
                            <span className="text-home-reduced">
                              {t("home.homeReduced.text")}
                            </span>
                          </div>
                          <br />
                          <p className="available-home-reduced">
                            {t("home.homeReduced.available")}
                          </p>
                          <Image.Group size="mini">
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
                          <br />
                          <Button
                            className="button-start"
                            size="big"
                            onClick={() => {
                              window.location.href = "/registration";
                            }}
                          >
                            {t("home.homeReduced.startButton")}
                          </Button>
                        </Grid.Row>
                      </Grid.Column>
                      <Grid.Column
                        largeScreen={2}
                        computer={1}
                        widescreen={3}
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

export default translate(HomeReduced);
