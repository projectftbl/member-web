import React from 'react';
import assign from 'lodash/object/assign';
import find from 'lodash/collection/find';
import { Menu as Icon } from '@recipher/icons';
import { Menu } from '@recipher/navigation';
import { Row, Cell, State, Events } from '@recipher/table';
import connections from '../../data/connections';

const Connect = ({ connection, member, conn, onChange, onRemove }) => {
  const items = [
    { Icon, name: connection.id, title: conn.description, align: 'right'
    , style: {dropdown:{top:26,right:0}}
    , submenu: connections(connection.connectedTo).map(c => 
        ({ title: c.action
         , onClick: _ => onChange(member, connection, c.type)
         , active: conn.type === c.type }))
    }
  ];

  items[0].submenu.push({ divider: true });
  items[0].submenu.push({ title: 'Disconnect'
                        , onClick: _ => onRemove(member, connection), active: false });

  return <Menu items={items} style={{margin:0}} />;
};

const Action = ({ member, connection, existing, onAdd, onChange, onRemove }) => {
  const conn = existing && find(connections(connection.connectedTo), { type: existing.type });
  
  const add = [
    { title: 'Follow', Icon, onClick: _ => onAdd(member, { memberId: connection.connectedTo.id, type: 'follows' }) }
  ];

  return (
    <span>
      {conn && <Connect conn={conn} connection={existing} member={member} onChange={onChange} onRemove={onRemove} />}
      {!existing && <Menu items={add} style={{margin:0}} />}
    </span>
  );
};

export const Connection = ({ member, connection, connections, onAdd, onChange, onRemove, state, dispatch, $ }) => {
  const events = Events({ dispatch, $, id: connection.id });

  const existing = find(connections.data, conn => { return conn.connectedTo.id === connection.connectedTo.id });

  const onClick = !existing ? _ => onAdd(member, { memberId: connection.connectedTo.id, type: 'follows' }) : null
      , style = !existing ? {} : { cursor: 'default' };

  return (
    <Row onMouseOver={events.over} onMouseOut={events.out} onClick={onClick} style={style}>
      <Cell width='65%'>
        <strong>{connection.connectedTo.name} </strong>
      </Cell>
      <Cell width='35%' align='right' hide={!existing && !state[connection.id]}>
        <Action existing={existing} connection={connection} member={member} onAdd={onAdd} onChange={onChange} onRemove={onRemove} />
      </Cell>
    </Row>
  );
};

export default State('connection')(Connection);
