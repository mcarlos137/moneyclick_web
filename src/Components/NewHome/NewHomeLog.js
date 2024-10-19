import React, { Component } from 'react';
import './NewHome.css';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom';
import publicIP from 'react-native-public-ip';
import apiUtils from '../../services/utils';
import HomeMobile from '../HomeMobile/HomeMobile.js';
import img1 from '../../img/back-1.png';
import iconChatP2P from '../../img/icn-chat-p2p.png';
//import img1 from "../../img/img-telefono.png";
import img1english from '../../img/back-1-ingles.png';
import appStore from '../../img/appStore.png';
import playStore from '../../img/playStore.png';
import translate from '../../i18n/translate';
import zelle from '../../img/logo-zelle.png';
import bitcoin from '../../img/logo-bitcoin.png';
import paypal from '../../img/logo-paypal.png';
import change from '../../img/icn-activo-comprar.png';
import deposit from '../../img/icn-activo-recibir.png';
import transfer from '../../img/icn-activo-enviar.png';
import imgPc from '../../img/img-1.png';
import imgPcEn from '../../img/img-1-ingles.png';
import ethImg from '../../img/icn-eth.png';
import theterImg from '../../img/icn-tether.png';
import BtcImg from '../../img/icn-btc.png';
import BtcrImg from '../../img/icn-btcr.png';
import market from '../../services/market';
import icnAtc from '../../img/icn-at1.png';
import icnSopor from '../../img/icn-soport4.png';
import icnMex from '../../img/icn-atm2.png';
import icnCom from '../../img/icn-home3.png';
import iconFastTime from '../../img/icn-fastTime.png';
import iconSecure from '../../img/icn-security.png';
import iconExchan from '../../img/icn-exchan.png';
import iconShield from '../../img/icn-shield.png';
import imgCurrencygroup from '../../img/img-monedas.png';
import imgGiftcardGroup from '../../img/img-tarjetas.png';
import imgCryptoGroup from '../../img/img-criptos.png';
import user from '../../services/user';
import currency from '../../common/currencyFlag';
import moneyclickServices from '../../services/moneyclick';
import mcIcon from '../../img/splash_mc.jpg';
import otc from '../../services/otc';
import NumberFormat from 'react-number-format';
import FastChangePrice from './NewFastChangePrice';
import { isMobile } from 'react-device-detect';
import { parse } from 'query-string';
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
  Card,
  Feed,
  Item,
  Header,
  Icon,
} from 'semantic-ui-react';

class NewHomeLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translator: props.translate,
      userVerify: false,
      emailVerify: '',
      showModalRegistration: false,
      readyToRedirect: false,
      load: true,
      spanish: false,
      loadAchievements: false,
      countryCurrency: '',
      loadCountry: true,
      coins: this.props.coins,
      symbol: '',
      showCarrousel: true,
      data: null,
      buy: 0,
      sell: 0,
      balanceMoneyClick: 0,
      currentIndex: 0,
      balanceCurrencies: [],
      user: window.sessionStorage.getItem('username'),
      mainBalance: [],
      viewOptionDeposit: false,
      viewOptionChange: false,
      viewOptionSend: false,
      usdBalance: 0,
      btcBalance: 0,
      pairP2P: this.props.pairP2P,
      loadPair: this.props.loadPair,
      arrayView: [],
      availableBalanceBTCDeferred: 0,
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
      if (nextProps.language === 'es') {
        this.setState({ spanish: true }, () => {
          this.setState({ load: false });
        });
      } else if (nextProps.language === 'en') {
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

            currenciesArray = currenciesArray.filter((curren) => {
              return curren.active === true;
            });
            let orderCurrency = await otc.getOrdersCurrencys(this.state.user);

            Object.entries(resp.data).forEach(([key, value]) => {
              let objCurrency = {};
              if (
                key !== 'usdEstimatedBalance' &&
                key !== 'btcEstimatedBalance'
              ) {
                if (key !== 'BTC') {
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

                      if (dataString.includes('e')) {
                        availableBalanceFix =
                          Number.parseFloat(dataString2).toFixed(12);
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
                        symbol: ' ',
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
                      if (this.state.countryCurrency === 'USD') {
                        objCurrency.priority = 2;
                      } else if (this.state.countryCurrency === 'EUR') {
                        objCurrency.priority = 3;
                      } else {
                        objCurrency.priority = indexPosition + 4;
                      }
                    }

                    let availableBalance = value.availableBalance;
                    let dataString = availableBalance.toString();
                    let availableBalanceFix;
                    let dataString2 = availableBalance.toLocaleString();

                    if (dataString.includes('e')) {
                      availableBalanceFix =
                        Number.parseFloat(dataString2).toFixed(12);
                    } else {
                      availableBalanceFix = availableBalance;
                    }

                    let availableBalanceDeferred =
                      value.deferredBalance !== undefined
                        ? value.deferredBalance
                        : 0;
                    let dataStringDeferred =
                      availableBalanceDeferred.toString();
                    let availableBalanceFixDeferred;
                    let dataString2Deferred =
                      availableBalanceDeferred.toLocaleString();

                    if (dataStringDeferred.includes('e')) {
                      availableBalanceFixDeferred =
                        Number.parseFloat(dataString2Deferred).toFixed(12);
                    } else {
                      availableBalanceFixDeferred = availableBalanceDeferred;
                    }

                    this.setState({
                      availableBalanceBTCDeferred: availableBalanceFixDeferred,
                    });

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
                if (key === 'usdEstimatedBalance') {
                  let dataString = value.toString();
                  let dataFix;
                  let dataString2 = value.toLocaleString();

                  if (dataString.includes('e')) {
                    dataFix = Number.parseFloat(dataString2).toFixed(12);
                  } else {
                    dataFix = value;
                  }
                  this.setState({
                    usdBalance: dataFix,
                  });
                }
                if (key === 'btcEstimatedBalance') {
                  let dataString = value.toString();
                  let dataFix;
                  let dataString2 = value.toLocaleString();
                  if (dataString.includes('e')) {
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
          fieldName: 'email',
          fieldValue: query.e,
        };
        await user.addDataUserAsync(userInfo);
        this.sendStartVerificationEmail(query.u);
        if (window.sessionStorage.getItem('auth') !== undefined) {
          if (window.sessionStorage.getItem('auth') === 'true') {
            window.sessionStorage.setItem('verify', true);
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
            let currency = '';
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
    if (window.sessionStorage.getItem('language') === 'es') {
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
      if (uri.indexOf('?') > 0) {
        var clean_uri = uri.substring(0, uri.indexOf('?'));
        window.history.replaceState({}, document.title, clean_uri);
      }
    }, 10000);
  }
  sendStartVerificationEmail(email) {
    let bodybtc = {
      userName: email,
      fieldNames: ['email'],
      userVerificationType: 'A',
      info: 'Verification user email',
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
      symbol: 'BTC' + data.name,
      showmodal: true,
      data: el.percent,
      buy: el.buy,
      sell: el.sell,
    });
  }
  handleModal() {
    this.setState({ symbol: '', showmodal: false });
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
        <Grid.Row textAlign='center' columns='equal' className='row-mobile'>
          <Grid.Column />
          <Grid.Column width={10}>
            <Message
              style={{ top: 26 }}
              color='blue'
              inverted
              content={
                <div>
                  {t('home.notificationEmailVerify.header.line1')}
                  <strong> {this.state.emailVerify} </strong>
                  {t('home.notificationEmailVerify.header.line2')}
                  <br />
                  {t('home.notificationEmailVerify.content')}
                </div>
              }
              size='tiny'
            />
          </Grid.Column>
          <Grid.Column />
        </Grid.Row>
      );
      this.closeMessage();
    }

    let listItem = this.state.balanceCurrencies.map((item, i) => (
      <Grid.Column key={`key-${i}`} style={{ marginBottom: 20 }}>
        {item.currency !== undefined && (
          <Card
            raised
            style={{
              backgroundColor: '#f4f4f4',
              height: 70,
            }}
          >
            <Card.Content>
              <Image
                style={{ borderRadius: 50 }}
                floated='left'
                size='mini'
                src={currency.currenciesFlag[item.currency].img}
              />
              <Card.Meta
                style={{
                  textAlign: 'left',
                  fontSize: 14,
                  color: '#5c5858',
                  fontFamily: 'Open_Sans',
                  marginTop: item.deferredBalance !== undefined ? -8 : 1,
                }}
              >
                {'Balance ' + item.currency}
              </Card.Meta>
              <Card.Header style={{ textAlign: 'left', fontSize: 14 }}>
                {item.symbol + ' '}{' '}
                <NumberFormat
                  style={{ paddingTop: '-15px' }}
                  value={this.floorDecimals(
                    item.balance,
                    item.currency === 'BTC' || item.currency === 'ETH' ? 8 : 2
                  )}
                  displayType={'text'}
                  thousandSeparator={true}
                />
              </Card.Header>

              {item.deferredBalance !== undefined && (
                <Card.Meta
                  style={{
                    textAlign: 'left',
                    fontSize: 12,
                    color: '#5c5858',
                    fontFamily: 'Open_Sans',
                  }}
                >
                  {t('homeLoggedIn.deferred')}
                  {' ' + item.symbol + ' '}
                  <NumberFormat
                    style={{ paddingTop: '-15px' }}
                    value={this.floorDecimals(
                      item.deferredBalance,
                      item.currency === 'BTC' || item.currency === 'ETH' ? 8 : 2
                    )}
                    displayType={'text'}
                    thousandSeparator={true}
                  />
                </Card.Meta>
              )}
            </Card.Content>
          </Card>
        )}
      </Grid.Column>
    ));

    if (this._isMounted) {
      carouselBalance = (
        <AliceCarousel
          id='alice-custom'
          autoWidth={true}
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
        {window.sessionStorage.getItem('auth') === 'true' && (
          <div>
            {!isMobile && (
              <div>
                {this.state.load && (
                  <Dimmer active inverted>
                    <Loader size='small' inverted />
                  </Dimmer>
                )}

                <Grid columns='equal' style={{ marginTop: 10 }}>
                  {rail}
                  <Grid.Row style={{ marginTop: 48 }}>
                    <Grid.Column largeScreen={1} computer={1} widescreen={1} />
                    <Grid.Column
                      textAlign='center'
                      largeScreen={14}
                      computer={14}
                      widescreen={14}
                      tablet={16}
                    >
                      <div className='text-new'>
                        <strong>
                          <h1> {t('newHome.titleHomeLog')}</h1>
                        </strong>
                      </div>
                    </Grid.Column>
                    <Grid.Column largeScreen={1} computer={1} widescreen={1} />
                  </Grid.Row>
                  <Grid.Row columns='equal' style={{ marginTop: -65 }}>
                    <Grid.Column
                      largeScreen={1}
                      computer={1}
                      widescreen={1}
                      verticalAlign='middle'
                    />
                    <Grid.Column
                      largeScreen={window.innerWidth > 915 ? 8 : 14}
                      computer={window.innerWidth > 915 ? 8 : 14}
                      widescreen={window.innerWidth > 915 ? 8 : 14}
                      tablet={window.innerWidth > 915 ? 8 : 14}
                      verticalAlign='top'
                      className='column-balance'
                    >
                      <Grid.Row textAlign='center'>
                        <Grid>
                          <Grid.Row verticalAlign='top' textAlign='center'>
                            <Grid.Column
                              largeScreen={1}
                              computer={1}
                              widescreen={1}
                              tablet={1}
                              verticalAlign='middle'
                              textAlign='center'
                            ></Grid.Column>
                            <Grid.Column
                              largeScreen={14}
                              computer={14}
                              widescreen={14}
                              tablet={14}
                              verticalAlign='middle'
                              textAlign='center'
                            >
                              <Segment basic>
                                <Grid>
                                  <Grid.Column
                                    largeScreen={2}
                                    computer={2}
                                    widescreen={2}
                                    tablet={2}
                                    verticalAlign='middle'
                                    textAlign='center'
                                  ></Grid.Column>
                                  <Grid.Column
                                    largeScreen={12}
                                    computer={12}
                                    widescreen={12}
                                    tablet={12}
                                    verticalAlign='middle'
                                    textAlign='center'
                                  >
                                    <Segment
                                      basic
                                      loading={this.state.loadCountry}
                                    >
                                      <Grid.Row>
                                        <h2
                                          style={{
                                            color: '#055990',
                                            fontFamily: 'Open_Sans',
                                          }}
                                        >
                                          <strong>
                                            {t('newHome.titleBalance')}
                                          </strong>
                                        </h2>
                                      </Grid.Row>
                                      <Grid.Row>
                                        <Grid>
                                          <Grid.Column
                                            largeScreen={2}
                                            computer={2}
                                            widescreen={2}
                                            tablet={2}
                                            textAlign='center'
                                          />
                                          <Grid.Column
                                            largeScreen={6}
                                            style={{ marginRight: -25 }}
                                            computer={6}
                                            widescreen={6}
                                            tablet={6}
                                            textAlign='center'
                                            verticalAlign='middle'
                                          >
                                            <p className='text21-segment-balanceNewHome'>
                                              <strong>{'USD'} </strong>
                                              {this.floorDecimals(
                                                this.state.usdBalance,
                                                2
                                              )}
                                            </p>
                                          </Grid.Column>
                                          <Icon
                                            name='minus'
                                            className='transformIcon'
                                          />
                                          <Grid.Column
                                            style={{ marginLeft: -15 }}
                                            largeScreen={6}
                                            computer={6}
                                            widescreen={6}
                                            tablet={6}
                                            textAlign='center'
                                            verticalAlign='middle'
                                          >
                                            <p className='text21-segment-balanceNewHome'>
                                              <strong>{'BTC '}</strong>
                                              {this.floorDecimals(
                                                this.state.btcBalance,
                                                8
                                              )}
                                            </p>
                                          </Grid.Column>
                                          <Grid.Column
                                            largeScreen={2}
                                            computer={2}
                                            widescreen={2}
                                            tablet={2}
                                            textAlign='center'
                                          />
                                        </Grid>
                                      </Grid.Row>
                                    </Segment>
                                  </Grid.Column>
                                  <Grid.Column
                                    largeScreen={2}
                                    computer={2}
                                    widescreen={2}
                                    tablet={2}
                                    verticalAlign='middle'
                                    textAlign='center'
                                  ></Grid.Column>
                                </Grid>
                              </Segment>
                            </Grid.Column>
                          </Grid.Row>

                          <Grid.Row
                            verticalAlign='top'
                            textAlign='center'
                            style={{ marginTop: '-40px' }}
                            columns={3}
                          >
                            {listItem}
                          </Grid.Row>
                        </Grid>
                      </Grid.Row>
                      <Divider hidden />
                    </Grid.Column>
                    <Grid.Column
                      largeScreen={6}
                      computer={6}
                      widescreen={6}
                      tablet={16}
                      textAlign='center'
                      verticalAlign='middle'
                    >
                      <Divider hidden></Divider>
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
                  <Divider hidden />
                  <Divider hidden />
                  <Grid.Row columns={1}>
                    <Grid.Column>
                      <Segment
                        inverted
                        color='blue'
                        textAlign='center'
                        style={{ paddingBottom: 6, paddingTop: 6 }}
                      >
                        {t('newHome.bannerMoney')}
                      </Segment>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row style={{ marginTop: 10 }}>
                    <Grid.Column largeScreen={1} computer={0} widescreen={0} />
                    <Grid.Column
                      largeScreen={14}
                      computer={16}
                      widescreen={16}
                      tablet={16}
                    >
                      <Segment
                        loading={this.props.loadPair}
                        basic
                        textAlign='center'
                        style={{
                          display: 'inline-flex',
                          verticalAlign: 'middle',
                          width: '100%',
                          justifyContent: 'center',
                        }}
                      >
                        <Grid style={{ width: '100%' }}>
                          <Grid.Column width={2}>
                            <Segment secondary style={{ padding: 5 }}>
                              <Label
                                style={{
                                  backgroundColor: '#f4f4f4',

                                  textAlign: 'center',
                                }}
                              >
                                <p
                                  style={{
                                    fontWeight: 'bold',
                                    color: '#1b8dc3',
                                    fontSize: '12',
                                  }}
                                >
                                  Money Market
                                </p>
                              </Label>
                            </Segment>
                          </Grid.Column>
                          <Grid.Column width={14} textAlign='left'>
                            <Segment secondary style={{ padding: 9 }}>
                              {arrayP2P.map((item, i) => (
                                <Label
                                  key={i}
                                  horizontal
                                  style={{
                                    backgroundColor: '#f4f4f4',
                                    fontSize: '12px',
                                    color: '#062433',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    marginRight: 6,
                                  }}
                                >
                                  {item.pair.slice(0, 3) +
                                    '/' +
                                    item.pair.slice(-3)}{' '}
                                  <NumberFormat
                                    value={item.price}
                                    decimalScale={
                                      item.pair.slice(3) !== 'BTC' ? 2 : 8
                                    }
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    style={{ fontWeight: 'normal' }}
                                  />
                                  <Icon
                                    style={{
                                      marginLeft: 4,
                                    }}
                                    name='circle'
                                    color={
                                      item.type === 'BUY' ? 'green' : 'red'
                                    }
                                  ></Icon>
                                </Label>
                              ))}
                            </Segment>
                          </Grid.Column>
                        </Grid>
                      </Segment>
                    </Grid.Column>
                    <Grid.Column largeScreen={1} computer={0} widescreen={0} />
                  </Grid.Row>
                  <Grid.Row style={{ marginTop: 48 }}>
                    <Grid.Column largeScreen={1} computer={1} widescreen={1} />
                    <Grid.Column
                      textAlign='center'
                      largeScreen={14}
                      computer={14}
                      widescreen={14}
                      tablet={16}
                    >
                      <div className='text-new'>
                        <strong>
                          <h1>{t('newHome.titleMethods')}</h1>
                        </strong>
                      </div>
                    </Grid.Column>
                    <Grid.Column largeScreen={1} computer={1} widescreen={1} />
                  </Grid.Row>
                  <Divider hidden></Divider>
                  <Grid.Row>
                    <Grid.Column largeScreen={2} computer={2} widescreen={2} />

                    <Grid.Column textAlign='center' verticalAlign='middle'>
                      <Image
                        size='medium'
                        spaced
                        src={imgCurrencygroup}
                      ></Image>
                    </Grid.Column>
                    <Grid.Column textAlign='center' verticalAlign='middle'>
                      <Image spaced src={imgCryptoGroup}></Image>
                    </Grid.Column>
                    <Grid.Column textAlign='center'>
                      <Image spaced src={imgGiftcardGroup}></Image>
                    </Grid.Column>

                    <Grid.Column largeScreen={2} computer={2} widescreen={2} />
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column largeScreen={2} computer={2} widescreen={2} />
                    <Grid.Column textAlign='center'>
                      <h2>
                        <div
                          style={{ fontFamily: 'Open_Sans', color: '#005b89' }}
                        >
                          {t('newHome.textLogCurrency')}
                        </div>
                        <div
                          style={{ fontFamily: 'Open_Sans', color: '#005b89' }}
                        >
                          {t('newHome.textLogCurrencyTwo')}
                        </div>
                      </h2>
                    </Grid.Column>
                    <Grid.Column textAlign='center'>
                      <h2>
                        <div
                          style={{ fontFamily: 'Open_Sans', color: '#005b89' }}
                        >
                          {t('newHome.textCryptoCurrency')}
                        </div>
                      </h2>
                    </Grid.Column>
                    <Grid.Column textAlign='center'>
                      <h2>
                        <div
                          style={{ fontFamily: 'Open_Sans', color: '#005b89' }}
                        >
                          {t('newHome.textGiftCardOne')}
                        </div>
                        <div
                          style={{ fontFamily: 'Open_Sans', color: '#005b89' }}
                        >
                          {t('newHome.textGiftCardTwo')}
                        </div>
                      </h2>
                    </Grid.Column>
                    <Grid.Column largeScreen={2} computer={2} widescreen={2} />
                  </Grid.Row>
                  <Divider hidden></Divider>
                  <Grid.Row>
                    <Grid.Column largeScreen={2} computer={2} widescreen={2} />
                    <Grid.Column textAlign='center'>
                      <div>
                        <p style={{ marginBottom: 15, color: '#062433' }}>
                          {t('newHome.messageMethods')}
                        </p>
                      </div>
                      <div>
                        <p style={{ marginBottom: 15, color: '#062433' }}>
                          {t('newHome.messageMethodsTwo')}
                        </p>
                      </div>
                      <div>
                        <p style={{ marginBottom: 10, color: '#062433' }}>
                          {t('newHome.messageMethodsTree')}
                        </p>
                      </div>
                    </Grid.Column>
                    <Grid.Column largeScreen={2} computer={2} widescreen={2} />
                  </Grid.Row>
                  <Divider hidden></Divider>
                  <Grid.Row>
                    <Grid.Column style={{ textAlign: 'center' }}>
                      <Segment
                        inverted
                        textAlign='center'
                        style={{
                          backgroundColor: 'white',
                          verticalAlign: 'middle',
                          width: '100%',
                          justifyContent: 'center',
                          padding: '14px 5px 14px 5px',
                        }}
                      >
                        <Header
                          as='h4'
                          color='#1b8dc3'
                          style={{ color: '#1b8dc3' }}
                        >
                          <div>{t('newHome.haveQuestion')}</div>
                        </Header>
                        <div style={{ color: '#055990' }}>
                          {t('newHome.contactMessage')}
                        </div>
                      </Segment>
                    </Grid.Column>
                  </Grid.Row>
                  <Divider hidden />
                  <Divider hidden />
                  <Grid.Row>
                    <Grid.Column
                      largeScreen={3}
                      mobile={0}
                      tablet={3}
                      computer={3}
                    />
                    <Grid.Column
                      largeScreen={6}
                      mobile={8}
                      tablet={6}
                      computer={6}
                    >
                      <Item.Group>
                        <Item style={{ marginBottom: 45 }}>
                          <Item.Image size='tiny' src={icnAtc} />

                          <Item.Content verticalAlign='middle'>
                            <Item.Header
                              style={{
                                color: '#055990',
                                fontWeight: 'bold',
                                fontSize: 16,
                              }}
                            >
                              {t('newHome.customerService')}
                            </Item.Header>
                            <Item.Description>
                              <a
                                href='https://wa.me/15512214091'
                                target='_blank'
                              >
                                <h2
                                  style={{
                                    color: '#055990',
                                    fontWeight: '100',
                                  }}
                                >
                                  +1 (551) 221-4091
                                </h2>
                              </a>
                            </Item.Description>
                          </Item.Content>
                        </Item>

                        <Item>
                          <Item.Image size='tiny' src={icnCom} />

                          <Item.Content verticalAlign='middle'>
                            <Item.Header
                              style={{
                                color: '#055990',
                                fontWeight: 'bold',
                                fontSize: 16,
                              }}
                            >
                              {t('newHome.comercialAtention')}
                            </Item.Header>
                            <Item.Description>
                              <a
                                href='https://wa.me/12019896074'
                                target='_blank'
                              >
                                <h2
                                  style={{
                                    color: '#055990',
                                    fontWeight: '100',
                                  }}
                                >
                                  +1 (201) 989-6074
                                </h2>
                              </a>
                            </Item.Description>
                          </Item.Content>
                        </Item>
                      </Item.Group>
                    </Grid.Column>
                    <Grid.Column
                      largeScreen={6}
                      mobile={8}
                      tablet={6}
                      computer={6}
                    >
                      <Item.Group>
                        <Item>
                          <Item.Image size='tiny' src={icnSopor} />

                          <Item.Content verticalAlign='middle'>
                            <Item.Header
                              style={{
                                color: '#055990',
                                fontWeight: 'bold',
                                fontSize: 16,
                              }}
                            >
                              {t('newHome.techSupport')}
                            </Item.Header>
                            <Item.Description>
                              <a
                                href='https://wa.me/19199755089'
                                target='_blank'
                              >
                                <h2
                                  style={{
                                    color: '#055990',
                                    fontWeight: '100',
                                  }}
                                >
                                  +1 (919) 975-5089
                                </h2>
                              </a>
                            </Item.Description>
                          </Item.Content>
                        </Item>
                      </Item.Group>
                    </Grid.Column>
                    <Grid.Column
                      largeScreen={3}
                      mobile={0}
                      tablet={3}
                      computer={3}
                    />
                  </Grid.Row>
                  <Divider hidden />
                  {/* <Grid.Row>
                    <Grid.Column
                      largeScreen={2}
                      mobile={0}
                      tablet={2}
                      computer={2}
                    />
                    <Grid.Column>
                      <Card id='fastTime'>
                        <Card.Content
                          textAlign='center'
                          style={{
                            backgroundColor: 'transparent',
                            borderColor: 'white',
                          }}
                        >
                          <Image
                            src={iconFastTime}
                            size='small'
                            style={{ width: 120, height: 95 }}
                          />
                          <Card.Header
                            textAlign='center'
                            style={{
                              color: '#055990',
                              marginTop: 10,
                              marginBottom: 10,
                            }}
                          >
                            {t('newHome.inmediatPaymentTitle')}
                          </Card.Header>

                          <Card.Description
                            textAlign='center'
                            style={{ color: '#055990' }}
                          >
                            {t('newHome.inmediatPaymentMessage')}
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                    <Grid.Column>
                      <Card id='securityHomeNew'>
                        <Card.Content
                          textAlign='center'
                          style={{
                            backgroundColor: 'transparent',
                            borderColor: 'white',
                          }}
                        >
                          <Image
                            src={iconSecure}
                            size='small'
                            style={{ width: 100, height: 95 }}
                          />
                          <Card.Header
                            textAlign='center'
                            style={{
                              color: '#055990',
                              marginTop: 10,
                              marginBottom: 10,
                            }}
                          >
                            {t('newHome.antiFraudTitle')}
                          </Card.Header>

                          <Card.Description
                            textAlign='center'
                            style={{ color: '#055990' }}
                          >
                            {t('newHome.antiFraudMessage')}
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                    <Grid.Column>
                      <Card id='exchangeHomeNew'>
                        <Card.Content
                          textAlign='center'
                          style={{
                            backgroundColor: 'transparent',
                            borderColor: 'white',
                          }}
                        >
                          <Image
                            src={iconExchan}
                            size='small'
                            style={{ width: 110, height: 95 }}
                          />
                          <Card.Header
                            textAlign='center'
                            style={{
                              color: '#055990',
                              marginTop: 10,
                              marginBottom: 10,
                            }}
                          >
                            {t('newHome.freeConvertTitle')}
                          </Card.Header>

                          <Card.Description
                            textAlign='center'
                            style={{ color: '#055990' }}
                          >
                            {t('newHome.freeConvertMessage')}
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                    <Grid.Column>
                      <Card id='shieldHomeNew'>
                        <Card.Content
                          className='not-box'
                          textAlign='center'
                          style={{
                            backgroundColor: 'transparent',
                            borderColor: 'white',
                            boxShadow: 'none',
                          }}
                        >
                          <Image
                            src={iconShield}
                            style={{ width: 100, height: 95 }}
                          />
                          <Card.Header
                            textAlign='center'
                            style={{
                              color: '#055990',
                              marginTop: 10,
                              marginBottom: 10,
                            }}
                          >
                            {t('newHome.secureTitle')}
                          </Card.Header>

                          <Card.Description
                            textAlign='center'
                            style={{ color: '#055990' }}
                          >
                            {t('newHome.secureMessage')}
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                    <Grid.Column
                      largeScreen={2}
                      mobile={0}
                      tablet={2}
                      computer={2}
                    />
                  </Grid.Row>
                  <Divider hidden /> */}
                  <Grid.Row
                    columns={2}
                    verticalAlign='bottom'
                    style={{
                      position: window.innerWidth < 915 ? 'relative' : '',
                      top: window.innerWidth < 915 ? 20 : 0,
                    }}
                  >
                    <Grid.Column
                      largeScreen={3}
                      computer={3}
                      widescreen={3}
                      tablet={3}
                      verticalAlign='middle'
                    />
                    <Grid.Column
                      largeScreen={6}
                      computer={6}
                      widescreen={6}
                      tablet={6}
                      verticalAlign='middle'
                    >
                      <div className='text13-homeNew'>
                        <h2
                          style={{
                            color: '#055990',
                            fontSize: 20,
                          }}
                        >
                          {t('homeNew.text3')}
                        </h2>
                      </div>
                    </Grid.Column>
                    <Grid.Column
                      largeScreen={1}
                      computer={1}
                      widescreen={1}
                      tablet={1}
                      verticalAlign='middle'
                    />
                    <Grid.Column
                      largeScreen={5}
                      computer={5}
                      widescreen={5}
                      tablet={5}
                      verticalAlign='middle'
                      style={{ top: 8 }}
                    >
                      <Image.Group>
                        <a
                          href='https://play.google.com/store/apps/details?id=com.dollarbtc.moneyclick'
                          target='_blank'
                        >
                          <Image
                            src={playStore}
                            style={{
                              width: window.innerWidth > 915 ? 120 : 100,
                            }}
                          />
                        </a>
                        <a
                          href='https://apps.apple.com/us/app/moneyclick/id1501864260?l'
                          target='_blank'
                        >
                          <Image
                            src={appStore}
                            style={{
                              width: window.innerWidth > 915 ? 120 : 100,
                            }}
                          />
                        </a>
                      </Image.Group>
                      <a
                        href='https://www.youtube.com/channel/UCHyoWryx0ClE9OZ3pmrHa8w'
                        target='_blank'
                      >
                        <Button.Group>
                          <Button primary>
                            {t('newHome.instructiveMessage')}
                          </Button>
                          <Button primary>
                            <Icon name='youtube' /> YouTube
                          </Button>
                        </Button.Group>
                      </a>
                    </Grid.Column>
                    <Grid.Column
                      largeScreen={2}
                      computer={2}
                      widescreen={2}
                      tablet={2}
                      verticalAlign='middle'
                    />
                  </Grid.Row>
                  <Divider hidden />
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

export default translate(NewHomeLog);
