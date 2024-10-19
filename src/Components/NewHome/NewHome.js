import React, { Component } from 'react';
import '../Home/HomeNew.css';
import publicIP from 'react-native-public-ip';
import apiUtils from '../../services/utils';
import HomeMobile from '../HomeMobile/HomeMobile.js';
import img1 from '../../img/back-1.png';
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
import user from '../../services/user';
import logoBtcNewHome from '../../img/logo-3.png';
import logMc from '../../img/logo.png';
import logMcR from '../../img/logo-2.png';
import imgCard from '../../img/img-2.png';
import imgPc from '../../img/img-1.png';
import imgPcEn from '../../img/img-1-ingles.png';
import ethImg from '../../img/icn-eth.png';
import theterImg from '../../img/icn-tether.png';
import BtcImg from '../../img/icn-btc.png';
import BtcrImg from '../../img/icn-btcr.png';
import currency from '../../common/currencyFlag';
import market from '../../services/market';
import icnAtc from '../../img/icn-at1.png';
import icnSopor from '../../img/icn-soport4.png';
import icnMex from '../../img/icn-atm2.png';
import icnCom from '../../img/icn-home3.png';
import iconFastTime from '../../img/icn-fastTime.png';
import iconSecure from '../../img/icn-security.png';
import iconExchan from '../../img/icn-exchan.png';
import iconShield from '../../img/icn-shield.png';
import moneyclickServices from '../../services/moneyclick';
import Sockette from 'sockette';
import NumberFormat from 'react-number-format';
import FastChangePrice from '../FastChangePrice/FastChangePrice';
import FiatCarrouselStadicts from './FiatCarrouselStadicts/FiatCarrouselStadicts';
import NewHomeLog from './NewHomeLog';
import { isMobile, isTablet } from 'react-device-detect';
import visa from '../../img/logo-visa.png';
import master from '../../img/logo-mastercard.png';
import { parse } from 'query-string';
import {
  Image,
  Grid,
  Icon,
  Button,
  Segment,
  Message,
  Loader,
  Dimmer,
  Divider,
  Label,
  Header,
  Card,
  Item,
} from 'semantic-ui-react';
import { element } from 'prop-types';

class NewHome extends Component {
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
      achievements: {},
      loadAchievements: false,
      countryCurrency: '',
      loadCountry: true,
      socket: null,
      pairP2P: [],
      arrayView: [],
      loadPair: true,
      list: [],
    };
    this._isMounted = false;
  }
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
  componentDidMount() {
    this._isMounted = true;
    this.getIp();
    this.getLanguage();
    this.initSocket();
    this.getCoins();
    //this.getAchievements();
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
  getCoins() {
    let url = market.getFullPriceInfo();
    /*axios
      .get("https://service8081.dollarbtc.com/analysis/getFullPriceInfo")*/
    url
      .then((res) => {
        let arr = [];
        if (res.data !== undefined) {
          Object.entries(res.data).forEach(([k, v]) => {
            let curren = currency.currenciesFlag[k];
            if (k !== 'PA_USD') {
              if (curren !== undefined) {
                let decimales = Math.pow(10, 4);
                let buy6, sell6, buy24, sell24;
                let sell, buy, usdprice, price, forex;
                Object.entries(v).forEach(([valKey, valValue]) => {
                  if (valKey === 'localBitcoins') {
                    Object.entries(valValue).forEach(([intk, intv]) => {
                      if (intk === 'btcPrice') {
                        price = intv;
                      }
                      if (intk === 'usdPrice') {
                        usdprice = intv;
                      }
                      if (intk === 'ask') {
                        Object.entries(intv).forEach(([askKey, askValue]) => {
                          if (askKey === 'average') {
                            Object.entries(askValue).forEach(
                              ([averaaskkey, averaaskvalue]) => {
                                if (averaaskkey === 'price') {
                                  buy = averaaskvalue;
                                }
                                if (averaaskkey === '6H%') {
                                  buy6 = averaaskvalue;
                                }
                                if (averaaskkey === '24H%') {
                                  buy24 = averaaskvalue;
                                }
                              }
                            );
                          }
                        });
                      }
                      if (intk === 'bid') {
                        Object.entries(intv).forEach(([bidkey, bidvalue]) => {
                          if (bidkey === 'average') {
                            Object.entries(bidvalue).forEach(
                              ([averakey, averavalue]) => {
                                if (averakey === '6H%') {
                                  sell6 = averavalue;
                                }
                                if (averakey === '24H%') {
                                  sell24 = averavalue;
                                }
                                if (averakey === 'price') {
                                  sell = averavalue;
                                }
                              }
                            );
                          }
                        });
                      }
                    });
                  }
                  if (valKey === 'forex') {
                    forex = valValue.usdRate;
                  }
                });
                var ob = {
                  img: curren.img,
                  flag: curren.flag,
                  text: this.state.translator(curren.traslate),
                  value: k,
                  price: Math.floor(price * decimales) / decimales,
                  priority: curren.priority,
                  sell: sell,
                  buy: buy,
                  usd_price: usdprice !== undefined ? usdprice : 0,
                  forex_price: forex !== undefined ? forex : 0,
                  name: curren.name,
                  percent: [
                    {
                      activity: this.state.translator('commons.avgBuy'),
                      buyOne: buy6,
                      buyTwo: buy24,
                    },
                    {
                      activity: this.state.translator('commons.avgSell'),
                      sellOne: sell6,
                      sellTwo: sell24,
                    },
                  ],
                };
                this.setState({ list: [...this.state.list, ob] });
              } else {
                let decimales = Math.pow(10, 4);
                let buy6, sell6, buy24, sell24;
                let sell, buy, usdprice, price, forex;
                Object.entries(v).forEach(([valKey, valValue]) => {
                  if (valKey === 'localBitcoins') {
                    Object.entries(valValue).forEach(([intk, intv]) => {
                      if (intk === 'btcPrice') {
                        price = intv;
                      }
                      if (intk === 'usdPrice') {
                        usdprice = intv;
                      }
                      if (intk === 'ask') {
                        Object.entries(intv).forEach(([askKey, askValue]) => {
                          if (askKey === 'average') {
                            Object.entries(askValue).forEach(
                              ([averaaskkey, averaaskvalue]) => {
                                if (averaaskkey === 'price') {
                                  buy = averaaskvalue;
                                }
                                if (averaaskkey === '6H%') {
                                  buy6 = averaaskvalue;
                                }
                                if (averaaskkey === '24H%') {
                                  buy24 = averaaskvalue;
                                }
                              }
                            );
                          }
                        });
                      }
                      if (intk === 'bid') {
                        Object.entries(intv).forEach(([bidkey, bidvalue]) => {
                          if (bidkey === 'average') {
                            Object.entries(bidvalue).forEach(
                              ([averakey, averavalue]) => {
                                if (averakey === '6H%') {
                                  sell6 = averavalue;
                                }
                                if (averakey === '24H%') {
                                  sell24 = averavalue;
                                }
                                if (averakey === 'price') {
                                  sell = averavalue;
                                }
                              }
                            );
                          }
                        });
                      }
                    });
                  }
                  if (valKey === 'forex') {
                    forex = valValue.usdRate;
                  }
                });
                var ob = {
                  img: '',
                  flag: '',
                  text: '',
                  value: k,
                  price: Math.floor(price * decimales) / decimales,
                  priority: 19,
                  sell: sell,
                  buy: buy,
                  usd_price: usdprice !== undefined ? usdprice : 0,
                  forex_price: forex !== undefined ? forex : 0,
                  name: '',
                  percent: [
                    {
                      activity: this.state.translator('commons.avgBuy'),
                      buyOne: buy6,
                      buyTwo: buy24,
                    },
                    {
                      activity: this.state.translator('commons.avgSell'),
                      sellOne: sell6,
                      sellTwo: sell24,
                    },
                  ],
                };
                this.setState({ list: [...this.state.list, ob] });
              }
            }
          });
          this.setState({
            list: this.state.list.sort(function (a, b) {
              return a.priority - b.priority;
            }),
            show: true,
          });
        }
      })
      .catch((error) => {
        //////console.log(error);

        this.setState({ show: true });
      });
  }
  getIp() {
    publicIP()
      .then((ip) => {
        apiUtils
          .getAllInfo(ip)
          .then((res) => {
            let currencyName = res.data.currency;
            let findCurrency = currency.currenciesFlag[currencyName];
            this.setState({ countryCurrency: findCurrency }, () => {
              this.setState({ loadCountry: false });
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
  initSocket() {
    let webSocketPrice = 'wss://websocket.moneyclick.com/price';
    if (this._isMounted) {
      this.setState({
        socket: new Sockette(webSocketPrice, {
          onopen: (e) => this.socketReady(),
          onmessage: (e) => this.getPrice(e.data),
        }),
      });
    }
  }
  socketReady() {
    let price = { method: 'getChatP2P', params: {} };
    if (this.state.socket !== null) {
      try {
        this.state.socket.json(price);
      } catch (e) {}
    }
  }
  getPrice(value) {
    let result = JSON.parse(value);
    if (result !== undefined) {
      //console.log(result.params.data);
      if (result.params.data !== undefined && result.params.data !== null) {
        let data = result.params.data;
        let array = [];
        let oldArray = this.state.pairP2P;
        if (data.pair !== null) {
          let objPair = {
            pair: data.pair,
            price: data.price,
            type: data.operationType,
          };
          array.push(objPair);
          for (let item of oldArray) {
            if (item.pair !== data.pair) {
              array.push(item);
            }
          }
          setTimeout(() => {
            this.setState({ loadPair: false });
          }, 3000);
          // console.log(array);
          this.setState({ pairP2P: array });
        }
      }
    }
  }
  render() {
    //console.log("movil", isMobile);
    let t = this.state.translator;
    let rail;
    let arrayP2P;
    let listT, fiat, fiatHome;
    if (this.state.pairP2P.length >= 5) {
      if (window.innerWidth < 1100) {
        arrayP2P = this.state.pairP2P.slice(0, 5);
      } else if (window.innerWidth > 1400) {
        arrayP2P = this.state.pairP2P.slice(0, 7);
      } else {
        arrayP2P = this.state.pairP2P.slice(0, 6);
      }
    } else {
      arrayP2P = this.state.pairP2P;
    }
    fiat = <FiatCarrouselStadicts coins={this.state.list} />;
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

    return (
      <div>
        {window.sessionStorage.getItem('auth') !== 'true' && (
          <div>
            {!isMobile && (
              <div>
                {this.state.load && (
                  <Dimmer active inverted>
                    <Loader size='small' inverted />
                  </Dimmer>
                )}
                {!this.state.load && (
                  <Grid columns='equal'>
                    {rail}
                    <Grid.Row style={{ marginTop: 48 }}>
                      <Grid.Column
                        largeScreen={1}
                        computer={1}
                        widescreen={1}
                      />
                      <Grid.Column
                        textAlign='center'
                        largeScreen={14}
                        computer={14}
                        widescreen={14}
                        tablet={16}
                      >
                        <div className='text-new'>
                          <strong>
                            <h1>{t('newHome.title')}</h1>
                          </strong>
                        </div>
                      </Grid.Column>
                      <Grid.Column
                        largeScreen={1}
                        computer={1}
                        widescreen={1}
                      />
                    </Grid.Row>
                    <Grid.Row
                      columns='equal'
                      style={{ marginTop: -50, marginBottom: 20 }}
                    >
                      <Grid.Column
                        largeScreen={2}
                        computer={2}
                        widescreen={2}
                        tablet={2}
                        verticalAlign='middle'
                      />
                      <Grid.Column
                        largeScreen={8}
                        computer={8}
                        widescreen={8}
                        tablet={14}
                        verticalAlign='top'
                        className='column-balance'
                      >
                        <Image
                          src={this.props.language !== 'es' ? imgPcEn : imgPc}
                          style={{
                            height: 'auto',
                          }}
                        ></Image>
                      </Grid.Column>
                      <Divider hidden />

                      <Grid.Column
                        largeScreen={6}
                        computer={6}
                        widescreen={6}
                        verticalAlign='middle'
                        tablet={16}
                        className={
                          window.innerWidth > 915 ? '' : 'column-balance'
                        }
                      >
                        <Divider hidden />

                        <div
                          style={{
                            marginBottom: 25,
                            color: '#1b8dc3',
                            fontWeight: 'bold',
                          }}
                        >
                          <strong>
                            <h2>{t('newHome.subTitle')}</h2>
                          </strong>
                        </div>
                        <div>
                          <p style={{ marginBottom: 10, color: '#1b8dc3' }}>
                            {t('newHome.nationalBanks')}
                          </p>
                        </div>
                        <div style={{ marginBottom: 20, maxWidth: 400 }}>
                          <Image.Group>
                            {this.state.list.map((item, index) => {
                              return (
                                <Image
                                  key={index}
                                  rounded={true}
                                  src={item.img}
                                  style={{
                                    borderRadius: 50,
                                    width: 30,
                                  }}
                                />
                              );
                            })}
                          </Image.Group>
                        </div>
                        <div>
                          <p style={{ marginBottom: 10, color: '#1b8dc3' }}>
                            {t('newHome.cryptoCurrency')}
                          </p>
                        </div>
                        <div style={{ marginBottom: 20 }}>
                          <Image.Group>
                            <Image
                              rounded={true}
                              src={BtcrImg}
                              style={{
                                borderRadius: 50,
                                width: 30,
                                marginRight: 10,
                              }}
                            />
                            <Image
                              rounded={true}
                              src={ethImg}
                              style={{
                                borderRadius: 50,
                                width: 20,
                                marginRight: 10,
                              }}
                            />
                            <Image
                              rounded={true}
                              src={theterImg}
                              style={{
                                borderRadius: 50,
                                width: 30,
                                marginRight: 10,
                              }}
                            />
                            <Image
                              rounded={true}
                              src={BtcImg}
                              style={{
                                borderRadius: 50,
                                width: 30,
                                marginRight: 10,
                              }}
                            />
                          </Image.Group>
                        </div>
                        <div>
                          <p style={{ marginBottom: 10, color: '#1b8dc3' }}>
                            {t('newHome.creditCard')}
                          </p>
                        </div>
                        <div>
                          <Image.Group>
                            <Image
                              rounded={true}
                              src={visa}
                              style={{
                                width: 50,
                              }}
                            />
                            <Image
                              rounded={true}
                              src={master}
                              style={{
                                width: 45,
                              }}
                            />
                          </Image.Group>
                        </div>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Segment
                          style={{
                            padding: 60,
                            backgroundColor: '#f4f4f4',
                            width:
                              window.innerWidth > 915 || isMobile
                                ? '100%'
                                : '50%',
                            display: 'inline-block',
                            top: isMobile || window.innerWidth < 915 ? -5 : 30,
                          }}
                          inverted
                        >
                          <Grid>
                            <Grid.Row>
                              <Grid.Column
                                largeScreen={2}
                                computer={2}
                                widescreen={2}
                                tablet={2}
                              />
                              <Grid.Column
                                largeScreen={6}
                                computer={6}
                                widescreen={6}
                                tablet={6}
                              >
                                <Image
                                  src={logoBtcNewHome}
                                  style={{
                                    width: 80,
                                    marginBottom: 30,
                                  }}
                                />
                                <div>
                                  <span
                                    style={{ fontSize: 28, color: '#1b8dc3' }}
                                  >
                                    {t('newHome.buyAuthorized')}
                                  </span>
                                </div>

                                <Grid.Row
                                  verticalAlign='middle'
                                  style={{ top: 8 }}
                                >
                                  <Image.Group>
                                    <Image
                                      src={logMcR}
                                      style={{
                                        width:
                                          window.innerWidth > 915 ? 100 : 80,
                                        marginTop: 10,
                                      }}
                                    />

                                    <Image
                                      src={logMc}
                                      style={{
                                        width:
                                          window.innerWidth > 915 ? 100 : 80,
                                      }}
                                    />
                                  </Image.Group>
                                </Grid.Row>
                              </Grid.Column>
                              <Grid.Column
                                largeScreen={8}
                                computer={8}
                                widescreen={8}
                                tablet={8}
                              >
                                <Image src={imgCard} />
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </Segment>
                      </Grid.Column>
                    </Grid.Row>
                    <Divider hidden />
                    <Grid.Row>
                      <Grid.Column style={{ textAlign: 'center' }}>
                        <Segment
                          inverted
                          textAlign='center'
                          style={{
                            backgroundColor: 'white',
                            display: 'inline-flex',
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
                            {t('fiatCarouselStatistics.footerLabel')}
                          </Header>
                        </Segment>
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row columns={1} centered>
                      <Grid.Column
                        largeScreen={16}
                        mobile={16}
                        tablet={16}
                        computer={16}
                      >
                        {fiat}
                      </Grid.Column>
                    </Grid.Row>
                    <Divider hidden />
                    <Grid.Row>
                      <Grid.Column style={{ textAlign: 'center' }}>
                        <Segment
                          inverted
                          textAlign='center'
                          style={{
                            backgroundColor: 'white',
                            display: 'inline-flex',
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
                            <div>{t('newHome.questionUse')}</div>
                            <div>{t('newHome.visitYoutube')}</div>
                          </Header>
                        </Segment>
                      </Grid.Column>
                    </Grid.Row>
                    <Divider hidden />
                    <Grid.Row textAlign='center' centered>
                      <Grid.Column
                        largeScreen={2}
                        mobile={0}
                        tablet={2}
                        computer={2}
                      />
                      <Grid.Column
                        largeScreen={12}
                        mobile={16}
                        tablet={12}
                        computer={12}
                      >
                        <Card.Group itemsPerRow={3}>
                          <Card style={{ backgroundColor: '#062433' }}>
                            {this.props.language === 'es' ? (
                              <a
                                href='https://www.youtube.com/channel/UCHyoWryx0ClE9OZ3pmrHa8w'
                                target='_blank'
                              >
                                <Card.Content
                                  style={{ backgroundColor: '#062433' }}
                                >
                                  <Segment textAlign='left' basic padded='very'>
                                    <div
                                      style={{
                                        color: 'white',
                                        fontSize: 24,
                                        marginBottom: 10,
                                      }}
                                    >
                                      {t('newHome.verifySampleLineOne')}
                                    </div>
                                    <div
                                      style={{ color: '#1b8dc3', fontSize: 24 }}
                                    >
                                      {t('newHome.verifySampleLineTwo')}
                                    </div>
                                  </Segment>
                                </Card.Content>
                              </a>
                            ) : (
                              <a
                                href='https://www.youtube.com/watch?v=V4BULG1-fOU&t=3s'
                                target='_blank'
                              >
                                <Card.Content
                                  style={{ backgroundColor: '#062433' }}
                                >
                                  <Segment textAlign='left' basic padded='very'>
                                    <div
                                      style={{
                                        color: 'white',
                                        fontSize: 24,
                                        marginBottom: 10,
                                      }}
                                    >
                                      {t('newHome.verifySampleLineOne')}
                                    </div>
                                    <div
                                      style={{ color: '#1b8dc3', fontSize: 24 }}
                                    >
                                      {t('newHome.verifySampleLineTwo')}
                                    </div>
                                  </Segment>
                                </Card.Content>
                              </a>
                            )}
                          </Card>

                          <Card style={{ backgroundColor: '#062433' }}>
                            {this.props.language === 'es' ? (
                              <a
                                href='https://www.youtube.com/channel/UCHyoWryx0ClE9OZ3pmrHa8w'
                                target='_blank'
                              >
                                <Card.Content
                                  style={{ backgroundColor: '#062433' }}
                                >
                                  <Segment textAlign='left' basic padded='very'>
                                    <div
                                      style={{
                                        color: 'white',
                                        fontSize: 24,
                                        marginBottom: 10,
                                      }}
                                    >
                                      {t('newHome.verifyCompleLineOne')}
                                    </div>
                                    <div
                                      style={{ color: '#1b8dc3', fontSize: 24 }}
                                    >
                                      {t('newHome.verifyCompleLineTwo')}
                                    </div>
                                  </Segment>
                                </Card.Content>
                              </a>
                            ) : (
                              <a
                                href='https://www.youtube.com/watch?v=V4BULG1-fOU&t=3s'
                                target='_blank'
                              >
                                <Card.Content
                                  style={{ backgroundColor: '#062433' }}
                                >
                                  <Segment textAlign='left' basic padded='very'>
                                    <div
                                      style={{
                                        color: 'white',
                                        fontSize: 24,
                                        marginBottom: 10,
                                      }}
                                    >
                                      {t('newHome.verifyCompleLineOne')}
                                    </div>
                                    <div
                                      style={{ color: '#1b8dc3', fontSize: 24 }}
                                    >
                                      {t('newHome.verifyCompleLineTwo')}
                                    </div>
                                  </Segment>
                                </Card.Content>
                              </a>
                            )}
                          </Card>

                          <Card style={{ backgroundColor: '#062433' }}>
                            {this.props.language === 'es' ? (
                              <a
                                href='https://www.youtube.com/channel/UCHyoWryx0ClE9OZ3pmrHa8w'
                                target='_blank'
                              >
                                <Card.Content
                                  style={{ backgroundColor: '#062433' }}
                                >
                                  <Segment textAlign='left' basic padded='very'>
                                    <div
                                      style={{
                                        color: 'white',
                                        fontSize: 24,
                                        marginBottom: 10,
                                      }}
                                    >
                                      {t('newHome.howSignupLineOne')}
                                    </div>
                                    <div
                                      style={{ color: '#1b8dc3', fontSize: 24 }}
                                    >
                                      {t('newHome.howSignupLineTwo')}
                                    </div>
                                  </Segment>
                                </Card.Content>
                              </a>
                            ) : (
                              <a
                                href='https://www.youtube.com/watch?v=V4BULG1-fOU&t=3s'
                                target='_blank'
                              >
                                <Card.Content
                                  style={{ backgroundColor: '#062433' }}
                                >
                                  <Segment textAlign='left' basic padded='very'>
                                    <div
                                      style={{
                                        color: 'white',
                                        fontSize: 24,
                                        marginBottom: 10,
                                      }}
                                    >
                                      {t('newHome.howSignupLineOne')}
                                    </div>
                                    <div
                                      style={{ color: '#1b8dc3', fontSize: 24 }}
                                    >
                                      {t('newHome.howSignupLineTwo')}
                                    </div>
                                  </Segment>
                                </Card.Content>
                              </a>
                            )}
                          </Card>
                        </Card.Group>
                      </Grid.Column>
                      <Grid.Column
                        largeScreen={2}
                        mobile={0}
                        tablet={2}
                        computer={2}
                      />
                    </Grid.Row>
                    <Divider hidden />
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
                    <Grid.Row>
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
                    <Divider hidden />
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
                          <h3
                            style={{
                              color: '#055990',
                              fontSize: 20,
                            }}
                          >
                            {t('homeNew.text3')}
                          </h3>
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
                        {this.props.language === 'es' ? (
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
                        ) : (
                          <Button.Group>
                            <Button primary>
                              {t('newHome.instructiveMessage')}
                            </Button>
                            <Button primary>
                              <Icon name='youtube' /> YouTube
                            </Button>
                          </Button.Group>
                        )}
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
                )}
              </div>
            )}
            {isMobile && (
              <div>
                <HomeMobile
                  currencyList={this.state.list}
                  pairP2P={this.state.pairP2P}
                  loadPair={this.state.loadPair}
                />
              </div>
            )}
          </div>
        )}

        {window.sessionStorage.getItem('auth') === 'true' && (
          <NewHomeLog
            pairP2P={this.state.pairP2P}
            loadPair={this.state.loadPair}
          ></NewHomeLog>
        )}
      </div>
    );
  }
}

export default translate(NewHome);
