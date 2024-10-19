import Btc from '../img/icn-btc.png';
import TetherImg from '../img/icn_tether.png';
import Eth from '../img/eth.jpg';
export default [
  {
    key: 'BTC',
    value: 'BTC',
    text: 'Bitcoin',
    img: Btc,
    alias: 'BTC',
    isCripto: true,
    symbol: 'Ƀ',
    priority: 1,
  },
  {
    key: 'USDT',
    value: 'USDT',
    text: 'USDT',
    img: TetherImg,
    alias: 'USDT',
    isCripto: true,
    symbol: '₮',
    priority: 3,
  },
  {
    key: 'ETH',
    value: 'ETH',
    text: 'Ether',
    img: Eth,
    alias: 'ETH',
    isCripto: true,
    symbol: 'Eth',
    priority: 2,
  },
];
