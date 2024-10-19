import { Component } from 'react';
import {
  Grid,
  Form,
  Button,
  Message,
  Input,
  Divider,
  Segment,
  Dropdown,
  Label,
  Icon,
} from 'semantic-ui-react';
import React from 'react';
import './SendMoneyClick..css';
import CurrencyInput from 'react-currency-input';
import CurrenciesFlag from '../../common/currencyFlag';
import countries from '../../common/prefits';
import mcIcon from '../../img/splash_mc.jpg';
import { isMobile } from 'react-device-detect';
import translate from '../../i18n/translate';
import otcService from '../../services/otc';
import userService from '../../services/user';
import moneyclickService from '../../services/moneyclick';
import NumberFormat from 'react-number-format';
import DinamicForm from '../DinamicForm/DinamicForm';
import SendMoneyClickConfirmationModal from './SendMoneyClickConfirmationModal';
import ModalUserFrequents from './ModalUserFrequents';
import prefits from '../../common/prefits';
class SendMoneyClick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountToTranfer: '',
      receiverName: '',
      phone: '',
      description: '',
      regCode: 'US',
      currencySelected: '',
      currencies: [],
      symbolCurrencySelected: this.validateInit(), //this.props.navigation.getParam("balanceSelected"),
      errorAmountToTransfer: false,
      errorPhone: false,
      errorReceiverName: false,
      errorDescription: false,
      visibleModalSend: false,
      sendSucess: false,
      errorRequest: false,
      nroReferencia: '',
      existPhoneInListFrequent: false,
      hasFrequents: false,
      userFrequents: [],
      isUserRegistered: false,
      interactionsComplete: false,
      amountByCurrencyAfterSend: 0,
      sendMessageSuccess: false,
      sendMessageFail: false,
      amount: '',
      balanceSelected: this.validateInit(), //this.props.navigation.getParam("balanceSelected"),
      isRegisterUser: false,
      userNameReceiverRegister: '',
      firstNameReceiverRegister: '',
      currencyBaseSelectedImg: {},
      internationalReceiver: false,
      countries: [],
      password: '',
      commisionByOperarion: 0,
      isScanQR: false,
      daylyLimit: 0,
      monthlyLimit: 0,
      limitByCurrency: [],
      existLimits: false,
      countryCode: '',
      username: '',
      availableSend: true,
      viewModalErrorConexcion: false,
      errorConexionNotAction: false,
      charges: [],
      availableBalanceToSend: '',
      availableBalanceToSendInternacional: '',
      prefit: prefits.country,
      formLoad: true,
      openModalFrequents: false,
      factor: 0,
      amountUSD: 0,
    };
    this.timer = null;
    this.isInternationalReceiver = this.isInternationalReceiver.bind(this);
    this.getCharges = this.getCharges.bind(this);
    this.getLimitsOperations = this.getLimitsOperations.bind(this);
    this.getAllCountries = this.getAllCountries.bind(this);
    this.handler = this.handler.bind(this);
    this.isUserRegistered = this.isUserRegistered.bind(this);
    this.getBalanceMoneyClick = this.getBalanceMoneyClick.bind(this);
    this.setValueLimit = this.setValueLimit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this._ShowConfirm = this._ShowConfirm.bind(this);
    this._cancelSend = this._cancelSend.bind(this);
    this.setHasFrequent = this.setHasFrequent.bind(this);
    this.onSelectCountry = this.onSelectCountry.bind(this);
  }

  validateInit() {
    return CurrenciesFlag.currenciesFlag.USD;
  }
  async componentDidMount() {
    this.getAllCountries();

    this.setState({
      formLoad: true,
      interactionsComplete: true,
      currencySelected: this.state.balanceSelected.value,
      amountByCurrencyAfterSend: this.state.balanceSelected.availableBalance,
      currencyBaseSelectedImg:
        CurrenciesFlag.currenciesFlag[this.state.balanceSelected.value],
    });

    this.getBalanceMoneyClick();
    this.getUserFrequents();
    //this.getLimitsOperations();
  }

  getUserFrequents() {
    let arrayUser = window.sessionStorage.getItem('usersFrequents');
    let userFrequents = [];
    if (arrayUser !== null && arrayUser !== 'null') {
      userFrequents = JSON.parse(arrayUser);
    }
    this.setState(
      {
        hasFrequents: userFrequents.length > 0 ? true : false,
      },
      async () => {
        let validUser = [];
        for (let user of userFrequents) {
          if (user.phone !== '') {
            validUser.push(user);
          }
        }
        if (this.state.hasFrequents) {
          this.setState({
            userFrequents: validUser,
          });
        }
        let validSend = JSON.stringify(validUser);
        window.sessionStorage.setItem('usersFrequents', validSend);
      }
    );
  }

  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery });

  floorDecimals(value, numberDecimals) {
    let decimales = Math.pow(10, numberDecimals);
    return Math.floor(value * decimales) / decimales;
  }

  onChangeCurrency(e, currency) {
    this.getFactor(currency.value);
    this.setState(
      {
        formLoad: true,
        currencySelected: currency.value,
        createPayment: false,
        amount: '',
        amountUSD: 0,
      },
      () => {
        this.setState({
          availableBalanceCurrency: this.getBalanceFromCurrencySelected(
            currency.value
          ),
          formLoad: false,
        });
      }
    );
  }

  async getAllChargues(amount) {
    let body = {
      currency: this.state.currencyBaseSelected,
      amount: amount,
      btcPrice: null,
      operationType: 'MC_SEND_SMS_INTERNATIONAL',
      paymentType: null,
    };
    let bodyNational = {
      currency: this.state.currencyBaseSelected,
      amount: amount,
      btcPrice: null,
      operationType: 'MC_SEND_SMS_NATIONAL',
      paymentType: null,
    };
    try {
      if (
        amount !== null &&
        amount !== undefined &&
        amount !== '' &&
        amount.toString() !== 'NaN' &&
        amount > 0
      ) {
        const responseGetCharges = await otcService._getAllCharguesNewPost(body);
        const responseGetChargesNational = await otcService._getAllCharguesNewPost(
          bodyNational
        );
        if (
          responseGetCharges.data.COMMISSION !== undefined &&
          responseGetChargesNational.data.COMMISSION !== undefined
        ) {
          this.setState(
            {
              availableBalanceToSendInternacional:
                amount - responseGetCharges.data.COMMISSION.amount,
              availableBalanceToSend:
                amount - responseGetChargesNational.data.COMMISSION.amount,
            },
            () => {
              if (this.state.internationalReceiver === true) {
                this.setState({
                  amountByCurrencyAfterSend: this.state
                    .availableBalanceToSendInternacional,
                });
              } else {
                this.setState({
                  amountByCurrencyAfterSend: this.state.availableBalanceToSend,
                });
              }
            }
          );
        } else {
          this.setState(
            {
              availableBalanceToSendInternacional: amount,
              availableBalanceToSend: amount,
            },
            () => {
              if (this.state.internationalReceiver === true) {
                this.setState({
                  amountByCurrencyAfterSend: this.state
                    .availableBalanceToSendInternacional,
                });
              } else {
                this.setState({
                  amountByCurrencyAfterSend: this.state.availableBalanceToSend,
                });
              }
            }
          );
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
    } catch (error) {
      this.setState(
        {
          availableBalanceToSend: amount,
          availableBalanceToSendInternacional: amount,
        },
        () => {
          if (this.state.internationalReceiver === true) {
            this.setState({
              amountByCurrencyAfterSend: this.state
                .availableBalanceToSendInternacional,
            });
          } else {
            this.setState({
              amountByCurrencyAfterSend: this.state.availableBalanceToSend,
            });
          }
        }
      );
    }
  }
  async getLimitsOperations() {
    try {
      const response = await otcService._getLimitsOperations();
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
        this.setValueLimit(this.state.balanceSelected.value)
      );
    } catch (error) {
      /// //console.log(error);
    }
  }
  async getAllCountries() {
    let country = sessionStorage.getItem('countryCodePreferred');
    this.setState(
      {
        countryCode: country !== 'null' && country !== null ? country : '58',
      },
      () => this.isInternationalReceiver()
    );
    let countr = countries.country;
    this.setState({
      countries: countr,
    });
  }

  handler(dims) {
    if (dims.window.width > this.state.dim) {
      this.setState({ dim: dims.window.width, changue: true });
    } else {
      this.setState({ dim: dims.window.width, changue: false });
    }
  }
  async isUserRegistered(username) {
    try {
      const response = await userService.getAllUser();
      let array = response.data.result.users.filter((user) => {
        return user.name === username;
      });
      if (array.length > 0) {
        //	//console.log('user found ',array[0]);
      } else {
        //	//console.log('user not found');
      }
      return array.length > 0;
    } catch (error) {
      ////console.log(error);
      return false;
    }
  }

  async isInternationalReceiver() {
    let receiverCountryCode = this.state.countryCode;
    let senderCountryCode = window.sessionStorage.getItem('countryCode');
    let internationalReceiver = receiverCountryCode !== senderCountryCode;
    if (internationalReceiver) {
      if (this.state.amount > 0) {
        this.setState({
          amountByCurrencyAfterSend:
            this.state.availableBalanceToSendInternacional - this.state.amount,
        });
      } else {
        this.setState({
          amountByCurrencyAfterSend: this.state
            .availableBalanceToSendInternacional,
        });
      }
    } else {
      if (this.state.amount > 0) {
        this.setState({
          amountByCurrencyAfterSend:
            this.state.availableBalanceToSend - this.state.amount,
        });
      } else {
        this.setState({
          amountByCurrencyAfterSend: this.state.availableBalanceToSend,
        });
      }
    }
    this.getCharges(internationalReceiver);
    this.setState({ internationalReceiver });
  }

  getBalanceMoneyClick() {
    let username = window.sessionStorage.getItem('username');
    moneyclickService
      .getBalanceMoneyclick(username)
      .then((resp) => {
        this.setState(
          {
            balances: resp.data,
          },
          () => {
            this.loadCurrencies();
          }
        );
      })
      .catch((error) => {
        //////console.log(error);
      });
  }
  formatCurrencies(currency, balance) {
    // const formatter = new Intl.NumberFormat('en-US', {
    //   currency: currency,
    //   maximumFractionDigits: currency === 'BTC' || currency === 'ETH' ? 8 : 2,
    // });
    return this.floorDecimals(
      balance,
      currency === 'BTC' || currency === 'ETH' ? 8 : 2
    ).toLocaleString('en-US', {
      maximumFractionDigits: currency === 'BTC' || currency === 'ETH' ? 8 : 2,
    });
  }
  loadCurrencies() {
    let currenciesSelect = [];
    let currencyWasSelected = false;
    try {
      let responseCurrencies = otcService.getCurrencies();
      responseCurrencies.then((currencies) => {
        currencies.data.map((currency) => {
          if (currency.active && currency.shortName !== "BTC" && currency.shortName !== "ETH" && currency.shortName !== "USDT") {
            let item = {};
            const balance =
              this.state.balances[currency.shortName] !== undefined &&
              this.state.balances[currency.shortName].availableBalance !==
                undefined
                ? this.state.balances[currency.shortName].availableBalance
                : 0;

            item.text =
              currency.fullName +
              (balance > 0
                ? this.props.translate('withdraw.labels.availableBalance') +
                  this.formatCurrencies(currency.shortName, balance)
                : '');
            item.value = currency.shortName;
            item.key = currency.shortName;
            item.availableBalance = balance;
            if (balance > 0 && !currencyWasSelected) {
              currencyWasSelected = true;
              this.setState({
                symbolCurrencySelected: currency,
                currencySelected: currency.shortName,
                availableBalanceCurrency: balance,
              });
            }
            currenciesSelect.push(item);
          }
          return currency;
        });

        //   if (this.state.balances["BTC"] !== undefined) {
        //     let itemBTC = {};
        //     let balanceAvailableBtc = this.state.balances["BTC"].availableBalance;
        //     itemBTC.text =
        //       "BITCOIN" +
        //       (balanceAvailableBtc > 0
        //         ? this.props.translate("withdraw.labels.availableBalance") +
        //           this.formatCurrencies("BTC",balanceAvailableBtc)
        //         : "");
        // itemBTC.key = "BTC";
        // itemBTC.value="BTC"
        // itemBTC.availableBalance = balanceAvailableBtc;
        // currenciesSelect.push(itemBTC);
        //   }

        currenciesSelect = currenciesSelect.sort((a, b) => {
          return a.priority - b.priority;
        });

        this.setState({
          currencies: currenciesSelect,
          formLoad: false,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  getBalanceFromCurrencySelected(currencySelected) {
    let balance = 0;
    let currencyArray = this.state.currencies.filter(function (currency) {
      return currency.value === currencySelected;
    });
    if (currencyArray.length > 0) {
      balance = currencyArray[0].availableBalance;
    }
    return balance;
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
              if (key === 'MC_SEND_SMS_INTERNATIONAL') {
                valueDay = value;
              }
            } else {
              if (key === 'MC_SEND_SMS_NATIONAL') {
                valueDay = value;
              }
            }
          });
        }
        if (findLimitByCurrency.month !== undefined) {
          Object.entries(findLimitByCurrency.month).forEach(([key, value]) => {
            if (internacional) {
              if (key === 'MC_SEND_SMS_INTERNATIONAL') {
                valueMonth = value;
              }
            } else {
              if (key === 'MC_SEND_SMS_NATIONAL') {
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
    //console.log(this.state.amount, this.state.availableBalanceCurrency);
    if (this.state.phone.startsWith('0')) {
      this.setState(
        {
          errorPhone: true,
          messageError: this.props.translate(
            'sendMoneyClick.errorReceiverPhoneMask'
          ),
        },
        () => {
          setTimeout(() => {
            this.setState({
              errorPhone: false,
              messageError: '',
            });
          }, 4000);
        }
      );
      return false;
    } else if (this.state.phone === '') {
      this.setState(
        {
          errorPhone: true,
          messageError: this.props.translate('sendMoneyClick.errorPhone'),
        },
        () => {
          setTimeout(() => {
            this.setState({
              errorPhone: false,
              messageError: '',
            });
          }, 4000);
        }
      );
      return false;
    } else if (this.state.receiverName.trim() === '') {
      this.setState(
        {
          errorReceiverName: true,
          messageError: this.props.translate(
            'sendMoneyClick.errorReceiverName'
          ),
        },
        () => {
          setTimeout(() => {
            this.setState({
              errorReceiverName: false,
              messageError: '',
            });
          }, 4000);
        }
      );
      return false;
    } else if (
      (this.state.amount < 1 || this.state.amount === '') &&
      this.state.currencySelected !== 'BTC'
    ) {
      this.setState(
        {
          errorAmountToTransfer: true,
          messageError: this.props.translate('sendMoneyClick.errorAmount'),
        },
        () => {
          setTimeout(() => {
            this.setState({
              errorAmountToTransfer: false,
              messageError: '',
            });
          }, 4000);
        }
      );
      return false;
    } else if (
      (this.state.amount < 0.00001 || this.state.amount === '') &&
      this.state.currencySelected === 'BTC'
    ) {
      this.setState(
        {
          errorAmountToTransfer: true,
          messageError: this.props.translate('sendMoneyClick.errorAmount'),
        },
        () => {
          setTimeout(() => {
            this.setState({
              errorAmountToTransfer: false,
              messageError: '',
            });
          }, 4000);
        }
      );
      return false;
    } else if (this.state.amount > this.state.availableBalanceCurrency) {
      this.setState(
        {
          errorAmountToTransfer: true,
          messageError: this.props.translate('sendMoneyClick.amountInvalid'),
        },
        () => {
          setTimeout(() => {
            this.setState({
              errorAmountToTransfer: false,
              messageError: '',
            });
          }, 4000);
        }
      );
      return false;
    } else if (this.state.countryCode === '') {
      this.setState({
        errorAmountToTransfer: true,
        messageError: this.props.translate('sendMoneyClick.errorCountry'),
      });
      setTimeout(() => {
        this.setState({
          errorAmountToTransfer: false,
          messageError: '',
        });
      }, 7000);
    } else {
      return true;
    }
  }

  async _ShowConfirm() {
    this.setState({ formLoad: true });
    let valid = await this.validateForm();
    if (valid) {
      this.isInternationalReceiver();
      this.setState({
        existPhoneInListFrequent:
          this.state.userFrequents.filter(
            (user) => user.phone === this.state.phone
          ).length > 0,
      });
      try {
        const respGetUserByPhone = await userService.getUserByPhone(
          this.state.countryCode,
          this.state.phone
        );

        if (respGetUserByPhone.data.errors === null) {
          this.setState({
            isRegisterUser: true,
            userNameReceiverRegister: respGetUserByPhone.data.payload[0],
            firstNameReceiverRegister: respGetUserByPhone.data.payload[1],
          });
        }
        this.setState(
          {
            visibleModalSend: true,
          },
          () => {
            this.setState({
              formLoad: false,
            });
          }
        );
      } catch (error) {
        this.setState({
          formLoad: false,
          visibleModalSend: false,
        });
      }
    } else {
      this.setState({ formLoad: false });
    }
  }

  _cancelSend() {
    this.setState({ visibleModalSend: false, errorRequest: false });
  }

  setHasFrequent(hasFrequent) {
    this.setState({ hasFrequents: hasFrequent });
  }
  setContact(name, phone) {
    this.setState({
      receiverName: name,
      phone: phone,
    });
  }

  onSelectUser = (data) => {
    //  //console.log(data);
    this.setState(data);
  };

  handleDescription(e, description) {
    this.setState({
      description: description.value,
    });
  }

  onSelectCountry = (data) => {
    this.setState({ countryCode: data.countryCode }, () => {
      this.isInternationalReceiver();
    });
  };

  goCountryPicker() {
    this.props.navigation.push('ListCountriesModal', {
      data: this.state.countries,
      onSelectCountry: this.onSelectCountry.bind(this),
      from: 'FormSend',
    });
  }
  async getCharges(international) {
    if (
      this.state.amount !== '' &&
      this.state.amount > 0 &&
      this.state.amount !== null &&
      this.state.amount !== undefined &&
      this.state.amount.toString() !== 'NaN'
    ) {
      let body = {
        currency: this.state.currencySelected,
        amount: this.state.amount,
        btcPrice: null,
        operationType:
          international === true
            ? 'MC_SEND_SMS_INTERNATIONAL'
            : 'MC_SEND_SMS_NATIONAL',
        paymentType: null,
      };
      try {
        const responseGetCharges = await otcService._getAllCharguesNewPost(body);
        if (responseGetCharges.data.COMMISSION !== undefined) {
          this.setState({
            commisionByOperarion: responseGetCharges.data.COMMISSION.amount,
          });
        }
      } catch (error) {
        this.setState({
          commisionByOperarion: 0,
        });
      }
    } else {
      this.setState({
        errorAmountToTransfer: true,
        message: this.props.translate('withdraw.labels.failAmount2'),
      });
      setTimeout(() => {
        this.setState({
          errorAmountToTransfer: false,
          message: '',
        });
      }, 5000);
    }
  }

  handleAmount(amount, masket, floatValue) {
    let amountNumber = Number(floatValue);
    const isNanNumber = isNaN(amountNumber);
    if (!isNanNumber) {
      let changeFactor = 0;
      changeFactor = floatValue * this.state.factor;
      this.setState({
        amount: floatValue,
        amountUSD: changeFactor,
      });
    }
  }

  handleCancel() {
    this.setState({
      amount: '',
      receiverName: '',
      phone: '',
      description: '',
    });
  }
  handlePrefit(e, data) {
    this.setState({ countryCode: data.value });
  }

  closeModalsFrequent() {
    this.setState({
      openModalFrequents: false,
    });
  }

  setDataFromModal(data) {
    this.setState(data);
  }

  closeModalConfirmation() {
    this.setState({ visibleModalSend: false });
  }

  cleanFields() {
    this.setState({
      userNameReceiverRegister: '',
      currency: '',
      amount: '',
      description: '',
      phoneReceiver: '',
      receiverName: '',
      phone: '',
      countryCode: '',
      internationalReceiver: false,
    });
  }

  updateUserFrequents(frequents) {
    this.setState(
      {
        userFrequents: frequents,
        hasFrequents: frequents.length > 0 ? true : false,
      },
      () => {
        console.log('actualizo los frequents');
      }
    );
  }
  async getFactor(currency) {
    try {
      let responseFactor;
      responseFactor = await userService.getFactor(currency, 'USD');
      if (responseFactor.data.factor !== undefined) {
        this.setState({
          factor: responseFactor.data.factor,
        });
      }
    } catch (error) {
      // console.log(error);
    }
  }
  render() {
    let errorPhone;
    let errorCountry;
    const { userFrequents } = this.state;
    if (this.state.errorPhone) {
      errorPhone = (
        <Label basic color='red' pointing>
          {this.props.translate(this.state.messageError)}
        </Label>
      );
    }

    if (this.state.errorCountry) {
      errorCountry = (
        <Label basic color='red' pointing>
          {this.props.translate(this.state.messageError)}
        </Label>
      );
    }
    let list = [];
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

    return (
      <Segment
        loading={this.state.formLoad || this._Mounted === false}
        basic={true}
      >
        <ModalUserFrequents
          open={this.state.openModalFrequents}
          closeModal={this.closeModalsFrequent.bind(this)}
          setData={this.setDataFromModal.bind(this)}
          nroUsers={userFrequents.length}
          updateUserFrequents={this.updateUserFrequents.bind(this)}
        />
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
              <h4 className='headerComponent'>
                {this.props.translate('sendMoneyClick.header')}
              </h4>
            </Segment>
            <Divider hidden></Divider>
            <Form error key={this.state.keyAleatory}>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column
                    largeScreen={7}
                    widescreen={7}
                    mobile={16}
                    tablet={7}
                    computer={7}
                  >
                    <Form.Select
                      id={'select-currency'}
                      placeholder={this.props.translate(
                        'withdraw.picker.placeholder'
                      )}
                      fluid
                      search
                      selection
                      options={this.state.currencies}
                      onChange={this.onChangeCurrency.bind(this)}
                      label={this.props.translate(
                        'withdraw.picker.placeholder'
                      )}
                      value={this.state.currencySelected}
                      defaultValue={this.state.currencySelected}
                    />
                  </Grid.Column>
                  <Grid.Column
                    largeScreen={9}
                    widescreen={9}
                    mobile={16}
                    tablet={9}
                    computer={9}
                  >
                    <Grid columns={3}>
                      <Grid.Column
                        largeScreen={7}
                        widescreen={7}
                        mobile={8}
                        tablet={7}
                        computer={7}
                      >
                        <Form.Field>
                          <label>
                            {' '}
                            {this.props.translate('login.country')}
                          </label>
                          <Dropdown
                            placeholder={this.props.translate('login.country')}
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
                      </Grid.Column>
                      <Grid.Column
                        largeScreen={this.state.hasFrequents ? 7 : 9}
                        widescreen={this.state.hasFrequents ? 7 : 9}
                        mobile={this.state.hasFrequents ? 6 : 7}
                        tablet={this.state.hasFrequents ? 6 : 7}
                        computer={this.state.hasFrequents ? 7 : 9}
                      >
                        <Form.Field>
                          <label>{this.props.translate('login.phone')}</label>
                          <NumberFormat
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
                      </Grid.Column>
                      {this.state.hasFrequents && (
                        <Grid.Column
                          largeScreen={2}
                          widescreen={2}
                          mobile={1}
                          tablet={1}
                          computer={2}
                        >
                          <label style={{ color: 'white' }}>
                            {'Frequents'}
                          </label>
                          <Button
                            basic
                            icon
                            style={{ marginTop: 2, backgroundColor: 'blue' }}
                            onClick={() => {
                              this.setState({
                                openModalFrequents: true,
                              });
                            }}
                          >
                            <Icon
                              name='user circle'
                              size='big'
                              style={{ color: '#055990', marginTop: 25 }}
                            />
                          </Button>
                        </Grid.Column>
                      )}
                    </Grid>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column
                    largeScreen={7}
                    widescreen={7}
                    mobile={16}
                    tablet={7}
                    computer={7}
                  >
                    <Form.Field>
                      <label>
                        {this.props.translate(
                          'sendMoneyClick.placeholderRecipientName'
                        )}
                      </label>
                      <Input
                        placeholderTextColor={'silver'}
                        maxLength={35}
                        autoCapitalize='none'
                        placeholder={this.props.translate(
                          'sendMoneyClick.placeholderRecipientName'
                        )}
                        onChange={(event, text) =>
                          this.setState({ receiverName: text.value })
                        }
                        value={this.state.receiverName}
                      />
                      {this.state.errorReceiverName && (
                        <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                          <label style={{ color: 'red' }}>
                            {this.props.translate(
                              'withdraw.labels.missingField'
                            )}
                          </label>
                        </div>
                      )}
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column
                    largeScreen={9}
                    widescreen={9}
                    mobile={16}
                    tablet={9}
                    computer={9}
                  >
                    <Form.Field>
                      <label>
                        {this.props.translate('withdraw.modal.amount')}
                      </label>
                      <CurrencyInput
                        value={this.state.amount}
                        placeholder={this.props.translate(
                          'withdraw.modal.amount'
                        )}
                        name='amountWithdraw'
                        onChangeEvent={this.handleAmount.bind(this)}
                        precision={
                          this.state.currencySelected === 'BTC' ? 8 : 2
                        }
                      />
                    </Form.Field>
                    {this.state.errorAmountToTransfer && (
                      <div style={{ paddingBottom: 10 }}>
                        <label style={{ color: 'red' }}>
                          {this.state.messageError}
                        </label>
                      </div>
                    )}
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
                      label={this.props.translate('withdraw.modal.description')}
                      placeholder={this.props.translate(
                        'withdraw.modal.description'
                      )}
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
                      <label style={{ color: 'red' }}>
                        {this.state.message}
                      </label>
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
              {/* {this.state.availableBalanceCurrency >= 0 && ( */}
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
                    disabled={
                      this.state.availableBalanceCurrency > 0 ? false : true
                    }
                    onClick={this.handleCancel.bind(this)}
                    style={isMobile ? { width: 80 } : { width: 150 }}
                  >
                    {this.props.translate('withdraw.modal.buttons.cancel')}
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
                    disabled={
                      this.state.availableBalanceCurrency > 0 ? false : true
                    }
                    color='blue'
                    style={isMobile ? { width: 80 } : { width: 150 }}
                    onClick={this._ShowConfirm.bind(this)}
                  >
                    {this.props.translate('withdraw.modal.buttons.send')}
                  </Button>
                </Grid.Column>
                <Grid.Column
                  largeScreen={4}
                  mobile={null}
                  tablet={4}
                  computer={4}
                ></Grid.Column>
              </Grid>
              {/* //	)} */}
              {!this.state.formLoad &&
                this.state.availableBalanceCurrency === 0 && (
                  <div style={{ flex: 1, textAlign: 'center', paddingTop: 30 }}>
                    <label style={{ color: 'red' }}>
                      {this.props.translate('withdraw.labels.notBalance')}
                    </label>
                  </div>
                )}
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
        <SendMoneyClickConfirmationModal
          amountUSD={this.state.amountUSD}
          open={this.state.visibleModalSend}
          receiverName={this.state.receiverName}
          countryCode={this.state.countryCode}
          phone={this.state.phone}
          amount={this.state.amount}
          currency={this.state.currencySelected}
          description={this.state.description}
          commision={this.state.commisionByOperarion}
          firstNameReceiverRegister={this.state.firstNameReceiverRegister}
          userNameReceiverRegister={this.state.userNameReceiverRegister}
          internationalReceiver={this.state.internationalReceiver}
          closeModal={this.closeModalConfirmation.bind(this)}
          existPhoneInListFrequent={this.state.existPhoneInListFrequent}
          cleanFields={this.cleanFields.bind(this)}
          isRegisterUser={this.state.isRegisterUser}
          userFrequents={this.state.userFrequents}
          updateUserFrequents={this.updateUserFrequents.bind(this)}
        ></SendMoneyClickConfirmationModal>
      </Segment>
    );
  }
}
export default translate(SendMoneyClick);
