import { Component } from "react";
import {
  Grid,
  Form,
  Button,
  Header,
  Image,
  Modal,
  Label,
  Divider,
  Segment,
  Loader,
  Message,
  Container,
  Select,
} from "semantic-ui-react";
import React from "react";
import CurrencyInput from "react-currency-input";
import "./FastChangeCurrencies.css";
import mcIcon from "../../img/splash_mc.jpg";
import { isMobile } from "react-device-detect";
import translate from "../../i18n/translate";
import CurrenciesFlag from "../../common/currencyFlag";
import otcService from "../../services/otc";
import userService from "../../services/user";
import RetailService from "../../services/moneyclick";
import NumberFormat from "react-number-format";
import icon from "../../img/icn-inactivo-comprar.png";

class FastChangeCurrencies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translator: props.translate,
      errorInRed: false,
      formLoad: true,
      balances: {},
      currencies: [],
      currencySelectedReceive: "",
      currencyReceive: "",
      imgReceive: "",
      amountSend: 0,
      amountReceive: 0,
      showMessage: false,
      showButton: false,
      balanceMessage: false,
      currencyLabelSelected: "",
      currencySend: "",
      imgSend: "",
      imgSimbSend: "",
      availableBalanceBase: "",
      currenciesReceive: [],
      existLimits: false,
      daylyLimit: 0,
      monthlyLimit: 0,
      limitByCurrency: [],
      currencyReceiveLoader: false,
      factor: 0,
      factorToShow: "",
      factorInverseToShow: "",
      commisionByOperarion: 0,
      showButton: true,
      disabledReceive: true,
      showModalFastChange: false,
      buttonLoader: false,
      fastChangeLimitDayly: false,
      fastChangeLimitMonthly: false,
      user: window.sessionStorage.getItem("username"),
    };
    this.handleChangeCurrencySelect = this.handleChangeCurrencySelect.bind(
      this
    );
    this.handleChangeCurrencySelectReceive = this.handleChangeCurrencySelectReceive.bind(
      this
    );
    this.handleAmount = this.handleAmount.bind(this);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.language !== nextProps.language) {
      this.setState({
        translator: nextProps.translate,
      });
    }
  }
  componentWillMount() {
    this.getBalance();
  }
  componentDidMount() {
    this.getLimitsOperations();
  }
  getBalance() {
    if (this.state.user !== null) {
      RetailService.getBalanceMoneyclick(this.state.user)
        .then(async (resp) => {
          try {
            let currenciesColOne = [];
            const currencies = await otcService.getCurrencies();
            let currenciesArray = [];
            currenciesArray = currencies.data;
            currenciesArray = currenciesArray.filter((curren) => {
              return curren.active === true;
            });
            let orderCurrency = await otcService.getOrdersCurrencys(
              this.state.user
            );
            Object.entries(resp.data).forEach(([key, value]) => {
              let objCurrency = {};
              if (
                key !== "usdEstimatedBalance" &&
                key !== "btcEstimatedBalance" &&
                key !== "BTC" && key !== 'ETH' && key !== 'USDT'
              ) {
                //if (key !== "BTC") {
                  let findCurren = currenciesArray.find((currency) => {
                    return currency.shortName === key;
                  });
                  if (findCurren !== undefined) {
                    let findCurrency = CurrenciesFlag.currenciesFlag[key];
                    if (findCurrency !== undefined) {
                      let indexPosition = orderCurrency.data.indexOf(key);
                      if (indexPosition !== -1) {
                        objCurrency.priority = indexPosition + 1;
                      }
                      objCurrency.value = key;
                      if (value.availableBalance !== 0) {
                        // const formatter = new Intl.NumberFormat('en-US', {
                        //   currency: key,
                        // });
                        objCurrency.text =
                          findCurrency.text +
                          " / " +
                          this.state.translator("fastChange.balanceCurrency") +
                          this.floorDecimals(
                            value.availableBalance,
                            2
                          ).toLocaleString("en-US", {
                            maximumFractionDigits: 2,
                          });
                      } else {
                        objCurrency.text = findCurrency.text;
                      }
                      objCurrency.textShort = findCurrency.text;
                      objCurrency.currency = key;
                      objCurrency.balance = value.availableBalance;
                      objCurrency.balanceUsd = value.usdEstimatedBalance;
                      objCurrency.img = findCurrency.img;
                      objCurrency.symbol = findCurrency.symbol;
                      objCurrency.btcBuyPrice =
                        value.btcBuyPrice !== null ? value.btcBuyPrice : 0;
                      objCurrency.btcSellPrice =
                        value.btcSellPrice !== null ? value.btcSellPrice : 0;
                      if (
                        value.btcBuyPrice !== null &&
                        value.btcSellPrice !== null
                      ) {
                        objCurrency.btcBuyMinAmount = value.btcBuyMinAmount;
                        objCurrency.btcBuyMaxAmount = value.btcBuyMaxAmount;
                        objCurrency.btcSellMinAmount = value.btcSellMinAmount;
                        objCurrency.btcSellMaxAmount = value.btcSellMaxAmount;

                        currenciesColOne.push(objCurrency);
                      } else {
                        currenciesColOne.push(objCurrency);
                      }
                    } else {
                      let currenData = {
                        key: key.toLowerCase(),
                        value: key,
                        flag: key.toLowerCase(),
                        textShort: findCurren.fullName,
                        img: mcIcon,
                        alias: key,
                        isCripto: false,
                        symbol: " ",
                        priority: 20,
                      };
                      let indexPosition = orderCurrency.data.indexOf(key);
                      if (indexPosition !== -1) {
                        currenData.priority = indexPosition + 1;
                      }
                      if (value.availableBalance !== 0) {
                        // const formatter = new Intl.NumberFormat('en-US', {
                        //   currency: key,
                        // });
                        currenData.text =
                          findCurren.fullName +
                          " / " +
                          this.state.translator("fastChange.balanceCurrency") +
                          this.floorDecimals(
                            value.availableBalance,
                            2
                          ).toLocaleString("en-US", {
                            maximumFractionDigits: 2,
                          });
                      } else {
                        currenData.text = findCurren.fullName;
                      }
                      currenData.availableBalance = value.availableBalance;
                      currenData.estimatedBalance = value.estimatedBalance;
                      currenData.btcBuyPrice =
                        value.btcBuyPrice !== null ? value.btcBuyPrice : 0;
                      currenData.btcSellPrice =
                        value.btcSellPrice !== null ? value.btcSellPrice : 0;
                      currenciesColOne.push(currenData);
                    }
                  }
                /*} else {
                  let findCurrency = CurrenciesFlag.currenciesFlag[key];
                  if (findCurrency !== undefined) {
                    let indexPosition = orderCurrency.data.indexOf(key);
                    if (indexPosition !== -1) {
                      objCurrency.priority = indexPosition + 1;
                    }
                    objCurrency.value = key;
                    if (value.availableBalance !== 0) {
                      // const formatter = new Intl.NumberFormat('en-US', {
                      //   currency: key,
                      //   maximumFractionDigits: 8,
                      // });
                      objCurrency.text =
                        findCurrency.text +
                        " / " +
                        this.state.translator("fastChange.balanceCurrency") +
                        value.availableBalance.toLocaleString("en-US", {
                          maximumFractionDigits: 8,
                        });
                    } else {
                      objCurrency.text = findCurrency.text;
                    }
                    objCurrency.textShort = findCurrency.text;
                    objCurrency.currency = key;
                    objCurrency.balance = value.availableBalance;
                    objCurrency.balanceUsd = value.usdEstimatedBalance;
                    objCurrency.img = findCurrency.img;
                    objCurrency.symbol = findCurrency.symbol;
                    currenciesColOne.push(objCurrency);
                  }
                }*/
              }
            });
            currenciesColOne = currenciesColOne.sort((a, b) => {
              return a.priority - b.priority;
            });
            //	console.log("currenciesColOne:", currenciesColOne);
            this.setState({
              currencies: currenciesColOne,
              formLoad: false,
            });
          } catch (error) {
            console.log(error);
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({ errorInRed: true, formLoad: false });
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
          if (inerKey === "dayly" && inerValue.normal !== undefined) {
            limit.day = inerValue.normal;
          } else if (inerKey === "monthly" && inerValue.normal !== undefined) {
            limit.month = inerValue.normal;
          }
        });
        arrayLimits.push(limit);
      });
      this.setState({ limitByCurrency: arrayLimits });
    } catch (error) {
      console.log(error);
      this.setState({ errorInRed: true, formLoad: false });
    }
  }
  handleChangeCurrencySelect(event, data) {
    this.setState({
      currencySelectedReceive: "",
      currencyReceive: "",
      imgReceive: "",
      amountSend: 0,
      amountReceive: 0,
      commisionByOperarion: 0,
      disabledReceive: false,
    });
    this.handleChangeCurrencySelectState(data.value);
    this.setValueLimit(data.value);
  }

  handleChangeCurrencySelectState(currency) {
    this.setState({
      showMessage: false,
      showButton: false,
      balanceMessage: false,
    });
    let findCurrency = this.state.currencies.find((a) => {
      if (a.value === currency) {
        return a.value;
      }
    });

    this.setState({
      currencyLabelSelected: currency,
      currencySend: findCurrency.textShort,
      imgSend: findCurrency.img,
      imgSimbSend: findCurrency.symbol,
      availableBalanceBase: findCurrency.balance,
    });

    let currenciesColOne = [];
    Object.entries(this.state.currencies).forEach(([key, value], index) => {
      let objCurrency = {};
      if (value.currency === currency) {
        if (value.balance === 0) {
          //   this.setState({
          //     balanceMessage: true,
          //     disabledReceive: true,
          //   });
        }
      } else {
        objCurrency.value = value.currency;
        objCurrency.text = value.textShort;
        objCurrency.img = value.img;
        currenciesColOne.push(objCurrency);
      }
    });
    this.setState({
      currenciesReceive: currenciesColOne,
    });
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
            if (key === "MC_FAST_CHANGE") {
              valueDay = value;
            }
          });
        }
        if (findLimitByCurrency.month !== undefined) {
          Object.entries(findLimitByCurrency.month).forEach(([key, value]) => {
            if (key === "MC_FAST_CHANGE") {
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

  handleChangeCurrencySelectReceive(event, data) {
    this.setState({
      currencyReceiveLoader: true,
      factor: 0,
      factorToShow: "",
      factorInverseToShow: "",
    });

    this.getCharges(this.state.availableBalanceBase, data.value);
    this.handleChangeCurrencySelectStateReceive(data.value);
  }

  handleChangeCurrencySelectStateReceive(currency) {
    this.setState({
      currencySelectedReceive: currency,
      amountSend: 0,
      amountReceive: 0,
      // commisionByOperarion:0,
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
  async getFactor(currency) {
    try {
      let responseFactor;
      responseFactor = await userService.getFactor(
        this.state.currencyLabelSelected,
        currency
      );
      if (
        responseFactor.data
          .toString()
          .includes("THERE IS NO OFFER FACTOR TO THESE CURRENCIES")
      ) {
        //this.showMessageErrorNotOfferFastChange();
        console.log("THERE IS NO OFFER FACTOR TO THESE CURRENCIES");
      } else if (
        responseFactor.data.toString().includes("OFFER FACTOR CHANGE")
      ) {
        //this.showMessageErrorOfferFactorChange();
        console.log("OFFER FACTOR CHANGE");
      } else {
        if (responseFactor.data.factor !== undefined) {
          this.setState({
            avalilableToChange:
              this.state.availableBalanceBase - this.state.commisionByOperarion,
          });
          let factorFix;
          let factorStr = responseFactor.data.factor.toString();
          
          if (factorStr.includes("e")) {
            factorFix = Number(responseFactor.data.factor).toFixed(12);
          } else {
            factorFix = responseFactor.data.factor;
          }
          let factorInverse = 1 / responseFactor.data.factor;
          let factorInverseString;
          factorInverseString = factorInverse.toString();
          if (factorInverseString.includes("e")) {
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
      console.log(error);
      this.setState({
        errorInRed: true,
        formLoad: false,
        currencyReceiveLoader: false,
      });
    }
  }
  handleAmount(e, data) {
    if (e.target.name === "send") {
      while (e.target.value.indexOf(",") !== -1) {
        e.target.value = e.target.value.replace(",", "");
      }

      let calculate = e.target.value * this.state.factorToShow;
      let valString = calculate.toString();
      let valueToShow;
      if (valString.includes("e")) {
        valueToShow = Number(calculate).toFixed(12);
      } else {
        valueToShow = calculate;
      }
      this.setState({
        amountSend: e.target.value,
        amountReceive: valueToShow,
      });
    }
    if (e.target.name === "receive") {
      while (e.target.value.indexOf(",") !== -1) {
        e.target.value = e.target.value.replace(",", "");
      }
      let compareAmount = e.target.value / this.state.factorToShow;
      let valString = compareAmount.toString();
      let valueToShow;
      if (valString.includes("e")) {
        valueToShow = Number(compareAmount).toFixed(12);
      } else {
        valueToShow = compareAmount;
      }
      this.setState({
        amountReceive: e.target.value,
        amountSend: valueToShow,
      });
    }
  }
  floorDecimals(value, numberDecimals) {
    let decimales = Math.pow(10, numberDecimals);
    return Math.floor(value * decimales) / decimales;
  }
  handleOpen = () => {
    if (this.state.amountSend === "" || this.state.amountSend <= 0) {
      this.setState({ showSendAmount: true });
      setTimeout(() => {
        this.setState({
          showSendAmount: false,
        });
      }, 8000);
    }
    if (this.state.amountSend > this.state.avalilableToChange) {
      this.setState({
        errorAmountBase: true,
        message: "fastChange.amountMaxLimitAvalible",
      });
      setTimeout(() => {
        this.setState({
          errorAmountBase: false,
          message: "",
        });
      }, 8000);
    } else if (
      this.state.existLimits &&
      this.state.amountSend >= this.state.daylyLimit
    ) {
      this.setState({ showSendAmountLimit: true });
      setTimeout(() => {
        this.setState({
          showSendAmountLimit: false,
        });
      }, 8000);
    } else {
      this.getCharges(
        this.state.amountSend,
        this.state.currencySelectedReceive
      );
      this.setState({ showModalFastChange: true });
    }
  };

  handleClose = () => {
    this.setState({ showModalFastChange: false });
  };

  async getCharges(amount, tarjetCurrency) {
    try {
      //console.log(amount)
      let body = {
        currency: this.state.currencyLabelSelected,
        amount: amount,
        btcPrice: this.state.factor,
        operationType: "MC_FAST_CHANGE",
        paymentType: null,
        targetCurrency: tarjetCurrency,
      };
      if (
        body.amount !== null &&
        body.amount !== "" &&
        body.amount > 0 &&
        body.amount !== undefined &&
        body.amount.toString() !== "NaN"
      ) {
        let responseGetCharges = await otcService._getAllCharguesNewPost(body);

        if (responseGetCharges.data.COMMISSION !== undefined) {
          let commission = 0;
          if (responseGetCharges.data.COMMISSION.toString().includes("e")) {
            commission = Number(
              responseGetCharges.data.COMMISSION.amount
            ).toFixed(12);
          } else {
            commission = responseGetCharges.data.COMMISSION.amount;
          }
          this.setState({
            commisionByOperarion: commission,
            currencyReceiveLoader: false,
          });
        }
      } else {
        this.setState({
          commisionByOperarion: 0,
          // errorInRed: true,
          formLoad: false,
          currencyReceiveLoader: false,
        });
      }
    } catch (error) {
      console.log(error);
      this.setState({
        commisionByOperarion: 0,
        errorInRed: true,
        formLoad: false,
        currencyReceiveLoader: false,
      });
    }
  }

  async fastChange() {
    this.setState({
      buttonLoader: true,
    });
    try {
      let body = {
        userName: window.sessionStorage.getItem("username"),
        factor: this.state.factor,
        baseCurrency: this.state.currencyLabelSelected,
        targetCurrency: this.state.currencySelectedReceive,
        amount: this.state.amountSend,
      };

      let responseFastChange = await userService.fastChange(body);

      if (responseFastChange.data === "OK") {
        this.setState({
          fastChangeSucess: true,
          buttonLoader: false,
        });
      } else {
        if (responseFastChange.data === "DOES NOT HAVE ENOUGH BALANCE") {
          this.setState({
            fastChangeBalance: true,
            buttonLoader: false,
          });
        } else {
          if (responseFastChange.data === "USER DAYLY LIMIT REACHED") {
            this.setState({
              fastChangeLimitDayly: true,
              buttonLoader: false,
            });
          }

          if (responseFastChange.data === "USER MONTHLY LIMIT REACHED") {
            this.setState({
              fastChangeLimitMonthly: true,
              buttonLoader: false,
            });
          }
        }
      }
    } catch (error) {
      this.setState({ errorInRed: true, formLoad: false });
    }
  }

  handleCloseSucess = () => {
    this.setState({
      showModalFastChange: false,
      errorInRed: false,
      formLoad: true,
      amountSend: 0,
      factor: 0,
      availableBalanceBase: "",
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
      confirmMessage: "",
      currencyLabelSelected: "",
      currencySelectedReceive: "",
      currencySend: "",
      imgSend: "",
      currencyReceive: "",
      imgReceive: "",
      currencies: [],
      currenciesReceive: [],
      limitByCurrency: [],
      factorToShow: "",
      factorInverseToShow: "",
      balances: {},
      message: "",
      showMessage: false,
      errorAmountBase: false,
      errorAmountReceive: false,
      fastChangeSucess: false,
      fastChangeBalance: false,
      fastChangeLimitDayly: false,
      fastChangeLimitMonthly: false,
      currencyReceiveLoader: false,
      showSendAmount: false,
      showSendAmountLimit: false,
      showButton: false,
      avalilableToChange: "",
      disabledReceive: true,
      buttonLoader: false,
    });
    this.getLimitsOperations();
    this.getBalance();
  };

  render() {
    let t = this.state.translator;
    let labelErrorAmountBase,
      labelErrorAmountReceive,
      labelconfirmMessage,
      labelErrorBalance;
    if (this.state.errorAmountBase) {
      labelErrorAmountBase = (
        <Label basic color="red" pointing>
          {t(this.state.message)}
        </Label>
      );
    }

    if (this.state.showSendAmount) {
      labelErrorAmountBase = (
        <Label basic color="red" pointing>
          {t("fastChange.sendAmount")}
        </Label>
      );
    }

    if (this.state.showSendAmountLimit) {
      labelErrorAmountBase = (
        <Label basic color="red" pointing>
          {t("fastChange.sendAmountLimit")}
        </Label>
      );
    }

    if (this.state.errorAmountReceive) {
      labelErrorAmountReceive = (
        <Label basic color="red" pointing>
          {t(this.state.message)}
        </Label>
      );
    }

    if (this.state.fastChangeSucess) {
      labelconfirmMessage = (
        <Message info>
          <Message.Header>{t("fastChange.send.success")}</Message.Header>
          <p>{t("fastChange.send.successmessage")}</p>
        </Message>
      );
    }

    if (this.state.fastChangeBalance) {
      console.log(this.state.fastChangeBalance);
      labelErrorBalance = (
        <Message negative>
          <p>
            {t("fastChange.errorGetBalance") +
              this.floorDecimals(this.state.avalilableToChange, 2) +
              " " +
              this.state.currencyLabelSelected}
          </p>
        </Message>
      );
    }
    if (this.state.fastChangeLimitDayly) {
      labelconfirmMessage = (
        <Message negative>
          <p>{t("fastChange.errorGetDayly")}</p>
        </Message>
      );
    }
    if (this.state.fastChangeLimitMonthly) {
      labelconfirmMessage = (
        <Message negative>
          <p>{t("fastChange.errorGetMonthly")}</p>
        </Message>
      );
    }

    return (
      <Segment loading={this.state.formLoad} basic>
        <Divider hidden />
        {this.state.errorInRed && (
          <Grid columns="equal">
            <Grid.Column largeScreen={2} computer={1} widescreen={2} />
            <Grid.Column largeScreen={12} computer={14} widescreen={12}>
              <Message
                info
                content={t("profile.walletAccount.messages.errorInRed")}
              />
            </Grid.Column>
            <Grid.Column largeScreen={2} computer={1} widescreen={2} />
          </Grid>
        )}
        {!this.state.errorInRed && (
          <div>
            <Grid columns="equal">
              <Grid.Column largeScreen={2} computer={1} widescreen={2} />

              <Grid.Column largeScreen={12} computer={14} widescreen={12}>
                <Segment inverted textAlign="left" className="titleComponents">
                  <h4 className="headerComponent">{t("fastChange.header")}</h4>
                </Segment>
                <Divider hidden></Divider>
                <Form error>
                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column
                        largeScreen={7}
                        mobile={16}
                        tablet={7}
                        computer={7}
                      >
                        <Form.Field inline required>
                          <label>{t("fastChange.currencySend")}</label>
                          <Select
                            placeholder={t("fastChange.currencySend")}
                            fluid
                            single
                            selection
                            options={this.state.currencies}
                            onChange={this.handleChangeCurrencySelect}
                            value={this.state.currencyLabelSelected}
                          />
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column
                        largeScreen={2}
                        mobile={16}
                        tablet={2}
                        computer={2}
                      ></Grid.Column>
                      <Grid.Column
                        largeScreen={7}
                        mobile={16}
                        tablet={7}
                        computer={7}
                      >
                        <Form.Field inline required>
                          <label>{t("fastChange.currencyReceive")}</label>
                          <Select
                            placeholder={t("fastChange.currencyReceive")}
                            disabled={this.state.disabledReceive}
                            fluid
                            single
                            selection
                            options={this.state.currenciesReceive}
                            onChange={this.handleChangeCurrencySelectReceive}
                            value={this.state.currencySelectedReceive}
                          />
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                    {this.state.currencyReceiveLoader && (
                      <Loader active inline="centered" />
                    )}
                    {!this.state.currencyReceiveLoader &&
                      this.state.currencySelectedReceive !== "" &&
                      !this.state.showMessage && (
                        <Grid.Row>
                          <Grid.Column width={7}>
                            <Form.Field required>
                              <label>
                                {t("fastChange.amountSend")}
                                {" " + this.state.currencySend}
                              </label>
                              <Form.Group inline>
                                <Image
                                  src={this.state.imgSend}
                                  circular
                                  verticalAlign="middle"
                                  size="mini"
                                />

                                <CurrencyInput
                                  value={this.state.amountSend}
                                  placeholder={
                                    t("fastChange.amountSend") +
                                    " " +
                                    this.state.currencySend
                                  }
                                  name="send"
                                  onChangeEvent={this.handleAmount.bind(this)}
                                  style={{ marginLeft: "20px" }}
                                  precision={
                                    this.state.currencyLabelSelected !==
                                      "BTC" &&
                                    this.state.currencyLabelSelected !== "ETH"
                                      ? 2
                                      : 8
                                  }
                                />
                              </Form.Group>
                              {labelErrorAmountBase}
                              <br></br>
                              <span className="textFastChange">
                                <strong>
                                  {t("fastChange.avalilableToChange")}
                                </strong>{" "}
                              </span>

                              <span className="textFastChange">
                                <NumberFormat
                                  value={this.floorDecimals(
                                    this.state.avalilableToChange,
                                    this.state.currencyLabelSelected !== "BTC"
                                      ? 2
                                      : 8
                                  )}
                                  decimalScale={
                                    this.state.currencyLabelSelected !== "BTC"
                                      ? 2
                                      : 8
                                  }
                                  displayType={"text"}
                                  thousandSeparator={true}
                                />{" "}
                                {this.state.imgSimbSend}
                              </span>
                            </Form.Field>
                            <Form.Field width={10}>
                              <span className="textFastChange">
                                <strong>
                                  {t("fastChange.modal.changeFactor")}
                                </strong>
                              </span>
                              <br />
                              <span className="textFastChange">
                                1 {this.state.currencyLabelSelected}
                                {" = "}
                                <NumberFormat
                                  value={this.state.factorToShow}
                                  decimalScale={
                                    this.state.factorToShow >= 1
                                      ? 2
                                      : this.state.factorToShow < 0.00001
                                      ? 12
                                      : 8
                                  }
                                  displayType={"text"}
                                  thousandSeparator={true}
                                />{" "}
                                {this.state.currencySelectedReceive}
                              </span>
                              <br />
                              <span className="textFastChange">
                                1 {this.state.currencySelectedReceive}
                                {" = "}
                                <NumberFormat
                                  value={this.state.factorInverseToShow}
                                  decimalScale={
                                    this.state.factorInverseToShow >= 1
                                      ? 2
                                      : this.state.factorInverseToShow < 0.00001
                                      ? 12
                                      : 8
                                  }
                                  displayType={"text"}
                                  thousandSeparator={true}
                                />{" "}
                                {this.state.currencyLabelSelected}
                              </span>
                            </Form.Field>
                          </Grid.Column>
                          <Grid.Column width={2} textAlign="center">
                            <Image
                              src={icon}
                              style={{ marginTop: "20px" }}
                              verticalAlign="middle"
                              centered
                              size="mini"
                            />
                          </Grid.Column>
                          <Grid.Column width={7}>
                            <Form.Field required>
                              <label>
                                {t("fastChange.amountReceive")}
                                {" " + this.state.currencyReceive}
                              </label>
                              <Form.Group inline>
                                <Image
                                  src={this.state.imgReceive}
                                  circular
                                  verticalAlign="middle"
                                  size="mini"
                                />

                                <CurrencyInput
                                  value={this.state.amountReceive}
                                  placeholder={
                                    t("fastChange.amountReceive") +
                                    " " +
                                    this.state.currencyReceive
                                  }
                                  name="receive"
                                  onChangeEvent={this.handleAmount.bind(this)}
                                  style={{ marginLeft: "20px" }}
                                  precision={
                                    this.state.currencySelectedReceive !==
                                      "BTC" &&
                                    this.state.currencySelectedReceive !== "ETH"
                                      ? 2
                                      : 8
                                  }
                                />
                              </Form.Group>
                              {labelErrorAmountReceive}
                            </Form.Field>
                          </Grid.Column>
                        </Grid.Row>
                      )}
                    {this.state.balanceMessage &&
                      !this.state.currencyReceiveLoader && (
                        <Grid.Row>
                          <Grid.Column width={5}></Grid.Column>
                          <Grid.Column width={6}>
                            <div align="center">
                              <Form.Field style={{ marginLeft: "15px" }}>
                                <span className="textError">
                                  {t("fastChange.errorGetBalanceCurrency") +
                                    " " +
                                    this.state.currencySend}
                                </span>
                              </Form.Field>
                            </div>
                          </Grid.Column>
                          <Grid.Column width={5}></Grid.Column>
                        </Grid.Row>
                      )}
                    {this.state.showMessage &&
                      !this.state.currencyReceiveLoader && (
                        <Grid.Row>
                          <Grid.Column width={4}></Grid.Column>
                          <Grid.Column width={8}>
                            <div align="center">
                              <Form.Field style={{ marginLeft: "15px" }}>
                                <span className="textError">
                                  {t("fastChange.errorGetFactor")}
                                </span>
                              </Form.Field>
                            </div>
                          </Grid.Column>
                          <Grid.Column width={4}></Grid.Column>
                        </Grid.Row>
                      )}
                    {this.state.existLimits &&
                      !this.state.currencyReceiveLoader && (
                        <Grid.Row>
                          <Grid.Column width={5}></Grid.Column>
                          <Grid.Column width={6}>
                            <div align="center">
                              <Form.Field style={{ marginLeft: "15px" }}>
                                <h4 className="textFastChange">
                                  {t("fastChange.headerLimits")}
                                </h4>
                                <span className="textFastChange">
                                  <strong>{t("fastChange.dailyLimits")}</strong>
                                  {": "}
                                  <NumberFormat
                                    value={this.floorDecimals(
                                      this.state.daylyLimit,
                                      this.state.currencyLabelSelected !==
                                        "BTC" &&
                                        this.state.currencyLabelSelected !==
                                          "ETH"
                                        ? 2
                                        : 8
                                    )}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                  />{" "}
                                  {this.state.imgSimbSend}
                                </span>
                                <br></br>
                                <span className="textFastChange">
                                  <strong>
                                    {t("fastChange.monthlyLimits")}
                                  </strong>
                                  {": "}
                                  <NumberFormat
                                    value={this.floorDecimals(
                                      this.state.monthlyLimit,
                                      this.state.currencyLabelSelected !==
                                        "BTC" &&
                                        this.state.currencyLabelSelected !==
                                          "ETH"
                                        ? 2
                                        : 8
                                    )}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                  />{" "}
                                  {this.state.imgSimbSend}
                                </span>
                              </Form.Field>
                            </div>
                          </Grid.Column>
                          <Grid.Column width={5}></Grid.Column>
                        </Grid.Row>
                      )}
                    <Grid.Row>
                      <Grid.Column width={6}></Grid.Column>
                      <Grid.Column width={4}>
                        <div align="center">
                          <Button onClick={this.handleOpen}>
                            {t("homeLoggedIn.fastChange")}
                          </Button>
                        </div>
                      </Grid.Column>
                      <Grid.Column width={6}></Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Form>
              </Grid.Column>
              <Grid.Column largeScreen={2} computer={1} widescreen={2} />
            </Grid>

            <Modal
              open={this.state.showModalFastChange}
              onClose={this.handleClose}
              size="tiny"
            >
              <Header
                content={t("fastChange.dataOperation")}
                // textAlign='center'
              />
              <Modal.Content>
                {/* {!this.state.fastChangeSucess &&
                  !this.state.fastChangeBalance &&
                  !this.state.fastChangeLimitDayly &&
                  !this.state.fastChangeLimitMonthly && ( */}
                <Form widths="equal" className="form-login" error unstackable>
                  <Form.Field width={10}>
                    <label>{t("fastChange.modal.amountSend")}</label>
                    <NumberFormat
                      value={this.state.amountSend}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={
                        this.state.currencyLabelSelected !== "BTC" &&
                        this.state.currencyLabelSelected !== "ETH"
                          ? 2
                          : 8
                      }
                    />
                    <span> {this.state.currencyLabelSelected}</span>
                  </Form.Field>
                  <Form.Field width={10}>
                    <label>{t("fastChange.modal.changeFactor")}</label>
                    <span>
                      1 {this.state.currencyLabelSelected}
                      {" = "}
                      <NumberFormat
                        value={this.state.factorToShow}
                        decimalScale={
                          this.state.factorToShow >= 1
                            ? 2
                            : this.state.factorToShow < 0.00001
                            ? 12
                            : 8
                        }
                        displayType={"text"}
                        thousandSeparator={true}
                      />{" "}
                      {this.state.currencySelectedReceive}
                    </span>
                    <br></br>
                    <span>
                      1 {this.state.currencySelectedReceive}
                      {" = "}
                      <NumberFormat
                        value={this.state.factorInverseToShow}
                        decimalScale={
                          this.state.factorInverseToShow >= 1
                            ? 2
                            : this.state.factorInverseToShow < 0.00001
                            ? 12
                            : 8
                        }
                        displayType={"text"}
                        thousandSeparator={true}
                      />{" "}
                      {this.state.currencyLabelSelected}
                    </span>
                  </Form.Field>
                  <Form.Field width={10}>
                    <label>{t("fastChange.modal.amountReceive")}</label>
                    <NumberFormat
                      value={this.state.amountReceive}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalSeparator="."
                      decimalScale={
                        this.state.currencySelectedReceive !== "BTC" &&
                        this.state.currencySelectedReceive !== "ETH"
                          ? 2
                          : 8
                      }
                    />
                    <span> {this.state.currencySelectedReceive}</span>
                  </Form.Field>
                  {this.state.commisionByOperarion !== 0 && (
                    <Form.Field width={10}>
                      <label>{t("fastChange.modal.Commission")}</label>
                      <span>
                        <NumberFormat
                          decimalScale={
                            this.state.commisionByOperarion >= 1
                              ? 2
                              : this.state.commisionByOperarion < 0.000001
                              ? 12
                              : 8
                          }
                          value={this.state.commisionByOperarion}
                          displayType={"text"}
                          thousandSeparator={true}
                        />{" "}
                        {this.state.currencyLabelSelected}
                      </span>
                    </Form.Field>
                  )}
                </Form>
                {/* )} */}
                {(this.state.fastChangeSucess ||
                  this.state.fastChangeBalance ||
                  this.state.fastChangeLimitDayly ||
                  this.state.fastChangeLimitMonthly) && (
                  <Grid>
                    <Grid.Column width={2}></Grid.Column>
                    <Grid.Column width={12}>
                      <Divider hidden></Divider>
                      {labelconfirmMessage}
                      {labelErrorBalance}
                    </Grid.Column>
                    <Grid.Column width={2}></Grid.Column>
                  </Grid>
                )}
              </Modal.Content>
              {!this.state.fastChangeSucess &&
                !this.state.fastChangeBalance &&
                !this.state.fastChangeLimitDayly && (
                  <Modal.Actions className="actions-modal">
                    {!this.state.buttonLoader && (
                      <Button secondary onClick={this.handleClose}>
                        {t("fastChange.modal.cancel")}
                      </Button>
                    )}
                    <Button
                      loading={this.state.buttonLoader}
                      disabled={this.state.buttonLoader}
                      floated="center"
                      onClick={this.fastChange.bind(this)}
                    >
                      {t("fastChange.modal.accept")}
                    </Button>
                  </Modal.Actions>
                )}
              {(this.state.fastChangeSucess ||
                this.state.fastChangeBalance ||
                this.state.fastChangeLimitDayly ||
                this.state.fastChangeLimitMonthly) && (
                <Modal.Actions className="actions-modal">
                  <Button
                    secondary
                    floated="right"
                    style={{ marginLeft: 40 }}
                    onClick={this.handleCloseSucess}
                  >
                    {t("fastChange.modal.close")}
                  </Button>
                  <Divider hidden></Divider>
                </Modal.Actions>
              )}
            </Modal>
            <Divider hidden></Divider>
          </div>
        )}
      </Segment>
    );
  }
}
export default translate(FastChangeCurrencies);
