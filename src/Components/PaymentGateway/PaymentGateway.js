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
  Message,
} from "semantic-ui-react";
import { parse } from 'query-string';
import decode from '../../services/decode';
import cryptoCurrencies from "../../common/cryptoCurrencies";
import React from "react";
import "./PaymentGateway.css";
import mcIcon from "../../img/splash_mc.jpg";
import { isMobile } from "react-device-detect";
import translate from "../../i18n/translate";
import CurrenciesFlag from "../../common/currencyFlag";
import otcService from "../../services/otc";
import userService from "../../services/user";
import RetailService from "../../services/moneyclick";
import NumberFormat from "react-number-format";
import icon from "../../img/icn_buy_crypto_white.png";
import PaymentGatewayModal from "./PaymentGatewayModal";
class PaymentGateway extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translator: props.translate,
      errorInRed: false,
      formLoad: false,
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
      showModal: false,
      buttonLoader: false,
      fastChangeLimitDayly: false,
      fastChangeLimitMonthly: false,
      user: window.sessionStorage.getItem("username"),
      taxVat: 0,
      showMessage: false,
      cryptoList: cryptoCurrencies,
      beneficiaryName: "",
      portal: ""
    };
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
    if (typeof parse(window.location.search).id !== 'undefined') {
      if (window.sessionStorage.getItem("auth") === "true") {
        let paramOfURI = parse(window.location.search).id;
        /* var pass = decode.encode(paramOfURI);
        var hash = decode.randomBytes(50);
        var endPass = decode.encode(pass+"__"+decode.bytesToBase64(hash));*/
        //console.log('endPass ', endPass);
        const paramsDesencrypt = decode.desencripHash(paramOfURI);
        console.log('paramsDesencrypt ', paramsDesencrypt);
        this.setState({
          portal: paramsDesencrypt.idPortal,
          amount: paramsDesencrypt.amount,
          currency: paramsDesencrypt.currency,
          beneficiaryPhone: paramsDesencrypt.userName,
        })
    
      } else {
        window.location.href = '/login'+window.location.search+'&source=paymentGateway'
      }
    } else { 
        window.location.href = '/login'
    }
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

  floorDecimals(value, numberDecimals) {
    let decimales = Math.pow(10, numberDecimals);
    return Math.floor(value * decimales) / decimales;
  }
  handleOpen = () => {
    this.setState({
      showModal: true
    })
  };

  goHome = () => {
    if (isMobile) {
      userService.logout();
      window.location.href = "/";
    } else { 
       window.location.href = "/";
    }
   
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

    
  handleCloseSucess = () => {

	};
  
  handleClose() { 
    this.setState({
      showModal: false
    })
  }

  
    async getBeneficiaryName() { 
      try {

        const respGetUserByPhone = await userService.getConfigUserGeneralAsync(
          this.state.beneficiaryPhone
        );

        if (respGetUserByPhone.data.result !== null) {
          this.setState({
            beneficiaryName: (typeof respGetUserByPhone.data.result.firstName !== 'undefined' ? respGetUserByPhone.data.result.firstName + " ": "") +  (typeof respGetUserByPhone.data.result.lastName !== 'undefined' ? respGetUserByPhone.data.result.lastName : ""),
          });
        }
      } catch (exception) { 
        console.log(exception);
      }
    }

 

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
        this.state.portal !== "" && (<Segment loading={this.state.formLoad} basic>
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
      
              {!isMobile && (<Segment inverted textAlign="left" className="titleComponents">
                <h4 className="headerComponent">{t("paymentGateway.title")}</h4>
              </Segment>)}
              <Divider hidden></Divider>
              <Form error>
                <div align="center">
                  <h3>{t("paymentGateway.send")}</h3>
                  <NumberFormat
                    value={this.state.amount}
                    decimalScale={2}
                    displayType={"text"}
                    renderText={(value, props) => <h2 {...props}>{value + ' $'}</h2>}
                    thousandSeparator={true}
                  />
                   
                  <h3>{t("paymentGateway.to")}</h3>
                  <p style={{ fontWeight: 'bold', fontSize: 20 }}>{this.state.beneficiaryName}</p>
                  <p style={this.state.beneficiaryName === "" ? { fontWeight: 'bold', fontSize: 20 } : { marginTop: -10 }}>{"+" + this.state.beneficiaryPhone}</p>

                  <Button style={{ marginTop: 15 }} onClick={this.handleOpen}>
                    {t("paymentGateway.buttonSend")}
                  </Button>
                  <div >
                    <Button style={{ marginTop: 15 }} onClick={this.goHome}>
                      {t("paymentGateway.buttonCancel")}
                    </Button>
                  </div>
                </div>
            
                    
              </Form>
           
              <Divider hidden></Divider>
              <PaymentGatewayModal
                open={this.state.showModal}
                handleClose={this.handleClose.bind(this)}
                receiverName={this.state.beneficiaryName}
                phone={this.state.beneficiaryPhone}
                amount={this.state.amount}
                currency={this.state.currency}
              ></PaymentGatewayModal>
            </div>
          )}
        </Segment>)
    );
  }
}
export default translate(PaymentGateway);