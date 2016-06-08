import React, { Component, PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { authorizeSelector, Manage } from '@ftbl/support';
import { memberSelector, primarySelector } from '../../ducks/members';
import { connectionsSelector } from '../../ducks/connections';
import { membersSelector, search } from '@ftbl/members-web';
import { add, remove } from '../../ducks/connections';
import Add from '../../components/connections/add';
import Results from '../../components/connections/results';

export class Handler extends Component {
  render() {
    return (
      <div>
        <Add {...this.props} />
        <Results {...this.props} />
      </div>
    );
  }
};

const mapStateToProps = createStructuredSelector({
  member: memberSelector
, results: membersSelector
, connections: connectionsSelector
, authorized: authorizeSelector(Manage, primarySelector)
});

export default connect(mapStateToProps, { search, add, remove })(Handler);
