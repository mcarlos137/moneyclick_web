import React, { Component, useState, useEffect } from 'react';

import {
  Menu,
  Segment,
  Container,
  Divider,
  Grid,
  Modal,
  Button,
  Card,
} from 'semantic-ui-react';
import translate from '../../../i18n/translate';
import ReactTable from 'react-table-6';
import giftCardClientServices from '../Services/giftCardClientServices';
import * as jsPDF from 'jspdf';
import QRCode from 'qrcode';
import logo64 from '../../BuySellBTC/logo';
import QRCodeReact from 'qrcode.react';
import NumberFormat from 'react-number-format';
const ListGiftCard = (props) => {
  const [dataList, setdataList] = useState([]);
  const [success, setSuccess] = useState(false);
  const [giftCardResend, setGiftCardResent] = useState({ id: '', source: '' });
  const [emailResent, setEmailResent] = useState('');
  const [viewModal, setViewModal] = useState(false);
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('');
  const [load, setLoad] = useState(false);
  const [viewQrModal, setViewQrModal] = useState(false);
  const [objectQr, setObjectQr] = useState({});
  let t = props.translate;
  async function getListCard() {
    let dataToArray = [];
    setLoad(true);
    try {
      const response = await giftCardClientServices.getGitfCardByUser(
        sessionStorage.getItem('username')
      );
      setLoad(false);

      if (Object.keys(response.data).length > 0) {
        Object.entries(response.data).forEach(([key, value]) => {
          if (key === 'ACTIVATED') {
            let Obj = {
              type: key,
            };
            Object.entries(value).forEach(([inerkey, inervalue]) => {
              const returnedTarget = Object.assign({}, Obj, inervalue);
              dataToArray.push(returnedTarget);
            });
          } else {
            let Obj = {
              type: key,
            };
            Object.entries(value).forEach(([inerkey, inervalue]) => {
              const returnedTarget = Object.assign({}, Obj, inervalue);
              dataToArray.push(returnedTarget);
            });
          }
        });
      }

      dataToArray.sort((a, b) => {
        return (
          new Date(a.activationTimestamp).getTime() -
          new Date(b.activationTimestamp).getTime()
        );
      });
      setdataList(dataToArray);
    } catch (error) {
      setLoad(false);
      console.log(error);
    }
  }
  function formatDate(date) {
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
    return cad;

    // lunes, 26 de diciembre de 2050 9 a. m.
  }

  async function reSend() {
    setLoad(true);
    try {
      const response = await giftCardClientServices.resendGitfCard({
        id: giftCardResend.id,
        source:
          giftCardResend.source === 'BITCOINRECHARGE'
            ? 'BR'
            : giftCardResend.source === 'MONEYCLICK'
            ? 'MC'
            : giftCardResend.source,
      });
      if (response.data === 'OK') {
        setSuccess(true);
        setMessage(t('sendMoneyClick.modal.operationSuccess'));
        setLoad(false);
        setColor('#055990');
      } else if ((response.data = 'GIFT CARD WAS NOT SUBMITTED YET')) {
        setSuccess(true);
        setMessage(t('receiveCard.notYetSend'));
        setLoad(false);
        setColor('red');
      } else {
        setLoad(false);
        setColor('red');
        setSuccess(true);
        setMessage(t('receiveCard.errorRequest'));
      }
    } catch (error) {
      setLoad(false);
      setColor('red');
      setSuccess(true);
      setMessage(t('receiveCard.errorRequest'));
    }
  }
  async function printInvoice({ id, amount, currency, source, email }) {
    var scrQr = '';
    let jsonString = JSON.stringify({
      id: id,
      amount: amount,
      currency: currency,
      source: source === 'MONEYCLICK' ? 'MC' : 'BR',
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
    doc.text(
      amount.toLocaleString('en-US', {
        maximumFractionDigits: 2,
      }),
      75,
      y
    );
    y = y + 7;
    // MONEDA
    doc.setFontType('bold');
    doc.text(t('receiveCard.currency') + ':', 75, y);
    doc.setFontType('normal');
    y = y + 5;
    doc.text(currency, 75, y);
    y = y + 7;
    // EMAIL
    if (email !== '' && email !== undefined) {
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
    doc.text(source === 'BR' ? 'BITCOINRECHARGE' : source, 75, y);
    y = y + 20;
    doc.setTextColor(100);
    doc.text(65, y, 'Website : https://moneyclick.com');
    let name = source === 'BR' ? 'BITCOINRECHARGE' : source;
    doc.save(id.slice(-4) + '_' + name + '.pdf');
  }
  useEffect(() => {
    getListCard();
    return () => {};
  }, []);
  const tableHeaders = [
    {
      Header: t('profile.optionDevices.tableHeader.date'),
      accessor: 'activationTimestamp',
      width: 140,
      Cell: (row) => {
        return formatDate(new Date(row.value));
      },
    },
    {
      Header: t('profile.optionDevices.tableHeader.id'),
      accessor: 'id',
      Cell: (row) => {
        return row.value.slice(-4);
      },
      width: 60,
    },
    {
      Header: t('receiveCard.header'),
      accessor: 'type',
      width: 140,
      Cell: (row) => {
        if (row.value === 'ACTIVATED') {
          return (
            <Card
              onClick={() => {
                setObjectQr({
                  id: row.original.id,
                  currency: row.original.currency,
                  amount: row.original.amount,
                  upfrontCommission: row.original.upfrontCommission,
                  source:
                    row.original.source === 'BITCOINRECHARGE'
                      ? 'BR'
                      : row.original.source === 'MONEYCLICK'
                      ? 'MC'
                      : row.original.source,
                });
                setViewQrModal(true);
              }}
            >
              <Card.Content
                fluid={true}
                textAlign={'center'}
                style={{ backgroundColor: 'transparent' }}
              >
                <QRCodeReact
                  value={JSON.stringify({
                    id: row.original.id,
                    currency: row.original.currency,
                    amount: row.original.amount,
                    upfrontCommission: row.original.upfrontCommission,
                    source:
                      row.original.source === 'BITCOINRECHARGE'
                        ? 'BR'
                        : row.original.source === 'MONEYCLICK'
                        ? 'MC'
                        : row.original.source,
                  })}
                  size={102}
                />
              </Card.Content>
            </Card>
          );
        } else {
          return (
            <Card
              onClick={() => {
                setObjectQr({
                  id: row.original.id,
                  currency: row.original.currency,
                  source:
                    row.original.source === 'BITCOINRECHARGE'
                      ? 'BR'
                      : row.original.source === 'MONEYCLICK'
                      ? 'MC'
                      : row.original.source,
                  amount: row.original.amount,
                  upfrontCommission: row.original.upfrontCommission,
                });

                setViewQrModal(true);
              }}
            >
              <Card.Content
                fluid={true}
                textAlign={'center'}
                style={{ backgroundColor: 'transparent' }}
              >
                <QRCodeReact
                  value={JSON.stringify({
                    id: row.original.id,
                    currency: row.original.currency,
                    source:
                      row.original.source === 'BITCOINRECHARGE'
                        ? 'BR'
                        : row.original.source === 'MONEYCLICK'
                        ? 'MC'
                        : row.original.source,
                    amount: row.original.amount,
                    upfrontCommission: row.original.upfrontCommission,
                  })}
                  size={102}
                />
              </Card.Content>
            </Card>
          );
        }
      },
    },
    {
      Header: t('receiveCard.currency'),
      accessor: 'currency',
      width: 80,
    },
    {
      Header: t('receiveCard.amount'),
      accessor: 'amount',
      width: 120,
      Cell: (row) => {
        return new Intl.NumberFormat().format(row.value);
      },
    },

    {
      Header: t('receiveCard.email'),
      accessor: 'email',
      width: 170,
      Cell: (row) => {
        if (row.original.email !== undefined) {
          return row.value;
        } else {
          return 'N/A';
        }
      },
    },
    {
      Header: t('receiveCard.type'),
      accessor: 'source',
      width: 170,
      Cell: (row) => {
        if (row.value !== undefined && row.value !== null) {
          let valueshow = row.value;
          if (valueshow === 'BR') {
            valueshow = 'BITCOINRECHARGE';
          }
          if (valueshow === 'MC') {
            valueshow = 'MONEYCLICK';
          }
          const str2 =
            valueshow.charAt(0).toUpperCase() +
            valueshow.slice(1).toLowerCase();
          return str2;
        } else {
          return 'N/A';
        }
      },
    },
    {
      Header: t('profile.optionDevices.tableHeader.actions'),
      Cell: (row) => {
        if (row.original.email !== undefined) {
          return (
            <div>
              <Button
                icon={'file pdf outline'}
                circular
                compact
                size='mini'
                id={row.original.id}
                name={row.value}
                title={t('receiveCard.buttonPrint')}
                onClick={() => printInvoice(row.original)}
              />
              <Button
                icon={'send'}
                circular
                compact
                size='mini'
                id={row.original.id}
                name={row.value}
                title={t('receiveCard.buttonReSend')}
                onClick={() => {
                  setGiftCardResent({
                    id: row.original.id,
                    source: row.original.source,
                  });
                  setEmailResent(row.original.email);
                  setViewModal(true);
                }}
              />
            </div>
          );
        } else {
          return 'N/A';
        }
      },
    },
  ];
  return (
    <div>
      <Modal open={viewQrModal}>
        <Modal.Header>{'QR'}</Modal.Header>
        <Modal.Content>
          <Segment>
            <Grid>
              <Grid.Row>
                <Grid.Column textAlign={'center'}>
                  <QRCodeReact value={JSON.stringify(objectQr)} size={226} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Modal.Content>
        <Modal.Actions className='actions-modal'>
          <Button
            secondary
            onClick={() => {
              setViewQrModal(false);
              setObjectQr({});
            }}
          >
            {t('receiveCard.cancel')}
          </Button>
        </Modal.Actions>
      </Modal>
      <ReactTable
        className='transactionTable'
        data={dataList}
        columns={tableHeaders}
        defaultPageSize={5}
        previousText={t('profile.optionDevices.table.previous')}
        nextText={t('profile.optionDevices.table.next')}
        loadingText={t('profile.optionDevices.table.loading')}
        noDataText={t('receiveCard.notDataTable')}
        pageText={t('profile.optionDevices.table.page')}
        ofText={t('profile.optionDevices.table.of')}
        rowsText={t('profile.optionDevices.table.rows')}
        pageJumpText={t('profile.optionDevices.table.pageJump')}
        rowsSelectorText={t('profile.optionDevices.table.rowsSelector')}
        minRow={5}
        loading={load}
        defaultSorted={[
          {
            id: 'date',
            desc: true,
          },
        ]}
      />
      <Modal
        open={viewModal}
        onClose={() => {
          setViewModal(false);
          setGiftCardResent({ id: '', source: '' });
          setSuccess(false);
          setMessage('');
          setLoad(false);
          setColor('#055990');
          setEmailResent('');
        }}
      >
        <Modal.Header>{t('sendMoneyClick.modal.dataOperation')}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>
              {t('receiveCard.messageModalResend') +
                ' ' +
                giftCardResend.id.slice(-4) +
                ' ' +
                t('receiveCard.emailDestinatary') +
                ' ' +
                emailResent +
                ' ?'}
            </p>

            {!success && (
              <p>
                <label style={{ color: color }}>{message}</label>
              </p>
            )}
            {success && (
              <p>
                <label style={{ color: color }}>{message}</label>
              </p>
            )}
          </Modal.Description>
        </Modal.Content>
        {!success && (
          <Modal.Actions>
            <Button
              onClick={() => {
                setViewModal(false);
                setSuccess(false);
                setMessage('');
                setLoad(false);
                setColor('#055990');
                setGiftCardResent({ id: '', source: '' });
                setEmailResent('');
              }}
              secondary
              disabled={load}
              loading={load}
            >
              {t('profile.optionDevices.modalRemovePermission.buttonNo')}
            </Button>
            <Button disabled={load} onClick={() => reSend()} loading={load}>
              {t('profile.optionDevices.modalRemovePermission.buttonYes')}
            </Button>
          </Modal.Actions>
        )}
        {success && (
          <Modal.Actions>
            <Button
              onClick={() => {
                setEmailResent('');
                setViewModal(false);
                setSuccess(false);
                setMessage('');
                setLoad(false);
                setColor('#055990');
                setGiftCardResent({ id: '', source: '' });
              }}
              disabled={load}
              loading={load}
            >
              {t('receiveCard.modal.close')}
            </Button>
          </Modal.Actions>
        )}
      </Modal>
    </div>
  );
};

export default translate(ListGiftCard);
