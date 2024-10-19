/* eslint-disable no-loop-func */
import React, { Component } from 'react';
import '../Recharge.css';
import {
  Button,
  Container,
  Divider,
  Segment,
  Form,
  Grid,
  Label,
  Modal,
  Image,
  Message,
  Dropdown,
  Header,
  GridRow,
} from 'semantic-ui-react';
import currency from '../../../common/currency';
import CurrencyInput from 'react-currency-input';
import NumberFormat from 'react-number-format';
import DinamicForm from '../../DinamicForm/DinamicForm';
import otcAPI from '../../../services/otc';
import { parse } from 'query-string';
import paymentApi from '../../../services/payment';
import translate from '../../../i18n/translate';
import term from '../../../common/termAndConditionsSell';
import { isMobile } from 'react-device-detect';
import TermsAndConditions from '../../TermsAndConditions/TermsAndConditionsMoneyClick';
import '../Recharge.css';
import currencyFlag from '../../../common/currencyFlag';
import user from '../../../services/user';
import FormVerificationIdentity from "../FormVerificationIdentity/FormVerificationIdentity";
import FormChatVerification from "../FormChatVerification/FormChatVerification";
class RechargeForm extends Component {
  constructor(props) {
    let timer = null;
    super(props);
    const mapPayments = new Map();
    mapPayments.set('MONEYBEAN', 'MoneyBeam');
    mapPayments.set('POP_MONEY', 'Pop Money');
    mapPayments.set('PEOPLE_PAY', 'People Pay');
    mapPayments.set('RESERVE', 'Reserve');
    mapPayments.set('BOOZ', 'Booz');
    mapPayments.set('WISE', 'Wise');
    mapPayments.set('VENMO', 'Venmo');
    mapPayments.set('CASHAPP', 'Cashapp');

    mapPayments.set('ZELLE', 'Zelle');
    mapPayments.set('PAYPAL', 'Paypal');
    mapPayments.set('YAPE', 'Yape');
    //mapPayments.set('MONEYBEAN', 'MoneyBeam');
    mapPayments.set('NEQUI', 'Nequi');
    mapPayments.set('SUPERGIROS', 'Supergiros');
    mapPayments.set('EFECTY', 'Efecty');
    mapPayments.set('ACH', props.translate('profile.addAccount.ach'));
    mapPayments.set('ACH_EXPRESS', props.translate('profile.addAccount.ach_express'));
    mapPayments.set('MOBILE_PAYMENT', props.translate('profile.addAccount.MOBILE_PAYMENT'));
    mapPayments.set(
      'TRANSFER_WITH_SPECIFIC_BANK',
      props.translate('profile.addAccount.specificBank')
    );
    mapPayments.set(
      'TRANSFER_NATIONAL_BANK',
      props.translate('profile.addAccount.thirdBank')
    );
    mapPayments.set(
      'CHECK_DEPOSIT',
      props.translate('profile.addAccount.checkDeposit')
    );
    mapPayments.set(
      'PERSONAL_CHECK_DEPOSIT',
      props.translate('profile.addAccount.personalCheckDeposit')
    );
    mapPayments.set(
      'CASHIER_CHECK_DEPOSIT',
      props.translate('profile.addAccount.cashierCheckDeposit')
    );
    mapPayments.set(
      'MONEY_ORDER',
      props.translate('profile.addAccount.moneyOrder')
    );
    mapPayments.set(
      'CASH_DEPOSIT',
      props.translate('profile.addAccount.cashDeposit')
    );
    mapPayments.set(
      'WIRE_TRANSFER',
      props.translate('profile.addAccount.wire')
    );
    mapPayments.set(
      'TRANSFER_INTERNATIONAL_BANK',
      props.translate('profile.addAccount.international')
    );
    mapPayments.set(
      'TRANSFER_TO_CRYPTO_WALLET',
      props.translate('profile.addAccount.cryptoWallet')
    );
    mapPayments.set(
      'ELECTRONIC_TRANSFER',
      props.translate('profile.addAccount.electronicTrans')
    );
    mapPayments.set(
      'CREDIT_CARD',
      props.translate('profile.addAccount.creditCard')
    );
    mapPayments.set(
      'ACCOUNT_BANK',
      props.translate('dynamicForm.labels.bankAndOffice')
    );
      mapPayments.set(
      'BANK_ACCOUNT',
      props.translate('dynamicForm.labels.bankAndOffice')
    );

    mapPayments.set('MAIN', props.translate('recharge.options.moneyclick'));
    this.state = {
      showPreviewModal: false,
      sectionStyle: {
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        backgroundImage: '',
      },
      mapPayments: mapPayments,
      currencyLabelSelected: null, //guarda el nombre de la moneda selecciona.
      minAmount: 0, //monto minimo fiat para cada operación de compra.
      maxAmount: 0, //monto minimo fiat para cada operación de compra.
      paymentsDollarBTC: [], //contiene todos los pagos asociados a la moneda que selecciono el usuario.
      checkBoxSinRepetir: [],
      typePaymentsSelect: [], // contiene todos las formas de pagos asociados a dollarBTC.
      dollarBTCTypePaymentSelected: null,
      selectPaymentsDollarBTCFormated: [], // contiene todos los paymentsDollarBTC asociados a la forma de pago seleccionado previamente.
      dollarBTCPaymentSelected: '', //Contiene el payment de dollarBTC seleccionado en el combo.
      clientPaymentSelected: null, // Contiene el payment del cliente seleccionado en el combo.
      dollarBTCPaymentTypeSeleced: null,
      paymentsFromUserForSelect: [],
      commentInitial: '', // comentario inical en la operación.
      amountFiat: '', //monto
      errorAmountFiat: false,
      errorPaymentTypeElectronic: '',
      message: '',
      messageOperation: '',
      messageTerminsAndConditions: '',
      errorMoneda: false,
      errorPayment: false,
      bodyBuyBitCoins: '',
      openBuyConfirm: false,
      imgCurrencySelected: '',
      operationReady: false,
      listItemModal: [],
      identifier: '',
      isCreatedClientPayment: false,
      dollarBTCTypePaymentsFormaterSelect: [],
      formLoad: false,
      viewMessage: false,
      textMessage: '',
      resultUpdate: null,
      paymentBody: [],
      //Variables de la verificación de usuario.
      joinMyPayments: false,
      joinFieldValue: false,
      contSend: 0,
      show: false,
      showDimmer: false,
      statusUser: {},
      payWindow: '',
      showModalCreatePayment: false,
      bankSelectedDollarBTC: '',
      currencies: [], // guarda todas las modenas fiat en forma estatica. Este array se filtra por las monedas asociadas.
      accumulatedAmount: 0,
      totalAmount: 0,
      showModalTerminsAnsConditions: false,
      viewMessageTerm: false,
      termsAndConditionsAccepted: false,
      translator: props.translate,
      isElectronicTrans: false,
      typePaymentsElectronics: [],
      dollarBTCPaymentTypeElectronicSelected: null,
      allPaymentsUserByCurrency: [],
      amountChangedTo: 0,
      errorServer: false,
      textTerm: [],
      financialTypeNameSelected: '',
      typePaymentsToSelected: [],
      financialTypes : [],
      blockField: false,
      optionCheckDeposit: [],
      infoOfficess: [],
      isRealDataInfoOffices: [],
      validateDinamicForm: false,
      fields: [],
      messagesOfPayment: [],
      chargesByOperation: [],
      allMessageTerminsAndConditions: [],
      currenciesSelect: [],
      isUserMoneyClick: false,
      configUser: this.props.configUser,
      viewToShow: '',
      whatVerify: ''
    };
    this.handleChangeCurrencySelect = this.handleChangeCurrencySelect.bind(
      this
    );
    this.handleSubmitRecharge = this.handleSubmitRecharge.bind(this);
    this.handleComments = this.handleComments.bind(this);
    this.blankErrors = this.blankErrors.bind(this);
    this.closeSendConfirm = this.closeSendConfirm.bind(this);
    this.aceptSendConfirm = this.aceptSendConfirm.bind(this);
    this.getOfferByCurrency = this.getOfferByCurrency.bind(this);
    this._isMounted = false;
  }
  componentWillReceiveProps(nextProps, nextContext) {
    const mapPayments = new Map();
    mapPayments.set('MONEYBEAN', 'MoneyBeam');
    mapPayments.set('POP_MONEY', 'Pop Money');
    mapPayments.set('PEOPLE_PAY', 'People Pay');
    mapPayments.set('RESERVE', 'Reserve');
    mapPayments.set('ZELLE', 'Zelle');
    mapPayments.set('PAYPAL', 'Paypal');
    mapPayments.set('YAPE', 'Yape');
    //mapPayments.set('MONEYBEAN', 'Moneybeam');
    mapPayments.set('NEQUI', 'Nequi');
    mapPayments.set('BOOZ', 'Booz');
    mapPayments.set('WISE', 'Wise');
    mapPayments.set('VENMO', 'Venmo');
    mapPayments.set('CASHAPP', 'Cashapp');
    mapPayments.set('SUPERGIROS', 'SUPERGIROS');
    mapPayments.set('EFECTY', 'EFECTY');
    mapPayments.set('ACH', nextProps.translate('profile.addAccount.ach'));
    mapPayments.set('ACH_EXPRESS', nextProps.translate('profile.addAccount.ach_express'));
    mapPayments.set('MOBILE_PAYMENT', nextProps.translate('profile.addAccount.MOBILE_PAYMENT'));
    mapPayments.set(
      'TRANSFER_WITH_SPECIFIC_BANK',
      nextProps.translate('profile.addAccount.specificBank')
    );
    mapPayments.set(
      'TRANSFER_NATIONAL_BANK',
      nextProps.translate('profile.addAccount.thirdBank')
    );
    mapPayments.set(
      'CHECK_DEPOSIT',
      nextProps.translate('profile.addAccount.checkDeposit')
    );
    mapPayments.set(
      'PERSONAL_CHECK_DEPOSIT',
      nextProps.translate('profile.addAccount.personalCheckDeposit')
    );
    mapPayments.set(
      'CASHIER_CHECK_DEPOSIT',
      nextProps.translate('profile.addAccount.cashierCheckDeposit')
    );
    mapPayments.set(
      'MONEY_ORDER',
      nextProps.translate('profile.addAccount.moneyOrder')
    );
    mapPayments.set(
      'CASH_DEPOSIT',
      nextProps.translate('profile.addAccount.cashDeposit')
    );
    mapPayments.set(
      'WIRE_TRANSFER',
      nextProps.translate('profile.addAccount.wire')
    );
    mapPayments.set(
      'TRANSFER_INTERNATIONAL_BANK',
      nextProps.translate('profile.addAccount.international')
    );
    mapPayments.set(
      'TRANSFER_TO_CRYPTO_WALLET',
      nextProps.translate('profile.addAccount.cryptoWallet')
    );
    mapPayments.set(
      'ELECTRONIC_TRANSFER',
      nextProps.translate('profile.addAccount.electronicTrans')
    );
    mapPayments.set(
      'CREDIT_CARD',
      nextProps.translate('profile.addAccount.creditCard')
    );
    mapPayments.set(
      'ACCOUNT_BANK',
      nextProps.translate('dynamicForm.labels.bankAndOffice')
    );
    mapPayments.set(
      'BANK_ACCOUNT',
      nextProps.translate('dynamicForm.labels.bankAndOffice')
    );
    mapPayments.set('MAIN', nextProps.translate('recharge.options.moneyclick'));
    this.setState(
      {
        statusUser: nextProps.statusUser,
        mapPayments: mapPayments,
      },
      () => {
        this.setState({
          show: true,
        });
      }
    );
    if (this.props.language !== nextProps.language) {
      this.setState({ messageTerminsAndConditions: [] }, () => {
        for (let val of this.state.allMessageTerminsAndConditions) {
          let color = val.color;
          let message = '';
          if (nextProps.language === val.language) {
            message = val.message;
            if (color !== 'blue') {
              this.state.messageTerminsAndConditions.push(
                <Message
                  color={color}
                  content={() => {
                    if (
                      message.startsWith(
                        'Advertencia: Verifique que su código wallet contenga los datos correctos y correspondan'
                      )
                    ) {
                      return this.state.translator(
                        'recharge.form.messages.ethAlert'
                      );
                    } else if (
                      message.startsWith(
                        'Nota: Sus bitcoins estarán diferidos hasta que su depósito esté acreditado y sea verificado'
                      )
                    ) {
                      return this.state.translator(
                        'recharge.form.messages.blueAlert'
                      );
                    } else if (
                      message.startsWith(
                        'Atención: La transferencia sólo podrá realizarla desde su cuenta bancaria verificada y'
                      )
                    ) {
                      return this.state.translator(
                        'recharge.form.messages.redAlert'
                      );
                    } else if (
                      message.startsWith(
                        'Up to a maximum of $ 2,000 is allowed'
                      )
                    ) {
                      return this.state.translator(
                        'recharge.form.errors.comercialLimit'
                      );
                    } else if (
                      message.startsWith(
                        'Please note that for your first trade with us, we require that you initiate the wire in person at your bank'
                      )
                    ) {
                      return this.state.translator(
                        'recharge.form.errors.firstBuy'
                      );
                      //Tenga en cuenta que para su primera operación con nosotros, le solicitamos que inicie la transferencia en persona en su banco.
                    } else return message;
                  }}
                  class='padding-top-message'
                />
              );
            } else {
              this.state.messageTerminsAndConditions.push(
                <Message
                  info
                  content={() => {
                    if (
                      message.startsWith(
                        'Advertencia: Verifique que su código wallet contenga los datos correctos y correspondan'
                      )
                    ) {
                      return this.state.translator(
                        'recharge.form.messages.ethAlert'
                      );
                    } else if (
                      message.startsWith(
                        'Nota: Sus bitcoins estarán diferidos hasta que su depósito esté acreditado y sea verificado'
                      )
                    ) {
                      return this.state.translator(
                        'recharge.form.messages.blueAlert'
                      );
                    } else if (
                      message.startsWith(
                        'Atención: La transferencia sólo podrá realizarla desde su cuenta bancaria verificada y'
                      )
                    ) {
                      return this.state.translator(
                        'recharge.form.messages.redAlert'
                      );
                    } else if (
                      message.startsWith(
                        'Un monto maximo de $ 2,000 es permitido'
                      )
                    ) {
                      return this.state.translator(
                        'recharge.form.errors.comercialLimit'
                      );
                    } else if (
                      message.startsWith(
                        'Tenga en cuenta que para su primera operación con nosotros, le solicitamos que inicie la transferencia en persona en su banco.'
                      )
                    ) {
                      return this.state.translator(
                        'recharge.form.errors.firstBuy'
                      );
                    } else return message;
                  }}
                  class='padding-top-message'
                />
              );
            }
          }
        }
      });

      this.setState({
        translator: nextProps.translate,
      });
      if (this.state.typePaymentsToSelected.length > 0) {
        let setArray = this.state.typePaymentsToSelected.map((element) => {
          let item = {
            text: mapPayments.get(element.value),
            value: element.value,
            disabled: element.disabled,
          };
          return item;
        });
        this.setState({ typePaymentsToSelected: setArray }, () => {
          //console.log('typePaymentsToSelected ', setArray);
          if (setArray.length > 0) {
            this.setState({ financialTypeNameSelected: setArray[0].value }, () => { 
              this.setViewDinamyc();
              this.setOptionsByTypePaymentMethodSelected(setArray[0].value, '')
            }
            );
          }
        });
      }
      //console.log('this.state.dollarBTCTypePaymentsFormaterSelect.length ', this.state.dollarBTCTypePaymentsFormaterSelect.length)
      if (this.state.dollarBTCTypePaymentsFormaterSelect.length > 0) {
        let setArraytype = this.state.dollarBTCTypePaymentsFormaterSelect.map(
          (element) => {
            let item = {
              text: mapPayments.get(element.value),
              value: element.value,
              description: element.description,
            };
            return item;
          }
        );
        //console.log('setArraytype ', setArraytype);
        this.setState({ dollarBTCTypePaymentsFormaterSelect: setArraytype });
      }
      if (this.state.typePaymentsElectronics.length > 0) {
        let setArraytypeElectronic = this.state.typePaymentsElectronics.map(
          (element) => {
            let item = {
              text: mapPayments.get(element.value),
              value: element.value,
            };
            return item;
          }
        );
        //console.log('setArraytypeElectronic', setArraytypeElectronic);
        this.setState({ typePaymentsElectronics: setArraytypeElectronic });
      }
      if (this.state.optionCheckDeposit.length > 0) {
        let setArraytypeDeposit = this.state.optionCheckDeposit.map(
          (element) => {
            let item = {
              text: mapPayments.get(element.value),
              value: element.value,
              key: element.key,
            };
            return item;
          }
        );
        this.setState({ optionCheckDeposit: setArraytypeDeposit });
      }
      if (this.state.isRealDataInfoOffices.length > 0) {
        let arrayInfo = [];
        for (let info of this.state.isRealDataInfoOffices) {
          let obj = {
            fullInfo: info,
            value: [],
          };
          Object.entries(info).forEach(([key, val]) => {
            if (key === 'website' && val !== '') {
              let v = '';
              if (isMobile) {
                v = val.substring(0, 20) + '...';
              } else {
                v = val;
              }
              obj.value.push(
                <span key={key} style={{ textAlign: 'left' }}>
                  <b>
                    {nextProps.translate('officeInfo.' + key)}
                    {': '}
                    <a href={val} target='_blank'>
                      {v}
                    </a>
                  </b>
                  <br />
                </span>
              );
            } else if (key.includes('phone') && val !== '') {
              obj.value.push(
                <span key={key} style={{ textAlign: 'left' }}>
                  <b>{nextProps.translate('officeInfo.phone')}</b>
                  {': ' + val}
                  <br />
                </span>
              );
            } else if (!key.includes('phone') && val !== '') {
              obj.value.push(
                <span key={key} style={{ textAlign: 'left' }}>
                  <b>{nextProps.translate('officeInfo.' + key)}</b>
                  {': ' + val}
                  <br />
                </span>
              );
            }
          });
          arrayInfo.push(obj);
        }
        this.setState({ infoOfficess: arrayInfo });
      }
    }
  }
  handleComments(e) {
    this.setState({ commentInitial: e.target.value });
  }
  handleIdentifier(e) {
    this.setState({ identifier: e.target.value });
  }
  getCurrencies() {
    let arrayCurrenciesSelect = [];
    this.setState({ loadForm: true });
    otcAPI
      .getCurrencies()
      .then((response) => {
        this.setState({ loadForm: false });
        const currenciesWithoutCrypto = response.data.filter(currency => {
          return currency.shortName !== "BTC" &&
            currency.shortName !== "ETH" &&
            currency.shortName !== "USDT"
        })
        currenciesWithoutCrypto.map((currency) => {
          let item = {};
          item.text = currency.fullName;
          item.value = currency.shortName;
          item.key = currency.shortName;
          arrayCurrenciesSelect.push(item);
          return currency;
        });

        this.setState(
          {
            currencies: response.data,
            currenciesSelect: arrayCurrenciesSelect,
          },
          () => {
            let keys = Object.keys(parse(window.location.search));
            if (keys.indexOf('c') !== -1) {
              this.handleChangeCurrency(parse(window.location.search).c);
            } else {
              if (
                sessionStorage.getItem(
                  'formBuyBitcoins.currencyLabelSelected'
                ) !== null &&
                sessionStorage.getItem(
                  'formBuyBitcoins.currencyLabelSelected'
                ) !== '' &&
                sessionStorage.getItem(
                  'formBuyBitcoins.currencyLabelSelected'
                ) !== 'null'
              ) {
                this.setState(
                  {
                    currencyLabelSelected: sessionStorage.getItem(
                      'formBuyBitcoins.currencyLabelSelected'
                    ),
                  },
                  () => {
                    // console.log(
                    //   "formBuyBitcoins.currencyLabelSelected",
                    //   sessionStorage.getItem(
                    //     "formBuyBitcoins.currencyLabelSelected"
                    //   ) === "null"
                    // );
                    // console.log(
                    //   "handleChangeCurrency ",
                    //   this.state.currencyLabelSelected
                    // );
                    this.handleChangeCurrency(this.state.currencyLabelSelected);
                  }
                );
              }
            }
          }
        );
      })
      .catch((error) => {
        console.log('error ', error);
      });
  }
  saveInsessionStorage(key, value) {
    if (key === 'currencyLabelSelected') {
      sessionStorage.setItem('formBuyBitcoins.currencyLabelSelected', value);
    } else if (key === 'dollarBTCTypePaymentSelected') {
      sessionStorage.setItem(
        'formBuyBitcoins.dollarBTCTypePaymentSelected',
        value
      );
    } else if (key === 'bankSelectedDollarBTC') {
      sessionStorage.setItem('formBuyBitcoins.bankSelectedDollarBTC', value);
    } else if (key === 'dollarBTCTypePaymentTransferSelected') {
      sessionStorage.setItem(
        'formBuyBitcoins.dollarBTCTypePaymentTransferSelected',
        value
      );
    }
  }
  clearDatasessionStorageFormBuy(item) {
    if (item === 'currency') {
      sessionStorage.setItem('formBuyBitcoins.currencyLabelSelected', null);
      sessionStorage.setItem('formBuyBitcoins.bankSelectedDollarBTC', null);
      sessionStorage.setItem(
        'formBuyBitcoins.dollarBTCTypePaymentSelected',
        null
      );
      sessionStorage.setItem(
        'formBuyBitcoins.dollarBTCTypePaymentTransferSelected',
        null
      );
      sessionStorage.setItem(
        'typePaymentSelectedNew',
        null
      );
      

    } else if (item === 'bank') {
      sessionStorage.setItem('formBuyBitcoins.bankSelectedDollarBTC', null);
      sessionStorage.setItem(
        'formBuyBitcoins.dollarBTCTypePaymentSelected',
        null
      );
      sessionStorage.setItem(
        'formBuyBitcoins.dollarBTCTypePaymentTransferSelected',
        null
      );
    } else if (item === 'paymentType') {
      sessionStorage.setItem(
        'formBuyBitcoins.dollarBTCTypePaymentSelected',
        null
      );
      sessionStorage.setItem(
        'formBuyBitcoins.dollarBTCTypePaymentTransferSelected',
        null
      );
    }
  }
  getImageCurrency(currency) {
    let currencySelected = currencyFlag.currenciesFlag[currency];
    //console.log("getImageCurrency ", currency, currencySelected);
    if (currencySelected !== undefined) {
      this.setState({
        imgCurrencySelected: currencySelected.img,
      });
    }
  }
  handleChangeCurrency(currency) {
    this.getImageCurrency(currency);
    this.setState(
      {
        currencyLabelSelected: currency,
        typePaymentsToSelected: [],
        viewMessage: false
      },
      () => {
        this.getFinancialTypes(this.state.currencyLabelSelected);
        this.saveInsessionStorage('currencyLabelSelected', currency)
      }
    );
  }
  handleChangeCurrencySelect(event, data) {
    this.clearDatasessionStorageFormBuy('currency');
    this.cleanFields('currency');
    this.setState({ isCheckDeposit: false });
    this.handleChangeCurrency(data.value);
    this.setState({ bankSelectedDollarBTC: '', infoOfficess: [] });
    this.getFinancialTypes(data.value);
  }
  async getInfoOfficedsByPayment(officeId) {
    try {
      const response = await otcAPI.getOfficesInfoOtc(
        this.state.currencyLabelSelected,
        officeId
      );
      let arrayInfo = [];
      this.setState({ isRealDataInfoOffices: response.data });
      for (let info of response.data) {
        let obj = {
          fullInfo: info,
          value: [],
        };
        Object.entries(info).forEach(([key, val]) => {
          if (key === 'website' && val !== '') {
            let v = '';
            if (isMobile) {
              v = val.substring(0, 20) + '...';
            } else {
              v = val;
            }
            obj.value.push(
              <span key={key} style={{ textAlign: 'left' }}>
                <b>
                  {this.props.translate('officeInfo.' + key)}
                  {': '}
                  <a href={val} target='_blank'>
                    {v}
                  </a>
                </b>
                <br />
              </span>
            );
          } else if (key.includes('phone') && val !== '') {
            obj.value.push(
              <span key={key} style={{ textAlign: 'left' }}>
                <b>{this.props.translate('officeInfo.phone')}</b>
                {': ' + val}
                <br />
              </span>
            );
          } else if (!key.includes('phone') && val !== '') {
            obj.value.push(
              <span key={key} style={{ textAlign: 'left' }}>
                <b>{this.props.translate('officeInfo.' + key)}</b>
                {': ' + val}
                <br />
              </span>
            );
          }
        });
        arrayInfo.push(obj);
      }
      return arrayInfo;
    } catch (error) {
      return false;
    }
  }
  async handleChangePaymentDollarBTC(bankSelect, source) {
    if (source === undefined) {
      this.cleanFields('paymentsDollarBTC', bankSelect);
    }
    this.setState({
      dollarBTCTypePaymentsFormaterSelect: [],
      typePaymentsElectronics: [],
      dollarBTCTypePaymentSelected: '',
      dollarBTCPaymentTypeElectronicSelected: null,
      dollarBTCPaymentTypeSeleced: null,
      typeCheckSelected: '',
      clientPaymentSelected: null,
      isElectronicTrans: false,
      isCreatedClientPayment: false,
      isCheckDeposit: false,
      messageTerminsAndConditions: [],
      paymentsFromUserForSelect: [],
      infoOfficess: [],
    });

    let arrayFilteredByFinancialType = [];


    if (bankSelect.toString().includes('BANK_ACCOUNT')) {
      let bankName = bankSelect.toString().split('__')[2];
      let arrayFilteredByBank = this.state.paymentsDollarBTC.filter(
        (payment) => {
          if (payment.financialType === 'BANK_ACCOUNT' &&  payment.bank === bankName) {
            return payment;
          }
        }
      );
      if (arrayFilteredByBank.length > 0) {
        this.loadTypeAndTypeElectronic(arrayFilteredByBank);
        console.log('arrayFilteredByBank[0].officesInfoId ', arrayFilteredByBank[0].officesInfoId);
        if (typeof arrayFilteredByBank[0].officesInfoId !== 'undefined' && arrayFilteredByBank[0].officesInfoId !== 'N/A') {
          let infoOffices = await this.getInfoOfficedsByPayment(
            arrayFilteredByBank[0].officesInfoId
          );
          if (infoOffices !== false) {
            this.setState({ infoOfficess: infoOffices });
          }
        }
      } else { 
        this.showMessageNotOffert();
      }
      
    } else {
      arrayFilteredByFinancialType = this.state.paymentsDollarBTC.filter(paymentDollarBTC => { 
        return (paymentDollarBTC.financialType === bankSelect.toString().split('__')[0])
      });
      this.loadTypeAndTypeElectronic(arrayFilteredByFinancialType);
    }

    this.setState(
      {
        bankSelectedDollarBTC: bankSelect,
      },
      () => {
        sessionStorage.setItem(
          'formBuyBitcoins.bankSelectedDollarBTC',
          bankSelect
        );
      }
    );
  }

  loadFromStorage(mapTypes, mapTypeTransferElectronic) {
    if (
      sessionStorage.getItem('formBuyBitcoins.dollarBTCTypePaymentSelected') !==
        'null' &&
      sessionStorage.getItem('formBuyBitcoins.dollarBTCTypePaymentSelected') !==
        null
    ) {
      this.setState(
        {
          dollarBTCTypePaymentSelected: sessionStorage.getItem(
            'formBuyBitcoins.dollarBTCTypePaymentSelected'
          ),
        },
        () => {
          this.handleOnchangeDollarBTCTypePayments(
            this.state.dollarBTCTypePaymentSelected
          );
          if (
            sessionStorage.getItem(
              'formBuyBitcoins.dollarBTCTypePaymentTransferSelected'
            ) !== 'null' &&
            this.state.dollarBTCTypePaymentSelected === 'ELECTRONIC_TRANSFER'
          ) {
            this.setState(
              {
                dollarBTCPaymentTypeElectronicSelected: sessionStorage.getItem(
                  'formBuyBitcoins.dollarBTCTypePaymentTransferSelected'
                ),
              },
              () => {
                this.handleDollarBTCTypePaymentElectronic(
                  this.state.dollarBTCPaymentTypeElectronicSelected
                );
              }
            );
          }
        }
      );
    } else if (mapTypes.size === 1) {
      this.setState(
        {
          dollarBTCTypePaymentSelected: Array.from(mapTypes.values())[0].value,
          modalTern: true,
        },
        () => {
          this.handleOnchangeDollarBTCTypePayments(
            this.state.dollarBTCTypePaymentSelected
          );
        }
      );
    }

    if (
      mapTypeTransferElectronic.size === 1 &&
      this.state.dollarBTCTypePaymentsFormaterSelect.length === 1
    ) {
      this.setState(
        {
          dollarBTCPaymentTypeElectronicSelected: Array.from(
            mapTypeTransferElectronic.values()
          )[0].value,
          modalTern: true,
        },
        () => {
          this.handleDollarBTCTypePaymentElectronic(
            this.state.dollarBTCPaymentTypeElectronicSelected
          );
        }
      );
    }
  }

  loadTypeAndTypeElectronic(paymentsFilteredByBank) {
    console.log('paymentsFilteredByBank ', paymentsFilteredByBank);
    let mapTypes = new Map();
    let mapTypeTransferElectronic = new Map();
    for (let j = 0; j < paymentsFilteredByBank.length; j++) {
      let options = paymentsFilteredByBank[j].types;
      if (options.length > 0) {
        for (let i = 0; i < options.length; i++) {
          let type = options[i].name;
          if (
            type === 'TRANSFER_WITH_SPECIFIC_BANK' ||
            type === 'TRANSFER_NATIONAL_BANK' ||
            type === 'TRANSFER_INTERNATIONAL_BANK' ||
            type === 'WIRE_TRANSFER' ||
            type === 'ZELLE' ||
            type === 'PAYPAL' ||
            type === 'YAPE' ||
            type === 'MONEYBEAN' ||
            type === 'WISE' ||
            type === 'BOOZ' ||
            type === 'MOBILE_PAYMENT' ||
            type === 'NEQUI' ||
            type === 'SUPERGIROS' ||
            type === 'EFECTY' ||
            type === 'ACH' ||
            type === 'ACH_EXPRESS'
          ) {
           // console.log('type ', type);
            let item = {};
            item.text = this.state.mapPayments.get(options[i].name);
            item.value = options[i].name;
            mapTypeTransferElectronic.set(options[i].name, item);
            if (!mapTypes.has('ELECTRONIC_TRANSFER')) {
              options[i].text = this.state.mapPayments.get('ELECTRONIC_TRANSFER');
              options[i].value = 'ELECTRONIC_TRANSFER';
              options[i].description = '';

              mapTypes.set('ELECTRONIC_TRANSFER', options[i]);
            }
          } else if (type !== 'CREDIT_CARD') {
            if (
              type === 'PERSONAL_CHECK_DEPOSIT' ||
              type === 'CASHIER_CHECK_DEPOSIT' ||
              type === 'MONEY_ORDER'
            ) {
              if (!mapTypes.has('CHECK_DEPOSIT')) {
                options[i].text = this.state.mapPayments.get('CHECK_DEPOSIT');
                options[i].value = 'CHECK_DEPOSIT';
                options[i].description = '';

                mapTypes.set('CHECK_DEPOSIT', options[i]);
              }
            } else {
              if (!mapTypes.has(type)) {
                options[i].text = this.state.mapPayments.get(options[i].name);
                options[i].value = options[i].name;
                options[i].description = '';
                mapTypes.set(options[i].name, options[i]);
              }
            }
          }
        }
        console.log('mapTypeTransferElectronic ', mapTypeTransferElectronic);
        this.setState(
          {
            dollarBTCTypePaymentsFormaterSelect: Array.from(mapTypes.values()),
            typePaymentsElectronics: Array.from(
              mapTypeTransferElectronic.values()
            ),
          },
          () => {
            this.loadFromStorage(mapTypes, mapTypeTransferElectronic);
          }
        );
      } else {
        //console.log('no hay ofertas 2');
        this.showMessageNotOffert();
      }
    }
  }

  handleChangePaymentDollarBTCSelect = (event, data) => {
    this.clearDatasessionStorageFormBuy('bank');
    this.handleChangePaymentDollarBTC(data.value);
  };
  validateBuy() {
    if (this.state.currencyLabelSelected === '') {
      this.setState({
        errorMoneda: true,
        message: 'recharge.form.errors.requiredField',
      });
      this.blankErrors('errorMoneda');
      return false;
    } else if (this.state.amountFiat === '' || this.state.amountFiat === 0) {
      this.setState({
        errorAmountFiat: true,
        message: 'recharge.form.errors.requiredField',
      });
      this.blankErrors('errorAmountFiat');
      return false;
    } else if (
      this.state.amountFiat < this.state.minAmount ||
      this.state.amountFiat > this.state.maxAmount
    ) {
      this.setState({
        errorAmountFiat: true,
        message: 'recharge.form.errors.minAndMax',
      });
      this.blankErrors('errorAmountFiat');
      return false;
    } else if (this.state.dollarBTCPaymentSelected === '') {
      this.setState({
        errorPayment: true,
        message: 'recharge.form.errors.requiredField',
      });
      this.blankErrors('errorPayment');
      return false;
    } else if (
      this.state.isCreatedClientPayment &&
      this.state.dollarBTCPaymentTypeSeleced === null
    ) {
      this.setState({
        errorPaymentType: true,
        message: 'recharge.form.errors.requiredField',
      });
      this.blankErrors('errorPaymentType');
      return false;
    }
    return true;
  }

  handleSubmitRecharge(event, data) {
    if (this.state.termsAndConditionsAccepted === false) {
      this.setState({
        viewMessageTerm: true,
        message: 'recharge.form.errors.acceptTerms',
      });
      setTimeout(() => {
        this.setState({
          viewMessageTerm: false,
          message: '',
        });
      }, 7000);
    } else {
      if (this.validateBuy()) {
        event.preventDefault();
        this.getCharges();
        let bodyRecharge = {
          userName: sessionStorage.getItem('username'),
          currency: this.state.currencyLabelSelected,
          message: this.state.commentInitial,
          description: this.state.identifier,
          amount: this.state.amountFiat,
          dollarBTCPayment: this.state.dollarBTCPaymentSelected,
          clientPayment: this.state.clientPaymentSelected,
        };

        this.setState({
          bodyBuyBitCoins: bodyRecharge,
          openBuyConfirm: true,
        });
      }
    }
  }

  componentDidMount() {
    let arr = [];
    Object.entries(term.ters).forEach(([key, value]) => {
      arr.push(key);
    });

    this.setState({ textTerm: arr });
    if (typeof parse(window.location.search).id !== 'undefined') {
      this.redirectToMyBuys();
      // var uri = window.location.toString();
      // if (uri.indexOf("?") > 0) {
      //   var clean_uri = uri.substring(0, uri.indexOf("?"));
      //   window.history.replaceState({}, document.title, clean_uri);
      // }
    } else {
      this._isMounted = true;
      this.getCurrencies();
    }
  }

  getFinancialTypes(currency) {
    let typePaymentsToSelected = [];
    otcAPI.getFinancialTypes(currency).then(financialTypes => {
      console.log('financialTypes ', financialTypes.data);
      if (financialTypes.data.length > 0) {
        this.setState({
          financialTypes: financialTypes.data
        })
        financialTypes.data.forEach(financialType => {
          if (financialType.active && financialType.fiatBankDeposit) {
            typePaymentsToSelected.push({
              key: financialType.name,
              text: this.state.mapPayments.get(financialType.name),
              value: financialType.name
            });
          }
        });
        this.setState({
          typePaymentsToSelected: typePaymentsToSelected
        }, () => {
          //this.onLoadPaymentsDollarBTC(currency);
        })
      } else { 
        this.showMessageNotOffert();
      }
    });
  }

  setViewDinamyc() {
    let financialTypeNameSelected = this.state.financialTypes.find(ft => ft.name === this.state.financialTypeNameSelected);
    //console.log('setViewDinamycfinancialTypeNameSelected ', this.state.financialTypes, this.state.financialTypeNameSelected);
    if (typeof financialTypeNameSelected.verifications === 'undefined' ||
      typeof financialTypeNameSelected.verifications.deposits === 'undefined' || //you do not have verifications configured 
      (typeof this.state.configUser.verification.F !== "undefined" && // has the verification F approved
        this.state.configUser.verification.F.userVerificationStatus ===
        "OK") || !financialTypeNameSelected.verifications.deposits.active || (typeof this.state.configUser.verification[financialTypeNameSelected.verifications.deposits.type] !== 'undefined' &&
          this.state.configUser.verification[financialTypeNameSelected.verifications.deposits.type].userVerificationStatus === 'OK')) {
      if(typeof financialTypeNameSelected.verifications !== 'undefined' &&
       typeof financialTypeNameSelected.verifications.deposits !== 'undefined' &&
        financialTypeNameSelected.verifications.deposits.active){
          if (typeof this.state.configUser.verification.C !== "undefined" &&
        (this.state.configUser.verification.C.userVerificationStatus ===
          "PROCESSING" ||
          this.state.configUser.verification.C.userVerificationStatus ===
          "FAIL")) {
        this.setState({
          viewToShow: "FORM_CHAT",
          whatVerify: "C"
        })
      } else if (typeof this.state.configUser.verification.D !== "undefined" &&
        (this.state.configUser.verification.D.userVerificationStatus ===
          "PROCESSING" ||
          this.state.configUser.verification.D.userVerificationStatus ===
          "FAIL")) {
        this.setState({
          viewToShow: "FORM_CHAT",
          whatVerify: "D"
        })
      } else { 
        this.setState({
          viewToShow: "DEPOSIT"
        })
      }
      }else{
         this.setState({
          viewToShow: "DEPOSIT"
        })
      }
      
     

    } else { 
       this.setState({
        viewToShow: "VERIFY"
      })
    }
  }

  async onLoadPaymentsDollarBTC(moneda, financialTypeNameSelected) {
    this.setState({ loadForm: true });
    user
      .getBuyBalanceGetDollarBTCPayments(moneda)
      .then((res) => {
        //console.log('res.data ', res.data);
        this.setState({ loadForm: false });
       
          this.setState({
            paymentsDollarBTC: res.data.filter((payment) => {
              return payment.acceptIn && payment.active && (typeof payment.financialType !== 'undefined' && payment.financialType === financialTypeNameSelected) &&(typeof payment.restrictedDeposits === 'undefined' || !payment.restrictedDeposits);
            }),
          }, () => { 

            if (this.state.paymentsDollarBTC.length > 0) {
              this.getOfferByCurrency(this.state.paymentsDollarBTC);
            } else { 
              this.showMessageNotOffert();
            }
          });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loadForm: false });
      });
  }

  showMessageNotOffert() {
    this.setState({
      viewMessage: true,
      message: 'recharge.form.errors.notOffersForCurrency',
      messageTerminsAndConditions: '',
    });
    this.timer = setTimeout(() => {
      this.setState({ viewMessage: false, message: '' });
    }, 6000);
  }


  setBanksOptions(paymentsDollarBTC) {
    //console.log('paymentsDollarBTC ', paymentsDollarBTC);
   if (paymentsDollarBTC.length > 0) {
      let array = [];
      let name = '';
      for (let pay of paymentsDollarBTC) {
        let find = array.find(function (element) {
          return element.text === pay.bank;
        });
        if (find === undefined) {
          name = typeof pay.bank !== 'undefined' ? pay.bank : pay.financialType;
          if (pay.financialType !== undefined && pay.financialType === this.state.financialTypeNameSelected) {
            array.push({
              text: name,
              value: pay.financialType+'__' + pay.id + '__' + name,
              key: name,
            });
          } else if (
            pay.walletAddress !== undefined ||
            pay.address !== undefined
          ) {
            array.push({
              text: pay.walletAddress,
              value: 'CRYPTO__' + pay.walletAddress,
            });
          } 
        }
     }
    // console.log('selectPaymentsDollarBTCFormated ',array);
      this.setState(
        {
          selectPaymentsDollarBTCFormated: array,
        },
        () => {
          let value = sessionStorage.getItem(
            'formBuyBitcoins.bankSelectedDollarBTC'
          );
          if (value !== null && value !== 'null') {
            this.setState(
              {
                bankSelectedDollarBTC: value,
              },
              () => {
                this.handleChangePaymentDollarBTC(
                  this.state.bankSelectedDollarBTC,
                  ''
                );
              }
            );
          } else if (array.length > 0) {
            this.setState(
              {
                bankSelectedDollarBTC: array[0].value,
              },
              () => {
                this.handleChangePaymentDollarBTC(
                  this.state.bankSelectedDollarBTC,
                  ''
                );
              }
            );
          }
        }
      );
   } else {
     //console.log('jiji');
      if (
        this.state.currencyLabelSelected !== null &&
        this.state.currencyLabelSelected !== ''
      ) {
         this.showMessageNotOffert();
      }
    }
  }

  loadPaymentMethods() {
    this.setState({ loadForm: true });
    let value = sessionStorage.getItem('typePaymentSelectedNew');
    if (value !== null && value !== 'null' && value !== '') {
      this.clearDatasessionStorageFormBuy('bank');
      this.setState({ financialTypeNameSelected: value }, () => {
        this.setViewDinamyc();
              this.setOptionsByTypePaymentMethodSelected(
                this.state.financialTypeNameSelected,
                ''
              )
            }
            );
      }
  }

  async getOfferByCurrency(paymentsDBTC) {
    this.setState({ loadForm: true });
    this.loadPaymentMethods();
    this.setBanksOptions(paymentsDBTC);
    this.setState({ loadForm: false });
  }

  blankErrors(label) {
    if (label === 'errorMoneda') {
      setTimeout(() => {
        this.setState({ errorMoneda: false, message: '' });
      }, 2500);
    } else if (label === 'errorAmountFiat') {
      setTimeout(() => {
        this.setState({ errorAmountFiat: false, message: '' });
      }, 5000);
    } else if (label === 'errorPayment') {
      setTimeout(() => {
        this.setState({ errorPayment: false, message: '' });
      }, 5000);
    } else if (label === 'errorPaymentType') {
      setTimeout(() => {
        this.setState({ errorPaymentType: false, message: '' });
      }, 5000);
    }
  }

  handleAmount(e, values, floated) {
    const { value } = values;
    this.setState({
      amountFiat: floated,
    });
  }

  sendConfirm() {
    this.setState({
      amountChangedTo: 0,
      errorServer: false,
    });
    //console.log('this.state.bodyBuyBitCoins ', this.state.bodyBuyBitCoins);
    otcAPI
      .createOperation(this.state.bodyBuyBitCoins)
      .then((res) => {
        let msg = '';
        this.clearDatasessionStorageFormBuy('currency');
        if (res.data === 'THERE IS NO MATCH OFFER') {
          msg = 'recharge.form.errors.notProcessed';
        } else if (res.data.includes('AMOUNT IS NOT BETWEEN MIN AND MAX')) {
          msg = 'recharge.form.errors.amountBetween';
        } else if (res.data === 'USER HAS NOT ENOUGH BALANCE') {
          msg = 'recharge.form.errors.notBalance';
        } else if (res.data.includes('PRICE CHANGE')) {
          msg = 'recharge.form.errors.changePrice';
        } else if (res.data.includes('USER DAYLY LIMIT REACHED')) {
          msg = 'recharge.form.errors.userDaylyLimitReached';
        } else if (res.data.includes('USER MONTHLY LIMIT REACHED')) {
          msg = 'recharge.form.errors.userMoytlyLimitReached';
        } else {
          msg = 'recharge.form.messages.successRequest';
        }
        this.setState({
          formLoad: false,
          messageOperation: msg,
          operationReady: true,
        });
      })
      .catch((error) => {
        console.log('error recharge ', error);
        this.setState({
          formLoad: false,
          errorServer: true,
          messageOperation: 'recharge.form.errors.server',
          operationReady: true,
        });
      });
  }

  handleToUpdateFromFormBuyBTC() {
    var num = Math.floor(Math.random() * 100);
    this.props.handleToUpdate(num);
  }

  aceptSendConfirm() {
    this.setState({ formLoad: true });
    this.sendConfirm();
  }
  closeSendConfirm() {
    this.setState({
      openBuyConfirm: false,
    });
  }
  closeModalCreatePayment() {
    this.setState({
      showModalCreatePayment: false,
    });
  }
  redirectToMyBuys() {
    this.setState({
      openBuyConfirm: false,
    });
    sessionStorage.setItem('tokenUrl', null);
    this.props.handleItemClick();
  }

  handleClientPaymentSelected = (event, data) => {
    if (this.state.modalTern === true && data.value === 'crear') {
      if (
        sessionStorage.getItem('previewModal') !== 'true' &&
        this.state.showPreviewModal === false
      ) {
        this.setState(
          { showModalCreatePayment: true, showPreviewModal: true },
          () => {
            sessionStorage.setItem('previewModal', true);
          }
        );
      }
    }
    this.setState({
      isCreatedClientPayment: data.value === 'crear',
      clientPaymentSelected: data.value,
    });
  };
  setPaymentUserFromDinamicForm(paymentUser) {
    let array = '';
    Object.entries(paymentUser).forEach(([key, val]) => {
      if (
        key !== 'id' &&
        key !== 'messages' &&
        key !== 'type' &&
        key !== 'active' &&
        key !== 'acceptIn' &&
        key !== 'acceptOut' &&
        key !== 'joinField' &&
        key !== 'payWindow' &&
        key !== 'automaticCharge' &&
        key !== 'verified' &&
        key !== 'automatic' &&
        key !== 'accountBalance' &&
        key !== 'accountCurrency' &&
        key !== 'accountStatus' &&
        key !== 'restrictedDeposits' &&
        key !== 'financialType'
      )
        array = array + ' - ' + val;
      if (key === 'cardNumber') {
        let aux = '**** **** **** ' + val.slice(-4);
        array = array.replace(val, aux);
      }
      if (key === 'accountHolderName') {
        let accountHolderName = val;
        if (array.includes(accountHolderName)) {
          array = array.replace(accountHolderName + ' -', '');
        }
      }
    });
    let item = {
      text: array.substring(3),
      value: paymentUser,
    };
    this.state.paymentsFromUserForSelect.push(item);
    this.setState(
      {
        paymentsFromUserForSelect: this.state.paymentsFromUserForSelect,
      },
      () => {
        this.setState({
          clientPaymentSelected: paymentUser,
        });
      }
    );
  }

  floorDecimals = (value, numberDecimals) => {
    let decimales = Math.pow(10, numberDecimals);
    return Math.floor(value * decimales) / decimales;
  };

  cleanFields(opcion) {
    switch (opcion) {
      case 'currency':
        this.setState({
          financialTypeNameSelected: '',
          selectPaymentsDollarBTCFormated: [],
          bankSelectedDollarBTC: '',
          dollarBTCTypePaymentsFormaterSelect: [],
          typePaymentsElectronics: [],
          dollarBTCPaymentTypeSeleced: null,
          paymentsFromUserForSelect: [],
          clientPaymentSelected: null,
          dollarBTCPaymentTypeElectronicSelected: null,
          dollarBTCPaymentSelected: '',
          minAmount: 0,
          messageTerminsAndConditions: [],
          isElectronicTrans: false,
          typePaymentsSelect: [],
          amountFiat: '',
          isCreatedClientPayment: false,
          typeCheckSelected: '',
          isCheckDeposit: false,
        });
        //  this.clearDatasessionStorageFormBuy("currency")
        break;
      case 'paymentsDollarBTC':
        this.setState({
          bankSelectedDollarBTC: '',
          dollarBTCPaymentTypeElectronicSelected: null,
          dollarBTCPaymentSelected: '',
          minAmount: 0,
        });
        //this.clearDatasessionStorageFormBuy("paymentType")
        break;
      case 'typePaymentsDollarBTC':
        this.setState({
          paymentsFromUserForSelect: [],
          messageTerminsAndConditions: [],
          clientPaymentSelected: null,
          dollarBTCPaymentSelected: '',
          minAmount: 0,
          dollarBTCPaymentTypeElectronicSelected: null,
          isElectronicTrans: false,
          isCreatedClientPayment: false,
        });
        // this.clearDatasessionStorageFormBuy("paymentType")
        break;
      default:
    }
  }
  handleOnChangeDollarBTCTypePaymentElectronic(event, data) {
    //ultimo combo  onchange
    this.handleDollarBTCTypePaymentElectronic(data.value);
  }
  handleDollarBTCTypePaymentElectronic(value) {
    this.setState(
      {
        dollarBTCPaymentSelected: '',
        dollarBTCPaymentTypeElectronicSelected: value,
        dollarBTCPaymentTypeSeleced: 'ELECTRONIC_TRANSFER',
        isCreatedClientPayment: false,
        isCheckDeposit: false,
      },
      () => {
        this.saveInsessionStorage(
          'dollarBTCTypePaymentTransferSelected',
          value
        );
      }
    );
    this.loadPaymentClientAndMessages(value);
  }
  loadFieldToCheckDeposit() {
    let ofertsBySelect = [];
    let paymentId = this.state.bankSelectedDollarBTC.split('__')[1];
    let typesCheckAvailables = [
      'PERSONAL_CHECK_DEPOSIT',
      'CASHIER_CHECK_DEPOSIT',
      'MONEY_ORDER',
    ];
    for (let type of typesCheckAvailables) {
      let findPayment = this.state.paymentsDollarBTC.filter(function (ele) {
        return ele.id === paymentId;
      });
      for (let payment of findPayment) {
        let paymentByType = payment.buyBalance.find(function (
          optionBuyBalance
        ) {
          return optionBuyBalance.type === type;
        });
        if (paymentByType !== undefined) {
          let objSet = {
            key: type,
            text: this.state.mapPayments.get(type),
            value: type,
          };
          ofertsBySelect.push(objSet);
        }
      }
    }
    if (ofertsBySelect.length > 0) {
      this.setState({ optionCheckDeposit: ofertsBySelect });
    } else {
      //console.log('no hay ofertas 1');
      this.showMessageNotOffert();
    }
  }
  handleOnchangeDollarBTCTypePayments(paymentType, source) {
    if (source === undefined) {
      this.cleanFields('typePaymentsDollarBTC');
    }

    if (this.state.modalTern !== true) {
      if (
        sessionStorage.getItem('previewModal') !== 'true' &&
        this.state.showPreviewModal === false
      ) {
        this.setState(
          { showModalCreatePayment: true, showPreviewModal: true },
          () => {
            sessionStorage.setItem('previewModal', true);
          }
        );
      }
    }

    if (paymentType !== 'ELECTRONIC_TRANSFER') {
      if (paymentType !== 'CHECK_DEPOSIT') {
        sessionStorage.setItem(
          'formBuyBitcoins.dollarBTCTypePaymentTransferSelected',
          null
        );
        this.setState({
          isElectronicTrans: false,
        });

        this.loadPaymentClientAndMessages(paymentType);
      } else {
        this.setState({ isCheckDeposit: true, optionCheckDeposit: [] }, () =>
          this.loadFieldToCheckDeposit()
        );
      }
    } else {
      this.setState(
        {
          isElectronicTrans: true,
        },
        () => {
          this.saveInsessionStorage(
            'dollarBTCTypePaymentSelected',
            this.state.dollarBTCPaymentTypeSeleced
          );
        }
      );
    }

    this.setState(
      {
        dollarBTCPaymentTypeSeleced: paymentType,
      },
      () => {
        this.saveInsessionStorage(
          'dollarBTCTypePaymentSelected',
          this.state.dollarBTCPaymentTypeSeleced
        );
      }
    );
  }

  returnValues(data, IS_SPECIFIC_BANK, dataToFilter) {
    let arra = [];
    if (IS_SPECIFIC_BANK === null) {
      for (let value of data) {
        arra.push({ value: value, text: value });
      }
    } else {
      for (let value of data) {
        if (IS_SPECIFIC_BANK && value === dataToFilter) {
          arra.push({ value: value, text: value });
        } else if (!IS_SPECIFIC_BANK && value !== dataToFilter) {
          arra.push({ value: value, text: value });
        }
      }
    }
    return arra;
  }

  async loadPaymentClientAndMessages(paymentType) {
    if (this.state.financialTypeNameSelected !== '') { 
      this.setState({
         fields: this.state.financialTypes.find(ft=>ft.name === this.state.financialTypeNameSelected).fields,
      })
    }
    this.setState(
            {
              dollarBTCPaymentTypeElectronicSelected: paymentType
            },
            () => {
               this.onLoadPaymentsClients(
                      this.state.currencyLabelSelected
                    );
              let dollarBTCPaymentSelectAleatory = this.getPaymentDollarBTC(
                paymentType
              );

              //console.log('dollarBTCPaymentSelectAleatory ', dollarBTCPaymentSelectAleatory);

              this.setState({ listItemModal: [] });
              if (dollarBTCPaymentSelectAleatory !== undefined) {
                if (paymentType !== 'CREDIT_CARD') {
                  this.loadItemShowModal(dollarBTCPaymentSelectAleatory);
                  if (
                    dollarBTCPaymentSelectAleatory.payWindow !== undefined
                  ) {
                    this.setState({
                      payWindow: dollarBTCPaymentSelectAleatory.payWindow,
                    });
                  }
                }
                this.loadTerminsAnsConditions(
                  dollarBTCPaymentSelectAleatory.types,
                  paymentType
                );

                this.setState(
                  {
                    dollarBTCPaymentSelected: this.refactorPaymentDBTC(
                      dollarBTCPaymentSelectAleatory,
                      paymentType
                    ),
                  }, () => { 
                   // console.log('dollarBTCPaymentSelected ', this.state.dollarBTCPaymentSelected);
                  }
                );
              } else {
                //console.log('no hay ofertas 3');
                this.showMessageNotOffert();
              }
            }
          );
  }

  refactorPaymentDBTC(paymentDBTC, paymentType) {
    let paymentDBTCRefacto = {};
    Object.entries(paymentDBTC).forEach(([key, value]) => {
      if (key !== 'types') {
        paymentDBTCRefacto[key] = value;
      } else {
        let typeSelected = value.find(function (type) {
          return type.name === paymentType;
        });
        Object.entries(typeSelected).forEach(([keyType, valueType]) => {
          if (keyType !== 'name') {
            paymentDBTCRefacto[keyType] = valueType;
          } else {
            paymentDBTCRefacto.type = valueType;
          }
        });
      }
    });
    return paymentDBTCRefacto;
  }

  paymentHasType(paymentDBTC, type) {
    let hasPaymentType = false;
    paymentDBTC.buyBalance.map((option) => {
      if (option.type === type && (typeof paymentDBTC.bank === 'undefined' || paymentDBTC.bank ===
          this.state.bankSelectedDollarBTC.split('__')[2])) {
          this.setState({
            minAmount: option.minPerOperationAmount,
            maxAmount: option.maxPerOperationAmount,
          });
          hasPaymentType = true;
      }
      return true;
    });
    return hasPaymentType;
  }

  getPaymentDollarBTC(paymentType) {
    let dollarBTCPaymentSelectAleatory;
    if (paymentType !== 'TRANSFER_TO_CRYPTO_WALLET') {
      if (paymentType !== 'CREDIT_CARD') {
        //Debo obtener el payment de dollarBTC que cumpla con todas las condiciones(acceptIn,active) y ademas que cumpla con las codiciones de los filtros seleccionados previamente(type y bank).
        //console.log('paymentsDollarBTC ', this.state.paymentsDollarBTC);
        dollarBTCPaymentSelectAleatory = this.state.paymentsDollarBTC.find(
          (paymentFiltered) => {
            let isValid = paymentFiltered.financialType === this.state.bankSelectedDollarBTC.split('__')[0]
              &&
              this.paymentHasType(paymentFiltered, paymentType);
            if (isValid) {
              return true;
            } else { 
                return false;
            }
          }
        );
      } else {
        dollarBTCPaymentSelectAleatory = this.state.paymentsDollarBTC.find(
          (paymentFiltered) => {
            return paymentFiltered.type === paymentType;
          }
        );
      }
    } else {
      //Debo obtener el payment de dollarBTC que cumpla con todas las condiciones(acceptIn,active) y ademas que cumpla con las codiciones de los filtros seleccionados previamente(type y bank).
      dollarBTCPaymentSelectAleatory = this.state.paymentsDollarBTC.find(
        (paymentFiltered) => {
          return paymentFiltered.type === paymentType;
        }
      );
    }
    return dollarBTCPaymentSelectAleatory;
  }

  getCharges() {
    let bodyCharges = {
      currency: this.state.currencyLabelSelected,
      amount: parseFloat(this.state.amountFiat),
      btcPrice: this.state.priceForCalculator,
      operationType: 'MC_BUY_BALANCE',
      paymentType: this.state.dollarBTCPaymentSelected.type,
    };

    if (
      bodyCharges.amount !== null &&
      bodyCharges.amount !== '' &&
      bodyCharges.amount > 0 &&
      bodyCharges.amount !== undefined &&
      bodyCharges.amount.toString() !== 'NaN'
    ) {
      otcAPI
        ._getAllCharguesNewPost(bodyCharges)
        .then((resp) => {
          let charges = [];
          Object.entries(resp.data).forEach(([key, value]) => {
            if (key === 'VAT') {
              charges.push({
                label: this.state.translator(
                  'recharge.modalConfirm.charges.VAT'
                ),
                value: value.amount + ' ' + value.currency,
              });
            } else if (key === 'COMMISSION') {
              charges.push({
                label: this.state.translator(
                  'recharge.modalConfirm.charges.COMMISSION'
                ),
                value: value.amount + ' ' + value.currency,
              });
            } else {
              charges.push({
                label: key,
                value: value.amount + ' ' + value.currency,
              });
            }
          });
          this.setState({ chargesByOperation: charges });
        })
        .catch((error) => {});
    } else {
      console.log('error amount');
    }
  }

  setJoinMyPaymentsAndJoinFieldValue(typeToShow) {
    this.setState({
      joinFieldValue: typeToShow.joinFieldValue,
      joinMyPayments: typeToShow.joinMyPayments,
      payWindow: typeToShow.payWindow.split(' ')[0],
    });
  }
  loadTerminsAnsConditions(paymentTypes, typeSelected) {
     //console.log('allMessageTerminsAndConditions paymentTypes', paymentTypes, typeSelected);
    let arrayMessage = [];
    this.setState({ allMessageTerminsAndConditions: [] });
    console.log('paymentTypes ', paymentTypes);
    let typeToShow = paymentTypes.find(function (type) {
      return type.name === typeSelected;
    });

    let lenguage = this.props.language;
    if (typeToShow !== undefined) {
      this.setJoinMyPaymentsAndJoinFieldValue(typeToShow);
      this.setState({
        messagesOfPayment: typeToShow.messages,
      });
      //console.log('typeToShow.messages ', typeToShow);
      Object.entries(typeToShow.messages).forEach(([key, val]) => {
        if (
          key.toString().includes('MC_BUY_BALANCE') &&
          key.toString().includes('ALERT') &&
          key.split('__')[2] === lenguage.toUpperCase()
        ) {
          let obj = {};
          let aplitKey = key.split('__')[1];
          obj.color = aplitKey.split('_')[1].toLowerCase();
          if (val !== '') {
            obj.message = val;
            obj.language = 'en';
            arrayMessage.push(obj);
          }
        }
      });
    }

   

    this.setState(
      {
        messageTerminsAndConditions: [],
        allMessageTerminsAndConditions: arrayMessage,
      },
      () => {
        for (let val of arrayMessage) {
          let color = val.color;
          let message = '';
          message = val.message;
          if (color !== 'blue') {
            this.state.messageTerminsAndConditions.push(
              <Message
                color={color}
                content={message}
                class='padding-top-message'
              />
            );
          } else {
            this.state.messageTerminsAndConditions.push(
              <Message info content={message} class='padding-top-message' />
            );
          }
        }
      }
    );
  }
  loadItemShowModal(object) {
    //console.log('loadItemShowModal ', object);
    this.setState(
      {
        listItemModal: [],
      },
      () => {
        let array = [];
         if (object.financialType === 'BANK_ACCOUNT' && typeof object.bank !== 'undefined') { 
           array.push(<div>{object.bank}</div>);
        }
        if (object.financialType !== 'BANK_ACCOUNT'  && typeof object.accountHolderName !== 'undefined') { 
           array.push(<div>{object.accountHolderName}</div>);
        }

        Object.entries(object).map(([key, val]) => {
          if (
            key !== 'id' &&
            key !== 'messages' &&
            key !== 'type' &&
            key !== 'active' &&
            key !== 'acceptIn' &&
            key !== 'acceptOut' &&
            key !== 'joinField' &&
            key !== 'payWindow' &&
            key !== 'joinMyPayments' &&
            key !== 'joinFieldValue' &&
            key !== 'accountNumber' &&
            key !== 'accountHolderId' &&
            key !== 'accountHolderName' &&
            key !== 'description' &&
            key !== 'value' &&
            key !== 'text' &&
            key !== 'sendToPayments' &&
            key !== 'buyBalance' &&
            key !== 'types' &&
            key !== 'asociatedEmails' &&
            key !== 'restrictedDeposits' &&
            key !== 'financialType' &&
            key !== 'bank'
          ) {
            array.push(<div>{val}</div>);
          }
        });
        
        this.setState({
          listItemModal: array,
        });
      }
    );
  }
  handleOnchangeDollarBTCTypePaymentsSelect = (event, data) => {
    this.clearDatasessionStorageFormBuy('paymentType');
    this.setState({ isCheckDeposit: false, isElectronicTrans: false });
    this.handleOnchangeDollarBTCTypePayments(data.value);
  };
  onLoadPaymentsClients = (moneda) => {
    otcAPI
      .getPayments(moneda, sessionStorage.getItem('username'))
      .then((res) => {
        this.setState({
          paymentsFromUserForSelect: [],
        });
        let item = {
          text: this.state.translator(
            'recharge.form.fields.createPaymentMethod'
          ),
          value: 'crear',
        };
        // this.state.paymentsFromUserForSelect.push(item);
        this.setState((state) => {
          const paymentsFromUserForSelect = state.paymentsFromUserForSelect.concat(
            item
          );
          return { paymentsFromUserForSelect };
        });
     
        let accountHolderName = '';
        for (let i = 0; i < res.data.length; i++) {
          let array = ' ';
          if (
            typeof res.data[i].verified !== undefined &&
            res.data[i].verified &&
            (((this.state.dollarBTCPaymentTypeSeleced ===
              'TRANSFER_WITH_SPECIFIC_BANK' ||
              this.state.dollarBTCPaymentTypeElectronicSelected ===
                'TRANSFER_WITH_SPECIFIC_BANK') &&
              res.data[i].bank === this.state.dollarBTCPaymentSelected.bank &&
              res.data[i].type !== 'CREDIT_CARD') ||
              ((this.state.dollarBTCPaymentTypeSeleced ===
                'TRANSFER_NATIONAL_BANK' ||
                this.state.dollarBTCPaymentTypeElectronicSelected ===
                  'TRANSFER_NATIONAL_BANK') &&
                res.data[i].type === 'TRANSFER_NATIONAL_BANK') ||
              ((this.state.dollarBTCPaymentTypeSeleced === 'CREDIT_CARD' ||
                this.state.dollarBTCPaymentTypeElectronicSelected ===
                  'CREDIT_CARD') &&
                res.data[i].type === 'CREDIT_CARD'))
          ) {
            Object.entries(res.data[i]).forEach(([key, val]) => {
              if (
                key !== 'id' &&
                key !== 'messages' &&
                key !== 'type' &&
                key !== 'active' &&
                key !== 'acceptIn' &&
                key !== 'acceptOut' &&
                key !== 'joinField' &&
                key !== 'payWindow' &&
                key !== 'automaticCharge' &&
                key !== 'verified' &&
                key !== 'automatic' &&
                key !== 'accountBalance' &&
                key !== 'accountCurrency' &&
                key !== 'accountStatus' &&
                key !== 'forceVerification' &&
                key !== 'restrictedDeposits' &&
                key !== 'financialType'
              )
                array = array + ' - ' + val;
              if (key === 'accountHolderName') {
                accountHolderName = val;
                if (array.includes(accountHolderName)) {
                  array = array.replace(accountHolderName + ' -', '');
                }
              }
              if (key === 'cardNumber') {
                let aux = '**** **** **** ' + val.slice(-4);
                array = array.replace(val, aux);
              }
            });
            item = {
              text: array.substring(3),
              value: res.data[i],
            };
            this.state.paymentsFromUserForSelect.push(item);
          }
        }
   //console.log('res.data getPayments',this.state.paymentsFromUserForSelect);
        this.setState({
          paymentsFromUserForSelect: this.state.paymentsFromUserForSelect,
          loadingForm: false,
          allPaymentsUserByCurrency: res.data,
        });
      });
  };
  handleField(name, value) {
    let oj = {
      [name]: value,
    };

    this.setState({ paymentBody: [...this.state.paymentBody, oj] });
  }
  openModalTerminsAnsConditions() {
    this.setState({
      showModalTerminsAnsConditions: true,
    });
  }
  closeModalViewTerminosAndConditions() {
    this.setState({
      showModalTerminsAnsConditions: false,
    });
  }
  aceptTerminsAnsConditions(e, data) {
    this.setState({
      termsAndConditionsAccepted: !this.state.termsAndConditionsAccepted,
      showModalTerminsAnsConditions: false,
    });
  }

  gotoSignin() {
    window.location.href = '/registration';
  }

  handleTypePaymentsToSelected(e, data) {
    //console.log('financialselected ', );
    this.setState({
      minAmount: 0,
      maxAmount: 0,
      price: '',
      clientPaymentSelected: null,
      infoOfficess: [],
    });
    this.setState(
      {
        financialTypeNameSelected: data.value,
        dollarBTCTypePaymentsFormaterSelect: [],
        selectPaymentsDollarBTCFormated:[],
        isElectronicTrans: false,
        isCheckDeposit: false,
        messageTerminsAndConditions: [],
        dollarBTCPaymentTypeElectronicSelected: '',
        dollarBTCPaymentSelected: '',
        joinMyPayments: false,
      },
      () => {
         this.setViewDinamyc();
     this.onLoadPaymentsDollarBTC(this.state.currencyLabelSelected, this.state.financialTypeNameSelected);
          this.setOptionsByTypePaymentMethodSelected(
          this.state.financialTypeNameSelected,
          ''
        )
      }
      
    );
  }
  setOptionsByTypePaymentMethodSelected(value, source) {
   if (value === 'CREDIT_CARD') {
        sessionStorage.setItem('formBuyBitcoins.bankSelectedDollarBTC', null);
        this.clearDatasessionStorageFormBuy('bank');
        this.setState(
          { dollarBTCPaymentTypeSeleced: value, bankSelectedDollarBTC: '' },
          () => this.loadPaymentClientAndMessages(value)
        );
      }
      sessionStorage.setItem('typePaymentSelectedNew', value);
  }
  handleOnChangeTypeCheck(e, data) {
    this.setState({ typeCheckSelected: data.value }, () =>
      this.loadPaymentClientAndMessages(data.value)
    );
  }
  validateFielsOfPayment(payment) {
    let valid = true;
    this.state.fields.forEach((field) => {
      if (
        field.required &&
        (payment[field.name] === undefined ||
          payment[field.name].toString().trim() === '')
      ) {
        valid = false;
      }
    });
    return valid;
  }
  sendPaymentToVerify() {
    this.setState({
      loadingForm: true,
    });

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
    let bodyClientPayment = {};
    let clientPaymentObject = {};
    for (let value of this.state.paymentBody) {
      Object.entries(value).forEach(([key, val]) => {
        Object.defineProperty(clientPaymentObject, key, {
          value: val,
          enumerable: true,
          configurable: true,
          writable: true,
        });
      });
    }
    //  console.log('is valid ', this.validateFielsOfPayment(clientPaymentObject));
    if (this.validateFielsOfPayment(clientPaymentObject)) {
      //->clientPaymentObject.automaticCharge = this.state.clientPaymentTypeSelected.automaticCharge;
      clientPaymentObject.messages = this.state.messagesOfPayment;
      //->clientPaymentObject.type = this.state.clientPaymentTypeSelected.name;
      clientPaymentObject.verified = false;

      bodyClientPayment = {
        userName: sessionStorage.getItem('username'),
        currency: this.state.currencyLabelSelected,
        payment: clientPaymentObject,
      };
      otcAPI
        .addPayment(bodyClientPayment)
        .then((idPaymentVerification) => {
          this.addPaymentToConfigUser(idPaymentVerification.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({
        loadingForm: false,
      });
    }
  }

  async addPaymentToConfigUser(paymentId) {
    try {
      let body = {
        userName: window.sessionStorage.getItem('username'),
        fieldName: 'paymentId__' + paymentId,
        fieldValue: paymentId,
      };
      const response = await user.addDataUserAsync(body);
      if (response.data === 'OK') {
        this.initVerification(body.fieldName);
      }
    } catch (error) {
      console.log(error);
    }
  }

  initVerification(fieldName) {
    let body = {
      userName: window.sessionStorage.getItem('username'),
      fieldNames: [fieldName],
      userVerificationType: 'D',
      info: 'Verification payment from client',
    };

    // Axios
    user.verifyUserRequestCore(body).then((rep) => {
      if (rep.data === 'OK') {
        this.setState({
          loadingForm: false,
        });
        window.location.reload();
      }
    });
  }

  handleToUpdate(value) {
    window.open("/recharge", "_self");
    /* this.setState({
      toUpdate: value
    });*/
  }

  render() {
    let t = this.state.translator;
    let labelAmountFiat,
      labelMoneda,
      labelPayment,
      labelPaymentError,
      labelMessage,
      labelPaymentTypeElectronic;
    // let textTerm = this.state.textTerm.map((value, index) => (
    //   <p key={index}>{t("sell.mySells.terms." + value)}</p>
    // ));

    if (this.state.errorPayment) {
      labelPaymentError = (
        <Label basic color='red' pointing>
          {t(this.state.message)}
        </Label>
      );
    }
    if (this.state.errorMoneda) {
      labelMoneda = (
        <Label basic color='red' pointing>
          {t(this.state.message)}
        </Label>
      );
    }

    if (this.state.errorPayment) {
      labelPayment = (
        <Label basic color='red' pointing>
          {t(this.state.message)}
        </Label>
      );
    }

    if (this.state.errorPaymentTypeElectronic) {
      labelPaymentTypeElectronic = (
        <Label basic color='red' pointing>
          {t(this.state.message)}
        </Label>
      );
    }

    if (this.state.errorAmountFiat) {
      labelAmountFiat = (
        <Label basic color='red' pointing>
          {t(this.state.message)}
        </Label>
      );
    }

    if (this.state.operationReady || this.state.errorServer) {
      let content = t(this.state.messageOperation);
      labelMessage = <Message info content={content} />;
    }

    

    return (
      <div>
        <Grid columns='equal'>
          <Grid.Column largeScreen={16} mobile={16} tablet={16}>
            <Segment basic={isMobile} loading={this.state.loadingForm}>
              <Form
                error={this.state.error !== ''}
                success={this.state.success}
                loading={this.state.loadForm}
                unstackable
              >
                <Grid columns={2}>
                  <Grid.Column
                    largeScreen={8}
                    mobile={16}
                    tablet={8}
                    computer={8}
                  >
                    <Grid columns={2}>
                      <Grid.Column
                        largeScreen={13}
                        mobile={13}
                        tablet={13}
                        computer={13}
                      >
                        <Form.Field>
                          <label>{t('recharge.form.fields.currency')}</label>
                          <Dropdown
                            placeholder={t(
                              'recharge.form.fields.placeholderCurrency'
                            )}
                            fluid
                            search
                            selection
                            options={this.state.currenciesSelect}
                            onChange={this.handleChangeCurrencySelect}
                            value={this.state.currencyLabelSelected}
                          />
                          {labelMoneda}
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column
                        largeScreen={3}
                        mobile={3}
                        tablet={3}
                        computer={3}
                      >
                        {this.state.currencyLabelSelected !== '' && (
                          <Form.Field>
                            <Divider hidden style={{ marginBottom: '3.5px' }} />
                            <Image
                              avatar
                              size='mini'
                              src={this.state.imgCurrencySelected}
                            />
                          </Form.Field>
                        )}
                      </Grid.Column>
                    </Grid>
                  </Grid.Column>
                  {this.state.currencyLabelSelected !== null &&
        this.state.currencyLabelSelected !== '' && (
                      <Grid.Column
                        largeScreen={8}
                        mobile={16}
                        tablet={8}
                        computer={8}
                      >
                        <Form.Field required>
                          <label>
                            {t('recharge.form.fields.paymentMethods')}
                          </label>
                          <Dropdown
                            placeholder={t(
                              'recharge.form.fields.placeholderPaymentMethods'
                            )}
                            fluid
                            single
                            disabled={this.state.blockField}
                            selection
                            options={this.state.typePaymentsToSelected}
                            onChange={this.handleTypePaymentsToSelected.bind(
                              this
                            )}
                            value={this.state.financialTypeNameSelected}
                            selectValue={this.state.financialTypeNameSelected}
                          />
                          {labelPayment}
                        </Form.Field>
                      </Grid.Column>
                    )}
                </Grid>

          {this.state.viewToShow !== '' && 
          this.state.viewToShow === 'VERIFY' && 
          <FormVerificationIdentity
              configUser={this.state.configUser}
              handleToUpdate={this.handleToUpdate.bind(this)}
            />}
    

   {this.state.viewToShow !== '' && 
   this.state.viewToShow === 'FORM_CHAT' &&
    <FormChatVerification
              configUser={this.state.configUser}
              whatVerify={this.state.whatVerify}
              handleToUpdate={this.handleToUpdate.bind(this)}
            />
    }
                <Grid columns={2}>
                  {this.state.selectPaymentsDollarBTCFormated.length > 0 &&
                    this.state.financialTypeNameSelected !== '' &&
                    this.state.paymentsDollarBTC.length > 0 &&
                     this.state.viewToShow === 'DEPOSIT' && (
                      <Grid.Column
                        largeScreen={8}
                        mobile={16}
                        tablet={8}
                        computer={8}
                      >
                        <Form.Field required>
                          <label>{t('recharge.form.fields.banks')}</label>
                          <Dropdown
                            placeholder={t('recharge.form.fields.banks')}
                            fluid
                            single
                            selection
                            disabled={this.state.blockField}
                            options={this.state.selectPaymentsDollarBTCFormated}
                            onChange={this.handleChangePaymentDollarBTCSelect}
                            value={this.state.bankSelectedDollarBTC}
                            selectValue={this.state.bankSelectedDollarBTC}
                          />
                          {labelPayment}
                        </Form.Field>
                      </Grid.Column>
                    )}
                  {this.state.dollarBTCTypePaymentsFormaterSelect.length > 0 &&
                    this.state.paymentsDollarBTC.length > 0 &&
                    this.state.financialTypeNameSelected !== 'CREDIT_CARD' && 
                    this.state.viewToShow === 'DEPOSIT' &&  (
                      <Grid.Column
                        largeScreen={8}
                        mobile={16}
                        tablet={8}
                        computer={8}
                      >
                        <Form.Field required>
                          <label>
                            {t('recharge.form.fields.paymentsType')}
                          </label>
                          <Dropdown
                            placeholder={t(
                              'recharge.form.fields.placeholderSelect'
                            )}
                            fluid
                            selection
                            disabled={this.state.blockField}
                            onChange={
                              this.handleOnchangeDollarBTCTypePaymentsSelect
                            }
                            options={
                              this.state.dollarBTCTypePaymentsFormaterSelect
                            }
                            value={this.state.dollarBTCPaymentTypeSeleced}
                            selectValue={this.state.dollarBTCPaymentTypeSeleced}
                            defaultValue={
                              this.state.dollarBTCPaymentTypeSeleced
                            }
                          />
                        </Form.Field>
                      </Grid.Column>
                    )}
                </Grid>
                {this.state.infoOfficess.length > 0 &&
                this.state.viewToShow === 'DEPOSIT' &&  (
                  <Grid>
                    {this.state.infoOfficess.map((info, index) => (
                      <Grid.Row columns={1} key={index}>
                        <Grid.Column>
                          <Message
                            info
                            size={'small'}
                            style={{ textAlign: 'left' }}
                          >
                            {info.value}
                          </Message>
                        </Grid.Column>
                      </Grid.Row>
                    ))}
                  </Grid>
                )}
                {this.state.isElectronicTrans &&
                  this.state.financialTypeNameSelected !== 'CREDIT_CARD' && 
                  this.state.viewToShow === 'DEPOSIT' && (
                    <div>
                      <Grid columns={1}>
                        <Grid.Column
                          largeScreen={8}
                          mobile={16}
                          tablet={8}
                          computer={8}
                        >
                          <Form.Field required>
                            <label>
                              {t('recharge.form.fields.typeElectro')}
                            </label>
                            <Dropdown
                              fluid
                              selection
                              options={this.state.typePaymentsElectronics}
                              value={
                                this.state
                                  .dollarBTCPaymentTypeElectronicSelected
                              }
                              disabled={this.state.blockField}
                              selectValue={
                                this.state
                                  .dollarBTCPaymentTypeElectronicSelected
                              }
                              onChange={this.handleOnChangeDollarBTCTypePaymentElectronic.bind(
                                this
                              )}
                              defaultValue={
                                this.state
                                  .dollarBTCPaymentTypeElectronicSelected
                              }
                              placeholder={t(
                                'recharge.form.fields.placeholderType'
                              )}
                            />
                            {labelPaymentTypeElectronic}
                          </Form.Field>
                        </Grid.Column>
                      </Grid>
                    </div>
                  )}
                {this.state.isCheckDeposit &&
                  this.state.financialTypeNameSelected !== 'CREDIT_CARD' &&
                  this.state.optionCheckDeposit.length > 0 && 
                  this.state.viewToShow === 'DEPOSIT' && (
                    <div>
                      <Grid columns={1}>
                        <Grid.Column
                          largeScreen={16}
                          mobile={16}
                          tablet={16}
                          computer={16}
                        >
                          <Form.Field required>
                            <label>{t('recharge.form.fields.typeCheck')}</label>
                            <Dropdown
                              label={t('recharge.form.fields.typeCheck')}
                              fluid
                              selection
                              options={this.state.optionCheckDeposit}
                              value={this.state.typeCheckSelected}
                              selectValue={this.state.typeCheckSelected}
                              onChange={this.handleOnChangeTypeCheck.bind(this)}
                              placeholder={t('recharge.form.fields.typeCheck')}
                            />
                            {/* <Divider
                            hidden
                          /> */}
                            {labelPaymentTypeElectronic}
                          </Form.Field>
                        </Grid.Column>
                      </Grid>
                    </div>
                  )}
                {this.state.messageTerminsAndConditions.length > 0 && 
                (
                  <Grid.Column>
                    <Divider hidden />
                  </Grid.Column>
                )}
                {this.state.viewMessage && (
                  <Grid colums={1}>
                    <Grid.Column
                      largeScreen={16}
                      mobile={16}
                      tablet={16}
                      computer={16}
                    >
                      <Message color='red' content={t(this.state.message)} />
                    </Grid.Column>
                  </Grid>
                )}
                {this.state.messageTerminsAndConditions.length > 0 && 
                    this.state.viewToShow === 'DEPOSIT' && (
                  <Form.Field>
                    {this.state.messageTerminsAndConditions}
                  </Form.Field>
                )}

                {this.state.dollarBTCPaymentTypeElectronicSelected !== '' &&
                  this.state.dollarBTCPaymentTypeElectronicSelected !== null &&
                  this.state.dollarBTCPaymentSelected !== '' &&
                  this.state.joinMyPayments &&
                  sessionStorage.getItem('auth') === 'true' && 
                    this.state.viewToShow === 'DEPOSIT' && (
                    <div>
                      <Grid.Column>
                        <Divider hidden />
                      </Grid.Column>
                      <Grid columns={1}>
                        <Grid.Column
                          largeScreen={16}
                          mobile={16}
                          tablet={16}
                          computer={16}
                        >
                          <Form.Field required>
                            <label>
                              {t('recharge.form.fields.ownPaymentMethods')}
                            </label>
                            <Dropdown
                              placeholder={t(
                                'recharge.form.fields.placeholderOwnPaymentMethods'
                              )}
                              fluid
                              selection
                              options={this.state.paymentsFromUserForSelect}
                              value={this.state.clientPaymentSelected}
                              onChange={this.handleClientPaymentSelected.bind(
                                this
                              )}
                            />

                            {labelPaymentError}
                          </Form.Field>
                        </Grid.Column>
                      </Grid>
                    </div>
                  )}
                {this.state.isCreatedClientPayment &&
                  this.state.viewToShow === 'DEPOSIT' &&  (
                  <div>
                    <Grid columns={1}>
                      <Grid.Row>
                        <Grid.Column
                          largeScreen={16}
                          mobile={16}
                          tablet={16}
                          computer={16}
                        ></Grid.Column>
                        <Grid.Column
                          largeScreen={16}
                          mobile={16}
                          tablet={16}
                          computer={16}
                        >
                          <DinamicForm
                            currency={this.state.currencyLabelSelected}
                            fields={this.state.fields}
                            setDinamicValue={this.handleField.bind(this)}
                            validate={this.state.validateDinamicForm}
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column
                          largeScreen={16}
                          mobile={16}
                          tablet={16}
                          computer={16}
                        >
                          <Button
                            color='blue'
                            floated={'right'}
                            onClick={this.sendPaymentToVerify.bind(this)}
                          >
                            {this.props.translate('dynamicForm.buttonVerify')}
                          </Button>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </div>
                )}
                {((this.state.clientPaymentSelected !== null &&
                  this.state.clientPaymentSelected !== 'crear') ||
                  !this.state.joinMyPayments) &&
                  this.state.minAmount > 0 &&
                    this.state.viewToShow === 'DEPOSIT' &&  (
                    <div>
                      <Grid>
                        <Grid.Column
                          largeScreen={16}
                          mobile={16}
                          tablet={16}
                          computer={10}
                        >
                          <Form.Field>
                            <span>
                              <strong>
                                {t('recharge.form.fields.commercialLimits') +
                                  ' '}
                              </strong>
                              <NumberFormat
                                value={this.state.minAmount}
                                displayType={'text'}
                                thousandSeparator={true}
                              />
                              {' - '}
                              <NumberFormat
                                value={this.state.maxAmount}
                                displayType={'text'}
                                thousandSeparator={true}
                              />{' '}
                              {this.state.currencyLabelSelected}
                            </span>
                          </Form.Field>
                        </Grid.Column>
                      </Grid>
                    </div>
                  )}
                {
                  ((this.state.clientPaymentSelected !== null &&
                  this.state.clientPaymentSelected !== 'crear') ||
                  !this.state.joinMyPayments) &&
                  this.state.minAmount > 0 &&
                  this.state.dollarBTCPaymentSelected !== '' && 
                  (typeof this.state.dollarBTCPaymentSelected.restrictedDeposits === 'undefined' ||
                    this.state.dollarBTCPaymentSelected.restrictedDeposits === false) && 
                      this.state.viewToShow === 'DEPOSIT' && (
                    <div>
                      <Grid columns={2}>
                        <Grid.Column
                          largeScreen={8}
                          mobile={16}
                          tablet={16}
                          computer={10}
                        ></Grid.Column>
                      </Grid>
                      <Grid.Column>
                        <Divider hidden />
                      </Grid.Column>
                      <Grid columns={2}>
                        <Grid.Column
                          largeScreen={8}
                          mobile={16}
                          tablet={16}
                          computer={8}
                        >
                          <Form.Field required>
                            <label>
                              {t('recharge.form.fields.amount')}{' '}
                              {this.state.currencyLabelSelected !== ''
                                ? 'en ' + this.state.currencyLabelSelected
                                : ''}
                            </label>
                            <CurrencyInput
                              value={this.state.amountFiat}
                              placeholder={this.state.currencyLabelSelected}
                              name='fiat'
                              onChangeEvent={this.handleAmount.bind(this)}
                              precision={2}
                            />
                            {labelAmountFiat}
                          </Form.Field>
                        </Grid.Column>
                      </Grid>
                    </div>
                  )}

                {this.state.dollarBTCPaymentSelected !== '' &&
                  sessionStorage.getItem('auth') !== 'true' && (
                    <Grid>
                      <Grid.Column
                        largeScreen={16}
                        mobile={16}
                        tablet={16}
                        computer={16}
                      >
                        <div>
                          <Button
                            floated={'right'}
                            color='blue'
                            size='large'
                            onClick={() => this.gotoSignin()}
                          >
                            {t('navPublic.account.options.signup')}
                          </Button>
                        </div>
                      </Grid.Column>
                    </Grid>
                  )}
                {((this.state.clientPaymentSelected !== null &&
                  this.state.clientPaymentSelected === 'crear') ||
                  !this.state.joinMyPayments) &&
                  sessionStorage.getItem('auth') === 'true' &&
                    this.state.viewToShow === 'DEPOSIT' &&  (
                    <div>
                      <Grid.Column
                        largeScreen={16}
                        mobile={16}
                        tablet={16}
                        computer={16}
                      >
                        {this.state.viewMessageTerm && (
                          <Message info>{t(this.state.message)}</Message>
                        )}
                      </Grid.Column>
                    </div>
                  )}

                {((this.state.clientPaymentSelected !== null &&
                  this.state.clientPaymentSelected === 'crear') ||
                  !this.state.joinMyPayments) &&
                  sessionStorage.getItem('auth') === 'true' && 
                    this.state.viewToShow === 'DEPOSIT' && (
                    <div>
                      <Grid.Column
                        largeScreen={16}
                        mobile={16}
                        tablet={16}
                        computer={16}
                      >
                        {this.state.viewMessageTerm && (
                          <Message info>{t(this.state.message)}</Message>
                        )}
                      </Grid.Column>
                    </div>
                  )}

                {((this.state.clientPaymentSelected !== null &&
                  this.state.clientPaymentSelected !== 'crear') ||
                  !this.state.joinMyPayments) &&
                  sessionStorage.getItem('auth') === 'true' &&
                  this.state.minAmount > 0 &&
                  this.state.dollarBTCPaymentSelected !== '' && 
                  (typeof this.state.dollarBTCPaymentSelected.restrictedDeposits === 'undefined' ||
                    this.state.dollarBTCPaymentSelected.restrictedDeposits === false) && 
                      this.state.viewToShow === 'DEPOSIT' && (
                    <div>
                      <Grid.Column>{/* <Divider hidden/> */}</Grid.Column>
                      <Grid columns={1}>
                        <Grid.Column
                          largeScreen={16}
                          mobile={16}
                          tablet={16}
                          computer={16}
                        >
                          <Form.Field>
                            <label>
                              {t('recharge.form.fields.messageToTheModerator')}
                            </label>
                            <Form.TextArea
                              value={this.state.commentInitial}
                              onChange={this.handleComments}
                            />
                          </Form.Field>
                        </Grid.Column>
                      </Grid>
                      <Grid.Column>{/* <Divider hidden /> */}</Grid.Column>
                      <Grid columns={1}>
                        <Grid.Column
                          largeScreen={16}
                          mobile={16}
                          tablet={16}
                          computer={16}
                        >
                          <Form.Field required>
                            <input
                              value={this.state.identifier}
                              placeholder={t(
                                'recharge.form.fields.identifyBuy'
                              )}
                              onChange={this.handleIdentifier.bind(this)}
                            />
                          </Form.Field>
                        </Grid.Column>
                      </Grid>
                      <Grid.Column>
                        <Divider hidden />
                      </Grid.Column>
                      <Grid columns={1}>
                        <Grid.Column
                          largeScreen={16}
                          mobile={16}
                          tablet={16}
                          computer={16}
                        >
                          <Form.Group inline>
                            <Form.Checkbox
                              onChange={this.aceptTerminsAnsConditions.bind(
                                this
                              )}
                              checked={this.state.termsAndConditionsAccepted}
                            />
                            <Form.Field
                              required
                              onClick={this.openModalTerminsAnsConditions.bind(
                                this
                              )}
                            >
                              {t('recharge.form.fields.accept')}{' '}
                              <label>
                                <a
                                  onClick={this.openModalTerminsAnsConditions.bind(
                                    this
                                  )}
                                  className={'linkVerMas'}
                                >
                                  {t('recharge.form.fields.terms')}
                                </a>
                              </label>
                            </Form.Field>
                          </Form.Group>
                          {this.state.viewMessageTerm && (
                            <Message info>{t(this.state.message)}</Message>
                          )}
                        </Grid.Column>
                        <Grid.Column
                          largeScreen={16}
                          mobile={16}
                          tablet={16}
                          computer={16}
                          textAlign='center'
                        >
                          <div
                            style={{
                              alignContent: 'center',
                              textAlign: 'center',
                            }}
                          >
                            <Button
                              type='submit'
                              color='blue'
                              size='large'
                              onClick={this.handleSubmitRecharge.bind(this)}
                            >
                              {t('recharge.form.fields.buttonBuy')}
                            </Button>
                          </div>
                        </Grid.Column>
                      </Grid>
                    </div>
                  )}
              </Form>
            </Segment>
          </Grid.Column>
          <Grid.Column />
        </Grid>
        <Divider hidden section />
        <Modal
          open={this.state.openBuyConfirm}
          onClose={this.closeSendConfirm}
          className='Recharge'
        >
          <Modal.Header>{t('recharge.modalConfirm.header')}</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Segment loading={this.state.formLoad}>
                <div align='center'>
                  <strong>
                    {t('recharge.modalConfirm.request.part1')}{' '}
                    <NumberFormat
                      value={this.state.amountFiat}
                      displayType={'text'}
                      thousandSeparator={true}
                    />{' '}
                    {this.state.currencyLabelSelected}
                  </strong>
                </div>
                <Divider />
                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column largeScreen={8} computer={8}>
                      <div>
                        {this.state.dollarBTCPaymentSelected !== '' && (
                          <label>
                            {this.state.mapPayments.has(
                              this.state.dollarBTCPaymentTypeElectronicSelected
                            )
                              ? this.state.mapPayments.get(
                                  this.state
                                    .dollarBTCPaymentTypeElectronicSelected
                                )
                              : this.state
                                  .dollarBTCPaymentTypeElectronicSelected}
                          </label>
                        )}
                      </div>
                      {this.state.listItemModal}
                    </Grid.Column>
                    <Grid.Column largeScreen={8} computer={8}>
                      {this.state.chargesByOperation.length !== 0 && (
                        <strong>
                          {t('recharge.modalConfirm.charges.header')}
                        </strong>
                      )}
                      {this.state.chargesByOperation.length !== 0 &&
                        this.state.chargesByOperation.map((item, index) => (
                          <div>
                            <span>
                              {item.label}
                              {item.value}
                            </span>
                          </div>
                        ))}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Divider />
                {this.state.financialTypeNameSelected !== 'CREDIT_CARD' && (
                  <div>
                    <strong>
                      {t('recharge.modalConfirm.payWindow.part1')}
                      {this.state.payWindow}
                      {t('recharge.modalConfirm.payWindow.part2')}
                    </strong>
                  </div>
                )}

                {labelMessage}
              </Segment>
              {this.state.infoOfficess.length > 0 && (
                <Segment>
                  <Grid>
                    <Grid.Row
                      columns={
                        this.state.infoOfficess.length === 1
                          ? 1
                          : isMobile
                          ? 1
                          : 2
                      }
                    >
                      {this.state.infoOfficess.map((info, index) => (
                        <Grid.Column key={index}>
                          <Message
                            info
                            size={'small'}
                            style={{ textAlign: 'left' }}
                          >
                            {info.value}
                          </Message>
                          <br></br>
                        </Grid.Column>
                      ))}
                    </Grid.Row>
                  </Grid>
                </Segment>
              )}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <div
              hidden={
                this.state.operationReady &&
                this.state.amountChangedTo === 0 &&
                !this.state.errorServer
              }
            >
              <Button
                secondary
                onClick={this.closeSendConfirm}
                disabled={this.state.formLoad}
              >
                {t("recharge.modalConfirm.buttonCancel")}
              </Button>
              <Button
                onClick={this.aceptSendConfirm}
                disabled={this.state.formLoad}
                color='blue'
              >
                {t('recharge.modalConfirm.buttonAccept')}
              </Button>
            </div>
            <div
              hidden={
                !this.state.operationReady ||
                this.state.amountChangedTo > 0 ||
                this.state.errorServer
              }
            >
              <Button secondary onClick={this.redirectToMyBuys.bind(this)}>
                {t('recharge.modalConfirm.buttonClose')}
              </Button>
              <br />
            </div>
          </Modal.Actions>
        </Modal>
        <Modal
          open={this.state.showModalCreatePayment && !isMobile}
          onClose={this.closeModalCreatePayment.bind(this)}
          className='Recharge'
        >
          <Modal.Header>{t('recharge.modalCreatePayment.header')}</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Message info>
                <h3>{t('recharge.modalCreatePayment.body.h3')}</h3>
                <p>{t('recharge.modalCreatePayment.body.p1')}</p>
                <p>{t('recharge.modalCreatePayment.body.p2')}</p>
                <ul>
                  <li type='disc'>
                    <strong>
                      {t(
                        'recharge.modalCreatePayment.body.list.item1.recommended'
                      )}
                    </strong>
                    {t('recharge.modalCreatePayment.body.list.item1.header')}
                  </li>
                  <ul>
                    <li type='circle'>
                      {t('recharge.modalCreatePayment.body.list.item1.body.p1')}
                    </li>
                    <li type='circle'>
                      {t('recharge.modalCreatePayment.body.list.item1.body.p2')}
                    </li>
                    <p>
                      {t('recharge.modalCreatePayment.body.list.item1.body.p3')}
                    </p>
                  </ul>
                  <li type='disc'>
                    {t('recharge.modalCreatePayment.body.list.item2.header')}
                  </li>
                  <ul>
                    <li type='circle'>
                      {t('recharge.modalCreatePayment.body.list.item2.body.p1')}
                    </li>
                    <li type='circle'>
                      {t('recharge.modalCreatePayment.body.list.item2.body.p2')}
                    </li>
                    <li type='circle'>
                      {t('recharge.modalCreatePayment.body.list.item2.body.p3')}
                    </li>
                    <li type='circle'>
                      {t('recharge.modalCreatePayment.body.list.item2.body.p4')}
                    </li>
                    <p>
                      {t('recharge.modalCreatePayment.body.list.item2.body.p5')}
                    </p>
                  </ul>
                  <li type='disc'>
                    {t('recharge.modalCreatePayment.body.list.item3.header')}
                  </li>
                  <ul>
                    <li type='circle'>
                      {t('recharge.modalCreatePayment.body.list.item3.body.p1')}
                    </li>
                    <li type='circle'>
                      {t('recharge.modalCreatePayment.body.list.item3.body.p2')}
                    </li>
                    <li type='circle'>
                      {t('recharge.modalCreatePayment.body.list.item3.body.p3')}
                    </li>
                    <li type='circle'>
                      {t('recharge.modalCreatePayment.body.list.item3.body.p4')}
                    </li>
                    <li type='circle'>
                      {t('recharge.modalCreatePayment.body.list.item3.body.p5')}
                    </li>
                    <li type='circle'>
                      {t('recharge.modalCreatePayment.body.list.item3.body.p6')}
                    </li>
                    <p>
                      {t('recharge.modalCreatePayment.body.list.item3.body.p5')}
                    </p>
                  </ul>
                  <li type='disc'>
                    {t('recharge.modalCreatePayment.body.list.item4.header')}
                  </li>
                  <ul>
                    <li type='circle'>
                      {t('recharge.modalCreatePayment.body.list.item4.body.p1')}
                    </li>
                    <li type='circle'>
                      {t('recharge.modalCreatePayment.body.list.item4.body.p2')}
                    </li>
                    <li type='circle'>
                      {t('recharge.modalCreatePayment.body.list.item4.body.p3')}
                    </li>
                    <li type='circle'>
                      {t('recharge.modalCreatePayment.body.list.item4.body.p4')}
                    </li>
                  </ul>
                  <li type='disc'>
                    {t('recharge.modalCreatePayment.body.list.item5.header')}
                  </li>
                  <ul>
                    <li type='circle'>
                      {t('recharge.modalCreatePayment.body.list.item5.body')}{' '}
                    </li>
                  </ul>
                  <li type='disc'>
                    {t('recharge.modalCreatePayment.body.list.item6.header')}
                  </li>
                  <ul>
                    <li type='circle'>
                      {t('recharge.modalCreatePayment.body.list.item6.body')}
                    </li>
                  </ul>
                </ul>
              </Message>
            </Modal.Description>
          </Modal.Content>
          {!isMobile && (
            <Modal.Actions>
              <div align='right'>
                <Button
                  onClick={this.closeModalCreatePayment.bind(this)}
                  color='blue'
                >
                  {t('recharge.modalCreatePayment.buttonAccept')}
                </Button>
              </div>
            </Modal.Actions>
          )}
          {isMobile && (
            <Modal.Actions>
              <div align='center'>
                <Button
                  onClick={this.closeModalCreatePayment.bind(this)}
                  color='blue'
                  style={{
                    borderRadius: '40px/40px',
                    height: '50px',
                    width: '200px',
                  }}
                >
                  {t('recharge.modalCreatePayment.buttonAccept')}
                </Button>
              </div>
            </Modal.Actions>
          )}
        </Modal>
        <Modal
          open={this.state.showModalTerminsAnsConditions}
          onClose={this.closeModalViewTerminosAndConditions.bind(this)}
          className='Recharge'
        >
          <Modal.Header>{t('recharge.modalTerms.header')}</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Message info>
                <TermsAndConditions />
              </Message>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <div hidden={this.state.operationReady}>
              <Button
                secondary
                onClick={this.closeModalViewTerminosAndConditions.bind(this)}
                color='grey'
              >
                <p>{t('recharge.modalTerms.buttonClose')}</p>
              </Button>
              {!this.state.termsAndConditionsAccepted && (
                <Button
                  color='blue'
                  onClick={this.aceptTerminsAnsConditions.bind(this)}
                >
                  <p>{t('recharge.modalTerms.buttonAcceptTerms')}</p>
                </Button>
              )}
            </div>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
export default translate(RechargeForm);
