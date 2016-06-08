import React, { Component, PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { authorizeSelector, Manage } from '@ftbl/support';
import { memberSelector, primarySelector } from '../../ducks/members';
import { connectionsSelector, search, add, remove } from '../../ducks/connections';
import Connections from '../../components/connections/connections';

export class Handler extends Component {
  render() {
    return (
      <Connections {...this.props} />
    );
  }
};

const mapStateToProps = createStructuredSelector({
  member: memberSelector
, connections: connectionsSelector
, authorized: authorizeSelector(Manage, primarySelector)
});

export default connect(mapStateToProps, { search, add, remove })(Handler);