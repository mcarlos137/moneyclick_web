import React, { Component } from 'react';
import {
  Form,
  Header,
  Message,
  Label,
  Segment,
  Container,
  Select,
  Image,
  Button,
  Modal,
  Icon,
  Input,
  Responsive,
  Dropdown,
  Dimmer,
  Loader,
  Grid,
  Divider,
} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import userService from '../../services/user';
import otcService from '../../services/otc';
import model from '../../services/model';
import moneyclickService from '../../services/moneyclick';
import otc from '../../services/otc';
import uuid from 'uuid';
import _ from 'underscore';
import Cookies from 'universal-cookie';
import { parse } from 'query-string';
import RetailService from '../../services/moneyclick';
import { Link } from 'react-router-dom';
import translate from '../../i18n/translate';
import prefits from '../../common/prefits';
import CurrenciesFlag from '../../common/currencyFlag';
import NumberFormat from 'react-number-format';
import {
  osVersion,
  osName,
  fullBrowserVersion,
  browserName,
  mobileVendor,
  mobileModel,
  isMobile,
} from 'react-device-detect';
const recapcha = React.createRef();
const cookies = new Cookies();

class FastChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translator: props.translate,
      typeExchangeSelectedNew: '',
      amountDollarBTC: '',
      amountMoneyClick: '',
      userBTCBalance: 0,
      amountSend: 0,
      factor: 0,
      availableBalanceBase: '',
      balanceMessage: false,
      amountReceive: 0,
      balanceMoneyClick: 0,
      loadForm: false,
      errorAmountCrypto: false,
      showModalFastChange: false,
      existLimits: false,
      daylyLimit: 0,
      monthlyLimit: 0,
      commisionByOperarion: 0,
      confirmMessage: '',
      currencyLabelSelected: '',
      currencySelectedReceive: '',
      currencySend: '',
      imgSend: '',
      currencyReceive: '',
      imgReceive: '',
      currencies: [],
      currenciesReceive: [],
      limitByCurrency: [],
      factorToShow: '',
      factorInverseToShow: '',
      balances: {},
      message: '',
      showMessage: false,
      errorAmountBase: false,
      errorAmountReceive: false,
      fastChangeSucess: false,
      balancesLoader: true,
      showButton: false,
      showSendAmount: false,
      currencyReceiveLoader: false,
      fastChangeBalance: false,
    };
    this.handleChangeCurrencySelect =
      this.handleChangeCurrencySelect.bind(this);
    this.handleChangeCurrencySelectReceive =
      this.handleChangeCurrencySelectReceive.bind(this);
    this.handleAmount = this.handleAmount.bind(this);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.language !== nextProps.language) {
      this.setState({
        translator: nextProps.translate,
      });
    }
  }

  async getCharges() {
    try {
      let body = {
        currency: this.state.currencyLabelSelected,
        amount: this.state.amountSend,
        btcPrice: this.state.factor,
        operationType: 'MC_FAST_CHANGE',
        paymentType: null,
      };

      if (
        body.amount !== null &&
        body.amount !== '' &&
        body.amount !== undefined &&
        body.amount > 0 &&
        body.amount.toString() !== 'NaN'
      ) {
        let responseGetCharges = await otcService._getAllCharguesNewPost(body);
        if (responseGetCharges.data.COMMISSION !== undefined) {
          this.setState({
            commisionByOperarion: responseGetCharges.data.COMMISSION.amount,
          });
        }
      } else {
        this.setState({ showSendAmount: true });
        setTimeout(() => {
          this.setState({
            showSendAmount: false,
          });
        }, 8000);
      }
    } catch (error) {
      console.log(error);
      this.setState({ showSendAmount: true });
      setTimeout(() => {
        this.setState({
          showSendAmount: false,
        });
      }, 8000);
      // this.setState({
      //   commisionByOperarion: 0,
      // });
    }
  }

  handleChangeAmountMoneyClick(e, data) {
    let value = parseFloat(e.target.value);
    let val;
    if (isNaN(value)) {
      val = 0;
    } else {
      val = Number(value);
    }

    this.setState({ amountMoneyClick: val });
  }

  handleClose = () => {
    this.setState({ showModalFastChange: false });
  };
  handleCloseSucess = () => {
    this.setState({
      showModalFastChange: false,
      amountSend: 0,
      factor: 0,
      availableBalanceBase: '',
      balanceMessage: false,
      amountReceive: 0,
      balanceMoneyClick: 0,
      loadForm: false,
      errorAmountCrypto: false,
      showModalFastChange: false,
      existLimits: false,
      daylyLimit: 0,
      monthlyLimit: 0,
      commisionByOperarion: 0,
      confirmMessage: '',
      currencyLabelSelected: '',
      currencySelectedReceive: '',
      currencySend: '',
      imgSend: '',
      currencyReceive: '',
      imgReceive: '',
      currencies: [],
      currenciesReceive: [],
      limitByCurrency: [],
      factorToShow: '',
      factorInverseToShow: '',
      balances: {},
      message: '',
      showMessage: false,
      errorAmountBase: false,
      errorAmountReceive: false,
      fastChangeSucess: false,
      fastChangeBalance: false,
      currencyReceiveLoader: false,
      showSendAmount: false,
      showButton: false,
    });
    this.getCurrencies();
    this.getLimitsOperations();
    this.getBalanceMoneyClick();
  };

  handleOpen = () => {
    if (this.state.amountSend === '' || this.state.amountSend <= 0) {
      this.setState({ showSendAmount: true });
      setTimeout(() => {
        this.setState({
          showSendAmount: false,
        });
      }, 8000);
    } else {
      this.getCharges();
      this.setState({ showModalFastChange: true });
    }
  };

  handleChangeAmountDollarBTC(e, data) {
    let value = parseFloat(e.target.value);
    let val;
    if (isNaN(value)) {
      val = 0;
    } else {
      val = Number(value);
    }

    this.setState({ amountDollarBTC: val });
  }

  async getLimitsOperations() {
    try {
      const response = await otc.getLimitsOfOperations();
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
      this.setState({ limitByCurrency: arrayLimits });
    } catch (error) {
      //  console.log(error);
    }
  }

  async fastChange() {
    try {
      let body = {
        //userName: await AsyncStorage.getItem("username"),
        userName: window.sessionStorage.getItem('username'),
        factor: this.state.factor,
        baseCurrency: this.state.currencyLabelSelected,
        targetCurrency: this.state.currencySelectedReceive,
        amount: this.state.amountSend,
      };

      let responseFastChange = await userService.fastChange(body);

      if (responseFastChange.data === 'OK') {
        this.setState({
          fastChangeSucess: true,
          // message: strings("common.fastChange.modal.success"),
          // showMessage: true,
        });
      } else {
        if (responseFastChange.data === 'DOES NOT HAVE ENOUGH BALANCE') {
          this.setState({
            fastChangeBalance: true,
            // message: strings("common.fastChange.modal.success"),
            // showMessage: true,
          });
        }

        // this.setState(
        //   {
        //     message: strings("common.fastChange.modal.fail"),
        //     showMessage: true,
        //     style: appStyle.operationError,
        //   },
        //   () => {
        //     this.timer = TimerMixin.setTimeout(() => {
        //       this.setState({
        //         showMessage: false,
        //         message: "",
        //       });
        //       TimerMixin.clearTimeout(this.timer);
        //     }, 4000);
        //   },
        // );
      }
    } catch (error) {}
  }

  async getFactor(currency) {
    try {
      let responseFactor;
      if (this.state.currencySelectedReceive !== '') {
        responseFactor = await userService.getFactor(
          this.state.currencyLabelSelected,
          currency
        );
      } else {
        responseFactor = await userService.getFactor(
          this.state.currencyLabelSelected,
          currency
        );
      }

      if (
        responseFactor.data
          .toString()
          .includes('THERE IS NO OFFER FACTOR TO THESE CURRENCIES')
      ) {
        //this.showMessageErrorNotOfferFastChange();
      } else if (
        responseFactor.data.toString().includes('OFFER FACTOR CHANGE')
      ) {
        //this.showMessageErrorOfferFactorChange();
      } else {
        if (responseFactor.data.factor !== undefined) {
          let factorFix;
          let factorStr = responseFactor.data.factor.toString();
          if (factorStr.includes('e')) {
            factorFix = Number(responseFactor.data.factor).toFixed(12);
          } else {
            factorFix = responseFactor.data.factor;
          }
          let factorInverse = 1 / factorFix;
          let factorInverseString;
          factorInverseString = factorInverse.toString();
          if (factorInverseString.includes('e')) {
            factorInverse = Number(factorInverse).toFixed(12);
          }

          this.setState({
            factor: responseFactor.data.factor,
            factorToShow: factorFix,
            factorInverseToShow: factorInverse,
            currencyReceiveLoader: false,
          });
        } else {
          this.setState({
            showMessage: true,
            showButton: true,
            currencyReceiveLoader: false,
          });
        }
      }
    } catch (error) {
      // this.setState({loadSpiner: false});
      // this.showMessageErrorGetFactor();
    }
  }

  setValueLimit(currency) {
    if (this.state.limitByCurrency.length > 0) {
      let findLimitByCurrency = this.state.limitByCurrency.find((element) => {
        return element.currency === currency;
      });

      if (findLimitByCurrency !== undefined) {
        let valueDay, valueMonth;
        if (findLimitByCurrency.day !== undefined) {
          Object.entries(findLimitByCurrency.day).forEach(([key, value]) => {
            if (key === 'MC_FAST_CHANGE') {
              valueDay = value;
            }
          });
        }
        if (findLimitByCurrency.month !== undefined) {
          Object.entries(findLimitByCurrency.month).forEach(([key, value]) => {
            if (key === 'MC_FAST_CHANGE') {
              valueMonth = value;
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

  handleAmount(e, data) {
    if (e.target.name === 'send') {
      while (e.target.value.indexOf(',') !== -1) {
        e.target.value = e.target.value.replace(',', '');
      }
      let value = Number(e.target.value);
      if (
        value === this.state.availableBalanceBase ||
        value <= this.state.availableBalanceBase
      ) {
        this.setState({
          errorAmountBase: false,
          message: '',
        });
        this.setState({ amountSend: e.target.value });
        let calculate;
        if (
          this.state.currencySelectedReceive !== 'BTC' &&
          this.state.currencySelectedReceive !== 'ETH'
        ) {
          calculate = this.floorDecimals(
            e.target.value * this.state.factorToShow,
            2
          );
        } else {
          calculate = this.floorDecimals(
            e.target.value * this.state.factorToShow,
            8
          );
        }
        let toString = calculate.toString();
        if (toString.indexOf('e') === -1) {
          this.setState({ amountReceive: calculate });
        } else {
          this.setState({ amountReceive: 0.0 });
        }
      } else {
        this.setState({
          errorAmountBase: true,
          message: 'fastChange.amountMaxLimitAvalible',
        });
        setTimeout(() => {
          this.setState({
            errorAmountBase: false,
            message: '',
          });
        }, 8000);
      }
    }
    if (e.target.name === 'receive') {
      let compareAmount = Number(e.target.value) / this.state.factorToShow;

      if (compareAmount <= this.state.availableBalanceBase) {
        this.setState({
          amountReceive: Number(e.target.value),
          amountSend: compareAmount,
        });
      } else {
        this.setState({
          //amountReceive: Number(e.target.value),
          // amountSend: compareAmount,
          errorAmountReceive: true,
          message: 'fastChange.amountMaxLimitAvalible',
        });
        setTimeout(() => {
          this.setState({
            errorAmountReceive: false,
            message: '',
          });
        }, 8000);
      }
    }
  }

  getBalanceUserUpdate() {
    let username = userService.getUserName();
    let response = userService.getBalanceUser(username);
    response
      .then((resp) => {
        let acum = 0;
        let acumUSD = 0;
        let result = {
          available: 0,
          availableusd: 0,
          estimated: 0,
        };
        let acumdefered = 0;
        let acumdeferedUsd = 0;
        if (
          resp.data.result.modelBalances !== undefined &&
          resp.data.result.modelBalances.length > 0
        ) {
          for (let val of resp.data.result.modelBalances) {
            for (let data of val.availableAmounts) {
              if (data.currency === 'BTC') {
                acum = acum + parseFloat(data.amount);
              }
              if (data.currency === 'USD') {
                acumUSD = acumUSD + parseFloat(data.amount);
                if (isNaN(acumUSD)) {
                  acumUSD = 0;
                } else {
                  acumUSD = acumUSD;
                }
              }
            }
          }
        }
        let decimales = Math.pow(10, 8);
        let data2 = Math.floor(acum * decimales) / decimales;
        if (isNaN(data2)) {
          data2 = 0;
        } else {
          data2 = data2;
        }
        if (resp.data.result.availableAmounts !== undefined) {
          if (resp.data.result.availableAmounts.length > 0) {
            if (resp.data.result.availableAmounts[0].amount > 0) {
              acumdefered =
                acumdefered +
                Math.floor(
                  resp.data.result.availableAmounts[0].amount * decimales
                ) /
                  decimales;
            } else {
              acumdefered = acumdefered;
            }

            if (resp.data.result.availableAmounts[1].amount > 0) {
              let value = resp.data.result.availableAmounts[1].amount;
              if (isNaN(value)) {
                acumdeferedUsd = 0;
              } else {
                acumdeferedUsd = value;
              }
              //acumdeferedUsd =resp.data.result.availableAmounts[1].amount
            } else {
              acumdeferedUsd = 0;
            }
          }
        }
        if (resp.data.result.deferredAmounts !== undefined) {
          if (resp.data.result.deferredAmounts.length > 0) {
            if (resp.data.result.deferredAmounts[0].amount > 0) {
              acumdefered =
                acumdefered +
                Math.floor(
                  resp.data.result.deferredAmounts[0].amount * decimales
                ) /
                  decimales;
            } else {
              acumdefered = acumdefered;
            }
          }
        }
        result.available = acumdefered;
        result.availableusd = acumdeferedUsd;
        result.estimated = data2;
        let username = userService.getUserName();
        let response = model.getInitialAmounts(username);
        response
          .then((resp) => {
            if (resp.data.length === 0) {
              this.setState({
                userUSDBalance: 0,
                userBTCBalanceNew: 0,
              });
            } else {
              var data = resp.data;
              let acumUSD = 0;
              let acumBTC = 0;
              Object.entries(data).forEach(([index, data]) => {
                if (data.currency === 'USD') {
                  acumUSD = data.amount;
                  if (isNaN(acumUSD)) {
                    acumUSD = 0;
                  }
                }
                if (data.currency === 'BTC') {
                  acumBTC = data.amount;
                  if (isNaN(acumBTC)) {
                    acumBTC = 0;
                  }
                }
              });
            }
          })
          .catch((error) => {
            //console.log(error);
          });

        this.setState({
          userBTCBalance: result,
        });
        window.sessionStorage.setItem('userBalanceBTC', JSON.stringify(result));
      })
      .catch((error) => {
        //console.log(error);
      });
  }

  floorDecimals(value, numberDecimals) {
    let decimales = Math.pow(10, numberDecimals);
    return Math.floor(value * decimales) / decimales;
  }

  getCurrencies() {
    let currenciesData = CurrenciesFlag.currenciesFlag;
    let array = [];
    Object.entries(currenciesData).forEach(([key, value]) => {
      if (key !== 'BTC' && key !== 'ETH' && key !== 'USDT') {
        let ob = {
          value: key,
          text: value.text,
          symbol: value.symbol,
          img: value.img,
          availableBalance: value.availableBalance,
          isCripto: value.isCripto,
          priority: value.priority,
        };

        array.push(ob);
      }
    });

    this.setState({ currencies: array });
  }
  getCurrenciesReceive(currency) {
    let currenciesData = CurrenciesFlag.currenciesFlag;
    let array = [];
    Object.entries(currenciesData).forEach(([key, value]) => {
      if (key !== currency && key !== 'BTC') {
        let ob = {
          value: key,
          text: value.text,
          symbol: value.symbol,
          img: value.img,
          availableBalance: value.availableBalance,
          isCripto: value.isCripto,
          priority: value.priority,
        };

        array.push(ob);
      }
    });

    this.setState({ currenciesReceive: array });
  }
  handleChangeCurrencySelectState(currency) {
    this.setState({
      showMessage: false,
      showButton: false,
      balanceMessage: false,
    });
    this.getCurrenciesReceive(currency);
    let findCurrency = this.state.currencies.find((a) => {
      if (a.value === currency) {
        return a.value;
      }
    });

    this.setState({
      currencyLabelSelected: currency,
      currencySend: findCurrency.text,
      imgSend: findCurrency.img,
    });

    Object.entries(this.state.balances).forEach(([key, value], index) => {
      if (key === currency) {
        if (value.availableBalance !== 0) {
          this.setState({
            availableBalanceBase: value.availableBalance,
          });
        } else {
          this.setState({
            balanceMessage: true,
          });
        }
      }
    });
  }
  handleChangeCurrencySelect(event, data) {
    this.setState({
      currencySelectedReceive: '',
      currencyReceive: '',
      imgReceive: '',
      amountSend: 0,
      amountReceive: 0,
      commisionByOperarion: 0,
    });
    this.handleChangeCurrencySelectState(data.value);
    this.setValueLimit(data.value);
  }
  handleChangeCurrencySelectStateReceive(currency) {
    this.setState({
      currencySelectedReceive: currency,
      amountSend: 0,
      amountReceive: 0,
      commisionByOperarion: 0,
      showMessage: false,
    });
    let findCurrency = this.state.currenciesReceive.find((a) => {
      if (a.value === currency) {
        return a.value;
      }
    });
    this.setState({
      currencyReceive: findCurrency.text,
      imgReceive: findCurrency.img,
    });

    this.getFactor(currency);
  }
  handleChangeCurrencySelectReceive(event, data) {
    this.setState({
      currencyReceiveLoader: true,
      factor: 0,
      factorToShow: '',
      factorInverseToShow: '',
    });

    this.handleChangeCurrencySelectStateReceive(data.value);
  }

  componentDidMount() {
    if (window.sessionStorage.getItem('auth') === 'true') {
      // this.setState({ userBTCBalance: userService.getBalanceStorageUserBTC() }, () => {
      // });
      // this.getBalanceUserUpdate();
      // let user = window.sessionStorage.getItem("username");
      // this.getBalanceMoneyClick(user);
      this.getBalanceMoneyClick();
      this.getCurrencies();
      this.getLimitsOperations();
    }
  }

  getBalanceMoneyClick() {
    let username = window.sessionStorage.getItem('username');
    moneyclickService
      .getBalanceMoneyclick(username)
      .then((resp) => {
        this.setState({
          balances: resp.data,
          balancesLoader: false,
        });
      })
      .catch((error) => {
        //////console.log(error);
      });
  }
  handleTypeExchangeToSelected(e, data) {
    this.setState({
      typeExchangeSelectedNew: data.value,
    });
  }
  handleChangeAmountMoneyClick(e, data) {
    let value = parseFloat(e.target.value);
    let val;
    if (isNaN(value)) {
      val = 0;
    } else {
      val = Number(value);
    }

    this.setState({ amountMoneyClick: val });
  }
  handleChangeAmountDollarBTC(e, data) {
    let value = parseFloat(e.target.value);
    let val;
    if (isNaN(value)) {
      val = 0;
    } else {
      val = Number(value);
    }

    this.setState({ amountDollarBTC: val });
  }
  transferBTC = () => {
    let username = userService.getUserName();
    let amount = 0;
    let typeTransfer = '';

    if (this.state.typeExchangeSelectedNew === 'Moneyclick') {
      amount = this.state.amountMoneyClick;
      typeTransfer = 'TRANSFER_FROM_BALANCE_TO_MCBALANCE';
    }
    if (this.state.typeExchangeSelectedNew === 'DollarBTC') {
      amount = this.state.amountDollarBTC;
      typeTransfer = 'TRANSFER_FROM_MCBALANCE_TO_BALANCE';
    }

    if (
      (this.state.typeExchangeSelectedNew === 'Moneyclick' &&
        amount > this.state.userBTCBalance.available) ||
      (this.state.typeExchangeSelectedNew === 'DollarBTC' &&
        amount > this.state.balanceMoneyClick)
    ) {
      this.setState({
        errorAmountCrypto: true,
        message: 'fastChange.send.failmessage',
      });
      setTimeout(() => {
        this.setState({
          errorAmountCrypto: false,
          message: '',
        });
      }, 6000);
    } else {
      if (amount === 0) {
        this.setState({
          errorAmountCrypto: true,
          message: 'fastChange.send.failmessage2',
        });
        setTimeout(() => {
          this.setState({
            errorAmountCrypto: false,
            message: '',
          });
        }, 6000);
      } else {
        let body = {
          userName: username,
          amount: amount,
          balanceOperationType: typeTransfer,
        };

        userService
          .transferBTC(body)
          .then((res) => {
            if (res.data === 'OK') {
              this.setState({ confirmMessage: 'OK' });
            } else {
              this.setState({ confirmMessage: 'FAIL' });
            }

            if (res.data === 'OK') {
              setTimeout(() => {
                this.props.handleClose();
                this.componentDidMount();
                this.setState({
                  typeExchangeSelectedNew: '',
                  amountDollarBTC: '',
                  amountMoneyClick: '',
                  userBTCBalance: 0,
                  balanceMoneyClick: 0,
                  loadForm: false,
                  errorAmountCrypto: false,
                  confirmMessage: '',
                  message: '',
                });
              }, 3000);
            }
          })
          .catch((error) => {
            //console.log(error);
          });
      }
    }
  };

  render() {
    let t = this.state.translator;
    let labelErrorAmountBase, labelErrorAmountReceive, labelconfirmMessage;

    if (this.state.fastChangeSucess) {
      labelconfirmMessage = (
        <Message info>
          <Message.Header>{t('fastChange.send.success')}</Message.Header>
          <p>{t('fastChange.send.successmessage')}</p>
        </Message>
      );
    }

    if (this.state.fastChangeBalance) {
      labelconfirmMessage = (
        <Message negative>
          <p>{t('fastChange.errorGetBalance')}</p>
        </Message>
      );
    }

    // if (this.state.confirmMessage === "FAIL") {
    //   labelconfirmMessage = (
    //     <Message negative>
    //     <Message.Header>{t("fastChange.send.fail")}</Message.Header>
    //     <p>{t("fastChange.send.failmessage")}</p>
    //   </Message>
    //   );
    // }

    if (this.state.errorAmountBase) {
      labelErrorAmountBase = (
        <Label basic color='red' pointing>
          {t(this.state.message)}
        </Label>
      );
    }

    if (this.state.showSendAmount) {
      labelErrorAmountBase = (
        <Label basic color='red' pointing>
          {t('fastChange.sendAmount')}
        </Label>
      );
    }

    if (this.state.errorAmountReceive) {
      labelErrorAmountReceive = (
        <Label basic color='red' pointing>
          {t(this.state.message)}
        </Label>
      );
    }

    return (
      <div>
        <Responsive minWidth={1000}>
          <Grid>
            <Grid.Column width={2}></Grid.Column>
            <Grid.Column width={12}>
              <Container style={{ marginLeft: '100px' }}>
                {!this.state.balancesLoader && (
                  <Segment color='orange'>
                    <Header textAlign='center'>{t('fastChange.header')}</Header>
                    <Grid>
                      <Grid.Column width={2}></Grid.Column>
                      <Grid.Column width={10}>
                        <Form className='form-login'>
                          <Form.Field inline required>
                            <label>{t('fastChange.currencySend')}</label>
                            <Select
                              placeholder={t('fastChange.currencySend')}
                              fluid
                              single
                              selection
                              options={this.state.currencies}
                              onChange={this.handleChangeCurrencySelect}
                              value={this.state.currencyLabelSelected}
                            />
                          </Form.Field>
                          <Divider hidden></Divider>
                          {this.state.currencyLabelSelected !== '' &&
                            !this.state.balanceMessage && (
                              <Form.Field inline required>
                                <label>{t('fastChange.currencyReceive')}</label>
                                <Select
                                  placeholder={t('fastChange.currencyReceive')}
                                  fluid
                                  single
                                  selection
                                  options={this.state.currenciesReceive}
                                  onChange={
                                    this.handleChangeCurrencySelectReceive
                                  }
                                  value={this.state.currencySelectedReceive}
                                />
                              </Form.Field>
                            )}
                          {this.state.currencyReceiveLoader && (
                            <Loader active inline='centered' />
                          )}
                          {this.state.balanceMessage &&
                            !this.state.currencyReceiveLoader && (
                              <Form.Field>
                                <Message negative>
                                  {/* <Message.Header>We're sorry we can't apply that discount</Message.Header> */}
                                  <p>{t('fastChange.errorGetBalance')}</p>
                                </Message>
                              </Form.Field>
                            )}
                          {this.state.showMessage &&
                            !this.state.currencyReceiveLoader && (
                              <Form.Field>
                                <Message negative>
                                  {/* <Message.Header>We're sorry we can't apply that discount</Message.Header> */}
                                  <p>{t('fastChange.errorGetFactor')}</p>
                                </Message>
                              </Form.Field>
                            )}
                          <Divider hidden></Divider>
                          {this.state.currencySelectedReceive !== '' &&
                            this.state.availableBalanceBase !== 0 &&
                            this.state.availableBalanceBase !== '' &&
                            !this.state.showMessage &&
                            !this.state.currencyReceiveLoader && (
                              <Form.Field>
                                <span>
                                  <strong>
                                    {t('fastChange.balanceCurrency')}
                                  </strong>
                                  {': '}
                                  {this.state.currencyLabelSelected !== 'BTC' &&
                                  this.state.currencyLabelSelected !== 'ETH'
                                    ? this.floorDecimals(
                                        this.state.availableBalanceBase,
                                        2
                                      )
                                    : this.floorDecimals(
                                        this.state.availableBalanceBase,
                                        8
                                      )}{' '}
                                  {this.state.currencyLabelSelected}
                                </span>
                              </Form.Field>
                            )}
                          <Divider hidden></Divider>
                          {this.state.currencySelectedReceive !== '' &&
                            this.state.availableBalanceBase !== 0 &&
                            this.state.availableBalanceBase !== '' &&
                            !this.state.currencyReceiveLoader && (
                              <div>
                                <Grid>
                                  {!this.state.showMessage &&
                                    !this.state.currencyReceiveLoader && (
                                      <Grid.Row>
                                        <Grid.Column width={7}>
                                          <Form.Field required>
                                            <label>
                                              {t('fastChange.amountSend')}
                                              {' ' + this.state.currencySend}
                                            </label>
                                            <Form.Group inline>
                                              <Image
                                                src={this.state.imgSend}
                                                circular
                                                verticalAlign='middle'
                                                size='mini'
                                              />
                                              <NumberFormat
                                                value={this.state.amountSend}
                                                decimalScale={
                                                  this.state
                                                    .currencyLabelSelected !==
                                                    'BTC' &&
                                                  this.state
                                                    .currencyLabelSelected !==
                                                    'ETH'
                                                    ? 2
                                                    : 8
                                                }
                                                placeholder={
                                                  t('fastChange.amountSend') +
                                                  ' ' +
                                                  this.state.currencySend
                                                }
                                                thousandSeparator={false}
                                                allowNegative={false}
                                                onChange={this.handleAmount.bind(
                                                  this
                                                )}
                                                name='send'
                                                style={{ marginLeft: '20px' }}
                                              />
                                            </Form.Group>
                                            {labelErrorAmountBase}
                                          </Form.Field>
                                        </Grid.Column>
                                        <Grid.Column width={2}>
                                          <Icon
                                            name='arrow right'
                                            size='large'
                                            style={{
                                              color: '#055990',
                                              marginTop: 35,
                                            }}
                                          />
                                        </Grid.Column>
                                        <Grid.Column width={7}>
                                          <Form.Field required>
                                            <label>
                                              {t('fastChange.amountReceive')}
                                              {' ' + this.state.currencyReceive}
                                            </label>
                                            <Form.Group inline>
                                              <Image
                                                src={this.state.imgReceive}
                                                circular
                                                verticalAlign='middle'
                                                size='mini'
                                              />
                                              <NumberFormat
                                                value={this.state.amountReceive}
                                                decimalScale={
                                                  this.state
                                                    .currencySelectedReceive !==
                                                    'BTC' &&
                                                  this.state
                                                    .currencySelectedReceive !==
                                                    'ETH'
                                                    ? 2
                                                    : 8
                                                }
                                                placeholder={
                                                  t(
                                                    'fastChange.amountReceive'
                                                  ) +
                                                  ' ' +
                                                  this.state.currencyReceive
                                                }
                                                thousandSeparator={false}
                                                allowNegative={false}
                                                onChange={this.handleAmount.bind(
                                                  this
                                                )}
                                                name='receive'
                                                style={{ marginLeft: '20px' }}
                                              />
                                            </Form.Group>
                                            {labelErrorAmountReceive}
                                          </Form.Field>
                                        </Grid.Column>
                                      </Grid.Row>
                                    )}
                                  {this.state.existLimits &&
                                    !this.state.currencyReceiveLoader && (
                                      <Grid.Row>
                                        <Form.Field
                                          style={{ marginLeft: '15px' }}
                                        >
                                          <h4>
                                            {t('fastChange.headerLimits')}
                                          </h4>
                                          <span>
                                            <strong>
                                              {t('fastChange.dailyLimits')}
                                            </strong>
                                            {': '}
                                            {this.state.daylyLimit}{' '}
                                            {this.state.currencyLabelSelected}
                                          </span>
                                          <br></br>
                                          <span>
                                            <strong>
                                              {t('fastChange.monthlyLimits')}
                                            </strong>
                                            {': '}
                                            {this.state.monthlyLimit}{' '}
                                            {this.state.currencyLabelSelected}
                                          </span>
                                        </Form.Field>
                                      </Grid.Row>
                                    )}
                                </Grid>
                                <Divider hidden></Divider>
                                {!this.state.showMessage &&
                                  !this.state.balanceMessage &&
                                  !this.state.currencyReceiveLoader && (
                                    <div align='right'>
                                      <Button
                                        className='button'
                                        onClick={this.handleOpen}
                                      >
                                        {t('homeLoggedIn.fastChange')}
                                      </Button>
                                    </div>
                                  )}
                              </div>
                            )}
                          {/* <Divider hidden></Divider>
                {!this.state.showMessage && !this.state.balanceMessage && this.state.amountSend > 0 
                && this.state.amountSend !=="" && !this.state.currencyReceiveLoader &&(
                <div align="right">
                <Button className="button"
                onClick={this.handleOpen}>
									{t("homeLoggedIn.fastChange")}
								</Button>
                </div>)} */}
                        </Form>
                      </Grid.Column>
                      <Grid.Column width={2}></Grid.Column>
                    </Grid>
                  </Segment>
                )}
                {this.state.balancesLoader && (
                  <Dimmer active inverted>
                    <Loader size='large'></Loader>
                  </Dimmer>
                )}
                <Divider hidden></Divider>
                <Divider></Divider>
                <Divider hidden></Divider>
                <Segment color='orange'>
                  <Header textAlign='center'>{t('fastChange.header')}</Header>
                  <Grid>
                    <Grid.Column width={2}></Grid.Column>
                    <Grid.Column width={10}>
                      <Form className='form-login'>
                        <Form.Field inline required>
                          <label>{t('fastChange.currencySend')}</label>
                          <Select
                            placeholder={t('fastChange.currencySend')}
                            fluid
                            single
                            selection
                            options={this.state.currencies}
                            onChange={this.handleChangeCurrencySelect}
                            value={this.state.currencyLabelSelected}
                          />
                        </Form.Field>
                        <Divider hidden></Divider>
                        {this.state.currencyLabelSelected !== '' &&
                          !this.state.balanceMessage && (
                            <Form.Field inline required>
                              <label>{t('fastChange.currencyReceive')}</label>
                              <Select
                                placeholder={t('fastChange.currencyReceive')}
                                fluid
                                single
                                selection
                                options={this.state.currenciesReceive}
                                onChange={
                                  this.handleChangeCurrencySelectReceive
                                }
                                value={this.state.currencySelectedReceive}
                              />
                            </Form.Field>
                          )}
                        {this.state.currencyReceiveLoader && (
                          <Loader active inline='centered' />
                        )}
                        {this.state.balanceMessage &&
                          !this.state.currencyReceiveLoader && (
                            <Form.Field>
                              <Message negative>
                                {/* <Message.Header>We're sorry we can't apply that discount</Message.Header> */}
                                <p>{t('fastChange.errorGetBalance')}</p>
                              </Message>
                            </Form.Field>
                          )}
                        {this.state.showMessage &&
                          !this.state.currencyReceiveLoader && (
                            <Form.Field>
                              <Message negative>
                                {/* <Message.Header>We're sorry we can't apply that discount</Message.Header> */}
                                <p>{t('fastChange.errorGetFactor')}</p>
                              </Message>
                            </Form.Field>
                          )}
                        <Divider hidden></Divider>
                        {this.state.currencySelectedReceive !== '' &&
                          this.state.availableBalanceBase !== 0 &&
                          this.state.availableBalanceBase !== '' &&
                          !this.state.showMessage &&
                          !this.state.currencyReceiveLoader && (
                            <Form.Field>
                              <span>
                                <strong>
                                  {t('fastChange.balanceCurrency')}
                                </strong>
                                {': '}
                                {this.state.currencyLabelSelected !== 'BTC' &&
                                this.state.currencyLabelSelected !== 'ETH'
                                  ? this.floorDecimals(
                                      this.state.availableBalanceBase,
                                      2
                                    )
                                  : this.floorDecimals(
                                      this.state.availableBalanceBase,
                                      8
                                    )}{' '}
                                {this.state.currencyLabelSelected}
                              </span>
                            </Form.Field>
                          )}
                        <Divider hidden></Divider>
                        {this.state.currencySelectedReceive !== '' &&
                          this.state.availableBalanceBase !== 0 &&
                          this.state.availableBalanceBase !== '' &&
                          !this.state.currencyReceiveLoader && (
                            <div>
                              <Grid>
                                {!this.state.showMessage &&
                                  !this.state.currencyReceiveLoader && (
                                    <Grid.Row>
                                      <Grid.Column width={7}>
                                        <Form.Field required>
                                          <label>
                                            {t('fastChange.amountSend')}
                                            {' ' + this.state.currencySend}
                                          </label>
                                          <Form.Group inline>
                                            <Image
                                              src={this.state.imgSend}
                                              circular
                                              verticalAlign='middle'
                                              size='mini'
                                            />
                                            <NumberFormat
                                              value={this.state.amountSend}
                                              decimalScale={
                                                this.state
                                                  .currencyLabelSelected !==
                                                  'BTC' &&
                                                this.state
                                                  .currencyLabelSelected !==
                                                  'ETH'
                                                  ? 2
                                                  : 8
                                              }
                                              placeholder={
                                                t('fastChange.amountSend') +
                                                ' ' +
                                                this.state.currencySend
                                              }
                                              thousandSeparator={false}
                                              allowNegative={false}
                                              onChange={this.handleAmount.bind(
                                                this
                                              )}
                                              name='send'
                                              style={{ marginLeft: '20px' }}
                                            />
                                          </Form.Group>
                                          {labelErrorAmountBase}
                                        </Form.Field>
                                      </Grid.Column>
                                      <Grid.Column width={2}>
                                        <Icon
                                          name='arrow right'
                                          size='large'
                                          style={{
                                            color: '#055990',
                                            marginTop: 35,
                                          }}
                                        />
                                      </Grid.Column>
                                      <Grid.Column width={7}>
                                        <Form.Field required>
                                          <label>
                                            {t('fastChange.amountReceive')}
                                            {' ' + this.state.currencyReceive}
                                          </label>
                                          <Form.Group inline>
                                            <Image
                                              src={this.state.imgReceive}
                                              circular
                                              verticalAlign='middle'
                                              size='mini'
                                            />
                                            <NumberFormat
                                              value={this.state.amountReceive}
                                              decimalScale={
                                                this.state
                                                  .currencySelectedReceive !==
                                                  'BTC' &&
                                                this.state
                                                  .currencySelectedReceive !==
                                                  'ETH'
                                                  ? 2
                                                  : 8
                                              }
                                              placeholder={
                                                t('fastChange.amountReceive') +
                                                ' ' +
                                                this.state.currencyReceive
                                              }
                                              thousandSeparator={false}
                                              allowNegative={false}
                                              onChange={this.handleAmount.bind(
                                                this
                                              )}
                                              name='receive'
                                              style={{ marginLeft: '20px' }}
                                            />
                                          </Form.Group>
                                          {labelErrorAmountReceive}
                                        </Form.Field>
                                      </Grid.Column>
                                    </Grid.Row>
                                  )}
                                {this.state.existLimits &&
                                  !this.state.currencyReceiveLoader && (
                                    <Grid.Row>
                                      <Form.Field
                                        style={{ marginLeft: '15px' }}
                                      >
                                        <h4>{t('fastChange.headerLimits')}</h4>
                                        <span>
                                          <strong>
                                            {t('fastChange.dailyLimits')}
                                          </strong>
                                          {': '}
                                          {this.state.daylyLimit}{' '}
                                          {this.state.currencyLabelSelected}
                                        </span>
                                        <br></br>
                                        <span>
                                          <strong>
                                            {t('fastChange.monthlyLimits')}
                                          </strong>
                                          {': '}
                                          {this.state.monthlyLimit}{' '}
                                          {this.state.currencyLabelSelected}
                                        </span>
                                      </Form.Field>
                                    </Grid.Row>
                                  )}
                              </Grid>
                              <Divider hidden></Divider>
                              {!this.state.showMessage &&
                                !this.state.balanceMessage &&
                                !this.state.currencyReceiveLoader && (
                                  <div align='right'>
                                    <Button
                                      className='button'
                                      onClick={this.handleOpen}
                                    >
                                      {t('homeLoggedIn.fastChange')}
                                    </Button>
                                  </div>
                                )}
                            </div>
                          )}
                        {/* <Divider hidden></Divider>
                {!this.state.showMessage && !this.state.balanceMessage && this.state.amountSend > 0 
                && this.state.amountSend !=="" && !this.state.currencyReceiveLoader &&(
                <div align="right">
                <Button className="button"
                onClick={this.handleOpen}>
									{t("homeLoggedIn.fastChange")}
								</Button>
                </div>)} */}
                      </Form>
                    </Grid.Column>
                    <Grid.Column width={2}></Grid.Column>
                  </Grid>
                </Segment>
              </Container>
            </Grid.Column>
            <Grid.Column width={2}></Grid.Column>
          </Grid>
          <Modal
            open={this.state.showModalFastChange}
            onClose={this.handleClose}
            closeIcon
            size='tiny'
          >
            <Header content={t('fastChange.dataOperation')} />
            <Modal.Content>
              {this.state.fastChangeSucess === false &&
                this.state.fastChangeBalance === false && (
                  <Form widths='equal' className='form-login' error unstackable>
                    <Form.Field width={10}>
                      <label>{t('fastChange.modal.amountSend')}</label>
                      <span>
                        {this.state.currencyLabelSelected !== 'BTC' &&
                        this.state.currencyLabelSelected !== 'ETH'
                          ? this.floorDecimals(this.state.amountSend, 2)
                          : this.floorDecimals(this.state.amountSend, 8)}{' '}
                        {this.state.currencyLabelSelected}
                      </span>
                    </Form.Field>
                    <Form.Field width={10}>
                      <label>{t('fastChange.modal.changeFactor')}</label>
                      <span>
                        1 {this.state.currencyLabelSelected}
                        {' = '}
                        {this.floorDecimals(this.state.factorToShow, 2)}{' '}
                        {this.state.currencySelectedReceive}
                      </span>
                      <br></br>
                      <span>
                        1 {this.state.currencySelectedReceive}
                        {' = '}
                        {this.floorDecimals(
                          this.state.factorInverseToShow,
                          2
                        )}{' '}
                        {this.state.currencyLabelSelected}
                      </span>
                    </Form.Field>
                    <Form.Field width={10}>
                      <label>{t('fastChange.modal.amountReceive')}</label>
                      <span>
                        {this.state.currencySelectedReceive !== 'BTC' &&
                        this.state.currencySelectedReceive !== 'ETH'
                          ? this.floorDecimals(this.state.amountReceive, 2)
                          : this.floorDecimals(
                              this.state.amountReceive,
                              8
                            )}{' '}
                        {this.state.currencySelectedReceive}
                      </span>
                    </Form.Field>
                    {this.state.commisionByOperarion !== 0 && (
                      <Form.Field width={10}>
                        <label>{t('fastChange.modal.Commission')}</label>
                        <span>
                          {this.floorDecimals(
                            this.state.commisionByOperarion,
                            8
                          )}{' '}
                          {this.state.currencyLabelSelected}
                        </span>
                      </Form.Field>
                    )}
                  </Form>
                )}
              {(this.state.fastChangeSucess ||
                this.state.fastChangeBalance) && (
                <Grid>
                  <Grid.Column width={2}></Grid.Column>
                  <Grid.Column width={12}>{labelconfirmMessage}</Grid.Column>
                  <Grid.Column width={2}></Grid.Column>
                </Grid>
              )}
            </Modal.Content>
            {this.state.fastChangeSucess === false &&
              this.state.fastChangeBalance === false && (
                <Modal.Actions className='actions-login'>
                  <Button
                    floated='center'
                    color='blue'
                    onClick={this.fastChange.bind(this)}
                  >
                    {t('fastChange.modal.accept')}
                  </Button>
                  <Button
                    className='button-secundary'
                    onClick={this.handleClose}
                  >
                    {t('fastChange.modal.cancel')}
                  </Button>
                </Modal.Actions>
              )}
            {(this.state.fastChangeSucess || this.state.fastChangeBalance) && (
              <Modal.Actions className='actions-login'>
                <Button
                  floated='right'
                  color='blue'
                  style={{ marginLeft: 40 }}
                  onClick={this.handleCloseSucess}
                >
                  {t('fastChange.modal.accept')}
                </Button>
                <Divider hidden></Divider>
              </Modal.Actions>
            )}
          </Modal>
        </Responsive>
      </div>
    );
  }
}
export default translate(FastChange);
