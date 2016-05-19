import React from 'react';
import Radium from 'radium';
import { Row, Cell, State, Events } from '@ftbl/table';

const Mark = ({ colour }) => {
  const styles = {
    base: {
      position: 'absolute'
    , width: 12
    , height: 7
    , background: 'transparent'
    , top: 4
    , right: 3
    , borderLeft: '3px solid ' + colour
    , borderBottom: '3px solid ' + colour
    , borderTop: 'none'
    , borderRight: 'none'
    , transform: 'rotate(-45deg)'
    }
  };

  return <span style={styles.base} />;
};

export const Member = State('member')(Radium(({ member, selected, user, setPrimary, state, dispatch, $ }) => {
  const events = Events({ dispatch, $, id: member.id });

  const styles = {
    base: {
      fontWeight: 700
    , color: '#000'
    , opacity: 0.7
    , transition: 'all 0.4s ease-in-out'
    , ':hover': {
        opacity: 1
      }
    }
  , isSelected: {
      color: '#2185d0'
    , opacity: 1
    }
  };

  const isSelected = member.id === selected.id
      , onClick = isSelected ? null : _ => setPrimary(member, user);
      
  return (
    <Row onMouseOver={events.over} onMouseOut={events.out} onClick={onClick} style={isSelected && {cursor:'default'}}>
      <Cell width='65%'>
        <span style={[ styles.base, isSelected && styles.isSelected ]}>{member.name} </span>
      </Cell>
      <Cell width='35%' align='right' hide={!isSelected && !state[member.id]} style={{position:'relative'}}>
        <Mark colour={isSelected ? '#2185d0' : '#999'} />
      </Cell>
    </Row>
  );
}));

export default ({ members, member, session, setPrimary }) => {
  return (
    <div>
      <p style={{color: '#666', margin: '-5px 0 10px 0', paddingTop: 5}}>
        Select the active member
      </p>

      {members.data.map(m => 
        <Member key={m.id} member={m} selected={member} user={session.user} setPrimary={setPrimary} />
      )}
    </div>
  );
};
