import Ar from "../img/ar.svg";
import Br from "../img/br.svg";
import Cl from "../img/cl.svg";
import Co from "../img/co.svg";
import Es from "../img/es.svg";
import Eth from "../img/eth.svg";
import Do from "../img/do.svg";
import Mx from "../img/mx.svg";
import Pe from "../img/pe.svg";
import Us from "../img/us.svg";
import Ve from "../img/ve.svg";
import Crc from "../img/crc.svg";
import Pab from "../img/pan.svg";
import PaUsd from "../img/pan.svg";
import Ca from "../img/ca.svg";
import Cn from "../img/cn.svg";
import Ru from "../img/ru.svg";
import Jp from "../img/jp.svg";
import In from "../img/in.svg";
import Ch from "../img/ch.svg";

export default {
  currencies: [
    {
      key: "br",
      value: "BRL",
      flag: "br",
      text: "Real Brasileño",
      textMob: "Real",
      img: Br,
      alias: "BRL",
      traslate: "commons.coins.brl",
      priority: 7,
      name: "real"
    },
    {
      key: "ca",
      value: "CAD",
      flag: "ca",
      text: "Dolar Canadiense",
      textMob: "Dolar Can",
      img: Ca,
      alias: "CAD",
      traslate: "commons.coins.cad",
      priority: 13,
      name: "dolar"
    },
    {
      key: "cl",
      value: "CLP",
      flag: "cl",
      text: "Peso Chileno",
      textMob: "Peso Chi",
      img: Cl,
      alias: "CLP",
      traslate: "commons.coins.clp",
      priority: 5,
      name: "peso"
    },
    {
      key: "co",
      value: "COP",
      flag: "co",
      text: "Peso Colombiano",
      textMob: "Peso Col",
      img: Co,
      alias: "COP",
      traslate: "commons.coins.cop",
      priority: 4,
      name: "peso"
    },
    {
      key: "es",
      value: "EUR",
      flag: "eu",
      text: "Euro",
      textMob: "Euro",
      img: Es,
      alias: "EUR",
      traslate: "commons.coins.eur",
      priority: 3,
      name: "euro"
    },
    {
      key: "do",
      value: "DOP",
      flag: "do",
      text: "Dolar Dominicano",
      textMob: "Dolar Dom",
      img: Do,
      alias: "DOP",
      traslate: "commons.coins.rd$",
      priority: 6,
      name: "dolar "
    },
    {
      key: "pe",
      value: "PEN",
      flag: "pe",
      text: "Peso Peruano",
      textMob: "Peso Pe",
      img: Pe,
      alias: "PEN",
      traslate: "commons.coins.pen",
      priority: 5,
      name: "sol"
    },
    {
      key: "us",
      value: "USD",
      flag: "us",
      text: "US Dollar",
      textMob: "US Dollar",
      img: Us,
      alias: "USD",
      traslate: "commons.coins.usd",
      priority: 1,
      name: "dolar"
    },
    {
      key: "ve",
      value: "VES",
      flag: "ve",
      text: "Bolívar Venezolano",
      textMob: "Bolivar Ven",
      img: Ve,
      alias: "VES",
      traslate: "commons.coins.ves",
      priority: 2,
      name: "bolivar"
    },
    {
      key: "ar",
      value: "ARS",
      flag: "ar",
      text: "Peso Argentino",
      textMob: "Peso Arg",
      img: Ar,
      alias: "ARS",
      traslate: "commons.coins.ars",
      priority: 8,
      name: "sol"
    },
    {
      key: "mx",
      value: "MXN",
      flag: "mx",
      text: "Peso Mexicano",
      textMob: "Peso Mex",
      img: Mx,
      alias: "MXN",
      traslate: "commons.coins.mxn",
      priority: 9,
      name: "peso"
    },
    {
      key: "crc",
      value: "CRC",
      flag: "cr",
      text: "Colón costarricense",
      textMob: "Colón",
      img: Crc,
      alias: "CRC",
      traslate: "commons.coins.crc",
      priority: 16,
      name: "Colon"
    },
    {
      key: "pab",
      value: "PAB",
      flag: "pa",
      text: "Balboa panameño",
      textMob: "Balboa pan",
      img: Pab,
      alias: "PAB",
      traslate: "commons.coins.pab",
      priority: 17,
      name: "Balboa"
    },
    {
      key: "paUsd",
      value: "PA_USD",
      flag: "pa",
      text: "Dolar (Panamá)",
      textMob: "Dolar (Pan)",
      img: PaUsd,
      alias: "PA_USD",
      traslate: "commons.coins.paUsd",
      priority: 18,
      name: "dolar"
    },
    {
      key: "eth",
      value: "ETH",
      icon: "ethereum",
      text: "Ethereum",
      textMob: "Ethereum",
      img: Eth,
      alias: "ETH",
      traslate: "commons.coins.eth",
      priority: 6,
      name: "dolar"
    },
    {
      key: "cny",
      value: "CNY",
      icon: "ethereum",
      text: "Yuanes",
      textMob: "Yuanes",
      img: Cn,
      alias: "CNY",
      flag: "cn",
      traslate: "commons.coins.cny",
      priority: 10,
      name: "yuan"
    },
    {
      key: "rub",
      value: "RUB",
      icon: "rublo",
      text: "Rublo ruso",
      textMob: "Rublo",
      img: Ru,
      alias: "RUB",
      flag: "ru",
      traslate: "commons.coins.rub",
      priority: 11,
      name: "rublo"
    },
    {
      key: "inr",
      value: "INR",
      icon: "rupia",
      text: "Rupia",
      textMob: "Rupia",
      img: In,
      alias: "INR",
      flag: "in",
      traslate: "commons.coins.inr",
      priority: 12,
      name: "rupia"
    },
    {
      key: "jpy",
      value: "JPY",
      icon: "yen japonés",
      text: "Yen japonés",
      textMob: "Yen Jpn",
      img: Jp,
      alias: "JPY",
      flag: "jp",
      traslate: "commons.coins.jpy",
      priority: 14,
      name: "yen"
    },
    {
      key: "chk",
      value: "CHF",
      icon: "franco suizo",
      text: "Franco suizo",
      textMob: "Franco",
      img: Ch,
      alias: "CHF",
      flag: "se",
      traslate: "commons.coins.chf",
      priority: 15,
      name: "franco"
    }
  ]
};
