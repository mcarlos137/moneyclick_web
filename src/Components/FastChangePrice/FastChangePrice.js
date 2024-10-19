import React, { Component } from 'react';
import {
  Segment,
  Button,
  List,
  Grid,
  Image,
  Icon,
  Dimmer,
  Loader,
  Divider,
} from 'semantic-ui-react';
import { isMobile, isTablet } from 'react-device-detect';
import './FastChangePrice.css';
import Sockette from 'sockette';
import currency from '../../common/currencyFlag';
import otc from '../../services/otc';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import NumberFormat from 'react-number-format';
import translate from '../../i18n/translate';
class FastChangePrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translator: props.translate,
      socket: null,
      currentIndex: 0,
      load: true,
      priceCurrency: [],
      listCurrencies: [],
      countryCurrency: window.sessionStorage.getItem('countryCurrency'),
      socketOpen: false,
    };
    this._isMounted = false;
  }
  responsive = {
    0: { items: 1 },
    600: { items: 1 },
    1024: { items: 1 },
  };
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.language !== nextProps.language) {
      this.setState({
        translator: nextProps.translate,
      });
    }
  }
  componentDidMount() {
    this._isMounted = true;
    this.listCurrencies();
    this.initSocket();
  }
  initSocket() {
    let url = 'wss://websocket.moneyclick.com/price';
    if (this._isMounted) {
      this.setState({
        socket: new Sockette(url, {
          onopen: (e) => this.socketReady('USD'),
          onmessage: (e) => this.getPriceFastChange(e.data),
          onclose: (e) => this.setState({ socketOpen: false }),
        }),
      });
    }
  }
  componentWillUnmount() {
    if (this.state.socket !== null) {
      this.state.socket.close();
    }
  }

  async listCurrencies() {
    try {
      const currencies = await otc.getCurrencies();
      let currenciesArray = [];
      let currenciesList = [];
      currenciesArray = currencies.data;

      currenciesArray = currenciesArray.filter((curren) => {
        return curren.active === true;
      });
      for (let value of currenciesArray) {
        if (
          value.shortName !== 'BTC' &&
          value.shortName !== 'ETH' &&
          value.shortName !== 'USDT' &&
          value.shortName !== 'VES'
        ) {
          let objCurrency = {};
          objCurrency.shortName = value.shortName;
          objCurrency.fullName = value.fullName;

          let findCurrency = currency.currenciesFlag[value.shortName];
          if (findCurrency !== undefined) {
            if (value.shortName === 'USD') {
              objCurrency.priority = 0;
            } else {
              objCurrency.priority = findCurrency.priority + 1;
            }

            objCurrency.img = findCurrency.img;
          }
          currenciesList.push(objCurrency);
        }
      }

      let findCurrency = currency.currenciesFlag['BTC'];
      let btcInfo = {
        shortName: findCurrency.value,
        fullName: 'Bitcoin',
        priority: 1,
        img: findCurrency.img,
      };
      currenciesList.push(btcInfo);
      //console.log(currenciesList);
      currenciesList = currenciesList.sort((a, b) => {
        return a.priority - b.priority;
      });
      this.setState({ listCurrencies: currenciesList, load: false });
    } catch (error) {
      console.log(error);
    }
  }
  socketReady(currency) {
    let price = { method: 'getFastChange', params: { currency: currency } };
    if (this.state.socket !== null) {
      try {
        this.state.socket.json(price);
      } catch (e) {
        console.log(e);
      }
    }
  }

  getPriceFastChange(value) {
    this.setState({ priceCurrency: [] });
    let result = JSON.parse(value);
    if (result !== undefined) {
      if (result.params.data !== undefined) {
        let data = result.params.data;
        let currencyRequest = result.params.currency;
        let arrayCurrencies = [];
        Object.entries(data).forEach(([key, value]) => {
          let objPrice = {};
          objPrice.currency = key;
          let findCurrency = currency.currenciesFlag[key];
          if (findCurrency !== undefined) {
            objPrice.img = findCurrency.img;
          }
          Object.entries(value).forEach(([index, item]) => {
            if (index === 'ask') {
              if (item.toString().includes('e')) {
                objPrice.buy = item.toFixed(currencyRequest === 'BTC' ? 8 : 12);
              } else {
                objPrice.buy = item;
              }
            }
            if (index === 'bid') {
              if (item.toString().includes('e')) {
                objPrice.sell = item.toFixed(
                  currencyRequest === 'BTC' ? 8 : 12
                );
              } else {
                objPrice.sell = item;
              }
            }
            if (index === '24h%') {
              objPrice.variation = item;
            }
          });
          arrayCurrencies.push(objPrice);
        });
        //console.log(arrayCurrencies);
        this.setState({ priceCurrency: arrayCurrencies });
      }
      //
    }
  }
  slideTo(i) {
    if (this._isMounted) {
      this.setState({ currentIndex: i });
    }
  }
  onSlideChange(e) {}
  onSlideChanged(e) {
    if (this._isMounted) {
      this.setState({ currentIndex: e.item });
    }
  }

  slideNext() {
    if (this._isMounted) {
      let index = this.state.currentIndex + 1;
      if (index < this.state.listCurrencies.length) {
        let currency =
          this.state.listCurrencies[this.state.currentIndex + 1].shortName;
        this.socketReady(currency);
        this.setState({ currentIndex: this.state.currentIndex + 1 });
      }
    }
  }

  slidePrev() {
    if (this._isMounted) {
      let index = this.state.currentIndex - 1;
      if (index < this.state.listCurrencies.length && index !== -1) {
        let currency =
          this.state.listCurrencies[this.state.currentIndex - 1].shortName;
        this.socketReady(currency);
        this.setState({ currentIndex: this.state.currentIndex - 1 });
      }
    }
  }
  render() {
    let view, viewMobile;
    let t = this.state.translator;
    let currentIndex, carouselCurrency;
    currentIndex = this.state.currentIndex;
    let currentIndexCarousel = this.state.currentIndex + 1;
    let currentIndexCarouselLeft = this.state.currentIndex - 1;
    let listItem = this.state.listCurrencies.map((item, i) => (
      <Segment key={`key-${i}`} basic>
        <div className='div-carousel-currency'>
          <Image
            circular
            className='img-principal'
            src={currency.currenciesFlag[item.shortName].img}
          />
          <h3 style={{ paddingLeft: 15, paddingBottom: 15 }}>
            {' '}
            {item.fullName}
          </h3>
        </div>
      </Segment>
    ));
    if (this._isMounted) {
      carouselCurrency = (
        <AliceCarousel
          id='alice-custom'
          items={listItem}
          autoPlay={false}
          startIndex={currentIndex}
          fadeOutAnimation={true}
          mouseDragEnabled={false}
          playButtonEnabled={false}
          autoPlayInterval={4000}
          buttonsDisabled={true}
          keysControlDisabled={true}
          dotsDisabled={true}
          responsive={this.responsive}
          disableAutoPlayOnAction={true}
          onSlideChange={this.onSlideChange}
          onSlideChanged={this.onSlideChanged}
          itemsInSlide={1}
        />
      );
    }
    if (this._isMounted === true) {
      view = (
        <Segment
          style={{
            backgroundColor: '#f4f4f4',
            width: window.innerWidth > 915 || isMobile ? '100%' : '50%',
            display: 'inline-block',
            top: isMobile || window.innerWidth < 915 ? -5 : 30,
          }}
          inverted
        >
          {this.state.load && (
            <Dimmer active inverted>
              <Loader size='small' inverted />
            </Dimmer>
          )}
          <Grid>
            <Grid.Row>
              <Grid.Column
                largeScreen={2}
                computer={2}
                widescreen={2}
                tablet={2}
                verticalAlign='middle'
              >
                {currentIndexCarouselLeft >= 0 &&
                  currentIndexCarouselLeft <
                    this.state.listCurrencies.length && (
                    <Button
                      name='left'
                      circular
                      onClick={this.slidePrev.bind(this)}
                      id='button-carousel-price'
                      className='button-carousel-price'
                    >
                      <Icon size='large' color='black' name='chevron left' />
                    </Button>
                  )}
              </Grid.Column>
              <Grid.Column
                largeScreen={12}
                computer={12}
                widescreen={12}
                tablet={12}
              >
                {carouselCurrency}
              </Grid.Column>
              <Grid.Column
                largeScreen={2}
                computer={2}
                widescreen={2}
                tablet={2}
                verticalAlign='middle'
              >
                {currentIndexCarousel < this.state.listCurrencies.length && (
                  <Button
                    name='right'
                    circular
                    style={{
                      marginLeft: -25,
                    }}
                    id='button-carousel-price'
                    className='button-carousel-price'
                    onClick={this.slideNext.bind(this)}
                  >
                    <Icon
                      name='chevron right'
                      size='large'
                      color='black'
                      style={{
                        marginLeft: -25,
                      }}
                    />
                  </Button>
                )}
              </Grid.Column>
            </Grid.Row>
            {!this.state.priceCurrency.length > 0 && (
              <Dimmer active inverted>
                <Loader size='small' inverted />
              </Dimmer>
            )}
            <Grid.Row
              style={{
                backgroundColor: '#055990',
                paddingBottom: 10,
                marginLeft: 20,
                marginRight: 20,
              }}
            >
              <Grid.Column width={4}>
                <div className={'line-vertical-public'}>
                  <p
                    className={
                      isMobile
                        ? 'subtitle-price-currency-mobile'
                        : 'subtitle-price-currency'
                    }
                  >
                    {t('homeNew.fastChange.currency')}
                  </p>
                </div>
              </Grid.Column>
              <Grid.Column width={4}>
                <div className={'line-vertical-public'}>
                  <p
                    className={
                      isMobile
                        ? 'subtitle-price-currency-mobile'
                        : 'subtitle-price-currency'
                    }
                  >
                    {t('homeNew.fastChange.buy')}
                  </p>
                </div>
              </Grid.Column>
              <Grid.Column width={4}>
                <div className={'line-vertical-public'}>
                  <p
                    className={
                      isMobile
                        ? 'subtitle-price-currency-mobile'
                        : 'subtitle-price-currency'
                    }
                  >
                    {t('homeNew.fastChange.sell')}
                  </p>
                </div>
              </Grid.Column>
              <Grid.Column width={4}>
                <p
                  className={
                    isMobile
                      ? 'subtitle-price-variation-mobile '
                      : 'subtitle-price-variation'
                  }
                >
                  {t('homeNew.fastChange.variation')}
                </p>
              </Grid.Column>
            </Grid.Row>

            <List className={isMobile ? 'liststyle-mobile' : 'liststyle'}>
              {this.state.priceCurrency.map((item, index) => {
                return (
                  <List.Item className={'list-item-style'} key={`key-${index}`}>
                    <Segment
                      inverted
                      className={
                        isMobile
                          ? index % 2 === 0
                            ? 'segment-price-mobile'
                            : 'segment-price-mobile-impar'
                          : index % 2 === 0
                          ? 'segment-price'
                          : 'segment-price-impar'
                      }
                      // loading={this.state.load}
                    >
                      <Grid>
                        <Grid.Row
                          columns={4}
                          style={
                            index % 2 !== 0
                              ? { paddingTop: '8px', paddingBottom: '5px' }
                              : { paddingTop: '16px', paddingBottom: '16px' }
                          }
                        >
                          <Grid.Column width={isMobile ? 3 : 4}>
                            <div style={{ display: 'flex' }}>
                              <Image
                                circular
                                style={{ width: 20 }}
                                src={item.img}
                              />
                              {!isMobile && (
                                <div className='name-currency'>
                                  <p style={{ color: '#055990' }}>
                                    {item.currency}
                                  </p>
                                </div>
                              )}
                            </div>
                          </Grid.Column>
                          <Grid.Column width={isMobile ? 5 : 4}>
                            <div
                              className={
                                isMobile ? 'text-prices-mobile' : 'text-prices'
                              }
                            >
                              <NumberFormat
                                className={
                                  isMobile
                                    ? 'text-prices-mobile'
                                    : 'text-prices'
                                }
                                value={item.buy}
                                decimalScale={
                                  item.buy >= 0.1
                                    ? 2
                                    : item.buy <= 0.0001
                                    ? item.buy <= 0.00000001
                                      ? 12
                                      : 8
                                    : 4
                                }
                                style={{ color: '#055990' }}
                                displayType={'text'}
                                thousandSeparator={true}
                              />
                            </div>
                          </Grid.Column>
                          <Grid.Column width={isMobile ? 5 : 4}>
                            <div
                              className={
                                isMobile ? 'text-prices-mobile' : 'text-prices'
                              }
                            >
                              <NumberFormat
                                value={item.sell}
                                decimalScale={
                                  item.sell >= 0.1
                                    ? 2
                                    : item.buy <= 0.0001
                                    ? item.buy <= 0.00000001
                                      ? 12
                                      : 8
                                    : 4
                                }
                                className={
                                  isMobile
                                    ? 'text-prices-mobile'
                                    : 'text-prices'
                                }
                                style={{ color: '#055990' }}
                                displayType={'text'}
                                thousandSeparator={true}
                              />
                            </div>
                          </Grid.Column>
                          <Grid.Column width={isMobile ? 3 : 4}>
                            <div
                              className={
                                isMobile
                                  ? 'text-variation-mobile'
                                  : 'text-variation'
                              }
                            >
                              <NumberFormat
                                suffix={'%'}
                                value={item.variation}
                                decimalScale={2}
                                className={
                                  isMobile
                                    ? 'text-variation-mobile'
                                    : 'text-variation'
                                }
                                style={
                                  item.variation > 0
                                    ? { color: 'green' }
                                    : { color: 'red' }
                                }
                                displayType={'text'}
                                thousandSeparator={true}
                              />
                            </div>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Segment>
                  </List.Item>
                );
              })}
            </List>
          </Grid>
        </Segment>
      );
    }
    return <div>{isMobile ? view : view}</div>;
  }
}
export default translate(FastChangePrice);
