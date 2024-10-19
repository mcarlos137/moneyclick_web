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
import ModalSellBTC from "./ModalSellBTC";
import cryptoCurrencies from "../../common/cryptoCurrencies";
class SellBTC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translator: props.translate,
      errorInRed: false,
      formLoad: true,
      balances: {},
      currencies: [],
      currencyReceive: "",
      imgReceive: "",
      amountSend: 0,
      amountReceive: 0,
      errorGetFactor: false,
      showButton: false,
      balanceMessage: false,
      currencyLabelSelectedToReceive: "",
      currencySend: "",
      imgSend: "",
      imgSimbSend: "",
      availableBalanceBaseInBTC: "",
      existLimits: false,
      daylyLimit: 0,
      monthlyLimit: 0,
      limitByCurrency: [],
      currencyReceiveLoader: false,
      priceBid: 0,
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
      cryptoToSend: "",
      cryptoList: cryptoCurrencies,
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
                key !== "btcEstimatedBalance"
              ) {
                if (key !== "BTC" && key !== "ETH" && key !== "USDT") {
                 
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
                          findCurrency.text 
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
                          findCurren.fullName
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
                } else {
                  let currencyBTC = CurrenciesFlag.currenciesFlag[key];
                  currencyBTC.availableBalance = value.availableBalance;
                  const includeSlash =  this.state.cryptoList[0].text.includes("/");
                  this.state.cryptoList.map(crypto => {
                     if (crypto.key === key) {
                       crypto.text =  (includeSlash ? crypto.text.split("/")[0] : crypto.text) + " / " + this.floorDecimals(value.availableBalance, this.state.cryptoToSend === "USDT" ? 2 : 8);
                     }
                  });
                  /*this.setState({
                    avalilableToChange: value.availableBalance,
                    availableBalanceBaseInBTC: value.availableBalance,
                    imgSend: currencyBTC.img,
                    imgSimbSend: currencyBTC.value
                  })*/
                }
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
      currencyReceive: "",
      imgReceive: "",
      amountSend: 0,
      amountReceive: 0,
      commisionByOperarion: 0,
      disabledReceive: false,
    });
    this.handleChangeCurrencySelectState(data.value);
   // this.setValueLimit(data.value);
  }
     

  handleChangeCurrencySelectState(fiat) {
    this.setState({
      errorGetFactor: false,
      showButton: false,
      balanceMessage: false,
      currencyLabelSelectedToReceive: fiat,
      currencyReceiveLoader: true,
    }, () => {
      if (this.state.cryptoToSend !== "") {
        this.getFactor(fiat, this.state.cryptoToSend);
      } else {
        this.setState({
            currencyReceiveLoader: false,
        })
      }
    });

    this.setState({
      priceBid: 0,
      factorToShow: "",
      factorInverseToShow: "",
    });

    this.handleChangeCurrencySelectStateReceive(fiat);
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
    
  }

  handleChangeCurrencySelectStateReceive(currency) {
    console.log('currencies ', currency, this.state.currencies);
    this.setState({
      amountSend: 0,
      amountReceive: 0,
      errorGetFactor: false,
    });

    let findCurrency = this.state.currencies.find((a) => {
      if (a.value === currency) {
        return a.value;
      }
    });

    this.setState({
      currencyReceive: findCurrency.value,
      imgReceive: findCurrency.img,
    });
  }
  async getFactor(fiat, crypto) {
    console.log('f ', fiat, crypto);
    try {
      let responseFactor;
      responseFactor = await userService.getCryptoPrice(
        fiat, crypto
      );
      console.log('r ',responseFactor.data );
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
        if (responseFactor.data.bid !== undefined) {
          let factorFix;
          let factorStr = responseFactor.data.bid.toString();
          
          if (factorStr.includes("e")) {
            factorFix = Number(responseFactor.data.bid).toFixed(8);
          } else {
            factorFix = responseFactor.data.bid;
          }
          let factorInverse = 1 / responseFactor.data.bid;
          let factorInverseString;
          factorInverseString = factorInverse.toString();
          if (factorInverseString.includes("e")) {
            factorInverse = Number(factorInverse).toFixed(8);
          }

          this.setState({
            priceBid: responseFactor.data.bid,
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
    console.log(e.target.name);
    if (e.target.name === "send") {
      while (e.target.value.indexOf(",") !== -1) {
        e.target.value = e.target.value.replace(",", "");
      }
      if (e.target.value <= this.state.avalilableToChange) {
        let calculate = e.target.value * this.state.priceBid;
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
        }, () => {
             console.log('valueToShow ',e.target.value, amountReceiveToShow);
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
      console.log('bid ', this.state.priceBid , 'value ', e.target.value, 'this.state.avalilableToChange ', this.state.avalilableToChange);
      while (e.target.value.indexOf(",") !== -1) {
        e.target.value = e.target.value.replace(",", "");
      }
      if (e.target.value > 0.00) {
          //console.log(this.state.priceBid,e.target.value / this.state.priceBid, this.state.avalilableToChange);
        if ((e.target.value / this.state.priceBid)
        <= this.state.avalilableToChange) {
          let compareAmount = e.target.value / this.state.priceBid;
          let valString = compareAmount.toString();
          let valueToShow;
          if (valString.includes("e")) {
            valueToShow = Number(compareAmount).toFixed(8);
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
      } else {
         console.log(' no entro');
        this.setState({
          amountReceive: 0,
          amountSend: 0,
        })
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
      this.getCharges();
      this.setState({ showModalFastChange: true });
    }
  };

  handleClose = () => {
    this.setState({ showModalFastChange: false });
  };

  async getCharges() {
    try {
     
      let body = {
        currency: this.state.currencyLabelSelectedToReceive,
        amount: this.state.amountReceive,
        operationType: "MC_SELL_BITCOINS"
      };

      if (
        body.amount !== null &&
        body.amount !== "" &&
        body.amount !== undefined &&
        body.amount.toString() !== "NaN"
      ) {
        let responseGetCharges;
        try {
          responseGetCharges = await otcService._getAllCharguesNewPost(body);
          console.log('cargos por vender ', responseGetCharges.data);
        } catch (error) {
          console.log('error ', error);
        }
       

        if (responseGetCharges.data.COMMISSION !== undefined) {
          let commission = 0;
          if (responseGetCharges.data.COMMISSION.toString().includes("e")) {
            commission = Number(
              responseGetCharges.data.COMMISSION.amount
            ).toFixed(8);
          } else {
            commission = Number(responseGetCharges.data.COMMISSION.amount);
          }
          this.setState({
            currencyOfCharges: responseGetCharges.data.COMMISSION.currency,
            commisionByOperarion: commission,
            taxVat: responseGetCharges.data.VAT !== undefined ? responseGetCharges.data.VAT.amount : 0,
            currencyReceiveLoader: false,
          }, () => {
            this.determinateTotals();
          });
        } else {
          this.setState({
            currencyOfCharges: this.state.currencyLabelSelectedToReceive,
            commisionByOperarion: 0,
            taxVat: 0,
            currencyReceiveLoader: false,
          }, () => {
            this.determinateTotals();
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

  determinateTotals() {
    let amountNumber = Number(this.state.amountSend);
    let commisionByOperarion = Number(this.state.commisionByOperarion);
    if (this.state.currencyOfCharges === this.state.currencyLabelSelectedToReceive) {
		
			this.setState({
				totalToSend: amountNumber,
				totalToReceive: this.state.amountReceive - commisionByOperarion - this.state.taxVat,
			});
		} else if (
			this.state.currencyOfCharges === "BTC"
		) {
			this.setState({
				totalToSend: amountNumber - commisionByOperarion - this.state.taxVat,
				totalToReceive: this.state.amountReceive,
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
			amountToChange: 0,
			priceBid: 0,
			availableBalanceBaseInBTC: 0,
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
			currencyLabelSelectedToReceive: "",
			currencySend: "BTC",
			imgSend: "",
			currencyReceive: "",
			imgReceive: "",
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
                  <h4 className="headerComponent">{t("sellBTC.header")}</h4>
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
                          <label>{t("fastChange.currencyReceive")}</label>
                          <Select
                            placeholder={t("fastChange.currencyReceive")}
                            fluid
                            single
                            selection
                            options={this.state.currencies}
                            onChange={this.handleChangeCurrencySelect}
                                                    value={this.state.currencyLabelSelectedToReceive}
                                                    defaultValue="USD"
                          />
                        </Form.Field>
                      </Grid.Column>
                         <Grid.Column
                        largeScreen={2}
                        mobile={0}
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
                          <label>{t("profile.walletAccount.cryptoToSend")}</label>
                          <Select
            placeholder={t("profile.walletAccount.cryptoToSend")}
            fluid
            single
            selection
            options={this.state.cryptoList}
            value={this.state.cryptoToSend}
            onChange={(e, data) => {
		        this.setState({
              cryptoToSend: data.value,
              amountSend: 0,
              amountReceive: 0,
              avalilableToChange: CurrenciesFlag.currenciesFlag[data.value].availableBalance,
              imgSend: CurrenciesFlag.currenciesFlag[data.value].img,
            }, () => {
              if (this.state.currencyLabelSelectedToReceive !== "") {
                this.getFactor(this.state.currencyLabelSelectedToReceive, data.value);
              }
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
                      this.state.currencyLabelSelectedToReceive !== "" &&
                      this.state.cryptoToSend !== "" &&
                      !this.state.errorGetFactor && (
                      <Grid.Row>
                           <Grid.Column width={7}>
                            <Form.Field required>
                              <label>
                                {t("fastChange.amountReceive")}
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
                                  precision={2}
                                />
                              </Form.Group>
                            {labelErrorAmountReceive}
                             <br></br>
                              <span className="textFastChange">
                                <strong>
                                  {t("fastChange.avalilableToChange")}
                                </strong>{" "}
                              </span>

                              <span className="textFastChange">
                                <NumberFormat
                                  value={this.floorDecimals(
                                    this.state.avalilableToChange, 8
                                  )}
                                  decimalScale={8}
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
                            {this.state.factorInverseToShow > "0.000000001" && (<span className="textFastChange">
                              1 {this.state.currencyLabelSelectedToReceive}
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
                              />{" " + this.state.cryptoToSend}
                              <br />
                              <br />
                            </span>)}
                          
                            {this.state.factorToShow > "0.000000001" && (<span className="textFastChange">
                              {"1 " + this.state.cryptoToSend}
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
                              {this.state.currencyLabelSelectedToReceive}
                            </span>)}
                            </Form.Field>
                          </Grid.Column>
                       
                          <Grid.Column width={2} textAlign="center">
                            <Image
                              src={icon}
                              style={{ paddingTop: 30 }}
                              verticalAlign="middle"
                              centered
                              size="mini"
                            />
                        </Grid.Column>
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
                                    t("fastChange.amountSend") +
                                    " " +
                                    this.state.currencySend
                                  }
                                  name="send"
                                  onChangeEvent={this.handleAmount.bind(this)}
                                  style={{ marginLeft: "20px" }}
                                  precision={this.state.cryptoToSend === "USDT" ? 2 : 8}
                                />
                              </Form.Group>
                              {labelErrorAmountBase}
                             
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
                                      this.state.currencyLabelSelectedToReceive !==
                                        "BTC" &&
                                        this.state.currencyLabelSelectedToReceive !==
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
                                      this.state.currencyLabelSelectedToReceive !==
                                        "BTC" &&
                                        this.state.currencyLabelSelectedToReceive !==
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
                            {t("sellBTC.header")}
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
            <ModalSellBTC showModalFastChange={this.state.showModalFastChange}
              currencyOfCharges={this.state.currencyOfCharges}
              factorToShow={this.state.factorToShow}
              currencyReceive={this.state.currencyReceive}
              factorInverseToShow={this.state.factorInverseToShow}
              amountReceive={this.state.amountReceive}
              amountReceiveToShow={ this.state.amountReceiveToShow}
              totalToSend={this.state.totalToSend}
              totalToReceive={this.state.totalToReceive}
              commisionByOperarion={this.state.commisionByOperarion}
              taxVat={this.state.taxVat}
              imgSimbSend={this.state.imgSimbSend}
              currencyLabelSelected={this.state.cryptoToSend}
              currencySelectedReceive={this.state.currencyLabelSelectedToReceive}
              amountToChange={this.state.amountSend}
              handleCloseSucess={this.handleCloseSucess.bind(this)}
              closeModal={ this.handleClose.bind(this)}
            ></ModalSellBTC>
           <Divider hidden></Divider>
          </div>
        )}
      </Segment>
    );
  }
}
export default translate(SellBTC);
