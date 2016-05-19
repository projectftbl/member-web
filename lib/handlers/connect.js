import React, { Component, PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { authorizeSelector, Update } from '@ftbl/support';
import { disconnect, connectTo, connectRss, connectPage } from '../ducks/accounts';
import { primarySelector } from '../ducks/members';
import { accountsSelector } from '../ducks/accounts';
import { Edit as Menu } from '../components/navigation';
import ConnectForm from '../components/connect';

export class Connect extends Component {
  render() {
    return (
      <div>
        <Menu />
        <ConnectForm {...this.props} />
      </div>
    );
  }
};

const mapStateToProps = createStructuredSelector({
  session: state => state.session
, accounts: accountsSelector
, authorized: authorizeSelector(Update, primarySelector)
});

export default connect(mapStateToProps, { disconnect, connectTo, connectRss, connectPage })(Connect);

