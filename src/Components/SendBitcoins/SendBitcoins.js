import { Component } from 'react';
import {
  Grid,
  Form,
  Button,
  Message,
  Input,
  Divider,
  Segment,
  Icon,
  Modal,
  Header,
  Select,
} from 'semantic-ui-react';
import React from 'react';
import CurrencyInput from 'react-currency-input';
import CurrenciesFlag from '../../common/currencyFlag';
import { isMobile } from 'react-device-detect';
import translate from '../../i18n/translate';
import otcService from '../../services/otc';
import userService from '../../services/user';
import moneyclickService from '../../services/moneyclick';
import NumberFormat from 'react-number-format';
import WAValidator from 'wallet-address-validator';
import decode from '../../services/decode';
import cryptoCurrencies from '../../common/cryptoCurrencies';
class SendBitcoins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translator: props.translate,
      address: '',
      description: '',
      visibleModalSend: false,
      sendSuccess: false,
      sendRequest: false,
      errorRequest: false,
      amount: '',
      password: '',
      commisionByOperation: 0,
      daylyLimit: 0,
      monthlyLimit: 0,
      limitByCurrency: [],
      existLimits: false,
      username: '',
      charges: [],
      availableBalanceToSend: null,
      availableBalanceToSendExternal: null,
      formLoad: true,
      balanceBTC: 0.0,
      chargesAmounts: [],
      errorOperation: false,
      missingPassword: false,
      hidden: true,
      errorMachPassword: false,
      errorSend: false,
      factor: 0,
      amountUSD: 0,
      maxSend: false,
      cryptoList: cryptoCurrencies,
      cryptoToSend: 'BTC',
      availableToSendWithCommision: 0,
      redTosend: '',
    };
    this.getCharges = this.getCharges.bind(this);
    this.getLimitsOperations = this.getLimitsOperations.bind(this);
    this.getBalanceMoneyClick = this.getBalanceMoneyClick.bind(this);
    this.setValueLimit = this.setValueLimit.bind(this);
    //this.validateForm = this.validateForm.bind(this);
    //this._ShowConfirm = this._ShowConfirm.bind(this);
    this._cancelSend = this._cancelSend.bind(this);
  }

  async componentDidMount() {
    this.setState({
      formLoad: true,
    });
    this.getFactor('BTC');
    this.getBalanceMoneyClick();
    this.getLimitsOperations();
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.language !== nextProps.language) {
      this.setState({
        translator: nextProps.translate,
      });
    }
  }
  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  floorDecimals(value, numberDecimals) {
    let decimales = Math.pow(10, numberDecimals);
    return Math.floor(value * decimales) / decimales;
  }

  async getAllChargues(crypto, amount) {
    if (
      amount !== null &&
      amount !== '' &&
      amount !== undefined &&
      amount.toString() !== 'NaN' &&
      amount > 0
    ) {
      let body = {
        currency: crypto,
        amount: amount,
        btcPrice: null,
        operationType: 'SEND_IN',
        paymentType: null,
      };
      let bodyOut = {
        currency: crypto,
        amount: amount,
        btcPrice: null,
        operationType: 'SEND_OUT',
        paymentType: null,
      };
      let arraycharges = [];
      if (this.state.cryptoToSend === 'USDT') {
        if (this.state.redTosend !== '') {
          body.paymentType =
            this.state.redTosend === 'TRON' ? 'TRON' : 'ETHEREUM';
          bodyOut.paymentType =
            this.state.redTosend === 'TRON' ? 'TRON' : 'ETHEREUM';
        }
      }
      try {
        const responseGetCharges = await otcService._getAllCharguesNewPost(
          body
        );

        const responseGetChargesExternal =
          await otcService._getAllCharguesNewPost(bodyOut);

        if (responseGetCharges.data.COMMISSION !== undefined) {
          this.setState({
            availableBalanceToSend: responseGetCharges.data.COMMISSION.amount,
          });
          arraycharges.push({
            typeOperation: 'SEND_IN',
            comission: responseGetCharges.data.COMMISSION.amount,
          });
        }

        if (responseGetChargesExternal.data.COMMISSION !== undefined) {
          this.setState({
            availableBalanceToSendExternal:
              responseGetChargesExternal.data.COMMISSION.amount,
          });
          arraycharges.push({
            typeOperation: 'SEND_OUT',
            comission: responseGetChargesExternal.data.COMMISSION.amount,
          });
        }
        this.setState({ chargesAmounts: arraycharges }, () =>
          this.setState({ formLoad: false })
        );
      } catch (error) {}
    } else {
      this.setState({
        availableBalanceToSendExternal: null,
        formLoad: false,
      });
    }
  }
  async getLimitsOperations() {
    try {
      const response = await otcService.getLimitsOfOperations();
      let arrayLimits = [];
      Object.entries(response.data).forEach(([key, value]) => {
        let limit = {
          currency: key,
        };
        Object.entries(value).forEach(([inerKey, inerValue]) => {
          if (inerKey === 'dayly' && inerValue.normal !== undefined) {
            limit.day = inerValue.normal;
          } else if (inerKey === 'monthly' && inerValue.normal !== undefined) {
            limit.month = inerValue.normal;
          }
        });
        arrayLimits.push(limit);
      });
      this.setState({ limitByCurrency: arrayLimits }, () =>
        this.setValueLimit(this.state.cryptoToSend)
      );
    } catch (error) {
      /// //console.log(error);
    }
  }
  getBalanceMoneyClick() {
    let username = window.sessionStorage.getItem('username');
    moneyclickService
      .getBalanceMoneyclick(username)
      .then((resp) => {
        Object.entries(resp.data).forEach(([key, value]) => {
          if (key !== 'usdEstimatedBalance' && key !== 'btcEstimatedBalance') {
            if (key === 'BTC' || key === 'ETH' || key === 'USDT') {
              let currency = CurrenciesFlag.currenciesFlag[key];
              currency.availableBalance =
                value.availableBalance !== undefined &&
                value.availableBalance > 0.000001
                  ? value.availableBalance
                  : 0;

              if (key === 'BTC') {
                this.getAllChargues(key, currency.availableBalance);
              }
            }
          }
        });
        this.setState({
          balances: resp.data,
        });
      })
      .catch((error) => {
        //////console.log(error);
      });
  }
  formatCurrencies(balance) {
    const formatter = new Intl.NumberFormat('en-US', {
      currency: this.state.cryptoToSend,
      minimumFractionDigits: this.state.cryptoToSend === 'USDT' ? 2 : 8,
    });
    return formatter.format(balance);
  }

  setValueLimit(currency) {
    if (this.state.limitByCurrency.length > 0) {
      let findLimitByCurrency = this.state.limitByCurrency.find((element) => {
        return element.currency === currency;
      });
      if (findLimitByCurrency !== undefined) {
        let internacional = this.state.internationalReceiver;
        let valueDay, valueMonth;
        if (findLimitByCurrency.day !== undefined) {
          Object.entries(findLimitByCurrency.day).forEach(([key, value]) => {
            if (internacional) {
              if (key === 'SEND_OUT') {
                valueDay = value;
              }
            } else {
              if (key === 'SEND_IN') {
                valueDay = value;
              }
            }
          });
        }
        if (findLimitByCurrency.month !== undefined) {
          Object.entries(findLimitByCurrency.month).forEach(([key, value]) => {
            if (internacional) {
              if (key === 'SEND_OUT') {
                valueMonth = value;
              }
            } else {
              if (key === 'SEND_IN') {
                valueMonth = value;
              }
            }
          });
        }
        if (valueDay !== undefined || valueMonth !== undefined) {
          this.setState({
            existLimits: true,
            daylyLimit: valueDay,
            monthlyLimit: valueMonth,
          });
        } else {
          this.setState({
            existLimits: false,
            daylyLimit: 0,
            monthlyLimit: 0,
          });
        }
      } else {
        this.setState({
          existLimits: false,
          daylyLimit: 0,
          monthlyLimit: 0,
        });
      }
    } else {
      this.setState({
        existLimits: false,
        daylyLimit: 0,
        monthlyLimit: 0,
      });
    }
  }

  async validateForm() {
    //console.log(this.state.cryptoToSend);
    this.setState({
      formLoad: true,
    });
    let validatef = {
      valid: true,
      error: '',
    };
    try {
      let valid = true;
      if (this.state.cryptoToSend !== 'USDT') {
        valid = WAValidator.validate(
          this.state.address,
          this.state.cryptoToSend === 'BTC' ? 'BTC' : 'ETH'
        );
      } else {
        if (!this.state.redTosend) {
          validatef.valid = false;
          validatef.error = 'missingRed';
          this.setState({
            formLoad: false,
          });
          return validatef;
        } else {
          if (this.state.redTosend === 'TRON') {
            let lower = String(this.state.address).toLowerCase();
            lower = lower.substring(0, 1);
            if (lower !== 't') {
              validatef.valid = false;
              validatef.error = 'addressFormat';
              this.setState({
                formLoad: false,
              });
              //  console.log('aquii');
              return validatef;
            }
          } else {
            valid = WAValidator.validate(this.state.address, 'ETH');
          }
        }
      }

      if (valid === true) {
        let responseGetSendOpetarionType =
          await userService.getSendOperationType(this.state.address);
        let typeOperationFind = this.state.chargesAmounts.find((item) => {
          return responseGetSendOpetarionType.data === item.typeOperation;
        });
        let totalSendAmount = +parseFloat(this.state.amount);
        let realAmountToSend =
          CurrenciesFlag.currenciesFlag[this.state.cryptoToSend]
            .availableBalance - typeOperationFind.comission;

        if (realAmountToSend < 0.00000001) {
          this.setState({
            availableToSendWithCommision:
              CurrenciesFlag.currenciesFlag[this.state.cryptoToSend]
                .availableBalance,
          });
        } else {
          this.setState({
            availableToSendWithCommision: realAmountToSend,
          });
        }
        if (this.state.amount < 0.00000001) {
          validatef.valid = false;
          validatef.error = 'amount';
          this.setState({
            formLoad: false,
          });
          return validatef;
        } else if (
          typeOperationFind.typeOperation === 'SEND_IN' &&
          totalSendAmount > this.state.availableToSendWithCommision
        ) {
          validatef.valid = false;
          validatef.error = 'amountNotCommisionExeded';
          this.setState({
            formLoad: false,
          });
          return validatef;
        } else if (
          typeOperationFind.typeOperation === 'SEND_OUT' &&
          totalSendAmount > this.state.availableToSendWithCommision
        ) {
          validatef.valid = false;
          validatef.error = 'amountCommisionExeded';
          this.setState({
            formLoad: false,
          });
          return validatef;
        } else if (this.state.address === '') {
          validatef.valid = false;
          validatef.error = 'addressReceiver';
          this.setState({
            formLoad: false,
          });
          return validatef;
        } else if (!valid) {
          validatef.valid = false;
          validatef.error = 'addressFormat';
        }
      } else {
        // console.log(this.state.cryptoToSend, this.state.address);
        if (this.state.address === '') {
          validatef.valid = false;
          validatef.error = 'addressReceiver';
          this.setState({
            formLoad: false,
          });
          return validatef;
        } else {
          validatef.valid = false;
          validatef.error = 'addressFormat';
          this.setState({
            formLoad: false,
          });
          return validatef;
        }
      }
      this.setState({
        formLoad: false,
      });
      return validatef;
    } catch (error) {
      //  console.log(error);
      this.setState({
        formLoad: false,
      });
      return validatef;
    }
  }
  async _ShowConfirm() {
    this.setState({ formLoad: true });
    let validate = await this.validateForm();
    if (validate.valid) {
      this.getCharges();
    } else if (validate.error === 'amount') {
      this.setState(
        {
          errorOperation: true,
          message: 'sendBitcoins.error.invalidAmount',
        },
        () => {
          setTimeout(() => {
            this.setState({
              errorOperation: false,
              message: '',
            });
          }, 6000);
        }
      );
    } else if (validate.error === 'amountMin') {
      this.setState(
        {
          errorOperation: true,
          message: 'sendBitcoins.error.amountMin',
        },
        () => {
          setTimeout(() => {
            this.setState({
              errorOperation: false,
              message: '',
            });
          }, 6000);
        }
      );
    } else if (validate.error === 'addressReceiver') {
      this.setState(
        {
          errorOperation: true,
          message: 'sendBitcoins.error.setAddress',
        },
        () => {
          setTimeout(() => {
            this.setState({
              errorOperation: false,
              message: '',
            });
          }, 6000);
        }
      );
    } else if (validate.error === 'addressFormat') {
      this.setState(
        {
          errorOperation: true,
          message: 'sendBitcoins.error.errorTypeAddress',
        },
        () => {
          setTimeout(() => {
            this.setState({
              errorOperation: false,
              message: '',
            });
          }, 6000);
        }
      );
    } else if (validate.error === 'amountCommisionExeded') {
      this.setState(
        {
          errorOperation: true,
          maxSend: true,
          message: 'sendBitcoins.error.errorAmountCommision',
        },
        () => {
          setTimeout(() => {
            this.setState({
              errorOperation: false,
              message: '',
            });
          }, 6000);
        }
      );
    } else if (validate.error === 'amountNotCommisionExeded') {
      this.setState(
        {
          errorOperation: true,
          message: 'sendBitcoins.error.errorAmountNotCommision',
        },
        () => {
          setTimeout(() => {
            this.setState({
              errorOperation: false,
              message: '',
            });
          }, 6000);
        }
      );
    } else if (validate.error === 'missingRed') {
      this.setState(
        {
          errorOperation: true,
          message: 'sendBitcoins.error.errorMissingRed',
        },
        () => {
          setTimeout(() => {
            this.setState({
              errorOperation: false,
              message: '',
            });
          }, 6000);
        }
      );
    }
  }

  _cancelSend() {
    this.setState({ visibleModalSend: false, password: '' });
  }

  handleDescription(e, description) {
    this.setState({
      description: description.value,
    });
  }

  handleAddress(e, data) {
    this.setState({
      address: String(data.value).trim(),
    });
  }

  async getCharges() {
    this.setState({
      formLoad: true,
    });
    try {
      let responseGetSendOpetarionType = await userService.getSendOperationType(
        this.state.address
      );

      let body = {
        currency: this.state.cryptoToSend,
        amount: this.state.amount,
        btcPrice: null,
        operationType: responseGetSendOpetarionType.data,
        paymentType: null,
      };
      if (this.state.cryptoToSend === 'USDT') {
        if (this.state.redTosend !== '') {
          body.paymentType =
            this.state.redTosend === 'TRON' ? 'TRON' : 'ETHEREUM';
        }
      }

      try {
        if (
          body.amount !== '' &&
          body.amount !== null &&
          body.amount !== undefined &&
          body.amount.toString() !== 'NaN' &&
          body.amount > 0
        ) {
          let responseGetCharges = await otcService._getAllCharguesNewPost(
            body
          );

          this.setState(
            {
              formLoad: false,
            },
            () =>
              this.setState({
                visibleModalSend: true,
              })
          );
          if (responseGetCharges.data.COMMISSION !== undefined) {
            this.setState({
              commisionByOperation: responseGetCharges.data.COMMISSION.amount,
            });
          }
        } else {
          this.setState(
            {
              errorOperation: true,
              message: 'sendBitcoins.error.invalidAmount',
            },
            () => {
              setTimeout(() => {
                this.setState({
                  errorOperation: false,
                  message: '',
                });
              }, 6000);
            }
          );
        }
      } catch (errorCharges) {
        this.setState(
          {
            formLoad: false,
          },
          () =>
            this.setState({
              visibleModalSend: true,
            })
        );
      }
    } catch (error) {
      //  console.log(error);
      this.setState({
        formLoad: false,
      });
    }
  }

  handleAmount(e, data) {
    let amountNumber = e.target.value;

    if (
      e.target.value <=
      CurrenciesFlag.currenciesFlag[this.state.cryptoToSend].availableBalance
    ) {
      let changeFactor = 0;
      changeFactor = e.target.value * this.state.factor;
      this.setState({
        amountUSD: changeFactor,
      });
      let toString = amountNumber.toString();
      if (toString.indexOf('e') === -1) {
        this.setState({ amount: amountNumber });
      } else {
        this.setState({ amount: 0.0 });
      }
    } else {
      this.setState(
        {
          errorOperation: true,
          message: 'sendBitcoins.error.errorAmountNotCommision',
        },
        () => {
          setTimeout(() => {
            this.setState({
              errorOperation: false,
              message: '',
            });
          }, 6000);
        }
      );
    }
  }

  handleCancel() {
    this.setState({
      amount: '',
      address: '',
      description: '',
      maxSend: false,
    });
  }

  closeModalConfirmation() {
    this.setState({ visibleModalSend: false });
    this.cleanFields();
  }

  cleanFields() {
    this.setState({
      amount: '',
      description: '',
      address: '',
      password: '',
      sendSuccess: false,
      errorSend: false,
      maxSend: false,
      sendRequest: false,
    });
  }
  async sendBitcoins() {
    if (this.state.password !== '') {
      let token = window.sessionStorage.getItem('pass');
      let pass = decode.decode(token);
      let passEnd = decode
        .decode(pass.split('##')[0])
        .replace(/[\u0000-\u0019]+/g, '');
      if (passEnd === this.state.password) {
        this.setState({
          formLoad: true,
          sendRequest: true,
        });
        let body = {
          userName: userService.getUserName(),
          balanceOperationType: 'SEND',
          address: '',
          privateKey: '',
          targetAddress: this.state.address,
          additionalInfo: this.state.description,
        };
        if (this.state.cryptoToSend === 'BTC') {
          body.amounts = {
            BTC: this.state.amount,
          };
        } else if (this.state.cryptoToSend === 'ETH') {
          body.amounts = {
            ETH: this.state.amount,
          };
        } else {
          body.amounts = {
            USDT: this.state.amount,
          };
          body.paymentType =
            this.state.redTosend === 'TRON' ? 'TRON' : 'ETHEREUM';
        }
        console.log(body);
        try {
          const response = await moneyclickService.sendBitcoins(body);
          if (response.data.result === 'OK') {
            this.setState({
              sendSuccess: true,
              formLoad: false,
              password: '',
              amountUSD: 0,
            });
            this.getBalanceMoneyClick();
          } else {
            this.setState({
              formLoad: false,
              sendSuccess: false,
              errorSend: true,
              message: 'sendBitcoins.error.errorOperation',
            });
            setTimeout(() => {
              this.setState({
                errorSend: false,
                message: '',
              });
            }, 4000);
          }
        } catch (error) {
          this.setState({
            errorSend: true,
            message: 'sendBitcoins.error.errorOperation',
            formLoad: false,
            sendSuccess: false,
          });
          setTimeout(() => {
            this.setState({
              errorSend: false,
              message: '',
            });
          }, 4000);
          console.log(error);
        }
      } else {
        this.setState({
          errorMachPassword: true,
          message: 'sendBitcoins.error.errorMachPassword',
          formLoad: false,
          sendSuccess: false,
        });
        setTimeout(() => {
          this.setState({
            errorMachPassword: false,
            message: '',
          });
        }, 4000);
      }
    } else {
      this.setState({
        missingPassword: true,
      });
      setTimeout(() => {
        this.setState({ missingPassword: false });
      }, 5000);
    }
  }
  async getFactor(crypto) {
    try {
      let responseFactor;
      responseFactor = await userService.getCryptoPrice('USD', crypto);
      if (responseFactor.data.ask !== undefined) {
        this.setState({
          factor: responseFactor.data.ask,
        });
      }
    } catch (error) {
      // console.log(error);
    }
  }
  render() {
    let t = this.state.translator;
    let messageError, errorPassword;
    if (this.state.errorOperation) {
      messageError = t(this.state.message);
    }
    if (this.state.errorMachPassword) {
      errorPassword = <Message negative>{t(this.state.message)}</Message>;
    }
    return (
      <Segment loading={this.state.formLoad} basic={true}>
        <Divider hidden />
        <Grid columns={3}>
          <Grid.Column
            largeScreen={2}
            mobile={1}
            tablet={1}
            computer={2}
            widescreen={2}
          />
          <Grid.Column
            largeScreen={12}
            computer={14}
            widescreen={12}
            mobile={14}
            tablet={14}
          >
            <Segment inverted textAlign='left' className='titleComponents'>
              <h4 className='headerComponent'>{t('sendBitcoins.header')}</h4>
            </Segment>
            <Divider hidden></Divider>
            <Form error>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column
                    largeScreen={8}
                    widescreen={8}
                    mobile={16}
                    tablet={8}
                    computer={8}
                  >
                    <Form.Field inline required>
                      <label>{t('profile.walletAccount.cryptoToSend')}</label>
                      <Select
                        placeholder={t('profile.walletAccount.cryptoToSend')}
                        fluid
                        single
                        selection
                        options={this.state.cryptoList}
                        value={this.state.cryptoToSend}
                        onChange={(e, data) => {
                          this.getFactor(data.value);
                          this.getAllChargues(
                            data.value,
                            CurrenciesFlag.currenciesFlag[data.value]
                              .availableBalance
                          );
                          this.setState({
                            address: '',
                            description: '',
                            amount: '',
                            amountUSD: 0,
                            cryptoToSend: data.value,
                          });
                        }}
                      />
                    </Form.Field>
                  </Grid.Column>
                  {this.state.cryptoToSend === 'USDT' && (
                    <Grid.Column
                      largeScreen={8}
                      widescreen={8}
                      mobile={16}
                      tablet={8}
                      computer={8}
                    >
                      <Form.Field inline required>
                        <label>{t('sendBitcoins.redLabel')}</label>
                        <Select
                          placeholder={t('sendBitcoins.red')}
                          fluid
                          single
                          selection
                          options={[
                            { text: 'ERC-20', value: 'ERC-20' },
                            { text: 'TRC-20(TRON)', value: 'TRON' },
                          ]}
                          value={this.state.redTosend}
                          onChange={(e, data) => {
                            this.setState(
                              {
                                redTosend: data.value,
                              },
                              () =>
                                this.getAllChargues(
                                  this.state.cryptoToSend,
                                  CurrenciesFlag.currenciesFlag[
                                    this.state.cryptoToSend
                                  ].availableBalance
                                )
                            );
                          }}
                        />
                      </Form.Field>
                    </Grid.Column>
                  )}
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column
                    largeScreen={8}
                    widescreen={8}
                    mobile={16}
                    tablet={8}
                    computer={8}
                  >
                    <Form.Input
                      fluid
                      label={t('sendBitcoins.address')}
                      placeholder={t('sendBitcoins.address')}
                      value={this.state.address}
                      maxLength={45}
                      onChange={this.handleAddress.bind(this)}
                    />
                  </Grid.Column>
                  <Grid.Column
                    largeScreen={8}
                    widescreen={8}
                    mobile={16}
                    tablet={8}
                    computer={8}
                  >
                    <Form.Field>
                      <label>{t('sendBitcoins.amount')}</label>
                      <CurrencyInput
                        value={this.state.amount}
                        placeholder={t('sendBitcoins.amount')}
                        name='send'
                        onChangeEvent={this.handleAmount.bind(this)}
                        precision={
                          this.state.cryptoToSend !== 'BTC' &&
                          this.state.cryptoToSend !== 'ETH'
                            ? 2
                            : 8
                        }
                      />
                    </Form.Field>
                    {this.state.amountUSD > 0 && (
                      <span className='amountChangeFactor'>
                        <b>
                          {this.props.translate('sendMoneyClick.equivalentUSD')}
                        </b>
                        <NumberFormat
                          value={this.state.amountUSD}
                          decimalScale={2}
                          displayType={'text'}
                          thousandSeparator={true}
                        />
                        {' $'}
                      </span>
                    )}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column
                    largeScreen={16}
                    mobile={16}
                    tablet={16}
                    computer={16}
                  >
                    <Form.Input
                      fluid
                      label={t('sendBitcoins.description')}
                      placeholder={t('sendBitcoins.description')}
                      id='form-input-description'
                      value={this.state.description}
                      onChange={this.handleDescription.bind(this)}
                      name='description'
                      maxLength={50}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              {this.state.errorOperation && (
                <Grid columns={3}>
                  <Grid.Column
                    largeScreen={2}
                    mobile={1}
                    tablet={1}
                    computer={2}
                  />
                  <Grid.Column
                    largeScreen={12}
                    mobile={14}
                    tablet={14}
                    computer={14}
                  >
                    <div style={{ paddingBottom: 10, textAlign: 'center' }}>
                      <label style={{ color: 'red' }}>{messageError}</label>
                    </div>
                  </Grid.Column>
                  <Grid.Column
                    largeScreen={1}
                    mobile={1}
                    tablet={1}
                    computer={1}
                  />
                </Grid>
              )}
              <Divider hidden />
              <Grid.Row>
                <Grid.Column width={5}></Grid.Column>
                <Grid.Column width={6}>
                  <div align='center'>
                    <Form.Field style={{ marginLeft: '15px' }}>
                      <span className='textFastChange'>
                        <strong>{t('sendBitcoins.balanceAvailable')}</strong>
                        {': '}
                        <NumberFormat
                          decimalScale={
                            this.state.cryptoToSend === 'USDT' ? 2 : 8
                          }
                          value={
                            CurrenciesFlag.currenciesFlag[
                              this.state.cryptoToSend
                            ].availableBalance
                          }
                          displayType={'text'}
                          thousandSeparator={true}
                        />
                        {' ' + this.state.cryptoToSend}
                      </span>
                      <br />
                      {this.state.maxSend && (
                        <span className='textFastChange'>
                          <strong>{t('sendBitcoins.maxSend')}</strong>
                          <a
                            onClick={() => {
                              this.setState({
                                amount: this.state.availableToSendWithCommision,
                              });
                            }}
                          >
                            <NumberFormat
                              decimalScale={
                                this.state.cryptoToSend === 'USDT' ? 2 : 8
                              }
                              value={this.state.availableToSendWithCommision}
                              displayType={'text'}
                              thousandSeparator={true}
                            />
                          </a>
                          {' ' + this.state.cryptoToSend}
                        </span>
                      )}
                      <br />
                      {this.state.availableBalanceToSend !== null &&
                        this.state.availableBalanceToSendExternal !== null && (
                          <h4 className='textFastChange'>
                            {t('sendBitcoins.commission')}
                          </h4>
                        )}
                      {this.state.availableBalanceToSend !== null && (
                        <span className='textFastChange'>
                          <strong>
                            {t('sendBitcoins.commissionInternal')}
                          </strong>
                          {': '}
                          <NumberFormat
                            decimalScale={
                              this.state.cryptoToSend === 'USDT' ? 2 : 8
                            }
                            value={this.state.availableBalanceToSend}
                            displayType={'text'}
                            thousandSeparator={true}
                          />
                          {' ' + this.state.cryptoToSend}
                        </span>
                      )}
                      <br></br>
                      {this.state.availableBalanceToSendExternal !== null && (
                        <span className='textFastChange'>
                          <strong>
                            {t('sendBitcoins.commissionExternal')}
                          </strong>
                          {': '}
                          <NumberFormat
                            decimalScale={
                              this.state.cryptoToSend === 'USDT' ? 2 : 8
                            }
                            value={this.state.availableBalanceToSendExternal}
                            displayType={'text'}
                            thousandSeparator={true}
                          />
                          {' ' + this.state.cryptoToSend}
                        </span>
                      )}
                    </Form.Field>
                  </div>
                </Grid.Column>
                <Grid.Column width={5}></Grid.Column>
              </Grid.Row>
              <Divider hidden />

              <Divider hidden />
              <Grid columns={16}>
                <Grid.Column
                  largeScreen={4}
                  mobile={null}
                  tablet={4}
                  computer={4}
                ></Grid.Column>
                <Grid.Column largeScreen={3} mobile={7} tablet={3} computer={3}>
                  <Button
                    secondary
                    onClick={this.handleCancel.bind(this)}
                    style={isMobile ? { width: 80 } : { width: 150 }}
                  >
                    {t('withdraw.modal.buttons.cancel')}
                  </Button>
                </Grid.Column>
                <Grid.Column
                  largeScreen={2}
                  mobile={1}
                  tablet={2}
                  computer={2}
                ></Grid.Column>
                <Grid.Column largeScreen={3} mobile={7} tablet={3} computer={3}>
                  <Button
                    type='submit'
                    color='blue'
                    disabled={
                      this.state.address == '' || this.state.amount === ''
                    }
                    style={isMobile ? { width: 80 } : { width: 150 }}
                    onClick={this._ShowConfirm.bind(this)}
                  >
                    {t('withdraw.modal.buttons.send')}
                  </Button>
                </Grid.Column>
                <Grid.Column
                  largeScreen={4}
                  mobile={null}
                  tablet={4}
                  computer={4}
                ></Grid.Column>
              </Grid>
            </Form>
          </Grid.Column>
          <Grid.Column
            largeScreen={2}
            mobile={1}
            tablet={1}
            computer={2}
            widescreen={2}
          />
        </Grid>
        <Modal
          open={this.state.visibleModalSend}
          onClose={() => this.closeModalConfirmation()}
          //size="tiny"
        >
          <Header content={t('sendBitcoins.modal.header')} textAlign='center' />
          <Modal.Content>
            <Form widths='equal' loading={this.state.formLoad}>
              <Form.Group inline>
                <Form.Field>
                  <label>{t('sendBitcoins.modal.amountSend')}</label>
                  <NumberFormat
                    value={this.state.amount}
                    displayType={'text'}
                    thousandSeparator={true}
                    decimalScale={8}
                  />
                  <span> {this.state.cryptoToSend}</span>
                </Form.Field>
                <Form.Field>
                  <label>{t('sendBitcoins.modal.addressReceiver')}</label>
                  <span>{this.state.address}</span>
                </Form.Field>
              </Form.Group>
              <Form.Group inline>
                {this.state.amountUSD > 0 && (
                  <Form.Field>
                    <label>
                      {this.props.translate('sendMoneyClick.equivalentUSD')}
                    </label>
                    <NumberFormat
                      value={this.state.amountUSD}
                      decimalScale={2}
                      displayType={'text'}
                      thousandSeparator={true}
                    />
                    {' $'}
                  </Form.Field>
                )}
                {this.state.description !== '' && (
                  <Form.Field>
                    <label>{t('sendBitcoins.modal.description')}</label>
                    <span>{this.state.description}</span>
                  </Form.Field>
                )}
              </Form.Group>
              {this.state.commisionByOperation !== 0 && (
                <Form.Field>
                  <label>{t('sendBitcoins.modal.commission')}</label>
                  <span>
                    <NumberFormat
                      value={this.state.commisionByOperation}
                      decimalScale={this.state.cryptoToSend === 'USDT' ? 2 : 8}
                      displayType={'text'}
                      thousandSeparator={true}
                      renderText={(value) => {
                        return (
                          <span>{value + ' ' + this.state.cryptoToSend}</span>
                        );
                      }}
                    />
                  </span>
                </Form.Field>
              )}
            </Form>
            <Divider hidden />
            {!this.state.sendRequest && (
              <Grid>
                <Grid.Column
                  largeScreen={8}
                  computer={8}
                  widescreen={8}
                  mobile={16}
                  verticalAlign={'middle'}
                >
                  <label>{t('sendBitcoins.modal.password')}</label>
                </Grid.Column>
                <Grid.Column
                  largeScreen={8}
                  computer={8}
                  widescreen={8}
                  mobile={16}
                >
                  <Input
                    value={this.state.password}
                    onChange={(e) => {
                      this.setState({ password: e.target.value });
                    }}
                    icon={
                      this.state.hidden ? (
                        <Icon
                          name='eye slash'
                          circular
                          link
                          onClick={this.toggleShow.bind(this)}
                        />
                      ) : (
                        <Icon
                          name='eye'
                          circular
                          link
                          onClick={this.toggleShow.bind(this)}
                        />
                      )
                    }
                    type={this.state.hidden ? 'password' : 'text'}
                  />
                  {this.state.missingPassword && (
                    <div style={{ paddingTop: 5 }}>
                      <label style={{ color: 'red' }}>
                        {t('sendBitcoins.error.errorIsRequired')}
                      </label>
                    </div>
                  )}
                </Grid.Column>
              </Grid>
            )}
            {errorPassword}
            <Divider hidden />
            {this.state.sendSuccess && (
              <Grid.Row>
                <Grid.Column
                  largeScreen={16}
                  computer={16}
                  widescreen={16}
                  mobile={16}
                  textAlign={'center'}
                >
                  <Message positive>
                    {t('sendBitcoins.modal.operationSuccess')}
                  </Message>
                </Grid.Column>
              </Grid.Row>
            )}
            {this.state.errorSend && (
              <Grid.Row>
                <Grid.Column
                  largeScreen={16}
                  computer={16}
                  widescreen={16}
                  mobile={16}
                  textAlign={'center'}
                >
                  <Message negative>{t(this.state.message)}</Message>
                </Grid.Column>
              </Grid.Row>
            )}
          </Modal.Content>

          <Modal.Actions className='actions-modal'>
            {!this.state.sendRequest && (
              <div>
                <Button secondary onClick={() => this._cancelSend()}>
                  {t('fastChange.modal.cancel')}
                </Button>

                <Button
                  disabled={this.state.amount < 0}
                  floated='center'
                  onClick={this.sendBitcoins.bind(this)}
                >
                  {t('fastChange.modal.accept')}
                </Button>
              </div>
            )}
            {this.state.sendRequest && (
              <Button
                secondary
                floated='right'
                style={{ marginLeft: 40 }}
                onClick={() => this.closeModalConfirmation()}
              >
                {t('fastChange.modal.close')}
              </Button>
            )}

            <Divider hidden></Divider>
          </Modal.Actions>
        </Modal>
      </Segment>
    );
  }
}
export default translate(SendBitcoins);
