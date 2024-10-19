import config from '../../../services/config';
import interceptorHeaders from '../../../services/interceptor';
export default {
  async getGitfCardByUser(username) {
    const RESPONSE = await interceptorHeaders.createHeaders(
      config.urlDollar.listGiftCard + username,
      undefined,
      'GET'
    );
    if (RESPONSE.status !== 200) {
      throw Error('Error in request');
    }
    return RESPONSE;
  },
  async sendGiftCard(body) {
    const RESPONSE = await interceptorHeaders.createHeaders(
      config.urlDollar.sendGiftCard,
      body,
      'POST'
    );
    if (RESPONSE.status !== 200) {
      throw Error('Error in request');
    }
    return RESPONSE;
  },
  async activeGitfCard(body) {
    const RESPONSE = await interceptorHeaders.createHeaders(
      config.urlDollar.activeGiftCard,
      body,
      'POST'
    );
    if (RESPONSE.status !== 200) {
      throw Error('Error in request');
    }
    return RESPONSE;
  },
  async resendGitfCard(body) {
    const RESPONSE = await interceptorHeaders.createHeaders(
      config.urlDollar.resendGiftCard,
      body,
      'POST'
    );
    if (RESPONSE.status !== 200) {
      throw Error('Error in request');
    }
    return RESPONSE;
  },
};
