import React, { Component } from "react";
import "./HomeLoggedNew.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";
import publicIP from "react-native-public-ip";
import apiUtils from "../../services/utils";
import HomeMobile from "../HomeMobile/HomeMobile.js";
import img1 from "../../img/back-1.png";
import iconChatP2P from "../../img/icn-chat-p2p.png";
//import img1 from "../../img/img-telefono.png";
import img1english from "../../img/back-1-ingles.png";
import appStore from "../../img/appStore.png";
import playStore from "../../img/playStore.png";
import translate from "../../i18n/translate";
import zelle from "../../img/logo-zelle.png";
import bitcoin from "../../img/logo-bitcoin.png";
import paypal from "../../img/logo-paypal.png";
import change from "../../img/icn-activo-comprar.png";
import deposit from "../../img/icn-activo-recibir.png";
import transfer from "../../img/icn-activo-enviar.png";
import user from "../../services/user";
import currency from "../../common/currencyFlag";
import moneyclickServices from "../../services/moneyclick";
import mcIcon from "../../img/splash_mc.jpg";
import otc from "../../services/otc";
import NumberFormat from "react-number-format";
import FastChangePrice from "../FastChangePrice/FastChangePrice";
import { isMobile } from "react-device-detect";
import { parse } from "query-string";
import {
  Image,
  Grid,
  Menu,
  Button,
  Segment,
  Message,
  Loader,
  Dimmer,
  Divider,
  Label,
  Popup,
  GridColumn,
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
      loadAchievements: false,
      countryCurrency: "",
      loadCountry: true,
      coins: this.props.coins,
      symbol: "",
      showCarrousel: true,
      data: null,
      buy: 0,
      sell: 0,
      balanceMoneyClick: 0,
      currentIndex: 0,
      balanceCurrencies: [],
      user: window.sessionStorage.getItem("username"),
      mainBalance: [],
      viewOptionDeposit: false,
      viewOptionChange: false,
      viewOptionSend: false,
      usdBalance: 0,
      btcBalance: 0,
      pairP2P: this.props.pairP2P,
      loadPair: this.props.loadPair,
      arrayView: [],
      availableBalanceBTCDeferred: 0
    };
  }
  responsive = {
    0: { items: 1 },
    600: { items: 3 },
    1024: { items: 3 },
  };
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
  componentWillMount() {
    this.getIp();

    this._isMounted = true;
  }
  floorDecimals(value, numberDecimals) {
    let decimales = Math.pow(10, numberDecimals);
    return Math.floor(value * decimales) / decimales;
  }
  getBalance() {
    if (this.state.user !== null) {
      moneyclickServices
        .getBalanceMoneyclick(this.state.user)
        .then(async (resp) => {
          //console.log('getBalanceMoneyclick ', resp.data);
          try {
            let currenciesColOne = [];
            let mainArray = [];
            const currencies = await otc.getCurrencies();
            let currenciesArray = [];
            currenciesArray = currencies.data;
            console.log('currenciesArray ', currenciesArray);
            currenciesArray = currenciesArray.filter((curren) => {
              return curren.active === true;
            });
            let orderCurrency = await otc.getOrdersCurrencys(this.state.user);
           
            Object.entries(resp.data).forEach(([key, value]) => {
              let objCurrency = {};
              if (
                key !== "usdEstimatedBalance" &&
                key !== "btcEstimatedBalance"
              ) {
                if (key !== "BTC") {
                  let findCurren = currenciesArray.find((currency) => {
                    return currency.shortName === key;
                  });
                  if (findCurren !== undefined) {

                    let findCurrency = currency.currenciesFlag[key];
                 
                    if (findCurrency !== undefined) {
                      let indexPosition = orderCurrency.data.indexOf(key);
                    if (indexPosition !== -1) {
                        currency.priority = indexPosition + 1;
                    }
                      /*if (indexPosition !== -1) {
                        if (this.state.countryCurrency === "USD") {
                          if (key === "USD") {
                            objCurrency.priority = 1;
                          } else if (key === "EUR") {
                            objCurrency.priority = 3;
                          } else {
                            objCurrency.priority = indexPosition + 5;
                          }
                        } else if (this.state.countryCurrency === "EUR") {
                          if (key === "EUR") {
                            objCurrency.priority = 1;
                          } else if (key === "USD") {
                            objCurrency.priority = 2;
                          } else {
                            objCurrency.priority = indexPosition + 5;
                          }
                        } else {
                          if (key === "USD") {
                            objCurrency.priority = 1;
                          } else if (key === "EUR") {
                            objCurrency.priority = 2;
                          } else if (key === this.state.countryCurrency) {
                            objCurrency.priority = 3;
                          } else {
                            objCurrency.priority = indexPosition + 5;
                          }
                        }
                      }*/

                      let availableBalance = value.availableBalance;
                      let dataString = availableBalance.toString();
                      let availableBalanceFix;
                      let dataString2 = availableBalance.toLocaleString();

                      if (dataString.includes("e")) {
                        availableBalanceFix = Number.parseFloat(
                          dataString2
                        ).toFixed(12);
                      } else {
                        availableBalanceFix = availableBalance;
                      }

                      objCurrency.currency = key;
                      objCurrency.symbol = findCurrency.symbol;
                      objCurrency.deferredBalance = value.deferredBalance;
                      objCurrency.balance = availableBalanceFix;
                      objCurrency.balanceUsd = value.usdEstimatedBalance;
                      objCurrency.img = findCurrency.img;
                      objCurrency.btcBuyPrice =
                        value.btcBuyPrice !== null ? value.btcBuyPrice : 0;
                      objCurrency.btcSellPrice =
                        value.btcSellPrice !== null ? value.btcSellPrice : 0;

                      if (
                        value.btcBuyPrice !== null &&
                        value.btcSellPrice !== null
                      ) {
                        objCurrency.btcBuyMinAmount = value.btcBuyMinAmount;
                        objCurrency.btcBuyMaxAmount = value.btcBuyMaxAmount;
                        objCurrency.btcSellMinAmount = value.btcSellMinAmount;
                        objCurrency.btcSellMaxAmount = value.btcSellMaxAmount;

                        currenciesColOne.push(objCurrency);
                      } else {
                        currenciesColOne.push(objCurrency);
                      }
                    } else {
                      let currenData = {
                        key: key.toLowerCase(),
                        value: key,
                        flag: key.toLowerCase(),
                        text: findCurren.fullName,
                        img: mcIcon,
                        alias: key,
                        isCripto: false,
                        symbol: " ",
                        priority: 20,
                      };
                      let indexPosition = orderCurrency.data.indexOf(key);
                      if (indexPosition !== -1) {
                        currenData.priority = indexPosition + 1;
                      }
                      currenData.availableBalance = value.availableBalance;
                      currenData.deferredBalance = value.deferredBalance;
                      currenData.estimatedBalance = value.estimatedBalance;
                      currenData.btcBuyPrice =
                        value.btcBuyPrice !== null ? value.btcBuyPrice : 0;
                      currenData.btcSellPrice =
                        value.btcSellPrice !== null ? value.btcSellPrice : 0;
                      currenciesColOne.push(currenData);
                    }
                  }
                } else {
                  let findCurrency = currency.currenciesFlag[key];
                  if (findCurrency !== undefined) {
                    let indexPosition = orderCurrency.data.indexOf(key);
                    if (indexPosition !== -1) {
                      if (this.state.countryCurrency === "USD") {
                        objCurrency.priority = 2;
                      } else if (this.state.countryCurrency === "EUR") {
                        objCurrency.priority = 3;
                      } else {
                        objCurrency.priority = indexPosition + 4;
                      }
                    }

                    let availableBalance = value.availableBalance;
                    let dataString = availableBalance.toString();
                    let availableBalanceFix;
                    let dataString2 = availableBalance.toLocaleString();

                    if (dataString.includes("e")) {
                      availableBalanceFix = Number.parseFloat(
                        dataString2
                      ).toFixed(12);
                    } else {
                      availableBalanceFix = availableBalance;
                    }

                    let availableBalanceDeferred = value.deferredBalance !== undefined ? value.deferredBalance : 0 ;
                    let dataStringDeferred = availableBalanceDeferred.toString();
                    let availableBalanceFixDeferred;
                    let dataString2Deferred = availableBalanceDeferred.toLocaleString();

                    if (dataStringDeferred.includes("e")) {
                      availableBalanceFixDeferred = Number.parseFloat(
                        dataString2Deferred
                      ).toFixed(12);
                    } else {
                      availableBalanceFixDeferred = availableBalanceDeferred;
                    }

                    this.setState({
                      availableBalanceBTCDeferred: availableBalanceFixDeferred
                    })

                    objCurrency.currency = key;
                    objCurrency.symbol = findCurrency.symbol;
                    objCurrency.balance = availableBalanceFix;
                    objCurrency.balanceUsd = value.usdEstimatedBalance;
                    objCurrency.deferredBalance = value.deferredBalance;
                    objCurrency.img = findCurrency.img;
                    currenciesColOne.push(objCurrency);
                  }
                }
              } else {
                if (key === "usdEstimatedBalance") {
                  let dataString = value.toString();
                  let dataFix;
                  let dataString2 = value.toLocaleString();

                  if (dataString.includes("e")) {
                    dataFix = Number.parseFloat(dataString2).toFixed(12);
                  } else {
                    dataFix = value;
                  }
                  this.setState({
                    usdBalance: dataFix,
                  });
                }
                if (key === "btcEstimatedBalance") {
                  let dataString = value.toString();
                  let dataFix;
                  let dataString2 = value.toLocaleString();
                  if (dataString.includes("e")) {
                    dataFix = Number.parseFloat(dataString2).toFixed(12);
                  } else {
                    dataFix = value;
                  }
                  this.setState({
                    btcBalance: dataFix,
                  });
                }
              }
            });
            currenciesColOne = currenciesColOne.sort((a, b) => {
              return a.priority - b.priority;
            });

            //console.log('currenciesColOne ',currenciesColOne);
            this.setState({
              mainBalance: mainArray,
              balanceCurrencies: currenciesColOne,
              showCarrousel: false,
              loadCountry: false,
            });
          } catch (error) {
            //console.log(error);
          }
        })
        .catch((error) => {
          //console.log(error);
        });
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
  getIp() {
    publicIP()
      .then((ip) => {
        apiUtils
          .getAllInfo(ip)
          .then((res) => {
            let currency = "";
            currency = res.data.currency;
            this.setState({ countryCurrency: currency }, () => {
              this.getBalance();
            });
          })
          .catch((error) => {
            //console.log(error);
          });

        // '47.122.71.234'
      })
      .catch((error) => {
        //console.log(error);
        // 'Unable to get IP address.'
      });
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

  handleClickItemStatic(e, data) {
    let el = this.props.coins.find(function (element) {
      return data.name === element.value;
    });
    this.setState({
      symbol: "BTC" + data.name,
      showmodal: true,
      data: el.percent,
      buy: el.buy,
      sell: el.sell,
    });
  }
  handleModal() {
    this.setState({ symbol: "", showmodal: false });
  }
  slideTo(i) {
    if (this._isMounted) {
      this.setState({ currentIndex: i });
    }
  }
  onSlideChange(e) {}
  onSlideChanged(e) {
    if (this._isMounted) {
      this.setState({ currentIndex: e.item });
    }
  }

  slideNext() {
    if (this._isMounted) {
      this.setState({ currentIndex: this.state.currentIndex + 1 });
    }
  }

  slidePrev() {
    if (this._isMounted) {
      this.setState({ currentIndex: this.state.currentIndex - 1 });
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  optionDeposit() {
    this.setState({
      viewOptionDeposit: !this.state.viewOptionDeposit,
      viewOptionChange: false,
      viewOptionSend: false,
    });
  }
  optionFastChange() {
    this.setState({
      viewOptionChange: !this.state.viewOptionChange,
      viewOptionDeposit: false,
      viewOptionSend: false,
    });
  }
  optionSend() {
    this.setState({
      viewOptionSend: !this.state.viewOptionSend,
      viewOptionDeposit: false,
      viewOptionChange: false,
    });
  }
  render() {
    let t = this.state.translator;
    let currentIndex, carouselBalance;
    currentIndex = this.state.currentIndex;
    let rail;
    let arrayP2P;
    if (this.props.pairP2P.length >= 5) {
      if (window.innerWidth < 1100) {
        arrayP2P = this.props.pairP2P.slice(0, 5);
      } else if (window.innerWidth > 1400) {
        arrayP2P = this.props.pairP2P.slice(0, 7);
      } else {
        arrayP2P = this.props.pairP2P.slice(0, 6);
      }
    } else {
      arrayP2P = this.props.pairP2P;
    }

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

    let listItem = this.state.balanceCurrencies.map((item, i) => (
      <Segment key={`key-${i}`} basic>
          <Grid>
          <Grid.Row>
        
            <Grid.Column width={ 15}>
              <div className="aline-title-balance">
          {item.currency !== undefined && (
            <Image
              circular
              className="img-balance-title"
              src={currency.currenciesFlag[item.currency].img}
            />
          )}

          <h4 className="title-balance">Balance {item.currency}</h4>
              </div>
              <div style={{paddingTop: "3px"}}/>
              <div className="title-balance">
                
          {item.symbol}{" "}
          <NumberFormat
                  style={{paddingTop: "-15px"}}
            value={this.floorDecimals(
              item.balance,
              item.currency === "BTC" || item.currency === "ETH" ? 8 : 2
            )}
            displayType={"text"}
            thousandSeparator={true}
          />
              </div>
              {item.deferredBalance !== undefined && (<p className="subBalance">
                <p style={{fontWeight: "bold"}}>{t("homeLoggedIn.deferred")}{" " + item.symbol +" "}</p>
                <NumberFormat
                  style={{paddingTop: "-15px"}}
                  value={this.floorDecimals(
                    item.deferredBalance,
                    item.currency === "BTC" || item.currency === "ETH"? 8 : 2
                  )}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </p>)}
            </Grid.Column>
            <Grid.Column width={1}>
              <div className="line-vertical-global"></div>
                 <div className="line-vertical-global"></div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    ));

    if (this._isMounted) {
      carouselBalance = (
        <AliceCarousel
          id="alice-custom"
          autoWidth={ true}
          items={listItem}
          autoPlay={false}
          startIndex={currentIndex}
          fadeOutAnimation={true}
          mouseDragEnabled={false}
          playButtonEnabled={false}
          autoPlayInterval={4000}
          buttonsDisabled={true}
          keysControlDisabled={true}
          dotsDisabled={true}
          responsive={this.responsive}
          disableAutoPlayOnAction={true}
          onSlideChange={this.onSlideChange}
          onSlideChanged={this.onSlideChanged}
          itemsInSlide={3}
        />
      );
    }
    return (
      <div>
        {window.sessionStorage.getItem("auth") === "true" && (
          <div>
            {!isMobile && (
              <div>
                {this.state.load && (
                  <Dimmer active inverted>
                    <Loader size="small" inverted />
                  </Dimmer>
                )}

                <Grid columns="equal" style={{ marginTop:10  }}>
                  {rail}
                  <Grid.Row style={{ marginTop: 25 }}>
                    <Grid.Column largeScreen={1} computer={1} widescreen={1} />
                    <Grid.Column
                      largeScreen={14}
                      computer={14}
                      widescreen={14}
                      tablet={16}
                    >
                      <Segment
                        loading={this.props.loadPair}
                        inverted
                        textAlign="center"
                        style={{
                          backgroundColor: "#f4f4f4",
                          display: "inline-flex",
                          verticalAlign: "middle",
                          width: "100%",
                          justifyContent: "center",
                        }}
                      >
                        <Grid style={{ width: "100%" }}>
                          <Grid.Column
                            width={2}
                            style={{ padding: "14px 5px 14px 5px" }}
                          >
                            <div
                              style={{
                                borderRight: "1px white solid",
                                //marginRight: 6,
                                display: "flex",
                              }}
                            >
                              <Label
                                style={{
                                  backgroundColor: "#f4f4f4",
                                  verticalAlign: "middle",
                                  marginTop: -5,
                                  marginBottom: -10,
                                  textAlign: "left",
                                }}
                              >
                               <p style={{ fontWeight: "bold", color: "#1b8dc3", fontSize: "11px"}}>Money Market<br /><span style={{color: "black", fontSize: "10px",}}>(IOS - Android)</span></p>
                              </Label>
                            </div>
                          </Grid.Column>
                          <Grid.Column
                            width={14}
                            textAlign="left"
                            style={{ padding: "14px 5px 14px 5px" }}
                          >
                            {arrayP2P.map((item, i) => (
                              <Label
                                key={i}
                                horizontal
                                style={{
                                  backgroundColor: "#f4f4f4",
                                  fontSize: "12px",
                                  color: "#062433",
                                  verticalAlign: "middle",
                                  fontWeight: "bold",
                                  marginRight: 3,
                                  paddingLeft: 1,
                                }}
                              >
                                {item.pair.slice(0, 3) +
                                  "/" +
                                  item.pair.slice(-3)}{" "}
                                <NumberFormat
                                  value={item.price}
                                  decimalScale={
                                    item.pair.slice(3) !== "BTC" ? 2 : 8
                                  }
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  style={{ fontWeight: "normal" }}
                                />
                                <Label
                                  circular
                                  color={item.type === "BUY" ? "green" : "red"}
                                  empty
                                  style={{
                                    verticalAlign: "middle",
                                    marginTop: -2,
                                    marginLeft: 4,
                                    backgroundColor: "#062433",
                                  }}
                                />
                              </Label>
                            ))}
                          </Grid.Column>
                        </Grid>
                      </Segment>
                    </Grid.Column>
                    <Grid.Column largeScreen={1} computer={1} widescreen={1} />
                  </Grid.Row>
                  <Grid.Row columns="equal" style={{ marginTop: -65 }}>
                    <Grid.Column
                      largeScreen={1}
                      computer={1}
                      widescreen={1}
                      verticalAlign="middle"
                    />
                    <Grid.Column
                      largeScreen={window.innerWidth > 915 ? 8 : 14}
                      computer={window.innerWidth > 915 ? 8 : 14}
                      widescreen={window.innerWidth > 915 ? 8 : 14}
                      tablet={window.innerWidth > 915 ? 8 : 14}
                      verticalAlign="top"
                      className="column-balance"
                    >
                      <Grid.Row textAlign="center">
                        <Grid>
                          <Grid.Row verticalAlign="top" textAlign="center">
                            <Grid.Column
                              largeScreen={1}
                              computer={1}
                              widescreen={1}
                              tablet={1}
                              verticalAlign="middle"
                              textAlign="center"
                            ></Grid.Column>
                            <Grid.Column
                              largeScreen={14}
                              computer={14}
                              widescreen={14}
                              tablet={14}
                              verticalAlign="middle"
                              textAlign="center"
                            >
                              <Segment basic>
                                <Grid>
                                  <Grid.Column
                                    largeScreen={2}
                                    computer={2}
                                    widescreen={2}
                                    tablet={2}
                                    verticalAlign="middle"
                                    textAlign="center"
                                  ></Grid.Column>
                                  <Grid.Column
                                    largeScreen={12}
                                    computer={12}
                                    widescreen={12}
                                    tablet={12}
                                    verticalAlign="middle"
                                    textAlign="center"
                                  >
                                    <Segment
                                      className="balance-global-segment"
                                      loading={this.state.loadCountry}
                                    >
                                      <Grid.Row>
                                        <p className="text-segment-balanceNew">
                                          <strong>
                                            {t("homeLoggedIn.balanceGlobal")}
                                          </strong>
                                        </p>
                                      </Grid.Row>
                                      <Grid.Row>
                                        <Grid>
                                          <Grid.Column
                                            largeScreen={7}
                                            computer={7}
                                            widescreen={7}
                                            tablet={7}
                                            textAlign="center"
                                          >
                                            <p className="text21-segment-balanceNew">
                                              <strong>{"USD"} </strong>
                                              {this.floorDecimals(
                                                this.state.usdBalance,
                                                2
                                              )}
                                            </p>
                                          </Grid.Column>
                                          <Grid.Column width={ 2}>
                                            <div className="line-vertical-global"></div>
                                            </Grid.Column>
                                          <Grid.Column
                                            largeScreen={7}
                                            computer={7}
                                            widescreen={7}
                                            tablet={7}
                                            textAlign="center"
                                          >
                                            <p className="text21-segment-balanceNew">
                                              <strong>{"BTC "}</strong>
                                              {this.floorDecimals(
                                                this.state.btcBalance,
                                                8
                                              )}
                                            </p>
                                          </Grid.Column>
                                        </Grid>
                                      </Grid.Row>
                                    </Segment>
                                  </Grid.Column>
                                  <Grid.Column
                                    largeScreen={2}
                                    computer={2}
                                    widescreen={2}
                                    tablet={2}
                                    verticalAlign="middle"
                                    textAlign="center"
                                  ></Grid.Column>
                                </Grid>
                              </Segment>
                            </Grid.Column>
                          </Grid.Row>


                          <Grid.Row
                            verticalAlign="top"
                            textAlign="center"
                            style={{ marginTop: "-40px" }}
                          >
                            <Grid.Column
                              largeScreen={1}
                              computer={1}
                              widescreen={1}
                              tablet={1}
                              verticalAlign="middle"
                              textAlign="center"
                            >
                              <Button
                                //basic
                                color="grey"
                                name="left"
                                circular
                                icon="chevron left"
                                onClick={this.slidePrev.bind(this)}
                                // className="button-carousel-balance"
                              />
                            </Grid.Column>
                            <Grid.Column
                              largeScreen={14}
                              computer={14}
                              widescreen={14}
                              tablet={14}
                            >
                              <Segment
                                className="balance-segment"
                                loading={this.state.loadCountry}
                              >
                                {!this.state.loadCountry && (
                                  <div className="line-vertical-logged">
                                    <div className="line-vertical"></div>
                                    <div className="line-vertical"></div>
                                  </div>
                                )}

                                {carouselBalance}
                              </Segment>
                            </Grid.Column>
                            <Grid.Column
                              largeScreen={1}
                              computer={1}
                              widescreen={1}
                              tablet={1}
                              verticalAlign="middle"
                              textAlign="center"
                            >
                              <Button
                                // basic
                                color="grey"
                                name="right"
                                circular
                                icon="chevron right"
                                style={{
                                  marginLeft: -8,
                                }}
                                // className="button-carousel-balance"
                                onClick={this.slideNext.bind(this)}
                              />
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>

                        <div className="images-group-options">
                          <Popup
                            content={t("nav.receive")}
                            inverted
                            position="top center"
                            trigger={
                              <Button
                                circular
                                onClick={this.optionDeposit.bind(this)}
                                style={{
                                  width: 80,
                                }}
                              >
                                <Image
                                  centered
                                  src={deposit}
                                  className="img-option-public"
                                />
                              </Button>
                            }
                          />

                          <Popup
                            content={t("nav.fastChange")}
                            inverted
                            position="top center"
                            trigger={
                              <Button
                                circular
                                onClick={this.optionFastChange.bind(this)}
                                style={{
                                  width: 80,
                                  marginLeft: 35,
                                  marginRight: 35,
                                }}
                              >
                                <Image
                                  centered
                                  src={change}
                                  className="img-option-public"
                                  size="small"
                                />
                                {/* <div className="text-button-option">
                                  {t("nav.fastChange").toUpperCase()}
                                </div> */}
                              </Button>
                            }
                          />
                          <Popup
                            content={t("nav.send")}
                            inverted
                            position="top center"
                            trigger={
                              <Button
                                circular
                                onClick={this.optionSend.bind(this)}
                                style={{
                                  width: 80,
                                  padding: 10,
                                }}
                              >
                                <Image
                                  centered
                                  src={transfer}
                                  className="img-option-public"
                                />
                                {/* <div className="text-button-option">
                                  {t("nav.send").toUpperCase()}
                                </div> */}
                              </Button>
                            }
                          />
                        </div>
                        <Grid>
                          <Grid.Row
                            verticalAlign="top"
                            textAlign="center"
                            className="subnav"
                          >
                            <Grid.Column
                              largeScreen={2}
                              computer={2}
                              widescreen={2}
                              tablet={2}
                            />
                            <Grid.Column
                              largeScreen={4}
                              computer={4}
                              widescreen={5}
                              tablet={4}
                              verticalAlign="top"
                            >
                              {this.state.viewOptionDeposit && (
                                <Label
                                  pointing
                                  size="small"
                                  className="label-balance-1"
                                >
                                  <Menu
                                    pointing
                                    vertical
                                    compact
                                    className="menu-balance"
                                    style={{ width: 135 }}
                                  >
                                    <Menu.Item
                                      className="item-options"
                                      as={Link}
                                      to="/recharge"
                                    >
                                      {t("nav.fromBanks")}
                                    </Menu.Item>
                                  </Menu>
                                </Label>
                              )}
                            </Grid.Column>
                            <Grid.Column
                              largeScreen={4}
                              computer={4}
                              widescreen={3}
                              tablet={4}
                              verticalAlign="top"
                            >
                              {this.state.viewOptionChange && (
                                <Label
                                  pointing
                                  size="mini"
                                  className="label-balance"
                                  style={{
                                    marginLeft: "0em",
                                  }}
                                >
                                  <Menu
                                    pointing
                                    vertical
                                    compact
                                    className="menu-balance"
                                    id="menu-width"
                                  >
                                    <Menu.Item
                                      className="item-options-end"
                                      as={Link}
                                      to="/fastChange"
                                    >
                                      {t("nav.fastChange")}
                                    </Menu.Item>
                                  </Menu>
                                </Label>
                              )}
                            </Grid.Column>
                            <Grid.Column
                              largeScreen={4}
                              computer={4}
                              widescreen={4}
                              tablet={4}
                              verticalAlign="top"
                              className="column-balance-3"
                            >
                              {this.state.viewOptionSend && (
                                <Label
                                  pointing
                                  size="mini"
                                  className="label-balance-3"
                                >
                                  <Menu
                                    pointing
                                    vertical
                                    compact
                                    className="menu-balance"
                                    id="menu-width"
                                  >
                                    <Menu.Item
                                      className="item-options"
                                      as={Link}
                                      to="/sendMoneyclick"
                                    >
                                      {t("nav.sendmoneyclick")}
                                    </Menu.Item>
                                    <Menu.Item
                                      className="item-options"
                                      as={Link}
                                      to="/withdraw"
                                    >
                                      {t("nav.withdraw")}
                                    </Menu.Item>
                                  </Menu>
                                </Label>
                              )}
                            </Grid.Column>
                            <Grid.Column
                              largeScreen={2}
                              computer={2}
                              widescreen={2}
                              tablet={2}
                            />
                          </Grid.Row>
                        </Grid>
                      </Grid.Row>
                      <Divider hidden />
                      <Divider hidden />
                      <Divider hidden />
                      <div className="row-pay">
                        <Grid.Row centered textAlign="center">
                          <div style={{ textAlign: "center", display: "flex" }}>
                            <div className="text1-homeNew-log">
                              {t("homeNew.text2")}
                            </div>
                          </div>

                          <br />
                        </Grid.Row>
                        <Grid divided="vertically">
                          <Grid.Row centered textAlign="center" columns={6}>
                            <Grid.Column></Grid.Column>
                            <Grid.Column>
                              <Image
                                src={bitcoin}
                                style={{ width: 110, zIndex: 0 }}
                              />
                            </Grid.Column>
                            <Grid.Column
                              style={{
                                marginLeft: 20,
                                marginRight: 20,
                              }}
                            >
                              <Image
                                src={paypal}
                                style={{
                                  width: 110,
                                  zIndex: 0,
                                }}
                              />
                            </Grid.Column>
                            <Grid.Column>
                              <Image
                                src={zelle}
                                style={{ width: 50, zIndex: 0 }}
                              />
                            </Grid.Column>
                            <Grid.Column></Grid.Column>
                            <Grid.Column></Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </div>
                    </Grid.Column>

                    <Grid.Column
                      largeScreen={6}
                      computer={6}
                      widescreen={6}
                      tablet={16}
                      textAlign="center"
                      verticalAlign="middle"
                    >
                      <Divider hidden></Divider>
                      <Divider hidden></Divider>
                      <FastChangePrice />
                    </Grid.Column>
                    {window.innerWidth <= 915 && (
                      <Grid.Column
                        largeScreen={1}
                        computer={1}
                        widescreen={1}
                        tablet={1}
                      ></Grid.Column>
                    )}
                    <Grid.Column
                      largeScreen={1}
                      computer={1}
                      widescreen={1}
                      tablet={1}
                    ></Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Divider hidden />
                  </Grid.Row>
                </Grid>
              </div>
            )}
            {isMobile && (
              <div>
                <HomeMobile />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default translate(Home);
