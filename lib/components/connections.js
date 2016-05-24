import React, { Component, PropTypes } from 'react';
import Connection from './connection';
import { Spinner, Warning, Err } from '@ftbl/icons';

const Message = ({ text, Icon = Spinner, rotate = true, colour = '#666' }) => {
  return (
    <div style={{padding: '4px 12px 4px 0'}}>
      <Icon rotate={rotate} style={{marginTop: -4}} colour={colour} size={24} />
      <span style={{paddingLeft: 15, color: colour}}>{text}</span>
    </div>
  );
};

export default class Connect extends Component {
  render() {
    const { authorized, add, remove, connections } = this.props;
    
    return (
      <div data-test='connections-form'>

        {connections.data.map(connection => 
          <Connection authorized={authorized} key={connection.id} connection={connection} onRemove={remove}/>
        )}

        {connections.isFetching && <Message text='Loading...' />} 
        {connections.isAdding && <Message text='Adding...' />}
        {connections.data.length === 0 && !connections.isFetching && connections.isFetched &&
          <Message rotate={false} text='No connections.' Icon={Err} colour='#a95252' />}
      </div>
    );
  }
}
