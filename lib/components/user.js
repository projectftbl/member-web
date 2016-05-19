import React from 'react';
import find from 'lodash/collection/find';
import { Menu as Icon } from '@ftbl/icons';
import { Menu } from '@ftbl/navigation';
import { Row, Cell, State, Events } from '@ftbl/table';
import permissions from '../data/permissions';

const Permission = ({ permission, member, user, onRemove, onAdd }) => {
  const items = [
    { Icon, name: user.id, title: permission.description, align: 'right'
    , style: {dropdown:{top:26,right:0}}
    , submenu: permissions.map(p => 
        ({ title: p.description
         , claim: `manage ${member.id}`
         , onClick: _ => onAdd(member, user, p.right)
         , active: permission.right === p.right }))
    }
  ];

  items[0].submenu.push({ divider: true, claim: `manage ${member.id}` });
  items[0].submenu.push({ title: 'Revoke Access '
                        , claim: `manage ${member.id}`
                        , onClick: _ => onRemove(member, user), active: false });

  return <Menu items={items} style={{margin:0}} />;
};

const Action = ({ member, owner, user, existing, onAdd, onRemove }) => {
  const permission = existing && find(permissions, { right: existing.claim.right });
  
  const add = [
    { title: 'Add User', Icon, onClick: _ => onAdd(member, user), claim: `manage ${member.id}` }
  ];

  return (
    <span>
      {owner && 'Owner'}
      {!owner && permission && <Permission permission={permission} user={existing} member={member} onAdd={onAdd} onRemove={onRemove} />}
      {!owner && !existing && <Menu items={add} style={{margin:0}} />}
    </span>
  );
};

export const User = ({ member, user, users, onRemove, onAdd, state, dispatch, $ }) => {
  const events = Events({ dispatch, $, id: user.id });

  const owner = member.createdBy === user.id
      , existing = find(users.data, { id: user.id });

  const onClick = !owner && !existing ? _ => onAdd(member, user) : null
      , style = !owner && !existing ? {} : {cursor:'default'};

  return (
    <Row onMouseOver={events.over} onMouseOut={events.out} onClick={onClick} style={style}>
      <Cell width='65%'>
        <strong>{user.name} </strong>
        <span style={{fontSize:'0.9em', color:'#666'}}>{user.email}</span>
      </Cell>
      <Cell width='35%' align='right' hide={!owner && !existing && !state[user.id]}>
        <Action owner={owner} existing={existing} user={user} member={member} onAdd={onAdd} onRemove={onRemove} />
      </Cell>
    </Row>
  );
};

export default State('user')(User);
