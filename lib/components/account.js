import React from 'react';
import { Close } from '@ftbl/icons';
import Icon from './icon';
import { Row, Cell, State, Events } from '@ftbl/table';

export default State('account')(({ account, authorized, onConnect, onDisconnect, dispatch, $, state }) => {
  const events = Events({ dispatch, $, id: account.id });

  return (
    <Row onMouseOver={events.over} onMouseOut={events.out}>
      <Cell width='10%'>
        <Icon authorized={authorized} size={24} network={account.network} onConnect={onConnect} shape='square'/>
      </Cell>

      <Cell width='80%'>
        <a href={account.link} style={{paddingLeft: 0, textDecoration: 'none', color: '#333', fontSize: '1.1em'}} target='_blank'>
          {account.name || account.link}
        </a>
      </Cell>
      <Cell width='10%' align='right' hide={!authorized || !state[account.id]}>
        <a onClick={_ => authorized && onDisconnect(account)} style={{cursor:'pointer'}}>
          <Close style={{marginTop:-4}}/>
        </a>
      </Cell>
    </Row>
  );
});
