import React, { Component, PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { setPrimary, memberSelector, membersSelector } from '../ducks/members';
import { Heading } from '../../../components';
import Members from '../components/members';

export class Select extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(data) {
    const { member, update } = this.props;
    update(member.data.id, data);
  }

  render() {
    return (
      <div>
        <Heading>Select Member</Heading>
        <Members {...this.props} />
      </div>
    );
  }
};

const mapStateToProps = createStructuredSelector({
  member: memberSelector
, members: membersSelector
, session: state => state.session
});

export default connect(mapStateToProps, { setPrimary })(Select);
