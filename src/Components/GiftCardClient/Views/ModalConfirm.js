import React from 'react';
import {
  Modal,
  Dimmer,
  Loader,
  Segment,
  Grid,
  Message,
  Button,
} from 'semantic-ui-react';
const ModalConfirm = ({
  closeAction,
  executeAction,
  data,
  openModal,
  translate,
  load,
  sendSucess,
  showError,
  messageError,
  action,
}) => {
  let t = translate;
  return (
    <Modal open={openModal}>
      <Modal.Header>{t('sendMoneyClick.modal.dataOperation')}</Modal.Header>
      <Modal.Content>
        {load && (
          <Dimmer active inverted>
            <Loader size='small' inverted />
          </Dimmer>
        )}
        <Segment>
          <Grid>
            {data.email !== '' && (
              <Grid.Row>
                <Grid.Column
                  largeScreen={8}
                  computer={8}
                  widescreen={8}
                  mobile={16}
                >
                  <div>
                    <label style={{ fontWeight: 'bold' }}>
                      {t('receiveCard.email') + ': '}
                    </label>
                    <label>{data.email}</label>
                  </div>
                </Grid.Column>
              </Grid.Row>
            )}
            <Grid.Row>
              <Grid.Column
                largeScreen={8}
                computer={8}
                widescreen={8}
                mobile={16}
              >
                <div>
                  <label style={{ fontWeight: 'bold' }}>
                    {t('receiveCard.amount') + ': '}
                  </label>

                  <label>{data.currency + ' ' + data.amount}</label>
                </div>
              </Grid.Column>

              {/* <Grid.Column
                largeScreen={8}
                computer={8}
                widescreen={8}
                mobile={16}
              >
                {this.props.commision !== 0 && (
                  <div>
                    <label>
                      {this.props.translate('sendMoneyClick.modal.commission')}
                    </label>
                    <NumberFormat
                      value={this.props.commision}
                      displayType={'text'}
                      thousandSeparator={true}
                      decimalScale={
                        this.props.currency !== 'BTC' &&
                        this.props.currency !== 'ETH'
                          ? 2
                          : 8
                      }
                      prefix={this.props.currency + ' '}
                    />
                  </div>
                )}
              </Grid.Column> */}
            </Grid.Row>
            <Grid.Column
              largeScreen={8}
              computer={8}
              widescreen={8}
              mobile={16}
            >
              <div>
                <label style={{ fontWeight: 'bold' }}>
                  {t('receiveCard.type') + ': '}
                </label>

                <label>
                  {data.type === 'BR' ? 'BITCOINRECHARGE' : data.type}
                </label>
              </div>
            </Grid.Column>
            <Grid.Row>
              {action === 'PRINT' && !sendSucess && (
                <Grid.Column
                  largeScreen={8}
                  computer={8}
                  widescreen={8}
                  mobile={16}
                >
                  <div>
                    <label>
                      {t('receiveCard.modal.confirCreate') +
                        data.id.slice(-4) +
                        ' ?'}
                    </label>
                  </div>
                </Grid.Column>
              )}
            </Grid.Row>
            {/* <Grid.Row>
              {this.props.amountUSD !== 0 && (
                <Grid.Column
                  largeScreen={8}
                  computer={8}
                  widescreen={8}
                  mobile={16}
                >
                  {' '}
                  <div>
                    <b>
                      {this.props.translate('sendMoneyClick.equivalentUSD')}
                    </b>
                    <NumberFormat
                      value={this.props.amountUSD}
                      decimalScale={2}
                      displayType={'text'}
                      thousandSeparator={true}
                    />
                    {' $'}
                  </div>
                </Grid.Column>
              )}
            </Grid.Row> */}
          </Grid>
        </Segment>
        <Grid>
          {sendSucess && (
            <Grid.Row>
              <Grid.Column
                largeScreen={16}
                computer={16}
                widescreen={16}
                mobile={16}
                textAlign={'center'}
              >
                <label style={{ color: '#055990' }}>
                  {t('sendMoneyClick.modal.operationSuccess')}
                </label>
              </Grid.Column>
            </Grid.Row>
          )}
          {showError && (
            <Grid.Row>
              <Grid.Column
                largeScreen={16}
                computer={16}
                widescreen={16}
                mobile={16}
                textAlign={'center'}
              >
                <Message error>{messageError}</Message>
              </Grid.Column>
            </Grid.Row>
          )}
        </Grid>
      </Modal.Content>
      <Modal.Actions className='actions-modal'>
        {!sendSucess && (
          <Button secondary onClick={() => closeAction()}>
            {t('receiveCard.cancel')}
          </Button>
        )}
        {!sendSucess && (
          <Button onClick={() => executeAction()}>
            {t('receiveCard.create')}
          </Button>
        )}
        {sendSucess && (
          <Button onClick={() => closeAction('CLEAN')}>
            {t('receiveCard.accept')}
          </Button>
        )}
      </Modal.Actions>
    </Modal>
  );
};

export default ModalConfirm;
