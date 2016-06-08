import React, { Component, PropTypes } from 'react';
import Connection from './connection';
import { Message } from '@ftbl/component';
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

export default class Connections extends Component {
  render() {
    const { member, connections, search, add, change, remove } = this.props;

    if (connections.data.length === 0 && connections.fetched) return <Message message='No connections' />;
    
    return (
      <div>
        {connections.fetching && <Message text='Loading...' rotate={true} Icon={Spinner} />} 

        {connections.data.map(connection => 
          <Connection key={connection.id} connection={connection} connections={connections} member={member} 
                      onChange={change} onAdd={add} onRemove={remove} />
        )}

        <Empty limit={connections.meta.query.limit} length={connections.data.length} />

        {connections.meta.total > connections.meta.query.limit && <Paging meta={connections.meta} fetching={connections.fetching} search={search} entity='member' />}
      </div>
    );
  }
};
