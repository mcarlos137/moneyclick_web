import React, { Component } from 'react';
import './HomeLoggedIn.css';
import { Redirect } from 'react-router-dom';
import BalanceMoneyClick from './Balance/Balance';
import translate from '../../i18n/translate';
import user from '../../services/user';
import { parse } from 'query-string';
import item1 from '../../img/icn-3-es.png';
import item1en from '../../img/icn-3-INGLES.png';
import item2 from '../../img/hlicn-2.png';
import item3 from '../../img/hlicn-3.png';
import bannerCupon from '../../img/banner-cupon-3.png';
import bannerCuponEn from '../../img/banner-cupon-3-ingles.png';
import {
  Image,
  Grid,
  Responsive,
  Button,
  Segment,
  Icon,
  Container,
  Divider,
  Message,
  Modal,
  Dimmer,
  Loader,
} from 'semantic-ui-react';

class HomeLoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translator: props.translate,
      showModalFastChange: false,
      readyToRedirect: false,
      userVerify: false,
      emailVerify: '',
      showFastChange: false,
      showWithdraw: false,
      messageBenefits: '',
      idBenefits: '',
      statusBenefits: '',
      showTransactions: false,
      pendingBenefits: [],
      sendRequest: false,
      endRequest: false,
      failRequest: false,
      loadModal: false,
      viewModal: false,
      errorNetwork: false,
      load: true,
      spanish: false,
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.getLanguage();
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

    this.getReceiveAuthorization();
  }
  async getReceiveAuthorization() {
    let array = [];
    try {
      const username = sessionStorage.getItem('username');
      const response = await user.getReceiveAuthorization(username);
      // console.log(response);
      Object.entries(response.data).forEach(([key, value]) => {
        if (value === 'PENDING') {
          let ob = {
            id: key,
            status: value,
            message: '',
          };
          array.push(ob);
        }
      });
      for (let benefits of array) {
        benefits.message = await this.getMessageToShow(benefits.id);
      }
      this.setState({ pendingBenefits: array }, () => {
        // console.log(this.state.pendingBenefits);
        if (this.state.pendingBenefits.length > 0) {
          let filterArray = this.state.pendingBenefits.filter((benefits) => {
            return benefits.status === 'PENDING';
          })[0];
          this.setState(
            {
              idBenefits: filterArray.id,
              messageBenefits: filterArray.message,
              statusBenefits: filterArray.status,
            },
            () => {
              this.setState({ viewModal: true });
            }
          );
        }
      });
    } catch (error) {
      // console.log(error);
    }
  }
  async getMessageToShow(id) {
    let returnData;
    let language = sessionStorage.getItem('language');
    language = language.toUpperCase();
    try {
      returnData = await user.getMessageReceiveAuthorization(id, language);
      let message = String(returnData.data);
      if (message.includes('BOLD')) {
        message = message.replace('BOLD', '');
        if (message.includes('<')) {
          message = message.replace('<', '');
        }
        if (message.includes('>')) {
          message = message.replace('>', '');
        }
      }
      return await message;
    } catch (error) {
      return await false;
    }
  }
  async setStatusReceive(option) {
    this.setState({ sendRequest: true, loadModal: true });
    const username = sessionStorage.getItem('username');
    let body = {
      userName: username,
      receiveAuthorizationId: this.state.idBenefits,
      receiveAuthorizationStatus: option,
    };
    try {
      const response = await user.changeStatusReceiveAuthorization(body);
      if (response.data === 'OK') {
        this.setState({ endRequest: true, loadModal: false });
      } else {
        this.setState({ endRequest: true, loadModal: false });
      }
    } catch (error) {
      this.setState({ endRequest: true, loadModal: false });
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
  closeModal() {
    this.setState({ viewModal: false });
  }
  reload() {
    this.setState({ readyToRedirect: true });
  }

  goRecharge() {
    window.location.href = '/recharge';
  }
  render() {
    let Balance = <BalanceMoneyClick></BalanceMoneyClick>;
    let t = this.state.translator;

    if (this.state.readyToRedirect) {
      window.location.reload();
    }
    let rail;
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
      <div>
        <Grid>
          {rail}
          <Grid.Row columns={1} centered>
            <Container>
              <Grid.Column
                largeScreen={16}
                mobile={16}
                tablet={16}
                computer={16}
              >
                {Balance}
              </Grid.Column>
            </Container>
          </Grid.Row>

          {window.sessionStorage.getItem('specialreferralCode') === 'false' && (
            <Grid>
              <Divider hidden></Divider>
              <Divider hidden></Divider>
              <Grid.Row>
                <Grid.Column widescreen={2} />
                <Grid.Column
                  largeScreen={16}
                  computer={16}
                  widescreen={12}
                  tablet={16}
                  mobile={16}
                  centered
                >
                  <h2 className='title-mc'>{t('homeLoggedIn.welcome')}</h2>
                  <div className='text5'>
                    <span>{t('homeLoggedIn.subWelcome')}</span>
                  </div>
                </Grid.Column>
                <Grid.Column widescreen={2} />
              </Grid.Row>
              <Grid.Row
                verticalAlign='middle'
                textAlign='justified'
                centered
                columns='equal'
              >
                <Grid.Column
                  largeScreen={1}
                  computer={1}
                  widescreen={1}
                  tablet={1}
                  mobile={1}
                />
                <Grid.Column
                  largeScreen={4}
                  computer={4}
                  widescreen={2}
                  tablet={4}
                  mobile={4}
                  verticalAlign='middle'
                >
                  {this.state.spanish && (
                    <Image src={item1} size='small' centered />
                  )}
                  {!this.state.spanish && (
                    <Image src={item1en} size='small' centered />
                  )}
                </Grid.Column>
                {/* <Grid.Column
                  largeScreen={1}
                  computer={1}
                  widescreen={1}
                  tablet={1}
                  mobile={1}
                /> */}
                <Grid.Column
                  largeScreen={4}
                  computer={4}
                  widescreen={2}
                  tablet={4}
                  mobile={4}
                  verticalAlign='middle'
                >
                  <Image src={item2} size='small' centered />
                </Grid.Column>
                {/* <Grid.Column
                  largeScreen={1}
                  computer={1}
                  widescreen={1}
                  tablet={1}
                  mobile={1}
                /> */}
                <Grid.Column
                  largeScreen={4}
                  computer={4}
                  widescreen={2}
                  tablet={4}
                  mobile={4}
                  verticalAlign='middle'
                >
                  <Image src={item3} size='medium' centered />
                </Grid.Column>
                <Grid.Column
                  largeScreen={1}
                  computer={1}
                  widescreen={1}
                  tablet={1}
                  mobile={1}
                />
              </Grid.Row>
              <Grid.Row
                verticalAlign='top'
                textAlign='center'
                centered
                columns='equal'
              >
                <Grid.Column
                  largeScreen={1}
                  computer={1}
                  widescreen={1}
                  tablet={1}
                  mobile={1}
                />
                <Grid.Column
                  largeScreen={4}
                  computer={4}
                  widescreen={2}
                  tablet={4}
                  mobile={4}
                  verticalAlign='top'
                >
                  <span className='item-text-homeLogue'>
                    {t('homeLoggedIn.item1')}
                  </span>
                </Grid.Column>
                {/* <Grid.Column
                  largeScreen={1}
                  computer={1}
                  widescreen={1}
                  tablet={1}
                  mobile={1}
                /> */}
                <Grid.Column
                  largeScreen={4}
                  computer={4}
                  widescreen={2}
                  tablet={4}
                  mobile={4}
                  verticalAlign='top'
                >
                  <span className='item-text-homeLogue'>
                    {t('homeLoggedIn.item2')}
                  </span>
                </Grid.Column>
                {/* <Grid.Column
                  largeScreen={1}
                  computer={1}
                  widescreen={1}
                  tablet={1}
                  mobile={1}
                /> */}
                <Grid.Column
                  largeScreen={4}
                  computer={4}
                  widescreen={2}
                  tablet={4}
                  mobile={4}
                  verticalAlign='top'
                >
                  <span className='item-text-homeLogue'>
                    {t('homeLoggedIn.item3')}
                  </span>
                </Grid.Column>
                <Grid.Column
                  largeScreen={1}
                  computer={1}
                  widescreen={1}
                  tablet={1}
                  mobile={1}
                />
              </Grid.Row>
            </Grid>
          )}
          {window.sessionStorage.getItem('specialreferralCode') === 'true' && (
            <Grid.Row textAlign='center' style={{ marginBottom: '-30px' }}>
              <Grid.Column
                largeScreen={16}
                computer={16}
                widescreen={16}
                verticalAlign='middle'
                textAlign='center'
              >
                {this.state.spanish && <Image centered src={bannerCupon} />}
                {!this.state.spanish && <Image centered src={bannerCuponEn} />}
              </Grid.Column>
            </Grid.Row>
          )}
        </Grid>
        <Divider hidden></Divider>

        <Modal
          size='tiny'
          open={this.state.viewModal}
          onClose={() => this.closeModal()}
        >
          <Modal.Content>
            {this.state.loadModal && (
              <Dimmer active inverted>
                <Loader size='small' inverted />
              </Dimmer>
            )}
            {!this.state.endRequest && (
              <span
                style={{
                  textAlign: 'justify',
                  fontSize: 16,
                  color: '#055990',
                }}
              >
                {this.state.messageBenefits}
              </span>
            )}
            {this.state.failRequest && (
              <Message negative>{t('benefits.operationFail')}</Message>
            )}
            {this.state.endRequest && (
              <Message positive>
                {t('benefits.messageOperationSuccess')}
              </Message>
            )}
          </Modal.Content>
          <Modal.Actions>
            {!this.state.sendRequest && (
              <div>
                <Button onClick={() => this.setStatusReceive('ACCEPTED')}>
                  {t('benefits.yes')}
                </Button>

                <Button
                  //color="red"
                  onClick={() => this.setStatusReceive('REJECTED')}
                >
                  {t('benefits.no')}
                </Button>
              </div>
            )}
            {this.state.endRequest && (
              <Button
                onClick={() => {
                  this.setState({
                    viewModal: false,
                    endRequest: false,
                    loadModal: false,
                    failRequest: false,
                  });
                  this.reload();
                }}
              >
                {t('benefits.buttonAccept')}
              </Button>
            )}
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default translate(HomeLoggedIn);
