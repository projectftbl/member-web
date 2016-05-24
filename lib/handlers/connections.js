import React, { Component, PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { authorizeSelector, Update } from '@ftbl/support';
import { Heading } from '@ftbl/component';
import { add, remove } from '../ducks/connections';
import { primarySelector } from '../ducks/members';
import { connectionsSelector } from '../ducks/connections';
import ConnectionsForm from '../components/connections';

export class Connections extends Component {
  render() {
    return (
      <div>
        <Heading>Connections</Heading>
        <ConnectionsForm {...this.props} />
      </div>
    );
  }
};

const mapStateToProps = createStructuredSelector({
  session: state => state.session
, connections: connectionsSelector
, authorized: authorizeSelector(Update, primarySelector)
});

export default connect(mapStateToProps, { add, remove })(Connections);

