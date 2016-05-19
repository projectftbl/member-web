import React, { Component, PropTypes } from 'react';
import User from './user';
import { Paging, Empty } from '@ftbl/table';
import { Spinner, Warning } from '@ftbl/icons';

export const Message = ({ text, Icon = Warning, rotate = false, colour = '#666' }) => {
  return (
    <div style={{padding: '4px 12px 4px 0', position: 'relative'}}>
      <Icon rotate={rotate} style={{marginTop: -4}} colour={colour} size={24} />
      <span style={{paddingLeft: 15}}>{text}</span>
    </div>
  );
};

export default class Users extends Component {
  render() {
    const { member, users, search, add, remove } = this.props;
    
    return (
      <div>
        <p style={{color: '#666', margin: '-5px 0 10px 0', paddingTop: 5}}>
          Set user permissions
        </p>

        {users.isFetching && <Message text='Loading...' rotate={true} Icon={Spinner} />} 

        {users.data.map(user => 
          <User key={user.id} user={user} users={users} member={member} onAdd={add} onRemove={remove} />
        )}

        <Empty limit={users.meta.query.limit} length={users.data.length} />

        {users.meta.total > users.meta.query.limit && <Paging meta={users.meta} fetching={users.fetching} search={search} entity='user' />}
      </div>
    );
  }
};
