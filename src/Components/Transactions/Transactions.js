import React, { Component } from 'react';
import ReactTable from 'react-table';
import CurrenciesFlag from '../../common/currencyFlag';
import mcIcon from '../../img/splash_mc.jpg';
import {
  Divider,
  Grid,
  Segment,
  Tab,
  Form,
  Container,
  Label,
  Dropdown,
  Icon,
  Input,
  Flag,
  Image,
  Button,
  Message,
} from 'semantic-ui-react';
import 'react-table/react-table.css';
import ISOCURRENCIES from '../../common/ISO4217';
import translate from '../../i18n/translate';
import user from '../../services/user';
import otcService from '../../services/otc';
import NumberFormat from 'react-number-format';
import { parse } from 'query-string';
import { filter } from 'underscore';

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translator: props.translate,
      selected: '',
      langu: '',
      data: [],
      expandedRow: null,
      expanded: {},
      data3: [],
      oldData: [],
      oldDataFilter: [],
      data5: [],
      notData: false,
      filtered: [],
      searchLoad: false,
      load: false,
      isFetching: false,
      currencies: '',
      currenciesData: [],
      cantRow: 10,
      dateInit: null,
      dateEnd: null,
      amountEnd: '',
      amountInit: '',
      currencySelected: '',
      optionSelected: '',
      optionfilterDate: false,
      optionfilterAmount: false,
      message: false,
    };
    this.expandedOperation = this.expandedOperation.bind(this);
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.language !== nextProps.language) {
      this.setState({
        translator: nextProps.translate,
      });
    }
  }
  componentWillMount() {
    this.setState({
      langu: window.sessionStorage.getItem('language'),
    });
    this.getCurrencies();
    this.getProcessionOperations();
  }
  componentDidMount() {
    var idUrl = parse(window.location.search).id;
    if (idUrl !== undefined) {
      this.setState({ cantRow: 20 });
    }
    this.getProcessionOperations();
  }

  ReloadTable() {
    this.setState({
      data: this.state.oldData,
      currencySelected: '',
      dateInit: '',
      dateEnd: '',
      amountEnd: '',
      amountInit: '',
    });
  }
  async getCurrencies() {
    let currencies = await otcService.getCurrencies();
    currencies = currencies.data.filter((curren) => {
      return curren.active === true;
    });
    this.setState({ currenciesData: currencies }, () => {
      this.getMovementUser();
    });
  }
  getFirtWord(string) {
    let letter = '';
    if (string.indexOf('SEND_TO') !== -1 || string.indexOf('SEND TO') !== -1) {
      letter = 'SEND TO ';
    } else if (string.indexOf('OTC') !== -1) {
      letter = 'OTC ';
    }
    return letter;
  }
  floorDecimals = (value, numberDecimals) => {
    let decimales = Math.pow(10, numberDecimals);
    return Math.floor(value * decimales) / decimales;
  };
  formatDate(date) {
    let regi = 'es-ES';
    let cad = '';
    var options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: 'true',
    };
    let data = date.toLocaleString(regi, options);
    if (regi === 'es-ES') {
      data = data.split(' ');
      let day = data[0];
      let month = data[1];
      data[0] = month;
      data[1] = day;

      for (date of data) {
        cad = cad + ' ' + date;
      }
    } else {
      cad = data;
    }

    return cad.trim();
  }
  getTrProps = (state, rowInfo) => {
    if (rowInfo && rowInfo.row) {
      return {
        onClick: (e) => {
          this.setState({
            selected: rowInfo.index,
          });
        },
        style: {
          background:
            rowInfo.index === this.state.selected ? 'rgba(0,0,0,.07)' : 'white',
          color: rowInfo.index === this.state.selected ? 'black' : 'black',
        },
      };
    } else {
      return {};
    }
  };

  pickDateFrom = (e, data) => {
    this.setState({ dateInit: e.target.value });
  };
  pickDateTo = (e, data) => {
    this.setState({ dateEnd: e.target.value });
  };

  pickAmountInit = (e, data) => {
    this.setState({ amountInit: e.target.value });
  };
  pickAmountEnd = (e, data) => {
    this.setState({ amountEnd: e.target.value });
  };

  async formatedDataToRender(data, isFilter) {
    let array = [];
    let oldData = [];
    console.log('data ', data);
    this.setState({ data: [] });
    try {
      Object.entries(data).forEach(([key, value]) => {
        let t = this.state.translator;
        let dateOperation,
          typeOp,
          typeOp2,
          amountOp,
          currencyOp,
          btcPrice,
          flagData,
          user,
          description,
          targetAddress,
          initialAmount,
          comision,
          sended,
          receiver,
          fulladdress,
          id,
          idOperation,
          dateOperation2,
          accountAddress,
          accountHolderName,
          accountNumber,
          accountZip,
          automaticCharge,
          bank,
          bankRoutingNumber,
          bankSwiftCode,
          currencySend,
          typeSend,
          verified,
          zelle,
          typeAmount,
          canceledReason = '',
          giftCardId = '';
        dateOperation = key.split('__')[0];
        dateOperation2 = this.formatDate(new Date(dateOperation));
        let statusOp = {};
        Object.entries(value).forEach(([inerKey, inerValue]) => {
          if (inerKey === 'addedAmount') {
            receiver = 'true';
            amountOp = inerValue.amount;
            currencyOp = inerValue.currency;
            typeAmount = 'addedAmount';

            if (currencyOp !== 'BTC' && currencyOp !== 'ETH') {
              amountOp = this.floorDecimals(inerValue.amount, 2);
              comision = this.floorDecimals(
                inerValue.initialAmount - inerValue.amount,
                2
              );
            } else {
              amountOp = inerValue.amount.toFixed(8);
              comision = this.floorDecimals(
                inerValue.initialAmount - inerValue.amount,
                8
              );
            }

            flagData = CurrenciesFlag.currenciesFlag[inerValue.currency];
            if (flagData === undefined) {
              let findCurren = this.state.currenciesData.find((currency) => {
                return currency.shortName === inerValue.currency;
              });
              if (findCurren !== undefined) {
                flagData = {
                  key: findCurren.shortName.toLowerCase(),
                  value: findCurren.shortName,
                  flag: findCurren.shortName.toLowerCase(),
                  text: findCurren.shortName,
                  img: mcIcon,
                  alias: findCurren.shortName,
                  isCripto: false,
                  symbol: ' ',
                  priority: 10,
                };
              }
            }
          }

          if (inerKey === 'substractedAmount') {
            sended = 'true';
            currencyOp = inerValue.currency;
            typeAmount = 'substractedAmount';
            if (currencyOp === 'BTC' || currencyOp === 'ETH') {
              initialAmount = this.floorDecimals(inerValue.initialAmount, 8);
              comision = this.floorDecimals(
                inerValue.amount - inerValue.initialAmount,
                8
              );
            } else {
              initialAmount = this.floorDecimals(inerValue.initialAmount, 2);
              comision = this.floorDecimals(
                inerValue.amount - inerValue.initialAmount,
                2
              );
            }
            if (currencyOp !== 'BTC' && currencyOp !== 'ETH') {
              amountOp = this.floorDecimals(inerValue.amount, 2);
            } else {
              if (inerValue.initialAmount === undefined) {
                amountOp = inerValue.amount.toFixed(8);
              } else {
                amountOp = inerValue.initialAmount.toFixed(8);
              }
            }
            flagData = CurrenciesFlag.currenciesFlag[inerValue.currency];
            if (flagData === undefined) {
              let findCurren = this.state.currenciesData.find((currency) => {
                return currency.shortName === inerValue.currency;
              });
              if (findCurren !== undefined) {
                flagData = {
                  key: findCurren.shortName.toLowerCase(),
                  value: findCurren.shortName,
                  flag: findCurren.shortName.toLowerCase(),
                  text: findCurren.shortName,
                  img: mcIcon,
                  alias: findCurren.shortName,
                  isCripto: false,
                  symbol: ' ',
                  priority: 10,
                };
              }
            }
          }
          if (inerKey === 'balanceOperationType') {
            typeOp = inerValue;

            let val = typeOp
              .toLocaleString('en-US', {
                maximumFractionDigits: 12,
              })
              .toLowerCase();

            let translate = 'homeLoggedIn.transactions.detail.labels.' + val;
            let string = translate.toString();

            typeOp2 = this.state.translator(string);
          }

          if (inerKey === 'balanceOperationStatus') {
            if (inerValue === 'OK') {
              statusOp.color = 'green';
              statusOp.icon = 'check circle';
              statusOp.name = this.state.translator(
                'homeLoggedIn.transactions.detail.statusOperation.success'
              );
            } else if (inerValue === 'WAITING_FOR_PAYMENT') {
              statusOp.color = 'blue';
              statusOp.icon = 'sync';
              statusOp.name = this.state.translator(
                'homeLoggedIn.tableHeaders.statusValues.waitingPayment'
              );
            } else if (inerValue === 'FAIL') {
              statusOp.color = 'red';
              statusOp.icon = 'warning circle';
              statusOp.name = this.state.translator(
                'homeLoggedIn.transactions.detail.statusOperation.fail'
              );
            } else if (inerValue === 'CANCELED') {
              statusOp.color = 'red';
              statusOp.icon = 'warning circle';
              statusOp.name = this.state.translator(
                'homeLoggedIn.tableHeaders.statusValues.canceled'
              );
            } else if (inerValue === 'PAY_VERIFICATION') {
              statusOp.color = 'orange';
              statusOp.icon = 'info';
              statusOp.name = this.state.translator(
                'homeLoggedIn.tableHeaders.statusValues.payVerification'
              );
            } else if (inerValue === 'CLAIM') {
              statusOp.color = 'grey';
              statusOp.icon = 'info';
              statusOp.name = this.state.translator(
                'homeLoggedIn.tableHeaders.statusValues.claim'
              );
            } else if (inerValue === 'PROCESSING') {
              statusOp.color = 'grey';
              statusOp.icon = 'info';
              statusOp.name = this.state.translator(
                'homeLoggedIn.tableHeaders.statusValues.processing'
              );
            } else {
              statusOp.color = 'grey';
              statusOp.icon = 'info';
              statusOp.name = inerValue;
            }
            //console.log(statusOp);
          }
          if (inerKey === 'additionalInfo') {
            let t = this.state.translator;
            if (inerValue.indexOf('DESCRIPTION') !== -1) {
              let info = inerValue.split(' ');
              if (info[2] === 'PAYMENT') {
                user = '';
              } else {
                if (inerValue.indexOf('-') !== -1) {
                  let sendTo = inerValue.split('-')[0];

                  let first = this.getFirtWord(sendTo);

                  user = sendTo.split(first)[1];
                  ////console.log("user legal:", user)
                } else {
                  user = info[2];
                }
              }
              let desc = inerValue.split('DESCRIPTION')[1];
              if (desc.charAt(0) !== ' ') {
                description = desc;
              } else {
                description = desc.substring(1, desc.length);
              }
            } else if (inerValue.indexOf('OTC operation id') !== -1) {
              let value = inerValue.split('OTC operation id ')[1];
              id = value;
              let idTruncate = value.substring(value.length - 7, value.length);
              idOperation = idTruncate;
            } else if (inerValue.indexOf('ROLLBACK FROM') !== -1) {
              let val = inerValue.split('ROLLBACK FROM ')[1];
              user = val;
              description = t(
                'homeLoggedIn.transactions.detail.labels.rollback'
              );
            } else if (inerValue.indexOf('RECEIVE FROM') !== -1) {
              let content = inerValue.split('RECEIVE FROM ');
              user = content[1];
              description = t(
                'homeLoggedIn.transactions.detail.labels.addAmount'
              ); // t(
              //);
            } else if (inerValue.indexOf('SELL GIFT CARD COMMISSION') !== -1) {
              let content = inerValue.split('SELL GIFT CARD COMMISSION');
              user = content[1];
              description = t(
                'homeLoggedIn.transactions.detail.labels.sell_gift_card_commission'
              ); // t(
              //);
            } else if (inerValue.indexOf('CHANGE FROM') !== -1) {
              let content = inerValue.split('CHANGE FROM ');
              let currencies = content[1].split('-')[0];
              description =
                t('homeLoggedIn.transactions.detail.labels.change_from') +
                currencies.split('TO')[0] +
                ' -> ' +
                currencies.split('TO')[1];
            } else if (inerValue.includes('BUY BALANCE RETAIL')) {
              let idRetail = inerValue.split(' ')[3];
              idRetail = idRetail.substring(
                idRetail.length - 4,
                idRetail.length
              );
              description =
                t('homeLoggedIn.transactions.detail.labels.mc_retail_buy') +
                ' ' +
                idRetail;
            } else if (inerValue.includes('SELL BALANCE RETAIL')) {
              let idRetail = inerValue.split(' ')[3];
              idRetail = idRetail.substring(
                idRetail.length - 4,
                idRetail.length
              );
              description =
                t('homeLoggedIn.transactions.detail.labels.mc_retail_sell') +
                ' ' +
                idRetail;
            } else if (inerValue.includes('ADDED TO RETAIL ESCROW')) {
              let idRetail = inerValue.split(' ')[4];
              idRetail = idRetail.substring(
                idRetail.length - 4,
                idRetail.length
              );
              description =
                t(
                  'homeLoggedIn.transactions.detail.labels.added_to_retail_escrow'
                ) +
                ' ' +
                idRetail;
            } else if (inerValue.includes('INITIAL_MOVEMENT')) {
              let idRetail = inerValue.split(' ')[4];
              idRetail = idRetail.substring(
                idRetail.length - 4,
                idRetail.length
              );
              description = t(
                'homeLoggedIn.transactions.detail.labels.initial_movements'
              );
            } else if (inerValue.includes('RECEIVED FROM OUTSIDE WALLET')) {
              description = t(
                'homeLoggedIn.transactions.detail.labels.receive_out'
              );
            } else if (inerValue.includes('TARGET ADDRESS')) {
              if (inerValue.split('TARGET ADDRESS', 1) !== '') {
                description = inerValue.split('TARGET ADDRESS', 1);
              } else {
                let idRetail = inerValue.split('TARGET ADDRESS', 2);
                description =
                  idRetail[0] +
                  ' ' +
                  t('homeLoggedIn.transactions.detail.labels.walletTarget') +
                  ' ' +
                  idRetail[1];
              }
            } else if (
              inerValue.includes('REFUND OF UNTRADED AMOUNT CHAT P2P OFFER')
            ) {
              let value = inerValue.split(
                'REFUND OF UNTRADED AMOUNT CHAT P2P OFFER '
              )[1];
              let id = value.substring(value.length - 7, value.length);
              description =
                t(
                  'homeLoggedIn.transactions.detail.labels.REFUND_OF_UNTRADED_AMOUNT_CHAT_P2P_OFFER'
                ) +
                ' ' +
                id;
            } else if (inerValue.includes('AMOUNT BLOCKED BY CHAT P2P OFFER')) {
              let value = inerValue.split(
                'AMOUNT BLOCKED BY CHAT P2P OFFER '
              )[1];
              let id = value.substring(value.length - 7, value.length);
              description =
                t(
                  'homeLoggedIn.transactions.detail.labels.AMOUNT_BLOCKED_BY_CHAT_P2P_OFFER'
                ) +
                ' ' +
                id;
            } else {
              description = inerValue;
            }
          }
          if (inerKey === 'btcPrice') {
            btcPrice = inerValue;
          }
          if (inerKey === 'balanceOperationProcessId') {
            let idTruncate = inerValue.substring(
              inerValue.length - 7,
              inerValue.length
            );
            id = inerValue;
            idOperation = idTruncate;
          }
          if (inerKey === 'operationId') {
            let id = inerValue.substring(
              inerValue.length - 7,
              inerValue.length
            );
            id = inerValue;
            idOperation = id;
          }
          if (inerKey === 'targetAddress') {
            let sub = '...';
            sub =
              sub +
              inerValue.substring(inerValue.length - 10, inerValue.length);
            targetAddress = sub;
            fulladdress = inerValue;
          }
          if (inerKey === 'canceledReason') {
            canceledReason = inerValue;
          }

          if (inerKey === 'clientPayment') {
            accountAddress = inerValue.accountAddress;
            accountHolderName = inerValue.accountHolderName;
            accountNumber = inerValue.accountNumber;
            accountZip = inerValue.accountZip;
            automaticCharge = inerValue.automaticCharge;

            if (inerValue.bank !== inerValue.type) {
              bank = inerValue.bank;
            }

            bankRoutingNumber = inerValue.bankRoutingNumber;
            bankSwiftCode = inerValue.bankSwiftCode;
            currencySend = inerValue.currency;
            if (inerValue.type === 'TRANSFER_WITH_SPECIFIC_BANK') {
              typeSend = t('profile.addAccount.specificBank');
            } else if (inerValue.type === 'TRANSFER_NATIONAL_BANK') {
              typeSend = t('profile.addAccount.thirdBank');
            } else if (inerValue.type === 'CHECK_DEPOSIT') {
              typeSend = t('profile.addAccount.checkDeposit');
            } else if (inerValue.type === 'ACH') {
              typeSend = t('profile.addAccount.ach');
            } else if (inerValue.type === 'ACH_EXPRESS') {
              typeSend = t('profile.addAccount.ach_express');
            } else if (inerValue.type === 'ACH_THIRD_ACCOUNT') {
              typeSend = t('profile.addAccount.ACH_THIRD_ACCOUNT');
            } else if (inerValue.type === 'ACH_THIRD_ACCOUNT_EXPRESS') {
              typeSend = t('profile.addAccount.ACH_THIRD_ACCOUNT_EXPRESS');
            } else {
              typeSend = inerValue.type;
            }

            verified = inerValue.verified;
            zelle = inerValue.zelle;
          }
          if (inerKey === 'giftCardId') {
            giftCardId = inerValue;
          }
        });

        let ob = {
          initialAmount: initialAmount,
          comision: comision,
          sended: sended,
          receiver: receiver,
          currency: currencyOp,
          amount: amountOp,
          status: statusOp,
          type: typeOp2,
          date: dateOperation2,
          key: dateOperation,
          btcPrice: btcPrice,
          flag: flagData,
          style: '',
          user: user,
          description: description,
          canceledReason: canceledReason,
          fulladdress: fulladdress,
          typeOp: typeOp,
          accountAddress: accountAddress,
          accountHolderName: accountHolderName,
          accountNumber: accountNumber,
          accountZip: accountZip,
          automaticCharge: automaticCharge,
          bank: bank,
          bankRoutingNumber: bankRoutingNumber,
          bankSwiftCode: bankSwiftCode,
          currencySend: currencySend,
          typeSend: typeSend,
          verified: verified,
          zelle: zelle,
          typeAmount: typeAmount,
          giftCardId: giftCardId,
        };

        if (idOperation !== undefined) {
          ob.idOperation = idOperation;
        }

        if (id !== undefined) {
          ob.id = id;
        }
        if (targetAddress !== undefined) {
          ob.targetAddress = targetAddress;
          ob.fulladdress = fulladdress;
        }

        array.push(ob);
      });

      array.sort((a, b) => {
        return new Date(b.key).getTime() - new Date(a.key).getTime();
      });

      if (isFilter) {
        this.setState({ data: array }, () => {
          this.showOperationByUrl(this.state.data);
        });
      } else {
        this.setState({ data: array, oldData: array }, () => {
          this.showOperationByUrl(this.state.data);
        });
      }

      this.setState({ load: false, isFetching: false });
    } catch (error) {
      //console.log(error);
    }
  }
  async formatedDataToRender2(data) {
    ////console.log(data)
    let array = [];
    let oldData = [];
    this.setState({ data2: [] });
    Object.entries(data).forEach(([key, value]) => {
      let t = this.state.translator;
      let dateOperation2,
        typeOp,
        typeOp2,
        targetAddress,
        amountOp,
        fulladdress,
        statusOp,
        id,
        idOperation,
        currencyOp,
        user,
        description;

      // amount: 10
      // currency: "USD"
      // mcRetailOperationStatus: "PROCESSING"
      // mcRetailOperationType: "BUY_BALANCE"
      // timestamp: "2020-06-23T17:50:54.003Z"
      // userName: "584245657120"
      // mcRetailId: "2af0d7aed8b64fad9d96c36118895dda"

      Object.entries(value).forEach(([inerKey, inerValue]) => {
        if (inerKey === 'mcRetailOperationStatus') {
          statusOp = inerValue;
        }
        if (inerKey === 'mcRetailOperationType') {
          typeOp = inerValue;
          ////console.log(typeOp)
          let val = typeOp
            .toLocaleString('en-US', {
              maximumFractionDigits: 12,
            })
            .toLowerCase();

          let translate = 'homeLoggedIn.transactions.detail.labels.' + val;
          let string = translate.toString();

          typeOp2 = this.state.translator(string);
          //  //console.log(typeOp2)
        }
        if (inerKey === 'amount') {
          amountOp = inerValue;
        }
        if (inerKey === 'description' && inerValue !== undefined) {
          let t = this.state.translator;
          if (inerValue.indexOf('DESCRIPTION') !== -1) {
            let info = inerValue.split(' ');
            if (info[2] === 'PAYMENT') {
              // //console.log("payment:", info[2])
              user = '';
            } else {
              if (inerValue.indexOf('-') !== -1) {
                let sendTo = inerValue.split('-')[0];
                let first = this.getFirtWord(sendTo);
                user = sendTo.split(first)[1];
              } else {
                user = info[2];
                // //console.log("usuario en el else del payment:", user)
              }
            }
            let desc = inerValue.split('DESCRIPTION')[1];
            if (desc.charAt(0) !== ' ') {
              description = desc;
            } else {
              description = desc.substring(1, desc.length);
            }
          } else if (inerValue.indexOf('OTC operation id') !== -1) {
            let value = inerValue.split('OTC operation id ')[1];
            id = value;
            let idTruncate = value.substring(value.length - 7, value.length);
            idOperation = idTruncate;
          } else if (inerValue.indexOf('ROLLBACK FROM') !== -1) {
            let val = inerValue.split('ROLLBACK FROM ')[1];
            user = val;
            description = 'homeLoggedIn.transactions.detail.labels.rollback';
          } else if (inerValue.indexOf('RECEIVE FROM') !== -1) {
            let content = inerValue.split('RECEIVE FROM ');
            user = content[1];
            description = 'homeLoggedIn.transactions.detail.labels.addAmount'; // t(
            //);
          } else if (inerValue.indexOf('CHANGE FROM') !== -1) {
            let content = inerValue.split('CHANGE FROM ');
            let currencies = content[1].split('-')[0];
            description =
              'homeLoggedIn.transactions.detail.labels.change_from' +
              currencies.split('TO')[0] +
              ' -> ' +
              currencies.split('TO')[1];
          } else if (inerValue.includes('BUY BALANCE RETAIL')) {
            let idRetail = inerValue.split(' ')[3];
            idRetail = idRetail.substring(idRetail.length - 4, idRetail.length);
            description =
              'homeLoggedIn.transactions.detail.labels.mc_retail_buy' +
              ' ' +
              idRetail;
          } else if (inerValue.includes('SELL BALANCE RETAIL')) {
            let idRetail = inerValue.split(' ')[3];
            idRetail = idRetail.substring(idRetail.length - 4, idRetail.length);
            description =
              'homeLoggedIn.transactions.detail.labels.mc_retail_sell' +
              ' ' +
              idRetail;
          } else if (inerValue.includes('ADDED TO RETAIL ESCROW')) {
            let idRetail = inerValue.split(' ')[4];
            idRetail = idRetail.substring(idRetail.length - 4, idRetail.length);
            description =
              this.state.translator(
                'homeLoggedIn.transactions.detail.labels.added_to_retail_escrow'
              ) +
              ' ' +
              idRetail;
          } else {
            description = inerValue;
          }
        } else {
          description = 'N/A';
        }
        if (inerKey === 'timestamp') {
          dateOperation2 = this.formatDate(new Date(inerValue));
        }
        if (inerKey === 'currency') {
          currencyOp = inerValue;
        }
      });

      let ob = {
        currency: currencyOp,
        amount: amountOp,
        mcRetailOperationStatus: statusOp,
        mcRetailOperationType: typeOp2,
        timestamp: dateOperation2,
        key: dateOperation2,
        user: user,
        description: description,
      };
      if (idOperation !== undefined) {
        ob.idOperation = idOperation;
      }
      if (id !== undefined) {
        ob.id = id;
      }
      if (targetAddress !== undefined) {
        ob.targetAddress = targetAddress;
        ob.fulladdress = fulladdress;
      }

      array.push(ob);
    });
    array.sort((a, b) => {
      return new Date(b.key).getTime() - new Date(a.key).getTime();
    });
    console.log(array, data);
    this.setState({ data5: array });
    this.setState({ load: false, isFetching: false });
  }
  showOperationByUrl(data) {
    var idUrl = parse(window.location.search).id;
    if (idUrl !== undefined) {
      var uri = window.location.toString();
      if (uri.indexOf('?') > 0) {
        var clean_uri = uri.substring(0, uri.indexOf('?'));
        window.history.replaceState({}, document.title, clean_uri);
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i].idOperation !== undefined) {
          if (idUrl.slice(-7) === data[i].idOperation) {
            var index = i;
            let operationIndex = {
              [index]: {},
            };
            this.expandedOperation(operationIndex, [i]);
          }
        }
      }
    }
  }
  expandedOperation(newExpanded, index, event) {
    var otherExpandedRow = false;
    if (newExpanded[index[0]] === false) {
      newExpanded = {};
    } else {
      Object.keys(newExpanded).map((k) => {
        newExpanded[k] = parseInt(k) === index[0] ? {} : false;
        otherExpandedRow = true;
        return null;
      });
    }
    this.setState({
      ...this.state,
      expanded: newExpanded,
    });
  }
  async getMovementUser(source) {
    this.setState({ load: true });
    try {
      // user de prueba "584160565899"
      const username = window.sessionStorage.getItem('username');
      const response = await user.getMovementsUser(username);
      //console.log("response.data:", response.data);
      let keys = Object.keys(response.data);
      if (keys.length > 0) {
        await this.formatedDataToRender(response.data, false);
      } else {
        this.setState({
          data: [],
          data5: [],
          notData: true,
          load: false,
          isFetching: false,
        });
      }
    } catch (error) {
      this.setState({ isFetching: false });
      this.setState({ load: false, notData: true, data: [] });
    }
  }
  determinateOperationTypeRender(type) {
    let resp = {
      text: '',
      img: '',
      style: '',
    };
    if (type === 'BUY_BALANCE') {
      return {
        text: 'homeLoggedIn.detail.retail.buyOrSellBalanceRetails.buy_balance',
        img: '', //defaultImg,
        style: '', //appStyle.amountBalanceTitlePlus,
      };
    } else if (type === 'MC_RETAIL_BUY_BALANCE') {
      return {
        text: 'homeLoggedIn.detail.retail.buyOrSellBalanceRetails.buy_balance',
        img: '', //defaultImg,
        style: '', //appStyle.amountBalanceTitlePlus,
      };
    } else if (type === 'MC_RETAIL_SELL_BALANCE') {
      return {
        text: 'homeLoggedIn.detail.retail.buyOrSellBalanceRetails.sell_balance',
        img: '', //defaultImg,
        style: '', //appStyle.amountBalanceTitleMinus,
      };
    } else {
      return {
        text: type,
        img: '', //defaultImg,
        style: '', //appStyle.amountBalanceTitle,
      };
    }
  }
  async preprocessData(data) {
    let aux = [],
      obj = {};
    await data.forEach((p) => {
      obj = this.determinateOperationTypeRender(p.mcRetailOperationType);
      let fla = CurrenciesFlag.currenciesFlag[p.currency];
      if (fla !== undefined) {
        p.flag = fla;
      } else {
        let findCurren = this.state.currencies.find((currency) => {
          return currency.shortName === p.currency;
        });
        p.flag = {
          key: findCurren.shortName.toLowerCase(),
          value: findCurren.shortName,
          flag: findCurren.shortName.toLowerCase(),
          text: findCurren.shortName,
          img: mcIcon,
          alias: findCurren.shortName,
          isCripto: false,
          symbol: ' ',
          priority: 10,
        };
      }
      p.operation = obj.text;
      p.style = obj.style;
      p.img = obj.img;
      p.imgSecurity = p.securityImageUrl;
      p.imgNameEs = p.securityImageNameES;
      p.imgNameEn = p.securityImageNameEN;
      aux.push(p);
    });
    return aux;
  }

  async getProcessionOperations(source) {
    try {
      const userr = window.sessionStorage.getItem('username');
      let body = {
        userName: userr,
        currency: '',
        retailId: '',
        mcRetailOperationType: null,
        mcRetailOperationStatus: 'PROCESSING',
      };

      const response = await user.getOperationsByFilter(body);
      let array = response.data;

      if (array.length > 0) {
        array = await this.formatedDataToRender2(array);
        // array.sort((a, b) =>
        // {
        //   return (
        //     new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        //   );
        // });
        this.setState({
          //data5: array,
          loading: false,
          notData: false,
          isFetching: false,
        });
      } else {
        this.setState({
          data5: [],
          notData: true,
          loading: false,
          // isFetching: false,
        });
        //console.log("en el else")
      }
    } catch (e) {
      //console.log("dentro del catch", e)
      this.setState({
        data5: [],
        load: false,
        // isFetching: false,
        notData: true,
      });
    }
  }

  async getMovementRange(source) {
    this.setState({ load: true });
    try {
      if (
        this.state.dateInit !== '' &&
        this.state.dateInit !== undefined &&
        this.state.dateInit !== null &&
        this.state.dateEnd !== '' &&
        this.state.dateEnd !== undefined &&
        this.state.dateEnd !== null
      ) {
        // if (this.state.dateInit < this.state.dateEnd) {

        const username = window.sessionStorage.getItem('username');
        const response = await user.getMovementsUserRange(
          username,
          this.state.dateInit,
          this.state.dateEnd
        );
        //	console.log("respuesta:", response);
        let keys = Object.keys(response.data);
        if (keys.length > 0) {
          await this.formatedDataToRender(response.data, true);
        } else {
          this.setState({
            data: [],
            data5: [],
            notData: true,
            load: false,
            isFetching: false,
          });
        }
      } else {
        this.setState({
          load: false,
        });
      }
    } catch (error) {
      this.setState({ isFetching: false });
      this.setState({ load: false, notData: true, data: [] });
    }
  }

  executefilter() {
    if (
      this.state.data.length > 0 &&
      this.state.currencySelected !== undefined &&
      this.state.amountInit !== undefined &&
      this.state.amountEnd !== undefined &&
      this.state.currencySelected !== '' &&
      this.state.amountInit !== '' &&
      this.state.amountEnd !== ''
    ) {
      //console.log(this.state.data);
      let amountInit, amountEnd;
      let newArray;
      let currencySelected = this.state.currencySelected;
      let arraykey = [];
      amountInit = this.state.amountInit;
      amountEnd = this.state.amountEnd;

      Object.entries(this.state.oldData).forEach((key, value) => {
        arraykey.push(key[1]);
      });

      newArray = arraykey.filter(function (el) {
        return (
          el.amount <= amountEnd &&
          el.amount >= amountInit &&
          el.currency === currencySelected
        );
      });
      this.setState({
        data: newArray,
      });
    }
  }

  handleCurrency(e, data) {
    this.setState({ currencySelected: data.value });
  }

  handleOptions(e, data) {
    if (data.value === 'MONTO' || data.value === 'AMOUNT') {
      this.setState({
        optionfilterAmount: true,
        optionfilterDate: false,
      });
      this.ReloadTable();
    } else if (data.value === 'FECHA' || data.value === 'DATE') {
      this.setState({ optionfilterDate: true, optionfilterAmount: false });
      this.ReloadTable();
    }
    this.setState({ optionSelected: data.value });
  }

  loadDataToPrinting() {
    //this.determinateTotals();
    let optionsPdf = [];
    let t = this.state.translator;
    let obPrint = {
      trackId: this.state.trackId,
      dateOperation: this.state.operationDate,
      dateAvailable: this.state.availableDate,
      amountSend: this.props.amountToChange,
      commission: this.props.commisionByOperarion,
      tax: this.props.taxVat,
      totalSend: this.props.totalToSend,
      factor: this.props.factorInverseToShow,
      factorInverse: this.props.factorToShow,
      amountReceive: this.props.amountReceiveToShow,
    };

    Object.entries(obPrint).forEach(([ke, val]) => {
      let objPdf = {
        label: '',
        value: '',
      };
      if (ke === 'dateOperation') {
        objPdf.label = t('fastChange.dateOperation');
        objPdf.value = val;
        optionsPdf.push(objPdf);
      } else if (ke === 'trackId') {
        objPdf.label = t('fastChange.idOperation');
        objPdf.value = val.substr(-7);
        optionsPdf.push(objPdf);
      } else if (ke === 'dateAvailable') {
        objPdf.label = t('fastChange.dateAvailable');
        objPdf.value = val;
        optionsPdf.push(objPdf);
      } else if (ke === 'amountSend') {
        objPdf.label = t('buyBTC.modal.amountSend');
        objPdf.value =
          new Number(val).toFixed(2).toString() +
          ' ' +
          this.props.currencyLabelSelected;
        optionsPdf.push(objPdf);
      } else if (ke === 'amountReceive') {
        objPdf.label = t('buyBTC.modal.amountReceive');
        objPdf.value = new Number(val).toFixed(8).toString() + ' BTC';
        optionsPdf.push(objPdf);
      } else if (ke === 'commission') {
        objPdf.label = t('buyBTC.modal.Commission');
        objPdf.value =
          this.props.currencyOfCharges !== 'BTC'
            ? Number(val).toFixed(6)
            : Number(val).toFixed(12);
        optionsPdf.push(objPdf);
      } else if (ke === 'tax') {
        objPdf.label = t('buyBTC.modal.tax');
        objPdf.value =
          this.props.currencyOfCharges !== 'BTC'
            ? Number(val).toFixed(6)
            : Number(val).toFixed(12);
        optionsPdf.push(objPdf);
      } else if (ke === 'totalSend') {
        objPdf.label = t('buyBTC.modal.totalToSend');
        objPdf.value = val + ' ' + this.props.currencyLabelSelected;
        optionsPdf.push(objPdf);
      } else if (ke === 'factor') {
        objPdf.label = t('buyBTC.modal.changeFactor');

        objPdf.value =
          '1' +
          ' ' +
          this.props.currencyLabelSelected +
          ' ' +
          '=' +
          '  ' +
          new Number(val).toFixed(12).toString() +
          '  BTC';
        optionsPdf.push(objPdf);
      } else if (ke === 'factorInverse') {
        objPdf.label = t('buyBTC.modal.changeFactorInverse');
        objPdf.value =
          '1' +
          ' ' +
          'BTC' +
          ' ' +
          '=' +
          '  ' +
          new Number(val).toFixed(2).toString() +
          '  ' +
          this.props.currencyLabelSelected;
        optionsPdf.push(objPdf);
      } else {
        objPdf.label = '';
        objPdf.value = '';
        optionsPdf.push(objPdf);
      }
    });
    if (optionsPdf !== '') {
      this.setState({ showModalReceipt: true });
    }
    this.setState({ dataToPdf: optionsPdf, loadModal: false });
  }

  render() {
    //console.log("this.state.data:", this.state.data);
    let messageDate;
    let t = this.state.translator;
    let oldlanguage = this.state.langu;
    let newlanguage = window.sessionStorage.getItem('language');

    if (oldlanguage !== newlanguage) {
      this.getMovementUser();
      this.getProcessionOperations();
      this.setState({
        langu: newlanguage,
      });
    }
    if (this.state.message) {
      messageDate = (
        <Message negative>{t('homeLoggedIn.transactions.messageDate')}</Message>
      );
    }
    let statusLabelNew = (status) => {
      return (
        <Label size='mini' color={status.color}>
          <Icon name={status.icon} />
          {status.name}
        </Label>
      );
    };
    let statusLabel = (status) => {
      if (status === 'OK') {
        let value = 'homeLoggedIn.transactions.detail.statusOperation.success';
        return (
          <Label size='mini' color='green'>
            <Icon name='check circle' />
            {t(value)}
          </Label>
        );
      } else if (status === 'WAITING_FOR_PAYMENT') {
        let value = 'homeLoggedIn.tableHeaders.statusValues.waitingPayment';
        return (
          <Label size='mini' color='blue'>
            <Icon name='sync' loading />
            {t(value)}
          </Label>
        );
      } else if (status === 'FAIL') {
        let value = 'homeLoggedIn.transactions.detail.statusOperation.fail';
        return (
          <Label size='mini' color='red'>
            <Icon name='warning circle' />
            {t(value)}
          </Label>
        );
      } else if (status === 'CANCELED') {
        let value = 'homeLoggedIn.tableHeaders.statusValues.canceled';
        return (
          <Label size='mini' color='red'>
            <Icon name='warning circle' />
            {t(value)}
          </Label>
        );
      } else if (status === 'PAY_VERIFICATION') {
        let value = 'homeLoggedIn.tableHeaders.statusValues.payVerification';
        return (
          <Label size='mini' color='orange'>
            <Icon name='info' />
            {t(value)}
          </Label>
        );
      } else if (status === 'CLAIM') {
        let value = 'homeLoggedIn.tableHeaders.statusValues.claim';
        return (
          <Label size='mini' color='grey'>
            <Icon name='info' />
            {t(value)}
          </Label>
        );
      } else if (status === 'PROCESSING') {
        let value = 'homeLoggedIn.tableHeaders.statusValues.processing';
        return (
          <Label size='mini' color='grey'>
            <Icon name='info' />
            {t(value)}
          </Label>
        );
      } else {
        return (
          <Label size='mini' color='grey'>
            <Icon name='info' />
            {status}
          </Label>
        );
      }
    };

    const customOptionsFilterMethod = (filter, row) => {
      if (filter.value === '') {
        return true;
      }
      if (
        row.type.toLowerCase().includes(filter.value.toLowerCase()) === false
      ) {
        return row[filter.id].includes(filter.value);
      } else {
        return true;
      }
    };
    const customOptionsFilterMethod6 = (filter, row) => {
      if (filter.value === '') {
        return true;
      }
      if (
        row.mcRetailOperationType
          .toLowerCase()
          .includes(filter.value.toLowerCase()) === false
      ) {
        return row[filter.id].includes(filter.value);
      } else {
        return true;
      }
    };
    const customOptionsFilterMethod2 = (filter, row) => {
      if (filter.value === '') {
        return true;
      }
      if (row.date === undefined) {
        if (
          row.timestamp.toLowerCase().includes(filter.value.toLowerCase()) ===
          false
        ) {
          return row[filter.id].includes(filter.value);
        } else {
          return true;
        }
      } else if (row.timestamp === undefined) {
        if (
          row.date.toLowerCase().includes(filter.value.toLowerCase()) === false
        ) {
          return row[filter.id].includes(filter.value);
        } else {
          return true;
        }
      }
    };
    const customOptionsFilterMethod3 = (filter, row) => {
      if (filter.value === '') {
        return true;
      }

      if (
        row.currency.toLowerCase().includes(filter.value.toLowerCase()) ===
        false
      ) {
        return row[filter.id].includes(filter.value);
      } else {
        return true;
      }
    };
    const customOptionsFilterMethod4 = (filter, row) => {
      if (filter.value === '') {
        return false;
      }
      if (
        row.status.name.toLowerCase().includes(filter.value.toLowerCase()) ===
        true
      ) {
        return statusLabel(row.status.toString());
      } else {
        return false;
      }
    };
    const customOptionsFilterMethod5 = (filter, row) => {
      if (filter.value === '') {
        return false;
      }
      if (
        row.mcRetailOperationStatus
          .toLowerCase()
          .includes(filter.value.toLowerCase()) === true
      ) {
        return statusLabel(row.mcRetailOperationStatus.toString());
      } else {
        return false;
      }
    };
    const customOptionsFilterDescription = (filter, row) => {
      if (filter.value === '') {
        return false;
      }
      if (row.description !== undefined) {
        let value = String(filter.value);
        value = value.toUpperCase();
        let rowValue = String(row.description);
        rowValue = rowValue.toUpperCase();
        if (rowValue.includes(value)) {
          return row;
        } else {
          return false;
        }
      }
    };
    const transactionTableHeaders = [
      {
        Header: t('homeLoggedIn.tableHeaders.date'),
        accessor: 'date',
        minWidth: 110,
        width: 130,
        filterMethod: (filter, row) => customOptionsFilterMethod2(filter, row),
      },
      {
        Header: 'ID',
        accessor: 'idOperation',
        sortable: false,
        width: 70,
        filterable: true,
        Cell: (row) => {
          return row.value !== undefined ? row.value.slice(-4) : '';
        },
      },
      {
        Header: t('homeLoggedIn.tableHeaders.operation'),
        accessor: 'type',
        width: 200,
        filterable: true,
        filterMethod: (filter, row) => customOptionsFilterMethod(filter, row),
      },
      {
        Header: t('homeLoggedIn.transactions.detail.labels.description'),
        accessor: 'description',
        filterable: true,
        minWidth: 200,
        filterMethod: (filter, row) =>
          customOptionsFilterDescription(filter, row),
        Cell: (row) => {
          //console.log(row.value)
          if (row.value !== undefined) {
            let d = row.value.toString();
            if (d.includes('change_from')) {
              let sp = d.split('change_from', 2);

              let trad = t(sp[0] + 'change_from');
              let notrad = sp[1];
              let newtrad = trad + notrad;
              return newtrad;
            } else if (d.includes('mc_retail_sell')) {
              let sp = d.split('mc_retail_sell', 2);

              let trad = t(sp[0] + 'mc_retail_sell');
              let notrad = sp[1];
              let newtrad = trad + notrad;
              return newtrad;
            } else if (d.includes('mc_retail_buy')) {
              let sp = d.split('mc_retail_buy', 2);

              let trad = t(sp[0] + 'mc_retail_buy');
              let notrad = sp[1];
              let newtrad = trad + notrad;
              return newtrad;
            } else if (d.includes('added_to_retail_escrow')) {
              let sp = d.split('added_to_retail_escrow', 2);

              let trad = t(sp[0] + 'added_to_retail_escrow');
              let notrad = sp[1];
              let newtrad = trad + notrad;
              return newtrad;
            } else {
              return d;
            }
          } else {
            return 'N/A';
          }
        },
      },
      {
        Header: t('homeLoggedIn.tableHeaders.amount'),
        accessor: 'amount',
        filterable: true,
        getProps: () => {
          return {
            style: {
              textAlign: 'right',
            },
          };
        },
        width: 100,
        Cell: (row) => {
          if (row.value !== null) {
            let number = row.value.toString();
            if (number.includes('e')) {
              let neww = row.value.toFixed(8);
              return <div> {neww}</div>;
            } else {
              return (
                <NumberFormat
                  value={row.value}
                  displayType={'text'}
                  thousandSeparator={true}
                  style={{
                    color:
                      row.original.typeAmount === 'addedAmount'
                        ? '#4c9917'
                        : '#db2828',
                  }}
                />
              );
            }
          } else {
            return 'N/A';
          }
        },
      },

      {
        Header: t('homeLoggedIn.tableHeaders.currency'),
        accessor: 'currency',
        minWidth: 70,
        filterable: true,
        filterMethod: (filter, row) => customOptionsFilterMethod3(filter, row),
        // Cell: (row) =>
        // {
        // if (row.value !== "ETH") {
        //   return (
        //     <div>
        //       <Flag name={row.original.flag} /> {row.value}
        //     </div>
        //   );
        // } else {
        //   return (
        //     <div>
        //       <Icon name={row.original.icon} /> {row.value}
        //     </div>
        //   );
        // }
        //}
      },

      {
        Header: t('homeLoggedIn.tableHeaders.status'),
        accessor: 'status',
        filterable: true,
        sortable: false,
        minWidth: 110,
        filterMethod: (filter, row) => customOptionsFilterMethod4(filter, row),
        Cell: (row) => {
          return statusLabelNew(row.value);
        },
      },
    ];

    const processingTableHeaders = [
      {
        Header: t('homeLoggedIn.tableHeaders.date'),
        accessor: 'timestamp',
        minWidth: 110,
        width: 130,
        filterMethod: (filter, row) => customOptionsFilterMethod2(filter, row),
        Cell: (row) => {
          return this.formatDate(row.value);
        },
      },
      {
        Header: 'ID',
        accessor: 'idOperation',
        width: 70,
        filterable: true,
        Cell: (row) => {
          return row.value.slice(-4);
        },
      },
      {
        Header: t('homeLoggedIn.tableHeaders.operation'),
        accessor: 'mcRetailOperationType',
        width: 200,
        filterable: true,
        filterMethod: (filter, row) => customOptionsFilterMethod6(filter, row),
      },
      {
        Header: t('homeLoggedIn.transactions.detail.labels.description'),
        accessor: 'description',
        filterable: true,
        minWidth: 200,
        Cell: (row) => {
          if (row.value !== undefined && row.value !== 'N/A') {
            let d = row.value.toString();
            if (d.includes('change_from')) {
              let sp = d.split('change_from', 2);

              let trad = t(sp[0] + 'change_from');
              let notrad = sp[1];
              let newtrad = trad + notrad;
              return newtrad;
            } else if (d.includes('mc_retail_sell')) {
              let sp = d.split('mc_retail_sell', 2);

              let trad = t(sp[0] + 'mc_retail_sell');
              let notrad = sp[1];
              let newtrad = trad + notrad;
              return newtrad;
            } else if (d.includes('mc_retail_buy')) {
              let sp = d.split('mc_retail_buy', 2);

              let trad = t(sp[0] + 'mc_retail_buy');
              let notrad = sp[1];
              let newtrad = trad + notrad;
              return newtrad;
            } else if (d.includes('added_to_retail_escrow')) {
              let sp = d.split('added_to_retail_escrow', 2);

              let trad = t(sp[0] + 'added_to_retail_escrow');
              let notrad = sp[1];
              let newtrad = trad + notrad;
              return newtrad;
            } else {
              let tras = t(d);
              return tras;
            }
          } else {
            return 'N/A';
          }
        },
      },
      {
        Header: t('homeLoggedIn.tableHeaders.amount'),
        accessor: 'amount',
        filterable: true,
        getProps: () => {
          return {
            style: {
              textAlign: 'right',
            },
          };
        },
        width: 150,
        Cell: (row) => {
          // //console.log("row:", row)
          if (row.value !== null) {
            let number = row.value.toString();
            if (number.includes('e')) {
              let neww = row.value.toFixed(8);
              return <div> {neww}</div>;
            } else {
              return (
                <NumberFormat
                  value={row.value}
                  displayType={'text'}
                  thousandSeparator={true}
                />
              );
            }
          } else {
            return 'N/A';
          }
        },
      },

      {
        Header: t('homeLoggedIn.tableHeaders.currency'),
        accessor: 'currency',
        minWidth: 70,
        filterable: true,
        filterMethod: (filter, row) => customOptionsFilterMethod3(filter, row),
      },

      {
        Header: t('homeLoggedIn.tableHeaders.status'),
        accessor: 'mcRetailOperationStatus',
        filterable: true,
        minWidth: 110,
        filterMethod: (filter, row) => customOptionsFilterMethod5(filter, row),
        Cell: (row) => {
          return statusLabel(row.value);
        },
      },
    ];

    let proces = t('homeLoggedIn.tableHeaders.process');
    let historical = t('homeLoggedIn.tableHeaders.historical');

    let options = [
      { key: 'DATE', text: 'Date', value: 'DATE' },
      { key: 'AMOUNT', text: 'Amount', value: 'AMOUNT' },
    ];

    let optionsEs = [
      { key: 'FECHA', text: 'Fecha', value: 'FECHA' },
      { key: 'MONTO', text: 'Monto', value: 'MONTO' },
    ];

    let list = [];
    if (this.state.currenciesData.length > 0) {
      let shortName, fullName;
      Object.entries(this.state.currenciesData).forEach((key, value) => {
        Object.entries(key[1]).forEach((inerkey, inervalue) => {
          if (inerkey[0] === 'fullName') {
            fullName = inerkey[1];
          }

          if (inerkey[0] === 'shortName') {
            shortName = inerkey[1];
          }
        });
        list.push({
          text: fullName,
          value: shortName,
          key: fullName,
        });
      });
      list.push({
        text: 'Bitcoin',
        value: 'BTC',
        key: 'Bitcoin',
      });
    }

    const panes = [
      {
        menuItem: historical,
        render: () => (
          <Tab.Pane style={{ borderColor: 'white' }}>
            <Segment>
              <Form>
                <Form.Field inline>
                  <label>
                    {t(
                      'homeLoggedIn.transactions.detail.labels.filteredOptions'
                    )}
                  </label>
                  <Dropdown
                    selection
                    options={
                      window.sessionStorage.getItem('language') === 'es'
                        ? optionsEs
                        : options
                    }
                    value={this.state.optionSelected}
                    onChange={this.handleOptions.bind(this)}
                  />
                </Form.Field>

                {this.state.optionfilterDate && !this.state.optionfilterAmount && (
                  <div>
                    <Divider style={{ backgroundColor: '#055990' }} />
                    <Form.Group widths='equal'>
                      <Form.Field>
                        <label>
                          {t(
                            'homeLoggedIn.transactions.detail.labels.initDate'
                          )}
                        </label>
                        <Input
                          type='date'
                          name='date1'
                          value={this.state.dateInit}
                          onChange={this.pickDateFrom}
                        ></Input>
                      </Form.Field>
                      <Form.Field>
                        <label>
                          {t('homeLoggedIn.transactions.detail.labels.endDate')}
                        </label>
                        <Input
                          type='date'
                          name='date2'
                          value={this.state.dateEnd}
                          onChange={this.pickDateTo}
                        ></Input>
                      </Form.Field>
                      <Button
                        disabled={
                          this.state.dateInit === '' ||
                          this.state.dateEnd === ''
                        }
                        color='blue'
                        style={{ marginTop: 23 }}
                        type='submit'
                        onClick={this.getMovementRange.bind(this)}
                        loading={this.state.searchLoad}
                      >
                        {t('homeLoggedIn.transactions.detail.labels.search')}
                      </Button>
                      <Button
                        secondary
                        color='blue'
                        style={{ marginTop: 23 }}
                        type='submit'
                        onClick={this.ReloadTable.bind(this)}
                        loading={this.state.searchLoad}
                      >
                        {t('homeLoggedIn.transactions.detail.labels.reset')}
                      </Button>
                    </Form.Group>
                    {messageDate}
                  </div>
                )}

                {this.state.optionfilterAmount && !this.state.optionfilterDate && (
                  <div>
                    <Divider style={{ backgroundColor: '#055990' }} />
                    <Form.Group widths='equal'>
                      <Form.Field>
                        <label>
                          {t(
                            'homeLoggedIn.transactions.detail.labels.currency'
                          )}
                        </label>
                        <Dropdown
                          search
                          selection
                          options={list}
                          value={this.state.currencySelected}
                          onChange={this.handleCurrency.bind(this)}
                          //	onSearchChange={this.handleSearchChange.bind(this)}
                          required
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>
                          {t(
                            'homeLoggedIn.transactions.detail.labels.initAmount'
                          )}
                        </label>
                        <Input
                          type='number'
                          name='amount1'
                          value={this.state.amountInit}
                          onChange={this.pickAmountInit}
                        ></Input>
                      </Form.Field>

                      <Form.Field>
                        <label>
                          {t(
                            'homeLoggedIn.transactions.detail.labels.endAmount'
                          )}
                        </label>
                        <Input
                          type='number'
                          name='amount2'
                          value={this.state.amountEnd}
                          onChange={this.pickAmountEnd}
                        ></Input>
                      </Form.Field>
                      <Button
                        color='blue'
                        style={{ marginTop: 23 }}
                        type='submit'
                        onClick={this.executefilter.bind(this)}
                      >
                        {t('homeLoggedIn.transactions.detail.labels.search')}
                      </Button>
                      <Button
                        secondary
                        style={{ marginTop: 23 }}
                        type='submit'
                        onClick={this.ReloadTable.bind(this)}
                        loading={this.state.searchLoad}
                      >
                        {t('homeLoggedIn.transactions.detail.labels.reset')}
                      </Button>
                    </Form.Group>
                  </div>
                )}
              </Form>
            </Segment>

            <ReactTable
              loading={this.state.load}
              className='transactionTable'
              data={this.state.data} //this.state.data
              columns={transactionTableHeaders}
              defaultPageSize={this.state.cantRow}
              style={{ fontSize: 12 }}
              previousText={t('homeLoggedIn.table.previous')}
              nextText={t('homeLoggedIn.table.next')}
              loadingText={t('homeLoggedIn.table.loading')}
              noDataText={t('homeLoggedIn.table.noData')}
              pageText={t('homeLoggedIn.table.page')}
              ofText={t('homeLoggedIn.table.of')}
              rowsText={t('homeLoggedIn.table.rows')}
              pageJumpText={t('homeLoggedIn.table.pageJump')}
              rowsSelectorText={t('homeLoggedIn.table.rowsSelector')}
              minRow={this.state.cantRow}
              expanded={this.state.expanded}
              getTrProps={this.getTrProps}
              onExpandedChange={(newExpanded, index, event) => {
                this.expandedOperation(newExpanded, index, event);
              }}
              SubComponent={(row) => {
                this.state.expandedRow = row;
                // console.log("expandedRow:", this.state.expandedRow);
                return (
                  <div style={{ padding: '10px', marginLeft: '20px' }}>
                    {this.state.expandedRow.original.typeOp !==
                      'SEND_TO_PAYMENT' &&
                      this.state.expandedRow.original.typeOp !==
                        'MC_BUY_CRYPTO' &&
                      this.state.expandedRow.original.typeOp !==
                        'MC_SELL_CRYPTO' && (
                        <Grid>
                          <Grid.Column width={1}></Grid.Column>
                          <Grid.Column width={7}></Grid.Column>
                          <Grid.Column width={7} textAlign='left'>
                            <Grid.Row>
                              <div>
                                {this.state.expandedRow.original.giftCardId !==
                                  '' && (
                                  <label>
                                    <strong>
                                      {t(
                                        'homeLoggedIn.transactions.detail.labels.gift_card_id'
                                      ) + ' : '}
                                      {this.state.expandedRow.original.giftCardId.slice(
                                        -4
                                      )}
                                      <br />
                                      <br />
                                    </strong>
                                  </label>
                                )}
                              </div>
                            </Grid.Row>
                            <Grid.Row>
                              <div>
                                {this.state.expandedRow.original.receiver ===
                                  'true' &&
                                  this.state.expandedRow.original.currency !==
                                    'BTC' && (
                                    <label>
                                      <strong>
                                        {t(
                                          'homeLoggedIn.transactions.detail.labels.emit'
                                        )}
                                      </strong>
                                    </label>
                                  )}

                                {this.state.expandedRow.original.sended ===
                                  'true' &&
                                  this.state.expandedRow.original.currency !==
                                    'BTC' && (
                                    <label>
                                      <strong>
                                        {t(
                                          'homeLoggedIn.transactions.detail.labels.sendTo'
                                        )}
                                      </strong>
                                    </label>
                                  )}

                                {/* this.state.expandedRow.original.receiver !== "true" &&
                              this.state.expandedRow.original.sended !== "true" */}
                                {this.state.expandedRow.original.currency ===
                                  'BTC' &&
                                  this.state.expandedRow.original.type.includes(
                                    'wallet'
                                  ) === false && (
                                    <label>
                                      <strong>
                                        {t(
                                          'profile.optionDetail.stepUser.user'
                                        )}
                                      </strong>
                                    </label>
                                  )}
                                {this.state.expandedRow.original.currency ===
                                  'BTC' &&
                                  this.state.expandedRow.original.type.includes(
                                    'wallet'
                                  ) === true && (
                                    <label>
                                      <strong>
                                        {t(
                                          'homeLoggedIn.transactions.detail.labels.walletTarget'
                                        )}
                                      </strong>
                                    </label>
                                  )}
                              </div>
                            </Grid.Row>

                            <Grid.Row>
                              <p>
                                {this.state.expandedRow.original.user !== '' &&
                                this.state.expandedRow.original.user !==
                                  undefined &&
                                this.state.expandedRow.original.user !== null
                                  ? this.state.expandedRow.original.user
                                  : this.state.expandedRow.original
                                      .fulladdress !== '' &&
                                    this.state.expandedRow.original
                                      .fulladdress !== undefined &&
                                    this.state.expandedRow.original
                                      .fulladdress !== null
                                  ? this.state.expandedRow.original.fulladdress
                                  : 'N/A'}
                              </p>
                              {this.state.expandedRow.original.idOperation !==
                                undefined && (
                                <div>
                                  <label>
                                    <strong>ID:</strong>
                                  </label>{' '}
                                  {this.state.expandedRow.original.idOperation.slice(
                                    -4
                                  )}
                                </div>
                              )}
                            </Grid.Row>
                            <Grid.Row>
                              {this.state.expandedRow.original.comision !== 0 &&
                                this.state.expandedRow.original.comision !==
                                  '' &&
                                this.state.expandedRow.original.comision !==
                                  undefined && (
                                  <div>
                                    <label>
                                      <strong>
                                        {t(
                                          'homeLoggedIn.transactions.detail.sendToPayment.comission'
                                        )}
                                      </strong>
                                    </label>{' '}
                                    <NumberFormat
                                      value={
                                        this.state.expandedRow.original.comision
                                      }
                                      displayType={'text'}
                                      thousandSeparator={true}
                                    />{' '}
                                    {this.state.expandedRow.original.currency}
                                  </div>
                                )}
                            </Grid.Row>
                            <Grid.Row>
                              {this.state.expandedRow.original
                                .canceledReason !== '' && (
                                <div style={{ paddingTop: '7px' }}>
                                  <label>
                                    <strong>
                                      {t(
                                        'homeLoggedIn.transactions.detail.sendToPayment.canceledReason'
                                      )}
                                    </strong>
                                  </label>{' '}
                                  {
                                    this.state.expandedRow.original
                                      .canceledReason
                                  }
                                </div>
                              )}
                            </Grid.Row>
                          </Grid.Column>
                          <Grid.Column width={1}></Grid.Column>
                        </Grid>
                      )}
                    {this.state.expandedRow.original.typeOp ===
                      'SEND_TO_PAYMENT' && (
                      <Grid>
                        <Grid.Column width={1}></Grid.Column>
                        <Grid.Column width={7}>
                          <div>
                            {this.state.expandedRow.original.sended ===
                              'true' &&
                              this.state.expandedRow.original.currency !==
                                'BTC' && (
                                <div>
                                  {this.state.expandedRow.original.bank !==
                                    undefined && (
                                    <div
                                      style={{
                                        padding: '5px',
                                        textAlign: 'Left',
                                      }}
                                    >
                                      <label>
                                        <strong>
                                          {t(
                                            'homeLoggedIn.transactions.detail.sendToPayment.bank'
                                          )}
                                        </strong>{' '}
                                        {this.state.expandedRow.original.bank}
                                      </label>
                                    </div>
                                  )}
                                  {this.state.expandedRow.original
                                    .accountNumber !== undefined && (
                                    <div
                                      style={{
                                        padding: '5px',
                                        textAlign: 'Left',
                                      }}
                                    >
                                      <label>
                                        <strong>
                                          {t(
                                            'homeLoggedIn.transactions.detail.sendToPayment.accountNumber'
                                          )}
                                        </strong>{' '}
                                        {
                                          this.state.expandedRow.original
                                            .accountNumber
                                        }
                                      </label>
                                    </div>
                                  )}
                                  {this.state.expandedRow.original
                                    .accountHolderName !== undefined && (
                                    <div
                                      style={{
                                        padding: '5px',
                                        textAlign: 'Left',
                                      }}
                                    >
                                      <label>
                                        <strong>
                                          {t(
                                            'homeLoggedIn.transactions.detail.sendToPayment.accountHolderName'
                                          )}
                                        </strong>{' '}
                                        {
                                          this.state.expandedRow.original
                                            .accountHolderName
                                        }
                                      </label>
                                    </div>
                                  )}
                                  {this.state.expandedRow.original
                                    .accountAddress !== undefined && (
                                    <div
                                      style={{
                                        padding: '5px',
                                        textAlign: 'Left',
                                      }}
                                    >
                                      <label>
                                        <strong>
                                          {t(
                                            'homeLoggedIn.transactions.detail.sendToPayment.accountAddress'
                                          )}
                                        </strong>{' '}
                                        {
                                          this.state.expandedRow.original
                                            .accountAddress
                                        }
                                      </label>
                                    </div>
                                  )}
                                  {this.state.expandedRow.original
                                    .accountZip !== undefined && (
                                    <div
                                      style={{
                                        padding: '5px',
                                        textAlign: 'Left',
                                      }}
                                    >
                                      <label>
                                        <strong>
                                          {t(
                                            'homeLoggedIn.transactions.detail.sendToPayment.accountZip'
                                          )}
                                        </strong>{' '}
                                        {
                                          this.state.expandedRow.original
                                            .accountZip
                                        }
                                      </label>
                                    </div>
                                  )}
                                  {this.state.expandedRow.original
                                    .bankRoutingNumber !== undefined && (
                                    <div
                                      style={{
                                        padding: '5px',
                                        textAlign: 'Left',
                                      }}
                                    >
                                      <label>
                                        <strong>
                                          {t(
                                            'homeLoggedIn.transactions.detail.sendToPayment.bankRoutingNumber'
                                          )}
                                        </strong>{' '}
                                        {
                                          this.state.expandedRow.original
                                            .bankRoutingNumber
                                        }
                                      </label>
                                    </div>
                                  )}
                                  {this.state.expandedRow.original
                                    .bankSwiftCode !== undefined && (
                                    <div
                                      style={{
                                        padding: '5px',
                                        textAlign: 'Left',
                                      }}
                                    >
                                      <label>
                                        <strong>
                                          {t(
                                            'homeLoggedIn.transactions.detail.sendToPayment.bankSwiftCode'
                                          )}
                                        </strong>{' '}
                                        {
                                          this.state.expandedRow.original
                                            .bankSwiftCode
                                        }
                                      </label>
                                    </div>
                                  )}
                                  {this.state.expandedRow.original.zelle !==
                                    undefined && (
                                    <div
                                      style={{
                                        padding: '5px',
                                        textAlign: 'Left',
                                      }}
                                    >
                                      <label>
                                        <strong>
                                          {t(
                                            'homeLoggedIn.transactions.detail.sendToPayment.zelle'
                                          )}
                                        </strong>{' '}
                                        {this.state.expandedRow.original.zelle}
                                      </label>
                                    </div>
                                  )}
                                </div>
                              )}
                          </div>
                        </Grid.Column>
                        <Grid.Column width={7}>
                          <div>
                            {this.state.expandedRow.original.idOperation !==
                              undefined && (
                              <div
                                style={{ padding: '5px', textAlign: 'Left' }}
                              >
                                <label>
                                  <strong>ID:</strong>
                                </label>{' '}
                                {this.state.expandedRow.original.idOperation.slice(
                                  -4
                                )}
                              </div>
                            )}
                            <div style={{ padding: '5px', textAlign: 'Left' }}>
                              <label>
                                <strong>
                                  {t(
                                    'homeLoggedIn.transactions.detail.sendToPayment.typePayment'
                                  )}
                                </strong>
                              </label>{' '}
                              {this.state.expandedRow.original.typeSend}
                            </div>
                            <div style={{ padding: '5px', textAlign: 'Left' }}>
                              <label>
                                <strong>
                                  {t(
                                    'homeLoggedIn.transactions.detail.sendToPayment.amount'
                                  )}
                                </strong>
                              </label>{' '}
                              <NumberFormat
                                value={
                                  this.state.expandedRow.original.initialAmount
                                }
                                displayType={'text'}
                                thousandSeparator={true}
                              />{' '}
                              {this.state.expandedRow.original.currency}
                            </div>
                            <div style={{ padding: '5px', textAlign: 'Left' }}>
                              <label>
                                <strong>
                                  {t(
                                    'homeLoggedIn.transactions.detail.sendToPayment.comission'
                                  )}
                                </strong>
                              </label>{' '}
                              <NumberFormat
                                value={this.state.expandedRow.original.comision}
                                displayType={'text'}
                                thousandSeparator={true}
                              />{' '}
                              {this.state.expandedRow.original.currency}
                            </div>
                            {this.state.expandedRow.original.description !==
                              '' &&
                              this.state.expandedRow.original.description !==
                                undefined && (
                                <div
                                  style={{
                                    padding: '5px',
                                    textAlign: 'Left',
                                  }}
                                >
                                  <label>
                                    <strong>
                                      {t(
                                        'homeLoggedIn.transactions.detail.sendToPayment.description'
                                      )}
                                    </strong>
                                  </label>{' '}
                                  {this.state.expandedRow.original.description}
                                </div>
                              )}
                            {this.state.expandedRow.original.canceledReason !==
                              '' && (
                              <div
                                style={{ padding: '5px', textAlign: 'Left' }}
                              >
                                <label>
                                  <strong>
                                    {t(
                                      'homeLoggedIn.transactions.detail.sendToPayment.canceledReason'
                                    )}
                                  </strong>
                                </label>{' '}
                                {this.state.expandedRow.original.canceledReason}
                              </div>
                            )}
                          </div>
                        </Grid.Column>
                        <Grid.Column width={1}></Grid.Column>
                      </Grid>
                    )}

                    {(this.state.expandedRow.original.typeOp ===
                      'MC_BUY_CRYPTO' ||
                      this.state.expandedRow.original.typeOp ===
                        'MC_SELL_CRYPTO') && (
                      <Grid>
                        <Grid.Column width={1}></Grid.Column>
                        <Grid.Column width={7}></Grid.Column>
                        <Grid.Column width={7} textAlign='left'>
                          <Grid.Row>
                            <div>
                              <div>
                                <label>
                                  <strong>
                                    {t(
                                      'homeLoggedIn.transactions.detail.sendToPayment.comission'
                                    )}
                                  </strong>
                                </label>{' '}
                                <NumberFormat
                                  value={
                                    this.state.expandedRow.original.comision
                                  }
                                  displayType={'text'}
                                  thousandSeparator={true}
                                />{' '}
                                {this.state.expandedRow.original.currency}
                              </div>
                            </div>
                          </Grid.Row>
                          <Grid.Row>
                            <div></div>
                          </Grid.Row>
                        </Grid.Column>
                        <Grid.Column width={1}></Grid.Column>
                      </Grid>
                    )}
                  </div>
                );
              }}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: proces,
        render: () => (
          <Tab.Pane style={{ borderColor: 'white' }}>
            <ReactTable
              defaultSorted={[
                {
                  id: 'timestamp',
                  desc: false,
                },
              ]}
              className='transactionTable'
              data={this.state.data5}
              columns={processingTableHeaders}
              defaultPageSize={10}
              previousText={t('homeLoggedIn.table.previous')}
              style={{ fontSize: 12 }}
              nextText={t('homeLoggedIn.table.next')}
              loadingText={t('homeLoggedIn.table.loading')}
              noDataText={t('homeLoggedIn.table.noData')}
              pageText={t('homeLoggedIn.table.page')}
              ofText={t('homeLoggedIn.table.of')}
              rowsText={t('homeLoggedIn.table.rows')}
              pageJumpText={t('homeLoggedIn.table.pageJump')}
              rowsSelectorText={t('homeLoggedIn.table.rowsSelector')}
              minRow={10}
              getTrProps={this.getTrProps}
              expanded={this.state.expanded}
              onExpandedChange={(newExpanded, index, event) => {
                this.expandedOperation(newExpanded, index, event);
              }}
              SubComponent={(row) => {
                this.state.expandedRow = row;
                return (
                  <div style={{ padding: '10px', marginLeft: '20px' }}>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column>
                          <div>
                            {this.state.expandedRow.original.receiver ===
                              'true' &&
                              this.state.expandedRow.original.currency !==
                                'BTC' && (
                                <label>
                                  <strong>
                                    {t(
                                      'homeLoggedIn.transactions.detail.labels.emit'
                                    )}
                                  </strong>
                                </label>
                              )}

                            {this.state.expandedRow.original.sended ===
                              'true' &&
                              this.state.expandedRow.original.currency !==
                                'BTC' && (
                                <label>
                                  <strong>
                                    {t(
                                      'homeLoggedIn.transactions.detail.labels.sendTo'
                                    )}
                                  </strong>
                                </label>
                              )}

                            {/* this.state.expandedRow.original.receiver !== "true" &&
                              this.state.expandedRow.original.sended !== "true" */}
                            {this.state.expandedRow.original.currency ===
                              'BTC' &&
                              this.state.expandedRow.original.type.includes(
                                'wallet'
                              ) === false && (
                                <label>
                                  <strong>
                                    {t('profile.optionDetail.stepUser.user')}
                                  </strong>
                                </label>
                              )}
                            {this.state.expandedRow.original.currency ===
                              'BTC' &&
                              this.state.expandedRow.original.type.includes(
                                'wallet'
                              ) === true && (
                                <label>
                                  <strong>
                                    {t(
                                      'homeLoggedIn.transactions.detail.labels.walletTarget'
                                    )}
                                  </strong>
                                </label>
                              )}

                            {this.state.expandedRow.original.mcRetailId !==
                              '' && (
                              <label>
                                <strong>
                                  {t(
                                    'homeLoggedIn.transactions.detail.labels.retailId'
                                  )}
                                </strong>
                              </label>
                            )}
                          </div>
                        </Grid.Column>
                      </Grid.Row>

                      <Grid.Row>
                        <Grid.Column>
                          <p style={{ marginTop: '-20px' }}>
                            {this.state.expandedRow.original.user !== '' &&
                            this.state.expandedRow.original.user !==
                              undefined &&
                            this.state.expandedRow.original.user !== null
                              ? this.state.expandedRow.original.user
                              : this.state.expandedRow.original.fulladdress !==
                                  '' &&
                                this.state.expandedRow.original.fulladdress !==
                                  undefined &&
                                this.state.expandedRow.original.fulladdress !==
                                  null
                              ? this.state.expandedRow.original.fulladdress
                              : 'N/A'}
                          </p>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </div>
                );
              }}
            />
          </Tab.Pane>
        ),
      },
    ];

    return (
      <Segment loading={this.state.load} basic>
        <Divider hidden />
        <Grid>
          <Grid.Column largeScreen={2} computer={1} widescreen={2} />

          <Grid.Column largeScreen={12} computer={14} widescreen={12}>
            <Segment inverted textAlign='left' className='titleComponents'>
              <h4 className='headerComponent'>
                {t('homeLoggedIn.tableHeaders.transactions')}
              </h4>
            </Segment>
            <Divider hidden />
            <Tab panes={panes}></Tab>
            <Divider hidden />
          </Grid.Column>

          <Grid.Column largeScreen={2} computer={1} widescreen={2} />
        </Grid>
      </Segment>
    );
  }
}
export default translate(Transactions);
