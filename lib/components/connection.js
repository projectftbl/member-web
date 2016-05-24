import React from 'react';
import { Close } from '@ftbl/icons';
import { Row, Cell, State, Events } from '@ftbl/table';

export default State('connection')(({ connection, authorized, onRemove, dispatch, $, state }) => {
  const events = Events({ dispatch, $, id: connection.id });

  return (
    <Row onMouseOver={events.over} onMouseOut={events.out}>
      <Cell width='40%'>
        {connection.type}
      </Cell>
      <Cell width='40%'>
        {connection.connectedTo.name}
      </Cell>
      <Cell width='10%' align='right' hide={!authorized || !state[connection.id]}>
        <a onClick={_ => authorized && onRemove(connection)} style={{cursor:'pointer'}}>
          <Close style={{marginTop:-4}}/>
        </a>
      </Cell>
    </Row>
  );
});
