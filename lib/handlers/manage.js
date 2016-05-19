import React, { Component, PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { authorizeSelector, Manage } from '@ftbl/support';
import { memberSelector, primarySelector } from '../ducks/members';
import { usersSelector, search, add, remove } from '../ducks/users';
import Users from '../components/users';

export class Manager extends Component {
  render() {
    return (
      <Users {...this.props} />
    );
  }
};

const mapStateToProps = createStructuredSelector({
  member: memberSelector
, users: usersSelector
, authorized: authorizeSelector(Manage, primarySelector)
});

export default connect(mapStateToProps, { search, add, remove })(Manager);