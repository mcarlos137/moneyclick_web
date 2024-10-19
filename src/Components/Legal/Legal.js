import React, { Component } from 'react';
import {
  Header,
  Accordion,
  Grid,
  Container,
  Segment,
  Divider,
  Icon,
  Responsive,
  Image,
} from 'semantic-ui-react';
import icnLegal from '../../img/icn-legal.png';
import logoAmazon from '../../img/logo-amazon.jpg';
import logoftp from '../../img/logo_fatf.png';
import translate from '../../i18n/translate';
import './Legal.css';
import { isMobile } from 'react-device-detect';
import { parse } from 'query-string';

class Legal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translator: props.translate,
      activeIndex: 0,
    };
  }
  componentDidMount() {
    const query = parse(window.location.search);
    if (query.l !== undefined) {
      let lang = { value: query.l };
      this.props.handleClick(null, lang);
    }
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.language !== nextProps.language) {
      this.setState({
        translator: nextProps.translate,
      });
    }
  }
  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    let t = this.state.translator;
    return (
      <div>
        {!isMobile && <Divider hidden />}
        <Grid>
          <Grid.Column largeScreen={2} computer={2} widescreen={2} />
          <Grid.Column largeScreen={12} computer={12} widescreen={12}>
            <Divider hidden></Divider>

            {!isMobile && (
              <Header as='h4' textAlign='left' className='titleComponents'>
                <Image circular src={icnLegal} style={{ margin: 5 }} />
                {t('legal.title')}
              </Header>
            )}

            <Divider hidden></Divider>
            <h3 className='title-items'>{t('legal.txt1')}</h3>
            <div className='content-items'>{t('legal.txt2')}</div>
            <div className='content-items'>{t('legal.txt3')}</div>
            <div className='content-items'>{t('legal.txt4')}</div>
            <div className='content-items'>{t('legal.txt5')}</div>
            <div className='content-items'>{t('legal.txt6')}</div>
            <h4 className='title-items'>{t('legal.txt7')}</h4>
            <ul>
              <li>{t('legal.txt8')}</li>
              <li>{t('legal.txt9')}</li>
              <li>{t('legal.txt10')}</li>
              <li>{t('legal.txt11')}</li>
            </ul>
            <div className='content-items'>{t('legal.txt12')}</div>

            <div className='content-items'>{t('legal.txt13')}</div>

            <div className='content-items'>{t('legal.txt14')}</div>

            <div className='content-items'>{t('legal.txt15')}</div>

            <div className='content-items'>{t('legal.txt17')}</div>

            <h4 className='title-items'>{t('legal.txt18')}</h4>
            <h5 className='title-items'>{t('legal.txt19')}</h5>
            <h5 className='title-items'>{t('legal.txt20')}</h5>
            <ul>
              <li>
                {t('legal.txt21')}
                <ol>{t('legal.txt22')}</ol>
              </li>
              <li>
                {t('legal.txt23')}
                <ol>{t('legal.txt24')}</ol>
                <ol>{t('legal.txt25')}</ol>
                <ol>{t('legal.txt26')}</ol>
              </li>
            </ul>
            <h5 className='title-items'>{t('legal.txt27')}</h5>
            <h5 className='title-items'>{t('legal.txt28')}</h5>
            <h5 className='title-items'>{t('legal.txt29')}</h5>
            <ul>
              <li>
                {t('legal.txt30')}
                <ol>{t('legal.txt31')}</ol>
              </li>
            </ul>
            <ul>
              <li>
                {t('legal.txt32')}
                <ol>{t('legal.txt33')}</ol>
              </li>
            </ul>
            <ul>
              <li>
                {t('legal.txt34')}
                <ol>{t('legal.txt35')}</ol>
                <ol>{t('legal.txt36')}</ol>
                <ol>{t('legal.txt37')}</ol>
              </li>
            </ul>
            <h5 className='title-items'>{t('legal.txt38')}</h5>
            <ul>
              <li>{t('legal.txt39')}</li>
              <li>{t('legal.txt41')}</li>
              <li>
                {t('legal.txt42')}
                <ol>{t('legal.txt43')}</ol>
                <ol>{t('legal.txt44')}</ol>
                <ol>{t('legal.txt45')}</ol>
                <ol>{t('legal.txt46')}</ol>
                <ol>{t('legal.txt47')}</ol>
                <ol>{t('legal.txt48')}</ol>
              </li>
              <li>{t('legal.txt49')}</li>
            </ul>
            <h5 className='title-items'>{t('legal.txt50')}</h5>
            <div className='content-items'>{t('legal.txt51')}</div>
            <h5 className='title-items'>{t('legal.txt52')}</h5>
            <ul>
              <li>
                {t('legal.txt53')}
                <ol>{t('legal.txt54')}</ol>
              </li>
              <li>
                {t('legal.txt55')}
                <ol>{t('legal.txt56')}</ol>
              </li>
            </ul>
          </Grid.Column>
          <Grid.Column largeScreen={2} computer={2} widescreen={2} />
        </Grid>
        <Grid>
          <Grid.Row>
            <Grid.Column largeScreen={2} computer={2} widescreen={2} />
            <Grid.Column largeScreen={4} computer={4} widescreen={4}>
              <h4 className='title-items'>{t('legal.txt57')}</h4>
            </Grid.Column>
            <Grid.Column largeScreen={4} computer={4} widescreen={4}>
              <h4 className='title-items'>{t('legal.txt60')}</h4>
            </Grid.Column>
            <Grid.Column largeScreen={4} computer={4} widescreen={4}>
              <h4 className='title-items'>{t('legal.txt63')}</h4>
            </Grid.Column>
            <Grid.Column largeScreen={2} computer={2} widescreen={2} />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column largeScreen={2} computer={2} widescreen={2} />
            <Grid.Column largeScreen={12} computer={12} widescreen={12}>
              <Divider style={{ marginTop: -10, borderColor: '#055990' }} />
            </Grid.Column>
            <Grid.Column largeScreen={2} computer={2} widescreen={2} />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column largeScreen={2} computer={2} widescreen={2} />
            <Grid.Column largeScreen={4} computer={4} widescreen={4}>
              <div className='content-items-aux '>{t('legal.txt58')}</div>
            </Grid.Column>
            <Grid.Column largeScreen={4} computer={4} widescreen={4}>
              <div className='content-items-aux '>{t('legal.txt61')}</div>
            </Grid.Column>
            <Grid.Column largeScreen={4} computer={4} widescreen={4}>
              <div className='content-items-bottom'>{t('legal.txt64')}</div>
              <div className='content-items-bottom'>{t('legal.txt65')}</div>
              <div className='content-items-bottom'>{t('legal.txt66')}</div>
              <div className='content-items-bottom'>{t('legal.txt67')}</div>
            </Grid.Column>
            <Grid.Column largeScreen={2} computer={2} widescreen={2} />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column largeScreen={2} computer={2} widescreen={2} />
            <Grid.Column largeScreen={12} computer={12} widescreen={12}>
              <Divider
                style={{ marginTop: -5, borderColor: '#055990' }}
              ></Divider>
            </Grid.Column>
            <Grid.Column largeScreen={2} computer={2} widescreen={2} />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column largeScreen={2} computer={2} widescreen={2} />
            <Grid.Column largeScreen={4} computer={4} widescreen={4}>
              <div className='content-items-aux '>{t('legal.txt59')}</div>
            </Grid.Column>
            <Grid.Column largeScreen={4} computer={4} widescreen={4}>
              <div className='content-items-aux'>{t('legal.txt62')}</div>
            </Grid.Column>
            <Grid.Column largeScreen={4} computer={4} widescreen={4}>
              <div className='content-items-bottom'>{t('legal.txt68')}</div>
              <div className='content-items-bottom'>{t('legal.txt69')}</div>
              <div className='content-items-bottom'>{t('legal.txt70')}</div>
              <div className='content-items-bottom'>{t('legal.txt71')}</div>
              <div className='content-items-bottom'>{t('legal.txt72')}</div>
            </Grid.Column>
            <Grid.Column largeScreen={2} computer={2} widescreen={2} />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column largeScreen={2} computer={2} widescreen={2} />
            <Grid.Column largeScreen={2} computer={2} widescreen={2}>
              <div style={{ width: '80%' }}>
                <Image src={logoAmazon} size={'medium'} />
              </div>
            </Grid.Column>
            <Grid.Column
              largeScreen={10}
              computer={10}
              widescreen={10}
              style={{ marginLeft: -25 }}
            >
              <h4 className='title-items-footer'>{t('legal.txt73')}</h4>
              <div className='content-items'>{t('legal.txt74')}</div>
            </Grid.Column>
            <Grid.Column largeScreen={2} computer={2} widescreen={2} />
          </Grid.Row>
          <Grid.Row style={{ marginTop: 30 }}>
            <Grid.Column largeScreen={2} computer={2} widescreen={2} />
            <Grid.Column
              largeScreen={2}
              computer={2}
              widescreen={2}
              textAlign={'center'}
            >
              <Image
                src={logoftp}
                size={'small'}
                style={{ display: 'unset', width: 95 }}
              />
            </Grid.Column>
            <Grid.Column
              largeScreen={10}
              computer={10}
              widescreen={10}
              style={{ marginLeft: -25 }}
            >
              <h4 className='title-items-footer'>{t('legal.txt75')}</h4>
              <div className='content-items'>{t('legal.txt76')}</div>
              <div className='content-items'>{t('legal.txt77')}</div>
            </Grid.Column>
            <Grid.Column largeScreen={2} computer={2} widescreen={2} />
          </Grid.Row>
        </Grid>
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
      </div>
    );
  }
}
export default translate(Legal);
