import React, { Component } from 'react';
import config from '../../services/config';
import {
  Button,
  Divider,
  Header,
  Message,
  Segment,
  Form,
  Grid,
  Image,
  Label,
  Input,
  Icon,
  Responsive,
  Dropdown,
  Dimmer,
  Loader,
  Modal,
  ModalContent,
} from 'semantic-ui-react';
import ReCAPTCHA from 'react-google-recaptcha';
import translate from '../../i18n/translate';
import NumberFormat from 'react-number-format';
import prefits from '../../common/prefits';
import image from '../../img/icn-verificacion.png';
import user from '../../services/user';
import img1 from '../../img/back-1.png';
import img1english from '../../img/back-1-ingles.png';
import {
  isMobile,
} from 'react-device-detect';
const recapcha = React.createRef();

class SendTokenResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorPassword: false,
      errorRepeatPassword: false,
      email: '',
      loadForm: false,
      errorUser: false,
      prefit: prefits.country,
      errorCaptcha: false,
      captcha: '',
      message: '',
      errorForm: false,
      errorCode: false,
      message: '',
      hidden: true,
      resultPost: ' ',
      hiddenRepeat: true,
      errorCountry: false,
      countryCode: '',
      phone: '',
      showFormComplete: false,
      errorPhone: false,
      messageError: '',
      translator: props.translate,
    };
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.language !== nextProps.language) {
      this.setState({
        translator: nextProps.translate,
      });
    }
  }
  handlePrefit(e, data) {
    this.setState({ countryCode: data.value });
  }

  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery });

  loginCode() {
    // ("entrando al loginCode")
    if (this.state.code !== '') {
      let request = {
        userName: this.state.countryCode + this.state.phone,

        code: this.state.code,
      };
      /*user
        .authCodeCore(request)
        .then((res) => {
          console.log("res del ligncode:", res)*/
         // if (res.data === 'OK') {
            this.confirmChanguePassword(this.state.code);
          /*}
        })
        .catch((error) => {
          ////console.log(error)
          let e = error.toString();
          if (e.includes('Network')) {
            // ("dentro de la condicion")
            this.setState({
              loadform: false,
              errorForm: true,
              messageError: 'registration.errors.errorNetwork',
            });
            setTimeout(() => {
              this.setState({
                errorForm: false,
                textMessage: '',
                showFormComplete: false,
              });
            }, 4000);
          } else {
            this.setState({
              message: 'login2FA.errors.serverError',
              errorCode: true,
            });
            setTimeout(() => {
              this.setState({
                message: '',
                errorCode: false,
                showFormComplete: false,
              });
            }, 3000);
          }
        });*/
      // }
    } else {
      this.setState({
        errorCode: true,
        message: 'login2FA.errors.requiredField',
      });
      setTimeout(() => {
        this.setState({ errorCode: false, message: '' });
      }, 5000);
    }
  }
  sendCode() {
    this.setState({ code: '' });

    // } else {
    let body = {
      userName: this.state.countryCode + this.state.phone,
      language: window.sessionStorage.getItem('language').toUpperCase(),
      sendSms: true,
      sendMail: false,
      mcNewUser: true,
    };

    user
      .findUserByPhone(this.state.phone, this.state.countryCode)
      .then((resp) => {
        //console.log("resp del find:", resp)

        if (resp.data.errors === null && resp.data.payload !== null) {
          user
            .sendAuthCodeCore(body)
            .then((resp) => {
              if (resp.data === 'OK') {
                // ('dentro del OK');
                this.setState({
                  loading: false,
                  loadform: false,
                  codeSended: true,
                  //modalCode: true,
                  showFormComplete: true,
                  showModalRegistration: false,
                  // message: text,
                  timer: true,
                });

                setTimeout(() => {
                  this.setState({
                    timer: false,
                  });
                }, 60000);
              } else {
                this.setState({
                  loading: false,
                  // phoneInvalide: true,
                  textMessage: 'buy.formVerificationPhone.errors.tokenNotSent',
                });
              }
            })
            .catch((error) => {
              ////console.log(error)
              // (error);
              let e = error.toString();
              if (e.includes('Network')) {
                // ("dentro de la condicion")
                this.setState({
                  loadform: false,
                  errorForm: true,
                  messageError: 'registration.errors.errorNetwork',
                });
                setTimeout(() => {
                  this.setState({
                    errorForm: false,
                    textMessage: '',
                  });
                }, 4000);
              }
            });
        } else if (resp.data.errors[0].code === 32) {
          this.setState({
            loadform: false,
            errorForm: true,
            messageError: 'registration.errors.form.notexist',
          });
          setTimeout(() => {
            this.setState({
              errorForm: false,
              messageError: '',
            });
          }, 5000);
        }
      });

    // }
  }
  reSentCode() {
    //// ("entrando al reSendCode")

    this.setState({ code: '' });

    let body = {
      userName: this.state.countryCode + this.state.phone,
      language: 'EN',
      sendSms: true,
      sendMail: false,
      mcNewUser: true,
    };

    user
      .sendAuthCodeCore(body)
      .then((res) => {
        //////  (res);
        this.setState({
          timer: true,
        });
        setTimeout(() => {
          this.setState({ timer: false });
        }, 60000);
      })
      .catch((error) => {
        ////console.log(error)
        this.setState({
          timer: false,
        });
        setTimeout(() => {
          this.setState({ timer: true });
        }, 60000);
      });
    // }
  }
  handleCode(e) {
    if (/^([0-9])*$/.test(e.target.value)) {
      this.setState({
        code: e.target.value,
        errorCode: false,
      });
    } else {
      this.setState({
        errorCode: true,
      });
    }
  }
  handleRegistrer() {
    this.setState({
      loadform: true,
    });
    if (this.state.password !== '') {
      if (this.state.password.length >= 4) {
        if (this.state.password === this.state.passwordRepeat) {
          if (
            this.state.phone !== '' &&
            this.state.phone !== undefined &&
            this.state.phone !== null
          ) {
            if (
              this.state.countryCode !== '' &&
              this.state.countryCode !== null &&
              this.state.countryCode !== undefined
            ) {
              if (
                this.state.captcha !== '' &&
                this.state.captcha !== null &&
                this.state.captcha !== undefined
              ) {
                this.sendCode();
              } else {
                this.setState({
                  errorCaptcha: true,
                  message: 'login.errors.errorCaptcha2',
                });
                setTimeout(() => {
                  this.setState({
                    errorCaptcha: false,
                    message: '',
                    loadform: false,
                  });
                }, 5000);
              }
            } else {
              this.setState({
                errorCountry: true,
                messageError: 'registration.errors.errorRequiredField',
              });
              setTimeout(() => {
                this.setState({
                  errorCountry: false,
                  messageError: '',
                  loadform: false,
                });
              }, 5000);
            }
          } else {
            this.setState({
              errorPhone: true,
              messageError: 'registration.errors.errorRequiredField',
            });
            setTimeout(() => {
              this.setState({
                errorPhone: false,
                messageError: '',
                loadform: false,
              });
            }, 5000);
          }
        } else {
          this.setState({
            errorRepeatPassword: true,
            messageError: 'registration.errors.form.confirmPassword',
          });
          setTimeout(() => {
            this.setState({
              errorRepeatPassword: false,
              messageError: '',
              loadform: false,
            });
          }, 5000);
        }
      } else {
        this.setState({
          errorPassword: true,
          messageError: 'registration.errors.form.password',
        });
        setTimeout(() => {
          this.setState({
            errorPassword: false,
            messageError: '',
            loadform: false,
          });
        }, 5000);
      }
    } else {
      this.setState({
        errorPassword: true,
        messageError: 'registration.errors.errorRequiredField',
      });
      setTimeout(() => {
        this.setState({
          errorPassword: false,
          messageError: '',
          loadform: false,
        });
      }, 5000);
    }
  }
  handleCaptcha(params) {
    this.setState({
      captcha: params,
    });
  }
  cancelChange() {
    window.location.href = '/login';
  }

  async confirmChanguePassword(code) {
    let phone = this.state.countryCode + this.state.phone;
    this.setState({ loadform: true });
    console.log('code que llega ', code);
    try {
      const response = await user.updatePassword(
        phone,
        this.state.password,
        code
      );
      this.setState({ loadform: false });
      if (response.data.payload === true) {
        this.setState({
          resultPost: 'success',
          viewModalSuccess: true,
        });

        setTimeout(() => {
          window.location.href = '/login';
        }, 5000);
      } else {
            this.setState({
              message: 'login2FA.errors.failAuth',
              errorCode: true,
            });
            setTimeout(() => {
              this.setState({
                message: '',
                errorCode: false,
              });
            }, 5000);
      }
    } catch (error) {
      this.setState({ loadform: false });
      //console.log(error)
    }
  }
  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }
  toggleShowRepeat() {
    this.setState({ hiddenRepeat: !this.state.hiddenRepeat });
  }
  handlePassword(e) {
    this.setState({ password: e.target.value });
  }
  handleRepeatPassword(e) {
    this.setState({
      passwordRepeat: e.target.value,
      hideRepeatPass: 'passwordRepeat',
    });
  }
  clearFields() {
    this.setState({
      showFormComplete: false,

      code: '',
    });
  }
  render() {
    let resultPostMessage;
    let resultPost = this.state.resultPost;
    let t = this.state.translator;
    let list = [];
    let errorCountry;
    let errorPassword;
    let errorRepeatPassword;
    let errorForm;
    let labelCaptcha;
    let labelCode;
    let errorPhone;
    if (this.state.errorCode) {
      labelCode = (
        <Label basic color='red' pointing>
          {t(this.state.message)}
        </Label>
      );
    }
    if (this.state.errorPhone) {
      errorPhone = (
        <Label basic color='red' pointing>
          {t(this.state.messageError)}
        </Label>
      );
    }
    if (this.state.errorForm) {
      errorForm = <Message error content={t(this.state.messageError)} />;
    }
    if (this.state.errorCountry) {
      errorCountry = (
        <Label basic color='red' pointing>
          {t(this.state.messageError)}
        </Label>
      );
    }
    if (this.state.prefit.length > 0) {
      for (let pre of this.state.prefit) {
        if (pre.value !== '') {
          list.push({
            text:
              window.sessionStorage.getItem('language') === 'es'
                ? pre.nombre + ' (+' + pre.value + ')'
                : pre.text + ' (+' + pre.value + ')',
            value: pre.value,
            key: pre.iso2,
          });
        }
      }
    }
    let labelUser;
    if (this.state.errorUser) {
      labelUser = (
        <Message
          error
          header='Error'
          content={t('sendTokenResetPassword.errors.incompleteData')}
        />
      );
    }
    if (this.state.errorPassword) {
      errorPassword = (
        <Label basic color='red' pointing>
          {t(this.state.messageError)}
        </Label>
      );
    }
    if (this.state.errorRepeatPassword) {
      errorRepeatPassword = (
        <Label basic color='red' pointing>
          {t(this.state.messageError)}
        </Label>
      );
    }
    if (this.state.errorCaptcha) {
      labelCaptcha = (
        <div>
          <Message error header='Error' content={t(this.state.message)} />
          <Divider hidden />
        </div>
      );
    }
    if (resultPost === 'success') {
      resultPostMessage = (
        <div>
          <Message info content={t('resetFormPassword.successChange')} />
        </div>
      );
    } else {
      resultPostMessage = (
        <div>
          <Message info content={t('login2FA.errors.failAuth')} />
        </div>
      );
    }
    return (
      <div>
        {!this.state.showFormComplete && !this.state.viewModalSuccess && (
          <div>
            <Grid columns='equal' style={{ marginTop: '3rem' }}>
              <Grid.Column largeScreen={8} computer={8} widescreen={7} mobile={6}>
                {window.sessionStorage.getItem('language') === 'es' && (
                  <Image src={img1} size='large' />
                )}
                {window.sessionStorage.getItem('language') === 'en' && (
                  <Image src={img1english} size='large' />
                )}
              </Grid.Column>
              <Grid.Column largeScreen={6} computer={7} widescreen={7} mobile={10}>
                <Divider hidden />
                <Divider hidden />
                <Divider hidden />
                <Header
                  size='large'
                  content={t('forgotPassword.header2')}
                  textAlign='left'
                />
                {this.state.loadform && (
                  <Dimmer active inverted>
                    <Loader size='small' inverted />
                  </Dimmer>
                )}

                <Form
                  onSubmit={this.handleRegistrer.bind(this)}
                  loading={this.state.loadForm}
                  error
                  unstackable
                  widths='equal'
                >
                  <p style={{ textAlign: 'center' }}>
                    {t('sendTokenResetPassword.form.title')}
                  </p>
                  <Form.Group widths='equal'>
                    <Form.Field>
                      <label> {t('login.country')}</label>
                      <Dropdown
                        placeholder={t('login.country')}
                        fluid
                        search
                        selection
                        options={list}
                        value={this.state.countryCode}
                        onChange={this.handlePrefit.bind(this)}
                        onSearchChange={this.handleSearchChange.bind(this)}
                        required
                      />
                      {errorCountry}
                    </Form.Field>

                    <Form.Field>
                      <label>{t('login.phone')}</label>
                      <NumberFormat
                        required
                        value={this.state.phone}
                        allowNegative={false}
                        thousandSeparator={false}
                        placeholder={'12345678'}
                        onValueChange={(values) => {
                          const { value } = values;
                          this.setState({ phone: value });
                        }}
                      />
                      {errorPhone}
                    </Form.Field>
                  </Form.Group>
                  <Form.Field>
                    <label>{t('login.password')}</label>
                    <Input
                      icon={
                        this.state.hidden ? (
                          <Icon
                            name='eye'
                            circular
                            link
                            onClick={this.toggleShow.bind(this)}
                          />
                        ) : (
                          <Icon
                            name='eye slash'
                            circular
                            link
                            onClick={this.toggleShow.bind(this)}
                          />
                        )
                      }
                      type={this.state.hidden ? 'password' : 'text'}
                      value={this.state.password}
                      onChange={this.handlePassword.bind(this)}
                      required
                    />
                    {errorPassword}
                  </Form.Field>

                  <Form.Field>
                    <label>{t('login.passwordrepeat')}</label>
                    <Input
                      icon={
                        this.state.hiddenRepeat ? (
                          <Icon
                            name='eye'
                            circular
                            link
                            onClick={this.toggleShowRepeat.bind(this)}
                          />
                        ) : (
                          <Icon
                            name='eye slash'
                            circular
                            link
                            onClick={this.toggleShowRepeat.bind(this)}
                          />
                        )
                      }
                      type={this.state.hiddenRepeat ? 'password' : 'text'}
                      value={this.state.passwordRepeat}
                      onChange={this.handleRepeatPassword.bind(this)}
                      required
                    />
                    {errorRepeatPassword}
                  </Form.Field>

                  <Segment basic textAlign='center'>
                    <Divider hidden />
                    <p>{t('sendTokenResetPassword.form.captchaLabel')}</p>
                    <Grid columns='equal' relaxed='very'>
                      <Grid.Row centered>
                        <Grid.Column largeScreen={2}>
                          <p />
                        </Grid.Column>
                        <Grid.Column>
                          {window.sessionStorage.getItem('language') ===
                            'es' && (
                            <ReCAPTCHA
                              id='capt'
                              ref={recapcha}
                              size={isMobile ? 'compact' : 'normal'}
                              hl={window.sessionStorage.getItem('language')}
                              badge='inline'
                              sitekey='6LeuR_AUAAAAACjTTEYOxkyCxqnxU9FhEMzV45xe'
                              onChange={this.handleCaptcha.bind(this)}
                            />
                          )}
                          {window.sessionStorage.getItem('language') ===
                            'en' && (
                            <ReCAPTCHA
                              id='capt'
                              ref={recapcha}
                              size={isMobile ? 'compact' : 'normal'}
                              hl={window.sessionStorage.getItem('language')}
                              badge='inline'
                              sitekey='6LeuR_AUAAAAACjTTEYOxkyCxqnxU9FhEMzV45xe'
                              onChange={this.handleCaptcha.bind(this)}
                            />
                          )}
                        </Grid.Column>
                        <Grid.Column />
                      </Grid.Row>
                    </Grid>
                    <Divider hidden />
                    {labelUser}
                    {labelCaptcha}
                    {errorForm}
                    <Form.Button type='submit' color='blue' size='large'>
                      {t('sendTokenResetPassword.form.buttonConfirm')}
                    </Form.Button>
                    <Divider hidden />
                    <Button
                      secondary
                      size='small'
                      onClick={this.cancelChange.bind(this)}
                    >
                      {t('sendTokenResetPassword.form.buttonClose')}
                    </Button>
                  </Segment>
                </Form>
              </Grid.Column>
              <Grid.Column largeScreen={2} computer={1} widescreen={2} />
            </Grid>
            <Divider hidden />
          </div>
        )}

        <Modal
          open={this.state.showFormComplete}
          onClose={() => this.clearFields()}
          closeIcon
          size='tiny'
        >
          <Modal.Content>
            <Form loading={this.state.loadform} error unstackable>
              <Form.Field>
                <Image src={image} size='small' centered></Image>
              </Form.Field>
              {!this.state.viewModalSuccess && (
                <div>
                  <Form.Field>
                    <label>{t('codeResetPassword.message')}</label>
                  </Form.Field>
                  <Form.Field>
                    <label>{t('login2FA.form.label')}</label>
                    <input
                      placeholder='xxxxxxx'
                      value={this.state.code}
                      onChange={this.handleCode.bind(this)}
                    />
                    {labelCode}
                  </Form.Field>
                  <Divider hidden />

                  <div className='button-login'>
                    <Form.Button
                      onClick={this.loginCode.bind(this)}
                      color='blue'
                      size='large'
                    >
                      {t('login2FA.form.buttonConfirm')}
                    </Form.Button>
                    <Button
                      disabled={this.state.timer}
                      onClick={this.reSentCode.bind(this)}
                      color='blue'
                      size='small'
                    >
                      {t('login2FA.form.buttonResend')}
                    </Button>

                    <Divider hidden />
                    <Form.Field>{errorForm}</Form.Field>
                  </div>
                </div>
              )}
              {this.state.viewModalSuccess && <div>{resultPostMessage}</div>}
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default translate(SendTokenResetPassword);
