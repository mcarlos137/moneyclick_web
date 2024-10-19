import React, { Component } from 'react';
import './ContactUs.css';
import {
  Form,
  Segment,
  Input,
  TextArea,
  Container,
  Grid,
  Divider,
  Header,
  Label,
  Message,
  Icon,
} from 'semantic-ui-react';
import InputMask from 'react-input-mask';
import contactUs from '../../services/contactUs';
import translate from '../../i18n/translate';
class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadForm: false,
      success: false,
      error: false,
      errorType: '',
      name:
        window.sessionStorage.getItem('firstName') !== 'null' &&
        window.sessionStorage.getItem('firstName') !== null &&
        window.sessionStorage.getItem('lastName') !== 'null' &&
        window.sessionStorage.getItem('lastName') !== null
          ? window.sessionStorage.getItem('firstName') +
            '' +
            window.sessionStorage.getItem('lastName')
          : '',
      email:
        window.sessionStorage.getItem('email') !== 'null' &&
        window.sessionStorage.getItem('email') !== null
          ? window.sessionStorage.getItem('email')
          : '',
      phone:
        window.sessionStorage.getItem('countryCode') !== 'null' &&
        window.sessionStorage.getItem('countryCode') !== null &&
        window.sessionStorage.getItem('phone') !== 'null' &&
        window.sessionStorage.getItem('phone') !== null
          ? window.sessionStorage.getItem('countryCode') +
            ' ' +
            window.sessionStorage.getItem('phone')
          : '',
      subject: '',
      message: '',
      honeypot: 'RealMadrid180380...',
      errors: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      },
      translator: props.translate,
    };
    this.onSubmitContactForm = this.onSubmitContactForm.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleSubject = this.handleSubject.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }
  handleName = (e) => {
    this.setState({ name: e.target.value });
  };

  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePhone = (e) => {
    /*if(this.handlePhoneKeyPressed(e))*/
    this.setState({ phone: e.target.value });
  };

  handleSubject = (e) => {
    this.setState({ subject: e.target.value });
  };

  handleMessage = (e) => {
    this.setState({ message: e.target.value });
  };
  blankErrors(type) {
    var errors = {};
    if (type === 'NAME') {
      errors = {
        name: '',
        email: this.state.errors.email,
        phone: this.state.errors.phone,
        subject: this.state.errors.subject,
        message: this.state.errors.message,
      };

      setTimeout(() => {
        this.setState({ errorType: '', errors: errors });
      }, 5000);
    }
    if (type === 'EMAIL') {
      errors = {
        name: this.state.errors.message,
        email: '',
        phone: this.state.errors.phone,
        subject: this.state.errors.subject,
        message: this.state.errors.message,
      };

      setTimeout(() => {
        this.setState({ errorType: '', errors: errors });
      }, 5000);
    }
    if (type === 'PHONE') {
      errors = {
        name: this.state.errors.message,
        email: this.state.errors.email,
        phone: '',
        subject: this.state.errors.subject,
        message: this.state.errors.message,
      };

      setTimeout(() => {
        this.setState({ errorType: '', errors: errors });
      }, 5000);
    }
    if (type === 'SUBJECT') {
      errors = {
        name: this.state.errors.message,
        email: this.state.errors.email,
        phone: this.state.errors.phone,
        subject: '',
        message: this.state.errors.message,
      };

      setTimeout(() => {
        this.setState({ errorType: '', errors: errors });
      }, 5000);
    }
    if (type === 'MESSAGE') {
      errors = {
        name: this.state.errors.message,
        email: this.state.errors.email,
        phone: this.state.errors.phone,
        subject: this.state.errors.subject,
        message: '',
      };

      setTimeout(() => {
        this.setState({ errorType: '', errors: errors });
      }, 5000);
    }
  }

  blankField() {
    this.setState({
      errorType: '',
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      honeypot: 'RealMadrid180380...'.trim(),
      errors: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      },
    });
  }

  onSubmitContactForm = (e) => {
    e.preventDefault();
    var errors = {};
    let regex =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (this.state.name !== '') {
      if (this.state.email !== '') {
        if (regex.test(this.state.email)) {
          if (this.state.phone !== '') {
            if (this.state.subject !== '') {
              if (this.state.message !== '') {
                this.setState({ loadForm: true });
                var body = {
                  name: this.state.name,
                  email: this.state.email,
                  phone: this.state.phone,
                  subject: this.state.subject,
                  message: this.state.message,
                  destination: 'MC',
                  'anti-honeypot': this.state.honeypot,
                };
                contactUs
                  .sendFormContactUs(body)
                  .then((res) => {
                    ////console.log(res);
                    this.setState({ loadForm: false, success: true });
                    this.blankField();
                    setTimeout(() => {
                      this.setState({ success: false });
                    }, 3000);
                  })
                  .catch((error) => {
                    ////console.log(error);
                    this.setState({ loadForm: false, error: true });
                    this.blankField();
                    setTimeout(() => {
                      this.setState({ error: false });
                    }, 3000);
                  });
              } else {
                errors = {
                  name: '',
                  email: '',
                  phone: '',
                  subject: '',
                  message: 'contact.post.error.type.message',
                };
                this.setState({
                  errorType: 'MESSAGE',
                  errors: errors,
                });
                this.blankErrors('MESSAGE');
              }
            } else {
              errors = {
                name: '',
                email: '',
                phone: '',
                subject: 'contact.post.error.type.subject',
                message: '',
              };
              this.setState({
                errorType: 'SUBJECT',
                errors: errors,
              });
              this.blankErrors('SUBJECT');
            }
          } else {
            errors = {
              name: '',
              email: '',
              phone: 'contact.post.error.type.phone',
              subject: '',
              message: '',
            };
            this.setState({
              errorType: 'PHONE',
              errors: errors,
            });
            this.blankErrors('PHONE');
          }
        } else {
          errors = {
            name: '',
            email: 'contact.post.error.type.emailInvalid',
            phone: '',
            subject: '',
            message: '',
          };
          this.setState({
            errorType: 'EMAIL',
            errors: errors,
          });
          this.blankErrors('EMAIL');
          //email invalido  emailInvalid
        }
      } else {
        errors = {
          name: '',
          email: 'contact.post.error.type.email',
          phone: '',
          subject: '',
          message: '',
        };
        this.setState({
          errorType: 'EMAIL',
          errors: errors,
        });
        this.blankErrors('EMAIL');
      }
    } else {
      errors = {
        name: 'contact.post.error.type.name',
        email: '',
        phone: '',
        subject: '',
        message: '',
      };
      this.setState({
        errorType: 'NAME',
        errors: errors,
      });
      this.blankErrors('NAME');
    }
  };

  componentDidMount() {
    this.setState({
      translator: this.props.translate,
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.language !== nextProps.language) {
      this.setState({
        translator: nextProps.translate,
      });
    }
  }

  render() {
    let errorName, errorEmail, errorPhone, errorSubject, errorMessage, message;
    let t = this.state.translator;
    if (this.state.errorType === 'NAME') {
      errorName = (
        <Label basic color='red' pointing>
          {t(this.state.errors.name)}
        </Label>
      );
    }
    if (this.state.errorType === 'EMAIL') {
      errorEmail = (
        <Label basic color='red' pointing>
          {t(this.state.errors.email)}
        </Label>
      );
    }
    if (this.state.errorType === 'PHONE') {
      errorPhone = (
        <Label basic color='red' pointing>
          {t(this.state.errors.phone)}
        </Label>
      );
    }
    if (this.state.errorType === 'SUBJECT') {
      errorSubject = (
        <Label basic color='red' pointing>
          {t(this.state.errors.subject)}
        </Label>
      );
    }
    if (this.state.errorType === 'MESSAGE') {
      errorMessage = (
        <Label basic color='red' pointing>
          {t(this.state.errors.message)}
        </Label>
      );
    }
    if (this.state.success) {
      message = (
        <div>
          <Message info content={t('contact.post.success.message')} />
          <Divider hidden />
        </div>
      );
    }
    if (this.state.error) {
      message = (
        <div>
          <Message error content={t('contact.post.error.message')} />
          <Divider hidden />
        </div>
      );
    }
    return (
      <div>
        <Divider hidden />
        <Divider hidden />
        <Grid columns='equal'>
          <Grid.Column largeScreen={2} computer={1} widescreen={2} />
          <Grid.Column largeScreen={12} computer={14} widescreen={12}>
            <Container>
              {window.sessionStorage.getItem('auth') === 'true' && (
                <Segment inverted textAlign='left' className='titleComponents'>
                  <h4 className='headerComponent'>{t('contact.header')}</h4>
                </Segment>
              )}

              {window.sessionStorage.getItem('auth') !== 'true' && (
                <Header
                  size='large'
                  content={t('login.header')}
                  textAlign='left'
                  style={{ marginTop: '3rem' }}
                >
                  {t('contact.header')}
                </Header>
              )}
              <Container>
                <Form
                  error={this.state.error !== ''}
                  success={this.state.success}
                  loading={this.state.loadForm}
                  unstackable
                  onSubmit={this.onSubmitContactForm}
                >
                  <Grid columns={2}>
                    <Grid.Column
                      largeScreen={8}
                      widescreen={8}
                      mobile={16}
                      tablet={16}
                      computer={8}
                    >
                      <Form.Field required>
                        <label>{t('contact.name')}</label>
                        <Input
                          name='name'
                          value={this.state.name}
                          readOnly={
                            window.sessionStorage.getItem('firstName') !==
                              'null' &&
                            window.sessionStorage.getItem('firstName') !==
                              null &&
                            window.sessionStorage.getItem('lastName') !==
                              'null' &&
                            window.sessionStorage.getItem('lastName') !==
                              null &&
                            (window.sessionStorage.getItem('firstName') !==
                              '' ||
                              window.sessionStorage.getItem('lastName') !== '')
                          }
                          type='text'
                          placeholder={t('contact.placeholder.name')}
                          onChange={this.handleName}
                        />
                        {errorName}
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column
                      largeScreen={8}
                      mobile={16}
                      widescreen={8}
                      tablet={16}
                      computer={8}
                    >
                      <Form.Field required>
                        <label>{t('contact.email')}</label>
                        <Input
                          name='email'
                          value={this.state.email}
                          readOnly={
                            window.sessionStorage.getItem('email') !== 'null' &&
                            window.sessionStorage.getItem('email') !== null &&
                            window.sessionStorage.getItem('email') !== ''
                          }
                          type='email'
                          placeholder={t('contact.placeholder.email')}
                          onChange={this.handleEmail}
                        />
                        {errorEmail}
                      </Form.Field>
                    </Grid.Column>
                  </Grid>
                  <Grid.Column>
                    <Divider hidden />
                  </Grid.Column>
                  <Grid columns={2}>
                    <Grid.Column
                      largeScreen={8}
                      mobile={16}
                      widescreen={8}
                      tablet={16}
                      computer={8}
                    >
                      <Form.Field required>
                        <label>{t('contact.phone')}</label>
                        <InputMask
                          {...this.props}
                          name='phone'
                          mask='+99 999 999 9999'
                          maskChar=' '
                          value={this.state.phone}
                          type='text'
                          placeholder='ej. +1 234 435 7545'
                          onChange={this.handlePhone}
                          readOnly={
                            window.sessionStorage.getItem('countryCode') !==
                              'null' &&
                            window.sessionStorage.getItem('countryCode') !==
                              null &&
                            window.sessionStorage.getItem('phone') !== 'null' &&
                            window.sessionStorage.getItem('phone') !== null
                          }
                        />
                        {errorPhone}
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column
                      largeScreen={8}
                      mobile={16}
                      tablet={16}
                      computer={8}
                      widescreen={8}
                    >
                      <Form.Field required>
                        <label>{t('contact.subject')}</label>
                        <Input
                          name='subject'
                          value={this.state.subject}
                          type='text'
                          placeholder={t('contact.placeholder.subject')}
                          onChange={this.handleSubject}
                        />
                        {errorSubject}
                      </Form.Field>
                    </Grid.Column>
                  </Grid>
                  <Grid.Column>
                    <Divider hidden />
                  </Grid.Column>
                  <Form.Field required widths={12}>
                    <label>{t('contact.placeholder.message')}</label>
                    <TextArea
                      name='message'
                      value={this.state.message}
                      placeholder={t('contact.placeholder.message')}
                      onChange={this.handleMessage}
                    />
                    {errorMessage}
                  </Form.Field>

                  <Form.Field hidden>
                    <Input name='anti-honeypot' value={this.state.honeypot} />
                  </Form.Field>
                  <Segment basic style={{ textAlign: '-webkit-center' }}>
                    {message}
                  </Segment>
                  <Header textAlign='center'>
                    <Form.Button type='submit' size='large' color='blue'>
                      {t('contact.buttonSend')}
                    </Form.Button>
                  </Header>
                  <Divider hidden />
                  <Divider hidden />
                  <Grid columns={2}>
                    <Grid.Column
                      largeScreen={8}
                      mobile={16}
                      widescreen={8}
                      tablet={16}
                      computer={8}
                    >
                      <Header as='h4' style={{ color: '#055990' }}>
                        {t('contact.header')}
                      </Header>
                      <Form.Field inline>
                        <Icon
                          name='envelope outline'
                          size='large'
                          style={{ color: '#055990' }}
                        />
                        <p className='style-text'>
                          <a href='mailto:customer_service@moneyclick.com'>
                            customer_service@moneyclick.com
                          </a>
                        </p>
                      </Form.Field>
                      <Form.Field inline>
                        <Icon
                          name='whatsapp'
                          size='large'
                          style={{ color: '#055990', verticalAlign: 'top' }}
                        />
                        <p className='style-text'>
                          <b>{t('contact.english')}</b> - 8:00 a.m. a 8:00 p.m.
                          ET
                          <br />
                          <a href='https://wa.me/15512214091' target='_blank'>
                            WhatsApp: +1 (551) 221-4091
                          </a>
                        </p>
                      </Form.Field>
                      <Form.Field inline>
                        <Icon
                          name='whatsapp'
                          size='large'
                          style={{ color: '#055990', verticalAlign: 'top' }}
                        />
                        <p className='style-text'>
                          <b>{t('contact.spanish')}</b> - 8:00 a.m. a 8:00 p.m.
                          ET
                          <br />
                          <a href='https://wa.me/12019896074' target='_blank'>
                            WhatsApp: +1 (201) 989-6074
                          </a>
                        </p>
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column
                      largeScreen={8}
                      mobile={16}
                      widescreen={8}
                      tablet={16}
                      computer={8}
                    >
                      <Header as='h4' style={{ color: '#055990' }}>
                        {' '}
                        {t('contact.technicalIssues')}
                      </Header>
                      {/* <Form.Field inline>
                        <Icon
                          name="envelope outline"
                          size="large"
                          style={{ color: "#055990" }}
                        />
                        <p className="style-text">
                          <a href="mailto:support@moneyclick.com">
                            support@moneyclick.com
                          </a>
                        </p>
                      </Form.Field> */}
                      <Form.Field inline>
                        <Icon
                          name='whatsapp'
                          size='large'
                          style={{ color: '#055990', verticalAlign: 'top' }}
                        />
                        <p className='style-text'>
                          <b>
                            {t('contact.english')} - {t('contact.spanish')}
                          </b>{' '}
                          - 8:00 a.m. a 8:00 p.m. ET
                          <br />
                          <a href='https://wa.me/19199755089' target='_blank'>
                            WhatsApp: +1 (919) 975-5089
                          </a>
                        </p>
                      </Form.Field>
                      {/* <Header as='h4' style={{ color: '#055990' }}>
                        {' '}
                        {t('contact.mainOffice')}
                      </Header> */}
                      {/* <Form.Field inline>
                        <Icon
                          name='whatsapp'
                          size='large'
                          style={{ color: '#055990' }}
                        />
                        <p className='style-text'>
                          <a href='https://wa.me/14702379398' target='_blank'>
                            +1 (470) 237-9398
                          </a>
                        </p>
                      </Form.Field> */}
                      <Form.Field inline>
                        <Icon
                          name='map marker alternate'
                          size='large'
                          inverted
                          style={{ color: '#055990' }}
                        />
                        <p
                          className='style-text'
                          style={{ verticalAlign: 'top' }}
                        >
                          888 Pleasant Hill.
                          <br />
                          Rd Suite <br /> C Liliburn, GA <br /> Zip code 30047
                        </p>
                      </Form.Field>
                    </Grid.Column>
                  </Grid>
                </Form>
              </Container>
            </Container>
          </Grid.Column>
          <Grid.Column largeScreen={2} computer={1} widescreen={2} />
        </Grid>
        <Divider hidden />
        <Divider hidden />
      </div>
    );
  }
}
export default translate(ContactUs);
