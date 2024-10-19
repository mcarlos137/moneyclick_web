import React, { Component, useState } from 'react';
import {
  Menu,
  Segment,
  Container,
  Divider,
  Grid,
  Form,
  Input,
  Button,
  Image,
} from 'semantic-ui-react';
import translate from '../../../i18n/translate';
import { isMobile } from 'react-device-detect';
import CurrencyInput from 'react-currency-input';
import CurrenciesFlag from '../../../common/currencyFlag';
import giftCardClientServices from '../Services/giftCardClientServices';
import otcServices from '../../../services/otc';
import moneyclickService from '../../../services/moneyclick';
import Us from '../../../img/us.jpg';
import uuid from 'uuid';
import ModalConfirm from './ModalConfirm';
import * as jsPDF from 'jspdf';
import QRCode from 'qrcode';
import logo64 from '../../BuySellBTC/logo';
import imgMcGift from '../../../img/giftcard-mc.jpg';
import imgBrGift from '../../../img/giftcard-br.jpg';
const initialStateCurrency = {
  key: 'us',
  value: 'USD',
  flag: 'us',
  text: 'US Dollar',
  img: Us,
  alias: 'USD',
  isCripto: false,
  symbol: '$',
  priority: 1,
};
const initialModalState = {
  amount: '',
  email: '',
  type: '',
  currency: '',
  id: '',
};
const availableCurrencies = ['USD'];
let balanceByCurrencyUser = [];
const GenerateGiftCard = (props) => {
  const [load, setload] = useState(false);
  const [dataShow, setDataShow] = useState(initialModalState);
  const [currencySelected, setCurrency] = useState('');
  const [currencySelectedData, setCurrencyData] =
    useState(initialStateCurrency);
  const [currencySelectedDataRecharge, setCurrencyDataRecharge] =
    useState(initialStateCurrency);
  const [emailReceiver, setEmailReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [amountMask, setAmountMask] = useState('');
  const [amountRechargeMask, setAmountRechargeMask] = useState('');
  const [currencySelectedRecharge, setCurrencyRecharge] = useState('');
  const [emailReceiverRecharge, setEmailReceiverRecharge] = useState('');
  const [amountRecharge, setAmountRecharge] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [errorRecharge, setErrorRecharge] = useState(false);
  const [messageRecharge, setMessageRecharge] = useState('');
  const [errorModal, setErrorModal] = useState(false);
  const [messageModal, setMessageModal] = useState('');
  const [action, setAction] = useState('');
  const [sendSuccess, setSendSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  let t = props.translate;
  function floorDecimals(value, numberDecimals) {
    let decimales = Math.pow(10, numberDecimals);
    return Math.floor(value * decimales) / decimales;
  }
  function formatCurrencies(currency, balance) {
    return floorDecimals(
      balance,
      currency === 'BTC' || currency === 'ETH' ? 8 : 2
    ).toLocaleString('en-US', {
      maximumFractionDigits: currency === 'BTC' || currency === 'ETH' ? 8 : 2,
    });
  }
  async function loadBalance() {
    let username = window.sessionStorage.getItem('username');
    try {
      setload(true);
      const response = await moneyclickService.getBalanceMoneyclick(username);
      balanceByCurrencyUser = response.data;
      let currenciesAvailables = await loadCurrencies(response.data);
      setCurrencies(currenciesAvailables);
      setload(false);
    } catch (error) {
      setload(false);
      console.log(error);
    }
  }
  async function loadCurrencies(balances) {
    try {
      let responseCurrencies = await otcServices.getCurrencies();
      return responseCurrencies.data
        .map((currency) => {
          if (
            currency.active &&
            currency.shortName !== 'BTC' &&
            currency.shortName !== 'ETH' &&
            currency.shortName !== 'USDT' &&
            availableCurrencies.indexOf(currency.shortName) !== -1
          ) {
            let item = {};
            const balance =
              balances[currency.shortName] !== undefined &&
              balances[currency.shortName].availableBalance !== undefined
                ? balances[currency.shortName].availableBalance
                : 0;

            item.text =
              currency.fullName +
              (balance > 0
                ? t('withdraw.labels.availableBalance') +
                  formatCurrencies(currency.shortName, balance)
                : '');
            item.value = currency.shortName;
            item.key = currency.shortName;
            item.availableBalance = balance;
            item.data = CurrenciesFlag.currenciesFlag[currency.shortName];
            return item;
          }
        })
        .filter((currecy) => {
          return currecy !== undefined;
        });
    } catch (error) {
      return [];
    }
  }
  function viewModalConfirmCreate(type, action) {
    if (currencySelected !== '' && amount !== '' && emailReceiver !== '') {
      const { availableBalance } = balanceByCurrencyUser[currencySelected];
      let regex =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (regex.test(emailReceiver)) {
        if (availableBalance >= amount) {
          setDataShow({
            type: type,
            amount: amountMask,
            currency: currencySelected,
            email: emailReceiver,
          });
          setAction(action);
          setShowModal(true);
        } else {
          setError(true);
          setMessage(t('receiveCard.enoutBalance'));
          setTimeout(() => {
            setError(false);
            setMessage('');
          }, 8000);
        }
      } else {
        setError(true);
        setMessage(t('receiveCard.errorInData'));
        setTimeout(() => {
          setError(false);
          setMessage('');
        }, 8000);
      }
    } else {
      setError(true);
      setMessage(t('receiveCard.errorInData'));
      setTimeout(() => {
        setError(false);
        setMessage('');
      }, 8000);
    }
  }
  function viewModalConfirmActive(type, action) {
    if (currencySelected !== '' && amount !== '') {
      const { availableBalance } = balanceByCurrencyUser[currencySelected];
      if (emailReceiver !== '') {
        let regex =
          /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (regex.test(emailReceiver)) {
          if (availableBalance >= amount) {
            let id = uuid.v4();
            setDataShow({
              type: type,
              amount: amountMask,
              currency: currencySelected,
              email: emailReceiver,
              id: id,
            });
            setAction(action);
            setShowModal(true);
          } else {
            setError(true);
            setMessage(t('receiveCard.enoutBalance'));
            setTimeout(() => {
              setError(false);
              setMessage('');
            }, 8000);
          }
        } else {
          setError(true);
          setMessage(t('receiveCard.errorInData'));
          setTimeout(() => {
            setError(false);
            setMessage('');
          }, 8000);
        }
      } else {
        if (availableBalance >= amount) {
          let id = uuid.v4();
          setDataShow({
            type: type,
            amount: amountMask,
            currency: currencySelected,
            email: emailReceiver,
            id: id,
          });
          setAction(action);
          setShowModal(true);
        } else {
          setError(true);
          setMessage(t('receiveCard.enoutBalance'));
          setTimeout(() => {
            setError(false);
            setMessage('');
          }, 8000);
        }
      }
    } else {
      setError(true);
      setMessage(t('receiveCard.errorInData'));
      setTimeout(() => {
        setError(false);
        setMessage('');
      }, 8000);
    }
  }
  function viewModalConfirmActiveRecharge(type, action) {
    if (currencySelectedRecharge !== '' && amountRecharge !== '') {
      const { availableBalance } =
        balanceByCurrencyUser[currencySelectedRecharge];
      if (emailReceiverRecharge !== '') {
        let regex =
          /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (regex.test(emailReceiverRecharge)) {
          if (availableBalance >= amountRecharge) {
            let id = uuid.v4();
            setDataShow({
              type: type,
              amount: amountRechargeMask,
              currency: currencySelectedRecharge,
              email: emailReceiverRecharge,
              id: id,
            });
            setAction(action);
            setShowModal(true);
          } else {
            setErrorRecharge(true);
            setMessageRecharge(t('receiveCard.errorInData'));
            setTimeout(() => {
              setErrorRecharge(false);
              setMessageRecharge('');
            }, 8000);
          }
        } else {
          setErrorRecharge(true);
          setMessageRecharge(t('receiveCard.errorInData'));
          setTimeout(() => {
            setErrorRecharge(false);
            setMessageRecharge('');
          }, 8000);
        }
      } else {
        if (availableBalance >= amountRechargeMask) {
          let id = uuid.v4();
          setDataShow({
            type: type,
            amount: amountRechargeMask,
            currency: currencySelectedRecharge,
            email: emailReceiverRecharge,
            id: id,
          });
          setAction(action);
          setShowModal(true);
        } else {
          setErrorRecharge(true);
          setMessageRecharge(t('receiveCard.errorInData'));
          setTimeout(() => {
            setErrorRecharge(false);
            setMessageRecharge('');
          }, 8000);
        }
      }
    } else {
      setErrorRecharge(true);
      setMessageRecharge(t('receiveCard.errorInData'));
      setTimeout(() => {
        setErrorRecharge(false);
        setMessageRecharge('');
      }, 8000);
    }
  }
  function viewModalConfirmCreateRecharge(type, action) {
    const { availableBalance } =
      balanceByCurrencyUser[currencySelectedRecharge];

    if (
      currencySelectedRecharge !== '' &&
      amountRecharge !== '' &&
      emailReceiverRecharge !== ''
    ) {
      let regex =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (regex.test(emailReceiverRecharge)) {
        if (availableBalance >= amountRecharge) {
          setDataShow({
            type: type,
            amount: amountRechargeMask,
            currency: currencySelectedRecharge,
            email: emailReceiverRecharge,
          });
          setAction(action);
          setShowModal(true);
        } else {
          setErrorRecharge(true);
          setMessageRecharge(t('receiveCard.errorInData'));
          setTimeout(() => {
            setErrorRecharge(false);
            setMessageRecharge('');
          }, 8000);
        }
      } else {
        setErrorRecharge(true);
        setMessageRecharge(t('receiveCard.errorInData'));
        setTimeout(() => {
          setErrorRecharge(false);
          setMessageRecharge('');
        }, 8000);
      }
    } else {
      setErrorRecharge(true);
      setMessageRecharge(t('receiveCard.errorInData'));
      setTimeout(() => {
        setErrorRecharge(false);
        setMessageRecharge('');
      }, 8000);
    }
  }
  async function onPressBasicGiftCardCreate(type) {
    try {
      setload(true);
      const response = await giftCardClientServices.sendGiftCard({
        userName: sessionStorage.getItem('username'),
        email: type === 'MONEYCLICK' ? emailReceiver : emailReceiverRecharge,
        currency:
          type === 'MONEYCLICK' ? currencySelected : currencySelectedRecharge,
        language: 'EN',
        source: type === 'MONEYCLICK' ? 'MC' : 'BR',
        amount: type === 'MONEYCLICK' ? amount : amountRecharge,
        upfrontCommission: false,
      });
      setload(false);
   console.log(response);
      if (response.data.includes('OK')) {
         loadBalance();
        setSendSuccess(true);
      } else {
        setErrorModal(true);
        setMessageModal(t('receiveCard.errorRequest'));
      }
    } catch (error) {
      console.log(error);
      setload(false);
      setErrorModal(true);
      setMessageModal(t('receiveCard.errorRequest'));
    }
  }
  async function onPressBasicGiftCardActive(type) {
    try {
      setload(true);

      let body = {
        userName: sessionStorage.getItem('username'),
        id: dataShow.id,
        email: type === 'MONEYCLICK' ? emailReceiver : emailReceiverRecharge,
        currency:
          type === 'MONEYCLICK' ? currencySelected : currencySelectedRecharge,
        language: 'EN',
        source: type === 'MONEYCLICK' ? 'MC' : 'BR',
        amount: type === 'MONEYCLICK' ? amount : amountRecharge,
        upfrontCommission: false,
      };
      const response = await giftCardClientServices.activeGitfCard(body);
      setload(false);
      console.log(response);
      if (response.data.includes('OK')) {
        loadBalance();
        setSendSuccess(true);
        printInvoice(
          dataShow.id,
          body.amount,
          body.currency,
          type,
          body.email,
          type === 'MONEYCLICK' ? amountMask : amountRechargeMask
        );
      } else {
        setErrorModal(true);
        setMessageModal('Error in request');
      }
    } catch (error) {
      setload(false);
      setErrorModal(true);
      setMessageModal('Error in request');
      console.log(error);
      console.log(error.response);
    }
  }
  async function printInvoice(id, amount, currency, type, email, masketAmount) {
    var scrQr = '';
    let jsonString = JSON.stringify({
      id: id,
      amount: amount,
      currency: currency,
      source: type === 'MONEYCLICK' ? 'MC' : 'BR',
      upfrontCommission: false,
    });
    try {
      const result = await QRCode.toDataURL(jsonString);
      scrQr = result;
      console.log(result);
    } catch (err) {
      console.error(err);
    }
    var src = logo64.filetest;

    //document.body.appendChild(img);
    let title = '';
    let titlestring = '';
    title = t('receiveCard.header');
    titlestring = title.toString();
    let doc = new jsPDF();
    var imgData = src;

    doc.addImage(imgData, 'PNG', 80, 5, 40, 20);
    // addImage(imageData, format, x, y, width, height, alias, compression, rotation);
    doc.setFontType('bold');
    doc.setFontSize(12);
    doc.text(75, 35, 'Mountain View Pay LLC.');
    doc.text(80, 40, '+1 (470) 273-9398');
    doc.setFontType('normal');
    doc.text(40, 45, '2003 Monterey Parkway Sandy Springs, GA Zip code 30350');

    doc.setFontSize(14);
    doc.setFontType('bold');
    doc.text(77, 60, t('receiveCard.header'));
    doc.setFontType('normal');
    // let x = 60,
    let y = 70;
    doc.setFontSize(12);
    let titleAdded = true;
    doc.addImage(scrQr, 'PNG', 70, y, 60, 60);
    y = 150;
    // MONTO
    doc.setFontType('bold');
    doc.text(t('receiveCard.amount') + ':', 75, y);
    doc.setFontType('normal');
    y = y + 5;
    doc.text(masketAmount, 75, y);
    y = y + 7;
    // MONEDA
    doc.setFontType('bold');
    doc.text(t('receiveCard.currency') + ':', 75, y);
    doc.setFontType('normal');
    y = y + 5;
    doc.text(currency, 75, y);
    y = y + 7;
    // EMAIL
    if (email !== '') {
      doc.setFontType('bold');
      doc.text(t('receiveCard.email') + ':', 75, y);
      doc.setFontType('normal');
      y = y + 5;
      doc.text(email, 75, y);
      y = y + 7;
    }

    // TYPE
    doc.setFontType('bold');
    doc.text(t('receiveCard.type') + ':', 75, y);
    doc.setFontType('normal');
    y = y + 5;
    doc.text(type === 'BR' ? 'BITCOINRECHARGE' : type, 75, y);
    y = y + 20;
    doc.setTextColor(100);
    doc.text(65, y, 'Website : https://moneyclick.com');
    let name = type === 'BR' ? 'BITCOINRECHARGE' : type;
    doc.save(id.slice(-4) + '_' + name + '.pdf');
  }
  function selectAction() {
    if (action === 'PRINT') {
      onPressBasicGiftCardActive(dataShow.type);
    } else {
      onPressBasicGiftCardCreate(dataShow.type);
    }
  }
  function closeAction(clean) {
    setShowModal(false);
    setDataShow(initialModalState);
    setSendSuccess(false);
    setShowModal(false);
    setload(false);
    setDataShow(initialModalState);
    setCurrency('');
    setCurrencyData(initialStateCurrency);
    setEmailReceiver('');
    setAmount('');
    setAmountMask('');
    setError(false);
    setMessage('');
    setAction('');
    setMessageModal('');
    setSendSuccess(false);
    setErrorModal(false);
    setMessageModal('');
    setErrorModal(false);
    setSendSuccess(false);
    setload(false);
    setShowModal(false);
    setDataShow(initialModalState);
    setCurrencyDataRecharge(initialStateCurrency);
    setAmountRechargeMask('');
    setCurrencyRecharge('');
    setEmailReceiverRecharge('');
    setAmountRecharge('');
    setError(false);
    setMessage('');
    setAction('');
  }
  React.useEffect(() => {
    loadBalance();
  }, []);
  return (
    <Segment loading={load} basic={true}>
      <ModalConfirm
        executeAction={selectAction}
        closeAction={closeAction}
        showError={errorModal}
        messageError={messageModal}
        data={dataShow}
        load={load}
        action={action}
        translate={props.translate}
        sendSucess={sendSuccess}
        openModal={showModal}
      />
      <Grid columns={2}>
        <Grid.Column>
          <Divider hidden></Divider>
          <Form error>
            <Grid>
              <Grid.Row>
                <Grid.Column
                  largeScreen={14}
                  widescreen={14}
                  mobile={16}
                  tablet={14}
                  computer={14}
                >
                  <Image src={imgMcGift} size='medium' centered />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column
                  largeScreen={14}
                  widescreen={14}
                  mobile={16}
                  tablet={14}
                  computer={14}
                >
                  <Form.Select
                    id={'select-currency'}
                    placeholder={t('withdraw.picker.placeholder')}
                    fluid
                    search
                    required
                    selection
                    options={currencies}
                    onChange={(e, currency) => {
                      const { options, value } = currency;
                      let findOptions = options.find((currency) => {
                        return currency.value === value;
                      });
                      setCurrencyData(findOptions.data);
                      setCurrency(value);
                    }}
                    label={t('receiveCard.currency')}
                    value={currencySelected}
                    defaultValue={currencySelected}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column
                  largeScreen={14}
                  widescreen={14}
                  mobile={16}
                  tablet={14}
                  computer={14}
                >
                  <Form.Field required>
                    <label>{t('receiveCard.amount')}</label>
                    <CurrencyInput
                      value={amount}
                      name='amountWithdraw'
                      onChangeEvent={(amount, masket, floatValue) => {
                        let amountNumber = Number(floatValue);
                        const isNanNumber = isNaN(amountNumber);
                        if (!isNanNumber) {
                          setAmount(floatValue);
                          setAmountMask(masket);
                        }
                      }}
                      precision={currencySelected === 'BTC' ? 8 : 2}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column
                  largeScreen={14}
                  widescreen={14}
                  mobile={16}
                  tablet={14}
                  computer={14}
                >
                  <Form.Field>
                    <label>{t('receiveCard.email')}</label>
                    <Input
                      placeholderTextColor={'silver'}
                      placeholder={t('receiveCard.emailRequired')}
                      maxLength={35}
                      type={'email'}
                      autoCapitalize='none'
                      onChange={(event, text) => setEmailReceiver(text.value)}
                      value={emailReceiver}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
              {error && (
                <Grid.Row>
                  <Grid.Column
                    largeScreen={14}
                    widescreen={14}
                    mobile={16}
                    tablet={14}
                    computer={14}
                  >
                    <div style={{ paddingBottom: 10, textAlign: 'justify' }}>
                      <label style={{ color: 'red' }}>{message}</label>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              )}
              <Grid.Row columns='equal'>
                <Grid.Column></Grid.Column>
                <Grid.Column floated={'left'} textAlign={'center'}>
                  <Grid.Row>
                    <Button
                      color='blue'
                      onClick={() =>
                        viewModalConfirmCreate('MONEYCLICK', 'SEND')
                      }
                    >
                      {t('receiveCard.buttonSend')}
                    </Button>
                    <Button
                      type='submit'
                      color='blue'
                      onClick={() =>
                        viewModalConfirmActive('MONEYCLICK', 'PRINT')
                      }
                    >
                      {t('receiveCard.buttonPrint')}
                    </Button>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column width={1}></Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Grid.Column>
        <Grid.Column>
          <Divider hidden></Divider>
          <Form error>
            <Grid>
              <Grid.Row>
                <Grid.Column
                  largeScreen={14}
                  widescreen={14}
                  mobile={16}
                  tablet={14}
                  computer={14}
                >
                  <Image src={imgBrGift} size='medium' centered />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column
                  largeScreen={14}
                  widescreen={14}
                  mobile={16}
                  tablet={14}
                  computer={14}
                >
                  <Form.Select
                    id={'select-currency'}
                    placeholder={t('withdraw.picker.placeholder')}
                    fluid
                    required
                    search
                    selection
                    options={currencies}
                    onChange={(e, currency) => {
                      const { options, value } = currency;
                      let findOptions = options.find((currency) => {
                        return currency.value === value;
                      });
                      setCurrencyDataRecharge(findOptions.data);
                      setCurrencyRecharge(value);
                    }}
                    label={t('receiveCard.currency')}
                    value={currencySelectedRecharge}
                    defaultValue={currencySelectedRecharge}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column
                  largeScreen={14}
                  widescreen={14}
                  mobile={16}
                  tablet={14}
                  computer={14}
                >
                  <Form.Field required>
                    <label>{t('receiveCard.amount')}</label>
                    <CurrencyInput
                      value={amountRecharge}
                      name='amountWithdraw'
                      onChangeEvent={(amount, masket, floatValue) => {
                        let amountNumber = Number(floatValue);
                        const isNanNumber = isNaN(amountNumber);
                        if (!isNanNumber) {
                          setAmountRecharge(floatValue);
                          setAmountRechargeMask(masket);
                        }
                      }}
                      precision={currencySelectedRecharge === 'BTC' ? 8 : 2}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column
                  largeScreen={14}
                  widescreen={14}
                  mobile={16}
                  tablet={14}
                  computer={14}
                >
                  <Form.Field>
                    <label>{t('receiveCard.email')}</label>
                    <Input
                      placeholderTextColor={'silver'}
                      maxLength={35}
                      placeholder={t('receiveCard.emailRequired')}
                      autoCapitalize='none'
                      type={'email'}
                      onChange={(event, text) =>
                        setEmailReceiverRecharge(text.value)
                      }
                      value={emailReceiverRecharge}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
              {errorRecharge && (
                <Grid.Row>
                  <Grid.Column
                    largeScreen={14}
                    widescreen={14}
                    mobile={16}
                    tablet={14}
                    computer={14}
                  >
                    <div style={{ paddingBottom: 10, textAlign: 'justify' }}>
                      <label style={{ color: 'red' }}>{messageRecharge}</label>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              )}
              <Grid.Row columns='equal'>
                <Grid.Column></Grid.Column>
                <Grid.Column textAlign={'center'}>
                  <Grid.Row>
                    <Button
                      color='blue'
                      onClick={() =>
                        viewModalConfirmCreateRecharge('BR', 'SEND')
                      }
                    >
                      {t('receiveCard.buttonSend')}
                    </Button>
                    <Button
                      type='submit'
                      color='blue'
                      onClick={() =>
                        viewModalConfirmActiveRecharge('BR', 'PRINT')
                      }
                    >
                      {t('receiveCard.buttonPrint')}
                    </Button>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column width={1}></Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default translate(GenerateGiftCard);
