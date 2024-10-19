import React, { Component } from 'react';
import './HomeNew.css';
import HomeLoggedIn from '../HomeLoggedIn/HomeLoggedNew.js';
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
import currency from '../../common/currencyFlag';
import moneyclickServices from '../../services/moneyclick';
import Sockette from 'sockette';
import NumberFormat from 'react-number-format';
import FastChangePrice from '../FastChangePrice/FastChangePrice';
import { isMobile, isTablet } from 'react-device-detect';
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
} from 'semantic-ui-react';
import { element } from 'prop-types';

class Home extends Component {
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
                        largeScreen={14}
                        computer={14}
                        widescreen={14}
                        tablet={16}
                      >
                        <Segment
                          loading={this.state.loadPair}
                          inverted
                          textAlign='center'
                          style={{
                            backgroundColor: '#f4f4f4',
                            display: 'inline-flex',
                            verticalAlign: 'middle',
                            width: '100%',
                            justifyContent: 'center',
                            padding: '14px 5px 14px 5px',
                          }}
                        >
                          <Grid style={{ width: '100%' }}>
                            <Grid.Column
                              width={2}
                              style={{ padding: '14px 5px 14px 5px' }}
                            >
                              <div
                                style={{
                                  borderRight: '1px white solid',
                                  //marginRight: 6,
                                  display: 'flex',
                                }}
                              >
                                <Label
                                  style={{
                                    backgroundColor: '#f4f4f4',

                                    verticalAlign: 'middle',
                                    marginTop: -5,
                                    marginBottom: -10,
                                    textAlign: 'left',
                                  }}
                                >
                                  <p
                                    style={{
                                      fontWeight: 'bold',
                                      color: '#1b8dc3',
                                      fontSize: '11px',
                                    }}
                                  >
                                    Money Market
                                    <br />
                                    <span
                                      style={{
                                        color: 'black',
                                        fontSize: '10px',
                                      }}
                                    >
                                      (IOS - Android)
                                    </span>
                                  </p>
                                </Label>
                              </div>
                            </Grid.Column>
                            <Grid.Column
                              width={14}
                              textAlign='left'
                              style={{ padding: '14px 5px 14px 5px' }}
                            >
                              {arrayP2P.map((item, i) => (
                                <Label
                                  key={i}
                                  horizontal
                                  style={{
                                    backgroundColor: '#f4f4f4',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    color: '#1b1c1d',
                                    verticalAlign: 'middle',
                                    marginRight: 3,
                                    paddingLeft: 1,
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
                                  <Label
                                    circular
                                    color={
                                      item.type === 'BUY' ? 'green' : 'red'
                                    }
                                    empty
                                    style={{
                                      verticalAlign: 'middle',
                                      marginTop: -2,
                                      marginLeft: 4,
                                      backgroundColor: '#062433',
                                    }}
                                  />
                                </Label>
                              ))}
                            </Grid.Column>
                          </Grid>
                        </Segment>
                      </Grid.Column>
                      <Grid.Column
                        largeScreen={1}
                        computer={1}
                        widescreen={1}
                      />
                    </Grid.Row>
                    <Grid.Row columns='equal' style={{ marginTop: -50 }}>
                      <Grid.Column
                        largeScreen={1}
                        computer={1}
                        widescreen={1}
                        tablet={1}
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
                        <Grid.Row textAlign='center'>
                          <div className='text-new'>
                            <strong>
                              <h1>{t('homeNew.title')}</h1>
                            </strong>
                          </div>
                          <Divider hidden />
                          <p className='text14-homeNew'>{t('homeNew.text1')}</p>
                          <br />
                          <p className='text14-homeNew'>
                            <strong>
                              <i>{t('homeNew.text4')}</i>
                            </strong>
                          </p>
                          <Divider hidden />
                          <Segment
                            raised
                            className='balance-segment-public'
                            loading={this.state.loadCountry}
                          >
                            <Grid columns={3} stackable textAlign='center'>
                              <Grid.Row
                                verticalAlign='top'
                                textAlign='center'
                                columns='equal'
                              >
                                <Grid.Column>
                                  <div className='line-vertical-public'>
                                    {this.state.countryCurrency.value ===
                                    'EUR' ? (
                                      <div className='aline-title-balance-public'>
                                        <Image
                                          circular
                                          className='img-balance-title-public'
                                          src={
                                            currency.currenciesFlag['EUR'].img
                                          }
                                        />
                                        <h4 className='title-balance-public'>
                                          Balance EUR
                                        </h4>
                                      </div>
                                    ) : (
                                      <div className='aline-title-balance-public'>
                                        <Image
                                          circular
                                          className='img-balance-title-public'
                                          src={
                                            currency.currenciesFlag['USD'].img
                                          }
                                        />
                                        <h4 className='title-balance-public'>
                                          Balance USD
                                        </h4>
                                      </div>
                                    )}
                                    {this.state.countryCurrency.value ===
                                    'EUR' ? (
                                      <p className='balance'> € 00.00</p>
                                    ) : (
                                      <p className='balance'>$ 00.00</p>
                                    )}
                                  </div>
                                </Grid.Column>

                                <Grid.Column>
                                  <div className='line-vertical-public'>
                                    {this.state.countryCurrency.value ===
                                      'USD' && (
                                      <div className='aline-title-balance-public'>
                                        <Image
                                          circular
                                          className='img-balance-title-public'
                                          src={
                                            currency.currenciesFlag['BTC'].img
                                          }
                                        />
                                        <h4 className='title-balance-public'>
                                          Balance BTC
                                        </h4>
                                      </div>
                                    )}
                                    {this.state.countryCurrency.value ===
                                      'EUR' && (
                                      <div className='aline-title-balance-public'>
                                        <Image
                                          circular
                                          className='img-balance-title-public'
                                          src={
                                            currency.currenciesFlag['USD'].img
                                          }
                                        />
                                        <h4 className='title-balance-public'>
                                          Balance USD
                                        </h4>
                                      </div>
                                    )}
                                    {this.state.countryCurrency.value !==
                                      'EUR' &&
                                      this.state.countryCurrency.value !==
                                        'USD' && (
                                        <div className='aline-title-balance-public'>
                                          <Image
                                            circular
                                            className='img-balance-title-public'
                                            src={
                                              currency.currenciesFlag['EUR'].img
                                            }
                                          />
                                          <h4 className='title-balance-public'>
                                            Balance EUR
                                          </h4>
                                        </div>
                                      )}
                                    {this.state.countryCurrency.value ===
                                      'USD' && (
                                      <p className='balance'> BTC 00.00</p>
                                    )}
                                    {this.state.countryCurrency.value ===
                                      'EUR' && (
                                      <p className='balance'> $ 00.00</p>
                                    )}
                                    {this.state.countryCurrency.value !==
                                      'EUR' &&
                                      this.state.countryCurrency.value !==
                                        'USD' && (
                                        <p className='balance'> € 00.00</p>
                                      )}
                                  </div>
                                </Grid.Column>
                                <Grid.Column>
                                  {this.state.countryCurrency.value ===
                                    'USD' && (
                                    <div className='aline-title-balance-public'>
                                      <Image
                                        circular
                                        className='img-balance-title-public'
                                        src={currency.currenciesFlag['EUR'].img}
                                      />
                                      <h4 className='title-balance-public'>
                                        Balance EUR
                                      </h4>
                                    </div>
                                  )}
                                  {this.state.countryCurrency.value ===
                                    'EUR' && (
                                    <div className='aline-title-balance-public'>
                                      <Image
                                        circular
                                        className='img-balance-title-public'
                                        src={currency.currenciesFlag['BTC'].img}
                                      />
                                      <h4 className='title-balance-public'>
                                        Balance BTC
                                      </h4>
                                    </div>
                                  )}
                                  {this.state.countryCurrency.value !== 'EUR' &&
                                    this.state.countryCurrency.value !==
                                      'USD' && (
                                      <div className='aline-title-balance-public'>
                                        {this.state.countryCurrency.value !==
                                          undefined && (
                                          <Image
                                            circular
                                            className='img-balance-title-public'
                                            src={
                                              currency.currenciesFlag[
                                                this.state.countryCurrency.value
                                              ].img
                                            }
                                          />
                                        )}
                                        <h4 className='title-balance-public'>
                                          Balance{' '}
                                          {this.state.countryCurrency.value}
                                        </h4>
                                      </div>
                                    )}
                                  {this.state.countryCurrency.value ===
                                    'USD' && (
                                    <p className='balance'> € 00.00</p>
                                  )}
                                  {this.state.countryCurrency.value ===
                                    'EUR' && (
                                    <p className='balance'> BTC 00.00 </p>
                                  )}
                                  {this.state.countryCurrency.value !== 'USD' &&
                                    this.state.countryCurrency.value !==
                                      'EUR' && (
                                      <p className='balance'>
                                        {this.state.countryCurrency.symbol}{' '}
                                        00.00
                                      </p>
                                    )}
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Segment>
                          <div className='images-group-options-public'>
                            <Button
                              circular
                              style={{
                                width: 80,
                                marginLeft: -20,
                                cursor: 'default',
                              }}
                            >
                              <Image
                                centered
                                src={deposit}
                                className='img-option-public'
                              />
                              {/* <div className="text-button-option">
                                    {t("nav.receive").toUpperCase()}
                                  </div> */}
                            </Button>

                            <Button
                              circular
                              style={{
                                width: 80,
                                marginLeft: 35,
                                marginRight: 35,
                                cursor: 'default',
                              }}
                            >
                              <Image
                                centered
                                src={change}
                                className='img-option-public'
                              />
                              {/* <div className="text-button-option">
                                    {t("nav.fastChange").toUpperCase()}
                                  </div> */}
                            </Button>

                            <Button
                              circular
                              style={{
                                width: 80,
                                cursor: 'default',
                              }}
                            >
                              <Image
                                centered
                                src={transfer}
                                className='img-option-public'
                              />
                              {/* <div className="text-button-option">
                                    {t("nav.send").toUpperCase()}
                                  </div> */}
                            </Button>
                          </div>
                        </Grid.Row>
                        <Grid.Row textAlign='center'>
                          <div style={{ textAlign: 'center', display: 'flex' }}>
                            <div className='text1-homeNew-log'>
                              {t('homeNew.text2')}
                            </div>
                          </div>
                          <br />
                        </Grid.Row>
                        <Grid divided='vertically'>
                          <Grid.Row centered textAlign='center' columns={6}>
                            <Grid.Column></Grid.Column>
                            <Grid.Column>
                              <Image src={bitcoin} style={{ width: 110 }} />
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
                                }}
                              />
                            </Grid.Column>
                            <Grid.Column>
                              <Image src={zelle} style={{ width: 55 }} />
                            </Grid.Column>
                            <Grid.Column></Grid.Column>
                            <Grid.Column></Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Grid.Column>
                      <Divider hidden />

                      <Grid.Column
                        largeScreen={6}
                        computer={6}
                        widescreen={6}
                        tablet={16}
                        verticalAlign='middle'
                        textAlign='center'
                        className={
                          window.innerWidth > 915 ? '' : 'column-balance'
                        }
                      >
                        <Divider hidden />
                        <FastChangePrice />
                      </Grid.Column>

                      <Grid.Column
                        largeScreen={1}
                        computer={1}
                        widescreen={1}
                        tablet={1}
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
                        largeScreen={1}
                        computer={1}
                        widescreen={1}
                        tablet={1}
                        verticalAlign='middle'
                      />
                      <Grid.Column
                        largeScreen={10}
                        computer={10}
                        widescreen={10}
                        tablet={10}
                        verticalAlign='middle'
                      >
                        <div className='text13-homeNew'>
                          <span>{t('homeNew.text3')}</span>
                        </div>
                      </Grid.Column>
                      <Grid.Column
                        largeScreen={4}
                        computer={4}
                        widescreen={4}
                        tablet={4}
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
                                width: window.innerWidth > 915 ? 100 : 80,
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
                                width: window.innerWidth > 915 ? 100 : 80,
                              }}
                            />
                          </a>
                        </Image.Group>
                      </Grid.Column>
                      <Grid.Column
                        largeScreen={1}
                        computer={1}
                        widescreen={1}
                        tablet={1}
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
                  pairP2P={this.state.pairP2P}
                  loadPair={this.state.loadPair}
                />
              </div>
            )}
          </div>
        )}

        {window.sessionStorage.getItem('auth') === 'true' && (
          <HomeLoggedIn
            pairP2P={this.state.pairP2P}
            loadPair={this.state.loadPair}
          ></HomeLoggedIn>
        )}
      </div>
    );
  }
}

export default translate(Home);
