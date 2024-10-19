import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QRCode from 'qrcode.react';
import {
  Segment,
  Grid,
  Button,
  Divider,
  Icon,
  Message,
  Dimmer,
  Loader,
  Form,
  Accordion,
  List,
  Modal,
  Select,
} from 'semantic-ui-react';
import ReactTable from 'react-table';
import userService from '../../../services/user';
import translate from '../../../i18n/translate';
import cryptoCurrencies from '../../../common/cryptoCurrencies';
class WalletAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAddressBTC: userService.getAddress(),
      userAddressEtherUsdt: userService.getAddressEtherUsdt(),
      copiedAddress: false,
      status: false,
      show: false,
      errorInRed: false,
      translator: props.translate,
      activeIndexAccordion: 0,
      oldAddressBTC: [],
      oldAddressEtherUsdt: [],
      oldAddressTronUsdt: [],
      openNewAddressModal: false,
      loadNewAddress: false,
      errorNewAddress: false,
      successNewAddress: false,
      cryptoToReceive: 'BTC',
      redReceive: '',
      userAddressTron: '',
    };
    this.closeNewAddressModal = this.closeNewAddressModal.bind(this);
    this.generateNewAddress = this.generateNewAddress.bind(this);
    this.openNewAddressModal = this.openNewAddressModal.bind(this);
    this.loadUserAddressesBTC_ETHER_USDT =
      this.loadUserAddressesBTC_ETHER_USDT.bind(this);
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.language !== nextProps.language) {
      this.setState({
        translator: nextProps.translate,
      });
    }
  }

  cleanText() {
    const includeSlash = cryptoCurrencies[0].text.includes('/');
    if (includeSlash) {
      cryptoCurrencies.map((crypto) => {
        crypto.text = crypto.text.split('/')[0];
        return crypto;
      });
    }

    this.setState({
      cryptoList: cryptoCurrencies,
    });
  }
  componentDidMount() {
    this.cleanText();
    this.loadUserAddressesBTC_ETHER_USDT();
    let username = userService.getUserName();
    let config = userService.getConfigUserGeneral(username);
    config
      .then((resp) => {
        this.setState({ show: true });
        if (resp.data.result.verification === undefined) {
          this.setState({
            status: false,
          });
        } else {
          if (resp.data.result.verification.B !== undefined) {
            this.setState({
              status: true,
            });
          } else {
            this.setState({
              status: false,
            });
          }
        }
      })
      .catch((error) => {
        //console.log(error);
        this.setState({ show: true, errorInRed: true });
      });
  }

  loadUserAddressesBTC_ETHER_USDT() {
    let username = userService.getUserName();
    let config = userService.getConfigUserGeneral(username);
    let oldAddressBTC = [],
      oldAddressEtherUsdt = [],
      oldAddressTronUsdt = [];
    config.then((resp) => {
      if (resp.data.result.mcWallets !== undefined) {
        let old = resp.data.result.mcWallets.old;
        let current = {
          address: Object.values(resp.data.result.mcWallets.current).map(
            (w) => {
              return w.address;
            }
          )[0],
          created: this.formatDate(
            new Date(
              Object.keys(resp.data.result.mcWallets.current).map((key) => {
                return key;
              })[0]
            )
          ),
        };
        window.sessionStorage.setItem('address', current.address);
        oldAddressBTC = Object.keys(old).map((key) => {
          return {
            address: old[key].address,
            created: this.formatDate(new Date(key)),
          };
        });
        oldAddressBTC.push(current);
        this.setState({
          hasWalletBTC: true,
        });
      } else {
        this.setState({
          hasWalletBTC: false,
        });
      }

      if (resp.data.result.mcWalletsEthereum !== undefined) {
        let old = resp.data.result.mcWalletsEthereum.old;
        let current = {
          address: Object.values(
            resp.data.result.mcWalletsEthereum.current
          ).map((w) => {
            return w.address;
          })[0],
          created: this.formatDate(
            new Date(
              Object.keys(resp.data.result.mcWalletsEthereum.current).map(
                (key) => {
                  return key;
                }
              )[0]
            )
          ),
        };
        window.sessionStorage.setItem('addressEtherUsdt', current.address);
        oldAddressEtherUsdt = Object.keys(old).map((key) => {
          return {
            address: old[key].address,
            created: this.formatDate(new Date(key)),
          };
        });
        oldAddressEtherUsdt.push(current);
        this.setState({
          hasWalletEtherUsdt: true,
        });
      } else {
        this.setState({
          hasWalletEtherUsdt: false,
        });
      }
      if (resp.data.result.mcWalletsTron !== undefined) {
        let old = resp.data.result.mcWalletsTron.old;
        let current = {
          address: Object.values(resp.data.result.mcWalletsTron.current).map(
            (w) => {
              return w.address;
            }
          )[0],
          created: this.formatDate(
            new Date(
              Object.keys(resp.data.result.mcWalletsTron.current).map((key) => {
                return key;
              })[0]
            )
          ),
        };
        window.sessionStorage.setItem('addressTronUsdt', current.address);
        oldAddressTronUsdt = Object.keys(old).map((key) => {
          return {
            address: old[key].address,
            created: this.formatDate(new Date(key)),
          };
        });
        oldAddressTronUsdt.push(current);
        this.setState({
          hasWalletEtherUsdt: true,
        });
      } else {
        this.setState({
          hasWalletEtherUsdt: false,
        });
      }
      this.setState({
        show: true,
        oldAddressBTC: oldAddressBTC,
        oldAddressEtherUsdt: oldAddressEtherUsdt,
        oldAddressTronUsdt: oldAddressTronUsdt,
        userAddressBTC: userService.getAddress(),
        userAddressEtherUsdt: userService.getAddressEtherUsdt(),
        userAddressTron: userService.getAddressTronUsdt(),
        redReceive: userService.getAddressTronUsdt() ? '' : 'ERC-20',
      });
      if (resp.data.result.verification === undefined) {
        this.setState({
          status: false,
        });
      } else {
        if (resp.data.result.verification.B !== undefined) {
          this.setState({
            status: true,
          });
        } else {
          this.setState({
            status: false,
          });
        }
      }
    });
  }

  generateNewAddress() {
    this.setState({ loadNewAddress: true });
    let body = {
      userName: window.sessionStorage.getItem('username'), //userService.getUserEmail(),
      moneyClick: true,
      blockchain: this.state.cryptoToReceive === 'BTC' ? 'bitcoin' : 'ethereum',
    };
    console.log('generateNewAddress body', body);
    userService
      .addNewWalletToUser(body)
      .then((res) => {
        console.log('generateNewAddress r', res.data);
        setTimeout(() => {
          this.setState({
            loadNewAddress: false,
            errorNewAddress: false,
            successNewAddress: true,
          });
          this.loadUserAddressesBTC_ETHER_USDT();
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        setTimeout(() => {
          this.setState({
            loadNewAddress: false,
            errorNewAddress: true,
            successNewAddress: false,
          });
        }, 3000);
      });
  }
  onClickCopyBtn = () => {
    this.setState({
      copiedAddress: true,
    });
    setTimeout(() => {
      this.setState({
        copiedAddress: false,
      });
    }, 7000);
  };
  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = this.state.activeIndexAccordion === index ? -1 : index;
    this.setState({ activeIndexAccordion: newIndex });
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
    return cad;
  }
  closeNewAddressModal = () => {
    this.setState({
      openNewAddressModal: false,
      loadNewAddress: false,
      errorNewAddress: false,
      successNewAddress: false,
    });
  };
  openNewAddressModal() {
    this.setState({
      openNewAddressModal: true,
    });
  }
  render() {
    let t = this.state.translator;
    let dataBTC = this.state.oldAddressBTC;
    let dataEthUsdt = this.state.oldAddressEtherUsdt;
    let dataTron = this.state.oldAddressTronUsdt;
    let messageCopied, messageResult;
    const tableHeaders = [
      {
        Header: t('receiveBitcoins.tableOldAddresses.headers.created'),
        accessor: 'created',
        width: 140,
      },
      {
        Header: t('receiveBitcoins.tableOldAddresses.headers.address'),
        accessor: 'address',
      },
    ];
    if (this.state.successNewAddress) {
      messageResult = (
        <Message success>
          <Message.Content>
            {t('receiveBitcoins.modalNewAddress.messageResult.success')}
          </Message.Content>
        </Message>
      );
    }
    if (this.state.copiedAddress) {
      messageCopied = (
        <Message info>
          <Message.Content>
            {t('profile.walletAccount.messages.copiedAddress')}
          </Message.Content>
        </Message>
      );
    }
    let qrView;
    qrView = (
      <div>
        <Form.Field inline required>
          <label>{t('profile.walletAccount.cryptoToReceive')}</label>
          <Select
            placeholder={t('profile.walletAccount.cryptoToReceive')}
            fluid
            single
            selection
            options={this.state.cryptoList}
            value={this.state.cryptoToReceive}
            onChange={(e, data) => {
              console.log(data.value);
              this.setState({
                cryptoToReceive: data.value,
                redReceive: data.value !== 'USDT' ? '' : this.state.redReceive,
              });
            }}
          />
        </Form.Field>
        {this.state.cryptoToReceive === 'USDT' && this.state.userAddressTron && (
          <Form.Field inline required>
            <label>{t('sendBitcoins.red')}</label>
            <Select
              placeholder={''}
              fluid
              single
              selection
              options={[
                { text: 'ERC-20', value: 'ERC-20' },
                { text: 'TRON', value: 'TRON' },
              ]}
              value={this.state.redReceive}
              onChange={(e, data) => {
                this.setState({
                  redReceive: data.value,
                });
              }}
            />
          </Form.Field>
        )}
        {this.state.cryptoToReceive !== '' &&
        this.state.cryptoToReceive !== 'USDT' ? (
          <Segment.Group>
            <Segment id='qrSegmentTitle'>
              <p>{t('profile.walletAccount.qrCode')}</p>
            </Segment>
            <Segment color='blue' textAlign='center'>
              <QRCode
                value={
                  this.state.cryptoToReceive === 'BTC'
                    ? this.state.userAddressBTC
                    : this.state.userAddressEtherUsdt
                }
                size={128}
              />
              <Divider hidden />
            </Segment>
          </Segment.Group>
        ) : this.state.cryptoToReceive !== '' &&
          this.state.redReceive !== '' ? (
          <Segment.Group>
            <Segment id='qrSegmentTitle'>
              <p>{t('profile.walletAccount.qrCode')}</p>
            </Segment>
            <Segment color='blue' textAlign='center'>
              <QRCode
                value={
                  this.state.redReceive === 'TRON' && this.state.userAddressTron
                    ? this.state.userAddressTron
                    : this.state.userAddressEtherUsdt
                }
                size={128}
              />
              <Divider hidden />
            </Segment>
          </Segment.Group>
        ) : null}
      </div>
    );
    return (
      <div>
        <Dimmer.Dimmable dimmed={!this.state.show}>
          <Dimmer active={!this.state.show} inverted>
            <Loader>{t('profile.walletAccount.loading')}</Loader>
          </Dimmer>
          {!this.state.show &&
            this.state.status === false &&
            this.state.errorInRed === false && (
              <Segment compact size='mini' basic textAlign='center'>
                <Message
                  info
                  content={
                    <div>
                      {t(
                        'profile.walletAccount.messages.verifyEmailLink.part1'
                      )}
                      <strong> {userService.getPhone()}</strong>
                    </div>
                  }
                />
              </Segment>
            )}
          {this.state.errorInRed && (
            <Message
              info
              content={t('profile.walletAccount.messages.errorInRed')}
            />
          )}
          {this.state.status === true && (
            <Grid>
              <Grid.Column largeScreen={6} mobile={16} tablet={6} computer={6}>
                <Grid.Row>
                  <Grid columns='equal'>
                    <Grid.Column mobile={null} />
                    <Grid.Column largeScreen={10} mobile={16} tablet={10}>
                      {qrView}
                    </Grid.Column>
                    <Grid.Column mobile={null} />
                  </Grid>
                </Grid.Row>
                <Divider hidden />
                <Grid.Row style={{ textAlign: 'center' }}>
                  <Grid.Column largeScreen={10} mobile={16} tablet={10}>
                    <Form>
                      {this.state.cryptoToReceive !== '' &&
                      this.state.cryptoToReceive !== 'USDT' ? (
                        <Form.Field>
                          <div>
                            {t('profile.walletAccount.header') +
                              (this.state.cryptoToReceive === 'BTC'
                                ? t('profile.walletAccount.BITCOIN')
                                : this.state.cryptoToReceive === 'ETH'
                                ? t('profile.walletAccount.Ethereum')
                                : t('profile.walletAccount.USDT') +
                                  ' ' +
                                  this.state.redReceive)}
                          </div>
                          <b id='addressText'>
                            {this.state.cryptoToReceive === 'BTC'
                              ? this.state.userAddressBTC
                              : this.state.userAddressEtherUsdt}{' '}
                          </b>
                          <CopyToClipboard
                            text={
                              this.state.cryptoToReceive === 'BTC'
                                ? this.state.userAddressBTC
                                : this.state.userAddressEtherUsdt
                            }
                          >
                            <Button
                              onClick={this.onClickCopyBtn}
                              data-tip={t('profile.walletAccount.buttonCopy')}
                              icon
                              id='orangeCopyBtn'
                            >
                              <Icon name='copy' />
                            </Button>
                          </CopyToClipboard>
                          {messageCopied}
                        </Form.Field>
                      ) : this.state.cryptoToReceive !== '' &&
                        this.state.redReceive !== '' ? (
                        <Form.Field>
                          <div>
                            {t('profile.walletAccount.header') +
                              (this.state.cryptoToReceive === 'BTC'
                                ? t('profile.walletAccount.BITCOIN')
                                : this.state.cryptoToReceive === 'ETH'
                                ? t('profile.walletAccount.Ethereum')
                                : t('profile.walletAccount.USDT') +
                                  ' ' +
                                  this.state.redReceive)}
                          </div>
                          <b id='addressText'>
                            {this.state.redReceive !== 'TRON'
                              ? this.state.userAddressEtherUsdt
                              : this.state.userAddressTron}{' '}
                          </b>
                          <CopyToClipboard
                            text={
                              this.state.redReceive !== 'TRON'
                                ? this.state.userAddressEtherUsdt
                                : this.state.userAddressTron
                            }
                          >
                            <Button
                              onClick={this.onClickCopyBtn}
                              data-tip={t('profile.walletAccount.buttonCopy')}
                              icon
                              id='orangeCopyBtn'
                            >
                              <Icon name='copy' />
                            </Button>
                          </CopyToClipboard>
                          {messageCopied}
                        </Form.Field>
                      ) : null}
                    </Form>
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>

              <Grid.Column
                largeScreen={10}
                mobile={16}
                tablet={10}
                computer={10}
              >
                <Accordion>
                  <Accordion.Title
                    active={this.state.activeIndexAccordion === 0}
                    index={0}
                    onClick={this.handleClick}
                    style={{
                      color: '#055990',
                    }}
                  >
                    <Icon name='dropdown' />
                    {t('receiveBitcoins.accordion.txTitle')}
                  </Accordion.Title>
                  <Accordion.Content
                    active={this.state.activeIndexAccordion === 0}
                  >
                    <p>
                      {this.state.cryptoToReceive === 'BTC'
                        ? t('receiveBitcoins.accordion.txBodyBTC')
                        : this.state.cryptoToReceive === 'ETH'
                        ? t('receiveBitcoins.accordion.txBodyETH')
                        : t('receiveBitcoins.accordion.txBodyUSDT')}
                    </p>
                  </Accordion.Content>
                  <Accordion.Title
                    active={this.state.activeIndexAccordion === 1}
                    index={1}
                    onClick={this.handleClick}
                    style={{
                      color: '#055990',
                    }}
                  >
                    <Icon name='dropdown' />
                    {this.state.cryptoToReceive === 'BTC'
                      ? t('receiveBitcoins.accordion.commissionsHeaderBTC')
                      : this.state.cryptoToReceive === 'ETH'
                      ? t('receiveBitcoins.accordion.commissionsHeaderETH')
                      : t('receiveBitcoins.accordion.commissionsHeaderUSDT')}
                  </Accordion.Title>
                  <Accordion.Content
                    active={this.state.activeIndexAccordion === 1}
                  >
                    <List as='ol'>
                      <List.Item as='li' value='-'>
                        {t('receiveBitcoins.accordion.commissionsBody1')}
                      </List.Item>
                      <List.Item as='li' value='-'>
                        {t('receiveBitcoins.accordion.commissionsBody2')}
                      </List.Item>
                    </List>
                  </Accordion.Content>
                  {this.state.status && (
                    <div>
                      <Accordion.Title
                        active={this.state.activeIndexAccordion === 2}
                        index={2}
                        onClick={this.handleClick}
                        style={{
                          color: '#055990',
                        }}
                      >
                        <Icon name='dropdown' />
                        {t('receiveBitcoins.accordion.oldAddresses')}
                      </Accordion.Title>
                      <Accordion.Content
                        active={this.state.activeIndexAccordion === 2}
                      >
                        <ReactTable
                          defaultSorted={[
                            {
                              id: 'created',
                              desc: true,
                            },
                          ]}
                          data={
                            this.state.cryptoToReceive === 'BTC'
                              ? dataBTC
                              : this.state.cryptoToReceive === 'USDT'
                              ? this.state.redReceive !== 'TRON'
                                ? dataEthUsdt
                                : dataTron
                              : dataEthUsdt
                          }
                          columns={tableHeaders}
                          defaultPageSize={5}
                          previousText={t(
                            'receiveBitcoins.table.params.previousText'
                          )}
                          nextText={t('receiveBitcoins.table.params.nextText')}
                          loadingText={t(
                            'receiveBitcoins.table.params.loadingText'
                          )}
                          noDataText={t(
                            'receiveBitcoins.table.params.noDataText'
                          )}
                          pageText={t('receiveBitcoins.table.params.pageText')}
                          ofText={t('receiveBitcoins.table.params.ofText')}
                          rowsText={t('receiveBitcoins.table.params.rowsText')}
                          pageJumpText={t(
                            'receiveBitcoins.table.params.pageJumpText'
                          )}
                          rowsSelectorText={t(
                            'receiveBitcoins.table.params.rowsSelectorText'
                          )}
                          minRow={3}
                        />
                      </Accordion.Content>
                    </div>
                  )}
                </Accordion>

                <Divider hidden />
                {this.state.cryptoToReceive !== 'USDT' ? (
                  <div align='right'>
                    <Button
                      color='blue'
                      onClick={this.openNewAddressModal}
                      style={{ marginTop: window.innerWidth <= 364 ? 8 : 0 }}
                    >
                      {t('receiveBitcoins.buttonNewAddress')}
                    </Button>
                  </div>
                ) : this.state.redReceive !== 'TRON' &&
                  this.state.redReceive !== '' ? (
                  <div align='right'>
                    <Button
                      color='blue'
                      onClick={this.openNewAddressModal}
                      style={{ marginTop: window.innerWidth <= 364 ? 8 : 0 }}
                    >
                      {t('receiveBitcoins.buttonNewAddress')}
                    </Button>
                  </div>
                ) : null}
              </Grid.Column>
            </Grid>
          )}
        </Dimmer.Dimmable>
        <Modal
          open={this.state.openNewAddressModal}
          onClose={this.closeNewAddressModal}
          closeOnDimmerClick={false}
          closeOnDocumentClick={false}
        >
          <Modal.Header>
            {t('receiveBitcoins.modalNewAddress.header')}
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              {!this.state.errorNewAddress && !this.state.successNewAddress && (
                <p>{t('receiveBitcoins.modalNewAddress.body')} </p>
              )}
              {(this.state.errorNewAddress || this.state.successNewAddress) &&
                messageResult}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.closeNewAddressModal} color='grey'>
              {t('receiveBitcoins.modalNewAddress.buttonClose')}
            </Button>
            <Button
              onClick={this.generateNewAddress}
              type='submit'
              color='blue'
              loading={this.state.loadNewAddress}
              disabled={
                this.state.errorNewAddress || this.state.successNewAddress
              }
            >
              {t('receiveBitcoins.modalNewAddress.buttonGenerate')}
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
export default translate(WalletAccount);
