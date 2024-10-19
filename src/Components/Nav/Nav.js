import React, { Component } from 'react';
import './Nav.css';
import translate from '../../i18n/translate';
import user from '../../services/user';
import { Link } from 'react-router-dom';
import logoMC from '../../img/logo.png';
import { isMobile } from 'react-device-detect';
import InboxMessage from '../InboxMessage/InboxMessage';
import { parse } from 'query-string';
import attachments from '../../services/attachments';
import {
  Image,
  Dropdown,
  Icon,
  Menu,
  Container,
  Popup,
  Divider,
  Grid,
  Button,
  Label,
} from 'semantic-ui-react';
import { element } from 'prop-types';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translator: props.translate,
      auth:
        this.props.auth === null || this.props.auth === 'false' ? false : true,
      active: '',
      showModalLogin: false,
      showModalRegistration: false,
      showModalContact: false,
      readyToRedirect: false,
      contactHeader: false,
      activeItem: '',
      navToShow: true,
      homeShow: false,
      spanish: false,
      idImgProfile: '',
      existProfile: false,
      viewInfo: false,
        /*(window.sessionStorage.getItem('viewInfo') === null ||
          window.sessionStorage.getItem('viewInfo') === 'true') &&
        (window.sessionStorage.getItem('auth') === null ||
          window.sessionStorage.getItem('auth') === 'false'),*/
      //date: new Date(),
      dateActual: '',
    };
  }
  componentDidMount() {
    this.getLanguage();
    const query = window.location.pathname;
    // if (query === "/") {
    //   this.setState({ navToShow: true });
    // }
    if (query === '/registration') {
      this.setState({ homeShow: true });
    } else {
      this.setState({ homeShow: false });
    }
    if (query === '/loginTwoFactor') {
      this.setState({ navToShow: false });
    }
    let username = user.getUserName();
    if (username !== null) {
      let data = user.getConfigUserGeneral(username);
      data.then((resp) => {
        this.loadImageUser(resp.data.result);
      });
    }
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.language !== nextProps.language) {
      this.setState({
        translator: nextProps.translate,
      });
      if (nextProps.language === 'es') {
        this.setState({ spanish: true }, () => {
          this.getDate();
        });
      } else if (nextProps.language === 'en') {
        this.setState({ spanish: false }, () => {
          this.getDate();
        });
      } else {
        this.setState({ spanish: true }, () => {
          this.getDate();
        });
      }
    }
  }
  getLanguage() {
    if (window.sessionStorage.getItem('language') === 'es') {
      this.setState({ spanish: true }, () => {
        this.getDate();
      });
    } else {
      this.setState({ spanish: false }, () => {
        this.getDate();
      });
    }
  }
  async loadImageUser(userInfo) {
    if (userInfo.profileImage !== undefined) {
      try {
        let nameValue = String(userInfo.profileImage);
        if (nameValue.includes('https://attachment.dollarbtc.com')) {
          nameValue = nameValue.split('https://attachment.dollarbtc.com')[1];
          nameValue = nameValue.split('/')[2];
        }
        const response = await attachments.getAttachementUser(
          user.getUserName(),
          nameValue
        );
        let blob = new Blob([response.data], {
          type: response.headers['content-type'],
        });
        let image = URL.createObjectURL(blob);
        this.setState({
          idImgProfile: image,
          existProfile: true,
        });
      } catch (error) {
        //console.log(error);
      }
    }
  }

  reload() {
    this.setState({ readyToRedirect: true });
  }
  closeSession() {
    user.logout();
    //window.sessionStorage.setItem('viewInfo', 'true');
    window.sessionStorage.setItem('viewInfo', 'false');
    window.sessionStorage.clear();
    window.location.href = '/';
  }

  handleItem(data) {
    // console.log(data)
    this.setState({ active: data });
    //this.getBalanceUserUpdate();
    //this.getGeneralTrans();
    //this.webBlockCypherBTC("BTC", user.getAddress());
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  handleSetView(view) {
    this.setState({ active: view });
    window.location.href = '/';
    // this.props.setView(view);
  }
  getDate() {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let day = today.getDate();
    let nameDay = today.getDay();
    let months = [];
    let daysWeek = [];
    let actualDate = '';
    if (this.state.spanish) {
      months = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ];

      daysWeek = [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
      ];
      actualDate = day + ' de ' + months[month].toLowerCase() + ' de ' + year;
    } else {
      months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      daysWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      actualDate = months[month].toLowerCase() + ' ' + day + ', ' + year;
    }
    this.setState({ dateActual: actualDate });
    // this.timerID = setInterval(
    //   () =>
    //     this.setState({
    //       date: new Date(),
    //     }),
    //   1000
    // );
  }
  render() {
    let t = this.state.translator;
    const { activeItem } = this.state;
    let username;
    let friendOptions = [
      {
        text: isMobile ? t('nav.lang.en').slice(0, 3) : t('nav.lang.en'),
        value: 'en',
        disabled: false,
      },
      {
        text: isMobile ? t('nav.lang.es').slice(0, 3) : t('nav.lang.es'),
        value: 'es',
      },
    ];
    if (this.state.readyToRedirect) {
      window.location.reload();
    }

    if (window.sessionStorage.getItem('nickname') !== '') {
      username = window.sessionStorage.getItem('nickname');
    } else if (window.sessionStorage.getItem('firstName') !== '') {
      username = window.sessionStorage.getItem('firstName');
    } else {
      username = window.sessionStorage.getItem('username');
    }
    let { handleClick } = this.props;
    const trigger = (
      <div>
        {!this.state.existProfile && (
          <Icon
            name='user circle'
            size='large'
            style={{ color: '#055990', marginTop: '-6px' }}
          />
        )}
        {this.state.existProfile && (
          <Image src={this.state.idImgProfile} avatar />
        )}
        <label
          style={{
            color: '#055990',
            fontSize: '1rem',
          }}
        >
          {username}
        </label>
      </div>
    );
    return (
      <div>
        {!this.state.auth && (
          <div>
            {this.state.viewInfo === true && (
              <div>
                <div
                  style={{
                    width: '100%',
                    borderRadius: 0,
                    backgroundColor: '#fbbd08',
                    padding: 10,
                    alignContent: 'center',
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'center',
                    left: 0,
                    top: 0,
                    position: 'fixed',
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      color: '#055990',
                      fontFamily: 'Open_Sans',
                      fontSize: 16,
                      fontWeight: '100',
                      textAlign: 'center',
                      paddingTop: 4,
                      paddingRight: 50,
                    }}
                  >
                    {t('nav.support2')}
                    <strong style={{ fontWeight: 'bold' }}>
                      {t('nav.support3')}
                    </strong>
                  </div>
                  <div
                    onClick={() => {
                      this.setState({ viewInfo: false });
                      window.sessionStorage.setItem('viewInfo', 'false');
                    }}
                    style={{
                      textAlign: 'right',
                      cursor: 'pointer',
                    }}
                  >
                    <Icon
                      name='delete'
                      style={{
                        color: '#055990',
                        fontSize: 20,
                        marginTop: 5,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            {this.state.navToShow && (
              <Menu
                size='massive'
                text
                fixed='top'
                fluid
                style={{
                  backgroundColor: '#FFFFFF',
                  marginTop: this.state.viewInfo ? '3.3rem' : 0,
                  zIndex: '1',
                }}
              >
                {!this.state.auth && !isMobile && (
                  <Container
                    style={{ color: '#055990' }}
                    className='container-menu-nav'
                  >
                    <Menu.Menu position='left' style={{ flexDirection: 'row' }}>
                      <Menu.Item>
                        <Image
                          src={logoMC}
                          as={Link}
                          to='/'
                          size='tiny'
                          style={{ width: '100px' }}
                        />
                      </Menu.Item>
                    </Menu.Menu>
                    <Menu.Menu
                      position='right'
                      style={{ flexDirection: 'row' }}
                    >
                      <Menu.Item
                        name='login'
                        className='login'
                        onClick={() => {
                          window.location.href = '/registration';
                        }}
                        id='signup'
                      >
                        {t('nav.signup')}
                      </Menu.Item>
                      <Menu.Item
                        className='login'
                        name='Login'
                        onClick={() => {
                          window.location.href = '/login';
                        }}
                        id='login'
                      >
                        {t('nav.login')}
                      </Menu.Item>
                      <Menu.Item
                        className='login'
                        name='Instructive'
                        onClick={() => {
                          window.location.href = '/instructive';
                        }}
                        id='instructive'
                      >
                        {t('nav.instructive').toUpperCase()}
                      </Menu.Item>
                      <Menu.Item
                        className='login'
                        name='Instructive'
                        onClick={() => {
                          window.location.href = '/newCharges';
                        }}
                        id='instructive'
                      >
                        {t('nav.charges').toUpperCase()}
                      </Menu.Item>
                      <Menu.Item
                        className='login'
                        name='Instructive'
                        onClick={() => {
                          window.location.href = '/faq';
                        }}
                        id='instructive'
                      >
                        {t('nav.faqs').toUpperCase()}
                      </Menu.Item>

                      <Menu.Item
                        className='login'
                        name='Instructive'
                        onClick={() => {
                          window.location.href = '/contact';
                        }}
                        id='instructive'
                      >
                        {t('nav.contactUs').toUpperCase()}
                      </Menu.Item>
                      <Menu.Item
                        className='login'
                        name='Instructive'
                        onClick={() => {
                          window.location.href = '/legal';
                        }}
                        id='instructive'
                      >
                        {t('nav.legal').toUpperCase()}
                      </Menu.Item>
                      {/* <Menu.Item className='signup'>
                        <Dropdown
                          // style={{ marginRight: '25px' }}
                          item
                          text={t('nav.help').toUpperCase()}
                          pointing='top right'
                          className='login'
                        >
                          <Dropdown.Menu as='div'>
                            <Dropdown.Item as={Link} to='/instructive'>
                              <span className='signup'>
                                {t('nav.instructive')}
                              </span>
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to='/newCharges'>
                              <span className='signup'>{t('nav.charges')}</span>
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to='/faq'>
                              <span className='signup'>{t('nav.faqs')}</span>
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to='/contact'>
                              <span className='signup'>
                                {t('nav.contactUs')}
                              </span>
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to='/legal'>
                              <span className='signup'>{t('nav.legal')}</span>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Menu.Item> */}
                      <Menu.Item>
                        <Dropdown
                          pointing='top right'
                          item
                          className='navLogged'
                          options={friendOptions}
                          text={t('nav.language').toUpperCase()}
                          defaultValue={this.props.language}
                          onChange={handleClick}
                        />
                      </Menu.Item>
                    </Menu.Menu>
                  </Container>
                )}
              </Menu>
            )}

            <Divider hidden />
          </div>
        )}
        {(this.state.auth || this.state.auth === 'true') && !isMobile && (
          <div>
            {this.state.viewInfo === true && (
              <div>
                <div
                  style={{
                    width: '100%',
                    borderRadius: 0,
                    backgroundColor: '#fbbd08',
                    padding: 10,
                    alignContent: 'center',
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'center',
                    left: 0,
                    top: 0,
                    position: 'fixed',
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      color: '#055990',
                      fontFamily: 'Open_Sans',
                      fontSize: 16,
                      fontWeight: '100',
                      textAlign: 'center',
                      paddingTop: 4,
                      paddingRight: 50,
                    }}
                  >
                    {t('nav.support2')}
                    <strong style={{ fontWeight: 'bold' }}>
                      {t('nav.support3')}
                    </strong>
                  </div>
                  <div
                    onClick={() => this.setState({ viewInfo: false })}
                    style={{
                      textAlign: 'right',
                      cursor: 'pointer',
                    }}
                  >
                    <Icon
                      name='delete'
                      style={{
                        color: '#055990',
                        fontSize: 20,
                        marginTop: 5,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            {this.state.navToShow && (
              <Menu
                secondary
                size='massive'
                fixed='top'
                fluid
                style={{
                  marginTop: this.state.viewInfo === true ? 10 : -10,
                  zIndex: '1',
                  backgroundColor: 'white',
                }}
              >
                <Container
                  style={{ color: '#055990' }}
                  className='container-menu-nav'
                >
                  <Menu.Item
                    position='left'
                    style={{ flexDirection: 'row' }}
                    onClick={() => {
                      this.props.handleClick();
                    }}
                  >
                    <Image
                      src={logoMC}
                      as={Link}
                      to='/'
                      style={{
                        marginTop: 27,
                        width: 90,
                        paddingRight: 20,
                        marginLeft: -30,
                        marginRight: 35,
                      }}
                    />
                  </Menu.Item>
                  <Menu.Menu position='right' style={{ flexDirection: 'row' }}>
                    <Menu
                      text
                      className='menuLogged'
                      style={{
                        marginLeft:
                          window.sessionStorage.getItem(
                            'specialreferralCode'
                          ) === 'true'
                            ? '150px'
                            : '-60px',
                      }}
                      //style={{ marginTop: -15 }}
                    >
                      {/* <Menu.Item className='navLogged' as={Link} to='/'>
                            
                              <Icon></Icon>
                              <Icon
                                name='home'
                                size='large'
                                style={{ color: '#055990', marginTop: '-6px' }}
                              />
                            </Menu.Item> */}
                      <Menu.Item
                        onClick={() => {
                          this.props.handleClick();
                        }}
                        className='navLogged'
                        as={Link}
                        to='/transactions'
                      >
                        <p>{t('nav.transactions')}</p>
                      </Menu.Item>
                      <div className='line-vertical-nav'></div>
                      {window.sessionStorage.getItem('specialreferralCode') ===
                        'false' && (
                        <Menu.Item
                          onClick={() => {
                            this.props.handleClick();
                          }}
                          as={Link}
                          to='/fastChange'
                          className='navLogged'
                        >
                          <p>{t('nav.fastChange')}</p>
                        </Menu.Item>
                      )}
                      {window.sessionStorage.getItem('specialreferralCode') ===
                        'false' && <div className='line-vertical-nav'></div>}
                      {window.sessionStorage.getItem('specialreferralCode') ===
                        'false' && (
                        <Dropdown
                          style={{ marginRight: '25px' }}
                          item
                          text={t('nav.send')}
                          pointing='top left'
                          className='navLogged'
                        >
                          <Dropdown.Menu as='div'>
                            <Dropdown.Item
                              as={Link}
                              to='/sendMoneyclick'
                              onClick={() => {
                                this.props.handleClick();
                              }}
                            >
                              <span className='signup'>
                                {t('nav.sendmoneyclick')}
                              </span>
                            </Dropdown.Item>
                            <Dropdown.Item
                              as={Link}
                              to='/withdraw'
                              onClick={() => {
                                this.props.handleClick();
                              }}
                            >
                              <span className='signup'>
                                {t('nav.withdraw')}
                              </span>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      )}
                      {window.sessionStorage.getItem('specialreferralCode') ===
                        'false' && <div className='line-vertical-nav'></div>}
                      {window.sessionStorage.getItem('specialreferralCode') ===
                        'false' && (
                        <Dropdown
                          style={{ marginRight: '25px' }}
                          item
                          text={t('nav.receive')}
                          pointing='top left'
                          className='navLogged'
                        >
                          <Dropdown.Menu as='div'>
                            {/* <Dropdown.Item as={Link} to="/giftCard">
                                  <span className="signup">
                                    {t("nav.giftCard")}
                                  </span>
                                </Dropdown.Item>
                            */}
                            <Dropdown.Item
                              as={Link}
                              to='/recharge'
                              onClick={() => {
                                this.props.handleClick();
                              }}
                            >
                              <span className='signup'>
                                {t('nav.fromBanks')}
                              </span>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      )}{' '}
                      {window.sessionStorage.getItem('specialreferralCode') ===
                        'false' && <div className='line-vertical-nav'></div>}
                      {window.sessionStorage.getItem('userType') === 'ADMIN' ||
                        (window.sessionStorage.getItem('userType') ===
                          'BANKER' && (
                          <Dropdown
                            style={{ marginRight: '25px' }}
                            item
                            text={t('nav.administration')}
                            pointing='top left'
                            className='navLogged'
                          >
                            <Dropdown.Menu as='div'>
                              <Dropdown.Item
                                as={Link}
                                to='/paymentMethods'
                                onClick={() => {
                                  this.props.handleClick();
                                }}
                              >
                                <span className='signup'>
                                  {t('nav.paymentMethods')}
                                </span>
                              </Dropdown.Item>
                              <Dropdown.Item
                                as={Link}
                                to='/otcOperations'
                                onClick={() => {
                                  this.props.handleClick();
                                }}
                              >
                                <span className='signup'>
                                  {t('nav.otcOperations')}
                                </span>
                              </Dropdown.Item>
                              {/* <Dropdown.Item as={Link} to='/otcAccounts'>
																	<span className='signup'>
																		{t("nav.otcAccounts")}
																	</span>
																</Dropdown.Item> */}
                              <Dropdown.Item
                                as={Link}
                                to='/userData'
                                onClick={() => {
                                  this.props.handleClick();
                                }}
                              >
                                <span className='signup'>
                                  {t('nav.userData')}
                                </span>
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        ))}
                      {window.sessionStorage.getItem('userType') === 'ADMIN' ||
                        (window.sessionStorage.getItem('userType') ===
                          'BANKER' && (
                          <div className='line-vertical-nav'></div>
                        ))}
                      <Dropdown
                        style={{ marginRight: '25px' }}
                        item
                        text={t('nav.crypto')}
                        pointing='top left'
                        className='navLogged'
                      >
                        <Dropdown.Menu as='div'>
                          <Dropdown.Item
                            as={Link}
                            to='/BuyBTC'
                            onClick={() => {
                              this.props.handleClick();
                            }}
                          >
                            <span className='signup'>{t('nav.buyBTC')}</span>
                          </Dropdown.Item>
                          <Dropdown.Item
                            as={Link}
                            to='/SellBTC'
                            onClick={() => {
                              this.props.handleClick();
                            }}
                          >
                            <span className='signup'>{t('nav.sellBTC')}</span>
                          </Dropdown.Item>
                          <Dropdown.Item
                            as={Link}
                            to='/receiveBitcoins'
                            onClick={() => {
                              this.props.handleClick();
                            }}
                          >
                            <span className='signup'>
                              {t('nav.receiveCrypto')}
                            </span>
                          </Dropdown.Item>
                          <Dropdown.Item
                            as={Link}
                            to='/sendBitcoins'
                            onClick={() => {
                              this.props.handleClick();
                            }}
                          >
                            <span className='signup'>
                              {t('nav.sendCrypto')}
                            </span>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <div className='line-vertical-nav'></div>
                      {window.sessionStorage.getItem(
                        'enableActivateGiftCards'
                      ) === 'true' && (
                        <Menu.Item
                          className='navLogged'
                          as={Link}
                          onClick={() => {
                            this.props.handleClick();
                          }}
                          to='/giftCard'
                        >
                          <p>{t('nav.giftCardOption')}</p>
                        </Menu.Item>
                      )}
                      {window.sessionStorage.getItem(
                        'enableActivateGiftCards'
                      ) === 'true' && <div className='line-vertical-nav'></div>}
                      <Dropdown
                        style={{ marginRight: '25px' }}
                        item
                        text={t('nav.help')}
                        pointing='top left'
                        className='navLogged'
                      >
                        <Dropdown.Menu as='div'>
                          <Dropdown.Item
                            as={Link}
                            to='/instructive'
                            onClick={() => {
                              this.props.handleClick();
                            }}
                          >
                            <span className='signup'>
                              {t('nav.instructive')}
                            </span>
                          </Dropdown.Item>
                          <Dropdown.Item
                            as={Link}
                            to='/newCharges'
                            onClick={() => {
                              this.props.handleClick();
                            }}
                          >
                            <span className='signup'>{t('nav.charges')}</span>
                          </Dropdown.Item>
                          <Dropdown.Item
                            as={Link}
                            to='/faq'
                            onClick={() => {
                              this.props.handleClick();
                            }}
                          >
                            <span className='signup'>{t('nav.faqs')}</span>
                          </Dropdown.Item>
                          <Dropdown.Item
                            as={Link}
                            to='/contact'
                            onClick={() => {
                              this.props.handleClick();
                            }}
                          >
                            <span className='signup'>{t('nav.contactUs')}</span>
                          </Dropdown.Item>
                          <Dropdown.Item
                            as={Link}
                            to='/legal'
                            onClick={() => {
                              this.props.handleClick();
                            }}
                          >
                            <span className='signup'>{t('nav.legal')}</span>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <InboxMessage notifications={this.props.notifications} />
                      <Menu.Item style={{ paddingTop: 5 }}>
                        <Dropdown
                          //style={{ marginRight: "25px" }}
                          item
                          trigger={trigger}
                          pointing='top left'
                          icon={null}
                          className='navLogged'
                        >
                          <Dropdown.Menu as='div'>
                            <Dropdown.Item
                              as={Link}
                              to='/'
                              onClick={() => {
                                this.props.handleClick();
                              }}
                            >
                              <span className='signup'>{t('nav.home')}</span>
                            </Dropdown.Item>
                            <Dropdown.Item
                              as={Link}
                              to='/profile'
                              onClick={() => {
                                this.props.handleClick();
                              }}
                            >
                              <span className='signup'>{t('nav.profile')}</span>
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={this.closeSession.bind(this)}
                            >
                              <span className='signup'>{t('nav.logout')}</span>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Menu.Item>
                      <Menu.Item>
                        <Dropdown
                          pointing='top right'
                          item
                          className='navLogged'
                          options={friendOptions}
                          text={t('nav.language').toUpperCase()}
                          defaultValue={this.props.language}
                          onChange={handleClick}
                        />
                      </Menu.Item>
                    </Menu>
                  </Menu.Menu>
                </Container>
              </Menu>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default translate(Nav);
