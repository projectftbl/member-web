import React from 'react';
import find from 'lodash/collection/find';
import { Menu as Icon } from '@ftbl/icons';
import { Menu } from '@ftbl/navigation';
import { Row, Cell, State, Events } from '@ftbl/table';
import connections from '../../data/connections';

const Connect = ({ connection, member, connectTo, onAdd, onRemove }) => {
  const items = [
    { Icon, name: connectTo.id, title: connection.description, align: 'right'
    , style: {dropdown:{top:26,right:0}}
    , submenu: connections().map(c => 
        ({ title: p.description
         , onClick: _ => onAdd(member, { memberId: connectTo.id, type: c.type })
         , active: permission.right === p.right }))
    }
  ];

  items[0].submenu.push({ divider: true });
  items[0].submenu.push({ title: 'Disconnect'
                        , onClick: _ => onRemove(member, connectTo), active: false });

  return <Menu items={items} style={{margin:0}} />;
};

const Action = ({ member, connectTo, existing, onAdd, onRemove }) => {
  const connection = existing && find(connections(), { type: connectTo.type });
  
  const add = [
    { title: 'Follow', Icon, onClick: _ => onAdd(member, { memberId: connectTo.id, type: 'follow' }) }
  ];

  return (
    <span>
      {connection && <Connect connection={connection} user={existing} member={member} onAdd={onAdd} onRemove={onRemove} />}
      {!existing && <Menu items={add} style={{margin:0}} />}
    </span>
  );
};

export const Connection = ({ member, connectTo, connections, add, remove, state, dispatch, $ }) => {
  const events = Events({ dispatch, $, id: connectTo.id });

  const existing = find(connections.data, connection => {
    return connection.connectTo.id === connectTo.id;
  });

  const onClick = !existing ? _ => onConnect(member, { memberId: connectTo.id, type: 'follow' }) : null
      , style = !existing ? {} : { cursor: 'default' };

  return (
    <Row onMouseOver={events.over} onMouseOut={events.out} onClick={onClick} style={style}>
      <Cell width='65%'>
        <strong>{connectTo.name} </strong>
      </Cell>
      <Cell width='35%' align='right' hide={!existing && !state[connectTo.id]}>
        <Action existing={existing} connectTo={connectTo} member={member} onAdd={add} onRemove={remove} />
      </Cell>
    </Row>
  );
};

export default State('connection')(Connection);
