import React, { Component, useState } from 'react';

import { Menu, Segment, Container, Divider, Grid } from 'semantic-ui-react';
import translate from '../../../i18n/translate';
import GenerateGiftCardView from './GenerateGiftCard';
import ListGiftCardView from './ListGiftCard';
const MenuGiftCard = (props) => {
  const [activeitem, setActiveItem] = useState('CreateGiftCad');
  let t = props.translate;
  return (
    <div>
      <div>
        <Divider hidden />
        <Grid>
          <Grid.Column largeScreen={2} computer={1} widescreen={2} />

          <Grid.Column largeScreen={12} computer={14} widescreen={12}>
            <Container>
              <Divider hidden />
              <Segment inverted textAlign='left' className='titleComponents'>
                <h4 className='headerComponent'>{t('receiveCard.header')}</h4>
              </Segment>

              <Menu size='small' tabular>
                <Menu.Item
                  content={t('receiveCard.titleTabEmit')}
                  name='CreateGiftCad'
                  active={activeitem === 'CreateGiftCad'}
                  onClick={() => setActiveItem('CreateGiftCad')}
                />
                <Menu.Item
                  content={t('receiveCard.titleTaList')}
                  name='ListGiftCard'
                  active={activeitem === 'ListGiftCard'}
                  onClick={() => setActiveItem('ListGiftCard')}
                />
              </Menu>
              <Segment>
                {activeitem === 'CreateGiftCad' && (
                  <Container as={GenerateGiftCardView} />
                )}
                {activeitem === 'ListGiftCard' && (
                  <Container as={ListGiftCardView} />
                )}
              </Segment>
            </Container>
          </Grid.Column>
          <Grid.Column largeScreen={2} computer={1} widescreen={2} />
        </Grid>
      </div>
    </div>
  );
};

export default translate(MenuGiftCard);
