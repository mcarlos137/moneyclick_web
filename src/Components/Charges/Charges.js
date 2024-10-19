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

class Charges extends Component {
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
      const response = await otcService._getAllChargues();

      let array = [];
      Object.entries(response.data).forEach(([key, value]) => {
        let obj = {
          title: key,
          content: [],
        };
        Object.entries(value).forEach(([inerKey, inerValue]) => {
          if (inerKey.includes('MC')) {
            obj.content.push({
              name: inerKey,
              value:
                inerValue.type === 'PERCENT'
                  ? inerValue.amount.toString() + '%'
                  : inerValue.amount.toString() + ' ' + key,
            });
          } else if (
            inerKey === 'SEND_TO_PAYMENT__COMMISSION' ||
            inerKey === 'SEND_TO_PAYMENT__ACH_THIRD_ACCOUNT__COMMISSION'
          ) {
            obj.content.push({
              name: inerKey,
              value:
                inerValue.type === 'PERCENT'
                  ? inerValue.amount.toString() + '%'
                  : inerValue.amount.toString() + ' ' + key,
            });
          } else if (
            inerKey === 'SEND_IN__COMMISSION' ||
            inerKey === 'SEND_OUT__COMMISSION'
          ) {
            obj.content.push({
              name: inerKey,
              value:
                inerValue.type === 'PERCENT'
                  ? inerValue.amount.toString() + '%'
                  : inerValue.amount.toString() + ' ' + key,
            });
          }
        });
        if (obj.content.length > 0) {
          array.push(obj);
        }
      });
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
                                            centered
                                            style={{
                                              marginLeft: '20px',
                                              marginBottom: '-25px',
                                            }}
                                          >
                                            <Grid.Column
                                              computer={14}
                                              largeScreen={14}
                                              mobile={14}
                                            >
                                              {t(
                                                'common.charges.' + value.name
                                              )}
                                            </Grid.Column>
                                            <Grid.Column
                                              computer={2}
                                              largeScreen={2}
                                              mobile={2}
                                            >
                                              {value.value}
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
export default translate(Charges);
