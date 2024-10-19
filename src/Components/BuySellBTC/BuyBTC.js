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
import cryptoCurrencies from "../../common/cryptoCurrencies";
import React from "react";
import CurrencyInput from "react-currency-input";
import "./index.css";
import mcIcon from "../../img/splash_mc.jpg";
import { isMobile } from "react-device-detect";
import translate from "../../i18n/translate";
import CurrenciesFlag from "../../common/currencyFlag";
import otcService from "../../services/otc";
import userService from "../../services/user";
import RetailService from "../../services/moneyclick";
import NumberFormat from "react-number-format";
import icon from "../../img/icn_buy_crypto_white.png";
import ModalBuyBTC from "./ModalBuyBTC";
class BuyBTC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translator: props.translate,
      errorInRed: false,
      formLoad: true,
      balances: {},
      currencies: [],
      imgReceive: "",
      amountSend: 0,
      amountReceive: 0,
      errorGetFactor: false,
      showButton: false,
      balanceMessage: false,
      currencyLabelSelected: "",
      currencySend: "",
      imgSend: "",
      imgSimbSend: "",
      availableBalanceBase: 0,
      existLimits: false,
      daylyLimit: 0,
      monthlyLimit: 0,
      limitByCurrency: [],
      currencyReceiveLoader: false,
      priceAsk: 0,
      factorToShow: "",
      factorInverseToShow: "",
      commisionByOperarion: 0,
      disabledReceive: true,
      showModalFastChange: false,
      buttonLoader: false,
      fastChangeLimitDayly: false,
      fastChangeLimitMonthly: false,
      user: window.sessionStorage.getItem("username"),
      taxVat: 0,
      showMessage: false,
      cryptoList: cryptoCurrencies,
      cryptoToReceive: "BTC"
    };
    this.handleChangeCurrencySelect = this.handleChangeCurrencySelect.bind(
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
                key !== "BTC" && key !== "USDT" && key !== "ETH"  
              ) {
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
              }
            });
            let cryptoToReceiveObj = CurrenciesFlag.currenciesFlag[this.state.cryptoToReceive];
                this.setState({
                  cryptoToReceive: cryptoToReceiveObj.value,
                  imgReceive: cryptoToReceiveObj.img,
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
      amountSend: 0,
      amountReceive: 0,
      commisionByOperarion: 0,
      disabledReceive: false,
    });
    this.handleChangeCurrencySelectState(data.value);
    this.setValueLimit(data.value);
  }

  handleChangeCurrencySelectState(currency) {
  
    let findCurrency = this.state.currencies.find((a) => {
      if (a.value === currency) {
        return a.value;
      }
    });

    this.setState({
      errorGetFactor: false,
      showButton: false,
      balanceMessage: false,
      currencyLabelSelected: currency,
      currencySend: findCurrency.textShort,
      imgSend: findCurrency.img,
      imgSimbSend: findCurrency.value,
      availableBalanceBase: findCurrency.balance,
    }, () => {
      this.getFactor(currency, this.state.cryptoToReceive);
      this.getCharges(this.state.availableBalanceBase);
    });

    this.setState({
      currencyReceiveLoader: true,
      priceAsk: 0,
      factorToShow: "",
      factorInverseToShow: "",
      amountSend: 0,
      amountReceive: 0,
      errorGetFactor: false,
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

  async getFactor(currencyBase,crypto) {
    try {
      //console.log('getFactor ',currencyBase, crypto);
      let responseFactor;
      responseFactor = await userService.getCryptoPrice(
        currencyBase,crypto
      );
      //console.log(' response getFactor ', responseFactor.data);
      if (
        responseFactor.data
          .toString()
          .includes("THERE IS NO OFFER FACTOR TO THESE CURRENCIES")
      ) {
        console.log("THERE IS NO OFFER FACTOR TO THESE CURRENCIES");
      } else if (
        responseFactor.data.toString().includes("OFFER FACTOR CHANGE")
      ) {
        console.log("OFFER FACTOR CHANGE");
      } else {
        if (responseFactor.data.ask !== undefined) {
          let factorFix;
          let factorStr = responseFactor.data.ask.toString();
          
          if (factorStr.includes("e")) {
            factorFix = Number(responseFactor.data.ask).toFixed(8);
          } else {
            factorFix = responseFactor.data.ask;
          }
          let factorInverse = 1 / responseFactor.data.ask;
          let factorInverseString;
          factorInverseString = factorInverse.toString();
          if (factorInverseString.includes("e")) {
            factorInverse = Number(factorInverse).toFixed(8);
          }

          //console.log(' responseFactor.data.ask ', responseFactor.data.ask * 30);
          this.setState({
            priceAsk: responseFactor.data.ask,
            factorToShow: factorFix,
            factorInverseToShow: factorInverse,
            currencyReceiveLoader: false,
          });
        } else {
          this.setState({
            errorGetFactor: true,
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
      if (e.target.value <= this.state.avalilableToChange) {
        let calculate = e.target.value / this.state.priceAsk;
        let valString = calculate.toString();
        let amountReceiveToShow;
        if (valString.includes("e")) {
          amountReceiveToShow = Number(calculate).toFixed(8);
        } else {
          amountReceiveToShow = calculate;
        }
     
        this.setState({
          errorAmountBase: false,
          message: "",
          amountSend: e.target.value,
          amountReceive: calculate,
          amountReceiveToShow: amountReceiveToShow
        });
      } else {
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
      }
    }
    if (e.target.name === "receive") {
      while (e.target.value.indexOf(",") !== -1) {
        e.target.value = e.target.value.replace(",", "");
      }
     
      if (this.state.factorInverseToShow * e.target.value <= this.state.avalilableToChange) {
        let compareAmount = e.target.value * this.state.priceAsk;
        let valString = compareAmount.toString();
        let valueToShow;
        if (valString.includes("e")) {
          valueToShow = Number(compareAmount).toFixed(2);
        } else {
          valueToShow = compareAmount;
        }
        this.setState({
          errorAmountBase: false,
          message: "",
          amountReceive: e.target.value,
          amountSend: valueToShow,
        });
      } else {
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
      }
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
    }else if (
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
        this.state.amountSend
      );
      this.setState({ showModalFastChange: true });
    }
  };

  handleClose = () => {
    this.setState({ showModalFastChange: false });
  };

  updateAmountAvailableByCommision(currencyOfCommision) {
    if (currencyOfCommision !== "" && currencyOfCommision !== "BTC") {
      this.setState({
        avalilableToChange:
          this.state.availableBalanceBase - this.state.commisionByOperarion - this.state.taxVat,
      });
    } else {
       this.setState({
        avalilableToChange:
          this.state.availableBalanceBase
      });
    }
  }

  async getCharges(amount) {
    try {
     
      let body = {
        currency: this.state.currencyLabelSelected,
        amount: amount,
        operationType: "MC_BUY_CRYPTO"
      };

      if (
        body.amount !== null &&
        body.amount !== "" &&
        body.amount > 0 &&
        body.amount !== undefined &&
        body.amount.toString() !== "NaN"
      ) {
        let responseGetCharges = await otcService._getAllCharguesNewPost(body);
        //console.log('responseGetCharges ', responseGetCharges);
        if (responseGetCharges.data.COMMISSION !== undefined) {
        
          let commission = 0;
          if (responseGetCharges.data.COMMISSION.amount.toString().includes("e")) {
            commission = Number(
              responseGetCharges.data.COMMISSION.amount
            ).toFixed(8);
          } else {
            commission = Number(responseGetCharges.data.COMMISSION.amount).toFixed(2);
          }
          // console.log('responseGetCharges.data.COMMISSION.amount ', responseGetCharges.data.COMMISSION.amount, commission);
          this.setState({
            currencyOfCharges: responseGetCharges.data.COMMISSION.currency,
            commisionByOperarion: commission,
            taxVat: responseGetCharges.data.VAT !== undefined  ? responseGetCharges.data.VAT.amount : 0,
            currencyReceiveLoader: false,
          }, () => {
            this.updateAmountAvailableByCommision(responseGetCharges.data.COMMISSION.currency);
            this.determinateTotals();
          });
        } else {
        
          this.setState({
            currencyOfCharges: this.state.currencyLabelSelected,
            commisionByOperarion: 0,
            taxVat: 0,
            currencyReceiveLoader: false,
          }, () => {
            this.updateAmountAvailableByCommision("");
            this.determinateTotals();
          });
        }
       
      } else {
        this.updateAmountAvailableByCommision("");
         this.determinateTotals();
        this.setState({
          currencyOfCharges: this.state.currencyLabelSelected,
          commisionByOperarion: 0,
          taxVat: 0,
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

  determinateTotals() {
		let total = 0;
    let amountNumber = Number(this.state.amountSend);
    let commisionByOperarion = Number(Number(this.state.commisionByOperarion).toFixed(2));
		if (this.state.currencyOfCharges === this.state.currencyLabelSelected) {
			total =
        amountNumber + commisionByOperarion + this.state.taxVat;
			this.setState({
				totalToSend: Number(total).toFixed(2),
				totalToReceive: this.state.amountReceive,
			});
		} else if (
			this.state.currencyOfCharges === "BTC"
		) {
			total =
				this.state.amountReceive -
				commisionByOperarion -
				this.state.taxVat;

			this.setState({
				totalToSend:  Number(amountNumber).toFixed(2),
				totalToReceive: total,
			});
		}
	}

  

  handleCloseReceipt = () => {
		this.setState({ showModalReceipt: false });
    };
    
    handleCloseSucess = () => {
		this.handleCloseReceipt();
		this.setState({
			showModalFastChange: false,
			errorInRed: false,
			formLoad: true,
			priceAsk: 0,
			availableBalanceBase: 0,
			balanceMessage: false,
			amountReceive: 0,
			balanceMoneyClick: 0,
			loadForm: false,
			errorAmountCrypto: false,
			existLimits: false,
			daylyLimit: 0,
			monthlyLimit: 0,
			commisionByOperarion: 0,
			confirmMessage: "",
			currencyLabelSelected: "",
			currencySend: "",
			imgSend: "",
			currencies: [],
			limitByCurrency: [],
			factorToShow: "",
			factorInverseToShow: "",
			balances: {},
			message: "",
			errorGetFactor: false,
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
      labelErrorAmountReceive
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
                  <h4 className="headerComponent">{t("buyBTC.header")}</h4>
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
                                                    defaultValue="USD"
                          />
                        </Form.Field>
                      </Grid.Column>
                       <Grid.Column width={2}></Grid.Column>
                        <Grid.Column
                        largeScreen={7}
                        mobile={16}
                        tablet={7}
                        computer={7}
                      >
                       <Form.Field inline required>
                          <label>{t("profile.walletAccount.cryptoToReceive")}</label>
                          <Select
            placeholder={t("profile.walletAccount.cryptoToReceive")}
            fluid
            single
            selection
            options={this.state.cryptoList}
            value={this.state.cryptoToReceive}
            onChange={(e, data) => {
              this.setState({
                amountSend: 0,
                amountReceive: 0,
                commisionByOperarion: 0,
                disabledReceive: false,
                cryptoToReceive: data.value,
                imgReceive: CurrenciesFlag.currenciesFlag[data.value].img,
            }, () => {
                this.getFactor(this.state.currencyLabelSelected, data.value);
                this.getCharges(this.state.availableBalanceBase);
            });
	          }}
            />
                        </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                    {this.state.currencyReceiveLoader && (
                      <Loader active inline="centered" />
                    )}
                    {!this.state.currencyReceiveLoader &&
                      this.state.currencyLabelSelected !== "" &&
                      !this.state.errorGetFactor && (
                        <Grid.Row>
                          <Grid.Column width={7}>
                            <Form.Field required>
                              <label>
                                {t("fastChange.amountSend")}
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
                                    t("fastChange.amountSend")
                                  }
                                  name="send"
                                  onChangeEvent={this.handleAmount.bind(this)}
                                  style={{ marginLeft: "20px" }}
                                  precision={2}
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
                            <br />
                             {this.state.factorToShow > "0.000000001" && (<span className="textFastChange">
                              {"1 " +this.state.cryptoToReceive }
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
                              {this.state.currencyLabelSelected}
                            </span>)}
                             <br />
                            <br />
                            {this.state.factorInverseToShow > "0.000000001" && (<span className="textFastChange">
                              1 {this.state.currencyLabelSelected}
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
                              />{" " + this.state.cryptoToReceive}
                            </span>)}
                           
                            </Form.Field>
                          </Grid.Column>
                          <Grid.Column width={2} textAlign="center">
                            <Image
                              src={icon}
                              style={{ marginTop: "25px" }}
                              verticalAlign="middle"
                              centered
                              size="mini"
                            />
                          </Grid.Column>
                          <Grid.Column width={7}>
                            <Form.Field required>
                              <label>
                                {t("fastChange.amountReceive")}
                                {" " + this.state.cryptoToReceive}
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
                                    this.state.cryptoToReceive
                                  }
                                  name="receive"
                                  onChangeEvent={this.handleAmount.bind(this)}
                                  style={{ marginLeft: "20px" }}
                                  precision={this.state.cryptoToReceive === "USDT" ? 2 : 8}
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
                     {this.state.showMessage &&(
                        <Grid.Row>
                          <Grid.Column width={4}></Grid.Column>
                          <Grid.Column width={8}>
                            <div align="center">
                              <Form.Field style={{ marginLeft: "15px" }}>
                                <span className="textError">
                                  {this.state.message}
                                </span>
                              </Form.Field>
                            </div>
                          </Grid.Column>
                          <Grid.Column width={4}></Grid.Column>
                        </Grid.Row>
                      )}
                    {this.state.errorGetFactor &&
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
                                          "ETH" &&
                                        this.state.currencyLabelSelected !==
                                          "USDT"
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
                                          "ETH" &&
                                        this.state.currencyLabelSelected !==
                                          "USDT"
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
                            {t("buyBTC.header")}
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
            <ModalBuyBTC showModalFastChange={this.state.showModalFastChange}
              currencyOfCharges={this.state.currencyOfCharges}
              factorToShow={this.state.factorToShow}
              currencyReceive={this.state.cryptoToReceive}
              factorInverseToShow={this.state.factorInverseToShow}
              amountReceive={this.state.amountReceive}
              amountReceiveToShow={ this.state.amountReceiveToShow}
              totalToSend={this.state.totalToSend}
              totalToReceive={this.state.totalToReceive}
              commisionByOperarion={this.state.commisionByOperarion}
              taxVat={this.state.taxVat}
              imgSimbSend={this.state.imgSimbSend}
              currencyLabelSelected={this.state.currencyLabelSelected}
              currencySelectedReceive={this.state.cryptoToReceive}
              amountToChange={this.state.amountSend}
              handleCloseSucess={this.handleCloseSucess.bind(this)}
              closeModal={ this.handleClose.bind(this)}
            ></ModalBuyBTC>
           <Divider hidden></Divider>
          </div>
        )}
      </Segment>
    );
  }
}
export default translate(BuyBTC);
