import React, { Component } from 'react';
import {
  Button,
  Header,
  Segment,
  Grid,
  Menu,
  Modal,
  Message,
  Dimmer,
  Loader,
  Responsive,
  Divider,
  Container,
  Tab,
} from 'semantic-ui-react';
import { parse } from 'query-string';
import { Redirect } from 'react-router-dom';
import userAPI from '../../services/user';
import ShoppingHistory from './FormHistoryRecharge/FormHistoryRecharge';
import FormProcessBuyBitCoin from './FormProcessRecharge/FormProcessRecharge';
import FormBuyBitCoin from './RechargeForm/RechargeForm';
import translate from '../../i18n/translate';
import { isMobile } from 'react-device-detect';
import decode from '../../services/decode';
import user from '../../services/user';
class Recharge extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      activeIndex: 0,
      show: false,
      windowInitial: false,
      message: '',
      configUser: null,
      isAuth: userAPI.getUserAuth(),
      translator: props.translate,
      isUserMoneyClick: false,
      taskInProcess: true,
      loadingForm: false,
    };
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.language !== nextProps.language) {
      this.setState({
        translator: nextProps.translate,
      });
    }
  }

  redirectToBuy() {
    // var uri = window.location.toString();
    // if (uri.indexOf("?") > 0) {
    //   var clean_uri = uri.substring(0, uri.indexOf("?"));
    //   window.history.replaceState({}, document.title, clean_uri);
    // }
    this.setState({ activeIndex: 1 });
  }

  async isUserFromMoneyClickApp() {
    //console.log(typeof parse(window.location.search).t);
    this.setState({ loadingForm: true });
    if (typeof parse(window.location.search).t !== 'undefined') {
      let paramOfURI = parse(window.location.search).t;
      let paramsDesencrypt = decode.desencripHash(paramOfURI);
      let responseGetConfig;
      if (paramsDesencrypt.username !== undefined) {
        try {
          responseGetConfig = await userAPI.getConfigUserGeneral(
            paramsDesencrypt.username
          );
          this.setState({ loadingForm: false });
        } catch (error) {
          this.setState({ loadingForm: false });
          console.log(error);
        }

        if (paramsDesencrypt.language !== undefined) {
          window.sessionStorage.setItem('language', paramsDesencrypt.language);
          this.setState({
            language: paramsDesencrypt.language,
          });
          this.props.handleClick(paramsDesencrypt.language);
        }
        if (
          responseGetConfig.data.result.active !== undefined &&
          responseGetConfig.data.result.active
        ) {
          window.sessionStorage.setItem('time', 4320); //minutes -> 3
          window.sessionStorage.setItem('specialreferralCode', true);
          sessionStorage.setItem('auth', 'true');
          sessionStorage.setItem(
            'nickname',
            responseGetConfig.data.result.email
          );
          sessionStorage.setItem(
            'firstName',
            responseGetConfig.data.result.firstName +
              ' ' +
              responseGetConfig.data.result.lastName
          );
          sessionStorage.setItem(
            'username',
            responseGetConfig.data.result.name
          );
          sessionStorage.setItem(
            'formBuyBitcoins.currencyLabelSelected',
            paramsDesencrypt.currency
          );
          this.getConfig();
        }
      } else {
        this.setState({ loadingForm: false });
        this.getConfig();
      }
    } else {
      this.setState({ loadingForm: false });
      this.getConfig();
    }
  }

  async getConfig() {
    this.setState({ loadingForm: true });
    //console.log("Auqi")
    if (
      (window.sessionStorage.getItem('time') === '29' ||
        window.sessionStorage.getItem('time') === null ||
        window.sessionStorage.getItem('time') === 'null') &&
      (window.sessionStorage.getItem('auth') === null ||
        window.sessionStorage.getItem('auth') === 'null' ||
        !window.sessionStorage.getItem('auth'))
    ) {
      this.setState({ loadingForm: false });
      this.setState({ rediretBuy: true });
      // window.open('/', '_self');
    } else {
      let username = userAPI.getUserName();
      let responseGetConfig = null;
      if (username !== undefined && username !== null && username !== '') {
        try {
          responseGetConfig = await userAPI.getConfigUserGeneral(username);
          this.setState({ loadingForm: false });
        } catch (error) {
          this.setState({ loadingForm: false });
          console.log('error network');
        }
        this.setState({ loadingForm: false });
        if (responseGetConfig !== null) {
          this.setState({
            configUser: responseGetConfig.data.result,
            show: true,
            windowInitial: true,
          });
        }
      } else {
        this.setState({ loadingForm: false });
      }
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.isUserFromMoneyClickApp();
  }

  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex });

  render() {
    if (this.state.rediretBuy === true) {
      return <Redirect to={'/recharge'}></Redirect>;
    }
    let t = this.state.translator;
    const panes = [
      {
        menuItem: t('recharge.menu.title1'),
        render: () => (
          <Tab.Pane style={{ borderColor: 'white' }}>
            {this.state.configUser !== null && (
              <FormProcessBuyBitCoin
                configUser={this.state.configUser}
                handleItemClick={this.redirectToBuy.bind(this)}
              />
            )}
          </Tab.Pane>
        ),
      },
      {
        menuItem: t('recharge.menu.title2'),
        render: () => (
          <Tab.Pane style={{ borderColor: 'white' }}>
            <ShoppingHistory />
          </Tab.Pane>
        ),
      },
      // { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
    ];

    let { activeIndex } = this.state;

    return (
      <div>
        {!isMobile && <Divider hidden />}
        {!isMobile && <Divider hidden />}
        <Segment basic loading={this.state.loadingForm}>
          <Grid>
            <Grid.Column
              largeScreen={isMobile ? 1 : 2}
              computer={isMobile ? 1 : 2}
              widescreen={isMobile ? 1 : 2}
              mobile={null}
            />

            <Grid.Column
              largeScreen={isMobile ? 14 : 12}
              computer={isMobile ? 14 : 12}
              widescreen={isMobile ? 14 : 12}
              mobile={16}
            >
              {!isMobile && (<Segment inverted textAlign='left' className='titleComponents'>
                <h4 className='headerComponent'>
                  <b> {t('nav.fromBanks')}</b>
                </h4>
                <Divider hidden />
                 </Segment>
                )}
              <Tab
                panes={panes}
                activeIndex={activeIndex}
                onTabChange={this.handleTabChange}
              />
              <Divider hidden />
            </Grid.Column>

            <Grid.Column
              largeScreen={isMobile ? 1 : 2}
              computer={isMobile ? 1 : 2}
              widescreen={isMobile ? 1 : 2}
              mobile={null}
            />
          </Grid>
        </Segment>
      </div>
    );
  }
}
export default translate(Recharge);
