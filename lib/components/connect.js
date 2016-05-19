import React, { Component, PropTypes } from 'react';
import Account from './account';
import { Heading, Rule } from '@ftbl/component';
import { Spinner, Warning, Err } from '@ftbl/icons';
import Icon from './icon';
import Feed from './feed';

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
    const { authorized, disconnect, connectTo, connectRss, connectPage, accounts } = this.props;
    
    return (
      <div data-test='connect-form'>
        <p style={{color: '#666', margin: '-5px 0 10px 0', paddingTop: 5, clear: 'both'}}>
          Connect your social accounts and RSS feeds by clicking the icons below.
        </p>

        <Feed authorized={authorized} onConnect={connectPage} type='page' title='Connect Facebook Page URL' />
        <Icon authorized={authorized} network='twitter' onConnect={connectTo} />
        <Icon authorized={authorized} network='google' onConnect={connectTo} />
        <Feed authorized={authorized} onConnect={connectRss} type='rss' title='Connect RSS Feed' />

        <Rule />

        {accounts.data.map(account => 
          <Account authorized={authorized} key={account.id} account={account} onConnect={connectTo} onDisconnect={disconnect}/>
        )}

        {accounts.isFetching && <Message text='Loading...' />} 
        {accounts.isConnecting && <Message text='Connecting...' />}
        {accounts.data.length === 0 && !accounts.isFetching && accounts.isFetched &&
          <Message rotate={false} text='No connected accounts. Please connect now.' Icon={Err} colour='#a95252' />}
      </div>
    );
  }
}
