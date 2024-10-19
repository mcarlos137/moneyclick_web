import React, { Component } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import {
  Segment,
  Image,
  Button,
  Header,
  Grid,
  Icon,
  Dimmer,
  Loader,
  Divider,
} from "semantic-ui-react";
import RetailService from "../../../services/moneyclick";
import currency from "../../../common/currencyFlag";
import logoBTC from "../../../img/icn-bitcoin-amarillo.png";
import mcIcon from "../../../img/splash_mc.jpg";
// import "../FiatCarrouselStadicts/FiatCarrouselStadicts.css";
// import FiatGaugeModal from "../FiatGaugeModal/FiatGaugeModal";
import translate from "../../../i18n/translate";
import NumberFormat from "react-number-format";
import otc from "../../../services/otc";
import { symbol } from "prop-types";
class Balance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: this.props.coins,
      symbol: "",
      showCarrousel: false,
      data: null,
      buy: 0,
      sell: 0,
      balanceMoneyClick: 0,
      currentIndex: 0,
      balanceCurrencies: [],
      user: window.sessionStorage.getItem("username"),
      translator: props.translate,
    };
    this._isMounted = false;
  }
  responsive = {
    0: { items: 1 },
    600: { items: 2 },
    1024: { items: 5 },
  };
  onSlideChange(e) {}
  handleClickItem(e, data) {
    //console.log(data);
  }
  componentWillMount() {
    this.getBalance();
    this._isMounted = true;
  }
  floorDecimals(value, numberDecimals) {
    let decimales = Math.pow(10, numberDecimals);
    return Math.floor(value * decimales) / decimales;
  }
  getBalance() {
    if (this.state.user !== null) {
      RetailService.getBalanceMoneyclick(this.state.user)
        .then(async (resp) => {
          try {
            let currenciesColOne = [];
            const currencies = await otc.getCurrencies();
            let currenciesArray = [];
            currenciesArray = currencies.data;
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
                        objCurrency.priority = indexPosition + 1;
                      }

                      objCurrency.currency = key;
                      objCurrency.symbol = findCurrency.symbol;
                      objCurrency.balance = value.availableBalance;
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
                      objCurrency.priority = indexPosition + 1;
                    }
                    objCurrency.currency = key;
                    objCurrency.balance = value.availableBalance;
                    objCurrency.balanceUsd = value.usdEstimatedBalance;
                    objCurrency.img = findCurrency.img;
                    currenciesColOne.push(objCurrency);
                  }
                }
              }
            });
            currenciesColOne = currenciesColOne.sort((a, b) => {
              return a.priority - b.priority;
            });
            this.setState({
              balanceCurrencies: currenciesColOne,
              showCarrousel: true,
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
    this._isMounted = true;
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.language !== nextProps.language) {
      this.setState({
        translator: nextProps.translate,
      });
    }
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
  render() {
    let currentIndex, carousel;
    let t = this.state.translator;
    currentIndex = this.state.currentIndex;
    // let fiatCurrencies = this.props.coins.filter(c => {
    //   return c.value !== "ETH" && c.value !== "BTC";
    // });

    let listItem = this.state.balanceCurrencies.map((item, i) => (
      <Segment
        key={`key-${i}`}
        basic
        style={{
          marginRight: 10,
          borderRadius:6,
          backgroundColor: "rgba(244, 244, 247, 1)",
          height: window.innerWidth >= 1200 ? 90 : 110,
        }}
      >
        <Image
          src={item.img!==undefined?item.img:""}
          circular
          verticalAlign="middle"
          style={{ weight: 20, height: 20 , marginTop: -10}}
        />
        <div style={{ marginLeft: 35, marginTop: -25 }}>
          <span style={{ fontSize: 15,color:"#055990" }}>
            {item.currency}
          </span>
        </div>
        <div style={{marginTop: 5}}>
          <span style={{ fontSize: 20, marginTop: -10, fontWeight: 100 ,color:"#055990"}}>
            {" "}
            <NumberFormat
              value={this.floorDecimals(
                item.balance,
                item.currency === "BTC" || item.currency === "ETH" ? 8 : 2
              )}
              displayType={"text"}
              thousandSeparator={true}
            />
          </span>
          <br></br>
          <label style={{ fontSize:9, marginTop: -80 ,color:"#055990"}}>
            {t("homeLoggedIn.balance.text1")}
            <strong>
              {" "}
              <NumberFormat
                value={this.floorDecimals(item.balanceUsd, 2)}
                displayType={"text"}
                thousandSeparator={true}
              />
            </strong>
          </label>
        </div>
      </Segment>
    ));

    if (this._isMounted) {
      carousel = (
        <AliceCarousel
          id="alice-custom"
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
          itemsInSlide={5}
          
        />
      );
    }
    return (
      <div>
        {window.innerWidth > 430 && (
          <div>
            <Divider hidden />
            <div>
              {!this.state.showCarrousel && (
                <Dimmer active inverted style={{marginTop:20}}>
                  <Loader inverted>{t("homeLoggedIn.balance.load")}</Loader>
                </Dimmer>
              )}
              {this.state.showCarrousel && (
                <Grid centered>
                  <Grid.Row>
                    <Grid.Column></Grid.Column>
                    <Grid.Column
                      verticalAlign="middle"
                      style={{ marginLeft: "-75px" }}
                    >
                      <Icon
                        name="chevron left"
                        size="big"
                        style={{ color: "#055990" }}
                        onClick={this.slidePrev.bind(this)}
                      />
                    </Grid.Column>
                    <Grid.Column width={14}>{carousel}</Grid.Column>
                    <Grid.Column verticalAlign="middle">
                      <Icon
                        name="chevron right"
                        size="big"
                        style={{ color: "#055990" }}
                        onClick={this.slideNext.bind(this)}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              )}
            </div>

            {/* <FiatGaugeModal
              symbol={this.state.symbol}
              show={this.state.showmodal}
              close={this.handleModal.bind(this)}
              data={this.state.data}
              buy={this.state.buy}
              sell={this.state.sell}
            /> */}
          </div>
        )}
      </div>
    );
  }
}

export default translate(Balance);
