import React, { Component } from 'react';
import './HomeMobile.css';
import img1 from '../../img/back-1.png';
import img1english from '../../img/back-1-ingles.png';
import logoMC from '../../img/logo.png';
import translate from '../../i18n/translate';
import appStore from '../../img/appStore.png';
import playStore from '../../img/playStore.png';
import user from '../../services/user';
import iconChatP2P from '../../img/icn-chat-p2p.png';
import imgPc from '../../img/img-1.png';
import imgPcEn from '../../img/img-1-ingles.png';
import ethImg from '../../img/icn-eth.png';
import theterImg from '../../img/icn-tether.png';
import BtcImg from '../../img/icn-btc.png';
import BtcrImg from '../../img/icn-btcr.png';
import visa from '../../img/logo-visa.png';
import master from '../../img/logo-mastercard.png';
import icnAtc from '../../img/icn-at1.png';
import icnSopor from '../../img/icn-soport4.png';
import icnMex from '../../img/icn-atm2.png';
import icnCom from '../../img/icn-home3.png';
import NumberFormat from 'react-number-format';
import FastChangePrice from '../FastChangePrice/FastChangePrice';
import { parse } from 'query-string';

import {
  Image,
  Grid,
  Responsive,
  Message,
  Segment,
  Label,
  Divider,
  Header,
  Button,
  Icon,
  Item,
} from 'semantic-ui-react';

class HomeMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translator: props.translate,
      userVerify: false,
      emailVerify: '',
      load: true,
      spanish: false,
    };
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
      } else {
        this.setState({ spanish: false }, () => {
          this.setState({ load: false });
        });
      }
    }
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
  openLink(url) {
    const win = window.open(url, '_blank');
    if (win != null) {
      win.focus();
    }
  }
  render() {
    let t = this.state.translator;
    let rail;
    let arrayP2P;
    if (this.props.pairP2P.length >= 2) {
      arrayP2P = this.props.pairP2P.slice(0, 2);
    } else {
      arrayP2P = this.props.pairP2P;
    }
    if (this.state.userVerify) {
      rail = (
        <Grid.Row textAlign='center' columns='equal'>
          <Grid.Column />
          <Grid.Column width={10}>
            <Message
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
      <Responsive minWidth={0} maxWidth={991}>
        <Grid columns='equal'>
          <Divider hidden />
          {rail}
          <Grid.Row>
            <Grid.Column mobile={1} />
            <Grid.Column mobile={14}>
              <div style={{ justifyContent: 'center' }}>
                <Image src={logoMC} size={'medium'} centered />
              </div>
            </Grid.Column>
            <Grid.Column mobile={1} />
          </Grid.Row>

          <Grid.Row style={{ marginTop: 10 }}>
            <Grid.Column largeScreen={1} computer={1} widescreen={1} />
            <Grid.Column
              textAlign='center'
              largeScreen={14}
              computer={14}
              widescreen={14}
              tablet={14}
              mobile={14}
            >
              <div className='text-new'>
                <strong>
                  <h2>{t('newHome.title')}</h2>
                </strong>
              </div>
            </Grid.Column>
            <Grid.Column largeScreen={1} computer={1} widescreen={1} />
          </Grid.Row>
          <Grid.Row
            columns='equal'
            style={{ marginTop: -50, marginBottom: 20 }}
          >
            <Grid.Column mobile={1} />
            <Grid.Column className='column-balance'>
              <Image
                src={this.props.language !== 'es' ? imgPcEn : imgPc}
                style={{
                  height: 'auto',
                }}
              ></Image>
            </Grid.Column>
            <Grid.Column mobile={1} />
          </Grid.Row>
          {/* <Grid.Row>
            <Grid.Column mobile={1} />
            <Grid.Column mobile={14}>
              <Segment
                loading={this.state.loadPair}
                inverted
                textAlign='center'
                style={{
                  backgroundColor: '#062433',
                  display: 'inline-flex',
                  verticalAlign: 'middle',
                  width: '100%',
                  justifyContent: 'center',
                  padding: '14px 5px 14px 5px',
                }}
              >
                <Grid style={{ width: '100%' }}>
                  <Grid.Row
                    textAlign='center'
                    style={{ justifyContent: 'center' }}
                  >
                    <Label className='label-title-p2p'>Money Market</Label>
                  </Grid.Row>
                  <Grid.Row
                    textAlign='center'
                    style={{ justifyContent: 'center' }}
                  >
                    {arrayP2P.map((item, i) => (
                      <Label key={i} horizontal className='label-prices-p2p'>
                        {item.pair.slice(0, 3) + '/' + item.pair.slice(-3)}{' '}
                        <NumberFormat
                          value={item.price}
                          decimalScale={item.pair.slice(3) !== 'BTC' ? 2 : 8}
                          displayType={'text'}
                          thousandSeparator={true}
                        />
                        <Label
                          circular
                          color={item.type === 'BUY' ? 'green' : 'red'}
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
                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Column>
            <Grid.Column mobile={1} />
          </Grid.Row>
          <Grid.Row columns='equal'>
            <Grid.Column tablet={1} mobile={1} />
            <Grid.Column tablet={14} mobile={14} centered>
              <FastChangePrice />
            </Grid.Column>
            <Grid.Column tablet={1} mobile={1} />
          </Grid.Row> */}
          <Divider hidden />
          <Grid.Row columns='equal'>
            <Grid.Column tablet={1} mobile={1} />
            <Grid.Column tablet={14} mobile={14} centered>
              <Grid.Row textAlign='center' className='logo'>
                {/* <h2
                  className='text-downloadMobile'
                  style={{ justifyContent: 'center' }}
                >
                  {t('homeMobile.header')}
                </h2>
                <p className='text1Mobile'>{t('homeMobile.text')}</p>
                <br /> */}
                <Image.Group style={{ textAlign: 'center' }}>
                  <a
                    href='https://play.google.com/store/apps/details?id=com.dollarbtc.moneyclick'
                    target='_blank'
                  >
                    <Image src={playStore} style={{ width: 120 }} />
                  </a>
                  <a
                    href='https://apps.apple.com/us/app/moneyclick/id1501864260?l'
                    target='_blank'
                  >
                    <Image src={appStore} style={{ width: 120 }} />
                  </a>
                </Image.Group>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column tablet={1} mobile={1} />
          </Grid.Row>

          <Grid.Row columns='equal'>
            <Grid.Column tablet={1} mobile={1} />
            <Grid.Column tablet={14} mobile={14} centered>
              <Grid.Row textAlign='center' className='logo'>
                {/* <h2
                  className='text-downloadMobile'
                  style={{ justifyContent: 'center' }}
                >
                  {t('homeMobile.header')}
                </h2> */}
                <p className='text1Mobile' style={{ fontWeight: 'bold' }}>
                  {t('homeNew.text3')}
                </p>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column tablet={1} mobile={1} />
          </Grid.Row>
          <Grid.Row columns='equal' centered>
            <Grid.Column mobile={14} tablet={14} textAlign='center'>
              <div
                style={{
                  marginBottom: 25,
                  color: '#055990',
                  fontWeight: 'bold',
                }}
              >
                <strong>
                  <h3 style={{ textAlign: 'center' }}>
                    {t('newHome.subTitle')}
                  </h3>
                </strong>
              </div>
              <div>
                <p
                  style={{
                    marginBottom: 10,
                    color: '#055990',
                    textAlign: 'center',
                  }}
                >
                  {t('newHome.nationalBanks')}
                </p>
              </div>
              <div style={{ marginBottom: 5, maxWidth: 400 }}>
                <Image.Group>
                  {this.props.currencyList.map((item, index) => {
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
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns='equal' centered>
            <Grid.Column mobile={14} tablet={14} textAlign='center'>
              <div>
                <p
                  style={{
                    marginBottom: 10,
                    color: '#055990',
                    textAlign: 'center',
                  }}
                >
                  {t('newHome.cryptoCurrency')}
                </p>
              </div>
              <div style={{ marginBottom: 15 }}>
                <Image.Group>
                  <Image
                    rounded={true}
                    src={BtcrImg}
                    style={{
                      borderRadius: 50,
                      width: 35,
                      marginRight: 15,
                    }}
                  />
                  <Image
                    rounded={true}
                    src={ethImg}
                    style={{
                      borderRadius: 50,
                      width: 25,
                      marginRight: 15,
                    }}
                  />
                  <Image
                    rounded={true}
                    src={theterImg}
                    style={{
                      borderRadius: 50,
                      width: 35,
                      marginRight: 15,
                    }}
                  />
                  <Image
                    rounded={true}
                    src={BtcImg}
                    style={{
                      borderRadius: 50,
                      width: 35,
                      marginRight: 15,
                    }}
                  />
                </Image.Group>
              </div>
              <div>
                <p
                  style={{
                    marginBottom: 10,
                    color: '#055990',
                    textAlign: 'center',
                  }}
                >
                  {t('newHome.creditCard')}
                </p>
              </div>
              <div>
                <Image.Group>
                  <Image
                    rounded={true}
                    src={master}
                    style={{
                      width: 60,
                    }}
                  />
                  <Image
                    rounded={true}
                    src={visa}
                    style={{
                      width: 65,
                    }}
                  />
                </Image.Group>
              </div>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row textAlign='center' centered>
            <Grid.Column tablet={14} mobile={14} textAlign='center'>
              <Segment basic textAlign='center'>
                <Header as='h4' color='#055990' style={{ color: '#055990' }}>
                  <div>{t('newHome.haveQuestion')}</div>
                </Header>
                <div style={{ color: '#055990', textAlign: 'center' }}>
                  {t('newHome.contactMessage')}
                </div>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns='equal' textAlign='center' centered>
            <Grid.Column tablet={2} mobile={2} textAlign='center'></Grid.Column>
            <Grid.Column textAlign='center'>
              <Segment
                inverted
                color='green'
                textAlign='center'
                style={{ padding: 10 }}
              >
                <div
                  onClick={() => this.openLink('https://wa.me/15512214091')}
                  style={{
                    alignContent: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}
                >
                  <Icon
                    name='whatsapp'
                    size='big'
                    style={{ verticalAlign: 'unset' }}
                  />
                  <span style={{ marginLeft: 5, marginTop: 5, fontSize: 25 }}>
                    {t('newHome.contact')}
                  </span>
                </div>
              </Segment>
            </Grid.Column>
            <Grid.Column tablet={2} mobile={2} textAlign='center'></Grid.Column>
          </Grid.Row>
          <Grid.Row centered textAlign='center'>
            <Grid.Column mobile={3} tablet={3} />
            <Grid.Column mobile={10} tablet={10}>
              <Item.Group>
                <Item style={{ flexDirection: 'row' }}>
                  <Item.Image size='small' src={icnAtc} />
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
                      <a href='https://wa.me/15512214091' target='_blank'>
                        <h3
                          style={{
                            color: '#055990',
                            fontWeight: '100',
                          }}
                        >
                          +1 (551) 221-4091
                        </h3>
                      </a>
                    </Item.Description>
                  </Item.Content>
                </Item>
                <Item style={{ flexDirection: 'row' }}>
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
                      <a href='https://wa.me/12019896074' target='_blank'>
                        <h3
                          style={{
                            color: '#055990',
                            fontWeight: '100',
                          }}
                        >
                          +1 (201) 989-6074
                        </h3>
                      </a>
                    </Item.Description>
                  </Item.Content>
                </Item>
                <Item style={{ flexDirection: 'row' }}>
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
                      <a href='https://wa.me/19199755089' target='_blank'>
                        <h3
                          style={{
                            color: '#055990',
                            fontWeight: '100',
                          }}
                        >
                          +1 (919) 975-5089
                        </h3>
                      </a>
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Grid.Column>
            <Grid.Column mobile={3} tablet={3} />
          </Grid.Row>
        </Grid>
      </Responsive>
    );
  }
}

export default translate(HomeMobile);
