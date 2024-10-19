import React, { Component } from "react";
import "./AddAcount.css";
import user from "../../../services/user";
import otc from "../../../services/otc";
import paymentApi from "../../../services/payment";
import {
  Segment,
  Header,
  Form,
  Button,
  Message,
  Image,
  Grid,
  Divider,
  Responsive,
  Input,
  Label,
} from "semantic-ui-react";
import currency from "../../../common/currency";
import DinamicForm from "../../DinamicForm/DinamicForm";
import translate from "../../../i18n/translate";
import { isMobile } from "react-device-detect";

class AddAcount extends Component {
  constructor(props) {
    super(props);
    this.fields = [];
    this.constantPaymentsTypes = new Map();
    this.constantPaymentsTypes.set(
      "TRANSFER_WITH_SPECIFIC_BANK",
      props.translate("profile.addAccount.specificBank")
    );
    this.constantPaymentsTypes.set(
      "TRANSFER_NATIONAL_BANK",
      props.translate("profile.addAccount.thirdBank")
    );
    this.constantPaymentsTypes.set(
      "CHECK_DEPOSIT",
      props.translate("profile.addAccount.checkDeposit")
    );
    this.constantPaymentsTypes.set(
      "CASH_DEPOSIT",
      props.translate("profile.addAccount.cashDeposit")
    );
    this.constantPaymentsTypes.set(
      "WIRE_TRANSFER",
      props.translate("profile.addAccount.wire")
    );
    this.constantPaymentsTypes.set(
      "TRANSFER_INTERNATIONAL_BANK",
      props.translate("profile.addAccount.international")
    );
    this.constantPaymentsTypes.set(
      "TRANSFER_TO_CRYPTO_WALLET",
      props.translate("profile.addAccount.cryptoWallet")
    );
    this.constantPaymentsTypes.set(
      "CREDIT_CARD",
      props.translate("profile.addAccount.creditCard")
    );
    this.state = {
      forLoad: false,
      automatic: null,
      idHolder: "",
      nameHolder: "",
      accountNumber: "",
      imgCountry: "",
      country: "",
      bank: "",
      formAdd: Math.random(),
      list: [],
      banks: [],
      paymentBody: [],
      fields: [],
      payment: "",
      paymentName: "",
      clientPaymenType: {},
      paymentTypeBody: "",
      listCountrysView: [],
      getresult: false,
      listCountrys: [],
      currencies: [],
      listPayments: [
        {
          text: props.translate("profile.addAccount.transfer"),
          value: "TRANSFER_TO_BANK_ACCOUNT",
          key: "bank",
        },
        {
          text: "Zelle",
          value: "ZELLE",
          key: "zell",
        },
      ],
      emailReceiver: "",
      errorEmailReceiver: false,
      messageErrorReceiver: "",
      translator: props.translate,
      specialValue: false,
      paymentsUserForCurrency: [],
      showMessageRecomende: false,
      hasCreditCard: {},
      viewErrorCurrency: false
    };
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.language !== nextProps.language) {
      this.setState({
        translator: nextProps.translate,
      });
    }
  }
  componentDidMount() {
    let resp;
    let keys = [];
    this.setState({ formLoad: true });
    this.getPaymentsTypes();
    resp = otc.getCurrencies();
    resp
      .then((r) => {
        this.setState({ formLoad: false });
        for (let currency of r.data) {
          keys.push(currency.shortName);
        }
        this.setState(() => ({
          currencies: currency.currencies.filter((currency) => {
            return keys.find((key) => key === currency.alias);
          }),
        }));
      })
      .catch((error) => {
        this.setState({ formLoad: false });
        //console.log(error);
      });
  }
  getPaymentsTypes() {
    let array = [];
    otc
      .getAllPaymentsTypes()
      .then((resp) => {
        Object.entries(resp.data).forEach(([key, value]) => {
          let ob = {};
          ob.shortName = key;
          ob.clientPaymentTypes = value;
          array.push(ob);
        });
        this.setState({ list: array });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getPaymentUser(currency) {
    otc
      .getPayments(currency, sessionStorage.getItem("username"))
      .then((resp) => {
        // //console.log(resp.data);
        this.setState({ paymentsUserForCurrency: resp.data });
      })
      .catch((error) => {
        this.setState({ paymentsUserForCurrency: [] });
        //console.log(error);
      });
  }
  async handleCountry(e, data) {
      try {
    let transactionsTypes = await otc._getAllowedAddPayments(data.value);
   // console.log(transactionsTypes.data);
    if (transactionsTypes.data.thirds) {
      this.setState({ showMessageRecomende: false });
      this.getPaymentUser(data.value);
      let array = [];
      let payments = this.state.list.find(function (ele) {
        return data.value === ele.shortName;
      });
      this.groupPaymentTypesByCurrency(payments);
      let paymentdata = this.state.currencies.find(function (ele) {
        return data.value === ele.value;
      });

      for (let value of payments.clientPaymentTypes) {
        let has;
        has = this.constantPaymentsTypes.has(value.name);
        if (has) {
          array.push({
            text: this.constantPaymentsTypes.get(value.name),
            value: value,
            key: value.name,
          });
        } else {
          array.push({
            text: value.description,
            value: value,
            key: value.name,
          });
        }
      }
      this.fields = [];
      this.setState({
        country: paymentdata.value,
        imgCountry: paymentdata.img,
        listPaymentTypes: array,
        viewErrorCurrency: false,
        textMessage: "",
        getresult: false,
      });
    } else {
      let paymentdata = this.state.currencies.find(function (ele) {
        return data.value === ele.value;
      });
      this.setState({
        getresult: true,
        showMessageRecomende: false,
        fields: [],
        country: paymentdata.value,
        imgCountry: paymentdata.img,
        listPaymentTypes: [],
        viewErrorCurrency: true,
        textMessage: "dynamicForm.emptyFields",
      });

      // setTimeout(() => {
      //   this.setState({ viewErrorCurrency: false, textMessage: "" });
      // }, 5000);
    }
    } catch (error) {
      console.log(error.toString());
    }
  }
  groupPaymentTypesByCurrency(payments) {
    let fields = [];
    let fieldsCreditCard = [];
    let paymentsType = payments.clientPaymentTypes;
    //console.log(paymentsType);
    if (paymentsType.length > 0) {
      for (let payment of paymentsType) {
        if (payment.allowToAddPayment === true) {
          for (let field of payment.fields) {
            if (field.client !== undefined && field.client) {
              let ob = {};
              let objCreditCard = {};
              let fieldExist = fields.find(function (element) {
                return element.name === field.name;
              });
              if (fieldExist === undefined) {
                if (field.values !== undefined) {
                  let arrayRecomended = [];
                  if (
                    payment.name === "TRANSFER_WITH_SPECIFIC_BANK" ||
                    payment.name === "CREDIT_CARD"
                  ) {
                    this.setState({
                      showMessageRecomende: true,
                    });

                    for (let value of field.values) {
                      let objRecomende = {
                        value: value,
                        text: field.name === "bank" ? "**" + value : value,
                      };
                      arrayRecomended.push(objRecomende);
                    }
                    ob.name = field.name;
                    ob.values = arrayRecomended;
                    ob.required = field.required;
                    fields.push(ob);
                  }
                } else {
                  ob.name = field.name;
                  fields.push(ob);
                }
              } else {
                if (field.values !== undefined) {
                  fields.map(function (element) {
                    if (element.name === field.name) {
                      if (field.name !== "accountType") {
                        for (let value of field.values) {
                          if (element.values.indexOf(value) === -1) {
                            let ob = {
                              value: value,
                              text: value,
                            };
                            element.values.push(ob);
                          }
                        }
                      }
                    }

                    return element;
                  });
                }
              }
              if (payment.name === "CREDIT_CARD") {
                objCreditCard.name = field.name;
                fieldsCreditCard.push(objCreditCard);
              }
            }
          }
        }

        this.fields = fields;
        let hasCreditCard = {
          isCreditCard: fieldsCreditCard.length > 0,
          fields: fieldsCreditCard,
        };
        this.hasCreditCard = hasCreditCard;
        //console.log(hasCreditCard);
        this.setState({ fields: fields, hasCreditCard: hasCreditCard });
        //console.log(fields);
      }
    }
  }
  handleField(name, value) {
    if (value.toString().includes("**")) {
      value = value.split("**")[0];
    }
    let oj = {
      [name]: value,
    };

    this.setState({ paymentBody: [...this.state.paymentBody, oj] });
  }
  handleEmailReceiver(e, data) {
    //  //console.log(data);
    this.setState({ emailReceiver: data.value });
  }
  handleNewAcount(e) {
    e.preventDefault();
    let regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let pay = {};
    let body = {};
    for (let value of this.state.paymentBody) {
      Object.entries(value).forEach(([key, val]) => {
        Object.defineProperty(pay, key, {
          value: val,
          enumerable: true,
          configurable: true,
          writable: true,
        });
      });
    }
    //  //console.log(pay);
    let auxPaymentType = this.state.listPaymentTypes.filter(
      (p) => p.value.name === "CREDIT_CARD"
    );
    if (this.state.specialValue) {
      body = {
        userName: user.getUserName(),
        currency: this.state.country,
        bankLogin: pay.bankLogin,
        bankPassword: pay.bankPassword,
        paymentBank: pay.bank,
        paymentType: this.state.payment,
      };
      //  //console.log(body);
      this.setState({ formLoad: true });
      paymentApi
        .createExternalPaymentMethod(body)
        .then((resp) => {
          //  //console.log(resp);
          this.setState({
            formLoad: false,
            formAdd: Math.random(),
            getresult: true,
          });
          let keysResp = Object.keys(resp.data);
          if (keysResp.length > 0) {
            if (this.state.paymentsUserForCurrency.length > 0) {
              let paymentExist = this.state.paymentsUserForCurrency.find(
                function (element) {
                  return element.id === resp.data.id;
                }
              );
              if (paymentExist === undefined) {
                this.setState({
                  viewMessage: true,
                  textMessage: "profile.addAccount.messages.addAccountSuccess",
                  payment: "",
                  country: "",
                  idHolder: "",
                  bank: "",
                  paymentText: "",
                  countryText: "",
                  accountHolder: "",
                  nameHolder: "",
                  imgCountr: "",
                  banks: [],
                  paymentBody: [],
                  fields: [],
                  clientPaymenType: {},
                  paymentTypeBody: "",
                  listCountrysView: [],
                  emailReceiver: "",
                });
              } else {
                this.setState({
                  viewMessage: true,
                  textMessage:
                    "profile.addAccount.messages.errorExistExternalPayment",
                  payment: "",
                  country: "",
                  idHolder: "",
                  imgCountr: "",
                  bank: "",
                  paymentText: "",
                  countryText: "",
                  accountHolder: "",
                  nameHolder: "",
                  banks: [],
                  paymentBody: [],
                  fields: [],
                  clientPaymenType: {},
                  paymentTypeBody: "",
                  listCountrysView: [],
                });
                setTimeout(() => {
                  this.setState({ viewMessage: false, textMessage: "" });
                }, 5000);
              }
            } else {
              this.setState({
                viewMessage: true,
                textMessage: "profile.addAccount.messages.addAccountSuccess",
                payment: "",
                country: "",
                idHolder: "",
                bank: "",
                paymentText: "",
                countryText: "",
                accountHolder: "",
                nameHolder: "",
                imgCountr: "",
                banks: [],
                paymentBody: [],
                fields: [],
                clientPaymenType: {},
                paymentTypeBody: "",
                listCountrysView: [],
                emailReceiver: "",
              });
            }
          } else {
            this.setState({
              viewMessage: true,
              textMessage:
                "profile.addAccount.messages.errorExternalPaymentCreate",
              payment: "",
              formLoad: false,
              country: "",
              idHolder: "",
              imgCountr: "",
              bank: "",
              paymentText: "",
              countryText: "",
              accountHolder: "",
              nameHolder: "",
              banks: [],
              paymentBody: [],
              fields: [],
              clientPaymenType: {},
              paymentTypeBody: "",
              listCountrysView: [],
              getresult: true,
              emailReceiver: "",
            });
            setTimeout(() => {
              this.setState({ viewMessage: false, textMessage: "" });
              //this.handleCancel();
            }, 5000);
          }
        })
        .catch((error) => {
          //  //console.log(error);
          this.setState({
            viewMessage: true,
            textMessage: "profile.addAccount.messages.errorServer",
            payment: "",
            formLoad: false,
            country: "",
            idHolder: "",
            imgCountr: "",
            bank: "",
            paymentText: "",
            countryText: "",
            accountHolder: "",
            nameHolder: "",
            banks: [],
            paymentBody: [],
            fields: [],
            clientPaymenType: {},
            paymentTypeBody: "",
            listCountrysView: [],
            getresult: true,
            emailReceiver: "",
          });
          setTimeout(() => {
            this.setState({ viewMessage: false, textMessage: "" });
            //this.handleCancel();
          }, 5000);
        });
    } else {
      if (this.state.emailReceiver !== "") {
        if (regex.test(this.state.emailReceiver)) {
          pay.messages = this.state.messagesBody;
          pay.type = this.state.payment;
          pay.automaticCharge = this.state.automatic;
          pay.emailReceiver = this.state.emailReceiver;
          this.setState({ formLoad: true });
          if (pay.hasOwnProperty("cardType")) {
            pay.messages = auxPaymentType[0].value.messages;
            pay.type = auxPaymentType[0].value.name;
            pay.automaticCharge = auxPaymentType[0].value.automaticCharge;
            pay.forceVerification = auxPaymentType[0].value.forceVerification;
          }
          body = {
            userName: user.getUserName(),
            currency: this.state.country,
            payment: pay,
          };
          //console.log(pay);
          otc
            .addPayment(body)
            .then((resp) => {
              // //console.log(resp);
              this.setState({
                formLoad: false,
                formAdd: Math.random(),
                getresult: true,
              });
              this.setState({
                viewMessage: true,
                textMessage: "profile.addAccount.messages.addAccountSuccess",
                payment: "",
                country: "",
                idHolder: "",
                bank: "",
                paymentText: "",
                countryText: "",
                accountHolder: "",
                nameHolder: "",
                imgCountr: "",
                banks: [],
                paymentBody: [],
                fields: [],
                clientPaymenType: {},
                paymentTypeBody: "",
                listCountrysView: [],
                emailReceiver: "",
                hasCreditCard: {},
              });
              setTimeout(() => {
                this.setState({ viewMessage: false, textMessage: "" });
                //this.handleCancel();
                if (this.props.addAccount) {
                  this.props.changeStatusForm("THIRD");
                }
              }, 5000);
            })
            .catch((error) => {
              //console.log(error);
              this.setState({
                viewMessage: true,
                textMessage: "profile.addAccount.messages.errorServer",
                payment: "",
                country: "",
                idHolder: "",
                imgCountr: "",
                bank: "",
                paymentText: "",
                countryText: "",
                accountHolder: "",
                nameHolder: "",
                banks: [],
                paymentBody: [],
                fields: [],
                clientPaymenType: {},
                paymentTypeBody: "",
                listCountrysView: [],
                getresult: true,
                emailReceiver: "",
                formLoad: false,
                hasCreditCard: {},
              });
              setTimeout(() => {
                this.setState({ viewMessage: false, textMessage: "" });
                //this.handleCancel();
              }, 5000);
            });
        } else {
          this.setState({
            messageEmailReceiver:
              "profile.addAccount.messages.errorEmailReceiverWrong",
            errorEmailReceiver: true,
          });
          setTimeout(() => {
            this.setState({
              messageEmailReceiver: "",
              errorEmailReceiver: false,
            });
          }, 4000);
        }
      } else {
        this.setState({
          messageEmailReceiver:
            "profile.addAccount.messages.errorEmailReceiverEmpty",
          errorEmailReceiver: true,
        });
        setTimeout(() => {
          this.setState({
            messageEmailReceiver: "",
            errorEmailReceiver: false,
          });
        }, 4000);
      }
    }
  }
  handleCancel() {
    //   //console.log(this.props);
    if (!this.props.addAccount) {
      this.props.changeItem("list-other");
      this.props.changeItemTwo("optionCurren");
    } else {
      this.props.backForm("OWN");
    }
  }
  handleSpecial(value) {
    this.setState({ specialValue: value });
  }
  render() {
    let t = this.state.translator;
    let list = this.state.currencies;
    let message, errorEmail, errorCurrency;
    if(this.state.viewErrorCurrency || this.state.fields.length===0){
       errorCurrency = (
        <Message
          negative
          content={t(this.state.textMessage)}
        />
      );
    }
    if (this.state.viewMessage) {
      message = (
        <Message
          info
          style={isMobile ? { width: 200 } : {}}
          content={t(this.state.textMessage)}
        />
      );
    }
    if (this.state.errorEmailReceiver) {
      errorEmail = (
        <Label
          basic
          color="red"
          pointing
          content={this.state.messageEmailReceiver}
        />
      );
    }
    let massageRecomended = (
      <Message color="green" style={isMobile ? { width: 200 } : {}}>
        <span style={{ fontWeight: "bold" }}>
          {t("profile.addOwnAccount.messages.recomended")}
        </span>
      </Message>
    );

    return (
      <div>
        {!this.props.addAccount && (
          <div>
            <Header
              textAlign="center"
              style={isMobile ? { color: "#207ef2" } : {}}
            >
              {t("profile.addAccount.addPaymentMethod")}
            </Header>
            <Divider
              style={isMobile ? { marginTop: -10, borderColor: "#207ef2" } : {}}
            />
          </div>
        )}

        <Grid columns="equal">
          {isMobile && <Grid.Column mobile={2} />}
          <Grid.Column largeScreen={11} mobile={8} computer={11} tablet={11}>
            <Form
              error
              loading={this.state.formLoad}
              key={this.state.formAdd}
              onSubmit={this.handleNewAcount.bind(this)}
            >
              <Form.Group columns="equal">
                <Form.Field>
                  <label
                    style={
                      isMobile ? { color: "#207ef2", textAlign: "left" } : { textAlign: "left" }
                    }
                  >
                    <strong>{t("recharge.form.fields.currency")}</strong>
                  </label>
                  <Form.Select
                    onChange={this.handleCountry.bind(this)}
                    placeholder={t("profile.addAccount.placeholderCoin")}
                    options={list}
                    size="tiny"
                  />
                </Form.Field>
                <Form.Field>
                  <Image
                    style={{ marginTop: "24px" }}
                    src={this.state.imgCountry}
                    circular
                    size="mini"
                  />
                </Form.Field>
                <Responsive as={Form.Field} {...Responsive.onlyMobile}>
                  {" "}
                  <Divider hidden />
                  <br />
                </Responsive>
              </Form.Group>
              {this.state.showMessageRecomende === true && massageRecomended}
              <DinamicForm
                fields={this.state.fields}
                setDinamicValue={this.handleField.bind(this)}
                operation="sell"
                thirdAccount={true}
                setSpecialValue={this.handleSpecial.bind(this)}
                creditCard={this.state.hasCreditCard}
              />
              <Divider hidden />
              {this.state.country !== "" &&
                !this.state.specialValue &&
                this.state.fields.length !== 0 && (
                  <Grid>
                    <Grid.Column largeScreen={8} computer={8} tablet={8}>
                      <Form.Field>
                        <label>{t("profile.addAccount.emailReceiver")}</label>
                        <Input
                          // fluid
                          required
                          name="emailReceiver"
                          placeholder={t(
                            "profile.addAccount.placeholderEmailReceiver"
                          )}
                          onChange={this.handleEmailReceiver.bind(this)}
                        />
                        {errorEmail}
                      </Form.Field>
                    </Grid.Column>
                  </Grid>
                )}
              <Divider hidden />
              {message}
              {this.state.country !== "" &&  errorCurrency}
              <br />
              <Form.Group>
                {!this.state.getresult && (
                  <Form.Field>
                    <Form.Button type="submit" color="blue">
                      {t("profile.addAccount.buttonAdd")}
                    </Form.Button>
                  </Form.Field>
                )}
                {!this.props.addAccount && (
                  <Form.Field>
                    <Button color="blue" onClick={this.handleCancel.bind(this)}>
                      {t("profile.addAccount.buttonBack")}
                    </Button>
                  </Form.Field>
                )}
              </Form.Group>
            </Form>
          </Grid.Column>
          <Grid.Column largeScreen={5} computer={5} tablet={5} mobile={null} />
        </Grid>
      </div>
    );
  }
}
export default translate(AddAcount);
