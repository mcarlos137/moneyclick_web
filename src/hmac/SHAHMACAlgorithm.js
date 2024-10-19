import crypto from 'crypto';
import { sha256 } from 'js-sha256';
import { Buffer } from 'buffer';
export default class SHAHMACAlgorithm {
  constructor(shaSize) {
    shaSize = parseInt(shaSize);
    try {
      if (
        shaSize !== 1 &&
        shaSize !== 256 &&
        shaSize !== 384 &&
        shaSize !== 512
      )
        throw new Error(
          'Size ' +
            shaSize +
            ' not supported (only 1, 256, 384 and 512 are supported)'
        );
    } catch (err) {
      //console.log(err);
    }
    this.algorithm = 'SHA' + shaSize;
  }

  encryptMessage(secretKey, message) {
    let mes = new Buffer(message);
    let key = new Buffer(secretKey, 'base64');
    var hash = sha256.hmac.update(key, mes).arrayBuffer();
    let binary = '';
    let bytes = new Uint8Array(hash);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    let result = btoa(binary);
    // let hash = crypto
    //   .createHmac(this.algorithm, new Buffer(secretKey, "base64"))
    //   .update(new Buffer(message, "utf8"), "utf8")
    //   .digest("base64");
    return result;
  }
}
