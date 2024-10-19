import React, { Component } from 'react';
import './App.css';
import Nav from './Nav/Nav';
import I18nProvider from '../i18n/I18nProvider';
import { Provider } from '../common/createConsumer';
import { createStore } from '../common/createStore';
import { Route, Redirect } from 'react-router-dom';
import publicIP from 'react-native-public-ip';
import apiUtils from '../services/utils';
import user from '../services/user';
import Home from './Home/HomeNew';
import HomeReduced from './HomeReduced/HomeReduced';
import LoginTwoFactor from './LoginTwoFactor/LoginTwoFactor';
import Footer from './Footer/Footer';
import IdleTimer from 'react-idle-timer';
import ModalSession from './ModalsApp/ModalSession';
import ModalSessionExpired from './ModalsApp/ModalSessionExpired';
import Profile from './Profile/Profile';
import Charges from './Charges/Charges';
import NewCharges from './Charges/NewCharges';
import Contact from './ContactUs/ContactUs';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import RechargeBalance from './Recharge/Recharge';
import PaymentGateway from './PaymentGateway/PaymentGateway';
//import RechargeFormNew from "./Recharge/RechargeFormNew/RechargeFormNew";
import Transactions from './Transactions/Transactions';
import FastChange from './FastChangeCurrencies/FastChangeCurrencies';
import Withdraw from './Withdraw/Withdraw';
//import WithdrawNew from "./WithdrawNew/WithdrawNew";
import BuyBTC from './BuySellBTC/BuyBTC';
import SellBTC from './BuySellBTC/SellBTC';
import Login from './Login/Login';
import Registration from './Registration/Registration';
import Instructive from './Instructive/Instructive';
import Legal from './Legal/Legal';
import SendMomeyClick from './SendMoneyClick/SendMoneyClick';
import ContainerOperationControl from './Containers/ContainerOperationControl';
import ChatClientForm from './ChatClient/ChatClientForm/ChatClientForm';
import ChatClient from './ChatClient/ChatClient';
import ActualOperations from './OTC/ActualOperations/ActualOperations';
import SendBitcoins from './SendBitcoins/SendBitcoins';
import ReceiveBitcoins from './ReceiveBitcoins/ReceiveBitcoins';
import ButtonEuro from './ButtonEuro/ButtonEuro';
//import ReceiveCard from "./ReceiveCard/ReceiveCard";import BankMenu from "./BankMenu/BankMenu";
//import OtcAccounts from "./OTCAccounts/OTCAccounts";
//import MenuOtcAccounts from "./OTCAccounts/MenuOtcAccounts";
import MenuGiftCardView from './GiftCardClient/Views/MenuGiftCard';
import UsersMenu from './Users/Users';
import BankMenu from './BankMenu/BankMenu';
import Faq from './Faq/Faq';
import TermsAndConditions from './TermsAndConditions/TermsAndConditionsMoneyClick';
import NewHome from './NewHome/NewHome';
import {
  browserVersion,
  isChrome,
  isEdge,
  isFirefox,
  isIE,
  isMobile,
  isMobileSafari,
  isOpera,
  isSafari,
} from 'react-device-detect';
class App extends Component {
  constructor(props) {
    super(props);
    this.idleTimer = null;
    this.onAction = this._onAction.bind(this);
    this.state = {
      socket: null,
      endIdle: false,
      viewModal: false,
      seconds: 60,
      conexion: '',
      viewModalEndSession: false,
      active: false,
      homeactive: false,
      notifications: [],
      language:
        window.sessionStorage.getItem('language') !== null &&
        window.sessionStorage.getItem('language') !== 'null' &&
        window.sessionStorage.getItem('language') !== 'undefined' &&
        window.sessionStorage.getItem('language') !== undefined
          ? window.sessionStorage.getItem('language')
          : 'en',
      auth: window.sessionStorage.getItem('auth'),
      registeredInChat: window.sessionStorage.getItem('auth') === 'true',
      infoChat: {},
      countryCurrency: '',
    };
    this.onIdle = this._onIdle.bind(this);
    this.session = this.session.bind(this);
    this.handleRegisterInChat = this.handleRegisterInChat.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    if (!isMobile) {
      this.getIp();
      //this.setState({ language: window.sessionStorage.getItem("language") });
    }
    window.sessionStorage.setItem(
      'time',
      window.sessionStorage.getItem('time') === 'null'
        ? 29
        : window.sessionStorage.getItem('time')
    );
  }
  componentWillUnmount() {
    user.logout();
  }
  componentWillMount() {
    this.determinateBrowserVersion();
  }
  determinateBrowserVersion() {
    let version = parseInt(browserVersion.split('.')[0]);
    let message =
      this.state.language === 'es'
        ? 'Esta versión de su navegador no es compatible con dollarBTC.com, le invitamos a actualizar para tener una mejor experiencia'
        : 'This version of your browser is not compatible with dollarBTC.com, we invite you to update to have a better experience';
    let messageIncompatible =
      this.state.language === 'es'
        ? 'Su navegador no es compatible con nuestra aplicación. Le recomendamos descargar Google Chrome o Firefox'
        : 'Your browser is not compatible with our application, we recommend downloading Google Chrome or Firefox';
    if (isMobile) {
      if (isMobileSafari) {
        if (version < 10.1) alert(message);
      } else if (isChrome) {
        if (version <= 54) alert(message);
      } else if (isFirefox) {
        if (version < 47) alert(message);
      }
    } else {
      if (isFirefox) {
        if (version < 47) alert(message);
      } else if (isChrome) {
        if (version < 54) alert(message);
      } else if (isSafari) {
        if (version < 10.1) alert(message);
      } else if (isEdge) {
        alert(messageIncompatible);
      } else if (isIE) {
        alert(messageIncompatible);
      } else if (isOpera) {
        alert(messageIncompatible);
      }
    }
  }
  _onAction(e) {
    if (
      sessionStorage.getItem('lastSession') !== null &&
      sessionStorage.getItem('lastSession') !== 'null'
    ) {
      let actualTime = new Date().getTime();
      let lastSession = Number(sessionStorage.getItem('lastSession'));
      if (actualTime - lastSession >= 240000) {
        sessionStorage.setItem('lastSession', actualTime);
        try {
          user.updateLastActivity();
        } catch (error) {}
      }
    }
  }
  getIp() {
    publicIP()
      .then((ip) => {
        let previosIp = window.sessionStorage.getItem('ipAddress');
        window.sessionStorage.setItem('ipAddress', ip);
        apiUtils
          .getAllInfo(ip)
          .then((res) => {
            let currency = res.data.currency;
            this.setState({ countryCurrency: currency });
            window.sessionStorage.setItem('countryCurrency', currency);
            if (previosIp !== ip) {
              let languages = res.data.languages.split(',');
              let isSpanish = false;
              if (languages.length > 0) {
                for (let i = 0; i < languages.length; i++) {
                  let value = languages[i].split('-');
                  if (value.length > 1) {
                    if (value[0] === 'es' && value[1] !== 'US') {
                      isSpanish = true;
                      window.sessionStorage.setItem('language', 'es');
                      this.setState({
                        language: 'es',
                      });
                    }
                  } else {
                    if (value[0] === 'es') {
                      isSpanish = true;
                      window.sessionStorage.setItem('language', 'es');
                      this.setState({
                        language: 'es',
                      });
                    }
                  }
                }
              }
              if (!isSpanish) {
                window.sessionStorage.setItem('language', 'en');
                this.setState({
                  language: 'en',
                });
              }
            }
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
  session() {
    setTimeout(() => {
      if (this.state.endIdle) {
        this.setState({ viewModalEndSession: true, viewModal: false });
        user.logout();
      }
    }, 60000);
  }
  handleClick = (e, data) => {
    console.log('aquii');
    this.getNotificationUser();
    if (data) {
      window.sessionStorage.setItem('language', data.value);
      this.setState({
        language: data.value,
      });
    }
  };
  async getNotificationUser() {
    let list = [];
    let listNotRead = [];
    try {
      const response = await user.getNotifications();
      if (response.data !== false) {
        let dataResult = response.data;
        this.setState({ notifications: response.data });
        // this.prepareMessageToList(response);
        // for (let noti of dataResult) {
        //   if (noti.readed === false) {
        //     listNotRead.push(noti.timestamp);
        //   }
        //   noti.content = noti.content.split('\\n');
        //   list.push(noti);
        // }
        // this.setState({
        //   list: list,
        //   listNotRead: listNotRead,
        //   numberBague: listNotRead.length !== 0 ? listNotRead.length : '',
        // });
      }
    } catch (error) {
      this.setState({ numberBague: '' });
    }
  }
  handleClickRecharge = (data) => {
    window.sessionStorage.setItem('language', data);
    this.setState({
      language: data,
    });
  };

  handleClickPaymentGateway = (data) => {
    window.sessionStorage.setItem('language', data);
    this.setState({
      language: data,
    });
  };
  calculeConexionSpired() {
    if (this.idleTimer !== null) {
      this.setState({ endIdle: false, viewModal: false });
      let actualTime = new Date().getTime();
      sessionStorage.setItem('lastSession', actualTime);
      try {
        user.updateLastActivity();
      } catch (error) {}

      this.idleTimer.reset();
    }
  }
  handleCloseModal() {
    window.location.href = '/';
  }
  _onIdle(e) {
    this.setState({ viewModal: true, endIdle: true });
    this.session();
  }
  setItem(data) {
    this.setState({ item: data });
  }
  setView(data) {
    this.setState({ homeactive: data });
  }
  validateRouterNormal(Component, validate, props) {
    let auth = window.sessionStorage.getItem('auth');
    if (props !== undefined) {
      if (validate) {
        if (isMobile) {
          return <Redirect to='/' />;
        } else {
          return auth === 'true' ? (
            <Component {...props} />
          ) : (
            <Redirect to='/' />
          );
        }
      } else {
        if (isMobile) {
          return <Redirect to='/' />;
        } else {
          return <Component {...props} />;
        }
      }
    } else if (props === undefined) {
      if (validate) {
        if (isMobile) {
          return <Redirect to='/' />;
        } else {
          return auth === 'true' ? <Component /> : <Redirect to='/' />;
        }
      } else {
        if (isMobile) {
          return <Redirect to='/' />;
        } else {
          return <Component />;
        }
      }
    }
  }
  validateDevice(Component) {
    /*if (isMobile) {
      return <Redirect to='/' />;
    } else {*/
      return <Component />;
   // }
  }
  handleRegisterInChat(values) {
    let body = {
      name: values.name,
      email: values.email,
      messages: values.messages,
    };
    this.setState({
      registeredInChat: values.registered,
      infoChat: body,
    });
  }
  render() {
    let navView;
    let auth = window.sessionStorage.getItem('auth');
    navView = (
      <Nav
        auth={auth}
        handleClick={this.handleClick}
        notifications={this.state.notifications}
      />
    );

    return (
      <Provider value={createStore(this)}>
        <I18nProvider language={this.state.language}>
          <div className='App'>
            {auth === 'true' && (
              <IdleTimer
                ref={(ref) => {
                  this.idleTimer = ref;
                }}
                element={document}
                onActive={this.onActive}
                onIdle={this.onIdle}
                onAction={this.onAction}
                timeout={1000 * 60 * window.sessionStorage.getItem('time')}
              />
            )}
            <header className='App-header'>
              {!isMobile &&
                (window.location.pathname !== 'instructive' ||
                  window.location.pathname !== 'faq') &&
                navView}
            </header>
            <main className='App-content'>
              <Route
                exact
                path='/'
                render={(props) => (
                  <NewHome
                    {...props}
                    setItem={this.setItem.bind(this)}
                    setView={this.setView.bind(this)}
                    countryCurrency={this.state.countryCurrency}
                  />
                )}
              />
              {/* <Route
                exact
                path='/NewHome'
                render={(props) => (
                  <NewHome
                    {...props}
                    setItem={this.setItem.bind(this)}
                    setView={this.setView.bind(this)}
                    countryCurrency={this.state.countryCurrency}
                  />
                )}
              /> */}
              {/* <Route
								exact
								path='/'
								render={(props) => (
									<Home
										{...props}
										setItem={this.setItem.bind(this)}
										setView={this.setView.bind(this)}
									/>
								)}
							/>
							{/* <Route
								exact
								path='/'
								render={(props) => (
									<Home
										{...props}
										setItem={this.setItem.bind(this)}
										setView={this.setView.bind(this)}
									/>
								)}
							/>
							{/* <Route
								exact
								path='/'
								render={(props) => (
									<HomeReduced
										{...props}
										setItem={this.setItem.bind(this)}
										setView={this.setView.bind(this)}
									/>
								)}
							/> */}
              <Route
                path='/forgotPassword'
                render={() => this.validateDevice(ForgotPassword)}
              />
              <Route
                path='/recharge'
                render={(props) => (
                  <RechargeBalance
                    {...props}
                    handleClick={this.handleClickRecharge.bind(this)}
                  />
                )}
              />
              {/* <Route
								path='/rechargeFormNew'
								render={() => this.validateRouterNormal(RechargeFormNew, true)}
							/> */}
              <Route
                path='/profile'
                render={() => this.validateRouterNormal(Profile, true)}
              />
              <Route
                path='/contact'
                render={() => this.validateRouterNormal(Contact, false)}
              />
              <Route
                path='/instructive'
                render={(props) => (
                  <Instructive {...props} handleClick={this.handleClick} />
                )}
              />
              <Route
                path='/legal'
                render={() => this.validateRouterNormal(Legal, false)}
              />
              <Route
                exact
                path='/charges'
                render={(props) =>
                  this.validateRouterNormal(Charges, false, props)
                }
              />

              <Route
                path='/paymentGateway'
                render={(props) => (
                  <PaymentGateway
                    {...props}
                    handleClick={this.handleClickPaymentGateway.bind(this)}
                  />
                )}
              />
              <Route
                exact
                path='/newCharges'
                render={(props) =>
                  this.validateRouterNormal(NewCharges, false, props)
                }
              />
              <Route
                path='/faq'
                // render={(props) =>
                // 	this.validateRouterNormal(Faq, false, props)
                // }
                render={(props) => (
                  <Faq {...props} handleClick={this.handleClick} />
                )}
              />
              <Route
                path='/TermsAndConditions'
                render={(props) => <TermsAndConditions />}
              />
              <Route
                path='/loginTwoFactor'
                render={() => this.validateRouterNormal(LoginTwoFactor, false)}
              />
              <Route
                path='/transactions'
                render={() => this.validateRouterNormal(Transactions, true)}
              />
              <Route
                path='/fastChange'
                render={() => this.validateRouterNormal(FastChange, true)}
              />
              <Route
                path='/withdraw'
                render={() => this.validateRouterNormal(Withdraw, true)}
              />
              {/* <Route
								path='/withdrawNew'
								render={() => this.validateRouterNormal(WithdrawNew, true)}
							/> */}
              <Route
                path='/BuyBTC'
                render={() => this.validateRouterNormal(BuyBTC, true)}
              />
              <Route
                path='/SellBTC'
                render={() => this.validateRouterNormal(SellBTC, true)}
              />

              <Route
                path='/sendMoneyClick'
                render={() => this.validateRouterNormal(SendMomeyClick, true)}
              ></Route>
              <Route
                path='/sendBitcoins'
                render={() => this.validateRouterNormal(SendBitcoins, true)}
              ></Route>
              <Route
                path='/receiveBitcoins'
                render={() => this.validateRouterNormal(ReceiveBitcoins, true)}
              ></Route>
              <Route path='/login' render={() => this.validateDevice(Login)} />
              <Route
                path='/registration'
                render={() => this.validateDevice(Registration)}
              />
              <Route
                path='/otcOperations'
                render={() => this.validateRouterNormal(ActualOperations, true)}
              ></Route>
              <Route
                path='/paymentMethods'
                render={() => this.validateRouterNormal(BankMenu, true)}
              ></Route>
              <Route
                path='/Scrow'
                render={() => this.validateRouterNormal(BankMenu, true)}
              ></Route>
              <Route
                path='/giftCard'
                render={(props) => (
                  <MenuGiftCardView
                    {...props}
                    setItem={this.setItem.bind(this)}
                    setView={this.setView.bind(this)}
                  />
                )}
              ></Route>
              {/* <Route
								path='/otcAccounts'
								render={() =>
									this.validateRouterNormal(MenuOtcAccounts, true)
								}></Route> */}
              <Route
                path='/userData'
                render={() => this.validateRouterNormal(UsersMenu, true)}
              ></Route>
              {/* <Route
                path="/giftCard"
                render={() => this.validateRouterNormal(ReceiveCard, true)}
              /> */}
              <ModalSession
                viewModal={this.state.viewModal}
                loadForm={this.state.loadForm}
                seconds={this.state.seconds}
                calculateConnectionExpired={this.calculeConexionSpired.bind(
                  this
                )}
              />
              <ModalSessionExpired
                viewModalEndSession={this.state.viewModalEndSession}
                handleCloseModal={this.handleCloseModal.bind(this)}
              />
              {/* {!isMobile && <ButtonEuro />} */}
              {/* {(window.sessionStorage.getItem("time") === "29" ||
								window.sessionStorage.getItem("time") === null) &&
								this.state.registeredInChat && (
									<ChatClient infoChat={this.state.infoChat} />
								)} */}
            </main>
            {!isMobile &&
              (window.location.pathname !== 'instructive' ||
                window.location.pathname !== 'faq') && (
                <footer>
                  <Footer />
                </footer>
              )}
          </div>
        </I18nProvider>
      </Provider>
    );
  }
}
export default App;
