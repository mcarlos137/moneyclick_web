import { values } from 'office-ui-fabric-react';
import React, { Component } from 'react';
import {
  Header,
  Loader,
  Accordion,
  Grid,
  Container,
  Segment,
  Label,
  Divider,
  Icon,
} from 'semantic-ui-react';
import translate from '../../i18n/translate';
import otcService from '../../services/otc';
import currenciesFlag from '../../common/currencyFlag';
class NewCharges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translator: props.translate,
      chargues: [],
      loader: true,
    };
  }
  componentDidMount() {
    this.setState({ load: true }, () => this.getChargues());
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.language !== nextProps.language) {
      this.setState({
        translator: nextProps.translate,
      });
    }
  }
  async getChargues() {
    try {
      const response = await otcService._getAllCharguesNew();
      console.log("_getAllCharguesNew",response)
      let array = [];
      Object.entries(response.data).forEach(([key, value]) => {
        let name = currenciesFlag.currenciesFlag[key].text;
        let obj = {
          title: name,
          content: [],
        };
        Object.entries(value).forEach(([inerKey, inerValue]) => {
          if (
            inerKey.includes('MC') &&
            inerKey !== 'MC_BUY_BALANCE__UPHOLD__COMMISSION' &&
            inerKey !== 'MC_BUY_BALANCE__NETELLER__COMMISSION' &&
            inerKey !== 'MC_BUY_BALANCE__SKRILL__COMMISSION' &&
            inerKey !== 'MC_BUY_BALANCE__PAYEER__COMMISSION' &&
            inerKey !== 'MC_BUY_BALANCE__PAYONEER__COMMISSION'
          ) {
            let ob = {
              name: inerKey,
              values: [],
            };
            Object.entries(inerValue).forEach(([inKey, inValue]) => {
              ob.values.push({
                value:
                  inValue.type === 'PERCENT'
                    ? inValue.amount.toString() + '%'
                    : inValue.type === 'ABSOLUTE'
                    ? inValue.amount.toString() + ' ' + key
                    : inValue.absolute.toString() +
                      ' ' +
                      key +
                      ' + ' +
                      inValue.percent.toString() +
                      '%',
                range: inValue.range !== undefined ? inValue.range : '',
              });
            });
            obj.content.push(ob);
          } else if (
            inerKey === 'SEND_TO_PAYMENT__COMMISSION' ||
            inerKey === 'SEND_TO_PAYMENT__GENERIC_THIRD_ACCOUNT__COMMISSION' ||
            inerKey === 'SEND_TO_PAYMENT__PAYPAL__COMMISSION' ||
            inerKey === 'SEND_TO_PAYMENT__ACH__COMMISSION' ||
            inerKey === 'SEND_TO_PAYMENT__ACH_EXPRESS__COMMISSION' ||
            inerKey === 'SEND_TO_PAYMENT__ACH_THIRD_ACCOUNT__COMMISSION' ||
            inerKey ===
              'SEND_TO_PAYMENT__ACH_THIRD_ACCOUNT_EXPRESS__COMMISSION' ||
            inerKey === 'SEND_OUT__ETHEREUM__COMMISSION' ||
            inerKey === 'SEND_OUT__TRON__COMMISSION'
          ) {
            let ob = {
              name: inerKey,
              values: [],
            };
            Object.entries(inerValue).forEach(([inKey, inValue]) => {
              ob.values.push({
                value:
                  inValue.type === 'PERCENT'
                    ? inValue.amount.toString() + '%'
                    : inValue.type === 'ABSOLUTE'
                    ? inValue.amount.toString() + ' ' + key
                    : inValue.absolute.toString() +
                      ' ' +
                      key +
                      ' + ' +
                      inValue.percent.toString() +
                      '%',
                range: inValue.range !== undefined ? inValue.range : '',
              });
            });
            obj.content.push(ob);
          } else if (
            inerKey === 'GIFT_CARD_REDEEM_BR__COMMISSION' ||
            inerKey === 'GIFT_CARD_REDEEM__COMMISSION'
          ) {
            let ob = {
              name: inerKey,
              values: [],
            };
            Object.entries(inerValue).forEach(([inKey, inValue]) => {
              if (!inKey.includes('DEFAULT')) {
                ob.values.push({
                  value:
                    inValue.type === 'PERCENT'
                      ? inValue.amount.toString() + '%'
                      : inValue.type === 'ABSOLUTE'
                      ? inValue.amount.toString() + ' ' + key
                      : inValue.absolute.toString() +
                        ' ' +
                        key +
                        ' + ' +
                        inValue.percent.toString() +
                        '%',
                  range: inValue.range !== undefined ? inValue.range : '',
                  toChange: inKey,
                });
              } else {
                ob.values.push({
                  value:
                    inValue.type === 'PERCENT'
                      ? inValue.amount.toString() + '%'
                      : inValue.type === 'ABSOLUTE'
                      ? inValue.amount.toString() + ' ' + key
                      : inValue.absolute.toString() +
                        ' ' +
                        key +
                        ' + ' +
                        inValue.percent.toString() +
                        '%',
                  range: inValue.range !== undefined ? inValue.range : '',
                });
              }
            });
            obj.content.push(ob);
          } else if (inerKey === 'MONEY_ORDER_SEND__COMMISSION') {
            let ob = {
              name: inerKey,
              values: [],
            };
            Object.entries(inerValue).forEach(([inKey, inValue]) => {
              if (!inKey.includes('DEFAULT')) {
                ob.values.push({
                  value:
                    inValue.type === 'PERCENT'
                      ? inValue.amount.toString() + '%'
                      : inValue.type === 'ABSOLUTE'
                      ? inValue.amount.toString() + ' ' + key
                      : inValue.absolute.toString() +
                        ' ' +
                        key +
                        ' + ' +
                        inValue.percent.toString() +
                        '%',
                  range: inValue.range !== undefined ? inValue.range : '',
                  toChange: inKey,
                });
              } else {
                ob.values.push({
                  value:
                    inValue.type === 'PERCENT'
                      ? inValue.amount.toString() + '%'
                      : inValue.type === 'ABSOLUTE'
                      ? inValue.amount.toString() + ' ' + key
                      : inValue.absolute.toString() +
                        ' ' +
                        key +
                        ' + ' +
                        inValue.percent.toString() +
                        '%',
                  range: inValue.range !== undefined ? inValue.range : '',
                });
              }
            });
            obj.content.push(ob);
          }
        });
        if (obj.content.length > 0) {
          array.push(obj);
        }
      });
      console.log(array);
      this.setState({ chargues: array }, () => {
        this.setState({ loader: false });
      });
    } catch (error) {
      this.setState({ loader: false });
    }
  }

  render() {
    let t = this.state.translator;

    return (
      <div>
        <Divider hidden />
        <Grid>
          <Grid.Column largeScreen={2} computer={1} widescreen={2} />
          <Grid.Column largeScreen={12} computer={14} widescreen={12}>
            <Segment loading={this.state.loader} basic={true}>
              {window.sessionStorage.getItem('auth') === 'true' && (
                <Segment inverted textAlign='left' className='titleComponents'>
                  <h4 className='headerComponent'>
                    {t('common.charges.title')}
                  </h4>
                </Segment>
              )}
              {window.sessionStorage.getItem('auth') !== 'true' && (
                <div>
                  <Divider hidden />
                  <Header
                    size='large'
                    content={t('common.charges.title')}
                    textAlign='left'
                  />
                </div>
              )}
              <Divider hidden></Divider>
              <Container>
                <Grid columns={1}>
                  <Grid.Column
                    largeScreen={16}
                    mobile={16}
                    tablet={16}
                    computer={16}
                  >
                    <Container>
                      <Container>
                        {this.state.chargues.length !== 0 &&
                          this.state.chargues.map((item, index) => (
                            <Accordion
                              fluid
                              styled
                              key={index}
                              defaultActiveIndex={0}
                              panels={[
                                {
                                  key: item.title,
                                  //title: item.title,
                                  title: {
                                    content: (
                                      <span
                                        style={{
                                          fontSize: 15,
                                          color: '#055990',
                                        }}
                                      >
                                        {item.title}
                                      </span>
                                    ),
                                    icon: (
                                      <Icon
                                        name='dropdown'
                                        style={{
                                          fontSize: 15,
                                          color: '#055990',
                                        }}
                                      ></Icon>
                                    ),
                                  },
                                  content: {
                                    content: (
                                      <Grid>
                                        {item.content.map((value, index) => (
                                          <Grid.Row
                                            style={{
                                              marginLeft: '20px',
                                              marginBottom: '-25px',
                                            }}
                                          >
                                            <Grid.Column
                                              computer={12}
                                              largeScreen={12}
                                              mobile={12}
                                            >
                                              {t(
                                                'common.charges.' + value.name, {_:value.name}
                                              )}
                                            </Grid.Column>
                                            <Grid.Column
                                              computer={4}
                                              largeScreen={4}
                                              mobile={4}
                                            >
                                              {value.values.map(
                                                (inValue, ind) => {
                                                  if (inValue.range !== '') {
                                                    let text = '>' + ' ';
                                                    for (let element of inValue.range) {
                                                      if (
                                                        inValue.range[0] ===
                                                        element
                                                      ) {
                                                        text =
                                                          text +
                                                          Number(
                                                            element
                                                          ).toLocaleString(
                                                            'en-US',
                                                            {
                                                              maximumFractionDigits:
                                                                item.title !==
                                                                'BTC'
                                                                  ? 2
                                                                  : 8,
                                                            }
                                                          );
                                                      } else {
                                                        text =
                                                          text +
                                                          ' - ' +
                                                          Number(
                                                            element
                                                          ).toLocaleString(
                                                            'en-US',
                                                            {
                                                              maximumFractionDigits:
                                                                item.title !==
                                                                'BTC'
                                                                  ? 2
                                                                  : 8,
                                                            }
                                                          );
                                                      }
                                                    }
                                                    text =
                                                      text +
                                                      ' ' +
                                                      item.title +
                                                      '   ' +
                                                      inValue.value;
                                                    return (
                                                      <Grid.Row>
                                                        <div>{text}</div>
                                                      </Grid.Row>
                                                    );
                                                  } else if (
                                                    inValue.toChange !==
                                                    undefined
                                                  ) {
                                                    return (
                                                      <Grid.Row>
                                                        <div>
                                                          {' ' +
                                                            inValue.toChange +
                                                            ' ' +
                                                            inValue.value}
                                                        </div>
                                                      </Grid.Row>
                                                    );
                                                  } else {
                                                    return (
                                                      <Grid.Row>
                                                        <div>
                                                          {inValue.value}
                                                        </div>
                                                      </Grid.Row>
                                                    );
                                                  }
                                                }
                                              )}
                                            </Grid.Column>

                                            <Grid.Column
                                              computer={16}
                                              largeScreen={16}
                                              mobile={16}
                                            >
                                              <Divider></Divider>
                                            </Grid.Column>
                                          </Grid.Row>
                                        ))}
                                      </Grid>
                                    ),
                                  },
                                },
                              ]}
                              fluid
                            ></Accordion>
                          ))}
                      </Container>
                    </Container>
                  </Grid.Column>
                </Grid>
              </Container>
            </Segment>
          </Grid.Column>
          <Grid.Column largeScreen={2} computer={1} widescreen={2} />
        </Grid>
      </div>
    );
  }
}
export default translate(NewCharges);
