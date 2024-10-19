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
  Container,
} from 'semantic-ui-react';
import React from 'react';
import CurrencyInput from 'react-currency-input';
import { isMobile } from 'react-device-detect';
import translate from '../../i18n/translate';
import otcService from '../../services/otc';
import userService from '../../services/user';
import moneyclickService from '../../services/moneyclick';
import NumberFormat from 'react-number-format';
import DinamicForm from '../DinamicForm/DinamicForm';
import WithdrawConfirmationModal from './WithdrawConfirmationModal';
import FormVerification from './FormVerification';
class Withdraw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translator: props.translate,
      data: {},
      openModalConfirmation: false,
      currencies: [],
      balances: {},
      paymentTypes: [],
      paymentTypesClient: [],
      paymentsUserForCurrency: [],
      paymentBody: {},
      keyAleatory: Math.random(),
      currencySelected: '',
      paymentSelected: '',
      availableBalanceCurrency: 0,
      symbol: '',
      paymentTypesForCurrency: [],
      fieldsAll: [],
      fieldsFiltered: [],
      getresult: false,
      createPayment: false,
      interactionsComplete: false,
      description: '',
      errorAmount: false,
      emailReceiver: '',
      errorEmailReceiver: false,
      errorOperation: false,
      amount: 0,
      message: '',
      transactionsTypes: [],
      transactionTypeSelected: '',
      validateDinamicForm: false,
      formLoad: true,
      hasVerification: null,
      notAddPayment: false,
      thirdAccount: false,
      factor: 0,
      amountUSD: 0,
      maxOperationAmount: 0,
      paymentTypesOptions: [],
      paymentTypeSelected: '',
      amountMin: 0,
      amountMax: 0,
      financialTypeNameSelected: '',
    };
  }

  componentDidMount() {
    this.getBalanceMoneyClick();
  }

  reloadFields() {
    this.setState(
      {
        openModalConfirmation: false,
        formLoad: true,
        amount: 0,
        description: '',
      },
      () => {
        this.getBalanceMoneyClick();
      }
    );
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

  setToData(key, value) {
    this.setState({
      errorOperation: false,
      message: '',
    });
    let objData = this.state.data;
    switch (key) {
      case 'transactionTypeSelected':
        objData.transactionTypeSelected = value;
        break;
      case 'payment':
        objData.payment = value;
        break;
      case 'isCreate':
        objData.isCreate = value;
        break;
      case 'paymentType':
        objData.paymentType = value;
        break;
      case 'commision':
        objData.commision = value;
        break;
      case 'alerts':
        objData.alerts = value;
        break;
      case 'body':
        objData.body = value;
        break;
      default:
        break;
    }

    this.setState({
      data: objData,
    });
  }

  cleanAmountAndDescriptionAndEmail() {
    this.setState({
      amount: 0,
      description: '',
      emailReceiver: '',
      fieldsFiltered: []
    });
  }

  cleanFields() {
    this.setState({
      currencySelected: 'USD',
      amount: 0,
      description: '',
    });
    this.getFinancialTypes("USD");
    this.getPaymentUser('USD');
  }

  floorDecimals(value, numberDecimals) {
    let decimales = Math.pow(10, numberDecimals);
    return Math.floor(value * decimales) / decimales;
  }

  loadCurrencies() {
    let currenciesSelect = [];
    try {
      let responseCurrencies = otcService.getCurrencies();

      responseCurrencies.then((currencies) => {
        const currenciesWithoutCryptos = currencies.data.filter((currency) => {
          return (
            currency.shortName !== 'BTC' &&
            currency.shortName !== 'ETH' &&
            currency.shortName !== 'USDT'
          );
        });
        currenciesWithoutCryptos.map((currency) => {
          if (currency.active) {
            let item = {};
            const balance =
              this.state.balances[currency.shortName] !== undefined &&
              this.state.balances[currency.shortName].availableBalance !==
                undefined
                ? this.state.balances[currency.shortName].availableBalance
                : 0;
            let formatter = '';
            if (
              currency.shortName === 'PA_USD' ||
              currency.shortName === 'USDT'
            ) {
              formatter = new Intl.NumberFormat('en-US', {
                currency: 'USD',
              });
            } else {
              formatter = new Intl.NumberFormat('en-US', {
                currency: currency.shortName,
              });
            }

            item.text =
              currency.fullName +
              (balance > 0
                ? this.props.translate('withdraw.labels.availableBalance') +
                  formatter.format(
                    this.floorDecimals(
                      balance,
                      currency.shortName === 'BTC' ||
                        currency.shortName === 'ETH'
                        ? 8
                        : 2
                    )
                  )
                : '');
            item.value = currency.shortName;
            item.key = currency.shortName;
            item.availableBalance = balance;
            currenciesSelect.push(item);
          }
          return currency;
        });
        this.setState(
          {
            currencies: currenciesSelect,
          },
          () => {
            this.setState(
              {
                currencySelected: 'USD',
              },
              () => {
                this.getFinancialTypes("USD");
                this.setState({
                  availableBalanceCurrency:
                    this.getBalanceFromCurrencySelected('USD'),
                });
              }
            );
            this.getPaymentUser('USD');
          }
        );
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

  getPaymentUser(currency) {
    this.setState({ paymentsUserForCurrency: [] });
    otcService
      .getPayments(currency, sessionStorage.getItem('username'))
      .then((resp) => {
        let payments = this.formatPaymentsUser(resp.data);
        this.setState({ paymentsUserForCurrency: payments });
      })
      .catch((error) => {
        this.setState({ paymentsUserForCurrency: [] });
        console.log(error);
      });
  }

  createOption(payment) {
    let option = '';
    if (payment.bank !== undefined && payment.bank !== '') {
      option = payment.bank + ' ';
    }
    if (payment.accountNumber !== undefined && payment.accountNumber !== '') {
      option = option + payment.accountNumber + ' ';
    }
    if (
      payment.accountHolderName !== undefined &&
      payment.accountHolderName !== ''
    ) {
      option = option + payment.accountHolderName + ' ';
    }
    if (payment.emailReceiver !== undefined && payment.emailReceiver !== '') {
      option = option + payment.emailReceiver + ' ';
    }

    if (payment.link !== undefined && payment.link !== '') {
      option = option + ' ' + payment.link + ' ';
    }
    return option;
  }

  formatPaymentsUser(payments) {
    let paymentFormatted = [];
    if (this.state.notAddPayment === false) {
      paymentFormatted.push({
        text: this.props.translate('withdraw.labels.addPayment'),
        value: 'create',
      });
    }
    payments.forEach((payment) => {
      const option = this.createOption(payment);
      if (option.trim() !== '') {
        paymentFormatted.push({ text: option, value: payment });
      }
    });
    if (paymentFormatted.length > 0) {
      const sizeIsOne = paymentFormatted.length === 1;
      this.setState(
        {
          createPayment: sizeIsOne,
          paymentSelected: sizeIsOne
            ? paymentFormatted[0].value
            : paymentFormatted[1].value,
        },
        () => {
          this.setToData('payment', this.state.paymentSelected);
          this.setToData(
            'paymentType',
            this.state.paymentSelected.type !== undefined
              ? this.state.paymentSelected.type
              : ''
          );

          if (this.state.paymentSelected !== 'create') {
            this.preSentToPayment(this.state.paymentSelected, 1, false); // se envia un monto por defecto para que no de error 500.
          } else {
            // console.log('no presendtopayment');
          }

          this.setToData('isCreate', sizeIsOne);
        }
      );
    } else {
      this.setState({
        createPayment: false,
        paymentSelected: '',
        errorAdd: true,
      });
      setTimeout(() => {
        this.setState({ errorAdd: false, message: '' });
      }, 10000);
    }

    return paymentFormatted;
  }

  getFinancialTypes(currency) {
    let types = [];
    otcService.getFinancialTypes(currency).then(financialTypes => { 
      this.setState({
          financialTypes: financialTypes.data
      });
      financialTypes.data.forEach(financialType => {
        if (financialType.active && financialType.fiatBankTransfer) {
        types.push({
          key: financialType.name,
          text: this.props.translate('withdraw.typesPayment.' + financialType.name),
          value: financialType
        });
      }
      });

      this.setState(
        {
          paymentTypesClient: types,
          financialTypeNameSelected: types.length > 0 ? types[0].value : '',
        },
        () => {
          if (this.state.financialTypeNameSelected !== '') {
            this.verificationCE();
            this.getTransactionsTypesFromfinancialType(this.state.financialTypeNameSelected);
          } else { 
            this.setState({
              formLoad: false
            })
          }
      }
    );
   
    });
  }

    async getTransactionsTypesFromfinancialType(financialTypeSelected) {
   this.setState({
                transactionTypeSelected: "",
                thirdAccount: false,
              });
      let allowedOwnershipsToSelect = [];
          financialTypeSelected.allowedOwnerships.forEach(allowedOwnership => { 
            allowedOwnershipsToSelect.push({
              key: allowedOwnership.toUpperCase(),
              value: allowedOwnership.toUpperCase(),
              text: this.props.translate('withdraw.picker.'+allowedOwnership),
            });
          });

          if (allowedOwnershipsToSelect.length > 0) {
            this.setState({ notAddPayment: false }, () => {
              //this.getPaymentUser(currency);
            });
              this.setState({
                transactionTypeSelected: allowedOwnershipsToSelect[0].value,
                thirdAccount: allowedOwnershipsToSelect[0].value !== 'OWN',
              });
            this.setToData('transactionTypeSelected', allowedOwnershipsToSelect[0].value);
          } else { 
            this.setState({ notAddPayment: true }, () => {
             // this.getPaymentUser(currency);
            });
          }
      this.setState({ transactionsTypes: allowedOwnershipsToSelect }, () => { 
        this.filterByType(financialTypeSelected);
      });
  }

  filterByType(financialType) {
    let isBank = false;
    //let optionByDefault = '';
    this.setState({
      fieldsFiltered: financialType.fields,
      formLoad: false
    }, () => { 
      financialType.fields.forEach((field) => {
        if (field.name === 'bank') { 
          isBank = true;
        }
        //optionByDefault = this.getFirstOptionsByDefault(field);
        if (field.name === 'accountHolderName') {
          if (this.state.thirdAccount) { 
            this.setDinamicValue(field.name, '');
          }
        } else {
           this.setDinamicValue(field.name, '');
        }
         
    

      });
      if (!isBank) { 
        if (this.state.transactionTypeSelected === 'OWN') { 
          this.setDinamicValue('own', true);
        }
        this.setDinamicValue('bank',financialType.name );
      }
    });

    
  }

  returnValues(data) {
    let arra = [];
    for (let value of data) {
      arra.push({ value: value, text: value });
    }
    return arra;
  }

  setDinamicValue(key, value) {
    //console.log('key ', key, 'value ', value);
    this.setState({ [key]: value });
    let payment = this.state.paymentBody;
    if (typeof key === 'string' && value !== '') {
      Object.defineProperty(payment, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true,
      });
      this.setState({ paymentBody: payment }, () => {
        this.setToData('payment', this.state.paymentBody);
        if (key === 'bank') {
          this.preSentToPayment(payment, 1, false);
        }
      });
    }
  }

  getFirstOptionsByDefault(field) {
    if (typeof field.values !== 'undefined' && field.values.length === 1) {
      return field.values[0];
    } else {
      return '';
    }
  }



  validateFieldsFromDinamicForm() {
    let validate = true;
    for (let field of this.state.fieldsFiltered) {
      if (
        field.required &&
        (this.state[field.name] === undefined || this.state[field.name] === '')
      ) {
       // console.log(field.name,this.state[field.name]);
        validate = false;
      }
    }

    if (
      this.state.transactionTypeSelected === 'THIRDS' &&
      (this.state['emailReceiver'] === undefined ||
        this.state['emailReceiver'] === '')
    ) {
      validate = false;
    }
    return validate;
  }

  validate() {
    if (
      this.state.createPayment &&
      this.state.transactionTypeSelected === 'THIRDS' &&
      this.state.emailReceiver === ''
    ) {
      this.setState(
        {
          errorEmailReceiver: true,
          message: this.props.translate('withdraw.labels.missingField'),
        },
        () => {
          setTimeout(() => {
            this.setState({ errorEmailReceiver: false, message: '' });
          }, 3000);
        }
      );
      return false;
    } else if (this.state.amount === '') {
      this.setState(
        {
          errorAmount: true,
          message: this.props.translate('withdraw.labels.missingField'),
        },
        () => {
          setTimeout(() => {
            this.setState({ errorAmount: false, message: '' });
          }, 3000);
        }
      );
      return false;
    } else if (this.state.amount === '0' || this.state.amount === 0) {
      this.setState(
        {
          errorAmount: true,
          message: this.props.translate('withdraw.labels.failAmount2'),
        },
        () => {
          setTimeout(() => {
            this.setState({ errorAmount: false, message: '' });
          }, 3000);
        }
      );
      return false;
    } else if (
      this.state.amountMax !== 0 &&
      (this.state.amount < this.state.amountMin ||
        this.state.amount > this.state.amountMax)
    ) {
      this.setState(
        {
          errorAmount: true,
          message: this.props.translate('withdraw.labels.minAndMax'),
        },
        () => {
          setTimeout(() => {
            this.setState({ errorAmount: false, message: '' });
          }, 3000);
        }
      );
      return false;
    } else if (this.state.createPayment) {
      this.setState(
        {
          validateDinamicForm: true,
        },
        () => {
          setTimeout(() => {
            this.setState({ validateDinamicForm: false });
          }, 5000);
        }
      );
      return this.validateFieldsFromDinamicForm();
    } else if (
      this.state.paymentSelected === '' ||
      this.state.paymentSelected === null ||
      this.state.paymentSelected === undefined
    ) {
      this.setState(
        {
          errorPayment: true,
          message: this.props.translate('withdraw.labels.missingField'),
        },
        () => {
          setTimeout(() => {
            this.setState({ errorPayment: false, message: '' });
          }, 3000);
        }
      );
      return false;
    }
    return true;
  }

  handleSendToPayment(e) {
    let validate = this.validate();
    if (validate) {
      this.showConfirm();
    }
  }

  handleCancel() {
    this.cleanFields();
  }

  onChangeCurrency(e, currency) {
    this.cleanAmountAndDescriptionAndEmail();
    this.getFactor(currency.value);
    this.getFinancialTypes(currency.value);
    this.setState(
      {
        formLoad: true,
        paymentBody: {},
        paymentSelected: '',
        maxOperationAmount: 0,
        amount: 0,
        currencySelected: currency.value,
        createPayment: false,
        paymentTypesOptions: [],
        paymentTypeSelected: '',
        amountUSD: 0,
        amountMin: 0,
        amountMax: 0,
      },
      () => {
        this.setState({
          availableBalanceCurrency: this.getBalanceFromCurrencySelected(
            currency.value
          ),
        });
      }
    );
    this.setState({ notAddPayment: false });
    this.getPaymentUser(currency.value);
    //this.getTypePaymentsForCurrency(currency.value);
  }

  onChangePaymentTypesClient(e, financialTypeNameSelected) {
    this.setState(
      {
        paymentBody: {},
        //paymentSelected: '',
        paymentTypesOptions: [],
        financialTypeNameSelected: financialTypeNameSelected.value,
        maxOperationAmount: 0,
      },
      () => {
        this.verificationCE();
        this.getTransactionsTypesFromfinancialType(this.state.financialTypeNameSelected);
        //this.filterByType(this.state.financialTypeNameSelected);
       
        if (financialTypeNameSelected.value.name !== 'BANK' &&
          financialTypeNameSelected.value.name !== 'BANK_ACCOUNT') {
          this.setToData('paymentType', financialTypeNameSelected.value.name);
          this.setToData('payment', this.state.paymentBody);
          this.setState({
            paymentTypeSelected: financialTypeNameSelected.value,
          });
        }
      }
    );
  }

  onChangeTransactionType(e, transaction) {
    this.setState({
      thirdAccount: transaction.value !== 'OWN',
    });

    if (transaction.value === 'OWN' &&  typeof this.state.paymentBody  !== 'undefined' && typeof this.state.paymentBody.emailReceiver !== 'undefined') {
      delete this.state.paymentBody.emailReceiver;
    }
    this.setState({ transactionTypeSelected: transaction.value }, () => {
      if (this.state.paymentBody.bank !== undefined) {
        this.preSentToPayment(this.state.paymentBody, 1, false);
      }
    });
    this.setToData('transactionTypeSelected', transaction.value);
  }

  onChangePayment(e, payment) {
    this.setState({
      paymentTypesOptions: [],
      paymentTypeSelected: '',
    });
    if (payment.value !== 'create') {
      this.setState({ createPayment: false, paymentSelected: payment.value });
      this.setToData('payment', payment.value);
      this.preSentToPayment(payment.value, 1, false); //monto por defecto.
      this.setToData(
        'paymentType',
        payment.value.type !== undefined ? payment.value.type : ''
      );
      this.setState({ paymentTypeSelected: payment.value.type });
      this.setToData('isCreate', false);
    } else {
      this.setState({ createPayment: true, paymentSelected: payment.value });
      this.setToData('isCreate', true);
    }
  }

  onChangePaymentType(e, payment) {
    this.loadCharges(payment.value);
    this.setState({ paymentTypeSelected: payment.value, amount: '' });
    this.setToData('paymentType', payment.value);
  }

  closeModal() {
    this.setState({
      openModalConfirmation: false,
    });
  }

  handleAmount(amount, masket, floatValue) {
    let amountNumber = Number(floatValue);
    const isNanNumber = isNaN(amountNumber);
    if (!isNanNumber) {
      if (this.validateAmount(floatValue)) {
        let changeFactor = 0;
        changeFactor = floatValue * this.state.factor;
        this.setState({
          amount: floatValue,
          amountUSD: changeFactor,
        });
      }
    }
  }

  validateAmount(amount) {
    if (amount > this.state.maxOperationAmount) {
      this.setState(
        {
          errorAmount: true,
          message: this.props.translate('withdraw.labels.failAmount1'),
        },
        () => {
          setTimeout(() => {
            this.setState({ errorAmount: false, message: '' });
          }, 3000);
        }
      );
      return false;
    }

    if (this.state.amountMax !== 0 && amount > this.state.amountMax) {
      this.setState(
        {
          errorAmount: true,
          message: this.props.translate('withdraw.labels.minAndMax'),
        },
        () => {
          setTimeout(() => {
            this.setState({ errorAmount: false, message: '' });
          }, 3000);
        }
      );
      return false;
    }
    return true;
  }

  handleDescription(e, description) {
    this.setState({
      description: description.value,
    });
  }

  showConfirm() {
    this.loadCharges(this.state.paymentTypeSelected);
    this.loadAlerts(
      this.state.currencySelected,
      this.state.paymentTypeSelected
    );
    const username = sessionStorage.getItem('username');
    let bodyPreSendDefine = {};
    bodyPreSendDefine.userName = username;
    bodyPreSendDefine.currency = this.state.currencySelected;
    bodyPreSendDefine.description = this.state.description;
    bodyPreSendDefine.amount = this.state.amount;
    let payment = this.state.data.payment;
    Object.defineProperty(payment, 'type', {
      value: this.state.paymentTypeSelected,
      enumerable: true,
      configurable: true,
      writable: true,
    });
    bodyPreSendDefine.payment = payment;
    bodyPreSendDefine.paymentType = this.state.paymentTypeSelected;
    this.setToData('body', bodyPreSendDefine);
    this.setState({
      openModalConfirmation: true,
    });
  }

  async preSentToPayment(payment, amount) {
    this.setState({
      paymentTypesOptions: [],
      paymentTypeSelected: '',
      amountMin: 0,
      amountMax: 0,
      formLoad: true,
    });
    const username = sessionStorage.getItem('username');

    let bodyPreSend = {};
    bodyPreSend.userName = username;
    bodyPreSend.currency = this.state.currencySelected;
    bodyPreSend.description = this.state.description;
    bodyPreSend.amount = amount;
    bodyPreSend.payment = payment;
    bodyPreSend.paymentType = null;
    bodyPreSend.multiOperator = true;

    if (this.state.createPayment === true && bodyPreSend.payment !== 'create') {
      if (this.state.data.transactionTypeSelected === 'OWN') {
        bodyPreSend.payment.mcVerified = true;
      } else {
        bodyPreSend.payment.mcVerified = false;
      }
    }

    try {
      const response = await userService.sendToPayment(bodyPreSend);
      if (
        response.data !== 'THERE IS NO OFFER TO THIS CURRENCY' &&
        response.data !==
          'THERE IS NO DOLLARBTC SEND TO PAYMENT TO THIS CURRENCY' &&
        response.data !== 'FAIL'
      ) {
        if (response.data.indexOf('USER DAYLY LIMIT REACHED') !== -1) {
          this.showMessage(
            this.props.translate('withdraw.labels.userDaylyLimitReached')
          );
        } else if (response.data.indexOf('USER MONTHLY LIMIT REACHED') !== -1) {
          this.showMessage(
            this.props.translate('withdraw.labels.userMoytlyLimitReached')
          );
        } else if (response.data.indexOf('AMOUNT MUST BE BETWEEN ') !== -1) {
          const array = response.data.split(' ');
          const min = Number(array[4]).toLocaleString('en-EN');
          const max = Number(array[6]).toLocaleString('en-EN');
          this.setState({
            errorAmount: true,
            message:
              this.props.translate('withdraw.labels.validationAmount') +
              min +
              this.props.translate('withdraw.labels.and') +
              max,
            formLoad: false,
          });
          setTimeout(() => {
            this.setState({ errorAmount: false, message: '' });
          }, 5000);
        } else {
          let dataInArray = response.data.split('____');
          let paymentTypesStrings = dataInArray[0];
          let paymentTypesArray = paymentTypesStrings.split('__');
          let paymentTypeSelected = paymentTypesArray[0];
          let paymentsOptionsAux = [];
          paymentTypesArray.forEach((payment) => {
            paymentsOptionsAux.push({
              value: payment,
              text: this.props.translate('withdraw.modal.' + payment),
            });
          });

          this.setState({
            paymentTypesOptions: paymentsOptionsAux,
            paymentTypeSelected: paymentTypeSelected,
          });
          if (dataInArray.length > 1) {
            let amountMin = 0;
            let amountMax = 0;
            if (dataInArray[1].split('__')[0].includes('e')) {
              amountMin = Number(dataInArray[1].split('__')[0]).toFixed(2);
            } else {
              amountMin = Number(dataInArray[1].split('__')[0]);
            }
            if (dataInArray[1].split('__')[1].includes('e')) {
              amountMax = Number(dataInArray[1].split('__')[1]).toFixed(2);
            } else {
              amountMax = Number(dataInArray[1].split('__')[1]);
            }
            this.setState({
              amountMin: amountMin,
              amountMax: amountMax,
            });
          }

          this.setToData('paymentType', paymentTypeSelected);
          this.loadCharges(paymentTypeSelected);
          if (this.validateAmountTotal()) {
            this.setState({
              formLoad: false,
            });
          }
        }
      } else {
        console.log('errorNotSupportOperation');
        this.showMessage(
          this.props.translate('withdraw.labels.errorNotSupportOperation')
        );
      }
    } catch (e) {
      console.log('error ', e);
      this.setState({
        formLoad: false,
      });
      let error = e.toString();
      if (error.includes('Network')) {
      } else {
      }
    }
    /* } else {
      this.showMessage(this.props.translate('withdraw.labels.failAmount2'));
    }*/
  }

  showMessage(message) {
    this.setState(
      {
        formLoad: false,
        errorOperation: true,
        message: message,
      },
      () => {
        setTimeout(() => {
          this.setState({ errorOperation: false, message: '' });
        }, 30000);
      }
    );
  }

  validateAmountTotal() {
    let total = this.state.data.commision + this.state.amount;
    if (total > this.state.availableBalanceCurrency) {
      this.setState(
        {
          errorAmount: true,
          message: this.props.translate('withdraw.labels.failAmount3'),
          errorAmountWithCommision: true,
          messageComission: this.props.translate(
            'withdraw.labels.failAmountCommision'
          ),
        },
        () => {
          setTimeout(() => {
            this.setState({
              errorAmount: false,
              message: '',
              errorAmountWithCommision: false,
              messageComission: '',
            });
          }, 10000);
        }
      );
      return false;
    }
    return true;
  }

  async loadAlerts(currencySelected, paymentType) {
    let alerts = await userService.getAlertByCurrencyAndPaymentType(
      currencySelected,
      paymentType
    );
    let result = alerts.data;
    let arrayAlert = [];
    Object.entries(result).forEach(([key, value]) => {
      arrayAlert.push([key + ':' + value]);
    });
    this.setToData('alerts', arrayAlert);
  }

  async loadCharges(paymentType) {
    this.setState({
      formLoad: true,
    });
    
    let body;
    /*if (paymentType === 'ACH_THIRD_ACCOUNT') {
        payType = 'SEND_TO_PAYMENT__COMMISSION__ACH_THIRD_ACCOUNT';
      } else {
        payType = 'SEND_TO_PAYMENT__COMMISSION';
      }*/
    body = {
      currency: this.state.currencySelected,
      amount: this.state.amount,
      btcPrice: null,
      operationType: 'SEND_TO_PAYMENT',
      paymentType: paymentType,
      balance: this.state.availableBalanceCurrency,
    };

    try {
      const responseGetCharges = await otcService._getAllCharguesNewPost(body);
      let commision = 0;
      let maxOperationAmount = 0;
      if (responseGetCharges.data.COMMISSION !== undefined) {
        commision = responseGetCharges.data.COMMISSION.amount;
        if (
          responseGetCharges.data.COMMISSION.maxOperationAmount !== undefined
        ) {
          maxOperationAmount =
            responseGetCharges.data.COMMISSION.maxOperationAmount;
        }
      }
      this.setToData('commision', commision);
      this.setState({
        formLoad: false,
        maxOperationAmount: Number(maxOperationAmount.toFixed(3).slice(0, -1)),
        amount: 0,
      });
    } catch (e) {
      console.log(e);
      let error = e.toString();
      if (error.includes('Network')) {
      } else {
      }
    }
  }

  handleEmail(e, email) {
    this.setDinamicValue('emailReceiver', email.value);
  }

  setVerification(option) {
    this.setState({
      hasVerification: option,
    });
  }

  async verificationCE() {
  let username = sessionStorage.getItem('username');
    let responseGetConfig = await userService.getConfigUserGeneral(username);
    if (typeof this.state.financialTypeNameSelected.verifications === 'undefined' ||
      typeof this.state.financialTypeNameSelected.verifications.transfers === 'undefined' || //you do not have verifications configured 
      (typeof responseGetConfig.data.result.verification.F !== "undefined" && // has the verification F approved
        responseGetConfig.data.result.verification.F.userVerificationStatus ===
        "OK") || (typeof responseGetConfig.data.result.verification.C !== "undefined" && // has the verification F approved
        responseGetConfig.data.result.verification.C.userVerificationStatus ===
        "OK")|| !this.state.financialTypeNameSelected.verifications.transfers.active || (typeof responseGetConfig.data.result.verification[this.state.financialTypeNameSelected.verifications.transfers.type] !== 'undefined' &&
          responseGetConfig.data.result.verification[this.state.financialTypeNameSelected.verifications.transfers.type].userVerificationStatus === 'OK')) {
      
       this.setState({
         hasVerification: true,
          //formLoad: false,
        });
      
     
    } else { 
         this.setState({
           hasVerification: false,
            formLoad: false,
          });
    }
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

      return (
        <Segment
          loading={this.state.formLoad || this._Mounted === false}
          basic={true}
        >
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
                  {this.props.translate('withdraw.header')}
                </h4>
              </Segment>
            </Grid.Column>
            <Grid.Column
              largeScreen={2}
              mobile={1}
              tablet={1}
              computer={2}
              widescreen={2}
            />
          </Grid>
          <Divider hidden></Divider>
          <Form error key={this.state.keyAleatory} id='id-form-withdraw'>
            <Grid columns={4}>
              <Grid.Column
                largeScreen={2}
                mobile={1}
                tablet={1}
                computer={2}
                widescreen={2}
              />
              <Grid.Column
                largeScreen={6}
                widescreen={6}
                mobile={14}
                tablet={7}
                computer={7}
              >
                {this.state.currencies.length > 0 && (
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
                    label={this.props.translate('withdraw.picker.placeholder')}
                    value={this.state.currencySelected}
                    defaultValue={this.state.currencySelected}
                  />
                )}
              </Grid.Column>
              <Grid.Column
                largeScreen={6}
                widescreen={6}
                mobile={14}
                tablet={7}
                computer={7}
              >
                {this.state.availableBalanceCurrency > 0 && (
                  <Form.Select
                    id='id-payment-withdraw'
                    placeholder={this.props.translate(
                      'withdraw.picker.placeholderPayments'
                    )}
                    fluid
                    search
                    disabled={
                      this.state.notAddPayment &&
                      this.state.paymentsUserForCurrency.length === 0
                    }
                    options={this.state.paymentsUserForCurrency}
                    onChange={this.onChangePayment.bind(this)}
                    label={this.props.translate(
                      'withdraw.picker.placeholderPayments'
                    )}
                    value={this.state.paymentSelected}
                  />
                )}
                {this.state.errorPayment && (
                  <div style={{ paddingBottom: 10 }}>
                    <label style={{ color: 'red' }}>{this.state.message}</label>
                  </div>
                )}
              </Grid.Column>
              <Grid.Column
                largeScreen={2}
                mobile={1}
                tablet={1}
                computer={2}
                widescreen={2}
              />
            </Grid>
            {this.state.createPayment &&
              this.state.availableBalanceCurrency > 0 &&
              this.state.notAddPayment === false && (
                <div>
                  {this.state.fieldsFiltered.length !== 0 && (
                    <Grid columns={4}>
                      <Grid.Column
                        largeScreen={2}
                        mobile={1}
                        tablet={1}
                        computer={2}
                        widescreen={2}
                      />
                      <Grid.Column
                        largeScreen={6}
                        widescreen={6}
                        mobile={7}
                        tablet={7}
                        computer={7}
                      >
                        {this.state.paymentTypesClient.length !== 0 && (
                          <Form.Select
                            fluid
                            search
                            selection
                            options={this.state.paymentTypesClient}
                            onChange={this.onChangePaymentTypesClient.bind(this)}
                            label={this.props.translate(
                              'withdraw.picker.titlePaymentClient'
                            )}
                            value={this.state.financialTypeNameSelected}
                            defaultValue={this.state.transactionTypeSelected}
                          />
                        )}
                      </Grid.Column>
                      <Grid.Column
                        largeScreen={6}
                        widescreen={6}
                        mobile={7}
                        tablet={7}
                        computer={7}
                      >
                        <Form.Select
                          id='select-typeAccount'
                          placeholder={this.props.translate(
                            'withdraw.picker.titleTransactionType'
                          )}
                          fluid
                          search
                          selection
                          options={this.state.transactionsTypes}
                          onChange={this.onChangeTransactionType.bind(this)}
                          label={this.props.translate(
                            'withdraw.picker.titleTransactionType'
                          )}
                          value={this.state.transactionTypeSelected}
                          defaultValue={this.state.transactionTypeSelected}
                        />
                      </Grid.Column>
                 
                      <Grid.Column
                        largeScreen={1}
                        mobile={1}
                        tablet={1}
                        computer={1}
                      />
                       {this.state.hasVerification !== null && !this.state.hasVerification && 
                          <Grid.Row>
                           <Grid.Column
                            largeScreen={1}
                            mobile={1}
                            tablet={1}
                            computer={1}
                            widescreen={1}
                          />
                           <Grid.Column
                            largeScreen={14}
                            mobile={14}
                            tablet={14}
                            computer={14}
                            widescreen={14}
                          >
                          <FormVerification setVerification={this.setVerification.bind(this)} />
                           </Grid.Column>
                          <Grid.Column
                            largeScreen={1}
                            mobile={1}
                            tablet={1}
                            computer={1}
                            widescreen={1}
                          />
                          </Grid.Row>
                        }
                      {this.state.thirdAccount && (
                        <Grid.Row>
                          <Grid.Column
                            largeScreen={2}
                            mobile={1}
                            tablet={1}
                            computer={2}
                            widescreen={2}
                          />
                          <Grid.Column
                            largeScreen={12}
                            mobile={14}
                            tablet={14}
                            computer={12}
                            widescreen={12}
                          >
                            <Form.Field required>
                              <label>
                                {this.props.translate(
                                  'dynamicForm.labels.emailReceiver'
                                )}
                              </label>
                              <Input
                                name={'emailReceiver'}
                                autoCapitalize='none'
                                placeholder={this.props.translate(
                                  'dynamicForm.labels.emailReceiver'
                                )}
                                onChange={this.handleEmail.bind(this)}
                                value={this.state.emailReceiver}
                              />
                              {this.state.errorEmailReceiver && (
                                <div
                                  style={{ paddingTop: 10, paddingBottom: 10 }}
                                >
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
                            largeScreen={2}
                            mobile={1}
                            tablet={1}
                            computer={2}
                            widescreen={2}
                          />
                        </Grid.Row>
                      )}
                    </Grid>
                  )}

                  {this.state.fieldsFiltered.length === 0 && (
                    <Grid columns={1}>
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
                        computer={12}
                      >
                        <Container textAlign={'center'}>
                          <Message
                            negative
                            content={this.props.translate(
                              'dynamicForm.emptyFields'
                            )}
                          />
                        </Container>
                      </Grid.Column>
                      <Grid.Column
                        largeScreen={2}
                        mobile={1}
                        tablet={1}
                        computer={2}
                      />
                    </Grid>
                  )}
                  {this.state.hasVerification !== null && this.state.hasVerification && <Grid columns={3}>
                    <Grid.Column
                      largeScreen={2}
                      mobile={1}
                      tablet={1}
                      computer={2}
                    />
                    <Grid.Column
                      largeScreen={12}
                      computer={14}
                      widescreen={12}
                      mobile={14}
                      tablet={14}
                    >
                      <DinamicForm
                        paymentClientSelected={this.state.financialTypeNameSelected}
                        currency={this.state.currencySelected}
                        fields={this.state.fieldsFiltered}
                        setDinamicValue={this.setDinamicValue.bind(this)}
                        validate={this.state.validateDinamicForm}
                        thirdAccount={this.state.thirdAccount}
                      />
                    </Grid.Column>
                    <Grid.Column
                      largeScreen={2}
                      mobile={1}
                      tablet={1}
                      computer={2}
                    />
                  </Grid>}
                </div>
              )}
            {this.state.createPayment && <div style={{ paddingTop: 10 }}></div>}
            {(!this.state.createPayment ||
              this.state.fieldsFiltered.length > 0) &&
              this.state.availableBalanceCurrency > 0 && 
               (
                <Grid columns={4}>
                  {this.state.paymentTypesOptions.length > 1 &&
                    this.state.maxOperationAmount > 0 &&
                    !this.state.errorOperation && (
                      <Grid.Row>
                        <Grid.Column
                          largeScreen={2}
                          mobile={1}
                          tablet={1}
                          computer={2}
                        />
                        <Grid.Column
                          largeScreen={6}
                          widescreen={6}
                          mobile={14}
                          tablet={7}
                          computer={7}
                        >
                          <Form.Select
                            id='select-payment-types'
                            fluid
                            search
                            options={this.state.paymentTypesOptions}
                            onChange={this.onChangePaymentType.bind(this)}
                            label={this.props.translate(
                              'withdraw.picker.PaymentWithin'
                            )}
                            value={this.state.paymentTypeSelected}
                          />
                        </Grid.Column>
                        <Grid.Column
                          largeScreen={6}
                          widescreen={6}
                          mobile={14}
                          tablet={7}
                          computer={7}
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
                              precision={2}
                            />
                          </Form.Field>
                          {this.state.errorAmount && (
                            <div style={{ paddingBottom: 10 }}>
                              <label style={{ color: 'red' }}>
                                {this.state.message}
                              </label>
                            </div>
                          )}
                          {this.state.errorAmountWithCommision && (
                            <div className='amountChangeFactor'>
                              <label style={{ fontWeight: 'bold' }}>
                                {this.state.messageComission + ' '}
                              </label>
                              <NumberFormat
                                value={this.state.maxOperationAmount}
                                decimalScale={2}
                                style={{ fontWeight: 'bold' }}
                                displayType={'text'}
                                thousandSeparator={true}
                              />
                              {' ' + this.state.currencySelected}
                            </div>
                          )}
                          {this.state.amountUSD > 0 &&
                            this.state.currencySelected !== 'USD' && (
                              <div>
                                <span className='amountChangeFactor'>
                                  <b>
                                    {this.props.translate(
                                      'sendMoneyClick.equivalentUSD'
                                    )}
                                  </b>
                                  <NumberFormat
                                    value={this.state.amountUSD}
                                    decimalScale={2}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                  />
                                  {' $'}
                                </span>
                              </div>
                            )}

                          {this.state.maxOperationAmount > 0 && (
                            <div>
                              <span className='amountChangeFactor'>
                                <b>
                                  {this.props.translate(
                                    'withdraw.labels.maxSend'
                                  ) + ' '}
                                </b>
                                <NumberFormat
                                  value={this.state.maxOperationAmount}
                                  decimalScale={2}
                                  displayType={'text'}
                                  thousandSeparator={true}
                                />
                                {' ' + this.state.currencySelected}
                              </span>
                            </div>
                          )}
                        </Grid.Column>

                        <Grid.Column
                          largeScreen={2}
                          mobile={1}
                          tablet={1}
                          computer={2}
                        />
                      </Grid.Row>
                    )}
                  {(this.state.paymentTypesOptions.length === 0 ||
                    this.state.paymentTypesOptions.length === 1) &&
                    this.state.maxOperationAmount > 0 &&
                    !this.state.errorOperation && 
                    (!this.state.createPayment || (this.state.hasVerification !== null && this.state.hasVerification)) &&(
                      <Grid.Row>
                        <Grid.Column
                          largeScreen={2}
                          mobile={1}
                          tablet={1}
                          computer={2}
                        />
                        <Grid.Column
                          largeScreen={6}
                          widescreen={6}
                          mobile={14}
                          tablet={7}
                          computer={7}
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
                              precision={2}
                            />
                          </Form.Field>
                          {this.state.errorAmount && (
                            <div style={{ paddingBottom: 10 }}>
                              <label style={{ color: 'red' }}>
                                {this.state.message}
                              </label>
                            </div>
                          )}
                          {this.state.errorAmountWithCommision && (
                            <div className='amountChangeFactor'>
                              <label style={{ fontWeight: 'bold' }}>
                                {this.state.messageComission + ' '}
                              </label>
                              <NumberFormat
                                value={this.state.maxOperationAmount}
                                decimalScale={2}
                                style={{ fontWeight: 'bold' }}
                                displayType={'text'}
                                thousandSeparator={true}
                              />
                              {' ' + this.state.currencySelected}
                            </div>
                          )}
                          {this.state.amountUSD > 0 &&
                            this.state.currencySelected !== 'USD' && (
                              <div>
                                <span className='amountChangeFactor'>
                                  <b>
                                    {this.props.translate(
                                      'sendMoneyClick.equivalentUSD'
                                    )}
                                  </b>
                                  <NumberFormat
                                    value={this.state.amountUSD}
                                    decimalScale={2}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                  />
                                  {' $'}
                                </span>
                              </div>
                            )}

                          {this.state.maxOperationAmount > 0 && (
                            <div>
                              <span className='amountChangeFactor'>
                                <b>
                                  {this.props.translate(
                                    'withdraw.labels.maxSend'
                                  ) + ' '}
                                </b>
                                <NumberFormat
                                  value={this.state.maxOperationAmount}
                                  decimalScale={2}
                                  displayType={'text'}
                                  thousandSeparator={true}
                                />
                                {' ' + this.state.currencySelected}
                              </span>
                            </div>
                          )}
                        </Grid.Column>
                        <Grid.Column
                          largeScreen={6}
                          widescreen={6}
                          mobile={14}
                          tablet={7}
                          computer={7}
                        >
                          <Form.Input
                            fluid
                            label={this.props.translate(
                              'withdraw.modal.description'
                            )}
                            placeholder={this.props.translate(
                              'withdraw.modal.description'
                            )}
                            id='form-input-description'
                            value={this.state.description}
                            onChange={this.handleDescription.bind(this)}
                            name='description'
                            maxLength={50}
                          />
                          {this.state.amountMin > 0 && (
                            <div>
                              <span className='amountChangeFactor'>
                                <b>
                                  {this.props.translate(
                                    'withdraw.labels.headerLimits'
                                  ) + ' '}
                                </b>
                                <NumberFormat
                                  value={this.state.amountMin}
                                  decimalScale={2}
                                  displayType={'text'}
                                  thousandSeparator={true}
                                />
                                {' - '}
                                <NumberFormat
                                  value={this.state.amountMax}
                                  decimalScale={2}
                                  displayType={'text'}
                                  thousandSeparator={true}
                                />
                                {' ' + this.state.currencySelected}
                              </span>
                            </div>
                          )}
                        </Grid.Column>

                        <Grid.Column
                          largeScreen={2}
                          mobile={1}
                          tablet={1}
                          computer={2}
                        />
                      </Grid.Row>
                    )}
                  {this.state.paymentTypesOptions.length > 1 &&
                    !this.state.errorOperation && (!this.state.createPayment || (this.state.hasVerification !== null && this.state.hasVerification)) &&(
                      <Grid.Row>
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
                          computer={12}
                        >
                          <Form.Input
                            fluid
                            label={this.props.translate(
                              'withdraw.modal.description'
                            )}
                            placeholder={this.props.translate(
                              'withdraw.modal.description'
                            )}
                            id='form-input-description'
                            value={this.state.description}
                            onChange={this.handleDescription.bind(this)}
                            name='description'
                            maxLength={50}
                          />
                          {this.state.amountMin > 0 && (
                            <div>
                              <span className='amountChangeFactor'>
                                <b>
                                  {this.props.translate(
                                    'withdraw.labels.headerLimits'
                                  ) + ' '}
                                </b>
                                <NumberFormat
                                  value={this.state.amountMin}
                                  decimalScale={2}
                                  displayType={'text'}
                                  thousandSeparator={true}
                                />
                                {' - '}
                                <NumberFormat
                                  value={this.state.amountMax}
                                  decimalScale={2}
                                  displayType={'text'}
                                  thousandSeparator={true}
                                />
                                {' ' + this.state.currencySelected}
                              </span>
                            </div>
                          )}
                        </Grid.Column>
                        <Grid.Column
                          largeScreen={2}
                          mobile={1}
                          tablet={1}
                          computer={2}
                        />
                      </Grid.Row>
                    )}
                  <Grid.Row>
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
                      computer={12}
                    ></Grid.Column>
                    <Grid.Column
                      largeScreen={2}
                      mobile={1}
                      tablet={1}
                      computer={2}
                    />
                  </Grid.Row>
                </Grid>
              )}
            {this.state.errorOperation && (
              <Grid columns={3}>
                <Grid.Column largeScreen={2} mobile={1} tablet={1} computer={2} />
                <Grid.Column
                  largeScreen={12}
                  mobile={14}
                  tablet={14}
                  computer={14}
                >
                  <div style={{ paddingBottom: 10, textAlign: 'center' }}>
                    <label style={{ color: 'red' }}>{this.state.message}</label>
                  </div>
                </Grid.Column>
                <Grid.Column largeScreen={1} mobile={1} tablet={1} computer={1} />
              </Grid>
            )}
            {this.state.errorAdd === true &&
              this.state.paymentsUserForCurrency.length === 0 && (
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
                        {this.props.translate('withdraw.labels.notCreateAccount')}
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
            {this.state.availableBalanceCurrency > 0 && (!this.state.createPayment 
              || (this.state.hasVerification !== null && this.state.hasVerification)) &&  (
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
                    color='blue'
                    style={isMobile ? { width: 80 } : { width: 150 }}
                    onClick={this.handleSendToPayment.bind(this)}
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
            )}
            {!this.state.formLoad && this.state.availableBalanceCurrency === 0 && (
              <div style={{ flex: 1, textAlign: 'center', paddingTop: 30 }}>
                <label style={{ color: 'red' }}>
                  {this.props.translate('withdraw.labels.notBalance')}
                </label>
              </div>
            )}
          </Form>
          <WithdrawConfirmationModal
            amountUSD={this.state.amountUSD}
            data={this.state.data}
            open={this.state.openModalConfirmation}
            closeModal={this.closeModal.bind(this)}
            reloadFields={this.reloadFields.bind(this)}
            translate={this.props.translate}
          />
        </Segment>
      );
  }
}
export default translate(Withdraw);
